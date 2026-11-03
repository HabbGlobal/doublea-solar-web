import type { MetadataRoute } from "next";

import { getPathname } from "@/i18n/navigation";
import { routing, type AppPathname, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/lib/site-config";

const ROUTES: AppPathname[] = [
  "/",
  "/services",
  "/solarrechner",
  "/pakete",
  "/finanzierung",
  "/projekte",
  "/ueber-uns",
  "/kontakt",
  "/angebote",
  "/impressum",
  "/datenschutz",
];

function priorityFor(href: AppPathname) {
  if (href === "/") return 1;
  if (href === "/solarrechner" || href === "/pakete") return 0.9;
  return 0.7;
}

/** Absolute Adresse einer Route in einer Sprache (Deutsch ohne Präfix, Englisch unter /en/…). */
function absoluteUrl(href: AppPathname, locale: Locale) {
  return `${siteConfig.url}${getPathname({ href, locale })}`;
}

/** Beide Sprachen je Route, mit hreflang-Alternativen; Deutsch ist x-default. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.flatMap((href) => {
    const languages = {
      "de-CH": absoluteUrl(href, "de"),
      en: absoluteUrl(href, "en"),
      "x-default": absoluteUrl(href, routing.defaultLocale),
    };
    return routing.locales.map((locale) => ({
      url: absoluteUrl(href, locale),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: priorityFor(href),
      alternates: { languages },
    }));
  });
}
