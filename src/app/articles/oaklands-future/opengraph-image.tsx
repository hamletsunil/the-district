import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Five Futures for Oakland — Interactive policy simulation by The District";
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
          backgroundColor: "#1a1714",
          backgroundImage:
            "radial-gradient(ellipse at 50% 60%, rgba(16, 153, 127, 0.15) 0%, transparent 60%)",
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
              border: "1px solid rgba(16, 153, 127, 0.4)",
              background: "rgba(16, 153, 127, 0.1)",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#14b89a",
                display: "flex",
              }}
            />
            <span
              style={{
                fontSize: 14,
                color: "#14b89a",
                letterSpacing: "0.08em",
                textTransform: "uppercase" as const,
                fontWeight: 600,
              }}
            >
              Interactive Simulation
            </span>
          </div>

          {/* Title line 1 */}
          <div
            style={{
              fontSize: 42,
              fontWeight: 400,
              color: "#f5f0e8",
              letterSpacing: "-0.01em",
              marginBottom: "4px",
              display: "flex",
            }}
          >
            Five Futures for
          </div>

          {/* Title line 2 — accent color */}
          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              color: "#14b89a",
              letterSpacing: "-0.03em",
              marginBottom: "20px",
              display: "flex",
            }}
          >
            Oakland
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 22,
              color: "#a39e96",
              textAlign: "center",
              maxWidth: "700px",
              lineHeight: 1.5,
              display: "flex",
            }}
          >
            Five policy paths. 113 census tracts. A decade of trade-offs.
            Press play and watch the future compound.
          </div>

          {/* Accent line */}
          <div
            style={{
              width: "80px",
              height: "3px",
              background: "#10997F",
              marginTop: "32px",
              borderRadius: "2px",
              display: "flex",
            }}
          />

          {/* Byline */}
          <div
            style={{
              fontSize: 15,
              color: "#6b6560",
              marginTop: "20px",
              display: "flex",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <span style={{ display: "flex" }}>The District</span>
            <span style={{ display: "flex", color: "#3d3a36" }}>|</span>
            <span style={{ display: "flex" }}>by Hamlet</span>
          </div>
        </div>

        {/* Simplified skyline silhouette at bottom */}
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
            opacity: 0.25,
          }}
        >
          <svg
            width="1200"
            height="160"
            viewBox="0 0 1200 160"
            style={{ display: "flex" }}
          >
            {/* Hills */}
            <path
              d="M0 80 Q120 20 300 50 Q420 15 600 40 Q780 10 960 35 Q1080 5 1200 30 L1200 160 L0 160Z"
              fill="#10997F"
              opacity="0.3"
            />
            {/* Crane 1 */}
            <rect x="100" y="30" width="8" height="130" fill="#221f1b" />
            <line
              x1="104"
              y1="30"
              x2="180"
              y2="10"
              stroke="#10997F"
              strokeWidth="3"
              opacity="0.6"
            />
            <line
              x1="104"
              y1="30"
              x2="60"
              y2="60"
              stroke="#10997F"
              strokeWidth="2"
              opacity="0.4"
            />
            {/* Crane 2 */}
            <rect x="220" y="50" width="6" height="110" fill="#221f1b" />
            <line
              x1="223"
              y1="50"
              x2="290"
              y2="35"
              stroke="#10997F"
              strokeWidth="2"
              opacity="0.4"
            />
            {/* Tribune Tower */}
            <rect x="400" y="15" width="35" height="145" rx="2" fill="#221f1b" />
            <rect x="395" y="0" width="6" height="20" fill="#1a1714" />
            <rect x="410" y="30" width="8" height="10" fill="#10997F" opacity="0.2" />
            <rect x="410" y="50" width="8" height="10" fill="#10997F" opacity="0.15" />
            <rect x="410" y="70" width="8" height="10" fill="#10997F" opacity="0.1" />
            {/* Building 2 */}
            <rect x="460" y="40" width="40" height="120" rx="2" fill="#1a1714" />
            {/* Building 3 */}
            <rect x="520" y="60" width="30" height="100" rx="2" fill="#221f1b" opacity="0.7" />
            {/* Lake Merritt */}
            <ellipse cx="750" cy="120" rx="80" ry="25" fill="#14b89a" opacity="0.08" />
            {/* Oak tree */}
            <rect x="900" y="90" width="12" height="50" fill="#0D6E5B" />
            <circle cx="906" cy="60" r="40" fill="#10997F" opacity="0.5" />
            <circle cx="885" cy="75" r="25" fill="#0D6E5B" opacity="0.5" />
            <circle cx="930" cy="72" r="22" fill="#14b89a" opacity="0.4" />
            {/* Data dots */}
            <circle cx="350" cy="8" r="3" fill="#14b89a" opacity="0.5" />
            <circle cx="650" cy="15" r="2.5" fill="#10997F" opacity="0.4" />
            <circle cx="1050" cy="25" r="2" fill="#14b89a" opacity="0.3" />
          </svg>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
