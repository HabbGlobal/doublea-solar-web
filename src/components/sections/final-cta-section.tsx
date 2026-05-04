import { CtaBand } from "@/components/site/cta-band";

export function FinalCtaSection() {
  return (
    <CtaBand
      eyebrow="Kostenfrei und unverbindlich"
      title="Bereit für Ihre eigene Solaranlage?"
      description="In 60 Sekunden zur Erstauswertung – oder direkt persönliches Gespräch buchen. Wir melden uns innerhalb eines Werktags."
      primaryHref="/solarrechner"
      primaryLabel="Solarpotenzial berechnen"
      secondaryHref="/kontakt"
      secondaryLabel="Persönliche Beratung"
    />
  );
}
