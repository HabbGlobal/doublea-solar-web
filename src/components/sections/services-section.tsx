"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BatteryCharging,
  ClipboardCheck,
  Compass,
  HardHat,
  LineChart,
  Wrench,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

type ServiceTone = "leaf" | "slate";

const services: {
  id: string;
  title: string;
  description: string;
  icon: typeof Compass;
  tone: ServiceTone;
}[] = [
  {
    id: "standortanalyse",
    title: "Standortanalyse",
    description:
      "Wir prüfen Dachfläche, Ausrichtung, Verschattung und Statik vor Ort und liefern eine fundierte Grundlage für die Auslegung.",
    icon: Compass,
    tone: "slate",
  },
  {
    id: "planung",
    title: "Planung & Auslegung",
    description:
      "Anlagenkonzept passend zu Verbrauch, Wärmepumpe, Elektromobilität und langfristiger Investitionsstrategie.",
    icon: ClipboardCheck,
    tone: "leaf",
  },
  {
    id: "foerderung",
    title: "Förderberatung",
    description:
      "Pronovo EIV, kantonale Beiträge und Steueraspekte – klar erklärt und im Antrag begleitet. Beträge stets indikativ.",
    icon: LineChart,
    tone: "slate",
  },
  {
    id: "installation",
    title: "Installation & Netzanschluss",
    description:
      "Saubere Montage, fachgerechter Netzanschluss, Inbetriebnahme und Abnahme inklusive vollständiger Dokumentation.",
    icon: HardHat,
    tone: "leaf",
  },
  {
    id: "batterie",
    title: "Batterie & Eigenverbrauch",
    description:
      "Speicherauslegung und Lastmanagement für maximalen Eigenverbrauch – sinnvoll dimensioniert, nicht überdimensioniert.",
    icon: BatteryCharging,
    tone: "slate",
  },
  {
    id: "monitoring",
    title: "Monitoring & Wartung",
    description:
      "Ertragsüberwachung, Reinigung, Wechselrichter-Service und Reaktionszeiten, die in der Schweiz zählen.",
    icon: Wrench,
    tone: "leaf",
  },
];

const chipTone: Record<ServiceTone, string> = {
  leaf: "bg-[color:var(--solar-leaf)]/40 text-[color:var(--solar-emerald)] ring-1 ring-[color:var(--solar-emerald)]/10",
  slate:
    "bg-[color:var(--solar-slate)]/12 text-[color:var(--solar-slate)] ring-1 ring-[color:var(--solar-slate)]/20",
};

export function ServicesSection() {
  const reduce = useReducedMotion();
  return (
    <section id="leistungen" className="container-page py-16 sm:py-24 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: reduce ? 0 : 0.6 }}
        className="mx-auto max-w-2xl text-center"
      >
        <p className="eyebrow">Unsere Leistungen</p>
        <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-[44px]">
          Eine Anlage. Ein Team. Verantwortung von Anfang bis Betrieb.
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
          Wir bündeln Beratung, Planung, Bau und Betrieb in einer Hand. So entstehen
          Anlagen, die zu Ihrem Gebäude passen – und über Jahrzehnte zuverlässig liefern.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-5">
        {services.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.article
              key={s.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                delay: reduce ? 0 : i * 0.06,
                duration: reduce ? 0 : 0.5,
              }}
              className="group flex flex-col rounded-3xl border border-border bg-white/70 p-6 transition hover:-translate-y-1 hover:shadow-[0_20px_50px_-24px_rgba(17,19,21,0.18)] lg:p-8"
            >
              <span
                className={`inline-flex size-12 items-center justify-center self-start rounded-2xl ${chipTone[s.tone]}`}
              >
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {s.description}
              </p>
              <Link
                href={`/services#${s.id}`}
                className="ring-focus mt-6 inline-flex min-h-8 items-center gap-1.5 self-start rounded-full text-sm font-medium text-[color:var(--solar-emerald)] transition-[gap] hover:gap-2.5"
                aria-label={`Mehr zu ${s.title}`}
              >
                Mehr erfahren
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
