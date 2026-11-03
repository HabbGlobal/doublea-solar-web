import { getTranslations } from "next-intl/server";

import { SectionTitle } from "@/components/site/section-head";
import { Link } from "@/i18n/navigation";

/**
 * Solarrechner-Teaser: links Titel, ein Satz und die goldene Aktion;
 * rechts eine eingelassene Anzeige mit einer Beispielauswertung.
 */
export async function SolarCalculatorSection() {
  const t = await getTranslations("home.calcTeaser");
  const tc = await getTranslations("common");
  const sampleRows = t.raw("rows") as { label: string; value: string }[];

  return (
    <section
      id="rechner"
      aria-labelledby="rechner-titel"
      className="py-14 sm:py-20"
    >
      <div className="container-page">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <SectionTitle
              id="rechner-titel"
              title={t("title")}
              lead={t("lead")}
            />

            <div className="mt-8">
              <Link href="/solarrechner" className="btn-primary w-full sm:w-auto">
                {tc("cta.secondary")}
              </Link>
            </div>
          </div>

          <div className="neu-in p-6 sm:p-7">
            <p className="eyebrow">{t("example")}</p>
            <dl className="mt-3">
              {sampleRows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-x-6 border-t border-border py-3.5 first:border-t-0"
                >
                  <dt className="text-[15px] text-muted-foreground">
                    {row.label}
                  </dt>
                  <dd className="stat-mono text-[15px] text-foreground">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-sm text-muted-foreground">{t("note")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
