/**
 * Projekte — datenbankgetrieben aus der Supabase-Tabelle `projects`:
 *
 *   kind = 'typ'      → kuratierte Anlagentypen (typische Spannweiten,
 *                       bewusst KEINE erfundenen Kundenprojekte)
 *   kind = 'referenz' → echte, ausdrücklich freigegebene Kundenprojekte
 *
 * Die Trennung ist inhaltlich zwingend (Ehrlichkeitsregel der Website) und
 * wird nie vermischt. Solange keine Anlagentypen in der DB liegen, rendern
 * die weiter unten kuratierten Defaults — die Seite sieht in beiden Fällen
 * gleich aus.
 */
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CtaBand } from "@/components/site/cta-band";
import { SectionTitle } from "@/components/site/section-head";
import {
  getPublicProjects,
  type ProjectFact,
  type PublicProject,
} from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Projekte – Photovoltaik-Anlagentypen & Referenzen Schweiz",
  description:
    "Typische Photovoltaik-Projekte von DoubleA Solar Solutions: Einfamilienhaus, Mehrfamilienhaus mit ZEV sowie Gewerbe und Landwirtschaft – geplant von Grenchen aus für die ganze Schweiz. Referenzen auf Anfrage.",
  alternates: {
    canonical: "/projekte",
  },
};

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

/* Kuratierte Defaults — greifen nur, solange keine Anlagentypen in der DB
   liegen. Bewusst knapp gehalten. */
const anlagenTypen: ProjectType[] = [
  {
    // Platzhalter bis reale Projektfotografie vorliegt (Spec §4: keine Stock-/KI-Bilder).
    number: "01",
    title: "Einfamilienhaus",
    metricLabel: "Typische Anlagengrösse",
    metricValue: "8–12",
    metricUnit: "kWp",
    description:
      "Aufdachanlage mit Eigenverbrauchsoptimierung – sauber dimensioniert statt maximal verkauft.",
    facts: [
      { label: "Typ. Speicher", value: "5–10 kWh" },
      { label: "Montagezeit", value: "2–3 Tage" },
    ],
    deliverables: [
      "Verschattungsanalyse, Auslegung und Ertragsprognose",
      "Module, Wechselrichter, optional Speicher und Wallbox",
      "Pronovo-EIV-Antrag, Inbetriebnahme und Sicherheitsnachweis",
    ],
  },
  {
    // Platzhalter bis reale Projektfotografie vorliegt (Spec §4: keine Stock-/KI-Bilder).
    number: "02",
    title: "Mehrfamilienhaus / ZEV",
    metricLabel: "Typische Anlagengrösse",
    metricValue: "15–60",
    metricUnit: "kWp",
    description:
      "Zusammenschluss zum Eigenverbrauch – Messkonzept und Mieterstrom von Anfang an mitgeplant.",
    facts: [
      { label: "Typ. Speicher", value: "10–30 kWh" },
      { label: "Abrechnung", value: "Mieterstrom" },
    ],
    deliverables: [
      "Messkonzept und ZEV-Gründung nach Vorgaben des Netzbetreibers",
      "Abrechnungslösung für Mietparteien (Mieterstrom)",
      "Koordination mit Verteilnetzbetreiber und Verwaltung",
    ],
  },
  {
    // Platzhalter bis reale Projektfotografie vorliegt (Spec §4: keine Stock-/KI-Bilder).
    number: "03",
    title: "Gewerbe & Landwirtschaft",
    metricLabel: "Typische Anlagengrösse",
    metricValue: "30–250",
    metricUnit: "kWp",
    description:
      "Grosse Dachflächen mit hohem Tagesverbrauch – ausgelegt nach Ihrem Lastprofil.",
    facts: [
      { label: "Typ. Speicher", value: "20–60 kWh" },
      { label: "Eigenverbrauch", value: "tagsüber hoch" },
    ],
    deliverables: [
      "Lastganganalyse und indikative Wirtschaftlichkeitsrechnung",
      "Prüfung von Statik, Dacheindeckung und Brandschutz",
      "Monitoring und Wartungskonzept für den laufenden Betrieb",
    ],
  },
];

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

const ZAHLWORT = [
  "",
  "Ein",
  "Zwei",
  "Drei",
  "Vier",
  "Fünf",
  "Sechs",
  "Sieben",
  "Acht",
  "Neun",
  "Zehn",
  "Elf",
  "Zwölf",
];

