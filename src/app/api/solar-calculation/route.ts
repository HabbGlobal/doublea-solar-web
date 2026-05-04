import { NextResponse } from "next/server";
import { createHash } from "node:crypto";

import { solarCalculationRequestSchema } from "@/lib/validations/lead";
import { calculateSolar } from "@/lib/solar/calculate";
import { createServiceClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { sendSolarCalculationNotification } from "@/lib/email/notify";

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

  const parsed = solarCalculationRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validierung fehlgeschlagen.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  // Server-seitige Berechnung — nicht den Client-Werten vertrauen.
  const result = calculateSolar(parsed.data.input);

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const userAgent = request.headers.get("user-agent");
  const ipHash = hashIp(ip);
  const contact = parsed.data.contact;
  const input = parsed.data.input;

  const notifyLead = contact?.email
    ? {
        name: contact.name,
        email: contact.email,
        phone: contact.phone || null,
        message: contact.message || null,
        source: "solarrechner",
        userAgent,
        ipHash,
      }
    : null;

  if (!isSupabaseConfigured()) {
    await sendSolarCalculationNotification({ lead: notifyLead, input, result });
    return NextResponse.json({ ok: true, persisted: false, result });
  }

  try {
    const supabase = createServiceClient();
    let leadId: string | null = null;

    if (contact?.email && contact.consent) {
      const { data: lead, error } = await supabase
        .from("leads")
        .insert({
          name: contact.name ?? "Solarrechner",
          email: contact.email,
          phone: contact.phone || null,
          message: contact.message || null,
          consent: contact.consent,
          source: "solarrechner",
          ip_hash: ipHash,
          user_agent: userAgent ?? null,
        })
        .select("id")
        .single();
      if (!error && lead) leadId = lead.id;
    }

    const { error } = await supabase.from("solar_calculations").insert({
      lead_id: leadId,
      building_type: input.buildingType,
      canton: input.canton,
      postal_code: input.postalCode || null,
      city: input.city || null,
      roof_area_m2: input.roofAreaM2,
      usable_roof_percent: input.usableRoofPercent,
      orientation: input.orientation,
      tilt: input.tilt,
      shading: input.shading,
      annual_consumption_kwh: input.annualConsumptionKwh,
      has_heat_pump: input.hasHeatPump,
      has_ev: input.hasEv,
      wants_battery: input.wantsBattery,
      electricity_price_rappen: input.electricityPriceRappen ?? null,
      feed_in_tariff_rappen: input.feedInTariffRappen ?? null,
      financing_interest: input.financingInterest ?? null,
      result,
      ip_hash: ipHash,
      user_agent: userAgent ?? null,
    });

    if (error) {
      console.error("[solar-calculation] supabase error", error);
      // Mail trotzdem versuchen — Anfrage darf nicht verloren gehen.
      await sendSolarCalculationNotification({ lead: notifyLead, input, result });
      return NextResponse.json({ ok: true, persisted: false, result });
    }

    await sendSolarCalculationNotification({ lead: notifyLead, input, result });

    return NextResponse.json({ ok: true, persisted: true, result }, { status: 201 });
  } catch (e) {
    console.error("[solar-calculation] unexpected", e);
    return NextResponse.json({ ok: true, persisted: false, result });
  }
}
