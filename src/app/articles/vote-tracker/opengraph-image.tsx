import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "The Vote Tracker — Democracy analysis by The District";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#1e293b",
          backgroundImage:
            "radial-gradient(ellipse at 50% 60%, rgba(245, 158, 11, 0.1) 0%, transparent 60%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            display: "flex",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px 80px",
            flex: 1,
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "24px",
              padding: "8px 20px",
              borderRadius: "100px",
              border: "1px solid rgba(245, 158, 11, 0.4)",
              background: "rgba(245, 158, 11, 0.08)",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#f59e0b",
                display: "flex",
              }}
            />
            <span
              style={{
                fontSize: 14,
                color: "#f59e0b",
                letterSpacing: "0.08em",
                textTransform: "uppercase" as const,
                fontWeight: 600,
              }}
            >
              Democracy
            </span>
          </div>

          {/* Title line 1 */}
          <div
            style={{
              fontSize: 42,
              fontWeight: 400,
              color: "#f8fafc",
              letterSpacing: "-0.01em",
              marginBottom: "4px",
              display: "flex",
            }}
          >
            The Vote
          </div>

          {/* Title line 2 — accent color */}
          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              color: "#f59e0b",
              letterSpacing: "-0.03em",
              marginBottom: "20px",
              display: "flex",
            }}
          >
            Tracker
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 22,
              color: "#94a3b8",
              textAlign: "center",
              maxWidth: "700px",
              lineHeight: 1.5,
              display: "flex",
            }}
          >
            1,524 officials. 25,219 votes. Newark agrees on everything.
            Princeton fights about everything. Why?
          </div>

          {/* Accent line */}
          <div
            style={{
              width: "80px",
              height: "3px",
              background: "#f59e0b",
              marginTop: "32px",
              borderRadius: "2px",
              display: "flex",
            }}
          />

          {/* Byline */}
          <div
            style={{
              fontSize: 15,
              color: "#475569",
              marginTop: "20px",
              display: "flex",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <span style={{ display: "flex" }}>The District</span>
            <span style={{ display: "flex", color: "#334155" }}>|</span>
            <span style={{ display: "flex" }}>by Hamlet</span>
          </div>
        </div>

        {/* Ballot / gavel motif at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "160px",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            opacity: 0.2,
          }}
        >
          <svg
            width="1200"
            height="160"
            viewBox="0 0 1200 160"
            style={{ display: "flex" }}
          >
            {/* Voting bar chart */}
            <rect x="60" y="80" width="40" height="80" rx="3" fill="#f59e0b" opacity="0.6" />
            <rect x="120" y="40" width="40" height="120" rx="3" fill="#fbbf24" opacity="0.4" />
            <rect x="180" y="100" width="40" height="60" rx="3" fill="#f59e0b" opacity="0.3" />

            <rect x="320" y="30" width="40" height="130" rx="3" fill="#fbbf24" opacity="0.5" />
            <rect x="380" y="60" width="40" height="100" rx="3" fill="#f59e0b" opacity="0.4" />
            <rect x="440" y="90" width="40" height="70" rx="3" fill="#fbbf24" opacity="0.3" />

            <rect x="580" y="50" width="40" height="110" rx="3" fill="#f59e0b" opacity="0.5" />
            <rect x="640" y="20" width="40" height="140" rx="3" fill="#fbbf24" opacity="0.4" />
            <rect x="700" y="70" width="40" height="90" rx="3" fill="#f59e0b" opacity="0.3" />

            <rect x="840" y="45" width="40" height="115" rx="3" fill="#fbbf24" opacity="0.5" />
            <rect x="900" y="75" width="40" height="85" rx="3" fill="#f59e0b" opacity="0.4" />
            <rect x="960" y="55" width="40" height="105" rx="3" fill="#fbbf24" opacity="0.3" />

            <rect x="1100" y="35" width="40" height="125" rx="3" fill="#f59e0b" opacity="0.5" />

            {/* Data dots */}
            <circle cx="270" cy="15" r="3" fill="#f59e0b" opacity="0.5" />
            <circle cx="530" cy="10" r="2.5" fill="#fbbf24" opacity="0.4" />
            <circle cx="800" cy="12" r="2" fill="#f59e0b" opacity="0.3" />
            <circle cx="1060" cy="8" r="2" fill="#fbbf24" opacity="0.35" />
          </svg>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
