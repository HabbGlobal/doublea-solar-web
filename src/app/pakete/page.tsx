import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CtaBand } from "@/components/site/cta-band";
import { SectionTitle } from "@/components/site/section-head";
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
      "Der solide Einstieg für das typische Einfamilienhaus – montiert, angeschlossen, abgenommen.",
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
      "Wärmepumpen-Integration und Energiemanagement inklusive",
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
    note: "im Bündel mit einer PV-Installation; marktüblich CHF 500–750/kWh (BFE-Preisbeobachtung 2025)",
  },
  {
    title: "Wallbox",
    value: "ab CHF 1'950",
    note: "im Rahmen einer PV-Installation; Mehrkosten bei langen Kabelwegen",
  },
  {
    title: "Monitoring",
    value: "inklusive",
    note: "Online-Überwachung von Ertrag und Anlagenzustand",
  },
  {
    title: "Förderberatung",
    value: "inklusive",
    note: "Pronovo-EIV und kantonale Programme für Ihren Standort",
  },
];

const swissNumber = new Intl.NumberFormat("de-CH", {
  maximumFractionDigits: 0,
});

/**
 * CH-Tausendertrennung, z.B. 12500 → 12'500. Intl liefert je nach
 * ICU-Version das typografische Apostroph (U+2019) oder ein schmales
 * Leerzeichen als Gruppentrenner — wir normalisieren auf das gerade
 * Apostroph, das der übrige Seitentext verwendet.
 */
function chf(n: number): string {
  return swissNumber
    .format(Math.round(n))
    .replace(/[\u2019\u00A0\u202F\u2009]/g, "'");
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
  /* Gepflegte Stats gewinnen; ohne sie bleibt die Leistung als Minimalzeile. */
  const stats: PaketStat[] =
    p.stats.length > 0
      ? p.stats
      : p.kwp != null
        ? [{ label: "Leistung", value: `${p.kwp} kWp` }]
        : [];
  return {
    id: p.id,
    target: p.targetGroup ?? "Paket",
    name: p.title,
    summary: p.summary,
    stats,
    includes: p.includedFeatures,
    options: p.optionalFeatures,
    price: priceLabel(p),
    featured: p.isFeatured,
  };
}

/* Goldpunkt als Listenmarker */
function DotBullet() {
  return <span aria-hidden className="gold-dot mt-2 size-2! shrink-0" />;
}

