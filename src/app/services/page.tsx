import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CtaBand } from "@/components/site/cta-band";
import { SectionHead } from "@/components/site/section-head";

export const metadata: Metadata = {
  title: "Photovoltaik Planung, Installation & Wartung",
  description:
    "Von Standortanalyse über Förderberatung bis Installation, Netzanschluss, Batterie, Eigenverbrauchsoptimierung und Monitoring – DoubleA Solar Solutions begleitet Ihr Solarprojekt in Grenchen, Solothurn, Bern und der ganzen Schweiz.",
  alternates: {
    canonical: "/services",
  },
};

type Service = {
  /** Anchor-ID — wird von Startseite und Footer verlinkt, nicht ändern. */
  id: string;
  kicker: string;
  navLabel: string;
  title: string;
  summary: string;
  benefit: string;
  deliverables: string[];
  note?: string;
  ctaLabel: string;
};

const services: Service[] = [
  {
    id: "standortanalyse",
    kicker: "Grundlage",
    navLabel: "Standortanalyse",
    title: "Standortanalyse",
    summary:
      "Bevor wir eine Anlage auslegen, verstehen wir Ihr Gebäude. Dachgeometrie, Verschattung und Ihr Stromverbrauch bestimmen, was sinnvoll ist.",
    benefit:
      "Sie erfahren ehrlich, was Ihr Dach leisten kann – ohne jede Verpflichtung.",
    deliverables: [
      "Dachprüfung vor Ort: Geometrie, Zustand, Befestigung",
      "Verschattungsanalyse über den Jahresverlauf",
      "Verbrauchsanalyse anhand Ihrer Stromrechnungen",
      "Schriftliche Ersteinschätzung mit klarer Empfehlung",
    ],
    ctaLabel: "Standortanalyse anfragen",
  },
  {
    id: "planung",
    kicker: "Konzept",
    navLabel: "Planung & Auslegung",
    title: "Planung & Auslegung",
    summary:
      "Wir dimensionieren Module, Wechselrichter und Speicher nach Ihrem Verbrauch – heute und in zehn Jahren, wenn Wallbox oder Wärmepumpe dazukommen.",
    benefit: "Eine Auslegung nach Ihrem Bedarf statt nach Katalog.",
    deliverables: [
      "Auslegung von Modulen, Wechselrichter und Verkabelung",
      "Speicherdimensionierung nur dort, wo sie sich rechnet",
      "Integration von Wallbox und Wärmepumpe",
      "Indikative Ertragsprognose und Anlagenpläne zur Offerte",
    ],
    ctaLabel: "Planung besprechen",
  },
  {
    id: "foerderung",
    kicker: "Förderung",
    navLabel: "Förderberatung",
    title: "Förderberatung",
    summary:
      "Einmalvergütung, kantonale Programme, Steuerabzug: Die Förderlandschaft ist unübersichtlich. Wir kennen die Abläufe und übernehmen die Anträge.",
    benefit:
      "Sie verpassen keine Förderung, die Ihnen zusteht – und keine Zeit mit Formularen.",
    deliverables: [
      "Indikative Berechnung der Pronovo-Einmalvergütung",
      "Prüfung kantonaler und kommunaler Programme",
      "Antragstellung und Kommunikation mit Pronovo",
      "Hinweise zu Steuerabzügen; verbindlich ist die Steuerbehörde",
    ],
    note:
      "Fördersätze ändern sich laufend – wir prüfen sie zu Ihrer Offerte tagesaktuell.",
    ctaLabel: "Fördersituation klären",
  },
  {
    id: "installation",
    kicker: "Umsetzung",
    navLabel: "Installation & Netzanschluss",
    title: "Installation & Netzanschluss",
    summary:
      "Montage, Elektroanschluss, Netzbetreiber, Abnahme: Wir führen alle Gewerke zusammen. Sie erhalten eine geprüfte, dokumentierte Anlage.",
    benefit:
      "Ein Ansprechpartner für die gesamte Umsetzung – Sie koordinieren niemanden.",
    deliverables: [
      "Montage durch zertifizierte Solartechnikerinnen und -techniker",
      "Elektroanschluss durch konzessionierte Elektriker",
      "Anmeldung und Koordination mit dem Verteilnetzbetreiber",
      "Sicherheitsnachweis, Inbetriebnahme und gemeinsame Abnahme",
    ],
    ctaLabel: "Installation planen",
  },
  {
    id: "batterie",
    kicker: "Optimierung",
    navLabel: "Batterie & Eigenverbrauch",
    title: "Batterie & Eigenverbrauchsoptimierung",
    summary:
      "Ein Speicher erhöht den Eigenverbrauch spürbar – aber er rechnet sich nicht in jedem Fall. Wir simulieren zuerst und empfehlen erst danach.",
    benefit:
      "Sie investieren nur in Kapazität, die Ihr Verbrauchsprofil tatsächlich nutzt.",
    deliverables: [
      "Lastganganalyse vor jeder Speicherempfehlung",
      "Speichergrösse passend zu Ihrem Verbrauchsprofil",
      "Lastmanagement für Wallbox, Wärmepumpe und Boiler",
      "Nachrüstung bestehender Photovoltaikanlagen",
    ],
    ctaLabel: "Speicher prüfen lassen",
  },
  {
    id: "monitoring",
    kicker: "Betrieb",
    navLabel: "Monitoring & Wartung",
    title: "Monitoring & Wartung",
    summary:
      "Eine Photovoltaikanlage läuft 25 Jahre und mehr. Wir überwachen die Erträge, warten die Technik und wickeln Garantiefälle ab.",
    benefit:
      "Ertragsausfälle werden erkannt, bevor sie ins Gewicht fallen.",
    deliverables: [
      "Online-Monitoring mit Meldung bei Ertragsanomalien",
      "Wartung und Reinigung in definierten Serviceintervallen",
      "Wechselrichter-Service und Abwicklung von Garantiefällen",
      "Fester Ansprechpartner mit klaren Reaktionszeiten",
    ],
    ctaLabel: "Service anfragen",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Intro-Header */}
      <section
        aria-labelledby="services-h"
        className="container-page pt-14 pb-12 sm:pt-20 sm:pb-14 lg:pt-24"
      >
        <div className="max-w-3xl">
          <p className="eyebrow">Leistungen</p>
          <h1
            id="services-h"
            className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl"
          >
            Jede Phase Ihres Solarprojekts. Ein verantwortliches Team.
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            Sechs Leistungsbereiche, eine Verantwortung – von der ersten
            Dachprüfung bis zum Monitoring im Betrieb. Wir arbeiten in Grenchen,
            Solothurn, Bern und der ganzen Schweiz.
          </p>
        </div>

        {/* Leistungs-Index — Sprungmarken zu den Detailsektionen */}
        <nav
          aria-label="Leistungsübersicht"
          className="mt-12 border-y border-border"
        >
          <ul className="flex flex-wrap gap-x-8 gap-y-0">
            {services.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="ring-focus inline-flex min-h-11 items-center gap-2.5 text-sm font-medium text-foreground underline-offset-4 transition-colors duration-150 hover:underline"
                >
                  <span className="eyebrow">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.navLabel}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      {/* Detailsektionen im Wechselrhythmus hell / surface-sand */}
      {services.map((s, i) => {
        const sand = i % 2 === 1;
        const num = String(i + 1).padStart(2, "0");
        return (
          <section
            key={s.id}
            id={s.id}
            aria-labelledby={`${s.id}-h`}
            className={sand ? "surface-sand scroll-mt-24" : "scroll-mt-24"}
          >
            <SectionHead nr={num} label={s.navLabel} />
            <div className="container-page py-12 sm:py-16 lg:py-20">
              <div className="grid items-start gap-8 lg:grid-cols-[220px_1fr] lg:gap-16">
                {/* Nummer und Titel */}
                <div>
                  <p className="eyebrow">
                    {num} · {s.kicker}
                  </p>
                  <h2
                    id={`${s.id}-h`}
                    className="mt-3 text-balance text-2xl font-semibold leading-tight text-foreground sm:text-3xl"
                  >
                    {s.title}
                  </h2>
                </div>

                {/* Zusammenfassung, Nutzen, Leistungsumfang */}
                <div className="max-w-2xl">
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {s.summary}
                  </p>

                  <div className="mt-6 border-l-2 border-[color:var(--solar-ink)] pl-4">
                    <p className="eyebrow">Ihr Nutzen</p>
                    <p className="mt-1.5 text-[15px] font-medium leading-relaxed text-foreground">
                      {s.benefit}
                    </p>
                  </div>

                  <p className="eyebrow mt-8">Das erhalten Sie</p>
                  <ul className="mt-4 grid gap-3">
                    {s.deliverables.map((d) => (
                      <li
                        key={d}
                        className="flex items-start gap-3 text-sm leading-relaxed text-foreground/85 sm:text-[15px]"
                      >
                        <span
                          aria-hidden
                          className="mt-2 size-1.5 shrink-0 bg-[color:var(--solar-ink)]"
                        />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>

                  {s.note && (
                    <p className="mt-6 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
                      {s.note}
                    </p>
                  )}

                  <Link
                    href="/kontakt"
                    className="btn-ghost mt-7 min-h-12"
                    aria-label={`${s.ctaLabel} – Kontakt aufnehmen`}
                  >
                    {s.ctaLabel}
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <CtaBand
        title="Fragen zu einer spezifischen Leistung?"
        description="Wir sagen ehrlich, ob ein Schritt in Ihrer Situation Sinn ergibt."
        primaryHref="/kontakt"
        primaryLabel="Beratung vereinbaren"
        secondaryHref="/solarrechner"
        secondaryLabel="Solarpotenzial berechnen"
      />
    </>
  );
}
