import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BatteryCharging,
  Building2,
  Check,
  FileCheck,
  Info,
  MonitorSmartphone,
  PlugZap,
} from "lucide-react";

import { CtaBand } from "@/components/site/cta-band";

export const metadata: Metadata = {
  title: "Pakete & Preise – Solaranlage Richtpreise Schweiz",
  description:
    "Transparente Richtpreise für Photovoltaik-Pakete: Einfamilienhaus, Komfort mit Speicher, Premium mit Wärmepumpen-Integration. Definitive Auslegung nach kostenloser Standortanalyse.",
};

type PaketStat = {
  label: string;
  value: string;
};

type Paket = {
  id: string;
  target: string;
  name: string;
  summary: string;
  stats: PaketStat[];
  includes: string[];
  price: string;
  featured?: boolean;
};

const pakete: Paket[] = [
  {
    id: "basis",
    target: "Einfamilienhaus",
    name: "Basis 8.2 kWp",
    summary:
      "Der solide Einstieg für das typische Einfamilienhaus – vollständig montiert, angeschlossen und abgenommen.",
    stats: [
      { label: "Leistung", value: "8.2 kWp" },
      { label: "Modulfläche", value: "~32 m²" },
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
    price: "CHF 15'500–18'500",
  },
  {
    id: "komfort",
    target: "EFH mit Wärmepumpe oder E-Auto",
    name: "Komfort 10 kWp + Speicher",
    summary:
      "Mehr Unabhängigkeit dank Batteriespeicher: Solarstrom vom Dach auch am Abend nutzen.",
    stats: [
      { label: "Leistung", value: "10 kWp" },
      { label: "Modulfläche", value: "~39 m²" },
      { label: "Jahresertrag (typ.)", value: "9'000–10'500 kWh" },
      { label: "Speicher", value: "8–10 kWh" },
    ],
    includes: [
      "Alles aus «Basis 8.2 kWp»",
      "Batteriespeicher 8–10 kWh",
      "Auslegung auf Eigenverbrauch optimiert",
    ],
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
      { label: "Modulfläche", value: "~59 m²" },
      { label: "Jahresertrag (typ.)", value: "13'500–16'000 kWh" },
      { label: "Speicher (Option)", value: "16 kWh" },
    ],
    includes: [
      "Alles aus «Basis 8.2 kWp»",
      "Wärmepumpen-Integration",
      "Lastmanagement und Eigenverbrauchsoptimierung",
      "Speicher-Option 16 kWh",
    ],
    price: "CHF 27'500–34'500",
  },
];

const optionen = [
  {
    icon: BatteryCharging,
    title: "Batteriespeicher",
    value: "~CHF 350/kWh",
    note: "Richtwert",
    text: "Erhöht den Eigenverbrauch deutlich. Ob sich ein Speicher rechnet, prüfen wir anhand Ihres Lastprofils – nicht pauschal.",
  },
  {
    icon: PlugZap,
    title: "Wallbox",
    value: "ab CHF 1'950",
    note: "inkl. Installation",
    text: "Anschluss und Lastmanagement-Anbindung abgestimmt auf Ihre Hausinstallation und die Anlagengrösse.",
  },
  {
    icon: MonitorSmartphone,
    title: "Monitoring",
    value: "inklusive",
    note: "bei jedem Paket",
    text: "Online-Überwachung von Ertrag und Anlagenzustand – Abweichungen erkennen wir, bevor sie Ertrag kosten.",
  },
  {
    icon: FileCheck,
    title: "Förderberatung",
    value: "inklusive",
    note: "bei jedem Paket",
    text: "Pronovo-EIV und kantonale Programme: Wir berechnen indikativ und übernehmen die Antragstellung.",
  },
];

