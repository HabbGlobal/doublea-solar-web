import type { Metadata } from "next";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/forms/contact-form";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Solarberatung Grenchen, Solothurn & Bern – Kontakt",
  description:
    "Kontaktieren Sie DoubleA Solar Solutions für eine persönliche Solarberatung, Offerte, Solarrechner-Auswertung oder Serviceanfrage in der Schweiz. Antwort innert eines Werktags.",
};

const routeUrl =
  "https://www.google.com/maps/dir/?api=1&destination=Oelirain+1A,+2540+Grenchen";

export default function KontaktPage() {
  const { contact, openingHours } = siteConfig;

  return (
    <>
      <section className="container-page pt-14 pb-12 lg:pt-24 lg:pb-16">
        <div className="max-w-2xl">
          <p className="eyebrow">Kontakt</p>
          <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Sprechen wir über Ihr Solarprojekt.
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            Kostenfrei und unverbindlich – Antwort innert eines Werktags. Für
            dringende Service-Themen erreichen Sie uns am schnellsten
            telefonisch.
          </p>
        </div>
      </section>

      <section className="container-page pb-16 sm:pb-24 lg:pb-28">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
          <div className="flex flex-col gap-6">
            <div className="divide-y divide-border rounded-3xl border border-border bg-white/70">
              <ContactRow
                icon={MapPin}
                title="Adresse"
                lines={[
                  contact.address.street,
                  `${contact.address.postalCode} ${contact.address.city}`,
                  contact.address.country,
                ]}
              />
              <ContactRow
                icon={Phone}
                title="Telefon"
                lines={[contact.phone]}
                href={contact.phoneHref}
              />
              <ContactRow
                icon={Mail}
                title="E-Mail"
                lines={[contact.email]}
                href={`mailto:${contact.email}`}
              />
              <ContactRow
                icon={Clock}
                title="Öffnungszeiten"
                lines={[openingHours.weekdays, openingHours.saturday]}
              />
            </div>

            {/*
              Statisches Karten-Panel — bewusst ohne Karten-iframe (Performance,
              Datenschutz). Ruhige Sand-Fläche mit feiner Standort-Grafik.
              AI-Bildprompt, falls später ein echtes Bild gewünscht ist:
              "Minimalist topographic map illustration of Grenchen, Switzerland,
              soft warm sand and off-white tones, thin elegant contour lines,
              single refined location marker, Swiss editorial style, no text,
              calm premium aesthetic"
            */}
            <div className="surface-sand relative overflow-hidden rounded-3xl border border-border p-6 lg:p-8">
              <svg
                className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 text-[color:var(--solar-slate)]/20"
                viewBox="0 0 200 200"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="100" cy="100" r="40" stroke="currentColor" />
                <circle cx="100" cy="100" r="70" stroke="currentColor" />
                <circle cx="100" cy="100" r="99" stroke="currentColor" />
              </svg>
              <div className="relative">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-white/80 text-[color:var(--solar-emerald)]">
                  <MapPin className="size-5" aria-hidden />
                </span>
                <p className="mt-4 text-lg font-semibold text-foreground">
                  Vor Ort in Grenchen
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {contact.address.street}, {contact.address.postalCode}{" "}
                  {contact.address.city} – zentral zwischen Solothurn und Biel,
                  gut erreichbar aus der ganzen Region.
                </p>
                <a
                  href={routeUrl}
                  target="_blank"
                  rel="noopener"
                  className="btn-secondary mt-6 w-full sm:w-auto"
                >
                  Route planen
                  <ArrowUpRight className="size-4" aria-hidden />
                </a>
              </div>
            </div>
          </div>

          <div className="surface-glass rounded-3xl p-6 lg:p-8">
            <p className="eyebrow">Anfrageformular</p>
            <h2 className="mt-3 text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
              Wie können wir helfen?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Wählen Sie Ihr Anliegen und beschreiben Sie kurz Ihr Projekt –
              wir melden uns persönlich.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactRow({
  icon: Icon,
  title,
  lines,
  href,
}: {
  icon: typeof MapPin;
  title: string;
  lines: string[];
  href?: string;
}) {
  const content = (
    <>
      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-[color:var(--solar-emerald)]/10 text-[color:var(--solar-emerald)]">
        <Icon className="size-5" aria-hidden />
      </span>
      <span className="min-w-0 text-sm leading-relaxed">
        <span className="block font-semibold text-foreground">{title}</span>
        {lines.map((line) => (
          <span key={line} className="block break-words text-muted-foreground">
            {line}
          </span>
        ))}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className="ring-focus group flex items-start gap-4 rounded-2xl p-5 transition-colors first:rounded-t-3xl last:rounded-b-3xl hover:bg-secondary/60 lg:p-6"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="flex items-start gap-4 p-5 lg:p-6">{content}</div>
  );
}
