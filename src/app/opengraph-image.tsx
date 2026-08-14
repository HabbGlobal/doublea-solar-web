import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site-config";

export const runtime = "edge";
export const alt = `${siteConfig.name} – Photovoltaik & Solaranlagen Schweiz`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Werkplan-Stil: Papierfläche, Tinte, Mono-Metazeile — keine Verläufe. */
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#F7F7F4",
          color: "#1A1C1C",
          fontFamily: "sans-serif",
          border: "1px solid #D8D8D0",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #D8D8D0",
            paddingBottom: 28,
            fontFamily: "monospace",
            fontSize: 20,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#65665F",
          }}
        >
          <span>DoubleA Solar Solutions</span>
          <span>Photovoltaik · CH</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 600,
              lineHeight: 1.04,
              letterSpacing: -2,
              maxWidth: 1000,
            }}
          >
            Solarenergie für Schweizer Dächer.
          </div>
          <div
            style={{
              fontSize: 34,
              color: "#65665F",
              maxWidth: 940,
            }}
          >
            Präzise geplant. Sauber umgesetzt.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #D8D8D0",
            paddingTop: 28,
            fontFamily: "monospace",
            fontSize: 20,
            letterSpacing: 2,
            color: "#65665F",
          }}
        >
          <span>{siteConfig.url.replace(/^https?:\/\//, "")}</span>
          <span>Grenchen · Solothurn · Bern</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
