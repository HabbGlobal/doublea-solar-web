import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BatteryCharging,
  Check,
  ClipboardCheck,
  Compass,
  HardHat,
  LineChart,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { CtaBand } from "@/components/site/cta-band";

export const metadata: Metadata = {
  title: "Photovoltaik Planung, Installation & Wartung",
  description:
    "Von Standortanalyse über Förderberatung bis Installation, Netzanschluss, Batterie, Eigenverbrauchsoptimierung und Monitoring – DoubleA Solar Solutions begleitet Ihr Solarprojekt in Grenchen, Solothurn, Bern und der ganzen Schweiz.",
};

type Service = {
  /** Anchor-ID — wird von Startseite und Footer verlinkt, nicht ändern. */
  id: string;
  kicker: string;
  navLabel: string;
  icon: LucideIcon;
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
    icon: Compass,
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
    icon: ClipboardCheck,
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
    icon: LineChart,
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
      "Fördersätze und Programme ändern sich laufend. Alle Angaben sind indikativ – wir prüfen sie zum Zeitpunkt Ihrer Offerte tagesaktuell.",
    ctaLabel: "Fördersituation klären",
  },
  {
    id: "installation",
    kicker: "Umsetzung",
    navLabel: "Installation & Netzanschluss",
    icon: HardHat,
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
    icon: BatteryCharging,
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
    icon: Wrench,
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
      <section className="container-page pt-14 pb-12 sm:pt-20 sm:pb-16 lg:pt-24">
        <div className="max-w-3xl">
          <p className="eyebrow">Leistungen</p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Jede Phase Ihres Solarprojekts. Ein verantwortliches Team.
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            Sechs Leistungsbereiche, eine Verantwortung: Wir begleiten Ihr
            Solarprojekt in Grenchen, Solothurn, Bern und der ganzen Schweiz –
            von der ersten Dachprüfung über Förderanträge und Installation bis
            zum Monitoring im laufenden Betrieb.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[color:var(--solar-leaf)]" />
              Kostenfrei und unverbindlich
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[color:var(--solar-leaf)]" />
              Antwort innert eines Werktags
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[color:var(--solar-leaf)]" />
              Beratung in Deutsch und Schweizerdeutsch
            </span>
          </div>
        </div>

        {/* Leistungs-Index — Sprungmarken zu den Detailsektionen */}
        <nav
          aria-label="Leistungsübersicht"
          className="mt-10 flex flex-wrap gap-2"
        >
          {services.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="ring-focus inline-flex min-h-11 items-center gap-2.5 rounded-full border border-border bg-white/60 px-4 text-sm font-medium text-foreground/80 transition-colors hover:border-[color:var(--solar-sand)] hover:bg-secondary hover:text-foreground"
            >
              <span className="stat-mono text-xs text-[color:var(--solar-gold)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              {s.navLabel}
            </a>
          ))}
        </nav>
      </section>

      {/* Detailsektionen im Wechselrhythmus hell / surface-sand */}
      {services.map((s, i) => {
        const Icon = s.icon;
        const sand = i % 2 === 1;
        const num = String(i + 1).padStart(2, "0");
        return (
          <section
            key={s.id}
            id={s.id}
            className={sand ? "surface-sand scroll-mt-24" : "scroll-mt-24"}
          >
            <div className="container-page py-16 sm:py-20 lg:py-24">
              <div className="grid items-start gap-10 lg:grid-cols-[0.46fr_0.54fr] lg:gap-16">
                {/* Nutzen & Einordnung */}
                <div className={sand ? "lg:order-2" : undefined}>
                  <div className="flex items-center gap-4">
                    <span className="stat-mono text-sm text-[color:var(--solar-gold)]">
                      {num}
                    </span>
                    <span
                      aria-hidden="true"
                      className="h-px w-10 bg-[color:var(--solar-sand)]"
                    />
                    <p className="eyebrow">{s.kicker}</p>
                  </div>
                  <h2 className="mt-5 text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                    {s.title}
                  </h2>
                  <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                    {s.summary}
                  </p>
                  <div className="mt-6 border-l-2 border-[color:var(--solar-gold)]/70 pl-4">
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[color:var(--solar-slate)]">
                      Ihr Nutzen
                    </p>
                    <p className="mt-1.5 max-w-xl text-[15px] font-medium leading-relaxed text-foreground">
                      {s.benefit}
                    </p>
                  </div>
                  <Link
                    href="/kontakt"
                    className="btn-ghost mt-7 min-h-12"
                    aria-label={`${s.ctaLabel} – Kontakt aufnehmen`}
                  >
                    {s.ctaLabel}
                    <ArrowRight className="size-4" />
                  </Link>
                </div>

                {/* Leistungsumfang */}
                <div
                  className={
                    sand
                      ? "rounded-3xl border border-border bg-white/85 p-6 sm:p-8 lg:order-1"
                      : "surface-glass rounded-3xl p-6 sm:p-8"
                  }
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex size-11 items-center justify-center rounded-xl bg-[color:var(--solar-ink)]/8 text-[color:var(--solar-ink)] ring-1 ring-[color:var(--solar-ink)]/10">
                      <Icon className="size-5" />
                    </span>
                    <p className="eyebrow text-[11px]">Das erhalten Sie</p>
                  </div>
                  <ul className="mt-6 grid gap-3.5">
                    {s.deliverables.map((d) => (
                      <li
                        key={d}
                        className="flex items-start gap-3 text-sm leading-relaxed text-foreground/85 sm:text-[15px]"
                      >
                        <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-[color:var(--solar-leaf)]/45 text-[color:var(--solar-emerald)]">
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                  {s.note && (
                    <p className="mt-6 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
                      {s.note}
                    </p>
                  )}
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
