"use client";

import { motion, useReducedMotion } from "framer-motion";

const steps = [
  {
    n: "01",
    title: "Analyse",
    description:
      "Bedarfsklärung, Dachprüfung, Ausrichtung, Verschattung, Verbrauchsprofil. Wir hören zu, bevor wir planen.",
  },
  {
    n: "02",
    title: "Offerte & Förderung",
    description:
      "Transparente Auslegung, klare Investitionsspanne, Förderoptionen via Pronovo und kantonale Programme – indikativ berechnet.",
  },
  {
    n: "03",
    title: "Installation",
    description:
      "Montage durch geprüfte Schweizer Partnerbetriebe – von uns koordiniert und verantwortet, abgestimmt mit Elektriker und Verteilnetzbetreiber. Saubere Baustelle, dokumentierte Schritte.",
  },
  {
    n: "04",
    title: "Anschluss & Abnahme",
    description:
      "Netzanschluss, Sicherheitsnachweis, Inbetriebnahme und behördliche Abnahme inklusive aller Protokolle.",
  },
  {
    n: "05",
    title: "Monitoring & Wartung",
    description:
      "Laufende Ertragskontrolle, Wartungsfenster, Reaktion bei Auffälligkeiten und planbare Servicekosten.",
  },
];

export function ProcessSection() {
  const reduce = useReducedMotion();
  return (
    <section
      id="prozess"
      className="surface-navy grain-overlay relative overflow-hidden"
    >
      <div className="container-page relative py-16 sm:py-24 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: reduce ? 0 : 0.6 }}
          className="max-w-2xl"
        >
          <p className="eyebrow">Ihr Weg zur eigenen Solaranlage</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-[44px]">
            Fünf klare Schritte. Keine Überraschungen.
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/70 sm:text-base">
            Wir arbeiten nach einem strukturierten Prozess – damit Sie zu jedem
            Zeitpunkt wissen, was als Nächstes kommt und welche Entscheidungen
            anstehen.
          </p>
        </motion.div>

        <ol className="relative mt-12 flex flex-col gap-10 lg:mt-16 lg:grid lg:grid-cols-5 lg:gap-8">
          {steps.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                delay: reduce ? 0 : i * 0.08,
                duration: reduce ? 0 : 0.55,
              }}
              className="relative pl-10 lg:pl-0 lg:pt-8"
            >
              {/* Marker auf der Linie */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-2 size-3 rounded-full bg-[color:var(--solar-gold)] shadow-[0_0_0_4px_color-mix(in_oklab,var(--solar-gold)_18%,transparent)] lg:top-0"
              />

              {/* Verbindungslinie mobile: vertikal links, dezent per Scroll aufgezogen */}
              {i < steps.length - 1 && (
                <motion.span
                  aria-hidden="true"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    delay: reduce ? 0 : 0.15 + i * 0.08,
                    duration: reduce ? 0 : 0.5,
                    ease: "easeOut",
                  }}
                  className="absolute -bottom-10 left-[5.5px] top-6 w-px origin-top bg-white/12 lg:hidden"
                />
              )}

              {/* Verbindungslinie desktop: horizontal zwischen den Markern */}
              {i < steps.length - 1 && (
                <motion.span
                  aria-hidden="true"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    delay: reduce ? 0 : 0.15 + i * 0.08,
                    duration: reduce ? 0 : 0.5,
                    ease: "easeOut",
                  }}
                  className="absolute -right-6 left-5 top-[5.5px] hidden h-px origin-left bg-white/12 lg:block"
                />
              )}

              <p className="stat-mono text-3xl font-semibold text-[color:var(--solar-gold)] sm:text-4xl">
                {s.n}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-white">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {s.description}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
