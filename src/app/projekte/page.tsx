/**
 * Projekte — kuratierte Anlagentypen aus der Praxis (bewusst KEINE erfundenen
 * Kundenprojekte, Standorte oder Namen).
 *
 * TODO(supabase): Echte, freigegebene Referenzprojekte folgen später aus der
 * Supabase-Tabelle `projects` (Titel, Region, kWp, Speicher, Bild, published-Flag).
 * Bis dahin zeigt diese Seite transparent deklarierte, typische Anlagentypen.
 */
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BatteryCharging,
  Building2,
  Check,
  Factory,
  Home,
  PlugZap,
  ShieldCheck,
  ThermometerSun,
  Tractor,
  type LucideIcon,
} from "lucide-react";

import { CtaBand } from "@/components/site/cta-band";

export const metadata: Metadata = {
  title: "Projekte – Photovoltaik-Anlagentypen & Referenzen Schweiz",
  description:
    "Typische Photovoltaik-Projekte von DoubleA Solar Solutions: Einfamilienhaus, Mehrfamilienhaus mit ZEV, Gewerbe, Landwirtschaft, Batteriespeicher, Wallbox und Wärmepumpen-Integration – geplant von Grenchen aus für die ganze Schweiz. Referenzen auf Anfrage.",
};

type ProjectFact = {
  label: string;
  value: string;
};

type ProjectType = {
  number: string;
  icon: LucideIcon;
  title: string;
  metricLabel: string;
  metricValue: string;
  metricUnit?: string;
  description: string;
  facts: ProjectFact[];
  deliverables: string[];
};

/* Feine Rasterlinien auf der dunklen Token-Fläche — abstrahiertes Modulraster
   statt Foto, bis freigegebene Projektbilder aus Supabase vorliegen. */
const moduleGrid: CSSProperties = {
  backgroundImage:
    "linear-gradient(color-mix(in srgb, white 8%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, white 8%, transparent) 1px, transparent 1px)",
  backgroundSize: "26px 26px",
};

