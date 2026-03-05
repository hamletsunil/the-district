import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "The Boom That Broke: Austin's Construction Story in 315,322 Permits";
export const size = { width: 1200, height: 600 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #1c1712 0%, #252019 50%, #1c1712 100%)",
          fontFamily: "Georgia, serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(191,87,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(191,87,0,0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(191,87,0,0.12) 0%, transparent 70%)",
            top: -80,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 20,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase" as const,
            color: "#a89e92",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#BF5700",
            }}
          />
          City Deep Dive
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <span
            style={{
              fontSize: 24,
              fontWeight: 400,
              color: "#f5efe6",
            }}
          >
            The Boom
          </span>
          <span
            style={{
              fontSize: 64,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              background: "linear-gradient(135deg, #BF5700, #f0944a)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            That Broke
          </span>
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 16,
            color: "#a89e92",
            maxWidth: 520,
            textAlign: "center" as const,
            lineHeight: 1.5,
            marginTop: 12,
          }}
        >
          Austin&rsquo;s construction story in 315,322 permits
        </p>

        {/* Stat bar */}
        <div
          style={{
            display: "flex",
            gap: 40,
            marginTop: 32,
            padding: "12px 28px",
            borderRadius: 10,
            background: "rgba(37, 32, 25, 0.8)",
            border: "1px solid rgba(232, 112, 64, 0.15)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: 20, fontWeight: 700, color: "#BF5700" }}>315,322</span>
            <span style={{ fontSize: 10, color: "#a89e92", textTransform: "uppercase" as const, letterSpacing: "0.1em" }}>Permits</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: 20, fontWeight: 700, color: "#ef4444" }}>23%</span>
            <span style={{ fontSize: 10, color: "#a89e92", textTransform: "uppercase" as const, letterSpacing: "0.1em" }}>Decline</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: 20, fontWeight: 700, color: "#BF5700" }}>9,455</span>
            <span style={{ fontSize: 10, color: "#a89e92", textTransform: "uppercase" as const, letterSpacing: "0.1em" }}>Meetings</span>
          </div>
        </div>

        {/* Byline */}
        <p
          style={{
            position: "absolute",
            bottom: 20,
            fontSize: 12,
            color: "#a89e92",
            opacity: 0.6,
          }}
        >
          The District | by Hamlet
        </p>
      </div>
    ),
    { ...size }
  );
}
