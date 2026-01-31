/**
 * Official Votes API
 *
 * Track how individual officials vote on development issues
 * Data from PersonVotingStats table
 */

import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const results: Record<string, unknown> = {};
  const errors: string[] = [];

  // 1. Get officials with voting records
  try {
    const officialData = await db.$queryRaw<Array<{
      person_id: number;
      person_name: string;
      city: string;
      state: string;
      topic: string;
      yea_count: number;
      nay_count: number;
      abstain_count: number;
      approval_rate: number;
    }>>`
      SELECT
        pvs."personId" as person_id,
        lp."fullName" as person_name,
        c.name as city,
        s.abbreviation as state,
        pvs."topicSlug" as topic,
        pvs."yeaCount" as yea_count,
        pvs."nayCount" as nay_count,
        pvs."abstainCount" as abstain_count,
        pvs."approvalRate" as approval_rate
      FROM "PersonVotingStats" pvs
      JOIN "LegistarPerson" lp ON pvs."personId" = lp.id
      JOIN "LegistarClient" lc ON lp."legistarClientId" = lc.id
      JOIN "City" c ON lc."cityId" = c.id
      JOIN "State" s ON c."stateId" = s.id
      WHERE pvs."yeaCount" + pvs."nayCount" >= 3
      ORDER BY pvs."yeaCount" + pvs."nayCount" DESC
    `;

    // Calculate total votes for each official
    const officialsWithTotals = officialData.map(o => ({
      personId: o.person_id,
      name: o.person_name,
      city: o.city,
      state: o.state,
      topic: o.topic,
      yeaCount: o.yea_count,
      nayCount: o.nay_count,
      abstainCount: o.abstain_count,
      totalVotes: o.yea_count + o.nay_count + o.abstain_count,
      approvalRate: Math.round(o.approval_rate * 10) / 10,
    }));

    results.officials = officialsWithTotals;

    // Summary
    const totalOfficials = new Set(officialData.map(o => o.person_id)).size;
    const totalVotes = officialData.reduce((sum, o) => sum + o.yea_count + o.nay_count + o.abstain_count, 0);
    const avgApproval = officialData.length > 0
      ? Math.round(officialData.reduce((sum, o) => sum + o.approval_rate, 0) / officialData.length * 10) / 10
      : 0;

    // Categorize
    const yesVoters = officialData.filter(o => o.approval_rate >= 80);
    const noVoters = officialData.filter(o => o.approval_rate <= 40);
    const swingVoters = officialData.filter(o => o.approval_rate > 40 && o.approval_rate < 80);

    results.summary = {
      totalOfficials,
      totalVotes,
      avgApprovalRate: avgApproval,
      yesVoterCount: yesVoters.length,
      noVoterCount: noVoters.length,
      swingVoterCount: swingVoters.length,
    };

    // Top Yes voters (most pro-development)
    results.topYesVoters = officialData
      .filter(o => o.yea_count + o.nay_count >= 5)
      .sort((a, b) => b.approval_rate - a.approval_rate)
      .slice(0, 10)
      .map(o => ({
        name: o.person_name,
        city: o.city,
        state: o.state,
        yeaCount: o.yea_count,
        nayCount: o.nay_count,
        approvalRate: Math.round(o.approval_rate * 10) / 10,
      }));

    // Top No voters (most restrictive)
    results.topNoVoters = officialData
      .filter(o => o.yea_count + o.nay_count >= 5)
      .sort((a, b) => a.approval_rate - b.approval_rate)
      .slice(0, 10)
      .map(o => ({
        name: o.person_name,
        city: o.city,
        state: o.state,
        yeaCount: o.yea_count,
        nayCount: o.nay_count,
        approvalRate: Math.round(o.approval_rate * 10) / 10,
      }));

  } catch (e) {
    errors.push(`officialData: ${e}`);
    results.officials = [];
    results.summary = null;
  }

  // 2. City-level council stats
  try {
    const councilData = await db.$queryRaw<Array<{
      city: string;
      state: string;
      official_count: number;
      avg_approval: number;
      min_approval: number;
      max_approval: number;
    }>>`
      SELECT
        c.name as city,
        s.abbreviation as state,
        COUNT(DISTINCT pvs."personId")::int as official_count,
        ROUND(AVG(pvs."approvalRate")::NUMERIC, 1) as avg_approval,
        ROUND(MIN(pvs."approvalRate")::NUMERIC, 1) as min_approval,
        ROUND(MAX(pvs."approvalRate")::NUMERIC, 1) as max_approval
      FROM "PersonVotingStats" pvs
      JOIN "LegistarPerson" lp ON pvs."personId" = lp.id
      JOIN "LegistarClient" lc ON lp."legistarClientId" = lc.id
      JOIN "City" c ON lc."cityId" = c.id
      JOIN "State" s ON c."stateId" = s.id
      WHERE pvs."yeaCount" + pvs."nayCount" >= 3
      GROUP BY c.name, s.abbreviation
      HAVING COUNT(DISTINCT pvs."personId") >= 3
      ORDER BY official_count DESC
    `;

    // Calculate polarization (spread between min and max)
    results.councilStats = councilData.map(c => ({
      city: c.city,
      state: c.state,
      officialCount: c.official_count,
      avgApproval: Number(c.avg_approval),
      polarization: Number(c.max_approval) - Number(c.min_approval),
      minApproval: Number(c.min_approval),
      maxApproval: Number(c.max_approval),
    }));

  } catch (e) {
    errors.push(`councilData: ${e}`);
    results.councilStats = [];
  }

  // 3. Topic breakdown
  try {
    const topicData = await db.$queryRaw<Array<{
      topic: string;
      official_count: number;
      total_votes: number;
      avg_approval: number;
    }>>`
      SELECT
        pvs."topicSlug" as topic,
        COUNT(DISTINCT pvs."personId")::int as official_count,
        SUM(pvs."yeaCount" + pvs."nayCount")::int as total_votes,
        ROUND(AVG(pvs."approvalRate")::NUMERIC, 1) as avg_approval
      FROM "PersonVotingStats" pvs
      WHERE pvs."yeaCount" + pvs."nayCount" >= 3
      GROUP BY pvs."topicSlug"
      ORDER BY total_votes DESC
    `;

    results.byTopic = topicData.map(t => ({
      topic: t.topic,
      officialCount: t.official_count,
      totalVotes: t.total_votes,
      avgApproval: Number(t.avg_approval),
    }));
  } catch (e) {
    errors.push(`topicData: ${e}`);
    results.byTopic = [];
  }

  return NextResponse.json({
    ...results,
    errors: errors.length > 0 ? errors : undefined,
  });
}
