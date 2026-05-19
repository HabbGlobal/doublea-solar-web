export const siteConfig = {
  name: "DoubleA Solar Solutions",
  legalName: "DoubleA Solutions GmbH",
  shortName: "DoubleA Solar",
  tagline: "Saubere Energie. Brillante Zukunft.",
  description:
    "Photovoltaik präzise geplant und professionell umgesetzt: DoubleA Solar Solutions begleitet Schweizer Kundinnen und Kunden von der Standortanalyse bis zur Wartung.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://www.doubleasolutions.ch",
  locale: "de-CH",
  contact: {
    phone: process.env.NEXT_PUBLIC_COMPANY_PHONE || "+41 76 307 31 59",
    phoneHref: "tel:+41763073159",
    email: process.env.NEXT_PUBLIC_COMPANY_EMAIL || "solar@doubleasolutions.ch",
    address: {
      street: "Oelirain 1A",
      postalCode: "2540",
      city: "Grenchen",
      canton: "Solothurn",
      country: "Schweiz",
      countryCode: "CH",
    },
    /** Koordinaten Grenchen — für LocalBusiness-Geo (lokale Google-Suche). */
    geo: { latitude: 47.1924, longitude: 7.3958 },
  },
  /** Preisspanne für LocalBusiness-Schema (Google bevorzugt gesetztes Feld). */
  priceRange: "$$",
  /**
   * Einzugsgebiet für lokale SEO. Bewusst auf Region + grössere Orte
   * fokussiert — dort ist die Konkurrenz tiefer und Rankings kommen
   * schneller als bei nationalen Begriffen.
   */
  serviceAreas: [
    "Grenchen",
    "Solothurn",
    "Biel/Bienne",
    "Bettlach",
    "Selzach",
    "Lengnau BE",
    "Pieterlen",
    "Zuchwil",
    "Bellach",
    "Bern",
    "Burgdorf",
    "Lyss",
    "Aarau",
    "Olten",
  ],
  primaryNav: [
    { href: "/services", label: "Leistungen" },
    { href: "/solarrechner", label: "Solarrechner" },
    { href: "/finanzierung", label: "Finanzierung" },
    { href: "/projekte", label: "Projekte" },
    { href: "/ueber-uns", label: "Über uns" },
    { href: "/kontakt", label: "Kontakt" },
  ],
  legalNav: [
    { href: "/impressum", label: "Impressum" },
    { href: "/datenschutz", label: "Datenschutz" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
