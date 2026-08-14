import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { LeadsTable } from "./leads-table";
import { getCurrentUser } from "@/lib/supabase/auth-server";

export const metadata: Metadata = {
  title: "Admin · Anfragen",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminAnfragenPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");

  return (
    <section className="container-page py-10">
      <header className="mb-8 border-b border-border pb-6">
        <p className="eyebrow">Anfragen</p>
        <h1 className="mt-3 text-balance text-3xl font-semibold text-foreground">
          Eingegangene Anfragen
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Leseansicht mit Status-Pflege — Einträge werden nicht gelöscht.
        </p>
      </header>

      <LeadsTable />
    </section>
  );
}
