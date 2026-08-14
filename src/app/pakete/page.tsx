import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CtaBand } from "@/components/site/cta-band";
import { SectionHead } from "@/components/site/section-head";
import { getDbPackages, type DbPackage } from "@/lib/data/packages";

export const metadata: Metadata = {
  title: "Pakete & Preise – Solaranlage Richtpreise Schweiz",
  description:
    "Transparente Richtpreise für Photovoltaik-Pakete: Einfamilienhaus, Komfort mit Speicher, Premium mit Wärmepumpen-Integration. Definitive Auslegung nach kostenloser Standortanalyse.",
  alternates: {
    canonical: "/pakete",
  },
};

type PaketStat = {
  label: string;
  value: string;
};

/** Einheitliches Anzeigemodell für kuratierte und DB-Pakete. */
type PaketView = {
  id: string;
  target: string;
  name: string;
  summary: string | null;
  stats: PaketStat[];
  includes: string[];
  options: string[];
  price: string;
  featured: boolean;
};

const kuratiertePakete: PaketView[] = [
  {
    id: "basis",
    target: "Einfamilienhaus",
    name: "Basis 8.2 kWp",
    summary:
      "Der solide Einstieg für das typische Einfamilienhaus – vollständig montiert, angeschlossen und abgenommen.",
    stats: [
      { label: "Leistung", value: "8.2 kWp" },
      { label: "Modulfläche (ca.)", value: "~35 m²" },
      { label: "Jahresertrag (typ.)", value: "7'500–8'500 kWh" },
      { label: "Speicher", value: "nachrüstbar" },
    ],
    includes: [
      "Module und Wechselrichter",
      "Montage und Netzanschluss",
      "Pronovo-EIV-Antrag",
      "Inbetriebnahme inkl. Sicherheitsnachweis",
      "Monitoring",
    ],
    options: [],
    price: "CHF 15'500–18'500",
    featured: false,
  },
  {
    id: "komfort",
    target: "EFH mit Wärmepumpe oder E-Auto",
    name: "Komfort 10 kWp + Speicher",
    summary:
      "Mehr Unabhängigkeit dank Batteriespeicher: Solarstrom vom Dach auch am Abend nutzen.",
    stats: [
      { label: "Leistung", value: "10 kWp" },
      { label: "Modulfläche (ca.)", value: "~42 m²" },
      { label: "Jahresertrag (typ.)", value: "9'000–10'500 kWh" },
      { label: "Speicher", value: "8–10 kWh" },
    ],
    includes: [
      "Alles aus «Basis 8.2 kWp»",
      "Batteriespeicher 8–10 kWh",
      "Auslegung auf Eigenverbrauch optimiert",
    ],
    options: [],
    price: "CHF 21'500–26'500",
    featured: true,
  },
  {
    id: "premium",
    target: "Grössere EFH und kleine MFH",
    name: "Premium 15 kWp + Wärmepumpen-Integration",
    summary:
      "Für hohe Verbräuche: Photovoltaik, Wärmepumpe und Lastmanagement intelligent gekoppelt.",
    stats: [
      { label: "Leistung", value: "15 kWp" },
      { label: "Modulfläche (ca.)", value: "~63 m²" },
      { label: "Jahresertrag (typ.)", value: "13'500–16'000 kWh" },
      { label: "Speicher (Option)", value: "16 kWh" },
    ],
    includes: [
      "Alles aus «Basis 8.2 kWp»",
      "Wärmepumpen-Integration und Energiemanagement im Preis eingerechnet",
      "Lastmanagement und Eigenverbrauchsoptimierung",
      "Speicher-Option 16 kWh",
    ],
    options: [],
    price: "CHF 27'500–34'500",
    featured: false,
  },
];

const optionen = [
  {
    title: "Batteriespeicher",
    value: "ab CHF 350/kWh",
    note: "im Bündel mit einer PV-Installation",
    text: "Erhöht den Eigenverbrauch deutlich. Ob sich ein Speicher rechnet, prüfen wir anhand Ihres Lastprofils – nicht pauschal. Marktüblich sind gemäss BFE-Preisbeobachtung 2025 rund CHF 500–750/kWh — unser Richtwert gilt im Rahmen einer Gesamtinstallation.",
  },
  {
    title: "Wallbox",
    value: "ab CHF 1'950",
    note: "im Rahmen einer PV-Installation; bei langen Kabelwegen oder Verteiler-Ausbau Mehrkosten",
    text: "Anschluss und Lastmanagement-Anbindung abgestimmt auf Ihre Hausinstallation und die Anlagengrösse.",
  },
  {
    title: "Monitoring",
    value: "inklusive",
    note: "bei jedem Paket",
    text: "Online-Überwachung von Ertrag und Anlagenzustand – Abweichungen erkennen wir, bevor sie Ertrag kosten.",
  },
  {
    title: "Förderberatung",
    value: "inklusive",
    note: "bei jedem Paket",
    text: "Pronovo-EIV und kantonale Programme: Wir berechnen indikativ und übernehmen die Antragstellung.",
  },
];

