import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionTitle } from "@/components/site/section-head";

const services: {
  id: string;
  title: string;
  description: string;
}[] = [
  {
    id: "standortanalyse",
    title: "Standortanalyse",
    description:
      "Dachfläche, Ausrichtung, Verschattung und Statik vor Ort geprüft.",
  },
  {
    id: "planung",
    title: "Planung & Auslegung",
    description:
      "Anlagenkonzept nach Verbrauchsprofil, Wärmepumpe und Elektromobilität.",
  },
  {
    id: "foerderung",
    title: "Förderung & Administration",
    description:
      "Pronovo-Einmalvergütung, kantonale Programme und Meldewesen: wir führen den Papierweg.",
  },
  {
    id: "installation",
    title: "Installation & Netzanschluss",
    description:
      "Montage, Elektroinstallation und Inbetriebnahme mit Sicherheitsnachweis (SiNa).",
  },
  {
    id: "batterie",
    title: "Speicher & Eigenverbrauch",
    description:
      "Batterie und Lastmanagement nach Ihrem Lastprofil dimensioniert.",
  },
  {
    id: "monitoring",
    title: "Monitoring & Wartung",
    description:
      "Ertragsüberwachung, Sichtprüfung, Reinigung und Wechselrichter-Service.",
  },
];

/**
 * Leistungen: sechs weich erhabene Karten im Dreier-Raster — Goldpunkt,
 * Titel, ein Satz. Jede Karte führt auf den passenden Abschnitt unter
 * /services.
 */
export function ServicesSection() {
  return (
    <section
      id="leistungen"
      aria-labelledby="leistungen-titel"
      className="py-14 sm:py-20"
    >
      <div className="container-page">
        <SectionTitle
          id="leistungen-titel"
          title="Leistungen"
          lead="Eine Anlage, ein Verantwortlicher: von der Standortanalyse bis zum Betrieb."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.id}
              href={`/services#${s.id}`}
              className="neu ring-focus block p-6 transition-transform duration-150 hover:-translate-y-px sm:p-7"
            >
              <span className="gold-dot mb-4" aria-hidden="true" />
              <h3 className="text-[17px] font-semibold leading-snug text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                {s.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <Link href="/services" className="btn-ghost min-h-11">
            Alle Leistungen
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
