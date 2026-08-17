import { SectionHead, SectionTitle } from "@/components/site/section-head";

const steps = [
  {
    nr: "1",
    title: "Analyse",
    description: "Bedarfsklärung, Dach- und Verbrauchsprüfung vor Ort.",
  },
  {
    nr: "2",
    title: "Offerte & Förderung",
    description: "Auslegung mit Investitionsspanne; Förderantrag durch uns.",
  },
  {
    nr: "3",
    title: "Installation",
    description:
      "Montage durch geprüfte Schweizer Partnerbetriebe, von uns koordiniert.",
  },
  {
    nr: "4",
    title: "Anschluss & Abnahme",
    description: "Netzanschluss, Sicherheitsnachweis und behördliche Abnahme.",
  },
  {
    nr: "5",
    title: "Betrieb",
    description: "Monitoring, Wartungsfenster, Reaktion bei Auffälligkeiten.",
  },
];

export function ProcessSection() {
  return (
    <section id="prozess" aria-labelledby="prozess-titel" className="surface-navy">
      <SectionHead nr="04" label="Ablauf" />
      <div className="container-page py-14 sm:py-20">
        <SectionTitle
          id="prozess-titel"
          title="Fünf Schritte, ein Verantwortlicher."
          onDark
        />

        {/* Massstab-Leiste: mobile eine linke Vertikallinie, ab sm eine
            horizontale Linie mit fünf Tick-Marken (border-l je Spalte). */}
        <ol className="mt-10 border-l border-[color:#3a3d3b] sm:mt-14 sm:grid sm:grid-cols-5 sm:gap-x-8 sm:border-l-0 sm:border-t sm:border-[color:#3a3d3b]">
          {steps.map((s) => (
            <li
              key={s.nr}
              className="pb-10 pl-6 last:pb-0 sm:border-l sm:border-[color:#3a3d3b] sm:pb-0 sm:pl-4 sm:pt-4"
            >
              <span className="eyebrow">{s.nr}</span>
              <h3 className="mt-3 text-[15px] font-medium text-[color:#f2f2ee]">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[color:#a9aba3]">
                {s.description}
              </p>
            </li>
          ))}
        </ol>

        <p className="stat-mono mt-10 border-t border-[color:#3a3d3b] pt-4 text-xs text-[color:#a9aba3]">
          Analyse bis Inbetriebnahme: typischerweise 8 bis 16 Wochen.
        </p>
      </div>
    </section>
  );
}
