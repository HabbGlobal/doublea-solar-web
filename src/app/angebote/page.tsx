import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { LeadForm } from "@/components/forms/lead-form";
import { SectionHead } from "@/components/site/section-head";

export const metadata: Metadata = {
  title: "Kostenloses Solar-Angebot – Grenchen, Solothurn & Bern",
  description:
    "Fordern Sie ein kostenloses, unverbindliches Solar-Angebot an. Wir prüfen Ihr Photovoltaik-Projekt in Grenchen, Solothurn, Bern und Umgebung, klären Förderungen und erstellen eine transparente Offerte.",
  alternates: { canonical: "/angebote" },
};

const inclusions = [
  "Standortanalyse mit Verschattungs- und Statikbewertung",
  "Auslegung von Modulen, Wechselrichter und Speicher",
  "Indikative Wirtschaftlichkeitsrechnung mit konservativen Annahmen",
  "Prüfung von Pronovo-Einmalvergütung und kantonaler Förderung",
];

export default function AngebotePage() {
  return (
    <section aria-labelledby="angebot-h">
      <SectionHead nr="01" label="Angebot" />
      <div className="container-page pt-10 pb-16 sm:pt-14 sm:pb-24 lg:pb-28">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* Werkplan-Spalte — was das Angebot umfasst */}
          <div className="max-w-xl">
            <p className="eyebrow">Kostenloses Angebot</p>
            <h1
              id="angebot-h"
              className="mt-4 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl"
            >
              Ihr Projekt, unverbindlich geprüft.
            </h1>
            <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              Wir prüfen Ihr Dach, klären Machbarkeit und Förderung und
              erstellen eine sauber aufgeschlüsselte Offerte. Wir empfehlen nur,
              was technisch und wirtschaftlich Sinn ergibt.
            </p>

            <div className="mt-10 border-t border-border pt-8">
              <h2 className="text-base font-semibold tracking-tight text-foreground">
                In jedem Angebot enthalten
              </h2>
              <ul className="mt-5 space-y-3.5">
                {inclusions.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-foreground/85 sm:text-[15px]"
                  >
                    <span
                      aria-hidden
                      className="mt-2 size-1.5 shrink-0 bg-[color:var(--solar-ink)]"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Rechner-Cross-Sell als schlichte Hairline-Zeile */}
            <div className="mt-10 border-t border-border pt-6">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Der Solarrechner liefert die Grundlage für die Offerte.
              </p>
              <Link href="/solarrechner" className="btn-ghost mt-3 min-h-12">
                Zum Solarrechner
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Formular-Spalte — weisses Panel mit Hairline */}
          <div className="surface-glass self-start p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              Angebot anfragen
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Erzählen Sie uns kurz von Ihrem Vorhaben – wir melden uns
              persönlich bei Ihnen.
            </p>
            <div className="mt-6">
              <LeadForm source="angebote" requireFullDetails />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
