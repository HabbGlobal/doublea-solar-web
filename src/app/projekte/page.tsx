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
import { SectionHead, SectionTitle } from "@/components/site/section-head";
import {
  getPublicProjects,
  type ProjectFact,
  type PublicProject,
} from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Projekte – Photovoltaik-Anlagentypen & Referenzen Schweiz",
  description:
    "Typische Photovoltaik-Projekte von DoubleA Solar Solutions: Einfamilienhaus, Mehrfamilienhaus mit ZEV, Gewerbe, Landwirtschaft, Batteriespeicher, Wallbox und Wärmepumpen-Integration – geplant von Grenchen aus für die ganze Schweiz. Referenzen auf Anfrage.",
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

const anlagenTypen: ProjectType[] = [
  {
    // Platzhalter bis reale Projektfotografie vorliegt (Spec §4: keine Stock-/KI-Bilder).
    number: "01",
    title: "Einfamilienhaus",
    metricLabel: "Typische Anlagengrösse",
    metricValue: "8–12",
    metricUnit: "kWp",
    description:
      "Die klassische Aufdachanlage mit Eigenverbrauchsoptimierung. Häufig als Gesamtsystem mit Speicher, Wärmepumpe und Wallbox gedacht – sauber dimensioniert statt maximal verkauft.",
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
      "Zusammenschluss zum Eigenverbrauch (ZEV) für Eigentümerschaften und Verwaltungen. Entscheidend: Messkonzept und Mieterstromabrechnung werden von Anfang an mitgeplant – nicht nachgerüstet.",
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
    title: "Gewerbe",
    metricLabel: "Typische Anlagengrösse",
    metricValue: "30–150",
    metricUnit: "kWp",
    description:
      "Produktions- und Gewerbedächer mit hohem Stromverbrauch tagsüber – dort fliesst Solarstrom direkt in den Betrieb. Entscheidungsgrundlage ist Ihr Lastprofil, nicht der Katalogwert.",
    facts: [
      { label: "Typ. Speicher", value: "20–60 kWh" },
      { label: "Eigenverbrauch", value: "tagsüber hoch" },
    ],
    deliverables: [
      "Lastganganalyse und indikative Wirtschaftlichkeitsrechnung",
      "Tragwerksprüfung und Brandschutzkonzept",
      "Monitoring und Wartungskonzept für den laufenden Betrieb",
    ],
  },
  {
    // Platzhalter bis reale Projektfotografie vorliegt (Spec §4: keine Stock-/KI-Bilder).
    number: "04",
    title: "Landwirtschaft",
    metricLabel: "Typische Anlagengrösse",
    metricValue: "50–250",
    metricUnit: "kWp",
    description:
      "Ställe, Scheunen und Remisen bieten grosse, ungenutzte Dachflächen. Wir planen um den Betrieb herum: Kühlung, Melken und Trocknung als Eigenverbraucher – der Überschuss wird eingespeist.",
    facts: [
      { label: "Dachfläche", value: "ab 500 m²" },
      { label: "Typ. Speicher", value: "optional" },
    ],
    deliverables: [
      "Prüfung von Statik und Dacheindeckung (z. B. Faserzement)",
      "Eigenverbrauchskonzept für Kühlung, Melken und Trocknung",
      "Abklärung von Einspeisung und Rückliefertarif mit dem Netzbetreiber",
    ],
  },
];

