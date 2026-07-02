import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
 * Dunkles Abschluss-Band am Seitenende: Anthrazit-Fläche mit Grain,
 * grosse Headline, Inverse-Buttons. Props-API wird von mehreren Seiten
 * genutzt und bleibt stabil.
 */
export function CtaBand({
  eyebrow = "Ihr nächster Schritt",
  title,
  description,
  primaryHref = "/solarrechner",
  primaryLabel = "Solarpotenzial berechnen",
  secondaryHref = "/kontakt",
  secondaryLabel = "Beratung anfragen",
}: CtaBandProps) {
  return (
    <section className="container-page my-16 sm:my-24">
      <div className="surface-navy grain-overlay relative overflow-hidden rounded-3xl px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
        <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.18em] text-white/60">
              <span
                aria-hidden
                className="size-1.5 rounded-full bg-[color:var(--solar-leaf)]"
              />
              {eyebrow}
            </span>
            <h2 className="mt-5 text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-[44px]">
              {title}
            </h2>
            {description && (
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/70">
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
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href={secondaryHref}
              className="btn-secondary-inverse w-full sm:w-auto"
            >
              {secondaryLabel}
            </Link>
            <p className="mt-1 text-xs text-white/50 lg:text-right">
              Kostenfrei und unverbindlich · Antwort innert eines Werktags
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
