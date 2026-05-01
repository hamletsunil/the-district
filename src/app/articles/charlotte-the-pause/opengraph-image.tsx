import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Eleven Theories of a Highway — Charlotte City Council, February 23, 2026";
export const size = {
  width: 1200,
  height: 630,
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
            "radial-gradient(ellipse at 50% 60%, rgba(0, 180, 216, 0.14) 0%, transparent 60%)",
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
            padding: "60px 80px",
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
              marginBottom: "24px",
              padding: "8px 20px",
              borderRadius: "100px",
              border: "1px solid rgba(0, 180, 216, 0.4)",
              background: "rgba(0, 180, 216, 0.08)",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#00B4D8",
                display: "flex",
              }}
            />
            <span
              style={{
                fontSize: 14,
                color: "#00B4D8",
                letterSpacing: "0.10em",
                textTransform: "uppercase" as const,
                fontWeight: 600,
              }}
            >
              Charlotte, NC · A Hamlet investigation
            </span>
          </div>

          {/* Title line 1 */}
          <div
            style={{
              fontSize: 56,
              fontWeight: 400,
              color: "#f4ede1",
              letterSpacing: "-0.01em",
              marginBottom: "4px",
              display: "flex",
            }}
          >
            Eleven Theories
          </div>

          {/* Title line 2 — accent */}
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              color: "#00B4D8",
              letterSpacing: "-0.03em",
              marginBottom: "20px",
              fontStyle: "italic",
              display: "flex",
            }}
          >
            of a Highway
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 22,
              color: "#9eb0c0",
              textAlign: "center",
              maxWidth: "820px",
              lineHeight: 1.45,
              display: "flex",
            }}
          >
            Eight council members. One mayor. One state highway. One Republican who, sixteen months earlier, had cast Charlotte's full CRTPO bloc himself.
          </div>

          {/* Accent line */}
          <div
            style={{
              width: "80px",
              height: "3px",
              background: "#00B4D8",
              marginTop: "32px",
              borderRadius: "2px",
              display: "flex",
            }}
          />

          {/* Byline */}
          <div
            style={{
              fontSize: 15,
              color: "#6c7a89",
              marginTop: "20px",
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

        {/* Charlotte skyline silhouette at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "180px",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            opacity: 0.36,
          }}
        >
          <svg
            width="1200"
            height="180"
            viewBox="0 0 1200 180"
            style={{ display: "flex" }}
          >
            {/* Suburban haze */}
            <path
              d="M0 140 L90 130 L160 138 L250 125 L350 135 L460 122 L560 132 L660 124 L780 132 L900 122 L1020 130 L1120 124 L1200 132 L1200 180 L0 180Z"
              fill="#00B4D8"
              opacity="0.18"
            />
            {/* Stadium oval (left) */}
            <ellipse cx="170" cy="130" rx="100" ry="22" fill="#00B4D8" opacity="0.35" />
            {/* Truist Center */}
            <rect x="450" y="80" width="38" height="80" fill="#00B4D8" opacity="0.55" />
            {/* Hearst Tower */}
            <rect x="510" y="68" width="34" height="92" fill="#00B4D8" opacity="0.7" />
            <path d="M510 68 L510 60 L518 60 L518 65 L526 65 L526 60 L534 60 L534 65 L544 65 L544 68 Z" fill="#00B4D8" opacity="0.7" />
            {/* BoA Crown Building */}
            <rect x="560" y="40" width="46" height="120" fill="#00B4D8" opacity="0.85" />
            <path d="M560 40 L572 18 L583 12 L595 18 L606 40 Z" fill="#00B4D8" opacity="0.85" />
            <path d="M580 12 L583 0 L586 12 Z" fill="#00B4D8" />
            {/* Duke Energy Center */}
            <rect x="620" y="60" width="40" height="100" fill="#00B4D8" opacity="0.7" />
            <path d="M620 60 L620 52 L632 52 L632 46 L644 46 L644 52 L660 52 L660 60 Z" fill="#00B4D8" opacity="0.7" />
            {/* 300 South Tryon */}
            <rect x="675" y="76" width="34" height="84" fill="#00B4D8" opacity="0.6" />
            <path d="M675 76 L675 68 L709 76 Z" fill="#00B4D8" opacity="0.6" />
            {/* Background slabs */}
            <rect x="730" y="92" width="28" height="68" fill="#00B4D8" opacity="0.4" />
            <rect x="765" y="86" width="24" height="74" fill="#00B4D8" opacity="0.45" />
            {/* Rail line foreground */}
            <line x1="0" y1="170" x2="1200" y2="170" stroke="#6EC4D6" strokeOpacity="0.5" strokeWidth="1.5" />
            {/* Section labels */}
            <text x="155" y="172" fill="#00B4D8" opacity="0.6" fontSize="12" fontWeight="600">STADIUM</text>
            <text x="555" y="172" fill="#00B4D8" opacity="0.6" fontSize="12" fontWeight="600">UPTOWN</text>
            <text x="990" y="172" fill="#00B4D8" opacity="0.45" fontSize="12" fontWeight="600">SOUTH END</text>
          </svg>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
