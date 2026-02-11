import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "The Data Center Gold Rush — Data analysis by The District";
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
          backgroundColor: "#0a1628",
          backgroundImage:
            "radial-gradient(ellipse at 50% 60%, rgba(59, 130, 246, 0.12) 0%, transparent 60%)",
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
              border: "1px solid rgba(59, 130, 246, 0.4)",
              background: "rgba(59, 130, 246, 0.1)",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#3b82f6",
                display: "flex",
              }}
            />
            <span
              style={{
                fontSize: 14,
                color: "#3b82f6",
                letterSpacing: "0.08em",
                textTransform: "uppercase" as const,
                fontWeight: 600,
              }}
            >
              Data Analysis
            </span>
          </div>

          {/* Title line 1 */}
          <div
            style={{
              fontSize: 38,
              fontWeight: 400,
              color: "#f8fafc",
              letterSpacing: "-0.01em",
              marginBottom: "4px",
              display: "flex",
            }}
          >
            The Data Center
          </div>

          {/* Title line 2 — accent color */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#3b82f6",
              letterSpacing: "-0.03em",
              marginBottom: "16px",
              display: "flex",
            }}
          >
            Gold Rush
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 20,
              color: "#94a3b8",
              textAlign: "center",
              maxWidth: "650px",
              lineHeight: 1.5,
              display: "flex",
            }}
          >
            156 cities. 5,007 transcript mentions. Inside the local battles
            over America&apos;s AI infrastructure.
          </div>

          {/* Accent line */}
          <div
            style={{
              width: "80px",
              height: "3px",
              background: "#3b82f6",
              marginTop: "28px",
              borderRadius: "2px",
              display: "flex",
            }}
          />

          {/* Byline */}
          <div
            style={{
              fontSize: 15,
              color: "#475569",
              marginTop: "16px",
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

        {/* Server rack silhouette at bottom */}
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
            opacity: 0.2,
          }}
        >
          <svg
            width="1200"
            height="140"
            viewBox="0 0 1200 140"
            style={{ display: "flex" }}
          >
            <rect x="80" y="15" width="60" height="125" rx="3" fill="#1e3a5f" />
            <rect x="90" y="30" width="40" height="6" rx="1" fill="#3b82f6" opacity="0.3" />
            <rect x="90" y="45" width="40" height="6" rx="1" fill="#3b82f6" opacity="0.25" />
            <rect x="350" y="5" width="60" height="135" rx="3" fill="#1e3a5f" />
            <rect x="360" y="20" width="40" height="6" rx="1" fill="#3b82f6" opacity="0.3" />
            <rect x="360" y="35" width="40" height="6" rx="1" fill="#3b82f6" opacity="0.25" />
            <rect x="550" y="20" width="60" height="120" rx="3" fill="#152a45" />
            <rect x="560" y="35" width="40" height="6" rx="1" fill="#6366f1" opacity="0.2" />
            <rect x="750" y="10" width="60" height="130" rx="3" fill="#1e3a5f" />
            <rect x="760" y="25" width="40" height="6" rx="1" fill="#3b82f6" opacity="0.25" />
            <rect x="1050" y="18" width="60" height="122" rx="3" fill="#152a45" />
            <rect x="1060" y="33" width="40" height="6" rx="1" fill="#3b82f6" opacity="0.2" />
            <circle cx="250" cy="5" r="3" fill="#3b82f6" opacity="0.5" />
            <circle cx="650" cy="10" r="2.5" fill="#6366f1" opacity="0.4" />
          </svg>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
