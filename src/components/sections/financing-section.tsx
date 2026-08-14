import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHead, SectionTitle } from "@/components/site/section-head";

const facts = [
  {
    kennzahl: "Einmalvergütung des Bundes (EIV)",
    wert: "CHF 360/kWp für angebaute Anlagen unter 30 kWp mit Eigenverbrauch (integriert CHF 400/kWp)",
    quelle: "EnFV Anhang 2.1 (Fedlex)",
    stand: "1.7.2026",
  },
  {
    kennzahl: "Referenz-Strompreis Haushalte 2026",
    wert: "27.7 Rp./kWh Median (Profil H4, exkl. MwSt); Region Grenchen ≈ 29.6 Rp./kWh inkl. MwSt",
    quelle: "ElCom, Strompreisübersicht",
    stand: "Tarifjahr 2026",
  },
  {
    kennzahl: "Vergütung für Überschussstrom",
    wert: "Seit 1.1.2026 schweizweit nach BFE-Referenz-Marktpreis; Minimum 6.0 Rp./kWh für Anlagen unter 30 kW",
    quelle: "Art. 15 EnG / BFE",
    stand: "Q2 2026",
  },
  {
    kennzahl: "Leistungsgarantie Module",
    wert: "30 Jahre Produkt- und Leistungsgarantie (AIKO Neostar; Degradation max. 0.35 %/Jahr ab Jahr 2)",
    quelle: "Hersteller-Datenblatt",
    stand: "14.08.2026",
  },
  {
    kennzahl: "Richtpreis Komplettanlage EFH",
    wert: "CHF 15'500–26'500 je nach Grösse und Speicher",
    quelle: "Firmen-Richtwert, inkl. Montage, vor Abzug der Einmalvergütung",
    stand: "14.08.2026",
  },
];

export function FinancingSection() {
  return (
    <section id="finanzierung" aria-labelledby="finanzierung-titel">
      <SectionHead nr="07" label="Fakten" />
      <div className="container-page py-14 sm:py-20">
        <SectionTitle
          id="finanzierung-titel"
          title="Wirtschaftlichkeit — belegte Werte"
          lead="Nur Werte, die wir belegen können — mit Quelle und Stand. Alles Weitere rechnen wir projektspezifisch."
        />

        {/* Desktop: echte Tabelle */}
        <table className="mt-10 hidden w-full border-collapse text-sm sm:table">
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="eyebrow py-3 pr-6 text-left">
                Kennzahl
              </th>
              <th scope="col" className="eyebrow py-3 pr-6 text-left">
                Wert
              </th>
              <th scope="col" className="eyebrow py-3 pr-6 text-left">
                Quelle
              </th>
              <th scope="col" className="eyebrow py-3 text-left">
                Stand
              </th>
            </tr>
          </thead>
          <tbody>
            {facts.map((f) => (
              <tr key={f.kennzahl} className="border-b border-border">
                <td className="max-w-[26ch] py-4 pr-6 align-top font-medium text-foreground">
                  {f.kennzahl}
                </td>
                <td className="stat-mono max-w-[38ch] py-4 pr-6 align-top">
                  {f.wert}
                </td>
                <td className="py-4 pr-6 align-top text-muted-foreground">
                  {f.quelle}
                </td>
                <td className="py-4 align-top text-muted-foreground">
                  {f.stand}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile: gestapelte Definitionen statt horizontalem Scrollen */}
        <dl className="mt-8 border-b border-border sm:hidden">
          {facts.map((f) => (
            <div key={f.kennzahl} className="border-t border-border py-5">
              <dt className="text-sm font-medium text-foreground">
                {f.kennzahl}
              </dt>
              <dd className="stat-mono mt-2 text-sm leading-relaxed">
                {f.wert}
              </dd>
              <dd className="mt-2 text-xs text-muted-foreground">
                {f.quelle} · Stand {f.stand}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-4 max-w-3xl text-xs leading-relaxed text-muted-foreground">
          Alle Angaben indikativ; massgebend sind die zum Zeitpunkt der
          Inbetriebnahme gültigen Ansätze. Quellen: Energieförderungsverordnung
          EnFV (Fedlex, Stand 1.7.2026) · ElCom Strompreisübersicht 2026 ·
          Art. 15 EnG / BFE-Referenz-Marktpreis · Hersteller-Datenblatt.
          Geprüft am 14. August 2026.
        </p>

        <div className="mt-8">
          <Link href="/finanzierung" className="btn-ghost">
            Details zur Finanzierung
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
