import type { Metadata } from "next";

import { ContentEditor } from "./content-editor";
import { getSiteContent } from "@/lib/content/server";
import { getCurrentUser } from "@/lib/supabase/auth-server";

export const metadata: Metadata = {
  title: "Admin · Inhalte",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [user, content] = await Promise.all([getCurrentUser(), getSiteContent()]);
  return (
    <section>
      <header className="mb-8">
        <p className="eyebrow">Inhalte</p>
        <h1 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground">
          Inhalte der Website bearbeiten
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Eingeloggt als <span className="font-medium text-foreground">{user?.email}</span>.
          Änderungen sind nach dem Speichern sofort öffentlich sichtbar.
        </p>
      </header>

      <ContentEditor initialContent={content} />
    </section>
  );
}
