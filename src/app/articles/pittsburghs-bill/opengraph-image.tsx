import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "The Bill Comes Due \u2014 Pittsburgh\u2019s council agrees on 97% of everything. The 3% defines the city\u2019s future.";
export const size = { width: 1200, height: 630 };
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
          background: "linear-gradient(135deg, #0a0a0a 0%, #141414 50%, #0a0a0a 100%)",
          fontFamily: "Georgia, serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            opacity: 0.06,
            backgroundImage:
              "linear-gradient(rgba(255,184,28,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,184,28,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Gold accent glow */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            display: "flex",
            background: "radial-gradient(circle, rgba(255,184,28,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#FFB81C",
              display: "flex",
            }}
          />
          <span
            style={{
              color: "#8a8a8a",
              fontSize: "18px",
              fontFamily: "system-ui, sans-serif",
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
            }}
          >
            From The District
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              fontSize: "72px",
              fontWeight: 600,
              color: "#f2ede4",
              lineHeight: 1.1,
              textAlign: "center",
            }}
          >
            The Bill
          </span>
          <span
            style={{
              fontSize: "72px",
              fontWeight: 600,
              background: "linear-gradient(135deg, #FFB81C, #C4960F)",
              backgroundClip: "text",
              color: "transparent",
              lineHeight: 1.1,
              textAlign: "center",
            }}
          >
            Comes Due
          </span>
        </div>

        {/* Subtitle */}
        <p
          style={{
            color: "#8a8a8a",
            fontSize: "22px",
            maxWidth: "700px",
            textAlign: "center",
            lineHeight: 1.5,
            marginTop: "24px",
          }}
        >
          108,394 votes. 25 years. One city&apos;s reckoning.
        </p>

        {/* Stat bar */}
        <div
          style={{
            display: "flex",
            gap: "48px",
            marginTop: "40px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ color: "#FFB81C", fontSize: "36px", fontWeight: 700 }}>97.3%</span>
            <span
              style={{
                color: "#8a8a8a",
                fontSize: "13px",
                fontFamily: "system-ui, sans-serif",
                textTransform: "uppercase" as const,
                letterSpacing: "0.08em",
              }}
            >
              Agreement Rate
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ color: "#8a8a8a", fontSize: "36px", fontWeight: 700 }}>1,092</span>
            <span
              style={{
                color: "#8a8a8a",
                fontSize: "13px",
                fontFamily: "system-ui, sans-serif",
                textTransform: "uppercase" as const,
                letterSpacing: "0.08em",
              }}
            >
              Split Decisions
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
