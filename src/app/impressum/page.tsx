import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum von DoubleA Solar Solutions, Grenchen.",
  robots: { index: true, follow: false },
};

/* Ruhige Editorial-Textspalte im Relaunch-System: eyebrow + H1,
   Hairline-getrennte Abschnitte, Body in muted-foreground. */

const h2Class =
  "text-lg font-semibold tracking-tight text-foreground sm:text-xl";
const bodyClass =
  "mt-3 text-[15px] leading-relaxed text-muted-foreground sm:text-base";
const linkClass =
  "ring-focus rounded-sm font-medium text-foreground underline decoration-foreground/25 underline-offset-4 transition-colors hover:decoration-foreground";
const sectionClass = "py-8 first:pt-0 sm:py-10";

export default function ImpressumPage() {
  const { contact, legalName } = siteConfig;
  return (
    <article className="container-page py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <header>
          <p className="eyebrow">Rechtliches</p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Impressum
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Diese Vorlage wurde sorgfältig erstellt. Bitte lassen Sie sie vor
            der Veröffentlichung von einer Schweizer Rechtsberatung prüfen, um
            die Richtigkeit für Ihre konkrete Unternehmensform sicherzustellen.
          </p>
        </header>

        <div className="mt-10 divide-y divide-border sm:mt-14">
          <section className={sectionClass}>
            <h2 className={h2Class}>Anbieterin</h2>
            <p className={bodyClass}>
              {legalName}
              <br />
              {contact.address.street}
              <br />
              {contact.address.postalCode} {contact.address.city}
              <br />
              {contact.address.country}
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className={h2Class}>Kontakt</h2>
            <p className={bodyClass}>
              Telefon:{" "}
              <a className={linkClass} href={contact.phoneHref}>
                {contact.phone}
              </a>
              <br />
              E-Mail:{" "}
              <a className={linkClass} href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className={h2Class}>Handelsregister</h2>
            <p className={bodyClass}>
              Eingetragen im Handelsregister des Kantons{" "}
              {contact.address.canton}. Die UID-Nummer wird auf Anfrage
              mitgeteilt und mit Veröffentlichung des Impressums ergänzt.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className={h2Class}>Verantwortlich für den Inhalt</h2>
            <p className={bodyClass}>Geschäftsleitung {legalName}.</p>
          </section>

          <section className={sectionClass}>
            <h2 className={h2Class}>Haftungsausschluss</h2>
            <p className={bodyClass}>
              Die Inhalte dieser Website werden mit grösstmöglicher Sorgfalt
              erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der
              Inhalte können wir jedoch keine Gewähr übernehmen. Die Nutzung
              dieser Website erfolgt auf eigenes Risiko.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className={h2Class}>Urheberrecht</h2>
            <p className={bodyClass}>
              Sämtliche Inhalte dieser Website unterliegen dem schweizerischen
              Urheberrecht. Vervielfältigung und Wiedergabe – ganz oder
              teilweise – bedürfen der vorgängigen schriftlichen Zustimmung.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
