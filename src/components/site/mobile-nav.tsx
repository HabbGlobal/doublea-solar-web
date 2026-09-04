"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/lib/site-config";
import { Logo } from "./logo";

type Props = {
  phone?: string;
};

/** Mobiles Menü: weiche Fläche, grosse Einträge, goldene Aktion, Kontakt am Fuss. */
export function MobileNav({ phone }: Props) {
  const [open, setOpen] = useState(false);
  const phoneDisplay = phone ?? siteConfig.contact.phone;
  const phoneHref = `tel:${phoneDisplay.replace(/[^+\d]/g, "")}`;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon-lg"
            aria-label="Menü öffnen"
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
        <SheetTitle className="sr-only">Hauptnavigation</SheetTitle>

        <div className="flex h-[88px] shrink-0 items-center pl-5 pr-16">
          <SheetClose
            nativeButton={false}
            render={
              <Link href="/" aria-label="Zur Startseite" className="ring-focus rounded-xl">
                <Logo className="h-10" />
              </Link>
            }
          />
        </div>

        <nav
          className="flex flex-1 flex-col gap-2 overflow-y-auto px-5 py-2"
          aria-label="Mobile Hauptnavigation"
        >
          {siteConfig.primaryNav.map((item) => (
            <SheetClose
              key={item.href}
              nativeButton={false}
              render={
                <Link
                  href={item.href}
                  className="ring-focus neu-sm flex min-h-14 items-center px-5 text-lg font-semibold text-foreground"
                >
                  {item.label}
                </Link>
              }
            />
          ))}
        </nav>

        <div className="shrink-0 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4">
          <SheetClose
            nativeButton={false}
            render={
              <Link href="/angebote" className="btn-primary w-full">
                Angebot einholen
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
