"use client";

import { useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import type { AppPathname } from "@/i18n/routing";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { LocaleSwitch } from "./locale-switch";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";

type Props = {
  /** Telefonnummer aus dem editierbaren Site-Content (Admin). */
  phone?: string;
};

/**
 * Soft-Solar-Header: eine weich erhabene Leiste mit Logo, Navigation,
 * Sprachumschalter und goldener Aktion. Durchscheinend, damit auf der
 * Startseite das Dachbild dahinter sichtbar bleibt.
 */
export function SiteHeader({ phone }: Props) {
  const pathname = usePathname();
  const t = useTranslations("common");

  return (
    <header className="sticky top-0 z-40 h-[88px] w-full bg-[color:var(--background)]/70 backdrop-blur-md">
      <div className="container-page flex h-full items-center">
        <div className="neu-sm flex w-full items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
          <Link href="/" aria-label={t("toHome")} className="ring-focus shrink-0 rounded-xl">
            <Logo className="h-9 sm:h-11 lg:h-[52px]" priority />
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label={t("mainNav")}>
            {siteConfig.primaryNav.map((item) => {
              const href = item.href as AppPathname;
              const active = pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "ring-focus flex min-h-10 items-center whitespace-nowrap rounded-xl px-2.5 text-[14px] font-medium transition-[color,box-shadow] duration-150 xl:px-3",
                    active
                      ? "text-foreground shadow-[var(--neu-inset)]"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {t(`nav.${href}`)}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <LocaleSwitch className="hidden md:flex" />
            {/* Wrapper statt «hidden» am Button: .btn-primary setzt selbst display. */}
            <div className="hidden lg:block">
              <Link
                href="/angebote"
                className="btn-primary min-h-11 whitespace-nowrap px-5 text-[14px]"
              >
                {t("cta.primary")}
              </Link>
            </div>
            <MobileNav phone={phone ?? siteConfig.contact.phone} />
          </div>
        </div>
      </div>
    </header>
  );
}
