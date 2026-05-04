"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-[backdrop-filter,background-color,border-color] duration-300",
        scrolled
          ? "border-border/80 bg-background/80 backdrop-blur-xl"
          : "border-transparent bg-background/0",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link href="/" aria-label="Zur Startseite" className="ring-focus rounded-md">
          <Logo />
        </Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Hauptnavigation">
          {siteConfig.primaryNav.map((item) => {
            const active = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "ring-focus rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-[color:var(--solar-navy)]"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/solarrechner"
            className="ring-focus hidden lg:inline-flex h-10 items-center justify-center rounded-xl bg-[color:var(--solar-navy)] px-4 text-sm font-medium text-[color:var(--solar-navy-foreground)] shadow-sm transition-all hover:translate-y-[-1px] hover:shadow-md"
          >
            Solarpotenzial berechnen
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
