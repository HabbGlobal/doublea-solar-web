import "server-only";

import { unstable_cache } from "next/cache";

import { faqsEn } from "@/components/sections/faq-section.defaults.en";
import type { Locale } from "@/i18n/routing";
import { createServiceClient, isSupabaseConfigured } from "@/lib/supabase/server";

import { contentSchema, type SiteContent } from "./schema";
import { getSiteContent, SITE_CONTENT_TAG } from "./server";

/** Englische Fassungen von Hero und FAQ — site_content-Schlüssel hero_en / faq_en. */
export const heroEnSchema = contentSchema.shape.hero.partial();
export const faqEnSchema = contentSchema.shape.faq;

type ContentEn = {
  hero: Partial<SiteContent["hero"]>;
  faq: SiteContent["faq"] | null;
};

const getContentEn = unstable_cache(
  async (): Promise<ContentEn> => {
    const empty: ContentEn = { hero: {}, faq: null };
    if (!isSupabaseConfigured()) return empty;
    try {
      const supabase = createServiceClient();
      const { data, error } = await supabase
        .from("site_content")
        .select("key,value")
        .in("key", ["hero_en", "faq_en"]);
      if (error || !data) return empty;
      const out: ContentEn = { ...empty };
      for (const row of data) {
        if (row.key === "hero_en") {
          const p = heroEnSchema.safeParse(row.value);
          if (p.success) out.hero = p.data;
        } else if (row.key === "faq_en") {
          const p = faqEnSchema.safeParse(row.value);
          if (p.success && p.data.length > 0) out.faq = p.data;
        }
      }
      return out;
    } catch {
      return empty;
    }
  },
  ["site-content-en"],
  { tags: [SITE_CONTENT_TAG], revalidate: 60 },
);

/**
 * Site-Content in der gewünschten Sprache: Deutsch = Original; Englisch =
 * Original mit feldweisem Rückfall, wo keine Übersetzung gepflegt ist.
 */
export async function getLocalizedSiteContent(locale: Locale): Promise<SiteContent> {
  const de = await getSiteContent();
  if (locale !== "en") return de;
  const en = await getContentEn();
  const hero = { ...de.hero };
  for (const key of Object.keys(hero) as (keyof SiteContent["hero"])[]) {
    const v = en.hero[key];
    if (typeof v === "string" && v.trim()) hero[key] = v;
  }
  return { ...de, hero, faq: en.faq ?? faqsEn };
}
