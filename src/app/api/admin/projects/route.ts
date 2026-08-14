import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";

import { createSupabaseServerClient } from "@/lib/supabase/auth-server";
import { createServiceClient, isSupabaseConfigured } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const categoryEnum = z.enum([
  "efh",
  "mfh_zev",
  "gewerbe",
  "landwirtschaft",
  "nachruestung",
  "erweiterung",
]);

const createSchema = z.object({
  title: z.string().min(2).max(200),
  slug: z.string().min(2).max(200).optional(),
  category: categoryEnum,
  location: z.string().max(200).nullable().optional(),
  kwp: z.number().nullable().optional(),
  storageKwh: z.number().nullable().optional(),
  annualProduction: z.number().nullable().optional(),
  selfConsumption: z.number().nullable().optional(),
  description: z.string().max(4000).nullable().optional(),
  images: z.array(z.string().max(500)).optional(),
  isPublic: z.boolean().optional(),
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

type ProjectRow = {
  id: string;
  created_at: string;
  title: string;
  slug: string;
  category: string;
  location: string | null;
  kwp: number | null;
  storage_kwh: number | null;
  annual_production: number | null;
  self_consumption: number | null;
  description: string | null;
  images: unknown;
  is_public: boolean;
  sort_order: number;
};

function toProject(row: ProjectRow) {
  return {
    id: row.id,
    createdAt: row.created_at,
    title: row.title,
    slug: row.slug,
    category: row.category,
    location: row.location,
    kwp: row.kwp === null ? null : Number(row.kwp),
    storageKwh: row.storage_kwh === null ? null : Number(row.storage_kwh),
    annualProduction:
      row.annual_production === null ? null : Number(row.annual_production),
    selfConsumption:
      row.self_consumption === null ? null : Number(row.self_consumption),
    description: row.description,
    images: Array.isArray(row.images)
      ? (row.images as unknown[]).filter(
          (p): p is string => typeof p === "string",
        )
      : [],
    isPublic: row.is_public,
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

function revalidateProjects() {
  revalidateTag("projects", "max");
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
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });
    if (error) {
      console.error("[admin/projects] supabase error", error);
      return NextResponse.json(
        { error: "Laden fehlgeschlagen." },
        { status: 502 },
      );
    }
    return NextResponse.json({
      projects: ((data ?? []) as ProjectRow[]).map(toProject),
    });
  } catch (e) {
    console.error("[admin/projects] unexpected", e);
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
      .from("projects")
      .insert({
        title: d.title,
        slug,
        category: d.category,
        location: d.location ?? null,
        kwp: d.kwp ?? null,
        storage_kwh: d.storageKwh ?? null,
        annual_production: d.annualProduction ?? null,
        self_consumption: d.selfConsumption ?? null,
        description: d.description ?? null,
        images: d.images ?? [],
        is_public: d.isPublic ?? false,
        sort_order: d.sortOrder ?? 0,
      })
      .select("*")
      .single();
    if (error || !data) {
      console.error("[admin/projects] supabase error", error);
      return NextResponse.json(
        { error: "Speicherung fehlgeschlagen." },
        { status: 502 },
      );
    }

    revalidateProjects();
    return NextResponse.json({ project: toProject(data as ProjectRow) });
  } catch (e) {
    console.error("[admin/projects] unexpected", e);
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
  if (d.category !== undefined) update.category = d.category;
  if (d.location !== undefined) update.location = d.location;
  if (d.kwp !== undefined) update.kwp = d.kwp;
  if (d.storageKwh !== undefined) update.storage_kwh = d.storageKwh;
  if (d.annualProduction !== undefined)
    update.annual_production = d.annualProduction;
  if (d.selfConsumption !== undefined)
    update.self_consumption = d.selfConsumption;
  if (d.description !== undefined) update.description = d.description;
  if (d.images !== undefined) update.images = d.images ?? [];
  if (d.isPublic !== undefined) update.is_public = d.isPublic;
  if (d.sortOrder !== undefined) update.sort_order = d.sortOrder;
  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "Keine Änderungen." }, { status: 400 });
  }

  try {
    const supabase = createServiceClient();

    // Alte Bildpfade merken, damit ersetzte Bilder nicht als Waisen zurückbleiben.
    let previousImages: string[] = [];
    if (d.images !== undefined) {
      const { data: existing, error: readError } = await supabase
        .from("projects")
        .select("images")
        .eq("id", d.id)
        .maybeSingle();
      if (readError) {
        console.warn("[admin/projects] read before update failed", readError);
      } else {
        const raw = (existing as { images: unknown } | null)?.images;
        previousImages = Array.isArray(raw)
          ? (raw as unknown[]).filter(
              (p): p is string => typeof p === "string" && p.length > 0,
            )
          : [];
      }
    }

    const { data, error } = await supabase
      .from("projects")
      .update(update)
      .eq("id", d.id)
      .select("*")
      .single();
    if (error || !data) {
      console.error("[admin/projects] supabase error", error);
      return NextResponse.json(
        { error: "Speicherung fehlgeschlagen." },
        { status: 502 },
      );
    }

    // Best-effort: Pfade entfernen, die im neuen images-Array fehlen.
    if (d.images !== undefined) {
      const kept = new Set(d.images ?? []);
      const orphaned = previousImages.filter((p) => !kept.has(p));
      if (orphaned.length > 0) {
        const { error: storageError } = await supabase.storage
          .from("site-images")
          .remove(orphaned);
        if (storageError) {
          console.warn("[admin/projects] storage cleanup failed", storageError);
        }
      }
    }

    revalidateProjects();
    return NextResponse.json({ project: toProject(data as ProjectRow) });
  } catch (e) {
    console.error("[admin/projects] unexpected", e);
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
    const { data, error } = await supabase
      .from("projects")
      .delete()
      .eq("id", idResult.data)
      .select("images")
      .maybeSingle();
    if (error) {
      console.error("[admin/projects] supabase error", error);
      return NextResponse.json(
        { error: "Löschen fehlgeschlagen." },
        { status: 502 },
      );
    }

    const images = (data as { images: unknown } | null)?.images;
    const paths = Array.isArray(images)
      ? (images as unknown[]).filter(
          (p): p is string => typeof p === "string" && p.length > 0,
        )
      : [];
    if (paths.length > 0) {
      const { error: storageError } = await supabase.storage
        .from("site-images")
        .remove(paths);
      if (storageError) {
        console.warn("[admin/projects] storage delete failed", storageError);
      }
    }

    revalidateProjects();
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[admin/projects] unexpected", e);
    return NextResponse.json({ error: "Unbekannter Fehler." }, { status: 500 });
  }
}
