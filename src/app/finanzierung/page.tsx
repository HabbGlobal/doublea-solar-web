import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CtaBand } from "@/components/site/cta-band";
import { SectionHead, SectionTitle } from "@/components/site/section-head";

export const metadata: Metadata = {
  title: "Solaranlage finanzieren – Förderung, Kosten & Amortisation Schweiz",
  description:
    "Planen Sie Ihre Photovoltaikanlage mit Investitionsspanne, Pronovo EIV, kantonalen Förderungen, Steueraspekten und konservativer Wirtschaftlichkeitsrechnung.",
  alternates: {
    canonical: "/finanzierung",
  },
};

/* ————————————————————————————————————————————————
   Inhalte
   ———————————————————————————————————————————————— */

/** Belegte Kennzahlen mit Quelle und Stand — geprüft am 14. August 2026. */
const facts = [
  {
    kennzahl: "Einmalvergütung des Bundes (EIV)",
    wert: "CHF 360/kWp für angebaute Anlagen unter 30 kWp mit Eigenverbrauch (integriert CHF 400/kWp)",
    quelle: "EnFV Anhang 2.1 (Fedlex)",
    stand: "1.7.2026",
  },
  {
    kennzahl: "Referenz-Strompreis Haushalte 2026",
    wert: "27.7 Rp./kWh Median (Profil H4, exkl. MwSt); Region Grenchen ≈ 29.6 Rp./kWh inkl. MwSt",
    quelle: "ElCom, Strompreisübersicht",
    stand: "Tarifjahr 2026",
  },
  {
    kennzahl: "Vergütung für Überschussstrom",
    wert: "Seit 1.1.2026 schweizweit nach BFE-Referenz-Marktpreis; Minimum 6.0 Rp./kWh für Anlagen unter 30 kW",
    quelle: "Art. 15 EnG / BFE",
    stand: "Q2 2026",
  },
  {
    kennzahl: "Leistungsgarantie Module",
    wert: "30 Jahre Produkt- und Leistungsgarantie (AIKO Neostar; Degradation max. 0.35 %/Jahr ab Jahr 2)",
    quelle: "Hersteller-Datenblatt",
    stand: "14.08.2026",
  },
  {
    kennzahl: "Richtpreis Komplettanlage EFH",
    wert: "CHF 15'500–26'500 je nach Grösse und Speicher",
    quelle: "Firmen-Richtwert, inkl. Montage, vor Abzug der Einmalvergütung",
    stand: "14.08.2026",
  },
];

const fundingItems = [
  {
    title: "Pronovo EIV",
    text: "Die Einmalvergütung des Bundes senkt die Investition spürbar. Wir berechnen sie tagesaktuell für Ihr Projekt und übernehmen den Antrag.",
  },
  {
    title: "Kantonale & kommunale Programme",
    text: "Einzelne Kantone, Gemeinden und Energieversorger fördern zusätzlich – wir prüfen, was an Ihrem Standort gilt.",
  },
  {
    title: "Steuerabzüge",
    text: "An bestehenden Gebäuden sind Photovoltaik-Investitionen den Unterhaltskosten gleichgestellt und heute in praktisch allen Kantonen abziehbar; massgebend bleibt die Praxis Ihres Kantons (im Kanton Solothurn etwa sind Gebäude unter fünf Jahren ausgenommen). Mit dem Systemwechsel beim Eigenmietwert entfällt der Energiespar-Abzug bei der direkten Bundessteuer per 1. Januar 2029.",
  },
];

const financingPaths = [
  {
    title: "Eigenfinanzierung",
    lead: "Sie investieren einmal und profitieren ab dem ersten Betriebstag vollständig.",
    points: [
      "Keine Zins- und Finanzierungskosten",
      "Steuerabzug im Jahr der Zahlung, je nach kantonaler Praxis",
      "Jede eingesparte Kilowattstunde entlastet ab Tag eins",
    ],
  },
  {
    title: "Ratenfinanzierung über Schweizer Partner",
    lead: "Auf Wunsch vermitteln wir den Kontakt zu Schweizer Finanzierungspartnern.",
    points: [
      "Monatliche Raten statt einmaliger Investitionsbetrag",
      "Konditionen und Bonitätsprüfung liegen beim Partner",
      "Wir liefern die technischen Unterlagen",
    ],
  },
];

