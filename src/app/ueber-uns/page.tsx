import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Compass,
  HandshakeIcon,
  Leaf,
  Package,
  Recycle,
  ShieldCheck,
  Truck,
  type LucideIcon,
} from "lucide-react";

import { CtaBand } from "@/components/site/cta-band";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Über uns – Schweizer Solarunternehmen aus Grenchen",
  description:
    "DoubleA Solar Solutions ist ein Schweizer Solarunternehmen aus Grenchen SO – gegründet 2025, tätig in Solothurn, Biel, Bern und der ganzen Schweiz. Solartechnik, IT-Verständnis und Projektkoordination aus einer Hand.",
};

/* ————————————————————————————————————————————————
   Inhalte
   ———————————————————————————————————————————————— */

const competences = [
  {
    n: "01",
    title: "Solartechnik",
    text: "Auslegung, Montageplanung und Inbetriebnahme nach Schweizer Normen – vom Aufmass bis zum Sicherheitsnachweis.",
  },
  {
    n: "02",
    title: "IT-Verständnis",
    text: "Monitoring, Datenauswertung und digitale Abläufe gehören für uns zur Anlage – nicht zum Zubehör.",
  },
  {
    n: "03",
    title: "Projektkoordination",
    text: "Ein Plan, alle Gewerke, klare Termine. Wir führen das Projekt – nicht umgekehrt.",
  },
];

const facts = [
  { value: "2025", label: "Gegründet in Grenchen SO" },
  { value: "1", label: "Feste Ansprechperson pro Projekt" },
  { value: "25+", label: "Jahre Planungshorizont je Anlage" },
];

type Value = {
  n: string;
  icon: LucideIcon;
  title: string;
  text: string;
};

const values: Value[] = [
  {
    n: "01",
    icon: Compass,
    title: "Klarheit vor Verkauf",
    text: "Wir empfehlen nur, was technisch und wirtschaftlich Sinn ergibt – auch wenn das eine kleinere Anlage bedeutet. Oder gar keine.",
  },
  {
    n: "02",
    icon: ShieldCheck,
    title: "Qualität ist Standard",
    text: "Bewährte Komponenten mit langer Garantie, dokumentierte Abläufe, saubere Übergabe. Qualität ist bei uns kein Aufpreis, sondern die Grundlage jeder Offerte.",
  },
  {
    n: "03",
    icon: Leaf,
    title: "Nachhaltig im Detail",
    text: "Nachhaltigkeit endet nicht beim verkauften Modul. Materialwahl, Transportwege und die Entsorgung auf der Baustelle gestalten wir bewusst.",
  },
  {
    n: "04",
    icon: HandshakeIcon,
    title: "Persönlich verantwortlich",
    text: "Sie kennen die Person, die Ihr Projekt verantwortet – von der ersten Begehung bis lange nach der Inbetriebnahme. Bei Fragen erreichen Sie keine Hotline, sondern uns.",
  },
];

const workingPrinciples = [
  {
    n: "01",
    title: "Feste Ansprechperson",
    text: "Ihr Projekt hat bei uns einen Namen. Eine Person verantwortet Begehung, Offerte, Bauleitung und Übergabe – und bleibt danach erreichbar.",
  },
  {
    n: "02",
    title: "Keine Pauschalangebote",
    text: "Wir verkaufen keine Anlage ab Katalog. Jede Auslegung folgt Dachbild, Verschattung und Verbrauchsprofil – dokumentiert und nachvollziehbar.",
  },
  {
    n: "03",
    title: "Transparente Offerten",
    text: "Alle Positionen offen ausgewiesen: Material, Montage, Anschluss, Nebenkosten. Sie vergleichen auf sauberer Grundlage – ohne Kleingedrucktes.",
  },
];

