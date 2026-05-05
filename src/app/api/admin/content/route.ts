import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";

import { createSupabaseServerClient } from "@/lib/supabase/auth-server";
import { createServiceClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { contentSchema } from "@/lib/content/schema";
import { SITE_CONTENT_TAG } from "@/lib/content/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const requestSchema = z.object({
  key: z.enum(["hero", "contact", "faq"]),
  value: z.unknown(),
});

const sectionSchemas = {
  hero: contentSchema.shape.hero,
  contact: contentSchema.shape.contact,
  faq: contentSchema.shape.faq,
} as const;

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
