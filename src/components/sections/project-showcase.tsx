import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHead, SectionTitle } from "@/components/site/section-head";

type Dossier = {
  title: string;
  rows: ReadonlyArray<readonly [string, string]>;
};

const dossiers: readonly Dossier[] = [
  {
    title: "Einfamilienhaus",
    rows: [
      ["Leistung", "8–12 kWp"],
      ["Speicher", "5–16 kWh"],
      ["Montage", "2–3 Tage"],
    ],
  },
  {
    title: "Mehrfamilienhaus / ZEV",
    rows: [
      ["Leistung", "15–60 kWp"],
      ["Abrechnung", "Mieterstrom"],
      ["Messkonzept", "ab Tag 1"],
    ],
  },
  {
    title: "Gewerbe & Landwirtschaft",
    rows: [
      ["Leistung", "30–150 kWp"],
      ["Analyse", "Lastgang"],
      ["Prüfung", "Statik & Brandschutz"],
    ],
  },
];

export function ProjectShowcase() {
  return (
    <section id="projekte" aria-labelledby="projekte-titel">
      <SectionHead nr="06" label="Anlagentypen" />
      <div className="container-page py-14 sm:py-20">
        <SectionTitle
          id="projekte-titel"
          title="Vom Familiendach bis zur Werkhalle."
          lead="Drei Gebäudekategorien prägen unsere Arbeit — jede Anlage wird individuell nach Dach, Verschattung und Verbrauchsprofil ausgelegt."
        />

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {dossiers.map((d) => (
            <article key={d.title}>
              <div
                className="relative flex aspect-[4/3] items-center justify-center border border-border bg-card"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, var(--solar-line) 0 1px, transparent 1px 9px)",
                }}
              >
                <span className="eyebrow bg-card px-3 py-1.5">
                  Projektfotografie in Vorbereitung
                </span>
              </div>
              <h3 className="mt-5 text-lg font-medium text-foreground">
                {d.title}
              </h3>
              <dl className="mt-3">
                {d.rows.map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-baseline justify-between gap-4 border-t border-border py-2.5 last:border-b"
                  >
                    <dt className="eyebrow">{label}</dt>
                    <dd className="stat-mono text-sm text-foreground">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Wir publizieren keine Kundenprojekte ohne ausdrückliche Freigabe.
          Referenzobjekte mit realen Eckdaten zeigen wir im persönlichen
          Gespräch — Eckwerte oben sind typische Spannweiten, indikativ.
        </p>

        <Link href="/projekte" className="btn-ghost mt-4 min-h-12">
          Alle Anlagentypen
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
