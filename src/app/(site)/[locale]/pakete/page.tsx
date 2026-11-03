import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { CtaBand } from "@/components/site/cta-band";
import { SectionTitle } from "@/components/site/section-head";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { localizedAlternates } from "@/i18n/seo";
import { localizePackages } from "@/lib/data/i18n";
import { getDbPackages, type DbPackage } from "@/lib/data/packages";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pakete.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: localizedAlternates("/pakete", locale),
  };
}

type PaketStat = {
  label: string;
  value: string;
};

/** Einheitliches Anzeigemodell für kuratierte und DB-Pakete. */
type PaketView = {
  id: string;
  target: string;
  name: string;
  summary: string | null;
  stats: PaketStat[];
  includes: string[];
  options: string[];
  price: string;
  featured: boolean;
};

/** Kuratierte Rückfall-Pakete, wie sie in messages/<locale>/pakete.json unter «curated» liegen. */
type CuratedPaket = {
  target: string;
  name: string;
  summary: string;
  stats: PaketStat[];
  includes: string[];
  options: string[];
  price: string;
};

type OptionItem = { title: string; value: string; note: string };

/** Reihenfolge + «Meistgewählt»-Markierung der kuratierten Pakete (Texte aus den Messages). */
const KURATIERTE_IDS: { id: "basis" | "komfort" | "premium"; featured: boolean }[] = [
  { id: "basis", featured: false },
  { id: "komfort", featured: true },
  { id: "premium", featured: false },
];

const swissNumber = new Intl.NumberFormat("de-CH", {
  maximumFractionDigits: 0,
});

/**
 * CH-Tausendertrennung, z.B. 12500 → 12'500. Intl liefert je nach
 * ICU-Version das typografische Apostroph (U+2019) oder ein schmales
 * Leerzeichen als Gruppentrenner — wir normalisieren auf das gerade
 * Apostroph, das der übrige Seitentext verwendet.
 */
function chf(n: number): string {
  return swissNumber
    .format(Math.round(n))
    .replace(/[’   ]/g, "'");
}

type PriceLabels = {
  from: (amount: string) => string;
  upTo: (amount: string) => string;
  onRequest: string;
};

function priceLabel(p: DbPackage, labels: PriceLabels): string {
  if (p.priceFrom != null && p.priceTo != null && p.priceTo !== p.priceFrom) {
    return `CHF ${chf(p.priceFrom)}–${chf(p.priceTo)}`;
  }
  if (p.priceFrom != null) {
    return labels.from(chf(p.priceFrom));
  }
  if (p.priceTo != null) {
    return labels.upTo(chf(p.priceTo));
  }
  return labels.onRequest;
}

function toView(
  p: DbPackage,
  labels: PriceLabels & { powerLabel: string; targetFallback: string },
): PaketView {
  /* Gepflegte Stats gewinnen; ohne sie bleibt die Leistung als Minimalzeile. */
  const stats: PaketStat[] =
    p.stats.length > 0
      ? p.stats
      : p.kwp != null
        ? [{ label: labels.powerLabel, value: `${p.kwp} kWp` }]
        : [];
  return {
    id: p.id,
    target: p.targetGroup ?? labels.targetFallback,
    name: p.title,
    summary: p.summary,
    stats,
    includes: p.includedFeatures,
    options: p.optionalFeatures,
    price: priceLabel(p, labels),
    featured: p.isFeatured,
  };
}

/* Goldpunkt als Listenmarker */
function DotBullet() {
  return <span aria-hidden className="gold-dot mt-2 size-2! shrink-0" />;
}

