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
          <CartesianGrid stroke="var(--border)" strokeDasharray="2 4" />
          <XAxis
            dataKey="year"
            tickFormatter={(v) => `${v}`}
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            axisLine={{ stroke: "var(--border)" }}
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
            cursor={{ stroke: "var(--chart-5)", strokeDasharray: "2 4" }}
            contentStyle={{
              background: "var(--background)",
              border: "none",
              borderRadius: 16,
              boxShadow: "var(--neu-raise-sm)",
              padding: "10px 14px",
              fontSize: 12,
              fontFamily: "var(--font-sans)",
              fontVariantNumeric: "tabular-nums",
            }}
            itemStyle={{ color: "var(--foreground)", fontWeight: 600 }}
            labelStyle={{ color: "var(--muted-foreground)", fontWeight: 500 }}
            formatter={(value, name) => [
              `CHF ${new Intl.NumberFormat("de-CH").format(Number(value) || 0)}`,
              name === "cumulative" ? "Kumulierte Ersparnis" : "Investition",
            ]}
            labelFormatter={(v) => `Jahr ${v}`}
          />
          <Area
            type="monotone"
            dataKey="cumulative"
            stroke="var(--chart-2)"
            strokeWidth={2.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="var(--chart-2)"
            fillOpacity={0.16}
            activeDot={{ r: 5, stroke: "var(--background)", strokeWidth: 2, fill: "var(--chart-4)" }}
          />
          <Area
            type="step"
            dataKey="investment"
            stroke="var(--chart-1)"
            strokeDasharray="4 4"
            strokeWidth={1.4}
            strokeLinecap="round"
            fill="transparent"
            activeDot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
