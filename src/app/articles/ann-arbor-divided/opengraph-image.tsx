import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "The City That Won\u2019t Agree \u2014 Ann Arbor has the highest council dissent rate in America";
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
          background: "linear-gradient(135deg, #0c1a2e 0%, #112240 50%, #0c1a2e 100%)",
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
              "linear-gradient(rgba(232,185,49,1) 1px, transparent 1px), linear-gradient(90deg, rgba(232,185,49,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Maize accent glow */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            display: "flex",
            background: "radial-gradient(circle, rgba(232,185,49,0.15) 0%, transparent 70%)",
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
              background: "#e8b931",
              display: "flex",
            }}
          />
          <span
            style={{
              color: "#8e99a8",
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
            The City That
          </span>
          <span
            style={{
              fontSize: "72px",
              fontWeight: 600,
              background: "linear-gradient(135deg, #e8b931, #d4a04a)",
              backgroundClip: "text",
              color: "transparent",
              lineHeight: 1.1,
              textAlign: "center",
            }}
          >
            Won&apos;t Agree
          </span>
        </div>

        {/* Subtitle */}
        <p
          style={{
            color: "#8e99a8",
            fontSize: "22px",
            maxWidth: "700px",
            textAlign: "center",
            lineHeight: 1.5,
            marginTop: "24px",
          }}
        >
          142 cities. 8.1 million votes. One massive outlier.
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
            <span style={{ color: "#e8b931", fontSize: "36px", fontWeight: 700 }}>18.19%</span>
            <span
              style={{
                color: "#8e99a8",
                fontSize: "13px",
                fontFamily: "system-ui, sans-serif",
                textTransform: "uppercase" as const,
                letterSpacing: "0.08em",
              }}
            >
              Ann Arbor Dissent
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ color: "#8e99a8", fontSize: "36px", fontWeight: 700 }}>1.59%</span>
            <span
              style={{
                color: "#8e99a8",
                fontSize: "13px",
                fontFamily: "system-ui, sans-serif",
                textTransform: "uppercase" as const,
                letterSpacing: "0.08em",
              }}
            >
              National Average
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
