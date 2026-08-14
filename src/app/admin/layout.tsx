import type { Metadata } from "next";

import { AdminChrome } from "./admin-chrome";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

/**
 * Admin-Shell im Werkplan-Stil. Rendert nur das Chrome (Kopfzeile + Nav);
 * der Auth-Guard bleibt unverändert in der Middleware und den einzelnen
 * Pages (getCurrentUser). Die Login-Route blendet das Chrome client-seitig
 * aus (usePathname in AdminChrome).
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <AdminChrome>{children}</AdminChrome>
    </div>
  );
}
