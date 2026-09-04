import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionTitle } from "@/components/site/section-head";
import { getProjectsByKind } from "@/lib/data/projects";

type Dossier = {
  title: string;
  imageUrl: string | null;
  /** Kennwerte für die Meta-Zeile unter dem Titel (mit «·» getrennt). */
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
    ],
  },
  {
    title: "Mehrfamilienhaus / ZEV",
    imageUrl: null,
    rows: [
      ["Leistung", "15–60 kWp"],
      ["Abrechnung", "Mieterstrom"],
    ],
  },
  {
    title: "Gewerbe & Landwirtschaft",
    imageUrl: null,
    rows: [
      ["Leistung", "30–150 kWp"],
      ["Analyse", "Lastgang"],
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

/** Meta-Zeile einer Referenz: Ort · kWp · Speicher. */
function referenzMeta(p: {
  kwp: number | null;
  storageKwh: number | null;
  location: string | null;
}): string {
  return [p.location, referenzWerte(p)].filter(Boolean).join(" · ");
}

/** Foto im eingelassenen Rahmen — oder die Platzhalterfläche «Foto folgt». */
function KachelFoto({ src, alt }: { src: string | null; alt: string }) {
  if (!src) {
    return (
      <div className="neu-in flex aspect-[4/3] items-center justify-center">
        <span className="eyebrow">Foto folgt</span>
      </div>
    );
  }
  return (
    <div className="neu-photo">
      <div className="relative aspect-[4/3]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}

/**
 * Anlagen: Anlagentypen und ausgeführte Referenzen als weich erhabene
 * Kacheln — Foto im eingelassenen Rahmen, Titel, eine Meta-Zeile.
 */
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
      ...p.facts.slice(0, 2).map((f) => [f.label, f.value] as const),
    ],
  }));
  const dossiers = ausDb.length > 0 ? ausDb : kuratierteDossiers;
  const einleitung =
    zahlwort[dossiers.length] ?? `${dossiers.length} Gebäudekategorien prägen`;

  return (
    <section
      id="projekte"
      aria-labelledby="projekte-titel"
      className="py-14 sm:py-20"
    >
      <div className="container-page">
        <SectionTitle
          id="projekte-titel"
          title="Vom Familiendach bis zur Werkhalle."
          lead={`${einleitung} unsere Arbeit — jede Anlage wird individuell ausgelegt.`}
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dossiers.map((d) => {
            const meta = d.rows.map(([, value]) => value).join(" · ");
            return (
              <article key={d.title} className="neu p-3 pb-5">
                <KachelFoto
                  src={d.imageUrl}
                  alt={`Photovoltaikanlage: ${d.title}`}
                />
                <h3 className="mt-4 px-2 text-[17px] font-semibold leading-snug text-foreground">
                  {d.title}
                </h3>
                {meta && (
                  <p className="mt-1 px-2 text-sm tabular-nums text-muted-foreground">
                    {meta}
                  </p>
                )}
              </article>
            );
          })}
        </div>

        {/* Ausgeführte Anlagen — erscheinen, sobald freigegebene Referenzen
            mit Foto erfasst sind. */}
        {referenzen.length > 0 && (
          <div className="mt-12 sm:mt-14">
            <h3 className="text-xl font-semibold text-foreground sm:text-2xl">
              Ausgeführte Anlagen
            </h3>

            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {referenzen.map((p) => {
                const meta = referenzMeta(p);
                return (
                  <article key={p.id} className="neu p-3 pb-5">
                    <KachelFoto
                      src={p.images[0]}
                      alt={`Realisierte Photovoltaikanlage: ${p.title}`}
                    />
                    <h4 className="mt-4 px-2 text-[17px] font-semibold leading-snug text-foreground">
                      {p.title}
                    </h4>
                    {meta && (
                      <p className="mt-1 px-2 text-sm tabular-nums text-muted-foreground">
                        {meta}
                      </p>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        )}

        <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
          {referenzen.length > 0
            ? "Publiziert mit Freigabe der Eigentümerschaft; die Eckwerte sind indikative Spannweiten."
            : "Kundenprojekte zeigen wir nur mit Freigabe; die Eckwerte oben sind indikative Spannweiten."}
        </p>

        <div className="mt-4">
          <Link href="/projekte" className="btn-ghost min-h-11">
            {referenzen.length > 0 ? "Alle Projekte ansehen" : "Alle Anlagentypen"}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
