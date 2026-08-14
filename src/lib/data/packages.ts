import "server-only";

import { unstable_cache } from "next/cache";

import { createServiceClient, isSupabaseConfigured } from "@/lib/supabase/server";

/** Label/Wert-Paar, wie es in den jsonb-Spalten `stats` abgelegt wird. */
export type PackageStat = {
  label: string;
  value: string;
};

export type DbPackage = {
  id: string;
  title: string;
  slug: string;
  targetGroup: string | null;
  summary: string | null;
  kwp: number | null;
  priceFrom: number | null;
  priceTo: number | null;
  stats: PackageStat[];
  includedFeatures: string[];
  optionalFeatures: string[];
  isFeatured: boolean;
  sortOrder: number;
};

const CACHE_TAG = "packages";

type PackageRow = {
  id: string;
  title: string;
  slug: string | null;
  target_group: string | null;
  summary: string | null;
  kwp: number | null;
  price_from: number | null;
  price_to: number | null;
  stats: unknown;
  included_features: unknown;
  optional_features: unknown;
  is_featured: boolean | null;
  sort_order: number | null;
};

function toStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((v): v is string => typeof v === "string")
    : [];
}

/**
 * Defensives Parsen der jsonb-Spalte `stats`: akzeptiert nur Einträge mit
 * String-Label und String-/Zahl-Wert. Alles andere wird verworfen, damit ein
 * fehlerhafter Admin-Eintrag nie die Seite bricht.
 */
function toStatArray(value: unknown): PackageStat[] {
  if (!Array.isArray(value)) return [];
  const out: PackageStat[] = [];
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
 * Alle Pakete aus der DB, sortiert nach sort_order. Leeres Array als
 * Fallback — das Frontend rendert dann seine kuratierten Defaults.
 * Cached mit Tag `packages` für revalidateTag nach Admin-Saves.
 */
export const getDbPackages = unstable_cache(
  async (): Promise<DbPackage[]> => {
    if (!isSupabaseConfigured()) {
      return [];
    }
    try {
      const supabase = createServiceClient();
      const { data, error } = await supabase
        .from("packages")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true });
      if (error) {
        console.warn("[packages] DB read error:", error.message);
        return [];
      }
      return ((data ?? []) as PackageRow[]).map((row) => ({
        id: row.id,
        title: row.title,
        slug: row.slug ?? row.id,
        targetGroup: row.target_group,
        summary: row.summary,
        kwp: toNumberOrNull(row.kwp),
        priceFrom: toNumberOrNull(row.price_from),
        priceTo: toNumberOrNull(row.price_to),
        stats: toStatArray(row.stats),
        includedFeatures: toStringArray(row.included_features),
        optionalFeatures: toStringArray(row.optional_features),
        isFeatured: row.is_featured === true,
        sortOrder: toNumberOrNull(row.sort_order) ?? 0,
      }));
    } catch (e) {
      console.warn("[packages] unexpected error:", e);
      return [];
    }
  },
  ["packages-all"],
  { tags: [CACHE_TAG], revalidate: 60 },
);

export const PACKAGES_TAG = CACHE_TAG;
