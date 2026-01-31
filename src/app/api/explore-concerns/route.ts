/**
 * Data Center Concerns Exploration
 *
 * Find transcript segments that mention specific concerns:
 * - Power/grid issues
 * - Water usage
 * - Noise
 * - Traffic
 * - Jobs (both pro and con)
 * - Tax incentives
 */

import { NextResponse } from "next/server";
import { db } from "@/lib/db";

interface TranscriptResult {
  text: string;
  speaker: string | null;
  meeting_title: string;
  meetingDate: Date;
  city_name: string;
  state_abbr: string;
  start_time: number;
}

export async function GET() {
  try {
    // 1. Power/Grid concerns (data center + power/megawatt/grid/utility)
    const powerConcerns = await db.$queryRaw<TranscriptResult[]>`
      SELECT
        ts.text,
        ts.speaker,
        m.title as meeting_title,
        m."meetingDate",
        c.name as city_name,
        s.abbreviation as state_abbr,
        ts."startTime" as start_time
      FROM "TranscriptSegment" ts
      JOIN "Meeting" m ON ts."meetingId" = m.id
      JOIN "GovernmentBody" gb ON m."governmentBodyId" = gb.id
      LEFT JOIN "City" c ON gb."cityId" = c.id
      LEFT JOIN "State" s ON c."stateId" = s.id
      WHERE ts.text ILIKE '%data center%'
        AND (ts.text ILIKE '%megawatt%' OR ts.text ILIKE '%power%' OR ts.text ILIKE '%grid%' OR ts.text ILIKE '%utility%' OR ts.text ILIKE '%electricity%')
      ORDER BY m."meetingDate" DESC
      LIMIT 30
    `;

    // 2. Water concerns
    const waterConcerns = await db.$queryRaw<TranscriptResult[]>`
      SELECT
        ts.text,
        ts.speaker,
        m.title as meeting_title,
        m."meetingDate",
        c.name as city_name,
        s.abbreviation as state_abbr,
        ts."startTime" as start_time
      FROM "TranscriptSegment" ts
      JOIN "Meeting" m ON ts."meetingId" = m.id
      JOIN "GovernmentBody" gb ON m."governmentBodyId" = gb.id
      LEFT JOIN "City" c ON gb."cityId" = c.id
      LEFT JOIN "State" s ON c."stateId" = s.id
      WHERE ts.text ILIKE '%data center%'
        AND (ts.text ILIKE '%water%' OR ts.text ILIKE '%cooling%' OR ts.text ILIKE '%aquifer%' OR ts.text ILIKE '%drought%')
      ORDER BY m."meetingDate" DESC
      LIMIT 30
    `;

    // 3. Noise concerns
    const noiseConcerns = await db.$queryRaw<TranscriptResult[]>`
      SELECT
        ts.text,
        ts.speaker,
        m.title as meeting_title,
        m."meetingDate",
        c.name as city_name,
        s.abbreviation as state_abbr,
        ts."startTime" as start_time
      FROM "TranscriptSegment" ts
      JOIN "Meeting" m ON ts."meetingId" = m.id
      JOIN "GovernmentBody" gb ON m."governmentBodyId" = gb.id
      LEFT JOIN "City" c ON gb."cityId" = c.id
      LEFT JOIN "State" s ON c."stateId" = s.id
      WHERE ts.text ILIKE '%data center%'
        AND (ts.text ILIKE '%noise%' OR ts.text ILIKE '%loud%' OR ts.text ILIKE '%decibel%' OR ts.text ILIKE '%generator%')
      ORDER BY m."meetingDate" DESC
      LIMIT 30
    `;

    // 4. Jobs mentions
    const jobMentions = await db.$queryRaw<TranscriptResult[]>`
      SELECT
        ts.text,
        ts.speaker,
        m.title as meeting_title,
        m."meetingDate",
        c.name as city_name,
        s.abbreviation as state_abbr,
        ts."startTime" as start_time
      FROM "TranscriptSegment" ts
      JOIN "Meeting" m ON ts."meetingId" = m.id
      JOIN "GovernmentBody" gb ON m."governmentBodyId" = gb.id
      LEFT JOIN "City" c ON gb."cityId" = c.id
      LEFT JOIN "State" s ON c."stateId" = s.id
      WHERE ts.text ILIKE '%data center%'
        AND (ts.text ILIKE '%job%' OR ts.text ILIKE '%employ%' OR ts.text ILIKE '%workforce%')
      ORDER BY m."meetingDate" DESC
      LIMIT 30
    `;

    // 5. Opposition/rejection language
    const oppositionMentions = await db.$queryRaw<TranscriptResult[]>`
      SELECT
        ts.text,
        ts.speaker,
        m.title as meeting_title,
        m."meetingDate",
        c.name as city_name,
        s.abbreviation as state_abbr,
        ts."startTime" as start_time
      FROM "TranscriptSegment" ts
      JOIN "Meeting" m ON ts."meetingId" = m.id
      JOIN "GovernmentBody" gb ON m."governmentBodyId" = gb.id
      LEFT JOIN "City" c ON gb."cityId" = c.id
      LEFT JOIN "State" s ON c."stateId" = s.id
      WHERE ts.text ILIKE '%data center%'
        AND (ts.text ILIKE '%oppose%' OR ts.text ILIKE '%against%' OR ts.text ILIKE '%reject%' OR ts.text ILIKE '%deny%' OR ts.text ILIKE '%concern%' OR ts.text ILIKE '%problem%')
      ORDER BY m."meetingDate" DESC
      LIMIT 50
    `;

    // 6. Support/approval language
    const supportMentions = await db.$queryRaw<TranscriptResult[]>`
      SELECT
        ts.text,
        ts.speaker,
        m.title as meeting_title,
        m."meetingDate",
        c.name as city_name,
        s.abbreviation as state_abbr,
        ts."startTime" as start_time
      FROM "TranscriptSegment" ts
      JOIN "Meeting" m ON ts."meetingId" = m.id
      JOIN "GovernmentBody" gb ON m."governmentBodyId" = gb.id
      LEFT JOIN "City" c ON gb."cityId" = c.id
      LEFT JOIN "State" s ON c."stateId" = s.id
      WHERE ts.text ILIKE '%data center%'
        AND (ts.text ILIKE '%support%' OR ts.text ILIKE '%approve%' OR ts.text ILIKE '%benefit%' OR ts.text ILIKE '%opportunity%' OR ts.text ILIKE '%economic development%')
      ORDER BY m."meetingDate" DESC
      LIMIT 50
    `;

    // 7. Get longer excerpts with more context (50+ chars)
    const longerExcerpts = await db.$queryRaw<TranscriptResult[]>`
      SELECT
        ts.text,
        ts.speaker,
        m.title as meeting_title,
        m."meetingDate",
        c.name as city_name,
        s.abbreviation as state_abbr,
        ts."startTime" as start_time
      FROM "TranscriptSegment" ts
      JOIN "Meeting" m ON ts."meetingId" = m.id
      JOIN "GovernmentBody" gb ON m."governmentBodyId" = gb.id
      LEFT JOIN "City" c ON gb."cityId" = c.id
      LEFT JOIN "State" s ON c."stateId" = s.id
      WHERE ts.text ILIKE '%data center%'
        AND LENGTH(ts.text) > 100
      ORDER BY m."meetingDate" DESC
      LIMIT 50
    `;

    // 8. Count by concern category
    const countPower = await db.$queryRaw<[{count: bigint}]>`
      SELECT COUNT(*) as count FROM "TranscriptSegment"
      WHERE text ILIKE '%data center%' AND (text ILIKE '%megawatt%' OR text ILIKE '%power%' OR text ILIKE '%grid%')
    `;

    const countWater = await db.$queryRaw<[{count: bigint}]>`
      SELECT COUNT(*) as count FROM "TranscriptSegment"
      WHERE text ILIKE '%data center%' AND (text ILIKE '%water%' OR text ILIKE '%cooling%')
    `;

    const countNoise = await db.$queryRaw<[{count: bigint}]>`
      SELECT COUNT(*) as count FROM "TranscriptSegment"
      WHERE text ILIKE '%data center%' AND (text ILIKE '%noise%' OR text ILIKE '%loud%')
    `;

    const countJobs = await db.$queryRaw<[{count: bigint}]>`
      SELECT COUNT(*) as count FROM "TranscriptSegment"
      WHERE text ILIKE '%data center%' AND (text ILIKE '%job%' OR text ILIKE '%employ%')
    `;

    return NextResponse.json({
      concernCounts: {
        power: Number(countPower[0]?.count || 0),
        water: Number(countWater[0]?.count || 0),
        noise: Number(countNoise[0]?.count || 0),
        jobs: Number(countJobs[0]?.count || 0),
      },
      samples: {
        powerConcerns: powerConcerns.slice(0, 15),
        waterConcerns: waterConcerns.slice(0, 15),
        noiseConcerns: noiseConcerns.slice(0, 15),
        jobMentions: jobMentions.slice(0, 15),
        oppositionLanguage: oppositionMentions.slice(0, 20),
        supportLanguage: supportMentions.slice(0, 20),
        longerExcerpts: longerExcerpts.slice(0, 30),
      }
    });

  } catch (error) {
    console.error("Concerns exploration error:", error);
    return NextResponse.json(
      { error: "Failed to explore concerns", details: String(error) },
      { status: 500 }
    );
  }
}
