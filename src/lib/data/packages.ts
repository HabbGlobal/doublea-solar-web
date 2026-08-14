import "server-only";

import { unstable_cache } from "next/cache";

import { createServiceClient, isSupabaseConfigured } from "@/lib/supabase/server";

export type DbPackage = {
  id: string;
  title: string;
  kwp: number | null;
  targetGroup: string | null;
  priceFrom: number | null;
  priceTo: number | null;
  includedFeatures: string[];
  optionalFeatures: string[];
  sortOrder: number;
};

const CACHE_TAG = "packages";

type PackageRow = {
  id: string;
  title: string;
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
    ? value.filter((v): v is string => typeof v === "string")
    : [];
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
        kwp: row.kwp === null ? null : Number(row.kwp),
        targetGroup: row.target_group,
        priceFrom: row.price_from === null ? null : Number(row.price_from),
        priceTo: row.price_to === null ? null : Number(row.price_to),
        includedFeatures: toStringArray(row.included_features),
        optionalFeatures: toStringArray(row.optional_features),
        sortOrder: row.sort_order,
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