export default async function PaketePage() {
  const dbPakete = await getDbPackages();
  const pakete: PaketView[] =
    dbPakete.length > 0 ? dbPakete.map(toView) : kuratiertePakete;

  /* Bei genau zwei Paketen bleibt das Raster zweispaltig — keine leere Kachel. */
  const gridCols =
    pakete.length === 2
      ? "md:grid-cols-2"
      : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <>
      {/* Intro */}
      <section
        aria-labelledby="pakete-h"
        className="container-page pt-14 pb-4 sm:pt-20 sm:pb-6"
      >
        <div className="max-w-3xl">
          <p className="eyebrow">Pakete &amp; Preise</p>
          <h1
            id="pakete-h"
            className="mt-4 text-balance text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl"
          >
            Transparente Richtpreise. Definitive Zahlen nach der Analyse.
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-lg">
            Diese Pakete zeigen, was eine Photovoltaikanlage in der Schweiz
            realistisch kostet – die definitive Auslegung entsteht nach der
            Standortanalyse Ihres Dachs.
          </p>
          <ul className="mt-6 grid gap-2.5">
            {[
              "Richtpreise inkl. Montage und Inbetriebnahme",
              "Preise vor Abzug der Pronovo-Einmalvergütung",
            ].map((zeile) => (
              <li
                key={zeile}
                className="flex items-start gap-3 text-sm leading-relaxed text-foreground/85"
              >
                <DotBullet />
                {zeile}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Paket-Karten */}
      <section aria-label="Pakete" className="py-14 sm:py-20">
        <div className="container-page">
          <div className={`grid gap-6 ${gridCols}`}>
            {pakete.map((paket) => (
              <article
                key={paket.id}
                className={
                  paket.featured
                    ? "neu relative flex flex-col rounded-t-2xl border-t-4 border-[color:var(--solar-gold)] p-6 sm:p-7"
                    : "neu relative flex flex-col p-6 sm:p-7"
                }
              >
                {paket.featured && (
                  <span className="absolute top-5 right-5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-[#6E5510]">
                    Meistgewählt
                  </span>
                )}
                <p className={`eyebrow ${paket.featured ? "pr-28" : ""}`}>
                  {paket.target}
                </p>
                <h2 className="mt-3 text-balance text-2xl font-bold leading-tight text-foreground">
                  {paket.name}
                </h2>
                {paket.summary && (
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {paket.summary}
                  </p>
                )}

                {paket.stats.length > 0 && (
                  <dl className="mt-6">
                    {paket.stats.map((stat, i) => (
                      <div
                        key={`${stat.label}-${i}`}
                        className="flex items-baseline justify-between gap-4 border-t border-border py-3 last:border-b"
                      >
                        <dt className="text-xs text-muted-foreground">
                          {stat.label}
                        </dt>
                        <dd className="stat-mono text-sm text-foreground">
                          {stat.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}

                <ul className="mt-6 grid gap-2.5">
                  {paket.includes.map((item, i) => (
                    <li
                      key={`${item}-${i}`}
                      className="flex items-start gap-3 text-sm leading-relaxed text-foreground/85"
                    >
                      <DotBullet />
                      {item}
                    </li>
                  ))}
                </ul>

                {paket.options.length > 0 && (
                  <div className="mt-5">
                    <p className="eyebrow">Optionen</p>
                    <ul className="mt-3 grid gap-2.5">
                      {paket.options.map((item, i) => (
                        <li
                          key={`${item}-${i}`}
                          className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                        >
                          <DotBullet />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-auto pt-7">
                  <p className="eyebrow">Richtpreis</p>
                  <p className="stat-mono mt-2 text-2xl text-foreground">
                    {paket.price}
                  </p>
                  <Link
                    href="/solarrechner"
                    className={`${paket.featured ? "btn-primary" : "btn-secondary"} mt-5 w-full`}
                  >
                    Angebot berechnen
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Gewerbe & Landwirtschaft */}
      <section aria-labelledby="gewerbe-h" className="py-14 sm:py-20">
        <div className="container-page">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <p className="eyebrow">Gewerbe &amp; Landwirtschaft</p>
              <h2
                id="gewerbe-h"
                className="mt-3 text-balance text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl"
              >
                Grosse Dächer verdienen eine individuelle Auslegung.
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-lg">
                Hallen-, Scheunen- und Flachdächer ab 30 kWp planen wir
                projektspezifisch – Statik, Netzanschlussgesuch und
                Eigenverbrauchskonzept auf Ihren Betrieb abgestimmt.
              </p>
            </div>
            <div className="neu p-6 sm:p-7">
              <dl>
                <div className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="text-xs text-muted-foreground">
                    Anlagengrösse
                  </dt>
                  <dd className="stat-mono text-sm text-foreground">
                    ab 30 kWp
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-t border-border py-3">
                  <dt className="text-xs text-muted-foreground">Auslegung</dt>
                  <dd className="text-sm font-medium text-foreground">
                    individuell
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-t border-border py-3">
                  <dt className="text-xs text-muted-foreground">Richtpreis</dt>
                  <dd className="text-sm font-medium text-foreground">
                    auf Anfrage
                  </dd>
                </div>
              </dl>
              <Link href="/kontakt" className="btn-primary mt-6 w-full">
                Projekt besprechen
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Optionen */}
      <section aria-labelledby="optionen-h" className="py-14 sm:py-20">
        <div className="container-page">
          <SectionTitle
            id="optionen-h"
            title="Sinnvoll ergänzen – nur dort, wo es sich rechnet."
          />
          <div className="mt-10 grid gap-4">
            {optionen.map((option) => (
              <div
                key={option.title}
                className="neu-sm grid gap-2 px-5 py-4 sm:grid-cols-[200px_180px_1fr] sm:items-baseline sm:gap-8 sm:px-6 sm:py-5"
              >
                <h3 className="text-base font-semibold text-foreground">
                  {option.title}
                </h3>
                <p className="stat-mono text-lg text-foreground">
                  {option.value}
                </p>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {option.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hinweise */}
      <section aria-labelledby="hinweise-h" className="py-14 sm:py-20">
        <div className="container-page">
          <div className="neu-in max-w-3xl p-6 sm:p-7">
            <h2
              id="hinweise-h"
              className="text-2xl font-bold leading-tight text-foreground"
            >
              Gut zu wissen
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
              Der effektive Preis hängt von Dacheindeckung, Gerüstbedarf,
              Zählerplatz und Anfahrt ab. Die Pronovo-Einmalvergütung beträgt
              aktuell CHF 360 pro kWp für angebaute Anlagen unter 30 kWp
              (integriert CHF 400/kWp, Stand EnFV 1.7.2026) — wir prüfen den
              Ansatz für Ihr Projekt und übernehmen den Antrag.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title="Welches Paket passt zu Ihrem Dach?"
        description="Berechnen Sie in wenigen Minuten eine erste Auslegung – oder senden Sie uns Ihre Eckdaten."
        primaryHref="/solarrechner"
        primaryLabel="Solarpotenzial berechnen"
        secondaryHref="/kontakt"
        secondaryLabel="Beratung anfragen"
      />
    </>
  );
}
