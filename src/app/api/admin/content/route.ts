import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";

import { createSupabaseServerClient } from "@/lib/supabase/auth-server";
import { createServiceClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { contentSchema } from "@/lib/content/schema";
import { SITE_CONTENT_TAG } from "@/lib/content/server";
import { faqEnSchema, heroEnSchema } from "@/lib/content/localized";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const requestSchema = z.object({
  key: z.enum(["hero", "contact", "faq", "hero_en", "faq_en"]),
  value: z.unknown(),
});

const sectionSchemas = {
  hero: contentSchema.shape.hero,
  contact: contentSchema.shape.contact,
  faq: contentSchema.shape.faq,
  // Englische Fassungen — Felder optional, Rückfall auf Deutsch je Feld.
  hero_en: heroEnSchema,
  faq_en: faqEnSchema,
} as const;

/** Nur die englischen Fassungen sind per GET lesbar (die deutschen kommen serverseitig). */
const readableKeys = z.enum(["hero_en", "faq_en"]);

/**
 * GET ?key=hero_en|faq_en → { value } (gespeicherte englische Fassung) oder
 * { value: null }, wenn noch nichts gepflegt ist. Für den Content-Editor.
 */
export async function GET(request: Request) {
  const auth = await createSupabaseServerClient();
  const {
    data: { user },
  } = await auth.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });
  }

  const keyParam = new URL(request.url).searchParams.get("key");
  const keyResult = readableKeys.safeParse(keyParam);
  if (!keyResult.success) {
    return NextResponse.json({ error: "Ungültiger Schlüssel." }, { status: 400 });
  }
  const key = keyResult.data;

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase nicht konfiguriert." },
      { status: 503 },
    );
  }

  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("site_content")
      .select("value")
      .eq("key", key)
      .maybeSingle();
    if (error) {
      console.error("[admin/content] supabase error", error);
      return NextResponse.json({ error: "Laden fehlgeschlagen." }, { status: 502 });
    }
    if (!data) return NextResponse.json({ value: null });

    // Gegen das Sektions-Schema prüfen — defekte Altdaten wie «leer» behandeln.
    const parsed = sectionSchemas[key].safeParse(data.value);
    return NextResponse.json({ value: parsed.success ? parsed.data : null });
  } catch (e) {
    console.error("[admin/content] unexpected", e);
    return NextResponse.json({ error: "Unbekannter Fehler." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  // Auth-Check
  const auth = await createSupabaseServerClient();
  const {
    data: { user },
  } = await auth.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültiger Body." }, { status: 400 });
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validierung fehlgeschlagen.", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  // Sektion-spezifisches Schema validieren
  const sectionSchema = sectionSchemas[parsed.data.key];
  const sectionResult = sectionSchema.safeParse(parsed.data.value);
  if (!sectionResult.success) {
    return NextResponse.json(
      {
        error: "Inhalts-Validierung fehlgeschlagen.",
        issues: sectionResult.error.flatten(),
      },
      { status: 400 },
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase nicht konfiguriert." },
      { status: 503 },
    );
  }

  try {
    const supabase = createServiceClient();
    const { error } = await supabase.from("site_content").upsert(
      {
        key: parsed.data.key,
        value: sectionResult.data,
        updated_at: new Date().toISOString(),
        updated_by: user.email ?? user.id,
      },
      { onConflict: "key" },
    );
    if (error) {
      console.error("[admin/content] supabase error", error);
      return NextResponse.json(
        { error: "Speicherung fehlgeschlagen." },
        { status: 502 },
      );
    }

    // Public-Pages revalidieren — Next.js 16 verlangt zweites Argument.
    revalidateTag(SITE_CONTENT_TAG, "max");
    revalidatePath("/", "layout");

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[admin/content] unexpected", e);
    return NextResponse.json({ error: "Unbekannter Fehler." }, { status: 500 });
  }
}
