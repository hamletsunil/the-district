import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Five Years After Marshall: What Six Front Range Governments Say About Rebuilding";
export const size = { width: 1200, height: 600 };
export const contentType = "image/png";

const PALETTE = {
  bgDeep: "#1d1712",
  bgMid: "#2a2119",
  bgHi: "#3d2e1f",
  ember: "#c8562a",
  grass: "#c9b58a",
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
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 22,
            fontSize: 13,
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
        <div
          style={{
            display: "flex",
            fontSize: 84,
            fontWeight: 500,
            color: PALETTE.hail,
            lineHeight: 1.04,
            textAlign: "center",
            letterSpacing: "-0.025em",
            padding: "0 80px",
          }}
        >
          Five Years After Marshall
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 20,
            marginTop: 24,
            color: PALETTE.grass,
            fontStyle: "italic",
            textAlign: "center",
            padding: "0 120px",
          }}
        >
          Six Front Range councils. Five years of testimony. We read it all.
        </div>
      </div>
    ),
    { ...size }
  );
}
