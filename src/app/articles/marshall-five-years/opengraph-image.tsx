import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Five Years After Marshall: What Six Front Range Governments Say About Rebuilding";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Marshall Fire palette: scorched-grass tan, deep burn-brown, Flatirons slate,
// muted ember-orange. Avoid pyrotechnic imagery (per validation memo).
const PALETTE = {
  bgDeep: "#1d1712",
  bgMid: "#2a2119",
  bgHi: "#3d2e1f",
  ember: "#c8562a",
  grass: "#c9b58a",
  slate: "#4a5c6b",
  hail: "#f5f3ed",
};

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
          background: `linear-gradient(135deg, ${PALETTE.bgDeep} 0%, ${PALETTE.bgMid} 55%, ${PALETTE.bgHi} 100%)`,
          fontFamily: "Georgia, serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              `linear-gradient(${PALETTE.ember}14 1px, transparent 1px), linear-gradient(90deg, ${PALETTE.ember}14 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: 720,
            height: 720,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${PALETTE.ember}20 0%, transparent 65%)`,
            top: -160,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 28,
            fontSize: 14,
            fontWeight: 600,
            color: PALETTE.ember,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <span style={{ display: "flex", width: 8, height: 8, borderRadius: 4, background: PALETTE.ember }} />
          The District
          <span style={{ color: PALETTE.grass }}>·</span>
          <span style={{ color: PALETTE.grass }}>Front Range Deep Dive</span>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 500,
            color: PALETTE.hail,
            lineHeight: 1.03,
            textAlign: "center",
            letterSpacing: "-0.025em",
            padding: "0 80px",
          }}
        >
          Five Years After Marshall
        </div>

        {/* Subtitle */}
        <div
          style={{
            display: "flex",
            fontSize: 22,
            marginTop: 28,
            color: PALETTE.grass,
            fontStyle: "italic",
            textAlign: "center",
            padding: "0 140px",
            fontFamily: "Georgia, serif",
          }}
        >
          Six Front Range governments, five years of transcripts.
          <br />
          What the rebuild actually sounds like.
        </div>

        {/* Stats bar */}
        <div
          style={{
            display: "flex",
            gap: 44,
            marginTop: 44,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          {[
            { n: "6", label: "JURISDICTIONS" },
            { n: "5 YRS", label: "SINCE THE FIRE" },
            { n: "1,000+", label: "HOMES LOST" },
            { n: "10M+", label: "WORDS OF TESTIMONY" },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 700,
                  color: PALETTE.ember,
                  fontFamily: "Georgia, serif",
                }}
              >
                {s.n}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: PALETTE.grass,
                  letterSpacing: "0.15em",
                  marginTop: 4,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
