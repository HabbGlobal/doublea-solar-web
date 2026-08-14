import Link from "next/link";
import { SectionHead, SectionTitle } from "@/components/site/section-head";

const facts: { label: string; value: string }[] = [
  { label: "Datenbasis", value: "Bundesmodell sonnendach.ch" },
  {
    label: "Ergebnis",
    value: "Anlagengrösse, Investitions- und Ertragsspanne",
  },
  { label: "Dauer", value: "Rund drei Minuten" },
];

const sampleRows: { label: string; value: string }[] = [
  { label: "Jahresertrag (typ.)", value: "7'500–8'500 kWh" },
  { label: "Investition", value: "CHF 15'500–18'500" },
  { label: "Einmalvergütung (EIV)", value: "≈ CHF 2'952" },
];

export function SolarCalculatorSection() {
  return (
    <section id="rechner" aria-labelledby="rechner-titel">
      <SectionHead nr="04" label="Solarrechner" />
      <div className="container-page py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionTitle
              id="rechner-titel"
              title="Ihr Dach, berechnet auf Bundesdaten."
              lead="Der Solarrechner wertet die sonnendach.ch-Daten Ihres Gebäudes aus und liefert eine erste Auslegung mit Investitions- und Ertragsspanne — als Bandbreite, nicht als Versprechen."
            />

            <div className="mt-8">
              {facts.map((f) => (
                <div
                  key={f.label}
                  className="grid items-baseline gap-x-6 gap-y-1 border-t border-border py-3.5 sm:grid-cols-[140px_1fr]"
                >
                  <span className="eyebrow">{f.label}</span>
                  <span className="text-sm leading-relaxed text-foreground">
                    {f.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link href="/solarrechner" className="btn-primary">
                Solarpotenzial berechnen
              </Link>
            </div>
          </div>

          <div className="surface-glass self-start p-6 sm:p-8">
            <p className="eyebrow">Beispielauswertung — 8.2 kWp</p>
            <div className="mt-5">
              {sampleRows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-x-6 border-t border-border py-3.5"
                >
                  <span className="text-sm text-muted-foreground">
                    {row.label}
                  </span>
                  <span className="stat-mono text-sm font-medium text-foreground">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
            <p className="eyebrow border-t border-border pt-4">
              Richtwerte vor Standortanalyse
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
