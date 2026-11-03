import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import { localizedAlternates } from "@/i18n/seo";
import { siteConfig } from "@/lib/site-config";

type PageProps = { params: Promise<{ locale: Locale }> };

type LegalSection = { heading: string; paragraphs: string[]; items: string[] };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.datenschutz.meta" });
  return {
    title: t("title"),
    description: t("description"),
    robots: { index: true, follow: false },
    alternates: localizedAlternates("/datenschutz", locale),
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

export default async function DatenschutzPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tLegal = await getTranslations("legal");
  const t = await getTranslations("legal.datenschutz");
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
              <h2 className={h2Class}>{t("controller.heading")}</h2>
              <p className={bodyClass}>
                {legalName}
                <br />
                {contact.address.street}, {contact.address.postalCode}{" "}
                {contact.address.city}
                <br />
                {t("controller.emailLabel")}{" "}
                <a className={linkClass} href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              </p>
            </section>

            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className={h2Class}>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className={bodyClass}>
                    {paragraph}
                  </p>
                ))}
                {section.items.length > 0 ? (
                  <ul className="mt-3 space-y-2.5 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span aria-hidden className="gold-dot mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            <section>
              <h2 className={h2Class}>{t("rights.heading")}</h2>
              <p className={bodyClass}>
                {t.rich("rights.text", {
                  email: contact.email,
                  link: (chunks) => (
                    <a className={linkClass} href={`mailto:${contact.email}`}>
                      {chunks}
                    </a>
                  ),
                })}
              </p>
            </section>

            <section>
              <h2 className={h2Class}>{t("changes.heading")}</h2>
              <p className={bodyClass}>{t("changes.text")}</p>
            </section>
          </div>
        </div>
      </div>
    </article>
  );
}
