import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "The Vote Tracker — Democracy analysis by The District";
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
          backgroundColor: "#1e293b",
          backgroundImage:
            "radial-gradient(ellipse at 50% 60%, rgba(245, 158, 11, 0.1) 0%, transparent 60%)",
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
              border: "1px solid rgba(245, 158, 11, 0.4)",
              background: "rgba(245, 158, 11, 0.08)",
            }}
          >
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#f59e0b", display: "flex" }} />
            <span style={{ fontSize: 14, color: "#f59e0b", letterSpacing: "0.08em", textTransform: "uppercase" as const, fontWeight: 600 }}>
              Democracy
            </span>
          </div>
          <div style={{ fontSize: 38, fontWeight: 400, color: "#f8fafc", letterSpacing: "-0.01em", marginBottom: "4px", display: "flex" }}>
            The Vote
          </div>
          <div style={{ fontSize: 72, fontWeight: 700, color: "#f59e0b", letterSpacing: "-0.03em", marginBottom: "16px", display: "flex" }}>
            Tracker
          </div>
          <div style={{ fontSize: 20, color: "#94a3b8", textAlign: "center", maxWidth: "650px", lineHeight: 1.5, display: "flex" }}>
            1,524 officials. 25,219 votes. Newark agrees on everything. Princeton fights about everything. Why?
          </div>
          <div style={{ width: "80px", height: "3px", background: "#f59e0b", marginTop: "28px", borderRadius: "2px", display: "flex" }} />
          <div style={{ fontSize: 15, color: "#475569", marginTop: "16px", display: "flex", gap: "8px", alignItems: "center" }}>
            <span style={{ display: "flex" }}>The District</span>
            <span style={{ display: "flex", color: "#334155" }}>|</span>
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
            <rect x="80" y="65" width="40" height="75" rx="3" fill="#f59e0b" opacity="0.6" />
            <rect x="140" y="30" width="40" height="110" rx="3" fill="#fbbf24" opacity="0.4" />
            <rect x="200" y="85" width="40" height="55" rx="3" fill="#f59e0b" opacity="0.3" />
            <rect x="380" y="20" width="40" height="120" rx="3" fill="#fbbf24" opacity="0.5" />
            <rect x="440" y="50" width="40" height="90" rx="3" fill="#f59e0b" opacity="0.4" />
            <rect x="620" y="40" width="40" height="100" rx="3" fill="#f59e0b" opacity="0.5" />
            <rect x="680" y="15" width="40" height="125" rx="3" fill="#fbbf24" opacity="0.4" />
            <rect x="860" y="35" width="40" height="105" rx="3" fill="#fbbf24" opacity="0.5" />
            <rect x="920" y="60" width="40" height="80" rx="3" fill="#f59e0b" opacity="0.4" />
            <rect x="1100" y="25" width="40" height="115" rx="3" fill="#f59e0b" opacity="0.5" />
            <circle cx="310" cy="10" r="3" fill="#f59e0b" opacity="0.5" />
            <circle cx="560" cy="8" r="2.5" fill="#fbbf24" opacity="0.4" />
            <circle cx="1020" cy="6" r="2" fill="#f59e0b" opacity="0.3" />
          </svg>
        </div>
      </div>
    ),
    { ...size }
  );
}
