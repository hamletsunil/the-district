/**
 * Deep Analysis API for Data Center Article
 *
 * Pulls voting data, timeline trends, company mentions, and more
 * Each query is isolated with error handling
 */

import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const results: Record<string, unknown> = {};
  const errors: string[] = [];

  // 1. VOTING DATA - Approval rates by state
  try {
    results.votingByState = await db.$queryRaw`
      SELECT
        s.abbreviation as state,
        COUNT(DISTINCT cvs."cityId")::int as cities_with_votes,
        COALESCE(SUM(cvs."totalMatters"), 0)::int as total_matters,
        COALESCE(SUM(cvs."approvedCount"), 0)::int as approved,
        COALESCE(SUM(cvs."rejectedCount"), 0)::int as rejected,
        ROUND(COALESCE(AVG(cvs."approvalRate"), 0)::NUMERIC, 1) as avg_approval_rate
      FROM "CityVotingStats" cvs
      JOIN "City" c ON cvs."cityId" = c.id
      JOIN "State" s ON c."stateId" = s.id
      WHERE cvs."topicSlug" = 'data-centers'
      GROUP BY s.abbreviation
      ORDER BY total_matters DESC
      LIMIT 15
    `;
  } catch (e) {
    errors.push(`votingByState: ${e}`);
    results.votingByState = [];
  }

  // 2. VOTING TOTALS - Aggregate
  try {
    const totals = await db.$queryRaw<Array<{
      total_matters: bigint;
      total_approved: bigint;
      total_rejected: bigint;
      cities_with_rejections: bigint;
    }>>`
      SELECT
        COALESCE(SUM("totalMatters"), 0) as total_matters,
        COALESCE(SUM("approvedCount"), 0) as total_approved,
        COALESCE(SUM("rejectedCount"), 0) as total_rejected,
        COUNT(DISTINCT CASE WHEN "rejectedCount" > 0 THEN "cityId" END) as cities_with_rejections
      FROM "CityVotingStats"
      WHERE "topicSlug" = 'data-centers'
    `;
    results.votingTotals = totals[0] ? {
      total_matters: Number(totals[0].total_matters),
      total_approved: Number(totals[0].total_approved),
      total_rejected: Number(totals[0].total_rejected),
      cities_with_rejections: Number(totals[0].cities_with_rejections),
    } : { total_matters: 0, total_approved: 0, total_rejected: 0, cities_with_rejections: 0 };
  } catch (e) {
    errors.push(`votingTotals: ${e}`);
    results.votingTotals = { total_matters: 0, total_approved: 0, total_rejected: 0, cities_with_rejections: 0 };
  }

  // 3. HIGH REJECTION CITIES
  try {
    results.highRejectionCities = await db.$queryRaw`
      SELECT
        c.name as city,
        s.abbreviation as state,
        cvs."totalMatters"::int as total_matters,
        cvs."rejectedCount"::int as rejected,
        cvs."approvedCount"::int as approved,
        ROUND((cvs."rejectedCount"::float / NULLIF(cvs."totalMatters", 0) * 100)::NUMERIC, 1) as rejection_rate
      FROM "CityVotingStats" cvs
      JOIN "City" c ON cvs."cityId" = c.id
      JOIN "State" s ON c."stateId" = s.id
      WHERE cvs."topicSlug" = 'data-centers'
        AND cvs."totalMatters" >= 2
        AND cvs."rejectedCount" > 0
      ORDER BY rejection_rate DESC
      LIMIT 10
    `;
  } catch (e) {
    errors.push(`highRejectionCities: ${e}`);
    results.highRejectionCities = [];
  }

  // 4. MEETING TYPE BREAKDOWN
  try {
    results.meetingTypeBreakdown = await db.$queryRaw`
      SELECT
        gb."bodyType" as body_type,
        COUNT(DISTINCT m.id)::int as meeting_count,
        COUNT(ts.id)::int as segment_count
      FROM "Meeting" m
      JOIN "GovernmentBody" gb ON m."governmentBodyId" = gb.id
      JOIN "TranscriptSegment" ts ON m.id = ts."meetingId"
      WHERE ts.text ILIKE '%data center%'
      GROUP BY gb."bodyType"
      ORDER BY meeting_count DESC
    `;
  } catch (e) {
    errors.push(`meetingTypeBreakdown: ${e}`);
    results.meetingTypeBreakdown = [];
  }

  // 5. COMPANY MENTIONS
  try {
    results.companyMentions = await db.$queryRaw`
      SELECT company, COUNT(*)::int as mention_count, COUNT(DISTINCT city_id)::int as city_count
      FROM (
        SELECT
          gb."cityId" as city_id,
          CASE
            WHEN ts.text ILIKE '%google%' THEN 'Google'
            WHEN ts.text ILIKE '%meta%' OR ts.text ILIKE '%facebook%' THEN 'Meta'
            WHEN ts.text ILIKE '%microsoft%' OR ts.text ILIKE '%azure%' THEN 'Microsoft'
            WHEN ts.text ILIKE '%amazon%' OR ts.text ILIKE '%aws%' THEN 'Amazon'
            WHEN ts.text ILIKE '%apple%' THEN 'Apple'
            WHEN ts.text ILIKE '%oracle%' THEN 'Oracle'
            ELSE NULL
          END as company
        FROM "TranscriptSegment" ts
        JOIN "Meeting" m ON ts."meetingId" = m.id
        JOIN "GovernmentBody" gb ON m."governmentBodyId" = gb.id
        WHERE ts.text ILIKE '%data center%'
      ) sub
      WHERE company IS NOT NULL
      GROUP BY company
      ORDER BY mention_count DESC
    `;
  } catch (e) {
    errors.push(`companyMentions: ${e}`);
    results.companyMentions = [];
  }

  // 6. TIMELINE BY YEAR
  try {
    results.timeline = await db.$queryRaw`
      SELECT
        EXTRACT(YEAR FROM m."meetingDate")::int as year,
        COUNT(DISTINCT m.id)::int as meeting_count,
        COUNT(DISTINCT gb."cityId")::int as unique_cities
      FROM "Meeting" m
      JOIN "TranscriptSegment" ts ON m.id = ts."meetingId"
      JOIN "GovernmentBody" gb ON m."governmentBodyId" = gb.id
      WHERE ts.text ILIKE '%data center%'
        AND m."meetingDate" >= '2020-01-01'
      GROUP BY EXTRACT(YEAR FROM m."meetingDate")
      ORDER BY year ASC
    `;
  } catch (e) {
    errors.push(`timeline: ${e}`);
    results.timeline = [];
  }

  // 7. SUBSTANTIVE QUOTES
  try {
    const quotes = await db.$queryRaw<Array<{
      text: string;
      speaker: string | null;
      city: string;
      state: string;
      meeting_date: Date;
    }>>`
      SELECT
        ts.text,
        ts.speaker,
        c.name as city,
        s.abbreviation as state,
        m."meetingDate" as meeting_date
      FROM "TranscriptSegment" ts
      JOIN "Meeting" m ON ts."meetingId" = m.id
      JOIN "GovernmentBody" gb ON m."governmentBodyId" = gb.id
      JOIN "City" c ON gb."cityId" = c.id
      JOIN "State" s ON c."stateId" = s.id
      WHERE ts.text ILIKE '%data center%'
        AND LENGTH(ts.text) > 150
        AND LENGTH(ts.text) < 600
        AND (
          ts.text ILIKE '%megawatt%'
          OR ts.text ILIKE '%million gallon%'
          OR ts.text ILIKE '%reject%'
          OR ts.text ILIKE '%approve%'
          OR ts.text ILIKE '%concern%'
          OR ts.text ILIKE '%opposition%'
        )
      ORDER BY LENGTH(ts.text) DESC
      LIMIT 15
    `;
    results.substantiveQuotes = quotes.map(q => ({
      ...q,
      text: q.text.substring(0, 400) + (q.text.length > 400 ? '...' : '')
    }));
  } catch (e) {
    errors.push(`substantiveQuotes: ${e}`);
    results.substantiveQuotes = [];
  }

  // 8. TAX/INCENTIVE MENTIONS
  try {
    results.taxMentions = await db.$queryRaw`
      SELECT category, COUNT(*)::int as mention_count, COUNT(DISTINCT city_id)::int as city_count
      FROM (
        SELECT
          gb."cityId" as city_id,
          CASE
            WHEN ts.text ILIKE '%tax abatement%' OR ts.text ILIKE '%tax break%' THEN 'Tax Abatements'
            WHEN ts.text ILIKE '%incentive%' THEN 'Incentives'
            WHEN ts.text ILIKE '%property tax%' THEN 'Property Tax'
            WHEN ts.text ILIKE '%economic development%' THEN 'Economic Development'
            ELSE NULL
          END as category
        FROM "TranscriptSegment" ts
        JOIN "Meeting" m ON ts."meetingId" = m.id
        JOIN "GovernmentBody" gb ON m."governmentBodyId" = gb.id
        WHERE ts.text ILIKE '%data center%'
      ) sub
      WHERE category IS NOT NULL
      GROUP BY category
      ORDER BY mention_count DESC
    `;
  } catch (e) {
    errors.push(`taxMentions: ${e}`);
    results.taxMentions = [];
  }

  return NextResponse.json({
    ...results,
    errors: errors.length > 0 ? errors : undefined,
  });
}
