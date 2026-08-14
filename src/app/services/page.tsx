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
      "Bevor wir eine Anlage auslegen, verstehen wir Ihr Gebäude. Dachgeometrie, Verschattung und Ihr tatsächlicher Stromverbrauch bestimmen, was technisch und wirtschaftlich Sinn ergibt.",
    benefit:
      "Sie erhalten eine ehrliche Einschätzung, was Ihr Dach leisten kann – bevor Sie sich zu irgendetwas verpflichten.",
    deliverables: [
      "Dachprüfung vor Ort: Geometrie, Eindeckung, Zustand und Befestigungssituation",
      "Verschattungsanalyse über den Jahresverlauf – Kamine, Gauben, Bäume, Nachbargebäude",
      "Verbrauchsanalyse anhand Ihrer Stromrechnungen und geplanter Anschaffungen",
      "Fotodokumentation und schriftliche Ersteinschätzung mit klarer Empfehlung",
    ],
    ctaLabel: "Standortanalyse anfragen",
  },
  {
    id: "planung",
    kicker: "Konzept",
    navLabel: "Planung & Auslegung",
    title: "Planung & Auslegung",
    summary:
      "Wir dimensionieren Module, Wechselrichter und Speicher so, dass die Anlage zu Ihrem Verbrauch passt – heute und in zehn Jahren, wenn Wallbox oder Wärmepumpe dazukommen.",
    benefit:
      "Eine Auslegung nach Ihrem Bedarf statt nach Katalog – nachvollziehbar dokumentiert und sauber begründet.",
    deliverables: [
      "Auslegung von Modulen, Wechselrichter und Verkabelung passend zu Dachbild und Ertrag",
      "Speicherdimensionierung – nur dort, wo sie technisch und wirtschaftlich Sinn ergibt",
      "Integration von Wallbox und Wärmepumpe in ein gemeinsames Lastmanagement",
      "Indikative Ertragsprognose und Eigenverbrauchssimulation",
      "Verständliche Anlagenpläne als Grundlage für Offerte, Meldung und Bewilligung",
    ],
    ctaLabel: "Planung besprechen",
  },
  {
    id: "foerderung",
    kicker: "Förderung",
    navLabel: "Förderberatung",
    title: "Förderberatung",
    summary:
      "Einmalvergütung, kantonale Programme, Steuerabzug: Die Förderlandschaft ist unübersichtlich. Wir kennen die Abläufe und begleiten Sie durch die Anträge.",
    benefit:
      "Sie verpassen keine Förderung, die Ihnen zusteht – und verlieren keine Zeit mit Formularen.",
    deliverables: [
      "Indikative Berechnung der Einmalvergütung (Pronovo EIV) für Ihre Anlage",
      "Prüfung kantonaler und kommunaler Förderprogramme an Ihrem Standort",
      "Vorbereitung und Einreichung der Anträge, Kommunikation mit Pronovo",
      "Hinweise zu Steuerabzügen – die verbindliche Auskunft gibt Ihre Steuerbehörde",
    ],
    note:
      "Fördersätze und Programme ändern sich laufend. Wir prüfen sie zum Zeitpunkt Ihrer Offerte tagesaktuell.",
    ctaLabel: "Fördersituation klären",
  },
  {
    id: "installation",
    kicker: "Umsetzung",
    navLabel: "Installation & Netzanschluss",
    title: "Installation & Netzanschluss",
    summary:
      "Montage, Elektroanschluss, Netzbetreiber, Abnahme: Wir führen alle Gewerke zusammen und übergeben Ihnen eine geprüfte, vollständig dokumentierte Anlage.",
    benefit:
      "Ein Ansprechpartner für die gesamte Umsetzung – Sie koordinieren weder Handwerker noch Netzbetreiber.",
    deliverables: [
      "Montage durch zertifizierte Solartechnikerinnen und -techniker in klaren Bauphasen",
      "Elektroanschluss durch konzessionierte Elektriker",
      "Anmeldung und Koordination mit Ihrem Verteilnetzbetreiber",
      "Sicherheitsnachweis (SiNa) und Inbetriebnahme mit Protokoll",
      "Abnahme gemeinsam mit Ihnen, inklusive Einweisung in Bedienung und Monitoring",
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
      "Sie investieren nur in Speicherkapazität, die Ihr Verbrauchsprofil tatsächlich nutzt.",
    deliverables: [
      "Lastganganalyse und Eigenverbrauchssimulation vor jeder Speicherempfehlung",
      "Auslegung der Speichergrösse auf Ihr Verbrauchsprofil",
      "Lastmanagement für Wallbox, Wärmepumpe und Boiler",
      "Nachrüstlösungen für bestehende Photovoltaikanlagen",
    ],
    ctaLabel: "Speicher prüfen lassen",
  },
  {
    id: "monitoring",
    kicker: "Betrieb",
    navLabel: "Monitoring & Wartung",
    title: "Monitoring & Wartung",
    summary:
      "Eine Photovoltaikanlage ist eine Investition über 25 Jahre und mehr. Wir überwachen die Erträge, warten die Technik und wickeln Garantiefälle für Sie ab.",
    benefit:
      "Ertragsausfälle werden erkannt, bevor sie ins Gewicht fallen – und im Garantiefall haben Sie einen Ansprechpartner statt einer Hotline.",
    deliverables: [
      "Online-Monitoring mit Benachrichtigung bei Ertragsanomalien",
      "Wartung und Reinigung in definierten Serviceintervallen",
      "Wechselrichter-Service und Abwicklung von Garantiefällen mit den Herstellern",
      "Klare Reaktionszeiten und ein fester Ansprechpartner in der Region",
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
            Sechs Leistungsbereiche, eine Verantwortung: Wir begleiten Ihr
            Solarprojekt in Grenchen, Solothurn, Bern und der ganzen Schweiz –
            von der ersten Dachprüfung über Förderanträge und Installation bis
            zum Monitoring im laufenden Betrieb.
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
        description="Wir beraten Sie ohne Verkaufsdruck und sagen ehrlich, ob ein Schritt in Ihrer Situation Sinn ergibt."
        primaryHref="/kontakt"
        primaryLabel="Beratung vereinbaren"
        secondaryHref="/solarrechner"
        secondaryLabel="Solarpotenzial berechnen"
      />
    </>
  );
}
