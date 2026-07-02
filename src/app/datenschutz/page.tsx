import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung von DoubleA Solar Solutions.",
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

export default function DatenschutzPage() {
  const { contact, legalName } = siteConfig;
  return (
    <article className="container-page py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <header>
          <p className="eyebrow">Rechtliches</p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Datenschutz&shy;erklärung
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Diese Vorlage orientiert sich am revidierten Schweizer
            Datenschutzgesetz (revDSG, in Kraft seit 1. September 2023). Bitte
            lassen Sie sie vor der Veröffentlichung durch eine
            Datenschutzfachperson prüfen.
          </p>
        </header>

        <div className="mt-10 divide-y divide-border sm:mt-14">
          <section className={sectionClass}>
            <h2 className={h2Class}>Verantwortliche Stelle</h2>
            <p className={bodyClass}>
              {legalName}
              <br />
              {contact.address.street}, {contact.address.postalCode}{" "}
              {contact.address.city}
              <br />
              E-Mail:{" "}
              <a className={linkClass} href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className={h2Class}>Bearbeitete Personendaten</h2>
            <p className={bodyClass}>
              Wir bearbeiten Personendaten, die Sie uns aktiv übermitteln, etwa
              über unsere Kontakt- und Anfrageformulare oder den Solarrechner.
              Dazu gehören insbesondere Name, E-Mail-Adresse, Telefonnummer,
              sowie technische und gebäudebezogene Angaben zu Ihrem Vorhaben.
            </p>
            <p className={bodyClass}>
              Beim Aufruf dieser Website werden ausserdem technische
              Verbindungsdaten (z.&nbsp;B. IP-Adresse, Browsertyp,
              Aufrufzeitpunkt) verarbeitet, soweit dies für Betrieb und
              Sicherheit der Website erforderlich ist.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className={h2Class}>Bearbeitungszwecke</h2>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-muted-foreground marker:text-[color:var(--solar-slate)] sm:text-base">
              <li>Beantwortung Ihrer Anfragen und Erstellung von Offerten</li>
              <li>
                Auswertung Ihres Solar-Potenzials zur Vorbereitung eines
                Angebots
              </li>
              <li>Vertragsanbahnung, -abschluss und -abwicklung</li>
              <li>Sicherstellung des stabilen Betriebs der Website</li>
              <li>Erfüllung gesetzlicher Pflichten</li>
            </ul>
          </section>

          <section className={sectionClass}>
            <h2 className={h2Class}>Datenweitergabe</h2>
            <p className={bodyClass}>
              Eine Weitergabe an Dritte erfolgt nur, soweit dies zur
              Vertragserfüllung erforderlich ist (z.&nbsp;B. an
              Verteilnetzbetreiber, Pronovo AG bei Förderanträgen,
              Finanzierungs- oder Versicherungspartner). Im Übrigen geben wir
              Daten nur weiter, wenn wir gesetzlich dazu verpflichtet sind oder
              Sie eingewilligt haben.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className={h2Class}>Auftragsbearbeitung &amp; Hosting</h2>
            <p className={bodyClass}>
              Diese Website wird über Vercel betrieben. Daten aus
              Anfrageformularen und Solarberechnungen werden bei unserem
              Datenbank-Anbieter Supabase gespeichert. Beide Dienste werden
              vertraglich auf die Einhaltung angemessener technischer und
              organisatorischer Massnahmen verpflichtet.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className={h2Class}>Cookies &amp; Analyse</h2>
            <p className={bodyClass}>
              Wir verzichten auf Tracking-Cookies und externe Analyse-Tools,
              die ohne Ihre Einwilligung personenbezogene Daten verarbeiten.
              Sollten wir solche Werkzeuge zukünftig einsetzen, holen wir Ihre
              Einwilligung über ein Cookie-Banner ein.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className={h2Class}>Aufbewahrung</h2>
            <p className={bodyClass}>
              Wir bewahren Personendaten so lange auf, wie es für die
              Bearbeitung Ihrer Anfrage und die Erfüllung gesetzlicher
              Pflichten erforderlich ist.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className={h2Class}>Ihre Rechte</h2>
            <p className={bodyClass}>
              Sie haben jederzeit das Recht auf Auskunft, Berichtigung,
              Löschung oder Einschränkung der Bearbeitung Ihrer Personendaten
              sowie auf Widerspruch gegen die Bearbeitung. Schreiben Sie uns
              dazu an{" "}
              <a className={linkClass} href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
              .
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className={h2Class}>Änderungen</h2>
            <p className={bodyClass}>
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen. Es
              gilt jeweils die auf dieser Seite veröffentlichte Fassung.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
