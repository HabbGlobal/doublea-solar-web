import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";
import { ProjectShowcase } from "@/components/sections/project-showcase";
import { ProcessSection } from "@/components/sections/process-section";
import { SolarCalculatorSection } from "@/components/sections/solar-calculator-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { getSiteContent } from "@/lib/content/server";
import { getPublishedTeamMembers, teamImageUrl } from "@/lib/data/team";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [content, teamMitglieder] = await Promise.all([
    getSiteContent(),
    getPublishedTeamMembers(),
  ]);
  const phoneHref = `tel:${content.contact.phone.replace(/[^+0-9]/g, "")}`;
  // Die ersten beiden publizierten Köpfe erscheinen als Porträts im Hero.
  const founders = teamMitglieder.slice(0, 2).map((m) => ({
    id: m.id,
    name: m.name,
    role: m.role,
    imageUrl: teamImageUrl(m.imagePath),
  }));
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
        founders={founders}
      />
      <ServicesSection />
      <ProjectShowcase />
      <ProcessSection />
      <SolarCalculatorSection />
      <FaqSection items={content.faq} email={content.contact.email} />
      <FinalCtaSection />
    </>
  );
}
