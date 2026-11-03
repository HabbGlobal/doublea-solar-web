import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { PaketeEditor } from "./pakete-editor";
import { getCurrentUser } from "@/lib/supabase/auth-server";

export const metadata: Metadata = {
  title: "Admin · Pakete",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPaketePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");

  return (
    <section>
      <header className="mb-8">
        <p className="eyebrow">Pakete</p>
        <h1 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground">
          Pakete verwalten
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Angebotspakete mit Richtpreisen und Leistungspunkten pflegen.
        </p>
      </header>

      <PaketeEditor />
    </section>
  );
}
