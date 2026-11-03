import type { Locale } from "@/i18n/routing";

/**
 * Englische Fassung der Ergebnis-Hinweise aus calculate.ts.
 * Schlüssel = der EXAKTE deutsche Satz, wie ihn calculateSolar() liefert
 * (result.disclaimers sowie result.recommendation.notes). Die Berechnung
 * bleibt deutsch — nur die Anzeige übersetzt per Lookup.
 */
export const DISCLAIMERS_EN: Record<string, string> = {
  // --- result.disclaimers (Sonnendach-Variante) ---
  "Diese Auswertung basiert auf den BFE-Sonnendach.ch-Daten zu Ihrem Gebäude und ist deutlich präziser als generische Schätzungen.":
    "This assessment is based on the federal sonnendach.ch data (SFOE) for your building and is considerably more precise than generic estimates.",
  "Eine technische Standortbegehung bleibt für die endgültige Auslegung empfohlen — z. B. zur Beurteilung Statik, Verschattung durch Vegetation und elektrischer Anschlusspunkte.":
    "A technical site visit is still recommended for the final system design — e.g. to assess structural capacity, shading from vegetation and electrical connection points.",
  // --- result.disclaimers (beide Varianten) ---
  "Diese Auswertung ist eine fundierte Erstschätzung und ersetzt keine technische Standortanalyse.":
    "This assessment is a well-founded initial estimate and does not replace a technical site analysis.",
  "Mögliche Förderungen (z. B. Pronovo EIV) müssen tagesaktuell geprüft werden und sind nicht garantiert.":
    "Possible subsidies (e.g. the Pronovo one-off subsidy, EIV) must be checked on the day and are not guaranteed.",
  "Investitionsspannen sind Schweizer Marktrichtwerte und keine verbindliche Offerte.":
    "Investment ranges are Swiss market guide prices and not a binding quote.",
  "CO₂-Angabe: Netto-Einsparung auf Basis Schweizer Verbrauchermix (KBOB V9.0, Lebenszyklus) abzüglich Herstellungs-Emissionen der PV-Anlage.":
    "CO₂ figure: net savings based on the Swiss consumer electricity mix (KBOB V9.0, life cycle) minus the manufacturing emissions of the PV system.",
  "Ersparnis basiert auf dem variablen Strompreis; fixe Grund- und Messgebühren des Netzbetreibers bleiben bestehen.":
    "Savings are based on the variable electricity price; the grid operator's fixed basic and metering fees still apply.",
  // --- result.recommendation.notes ---
  "Mit einer Wärmepumpe lohnt sich oft eine grosszügigere Auslegung und ein Speicher zur besseren Eigenverbrauchsdeckung.":
    "With a heat pump, a more generous system size and battery storage often pay off through better self-consumption coverage.",
  "Mit Elektroauto empfehlen wir eine Wallbox mit PV-Überschuss-Steuerung, um den Eigenverbrauch zu maximieren.":
    "With an electric car, we recommend an EV charger with PV surplus control to maximise self-consumption.",
  "Starke Verschattung reduziert den Ertrag deutlich. Eine Vor-Ort-Analyse mit Verschattungssimulation ist empfohlen.":
    "Heavy shading reduces the yield significantly. An on-site analysis with shading simulation is recommended.",
  "Reine Ost-/Westausrichtung liefert einen breiteren Tagesertrag und passt gut zu hohem Eigenverbrauch.":
    "A pure east/west orientation delivers a broader daily yield and suits high self-consumption well.",
};

/** Übersetzt die deutschen Sätze für «en»; unbekannte Sätze bleiben im Original. */
export function localizeDisclaimers(list: string[], locale: Locale): string[] {
  if (locale !== "en") return list;
  return list.map((d) => DISCLAIMERS_EN[d] ?? d);
}
