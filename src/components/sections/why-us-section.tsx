import { SectionHead, SectionTitle } from "@/components/site/section-head";

const reasons = [
  {
    nr: "01",
    title: "Schweizer Präzision",
    description:
      "Geplant nach Schweizer Normen, montiert mit dokumentierten Abläufen – vom ersten Aufmass bis zum Sicherheitsnachweis.",
  },
  {
    nr: "02",
    title: "Persönliche Verantwortung",
    description:
      "Eine feste Ansprechperson begleitet Ihr Projekt von der Begehung bis zur Inbetriebnahme – und bleibt danach erreichbar.",
  },
  {
    nr: "03",
    title: "Keine Pauschalangebote",
    description:
      "Jedes Dach ist anders. Wir legen jede Anlage einzeln aus – nach Ausrichtung, Verschattung und Verbrauchsprofil.",
  },
  {
    nr: "04",
    title: "Klare, transparente Offerten",
    description:
      "Alle Positionen ausgewiesen, eine ehrliche Investitionsspanne statt Lockpreis. Sie vergleichen auf sauberer Grundlage.",
  },
  {
    nr: "05",
    title: "Langfristiger Service",
    description:
      "Monitoring, Wartung und planbare Servicekosten über die Inbetriebnahme hinaus – eine Anlage ist ein Projekt über Jahrzehnte.",
  },
  {
    nr: "06",
    title: "Technisch saubere Auslegung",
    description:
      "Komponenten und Dimensionierung folgen dem Bedarf. Wir empfehlen nur, was technisch und wirtschaftlich Sinn ergibt.",
  },
];

export function WhyUsSection() {
  return (
    <section id="warum-doublea" aria-labelledby="warum-doublea-titel">
      <SectionHead nr="08" label="Grundsätze" />
      <div className="container-page py-14 sm:py-20">
        <SectionTitle
          id="warum-doublea-titel"
          title="Woran Sie uns messen können."
        />

        <div className="mt-10 grid gap-x-10 sm:grid-cols-2">
          {reasons.map((r) => (
            <article key={r.nr} className="border-t border-border py-5">
              <div className="flex items-baseline gap-3">
                <span className="eyebrow">{r.nr}</span>
                <h3 className="text-base font-medium text-foreground">
                  {r.title}
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {r.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
