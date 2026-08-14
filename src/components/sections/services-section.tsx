import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHead, SectionTitle } from "@/components/site/section-head";

const services: {
  id: string;
  nr: string;
  title: string;
  description: string;
}[] = [
  {
    id: "standortanalyse",
    nr: "01",
    title: "Standortanalyse",
    description:
      "Dachfläche, Ausrichtung, Verschattung und Statik vor Ort geprüft; Auswertung der sonnendach.ch-Daten Ihres Gebäudes.",
  },
  {
    id: "planung",
    nr: "02",
    title: "Planung & Auslegung",
    description:
      "Anlagenkonzept nach Verbrauchsprofil, Wärmepumpe und Elektromobilität; Ertragsprognose als Bandbreite, nicht als Versprechen.",
  },
  {
    id: "foerderung",
    nr: "03",
    title: "Förderung & Administration",
    description:
      "Pronovo-Einmalvergütung, kantonale Programme, Meldewesen und Anschlussgesuch beim Netzbetreiber: wir führen den Papierweg.",
  },
  {
    id: "installation",
    nr: "04",
    title: "Installation & Netzanschluss",
    description:
      "Montage, Elektroinstallation, Inbetriebnahme mit Sicherheitsnachweis (SiNa) und dokumentierter Abnahme.",
  },
  {
    id: "batterie",
    nr: "05",
    title: "Speicher & Eigenverbrauch",
    description:
      "Batterie und Lastmanagement nach Lastprofil dimensioniert; auch die Antwort ‹kein Speicher nötig› gehört dazu.",
  },
  {
    id: "monitoring",
    nr: "06",
    title: "Monitoring & Wartung",
    description:
      "Ertragsüberwachung, Sichtprüfung, Reinigung und Wechselrichter-Service über die gesamte Laufzeit.",
  },
];

export function ServicesSection() {
  return (
    <section id="leistungen" aria-labelledby="leistungen-titel">
      <SectionHead nr="03" label="Leistungen" />
      <div className="container-page py-14 sm:py-20">
        <SectionTitle
          id="leistungen-titel"
          title="Leistungen"
          lead="Eine Anlage, ein Verantwortlicher: von der Standortanalyse bis zum Betrieb."
        />

        <div className="mt-10">
          {services.map((s, i) => (
            <Link
              key={s.id}
              href={`/services#${s.id}`}
              className={`ring-focus grid items-baseline gap-x-6 gap-y-1 border-t border-border py-5 transition-colors duration-150 hover:bg-card sm:grid-cols-[64px_240px_1fr] ${
                i === services.length - 1 ? "border-b" : ""
              }`}
            >
              <span className="eyebrow">{s.nr}</span>
              <h3 className="text-base font-medium text-foreground">
                {s.title}
              </h3>
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {s.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <Link href="/services" className="btn-ghost">
            Alle Leistungen im Detail
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
