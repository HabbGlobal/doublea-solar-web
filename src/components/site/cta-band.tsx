import Link from "next/link";

type CtaBandProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

/**
 * Abschluss-Karte am Seitenende: weich erhabene Fläche, Titel, ein Satz,
 * goldene Aktion + sanfte Zweitaktion. Props-API bleibt stabil.
 */
export function CtaBand({
  eyebrow,
  title,
  description,
  primaryHref = "/angebote",
  primaryLabel = "Angebot einholen",
  secondaryHref = "/solarrechner",
  secondaryLabel = "Solarpotenzial berechnen",
}: CtaBandProps) {
  return (
    <section aria-label={title} className="mt-16 sm:mt-24">
      <div className="container-page">
        <div className="neu grid items-center gap-8 px-6 py-10 sm:px-10 sm:py-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h2 className="mt-2 text-balance text-3xl font-bold leading-tight text-foreground sm:text-4xl">
              {title}
            </h2>
            {description && (
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                {description}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
            <Link href={primaryHref} className="btn-primary w-full sm:w-auto">
              {primaryLabel}
            </Link>
            <Link href={secondaryHref} className="btn-secondary w-full sm:w-auto">
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
