import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { siteConfig } from "@/lib/site-config";

export const faqs = [
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

export function FaqSection() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <section id="faq" className="container-page py-24">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[color:var(--solar-emerald)]">
            Häufige Fragen
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            Antworten auf die Fragen, die wirklich zählen.
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            Sie haben eine spezifische Frage? Schreiben Sie uns an{" "}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="font-medium text-foreground underline underline-offset-4"
            >
              {siteConfig.contact.email}
            </a>{" "}
            – wir antworten in der Regel innert 24 Stunden.
          </p>
        </div>

        <Accordion className="rounded-2xl border border-border bg-card/60 px-5 py-2 backdrop-blur-sm">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="py-5 text-base font-medium">
                {f.q}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