export default async function PaketePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pakete");

  const labels = {
    from: (amount: string) => t("price.from", { amount }),
    upTo: (amount: string) => t("price.upTo", { amount }),
    onRequest: t("price.onRequest"),
    powerLabel: t("db.powerLabel"),
    targetFallback: t("db.targetFallback"),
  };

  const kuratiert = t.raw("curated") as Record<string, CuratedPaket>;
  const kuratiertePakete: PaketView[] = KURATIERTE_IDS.map(({ id, featured }) => ({
    id,
    ...kuratiert[id],
    featured,
  }));

  const optionen = t.raw("options.items") as OptionItem[];
  const introBullets = t.raw("intro.bullets") as string[];

  const dbPakete = await localizePackages(await getDbPackages(), locale);
  const pakete: PaketView[] =
    dbPakete.length > 0 ? dbPakete.map((p) => toView(p, labels)) : kuratiertePakete;

  /* Bei genau zwei Paketen bleibt das Raster zweispaltig — keine leere Kachel. */
  const gridCols =
    pakete.length === 2
      ? "md:grid-cols-2"
      : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <>
      {/* Intro */}
      <section
        aria-labelledby="pakete-h"
        className="container-page pt-14 pb-4 sm:pt-20 sm:pb-6"
      >
        <div className="max-w-3xl">
          <p className="eyebrow">{t("intro.eyebrow")}</p>
          <h1
            id="pakete-h"
            className="mt-4 text-balance text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl"
          >
            {t("intro.title")}
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-lg">
            {t("intro.lead")}
          </p>
          <ul className="mt-6 grid gap-2.5">
            {introBullets.map((zeile) => (
              <li
                key={zeile}
                className="flex items-start gap-3 text-sm leading-relaxed text-foreground/85"
              >
                <DotBullet />
                {zeile}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Paket-Karten */}
      <section aria-label={t("packagesSection")} className="py-14 sm:py-20">
        <div className="container-page">
          <div className={`grid gap-6 ${gridCols}`}>
            {pakete.map((paket) => (
              <article
                key={paket.id}
                className={
                  paket.featured
                    ? "neu relative flex flex-col rounded-t-2xl border-t-4 border-[color:var(--solar-gold)] p-6 sm:p-7"
                    : "neu relative flex flex-col p-6 sm:p-7"
                }
              >
                {paket.featured && (
                  <span className="absolute top-5 right-5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-[#6E5510]">
                    {t("badgeFeatured")}
                  </span>
                )}
                <p className={`eyebrow ${paket.featured ? "pr-28" : ""}`}>
                  {paket.target}
                </p>
                <h2 className="mt-3 text-balance text-2xl font-bold leading-tight text-foreground">
                  {paket.name}
                </h2>
                {paket.summary && (
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {paket.summary}
                  </p>
                )}

                {paket.stats.length > 0 && (
                  <dl className="mt-6">
                    {paket.stats.map((stat, i) => (
                      <div
                        key={`${stat.label}-${i}`}
                        className="flex items-baseline justify-between gap-4 border-t border-border py-3 last:border-b"
                      >
                        <dt className="text-xs text-muted-foreground">
                          {stat.label}
                        </dt>
                        <dd className="stat-mono text-sm text-foreground">
                          {stat.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}

                <ul className="mt-6 grid gap-2.5">
                  {paket.includes.map((item, i) => (
                    <li
                      key={`${item}-${i}`}
                      className="flex items-start gap-3 text-sm leading-relaxed text-foreground/85"
                    >
                      <DotBullet />
                      {item}
                    </li>
                  ))}
                </ul>

                {paket.options.length > 0 && (
                  <div className="mt-5">
                    <p className="eyebrow">{t("optionsLabel")}</p>
                    <ul className="mt-3 grid gap-2.5">
                      {paket.options.map((item, i) => (
                        <li
                          key={`${item}-${i}`}
                          className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                        >
                          <DotBullet />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-auto pt-7">
                  <p className="eyebrow">{t("guidePriceLabel")}</p>
                  <p className="stat-mono mt-2 text-2xl text-foreground">
                    {paket.price}
                  </p>
                  <Link
                    href="/solarrechner"
                    className={`${paket.featured ? "btn-primary" : "btn-secondary"} mt-5 w-full`}
                  >
                    {t("calculateQuote")}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Gewerbe & Landwirtschaft */}
      <section aria-labelledby="gewerbe-h" className="py-14 sm:py-20">
        <div className="container-page">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <p className="eyebrow">{t("commercial.eyebrow")}</p>
              <h2
                id="gewerbe-h"
                className="mt-3 text-balance text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl"
              >
                {t("commercial.title")}
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-lg">
                {t("commercial.lead")}
              </p>
            </div>
            <div className="neu p-6 sm:p-7">
              <dl>
                <div className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="text-xs text-muted-foreground">
                    {t("commercial.sizeLabel")}
                  </dt>
                  <dd className="stat-mono text-sm text-foreground">
                    {t("commercial.sizeValue")}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-t border-border py-3">
                  <dt className="text-xs text-muted-foreground">
                    {t("commercial.designLabel")}
                  </dt>
                  <dd className="text-sm font-medium text-foreground">
                    {t("commercial.designValue")}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-t border-border py-3">
                  <dt className="text-xs text-muted-foreground">
                    {t("commercial.priceLabel")}
                  </dt>
                  <dd className="text-sm font-medium text-foreground">
                    {t("commercial.priceValue")}
                  </dd>
                </div>
              </dl>
              <Link href="/kontakt" className="btn-primary mt-6 w-full">
                {t("commercial.cta")}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Optionen */}
      <section aria-labelledby="optionen-h" className="py-14 sm:py-20">
        <div className="container-page">
          <SectionTitle id="optionen-h" title={t("options.title")} />
          <div className="mt-10 grid gap-4">
            {optionen.map((option) => (
              <div
                key={option.title}
                className="neu-sm grid gap-2 px-5 py-4 sm:grid-cols-[200px_180px_1fr] sm:items-baseline sm:gap-8 sm:px-6 sm:py-5"
              >
                <h3 className="text-base font-semibold text-foreground">
                  {option.title}
                </h3>
                <p className="stat-mono text-lg text-foreground">
                  {option.value}
                </p>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {option.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hinweise */}
      <section aria-labelledby="hinweise-h" className="py-14 sm:py-20">
        <div className="container-page">
          <div className="neu-in max-w-3xl p-6 sm:p-7">
            <h2
              id="hinweise-h"
              className="text-2xl font-bold leading-tight text-foreground"
            >
              {t("notes.title")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
              {t("notes.text")}
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title={t("ctaBand.title")}
        description={t("ctaBand.description")}
        primaryHref="/solarrechner"
        primaryLabel={t("ctaBand.primaryLabel")}
        secondaryHref="/kontakt"
        secondaryLabel={t("ctaBand.secondaryLabel")}
      />
    </>
  );
}
