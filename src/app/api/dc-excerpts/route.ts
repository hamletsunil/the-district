/**
 * Fast Data Center Excerpts
 *
 * Get longer, more substantive quotes about data centers
 */

import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('keyword') || 'data center';

  try {
    // Simple query - just get excerpts with this keyword
    const excerpts = await db.$queryRaw<Array<{
      text: string;
      speaker: string | null;
      meeting_title: string;
      meeting_date: Date;
      city_name: string | null;
      state_abbr: string | null;
      start_time: number;
    }>>`
      SELECT
        ts.text,
        ts.speaker,
        m.title as meeting_title,
        m."meetingDate" as meeting_date,
        c.name as city_name,
        s.abbreviation as state_abbr,
        ts."startTime" as start_time
      FROM "TranscriptSegment" ts
      JOIN "Meeting" m ON ts."meetingId" = m.id
      JOIN "GovernmentBody" gb ON m."governmentBodyId" = gb.id
      LEFT JOIN "City" c ON gb."cityId" = c.id
      LEFT JOIN "State" s ON c."stateId" = s.id
      WHERE ts.text ILIKE ${'%' + keyword + '%'}
        AND LENGTH(ts.text) > 80
      ORDER BY m."meetingDate" DESC
      LIMIT 100
    `;

    return NextResponse.json({
      keyword,
      count: excerpts.length,
      excerpts
    });

  } catch (error) {
    console.error("Excerpt query error:", error);
    return NextResponse.json(
      { error: "Failed to get excerpts", details: String(error) },
      { status: 500 }
    );
  }
}
