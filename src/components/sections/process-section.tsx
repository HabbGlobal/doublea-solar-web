import { getTranslations } from "next-intl/server";

import { SectionTitle } from "@/components/site/section-head";

/**
 * Ablauf: fünf Schritte auf der hellen Grundfläche. Die Zahl sitzt in
 * einem weich erhabenen Kreis; ab Desktop fünf Spalten, darunter zwei,
 * mobil eine (Zahl links, Text rechts).
 */
export async function ProcessSection() {
  const t = await getTranslations("home.process");
  const steps = (t.raw("steps") as { title: string; description: string }[]).map(
    (s, i) => ({ nr: String(i + 1), ...s }),
  );

  return (
    <section
      id="prozess"
      aria-labelledby="prozess-titel"
      className="py-14 sm:py-20"
    >
      <div className="container-page">
        <SectionTitle id="prozess-titel" title={t("title")} />

        <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {steps.map((s) => (
            <li
              key={s.nr}
              className="flex items-start gap-4 lg:flex-col lg:items-center lg:text-center"
            >
              <span
                aria-hidden="true"
                className="neu-sm flex size-16 shrink-0 items-center justify-center rounded-full text-xl font-bold text-[color:var(--solar-gold-dark)]"
              >
                {s.nr}
              </span>
              <div className="pt-2 lg:pt-1">
                <h3 className="text-[17px] font-semibold leading-snug text-foreground">
                  <span className="sr-only">{t("stepLabel", { nr: s.nr })}</span>
                  {s.title}
                </h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-10 text-sm text-muted-foreground">{t("note")}</p>
      </div>
    </section>
  );
}
