/**
 * Budget Data Exploration API — Research endpoint for budget priorities article
 *
 * Explores what budget-related data exists in the Hamlet database:
 * - Transcript segments matching budget keywords
 * - Topic definitions that might cover budget
 * - AI-categorized agenda items related to budgets
 * - City-level aggregation of budget discussion frequency
 */

import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const results: Record<string, unknown> = {};
  const errors: string[] = [];

  // 1. Check if any budget-related topics exist in TopicDefinition
  try {
    const allTopics = await db.topicDefinition.findMany({
      where: { isActive: true },
      select: { slug: true, name: true, description: true },
      orderBy: { slug: "asc" },
    });
    results.existingTopics = allTopics;

    const budgetTopics = allTopics.filter(
      (t) =>
        t.slug.includes("budget") ||
        t.name.toLowerCase().includes("budget") ||
        t.name.toLowerCase().includes("fiscal") ||
        t.name.toLowerCase().includes("appropriation")
    );
    results.budgetTopicsFound = budgetTopics;
  } catch (e) {
    errors.push(`topicDefinitions: ${e}`);
  }

  // 2. Count transcript segments matching budget keywords via full-text search
  try {
    const budgetKeywords = [
      "budget",
      "appropriation",
      "fiscal year",
      "general fund",
      "capital improvement",
      "tax levy",
      "mill levy",
      "revenue",
      "expenditure",
    ];

    const counts: Array<{ keyword: string; count: number }> = [];

    for (const keyword of budgetKeywords) {
      const raw = await db.$queryRaw<[{ count: bigint }]>`
        SELECT COUNT(*) as count
        FROM "TranscriptSegment"
        WHERE text ILIKE ${"%" + keyword + "%"}
      `;
      counts.push({ keyword, count: Number(raw[0]?.count || 0) });
    }

    results.keywordCounts = counts.sort((a, b) => b.count - a.count);
    results.totalBudgetSegments = counts.reduce((sum, c) => sum + c.count, 0);
  } catch (e) {
    errors.push(`keywordCounts: ${e}`);
  }

  // 3. Sample transcript segments mentioning "budget" — see what the data looks like
  try {
    const samples = await db.$queryRaw<
      Array<{
        text: string;
        speaker: string | null;
        meeting_title: string;
        meeting_date: Date;
        city: string | null;
        state: string | null;
      }>
    >`
      SELECT
        ts.text,
        ts.speaker,
        m.title as meeting_title,
        m."meetingDate" as meeting_date,
        c.name as city,
        s.abbreviation as state
      FROM "TranscriptSegment" ts
      JOIN "Meeting" m ON ts."meetingId" = m.id
      JOIN "GovernmentBody" gb ON m."governmentBodyId" = gb.id
      LEFT JOIN "City" c ON gb."cityId" = c.id
      LEFT JOIN "State" s ON c."stateId" = s.id
      WHERE ts.text ILIKE '%budget%'
      ORDER BY m."meetingDate" DESC
      LIMIT 20
    `;
    results.sampleBudgetSegments = samples;
  } catch (e) {
    errors.push(`sampleSegments: ${e}`);
  }

  // 4. Check AI-categorized agenda items for budget-related categories
  try {
    const aiCategories = await db.$queryRaw<
      Array<{ category: string; count: bigint }>
    >`
      SELECT
        "aiTopicCategory" as category,
        COUNT(*) as count
      FROM "LegistarEventItem"
      WHERE "aiTopicCategory" IS NOT NULL
      GROUP BY "aiTopicCategory"
      ORDER BY count DESC
    `;
    results.aiTopicCategories = aiCategories.map((c) => ({
      category: c.category,
      count: Number(c.count),
    }));

    // Budget-specific AI categories
    const budgetCategories = aiCategories.filter(
      (c) =>
        c.category.toLowerCase().includes("budget") ||
        c.category.toLowerCase().includes("fiscal") ||
        c.category.toLowerCase().includes("finance") ||
        c.category.toLowerCase().includes("appropriation")
    );
    results.budgetAiCategories = budgetCategories.map((c) => ({
      category: c.category,
      count: Number(c.count),
    }));
  } catch (e) {
    errors.push(`aiCategories: ${e}`);
  }

  // 5. Cities with the most budget discussion (by transcript segment count)
  try {
    const cityCounts = await db.$queryRaw<
      Array<{
        city: string;
        state: string;
        population: number | null;
        segment_count: bigint;
        meeting_count: bigint;
      }>
    >`
      SELECT
        c.name as city,
        s.abbreviation as state,
        c.population,
        COUNT(DISTINCT ts.id) as segment_count,
        COUNT(DISTINCT m.id) as meeting_count
      FROM "TranscriptSegment" ts
      JOIN "Meeting" m ON ts."meetingId" = m.id
      JOIN "GovernmentBody" gb ON m."governmentBodyId" = gb.id
      JOIN "City" c ON gb."cityId" = c.id
      JOIN "State" s ON c."stateId" = s.id
      WHERE ts.text ILIKE '%budget%'
      GROUP BY c.id, c.name, s.abbreviation, c.population
      ORDER BY segment_count DESC
      LIMIT 50
    `;
    results.topCitiesByBudgetDiscussion = cityCounts.map((c) => ({
      city: c.city,
      state: c.state,
      population: c.population,
      segmentCount: Number(c.segment_count),
      meetingCount: Number(c.meeting_count),
    }));
    results.citiesWithBudgetData = cityCounts.length;
  } catch (e) {
    errors.push(`cityCounts: ${e}`);
  }

  // 6. Check TranscriptAnalysis topicBreakdown for budget topics
  try {
    const sampleAnalyses = await db.$queryRaw<
      Array<{
        meeting_title: string;
        meeting_date: Date;
        city: string | null;
        state: string | null;
        topic_breakdown: unknown;
      }>
    >`
      SELECT
        m.title as meeting_title,
        m."meetingDate" as meeting_date,
        c.name as city,
        s.abbreviation as state,
        ta."topicBreakdown" as topic_breakdown
      FROM "TranscriptAnalysis" ta
      JOIN "Meeting" m ON ta."meetingId" = m.id
      JOIN "GovernmentBody" gb ON m."governmentBodyId" = gb.id
      LEFT JOIN "City" c ON gb."cityId" = c.id
      LEFT JOIN "State" s ON c."stateId" = s.id
      ORDER BY m."meetingDate" DESC
      LIMIT 5
    `;
    results.sampleTopicBreakdowns = sampleAnalyses;
  } catch (e) {
    errors.push(`topicBreakdowns: ${e}`);
  }

  // 7. Check CityTopicSentiment — what topics have sentiment data?
  try {
    const sentimentTopics = await db.$queryRaw<
      Array<{ topic_slug: string; topic_name: string; city_count: bigint }>
    >`
      SELECT
        td.slug as topic_slug,
        td.name as topic_name,
        COUNT(DISTINCT cts."cityId") as city_count
      FROM "CityTopicSentiment" cts
      JOIN "TopicDefinition" td ON cts."topicId" = td.id
      GROUP BY td.slug, td.name
      ORDER BY city_count DESC
    `;
    results.sentimentTopicCoverage = sentimentTopics.map((t) => ({
      slug: t.topic_slug,
      name: t.topic_name,
      cityCount: Number(t.city_count),
    }));
  } catch (e) {
    errors.push(`sentimentTopics: ${e}`);
  }

  return NextResponse.json({
    ...results,
    errors: errors.length > 0 ? errors : undefined,
    _meta: {
      purpose: "Budget data exploration for Follow the Money article",
      date: new Date().toISOString(),
    },
  });
}
