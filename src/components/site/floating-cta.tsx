"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Calculator, MessageSquareText, Phone } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { siteConfig } from "@/lib/site-config";

/** Ab dieser Scroll-Tiefe blenden die Floating-CTAs ein. */
const SCROLL_THRESHOLD = 400;

/**
 * Konversions-Ebene über dem Seiteninhalt:
 * - Mobile (<lg): glasige Bottom-Bar mit drei gleichwertigen Aktionen
 *   (Berechnen / Anrufen / Anfrage), safe-area-aware.
 * - Desktop (lg+): dezenter runder Anruf-Button unten rechts mit Tooltip.
 * Auf /admin-Routen wird nichts gerendert; auf /solarrechner entfällt die
 * Bottom-Bar, damit sie die Wizard-Buttons nicht überdeckt.
 */
export function FloatingCta() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  const showMobileBar = !pathname?.startsWith("/solarrechner");

  const mobileActionClass =
    "ring-focus flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary/70";

  return (
    <>
      {/* Mobile: Bottom-Bar mit drei gleichwertigen Aktionen */}
      <AnimatePresence>
        {visible && showMobileBar && (
          <motion.nav
            key="floating-cta-bar"
            aria-label="Schnellaktionen"
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : 24 }}
            transition={{ duration: reduce ? 0 : 0.35, ease: "easeOut" }}
            className="fixed inset-x-0 bottom-0 z-40 lg:hidden"
          >
            <div className="border-t border-border/80 bg-background/85 pb-[env(safe-area-inset-bottom)] shadow-[0_-16px_40px_-28px_rgba(17,19,21,0.4)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/75">
              <div className="grid grid-cols-3 divide-x divide-border/70">
                <Link href="/solarrechner" className={mobileActionClass}>
                  <Calculator
                    aria-hidden
                    className="size-5 text-[color:var(--solar-emerald)]"
                  />
                  Berechnen
                </Link>
                <a
                  href={siteConfig.contact.phoneHref}
                  className={mobileActionClass}
                >
                  <Phone
                    aria-hidden
                    className="size-5 text-[color:var(--solar-emerald)]"
                  />
                  Anrufen
                </a>
                <Link href="/angebote" className={mobileActionClass}>
                  <MessageSquareText
                    aria-hidden
                    className="size-5 text-[color:var(--solar-emerald)]"
                  />
                  Anfrage
                </Link>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Desktop: dezenter runder Anruf-Button unten rechts */}
      <AnimatePresence>
        {visible && (
          <motion.div
            key="floating-cta-phone"
            initial={{ opacity: 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : 12 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: "easeOut" }}
            className="fixed bottom-6 right-6 z-40 hidden lg:block"
          >
            <Tooltip>
              <TooltipTrigger
                render={
                  <a
                    href={siteConfig.contact.phoneHref}
                    aria-label="Beratung anrufen"
                    className="ring-focus flex size-12 items-center justify-center rounded-full bg-[color:var(--solar-ink)] text-[color:var(--solar-navy-foreground)] shadow-[0_18px_40px_-18px_rgba(17,19,21,0.55)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_48px_-18px_rgba(17,19,21,0.6)]"
                  />
                }
              >
                <Phone aria-hidden className="size-5" />
              </TooltipTrigger>
              <TooltipContent side="left" sideOffset={10}>
                Beratung anrufen
              </TooltipContent>
            </Tooltip>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
