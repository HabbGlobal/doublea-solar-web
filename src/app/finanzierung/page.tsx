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

const introStats = [
  {
    value: "25–30",
    unit: "Jahre",
    label: "Auslegung moderner Solarmodule",
  },
  {
    value: "10–20",
    unit: "Jahre",
    label:
      "realistischer Horizont für den Wechselrichter-Ersatz (typisch 10–15, hochwertige Geräte länger)",
  },
  {
    value: "3",
    unit: "Hebel",
    label: "Eigenverbrauch, Förderung, Steuerabzug – indikativ geprüft",
  },
];

const returnDrivers = [
  {
    title: "Eigenverbrauch als Renditetreiber",
    text:
      "Jede selbst verbrauchte Kilowattstunde ersetzt eingekauften Netzstrom. Die Vergütung für eingespeisten Überschuss liegt in der Regel deutlich tiefer – darum bestimmt der Eigenverbrauchsanteil die Wirtschaftlichkeit stärker als die reine Anlagengrösse.",
  },
  {
    title: "Wärmepumpe als Hebel",
    text:
      "Eine Wärmepumpe verlagert die Wärmeerzeugung auf Strom. Läuft sie tagsüber mit eigenem Solarstrom, steigt der Eigenverbrauch spürbar – besonders in den Übergangsmonaten mit Sonne und Heizbedarf zugleich.",
  },
  {
    title: "Elektroauto als Hebel",
    text:
      "Wer zu Hause lädt, nutzt Solarstrom direkt. Gesteuertes Laden am Tag oder am Wochenende erhöht den Eigenverbrauchsanteil und ersetzt Treibstoffkosten durch Strom vom eigenen Dach.",
  },
];

const lifecycle = [
  {
    marker: "Jahr 0",
    title: "Investition & Inbetriebnahme",
    text:
      "Sie erhalten eine transparent aufgeschlüsselte Offerte: Module, Wechselrichter, Montagesystem, Elektroinstallation, Gerüst und Inbetriebnahme. Keine versteckten Positionen, keine Lockangebote.",
  },
  {
    marker: "Jahr 1–30",
    title: "Betrieb mit planbaren Kosten",
    text:
      "Monitoring, periodische Sichtprüfung, bei Bedarf Reinigung. Die laufenden Kosten einer Photovoltaikanlage sind gering – aber sie gehören von Anfang an in die Rechnung, nicht ins Kleingedruckte.",
  },
  {
    marker: "Jahr 10–20",
    title: "Wechselrichter-Ersatz einplanen",
    text:
      "Der Wechselrichter erreicht seine Lebensdauer meist vor den Modulen — typisch nach 10 bis 15 Jahren. Wir rechnen den Ersatz realistisch in die Lebenszyklusrechnung ein, statt ihn wegzulassen und die Amortisation schönzurechnen.",
  },
  {
    marker: "Jahr 25–30",
    title: "Module weiterhin produktiv",
    text:
      "Moderne Module sind auf 25 bis 30 Jahre Betrieb ausgelegt; Hersteller garantieren die Leistung über lange Zeiträume mit definierter Degradation. Viele Anlagen produzieren auch danach weiter.",
  },
];

const fundingItems = [
  {
    title: "Pronovo EIV",
    text:
      "Die Einmalvergütung des Bundes senkt die Investition um einen relevanten Anteil. Die Höhe hängt von Leistung, Anlagekategorie und den zum Zeitpunkt der Inbetriebnahme gültigen Ansätzen ab – wir berechnen sie tagesaktuell für Ihr Projekt und begleiten den Antrag.",
  },
  {
    title: "Kantonale & kommunale Programme",
    text:
      "Einzelne Kantone, Gemeinden und Energieversorger fördern zusätzlich – etwa Speicher oder Gesamtsanierungen. Die Programme ändern sich laufend; wir prüfen, was an Ihrem Standort aktuell gilt.",
  },
  {
    title: "Steuerabzüge",
    text:
      "Investitionen in Photovoltaik an bestehenden Gebäuden sind bei der direkten Bundessteuer den Unterhaltskosten gleichgestellt und heute in praktisch allen Kantonen vom steuerbaren Einkommen abziehbar. Massgebend bleiben die Praxis Ihres Kantons — im Kanton Solothurn etwa sind Neubauten und Gebäude jünger als fünf Jahre ausgenommen — sowie der Zeitpunkt von Rechnung bzw. Zahlung. Nicht ausgeschöpfte Beträge lassen sich auf zwei Folgejahre übertragen.",
  },
];

