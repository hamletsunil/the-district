import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "The Most Deliberative Square Mile in America — Piedmont, CA";
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
          background: "linear-gradient(135deg, #111a12 0%, #182019 50%, #111a12 100%)",
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
              "linear-gradient(rgba(212,164,74,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(212,164,74,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Radial glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "400px",
            background: "radial-gradient(ellipse, rgba(212,164,74,0.12) 0%, transparent 70%)",
          }}
        />
        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "13px",
            textTransform: "uppercase" as const,
            letterSpacing: "0.15em",
            color: "#d4a44a",
            border: "1px solid rgba(212,164,74,0.3)",
            padding: "6px 16px",
            borderRadius: "999px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#d4a44a",
            }}
          />
          City Deep Dive
        </div>
        {/* Title */}
        <div
          style={{
            fontSize: "52px",
            fontWeight: 500,
            color: "#f0ede6",
            textAlign: "center" as const,
            lineHeight: 1.1,
            maxWidth: "900px",
            marginBottom: "8px",
          }}
        >
          The Most Deliberative
        </div>
        <div
          style={{
            fontSize: "52px",
            fontWeight: 500,
            background: "linear-gradient(135deg, #d4a44a, #e8c06a)",
            backgroundClip: "text",
            color: "transparent",
            textAlign: "center" as const,
            lineHeight: 1.1,
            marginBottom: "24px",
          }}
        >
          Square Mile in America
        </div>
        {/* Subtitle */}
        <div
          style={{
            fontSize: "18px",
            fontStyle: "italic" as const,
            color: "#9a9e93",
            textAlign: "center" as const,
            maxWidth: "700px",
            marginBottom: "32px",
          }}
        >
          461 meetings. 9.3 million words. Five governing bodies. One tiny city
          surrounded by Oakland.
        </div>
        {/* Stat bar */}
        <div
          style={{
            display: "flex",
            gap: "48px",
            marginBottom: "32px",
          }}
        >
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
                gap: "4px",
              }}
            >
              <div
                style={{ fontSize: "28px", fontWeight: 600, color: "#d4a44a" }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: "11px",
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
        {/* Byline */}
        <div
          style={{
            fontSize: "13px",
            color: "#9a9e93",
            position: "absolute",
            bottom: "24px",
          }}
        >
          The District | by Hamlet
        </div>
      </div>
    ),
    { ...size }
  );
}
