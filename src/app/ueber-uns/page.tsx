import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { TeamSection } from "@/components/sections/team-section";
import { CtaBand } from "@/components/site/cta-band";
import { SectionHead, SectionTitle } from "@/components/site/section-head";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Über uns – Schweizer Solarunternehmen aus Grenchen",
  description:
    "DoubleA Solar Solutions ist ein Schweizer Solarunternehmen aus Grenchen SO – gegründet 2025, tätig in Solothurn, Biel, Bern und der ganzen Schweiz. Solartechnik, IT-Verständnis und Projektkoordination aus einer Hand.",
  alternates: {
    canonical: "/ueber-uns",
  },
};

/* ————————————————————————————————————————————————
   Inhalte
   ———————————————————————————————————————————————— */

const facts = [
  { value: "2025", label: "Gegründet in Grenchen SO" },
  { value: "1", label: "Feste Ansprechperson pro Projekt" },
  { value: "25+", label: "Jahre Planungshorizont je Anlage" },
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

const values = [
  {
    n: "01",
    title: "Klarheit vor Verkauf",
    text: "Wir empfehlen nur, was technisch und wirtschaftlich Sinn ergibt – auch wenn das eine kleinere Anlage bedeutet. Oder gar keine.",
  },
  {
    n: "02",
    title: "Qualität ist Standard",
    text: "Bewährte Komponenten mit langer Garantie, dokumentierte Abläufe, saubere Übergabe. Qualität ist bei uns kein Aufpreis, sondern die Grundlage jeder Offerte.",
  },
  {
    n: "03",
    title: "Nachhaltig im Detail",
    text: "Nachhaltigkeit endet nicht beim verkauften Modul. Materialwahl, Transportwege und die Entsorgung auf der Baustelle gestalten wir bewusst.",
  },
  {
    n: "04",
    title: "Persönlich verantwortlich",
    text: "Sie kennen die Person, die Ihr Projekt verantwortet – von der ersten Begehung bis lange nach der Inbetriebnahme. Bei Fragen erreichen Sie keine Hotline, sondern uns.",
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
      {/* 00 · Intro — eyebrow, H1, Haltung, Faktenzeilen */}
      <section
        aria-labelledby="ueber-uns-h"
        className="container-page pt-14 pb-14 sm:pt-20 sm:pb-20 lg:pt-24"
      >
        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.75fr] lg:gap-16">
          <div>
            <p className="eyebrow">Über uns</p>
            <h1
              id="ueber-uns-h"
              className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
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

            {/* Faktenzeilen — ehrliche Kennzahlen als Hairline-Index */}
            <dl className="mt-10">
              {facts.map((f) => (
                <div
                  key={f.label}
                  className="flex items-baseline justify-between gap-6 border-t border-border py-4 last:border-b"
                >
                  <dt className="text-sm text-muted-foreground">{f.label}</dt>
                  <dd className="stat-mono text-xl font-semibold text-foreground sm:text-2xl">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Bild-Platzhalter — technische Schraffur, kein Stockfoto */}
          <div
            className="relative flex aspect-[4/3] items-center justify-center border border-border bg-card"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, var(--solar-line) 0 1px, transparent 1px 9px)",
            }}
          >
            <span className="eyebrow bg-card px-3 py-1.5">
              Teamfotografie in Vorbereitung
            </span>
          </div>
        </div>
      </section>

      {/* 01 · Arbeitsweise — Index-Zeilen */}
      <SectionHead nr="01" label="Arbeitsweise" />
      <section
        aria-labelledby="arbeitsweise-h"
        className="container-page py-14 sm:py-20"
      >
        <SectionTitle id="arbeitsweise-h" title="So arbeiten wir. In jedem Projekt." />
        <div className="mt-10">
          {workingPrinciples.map((p) => (
            <article
              key={p.n}
              className="grid gap-x-8 gap-y-2 border-t border-border py-6 transition-colors duration-150 last:border-b hover:bg-card sm:grid-cols-[64px_240px_1fr] sm:py-7 lg:grid-cols-[80px_280px_1fr]"
            >
              <p className="stat-mono text-sm text-[color:var(--solar-stone)]">
                {p.n}
              </p>
              <h3 className="text-lg font-semibold text-foreground">
                {p.title}
              </h3>
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                {p.text}
              </p>
            </article>
          ))}
        </div>
        <Link href="/services" className="btn-ghost mt-8 min-h-12">
          Alle Leistungen im Detail
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </section>

      {/* 02 · Werte — 2-spaltige Index-Liste */}
      <SectionHead nr="02" label="Werte" />
      <section
        aria-labelledby="werte-h"
        className="container-page py-14 sm:py-20"
      >
        <SectionTitle
          id="werte-h"
          title="Vier Grundsätze, an denen Sie uns messen können."
        />
        <div className="mt-10 grid sm:grid-cols-2 sm:gap-x-14">
          {values.map((v) => (
            <article
              key={v.n}
              className="border-t border-border py-6 sm:py-7 [&:nth-last-child(-n+1)]:border-b sm:[&:nth-last-child(-n+2)]:border-b"
            >
              <div className="flex items-baseline gap-4">
                <span className="stat-mono text-sm text-[color:var(--solar-stone)]">
                  {v.n}
                </span>
                <h3 className="text-lg font-semibold text-foreground">
                  {v.title}
                </h3>
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                {v.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* 03 · Qualitätsversprechen — Graphit, flach */}
      <section aria-labelledby="qualitaet-h" className="surface-navy">
        <SectionHead nr="03" label="Qualitätsversprechen" />
        <div className="container-page py-14 sm:py-20">
          <SectionTitle
            id="qualitaet-h"
            onDark
            title="Sechs Zusagen. Schriftlich, nicht sinngemäss."
            lead="Kein Qualitätslabel, das wir uns selbst verleihen – sondern konkrete Zusagen, die Sie in Offerte und Vertrag wiederfinden."
          />
          <ul className="mt-10 grid gap-x-14 gap-y-5 sm:grid-cols-2">
            {qualityPromises.map((q) => (
              <li key={q} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-2 size-1.5 shrink-0 bg-[color:#f2f2ee]"
                />
                <p className="text-sm leading-relaxed text-[color:#f2f2ee] sm:text-[15px]">
                  {q}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 04 · Partner & Montageteams — sachlich, bewusst ohne Logowand */}
      <section aria-labelledby="partner-h" className="surface-sand">
        <SectionHead nr="04" label="Partner" />
        <div className="container-page py-14 sm:py-20">
          <div className="grid items-start gap-10 lg:grid-cols-[0.54fr_0.46fr] lg:gap-16">
            <div>
              <SectionTitle
                id="partner-h"
                title="Geprüfte Schweizer Partner. Eine Verantwortung."
              />
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
            <div className="surface-glass p-6 sm:p-8">
              <p className="eyebrow">Woran wir Partner messen</p>
              <ul className="mt-5 grid gap-3.5">
                {partnerCriteria.map((c) => (
                  <li
                    key={c}
                    className="flex items-start gap-3 text-sm leading-relaxed text-foreground sm:text-[15px]"
                  >
                    <span
                      aria-hidden
                      className="mt-2 size-1.5 shrink-0 bg-[color:var(--solar-ink)]"
                    />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 05 · Team — als letzte nummerierte Sektion; rendert nichts, solange
          kein Team erfasst ist, und reisst so keine Nummernlücke */}
      <TeamSection variant="full" nr="05" label="Team" />

      <CtaBand
        title="Lernen wir uns kennen."
        description="Ein gutes Solarprojekt beginnt mit einem ehrlichen Gespräch."
        primaryHref="/solarrechner"
        primaryLabel="Solarpotenzial berechnen"
        secondaryHref="/kontakt"
        secondaryLabel="Beratung anfragen"
      />
    </>
  );
}
