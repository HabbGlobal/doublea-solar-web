/**
 * Default-FAQs — werden vom Frontend genutzt, wenn der Admin-Editor
 * noch keine Inhalte gespeichert hat. Bewusst kurz gehalten: fünf Fragen,
 * knappe Antworten.
 */
export type FaqItem = { q: string; a: string };

export const faqs: FaqItem[] = [
  {
    q: "Wie lange dauert die Realisierung einer Photovoltaikanlage?",
    a: "Von der Standortanalyse bis zur Inbetriebnahme rechnen wir typischerweise mit 8 bis 16 Wochen — je nach Bewilligung, Verteilnetzbetreiber und Materiallieferzeiten.",
  },
  {
    q: "Brauche ich eine Baubewilligung für meine Solaranlage?",
    a: "Auf Dächern in Bau- und Landwirtschaftszonen sind genügend angepasste Solaranlagen in der Regel bewilligungsfrei und nur meldepflichtig — auch aufgeständert auf Flachdächern (max. 1 m über Dachrand, reflexionsarm). Eine Baubewilligung braucht es namentlich bei Schutzobjekten und in Schutzzonen. Die Meldefristen klären wir mit Ihrer Gemeinde.",
  },
  {
    q: "Wie hoch ist die Förderung über Pronovo EIV?",
    a: "Die Einmalvergütung ist in der Energieförderungsverordnung des Bundes geregelt und richtet sich nach Anlagenkategorie und Leistung: für Aufdach-Anlagen unter 30 kWp aktuell CHF 360 pro kWp, für integrierte CHF 400. Massgebend sind die Ansätze am Tag der Inbetriebnahme — wir prüfen sie und übernehmen den Antrag.",
  },
  {
    q: "Wie lange hält eine Photovoltaikanlage?",
    a: "Module haben heute Leistungsgarantien von 25 bis 30 Jahren. Wechselrichter werden typischerweise nach 10 bis 15 Jahren ersetzt, hochwertige Geräte erreichen bis 20 Jahre — wir rechnen diesen Ersatz in jede Lebenszyklusrechnung ein.",
  },
  {
    q: "Was passiert mit überschüssigem Strom?",
    a: "Überschüssiger Strom wird ins Netz eingespeist. Seit dem 1. Januar 2026 richtet sich die Vergütung schweizweit nach dem vierteljährlichen Referenz-Marktpreis des Bundes; für Anlagen unter 30 kW gilt eine gesetzliche Minimalvergütung von 6 Rp./kWh. Mehr Eigenverbrauch lohnt sich meist mehr als einspeisen.",
  },
];
