import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";

import { createSupabaseServerClient } from "@/lib/supabase/auth-server";
import { createServiceClient, isSupabaseConfigured } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const createSchema = z.object({
  name: z.string().min(2).max(120),
  role: z.string().min(2).max(160),
  imagePath: z.string().max(500).nullable().optional(),
  sortOrder: z.number().int().optional(),
  isPublished: z.boolean().optional(),
});

const updateSchema = z.object({
  id: z.uuid(),
  name: z.string().min(2).max(120).optional(),
  role: z.string().min(2).max(160).optional(),
  imagePath: z.string().max(500).nullable().optional(),
  sortOrder: z.number().int().optional(),
  isPublished: z.boolean().optional(),
});

type TeamRow = {
  id: string;
  created_at: string;
  name: string;
  role: string;
  image_path: string | null;
  sort_order: number;
  is_published: boolean;
};

function toMember(row: TeamRow) {
  return {
    id: row.id,
    createdAt: row.created_at,
    name: row.name,
    role: row.role,
    imagePath: row.image_path,
    sortOrder: row.sort_order,
    isPublished: row.is_published,
  };
}

async function requireAuth() {
  const auth = await createSupabaseServerClient();
  const {
    data: { user },
  } = await auth.auth.getUser();
  return user;
}

function revalidateTeam() {
  revalidateTag("team", "max");
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
      .from("team_members")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });
    if (error) {
      console.error("[admin/team] supabase error", error);
      return NextResponse.json(
        { error: "Laden fehlgeschlagen." },
        { status: 502 },
      );
    }
    return NextResponse.json({
      members: ((data ?? []) as TeamRow[]).map(toMember),
    });
  } catch (e) {
    console.error("[admin/team] unexpected", e);
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

  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("team_members")
      .insert({
        name: parsed.data.name,
        role: parsed.data.role,
        image_path: parsed.data.imagePath ?? null,
        sort_order: parsed.data.sortOrder ?? 0,
        is_published: parsed.data.isPublished ?? false,
      })
      .select("*")
      .single();
    if (error || !data) {
      console.error("[admin/team] supabase error", error);
      return NextResponse.json(
        { error: "Speicherung fehlgeschlagen." },
        { status: 502 },
      );
    }

    revalidateTeam();
    return NextResponse.json({ member: toMember(data as TeamRow) });
  } catch (e) {
    console.error("[admin/team] unexpected", e);
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

  const { id, name, role, imagePath, sortOrder, isPublished } = parsed.data;
  const update: Record<string, unknown> = {};
  if (name !== undefined) update.name = name;
  if (role !== undefined) update.role = role;
  if (imagePath !== undefined) update.image_path = imagePath;
  if (sortOrder !== undefined) update.sort_order = sortOrder;
  if (isPublished !== undefined) update.is_published = isPublished;
  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "Keine Änderungen." }, { status: 400 });
  }

  try {
    const supabase = createServiceClient();

    // Altes Bild merken, damit es beim Ersetzen nicht als Waise zurückbleibt.
    let previousImagePath: string | null = null;
    if (imagePath !== undefined) {
      const { data: existing, error: readError } = await supabase
        .from("team_members")
        .select("image_path")
        .eq("id", id)
        .maybeSingle();
      if (readError) {
        console.warn("[admin/team] read before update failed", readError);
      } else {
        previousImagePath =
          (existing as { image_path: string | null } | null)?.image_path ??
          null;
      }
    }

    const { data, error } = await supabase
      .from("team_members")
      .update(update)
      .eq("id", id)
      .select("*")
      .single();
    if (error || !data) {
      console.error("[admin/team] supabase error", error);
      return NextResponse.json(
        { error: "Speicherung fehlgeschlagen." },
        { status: 502 },
      );
    }

    // Best-effort: ersetztes Bild aus dem Storage entfernen.
    if (
      imagePath !== undefined &&
      previousImagePath &&
      previousImagePath !== imagePath
    ) {
      const { error: storageError } = await supabase.storage
        .from("site-images")
        .remove([previousImagePath]);
      if (storageError) {
        console.warn("[admin/team] storage cleanup failed", storageError);
      }
    }

    revalidateTeam();
    return NextResponse.json({ member: toMember(data as TeamRow) });
  } catch (e) {
    console.error("[admin/team] unexpected", e);
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
      .from("team_members")
      .delete()
      .eq("id", idResult.data)
      .select("image_path")
      .maybeSingle();
    if (error) {
      console.error("[admin/team] supabase error", error);
      return NextResponse.json(
        { error: "Löschen fehlgeschlagen." },
        { status: 502 },
      );
    }

    const imagePath = (data as { image_path: string | null } | null)?.image_path;
    if (imagePath) {
      const { error: storageError } = await supabase.storage
        .from("site-images")
        .remove([imagePath]);
      if (storageError) {
        console.warn("[admin/team] storage delete failed", storageError);
      }
    }

    revalidateTeam();
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[admin/team] unexpected", e);
    return NextResponse.json({ error: "Unbekannter Fehler." }, { status: 500 });
  }
}
