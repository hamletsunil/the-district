import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "How Local Government Works — The District";
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
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)",
          position: "relative",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "14px",
            fontFamily: "system-ui, sans-serif",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase" as const,
            color: "#3b82f6",
            marginBottom: "24px",
          }}
        >
          From The District
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: 700,
            color: "#faf8f5",
            lineHeight: 1.05,
            textAlign: "center",
            letterSpacing: "-0.02em",
            maxWidth: "900px",
          }}
        >
          How Local Government Works
        </div>

        {/* Dek */}
        <div
          style={{
            fontSize: "22px",
            color: "#a8a8b8",
            marginTop: "20px",
            textAlign: "center",
            fontStyle: "italic",
            maxWidth: "700px",
            lineHeight: 1.5,
          }}
        >
          90,837 jurisdictions. $2.3 trillion. The system closest to your daily life.
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: "48px",
            marginTop: "40px",
          }}
        >
          {[
            { value: "14", label: "Chapters" },
            { value: "500K+", label: "Officials" },
            { value: "$2.3T", label: "Spending" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: "32px", fontWeight: 700, color: "#3b82f6" }}>
                {stat.value}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  fontFamily: "system-ui, sans-serif",
                  fontWeight: 500,
                  color: "#a8a8b8",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase" as const,
                  marginTop: "4px",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
