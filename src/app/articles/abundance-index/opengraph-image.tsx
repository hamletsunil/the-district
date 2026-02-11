import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "The Abundance Index — Housing analysis by The District";
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
          backgroundColor: "#faf7f2",
          backgroundImage:
            "radial-gradient(ellipse at 50% 60%, rgba(22, 101, 52, 0.06) 0%, transparent 60%)",
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
              "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
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
              border: "1px solid rgba(22, 101, 52, 0.3)",
              background: "rgba(22, 101, 52, 0.06)",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#166534",
                display: "flex",
              }}
            />
            <span
              style={{
                fontSize: 14,
                color: "#166534",
                letterSpacing: "0.08em",
                textTransform: "uppercase" as const,
                fontWeight: 600,
              }}
            >
              Housing Analysis
            </span>
          </div>

          {/* Title line 1 */}
          <div
            style={{
              fontSize: 42,
              fontWeight: 400,
              color: "#1e293b",
              letterSpacing: "-0.01em",
              marginBottom: "4px",
              display: "flex",
            }}
          >
            The Abundance
          </div>

          {/* Title line 2 — accent color */}
          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              color: "#166534",
              letterSpacing: "-0.03em",
              marginBottom: "20px",
              display: "flex",
            }}
          >
            Index
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 22,
              color: "#64748b",
              textAlign: "center",
              maxWidth: "700px",
              lineHeight: 1.5,
              display: "flex",
            }}
          >
            84 cities ranked YIMBY to NIMBY. Mapping America&apos;s most
            welcoming — and resistant — cities for development.
          </div>

          {/* Accent line */}
          <div
            style={{
              width: "80px",
              height: "3px",
              background: "#166534",
              marginTop: "32px",
              borderRadius: "2px",
              display: "flex",
            }}
          />

          {/* Byline */}
          <div
            style={{
              fontSize: 15,
              color: "#94a3b8",
              marginTop: "20px",
              display: "flex",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <span style={{ display: "flex" }}>The District</span>
            <span style={{ display: "flex", color: "#cbd5e1" }}>|</span>
            <span style={{ display: "flex" }}>by Hamlet</span>
          </div>
        </div>

        {/* Houses / buildings silhouette at bottom */}
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
            opacity: 0.15,
          }}
        >
          <svg
            width="1200"
            height="160"
            viewBox="0 0 1200 160"
            style={{ display: "flex" }}
          >
            {/* Rolling landscape */}
            <path
              d="M0 100 Q150 60 300 80 Q450 50 600 70 Q750 40 900 65 Q1050 45 1200 55 L1200 160 L0 160Z"
              fill="#166534"
              opacity="0.3"
            />
            {/* Houses */}
            <rect x="100" y="60" width="40" height="100" rx="2" fill="#166534" />
            <polygon points="100,60 120,35 140,60" fill="#22c55e" opacity="0.5" />
            <rect x="250" y="45" width="50" height="115" rx="2" fill="#15803d" />
            <polygon points="250,45 275,15 300,45" fill="#22c55e" opacity="0.4" />
            <rect x="450" y="55" width="35" height="105" rx="2" fill="#166534" />
            <polygon points="450,55 467,30 485,55" fill="#22c55e" opacity="0.5" />
            <rect x="600" y="40" width="55" height="120" rx="2" fill="#15803d" />
            <polygon points="600,40 627,10 655,40" fill="#166534" opacity="0.4" />
            <rect x="800" y="50" width="40" height="110" rx="2" fill="#166534" />
            <polygon points="800,50 820,25 840,50" fill="#22c55e" opacity="0.5" />
            <rect x="1000" y="42" width="45" height="118" rx="2" fill="#15803d" />
            <polygon points="1000,42 1022,12 1045,42" fill="#22c55e" opacity="0.4" />
            {/* Data dots */}
            <circle cx="180" cy="30" r="3" fill="#22c55e" opacity="0.5" />
            <circle cx="520" cy="20" r="2.5" fill="#166534" opacity="0.4" />
            <circle cx="900" cy="15" r="2" fill="#22c55e" opacity="0.3" />
          </svg>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
