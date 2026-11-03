import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { SectionTitle } from "@/components/site/section-head";
import { Link } from "@/i18n/navigation";

/** Anker-Ziele unter /services — Reihenfolge = home.services.items. */
const serviceIds = [
  "standortanalyse",
  "planung",
  "foerderung",
  "installation",
  "batterie",
  "monitoring",
] as const;

/**
 * Leistungen: sechs weich erhabene Karten im Dreier-Raster — Goldpunkt,
 * Titel, ein Satz. Jede Karte führt auf den passenden Abschnitt unter
 * /services.
 */
export async function ServicesSection() {
  const t = await getTranslations("home.services");
  const items = t.raw("items") as { title: string; description: string }[];
  const services = serviceIds.map((id, i) => ({ id, ...items[i] }));

  return (
    <section
      id="leistungen"
      aria-labelledby="leistungen-titel"
      className="py-14 sm:py-20"
    >
      <div className="container-page">
        <SectionTitle
          id="leistungen-titel"
          title={t("title")}
          lead={t("lead")}
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.id}
              href={{ pathname: "/services", hash: s.id }}
              className="neu ring-focus block p-6 transition-transform duration-150 hover:-translate-y-px sm:p-7"
            >
              <span className="gold-dot mb-4" aria-hidden="true" />
              <h3 className="text-[17px] font-semibold leading-snug text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                {s.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <Link href="/services" className="btn-ghost min-h-11">
            {t("all")}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
