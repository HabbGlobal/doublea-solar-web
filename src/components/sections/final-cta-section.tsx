import { CtaBand } from "@/components/site/cta-band";

export function FinalCtaSection() {
  return (
    <CtaBand
      title="Sprechen wir über Ihr Dach."
      description="Senden Sie uns Ihre Eckdaten oder rufen Sie an."
      primaryHref="/angebote"
      primaryLabel="Angebot einholen"
      secondaryHref="/solarrechner"
      secondaryLabel="Solarpotenzial berechnen"
    />
  );
}
