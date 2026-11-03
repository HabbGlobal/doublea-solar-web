/**
 * Projekte — datenbankgetrieben aus der Supabase-Tabelle `projects`:
 *
 *   kind = 'typ'      → kuratierte Anlagentypen (typische Spannweiten,
 *                       bewusst KEINE erfundenen Kundenprojekte)
 *   kind = 'referenz' → echte, ausdrücklich freigegebene Kundenprojekte
 *
 * Die Trennung ist inhaltlich zwingend (Ehrlichkeitsregel der Website) und
 * wird nie vermischt. Solange keine Anlagentypen in der DB liegen, rendern
 * die kuratierten Defaults aus messages/<locale>/projekte.json («fallback»)
 * — die Seite sieht in beiden Fällen gleich aus. Englische Fassungen der
 * DB-Einträge kommen aus localizeProjects (Rückfall je Feld auf Deutsch).
 */
import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { CtaBand } from "@/components/site/cta-band";
import { SectionTitle } from "@/components/site/section-head";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { localizedAlternates } from "@/i18n/seo";
import { localizeProjects } from "@/lib/data/i18n";
import {
  getPublicProjects,
  type ProjectFact,
  type PublicProject,
} from "@/lib/data/projects";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projekte.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: localizedAlternates("/projekte", locale),
  };
}

/* Kuratierter Anlagentyp aus messages/<locale>/projekte.json («fallback»).
   Platzhalter bis reale Projektfotografie vorliegt (Spec §4: keine Stock-/KI-Bilder). */
type ProjectType = {
  number: string;
  title: string;
  metricLabel: string;
  metricValue: string;
  metricUnit?: string;
  description: string;
  facts: ProjectFact[];
  deliverables: string[];
};

/* Anzeigemodell — identisch für kuratierte und DB-Anlagentypen. */
type TypeView = {
  key: string;
  number: string;
  title: string;
  description: string | null;
  /** Kennzahl (erste Zeile) + Fakten als Eckwert-Zeilen. */
  rows: ProjectFact[];
  deliverables: string[];
  image: string | null;
};

function fromCurated(type: ProjectType): TypeView {
  return {
    key: type.number,
    number: type.number,
    title: type.title,
    description: type.description,
    rows: [
      {
        label: type.metricLabel,
        value: type.metricUnit
          ? `${type.metricValue} ${type.metricUnit}`
          : type.metricValue,
      },
      ...type.facts,
    ],
    deliverables: type.deliverables,
    image: null,
  };
}

function fromDbType(project: PublicProject, index: number): TypeView {
  const rows: ProjectFact[] = [];
  if (project.metricLabel && project.metricValue) {
    rows.push({ label: project.metricLabel, value: project.metricValue });
  }
  rows.push(...project.facts);
  return {
    key: project.id,
    number: String(index + 1).padStart(2, "0"),
    title: project.title,
    description: project.description,
    rows,
    deliverables: project.deliverables,
    image: project.images[0] ?? null,
  };
}

/** Zahlwort aus der Sprachdatei («Drei» / «Three»); ab 13 die Ziffer. */
function zahlwort(words: string[], n: number): string {
  return n >= 1 && n < words.length && words[n] ? words[n] : String(n);
}

/* Soft-Solar-Bausteine */

function DotBullet() {
  return <span aria-hidden className="gold-dot mt-2 size-2! shrink-0" />;
}

