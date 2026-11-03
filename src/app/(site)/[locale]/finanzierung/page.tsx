import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { CtaBand } from "@/components/site/cta-band";
import { SectionTitle } from "@/components/site/section-head";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { localizedAlternates } from "@/i18n/seo";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "finanzierung.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: localizedAlternates("/finanzierung", locale),
  };
}

/* ————————————————————————————————————————————————
   Inhaltstypen — die Texte liegen in messages/<locale>/finanzierung.json
   ———————————————————————————————————————————————— */

/** Belegte Kennzahlen mit Quelle und Stand — geprüft am 14. August 2026. */
type Fact = {
  kennzahl: string;
  wert: string;
  quelle: string;
  stand: string;
};

type FundingItem = { title: string; text: string };

type FinancingPath = { title: string; lead: string; points: string[] };

/* Goldpunkt als Listenmarker */
function DotBullet() {
  return <span aria-hidden className="gold-dot mt-2 size-2! shrink-0" />;
}

/* ————————————————————————————————————————————————
   Seite
   ———————————————————————————————————————————————— */

export default async function FinanzierungPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("finanzierung");

  const facts = t.raw("facts.items") as Fact[];
  const fundingItems = t.raw("funding.items") as FundingItem[];
  const financingPaths = t.raw("paths.items") as FinancingPath[];
  const economics = t.raw("economics.items") as string[];

  return (
    <>
      {/* Intro */}
      <section
        aria-labelledby="finanzierung-h"
        className="container-page pt-14 pb-4 sm:pt-20 sm:pb-6"
      >
        <div className="max-w-3xl">
          <p className="eyebrow">{t("intro.eyebrow")}</p>
          <h1
            id="finanzierung-h"
            className="mt-4 text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl"
          >
            {t("intro.title")}
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-lg">
            {t("intro.lead")}
          </p>
        </div>
      </section>

      {/* Investition & Richtpreise — belegte Kennzahlen */}
      <section aria-labelledby="fakten-h" className="py-14 sm:py-20">
        <div className="container-page">
          <SectionTitle
            id="fakten-h"
            title={t("facts.title")}
            lead={t("facts.lead")}
          />

          <div className="neu mt-10 p-6 sm:p-7">
            {/* Desktop: echte Tabelle */}
            <table className="hidden w-full border-collapse text-sm sm:table">
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="eyebrow pb-3 pr-6 text-left">
                    {t("facts.columns.kennzahl")}
                  </th>
                  <th scope="col" className="eyebrow pb-3 pr-6 text-left">
                    {t("facts.columns.wert")}
                  </th>
                  <th scope="col" className="eyebrow pb-3 pr-6 text-left">
                    {t("facts.columns.quelle")}
                  </th>
                  <th scope="col" className="eyebrow pb-3 text-left">
                    {t("facts.columns.stand")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {facts.map((f) => (
                  <tr
                    key={f.kennzahl}
                    className="border-b border-border last:border-b-0"
                  >
                    <td className="max-w-[26ch] py-4 pr-6 align-top font-medium text-foreground">
                      {f.kennzahl}
                    </td>
                    <td className="stat-mono max-w-[38ch] py-4 pr-6 align-top text-foreground">
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
            <dl className="sm:hidden">
              {facts.map((f) => (
                <div
                  key={f.kennzahl}
                  className="border-t border-border py-5 first:border-t-0 first:pt-0 last:pb-0"
                >
                  <dt className="text-sm font-medium text-foreground">
                    {f.kennzahl}
                  </dt>
                  <dd className="stat-mono mt-2 text-sm leading-relaxed text-foreground">
                    {f.wert}
                  </dd>
                  <dd className="mt-2 text-xs text-muted-foreground">
                    {f.quelle} · {t("facts.asOf", { stand: f.stand })}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <p className="mt-5 max-w-3xl text-xs leading-relaxed text-muted-foreground">
            {t("facts.note")}
          </p>
        </div>
      </section>

      {/* Förderung & Steuern */}
      <section aria-labelledby="foerderungen-h" className="py-14 sm:py-20">
        <div className="container-page">
          <SectionTitle
            id="foerderungen-h"
            title={t("funding.title")}
            lead={t("funding.lead")}
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {fundingItems.map((f) => (
              <article key={f.title} className="neu p-6 sm:p-7">
                <span aria-hidden className="gold-dot" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Finanzierungswege */}
      <section aria-labelledby="finanzierungswege-h" className="py-14 sm:py-20">
        <div className="container-page">
          <SectionTitle
            id="finanzierungswege-h"
            title={t("paths.title")}
            lead={t("paths.lead")}
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {financingPaths.map((path) => (
              <article key={path.title} className="neu p-6 sm:p-7">
                <h3 className="text-xl font-semibold text-foreground">
                  {path.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {path.lead}
                </p>
                <ul className="mt-5 grid gap-3">
                  {path.points.map((p) => (
                    <li
                      key={p}
                      className="flex gap-3 text-sm leading-relaxed text-foreground/85"
                    >
                      <DotBullet />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <p className="mt-6 max-w-3xl text-xs leading-relaxed text-muted-foreground">
            {t("paths.disclaimer")}
          </p>
        </div>
      </section>

      {/* Wirtschaftlichkeit */}
      <section aria-labelledby="wirtschaftlichkeit-h" className="py-14 sm:py-20">
        <div className="container-page">
          <SectionTitle
            id="wirtschaftlichkeit-h"
            title={t("economics.title")}
            lead={t("economics.lead")}
          />
          <div className="neu mt-10 max-w-3xl p-6 sm:p-7">
            <ul className="grid gap-4">
              {economics.map((n) => (
                <li
                  key={n}
                  className="flex gap-3 text-sm leading-relaxed text-foreground/85 sm:text-[15px]"
                >
                  <DotBullet />
                  {n}
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <Link href="/kontakt" className="btn-ghost min-h-12">
                {t("economics.cta")}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title={t("ctaBand.title")}
        description={t("ctaBand.description")}
        primaryHref="/angebote"
        primaryLabel={t("ctaBand.primaryLabel")}
        secondaryHref="/solarrechner"
        secondaryLabel={t("ctaBand.secondaryLabel")}
      />
    </>
  );
}
