import type { Metadata } from "next";

import { SolarCalculator } from "@/components/solar/solar-calculator";
import { CtaBand } from "@/components/site/cta-band";

export const metadata: Metadata = {
  title: "Solarrechner – Photovoltaik-Potenzial Ihres Dachs in 60 Sek.",
  description:
    "Kostenloser Solarrechner: Anlagengrösse, Produktion, Eigenverbrauch, Kosten und Amortisation Ihrer Photovoltaikanlage – mit echten Schweizer Dachdaten, kantonsspezifisch und unverbindlich.",
};

export default function SolarrechnerPage() {
  return (
    <>
      <section className="container-page pt-12 pb-6 lg:pt-20">
        <div className="max-w-3xl">
          <p className="eyebrow">Solarrechner</p>
          <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Wie viel Solarpotenzial steckt in Ihrem Dach?
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            Beantworten Sie wenige Fragen zu Gebäude, Dach und Verbrauch –
            unser Rechner liefert eine fundierte Erstauswertung mit
            Investitionsspanne, Eigenverbrauch und Amortisation.
          </p>
          <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[color:var(--solar-leaf)]" aria-hidden />
              Kostenfrei und unverbindlich
            </li>
            <li className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[color:var(--solar-leaf)]" aria-hidden />
              Offizielle Dachdaten des Bundes (Sonnendach.ch)
            </li>
            <li className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[color:var(--solar-leaf)]" aria-hidden />
              Antwort innert eines Werktags
            </li>
          </ul>
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
