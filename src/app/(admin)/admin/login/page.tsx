import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { LoginForm } from "./login-form";
import { Logo } from "@/components/site/logo";
import { getCurrentUser } from "@/lib/supabase/auth-server";

export const metadata: Metadata = {
  title: "Admin · Anmelden",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ from?: string; error?: string }>;
};

export default async function AdminLoginPage({ searchParams }: Props) {
  // Bereits eingeloggt? → direkt ins Dashboard
  const user = await getCurrentUser();
  if (user) redirect("/admin");

  const params = await searchParams;
  return (
    <section className="container-page flex min-h-[80vh] items-center justify-center py-14 sm:py-20">
      <div className="neu w-full max-w-md p-8 sm:p-10">
        <div className="flex items-center justify-between gap-4">
          <Logo className="h-10" priority />
          <span className="eyebrow">Admin</span>
        </div>
        <h1 className="mt-8 text-balance text-2xl font-bold tracking-tight text-foreground">
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
