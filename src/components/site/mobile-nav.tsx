"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Mail, Menu, Phone } from "lucide-react";

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

/**
 * Mobiles Menü mit Fullscreen-Feeling: grosse Touch-Ziele, nummerierte
 * Navigation (Gold-Mikrodetail), Kontaktblock und Primär-CTA am unteren Rand.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);

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
        className="flex w-full! flex-col gap-0 p-0 sm:max-w-md!"
      >
        <SheetTitle className="sr-only">Hauptnavigation</SheetTitle>

        <div className="flex h-16 shrink-0 items-center border-b border-border pl-5 pr-14">
          <SheetClose
            nativeButton={false}
            render={
              <Link
                href="/"
                aria-label="Zur Startseite"
                className="ring-focus rounded-md"
              >
                <Logo />
              </Link>
            }
          />
        </div>

        <nav
          className="flex flex-1 flex-col overflow-y-auto p-3"
          aria-label="Mobile Hauptnavigation"
        >
          {siteConfig.primaryNav.map((item, i) => (
            <SheetClose
              key={item.href}
              nativeButton={false}
              render={
                <Link
                  href={item.href}
                  className="ring-focus group flex min-h-14 items-center gap-4 rounded-2xl px-4 text-lg font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  <span
                    aria-hidden
                    className="stat-mono w-6 text-[11px] text-[color:var(--solar-gold)]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">{item.label}</span>
                  <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              }
            />
          ))}
        </nav>

        <div className="mt-auto shrink-0 border-t border-border p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <div className="flex flex-col gap-1">
            <a
              href={siteConfig.contact.phoneHref}
              className="ring-focus flex min-h-12 items-center gap-3 rounded-xl px-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <Phone className="size-4 text-[color:var(--solar-emerald)]" />
              {siteConfig.contact.phone}
            </a>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="ring-focus flex min-h-12 items-center gap-3 rounded-xl px-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <Mail className="size-4 text-[color:var(--solar-emerald)]" />
              {siteConfig.contact.email}
            </a>
          </div>

          <SheetClose
            nativeButton={false}
            render={
              <Link href="/solarrechner" className="btn-primary mt-3 w-full">
                Solarpotenzial berechnen
              </Link>
            }
          />
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Kostenfrei und unverbindlich · Antwort innert eines Werktags
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
