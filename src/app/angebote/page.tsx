import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { LeadForm } from "@/components/forms/lead-form";

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
    <section aria-labelledby="angebot-h" className="py-14 sm:py-20 lg:pt-24">
      <div className="container-page">
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
          {/* Was das Angebot umfasst */}
          <div>
            <p className="eyebrow">Kostenloses Angebot</p>
            <h1
              id="angebot-h"
              className="mt-4 text-balance text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl"
            >
              Ihr Projekt, unverbindlich geprüft.
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              Wir prüfen Ihr Dach, klären Machbarkeit und Förderung und
              erstellen eine sauber aufgeschlüsselte Offerte. Wir empfehlen nur,
              was technisch und wirtschaftlich Sinn ergibt.
            </p>

            <div className="neu mt-8 p-6 sm:p-7">
              <h2 className="text-base font-semibold tracking-tight text-foreground">
                In jedem Angebot enthalten
              </h2>
              <ul className="mt-4 space-y-3">
                {inclusions.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-foreground sm:text-[15px]"
                  >
                    <span aria-hidden className="gold-dot mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Rechner-Cross-Sell */}
            <div className="mt-8">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Der Solarrechner liefert die Grundlage für die Offerte.
              </p>
              <Link href="/solarrechner" className="btn-ghost mt-3 min-h-12">
                Zum Solarrechner
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Formular */}
          <div className="neu p-6 sm:p-8">
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
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