const financingPaths = [
  {
    title: "Eigenfinanzierung",
    lead:
      "Der direkteste Weg: Sie investieren einmal und profitieren ab dem ersten Betriebstag vollständig.",
    points: [
      "Keine Zins- und Finanzierungskosten über die Laufzeit",
      "Steuerabzug wirkt in der Regel in der Steuerperiode der Rechnungsstellung bzw. Zahlung — massgebend ist die Praxis Ihres Kantons",
      "Jede eingesparte Kilowattstunde entlastet ab Tag eins das Budget",
    ],
  },
  {
    title: "Ratenfinanzierung über Schweizer Partner",
    lead:
      "Auf Wunsch vermitteln wir den Kontakt zu Schweizer Finanzierungspartnern – Sie zahlen monatlich statt einmalig.",
    points: [
      "Monatliche Raten statt einmaliger Investitionsbetrag",
      "Konditionen und Bonitätsprüfung liegen beim Finanzierungspartner",
      "Wir liefern die technischen Unterlagen und begleiten den Prozess",
    ],
  },
];

const honestyNotes = [
  "Strompreise und Einspeisevergütungen schwanken. Wir rechnen konservativ statt optimistisch.",
  "Photovoltaik rechnet sich in vielen Fällen gut – aber nicht in jedem. Wenn es sich nicht lohnt, sagen wir das.",
  "Amortisationszeiten hängen von Standort, Verbrauchsprofil und Tarifen ab. Wir nennen Spannen, keine Garantien.",
  "Förderungen und Steuerabzüge rechnen wir nur ein, wenn Antrag und Abzug realistisch sind – alle Angaben bleiben indikativ.",
];

/* Werkplan-Bullet: kleines Tinte-Quadrat statt Icon */
function SquareBullet({ light = false }: { light?: boolean }) {
  return (
    <span
      aria-hidden
      className={
        light
          ? "mt-2 size-1.5 shrink-0 bg-[color:#f2f2ee]"
          : "mt-2 size-1.5 shrink-0 bg-[color:var(--solar-ink)]"
      }
    />
  );
}

/* ————————————————————————————————————————————————
   Seite
   ———————————————————————————————————————————————— */

