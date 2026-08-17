import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { TeamSection } from "@/components/sections/team-section";
import { CtaBand } from "@/components/site/cta-band";
import { SectionHead, SectionTitle } from "@/components/site/section-head";
import { siteConfig } from "@/lib/site-config";
import { getPublishedTeamMembers, teamImageUrl } from "@/lib/data/team";

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
    text: "Eine Person verantwortet Begehung, Offerte, Bauleitung und Übergabe.",
  },
  {
    n: "02",
    title: "Keine Pauschalangebote",
    text: "Jede Auslegung folgt Dachbild, Verschattung und Verbrauchsprofil.",
  },
  {
    n: "03",
    title: "Transparente Offerten",
    text: "Material, Montage, Anschluss und Nebenkosten sind einzeln ausgewiesen.",
  },
  {
    n: "04",
    title: "Geprüfte Schweizer Partner",
    text: "Montage durch geprüfte Schweizer Partnerbetriebe, von uns koordiniert und verantwortet.",
  },
];

const qualityPromises = [
  "Dokumentierte Begehung statt Ferndiagnose",
  "Inbetriebnahme mit Sicherheitsnachweis (SiNa)",
  "Vollständige Anlagendokumentation bei der Übergabe",
  "Online-Monitoring nach der Übergabe",
  "Verbindliche Reaktionszeiten bei Störungen",
];

/* ————————————————————————————————————————————————
   Seite
   ———————————————————————————————————————————————— */

export default async function UeberUnsPage() {
  // Sobald Porträts erfasst sind, zeigt der Intro-Bereich echte Gesichter
  // statt der Platzhalter-Schraffur.
  const team = await getPublishedTeamMembers();
  const koepfe = team
    .map((m) => ({ ...m, url: teamImageUrl(m.imagePath) }))
    .filter((m) => m.url)
    .slice(0, 2);
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
              gegründet und ist von hier aus in der ganzen Schweiz tätig. Uns
              prägt die Kombination aus Solartechnik, IT-Verständnis und
              Projektkoordination.
            </p>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              Wir sind ein junges Unternehmen und sagen das offen. Sie bekommen
              dafür kurze Wege und eine Arbeitsweise, die auf Dokumentation
              statt auf Versprechen baut.
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

          {/* Gründer-Porträts, sobald erfasst — sonst Platzhalter-Schraffur */}
          {koepfe.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {koepfe.map((m) => (
                <figure key={m.id}>
                  <div className="relative aspect-[3/4] overflow-hidden border border-border bg-card">
                    <Image
                      src={m.url as string}
                      alt={`${m.name}, ${m.role}`}
                      fill
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 40vw, 260px"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-3">
                    <p className="text-sm font-medium leading-snug text-foreground">
                      {m.name}
                    </p>
                    <p className="eyebrow mt-1.5">{m.role}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          ) : (
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
          )}
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

      {/* 02 · Qualitätsversprechen — Graphit, flach */}
      <section aria-labelledby="qualitaet-h" className="surface-navy">
        <SectionHead nr="02" label="Qualitätsversprechen" />
        <div className="container-page py-14 sm:py-20">
          <SectionTitle
            id="qualitaet-h"
            onDark
            title="Fünf Zusagen. Schriftlich, nicht sinngemäss."
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

      {/* 03 · Team — als letzte nummerierte Sektion; rendert nichts, solange
          kein Team erfasst ist, und reisst so keine Nummernlücke */}
      <TeamSection variant="full" nr="03" label="Team" />

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
