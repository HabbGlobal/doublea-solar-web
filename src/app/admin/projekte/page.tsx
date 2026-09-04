import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { ProjekteEditor } from "./projekte-editor";
import { getCurrentUser } from "@/lib/supabase/auth-server";

export const metadata: Metadata = {
  title: "Admin · Projekte",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminProjektePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");

  return (
    <section>
      <header className="mb-8">
        <p className="eyebrow">Projekte</p>
        <h1 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground">
          Referenzprojekte verwalten
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Projekte erfassen, sortieren und für die Website freigeben.
        </p>
      </header>

      <ProjekteEditor />
    </section>
  );
}
