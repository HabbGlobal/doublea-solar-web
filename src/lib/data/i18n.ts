import "server-only";

import { unstable_cache } from "next/cache";
import { z } from "zod";

import type { Locale } from "@/i18n/routing";
import { createServiceClient, isSupabaseConfigured } from "@/lib/supabase/server";

/**
 * Englische Übersetzungen der im Admin gepflegten Inhalte (Team, Anlagen,
 * Pakete). Liegen als EIN Dokument in site_content unter dem Schlüssel
 * «i18n_en» — kein neues Tabellenschema nötig. Fehlt eine Übersetzung,
 * zeigt die englische Seite den deutschen Wert (Rückfall je Feld).
 */
export const I18N_EN_KEY = "i18n_en";

const pair = z.object({ label: z.string(), value: z.string() });

export const teamI18nSchema = z.object({ role: z.string().max(160).optional() });
export const projectI18nSchema = z.object({
  title: z.string().max(200).optional(),
  description: z.string().max(2000).optional(),
  metricLabel: z.string().max(80).optional(),
  metricValue: z.string().max(60).optional(),
  facts: z.array(pair).optional(),
  deliverables: z.array(z.string()).optional(),
});
export const packageI18nSchema = z.object({
  title: z.string().max(200).optional(),
  targetGroup: z.string().max(160).optional(),
  summary: z.string().max(600).optional(),
  stats: z.array(pair).optional(),
  includedFeatures: z.array(z.string()).optional(),
  optionalFeatures: z.array(z.string()).optional(),
});

export const entityI18nSchema = z.object({
  team: z.record(z.string(), teamI18nSchema).default({}),
  projects: z.record(z.string(), projectI18nSchema).default({}),
  packages: z.record(z.string(), packageI18nSchema).default({}),
});

export type EntityI18n = z.infer<typeof entityI18nSchema>;
export type TeamI18n = z.infer<typeof teamI18nSchema>;
export type ProjectI18n = z.infer<typeof projectI18nSchema>;
export type PackageI18n = z.infer<typeof packageI18nSchema>;

export const EMPTY_I18N: EntityI18n = { team: {}, projects: {}, packages: {} };

export const getI18nOverrides = unstable_cache(
  async (): Promise<EntityI18n> => {
    if (!isSupabaseConfigured()) return EMPTY_I18N;
    try {
      const supabase = createServiceClient();
      const { data, error } = await supabase
        .from("site_content")
        .select("value")
        .eq("key", I18N_EN_KEY)
        .maybeSingle();
      if (error || !data) return EMPTY_I18N;
      const parsed = entityI18nSchema.safeParse(data.value);
      return parsed.success ? parsed.data : EMPTY_I18N;
    } catch {
      return EMPTY_I18N;
    }
  },
  ["i18n-en"],
  { tags: ["site-content", "team", "projects", "packages"], revalidate: 60 },
);

/** Übersetzung nur übernehmen, wenn sie nicht leer ist — sonst Original. */
export function pick<T extends string | unknown[]>(en: T | undefined | null, de: T): T {
  if (en == null) return de;
  if (typeof en === "string") return (en.trim() ? en : de) as T;
  return (en.length > 0 ? en : de) as T;
}

/** Wendet die englischen Überschreibungen an, wenn die Sprache Englisch ist. */
export async function localizeTeam<T extends { id: string; role: string }>(
  members: T[],
  locale: Locale,
): Promise<T[]> {
  if (locale !== "en") return members;
  const o = await getI18nOverrides();
  return members.map((m) => ({ ...m, role: pick(o.team[m.id]?.role, m.role) }));
}

export async function localizeProjects<
  T extends {
    id: string;
    title: string;
    description: string | null;
    metricLabel: string | null;
    metricValue: string | null;
    facts: { label: string; value: string }[];
    deliverables: string[];
  },
>(projects: T[], locale: Locale): Promise<T[]> {
  if (locale !== "en") return projects;
  const o = await getI18nOverrides();
  return projects.map((p) => {
    const e = o.projects[p.id];
    if (!e) return p;
    return {
      ...p,
      title: pick(e.title, p.title),
      description: e.description?.trim() ? e.description : p.description,
      metricLabel: e.metricLabel?.trim() ? e.metricLabel : p.metricLabel,
      metricValue: e.metricValue?.trim() ? e.metricValue : p.metricValue,
      facts: pick(e.facts, p.facts),
      deliverables: pick(e.deliverables, p.deliverables),
    };
  });
}

export async function localizePackages<
  T extends {
    id: string;
    title: string;
    targetGroup: string | null;
    summary: string | null;
    stats: { label: string; value: string }[];
    includedFeatures: string[];
    optionalFeatures: string[];
  },
>(packages: T[], locale: Locale): Promise<T[]> {
  if (locale !== "en") return packages;
  const o = await getI18nOverrides();
  return packages.map((p) => {
    const e = o.packages[p.id];
    if (!e) return p;
    return {
      ...p,
      title: pick(e.title, p.title),
      targetGroup: e.targetGroup?.trim() ? e.targetGroup : p.targetGroup,
      summary: e.summary?.trim() ? e.summary : p.summary,
      stats: pick(e.stats, p.stats),
      includedFeatures: pick(e.includedFeatures, p.includedFeatures),
      optionalFeatures: pick(e.optionalFeatures, p.optionalFeatures),
    };
  });
}
