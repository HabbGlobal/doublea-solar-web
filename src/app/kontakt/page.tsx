import type { Metadata } from "next";

import { ContactForm } from "@/components/forms/contact-form";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Solarberatung Grenchen, Solothurn & Bern – Kontakt",
  description:
    "Kontaktieren Sie DoubleA Solar Solutions für eine persönliche Solarberatung, Offerte, Solarrechner-Auswertung oder Serviceanfrage in der Schweiz. Antwort innert eines Werktags.",
  alternates: {
    canonical: "/kontakt",
  },
};

const linkClass =
  "btn-ghost min-h-11 rounded-md break-words";

export default function KontaktPage() {
  const { contact, openingHours } = siteConfig;

  return (
    <section aria-labelledby="kontakt-h" className="py-14 sm:py-20 lg:pt-24">
      <div className="container-page">
        {/* Intro */}
        <div className="max-w-2xl">
          <p className="eyebrow">Kontakt</p>
          <h1
            id="kontakt-h"
            className="mt-4 text-balance text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.6rem]"
          >
            Sprechen wir über Ihr Solarprojekt.
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            Für dringende Service-Themen erreichen Sie uns am schnellsten
            telefonisch.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
          {/* Kontaktzeilen — Label + Wert */}
          <div className="neu p-6 sm:p-7">
            <dl className="space-y-6">
              <div>
                <dt className="eyebrow">Adresse</dt>
                <dd className="mt-1.5 text-[15px] leading-relaxed text-foreground">
                  {contact.address.street}
                  <br />
                  {contact.address.postalCode} {contact.address.city}
                  <br />
                  {contact.address.country}
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Telefon</dt>
                <dd className="mt-0.5">
                  <a href={contact.phoneHref} className={linkClass}>
                    {contact.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow">E-Mail</dt>
                <dd className="mt-0.5 min-w-0">
                  <a href={`mailto:${contact.email}`} className={linkClass}>
                    {contact.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Öffnungszeiten</dt>
                <dd className="mt-1.5 text-[15px] leading-relaxed text-foreground">
                  {openingHours.weekdays}
                  <br />
                  {openingHours.saturday}
                </dd>
              </div>
            </dl>
          </div>

          {/* Anfrageformular */}
          <div className="neu p-6 sm:p-8">
            <p className="eyebrow">Anfrageformular</p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-foreground sm:text-3xl">
              Wie können wir helfen?
            </h2>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
