import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/**
 * Favicon: das Dach-«A» aus dem Logo 2026 — schwarzer Giebel mit goldenem
 * Balken — auf der warmen Grundfläche, weich gerundet.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#EEECE6",
          borderRadius: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="50"
          height="47"
          viewBox="0 0 60 56"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points="22,4 42,52 33,52 22,25.6 11,52 2,52"
            fill="#121212"
          />
          <polygon points="30,4 38,4 58,52 50,52" fill="#C9A227" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