/* Foto im eingelassenen Rahmen — oder ein ruhiger Platzhalter */
async function TilePhoto({ src, alt }: { src: string | null; alt: string }) {
  if (!src) {
    const tc = await getTranslations("common");
    return (
      <div className="neu-in flex aspect-[4/3] items-center justify-center">
        <span className="eyebrow">{tc("photoPending")}</span>
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
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}

/* Eckwerte als Zeilen mit dezenten Trennlinien */
function SpecList({ rows }: { rows: ProjectFact[] }) {
  if (rows.length === 0) return null;
  return (
    <dl className="mt-5">
      {rows.map((row, i) => (
        <div
          key={`${row.label}-${i}`}
          className="flex items-baseline justify-between gap-6 border-t border-border py-2.5 first:border-t-0 first:pt-0"
        >
          <dt className="text-[13px] text-muted-foreground">{row.label}</dt>
          <dd className="stat-mono text-right text-[13px] text-foreground">
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* Leistungsumfang als Goldpunkt-Liste */
async function Deliverables({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  const t = await getTranslations("projekte");
  return (
    <div className="mt-5">
      <p className="eyebrow">{t("tile.deliverables")}</p>
      <ul className="mt-3 space-y-2.5">
        {items.map((item, i) => (
          <li
            key={`${item}-${i}`}
            className="flex gap-3 text-sm leading-relaxed text-foreground/85"
          >
            <DotBullet />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Kachel: ein Anlagentyp */
async function ProjectTypeTile({ type }: { type: TypeView }) {
  const t = await getTranslations("projekte");
  return (
    <article className="neu flex flex-col p-4 pb-6 sm:p-5 sm:pb-7">
      <TilePhoto src={type.image} alt={t("tile.altType", { title: type.title })} />

      <div className="flex flex-1 flex-col px-1 pt-5 sm:px-2">
        <h3 className="text-xl font-semibold text-foreground sm:text-2xl">
          {type.title}
        </h3>
        {type.description && (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {type.description}
          </p>
        )}

        <SpecList rows={type.rows} />
        <Deliverables items={type.deliverables} />

        <div className="mt-auto pt-6">
          <Link href="/kontakt" className="btn-ghost min-h-12">
            {t("tile.discuss")}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

/* Kachel: freigegebenes Referenzprojekt aus der Datenbank */
async function ReferenceTile({ project }: { project: PublicProject }) {
  const t = await getTranslations("projekte");
  const categories = t.raw("categories") as Record<string, string>;
  const categoryLabel = project.category
    ? (categories[project.category] ?? project.category)
    : "";

  const image = project.images[0] ?? null;
  const specs: ProjectFact[] = [];
  if (project.location) {
    specs.push({ label: t("tile.location"), value: project.location });
  }
  if (project.kwp !== null) {
    specs.push({ label: t("tile.power"), value: `${project.kwp} kWp` });
  }
  if (project.storageKwh !== null) {
    specs.push({ label: t("tile.storage"), value: `${project.storageKwh} kWh` });
  }
  specs.push(...project.facts);

  return (
    <article className="neu flex flex-col p-4 pb-6 sm:p-5 sm:pb-7">
      <TilePhoto
        src={image}
        alt={t("tile.altReference", { title: project.title })}
      />

      <div className="flex flex-1 flex-col px-1 pt-5 sm:px-2">
        {categoryLabel && <p className="eyebrow">{categoryLabel}</p>}
        <h3 className="mt-2 text-xl font-semibold text-foreground sm:text-2xl">
          {project.title}
        </h3>
        {project.description && (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        )}

        <SpecList rows={specs} />
        <Deliverables items={project.deliverables} />
      </div>
    </article>
  );
}

export default async function ProjektePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("projekte");

  const anlagenTypen = t.raw("fallback") as ProjectType[];
  const numberWords = t.raw("numberWords") as string[];

  const alle = await localizeProjects(await getPublicProjects(), locale);
  const typen = alle.filter((p) => p.kind === "typ");
  const referenzen = alle.filter((p) => p.kind === "referenz");

  const hasReferenzen = referenzen.length > 0;
  const hasDbTypen = typen.length > 0;

  /* DB-Anlagentypen ersetzen die kuratierten Defaults vollständig. */
  const typenViews: TypeView[] = hasDbTypen
    ? typen.map(fromDbType)
    : anlagenTypen.map(fromCurated);
  const typenCount = hasDbTypen ? typen.length : anlagenTypen.length;

  return (
    <>
      {/* Intro */}
      <section
        aria-labelledby="projekte-h"
        className="container-page pt-14 pb-4 sm:pt-20 sm:pb-6"
      >
        <div className="max-w-3xl">
          <p className="eyebrow">{t("intro.eyebrow")}</p>
          <h1
            id="projekte-h"
            className="mt-4 text-balance text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl"
          >
            {t("intro.title")}
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-lg">
            {typenCount === 1
              ? t("intro.leadOne")
              : t("intro.leadMany", { n: zahlwort(numberWords, typenCount) })}
            {" – "}
            {t("intro.leadTail")}
          </p>
        </div>
      </section>

      {hasReferenzen && (
        <section aria-labelledby="referenzen-h" className="py-14 sm:py-20">
          <div className="container-page">
            <SectionTitle
              id="referenzen-h"
              title={t("references.title")}
              lead={t("references.lead")}
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {referenzen.map((project) => (
                <ReferenceTile key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Anlagentypen — aus der DB, sonst die kuratierten Defaults */}
      <section aria-labelledby="anlagentypen-h" className="py-14 sm:py-20">
        <div className="container-page">
          <SectionTitle
            id="anlagentypen-h"
            title={
              hasDbTypen
                ? t("types.titleDb", {
                    n: zahlwort(numberWords, typenViews.length),
                    label:
                      typenViews.length === 1 ? t("types.one") : t("types.many"),
                  })
                : t("types.titleDefault")
            }
            lead={t("types.lead")}
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {typenViews.map((type) => (
              <ProjectTypeTile key={type.key} type={type} />
            ))}
          </div>
        </div>
      </section>

      {!hasReferenzen && (
        <section
          aria-labelledby="referenzen-panel-h"
          className="py-14 sm:py-20"
        >
          <div className="container-page">
            <div className="neu-in grid items-center gap-8 p-7 sm:p-10 lg:grid-cols-[1.5fr_1fr]">
              <div>
                <p className="eyebrow">{t("referencePanel.eyebrow")}</p>
                <h2
                  id="referenzen-panel-h"
                  className="mt-3 text-balance text-2xl font-bold leading-tight text-foreground sm:text-3xl"
                >
                  {t("referencePanel.title")}
                </h2>
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                  {t("referencePanel.text")}
                </p>
              </div>
              <div className="flex lg:justify-end">
                <Link href="/kontakt" className="btn-primary w-full sm:w-auto">
                  {t("referencePanel.cta")}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title={t("ctaBand.title")}
        description={t("ctaBand.description")}
        secondaryHref="/kontakt"
        secondaryLabel={t("ctaBand.secondaryLabel")}
      />
    </>
  );
}
