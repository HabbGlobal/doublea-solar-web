"use client";

import { useLocale } from "next-intl";
import { useParams } from "next/navigation";

import { Link, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const LABELS: Record<Locale, string> = { de: "DE", en: "EN" };

/**
 * Sprachumschalter DE | EN als weiche Pill-Gruppe. Bleibt auf derselben
 * Seite (typisierte Pfade), aktive Sprache ist eingelassen.
 */
export function LocaleSwitch({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const params = useParams();

  return (
    <div
      role="group"
      aria-label="Sprache / Language"
      className={cn("neu-sm flex items-center gap-0.5 p-1", className)}
    >
      {routing.locales.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            // @ts-expect-error — pathname/params stammen aus der laufenden Route und passen zusammen
            href={{ pathname, params }}
            locale={l}
            aria-current={active ? "true" : undefined}
            hrefLang={l}
            className={cn(
              "ring-focus inline-flex min-h-8 min-w-9 items-center justify-center rounded-xl px-2 text-[12px] font-semibold tracking-wide transition-[color,box-shadow] duration-150",
              active
                ? "text-[color:var(--solar-gold-dark)] shadow-[var(--neu-inset)]"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {LABELS[l]}
          </Link>
        );
      })}
    </div>
  );
}