const erweiterungen: ProjectType[] = [
  {
    // Platzhalter bis reale Projektfotografie vorliegt (Spec §4: keine Stock-/KI-Bilder).
    number: "05",
    title: "Batterie-Nachrüstung",
    metricLabel: "Typische Speicherkapazität",
    metricValue: "5–20",
    metricUnit: "kWh",
    description:
      "Nachrüstung bestehender PV-Anlagen mit Speicher – unabhängig davon, wer die Anlage gebaut hat. Wir beurteilen ehrlich, ob sich ein Speicher in Ihrem Fall rechnet.",
    facts: [
      { label: "Kopplung", value: "AC / DC" },
      { label: "Umsetzung", value: "1–2 Tage" },
    ],
    deliverables: [
      "Bestandsaufnahme von Wechselrichter und Verkabelung",
      "Kapazität nach Lastprofil ausgelegt – ohne Überdimensionierung",
      "Integration in Smart Meter und Energiemanagement",
    ],
  },
  {
    // Platzhalter bis reale Projektfotografie vorliegt (Spec §4: keine Stock-/KI-Bilder).
    number: "06",
    title: "Wallbox / E-Mobilität",
    metricLabel: "Typische Ladeleistung",
    metricValue: "11–22",
    metricUnit: "kW",
    description:
      "Laden am eigenen Gebäude, gesteuert nach Solarüberschuss. Das dynamische Lastmanagement schützt den Hausanschluss und priorisiert selbst produzierten Strom.",
    facts: [
      { label: "Lastmanagement", value: "dynamisch" },
      { label: "Laden", value: "PV-optimiert" },
    ],
    deliverables: [
      "Wallbox-Auswahl passend zu Fahrzeug und Hausanschluss",
      "Dynamisches Lastmanagement mit PV-Überschussladen",
      "Anmeldung beim Netzbetreiber und Inbetriebnahme",
    ],
  },
  {
    // Platzhalter bis reale Projektfotografie vorliegt (Spec §4: keine Stock-/KI-Bilder).
    number: "07",
    title: "Wärmepumpen-Integration",
    metricLabel: "Gekoppeltes Gesamtsystem",
    metricValue: "PV + WP",
    description:
      "Photovoltaik und Wärmepumpe ergänzen sich im Gebäude besonders gut: Über SG-Ready oder ein Energiemanagementsystem heizt die Wärmepumpe bevorzugt dann, wenn das Dach produziert.",
    facts: [
      { label: "Schnittstelle", value: "SG-Ready" },
      { label: "Speicher", value: "thermisch" },
    ],
    deliverables: [
      "Abstimmung mit Heizungsfachpartner oder bestehender Anlage",
      "Ansteuerung über SG-Ready oder Energiemanagementsystem",
      "Warmwasser als thermischer Speicher für den Solarüberschuss",
    ],
  },
];

/* Anzeigemodell — identisch für kuratierte und DB-Anlagentypen. */
type TypeView = {
  key: string;
  number: string;
  title: string;
  description: string | null;
  /** Kennzahl + Fakten, bereits zu einer Hairline-Liste zusammengeführt. */
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

/* Werkplan-Idiome */

function SquareBullet() {
  return (
    <span
      aria-hidden
      className="mt-2 size-1.5 shrink-0 bg-[color:var(--solar-ink)]"
    />
  );
}

/* Schraffur-Platzhalter, solange keine Projektfotografie vorliegt */
function PhotoPlaceholder() {
  return (
    <div
      className="relative flex aspect-[4/3] items-center justify-center border border-border bg-card"
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, var(--solar-line) 0 1px, transparent 1px 9px)",
      }}
    >
      <span className="eyebrow bg-card px-3 py-1.5">
        Projektfotografie in Vorbereitung
      </span>
    </div>
  );
}

