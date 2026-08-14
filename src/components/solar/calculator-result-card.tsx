"use client";

import { ArrowRight } from "lucide-react";

import {
  formatChf,
  formatChfRange,
  formatKwh,
  formatKwp,
  formatPercent,
  formatYearsRange,
} from "@/lib/solar/format";
import type { SolarCalculatorResult } from "@/lib/solar/calculate";
import { SavingsChart } from "./savings-chart";

type Props = {
  result: SolarCalculatorResult;
  onReset: () => void;
};

export function CalculatorResultCard({ result, onReset }: Props) {
  const stats: { label: string; value: string; hint: string }[] = [
    {
      label: "Empfohlene Anlage",
      value: formatKwp(result.recommendedKwp),
      hint: `auf ca. ${result.usableAreaM2} m² Dachfläche`,
    },
    {
      label: "Jahresproduktion",
      value: formatKwh(result.annualProductionKwh.realistic),
      hint: `Spanne ${formatKwh(result.annualProductionKwh.conservative)} – ${formatKwh(result.annualProductionKwh.optimistic)}`,
    },
    {
      label: "Eigenverbrauchsanteil",
      value: formatPercent(result.selfConsumptionShare),
      hint: `Anteil der Solarproduktion, die Sie selbst nutzen — ${formatKwh(result.selfConsumedKwh)}`,
    },
    {
      label: "Jährliche Ersparnis",
      value: formatChf(result.annualSavingsChf.realistic),
      hint: `Spanne ${formatChfRange(result.annualSavingsChf.conservative, result.annualSavingsChf.optimistic)}`,
    },
    {
      label: "Investitionsspanne",
      value: formatChfRange(result.investmentChf.low, result.investmentChf.high),
      hint:
        result.recommendedBatteryKwh > 0
          ? `inkl. Speicher ca. ${result.recommendedBatteryKwh} kWh`
          : "ohne Batteriespeicher",
    },
    {
      label: "CO₂-Einsparung (netto)*",
      value: `${new Intl.NumberFormat("de-CH").format(result.co2SavedKgPerYear)} kg/Jahr`,
      hint: "* Fussnote siehe Hinweise unten",
    },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      <div className="surface-glass p-6 lg:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow">Ihre Erstauswertung</p>
            {result.dataSource === "sonnendach" && (
              <p className="eyebrow mt-1">Bundesdaten · sonnendach.ch</p>
            )}
            <h2 className="mt-3 text-balance text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
              {result.recommendation.sizing}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Amortisation indikativ in{" "}
              <span className="stat-mono text-foreground">
                {formatYearsRange(result.paybackYears.fast, result.paybackYears.slow)}
              </span>
              .
            </p>
          </div>
          <button
            onClick={onReset}
            className="ring-focus shrink-0 text-xs font-medium text-muted-foreground underline decoration-[color:var(--solar-line)] underline-offset-4 transition-colors duration-150 hover:text-foreground"
          >
            Neu starten
          </button>
        </div>

        <ul className="mt-8">
          {stats.map((s, i) => (
            <li
              key={s.label}
              className={`flex items-baseline justify-between gap-4 border-t border-border py-3.5 transition-colors duration-150 hover:bg-secondary ${
                i === stats.length - 1 ? "border-b" : ""
              }`}
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">{s.label}</p>
                <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
                  {s.hint}
                </p>
              </div>
              <p className="stat-mono shrink-0 text-right text-base font-semibold tracking-tight text-foreground sm:text-lg">
                {s.value}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <p className="eyebrow">Kumulierte Ersparnis über 25 Jahre</p>
          <p className="mt-1.5 text-xs text-muted-foreground">
            Lineare Hochrechnung auf Basis der realistischen Jahresersparnis.
            Ohne Strompreis-Anstieg.
          </p>
          <div className="mt-3">
            <SavingsChart
              annualSavings={result.annualSavingsChf.realistic}
              investment={(result.investmentChf.low + result.investmentChf.high) / 2}
            />
          </div>
        </div>

        {result.recommendation.notes.length > 0 && (
          <div className="mt-6 border border-border bg-secondary p-4 lg:p-5">
            <p className="eyebrow">Hinweise zu Ihrer Konstellation</p>
            <ul className="mt-2.5 space-y-1.5 text-sm text-foreground/80">
              {result.recommendation.notes.map((n) => (
                <li key={n} className="flex gap-2">
                  <span
                    aria-hidden
                    className="mt-2 size-1.5 shrink-0 bg-[color:var(--solar-ink)]"
                  />
                  {n}
                </li>
              ))}
            </ul>
          </div>
        )}

        <ul className="mt-6 space-y-1.5 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
          {result.disclaimers.map((d) => (
            <li key={d}>{d.startsWith("CO₂-Angabe") ? `* ${d}` : `· ${d}`}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <div className="surface-glass p-6">
          <p className="eyebrow">Empfehlung Batterie</p>
          <p className="mt-3 text-base font-semibold text-foreground">
            {result.recommendation.battery === "empfohlen"
              ? "Speicher empfohlen"
              : result.recommendation.battery === "nicht-empfohlen"
                ? "Speicher aktuell nicht prioritär"
                : "Speicher optional"}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {result.recommendedBatteryKwh > 0 ? (
              <>
                Indikative Grösse:{" "}
                <span className="stat-mono text-foreground/80">
                  {result.recommendedBatteryKwh} kWh
                </span>
              </>
            ) : (
              "Wir prüfen den Mehrwert in der persönlichen Analyse."
            )}
          </p>
        </div>

        <div className="border border-border bg-secondary p-6">
          <p className="eyebrow">Anfrage erhalten</p>
          <p className="mt-3 text-base font-semibold text-foreground">
            Wir haben Ihre Anfrage erhalten.
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            Diese Auswertung ging soeben auch an unser Team. Wir prüfen Ihre
            Angaben, klären Förderoptionen und melden uns persönlich für die
            nächsten Schritte.
          </p>
          <a href="/services" className="btn-ghost mt-4">
            Wie wir vorgehen <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
