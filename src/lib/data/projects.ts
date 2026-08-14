import "server-only";

import { unstable_cache } from "next/cache";

import { createServiceClient, isSupabaseConfigured } from "@/lib/supabase/server";

/**
 * `typ`      = kuratierter Anlagentyp (typische Spannweiten, KEIN Kundenprojekt).
 * `referenz` = echtes, ausdrücklich freigegebenes Kundenprojekt.
 * Diese Trennung ist inhaltlich zwingend und darf nie vermischt werden.
 */
export type ProjectKind = "typ" | "referenz";

/** Label/Wert-Paar, wie es in der jsonb-Spalte `facts` abgelegt wird. */
export type ProjectFact = {
  label: string;
  value: string;
};

export type PublicProject = {
  id: string;
  title: string;
  slug: string;
  kind: ProjectKind;
  category: string;
  location: string | null;
  kwp: number | null;
  storageKwh: number | null;
  description: string | null;
  metricLabel: string | null;
  metricValue: string | null;
  facts: ProjectFact[];
  deliverables: string[];
  images: string[];
  sortOrder: number;
};

const CACHE_TAG = "projects";

type ProjectRow = {
  id: string;
  title: string;
  slug: string | null;
  kind: unknown;
  category: string | null;
  location: string | null;
  kwp: number | null;
  storage_kwh: number | null;
  description: string | null;
  metric_label: string | null;
  metric_value: string | null;
  facts: unknown;
  deliverables: unknown;
  images: unknown;
  sort_order: number | null;
};

/** Öffentliche URL für ein Projektbild im `site-images`-Bucket. */
export function projectImageUrl(path: string | null): string | null {
  if (!path) return null;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return null;
  return `${base}/storage/v1/object/public/site-images/${path}`;
}

/** Unbekannte/fehlende Werte gelten als `referenz` (konservativer Default). */
function toKind(value: unknown): ProjectKind {
  return value === "typ" ? "typ" : "referenz";
}

function toStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((v): v is string => typeof v === "string" && v.length > 0)
    : [];
}

/**
 * Defensives Parsen der jsonb-Spalte `facts`: nur Einträge mit String-Label
 * und String-/Zahl-Wert überleben. Ein fehlerhafter Admin-Eintrag darf die
 * Seite nie brechen.
 */
function toFactArray(value: unknown): ProjectFact[] {
  if (!Array.isArray(value)) return [];
  const out: ProjectFact[] = [];
  for (const entry of value) {
    if (typeof entry !== "object" || entry === null) continue;
    const { label, value: raw } = entry as { label?: unknown; value?: unknown };
    if (typeof label !== "string" || label.length === 0) continue;
    if (typeof raw === "string") {
      out.push({ label, value: raw });
    } else if (typeof raw === "number" && Number.isFinite(raw)) {
      out.push({ label, value: String(raw) });
    }
  }
  return out;
}

function toNumberOrNull(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

/**
 * Alle öffentlichen Einträge (is_public = true) — Anlagentypen UND
 * Referenzprojekte —, sortiert nach sort_order. Bild-Pfade werden auf
 * öffentliche Storage-URLs gemappt.
 * Cached mit Tag `projects` für revalidateTag nach Admin-Saves.
 */
export const getPublicProjects = unstable_cache(
  async (): Promise<PublicProject[]> => {
    if (!isSupabaseConfigured()) {
      return [];
    }
    try {
      const supabase = createServiceClient();
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("is_public", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true });
      if (error) {
        console.warn("[projects] DB read error:", error.message);
        return [];
      }
      return ((data ?? []) as ProjectRow[]).map((row) => ({
        id: row.id,
        title: row.title,
        slug: row.slug ?? row.id,
        kind: toKind(row.kind),
        category: row.category ?? "",
        location: row.location,
        kwp: toNumberOrNull(row.kwp),
        storageKwh: toNumberOrNull(row.storage_kwh),
        description: row.description,
        metricLabel: row.metric_label,
        metricValue: row.metric_value,
        facts: toFactArray(row.facts),
        deliverables: toStringArray(row.deliverables),
        images: toStringArray(row.images)
          .map((p) => projectImageUrl(p))
          .filter((u): u is string => u !== null),
        sortOrder: toNumberOrNull(row.sort_order) ?? 0,
      }));
    } catch (e) {
      console.warn("[projects] unexpected error:", e);
      return [];
    }
  },
  ["projects-public"],
  { tags: [CACHE_TAG], revalidate: 60 },
);

/**
 * Öffentliche Einträge einer Gattung. Filtert die bereits gecachte Liste —
 * keine zweite Query.
 */
export async function getProjectsByKind(
  kind: ProjectKind,
): Promise<PublicProject[]> {
  const all = await getPublicProjects();
  return all.filter((p) => p.kind === kind);
}

export const PROJECTS_TAG = CACHE_TAG;
