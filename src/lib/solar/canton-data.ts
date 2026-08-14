/**
 * Konservative Praxis-Richtwerte kWh/kWp/Jahr bei guter Südausrichtung
 * (typische reale Anlagen). Echte Optimalwerte liegen laut
 * BFE-Sonnendach/PVGIS 10–17 % höher (Region Grenchen ~1'170–1'190,
 * Lugano ~1'330). Spannweite Mittelland ~900–1'100; alpine Lagen/Südtessin
 * bis ~1'330. Werte dienen ausschliesslich als Erstindikation —
 * verbindliche Werte ergeben sich erst aus einer Standortanalyse vor Ort.
 */
export type CantonCode =
  | "AG" | "AI" | "AR" | "BE" | "BL" | "BS" | "FR" | "GE" | "GL"
  | "GR" | "JU" | "LU" | "NE" | "NW" | "OW" | "SG" | "SH" | "SO"
  | "SZ" | "TG" | "TI" | "UR" | "VD" | "VS" | "ZG" | "ZH";

export type CantonInfo = {
  code: CantonCode;
  name: string;
  /** Konservativer spezifischer Ertrag in kWh/kWp/Jahr (typischer Praxiswert, gute Südausrichtung). */
  specificYield: number;
};

export const cantons: ReadonlyArray<CantonInfo> = [
  { code: "AG", name: "Aargau", specificYield: 1010 },
  { code: "AI", name: "Appenzell Innerrhoden", specificYield: 1020 },
  { code: "AR", name: "Appenzell Ausserrhoden", specificYield: 1010 },
  { code: "BE", name: "Bern", specificYield: 1000 },
  { code: "BL", name: "Basel-Landschaft", specificYield: 1010 },
  { code: "BS", name: "Basel-Stadt", specificYield: 1000 },
  { code: "FR", name: "Freiburg", specificYield: 1010 },
  { code: "GE", name: "Genf", specificYield: 1080 },
  { code: "GL", name: "Glarus", specificYield: 1020 },
  { code: "GR", name: "Graubünden", specificYield: 1130 },
  { code: "JU", name: "Jura", specificYield: 980 },
  { code: "LU", name: "Luzern", specificYield: 1000 },
  { code: "NE", name: "Neuenburg", specificYield: 1000 },
  { code: "NW", name: "Nidwalden", specificYield: 1010 },
  { code: "OW", name: "Obwalden", specificYield: 1020 },
  { code: "SG", name: "St. Gallen", specificYield: 1010 },
  { code: "SH", name: "Schaffhausen", specificYield: 1000 },
  { code: "SO", name: "Solothurn", specificYield: 1010 },
  { code: "SZ", name: "Schwyz", specificYield: 1020 },
  { code: "TG", name: "Thurgau", specificYield: 1000 },
  { code: "TI", name: "Tessin", specificYield: 1150 },
  { code: "UR", name: "Uri", specificYield: 1050 },
  { code: "VD", name: "Waadt", specificYield: 1060 },
  { code: "VS", name: "Wallis", specificYield: 1130 },
  { code: "ZG", name: "Zug", specificYield: 1010 },
  { code: "ZH", name: "Zürich", specificYield: 1010 },
] as const;

const cantonMap = new Map(cantons.map((c) => [c.code, c]));

export function getCanton(code: string | undefined | null): CantonInfo | null {
  if (!code) return null;
  return cantonMap.get(code.toUpperCase() as CantonCode) ?? null;
}

export const cantonCodes: ReadonlyArray<CantonCode> = cantons.map((c) => c.code);
