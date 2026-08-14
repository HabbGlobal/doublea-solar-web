import { cn } from "@/lib/utils";

type SectionHeadProps = {
  /** Laufende Sektionsnummer, z.B. "02". Einziges Nummern-Ornament der Seite. */
  nr: string;
  /** Kurzes Mono-Label rechts, z.B. "Leistungen". */
  label: string;
  className?: string;
};

/**
 * Werkplan-Sektionskopf: vollbreite Hairline, darunter Mono-Nummer links und
 * Mono-Sektionstitel rechts. Wird von JEDER Sektion als Auftakt verwendet —
 * das einheitliche, einzige Ordnungs-Ornament des Designsystems.
 */
export function SectionHead({ nr, label, className }: SectionHeadProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("border-t border-border", className)}
    >
      <div className="container-page flex min-h-10 items-center justify-between">
        <span className="eyebrow">{nr}</span>
        <span className="eyebrow">{label}</span>
      </div>
    </div>
  );
}

type SectionTitleProps = {
  /** H2-Text der Sektion. */
  title: string;
  /** Optionaler Einleitungsabsatz unter der H2. */
  lead?: string;
  id?: string;
  className?: string;
  /** Auf dunklen (Graphit-)Sektionen true setzen. */
  onDark?: boolean;
};

/** Einheitlicher H2-Block: grosse ruhige Headline + optionaler Lead. */
export function SectionTitle({
  title,
  lead,
  id,
  className,
  onDark = false,
}: SectionTitleProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <h2
        id={id}
        className={cn(
          "text-3xl font-semibold leading-tight tracking-tight sm:text-4xl",
          onDark ? "text-[color:#f2f2ee]" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={cn(
            "mt-4 max-w-xl text-[15px] leading-relaxed sm:text-base",
            onDark ? "text-[color:#a9aba3]" : "text-muted-foreground",
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
