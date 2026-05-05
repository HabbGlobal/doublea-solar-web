import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { LoginForm } from "./login-form";
import { getCurrentUser } from "@/lib/supabase/auth-server";

export const metadata: Metadata = {
  title: "Admin · Anmelden",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ from?: string; error?: string }>;
};

export default async function AdminLoginPage({ searchParams }: Props) {
  // Bereits eingeloggt? → direkt ins Dashboard
  const user = await getCurrentUser();
  if (user) redirect("/admin");

  const params = await searchParams;
  return (
    <section className="container-page flex min-h-[70vh] items-center justify-center py-12">
      <div className="w-full max-w-md rounded-3xl border border-border bg-background p-8 shadow-sm">
        <h1 className="text-balance text-2xl font-semibold text-foreground">
          Admin-Anmeldung
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Bitte melden Sie sich mit Ihrem Admin-Konto an.
        </p>
        <div className="mt-6">
          <LoginForm redirectTo={params.from || "/admin"} initialError={params.error} />
        </div>
      </div>
    </section>
  );
}
