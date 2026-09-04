import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * Apple-Touch-Icon (Home-Bildschirm): das Dach-«A» aus dem Logo 2026 auf der
 * warmen Grundfläche. iOS rundet die Ecken selbst — deshalb ohne Radius.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#EEECE6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="132"
          height="123"
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
