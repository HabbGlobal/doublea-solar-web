import { HeroSection } from "@/components/sections/hero-section";
import { TrustSection } from "@/components/sections/trust-section";
import { ServicesSection } from "@/components/sections/services-section";
import { ProcessSection } from "@/components/sections/process-section";
import { SolarCalculatorSection } from "@/components/sections/solar-calculator-section";
import { FinancingSection } from "@/components/sections/financing-section";
import { ProjectShowcase } from "@/components/sections/project-showcase";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustSection />
      <ServicesSection />
      <SolarCalculatorSection />
      <ProcessSection />
      <FinancingSection />
      <ProjectShowcase />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}
