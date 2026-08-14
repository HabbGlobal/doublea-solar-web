import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { TeamEditor } from "./team-editor";
import { getCurrentUser } from "@/lib/supabase/auth-server";

export const metadata: Metadata = {
  title: "Admin · Team",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminTeamPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");

  return (
    <section className="container-page py-10">
      <header className="mb-8 border-b border-border pb-6">
        <p className="eyebrow">Team</p>
        <h1 className="mt-3 text-balance text-3xl font-semibold text-foreground">
          Team verwalten
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Mitglieder erfassen, sortieren und veröffentlichen.
        </p>
      </header>

      <TeamEditor />
    </section>
  );
}
