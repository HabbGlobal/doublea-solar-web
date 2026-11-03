import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { routing } from "./routing";

/** Namensräume = Dateien unter messages/<locale>/. Jede Seite hat ihre eigene Datei. */
export const NAMESPACES = [
  "common",
  "home",
  "services",
  "pakete",
  "finanzierung",
  "projekte",
  "ueberUns",
  "kontakt",
  "angebote",
  "solarrechner",
  "legal",
  "forms",
  "calculator",
] as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const entries = await Promise.all(
    NAMESPACES.map(async (ns) => {
      const mod = (await import(`../../messages/${locale}/${ns}.json`)) as {
        default: Record<string, unknown>;
      };
      return [ns, mod.default] as const;
    }),
  );

  return {
    locale,
    messages: Object.fromEntries(entries),
  };
});