export default function PaketePage() {
  return (
    <>
      {/* Intro */}
      <section className="container-page pt-12 pb-4 lg:pt-20">
        <div className="max-w-3xl">
          <p className="eyebrow">Pakete &amp; Preise</p>
          <h1 className="mt-3 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Transparente Richtpreise. Definitive Zahlen nach der Analyse.
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            Diese Pakete zeigen, was eine Photovoltaikanlage in der Schweiz
            realistisch kostet – als Richtwerte, nie als verbindliche Offerte.
            Die definitive Auslegung entsteht nach der kostenlosen
            Standortanalyse Ihres Dachs.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {[
              "Richtpreise inkl. Montage",
              "Definitive Offerte nach Standortanalyse",
              "Kostenfrei und unverbindlich",
            ].map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-border bg-white/60 px-3.5 py-1.5 text-xs font-medium text-foreground/70"
              >
                {chip}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Paket-Karten */}
      <section className="container-page pb-16 sm:pb-20">
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {pakete.map((paket) => (
            <article
              key={paket.id}
              className={`relative flex flex-col rounded-3xl border bg-white/70 p-6 transition hover:-translate-y-1 hover:shadow-[0_20px_50px_-24px_rgba(17,19,21,0.18)] lg:p-8 ${
                paket.featured
                  ? "border-[color:var(--solar-leaf)] ring-1 ring-[color:var(--solar-leaf)]"
                  : "border-border"
              }`}
            >
              {paket.featured && (
                <span className="absolute -top-3 left-6 inline-flex items-center rounded-full bg-[color:var(--solar-leaf)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--solar-ink)] lg:left-8">
                  Meistgewählt
                </span>
              )}

              <p className="eyebrow">{paket.target}</p>
              <h2 className="mt-2 text-balance text-2xl font-semibold leading-tight text-foreground">
                {paket.name}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {paket.summary}
              </p>

              <dl className="mt-6 divide-y divide-border/70 rounded-2xl border border-border/70 bg-background/60">
                {paket.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-baseline justify-between gap-4 px-4 py-3"
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

              <ul className="mt-6 grid gap-2.5">
                {paket.includes.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-sm leading-relaxed text-foreground/85"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-[color:var(--solar-emerald)]" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-7">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Richtpreis inkl. Montage
                </p>
                <p className="stat-mono mt-1.5 text-2xl font-semibold text-foreground">
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

        {/* Gewerbe & Landwirtschaft — breite, ruhige Karte */}
        <article className="surface-sand mt-5 rounded-3xl p-7 lg:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-[color:var(--solar-navy)]/8 text-[color:var(--solar-navy)] ring-1 ring-[color:var(--solar-navy)]/10">
                <Building2 className="size-6" />
              </span>
              <p className="eyebrow mt-5">Gewerbe &amp; Landwirtschaft</p>
              <h2 className="mt-2 text-balance text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
                Grosse Dächer verdienen eine individuelle Auslegung.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                Hallen-, Scheunen- und Flachdächer ab 30 kWp planen wir
                projektspezifisch: Statik, Netzanschlussgesuch,
                Eigenverbrauchskonzept und Etappierung werden auf Ihren Betrieb
                abgestimmt. Pauschalpreise wären hier unseriös – deshalb gibt es
                sie bei uns nicht.
              </p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-white/60 p-6 lg:p-7">
              <dl className="divide-y divide-border/70">
                <div className="flex items-baseline justify-between gap-4 py-3 first:pt-0">
                  <dt className="text-xs text-muted-foreground">
                    Anlagengrösse
                  </dt>
                  <dd className="stat-mono text-sm font-medium text-foreground">
                    ab 30 kWp
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="text-xs text-muted-foreground">Auslegung</dt>
                  <dd className="text-sm font-medium text-foreground">
                    individuell
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 py-3 last:pb-0">
                  <dt className="text-xs text-muted-foreground">Richtpreis</dt>
                  <dd className="text-sm font-medium text-foreground">
                    auf Anfrage
                  </dd>
                </div>
              </dl>
              <Link
                href="/solarrechner"
                className="btn-primary mt-6 w-full"
              >
                Angebot berechnen
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/kontakt"
                className="btn-ghost ring-focus mt-4 min-h-12 w-full justify-center"
              >
                Projekt direkt besprechen
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </article>
      </section>

      {/* Optionen */}
      <section className="container-page pb-16 sm:pb-20">
        <div className="max-w-2xl">
          <p className="eyebrow">Optionen &amp; Erweiterungen</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            Sinnvoll ergänzen – nur dort, wo es sich rechnet.
          </h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {optionen.map((option) => {
            const Icon = option.icon;
            return (
              <article
                key={option.title}
                className="surface-glass flex flex-col gap-3 rounded-2xl p-6"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-[color:var(--solar-navy)]/8 text-[color:var(--solar-navy)] ring-1 ring-[color:var(--solar-navy)]/10">
                  <Icon className="size-5" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    {option.title}
                  </h3>
                  <p className="mt-1 flex flex-wrap items-baseline gap-x-2">
                    <span className="stat-mono text-lg font-semibold text-foreground">
                      {option.value}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {option.note}
                    </span>
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {option.text}
                </p>
              </article>
            );
          })}
        </div>

        {/* Hinweise */}
        <div className="mt-10 rounded-3xl border border-border bg-secondary p-6 lg:p-8">
          <div className="flex gap-4">
            <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-[color:var(--solar-navy)]/8 text-[color:var(--solar-navy)]">
              <Info className="size-4" />
            </span>
            <div>
              <h2 className="text-base font-semibold text-foreground">
                Gut zu wissen
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Alle Preise sind Richtwerte inkl. Montage; definitive Offerte
                nach Standortanalyse. Pronovo-Einmalvergütung (indikativ ~CHF
                360/kWp) reduziert die Investition zusätzlich.
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Der effektive Preis hängt von Dacheindeckung, Gerüstbedarf,
                Zählerplatz und Anfahrt ab. Kantonale Förderprogramme prüfen
                wir für Ihren Standort tagesaktuell – wir rechnen konservativ
                und versprechen keine Pauschalbeträge.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Welches Paket passt zu Ihrem Dach?"
        description="Berechnen Sie in wenigen Minuten eine erste Auslegung – oder senden Sie uns Ihre Eckdaten für eine kostenlose Standortanalyse mit definitiver Offerte."
        primaryHref="/solarrechner"
        primaryLabel="Solarpotenzial berechnen"
        secondaryHref="/kontakt"
        secondaryLabel="Beratung anfragen"
      />
    </>
  );
}
