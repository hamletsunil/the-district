import { NextRequest, NextResponse } from "next/server";

/**
 * Newsletter Subscription API
 *
 * Handles email signups via Beehiiv API.
 * Keeps API key server-side for security.
 */

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email required" },
        { status: 400 }
      );
    }

    const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY;
    const BEEHIIV_PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID;

    if (!BEEHIIV_API_KEY || !BEEHIIV_PUBLICATION_ID) {
      console.error("Missing Beehiiv credentials in environment variables");
      return NextResponse.json(
        { error: "Newsletter service not configured" },
        { status: 500 }
      );
    }

    // Subscribe via Beehiiv API
    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${BEEHIIV_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: true,
          utm_source: "the-district-website",
          utm_medium: "organic",
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Beehiiv API error:", errorData);

      // Handle already subscribed case gracefully
      if (response.status === 409 || errorData.message?.includes("already")) {
        return NextResponse.json(
          { success: true, message: "You're already subscribed!" },
          { status: 200 }
        );
      }

      return NextResponse.json(
        { error: "Failed to subscribe. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Welcome to The District!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
