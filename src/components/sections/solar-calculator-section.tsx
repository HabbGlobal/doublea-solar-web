import Link from "next/link";
import { SectionTitle } from "@/components/site/section-head";

const sampleRows: { label: string; value: string }[] = [
  { label: "Jahresertrag (typ.)", value: "7'500–8'500 kWh" },
  { label: "Investition", value: "CHF 15'500–18'500" },
  { label: "Einmalvergütung (EIV)", value: "≈ CHF 2'952" },
];

/**
 * Solarrechner-Teaser: links Titel, ein Satz und die goldene Aktion;
 * rechts eine eingelassene Anzeige mit einer Beispielauswertung.
 */
export function SolarCalculatorSection() {
  return (
    <section
      id="rechner"
      aria-labelledby="rechner-titel"
      className="py-14 sm:py-20"
    >
      <div className="container-page">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <SectionTitle
              id="rechner-titel"
              title="Ihr Dach, berechnet auf Bundesdaten."
              lead="Der Rechner wertet die sonnendach.ch-Daten Ihres Gebäudes aus und liefert eine erste Auslegung. Dauer: rund drei Minuten."
            />

            <div className="mt-8">
              <Link href="/solarrechner" className="btn-primary w-full sm:w-auto">
                Solarpotenzial berechnen
              </Link>
            </div>
          </div>

          <div className="neu-in p-6 sm:p-7">
            <p className="eyebrow">Beispiel · 8.2 kWp</p>
            <dl className="mt-3">
              {sampleRows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-x-6 border-t border-border py-3.5 first:border-t-0"
                >
                  <dt className="text-[15px] text-muted-foreground">
                    {row.label}
                  </dt>
                  <dd className="stat-mono text-[15px] text-foreground">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-sm text-muted-foreground">
              Richtwerte vor Standortanalyse
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
