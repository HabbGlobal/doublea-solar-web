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
 * Soft-Solar-Header: eine weich erhabene Leiste mit Logo, Navigation und
 * goldener Aktion. Der Header selbst ist durchscheinend, damit auf der
 * Startseite das Dachbild dahinter sichtbar bleibt.
 */
export function SiteHeader({ phone }: Props) {
  const pathname = usePathname();

  // Im Admin-Bereich verstecken wir den Public-Header.
  if (pathname?.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-40 h-[88px] w-full bg-[color:var(--background)]/70 backdrop-blur-md">
      <div className="container-page flex h-full items-center">
        <div className="neu-sm flex w-full items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
          <Link href="/" aria-label="Zur Startseite" className="ring-focus rounded-xl">
            <Logo className="h-11 sm:h-[52px]" priority />
          </Link>

          <nav
            className="hidden items-center gap-1 lg:flex"
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
                    "ring-focus flex min-h-10 items-center whitespace-nowrap rounded-xl px-3 text-[14px] font-medium transition-[color,box-shadow] duration-150",
                    active
                      ? "text-foreground shadow-[var(--neu-inset)]"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/angebote"
              className="btn-primary hidden min-h-11 px-5 text-[14px] lg:inline-flex"
            >
              Angebot einholen
            </Link>
            <MobileNav phone={phone ?? siteConfig.contact.phone} />
          </div>
        </div>
      </div>
    </header>
  );
}
