"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

import { Logo } from "@/components/site/logo";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin", label: "Inhalte" },
  { href: "/admin/team", label: "Team" },
  { href: "/admin/projekte", label: "Projekte" },
  { href: "/admin/pakete", label: "Pakete" },
  { href: "/admin/anfragen", label: "Anfragen" },
] as const;

/**
 * Client-Chrome des Admin-Bereichs: Kopfzeile + Navigation im Werkplan-Stil.
 * Auf der Login-Route wird das Chrome ausgeblendet (Seite bleibt offen,
 * der Auth-Guard liegt unverändert in Middleware + Pages).
 */
export function AdminChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [loggingOut, setLoggingOut] = useState(false);

  const isLoginRoute = pathname?.startsWith("/admin/login") ?? false;

  function isActive(href: string): boolean {
    if (!pathname) return false;
    return href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
  }

  async function logout() {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
    } catch {
      // Auch bei Netzwerkfehler zur Login-Seite — dort greift der Guard.
    } finally {
      window.location.href = "/admin/login";
    }
  }

  if (isLoginRoute) {
    // Root-Layout stellt bereits <main id="content"> — hier kein zweites main.
    return <>{children}</>;
  }

  return (
    <>
      <header className="border-b border-border bg-background">
        <div className="flex min-h-14 items-center justify-between gap-4 px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="ring-focus" aria-label="Admin-Startseite">
              <Logo iconOnly />
            </Link>
            <span className="eyebrow border-l border-border pl-3">Admin</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-5">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-xs"
            >
              Live-Site öffnen
            </a>
            <button
              type="button"
              onClick={logout}
              disabled={loggingOut}
              className="ring-focus inline-flex h-8 items-center gap-1.5 border border-border px-3 text-xs font-medium text-foreground transition-colors duration-150 hover:bg-secondary disabled:pointer-events-none disabled:opacity-50"
            >
              {loggingOut ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" aria-hidden /> Abmelden …
                </>
              ) : (
                "Abmelden"
              )}
            </button>
          </div>
        </div>

        {/* Mobile: horizontale Scroll-Leiste */}
        <nav
          aria-label="Admin-Navigation"
          className="flex overflow-x-auto border-t border-border lg:hidden"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "ring-focus shrink-0 border-b-2 px-4 py-3 text-sm transition-colors duration-150",
                isActive(item.href)
                  ? "border-[color:var(--solar-ink)] font-medium text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <div className="lg:grid lg:grid-cols-[220px_1fr]">
        {/* Desktop: schmale linke Spalte */}
        <aside className="hidden border-r border-border lg:block">
          <nav
            aria-label="Admin-Navigation"
            className="sticky top-0 flex flex-col py-8"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "ring-focus border-l-2 px-5 py-2.5 text-sm transition-colors duration-150",
                  isActive(item.href)
                    ? "border-[color:var(--solar-ink)] font-medium text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </>
  );
}
