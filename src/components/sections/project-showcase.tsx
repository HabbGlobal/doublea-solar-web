import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionHead, SectionTitle } from "@/components/site/section-head";
import { getProjectsByKind } from "@/lib/data/projects";

type Dossier = {
  title: string;
  imageUrl: string | null;
  rows: ReadonlyArray<readonly [string, string]>;
};

/**
 * Fallback, solange in der Verwaltung keine Anlagentypen erfasst sind.
 * Identisch zum Bestand — die Startseite sieht ohne Datenbank gleich aus.
 */
const kuratierteDossiers: readonly Dossier[] = [
  {
    title: "Einfamilienhaus",
    imageUrl: null,
    rows: [
      ["Leistung", "8–12 kWp"],
      ["Speicher", "5–16 kWh"],
      ["Montage", "2–3 Tage"],
    ],
  },
  {
    title: "Mehrfamilienhaus / ZEV",
    imageUrl: null,
    rows: [
      ["Leistung", "15–60 kWp"],
      ["Abrechnung", "Mieterstrom"],
      ["Messkonzept", "ab Tag 1"],
    ],
  },
  {
    title: "Gewerbe & Landwirtschaft",
    imageUrl: null,
    rows: [
      ["Leistung", "30–150 kWp"],
      ["Analyse", "Lastgang"],
      ["Prüfung", "Statik & Brandschutz"],
    ],
  },
];

/** Zahlwort für den Einleitungssatz — die Anzahl kommt aus der Verwaltung. */
const zahlwort: Record<number, string> = {
  1: "Eine Gebäudekategorie prägt",
  2: "Zwei Gebäudekategorien prägen",
  3: "Drei Gebäudekategorien prägen",
  4: "Vier Gebäudekategorien prägen",
  5: "Fünf Gebäudekategorien prägen",
  6: "Sechs Gebäudekategorien prägen",
};

/** Zahlenwert für die Kennzeile einer Referenz (kWp / Speicher). */
function referenzWerte(p: {
  kwp: number | null;
  storageKwh: number | null;
  location: string | null;
}): string {
  const teile = [
    p.kwp ? `${String(p.kwp).replace(".", ",")} kWp` : null,
    p.storageKwh ? `${String(p.storageKwh).replace(".", ",")} kWh Speicher` : null,
  ].filter(Boolean);
  return teile.join(" · ");
}

export async function ProjectShowcase() {
  // Anlagentypen aus der Verwaltung; die Startseite zeigt die ersten drei
  // (Reihenfolge = Sortierung im Admin), /projekte zeigt alle.
  const [typen, referenzenAlle] = await Promise.all([
    getProjectsByKind("typ"),
    getProjectsByKind("referenz"),
  ]);
  // Auf der Startseite nur Referenzen mit Foto — ohne Bild wirkt die Reihe leer.
  const referenzen = referenzenAlle.filter((p) => p.images[0]).slice(0, 3);
  const ausDb: Dossier[] = typen.slice(0, 3).map((p) => ({
    title: p.title,
    imageUrl: p.images[0] ?? null,
    rows: [
      ...(p.metricLabel && p.metricValue
        ? ([[p.metricLabel, p.metricValue]] as const)
        : []),
      ...p.facts.map((f) => [f.label, f.value] as const),
    ].slice(0, 3),
  }));
  const dossiers = ausDb.length > 0 ? ausDb : kuratierteDossiers;
  const einleitung =
    zahlwort[dossiers.length] ?? `${dossiers.length} Gebäudekategorien prägen`;

  return (
    <section id="projekte" aria-labelledby="projekte-titel">
      <SectionHead nr="06" label="Anlagentypen" />
      <div className="container-page py-14 sm:py-20">
        <SectionTitle
          id="projekte-titel"
          title="Vom Familiendach bis zur Werkhalle."
          lead={`${einleitung} unsere Arbeit — jede Anlage wird individuell nach Dach, Verschattung und Verbrauchsprofil ausgelegt.`}
        />

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {dossiers.map((d) => (
            <article key={d.title}>
              {d.imageUrl ? (
                <div className="relative aspect-[4/3] overflow-hidden border border-border bg-card">
                  <Image
                    src={d.imageUrl}
                    alt={`Photovoltaikanlage: ${d.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div
                  className="relative flex aspect-[4/3] items-center justify-center border border-border bg-card"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, var(--solar-line) 0 1px, transparent 1px 9px)",
                  }}
                >
                  <span className="eyebrow bg-card px-3 py-1.5">
                    Projektfotografie in Vorbereitung
                  </span>
                </div>
              )}
              <h3 className="mt-5 text-lg font-medium text-foreground">
                {d.title}
              </h3>
              <dl className="mt-3">
                {d.rows.map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-baseline justify-between gap-4 border-t border-border py-2.5 last:border-b"
                  >
                    <dt className="eyebrow">{label}</dt>
                    <dd className="stat-mono text-sm text-foreground">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>

        {/* Ausgeführte Anlagen — erscheinen, sobald freigegebene Referenzen
            mit Foto erfasst sind. */}
        {referenzen.length > 0 && (
          <div className="mt-14 border-t border-border pt-10 sm:mt-16">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="text-xl font-semibold text-foreground sm:text-2xl">
                Ausgeführte Anlagen
              </h3>
              <p className="eyebrow">Mit Freigabe der Eigentümerschaft</p>
            </div>

            <div className="mt-6 grid gap-8 md:grid-cols-3">
              {referenzen.map((p) => (
                <article key={p.id}>
                  <div className="relative aspect-[4/3] overflow-hidden border border-border bg-card">
                    <Image
                      src={p.images[0]}
                      alt={`Realisierte Photovoltaikanlage: ${p.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <h4 className="mt-4 text-[15px] font-medium leading-snug text-foreground">
                    {p.title}
                  </h4>
                  {p.location && (
                    <p className="eyebrow mt-1.5">{p.location}</p>
                  )}
                  {referenzWerte(p) && (
                    <p className="stat-mono mt-2 text-sm text-foreground/85">
                      {referenzWerte(p)}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        )}

        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {referenzen.length > 0
            ? "Die gezeigten Anlagen sind mit ausdrücklicher Freigabe der Eigentümerschaft publiziert. Die Eckwerte der Anlagentypen sind typische Spannweiten und indikativ."
            : "Wir publizieren keine Kundenprojekte ohne ausdrückliche Freigabe. Referenzobjekte mit realen Eckdaten zeigen wir im persönlichen Gespräch — Eckwerte oben sind typische Spannweiten, indikativ."}
        </p>

        <Link href="/projekte" className="btn-ghost mt-4 min-h-12">
          {referenzen.length > 0 ? "Alle Projekte ansehen" : "Alle Anlagentypen"}
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
