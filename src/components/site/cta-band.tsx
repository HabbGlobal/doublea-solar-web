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
 * Abschluss-Band am Seitenende: vollbreite, matte Graphit-Fläche im
 * Werkplan-Stil — Mono-Label, grosse Headline, rechteckige Aktionen und
 * die Telefonnummer als grosse Mono-Zeile. Props-API bleibt stabil.
 */
export function CtaBand({
  eyebrow = "Ihr nächster Schritt",
  title,
  description,
  primaryHref = "/angebote",
  primaryLabel = "Angebot einholen",
  secondaryHref = "/solarrechner",
  secondaryLabel = "Solarpotenzial berechnen",
}: CtaBandProps) {
  return (
    <section
      aria-label={title}
      className="surface-navy mt-16 border-t border-[color:#3a3d3b] sm:mt-24"
    >
      <div className="container-page py-14 sm:py-20">
        <p className="eyebrow">{eyebrow}</p>
        <div className="mt-5 grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-balance text-3xl font-semibold leading-tight text-[color:#f2f2ee] sm:text-4xl">
              {title}
            </h2>
            {description && (
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[color:#a9aba3]">
                {description}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3 lg:items-end">
            <Link
              href={primaryHref}
              className="btn-primary-inverse w-full sm:w-auto"
            >
              {primaryLabel}
            </Link>
            <Link
              href={secondaryHref}
              className="btn-secondary-inverse w-full sm:w-auto"
            >
              {secondaryLabel}
            </Link>
            <p className="eyebrow mt-1 lg:text-right">
              Kostenfrei · Antwort innert eines Werktags
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
