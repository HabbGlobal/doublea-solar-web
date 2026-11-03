import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { CtaBand } from "@/components/site/cta-band";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { localizedAlternates } from "@/i18n/seo";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: localizedAlternates("/services", locale),
  };
}

/**
 * Anchor-IDs — werden von Startseite und Footer verlinkt, nicht ändern.
 * Die Texte dazu liegen unter services.items.<id> in messages/<locale>/services.json.
 */
const SERVICE_IDS = [
  "standortanalyse",
  "planung",
  "foerderung",
  "installation",
  "batterie",
  "monitoring",
] as const;

type ServiceId = (typeof SERVICE_IDS)[number];

type Service = {
  id: ServiceId;
  kicker: string;
  navLabel: string;
  title: string;
  summary: string;
  benefit: string;
  deliverables: string[];
  note?: string;
  ctaLabel: string;
};

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");

  const services: Service[] = SERVICE_IDS.map((id) => {
    /* Leer = kein Hinweis; roh gelesen, damit ein Leerstring nie durch den Formatter geht. */
    const note = t.raw(`items.${id}.note`) as string;
    return {
      id,
      kicker: t(`items.${id}.kicker`),
      navLabel: t(`items.${id}.navLabel`),
      title: t(`items.${id}.title`),
      summary: t(`items.${id}.summary`),
      benefit: t(`items.${id}.benefit`),
      deliverables: t.raw(`items.${id}.deliverables`) as string[],
      note: note.trim() ? note : undefined,
      ctaLabel: t(`items.${id}.ctaLabel`),
    };
  });

  return (
    <>
      {/* Intro */}
      <section
        aria-labelledby="services-h"
        className="container-page pt-14 pb-4 sm:pt-20 sm:pb-6"
      >
        <div className="max-w-3xl">
          <p className="eyebrow">{t("intro.eyebrow")}</p>
          <h1
            id="services-h"
            className="mt-4 text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl"
          >
            {t("intro.title")}
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-lg">
            {t("intro.lead")}
          </p>
        </div>

        {/* Sprungnavigation als weiche Pill-Reihe */}
        <nav aria-label={t("jumpNav")} className="mt-10">
          <ul className="flex flex-wrap gap-3">
            {services.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="neu-sm ring-focus inline-flex min-h-11 items-center rounded-full px-4 text-sm font-medium text-foreground transition-[transform,box-shadow] duration-150 hover:-translate-y-px active:translate-y-0 active:shadow-[var(--neu-inset)]"
                >
                  {s.navLabel}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      {/* Sechs Leistungskarten */}
      <section aria-label={t("detailSection")} className="py-14 sm:py-20">
        <div className="container-page">
          <div className="grid gap-6 lg:grid-cols-2">
            {services.map((s) => (
              <article
                key={s.id}
                id={s.id}
                aria-labelledby={`${s.id}-h`}
                className="neu flex scroll-mt-28 flex-col p-6 sm:p-7"
              >
                <p className="eyebrow">{s.kicker}</p>
                <h2
                  id={`${s.id}-h`}
                  className="mt-3 text-balance text-2xl font-bold leading-tight text-foreground sm:text-3xl"
                >
                  {s.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {s.summary}
                </p>

                <div className="neu-in mt-6 rounded-2xl p-4">
                  <p className="eyebrow">{t("benefitLabel")}</p>
                  <p className="mt-1.5 text-[15px] font-medium leading-relaxed text-foreground">
                    {s.benefit}
                  </p>
                </div>

                <p className="eyebrow mt-7">{t("deliverablesLabel")}</p>
                <ul className="mt-4 grid gap-3">
                  {s.deliverables.map((d) => (
                    <li
                      key={d}
                      className="flex items-start gap-3 text-sm leading-relaxed text-foreground/85 sm:text-[15px]"
                    >
                      <span
                        aria-hidden
                        className="gold-dot mt-2 size-2! shrink-0"
                      />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>

                {s.note && (
                  <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                    {s.note}
                  </p>
                )}

                <div className="mt-auto pt-7">
                  <Link
                    href="/kontakt"
                    className="btn-ghost min-h-12"
                    aria-label={t("ctaAria", { label: s.ctaLabel })}
                  >
                    {s.ctaLabel}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={t("ctaBand.title")}
        description={t("ctaBand.description")}
        primaryHref="/kontakt"
        primaryLabel={t("ctaBand.primaryLabel")}
        secondaryHref="/solarrechner"
        secondaryLabel={t("ctaBand.secondaryLabel")}
      />
    </>
  );
}