const anlagenTypen: ProjectType[] = [
  {
    // AI-Bildprompt: "Modern Swiss single-family home with full-black solar
    // modules mounted flush on a gabled roof, soft morning light, Jura foothills
    // in the background, architectural photography, 35mm, muted premium tones"
    number: "01",
    icon: Home,
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
    // AI-Bildprompt: "Flat roof of a Swiss apartment building with east-west
    // mounted solar array in even rows, drone view at golden hour, small Swiss
    // town softly blurred in the background, clean editorial aesthetic"
    number: "02",
    icon: Building2,
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
    // AI-Bildprompt: "Large industrial hall roof fully covered with solar
    // panels, drone top-down view, strict geometric composition, soft overcast
    // light, Swiss industrial area, minimal editorial aesthetic"
    number: "03",
    icon: Factory,
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
    // AI-Bildprompt: "Swiss farm barn with a large solar roof, rolling green
    // fields around it, late afternoon light, honest documentary style, wide
    // shot, calm and premium colour grading"
    number: "04",
    icon: Tractor,
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
    // AI-Bildprompt: "Minimal Swiss utility room with wall-mounted home battery
    // and inverter, perfect cable management, soft neutral light, premium
    // product photography, shallow depth of field"
    number: "05",
    icon: BatteryCharging,
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
    // AI-Bildprompt: "Electric car charging at a wallbox under a modern Swiss
    // carport with solar roof, dusk light, warm and calm mood, editorial
    // automotive photography"
    number: "06",
    icon: PlugZap,
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
    // AI-Bildprompt: "Air-source heat pump beside a modern Swiss house with a
    // solar roof, tidy garden, clear morning light, calm editorial photography,
    // muted natural tones"
    number: "07",
    icon: ThermometerSun,
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

function ProjectTypeCard({
  type,
  compact = false,
}: {
  type: ProjectType;
  compact?: boolean;
}) {
  const Icon = type.icon;
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-white/70 transition hover:-translate-y-1 hover:shadow-[0_20px_50px_-24px_rgba(17,19,21,0.18)]">
      {/* Token-Fläche statt Foto (AI-Bildprompt beim jeweiligen Datensatz) */}
      <div
        className={`surface-navy relative overflow-hidden ${compact ? "h-36" : "h-44"}`}
      >
        <div aria-hidden className="absolute inset-0" style={moduleGrid} />
        <span className="absolute left-6 top-5 inline-flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-[color:var(--solar-leaf)]">
          <Icon className="size-5" />
        </span>
        <span className="stat-mono absolute right-6 top-6 text-xs tracking-[0.24em] text-[color:var(--solar-gold)]">
          {type.number}
        </span>
        <div className="absolute inset-x-6 bottom-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/55">
            {type.metricLabel}
          </p>
          <p className="stat-mono mt-1 text-3xl font-medium text-white">
            {type.metricValue}
            {type.metricUnit && (
              <span className="ml-1.5 text-base text-[color:var(--solar-leaf)]">
                {type.metricUnit}
              </span>
            )}
          </p>
        </div>
      </div>

      <div
        className={`flex flex-1 flex-col gap-5 p-6 ${compact ? "" : "lg:p-8"}`}
      >
        <div>
          <h3 className="text-xl font-semibold text-foreground">
            {type.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {type.description}
          </p>
        </div>

        <dl className="grid grid-cols-2 divide-x divide-border overflow-hidden rounded-2xl border border-border bg-secondary/60">
          {type.facts.map((fact) => (
            <div key={fact.label} className="px-4 py-3">
              <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                {fact.label}
              </dt>
              <dd className="stat-mono mt-1 break-words text-[13px] text-foreground">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>

        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Leistungsumfang
          </p>
          <ul className="mt-3 space-y-2.5">
            {type.deliverables.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm leading-relaxed text-foreground/80"
              >
                <Check className="mt-0.5 size-4 shrink-0 text-[color:var(--solar-emerald)]" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto border-t border-border pt-3">
          <Link href="/kontakt" className="btn-ghost min-h-12">
            Ähnliches Projekt besprechen
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function ProjektePage() {
  return (
    <>
      {/* Hero */}
      <section className="container-page pt-14 pb-12 lg:pt-24">
        <div className="max-w-3xl">
          <p className="eyebrow">Projekte</p>
          <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Vom Familiendach bis zur Werkhalle.
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            Sieben Anlagentypen prägen unsere Arbeit – vom Einfamilienhaus über
            den ZEV im Mehrfamilienhaus bis zur landwirtschaftlichen
            Grossanlage. Hier zeigen wir, was jeweils typisch ist: Eckwerte,
            Leistungsumfang und die Punkte, die im Detail entscheiden.
          </p>
          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-border bg-secondary/60 p-4">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-[color:var(--solar-emerald)]" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground">Transparenz:</span>{" "}
              Diese Seite zeigt typische Anlagentypen aus unserer Praxis –
              keine konkreten Kundenprojekte. Referenzobjekte mit realen
              Eckdaten präsentieren wir auf Anfrage im persönlichen Gespräch.
              Alle Wertspannen sind indikativ.
            </p>
          </div>
        </div>
      </section>

      {/* Anlagentypen 01–04 */}
      <section className="container-page pb-16 sm:pb-20">
        <div className="max-w-2xl">
          <p className="eyebrow">Anlagentypen 01–04</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            Vier Gebäudekategorien. Ein Qualitätsstandard.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {anlagenTypen.map((type) => (
            <ProjectTypeCard key={type.number} type={type} />
          ))}
        </div>
      </section>

      {/* Erweiterungen 05–07 */}
      <section className="container-page pb-16 sm:pb-24">
        <div className="max-w-2xl">
          <p className="eyebrow">Erweiterungen 05–07</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            Integration rund um die Anlage.
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            Speicher, Laden und Wärme gehören ins Gesamtsystem – sauber
            eingebunden statt angebaut.
          </p>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {erweiterungen.map((type) => (
            <ProjectTypeCard key={type.number} type={type} compact />
          ))}
        </div>
      </section>

      {/* Referenzen auf Anfrage */}
      <section className="container-page pb-4">
        <div className="surface-sand grid items-center gap-8 rounded-3xl p-8 lg:grid-cols-[1.5fr_1fr] lg:p-12">
          <div>
            <p className="eyebrow">Referenzen</p>
            <h2 className="mt-3 text-balance text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
              Echte Projekte zeigen wir persönlich.
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              Aus Respekt vor der Privatsphäre unserer Kundschaft publizieren
              wir keine Projekte ohne ausdrückliche Freigabe. Im
              Beratungsgespräch zeigen wir Ihnen Referenzobjekte, die Ihrem
              Vorhaben entsprechen – mit realen Eckdaten. Eine öffentliche
              Galerie folgt, sobald Freigaben vorliegen.
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

      <CtaBand
        title="Welcher Anlagentyp passt zu Ihrem Gebäude?"
        description="Berechnen Sie in wenigen Minuten Ihr Solarpotenzial – oder besprechen Sie Ihr Vorhaben direkt mit uns. Kostenfrei und unverbindlich, Antwort innert eines Werktags."
        secondaryHref="/kontakt"
        secondaryLabel="Projekt besprechen"
      />
    </>
  );
}
