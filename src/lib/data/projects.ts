import "server-only";

import { unstable_cache } from "next/cache";

import { createServiceClient, isSupabaseConfigured } from "@/lib/supabase/server";

export type PublicProject = {
  id: string;
  title: string;
  category: string;
  location: string | null;
  kwp: number | null;
  storageKwh: number | null;
  description: string | null;
  images: string[];
  sortOrder: number;
};

const CACHE_TAG = "projects";

type ProjectRow = {
  id: string;
  title: string;
  category: string;
  location: string | null;
  kwp: number | null;
  storage_kwh: number | null;
  description: string | null;
  images: unknown;
  sort_order: number;
};

/** Öffentliche URL für ein Projektbild im `site-images`-Bucket. */
export function projectImageUrl(path: string | null): string | null {
  if (!path) return null;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return null;
  return `${base}/storage/v1/object/public/site-images/${path}`;
}

/**
 * Freigegebene Referenzprojekte (is_public = true), sortiert nach
 * sort_order. Bild-Pfade werden auf öffentliche Storage-URLs gemappt.
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
        category: row.category,
        location: row.location,
        kwp: row.kwp === null ? null : Number(row.kwp),
        storageKwh: row.storage_kwh === null ? null : Number(row.storage_kwh),
        description: row.description,
        images: Array.isArray(row.images)
          ? (row.images as string[])
              .filter((p): p is string => typeof p === "string" && p.length > 0)
              .map((p) => projectImageUrl(p))
              .filter((u): u is string => u !== null)
          : [],
        sortOrder: row.sort_order,
      }));
    } catch (e) {
      console.warn("[projects] unexpected error:", e);
      return [];
    }
  },
  ["projects-public"],
  { tags: [CACHE_TAG], revalidate: 60 },
);

export const PROJECTS_TAG = CACHE_TAG;
