"use client";

import Link from "next/link";
import { ArrowRight, Calculator, Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const benefits = [
  "Anlagengrösse, Produktion und Eigenverbrauch in 60 Sekunden",
  "Investitionsspanne und indikative Amortisation",
  "Empfehlung mit oder ohne Batterie – ehrlich begründet",
  "Speicherung der Auswertung als Grundlage für Ihr Angebot",
];

export function SolarCalculatorSection() {
  const reduce = useReducedMotion();
  return (
    <section id="rechner" className="container-page py-16 sm:py-24 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: reduce ? 0 : 0.6 }}
        className="surface-glass relative overflow-hidden rounded-3xl"
      >
        <div className="grid gap-10 p-6 sm:p-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12 lg:p-14">
          <div>
            <p className="eyebrow">Solarrechner</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-[44px]">
              Wie viel Solarpotenzial steckt in Ihrem Dach?
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              Unser Rechner liefert eine fundierte Erstauswertung basierend auf
              kantonalem Ertrag, Ausrichtung, Verschattung und Verbrauchsprofil.
              Keine generische Faustformel.
            </p>

            <ul className="mt-8 space-y-3">
              {benefits.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 text-sm leading-relaxed text-foreground/80"
                >
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-[color:var(--solar-leaf)]/45 text-[color:var(--solar-emerald)]">
                    <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/solarrechner" className="btn-primary">
                <Calculator className="size-4" aria-hidden="true" />
                Solarpotenzial berechnen
              </Link>
              <Link href="/services" className="btn-secondary">
                Wie wir vorgehen
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Kostenfrei und unverbindlich. Resultate indikativ – verbindlich wird
              es mit der persönlichen Auslegung.
            </p>
          </div>

          <PreviewVisual reduce={!!reduce} />
        </div>
      </motion.div>
    </section>
  );
}

function PreviewVisual({ reduce }: { reduce: boolean }) {
  return (
    /* Kein aspect-ratio unter lg: auf Mobile bestimmt der Inhalt die Höhe,
       damit die Ersparnis-Kachel sichtbar bleibt. */
    <div className="surface-navy relative w-full overflow-hidden rounded-2xl p-6 lg:aspect-[5/4] lg:p-8">
      <div
        aria-hidden="true"
        className="absolute -right-16 -top-16 size-64 rounded-full bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--solar-gold)_30%,transparent)_0%,transparent_60%)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-16 -left-16 size-64 rounded-full bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--solar-leaf)_26%,transparent)_0%,transparent_60%)] blur-2xl"
      />
      <div className="relative grid gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[color:var(--solar-gold)]">
            Empfohlene Anlage
          </p>
          <p className="stat-mono mt-1.5 text-3xl font-semibold text-white sm:text-4xl">
            9,8 kWp
          </p>
          <p className="mt-1 text-xs text-white/60">≈ 49 m² Modulfläche</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Stat label="Jahresproduktion" value="≈ 9'400 kWh" />
          <Stat label="Eigenverbrauch" value="≈ 38 %" />
          <div className="col-span-2">
            <Stat label="Ersparnis / Jahr" value="≈ CHF 1'700" />
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduce ? 0 : 0.4, duration: reduce ? 0 : 0.5 }}
          className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-xs leading-relaxed text-white/65"
        >
          Beispielwerte. Ihre persönliche Auswertung berücksichtigt Kanton,
          Ausrichtung, Verschattung und Verbrauchsprofil.
        </motion.div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-3.5">
      <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/55">
        {label}
      </p>
      <p className="stat-mono mt-1 whitespace-nowrap text-[15px] font-semibold text-white sm:text-base">
        {value}
      </p>
    </div>
  );
}
