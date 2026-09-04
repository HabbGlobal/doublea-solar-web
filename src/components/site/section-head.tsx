import { cn } from "@/lib/utils";

type SectionHeadProps = {
  /** Historisch: Sektionsnummer — im Soft-Solar-System nicht mehr sichtbar. */
  nr?: string;
  /** Historisch: Mono-Label — nicht mehr sichtbar. */
  label?: string;
  className?: string;
};

/**
 * Historischer Sektionskopf des Werkplan-Systems. Im Soft-Solar-System gibt
 * es keine Nummern-Ornamente mehr; die Komponente bleibt als leerer Anker
 * bestehen, damit bestehende Aufrufe nicht angepasst werden müssen.
 */
export function SectionHead(props: SectionHeadProps) {
  void props; // Props nur für API-Kompatibilität
  return null;
}

type SectionTitleProps = {
  title: string;
  lead?: string;
  id?: string;
  className?: string;
  /** Historisch — es gibt keine dunklen Sektionen mehr. */
  onDark?: boolean;
};

/** Einheitlicher H2-Block: klare Headline + optionaler Einleitungssatz. */
export function SectionTitle({ title, lead, id, className }: SectionTitleProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <h2
        id={id}
        className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl"
      >
        {title}
      </h2>
      {lead && (
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-lg">
          {lead}
        </p>
      )}
    </div>
  );
}
