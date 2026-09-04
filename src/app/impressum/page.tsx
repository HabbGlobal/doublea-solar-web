import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum von DoubleA Solar Solutions, Grenchen.",
  robots: { index: true, follow: false },
  alternates: { canonical: "/impressum" },
};

/* Textspalte (70ch) in einer erhabenen Karte: h2 mit Abstand statt Hairline,
   Body in muted-foreground. */

const h2Class =
  "mt-10 text-lg font-semibold tracking-tight text-foreground sm:text-xl";
const bodyClass =
  "mt-3 text-[15px] leading-relaxed text-muted-foreground sm:text-base";
const linkClass =
  "ring-focus rounded-md font-medium text-foreground underline decoration-[color:var(--solar-gold)] decoration-2 underline-offset-4 transition-colors hover:text-[color:var(--solar-gold-dark)]";

export default function ImpressumPage() {
  const { contact, legalName } = siteConfig;
  return (
    <article className="py-14 sm:py-20">
      <div className="container-page">
        <div className="neu max-w-[70ch] p-7 sm:p-10">
          <header>
            <p className="eyebrow">Rechtliches</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
              Impressum
            </h1>
            <p className="eyebrow mt-4">Stand: August 2026</p>
          </header>

          <div className="mt-2">
            <section>
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

            <section>
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

            <section>
              <h2 className={h2Class}>Handelsregister</h2>
              <p className={bodyClass}>
                Eingetragen im Handelsregister des Kantons{" "}
                {contact.address.canton}. Die UID-Nummer wird auf Anfrage
                mitgeteilt und mit Veröffentlichung des Impressums ergänzt.
              </p>
            </section>

            <section>
              <h2 className={h2Class}>Verantwortlich für den Inhalt</h2>
              <p className={bodyClass}>Geschäftsleitung {legalName}.</p>
            </section>

            <section>
              <h2 className={h2Class}>Haftungsausschluss</h2>
              <p className={bodyClass}>
                Die Inhalte dieser Website werden mit grösstmöglicher Sorgfalt
                erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität
                der Inhalte können wir jedoch keine Gewähr übernehmen. Die
                Nutzung dieser Website erfolgt auf eigenes Risiko.
              </p>
            </section>

            <section>
              <h2 className={h2Class}>Urheberrecht</h2>
              <p className={bodyClass}>
                Sämtliche Inhalte dieser Website unterliegen dem
                schweizerischen Urheberrecht. Vervielfältigung und Wiedergabe –
                ganz oder teilweise – bedürfen der vorgängigen schriftlichen
                Zustimmung.
              </p>
            </section>
          </div>
        </div>
      </div>
    </article>
  );
}
