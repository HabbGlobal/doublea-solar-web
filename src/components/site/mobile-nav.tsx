"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Mail, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/lib/site-config";
import { Logo } from "./logo";

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
            className="lg:hidden"
          />
        }
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[88vw] sm:max-w-md flex flex-col gap-0 p-0"
      >
        <div className="flex items-center justify-between p-5 border-b border-border">
          <Logo />
        </div>
        <nav className="flex flex-col p-2">
          {siteConfig.primaryNav.map((item) => (
            <SheetClose
              key={item.href}
              render={
                <Link
                  href={item.href}
                  className="flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  {item.label}
                  <span className="text-[color:var(--solar-emerald)]">→</span>
                </Link>
              }
            />
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-3 border-t border-border p-5">
          <a
            href={siteConfig.contact.phoneHref}
            className="flex items-center gap-3 text-sm text-muted-foreground"
          >
            <Phone className="size-4" />
            {siteConfig.contact.phone}
          </a>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="flex items-center gap-3 text-sm text-muted-foreground"
          >
            <Mail className="size-4" />
            {siteConfig.contact.email}
          </a>
          <SheetClose
            render={
              <Link
                href="/solarrechner"
                className="mt-2 inline-flex h-12 items-center justify-center rounded-xl bg-[color:var(--solar-navy)] px-5 text-sm font-medium text-[color:var(--solar-navy-foreground)] transition-opacity hover:opacity-90"
              >
                Solarpotenzial berechnen
              </Link>
            }
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
