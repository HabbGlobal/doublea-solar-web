import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  Check,
  Clock,
  ShieldCheck,
} from "lucide-react";

import { LeadForm } from "@/components/forms/lead-form";

export const metadata: Metadata = {
  title: "Kostenloses Solar-Angebot – Grenchen, Solothurn & Bern",
  description:
    "Fordern Sie ein kostenloses, unverbindliches Solar-Angebot an. Wir prüfen Ihr Photovoltaik-Projekt in Grenchen, Solothurn, Bern und Umgebung, klären Förderungen und erstellen eine transparente Offerte.",
};

const inclusions = [
  "Standortanalyse mit Verschattungs- und Statikbewertung",
  "Auslegung von Modulen, Wechselrichter und Speicheroption",
  "Indikative Wirtschaftlichkeitsrechnung mit konservativen Annahmen",
  "Prüfung der Pronovo-Einmalvergütung und kantonaler Förderprogramme",
  "Klar strukturierte Offerte mit transparent ausgewiesenen Positionen",
];

const reassurances = [
  { icon: ShieldCheck, label: "Kostenfrei und unverbindlich" },
  { icon: Clock, label: "Antwort innert eines Werktags" },
] as const;

export default function AngebotePage() {
  return (
    <section className="container-page py-16 sm:py-24 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        {/* Intro-Spalte — was das Angebot umfasst */}
        <div className="max-w-xl">
          <p className="eyebrow">Kostenloses Angebot</p>
          <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
            Ein Angebot, das wir auch selbst unterschreiben würden.
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            Wir prüfen Ihr Dach, klären Machbarkeit und Förderung und erstellen
            eine sauber aufgeschlüsselte Offerte – ohne Verkaufsdruck und ohne
            Pauschalversprechen. Wir empfehlen nur, was technisch und
            wirtschaftlich Sinn ergibt.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {reassurances.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex min-h-10 items-center gap-2 rounded-full border border-border bg-white/70 px-4 py-2 text-[13px] font-medium text-foreground/80"
              >
                <Icon className="size-4 text-[color:var(--solar-emerald)]" />
                {label}
              </span>
            ))}
          </div>

          <div className="mt-10 border-t border-[color:var(--solar-sand)] pt-8">
            <h2 className="text-base font-semibold tracking-tight text-foreground">
              In jedem Angebot enthalten
            </h2>
            <ul className="mt-5 space-y-3.5">
              {inclusions.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-relaxed text-foreground/85 sm:text-[15px]"
                >
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-[color:var(--solar-emerald)]/10 text-[color:var(--solar-emerald)]">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 rounded-2xl border border-border bg-white/70 p-5 text-sm leading-relaxed text-muted-foreground transition hover:-translate-y-1 hover:shadow-[0_20px_50px_-24px_rgba(17,19,21,0.18)] sm:p-6">
            <p className="font-medium text-foreground">
              Noch unsicher, was sinnvoll dimensioniert ist?
            </p>
            <p className="mt-1.5">
              Starten Sie mit unserem Solarrechner – das Ergebnis dient als
              Grundlage für die Offerte.
            </p>
            <Link href="/solarrechner" className="btn-ghost mt-4 min-h-12">
              <Calculator className="size-4" />
              Zum Solarrechner
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        {/* Formular-Spalte — hervorgehobenes Glass-Panel */}
        <div className="surface-glass self-start rounded-3xl p-6 sm:p-8">
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
    </section>
  );
}
