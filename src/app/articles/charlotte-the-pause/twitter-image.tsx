import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Eleven Theories of a Highway — Charlotte City Council, February 23, 2026";
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
          backgroundColor: "#0a1726",
          backgroundImage:
            "radial-gradient(ellipse at 50% 50%, rgba(0, 180, 216, 0.14) 0%, transparent 60%)",
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
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
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
              border: "1px solid rgba(0, 180, 216, 0.4)",
              background: "rgba(0, 180, 216, 0.08)",
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#00B4D8",
                display: "flex",
              }}
            />
            <span
              style={{
                fontSize: 12,
                color: "#00B4D8",
                letterSpacing: "0.10em",
                textTransform: "uppercase" as const,
                fontWeight: 600,
              }}
            >
              Charlotte, NC · Hamlet investigation
            </span>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 50,
              fontWeight: 400,
              color: "#f4ede1",
              marginBottom: "4px",
              display: "flex",
            }}
          >
            Eleven Theories
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              color: "#00B4D8",
              letterSpacing: "-0.03em",
              marginBottom: "16px",
              fontStyle: "italic",
              display: "flex",
            }}
          >
            of a Highway
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 20,
              color: "#9eb0c0",
              textAlign: "center",
              maxWidth: "780px",
              lineHeight: 1.45,
              display: "flex",
            }}
          >
            Eight council members. One mayor. One state highway. One Republican who cast the deciding vote himself.
          </div>

          {/* Byline */}
          <div
            style={{
              fontSize: 14,
              color: "#6c7a89",
              marginTop: "24px",
              display: "flex",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <span style={{ display: "flex" }}>The District</span>
            <span style={{ display: "flex", color: "#384654" }}>|</span>
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
