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

/**
 * Mobiles Vollflächen-Menü im Werkplan-Stil: Papierfläche, grosse Typografie,
 * eine Hairline pro Eintrag, rechteckiger CTA und Kontaktzeilen am Fuss.
 */
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
            className="ring-focus lg:hidden"
          />
        }
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex w-full! flex-col gap-0 bg-background p-0 sm:max-w-md!"
      >
        <SheetTitle className="sr-only">Hauptnavigation</SheetTitle>

        <div className="flex h-16 shrink-0 items-center border-b border-border pl-5 pr-14">
          <SheetClose
            nativeButton={false}
            render={
              <Link
                href="/"
                aria-label="Zur Startseite"
                className="ring-focus"
              >
                <Logo />
              </Link>
            }
          />
        </div>

        <nav
          className="flex flex-1 flex-col overflow-y-auto px-5 py-2"
          aria-label="Mobile Hauptnavigation"
        >
          {siteConfig.primaryNav.map((item) => (
            <SheetClose
              key={item.href}
              nativeButton={false}
              render={
                <Link
                  href={item.href}
                  className="ring-focus flex min-h-14 items-center border-b border-border text-xl font-medium tracking-tight text-foreground transition-colors hover:text-muted-foreground"
                >
                  {item.label}
                </Link>
              }
            />
          ))}
        </nav>

        <div className="mt-auto shrink-0 border-t border-border p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          <div className="flex flex-col gap-1">
            <a
              href={phoneHref}
              className="ring-focus stat-mono flex min-h-11 items-center text-[15px] text-foreground"
            >
              {phoneDisplay}
            </a>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="ring-focus flex min-h-11 items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {siteConfig.contact.email}
            </a>
          </div>

          <SheetClose
            nativeButton={false}
            render={
              <Link href="/angebote" className="btn-primary mt-4 w-full">
                Angebot einholen
              </Link>
            }
          />
          <p className="eyebrow mt-4 text-center">
            Kostenfrei · Antwort innert eines Werktags
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
