import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { ContactForm } from "@/components/forms/contact-form";
import type { Locale } from "@/i18n/routing";
import { localizedAlternates } from "@/i18n/seo";
import { siteConfig } from "@/lib/site-config";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "kontakt.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: localizedAlternates("/kontakt", locale),
  };
}

const linkClass =
  "btn-ghost min-h-11 rounded-md break-words";

export default async function KontaktPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("kontakt");
  const { contact } = siteConfig;

  return (
    <section aria-labelledby="kontakt-h" className="py-14 sm:py-20 lg:pt-24">
      <div className="container-page">
        {/* Intro */}
        <div className="max-w-2xl">
          <p className="eyebrow">{t("intro.eyebrow")}</p>
          <h1
            id="kontakt-h"
            className="mt-4 text-balance text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.6rem]"
          >
            {t("intro.title")}
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            {t("intro.text")}
          </p>
        </div>

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
          {/* Kontaktzeilen — Label + Wert */}
          <div className="neu p-6 sm:p-7">
            <dl className="space-y-6">
              <div>
                <dt className="eyebrow">{t("labels.address")}</dt>
                <dd className="mt-1.5 text-[15px] leading-relaxed text-foreground">
                  {contact.address.street}
                  <br />
                  {contact.address.postalCode} {contact.address.city}
                  <br />
                  {t("address.country")}
                </dd>
              </div>
              <div>
                <dt className="eyebrow">{t("labels.phone")}</dt>
                <dd className="mt-0.5">
                  <a href={contact.phoneHref} className={linkClass}>
                    {contact.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow">{t("labels.email")}</dt>
                <dd className="mt-0.5 min-w-0">
                  <a href={`mailto:${contact.email}`} className={linkClass}>
                    {contact.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow">{t("labels.openingHours")}</dt>
                <dd className="mt-1.5 text-[15px] leading-relaxed text-foreground">
                  {t("openingHours.weekdays")}
                  <br />
                  {t("openingHours.saturday")}
                </dd>
              </div>
            </dl>
          </div>

          {/* Anfrageformular */}
          <div className="neu p-6 sm:p-8">
            <p className="eyebrow">{t("form.eyebrow")}</p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-foreground sm:text-3xl">
              {t("form.title")}
            </h2>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
