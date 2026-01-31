/**
 * Data Exploration API - Temporary endpoint for article research
 *
 * Queries the hamlet-search database to understand what data center data exists.
 */

import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    // 1. Count cities with data center voting stats
    const citiesWithDCVotes = await db.cityVotingStats.findMany({
      where: { topicSlug: "data-centers" },
      include: {
        city: {
          include: { state: true }
        }
      },
      orderBy: { totalMatters: "desc" }
    });

    // 2. Count total meetings (approximate)
    const totalMeetings = await db.meeting.count({
      where: { transcriptStatus: "COMPLETED" }
    });

    // 3. Get topic definition for data-centers
    const dataCenterTopic = await db.topicDefinition.findUnique({
      where: { slug: "data-centers" }
    });

    // 4. Get city sentiment data
    const citySentiment = await db.cityTopicSentiment.findMany({
      where: dataCenterTopic ? { topicId: dataCenterTopic.id } : undefined,
      include: {
        city: {
          include: { state: true }
        }
      },
      orderBy: { mentionFrequency: "desc" },
      take: 50
    });

    // 5. Sample transcript segments mentioning data center
    const sampleTranscripts = await db.$queryRaw`
      SELECT
        ts.text,
        ts.speaker,
        m.title as meeting_title,
        m."meetingDate",
        c.name as city_name,
        s.abbreviation as state_abbr
      FROM "TranscriptSegment" ts
      JOIN "Meeting" m ON ts."meetingId" = m.id
      JOIN "GovernmentBody" gb ON m."governmentBodyId" = gb.id
      LEFT JOIN "City" c ON gb."cityId" = c.id
      LEFT JOIN "State" s ON c."stateId" = s.id
      WHERE ts.text ILIKE '%data center%'
      ORDER BY m."meetingDate" DESC
      LIMIT 20
    `;

    // 6. Count segments mentioning data center
    const dcMentionCountRaw = await db.$queryRaw<[{count: bigint}]>`
      SELECT COUNT(*) as count
      FROM "TranscriptSegment"
      WHERE text ILIKE '%data center%'
    `;
    const dcMentionCount = Number(dcMentionCountRaw[0]?.count || 0);

    // Summarize findings
    const summary = {
      citiesWithVotingData: citiesWithDCVotes.length,
      topCitiesByVotes: citiesWithDCVotes.slice(0, 20).map(c => ({
        city: c.city.name,
        state: c.city.state.abbreviation,
        totalMatters: c.totalMatters,
        approvalRate: c.approvalRate,
        approvedCount: c.approvedCount,
        rejectedCount: c.rejectedCount,
        consensusRate: c.consensusRate
      })),
      totalMeetingsInDB: totalMeetings,
      dataCenterTopicExists: !!dataCenterTopic,
      citiesWithSentimentData: citySentiment.length,
      topCitiesBySentiment: citySentiment.slice(0, 20).map(s => ({
        city: s.city.name,
        state: s.city.state.abbreviation,
        sentimentScore: s.sentimentScore,
        mentionFrequency: s.mentionFrequency,
        mentionDensity: s.mentionDensity,
        meetingsAnalyzed: s.meetingsAnalyzed,
        positiveCount: s.positiveCount,
        negativeCount: s.negativeCount,
        neutralCount: s.neutralCount
      })),
      transcriptMentionCount: dcMentionCount,
      sampleTranscripts: sampleTranscripts
    };

    return NextResponse.json(summary);

  } catch (error) {
    console.error("Data exploration error:", error);
    return NextResponse.json(
      { error: "Failed to explore data", details: String(error) },
      { status: 500 }
    );
  }
}
