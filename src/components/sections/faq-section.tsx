import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHead, SectionTitle } from "@/components/site/section-head";
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

  return (
    <section id="faq" aria-labelledby="faq-titel">
      <SectionHead nr="06" label="Fragen" />
      <div className="container-page py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionTitle
              id="faq-titel"
              title="Antworten auf die Fragen, die wirklich zählen."
            />
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              Ihre Frage ist nicht dabei? Schreiben Sie uns an{" "}
              <a
                href={`mailto:${contactEmail}`}
                className="ring-focus font-medium text-foreground underline underline-offset-4 decoration-[color:var(--solar-line)] transition-colors duration-150 hover:decoration-[color:var(--solar-ink)]"
              >
                {contactEmail}
              </a>
              .
            </p>
          </div>

          <Accordion>
            {list.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-t border-border not-last:border-b-0 last:border-b"
              >
                <AccordionTrigger className="min-h-12 items-center gap-4 py-4 text-left text-[15px] font-medium text-foreground hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5">
                  <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
