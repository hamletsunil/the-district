import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "The Temperature Check — Civic health analysis by The District";
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
          backgroundColor: "#292524",
          backgroundImage:
            "radial-gradient(ellipse at 50% 60%, rgba(239, 68, 68, 0.1) 0%, transparent 60%)",
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
              border: "1px solid rgba(239, 68, 68, 0.4)",
              background: "rgba(239, 68, 68, 0.08)",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#ef4444",
                display: "flex",
              }}
            />
            <span
              style={{
                fontSize: 14,
                color: "#ef4444",
                letterSpacing: "0.08em",
                textTransform: "uppercase" as const,
                fontWeight: 600,
              }}
            >
              Civic Health
            </span>
          </div>

          {/* Title line 1 */}
          <div
            style={{
              fontSize: 42,
              fontWeight: 400,
              color: "#fafaf9",
              letterSpacing: "-0.01em",
              marginBottom: "4px",
              display: "flex",
            }}
          >
            The Temperature
          </div>

          {/* Title line 2 — accent color */}
          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              color: "#ef4444",
              letterSpacing: "-0.03em",
              marginBottom: "20px",
              display: "flex",
            }}
          >
            Check
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 22,
              color: "#a8a29e",
              textAlign: "center",
              maxWidth: "700px",
              lineHeight: 1.5,
              display: "flex",
            }}
          >
            438 cities. Millions of public comments. Where local debates run
            hot and where consensus reigns.
          </div>

          {/* Accent line */}
          <div
            style={{
              width: "80px",
              height: "3px",
              background: "#ef4444",
              marginTop: "32px",
              borderRadius: "2px",
              display: "flex",
            }}
          />

          {/* Byline */}
          <div
            style={{
              fontSize: 15,
              color: "#78716c",
              marginTop: "20px",
              display: "flex",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <span style={{ display: "flex" }}>The District</span>
            <span style={{ display: "flex", color: "#57534e" }}>|</span>
            <span style={{ display: "flex" }}>by Hamlet</span>
          </div>
        </div>

        {/* Heat wave / thermometer motif at bottom */}
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
            {/* Heat waves */}
            <path
              d="M0 120 Q60 100 120 120 Q180 140 240 120 Q300 100 360 120 Q420 140 480 120 Q540 100 600 120 Q660 140 720 120 Q780 100 840 120 Q900 140 960 120 Q1020 100 1080 120 Q1140 140 1200 120 L1200 160 L0 160Z"
              fill="#ef4444"
              opacity="0.25"
            />
            <path
              d="M0 135 Q60 120 120 135 Q180 150 240 135 Q300 120 360 135 Q420 150 480 135 Q540 120 600 135 Q660 150 720 135 Q780 120 840 135 Q900 150 960 135 Q1020 120 1080 135 Q1140 150 1200 135 L1200 160 L0 160Z"
              fill="#f97316"
              opacity="0.2"
            />
            {/* Thermometer bars */}
            <rect x="100" y="40" width="12" height="80" rx="6" fill="#44403c" />
            <rect x="100" y="70" width="12" height="50" rx="6" fill="#ef4444" opacity="0.6" />
            <rect x="300" y="20" width="12" height="100" rx="6" fill="#44403c" />
            <rect x="300" y="60" width="12" height="60" rx="6" fill="#ef4444" opacity="0.8" />
            <rect x="500" y="50" width="12" height="70" rx="6" fill="#44403c" />
            <rect x="500" y="80" width="12" height="40" rx="6" fill="#f97316" opacity="0.5" />
            <rect x="700" y="15" width="12" height="105" rx="6" fill="#44403c" />
            <rect x="700" y="30" width="12" height="90" rx="6" fill="#ef4444" opacity="0.9" />
            <rect x="900" y="45" width="12" height="75" rx="6" fill="#44403c" />
            <rect x="900" y="75" width="12" height="45" rx="6" fill="#f97316" opacity="0.6" />
            <rect x="1100" y="30" width="12" height="90" rx="6" fill="#44403c" />
            <rect x="1100" y="55" width="12" height="65" rx="6" fill="#ef4444" opacity="0.7" />
            {/* Sparks */}
            <circle cx="200" cy="15" r="3" fill="#ef4444" opacity="0.5" />
            <circle cx="600" cy="10" r="2.5" fill="#f97316" opacity="0.4" />
            <circle cx="1000" cy="8" r="2" fill="#ef4444" opacity="0.3" />
          </svg>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
