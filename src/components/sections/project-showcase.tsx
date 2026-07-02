"use client";

import Link from "next/link";
import {
  ArrowRight,
  BatteryCharging,
  Building2,
  Home,
  Warehouse,
  Wrench,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const types = [
  {
    icon: Home,
    title: "Einfamilienhaus",
    description:
      "Aufdach-Anlage mit Eigenverbrauchsoptimierung – oft kombiniert mit Wärmepumpe, Ladestation oder kleinem Speicher.",
    typical: "8–12 kWp",
  },
  {
    icon: Building2,
    title: "Mehrfamilienhaus / ZEV",
    description:
      "Zusammenschluss zum Eigenverbrauch: Solarstrom für alle Parteien, sauber ausgelegt und transparent abgerechnet.",
    typical: "15–60 kWp",
  },
  {
    icon: Warehouse,
    title: "Landwirtschaft & Gewerbe",
    description:
      "Grosse Dachflächen und hoher Tagesverbrauch – Auslegung entlang des realen Lastprofils, nicht nach Katalog.",
    typical: "30–150 kWp",
  },
  {
    icon: BatteryCharging,
    title: "Batterie-Nachrüstung",
    description:
      "Speicher und Lastmanagement für bestehende Anlagen – ehrlich dimensioniert, auch wenn die Antwort ‹kein Speicher› lautet.",
    typical: "nach Bestand",
  },
  {
    icon: Wrench,
    title: "Umbau & Erweiterung",
    description:
      "Bestehende Anlagen erweitern, Wechselrichter erneuern oder bei Dachsanierungen fachgerecht um- und zurückbauen.",
    typical: "nach Bestand",
  },
];

export function ProjectShowcase() {
  const reduce = useReducedMotion();
  return (
    <section id="projekte" className="container-page py-16 sm:py-24 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: reduce ? 0 : 0.6 }}
        className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
      >
        <div className="max-w-2xl">
          <p className="eyebrow">Typische Anlagentypen</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-[44px]">
            Vom Einfamilienhaus bis zur Gewerbehalle.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            Fünf Anlagentypen, wie wir sie in der Schweiz auslegen und umsetzen
            – als Orientierung, nicht als Katalog.{" "}
            <span className="font-medium text-foreground">
              Konkrete Referenzen auf Anfrage.
            </span>
          </p>
        </div>
        <Link
          href="/projekte"
          className="btn-ghost min-h-12 self-start lg:self-end"
        >
          Alle Projektarten ansehen
          <ArrowRight className="size-4" />
        </Link>
      </motion.div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {types.map((t, i) => {
          const Icon = t.icon;
          return (
            <motion.article
              key={t.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                delay: reduce ? 0 : i * 0.06,
                duration: reduce ? 0 : 0.6,
              }}
              className="flex flex-col rounded-3xl border border-border bg-white/70 p-6 transition hover:-translate-y-1 hover:shadow-[0_20px_50px_-24px_rgba(17,19,21,0.18)] lg:p-8"
            >
              <span
                aria-hidden="true"
                className="inline-flex size-11 items-center justify-center rounded-2xl bg-secondary text-[color:var(--solar-emerald)]"
              >
                <Icon className="size-5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-foreground">
                {t.title}
              </h3>
              <p className="mb-6 mt-2 text-sm leading-relaxed text-muted-foreground">
                {t.description}
              </p>
              <div className="mt-auto flex items-baseline justify-between gap-3 border-t border-border pt-4">
                <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[color:var(--solar-slate)]">
                  Typische Grösse
                </span>
                <span className="stat-mono text-sm font-medium text-foreground">
                  {t.typical}
                </span>
              </div>
            </motion.article>
          );
        })}
      </div>

      <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
        Angaben als typische Spannweiten – jede Anlage wird individuell nach
        Dach, Verschattung und Verbrauchsprofil ausgelegt.
      </p>
    </section>
  );
}
