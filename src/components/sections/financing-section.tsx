"use client";

import Link from "next/link";
import {
  ArrowRight,
  FileText,
  HandCoins,
  Landmark,
  Percent,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const points = [
  {
    icon: FileText,
    title: "Transparente Offerte",
    description:
      "Eine klare Investitionsspanne, alle Positionen ausgewiesen – von Gerüst und Montage bis Elektriker und Netzanschluss. Keine versteckten Posten.",
  },
  {
    icon: Percent,
    title: "Eigenfinanzierung mit Steuerabzug",
    description:
      "Investitionen in Photovoltaik lassen sich in den meisten Kantonen vom steuerbaren Einkommen abziehen. Wir weisen den Effekt indikativ in der Offerte aus.",
  },
  {
    icon: Landmark,
    title: "Ratenfinanzierung über Schweizer Partner",
    description:
      "Auf Wunsch vermitteln wir Finanzierungsmodelle über etablierte Schweizer Partner – nüchtern gerechnet, ohne unrealistische Versprechen.",
  },
  {
    icon: HandCoins,
    title: "Förderung über Pronovo EIV",
    description:
      "Die Einmalvergütung des Bundes senkt die Investition spürbar. Wir prüfen den tagesaktuellen Ansatz für Ihren Standort und übernehmen den Antrag – Werte indikativ.",
  },
];

export function FinancingSection() {
  const reduce = useReducedMotion();
  return (
    <section id="finanzierung" className="container-page py-16 sm:py-24 lg:py-28">
      <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: reduce ? 0 : 0.6 }}
          className="lg:sticky lg:top-28"
        >
          <p className="eyebrow">Finanzierung</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-[44px]">
            Eine Solaranlage ist eine{" "}
            <span className="gold-underline">Investition</span> – keine Ausgabe.
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            Strom vom eigenen Dach ersetzt über Jahrzehnte eingekauften
            Netzstrom. Wir rechnen offen vor, was Ihre Anlage kostet, was sie
            einspart und welche Annahmen dahinterstehen – Wirtschaftlichkeit
            immer indikativ, nie versprochen.
          </p>
          <div className="mt-8">
            <Link href="/finanzierung" className="btn-ghost min-h-12">
              Finanzierung im Detail
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </motion.div>

        <ul className="border-b border-border">
          {points.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.li
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  delay: reduce ? 0 : i * 0.06,
                  duration: reduce ? 0 : 0.6,
                }}
                className="flex items-start gap-5 border-t border-border py-6 lg:py-7"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-[color:var(--solar-gold)]/40 text-foreground"
                >
                  <Icon className="size-5" strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-foreground sm:text-lg">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                    {p.description}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
