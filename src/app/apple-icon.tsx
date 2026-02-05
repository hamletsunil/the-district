import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 36,
        }}
      >
        <svg
          width="100"
          height="100"
          viewBox="0 0 24 24"
          fill="none"
          style={{ display: "flex" }}
        >
          {/* Stylized D with district building motif */}
          <rect x="4" y="4" width="3" height="16" fill="#f59e0b" />
          <rect x="7" y="4" width="9" height="3" fill="#f59e0b" />
          <rect x="7" y="17" width="9" height="3" fill="#f59e0b" />
          <rect x="16" y="7" width="3" height="10" fill="#f59e0b" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