const qualityPromises = [
  "Dokumentierte Begehung statt Ferndiagnose – jede Offerte basiert auf einer geprüften Grundlage.",
  "Offerten mit klar getrennten Positionen – Sie sehen, was Material, Montage und Anschluss kosten.",
  "Montage ausschliesslich durch geprüfte Schweizer Partnerbetriebe – koordiniert und verantwortet von uns.",
  "Inbetriebnahme mit Sicherheitsnachweis (SiNa), Protokoll und vollständiger Anlagendokumentation.",
  "Online-Monitoring und definierte Servicefenster nach der Übergabe.",
  "Verbindliche Reaktionszeiten bei Störungen – Sie erreichen eine Person, keine Warteschleife.",
];

type SustainabilityItem = {
  icon: LucideIcon;
  title: string;
  text: string;
};

const sustainability: SustainabilityItem[] = [
  {
    icon: Package,
    title: "Materialwahl",
    text: "Komponenten von Herstellern mit langen Produkt- und Leistungsgarantien und etablierten Rücknahmesystemen. Langlebigkeit schlägt den tiefsten Einkaufspreis.",
  },
  {
    icon: Truck,
    title: "Logistik",
    text: "Gebündelte Lieferungen und kurze Anfahrtswege aus der Region – wir planen Transporte pro Projekt, nicht pro Teillieferung.",
  },
  {
    icon: Recycle,
    title: "Baustelle & Rückbau",
    text: "Verpackungsmaterial wird zurückgenommen und getrennt entsorgt. Altmaterial bei Sanierungen führen wir der fachgerechten Verwertung zu.",
  },
];

const partnerCriteria = [
  "Konzessionierte Elektroinstallation für jeden Netzanschluss",
  "Nachgewiesene Qualifikation und Versicherungsdeckung",
  "Eingespielte Teams, die wiederkehrend mit uns bauen",
  "Abnahme jedes Gewerks durch DoubleA, bevor Sie übernehmen",
];

/* ————————————————————————————————————————————————
   Seite
   ———————————————————————————————————————————————— */

