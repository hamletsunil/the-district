import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "The Most Deliberative Square Mile in America — Piedmont, CA";
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
          background: "linear-gradient(135deg, #111a12 0%, #182019 50%, #111a12 100%)",
          position: "relative",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(212,164,74,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(212,164,74,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "-80px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "500px",
            height: "350px",
            background: "radial-gradient(ellipse, rgba(212,164,74,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "12px",
            textTransform: "uppercase" as const,
            letterSpacing: "0.15em",
            color: "#d4a44a",
            border: "1px solid rgba(212,164,74,0.3)",
            padding: "5px 14px",
            borderRadius: "999px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: "#d4a44a",
            }}
          />
          City Deep Dive
        </div>
        <div
          style={{
            fontSize: "46px",
            fontWeight: 500,
            color: "#f0ede6",
            textAlign: "center" as const,
            lineHeight: 1.1,
            marginBottom: "6px",
          }}
        >
          The Most Deliberative
        </div>
        <div
          style={{
            fontSize: "46px",
            fontWeight: 500,
            background: "linear-gradient(135deg, #d4a44a, #e8c06a)",
            backgroundClip: "text",
            color: "transparent",
            textAlign: "center" as const,
            lineHeight: 1.1,
            marginBottom: "20px",
          }}
        >
          Square Mile in America
        </div>
        <div
          style={{
            fontSize: "16px",
            fontStyle: "italic" as const,
            color: "#9a9e93",
            textAlign: "center" as const,
            maxWidth: "600px",
            marginBottom: "28px",
          }}
        >
          461 meetings. 9.3 million words. One tiny city surrounded by Oakland.
        </div>
        <div style={{ display: "flex", gap: "40px" }}>
          {[
            { value: "9.3M", label: "Words" },
            { value: "461", label: "Meetings" },
            { value: "1,067", label: "Hours" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "3px",
              }}
            >
              <div
                style={{ fontSize: "24px", fontWeight: 600, color: "#d4a44a" }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: "10px",
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.1em",
                  color: "#9a9e93",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            fontSize: "12px",
            color: "#9a9e93",
            position: "absolute",
            bottom: "20px",
          }}
        >
          The District | by Hamlet
        </div>
      </div>
    ),
    { ...size }
  );
}
