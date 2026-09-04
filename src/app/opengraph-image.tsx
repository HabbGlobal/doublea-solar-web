import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site-config";

export const runtime = "edge";
export const alt = `${siteConfig.name} – Photovoltaik & Solaranlagen Schweiz`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Soft-Solar-Palette */
const BASE = "#EEECE6";
const INK = "#121212";
const MUTED = "#5C5B55";
const GOLD = "#C9A227";
const GOLD_DARK = "#B8912A";
const SHADOW_DARK = "#CFCABF";
const SHADOW_LIGHT = "#FFFFFF";

/**
 * Social-Vorschau im Soft-Solar-System: eine warme Grundfläche, darauf eine
 * weich erhabene Karte (zwei einfache Schatten, wie Satori sie kennt),
 * Dach-«A» als Zeichen, Claim und Firmenzeile. Keine Verläufe als Flächen.
 */
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 56,
          background: BASE,
          color: INK,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: 64,
            borderRadius: 36,
            background: BASE,
            boxShadow: `18px 18px 40px ${SHADOW_DARK}, -18px -18px 40px ${SHADOW_LIGHT}`,
          }}
        >
          {/* Kopf: Dach-«A» + Firmenname */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
            }}
          >
            <svg
              width="88"
              height="80"
              viewBox="0 0 60 56"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon
                points="22,4 42,52 33,52 22,25.6 11,52 2,52"
                fill={INK}
              />
              <polygon points="30,4 38,4 58,52 50,52" fill={GOLD} />
            </svg>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              <span style={{ fontSize: 30, fontWeight: 700, color: INK }}>
                DoubleA Solar Solutions
              </span>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  color: MUTED,
                }}
              >
                Photovoltaik · Schweiz
              </span>
            </div>
          </div>

          {/* Claim */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div
              style={{
                fontSize: 82,
                fontWeight: 700,
                lineHeight: 1.06,
                letterSpacing: -2,
                maxWidth: 980,
                color: INK,
              }}
            >
              Solarenergie für Schweizer Dächer.
            </div>
            <div style={{ fontSize: 30, color: MUTED, maxWidth: 900 }}>
              Präzise geplant. Sauber umgesetzt.
            </div>
          </div>

          {/* Fuss: goldener Balken + Firmenzeile */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: 22,
              color: MUTED,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div
                style={{
                  width: 56,
                  height: 8,
                  borderRadius: 4,
                  background: GOLD_DARK,
                }}
              />
              <span>
                {siteConfig.legalName} · {siteConfig.contact.address.city}
              </span>
            </div>
            <span>{siteConfig.url.replace(/^https?:\/\//, "")}</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
