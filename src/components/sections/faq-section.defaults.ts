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
    a: "Aufdach-Anlagen auf Wohngebäuden sind in der Schweiz meist nur meldepflichtig. Bei Schutzobjekten, Flachdächern mit Aufständerung oder grösseren Gewerbeflächen kann eine Bewilligung nötig sein. Wir klären das vorab mit Ihrer Gemeinde.",
  },
  {
    q: "Wie hoch ist die Förderung über Pronovo EIV?",
    a: "Die Einmalvergütung wird tagesaktuell festgelegt und hängt von Anlagengrösse und Eigenverbrauchsoptimierung ab. Wir zeigen Ihnen den aktuellen Stand und übernehmen den Antrag für Sie.",
  },
  {
    q: "Wann lohnt sich ein Batteriespeicher wirklich?",
    a: "Speicher rechnen sich vor allem bei hohem Eigenverbrauch in den Abendstunden oder bei kombinierter Wärmepumpe und Elektromobilität. Wir simulieren Ihren Eigenverbrauch und empfehlen die Grösse ehrlich – auch wenn die Antwort ‹kein Speicher nötig› lautet.",
  },
  {
    q: "Wie lange hält eine Photovoltaikanlage?",
    a: "Module haben heute Leistungsgarantien von 25 bis 30 Jahren. Wechselrichter halten in der Regel 12 bis 20 Jahre. Wir planen mit langlebigen Komponenten und planbaren Servicekosten.",
  },
  {
    q: "Was passiert mit überschüssigem Strom?",
    a: "Strom, den Sie nicht direkt verbrauchen, wird ins Netz Ihres Verteilnetzbetreibers eingespeist und nach dessen Tarif vergütet. Mit Speicher oder Lastmanagement lässt sich der Eigenverbrauchsanteil deutlich erhöhen.",
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
