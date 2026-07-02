import { CtaBand } from "@/components/site/cta-band";

export function FinalCtaSection() {
  return (
    <CtaBand
      eyebrow="Kostenfrei und unverbindlich"
      title="In 60 Sekunden zur Erstauswertung."
      description="Berechnen Sie das Solarpotenzial Ihres Dachs – oder vereinbaren Sie direkt ein Beratungsgespräch. Antwort innert eines Werktags, persönliche Beratung in Deutsch und Schweizerdeutsch."
      primaryHref="/solarrechner"
      primaryLabel="Solarpotenzial berechnen"
      secondaryHref="/kontakt"
      secondaryLabel="Beratungsgespräch vereinbaren"
    />
  );
}
