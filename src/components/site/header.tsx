"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";

/**
 * Sticky Public-Header: im Hero transparent, ab leichtem Scroll glasig-weiss
 * mit feiner Border. Aktive Route wird mit einem dezenten Moss-Green-Dot
 * unter dem Label markiert.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Im Admin-Bereich verstecken wir den Public-Header.
  if (pathname?.startsWith("/admin")) return null;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-[backdrop-filter,background-color,border-color,box-shadow] duration-300",
        scrolled
          ? "border-border/70 bg-background/80 shadow-[0_10px_30px_-24px_rgba(17,19,21,0.25)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/70"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-3 lg:h-20">
        <Link
          href="/"
          aria-label="Zur Startseite"
          className="ring-focus shrink-0 rounded-md"
        >
          <Logo />
        </Link>

        {/* 7 Einträge: bei lg bewusst kompakt, ab xl mit mehr Luft. */}
        <nav
          className="hidden items-center lg:flex"
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
                  "ring-focus relative whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] font-medium transition-colors xl:px-3.5 xl:text-sm",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
                {active && (
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 mx-auto block size-1 rounded-full bg-[color:var(--solar-emerald)]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden lg:block">
            <Link href="/solarrechner" className="btn-primary h-10! px-5!">
              Berechnen
            </Link>
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
