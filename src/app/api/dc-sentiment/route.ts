/**
 * Data Center Sentiment Analysis Data
 *
 * Get the pre-analyzed sentiment data and sample excerpts
 */

import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    // Get the data-centers topic definition
    const topic = await db.topicDefinition.findUnique({
      where: { slug: "data-centers" }
    });

    if (!topic) {
      return NextResponse.json({ error: "data-centers topic not found" });
    }

    // Get all city sentiment data for data centers
    const sentimentData = await db.cityTopicSentiment.findMany({
      where: { topicId: topic.id },
      include: {
        city: {
          include: {
            state: true
          }
        }
      },
      orderBy: { mentionFrequency: "desc" }
    });

    // Format the data
    const cities = sentimentData.map(s => ({
      city: s.city.name,
      state: s.city.state.abbreviation,
      population: s.city.population,
      sentimentScore: s.sentimentScore,
      mentionFrequency: s.mentionFrequency,
      mentionDensity: s.mentionDensity,
      meetingsAnalyzed: s.meetingsAnalyzed,
      segmentsAnalyzed: s.segmentsAnalyzed,
      positiveCount: s.positiveCount,
      negativeCount: s.negativeCount,
      neutralCount: s.neutralCount,
      confidenceLevel: s.confidenceLevel,
      dataStartDate: s.dataStartDate,
      dataEndDate: s.dataEndDate,
      sampleExcerpts: s.sampleExcerpts, // This is the gold!
    }));

    // Calculate aggregate stats
    const totalMentions = cities.reduce((sum, c) => sum + c.mentionFrequency, 0);
    const avgSentiment = cities.length > 0
      ? cities.reduce((sum, c) => sum + c.sentimentScore, 0) / cities.length
      : 0;
    const negativeCities = cities.filter(c => c.sentimentScore < 45);
    const positiveCities = cities.filter(c => c.sentimentScore > 55);
    const neutralCities = cities.filter(c => c.sentimentScore >= 45 && c.sentimentScore <= 55);

    // Get by state
    const byState = cities.reduce((acc, c) => {
      if (!acc[c.state]) {
        acc[c.state] = { cities: 0, totalMentions: 0, avgSentiment: 0, sentimentSum: 0 };
      }
      acc[c.state].cities++;
      acc[c.state].totalMentions += c.mentionFrequency;
      acc[c.state].sentimentSum += c.sentimentScore;
      acc[c.state].avgSentiment = acc[c.state].sentimentSum / acc[c.state].cities;
      return acc;
    }, {} as Record<string, { cities: number; totalMentions: number; avgSentiment: number; sentimentSum: number }>);

    return NextResponse.json({
      topic: {
        slug: topic.slug,
        name: topic.name,
        description: topic.description,
      },
      summary: {
        totalCities: cities.length,
        totalMentions,
        averageSentiment: Math.round(avgSentiment * 10) / 10,
        negativeCitiesCount: negativeCities.length,
        positiveCitiesCount: positiveCities.length,
        neutralCitiesCount: neutralCities.length,
      },
      byState: Object.entries(byState)
        .sort((a, b) => b[1].totalMentions - a[1].totalMentions)
        .slice(0, 20)
        .map(([state, data]) => ({
          state,
          cities: data.cities,
          totalMentions: data.totalMentions,
          avgSentiment: Math.round(data.avgSentiment * 10) / 10,
        })),
      topCities: cities.slice(0, 30),
      mostNegative: negativeCities.sort((a, b) => a.sentimentScore - b.sentimentScore).slice(0, 10),
      mostPositive: positiveCities.sort((a, b) => b.sentimentScore - a.sentimentScore).slice(0, 10),
    });

  } catch (error) {
    console.error("Sentiment query error:", error);
    return NextResponse.json(
      { error: "Failed to get sentiment data", details: String(error) },
      { status: 500 }
    );
  }
}
