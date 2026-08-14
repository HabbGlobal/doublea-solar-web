import { SectionHead } from "@/components/site/section-head";

/**
 * Haltung-Band: ruhige Sandfläche mit einem einzigen, ehrlichen Statement.
 * Ersetzt die frühere Icon-Trustleiste (Karten/Icons sind im Werkplan-System
 * abgeschafft).
 */
export function TrustSection() {
  return (
    <section aria-label="Haltung" className="surface-sand">
      <SectionHead nr="02" label="Haltung" className="border-b-0" />
      <div className="container-page py-12 sm:py-16">
        <div className="grid gap-6 lg:grid-cols-[140px_1fr]">
          <span aria-hidden="true" className="eyebrow hidden lg:block">
            Haltung
          </span>
          <p className="max-w-3xl text-xl font-medium leading-relaxed sm:text-2xl">
            DoubleA Solutions GmbH ist ein junges Schweizer Unternehmen,
            gegründet 2025. Deshalb arbeiten wir mit offenen Zahlen: Was wir
            ausweisen, ist belegt oder als Richtwert gekennzeichnet — und
            Referenzobjekte zeigen wir persönlich, mit realen Eckdaten.
          </p>
        </div>
      </div>
    </section>
  );
}
