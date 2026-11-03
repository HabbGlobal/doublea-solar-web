import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import type { AppPathname } from "@/i18n/routing";

type CtaBandProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryHref?: AppPathname;
  primaryLabel?: string;
  secondaryHref?: AppPathname;
  secondaryLabel?: string;
};

/**
 * Abschluss-Karte am Seitenende: weich erhabene Fläche, Titel, ein Satz,
 * goldene Aktion + sanfte Zweitaktion. Ohne Props kommen alle Texte aus
 * common.ctaBand (zweisprachig); Props überschreiben einzeln.
 */
export async function CtaBand({
  eyebrow,
  title,
  description,
  primaryHref = "/angebote",
  primaryLabel,
  secondaryHref = "/solarrechner",
  secondaryLabel,
}: CtaBandProps) {
  const t = await getTranslations("common");
  const heading = title ?? t("ctaBand.title");
  return (
    <section aria-label={heading} className="mt-16 sm:mt-24">
      <div className="container-page">
        <div className="neu grid items-center gap-8 px-6 py-10 sm:px-10 sm:py-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h2 className="mt-2 text-balance text-3xl font-bold leading-tight text-foreground sm:text-4xl">
              {heading}
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              {description ?? t("ctaBand.text")}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
            <Link href={primaryHref} className="btn-primary w-full sm:w-auto">
              {primaryLabel ?? t("cta.primary")}
            </Link>
            <Link href={secondaryHref} className="btn-secondary w-full sm:w-auto">
              {secondaryLabel ?? t("cta.secondary")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
