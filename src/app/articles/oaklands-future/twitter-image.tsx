import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Five Futures for Oakland — Interactive policy simulation by The District";
export const size = {
  width: 1200,
  height: 600,
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
            padding: "50px 80px",
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
              marginBottom: "20px",
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
              fontSize: 38,
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
              fontSize: 72,
              fontWeight: 700,
              color: "#14b89a",
              letterSpacing: "-0.03em",
              marginBottom: "16px",
              display: "flex",
            }}
          >
            Oakland
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 20,
              color: "#a39e96",
              textAlign: "center",
              maxWidth: "650px",
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
              marginTop: "28px",
              borderRadius: "2px",
              display: "flex",
            }}
          />

          {/* Byline */}
          <div
            style={{
              fontSize: 15,
              color: "#6b6560",
              marginTop: "16px",
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
            height: "140px",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            opacity: 0.25,
          }}
        >
          <svg
            width="1200"
            height="140"
            viewBox="0 0 1200 140"
            style={{ display: "flex" }}
          >
            {/* Hills */}
            <path
              d="M0 70 Q120 15 300 45 Q420 10 600 35 Q780 5 960 30 Q1080 0 1200 25 L1200 140 L0 140Z"
              fill="#10997F"
              opacity="0.3"
            />
            {/* Crane 1 */}
            <rect x="100" y="25" width="8" height="115" fill="#221f1b" />
            <line
              x1="104"
              y1="25"
              x2="180"
              y2="8"
              stroke="#10997F"
              strokeWidth="3"
              opacity="0.6"
            />
            {/* Crane 2 */}
            <rect x="220" y="42" width="6" height="98" fill="#221f1b" />
            {/* Tribune Tower */}
            <rect x="400" y="10" width="35" height="130" rx="2" fill="#221f1b" />
            <rect x="410" y="25" width="8" height="10" fill="#10997F" opacity="0.2" />
            <rect x="410" y="45" width="8" height="10" fill="#10997F" opacity="0.15" />
            {/* Building 2 */}
            <rect x="460" y="35" width="40" height="105" rx="2" fill="#1a1714" />
            {/* Building 3 */}
            <rect x="520" y="52" width="30" height="88" rx="2" fill="#221f1b" opacity="0.7" />
            {/* Lake Merritt */}
            <ellipse cx="750" cy="105" rx="80" ry="22" fill="#14b89a" opacity="0.08" />
            {/* Oak tree */}
            <rect x="900" y="80" width="12" height="45" fill="#0D6E5B" />
            <circle cx="906" cy="52" r="35" fill="#10997F" opacity="0.5" />
            <circle cx="885" cy="65" r="22" fill="#0D6E5B" opacity="0.5" />
            <circle cx="930" cy="62" r="20" fill="#14b89a" opacity="0.4" />
            {/* Data dots */}
            <circle cx="350" cy="5" r="3" fill="#14b89a" opacity="0.5" />
            <circle cx="650" cy="12" r="2.5" fill="#10997F" opacity="0.4" />
          </svg>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
