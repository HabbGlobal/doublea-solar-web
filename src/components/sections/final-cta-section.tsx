import { CtaBand } from "@/components/site/cta-band";

export function FinalCtaSection() {
  return (
    <CtaBand
      title="Sprechen wir über Ihr Dach."
      description="Senden Sie uns Ihre Eckdaten oder rufen Sie an — wir antworten persönlich, nicht mit Textbausteinen."
      primaryHref="/angebote"
      primaryLabel="Projekt unverbindlich prüfen"
      secondaryHref="/solarrechner"
      secondaryLabel="Solarpotenzial berechnen"
    />
  );
}