export default function FinanzierungPage() {
  return (
    <>
      {/* 01 — Intro */}
      <SectionHead nr="01" label="Finanzierung" />
      <section
        aria-labelledby="finanzierung-h"
        className="container-page pt-12 pb-16 sm:pt-16 sm:pb-20"
      >
        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <p className="eyebrow">Finanzierung &amp; Wirtschaftlichkeit</p>
            <h1
              id="finanzierung-h"
              className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              Eine Investition, die arbeitet.
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              Eine Photovoltaikanlage kostet einmal – und produziert danach über
              Jahrzehnte. Wir legen offen, was sie kostet, was sie leistet
              und welche Förderungen realistisch sind. Konservativ gerechnet,
              ohne Verkaufsdruck.
            </p>

            <dl className="mt-10">
              {introStats.map((s, i) => (
                <div
                  key={s.label}
                  className={`grid gap-2 border-t border-border py-5 sm:grid-cols-[180px_1fr] sm:items-baseline sm:gap-8 ${
                    i === introStats.length - 1 ? "border-b" : ""
                  }`}
                >
                  <dt className="order-2 text-xs leading-relaxed text-muted-foreground sm:order-none">
                    {s.label}
                  </dt>
                  <dd className="order-1 sm:order-none">
                    <span className="stat-mono text-2xl font-semibold text-foreground sm:text-3xl">
                      {s.value}
                    </span>
                    <span className="stat-mono ml-1.5 text-sm text-[color:var(--solar-slate)]">
                      {s.unit}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Platzhalter-Fläche bis reale Projektfotografie vorliegt (Spec §4: keine Stock-/KI-Bilder). */}
          <div className="surface-navy p-7 sm:p-9">
            <p className="eyebrow">So arbeitet Ihre Anlage</p>
            <ul className="mt-6">
              {[
                {
                  k: "Eigenverbrauch",
                  v: "ersetzt eingekauften Netzstrom",
                },
                {
                  k: "Überschuss",
                  v: "wird ins Netz eingespeist und vergütet",
                },
                {
                  k: "Förderung",
                  v: "senkt die Anfangsinvestition – indikativ",
                },
                {
                  k: "Steuerabzug",
                  v: "reduziert die Nettokosten, je nach Kanton",
                },
              ].map((row, i, arr) => (
                <li
                  key={row.k}
                  className={`flex items-start gap-3 border-t border-[color:var(--solar-line)] py-4 ${
                    i === arr.length - 1 ? "border-b" : ""
                  }`}
                >
                  <SquareBullet light />
                  <p className="text-sm leading-relaxed text-[color:#a9aba3]">
                    <span className="font-semibold text-[color:#f2f2ee]">
                      {row.k}
                    </span>{" "}
                    {row.v}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs leading-relaxed text-[color:#a9aba3]">
              Wirtschaftlichkeit entsteht aus dem Zusammenspiel dieser vier
              Bausteine – nicht aus einer einzelnen Zahl.
            </p>
          </div>
        </div>
      </section>

      {/* 02 — Wirtschaftlichkeit */}
      <SectionHead nr="02" label="Wirtschaftlichkeit" />
      <section
        aria-labelledby="wirtschaftlichkeit-h"
        className="container-page py-12 sm:py-16"
      >
        <SectionTitle
          id="wirtschaftlichkeit-h"
          title="Warum sich Photovoltaik lohnt"
          lead="Nicht die grösste Anlage rechnet sich am besten, sondern die, deren Strom Sie selbst nutzen. Wer Wärme und Mobilität elektrifiziert, verschiebt mehr Verbrauch auf das eigene Dach – und verbessert die Rechnung Jahr für Jahr."
        />

        <div className="mt-10">
          {returnDrivers.map((d, i) => (
            <article
              key={d.title}
              className={`grid gap-2 border-t border-border py-7 transition-colors duration-150 hover:bg-card sm:grid-cols-[260px_1fr] sm:gap-8 lg:py-8 ${
                i === returnDrivers.length - 1 ? "border-b" : ""
              }`}
            >
              <h3 className="text-lg font-semibold text-foreground">
                {d.title}
              </h3>
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {d.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* 03 — Lebenszyklus */}
      <SectionHead nr="03" label="Lebenszyklus" />
      <section aria-labelledby="lebenszyklus-h" className="surface-sand">
        <div className="container-page py-12 sm:py-16">
          <SectionTitle
            id="lebenszyklus-h"
            title="Wer nur den Kaufpreis anschaut, rechnet zu kurz."
            lead="Eine Photovoltaikanlage ist ein Bauteil mit 25 bis 30 Jahren Lebensdauer. Wirtschaftlichkeit entsteht über diesen gesamten Zeitraum – darum gehören Wartung und der Wechselrichter-Ersatz von Anfang an in jede seriöse Rechnung."
          />

          <div className="mt-10">
            {lifecycle.map((item, i) => (
              <div
                key={item.marker}
                className={`grid gap-2 border-t border-border py-6 sm:grid-cols-[150px_1fr] sm:gap-8 lg:py-7 ${
                  i === lifecycle.length - 1 ? "border-b" : ""
                }`}
              >
                <p className="stat-mono text-sm font-semibold text-[color:var(--solar-stone)]">
                  {item.marker}
                </p>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — Erste Einschätzung */}
      <SectionHead nr="04" label="Erste Einschätzung" />
      <section
        aria-labelledby="einschaetzung-h"
        className="container-page py-12 sm:py-16"
      >
        <div className="surface-glass p-8 lg:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_auto]">
            <div>
              <p className="eyebrow">Solarrechner</p>
              <h2
                id="einschaetzung-h"
                className="mt-3 text-2xl font-semibold leading-tight text-foreground sm:text-3xl"
              >
                Wie rechnet sich das auf Ihrem Dach?
              </h2>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
                Der Solarrechner liefert in wenigen Minuten eine erste
                indikative Einschätzung Ihres Dachpotenzials – als sachliche
                Grundlage für das Beratungsgespräch.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/solarrechner" className="btn-primary">
                Solarpotenzial berechnen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — Förderungen */}
      <SectionHead nr="05" label="Förderungen" />
      <section
        aria-labelledby="foerderungen-h"
        className="container-page py-12 sm:py-16"
      >
        <SectionTitle
          id="foerderungen-h"
          title="Förderung senkt die Investition – wir prüfen, was wirklich gilt."
          lead="Bund, Kantone und teils Gemeinden unterstützen Photovoltaik. Die Programme ändern sich laufend – deshalb beurteilen wir jede Förderung tagesaktuell für Ihren Standort statt mit Pauschalwerten zu werben."
        />

        <div className="mt-10">
          {fundingItems.map((f, i) => (
            <article
              key={f.title}
              className={`grid gap-2 border-t border-border py-7 transition-colors duration-150 hover:bg-card sm:grid-cols-[260px_1fr] sm:gap-8 lg:py-8 ${
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

        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-muted-foreground">
          Alle Angaben zu Förderungen und Steuerabzügen sind indikativ.
          Massgebend sind die zum Zeitpunkt von Antrag und Inbetriebnahme
          gültigen Bestimmungen sowie die Praxis Ihres Kantons.
        </p>
        <p className="mt-3 max-w-3xl text-xs leading-relaxed text-muted-foreground">
          Hinweis: Mit dem beschlossenen Systemwechsel bei der
          Eigenmietwert-Besteuerung entfällt der Energiespar-Abzug bei der
          direkten Bundessteuer per 1. Januar 2029; bis Ende 2028 gilt das
          heutige Recht. Kantone können Abzüge befristet weiterführen.
        </p>
      </section>

      {/* 06 — Finanzierungswege */}
      <SectionHead nr="06" label="Finanzierungswege" />
      <section
        aria-labelledby="finanzierungswege-h"
        className="container-page py-12 sm:py-16"
      >
        <SectionTitle
          id="finanzierungswege-h"
          title="Zwei Wege zur eigenen Anlage – beide planbar."
          lead="Ob Sie die Anlage aus Eigenmitteln zahlen oder in Raten: Wir zeigen beide Wege neutral auf. Welcher passt, entscheidet Ihr Haushalt – nicht unser Verkaufsziel."
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
          Wir vermitteln auf Wunsch den Kontakt zu Schweizer
          Finanzierungspartnern, erbringen aber keine Finanz-, Anlage- oder
          Steuerberatung. Die Zusage von Konditionen erfolgt ausschliesslich
          durch den Finanzierungspartner.
        </p>
      </section>

      {/* 07 — Grundsätze */}
      <SectionHead nr="07" label="Grundsätze" />
      <section
        aria-labelledby="grundsaetze-h"
        className="container-page py-12 sm:py-16"
      >
        <SectionTitle
          id="grundsaetze-h"
          title="Ehrlich gerechnet – was Sie wissen sollten"
          lead="Wir empfehlen nur, was technisch und wirtschaftlich Sinn ergibt. Dazu gehören diese Grundsätze:"
        />
        <ul className="mt-8 max-w-3xl">
          {honestyNotes.map((n, i) => (
            <li
              key={n}
              className={`flex gap-3 border-t border-border py-4 text-sm leading-relaxed text-foreground/85 ${
                i === honestyNotes.length - 1 ? "border-b" : ""
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
      </section>

      <CtaBand
        title="Eine Finanzierung, die zu Ihrem Haushalt passt."
        description="Senden Sie uns Ihre Eckdaten – wir bereiten eine nachvollziehbare Investitionsspanne mit konservativer Wirtschaftlichkeitsrechnung vor."
        primaryHref="/angebote"
        primaryLabel="Angebot anfragen"
        secondaryHref="/solarrechner"
        secondaryLabel="Solarpotenzial berechnen"
      />
    </>
  );
}
