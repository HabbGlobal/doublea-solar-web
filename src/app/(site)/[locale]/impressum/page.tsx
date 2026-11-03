import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import { localizedAlternates } from "@/i18n/seo";
import { siteConfig } from "@/lib/site-config";

type PageProps = { params: Promise<{ locale: Locale }> };

type LegalSection = { heading: string; paragraphs: string[] };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.impressum.meta" });
  return {
    title: t("title"),
    description: t("description"),
    robots: { index: true, follow: false },
    alternates: localizedAlternates("/impressum", locale),
  };
}

/* Textspalte (70ch) in einer erhabenen Karte: h2 mit Abstand statt Hairline,
   Body in muted-foreground. */

const h2Class =
  "mt-10 text-lg font-semibold tracking-tight text-foreground sm:text-xl";
const bodyClass =
  "mt-3 text-[15px] leading-relaxed text-muted-foreground sm:text-base";
const linkClass =
  "ring-focus rounded-md font-medium text-foreground underline decoration-[color:var(--solar-gold)] decoration-2 underline-offset-4 transition-colors hover:text-[color:var(--solar-gold-dark)]";

export default async function ImpressumPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tLegal = await getTranslations("legal");
  const t = await getTranslations("legal.impressum");
  const { contact, legalName } = siteConfig;
  const notice = tLegal("convenienceNotice");
  const sections = t.raw("sections") as LegalSection[];

  return (
    <article className="py-14 sm:py-20">
      <div className="container-page">
        <div className="neu max-w-[70ch] p-7 sm:p-10">
          <header>
            <p className="eyebrow">{t("eyebrow")}</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
              {t("title")}
            </h1>
            <p className="eyebrow mt-4">{t("updated")}</p>
          </header>

          <div className="mt-2">
            {notice ? <p className={bodyClass}>{notice}</p> : null}

            <section>
              <h2 className={h2Class}>{t("provider.heading")}</h2>
              <p className={bodyClass}>
                {legalName}
                <br />
                {contact.address.street}
                <br />
                {contact.address.postalCode} {contact.address.city}
                <br />
                {t("provider.country")}
              </p>
            </section>

            <section>
              <h2 className={h2Class}>{t("contact.heading")}</h2>
              <p className={bodyClass}>
                {t("contact.phoneLabel")}{" "}
                <a className={linkClass} href={contact.phoneHref}>
                  {contact.phone}
                </a>
                <br />
                {t("contact.emailLabel")}{" "}
                <a className={linkClass} href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              </p>
            </section>

            <section>
              <h2 className={h2Class}>{t("register.heading")}</h2>
              <p className={bodyClass}>
                {t("register.text", { canton: contact.address.canton })}
              </p>
            </section>

            <section>
              <h2 className={h2Class}>{t("responsible.heading")}</h2>
              <p className={bodyClass}>{t("responsible.text", { legalName })}</p>
            </section>

            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className={h2Class}>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className={bodyClass}>
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
