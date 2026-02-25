import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "The City That Won\u2019t Agree \u2014 Ann Arbor has the highest council dissent rate in America";
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
          background: "linear-gradient(135deg, #0c1a2e 0%, #112240 50%, #0c1a2e 100%)",
          fontFamily: "Georgia, serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "20px",
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
              fontSize: "16px",
              fontFamily: "system-ui, sans-serif",
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
            }}
          >
            From The District
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <span
            style={{
              fontSize: "64px",
              fontWeight: 600,
              color: "#f2ede4",
              lineHeight: 1.1,
            }}
          >
            The City That
          </span>
          <span
            style={{
              fontSize: "64px",
              fontWeight: 600,
              background: "linear-gradient(135deg, #e8b931, #d4a04a)",
              backgroundClip: "text",
              color: "transparent",
              lineHeight: 1.1,
            }}
          >
            Won&apos;t Agree
          </span>
        </div>
        <p
          style={{
            color: "#8e99a8",
            fontSize: "20px",
            maxWidth: "600px",
            textAlign: "center",
            lineHeight: 1.5,
            marginTop: "20px",
          }}
        >
          142 cities. 8.1 million votes. One massive outlier.
        </p>
      </div>
    ),
    { ...size }
  );
}
