"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { createClient } from "@/lib/supabase/client";

type Props = {
  redirectTo: string;
  initialError?: string;
};

export function LoginForm({ redirectTo, initialError }: Props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(initialError ?? null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (authError) {
        setError(authError.message || "Anmeldung fehlgeschlagen.");
        return;
      }
      router.push(redirectTo);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unbekannter Fehler.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="login-email">E-Mail</FieldLabel>
          <Input
            id="login-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-11"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="login-password">Passwort</FieldLabel>
          <Input
            id="login-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-11"
          />
        </Field>
        {error && (
          <FieldError>
            <p>{error}</p>
          </FieldError>
        )}
      </FieldGroup>

      <Button
        type="submit"
        size="lg"
        disabled={loading}
        className="h-11 w-full rounded-xl bg-[color:var(--solar-navy)] text-[color:var(--solar-navy-foreground)] hover:bg-[color:var(--solar-navy)]/95"
      >
        {loading ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Anmelden …
          </>
        ) : (
          "Anmelden"
        )}
      </Button>
    </form>
  );
}
