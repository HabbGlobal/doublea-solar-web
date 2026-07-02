import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { siteConfig } from "@/lib/site-config";
import { faqs as defaultFaqs, type FaqItem } from "./faq-section.defaults";

// Re-export für Bestandscode, der `faqs` aus diesem Modul importiert.
export { defaultFaqs as faqs };

type Props = {
  items?: FaqItem[];
  email?: string;
};

export function FaqSection({ items, email }: Props = {}) {
  const list = items && items.length > 0 ? items : defaultFaqs;
  const contactEmail = email ?? siteConfig.contact.email;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: list.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <section id="faq" className="container-page py-16 sm:py-24 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <p className="eyebrow">Häufige Fragen</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-[44px]">
            Antworten auf die Fragen, die wirklich zählen.
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            Ihre Frage ist nicht dabei? Schreiben Sie uns an{" "}
            <a
              href={`mailto:${contactEmail}`}
              className="ring-focus rounded-sm font-medium text-foreground underline underline-offset-4 decoration-[color:var(--solar-gold)]/60 hover:decoration-[color:var(--solar-gold)]"
            >
              {contactEmail}
            </a>{" "}
            – Antwort innert eines Werktags.
          </p>
        </div>

        <Accordion className="rounded-3xl border border-border bg-white/70 px-6 py-3 sm:px-8">
          {list.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="min-h-12 gap-4 py-5 text-left text-[15px] font-medium text-foreground hover:no-underline sm:text-base">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <p className="max-w-prose text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                  {f.a}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
