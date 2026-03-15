import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Three Cities, One Fire Zone — What 1,700+ meetings reveal about Lamorinda";
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
          backgroundColor: "#0f1923",
          backgroundImage:
            "radial-gradient(ellipse at 50% 60%, rgba(78, 205, 196, 0.12) 0%, transparent 60%)",
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
              border: "1px solid rgba(78, 205, 196, 0.4)",
              background: "rgba(78, 205, 196, 0.1)",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#4ECDC4",
                display: "flex",
              }}
            />
            <span
              style={{
                fontSize: 14,
                color: "#4ECDC4",
                letterSpacing: "0.08em",
                textTransform: "uppercase" as const,
                fontWeight: 600,
              }}
            >
              City Deep Dive
            </span>
          </div>

          {/* Title line 1 */}
          <div
            style={{
              fontSize: 42,
              fontWeight: 400,
              color: "#e8ecf0",
              letterSpacing: "-0.01em",
              marginBottom: "4px",
              display: "flex",
            }}
          >
            Three Cities,
          </div>

          {/* Title line 2 */}
          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              color: "#4ECDC4",
              letterSpacing: "-0.03em",
              marginBottom: "20px",
              display: "flex",
            }}
          >
            One Fire Zone
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 22,
              color: "#8b99a8",
              textAlign: "center",
              maxWidth: "700px",
              lineHeight: 1.5,
              display: "flex",
            }}
          >
            What 1,700+ government meetings reveal about Lafayette, Orinda, and
            Moraga.
          </div>

          {/* Accent line */}
          <div
            style={{
              width: "80px",
              height: "3px",
              background: "#4ECDC4",
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

        {/* Golden hills silhouette at bottom */}
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
            {/* Rolling hills */}
            <path
              d="M0 90 Q100 40 200 70 Q350 20 500 55 Q650 15 800 45 Q950 10 1100 35 Q1150 25 1200 40 L1200 160 L0 160Z"
              fill="#4ECDC4"
              opacity="0.3"
            />
            <path
              d="M0 110 Q150 60 300 85 Q450 50 600 75 Q750 40 900 65 Q1050 35 1200 55 L1200 160 L0 160Z"
              fill="#7B9E6B"
              opacity="0.2"
            />
            {/* Oak trees */}
            <rect x="180" y="85" width="8" height="35" fill="#2a4a4a" />
            <circle cx="184" cy="65" r="25" fill="#7B9E6B" opacity="0.5" />
            <rect x="600" y="70" width="10" height="40" fill="#2a4a4a" />
            <circle cx="605" cy="48" r="30" fill="#7B9E6B" opacity="0.4" />
            <circle cx="585" cy="60" r="20" fill="#6B8E5B" opacity="0.4" />
            <rect x="950" y="60" width="8" height="35" fill="#2a4a4a" />
            <circle cx="954" cy="40" r="25" fill="#7B9E6B" opacity="0.45" />
            {/* City labels */}
            <text
              x="180"
              y="140"
              fill="#4ECDC4"
              opacity="0.4"
              fontSize="14"
              fontWeight="600"
            >
              LAFAYETTE
            </text>
            <text
              x="520"
              y="140"
              fill="#4ECDC4"
              opacity="0.4"
              fontSize="14"
              fontWeight="600"
            >
              ORINDA
            </text>
            <text
              x="880"
              y="140"
              fill="#4ECDC4"
              opacity="0.4"
              fontSize="14"
              fontWeight="600"
            >
              MORAGA
            </text>
          </svg>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
