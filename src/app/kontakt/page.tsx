import type { Metadata } from "next";

import { ContactForm } from "@/components/forms/contact-form";
import { SectionHead } from "@/components/site/section-head";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Solarberatung Grenchen, Solothurn & Bern – Kontakt",
  description:
    "Kontaktieren Sie DoubleA Solar Solutions für eine persönliche Solarberatung, Offerte, Solarrechner-Auswertung oder Serviceanfrage in der Schweiz. Antwort innert eines Werktags.",
  alternates: {
    canonical: "/kontakt",
  },
};

export default function KontaktPage() {
  const { contact, openingHours } = siteConfig;

  return (
    <>
      {/* Intro */}
      <section
        aria-labelledby="kontakt-h"
        className="container-page pt-14 pb-12 lg:pt-24 lg:pb-16"
      >
        <div className="max-w-2xl">
          <p className="eyebrow">Kontakt</p>
          <h1
            id="kontakt-h"
            className="mt-4 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Sprechen wir über Ihr Solarprojekt.
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            Für dringende Service-Themen erreichen Sie uns am schnellsten
            telefonisch.
          </p>
        </div>
      </section>

      {/* 01 · Anfrage — Plankopf links, Formular rechts */}
      <SectionHead nr="01" label="Anfrage" />
      <section aria-label="Anfrage" className="container-page py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Kontakt-Plankopf: Definitionstabelle mit Hairlines */}
          <div>
            <dl className="surface-glass">
              <div className="grid grid-cols-[120px_1fr] gap-4 p-5 sm:p-6">
                <dt className="eyebrow pt-0.5">Adresse</dt>
                <dd className="text-sm leading-relaxed text-foreground">
                  {contact.address.street}
                  <br />
                  {contact.address.postalCode} {contact.address.city}
                  <br />
                  {contact.address.country}
                </dd>
              </div>
              <div className="grid grid-cols-[120px_1fr] gap-4 border-t border-border p-5 sm:p-6">
                <dt className="eyebrow pt-0.5">Telefon</dt>
                <dd>
                  <a
                    href={contact.phoneHref}
                    className="ring-focus stat-mono text-sm text-foreground underline decoration-[color:var(--solar-line)] underline-offset-4 transition-colors duration-150 hover:decoration-[color:var(--solar-ink)]"
                  >
                    {contact.phone}
                  </a>
                </dd>
              </div>
              <div className="grid grid-cols-[120px_1fr] gap-4 border-t border-border p-5 sm:p-6">
                <dt className="eyebrow pt-0.5">E-Mail</dt>
                <dd className="min-w-0">
                  <a
                    href={`mailto:${contact.email}`}
                    className="ring-focus stat-mono break-words text-sm text-foreground underline decoration-[color:var(--solar-line)] underline-offset-4 transition-colors duration-150 hover:decoration-[color:var(--solar-ink)]"
                  >
                    {contact.email}
                  </a>
                </dd>
              </div>
              <div className="grid grid-cols-[120px_1fr] gap-4 border-t border-border p-5 sm:p-6">
                <dt className="eyebrow pt-0.5">Öffnungszeiten</dt>
                <dd className="text-sm leading-relaxed text-foreground">
                  {openingHours.weekdays}
                  <br />
                  {openingHours.saturday}
                </dd>
              </div>
            </dl>
          </div>

          {/* Anfrageformular */}
          <div className="surface-glass p-6 sm:p-8">
            <p className="eyebrow">Anfrageformular</p>
            <h2 className="mt-3 text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
              Wie können wir helfen?
            </h2>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
