"use client";

import {
  Activity,
  FileText,
  Landmark,
  Languages,
  Map,
  MapPin,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const items = [
  { icon: MapPin, label: "Sitz in Grenchen" },
  { icon: Map, label: "Schweizweit tätig" },
  { icon: FileText, label: "Transparente Offerten" },
  { icon: Landmark, label: "Förderberatung inklusive" },
  { icon: Activity, label: "Monitoring & Wartung" },
  { icon: Languages, label: "Beratung in Deutsch und Schweizerdeutsch" },
];

export function TrustSection() {
  const reduce = useReducedMotion();
  return (
    <section
      aria-label="Verlässlichkeit auf einen Blick"
      className="border-y border-border/70 bg-secondary/50"
    >
      <div className="container-page py-6 lg:py-7">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-6">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  delay: reduce ? 0 : i * 0.04,
                  duration: reduce ? 0 : 0.45,
                }}
                className="flex items-start gap-2.5"
              >
                <Icon
                  aria-hidden="true"
                  className="mt-[3px] size-4 shrink-0 text-[color:var(--solar-slate)]"
                />
                <span className="text-[13px] font-medium leading-snug text-foreground/80">
                  {item.label}
                </span>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