export default function UeberUnsPage() {
  return (
    <>
      {/* Intro — hell, editorial, mit Kompetenz-Panel als Bildersatz */}
      <section className="container-page pt-14 pb-16 sm:pt-20 sm:pb-24 lg:pt-24">
        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.75fr] lg:gap-16">
          <div>
            <p className="eyebrow">Über uns</p>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Ein Schweizer Solarunternehmen mit klarem Anspruch.
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              {siteConfig.legalName} wurde {siteConfig.founded} in Grenchen
              gegründet und ist von hier aus in der ganzen Schweiz tätig. Was
              uns prägt, ist die Kombination aus Solartechnik, IT-Verständnis
              und Projektkoordination – wir planen Anlagen wie Ingenieure,
              führen Projekte wie Bauleiter und denken Monitoring von Anfang
              an mit.
            </p>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              Wir sind ein junges Unternehmen und sagen das offen. Was Sie
              dafür bekommen: kurze Wege, volle Aufmerksamkeit für jedes
              Projekt – und eine Arbeitsweise, die auf Dokumentation statt auf
              Versprechen baut.
            </p>

            {/* Faktenleiste — ehrliche Kennzahlen, keine erfundenen Referenzwerte */}
            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
              {facts.map((f) => (
                <div key={f.label}>
                  <dd className="stat-mono text-2xl font-semibold text-foreground sm:text-3xl">
                    {f.value}
                  </dd>
                  <dt className="mt-1.5 text-xs leading-snug text-muted-foreground sm:text-sm">
                    {f.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>

          {/*
            Bildersatz-Panel (Token-Fläche statt Platzhalterfoto).
            AI-Bildprompt für späteres Teamfoto:
            "Editorial corporate photography, two Swiss solar engineers in
            dark workwear reviewing a rooftop PV layout plan on a tablet,
            standing in a bright modern workshop in Grenchen Switzerland,
            soft natural window light, muted anthracite and sage green tones,
            shallow depth of field, Leica look, no logos, 4:5 portrait"
          */}
          <aside
            aria-label="Unsere drei Kompetenzen"
            className="surface-sand relative overflow-hidden rounded-3xl p-6 sm:p-8"
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-8 top-0 h-px bg-[color:var(--solar-gold)]/60"
            />
            <p className="eyebrow text-[11px]">Was uns ausmacht</p>
            <ul className="mt-6 flex flex-col gap-6">
              {competences.map((c) => (
                <li
                  key={c.n}
                  className="border-t border-[color:var(--solar-sand)] pt-5 first:border-t-0 first:pt-0"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="stat-mono text-sm text-[color:var(--solar-gold)]">
                      {c.n}
                    </span>
                    <h2 className="text-lg font-semibold text-foreground">
                      {c.title}
                    </h2>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {c.text}
                  </p>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* Mission & Vision — ruhige Sand-Zwischenzone, editorial */}
      <section className="surface-sand">
        <div className="container-page py-16 sm:py-20 lg:py-24">
          <p className="eyebrow">Mission & Vision</p>
          <h2 className="mt-3 max-w-2xl text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-[44px]">
            Warum es DoubleA gibt.
          </h2>
          <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:mt-12 lg:gap-16">
            <div>
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="h-px w-10 bg-[color:var(--solar-gold)]"
                />
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[color:var(--solar-slate)]">
                  Mission
                </p>
              </div>
              <p className="mt-4 max-w-xl text-lg font-medium leading-relaxed text-foreground sm:text-xl">
                Solaranlagen bauen, die halten, was die Offerte verspricht –
                technisch sauber ausgelegt, transparent gerechnet und über
                Jahrzehnte betreut.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="h-px w-10 bg-[color:var(--solar-gold)]"
                />
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[color:var(--solar-slate)]">
                  Vision
                </p>
              </div>
              <p className="mt-4 max-w-xl text-lg font-medium leading-relaxed text-foreground sm:text-xl">
                Photovoltaik, die in der Schweiz so selbstverständlich wird
                wie der Hausanschluss – und so sorgfältig gebaut, dass niemand
                mehr über Qualität diskutieren muss.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Werte — vier Grundsätze als Karten */}
      <section className="container-page py-16 sm:py-24 lg:py-28">
        <div className="max-w-2xl">
          <p className="eyebrow">Unsere Werte</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-[44px]">
            Vier Grundsätze, an denen Sie uns messen können.
          </h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <article
                key={v.n}
                className="rounded-3xl border border-border bg-white/70 p-6 transition hover:-translate-y-1 hover:shadow-[0_20px_50px_-24px_rgba(17,19,21,0.18)] lg:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-[color:var(--solar-ink)]/8 text-[color:var(--solar-ink)] ring-1 ring-[color:var(--solar-ink)]/10">
                    <Icon className="size-5" />
                  </span>
                  <span className="stat-mono text-sm text-[color:var(--solar-gold)]">
                    {v.n}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                  {v.text}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Arbeitsweise — editorialer Dreiklang mit Nummern */}
      <section className="container-page pb-16 sm:pb-24 lg:pb-28">
        <div className="max-w-2xl">
          <p className="eyebrow">Arbeitsweise</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-[44px]">
            So arbeiten wir. In jedem Projekt.
          </h2>
        </div>
        <div className="mt-12 grid gap-x-14 gap-y-10 sm:grid-cols-3 lg:mt-14">
          {workingPrinciples.map((p) => (
            <article key={p.n} className="relative border-t border-border pt-7">
              <span
                aria-hidden="true"
                className="absolute left-0 top-[-1px] h-px w-10 bg-[color:var(--solar-gold)]"
              />
              <p className="stat-mono text-sm text-[color:var(--solar-gold)]">
                {p.n}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-foreground">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                {p.text}
              </p>
            </article>
          ))}
        </div>
        <Link href="/services" className="btn-ghost mt-10 min-h-12">
          Alle Leistungen im Detail
          <ArrowRight className="size-4" />
        </Link>
      </section>

      {/* Qualitätsversprechen — dunkle Feature-Sektion */}
      <section className="surface-navy grain-overlay relative overflow-hidden">
        <div className="container-page relative py-16 sm:py-24 lg:py-28">
          <div className="max-w-2xl">
            <p className="eyebrow text-white/60">Qualitätsversprechen</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-[44px]">
              Sechs Zusagen. Schriftlich, nicht sinngemäss.
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/70 sm:text-base">
              Kein Qualitätslabel, das wir uns selbst verleihen – sondern
              konkrete Zusagen, die Sie in Offerte und Vertrag wiederfinden.
            </p>
          </div>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
            {qualityPromises.map((q) => (
              <li
                key={q}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5"
              >
                <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-[color:var(--solar-leaf)]/20 text-[color:var(--solar-leaf)]">
                  <Check className="size-3" strokeWidth={3} />
                </span>
                <p className="text-sm leading-relaxed text-white/85">{q}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Nachhaltigkeit — sachlich, ohne Pathos */}
      <section className="container-page py-16 sm:py-24 lg:py-28">
        <div className="grid items-start gap-10 lg:grid-cols-[0.46fr_0.54fr] lg:gap-16">
          <div>
            <p className="eyebrow">Nachhaltigkeit</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
              Nachhaltig im Detail – nicht nur im Prospekt.
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              Eine Photovoltaikanlage spart über ihre Lebensdauer ein
              Vielfaches der Energie ein, die ihre Herstellung benötigt. Uns
              beschäftigt der Rest des Weges: Material, Transport und
              Baustelle. Dort entscheidet sich, wie sauber ein Solarprojekt
              wirklich ist.
            </p>
          </div>
          <ul className="flex flex-col gap-5">
            {sustainability.map((s) => {
              const Icon = s.icon;
              return (
                <li
                  key={s.title}
                  className="surface-glass flex items-start gap-4 rounded-2xl p-5 sm:p-6"
                >
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-[color:var(--solar-ink)]/8 text-[color:var(--solar-emerald)] ring-1 ring-[color:var(--solar-ink)]/10">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">
                      {s.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {s.text}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Partner & Montageteams — sachlich, bewusst ohne Logowand */}
      <section className="surface-sand">
        <div className="container-page py-16 sm:py-20 lg:py-24">
          <div className="grid items-start gap-10 lg:grid-cols-[0.54fr_0.46fr] lg:gap-16">
            <div>
              <p className="eyebrow">Partner & Montageteams</p>
              <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                Geprüfte Schweizer Partner. Eine Verantwortung.
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                Für Elektroinstallation, Gerüstbau und Dacharbeiten arbeiten
                wir mit festen Schweizer Partnerbetrieben, die wir kennen und
                deren Arbeit wir abnehmen. Die Koordination, die Bauleitung
                und die Verantwortung Ihnen gegenüber bleiben bei DoubleA –
                es gibt keine anonymen Subunternehmerketten.
              </p>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Wir verzichten bewusst auf eine Logowand. Welche
                Partnerbetriebe an Ihrem Projekt beteiligt sind, weisen wir
                in jeder Offerte transparent aus.
              </p>
            </div>
            <div className="rounded-3xl border border-border bg-white/85 p-6 sm:p-8">
              <p className="eyebrow text-[11px]">Woran wir Partner messen</p>
              <ul className="mt-5 grid gap-3.5">
                {partnerCriteria.map((c) => (
                  <li
                    key={c}
                    className="flex items-start gap-3 text-sm leading-relaxed text-foreground/85 sm:text-[15px]"
                  >
                    <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-[color:var(--solar-leaf)]/45 text-[color:var(--solar-emerald)]">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Lernen wir uns kennen."
        description="Ein gutes Solarprojekt beginnt mit einem ehrlichen Gespräch – kostenfrei, unverbindlich und mit Antwort innert eines Werktags."
        primaryHref="/solarrechner"
        primaryLabel="Solarpotenzial berechnen"
        secondaryHref="/kontakt"
        secondaryLabel="Beratung anfragen"
      />
    </>
  );
}
