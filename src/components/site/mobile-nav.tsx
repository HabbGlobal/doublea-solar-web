"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "@/i18n/navigation";
import type { AppPathname } from "@/i18n/routing";
import { siteConfig } from "@/lib/site-config";
import { LocaleSwitch } from "./locale-switch";
import { Logo } from "./logo";

type Props = {
  phone?: string;
};

/** Mobiles Menü: weiche Fläche, grosse Einträge, Sprachwahl, goldene Aktion, Kontakt. */
export function MobileNav({ phone }: Props) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("common");
  const phoneDisplay = phone ?? siteConfig.contact.phone;
  const phoneHref = `tel:${phoneDisplay.replace(/[^+\d]/g, "")}`;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon-lg"
            aria-label={t("openMenu")}
            className="ring-focus rounded-xl shadow-[var(--neu-raise-sm)] lg:hidden"
          />
        }
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex w-full! flex-col gap-0 border-0 bg-background p-0 shadow-none sm:max-w-md!"
      >
        <SheetTitle className="sr-only">{t("mainNav")}</SheetTitle>

        <div className="flex h-[88px] shrink-0 items-center justify-between pl-5 pr-16">
          <SheetClose
            nativeButton={false}
            render={
              <Link href="/" aria-label={t("toHome")} className="ring-focus rounded-xl">
                <Logo className="h-9" />
              </Link>
            }
          />
          <LocaleSwitch />
        </div>

        <nav
          className="flex flex-1 flex-col gap-2 overflow-y-auto px-5 py-2"
          aria-label={t("mobileNav")}
        >
          {siteConfig.primaryNav.map((item) => {
            const href = item.href as AppPathname;
            return (
              <SheetClose
                key={href}
                nativeButton={false}
                render={
                  <Link
                    href={href}
                    className="ring-focus neu-sm flex min-h-14 items-center px-5 text-lg font-semibold text-foreground"
                  >
                    {t(`nav.${href}`)}
                  </Link>
                }
              />
            );
          })}
        </nav>

        <div className="shrink-0 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4">
          <SheetClose
            nativeButton={false}
            render={
              <Link href="/angebote" className="btn-primary w-full">
                {t("cta.primary")}
              </Link>
            }
          />
          <div className="mt-4 flex flex-col gap-1 text-sm">
            <a href={phoneHref} className="ring-focus stat-mono min-h-10 rounded-lg text-foreground">
              {phoneDisplay}
            </a>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="ring-focus min-h-10 rounded-lg text-muted-foreground"
            >
              {siteConfig.contact.email}
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
