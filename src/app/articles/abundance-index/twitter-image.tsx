import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "The Abundance Index — Housing analysis by The District";
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
          backgroundColor: "#faf7f2",
          backgroundImage:
            "radial-gradient(ellipse at 50% 60%, rgba(22, 101, 52, 0.06) 0%, transparent 60%)",
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
              "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
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
              border: "1px solid rgba(22, 101, 52, 0.3)",
              background: "rgba(22, 101, 52, 0.06)",
            }}
          >
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#166534", display: "flex" }} />
            <span style={{ fontSize: 14, color: "#166534", letterSpacing: "0.08em", textTransform: "uppercase" as const, fontWeight: 600 }}>
              Housing Analysis
            </span>
          </div>
          <div style={{ fontSize: 38, fontWeight: 400, color: "#1e293b", letterSpacing: "-0.01em", marginBottom: "4px", display: "flex" }}>
            The Abundance
          </div>
          <div style={{ fontSize: 72, fontWeight: 700, color: "#166534", letterSpacing: "-0.03em", marginBottom: "16px", display: "flex" }}>
            Index
          </div>
          <div style={{ fontSize: 20, color: "#64748b", textAlign: "center", maxWidth: "650px", lineHeight: 1.5, display: "flex" }}>
            84 cities ranked YIMBY to NIMBY. Mapping America&apos;s most welcoming — and resistant — cities for development.
          </div>
          <div style={{ width: "80px", height: "3px", background: "#166534", marginTop: "28px", borderRadius: "2px", display: "flex" }} />
          <div style={{ fontSize: 15, color: "#94a3b8", marginTop: "16px", display: "flex", gap: "8px", alignItems: "center" }}>
            <span style={{ display: "flex" }}>The District</span>
            <span style={{ display: "flex", color: "#cbd5e1" }}>|</span>
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
            opacity: 0.15,
          }}
        >
          <svg width="1200" height="140" viewBox="0 0 1200 140" style={{ display: "flex" }}>
            <path d="M0 90 Q150 50 300 70 Q450 40 600 60 Q750 30 900 55 Q1050 35 1200 45 L1200 140 L0 140Z" fill="#166534" opacity="0.3" />
            <rect x="100" y="50" width="40" height="90" rx="2" fill="#166534" />
            <polygon points="100,50 120,28 140,50" fill="#22c55e" opacity="0.5" />
            <rect x="350" y="38" width="50" height="102" rx="2" fill="#15803d" />
            <polygon points="350,38 375,10 400,38" fill="#22c55e" opacity="0.4" />
            <rect x="600" y="32" width="55" height="108" rx="2" fill="#15803d" />
            <polygon points="600,32 627,5 655,32" fill="#166534" opacity="0.4" />
            <rect x="900" y="42" width="40" height="98" rx="2" fill="#166534" />
            <polygon points="900,42 920,18 940,42" fill="#22c55e" opacity="0.5" />
            <circle cx="250" cy="25" r="3" fill="#22c55e" opacity="0.5" />
            <circle cx="750" cy="15" r="2.5" fill="#166534" opacity="0.4" />
          </svg>
        </div>
      </div>
    ),
    { ...size }
  );
}
