import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "The Temperature Check — Civic health analysis by The District";
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
          backgroundColor: "#292524",
          backgroundImage:
            "radial-gradient(ellipse at 50% 60%, rgba(239, 68, 68, 0.1) 0%, transparent 60%)",
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
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            display: "flex",
          }}
        />
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "20px",
              padding: "8px 20px",
              borderRadius: "100px",
              border: "1px solid rgba(239, 68, 68, 0.4)",
              background: "rgba(239, 68, 68, 0.08)",
            }}
          >
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ef4444", display: "flex" }} />
            <span style={{ fontSize: 14, color: "#ef4444", letterSpacing: "0.08em", textTransform: "uppercase" as const, fontWeight: 600 }}>
              Civic Health
            </span>
          </div>
          <div style={{ fontSize: 38, fontWeight: 400, color: "#fafaf9", letterSpacing: "-0.01em", marginBottom: "4px", display: "flex" }}>
            The Temperature
          </div>
          <div style={{ fontSize: 72, fontWeight: 700, color: "#ef4444", letterSpacing: "-0.03em", marginBottom: "16px", display: "flex" }}>
            Check
          </div>
          <div style={{ fontSize: 20, color: "#a8a29e", textAlign: "center", maxWidth: "650px", lineHeight: 1.5, display: "flex" }}>
            438 cities. Millions of public comments. Where local debates run hot and where consensus reigns.
          </div>
          <div style={{ width: "80px", height: "3px", background: "#ef4444", marginTop: "28px", borderRadius: "2px", display: "flex" }} />
          <div style={{ fontSize: 15, color: "#78716c", marginTop: "16px", display: "flex", gap: "8px", alignItems: "center" }}>
            <span style={{ display: "flex" }}>The District</span>
            <span style={{ display: "flex", color: "#57534e" }}>|</span>
            <span style={{ display: "flex" }}>by Hamlet</span>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "140px",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            opacity: 0.2,
          }}
        >
          <svg width="1200" height="140" viewBox="0 0 1200 140" style={{ display: "flex" }}>
            <path d="M0 105 Q60 88 120 105 Q180 122 240 105 Q300 88 360 105 Q420 122 480 105 Q540 88 600 105 Q660 122 720 105 Q780 88 840 105 Q900 122 960 105 Q1020 88 1080 105 Q1140 122 1200 105 L1200 140 L0 140Z" fill="#ef4444" opacity="0.25" />
            <path d="M0 120 Q60 108 120 120 Q180 132 240 120 Q300 108 360 120 Q420 132 480 120 Q540 108 600 120 Q660 132 720 120 Q780 108 840 120 Q900 132 960 120 Q1020 108 1080 120 Q1140 132 1200 120 L1200 140 L0 140Z" fill="#f97316" opacity="0.2" />
            <rect x="150" y="30" width="12" height="75" rx="6" fill="#44403c" />
            <rect x="150" y="60" width="12" height="45" rx="6" fill="#ef4444" opacity="0.7" />
            <rect x="450" y="15" width="12" height="90" rx="6" fill="#44403c" />
            <rect x="450" y="40" width="12" height="65" rx="6" fill="#ef4444" opacity="0.8" />
            <rect x="750" y="25" width="12" height="80" rx="6" fill="#44403c" />
            <rect x="750" y="55" width="12" height="50" rx="6" fill="#f97316" opacity="0.6" />
            <rect x="1050" y="20" width="12" height="85" rx="6" fill="#44403c" />
            <rect x="1050" y="45" width="12" height="60" rx="6" fill="#ef4444" opacity="0.7" />
            <circle cx="300" cy="12" r="3" fill="#ef4444" opacity="0.5" />
            <circle cx="900" cy="8" r="2.5" fill="#f97316" opacity="0.4" />
          </svg>
        </div>
      </div>
    ),
    { ...size }
  );
}
