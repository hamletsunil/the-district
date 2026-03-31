import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "How Local Government Works — The District";
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
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: "14px",
            fontFamily: "system-ui, sans-serif",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase" as const,
            color: "#3b82f6",
            marginBottom: "20px",
          }}
        >
          From The District
        </div>

        <div
          style={{
            fontSize: "64px",
            fontWeight: 700,
            color: "#faf8f5",
            lineHeight: 1.05,
            textAlign: "center",
            letterSpacing: "-0.02em",
            maxWidth: "850px",
          }}
        >
          How Local Government Works
        </div>

        <div
          style={{
            fontSize: "20px",
            color: "#a8a8b8",
            marginTop: "16px",
            textAlign: "center",
            fontStyle: "italic",
            maxWidth: "650px",
          }}
        >
          14 chapters on the system that shapes your daily life
        </div>
      </div>
    ),
    { ...size }
  );
}
