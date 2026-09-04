import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionTitle } from "@/components/site/section-head";
import { siteConfig } from "@/lib/site-config";
import { faqs as defaultFaqs, type FaqItem } from "./faq-section.defaults";

// Re-export für Bestandscode, der `faqs` aus diesem Modul importiert.
export { defaultFaqs as faqs };

type Props = {
  items?: FaqItem[];
  email?: string;
};

/**
 * Häufige Fragen: Titel oben, jede Frage als weich erhabene Karte mit
 * goldenem Auf-/Zuklapp-Symbol. Das Accordion bleibt bestehen.
 */
export function FaqSection({ items, email }: Props = {}) {
  const list = items && items.length > 0 ? items : defaultFaqs;
  const contactEmail = email ?? siteConfig.contact.email;

  return (
    <section id="faq" aria-labelledby="faq-titel" className="py-14 sm:py-20">
      <div className="container-page">
        <SectionTitle
          id="faq-titel"
          title="Antworten auf die Fragen, die wirklich zählen."
        />

        <Accordion className="mt-10">
          {list.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="neu mb-4 border-b-0 not-last:border-b-0 last:mb-0"
            >
              <AccordionTrigger className="min-h-14 items-center gap-4 rounded-2xl border-0 p-6 text-left text-[15px] font-semibold text-foreground hover:no-underline focus-visible:border-transparent sm:text-base **:data-[slot=accordion-trigger-icon]:size-5 **:data-[slot=accordion-trigger-icon]:text-[color:var(--solar-gold-dark)]">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <p className="max-w-prose text-[15px] leading-relaxed text-muted-foreground">
                  {f.a}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
          Ihre Frage ist nicht dabei? Schreiben Sie uns an{" "}
          <a
            href={`mailto:${contactEmail}`}
            className="ring-focus rounded-md font-medium text-foreground underline decoration-[color:var(--solar-gold)] decoration-2 underline-offset-4 transition-colors duration-150 hover:text-[color:var(--solar-gold-dark)]"
          >
            {contactEmail}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
