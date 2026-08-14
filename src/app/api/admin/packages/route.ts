import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";

import { createSupabaseServerClient } from "@/lib/supabase/auth-server";
import { createServiceClient, isSupabaseConfigured } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const createSchema = z.object({
  title: z.string().min(2).max(200),
  slug: z.string().min(2).max(200).optional(),
  kwp: z.number().nullable().optional(),
  targetGroup: z.string().max(200).nullable().optional(),
  priceFrom: z.number().nullable().optional(),
  priceTo: z.number().nullable().optional(),
  includedFeatures: z.array(z.string().max(300)).optional(),
  optionalFeatures: z.array(z.string().max(300)).optional(),
  sortOrder: z.number().int().optional(),
});

const updateSchema = createSchema.partial().extend({
  id: z.uuid(),
});

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replaceAll("ä", "ae")
    .replaceAll("ö", "oe")
    .replaceAll("ü", "ue")
    .replaceAll("ß", "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type PackageRow = {
  id: string;
  created_at: string;
  title: string;
  slug: string;
  kwp: number | null;
  target_group: string | null;
  price_from: number | null;
  price_to: number | null;
  included_features: unknown;
  optional_features: unknown;
  sort_order: number;
};

function toStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? (value as unknown[]).filter((v): v is string => typeof v === "string")
    : [];
}

function toPackage(row: PackageRow) {
  return {
    id: row.id,
    createdAt: row.created_at,
    title: row.title,
    slug: row.slug,
    kwp: row.kwp === null ? null : Number(row.kwp),
    targetGroup: row.target_group,
    priceFrom: row.price_from === null ? null : Number(row.price_from),
    priceTo: row.price_to === null ? null : Number(row.price_to),
    includedFeatures: toStringArray(row.included_features),
    optionalFeatures: toStringArray(row.optional_features),
    sortOrder: row.sort_order,
  };
}

async function requireAuth() {
  const auth = await createSupabaseServerClient();
  const {
    data: { user },
  } = await auth.auth.getUser();
  return user;
}

function revalidatePackages() {
  revalidateTag("packages", "max");
  revalidatePath("/", "layout");
}

export async function GET() {
  const user = await requireAuth();
  if (!user) {
    return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });
  }
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase nicht konfiguriert." },
      { status: 503 },
    );
  }
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("packages")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });
    if (error) {
      console.error("[admin/packages] supabase error", error);
      return NextResponse.json(
        { error: "Laden fehlgeschlagen." },
        { status: 502 },
      );
    }
    return NextResponse.json({
      packages: ((data ?? []) as PackageRow[]).map(toPackage),
    });
  } catch (e) {
    console.error("[admin/packages] unexpected", e);
    return NextResponse.json({ error: "Unbekannter Fehler." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const user = await requireAuth();
  if (!user) {
    return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültiger Body." }, { status: 400 });
  }

  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validierung fehlgeschlagen.", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase nicht konfiguriert." },
      { status: 503 },
    );
  }

  const d = parsed.data;
  const slug = d.slug ? slugify(d.slug) : slugify(d.title);
  if (!slug) {
    return NextResponse.json(
      { error: "Slug konnte nicht erzeugt werden." },
      { status: 400 },
    );
  }

  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("packages")
      .insert({
        title: d.title,
        slug,
        kwp: d.kwp ?? null,
        target_group: d.targetGroup ?? null,
        price_from: d.priceFrom ?? null,
        price_to: d.priceTo ?? null,
        included_features: d.includedFeatures ?? [],
        optional_features: d.optionalFeatures ?? [],
        sort_order: d.sortOrder ?? 0,
      })
      .select("*")
      .single();
    if (error || !data) {
      console.error("[admin/packages] supabase error", error);
      return NextResponse.json(
        { error: "Speicherung fehlgeschlagen." },
        { status: 502 },
      );
    }

    revalidatePackages();
    return NextResponse.json({ package: toPackage(data as PackageRow) });
  } catch (e) {
    console.error("[admin/packages] unexpected", e);
    return NextResponse.json({ error: "Unbekannter Fehler." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const user = await requireAuth();
  if (!user) {
    return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültiger Body." }, { status: 400 });
  }

  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validierung fehlgeschlagen.", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase nicht konfiguriert." },
      { status: 503 },
    );
  }

  const d = parsed.data;
  const update: Record<string, unknown> = {};
  if (d.title !== undefined) update.title = d.title;
  if (d.slug !== undefined) {
    const slug = slugify(d.slug ?? "");
    if (!slug) {
      return NextResponse.json({ error: "Ungültiger Slug." }, { status: 400 });
    }
    update.slug = slug;
  }
  if (d.kwp !== undefined) update.kwp = d.kwp;
  if (d.targetGroup !== undefined) update.target_group = d.targetGroup;
  if (d.priceFrom !== undefined) update.price_from = d.priceFrom;
  if (d.priceTo !== undefined) update.price_to = d.priceTo;
  if (d.includedFeatures !== undefined)
    update.included_features = d.includedFeatures ?? [];
  if (d.optionalFeatures !== undefined)
    update.optional_features = d.optionalFeatures ?? [];
  if (d.sortOrder !== undefined) update.sort_order = d.sortOrder;
  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "Keine Änderungen." }, { status: 400 });
  }

  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("packages")
      .update(update)
      .eq("id", d.id)
      .select("*")
      .single();
    if (error || !data) {
      console.error("[admin/packages] supabase error", error);
      return NextResponse.json(
        { error: "Speicherung fehlgeschlagen." },
        { status: 502 },
      );
    }

    revalidatePackages();
    return NextResponse.json({ package: toPackage(data as PackageRow) });
  } catch (e) {
    console.error("[admin/packages] unexpected", e);
    return NextResponse.json({ error: "Unbekannter Fehler." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const user = await requireAuth();
  if (!user) {
    return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });
  }

  const id = new URL(request.url).searchParams.get("id");
  const idResult = z.uuid().safeParse(id);
  if (!idResult.success) {
    return NextResponse.json({ error: "Ungültige ID." }, { status: 400 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase nicht konfiguriert." },
      { status: 503 },
    );
  }

  try {
    const supabase = createServiceClient();
    const { error } = await supabase
      .from("packages")
      .delete()
      .eq("id", idResult.data);
    if (error) {
      console.error("[admin/packages] supabase error", error);
      return NextResponse.json(
        { error: "Löschen fehlgeschlagen." },
        { status: 502 },
      );
    }

    revalidatePackages();
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[admin/packages] unexpected", e);
    return NextResponse.json({ error: "Unbekannter Fehler." }, { status: 500 });
  }
}