const economics = [
  "Eigenverbrauch bestimmt die Rendite stärker als die Anlagengrösse.",
  "Wärmepumpe und Elektroauto verschieben Verbrauch auf das eigene Dach.",
  "Der Wechselrichter wird typisch nach 10 bis 15 Jahren ersetzt – wir rechnen das ein.",
  "Module sind auf 25 bis 30 Jahre Betrieb mit definierter Degradation ausgelegt.",
  "Wir rechnen konservativ und nennen Spannen statt garantierter Amortisationszeiten.",
];

/* Werkplan-Bullet: kleines Tinte-Quadrat statt Icon */
function SquareBullet() {
  return (
    <span
      aria-hidden
      className="mt-2 size-1.5 shrink-0 bg-[color:var(--solar-ink)]"
    />
  );
}

/* ————————————————————————————————————————————————
   Seite
   ———————————————————————————————————————————————— */

export default function FinanzierungPage() {
  return (
    <>
      {/* 01 — Investition & Richtpreise */}
      <SectionHead nr="01" label="Investition & Richtpreise" />
      <section
        aria-labelledby="finanzierung-h"
        className="container-page pt-12 pb-14 sm:pt-16 sm:pb-20"
      >
        <div className="max-w-3xl">
          <p className="eyebrow">Finanzierung &amp; Wirtschaftlichkeit</p>
          <h1
            id="finanzierung-h"
            className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Eine Investition, die arbeitet.
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            Eine Photovoltaikanlage kostet einmal und produziert danach über
            Jahrzehnte. Hier stehen die Zahlen, die wir belegen können.
          </p>
        </div>

        {/* Desktop: echte Tabelle */}
        <table className="mt-10 hidden w-full border-collapse text-sm sm:table">
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="eyebrow py-3 pr-6 text-left">
                Kennzahl
              </th>
              <th scope="col" className="eyebrow py-3 pr-6 text-left">
                Wert
              </th>
              <th scope="col" className="eyebrow py-3 pr-6 text-left">
                Quelle
              </th>
              <th scope="col" className="eyebrow py-3 text-left">
                Stand
              </th>
            </tr>
          </thead>
          <tbody>
            {facts.map((f) => (
              <tr key={f.kennzahl} className="border-b border-border">
                <td className="max-w-[26ch] py-4 pr-6 align-top font-medium text-foreground">
                  {f.kennzahl}
                </td>
                <td className="stat-mono max-w-[38ch] py-4 pr-6 align-top">
                  {f.wert}
                </td>
                <td className="py-4 pr-6 align-top text-muted-foreground">
                  {f.quelle}
                </td>
                <td className="py-4 align-top text-muted-foreground">
                  {f.stand}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile: gestapelte Definitionen statt horizontalem Scrollen */}
        <dl className="mt-8 border-b border-border sm:hidden">
          {facts.map((f) => (
            <div key={f.kennzahl} className="border-t border-border py-5">
              <dt className="text-sm font-medium text-foreground">
                {f.kennzahl}
              </dt>
              <dd className="stat-mono mt-2 text-sm leading-relaxed">
                {f.wert}
              </dd>
              <dd className="mt-2 text-xs text-muted-foreground">
                {f.quelle} · Stand {f.stand}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-4 max-w-3xl text-xs leading-relaxed text-muted-foreground">
          Alle Angaben indikativ; massgebend sind die zum Zeitpunkt der
          Inbetriebnahme gültigen Ansätze. Quellen: Energieförderungsverordnung
          EnFV (Fedlex, Stand 1.7.2026) · ElCom Strompreisübersicht 2026 ·
          Art. 15 EnG / BFE-Referenz-Marktpreis · Hersteller-Datenblatt.
          Geprüft am 14. August 2026.
        </p>
      </section>

      {/* 02 — Förderung & Steuern */}
      <SectionHead nr="02" label="Förderung & Steuern" />
      <section aria-labelledby="foerderungen-h" className="surface-sand">
        <div className="container-page py-12 sm:py-16">
          <SectionTitle
            id="foerderungen-h"
            title="Förderung senkt die Investition."
            lead="Bund, Kantone und teils Gemeinden unterstützen Photovoltaik. Weil sich die Programme laufend ändern, prüfen wir sie tagesaktuell für Ihren Standort."
          />

          <div className="mt-10">
            {fundingItems.map((f, i) => (
              <article
                key={f.title}
                className={`grid gap-2 border-t border-border py-7 sm:grid-cols-[260px_1fr] sm:gap-8 lg:py-8 ${
                  i === fundingItems.length - 1 ? "border-b" : ""
                }`}
              >
                <h3 className="text-lg font-semibold text-foreground">
                  {f.title}
                </h3>
                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {f.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — Finanzierungswege */}
      <SectionHead nr="03" label="Finanzierungswege" />
      <section
        aria-labelledby="finanzierungswege-h"
        className="container-page py-12 sm:py-16"
      >
        <SectionTitle
          id="finanzierungswege-h"
          title="Zwei Wege zur eigenen Anlage – beide planbar."
          lead="Ob aus Eigenmitteln oder in Raten: Welcher Weg passt, entscheidet Ihr Haushalt."
        />

        <div className="mt-10 grid gap-x-12 lg:grid-cols-2">
          {financingPaths.map((path) => (
            <article key={path.title} className="border-t border-border py-7">
              <h3 className="text-xl font-semibold text-foreground">
                {path.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {path.lead}
              </p>
              <ul className="mt-5">
                {path.points.map((p, i) => (
                  <li
                    key={p}
                    className={`flex gap-3 border-t border-border py-3 text-sm leading-relaxed text-foreground/85 ${
                      i === path.points.length - 1 ? "border-b" : ""
                    }`}
                  >
                    <SquareBullet />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-muted-foreground">
          Wir vermitteln auf Wunsch Schweizer Finanzierungspartner, erbringen
          aber keine Finanz-, Anlage- oder Steuerberatung – Konditionen sagt
          allein der Partner zu.
        </p>
      </section>

      {/* 04 — Wirtschaftlichkeit */}
      <SectionHead nr="04" label="Wirtschaftlichkeit" />
      <section aria-labelledby="wirtschaftlichkeit-h" className="surface-sand">
        <div className="container-page py-12 sm:py-16">
          <SectionTitle
            id="wirtschaftlichkeit-h"
            title="Über den ganzen Lebenszyklus gerechnet."
            lead="Nicht die grösste Anlage rechnet sich am besten, sondern die, deren Strom Sie selbst nutzen – über 25 bis 30 Jahre Betrieb."
          />
          <ul className="mt-8 max-w-3xl">
            {economics.map((n, i) => (
              <li
                key={n}
                className={`flex gap-3 border-t border-border py-4 text-sm leading-relaxed text-foreground/85 ${
                  i === economics.length - 1 ? "border-b" : ""
                }`}
              >
                <SquareBullet />
                {n}
              </li>
            ))}
          </ul>
          <div className="mt-7">
            <Link href="/kontakt" className="btn-ghost ring-focus min-h-12">
              Fragen zur Wirtschaftlichkeit? Sprechen Sie mit uns.
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        title="Eine Finanzierung, die zu Ihrem Haushalt passt."
        description="Senden Sie uns Ihre Eckdaten – wir bereiten eine nachvollziehbare Investitionsspanne vor."
        primaryHref="/angebote"
        primaryLabel="Angebot anfragen"
        secondaryHref="/solarrechner"
        secondaryLabel="Solarpotenzial berechnen"
      />
    </>
  );
}