/* Hairline-Liste aus Label/Wert-Paaren — geteiltes Idiom beider Zeilentypen. */
function SpecList({ rows }: { rows: ProjectFact[] }) {
  if (rows.length === 0) return null;
  return (
    <dl className="mt-6 max-w-xl">
      {rows.map((row, i) => (
        <div
          key={`${row.label}-${i}`}
          className={`flex items-baseline justify-between gap-6 border-t border-border py-2.5 ${
            i === rows.length - 1 ? "border-b" : ""
          }`}
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

/* Dossier-Zeile: ein Anlagentyp als Werkplan-Eintrag */
function ProjectTypeRow({
  type,
  last = false,
}: {
  type: TypeView;
  last?: boolean;
}) {
  return (
    <article
      className={`grid gap-8 border-t border-border py-10 lg:grid-cols-[minmax(240px,320px)_1fr] ${
        last ? "border-b" : ""
      }`}
    >
      {type.image ? (
        <div className="relative aspect-[4/3] overflow-hidden border border-border bg-card">
          <Image
            src={type.image}
            alt={`Anlagentyp: ${type.title}`}
            fill
            sizes="(min-width: 1024px) 320px, 100vw"
            className="object-cover"
          />
        </div>
      ) : (
        <PhotoPlaceholder />
      )}

      <div>
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-xl font-semibold text-foreground sm:text-2xl">
            {type.title}
          </h3>
          <span className="eyebrow">{type.number}</span>
        </div>
        {type.description && (
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {type.description}
          </p>
        )}

        <SpecList rows={type.rows} />

        {type.deliverables.length > 0 && (
          <div className="mt-6">
            <p className="eyebrow">Leistungsumfang</p>
            <ul className="mt-3 space-y-2.5">
              {type.deliverables.map((item, i) => (
                <li
                  key={`${item}-${i}`}
                  className="flex gap-3 text-sm leading-relaxed text-foreground/80"
                >
                  <SquareBullet />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6">
          <Link href="/kontakt" className="btn-ghost ring-focus min-h-12">
            Ähnliches Projekt besprechen
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

/* Dossier-Zeile: freigegebenes Referenzprojekt aus der Datenbank */
function ReferenceRow({
  project,
  last = false,
}: {
  project: PublicProject;
  last?: boolean;
}) {
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
    <article
      className={`grid gap-8 border-t border-border py-10 lg:grid-cols-[minmax(240px,320px)_1fr] ${
        last ? "border-b" : ""
      }`}
    >
      {image ? (
        <div className="relative aspect-[4/3] overflow-hidden border border-border bg-card">
          <Image
            src={image}
            alt={`Referenzprojekt: ${project.title}`}
            fill
            sizes="(min-width: 1024px) 320px, 100vw"
            className="object-cover"
          />
        </div>
      ) : (
        <PhotoPlaceholder />
      )}

      <div>
        {project.category && <p className="eyebrow">{project.category}</p>}
        <h3 className="mt-2 text-xl font-semibold text-foreground sm:text-2xl">
          {project.title}
        </h3>
        {project.description && (
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        )}

        <SpecList rows={specs} />

        {project.deliverables.length > 0 && (
          <div className="mt-6">
            <p className="eyebrow">Leistungsumfang</p>
            <ul className="mt-3 space-y-2.5">
              {project.deliverables.map((item, i) => (
                <li
                  key={`${item}-${i}`}
                  className="flex gap-3 text-sm leading-relaxed text-foreground/80"
                >
                  <SquareBullet />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
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

  /* DB-Anlagentypen ersetzen die kuratierten Defaults inkl. Erweiterungen. */
  const typenViews: TypeView[] = hasDbTypen
    ? typen.map(fromDbType)
    : anlagenTypen.map(fromCurated);
  const typenCount = hasDbTypen
    ? typen.length
    : anlagenTypen.length + erweiterungen.length;

  /* Sektionsnummern fortlaufend in Renderreihenfolge; 01 ist das Intro. */
  let sectionNr = 1;
  const nextNr = () => String(++sectionNr).padStart(2, "0");
  const nrReferenzen = hasReferenzen ? nextNr() : null;
  const nrTypen = nextNr();
  const nrErweiterungen = hasDbTypen ? null : nextNr();
  const nrReferenzenPanel = hasReferenzen ? null : nextNr();

  return (
    <>
      {/* 01 — Intro */}
      <SectionHead nr="01" label="Projekte" />
      <section
        aria-labelledby="projekte-h"
        className="container-page pt-12 pb-14 sm:pt-16 sm:pb-16"
      >
        <div className="max-w-3xl">
          <p className="eyebrow">Projekte</p>
          <h1
            id="projekte-h"
            className="mt-4 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Vom Familiendach bis zur Werkhalle.
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            {typenCount === 1
              ? "Ein Anlagentyp prägt unsere Arbeit"
              : `${zahlwort(typenCount)} Anlagentypen prägen unsere Arbeit`}{" "}
            – vom Einfamilienhaus über den ZEV im Mehrfamilienhaus bis zur
            landwirtschaftlichen Grossanlage. Hier zeigen wir, was jeweils
            typisch ist: Eckwerte, Leistungsumfang und die Punkte, die im Detail
            entscheiden.
          </p>
          <p className="mt-8 max-w-2xl border-l-2 border-[color:var(--solar-ink)] pl-4 text-sm leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground">Transparenz:</span>{" "}
            Die Anlagentypen auf dieser Seite sind typische Konstellationen aus
            unserer Praxis – keine konkreten Kundenprojekte. Referenzobjekte
            publizieren wir nur mit ausdrücklicher Freigabe. Alle Wertspannen
            sind indikativ.
          </p>
        </div>
      </section>

      {nrReferenzen !== null && (
        <>
          {/* Referenzen — echte, freigegebene Projekte aus der Datenbank */}
          <SectionHead nr={nrReferenzen} label="Referenzen" />
          <section
            aria-labelledby="referenzen-h"
            className="container-page py-12 sm:py-16"
          >
            <SectionTitle
              id="referenzen-h"
              title="Referenzen"
              lead="Freigegebene Projekte aus unserer Arbeit – mit realen Eckdaten, publiziert mit ausdrücklicher Zustimmung der Kundschaft."
            />
            <div className="mt-10">
              {referenzen.map((project, i) => (
                <ReferenceRow
                  key={project.id}
                  project={project}
                  last={i === referenzen.length - 1}
                />
              ))}
            </div>
          </section>
        </>
      )}

      {/* Anlagentypen — aus der DB, sonst die kuratierten Defaults */}
      <SectionHead nr={nrTypen} label="Anlagentypen" />
      <section
        aria-labelledby="anlagentypen-h"
        className="container-page py-12 sm:py-16"
      >
        <SectionTitle
          id="anlagentypen-h"
          title={
            hasDbTypen
              ? `${zahlwort(typenViews.length)} ${
                  typenViews.length === 1 ? "Anlagentyp" : "Anlagentypen"
                }. Ein Qualitätsstandard.`
              : "Vier Gebäudekategorien. Ein Qualitätsstandard."
          }
          lead={
            hasDbTypen
              ? "Typische Konstellationen aus unserer Praxis – die Spannweiten sind indikativ und beschreiben keine konkreten Kundenprojekte."
              : undefined
          }
        />
        <div className="mt-10">
          {typenViews.map((type, i) => (
            <ProjectTypeRow
              key={type.key}
              type={type}
              last={i === typenViews.length - 1}
            />
          ))}
        </div>
      </section>

      {nrErweiterungen !== null && (
        <>
          {/* Erweiterungen 05–07 (kuratierter Fallback) */}
          <SectionHead nr={nrErweiterungen} label="Erweiterungen" />
          <section
            aria-labelledby="erweiterungen-h"
            className="container-page py-12 sm:py-16"
          >
            <SectionTitle
              id="erweiterungen-h"
              title="Integration rund um die Anlage."
              lead="Speicher, Laden und Wärme gehören ins Gesamtsystem – sauber eingebunden statt angebaut."
            />
            <div className="mt-10">
              {erweiterungen.map((type, i) => (
                <ProjectTypeRow
                  key={type.number}
                  type={fromCurated(type)}
                  last={i === erweiterungen.length - 1}
                />
              ))}
            </div>
          </section>
        </>
      )}

      {nrReferenzenPanel !== null && (
        <>
          {/* Referenzen auf Anfrage */}
          <SectionHead nr={nrReferenzenPanel} label="Referenzen" />
          <section
            aria-labelledby="referenzen-panel-h"
            className="container-page py-12 sm:py-16"
          >
            <div className="surface-sand grid items-center gap-8 border border-border p-8 lg:grid-cols-[1.5fr_1fr] lg:p-12">
              <div>
                <p className="eyebrow">Referenzen</p>
                <h2
                  id="referenzen-panel-h"
                  className="mt-3 text-balance text-2xl font-semibold leading-tight text-foreground sm:text-3xl"
                >
                  Echte Projekte zeigen wir persönlich.
                </h2>
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                  Aus Respekt vor der Privatsphäre unserer Kundschaft
                  publizieren wir keine Projekte ohne ausdrückliche Freigabe.
                  Im Beratungsgespräch zeigen wir Ihnen Referenzobjekte, die
                  Ihrem Vorhaben entsprechen – mit realen Eckdaten. Eine
                  öffentliche Galerie folgt, sobald Freigaben vorliegen.
                </p>
              </div>
              <div className="flex lg:justify-end">
                <Link href="/kontakt" className="btn-primary">
                  Referenzgespräch vereinbaren
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </section>
        </>
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
