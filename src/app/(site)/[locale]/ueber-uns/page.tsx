import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { TeamSection } from "@/components/sections/team-section";
import { CtaBand } from "@/components/site/cta-band";
import { SectionTitle } from "@/components/site/section-head";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { localizedAlternates } from "@/i18n/seo";
import { siteConfig } from "@/lib/site-config";
import { localizeTeam } from "@/lib/data/i18n";
import { getPublishedTeamMembers, teamImageUrl } from "@/lib/data/team";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ueberUns.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: localizedAlternates("/ueber-uns", locale),
  };
}

/* ————————————————————————————————————————————————
   Seite
   ———————————————————————————————————————————————— */

export default async function UeberUnsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ueberUns");

  const facts = t.raw("facts") as { value: string; label: string }[];
  const workingPrinciples = t.raw("working.principles") as {
    title: string;
    text: string;
  }[];
  const qualityPromises = t.raw("quality.promises") as string[];

  // Sobald Porträts erfasst sind, zeigt der Intro-Bereich echte Gesichter
  // statt des eingelassenen Platzhalters.
  const team = await localizeTeam(await getPublishedTeamMembers(), locale);
  const koepfe = team
    .map((m) => ({ ...m, url: teamImageUrl(m.imagePath) }))
    .filter((m) => m.url)
    .slice(0, 2);
  return (
    <>
      {/* Intro — H1, Haltung, Faktenkacheln; rechts die Gründer */}
      <section
        aria-labelledby="ueber-uns-h"
        className="py-14 sm:py-20 lg:pt-24"
      >
        <div className="container-page">
          <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.85fr] lg:gap-16">
            <div>
              <p className="eyebrow">{t("intro.eyebrow")}</p>
              <h1
                id="ueber-uns-h"
                className="mt-4 text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.6rem]"
              >
                {t("intro.title")}
              </h1>
              <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                {t("intro.text1", {
                  legalName: siteConfig.legalName,
                  founded: siteConfig.founded,
                })}
              </p>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                {t("intro.text2")}
              </p>

              {/* Faktenkacheln — ehrliche Kennzahlen als kleine erhabene Elemente */}
              <dl className="mt-10 grid gap-4 sm:grid-cols-3">
                {facts.map((f) => (
                  <div
                    key={f.label}
                    className="neu-sm flex flex-col-reverse p-5"
                  >
                    <dt className="mt-1.5 text-sm leading-snug text-muted-foreground">
                      {f.label}
                    </dt>
                    <dd className="stat-mono text-2xl text-foreground">
                      {f.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Gründer-Porträts, sobald erfasst — sonst eingelassener Platzhalter */}
            {koepfe.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {koepfe.map((m) => (
                  <figure key={m.id} className="neu m-0 p-4">
                    <div className="neu-photo">
                      <div className="relative aspect-[3/4]">
                        <Image
                          src={m.url as string}
                          alt={`${m.name}, ${m.role}`}
                          fill
                          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 40vw, 260px"
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <figcaption className="mt-4 px-1">
                      <p className="text-[15px] font-semibold leading-snug text-foreground">
                        {m.name}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {m.role}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <div className="neu-in flex aspect-[4/3] items-center justify-center">
                <span className="eyebrow">{t("intro.photoPending")}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Arbeitsweise — Karten-Grid */}
      <section aria-labelledby="arbeitsweise-h" className="py-14 sm:py-20">
        <div className="container-page">
          <SectionTitle id="arbeitsweise-h" title={t("working.title")} />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {workingPrinciples.map((p) => (
              <article key={p.title} className="neu p-6 sm:p-7">
                <span aria-hidden className="gold-dot mb-4" />
                <h3 className="text-lg font-semibold text-foreground">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                  {p.text}
                </p>
              </article>
            ))}
          </div>
          <Link href="/services" className="btn-ghost mt-8 min-h-12">
            {t("working.allServices")}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>

      {/* Qualitätsversprechen — helle Karte mit Goldpunkt-Liste */}
      <section aria-labelledby="qualitaet-h" className="py-14 sm:py-20">
        <div className="container-page">
          <div className="neu p-6 sm:p-10">
            <SectionTitle id="qualitaet-h" title={t("quality.title")} />
            <ul className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2">
              {qualityPromises.map((q) => (
                <li key={q} className="flex items-start gap-3">
                  <span aria-hidden className="gold-dot mt-1.5 shrink-0" />
                  <p className="text-sm leading-relaxed text-foreground sm:text-[15px]">
                    {q}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Team — rendert nichts, solange kein Team erfasst ist */}
      <TeamSection variant="full" nr="03" label="Team" />

      <CtaBand
        title={t("cta.title")}
        description={t("cta.description")}
        primaryHref="/solarrechner"
        primaryLabel={t("cta.primaryLabel")}
        secondaryHref="/kontakt"
        secondaryLabel={t("cta.secondaryLabel")}
      />
    </>
  );
}
