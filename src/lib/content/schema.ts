import { z } from "zod";

import { siteConfig } from "@/lib/site-config";
import { faqs as defaultFaqs } from "@/components/sections/faq-section.defaults";

/**
 * Definiert alle editierbaren Content-Felder + Default-Werte.
 * Das Frontend liest aus der DB und fällt auf diese Defaults zurück, wenn
 * der Key noch nie gespeichert wurde.
 */

export const contentSchema = z.object({
  // Hero-Sektion
  hero: z.object({
    eyebrow: z.string().max(120),
    headlineLeading: z.string().max(120),
    headlineHighlight: z.string().max(60),
    headlineTrailing: z.string().max(120),
    subheadline: z.string().max(400),
    primaryCtaLabel: z.string().max(60),
    secondaryCtaLabel: z.string().max(60),
  }),
  // Kontaktdaten — wirken im Header, Footer, JSON-LD
  contact: z.object({
    phone: z.string().max(40),
    email: z.string().email().max(160),
    addressStreet: z.string().max(120),
    addressPostalCode: z.string().max(10),
    addressCity: z.string().max(80),
  }),
  // FAQ — frei editierbares Array
  faq: z.array(
    z.object({
      q: z.string().min(3).max(200),
      a: z.string().min(3).max(2000),
    }),
  ),
});

export type SiteContent = z.infer<typeof contentSchema>;

export const defaultContent: SiteContent = {
  hero: {
    eyebrow: "Schweizer Photovoltaik · Sitz in Grenchen",
    headlineLeading: "Solarenergie für",
    headlineHighlight: "Schweizer Dächer",
    headlineTrailing: ".",
    subheadline:
      "DoubleA Solar Solutions begleitet Sie von der ersten Standortanalyse bis zur langfristigen Wartung Ihrer Photovoltaikanlage – transparent, persönlich und schweizweit professionell.",
    primaryCtaLabel: "Solarpotenzial berechnen",
    secondaryCtaLabel: "Kostenloses Angebot erhalten",
  },
  contact: {
    phone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    addressStreet: siteConfig.contact.address.street,
    addressPostalCode: siteConfig.contact.address.postalCode,
    addressCity: siteConfig.contact.address.city,
  },
  faq: defaultFaqs,
};

/**
 * Liefert für einen Top-Level-Schlüssel den passenden Default.
 * Genutzt im Server-Loader, falls die DB den Key noch nicht hat.
 */
export function defaultFor<K extends keyof SiteContent>(key: K): SiteContent[K] {
  return defaultContent[key];
}
