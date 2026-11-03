/**
 * English default FAQs — used by the English pages when the admin editor
 * has not stored an English FAQ (site_content key «faq_en»). Mirrors
 * faq-section.defaults.ts: five questions, concise answers.
 */
import type { FaqItem } from "./faq-section.defaults";

export const faqsEn: FaqItem[] = [
  {
    q: "How long does it take to build a photovoltaic system?",
    a: "From site analysis to commissioning we typically allow 8 to 16 weeks — depending on permits, the grid operator and material lead times.",
  },
  {
    q: "Do I need a building permit for my solar system?",
    a: "On roofs in building and agricultural zones, sufficiently adapted solar systems are generally permit-free and only subject to notification — including elevated systems on flat roofs (max. 1 m above the roof edge, low-reflection). A building permit is required in particular for protected buildings and in protected zones. We clarify the notification deadlines with your municipality.",
  },
  {
    q: "How much is the Pronovo EIV subsidy?",
    a: "The one-off subsidy is governed by the Federal Energy Promotion Ordinance (EnFV) and depends on system category and output: for rooftop systems under 30 kWp currently CHF 360 per kWp, for integrated systems CHF 400. The rates valid on the day of commissioning apply — we check them and handle the application.",
  },
  {
    q: "How long does a photovoltaic system last?",
    a: "Modules today come with performance guarantees of 25 to 30 years. Inverters are typically replaced after 10 to 15 years, high-quality units last up to 20 years — we factor this replacement into every life-cycle calculation.",
  },
  {
    q: "What happens to surplus electricity?",
    a: "Surplus electricity is fed into the grid. Since 1 January 2026, feed-in remuneration across Switzerland follows the federal quarterly reference market price; for systems under 30 kW a statutory minimum of 6 Rp./kWh applies. More self-consumption usually pays off better than feed-in.",
  },
];
