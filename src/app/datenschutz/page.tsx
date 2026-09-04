import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung von DoubleA Solar Solutions.",
  robots: { index: true, follow: false },
  alternates: { canonical: "/datenschutz" },
};

/* Textspalte (70ch) in einer erhabenen Karte: h2 mit Abstand statt Hairline,
   Body in muted-foreground. */

const h2Class =
  "mt-10 text-lg font-semibold tracking-tight text-foreground sm:text-xl";
const bodyClass =
  "mt-3 text-[15px] leading-relaxed text-muted-foreground sm:text-base";
const linkClass =
  "ring-focus rounded-md font-medium text-foreground underline decoration-[color:var(--solar-gold)] decoration-2 underline-offset-4 transition-colors hover:text-[color:var(--solar-gold-dark)]";

export default function DatenschutzPage() {
  const { contact, legalName } = siteConfig;
  return (
    <article className="py-14 sm:py-20">
      <div className="container-page">
        <div className="neu max-w-[70ch] p-7 sm:p-10">
          <header>
            <p className="eyebrow">Rechtliches</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
              Datenschutz&shy;erklärung
            </h1>
            <p className="eyebrow mt-4">Stand: August 2026</p>
          </header>

          <div className="mt-2">
            <section>
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

            <section>
              <h2 className={h2Class}>Bearbeitete Personendaten</h2>
              <p className={bodyClass}>
                Wir bearbeiten Personendaten, die Sie uns aktiv übermitteln,
                etwa über unsere Kontakt- und Anfrageformulare oder den
                Solarrechner. Dazu gehören insbesondere Name, E-Mail-Adresse,
                Telefonnummer, sowie technische und gebäudebezogene Angaben zu
                Ihrem Vorhaben.
              </p>
              <p className={bodyClass}>
                Beim Aufruf dieser Website werden ausserdem technische
                Verbindungsdaten (z.&nbsp;B. IP-Adresse, Browsertyp,
                Aufrufzeitpunkt) verarbeitet, soweit dies für Betrieb und
                Sicherheit der Website erforderlich ist.
              </p>
            </section>

            <section>
              <h2 className={h2Class}>Bearbeitungszwecke</h2>
              <ul className="mt-3 space-y-2.5 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                {[
                  "Beantwortung Ihrer Anfragen und Erstellung von Offerten",
                  "Auswertung Ihres Solar-Potenzials zur Vorbereitung eines Angebots",
                  "Vertragsanbahnung, -abschluss und -abwicklung",
                  "Sicherstellung des stabilen Betriebs der Website",
                  "Erfüllung gesetzlicher Pflichten",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span aria-hidden className="gold-dot mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className={h2Class}>Datenweitergabe</h2>
              <p className={bodyClass}>
                Eine Weitergabe an Dritte erfolgt nur, soweit dies zur
                Vertragserfüllung erforderlich ist (z.&nbsp;B. an
                Verteilnetzbetreiber, Pronovo AG bei Förderanträgen,
                Finanzierungs- oder Versicherungspartner). Im Übrigen geben wir
                Daten nur weiter, wenn wir gesetzlich dazu verpflichtet sind
                oder Sie eingewilligt haben.
              </p>
            </section>

            <section>
              <h2 className={h2Class}>Auftragsbearbeitung &amp; Hosting</h2>
              <p className={bodyClass}>
                Diese Website wird über Vercel betrieben. Daten aus
                Anfrageformularen und Solarberechnungen werden bei unserem
                Datenbank-Anbieter Supabase gespeichert. Beide Dienste werden
                vertraglich auf die Einhaltung angemessener technischer und
                organisatorischer Massnahmen verpflichtet.
              </p>
            </section>

            <section>
              <h2 className={h2Class}>Cookies &amp; Analyse</h2>
              <p className={bodyClass}>
                Wir verzichten auf Tracking-Cookies und externe Analyse-Tools,
                die ohne Ihre Einwilligung personenbezogene Daten verarbeiten.
                Sollten wir solche Werkzeuge zukünftig einsetzen, holen wir
                Ihre Einwilligung über ein Cookie-Banner ein.
              </p>
            </section>

            <section>
              <h2 className={h2Class}>Aufbewahrung</h2>
              <p className={bodyClass}>
                Wir bewahren Personendaten so lange auf, wie es für die
                Bearbeitung Ihrer Anfrage und die Erfüllung gesetzlicher
                Pflichten erforderlich ist.
              </p>
            </section>

            <section>
              <h2 className={h2Class}>Ihre Rechte</h2>
              <p className={bodyClass}>
                Sie haben jederzeit das Recht auf Auskunft, Berichtigung,
                Löschung oder Einschränkung der Bearbeitung Ihrer
                Personendaten sowie auf Widerspruch gegen die Bearbeitung.
                Schreiben Sie uns dazu an{" "}
                <a className={linkClass} href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className={h2Class}>Änderungen</h2>
              <p className={bodyClass}>
                Wir behalten uns vor, diese Datenschutzerklärung anzupassen. Es
                gilt jeweils die auf dieser Seite veröffentlichte Fassung.
              </p>
            </section>
          </div>
        </div>
      </div>
    </article>
  );
}
