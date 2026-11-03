import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";

import { createSupabaseServerClient } from "@/lib/supabase/auth-server";
import { createServiceClient, isSupabaseConfigured } from "@/lib/supabase/server";
import {
  EMPTY_I18N,
  I18N_EN_KEY,
  entityI18nSchema,
  packageI18nSchema,
  projectI18nSchema,
  teamI18nSchema,
} from "@/lib/data/i18n";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const patchSchema = z.discriminatedUnion("entity", [
  z.object({ entity: z.literal("team"), id: z.uuid(), fields: teamI18nSchema }),
  z.object({ entity: z.literal("projects"), id: z.uuid(), fields: projectI18nSchema }),
  z.object({ entity: z.literal("packages"), id: z.uuid(), fields: packageI18nSchema }),
]);

async function requireAuth() {
  const auth = await createSupabaseServerClient();
  const {
    data: { user },
  } = await auth.auth.getUser();
  return user;
}

/** Liefert das komplette Übersetzungsdokument (für die Editoren). */
export async function GET() {
  const user = await requireAuth();
  if (!user) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase nicht konfiguriert." }, { status: 503 });
  }
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("site_content")
    .select("value")
    .eq("key", I18N_EN_KEY)
    .maybeSingle();
  if (error) {
    console.error("[admin/i18n] supabase error", error);
    return NextResponse.json({ error: "Laden fehlgeschlagen." }, { status: 502 });
  }
  const parsed = entityI18nSchema.safeParse(data?.value ?? EMPTY_I18N);
  return NextResponse.json({ i18n: parsed.success ? parsed.data : EMPTY_I18N });
}

/**
 * Setzt die englischen Felder EINES Eintrags (Team-Mitglied, Anlage, Paket).
 * Lesen-Ändern-Schreiben auf dem Dokument; leere Felder löschen die
 * Übersetzung (→ Rückfall auf Deutsch).
 */
export async function PATCH(request: Request) {
  const user = await requireAuth();
  if (!user) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültiger Body." }, { status: 400 });
  }
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validierung fehlgeschlagen.", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase nicht konfiguriert." }, { status: 503 });
  }

  try {
    const supabase = createServiceClient();
    const { data } = await supabase
      .from("site_content")
      .select("value")
      .eq("key", I18N_EN_KEY)
      .maybeSingle();
    const current = entityI18nSchema.safeParse(data?.value ?? EMPTY_I18N);
    const doc = structuredClone(current.success ? current.data : EMPTY_I18N);

    const { entity, id, fields } = parsed.data;
    // Leere Strings/Arrays entfernen → Feld fällt auf Deutsch zurück.
    const cleaned = Object.fromEntries(
      Object.entries(fields).filter(([, v]) =>
        typeof v === "string" ? v.trim().length > 0 : Array.isArray(v) ? v.length > 0 : v != null,
      ),
    );
    const bucket = doc[entity] as Record<string, Record<string, unknown>>;
    if (Object.keys(cleaned).length === 0) delete bucket[id];
    else bucket[id] = cleaned;

    const { error } = await supabase.from("site_content").upsert(
      {
        key: I18N_EN_KEY,
        value: doc,
        updated_at: new Date().toISOString(),
        updated_by: user.email ?? user.id,
      },
      { onConflict: "key" },
    );
    if (error) {
      console.error("[admin/i18n] supabase error", error);
      return NextResponse.json({ error: "Speicherung fehlgeschlagen." }, { status: 502 });
    }

    revalidateTag("site-content", "max");
    revalidateTag(entity === "team" ? "team" : entity, "max");
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true, entry: bucket[id] ?? null });
  } catch (e) {
    console.error("[admin/i18n] unexpected", e);
    return NextResponse.json({ error: "Unbekannter Fehler." }, { status: 500 });
  }
}