function zahlwort(n: number): string {
  return n >= 1 && n < ZAHLWORT.length ? ZAHLWORT[n] : String(n);
}

/* Soft-Solar-Bausteine */

function DotBullet() {
  return <span aria-hidden className="gold-dot mt-2 size-2! shrink-0" />;
}

/* Foto im eingelassenen Rahmen — oder ein ruhiger Platzhalter */
function TilePhoto({ src, alt }: { src: string | null; alt: string }) {
  if (!src) {
    return (
      <div className="neu-in flex aspect-[4/3] items-center justify-center">
        <span className="eyebrow">Foto folgt</span>
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
function Deliverables({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="mt-5">
      <p className="eyebrow">Leistungsumfang</p>
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
function ProjectTypeTile({ type }: { type: TypeView }) {
  return (
    <article className="neu flex flex-col p-4 pb-6 sm:p-5 sm:pb-7">
      <TilePhoto src={type.image} alt={`Anlagentyp: ${type.title}`} />

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
            Ähnliches Projekt besprechen
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

/* Kachel: freigegebenes Referenzprojekt aus der Datenbank */
function ReferenceTile({ project }: { project: PublicProject }) {
  const image = project.images[0] ?? null;
  const specs: ProjectFact[] = [];
  if (project.location) {
    specs.push({ label: "Standort", value: project.location });
  }
  if (project.kwp !== null) {
    specs.push({ label: "Leistung", value: `${project.kwp} kWp` });
  }
  if (project.storageKwh !== null) {
    specs.push({ label: "Speicher", value: `${project.storageKwh} kWh` });
  }
  specs.push(...project.facts);

  return (
    <article className="neu flex flex-col p-4 pb-6 sm:p-5 sm:pb-7">
      <TilePhoto src={image} alt={`Referenzprojekt: ${project.title}`} />

      <div className="flex flex-1 flex-col px-1 pt-5 sm:px-2">
        {project.category && <p className="eyebrow">{project.category}</p>}
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

export default async function ProjektePage() {
  const alle = await getPublicProjects();
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
          <p className="eyebrow">Projekte</p>
          <h1
            id="projekte-h"
            className="mt-4 text-balance text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl"
          >
            Vom Familiendach bis zur Werkhalle.
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-lg">
            {typenCount === 1
              ? "Ein Anlagentyp prägt unsere Arbeit"
              : `${zahlwort(typenCount)} Anlagentypen prägen unsere Arbeit`}
            {" – "}
            zu jedem stehen hier Eckwerte und Leistungsumfang.
          </p>
        </div>
      </section>

      {hasReferenzen && (
        <section aria-labelledby="referenzen-h" className="py-14 sm:py-20">
          <div className="container-page">
            <SectionTitle
              id="referenzen-h"
              title="Referenzen"
              lead="Freigegebene Projekte mit realen Eckdaten – publiziert mit Zustimmung der Kundschaft."
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
                ? `${zahlwort(typenViews.length)} ${
                    typenViews.length === 1 ? "Anlagentyp" : "Anlagentypen"
                  }. Ein Qualitätsstandard.`
                : "Drei Gebäudekategorien. Ein Qualitätsstandard."
            }
            lead="Typische Konstellationen aus unserer Praxis, keine konkreten Kundenprojekte – alle Wertspannen sind indikativ."
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
                <p className="eyebrow">Referenzen</p>
                <h2
                  id="referenzen-panel-h"
                  className="mt-3 text-balance text-2xl font-bold leading-tight text-foreground sm:text-3xl"
                >
                  Echte Projekte zeigen wir persönlich.
                </h2>
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                  Wir publizieren keine Projekte ohne ausdrückliche Freigabe.
                  Im Beratungsgespräch zeigen wir Ihnen passende Referenzobjekte
                  mit realen Eckdaten.
                </p>
              </div>
              <div className="flex lg:justify-end">
                <Link href="/kontakt" className="btn-primary w-full sm:w-auto">
                  Referenzgespräch vereinbaren
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title="Welcher Anlagentyp passt zu Ihrem Gebäude?"
        description="Berechnen Sie in wenigen Minuten Ihr Solarpotenzial – oder besprechen Sie Ihr Vorhaben direkt mit uns."
        secondaryHref="/kontakt"
        secondaryLabel="Projekt besprechen"
      />
    </>
  );
}