/** CH-Tausendertrennung mit Apostroph, z.B. 12500 → 12'500. */
function chf(n: number): string {
  return Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}

function priceLabel(p: DbPackage): string {
  if (p.priceFrom != null && p.priceTo != null && p.priceTo !== p.priceFrom) {
    return `CHF ${chf(p.priceFrom)}–${chf(p.priceTo)}`;
  }
  if (p.priceFrom != null) {
    return `ab CHF ${chf(p.priceFrom)}`;
  }
  if (p.priceTo != null) {
    return `bis CHF ${chf(p.priceTo)}`;
  }
  return "auf Anfrage";
}

function toView(p: DbPackage): PaketView {
  const stats: PaketStat[] = [];
  if (p.kwp != null) {
    stats.push({ label: "Leistung", value: `${p.kwp} kWp` });
  }
  return {
    id: p.id,
    target: p.targetGroup ?? "Paket",
    name: p.title,
    summary: null,
    stats,
    includes: p.includedFeatures,
    options: p.optionalFeatures,
    price: priceLabel(p),
    featured: false,
  };
}

export default async function PaketePage() {
  const dbPakete = await getDbPackages();
  const pakete: PaketView[] =
    dbPakete.length > 0 ? dbPakete.map(toView) : kuratiertePakete;

  return (
    <>
      {/* Intro */}
      <section
        aria-labelledby="pakete-h"
        className="container-page pt-14 pb-12 sm:pt-20 sm:pb-14 lg:pt-24"
      >
        <div className="max-w-3xl">
          <p className="eyebrow">Pakete &amp; Preise</p>
          <h1
            id="pakete-h"
            className="mt-4 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl"
          >
            Transparente Richtpreise. Definitive Zahlen nach der Analyse.
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            Diese Pakete zeigen, was eine Photovoltaikanlage in der Schweiz
            realistisch kostet – als Richtwerte, nie als verbindliche Offerte.
            Die definitive Auslegung entsteht nach der Standortanalyse Ihres
            Dachs.
          </p>
          <ul className="mt-6 grid gap-2.5">
            {[
              "Richtpreise inkl. Montage",
              "Definitive Offerte nach Standortanalyse",
              "Preise vor Abzug der Pronovo-Einmalvergütung",
            ].map((zeile) => (
              <li
                key={zeile}
                className="flex items-start gap-3 text-sm leading-relaxed text-foreground/85"
              >
                <span
                  aria-hidden
                  className="mt-2 size-1.5 shrink-0 bg-[color:var(--solar-ink)]"
                />
                {zeile}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Paket-Panels */}
      <section aria-label="Pakete">
        <SectionHead nr="01" label="Pakete" />
        <div className="container-page py-12 sm:py-16">
          <div className="grid gap-5 lg:grid-cols-3">
            {pakete.map((paket) => (
              <article
                key={paket.id}
                className={
                  paket.featured
                    ? "flex flex-col border-2 border-[color:var(--solar-ink)] bg-card p-6 lg:p-8"
                    : "surface-glass flex flex-col p-6 lg:p-8"
                }
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="eyebrow">{paket.target}</p>
                  {paket.featured && (
                    <p className="eyebrow shrink-0 text-right text-foreground">
                      Meistgewählt
                    </p>
                  )}
                </div>
                <h2 className="mt-3 text-balance text-2xl font-semibold leading-tight text-foreground">
                  {paket.name}
                </h2>
                {paket.summary && (
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {paket.summary}
                  </p>
                )}

                {paket.stats.length > 0 && (
                  <dl className="mt-6">
                    {paket.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="flex items-baseline justify-between gap-4 border-t border-border py-3 last:border-b"
                      >
                        <dt className="text-xs text-muted-foreground">
                          {stat.label}
                        </dt>
                        <dd className="stat-mono text-sm font-medium text-foreground">
                          {stat.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}

                <ul className="mt-6 grid gap-2.5">
                  {paket.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-relaxed text-foreground/85"
                    >
                      <span
                        aria-hidden
                        className="mt-2 size-1.5 shrink-0 bg-[color:var(--solar-ink)]"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                {paket.options.length > 0 && (
                  <div className="mt-5">
                    <p className="eyebrow">Optionen</p>
                    <ul className="mt-3 grid gap-2.5">
                      {paket.options.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                        >
                          <span
                            aria-hidden
                            className="mt-2 size-1.5 shrink-0 bg-[color:var(--solar-stone)]"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-auto border-t border-border pt-6">
                  <p className="eyebrow">Richtpreis inkl. Montage</p>
                  <p className="stat-mono mt-2 text-2xl font-semibold text-foreground">
                    {paket.price}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    vor Abzug der Pronovo-Einmalvergütung
                  </p>
                  <Link
                    href="/solarrechner"
                    className={`${paket.featured ? "btn-primary" : "btn-secondary"} mt-5 w-full`}
                  >
                    Angebot berechnen
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Gewerbe & Landwirtschaft */}
      <section aria-labelledby="gewerbe-h" className="surface-sand">
        <SectionHead nr="02" label="Gewerbe & Landwirtschaft" />
        <div className="container-page py-12 sm:py-16">
          <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <p className="eyebrow">Gewerbe &amp; Landwirtschaft</p>
              <h2
                id="gewerbe-h"
                className="mt-3 text-balance text-2xl font-semibold leading-tight text-foreground sm:text-3xl"
              >
                Grosse Dächer verdienen eine individuelle Auslegung.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                Hallen-, Scheunen- und Flachdächer ab 30 kWp planen wir
                projektspezifisch: Statik, Netzanschlussgesuch,
                Eigenverbrauchskonzept und Etappierung werden auf Ihren Betrieb
                abgestimmt. Pauschalpreise wären hier unseriös – deshalb gibt es
                sie bei uns nicht.
              </p>
            </div>
            <div className="surface-glass p-6 lg:p-7">
              <dl>
                <div className="flex items-baseline justify-between gap-4 border-t border-border py-3">
                  <dt className="text-xs text-muted-foreground">
                    Anlagengrösse
                  </dt>
                  <dd className="stat-mono text-sm font-medium text-foreground">
                    ab 30 kWp
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-t border-border py-3">
                  <dt className="text-xs text-muted-foreground">Auslegung</dt>
                  <dd className="text-sm font-medium text-foreground">
                    individuell
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-y border-border py-3">
                  <dt className="text-xs text-muted-foreground">Richtpreis</dt>
                  <dd className="text-sm font-medium text-foreground">
                    auf Anfrage
                  </dd>
                </div>
              </dl>
              <Link href="/solarrechner" className="btn-primary mt-6 w-full">
                Angebot berechnen
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/kontakt"
                className="btn-ghost mt-4 min-h-12 w-full justify-center"
              >
                Projekt direkt besprechen
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Optionen */}
      <section aria-labelledby="optionen-h">
        <SectionHead nr="03" label="Optionen & Erweiterungen" />
        <div className="container-page py-12 sm:py-16">
          <div className="max-w-2xl">
            <h2
              id="optionen-h"
              className="text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl"
            >
              Sinnvoll ergänzen – nur dort, wo es sich rechnet.
            </h2>
          </div>
          <div className="mt-10">
            {optionen.map((option) => (
              <div
                key={option.title}
                className="grid gap-3 border-t border-border py-6 last:border-b sm:grid-cols-[180px_260px_1fr] sm:gap-8"
              >
                <h3 className="text-base font-semibold text-foreground">
                  {option.title}
                </h3>
                <div>
                  <p className="stat-mono text-lg font-semibold text-foreground">
                    {option.value}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {option.note}
                  </p>
                </div>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {option.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hinweise */}
      <section aria-labelledby="hinweise-h" className="surface-sand">
        <SectionHead nr="04" label="Hinweise" />
        <div className="container-page py-12 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-16">
            <h2
              id="hinweise-h"
              className="text-2xl font-semibold leading-tight text-foreground"
            >
              Gut zu wissen
            </h2>
            <div className="max-w-2xl">
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                Alle Preise sind Richtwerte inkl. Montage; definitive Offerte
                nach Standortanalyse. Pronovo-Einmalvergütung: aktuell CHF 360
                pro kWp für angebaute Anlagen unter 30 kWp (integriert CHF
                400/kWp), Stand EnFV 1.7.2026 — wir prüfen den Ansatz für Ihr
                Projekt und übernehmen den Antrag.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                Der effektive Preis hängt von Dacheindeckung, Gerüstbedarf,
                Zählerplatz und Anfahrt ab. Kantonale Förderprogramme prüfen wir
                für Ihren Standort tagesaktuell – wir rechnen konservativ und
                versprechen keine Pauschalbeträge.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Welches Paket passt zu Ihrem Dach?"
        description="Berechnen Sie in wenigen Minuten eine erste Auslegung – oder senden Sie uns Ihre Eckdaten für eine Standortanalyse mit definitiver Offerte."
        primaryHref="/solarrechner"
        primaryLabel="Solarpotenzial berechnen"
        secondaryHref="/kontakt"
        secondaryLabel="Beratung anfragen"
      />
    </>
  );
}
