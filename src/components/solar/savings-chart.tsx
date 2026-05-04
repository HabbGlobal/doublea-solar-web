"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type SavingsChartProps = {
  annualSavings: number;
  investment: number;
  years?: number;
};

/**
 * Kumulierte Ersparnis vs. Investition über die Anlagenlebensdauer.
 * Die Linien sind Indikationen, keine garantierten Werte.
 */
export function SavingsChart({
  annualSavings,
  investment,
  years = 25,
}: SavingsChartProps) {
  const data = Array.from({ length: years + 1 }, (_, i) => ({
    year: i,
    cumulative: Math.round(annualSavings * i),
    investment: investment,
  }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="savingsFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--solar-emerald)" stopOpacity={0.4} />
              <stop offset="100%" stopColor="var(--solar-emerald)" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(11,31,51,0.08)" strokeDasharray="2 4" />
          <XAxis
            dataKey="year"
            tickFormatter={(v) => `${v}`}
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            axisLine={{ stroke: "rgba(11,31,51,0.12)" }}
            tickLine={false}
            label={{
              value: "Jahre",
              position: "insideBottomRight",
              offset: -2,
              fontSize: 11,
              fill: "var(--muted-foreground)",
            }}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) =>
              `${new Intl.NumberFormat("de-CH", { maximumFractionDigits: 0 }).format(v as number)}`
            }
          />
          <Tooltip
            cursor={{ stroke: "rgba(11,31,51,0.15)" }}
            contentStyle={{
              background: "white",
              border: "1px solid rgba(11,31,51,0.08)",
              borderRadius: 12,
              fontSize: 12,
              boxShadow: "0 12px 30px -16px rgba(11,31,51,0.25)",
            }}
            formatter={(value, name) => [
              `${new Intl.NumberFormat("de-CH").format(Number(value) || 0)} CHF`,
              name === "cumulative" ? "Kumulierte Ersparnis" : "Investition",
            ]}
            labelFormatter={(v) => `Jahr ${v}`}
          />
          <Area
            type="monotone"
            dataKey="cumulative"
            stroke="var(--solar-emerald)"
            strokeWidth={2.4}
            fill="url(#savingsFill)"
          />
          <Area
            type="step"
            dataKey="investment"
            stroke="var(--solar-navy)"
            strokeDasharray="4 4"
            strokeWidth={1.4}
            fill="transparent"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
