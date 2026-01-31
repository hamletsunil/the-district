/**
 * Abundance Index API
 *
 * Combines voting data with sentiment to create a "YIMBY score"
 * Measures not just approval rates, but enthusiasm
 */

import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const results: Record<string, unknown> = {};
  const errors: string[] = [];

  // 1. Get cities with both voting stats and sentiment data
  try {
    const cityData = await db.$queryRaw<Array<{
      city: string;
      state: string;
      population: number | null;
      sentiment_score: number;
      mention_frequency: number;
      positive_count: number;
      negative_count: number;
      neutral_count: number;
      sample_excerpts: unknown;
    }>>`
      SELECT
        c.name as city,
        s.abbreviation as state,
        c.population,
        cts."sentimentScore" as sentiment_score,
        cts."mentionFrequency" as mention_frequency,
        cts."positiveCount" as positive_count,
        cts."negativeCount" as negative_count,
        cts."neutralCount" as neutral_count,
        cts."sampleExcerpts" as sample_excerpts
      FROM "CityTopicSentiment" cts
      JOIN "City" c ON cts."cityId" = c.id
      JOIN "State" s ON c."stateId" = s.id
      JOIN "TopicDefinition" td ON cts."topicId" = td.id
      WHERE td.slug = 'data-centers'
        AND cts."mentionFrequency" >= 10
      ORDER BY cts."sentimentScore" DESC
    `;

    // Calculate abundance index: combination of sentiment + positive ratio
    const citiesWithIndex = cityData.map(city => {
      const totalSentimentVotes = city.positive_count + city.negative_count + city.neutral_count;
      const positiveRatio = totalSentimentVotes > 0
        ? (city.positive_count / totalSentimentVotes) * 100
        : 50;
      const negativeRatio = totalSentimentVotes > 0
        ? (city.negative_count / totalSentimentVotes) * 100
        : 50;

      // Abundance Index: weighted combo of sentiment score and positive ratio
      const abundanceIndex = Math.round((city.sentiment_score * 0.6 + positiveRatio * 0.4) * 10) / 10;

      // Categorize
      let category: "yimby" | "nimby" | "neutral";
      if (abundanceIndex >= 55) category = "yimby";
      else if (abundanceIndex <= 45) category = "nimby";
      else category = "neutral";

      return {
        city: city.city,
        state: city.state,
        population: city.population,
        sentimentScore: city.sentiment_score,
        mentionFrequency: city.mention_frequency,
        positiveCount: city.positive_count,
        negativeCount: city.negative_count,
        neutralCount: city.neutral_count,
        positiveRatio: Math.round(positiveRatio * 10) / 10,
        negativeRatio: Math.round(negativeRatio * 10) / 10,
        abundanceIndex,
        category,
        sampleExcerpts: city.sample_excerpts,
      };
    });

    results.cities = citiesWithIndex;

    // Aggregate stats
    const yimbyCount = citiesWithIndex.filter(c => c.category === "yimby").length;
    const nimbyCount = citiesWithIndex.filter(c => c.category === "nimby").length;
    const neutralCount = citiesWithIndex.filter(c => c.category === "neutral").length;
    const avgAbundance = citiesWithIndex.length > 0
      ? Math.round(citiesWithIndex.reduce((sum, c) => sum + c.abundanceIndex, 0) / citiesWithIndex.length * 10) / 10
      : 0;

    results.summary = {
      totalCities: citiesWithIndex.length,
      yimbyCount,
      nimbyCount,
      neutralCount,
      averageAbundanceIndex: avgAbundance,
    };

    // Top YIMBY cities
    results.topYimby = citiesWithIndex
      .filter(c => c.category === "yimby")
      .slice(0, 10);

    // Top NIMBY cities
    results.topNimby = citiesWithIndex
      .filter(c => c.category === "nimby")
      .sort((a, b) => a.abundanceIndex - b.abundanceIndex)
      .slice(0, 10);

  } catch (e) {
    errors.push(`cityData: ${e}`);
    results.cities = [];
  }

  // 2. State-level aggregation
  try {
    const stateData = await db.$queryRaw<Array<{
      state: string;
      city_count: number;
      avg_sentiment: number;
      total_mentions: number;
    }>>`
      SELECT
        s.abbreviation as state,
        COUNT(DISTINCT c.id)::int as city_count,
        ROUND(AVG(cts."sentimentScore")::NUMERIC, 1) as avg_sentiment,
        SUM(cts."mentionFrequency")::int as total_mentions
      FROM "CityTopicSentiment" cts
      JOIN "City" c ON cts."cityId" = c.id
      JOIN "State" s ON c."stateId" = s.id
      JOIN "TopicDefinition" td ON cts."topicId" = td.id
      WHERE td.slug = 'data-centers'
        AND cts."mentionFrequency" >= 10
      GROUP BY s.abbreviation
      HAVING COUNT(DISTINCT c.id) >= 2
      ORDER BY avg_sentiment DESC
    `;

    results.byState = stateData.map(s => ({
      state: s.state,
      cityCount: s.city_count,
      avgSentiment: Number(s.avg_sentiment),
      totalMentions: s.total_mentions,
      category: Number(s.avg_sentiment) >= 55 ? "yimby" : Number(s.avg_sentiment) <= 45 ? "nimby" : "neutral",
    }));
  } catch (e) {
    errors.push(`stateData: ${e}`);
    results.byState = [];
  }

  // 3. Sample quotes from YIMBY vs NIMBY cities
  try {
    // Pro-development quotes
    const proQuotes = await db.$queryRaw<Array<{
      text: string;
      city: string;
      state: string;
    }>>`
      SELECT
        ts.text,
        c.name as city,
        s.abbreviation as state
      FROM "TranscriptSegment" ts
      JOIN "Meeting" m ON ts."meetingId" = m.id
      JOIN "GovernmentBody" gb ON m."governmentBodyId" = gb.id
      JOIN "City" c ON gb."cityId" = c.id
      JOIN "State" s ON c."stateId" = s.id
      WHERE ts.text ILIKE '%data center%'
        AND LENGTH(ts.text) > 100
        AND LENGTH(ts.text) < 400
        AND (
          ts.text ILIKE '%economic benefit%'
          OR ts.text ILIKE '%job creation%'
          OR ts.text ILIKE '%tax revenue%'
          OR ts.text ILIKE '%welcome%'
          OR ts.text ILIKE '%opportunity%'
          OR ts.text ILIKE '%support this%'
        )
      ORDER BY RANDOM()
      LIMIT 5
    `;

    // Anti-development quotes
    const antiQuotes = await db.$queryRaw<Array<{
      text: string;
      city: string;
      state: string;
    }>>`
      SELECT
        ts.text,
        c.name as city,
        s.abbreviation as state
      FROM "TranscriptSegment" ts
      JOIN "Meeting" m ON ts."meetingId" = m.id
      JOIN "GovernmentBody" gb ON m."governmentBodyId" = gb.id
      JOIN "City" c ON gb."cityId" = c.id
      JOIN "State" s ON c."stateId" = s.id
      WHERE ts.text ILIKE '%data center%'
        AND LENGTH(ts.text) > 100
        AND LENGTH(ts.text) < 400
        AND (
          ts.text ILIKE '%concern%'
          OR ts.text ILIKE '%oppose%'
          OR ts.text ILIKE '%against%'
          OR ts.text ILIKE '%problem%'
          OR ts.text ILIKE '%traffic%'
          OR ts.text ILIKE '%noise%'
        )
      ORDER BY RANDOM()
      LIMIT 5
    `;

    results.quotes = {
      pro: proQuotes.map(q => ({
        text: q.text.substring(0, 300) + (q.text.length > 300 ? '...' : ''),
        city: q.city,
        state: q.state,
      })),
      anti: antiQuotes.map(q => ({
        text: q.text.substring(0, 300) + (q.text.length > 300 ? '...' : ''),
        city: q.city,
        state: q.state,
      })),
    };
  } catch (e) {
    errors.push(`quotes: ${e}`);
    results.quotes = { pro: [], anti: [] };
  }

  return NextResponse.json({
    ...results,
    errors: errors.length > 0 ? errors : undefined,
  });
}
