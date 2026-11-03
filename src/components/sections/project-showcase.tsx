import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

import { SectionTitle } from "@/components/site/section-head";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { localizeProjects } from "@/lib/data/i18n";
import { getProjectsByKind } from "@/lib/data/projects";

type Dossier = {
  title: string;
  imageUrl: string | null;
  /** Kennwerte für die Meta-Zeile unter dem Titel (mit «·» getrennt). */
  rows: ReadonlyArray<readonly [string, string]>;
};

/** Zahlenwert für die Kennzeile einer Referenz (kWp / Speicher). */
function referenzWerte(
  p: {
    kwp: number | null;
    storageKwh: number | null;
    location: string | null;
  },
  storageUnit: string,
): string {
  const teile = [
    p.kwp ? `${String(p.kwp).replace(".", ",")} kWp` : null,
    p.storageKwh ? `${String(p.storageKwh).replace(".", ",")} ${storageUnit}` : null,
  ].filter(Boolean);
  return teile.join(" · ");
}

/** Meta-Zeile einer Referenz: Ort · kWp · Speicher. */
function referenzMeta(
  p: {
    kwp: number | null;
    storageKwh: number | null;
    location: string | null;
  },
  storageUnit: string,
): string {
  return [p.location, referenzWerte(p, storageUnit)].filter(Boolean).join(" · ");
}

/** Foto im eingelassenen Rahmen — oder die Platzhalterfläche «Foto folgt». */
function KachelFoto({
  src,
  alt,
  pending,
}: {
  src: string | null;
  alt: string;
  pending: string;
}) {
  if (!src) {
    return (
      <div className="neu-in flex aspect-[4/3] items-center justify-center">
        <span className="eyebrow">{pending}</span>
      </div>
    );
  }
  return (
    <div className="neu-photo">
      <div className="relative aspect-[4/3]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}

/**
 * Anlagen: Anlagentypen und ausgeführte Referenzen als weich erhabene
 * Kacheln — Foto im eingelassenen Rahmen, Titel, eine Meta-Zeile.
 */
export async function ProjectShowcase() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("home.showcase");
  const tc = await getTranslations("common");
  const photoPending = tc("photoPending");

  // Anlagentypen aus der Verwaltung; die Startseite zeigt die ersten drei
  // (Reihenfolge = Sortierung im Admin), /projekte zeigt alle.
  const [typenAlle, referenzenRoh] = await Promise.all([
    getProjectsByKind("typ"),
    getProjectsByKind("referenz"),
  ]);
  const [typen, referenzenAlle] = await Promise.all([
    localizeProjects(typenAlle, locale),
    localizeProjects(referenzenRoh, locale),
  ]);
  // Auf der Startseite nur Referenzen mit Foto — ohne Bild wirkt die Reihe leer.
  const referenzen = referenzenAlle.filter((p) => p.images[0]).slice(0, 3);
  const ausDb: Dossier[] = typen.slice(0, 3).map((p) => ({
    title: p.title,
    imageUrl: p.images[0] ?? null,
    rows: [
      ...(p.metricLabel && p.metricValue
        ? ([[p.metricLabel, p.metricValue]] as const)
        : []),
      ...p.facts.slice(0, 2).map((f) => [f.label, f.value] as const),
    ],
  }));
  /**
   * Fallback, solange in der Verwaltung keine Anlagentypen erfasst sind.
   * Identisch zum Bestand — die Startseite sieht ohne Datenbank gleich aus.
   */
  const kuratierteDossiers: Dossier[] = (
    t.raw("dossiers") as { title: string; rows: { label: string; value: string }[] }[]
  ).map((d) => ({
    title: d.title,
    imageUrl: null,
    rows: d.rows.map((r) => [r.label, r.value] as const),
  }));
  const dossiers = ausDb.length > 0 ? ausDb : kuratierteDossiers;
  // Zahlwort für den Einleitungssatz — die Anzahl kommt aus der Verwaltung.
  const zahlwort = t.raw("introByCount") as Record<string, string>;
  const einleitung =
    zahlwort[String(dossiers.length)] ??
    t("introFallback", { count: dossiers.length });

  return (
    <section
      id="projekte"
      aria-labelledby="projekte-titel"
      className="py-14 sm:py-20"
    >
      <div className="container-page">
        <SectionTitle
          id="projekte-titel"
          title={t("title")}
          lead={t("lead", { intro: einleitung })}
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dossiers.map((d) => {
            const meta = d.rows.map(([, value]) => value).join(" · ");
            return (
              <article key={d.title} className="neu p-3 pb-5">
                <KachelFoto
                  src={d.imageUrl}
                  alt={t("typeAlt", { title: d.title })}
                  pending={photoPending}
                />
                <h3 className="mt-4 px-2 text-[17px] font-semibold leading-snug text-foreground">
                  {d.title}
                </h3>
                {meta && (
                  <p className="mt-1 px-2 text-sm tabular-nums text-muted-foreground">
                    {meta}
                  </p>
                )}
              </article>
            );
          })}
        </div>

        {/* Ausgeführte Anlagen — erscheinen, sobald freigegebene Referenzen
            mit Foto erfasst sind. */}
        {referenzen.length > 0 && (
          <div className="mt-12 sm:mt-14">
            <h3 className="text-xl font-semibold text-foreground sm:text-2xl">
              {t("completed")}
            </h3>

            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {referenzen.map((p) => {
                const meta = referenzMeta(p, t("storageUnit"));
                return (
                  <article key={p.id} className="neu p-3 pb-5">
                    <KachelFoto
                      src={p.images[0]}
                      alt={t("referenceAlt", { title: p.title })}
                      pending={photoPending}
                    />
                    <h4 className="mt-4 px-2 text-[17px] font-semibold leading-snug text-foreground">
                      {p.title}
                    </h4>
                    {meta && (
                      <p className="mt-1 px-2 text-sm tabular-nums text-muted-foreground">
                        {meta}
                      </p>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        )}

        <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
          {referenzen.length > 0
            ? t("noteWithReferences")
            : t("noteWithoutReferences")}
        </p>

        <div className="mt-4">
          <Link href="/projekte" className="btn-ghost min-h-11">
            {referenzen.length > 0 ? t("allProjects") : t("allTypes")}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
