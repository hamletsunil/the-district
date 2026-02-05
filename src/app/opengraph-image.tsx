import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "The District - Visual journalism about local government";
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
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, #1a1a1a 0%, transparent 50%), radial-gradient(circle at 75% 75%, #1a1a1a 0%, transparent 50%)",
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
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
            padding: "60px",
          }}
        >
          {/* Logo mark */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "40px",
            }}
          >
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              style={{ display: "flex" }}
            >
              <rect x="4" y="4" width="3" height="16" fill="#f59e0b" />
              <rect x="7" y="4" width="9" height="3" fill="#f59e0b" />
              <rect x="7" y="17" width="9" height="3" fill="#f59e0b" />
              <rect x="16" y="7" width="3" height="10" fill="#f59e0b" />
            </svg>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.02em",
              marginBottom: "20px",
              display: "flex",
            }}
          >
            The District
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 28,
              color: "#a3a3a3",
              textAlign: "center",
              maxWidth: "800px",
              lineHeight: 1.4,
              display: "flex",
            }}
          >
            Visual journalism about what happens in 3,000+ city halls across
            America
          </div>

          {/* Accent line */}
          <div
            style={{
              width: "120px",
              height: "4px",
              backgroundColor: "#f59e0b",
              marginTop: "40px",
              borderRadius: "2px",
              display: "flex",
            }}
          />

          {/* By Hamlet */}
          <div
            style={{
              fontSize: 18,
              color: "#737373",
              marginTop: "30px",
              display: "flex",
            }}
          >
            A publication by Hamlet
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
