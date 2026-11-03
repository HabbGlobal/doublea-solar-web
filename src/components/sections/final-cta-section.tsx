import { getTranslations } from "next-intl/server";

import { CtaBand } from "@/components/site/cta-band";

/** Abschluss der Startseite — Aktionen kommen aus common.cta (CtaBand). */
export async function FinalCtaSection() {
  const t = await getTranslations("home.finalCta");
  return (
    <CtaBand
      title={t("title")}
      description={t("description")}
      primaryHref="/angebote"
      secondaryHref="/solarrechner"
    />
  );
}
