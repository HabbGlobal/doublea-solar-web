import { NextResponse } from "next/server";
import { z } from "zod";

import { createSupabaseServerClient } from "@/lib/supabase/auth-server";
import { createServiceClient, isSupabaseConfigured } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const statusEnum = z.enum([
  "new",
  "contacted",
  "qualified",
  "offer_sent",
  "won",
  "lost",
]);

const patchSchema = z.object({
  id: z.uuid(),
  status: statusEnum,
});

type LeadRow = {
  id: string;
  created_at: string;
  source: string;
  name: string | null;
  email: string;
  phone: string | null;
  address: string | null;
  heating_type: string | null;
  household_size: number | null;
  message: string | null;
  status: string;
};

function toLead(row: LeadRow) {
  return {
    id: row.id,
    createdAt: row.created_at,
    source: row.source,
    name: row.name,
    email: row.email,
    phone: row.phone,
    address: row.address,
    heatingType: row.heating_type,
    householdSize: row.household_size,
    message: row.message,
    status: row.status,
  };
}

async function requireAuth() {
  const auth = await createSupabaseServerClient();
  const {
    data: { user },
  } = await auth.auth.getUser();
  return user;
}

export async function GET(request: Request) {
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

  const params = new URL(request.url).searchParams;
  const limitRaw = Number.parseInt(params.get("limit") ?? "", 10);
  const offsetRaw = Number.parseInt(params.get("offset") ?? "", 10);
  const limit = Number.isFinite(limitRaw)
    ? Math.min(Math.max(limitRaw, 1), 200)
    : 50;
  const offset = Number.isFinite(offsetRaw) ? Math.max(offsetRaw, 0) : 0;

  try {
    const supabase = createServiceClient();
    const { data, error, count } = await supabase
      .from("leads")
      .select(
        "id,created_at,source,name,email,phone,address,heating_type,household_size,message,status",
        { count: "exact" },
      )
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);
    if (error) {
      console.error("[admin/leads] supabase error", error);
      return NextResponse.json(
        { error: "Laden fehlgeschlagen." },
        { status: 502 },
      );
    }
    return NextResponse.json({
      leads: ((data ?? []) as LeadRow[]).map(toLead),
      total: count ?? 0,
    });
  } catch (e) {
    console.error("[admin/leads] unexpected", e);
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

  const parsed = patchSchema.safeParse(body);
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
    const { error } = await supabase
      .from("leads")
      .update({ status: parsed.data.status })
      .eq("id", parsed.data.id);
    if (error) {
      console.error("[admin/leads] supabase error", error);
      return NextResponse.json(
        { error: "Speicherung fehlgeschlagen." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[admin/leads] unexpected", e);
    return NextResponse.json({ error: "Unbekannter Fehler." }, { status: 500 });
  }
}
