import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { TeamSection } from "@/components/sections/team-section";
import { CtaBand } from "@/components/site/cta-band";
import { SectionTitle } from "@/components/site/section-head";
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
    title: "Feste Ansprechperson",
    text: "Eine Person verantwortet Begehung, Offerte, Bauleitung und Übergabe.",
  },
  {
    title: "Keine Pauschalangebote",
    text: "Jede Auslegung folgt Dachbild, Verschattung und Verbrauchsprofil.",
  },
  {
    title: "Transparente Offerten",
    text: "Material, Montage, Anschluss und Nebenkosten sind einzeln ausgewiesen.",
  },
  {
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
  // statt des eingelassenen Platzhalters.
  const team = await getPublishedTeamMembers();
  const koepfe = team
    .map((m) => ({ ...m, url: teamImageUrl(m.imagePath) }))
    .filter((m) => m.url)
    .slice(0, 2);
  return (
    <>
      {/* Intro — H1, Haltung, Faktenkacheln; rechts die Gründer */}
      <section
        aria-labelledby="ueber-uns-h"
        className="py-14 sm:py-20 lg:pt-24"
      >
        <div className="container-page">
          <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.85fr] lg:gap-16">
            <div>
              <p className="eyebrow">Über uns</p>
              <h1
                id="ueber-uns-h"
                className="mt-4 text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.6rem]"
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

              {/* Faktenkacheln — ehrliche Kennzahlen als kleine erhabene Elemente */}
              <dl className="mt-10 grid gap-4 sm:grid-cols-3">
                {facts.map((f) => (
                  <div
                    key={f.label}
                    className="neu-sm flex flex-col-reverse p-5"
                  >
                    <dt className="mt-1.5 text-sm leading-snug text-muted-foreground">
                      {f.label}
                    </dt>
                    <dd className="stat-mono text-2xl text-foreground">
                      {f.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Gründer-Porträts, sobald erfasst — sonst eingelassener Platzhalter */}
            {koepfe.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {koepfe.map((m) => (
                  <figure key={m.id} className="neu m-0 p-4">
                    <div className="neu-photo">
                      <div className="relative aspect-[3/4]">
                        <Image
                          src={m.url as string}
                          alt={`${m.name}, ${m.role}`}
                          fill
                          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 40vw, 260px"
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <figcaption className="mt-4 px-1">
                      <p className="text-[15px] font-semibold leading-snug text-foreground">
                        {m.name}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {m.role}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <div className="neu-in flex aspect-[4/3] items-center justify-center">
                <span className="eyebrow">Foto folgt</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Arbeitsweise — Karten-Grid */}
      <section aria-labelledby="arbeitsweise-h" className="py-14 sm:py-20">
        <div className="container-page">
          <SectionTitle
            id="arbeitsweise-h"
            title="So arbeiten wir. In jedem Projekt."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {workingPrinciples.map((p) => (
              <article key={p.title} className="neu p-6 sm:p-7">
                <span aria-hidden className="gold-dot mb-4" />
                <h3 className="text-lg font-semibold text-foreground">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                  {p.text}
                </p>
              </article>
            ))}
          </div>
          <Link href="/services" className="btn-ghost mt-8 min-h-12">
            Alle Leistungen im Detail
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>

      {/* Qualitätsversprechen — helle Karte mit Goldpunkt-Liste */}
      <section aria-labelledby="qualitaet-h" className="py-14 sm:py-20">
        <div className="container-page">
          <div className="neu p-6 sm:p-10">
            <SectionTitle
              id="qualitaet-h"
              title="Fünf Zusagen. Schriftlich, nicht sinngemäss."
            />
            <ul className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2">
              {qualityPromises.map((q) => (
                <li key={q} className="flex items-start gap-3">
                  <span aria-hidden className="gold-dot mt-1.5 shrink-0" />
                  <p className="text-sm leading-relaxed text-foreground sm:text-[15px]">
                    {q}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Team — rendert nichts, solange kein Team erfasst ist */}
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
