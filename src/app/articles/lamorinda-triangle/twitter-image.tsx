import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Three Cities, One Fire Zone — What 1,700+ meetings reveal about Lamorinda";
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
          backgroundColor: "#0f1923",
          backgroundImage:
            "radial-gradient(ellipse at 50% 50%, rgba(78, 205, 196, 0.12) 0%, transparent 60%)",
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
              padding: "6px 16px",
              borderRadius: "100px",
              border: "1px solid rgba(78, 205, 196, 0.4)",
              background: "rgba(78, 205, 196, 0.1)",
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#4ECDC4",
                display: "flex",
              }}
            />
            <span
              style={{
                fontSize: 12,
                color: "#4ECDC4",
                letterSpacing: "0.08em",
                textTransform: "uppercase" as const,
                fontWeight: 600,
              }}
            >
              City Deep Dive
            </span>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 38,
              fontWeight: 400,
              color: "#e8ecf0",
              marginBottom: "4px",
              display: "flex",
            }}
          >
            Three Cities,
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#4ECDC4",
              letterSpacing: "-0.03em",
              marginBottom: "16px",
              display: "flex",
            }}
          >
            One Fire Zone
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 20,
              color: "#8b99a8",
              textAlign: "center",
              maxWidth: "650px",
              lineHeight: 1.5,
              display: "flex",
            }}
          >
            What 1,700+ government meetings reveal about Lafayette, Orinda, and
            Moraga.
          </div>

          {/* Byline */}
          <div
            style={{
              fontSize: 14,
              color: "#6b6560",
              marginTop: "24px",
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
      </div>
    ),
    {
      ...size,
    }
  );
}
