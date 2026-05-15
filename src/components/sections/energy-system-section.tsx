"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/**
 * "Ihr Energiesystem" — fotorealistische Schweiz-Infografik als Bild.
 * Badges, Labels und Energieflüsse sind im Bild bereits enthalten, daher
 * zeigen wir es clean mit weich verlaufenden Rändern (Mask), damit es
 * nahtlos in den Seitenhintergrund übergeht statt als harte Box zu wirken.
 */
export function EnergySystemSection() {
  const reduce = useReducedMotion();

  return (
    <section className="container-page py-16 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-[color:var(--solar-emerald)]">
          Ihr Energiesystem
        </p>
        <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-[42px]">
          Alles greift ineinander – aus einer Hand geplant.
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
          Photovoltaik, Speicher, Wärmepumpe, Wallbox und intelligente Steuerung
          arbeiten als ein System. Wir planen, installieren und betreuen alle
          Komponenten so, dass sie optimal zusammenspielen.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: reduce ? 0 : 0.6 }}
        className="relative mx-auto mt-10 w-full max-w-5xl"
      >
        <div
          className="relative aspect-[16/9] w-full"
          style={{
            WebkitMaskImage:
              "radial-gradient(120% 120% at 50% 50%, #000 72%, transparent 100%)",
            maskImage:
              "radial-gradient(120% 120% at 50% 50%, #000 72%, transparent 100%)",
          }}
        >
          <Image
            src="/energiesystem.png"
            alt="Energiesystem eines Schweizer Einfamilienhauses: Photovoltaikanlage, Carport-Solar, Wallbox, Wärmepumpe, Wechselrichter, Batteriespeicher und Energiemanager mit Netzanschluss"
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-contain"
            priority={false}
          />
        </div>
      </motion.div>

      <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        {[
          { color: "#e11d3a", label: "Netzstrom – Bezug & Einspeisung" },
          { color: "#3b9ddb", label: "Solarstrom (DC) vom Dach" },
          {
            color: "var(--solar-gold)",
            label: "Gesteuerte Energieflüsse (Speicher, Wärmepumpe, EV)",
          },
        ].map((it) => (
          <li
            key={it.label}
            className="flex items-center gap-2 text-xs text-muted-foreground"
          >
            <span
              className="h-1 w-6 rounded-full"
              style={{ background: it.color }}
            />
            {it.label}
          </li>
        ))}
      </ul>
    </section>
  );
}
