import { defineRouting } from "next-intl/routing";

/**
 * Zweisprachigkeit: Deutsch bleibt ohne Präfix unter den bestehenden
 * Adressen (SEO), Englisch liegt unter /en/… mit englischen Pfaden.
 * Keine automatische Sprachwahl per Browser — die Sprache wechselt nur,
 * wer den Umschalter benutzt.
 */
export const routing = defineRouting({
  locales: ["de", "en"],
  defaultLocale: "de",
  localePrefix: "as-needed",
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/services": "/services",
    "/pakete": { de: "/pakete", en: "/packages" },
    "/finanzierung": { de: "/finanzierung", en: "/financing" },
    "/projekte": { de: "/projekte", en: "/projects" },
    "/ueber-uns": { de: "/ueber-uns", en: "/about" },
    "/kontakt": { de: "/kontakt", en: "/contact" },
    "/angebote": { de: "/angebote", en: "/quote" },
    "/solarrechner": { de: "/solarrechner", en: "/solar-calculator" },
    "/impressum": { de: "/impressum", en: "/legal-notice" },
    "/datenschutz": { de: "/datenschutz", en: "/privacy" },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
