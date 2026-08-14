import type { Metadata } from "next";

import { SolarCalculator } from "@/components/solar/solar-calculator";
import { CtaBand } from "@/components/site/cta-band";
import { SectionHead } from "@/components/site/section-head";

export const metadata: Metadata = {
  title: "Solarrechner – Photovoltaik-Potenzial Ihres Dachs in 60 Sek.",
  description:
    "Kostenloser Solarrechner: Anlagengrösse, Produktion, Eigenverbrauch, Kosten und Amortisation Ihrer Photovoltaikanlage – mit echten Schweizer Dachdaten, kantonsspezifisch und unverbindlich.",
  alternates: { canonical: "/solarrechner" },
};

/** Sachliche Eckdaten zum Rechner — analog Startseiten-Teaser. */
const calculatorFacts = [
  { label: "Datenbasis", value: "Bundesdaten sonnendach.ch" },
  { label: "Ergebnis", value: "Anlagengrösse, Kosten, Amortisation" },
  { label: "Dauer", value: "Rund 60 Sekunden" },
];

export default function SolarrechnerPage() {
  return (
    <>
      <section>
        <SectionHead nr="01" label="Solarrechner" />
        <div className="container-page pt-10 pb-6 sm:pt-14">
          <div className="max-w-3xl">
            <p className="eyebrow">Solarrechner</p>
            <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Wie viel Solarpotenzial steckt in Ihrem Dach?
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              Beantworten Sie wenige Fragen zu Gebäude, Dach und Verbrauch –
              der Rechner liefert eine fundierte Erstauswertung.
            </p>

            <dl className="mt-8">
              {calculatorFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-baseline justify-between gap-6 border-t border-border py-3 last:border-b"
                >
                  <dt className="eyebrow">{fact.label}</dt>
                  <dd className="stat-mono text-right text-[13px] text-foreground/85 sm:text-sm">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="container-page pb-20 pt-8">
        <SolarCalculator />
      </section>

      <CtaBand
        eyebrow="Nächster Schritt"
        title="Aus Ihrer Auswertung wird ein konkretes Angebot."
        description="Senden Sie uns Ihre Eckdaten – wir prüfen Förderoptionen, Lastprofil und Wirtschaftlichkeit."
        primaryHref="/angebote"
        primaryLabel="Angebot anfragen"
        secondaryHref="/services"
        secondaryLabel="Wie wir vorgehen"
      />
    </>
  );
}
