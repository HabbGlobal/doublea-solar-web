import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";
import { ProjectShowcase } from "@/components/sections/project-showcase";
import { ProcessSection } from "@/components/sections/process-section";
import { SolarCalculatorSection } from "@/components/sections/solar-calculator-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import type { Locale } from "@/i18n/routing";
import { localizedAlternates } from "@/i18n/seo";
import { getLocalizedSiteContent } from "@/lib/content/localized";
import { localizeTeam } from "@/lib/data/i18n";
import { getPublishedTeamMembers, teamImageUrl } from "@/lib/data/team";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.meta" });
  return {
    // Der Startseiten-Titel trägt den Markennamen bereits — kein Layout-Template.
    title: { absolute: t("title") },
    description: t("description"),
    alternates: localizedAlternates("/", locale),
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [content, teamMitglieder] = await Promise.all([
    getLocalizedSiteContent(locale),
    getPublishedTeamMembers(),
  ]);
  const phoneHref = `tel:${content.contact.phone.replace(/[^+0-9]/g, "")}`;
  // Die ersten beiden publizierten Köpfe erscheinen als Porträts im Hero —
  // Rollen in der Seitensprache.
  const team = await localizeTeam(teamMitglieder, locale);
  const founders = team.slice(0, 2).map((m) => ({
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
