import { siteConfig } from "@/lib/site-config";

import { getPathname } from "./navigation";
import { routing, type AppPathname, type Locale } from "./routing";

/** Sprachcode für <html lang> und Metadaten. */
export const htmlLang: Record<Locale, string> = { de: "de-CH", en: "en" };

/**
 * Baut canonical + hreflang-Alternativen für eine interne Route.
 * Deutsch ist zugleich x-default.
 */
export function localizedAlternates(href: AppPathname, locale: Locale) {
  const abs = (l: Locale) =>
    `${siteConfig.url}${getPathname({ href, locale: l })}`;
  return {
    canonical: abs(locale),
    languages: {
      "de-CH": abs("de"),
      en: abs("en"),
      "x-default": abs(routing.defaultLocale),
    },
  };
}
