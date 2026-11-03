import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { SolarCalculator } from "@/components/solar/solar-calculator";
import { CtaBand } from "@/components/site/cta-band";
import type { Locale } from "@/i18n/routing";
import { localizedAlternates } from "@/i18n/seo";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "solarrechner.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: localizedAlternates("/solarrechner", locale),
  };
}

export default async function SolarrechnerPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("solarrechner");

  return (
    <>
      <section aria-labelledby="solarrechner-h" className="pt-14 sm:pt-20 lg:pt-24">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="eyebrow">{t("intro.eyebrow")}</p>
            <h1
              id="solarrechner-h"
              className="mt-4 text-balance text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.6rem]"
            >
              {t("intro.title")}
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              {t("intro.text")}
            </p>
          </div>
        </div>
      </section>

      <section aria-label={t("calculatorLabel")} className="container-page pt-10 pb-14 sm:pb-20">
        <SolarCalculator />
      </section>

      <CtaBand
        eyebrow={t("cta.eyebrow")}
        title={t("cta.title")}
        description={t("cta.description")}
        primaryHref="/angebote"
        primaryLabel={t("cta.primaryLabel")}
        secondaryHref="/services"
        secondaryLabel={t("cta.secondaryLabel")}
      />
    </>
  );
}
