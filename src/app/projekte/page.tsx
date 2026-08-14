/**
 * Projekte — kuratierte Anlagentypen aus der Praxis (bewusst KEINE erfundenen
 * Kundenprojekte, Standorte oder Namen) plus freigegebene Referenzprojekte
 * aus der Supabase-Tabelle `projects`, sobald vorhanden.
 */
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CtaBand } from "@/components/site/cta-band";
import { SectionHead, SectionTitle } from "@/components/site/section-head";
import { getPublicProjects, type PublicProject } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Projekte – Photovoltaik-Anlagentypen & Referenzen Schweiz",
  description:
    "Typische Photovoltaik-Projekte von DoubleA Solar Solutions: Einfamilienhaus, Mehrfamilienhaus mit ZEV, Gewerbe, Landwirtschaft, Batteriespeicher, Wallbox und Wärmepumpen-Integration – geplant von Grenchen aus für die ganze Schweiz. Referenzen auf Anfrage.",
  alternates: {
    canonical: "/projekte",
  },
};

type ProjectFact = {
  label: string;
  value: string;
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

/* Dossier-Zeile: ein Anlagentyp als Werkplan-Eintrag */
function ProjectTypeRow({
  type,
  last = false,
}: {
  type: ProjectType;
  last?: boolean;
}) {
  return (
    <article
      className={`grid gap-8 border-t border-border py-10 lg:grid-cols-[minmax(240px,320px)_1fr] ${
        last ? "border-b" : ""
      }`}
    >
      <PhotoPlaceholder />

      <div>
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-xl font-semibold text-foreground sm:text-2xl">
            {type.title}
          </h3>
          <span className="eyebrow">{type.number}</span>
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {type.description}
        </p>

        <dl className="mt-6 max-w-xl">
          <div className="flex items-baseline justify-between gap-6 border-t border-border py-2.5">
            <dt className="text-[13px] text-muted-foreground">
              {type.metricLabel}
            </dt>
            <dd className="stat-mono text-[13px] text-foreground">
              {type.metricValue}
              {type.metricUnit ? ` ${type.metricUnit}` : ""}
            </dd>
          </div>
          {type.facts.map((fact, i) => (
            <div
              key={fact.label}
              className={`flex items-baseline justify-between gap-6 border-t border-border py-2.5 ${
                i === type.facts.length - 1 ? "border-b" : ""
              }`}
            >
              <dt className="text-[13px] text-muted-foreground">
                {fact.label}
              </dt>
              <dd className="stat-mono text-right text-[13px] text-foreground">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-6">
          <p className="eyebrow">Leistungsumfang</p>
          <ul className="mt-3 space-y-2.5">
            {type.deliverables.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm leading-relaxed text-foreground/80"
              >
                <SquareBullet />
                {item}
              </li>
            ))}
          </ul>
        </div>

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
  const specs: { label: string; value: string }[] = [];
  if (project.location) {
    specs.push({ label: "Standort", value: project.location });
  }
  if (project.kwp !== null) {
    specs.push({ label: "Leistung", value: `${project.kwp} kWp` });
  }
  if (project.storageKwh !== null) {
    specs.push({ label: "Speicher", value: `${project.storageKwh} kWh` });
  }

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
        <p className="eyebrow">{project.category}</p>
        <h3 className="mt-2 text-xl font-semibold text-foreground sm:text-2xl">
          {project.title}
        </h3>
        {project.description && (
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        )}

        {specs.length > 0 && (
          <dl className="mt-6 max-w-xl">
            {specs.map((spec, i) => (
              <div
                key={spec.label}
                className={`flex items-baseline justify-between gap-6 border-t border-border py-2.5 ${
                  i === specs.length - 1 ? "border-b" : ""
                }`}
              >
                <dt className="text-[13px] text-muted-foreground">
                  {spec.label}
                </dt>
                <dd className="stat-mono text-right text-[13px] text-foreground">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </article>
  );
}

export default async function ProjektePage() {
  const referenzen = await getPublicProjects();
  const hasReferenzen = referenzen.length > 0;

  /* Sektionsnummern verschieben sich, wenn die Referenz-Sektion erscheint. */
  const nrTypen = hasReferenzen ? "03" : "02";
  const nrErweiterungen = hasReferenzen ? "04" : "03";
  const nrReferenzenPanel = "04";

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
            Sieben Anlagentypen prägen unsere Arbeit – vom Einfamilienhaus über
            den ZEV im Mehrfamilienhaus bis zur landwirtschaftlichen
            Grossanlage. Hier zeigen wir, was jeweils typisch ist: Eckwerte,
            Leistungsumfang und die Punkte, die im Detail entscheiden.
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

      {hasReferenzen && (
        <>
          {/* 02 — Referenzen (freigegebene Projekte aus der Datenbank) */}
          <SectionHead nr="02" label="Referenzen" />
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

      {/* Anlagentypen 01–04 */}
      <SectionHead nr={nrTypen} label="Anlagentypen" />
      <section
        aria-labelledby="anlagentypen-h"
        className="container-page py-12 sm:py-16"
      >
        <SectionTitle
          id="anlagentypen-h"
          title="Vier Gebäudekategorien. Ein Qualitätsstandard."
        />
        <div className="mt-10">
          {anlagenTypen.map((type, i) => (
            <ProjectTypeRow
              key={type.number}
              type={type}
              last={i === anlagenTypen.length - 1}
            />
          ))}
        </div>
      </section>

      {/* Erweiterungen 05–07 */}
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
              type={type}
              last={i === erweiterungen.length - 1}
            />
          ))}
        </div>
      </section>

      {!hasReferenzen && (
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
