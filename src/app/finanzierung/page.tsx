import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  Calculator,
  CarFront,
  HandCoins,
  Info,
  Landmark,
  Percent,
  Sun,
  Thermometer,
  Wallet,
} from "lucide-react";

import { CtaBand } from "@/components/site/cta-band";

export const metadata: Metadata = {
  title: "Solaranlage finanzieren – Förderung, Kosten & Amortisation Schweiz",
  description:
    "Planen Sie Ihre Photovoltaikanlage mit transparenter Investitionsspanne, Pronovo EIV, kantonalen Förderungen, Steueraspekten und ehrlicher Wirtschaftlichkeitsrechnung.",
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
    value: "12–20",
    unit: "Jahre",
    label: "realistischer Horizont für den Wechselrichter-Ersatz",
  },
  {
    value: "3",
    unit: "Hebel",
    label: "Eigenverbrauch, Förderung, Steuerabzug – indikativ geprüft",
  },
];

const returnDrivers = [
  {
    icon: Sun,
    title: "Eigenverbrauch als Renditetreiber",
    text:
      "Jede selbst verbrauchte Kilowattstunde ersetzt eingekauften Netzstrom. Die Vergütung für eingespeisten Überschuss liegt in der Regel deutlich tiefer – darum bestimmt der Eigenverbrauchsanteil die Wirtschaftlichkeit stärker als die reine Anlagengrösse.",
  },
  {
    icon: Thermometer,
    title: "Wärmepumpe als Hebel",
    text:
      "Eine Wärmepumpe verlagert die Wärmeerzeugung auf Strom. Läuft sie tagsüber mit eigenem Solarstrom, steigt der Eigenverbrauch spürbar – besonders in den Übergangsmonaten mit Sonne und Heizbedarf zugleich.",
  },
  {
    icon: CarFront,
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
    marker: "Jahr 12–20",
    title: "Wechselrichter-Ersatz einplanen",
    text:
      "Der Wechselrichter erreicht seine Lebensdauer meist vor den Modulen. Wir rechnen den Ersatz realistisch in die Lebenszyklusrechnung ein, statt ihn wegzulassen und die Amortisation schönzurechnen.",
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
    icon: HandCoins,
    title: "Pronovo EIV",
    text:
      "Die Einmalvergütung des Bundes senkt die Investition um einen relevanten Anteil. Die Höhe hängt von Leistung, Anlagekategorie und den zum Zeitpunkt der Inbetriebnahme gültigen Ansätzen ab – wir berechnen sie tagesaktuell für Ihr Projekt und begleiten den Antrag.",
  },
  {
    icon: Landmark,
    title: "Kantonale & kommunale Programme",
    text:
      "Einzelne Kantone, Gemeinden und Energieversorger fördern zusätzlich – etwa Speicher oder Gesamtsanierungen. Die Programme ändern sich laufend; wir prüfen, was an Ihrem Standort aktuell gilt.",
  },
  {
    icon: Percent,
    title: "Steuerabzüge",
    text:
      "In den meisten Kantonen lassen sich Investitionen in Photovoltaik bei bestehenden Liegenschaften vom steuerbaren Einkommen abziehen. Massgebend ist die Praxis Ihres Kantons – wir liefern die Unterlagen dazu.",
  },
];

