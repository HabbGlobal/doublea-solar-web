"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";

type Props = {
  /** Telefonnummer aus dem editierbaren Site-Content (Admin). */
  phone?: string;
};

/**
 * Werkplan-Header, zweizeilig:
 * 1. Meta-Leiste (Mono, zwischen Hairlines): Tätigkeitsraum links, Telefon rechts.
 * 2. Hauptzeile: Logo links, Navigation + rechteckiger CTA rechts.
 * Bewusst ruhig: solide Papierfläche, keine Transparenz-/Blur-Effekte.
 */
export function SiteHeader({ phone }: Props) {
  const pathname = usePathname();
  const phoneDisplay = phone ?? siteConfig.contact.phone;
  const phoneHref = `tel:${phoneDisplay.replace(/[^+\d]/g, "")}`;

  // Im Admin-Bereich verstecken wir den Public-Header.
  if (pathname?.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background">
      {/* Meta-Leiste */}
      <div className="border-b border-border">
        <div className="container-page flex min-h-9 items-center justify-between gap-4">
          <p className="eyebrow hidden sm:block">
            Photovoltaik · Grenchen SO · schweizweit
          </p>
          <a
            href={phoneHref}
            className="ring-focus stat-mono ml-auto inline-flex min-h-9 items-center text-[13px] text-foreground"
          >
            {phoneDisplay}
          </a>
        </div>
      </div>

      {/* Hauptzeile */}
      <div className="container-page flex h-16 items-center justify-between gap-3 lg:h-[72px]">
        <Link
          href="/"
          aria-label="Zur Startseite"
          className="ring-focus shrink-0"
        >
          <Logo />
        </Link>

        <div className="flex items-center gap-6">
          <nav
            className="hidden items-center gap-0.5 lg:flex"
            aria-label="Hauptnavigation"
          >
            {siteConfig.primaryNav.map((item) => {
              const active =
                pathname === item.href || pathname?.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "ring-focus relative flex min-h-11 items-center whitespace-nowrap px-2.5 text-[13px] transition-colors duration-150 xl:px-3.5",
                    active
                      ? "font-medium text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                  {active && (
                    <span
                      aria-hidden
                      className="absolute inset-x-2.5 bottom-0 block h-px bg-[color:var(--solar-ink)] xl:inset-x-3.5"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <Link
              href="/angebote"
              className="btn-secondary min-h-11 px-5 text-[13px]"
            >
              Angebot einholen
            </Link>
          </div>

          <MobileNav phone={phoneDisplay} />
        </div>
      </div>
    </header>
  );
}
