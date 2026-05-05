import "server-only";

import { unstable_cache } from "next/cache";

import { createServiceClient, isSupabaseConfigured } from "@/lib/supabase/server";
import {
  contentSchema,
  defaultContent,
  defaultFor,
  type SiteContent,
} from "./schema";

const CACHE_TAG = "site-content";

/**
 * Lädt alle in der DB vorhandenen Content-Keys und merged sie mit den
 * Defaults. Cached über `unstable_cache` mit Tag `site-content`, damit
 * `revalidateTag('site-content')` nach einem Save die Public-Pages
 * sofort aktualisiert.
 */
export const getSiteContent = unstable_cache(
  async (): Promise<SiteContent> => {
    if (!isSupabaseConfigured()) {
      return defaultContent;
    }
    try {
      const supabase = createServiceClient();
      const { data, error } = await supabase
        .from("site_content")
        .select("key,value");
      if (error) {
        console.warn("[content] DB read error:", error.message);
        return defaultContent;
      }
      // Map DB-Rows in das verschachtelte SiteContent-Objekt
      const fromDb: Record<string, unknown> = {};
      for (const row of data ?? []) {
        fromDb[row.key] = row.value;
      }
      const merged: SiteContent = {
        hero: { ...defaultFor("hero"), ...((fromDb.hero as object) ?? {}) },
        contact: {
          ...defaultFor("contact"),
          ...((fromDb.contact as object) ?? {}),
        },
        faq: Array.isArray(fromDb.faq)
          ? (fromDb.faq as SiteContent["faq"])
          : defaultFor("faq"),
      };
      // Validierung: bei kaputten DB-Werten zurück auf Defaults
      const parsed = contentSchema.safeParse(merged);
      return parsed.success ? parsed.data : defaultContent;
    } catch (e) {
      console.warn("[content] unexpected error:", e);
      return defaultContent;
    }
  },
  ["site-content-all"],
  { tags: [CACHE_TAG], revalidate: 60 },
);

export const SITE_CONTENT_TAG = CACHE_TAG;
