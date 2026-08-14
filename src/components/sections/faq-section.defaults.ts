/**
 * Default-FAQs — werden vom Frontend genutzt, wenn der Admin-Editor
 * noch keine Inhalte gespeichert hat. Genau dieselbe Liste, die wir
 * vorher hardcoded in faq-section.tsx hatten.
 */
export type FaqItem = { q: string; a: string };

export const faqs: FaqItem[] = [
  {
    q: "Wie lange dauert die Realisierung einer Photovoltaikanlage?",
    a: "Von der Standortanalyse bis zur Inbetriebnahme rechnen wir typischerweise mit 8 bis 16 Wochen. Faktoren sind Bewilligung der Gemeinde, Verfügbarkeit des Verteilnetzbetreibers und Materiallieferzeiten.",
  },
  {
    q: "Brauche ich eine Baubewilligung für meine Solaranlage?",
    a: "Auf Dächern in Bau- und Landwirtschaftszonen sind genügend angepasste Solaranlagen in der Regel bewilligungsfrei und nur meldepflichtig — das gilt ausdrücklich auch für aufgeständerte Anlagen auf Flachdächern (max. 1 m über Dachrand, reflexionsarm). Eine Baubewilligung braucht es namentlich bei Schutzobjekten und in Schutzzonen. Wir klären die Meldefristen mit Ihrer Gemeinde — im Kanton Solothurn 30 Tage vor Baubeginn, im Kanton Bern via eBau.",
  },
  {
    q: "Wie hoch ist die Förderung über Pronovo EIV?",
    a: "Die Einmalvergütung ist in der Energieförderungsverordnung des Bundes festgelegt und richtet sich nach Anlagenkategorie, Leistung und danach, ob Sie den Strom selbst nutzen. Aktuell beträgt sie für typische Aufdach-Anlagen unter 30 kWp CHF 360 pro kWp (integrierte Anlagen CHF 400). Massgebend sind die Ansätze am Tag der Inbetriebnahme — wir prüfen den aktuellen Stand für Ihr Projekt und übernehmen den Antrag.",
  },
  {
    q: "Wann lohnt sich ein Batteriespeicher wirklich?",
    a: "Speicher rechnen sich vor allem bei hohem Eigenverbrauch in den Abendstunden oder bei kombinierter Wärmepumpe und Elektromobilität. Wir simulieren Ihren Eigenverbrauch und empfehlen die Grösse ehrlich – auch wenn die Antwort ‹kein Speicher nötig› lautet.",
  },
  {
    q: "Wie lange hält eine Photovoltaikanlage?",
    a: "Module haben heute Leistungsgarantien von 25 bis 30 Jahren. Wechselrichter müssen typischerweise nach 10 bis 15 Jahren ersetzt werden; hochwertige Geräte erreichen bis 20 Jahre — wir rechnen den Ersatz in jede Lebenszyklusrechnung ein. Wir planen mit langlebigen Komponenten und planbaren Servicekosten.",
  },
  {
    q: "Was passiert mit überschüssigem Strom?",
    a: "Überschüssiger Strom wird ins Netz eingespeist. Seit dem 1. Januar 2026 richtet sich die Vergütung schweizweit nach dem vierteljährlichen Referenz-Marktpreis des Bundes; für Anlagen unter 150 kW gilt eine gesetzliche Minimalvergütung (unter 30 kW: 6 Rp./kWh). Viele Netzbetreiber vergüten zusätzlich den Herkunftsnachweis. Mit Speicher oder Lastmanagement erhöhen Sie den Eigenverbrauch — das lohnt sich meist mehr als einspeisen.",
  },
  {
    q: "Können Sie meine bestehende Anlage übernehmen oder erweitern?",
    a: "Ja. Wir analysieren Bestand, Wechselrichter, Verkabelung und Speicher und zeigen Ihnen die wirtschaftlichste Erweiterungs- oder Servicelösung.",
  },
  {
    q: "Sind Sie schweizweit tätig oder nur in der Region Solothurn?",
    a: "Unser Hauptsitz ist in Grenchen, wir sind aber schweizweit tätig. Anfahrtswege werden transparent in der Offerte ausgewiesen.",
  },
];
