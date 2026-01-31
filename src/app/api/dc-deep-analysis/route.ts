/**
 * Deep Analysis API for Data Center Article
 *
 * Pulls voting data, timeline trends, company mentions, and more
 */

import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // 1. VOTING DATA - Approval rates by state
    const votingByState = await db.$queryRaw<Array<{
      state: string;
      cities_with_votes: number;
      total_matters: number;
      approved: number;
      rejected: number;
      avg_approval_rate: number;
      avg_consensus: number;
    }>>`
      SELECT
        s.abbreviation as state,
        COUNT(DISTINCT cvs."cityId")::int as cities_with_votes,
        SUM(cvs."totalMatters")::int as total_matters,
        SUM(cvs."approvedCount")::int as approved,
        SUM(cvs."rejectedCount")::int as rejected,
        ROUND(AVG(cvs."approvalRate")::NUMERIC, 1)::float as avg_approval_rate,
        ROUND(AVG(cvs."consensusRate")::NUMERIC, 1)::float as avg_consensus
      FROM "CityVotingStats" cvs
      JOIN "City" c ON cvs."cityId" = c.id
      JOIN "State" s ON c."stateId" = s.id
      WHERE cvs."topicSlug" = 'data-centers'
        AND cvs."totalMatters" > 0
      GROUP BY s.abbreviation
      HAVING SUM(cvs."totalMatters") >= 3
      ORDER BY SUM(cvs."totalMatters") DESC
      LIMIT 15
    `;

    // 2. TIMELINE - When did discussions happen by quarter
    const timeline = await db.$queryRaw<Array<{
      year: number;
      quarter: number;
      meeting_count: number;
      unique_cities: number;
    }>>`
      SELECT
        EXTRACT(YEAR FROM m."meetingDate")::int as year,
        EXTRACT(QUARTER FROM m."meetingDate")::int as quarter,
        COUNT(DISTINCT m.id)::int as meeting_count,
        COUNT(DISTINCT gb."cityId")::int as unique_cities
      FROM "Meeting" m
      JOIN "TranscriptSegment" ts ON m.id = ts."meetingId"
      JOIN "GovernmentBody" gb ON m."governmentBodyId" = gb.id
      WHERE ts.text ILIKE '%data center%'
        AND m."meetingDate" >= '2020-01-01'
      GROUP BY EXTRACT(YEAR FROM m."meetingDate"), EXTRACT(QUARTER FROM m."meetingDate")
      ORDER BY year ASC, quarter ASC
    `;

    // 3. MEETING TYPE BREAKDOWN - City Council vs Planning Commission
    const meetingTypeBreakdown = await db.$queryRaw<Array<{
      body_type: string;
      meeting_count: number;
      segment_count: number;
    }>>`
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

    // 4. COMPANY MENTIONS - Google, Meta, Microsoft, Amazon, etc
    const companyMentions = await db.$queryRaw<Array<{
      company: string;
      mention_count: number;
      city_count: number;
    }>>`
      WITH company_segments AS (
        SELECT
          ts.id,
          gb."cityId",
          CASE
            WHEN ts.text ILIKE '%google%' THEN 'Google'
            WHEN ts.text ILIKE '%meta%' OR ts.text ILIKE '%facebook%' THEN 'Meta'
            WHEN ts.text ILIKE '%microsoft%' OR ts.text ILIKE '%azure%' THEN 'Microsoft'
            WHEN ts.text ILIKE '%amazon%' OR ts.text ILIKE '%aws%' THEN 'Amazon'
            WHEN ts.text ILIKE '%apple%' THEN 'Apple'
            WHEN ts.text ILIKE '%oracle%' THEN 'Oracle'
            WHEN ts.text ILIKE '%openai%' THEN 'OpenAI'
            ELSE NULL
          END as company
        FROM "TranscriptSegment" ts
        JOIN "Meeting" m ON ts."meetingId" = m.id
        JOIN "GovernmentBody" gb ON m."governmentBodyId" = gb.id
        WHERE ts.text ILIKE '%data center%'
      )
      SELECT
        company,
        COUNT(*)::int as mention_count,
        COUNT(DISTINCT "cityId")::int as city_count
      FROM company_segments
      WHERE company IS NOT NULL
      GROUP BY company
      ORDER BY mention_count DESC
    `;

    // 5. LONGEST/MOST SUBSTANTIVE QUOTES - for deeper analysis
    const substantiveQuotes = await db.$queryRaw<Array<{
      text: string;
      speaker: string | null;
      city: string;
      state: string;
      meeting_date: Date;
      char_length: number;
    }>>`
      SELECT
        ts.text,
        ts.speaker,
        c.name as city,
        s.abbreviation as state,
        m."meetingDate" as meeting_date,
        LENGTH(ts.text)::int as char_length
      FROM "TranscriptSegment" ts
      JOIN "Meeting" m ON ts."meetingId" = m.id
      JOIN "GovernmentBody" gb ON m."governmentBodyId" = gb.id
      JOIN "City" c ON gb."cityId" = c.id
      JOIN "State" s ON c."stateId" = s.id
      WHERE ts.text ILIKE '%data center%'
        AND LENGTH(ts.text) > 200
        AND LENGTH(ts.text) < 1000
        AND (
          ts.text ILIKE '%concern%'
          OR ts.text ILIKE '%oppose%'
          OR ts.text ILIKE '%support%'
          OR ts.text ILIKE '%benefit%'
          OR ts.text ILIKE '%problem%'
          OR ts.text ILIKE '%megawatt%'
          OR ts.text ILIKE '%million%'
          OR ts.text ILIKE '%tax%'
        )
      ORDER BY LENGTH(ts.text) DESC
      LIMIT 20
    `;

    // 6. CITIES WITH HIGHEST REJECTION RATES
    const highRejectionCities = await db.$queryRaw<Array<{
      city: string;
      state: string;
      total_matters: number;
      rejected: number;
      approved: number;
      rejection_rate: number;
    }>>`
      SELECT
        c.name as city,
        s.abbreviation as state,
        cvs."totalMatters"::int as total_matters,
        cvs."rejectedCount"::int as rejected,
        cvs."approvedCount"::int as approved,
        ROUND((cvs."rejectedCount"::float / NULLIF(cvs."totalMatters", 0) * 100)::NUMERIC, 1)::float as rejection_rate
      FROM "CityVotingStats" cvs
      JOIN "City" c ON cvs."cityId" = c.id
      JOIN "State" s ON c."stateId" = s.id
      WHERE cvs."topicSlug" = 'data-centers'
        AND cvs."totalMatters" >= 2
        AND cvs."rejectedCount" > 0
      ORDER BY rejection_rate DESC
      LIMIT 10
    `;

    // 7. AGGREGATE VOTING TOTALS
    const votingTotals = await db.$queryRaw<Array<{
      total_matters: number;
      total_approved: number;
      total_rejected: number;
      cities_with_rejections: number;
    }>>`
      SELECT
        SUM("totalMatters")::int as total_matters,
        SUM("approvedCount")::int as total_approved,
        SUM("rejectedCount")::int as total_rejected,
        COUNT(DISTINCT CASE WHEN "rejectedCount" > 0 THEN "cityId" END)::int as cities_with_rejections
      FROM "CityVotingStats"
      WHERE "topicSlug" = 'data-centers'
    `;

    // 8. TAX/INCENTIVE MENTIONS
    const taxMentions = await db.$queryRaw<Array<{
      category: string;
      mention_count: number;
      city_count: number;
    }>>`
      SELECT
        CASE
          WHEN ts.text ILIKE '%tax abatement%' OR ts.text ILIKE '%tax break%' THEN 'Tax Abatements'
          WHEN ts.text ILIKE '%tax incentive%' OR ts.text ILIKE '%incentive%' THEN 'Incentives'
          WHEN ts.text ILIKE '%property tax%' THEN 'Property Tax'
          WHEN ts.text ILIKE '%economic development%' THEN 'Economic Development'
        END as category,
        COUNT(*)::int as mention_count,
        COUNT(DISTINCT gb."cityId")::int as city_count
      FROM "TranscriptSegment" ts
      JOIN "Meeting" m ON ts."meetingId" = m.id
      JOIN "GovernmentBody" gb ON m."governmentBodyId" = gb.id
      WHERE ts.text ILIKE '%data center%'
        AND (
          ts.text ILIKE '%tax abatement%'
          OR ts.text ILIKE '%tax break%'
          OR ts.text ILIKE '%tax incentive%'
          OR ts.text ILIKE '%incentive%'
          OR ts.text ILIKE '%property tax%'
          OR ts.text ILIKE '%economic development%'
        )
      GROUP BY category
      HAVING category IS NOT NULL
      ORDER BY mention_count DESC
    `;

    return NextResponse.json({
      votingByState,
      timeline,
      meetingTypeBreakdown,
      companyMentions,
      substantiveQuotes: substantiveQuotes.map(q => ({
        ...q,
        text: q.text.substring(0, 500) + (q.text.length > 500 ? '...' : '')
      })),
      highRejectionCities,
      votingTotals: votingTotals[0] || { total_matters: 0, total_approved: 0, total_rejected: 0, cities_with_rejections: 0 },
      taxMentions,
    });

  } catch (error) {
    console.error("Deep analysis error:", error);
    return NextResponse.json(
      { error: "Failed to get deep analysis", details: String(error) },
      { status: 500 }
    );
  }
}
