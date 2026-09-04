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

const NAV_LINK_BASE =
  "ring-focus inline-flex min-h-11 shrink-0 items-center rounded-xl px-4 text-sm transition-[box-shadow,color] duration-150";
const NAV_LINK_ACTIVE =
  "shadow-[var(--neu-inset)] font-semibold text-[color:var(--solar-gold-dark)]";
const NAV_LINK_IDLE = "text-muted-foreground hover:text-foreground";

/**
 * Client-Chrome des Admin-Bereichs im Soft-Solar-System: weich erhabene
 * Kopfleiste + Navigation als Pill-Liste. Auf der Login-Route wird das
 * Chrome ausgeblendet (Seite bleibt offen, der Auth-Guard liegt
 * unverändert in Middleware + Pages).
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
      <header className="container-page pt-4 sm:pt-5">
        <div className="neu-sm flex min-h-16 items-center justify-between gap-4 px-4 py-2 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="ring-focus rounded-xl"
              aria-label="Admin-Startseite"
            >
              <Logo className="h-9" />
            </Link>
            <span className="eyebrow">Admin</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-5">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost hidden text-sm sm:inline-flex"
            >
              Live-Site öffnen
            </a>
            <button
              type="button"
              onClick={logout}
              disabled={loggingOut}
              className="btn-secondary min-h-10 px-4 text-sm disabled:pointer-events-none disabled:opacity-50"
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

        {/* Mobile: horizontal scrollbare Pill-Leiste */}
        <nav
          aria-label="Admin-Navigation"
          className="neu-sm mt-4 flex gap-1 overflow-x-auto p-2 lg:hidden"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                NAV_LINK_BASE,
                isActive(item.href) ? NAV_LINK_ACTIVE : NAV_LINK_IDLE,
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <div className="container-page py-8 lg:grid lg:grid-cols-[220px_1fr] lg:gap-8">
        {/* Desktop: Navigation als Spalte links */}
        <aside className="hidden lg:block">
          <nav
            aria-label="Admin-Navigation"
            className="neu-sm sticky top-6 flex flex-col gap-1 p-2"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  NAV_LINK_BASE,
                  isActive(item.href) ? NAV_LINK_ACTIVE : NAV_LINK_IDLE,
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
