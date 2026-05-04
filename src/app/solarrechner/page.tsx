import type { Metadata } from "next";

import { SolarCalculator } from "@/components/solar/solar-calculator";
import { CtaBand } from "@/components/site/cta-band";

export const metadata: Metadata = {
  title: "Solarrechner – Schweizer Photovoltaik in 60 Sekunden",
  description:
    "Schätzen Sie Anlagengrösse, Produktion, Eigenverbrauch und Investition für Ihre Photovoltaikanlage. Schweizweit, kantonsspezifisch und unverbindlich.",
};

export default function SolarrechnerPage() {
  return (
    <>
      <section className="container-page pt-12 pb-6 lg:pt-20">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[color:var(--solar-emerald)]">
            Solarrechner
          </p>
          <h1 className="mt-3 text-balance text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            Wie viel Solarpotenzial steckt in Ihrem Dach?
          </h1>
          <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">
            Beantworten Sie wenige Fragen zu Ihrem Gebäude, Dach und Verbrauch –
            unser Rechner liefert eine fundierte Erstauswertung mit
            Investitionsspanne, Eigenverbrauch und Amortisation.
          </p>
        </div>
      </section>

      <section className="container-page pb-20">
        <SolarCalculator />
      </section>

      <CtaBand
        eyebrow="Nächster Schritt"
        title="Aus Ihrer Auswertung wird ein konkretes Angebot."
        description="Senden Sie uns Ihre Eckdaten – wir prüfen Förderoptionen, Lastprofil und Wirtschaftlichkeit und melden uns innert eines Werktags."
        primaryHref="/angebote"
        primaryLabel="Angebot anfragen"
        secondaryHref="/services"
        secondaryLabel="Wie wir vorgehen"
      />
    </>
  );
}
