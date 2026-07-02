"use client";

import { motion, useReducedMotion } from "framer-motion";

const reasons = [
  {
    n: "01",
    title: "Schweizer Präzision",
    description:
      "Geplant nach Schweizer Normen, montiert mit dokumentierten Abläufen – vom ersten Aufmass bis zum Sicherheitsnachweis.",
  },
  {
    n: "02",
    title: "Persönliche Verantwortung",
    description:
      "Eine feste Ansprechperson begleitet Ihr Projekt von der Begehung bis zur Inbetriebnahme – und bleibt danach erreichbar.",
  },
  {
    n: "03",
    title: "Keine Pauschalangebote",
    description:
      "Jedes Dach ist anders. Wir legen jede Anlage einzeln aus – nach Ausrichtung, Verschattung und Verbrauchsprofil.",
  },
  {
    n: "04",
    title: "Klare, transparente Offerten",
    description:
      "Alle Positionen ausgewiesen, eine ehrliche Investitionsspanne statt Lockpreis. Sie vergleichen auf sauberer Grundlage.",
  },
  {
    n: "05",
    title: "Langfristiger Service",
    description:
      "Monitoring, Wartung und planbare Servicekosten über die Inbetriebnahme hinaus – eine Anlage ist ein Projekt über Jahrzehnte.",
  },
  {
    n: "06",
    title: "Technisch saubere Auslegung",
    description:
      "Komponenten und Dimensionierung folgen dem Bedarf. Wir empfehlen nur, was technisch und wirtschaftlich Sinn ergibt.",
  },
];

export function WhyUsSection() {
  const reduce = useReducedMotion();
  return (
    <section id="warum-doublea" className="container-page py-16 sm:py-24 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: reduce ? 0 : 0.6 }}
        className="max-w-2xl"
      >
        <p className="eyebrow">Unser Anspruch</p>
        <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-[44px]">
          Warum DoubleA Solar Solutions.
        </h2>
        <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
          Keine Werbeversprechen, sondern eine Arbeitsweise: sechs Grundsätze,
          an denen Sie uns in jedem Projekt messen können.
        </p>
      </motion.div>

      <div className="mt-14 grid gap-x-14 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:gap-y-14">
        {reasons.map((r, i) => (
          <motion.article
            key={r.n}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              delay: reduce ? 0 : i * 0.05,
              duration: reduce ? 0 : 0.6,
            }}
            className="relative border-t border-border pt-8"
          >
            <span
              aria-hidden="true"
              className="absolute left-0 top-[-1px] h-px w-10 bg-[color:var(--solar-gold)]"
            />
            <span
              aria-hidden="true"
              className="stat-mono block text-4xl font-medium leading-none text-[color:var(--solar-gold)] sm:text-5xl"
            >
              {r.n}
            </span>
            <h3 className="mt-5 text-lg font-semibold text-foreground sm:text-xl">
              {r.title}
            </h3>
            <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              {r.description}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
