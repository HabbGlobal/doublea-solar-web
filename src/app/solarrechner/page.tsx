import type { Metadata } from "next";

import { SolarCalculator } from "@/components/solar/solar-calculator";
import { CtaBand } from "@/components/site/cta-band";

export const metadata: Metadata = {
  title: "Solarrechner – Photovoltaik-Potenzial Ihres Dachs in 60 Sek.",
  description:
    "Kostenloser Solarrechner: Anlagengrösse, Produktion, Eigenverbrauch, Kosten und Amortisation Ihrer Photovoltaikanlage – mit echten Schweizer Dachdaten, kantonsspezifisch und unverbindlich.",
  alternates: { canonical: "/solarrechner" },
};

export default function SolarrechnerPage() {
  return (
    <>
      <section aria-labelledby="solarrechner-h" className="pt-14 sm:pt-20 lg:pt-24">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="eyebrow">Solarrechner</p>
            <h1
              id="solarrechner-h"
              className="mt-4 text-balance text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.6rem]"
            >
              Wie viel Solarpotenzial steckt in Ihrem Dach?
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              Beantworten Sie wenige Fragen zu Gebäude, Dach und Verbrauch –
              der Rechner liefert eine fundierte Erstauswertung.
            </p>
          </div>
        </div>
      </section>

      <section aria-label="Solarrechner" className="container-page pt-10 pb-14 sm:pb-20">
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
