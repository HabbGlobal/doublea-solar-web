import Link from "next/link";
import type { Metadata } from "next";

import { Logo } from "@/components/site/logo";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="border-b border-border bg-background">
        <div className="container-page flex h-14 items-center justify-between">
          <Link href="/admin" className="ring-focus rounded-md">
            <Logo />
          </Link>
          <nav className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="ring-focus rounded-md hover:text-foreground"
            >
              Live-Site öffnen ↗
            </Link>
            <form action="/api/admin/auth/logout" method="post">
              <button
                type="submit"
                className="ring-focus rounded-md hover:text-foreground"
              >
                Abmelden
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
