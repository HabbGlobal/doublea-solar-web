"use client";

import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import {
  formatChf,
  formatChfRange,
  formatKwh,
  formatKwp,
  formatNumber,
  formatPercent,
} from "@/lib/solar/format";
import type { SolarCalculatorResult } from "@/lib/solar/calculate";
import { localizeDisclaimers } from "@/lib/solar/disclaimers-en";
import { SavingsChart } from "./savings-chart";

type Props = {
  result: SolarCalculatorResult;
  onReset: () => void;
};

export function CalculatorResultCard({ result, onReset }: Props) {
  const t = useTranslations("calculator.result");
  const locale = useLocale() as Locale;

  const paybackText =
    Math.abs(result.paybackYears.slow - result.paybackYears.fast) < 0.6
      ? t("years", {
          value: formatNumber((result.paybackYears.fast + result.paybackYears.slow) / 2, 1),
        })
      : t("yearsRange", {
          low: formatNumber(result.paybackYears.fast, 1),
          high: formatNumber(result.paybackYears.slow, 1),
        });

  const notes = localizeDisclaimers(result.recommendation.notes, locale);
  const disclaimers = localizeDisclaimers(result.disclaimers, locale);

  const stats: { label: string; value: string; hint: string }[] = [
    {
      label: t("stats.system"),
      value: formatKwp(result.recommendedKwp),
      hint: t("stats.systemHint", { area: String(result.usableAreaM2) }),
    },
    {
      label: t("stats.production"),
      value: formatKwh(result.annualProductionKwh.realistic),
      hint: t("stats.productionHint", {
        low: formatKwh(result.annualProductionKwh.conservative),
        high: formatKwh(result.annualProductionKwh.optimistic),
      }),
    },
    {
      label: t("stats.selfConsumption"),
      value: formatPercent(result.selfConsumptionShare),
      hint: t("stats.selfConsumptionHint", { kwh: formatKwh(result.selfConsumedKwh) }),
    },
    {
      label: t("stats.savings"),
      value: formatChf(result.annualSavingsChf.realistic),
      hint: t("stats.savingsHint", {
        range: formatChfRange(
          result.annualSavingsChf.conservative,
          result.annualSavingsChf.optimistic,
        ),
      }),
    },
    {
      label: t("stats.investment"),
      value: formatChfRange(result.investmentChf.low, result.investmentChf.high),
      hint:
        result.recommendedBatteryKwh > 0
          ? t("stats.investmentWithBattery", { kwh: String(result.recommendedBatteryKwh) })
          : t("stats.investmentNoBattery"),
    },
    {
      label: t("stats.co2"),
      value: t("stats.co2Value", {
        value: new Intl.NumberFormat("de-CH").format(result.co2SavedKgPerYear),
      }),
      hint: t("stats.co2Hint"),
    },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      <div className="neu p-6 sm:p-7 lg:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="eyebrow">{t("eyebrow")}</p>
              {result.dataSource === "sonnendach" && (
                <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#6E5510]">
                  {t("badge")}
                </span>
              )}
            </div>
            <h2 className="mt-3 text-balance text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
              {t("sizing", {
                kwp: String(result.recommendedKwp),
                area: String(result.usableAreaM2),
              })}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("paybackPrefix")}{" "}
              <span className="stat-mono text-foreground">{paybackText}</span>.
            </p>
          </div>
          <button
            type="button"
            onClick={onReset}
            className="btn-ghost min-h-11 shrink-0 text-sm"
          >
            {t("restart")}
          </button>
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {stats.map((s) => (
            <li key={s.label} className="neu-in rounded-2xl p-5">
              <p className="eyebrow">{s.label}</p>
              <p className="stat-mono mt-2 text-2xl leading-tight tracking-tight text-foreground sm:text-[1.7rem]">
                {s.value}
              </p>
              <p className="mt-1.5 text-xs leading-snug text-muted-foreground">
                {s.hint}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <p className="eyebrow">{t("cumulative")}</p>
          <p className="mt-1.5 text-xs text-muted-foreground">{t("cumulativeText")}</p>
          <div className="neu-in mt-4 rounded-2xl p-4 sm:p-5">
            <SavingsChart
              annualSavings={result.annualSavingsChf.realistic}
              investment={(result.investmentChf.low + result.investmentChf.high) / 2}
            />
          </div>
        </div>

        {notes.length > 0 && (
          <div className="neu-in mt-6 rounded-2xl p-5">
            <p className="eyebrow">{t("notes")}</p>
            <ul className="mt-2.5 space-y-1.5 text-sm text-foreground">
              {notes.map((n) => (
                <li key={n} className="flex gap-2.5">
                  <span
                    aria-hidden
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-[color:var(--solar-gold)]"
                  />
                  {n}
                </li>
              ))}
            </ul>
          </div>
        )}

        <ul className="mt-6 space-y-1.5 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
          {disclaimers.map((d) => (
            <li key={d}>
              {d.startsWith("CO₂-Angabe") || d.startsWith("CO₂ figure") ? `* ${d}` : `· ${d}`}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-6">
        <div className="neu p-6 sm:p-7">
          <p className="eyebrow">{t("batteryEyebrow")}</p>
          <p className="mt-3 text-base font-semibold text-foreground">
            {result.recommendation.battery === "empfohlen"
              ? t("batteryRecommended")
              : result.recommendation.battery === "nicht-empfohlen"
                ? t("batteryNotPriority")
                : t("batteryOptional")}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {result.recommendedBatteryKwh > 0 ? (
              <>
                {t("batterySize")}{" "}
                <span className="stat-mono text-foreground">
                  {result.recommendedBatteryKwh} kWh
                </span>
              </>
            ) : (
              t("batteryCheck")
            )}
          </p>
        </div>

        <div className="neu-in rounded-2xl p-6 sm:p-7">
          <p className="eyebrow">{t("receivedEyebrow")}</p>
          <p className="mt-3 text-base font-semibold text-foreground">{t("receivedTitle")}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {t("receivedText")}
          </p>
          <Link href="/services" className="btn-ghost mt-4 min-h-11">
            {t("howWeWork")} <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
