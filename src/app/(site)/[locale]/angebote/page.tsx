import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { LeadForm } from "@/components/forms/lead-form";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { localizedAlternates } from "@/i18n/seo";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "angebote.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: localizedAlternates("/angebote", locale),
  };
}

export default async function AngebotePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("angebote");
  const inclusions = t.raw("inclusions.items") as string[];

  return (
    <section aria-labelledby="angebot-h" className="py-14 sm:py-20 lg:pt-24">
      <div className="container-page">
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
          {/* Was das Angebot umfasst */}
          <div>
            <p className="eyebrow">{t("intro.eyebrow")}</p>
            <h1
              id="angebot-h"
              className="mt-4 text-balance text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl"
            >
              {t("intro.title")}
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              {t("intro.text")}
            </p>

            <div className="neu mt-8 p-6 sm:p-7">
              <h2 className="text-base font-semibold tracking-tight text-foreground">
                {t("inclusions.title")}
              </h2>
              <ul className="mt-4 space-y-3">
                {inclusions.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-foreground sm:text-[15px]"
                  >
                    <span aria-hidden className="gold-dot mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Rechner-Cross-Sell */}
            <div className="mt-8">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t("calculator.text")}
              </p>
              <Link href="/solarrechner" className="btn-ghost mt-3 min-h-12">
                {t("calculator.link")}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Formular */}
          <div className="neu p-6 sm:p-8">
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              {t("form.title")}
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {t("form.text")}
            </p>
            <div className="mt-6">
              <LeadForm source="angebote" requireFullDetails />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
