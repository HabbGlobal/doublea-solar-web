import { NextResponse } from "next/server";
import { createHash } from "node:crypto";

import { leadSchema } from "@/lib/validations/lead";
import { createServiceClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { sendLeadNotification } from "@/lib/email/notify";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function hashIp(ip: string | null | undefined): string | null {
  if (!ip) return null;
  return createHash("sha256")
    .update(ip + (process.env.NEXT_PUBLIC_SITE_URL ?? ""))
    .digest("hex")
    .slice(0, 32);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültiger Body." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validierung fehlgeschlagen.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  // Honeypot — wenn ausgefüllt, antworten wir absichtlich freundlich.
  if (parsed.data.company_website && parsed.data.company_website.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const userAgent = request.headers.get("user-agent");
  const ipHash = hashIp(ip);

  const notificationPayload = {
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone || null,
    address: parsed.data.address || null,
    heatingType: parsed.data.heatingType || null,
    householdSize: parsed.data.householdSize || null,
    message: parsed.data.message || null,
    source: parsed.data.source ?? "website",
    userAgent,
    ipHash,
  };

  // Datenbank-Speicherung versuchen — ein Fehler darf die Anfrage NICHT
  // abbrechen. Die Mail-Benachrichtigung unten ist das Sicherheitsnetz,
  // damit niemals ein Lead verloren geht (z. B. bei fehlender Spalte
  // oder pausiertem Supabase-Projekt).
  let persisted = false;
  if (isSupabaseConfigured()) {
    try {
      const supabase = createServiceClient();
      const { error } = await supabase.from("leads").insert({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        address: parsed.data.address || null,
        heating_type: parsed.data.heatingType || null,
        household_size: parsed.data.householdSize || null,
        message: parsed.data.message || null,
        consent: parsed.data.consent,
        source: parsed.data.source ?? "website",
        ip_hash: ipHash,
        user_agent: userAgent ?? null,
      });
      if (error) {
        console.error("[leads] supabase error", error);
      } else {
        persisted = true;
      }
    } catch (e) {
      console.error("[leads] supabase exception", e);
    }
  } else {
    console.warn("[leads] Supabase nicht konfiguriert – Lead nur per Mail.");
  }

  // Mail immer senden — auch wenn die DB-Speicherung gescheitert ist.
  const emailed = await sendLeadNotification(notificationPayload);

  // Echten Fehler nur zeigen, wenn die Anfrage WIRKLICH nirgends ankam.
  if (!persisted && !emailed) {
    console.error("[leads] Lead konnte weder gespeichert noch gemailt werden.");
    return NextResponse.json(
      { error: "Anfrage konnte nicht übermittelt werden." },
      { status: 502 },
    );
  }

  return NextResponse.json(
    { ok: true, persisted },
    { status: persisted ? 201 : 200 },
  );
}