const financingPaths = [
  {
    icon: Wallet,
    title: "Eigenfinanzierung",
    lead:
      "Der direkteste Weg: Sie investieren einmal und profitieren ab dem ersten Betriebstag vollständig.",
    points: [
      "Keine Zins- und Finanzierungskosten über die Laufzeit",
      "Steuerabzug wirkt direkt im Investitionsjahr – je nach Kanton",
      "Jede eingesparte Kilowattstunde entlastet ab Tag eins das Budget",
    ],
  },
  {
    icon: Banknote,
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

/* ————————————————————————————————————————————————
   Seite
   ———————————————————————————————————————————————— */

export default function FinanzierungPage() {
  return (
    <>
      {/* Intro */}
      <section className="container-page pt-14 pb-16 sm:pt-20 sm:pb-20">
        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <p className="eyebrow">Finanzierung &amp; Wirtschaftlichkeit</p>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Eine Investition, die arbeitet.
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              Eine Photovoltaikanlage kostet einmal – und produziert danach über
              Jahrzehnte. Wir zeigen transparent, was sie kostet, was sie leistet
              und welche Förderungen realistisch sind. Konservativ gerechnet,
              ohne Verkaufsdruck.
            </p>

            <dl className="mt-10 grid gap-6 border-t border-[color:var(--solar-sand)] pt-8 sm:grid-cols-3">
              {introStats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="stat-mono text-3xl font-semibold text-foreground sm:text-4xl">
                      {s.value}
                    </span>
                    <span className="ml-1.5 text-sm font-medium text-[color:var(--solar-slate)]">
                      {s.unit}
                    </span>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {s.label}
                    </p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/*
            FOTO FEHLT — AI-Bildprompt:
            "Editorial architecture photography, Swiss single-family home with
            sleek all-black in-roof solar panels at golden hour, Mittelland
            hills softly blurred in the background, warm evening light on the
            facade, calm muted colour palette, high-end magazine style,
            portrait 4:5"
            Bis dahin: hochwertige Token-Fläche mit Wertfluss-Grafik.
          */}
          <div className="surface-navy grain-overlay relative overflow-hidden rounded-3xl p-7 sm:p-9">
            <p className="relative text-xs font-medium uppercase tracking-[0.18em] text-white/60">
              So arbeitet Ihre Anlage
            </p>
            <ul className="relative mt-6 grid gap-3">
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
              ].map((row) => (
                <li
                  key={row.k}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[color:var(--solar-leaf)]" />
                    <p className="text-sm leading-relaxed text-white/85">
                      <span className="font-semibold text-white">{row.k}</span>{" "}
                      {row.v}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="relative mt-6 border-t border-white/10 pt-4 text-xs leading-relaxed text-white/55">
              Wirtschaftlichkeit entsteht aus dem Zusammenspiel dieser vier
              Bausteine – nicht aus einer einzelnen Zahl.
            </p>
          </div>
        </div>
      </section>

      {/* Warum sich Photovoltaik lohnt */}
      <section className="container-page py-16 sm:py-24">
        <div className="max-w-2xl">
          <p className="eyebrow">Wirtschaftlichkeit</p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-[44px]">
            Warum sich Photovoltaik lohnt
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            Nicht die grösste Anlage rechnet sich am besten, sondern die, deren
            Strom Sie selbst nutzen. Wer Wärme und Mobilität elektrifiziert,
            verschiebt mehr Verbrauch auf das eigene Dach – und verbessert die
            Rechnung Jahr für Jahr.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:gap-5 lg:grid-cols-3">
          {returnDrivers.map((d) => {
            const Icon = d.icon;
            return (
              <article
                key={d.title}
                className="rounded-3xl border border-border bg-white/70 p-6 transition hover:-translate-y-1 hover:shadow-[0_20px_50px_-24px_rgba(17,19,21,0.18)] lg:p-8"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-[color:var(--solar-ink)]/8 text-[color:var(--solar-ink)] ring-1 ring-[color:var(--solar-ink)]/10">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-foreground">
                  {d.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {d.text}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Investition & Lebenszyklus */}
      <section className="container-page py-16 sm:py-24">
        <div className="surface-sand rounded-3xl p-7 sm:p-10 lg:p-14">
          <div className="max-w-2xl">
            <p className="eyebrow">Investition &amp; Lebenszyklus</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-[44px]">
              Wer nur den Kaufpreis anschaut, rechnet zu kurz.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              Eine Photovoltaikanlage ist ein Bauteil mit 25 bis 30 Jahren
              Lebensdauer. Wirtschaftlichkeit entsteht über diesen gesamten
              Zeitraum – darum gehören Wartung und der Wechselrichter-Ersatz von
              Anfang an in jede seriöse Rechnung.
            </p>
          </div>

          <div className="mt-10">
            {lifecycle.map((item) => (
              <div
                key={item.marker}
                className="grid gap-2 border-t border-[color:var(--solar-ink)]/10 py-6 sm:grid-cols-[150px_1fr] sm:gap-8 lg:py-7"
              >
                <p className="stat-mono text-sm font-semibold text-[color:var(--solar-gold)]">
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

      {/* CTA zum Solarrechner */}
      <section className="container-page pb-16 sm:pb-24">
        <div className="surface-glass rounded-3xl p-8 lg:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_auto]">
            <div>
              <p className="eyebrow">Erste Einschätzung</p>
              <h2 className="mt-3 text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
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
                <Calculator className="size-4" />
                Solarpotenzial berechnen
              </Link>
              <p className="text-center text-xs text-muted-foreground lg:text-right">
                Kostenfrei und unverbindlich.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Förderungen */}
      <section className="container-page pb-16 sm:pb-24">
        <div className="max-w-2xl">
          <p className="eyebrow">Förderungen</p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-[44px]">
            Förderung senkt die Investition – wir prüfen, was wirklich gilt.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            Bund, Kantone und teils Gemeinden unterstützen Photovoltaik. Die
            Programme ändern sich laufend – deshalb beurteilen wir jede
            Förderung tagesaktuell für Ihren Standort statt mit Pauschalwerten
            zu werben.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:gap-5 lg:grid-cols-3">
          {fundingItems.map((f) => {
            const Icon = f.icon;
            return (
              <article
                key={f.title}
                className="rounded-3xl border border-border bg-white/70 p-6 transition hover:-translate-y-1 hover:shadow-[0_20px_50px_-24px_rgba(17,19,21,0.18)] lg:p-8"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-[color:var(--solar-ink)]/8 text-[color:var(--solar-ink)] ring-1 ring-[color:var(--solar-ink)]/10">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-foreground">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.text}
                </p>
              </article>
            );
          })}
        </div>

        <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
          Alle Angaben zu Förderungen und Steuerabzügen sind indikativ.
          Massgebend sind die zum Zeitpunkt von Antrag und Inbetriebnahme
          gültigen Bestimmungen sowie die Praxis Ihres Kantons.
        </p>
      </section>

      {/* Finanzierungswege */}
      <section className="container-page pb-16 sm:pb-24">
        <div className="max-w-2xl">
          <p className="eyebrow">Finanzierungswege</p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-[44px]">
            Zwei Wege zur eigenen Anlage – beide planbar.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            Ob Sie die Anlage aus Eigenmitteln zahlen oder in Raten: Wir zeigen
            beide Wege neutral auf. Welcher passt, entscheidet Ihr Haushalt –
            nicht unser Verkaufsziel.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:gap-5 lg:grid-cols-2">
          {financingPaths.map((path) => {
            const Icon = path.icon;
            return (
              <article
                key={path.title}
                className="flex flex-col rounded-3xl border border-border bg-white/70 p-6 transition hover:-translate-y-1 hover:shadow-[0_20px_50px_-24px_rgba(17,19,21,0.18)] lg:p-8"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-[color:var(--solar-ink)]/8 text-[color:var(--solar-ink)] ring-1 ring-[color:var(--solar-ink)]/10">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-foreground">
                  {path.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {path.lead}
                </p>
                <ul className="mt-5 grid gap-2.5">
                  {path.points.map((p) => (
                    <li
                      key={p}
                      className="flex gap-3 rounded-xl border border-border/70 bg-background/60 p-3.5 text-sm leading-relaxed text-foreground/85"
                    >
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[color:var(--solar-emerald)]" />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
          Wir vermitteln auf Wunsch den Kontakt zu Schweizer
          Finanzierungspartnern, erbringen aber keine Finanz-, Anlage- oder
          Steuerberatung. Die Zusage von Konditionen erfolgt ausschliesslich
          durch den Finanzierungspartner.
        </p>
      </section>

      {/* Ehrliche Hinweise */}
      <section className="container-page pb-8 sm:pb-12">
        <div className="rounded-3xl border border-[color:var(--solar-ink)]/12 bg-secondary p-7 lg:p-10">
          <div className="flex items-start gap-4">
            <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white text-[color:var(--solar-ink)] ring-1 ring-[color:var(--solar-ink)]/10">
              <Info className="size-5" />
            </span>
            <div>
              <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
                Ehrlich gerechnet – was Sie wissen sollten
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Wir empfehlen nur, was technisch und wirtschaftlich Sinn ergibt.
                Dazu gehören diese Grundsätze:
              </p>
            </div>
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {honestyNotes.map((n) => (
              <li
                key={n}
                className="flex gap-3 text-sm leading-relaxed text-foreground/85"
              >
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[color:var(--solar-emerald)]" />
                {n}
              </li>
            ))}
          </ul>
          <div className="mt-7 border-t border-[color:var(--solar-ink)]/10 pt-5">
            <Link href="/kontakt" className="btn-ghost ring-focus min-h-12">
              Fragen zur Wirtschaftlichkeit? Sprechen Sie mit uns.
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        title="Eine Finanzierung, die zu Ihrem Haushalt passt."
        description="Senden Sie uns Ihre Eckdaten – wir bereiten eine transparente Investitionsspanne mit ehrlicher, konservativer Wirtschaftlichkeitsrechnung vor. Antwort innert eines Werktags."
        primaryHref="/angebote"
        primaryLabel="Angebot anfragen"
        secondaryHref="/solarrechner"
        secondaryLabel="Solarpotenzial berechnen"
      />
    </>
  );
}
