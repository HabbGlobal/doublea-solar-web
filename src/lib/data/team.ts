import "server-only";

import { unstable_cache } from "next/cache";

import { createServiceClient, isSupabaseConfigured } from "@/lib/supabase/server";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  imagePath: string | null;
  sortOrder: number;
  isPublished: boolean;
};

const CACHE_TAG = "team";

type TeamRow = {
  id: string;
  name: string;
  role: string;
  image_path: string | null;
  sort_order: number;
  is_published: boolean;
};

/**
 * Öffentlich publizierte Team-Mitglieder, sortiert nach sort_order.
 * Cached mit Tag `team`, damit `revalidateTag('team')` nach einem
 * Admin-Save die Public-Pages sofort aktualisiert.
 */
export const getPublishedTeamMembers = unstable_cache(
  async (): Promise<TeamMember[]> => {
    if (!isSupabaseConfigured()) {
      return [];
    }
    try {
      const supabase = createServiceClient();
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .eq("is_published", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true });
      if (error) {
        console.warn("[team] DB read error:", error.message);
        return [];
      }
      return ((data ?? []) as TeamRow[]).map((row) => ({
        id: row.id,
        name: row.name,
        role: row.role,
        imagePath: row.image_path,
        sortOrder: row.sort_order,
        isPublished: row.is_published,
      }));
    } catch (e) {
      console.warn("[team] unexpected error:", e);
      return [];
    }
  },
  ["team-published"],
  { tags: [CACHE_TAG], revalidate: 60 },
);

export const TEAM_TAG = CACHE_TAG;

/** Öffentliche URL für ein Portrait im `site-images`-Bucket. */
export function teamImageUrl(path: string | null): string | null {
  if (!path) return null;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return null;
  return `${base}/storage/v1/object/public/site-images/${path}`;
}
