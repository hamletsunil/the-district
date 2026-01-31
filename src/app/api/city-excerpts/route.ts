/**
 * Get full transcript excerpts for a specific city
 */

import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  const state = searchParams.get('state');

  if (!city || !state) {
    return NextResponse.json({ error: "city and state params required" }, { status: 400 });
  }

  try {
    const excerpts = await db.$queryRaw<Array<{
      text: string;
      speaker: string | null;
      meeting_title: string;
      meeting_date: Date;
      start_time: number;
      body_type: string;
    }>>`
      SELECT
        ts.text,
        ts.speaker,
        m.title as meeting_title,
        m."meetingDate" as meeting_date,
        ts."startTime" as start_time,
        gb."bodyType" as body_type
      FROM "TranscriptSegment" ts
      JOIN "Meeting" m ON ts."meetingId" = m.id
      JOIN "GovernmentBody" gb ON m."governmentBodyId" = gb.id
      JOIN "City" c ON gb."cityId" = c.id
      JOIN "State" s ON c."stateId" = s.id
      WHERE c.name = ${city}
        AND s.abbreviation = ${state}
        AND ts.text ILIKE '%data center%'
        AND LENGTH(ts.text) > 50
      ORDER BY m."meetingDate" DESC
      LIMIT 50
    `;

    return NextResponse.json({
      city,
      state,
      count: excerpts.length,
      excerpts
    });

  } catch (error) {
    console.error("City excerpt error:", error);
    return NextResponse.json(
      { error: "Failed to get excerpts", details: String(error) },
      { status: 500 }
    );
  }
}
