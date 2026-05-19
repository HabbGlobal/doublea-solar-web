import { HeroSection } from "@/components/sections/hero-section";
import { TrustSection } from "@/components/sections/trust-section";
import { ServicesSection } from "@/components/sections/services-section";
import { ProcessSection } from "@/components/sections/process-section";
import { SolarCalculatorSection } from "@/components/sections/solar-calculator-section";
import { FinancingSection } from "@/components/sections/financing-section";
import { ProjectShowcase } from "@/components/sections/project-showcase";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { getSiteContent } from "@/lib/content/server";

export default async function HomePage() {
  const content = await getSiteContent();
  const phoneHref = `tel:${content.contact.phone.replace(/[^+0-9]/g, "")}`;
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HeroSection
        content={content.hero}
        contact={{ phone: content.contact.phone, phoneHref }}
      />
      <TrustSection />
      <ServicesSection />
      <SolarCalculatorSection />
      <ProcessSection />
      <FinancingSection />
      <ProjectShowcase />
      <FaqSection items={content.faq} email={content.contact.email} />
      <FinalCtaSection />
    </>
  );
}
