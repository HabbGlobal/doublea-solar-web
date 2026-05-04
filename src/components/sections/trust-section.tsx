"use client";

import { Award, FileSignature, Hammer, MapPin, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const items = [
  {
    icon: MapPin,
    title: "Sitz in Grenchen",
    description: "Verankert im Mittelland, schweizweit im Einsatz.",
  },
  {
    icon: FileSignature,
    title: "Transparente Offerten",
    description: "Klare Positionen, keine versteckten Kosten.",
  },
  {
    icon: Award,
    title: "Förderberatung inklusive",
    description: "Pronovo EIV und kantonale Programme im Blick.",
  },
  {
    icon: Hammer,
    title: "Eigene Montageteams",
    description: "Saubere Installation, dokumentierte Abnahme.",
  },
  {
    icon: Sparkles,
    title: "Monitoring & Wartung",
    description: "Langfristig betreut, nicht nur installiert.",
  },
];

export function TrustSection() {
  const reduce = useReducedMotion();
  return (
    <section className="border-y border-border bg-background/40">
      <div className="container-page py-10 lg:py-14">
        <p className="text-center text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Worauf sich Schweizer Eigentümerinnen und Eigentümer verlassen
        </p>
        <ul className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  delay: reduce ? 0 : i * 0.05,
                  duration: reduce ? 0 : 0.5,
                }}
                className="flex flex-col gap-2 rounded-2xl border border-border/70 bg-card/60 p-4 backdrop-blur-sm"
              >
                <Icon className="size-4 text-[color:var(--solar-emerald)]" />
                <p className="text-sm font-semibold text-foreground">{item.title}</p>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
