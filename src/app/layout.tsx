import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { Toaster } from "sonner";

import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { siteConfig } from "@/lib/site-config";
import { getSiteContent } from "@/lib/content/server";

import "./globals.css";

/* Werkplan-Typografie: Archivo trägt alles Redaktionelle, IBM Plex Mono
   alle Labels, Nummern und technischen Werte. (--font-geist-mono ist der
   historische Variablenname für die Mono-Rolle.) */
const archivo = Archivo({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f4" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1c1c" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default:
      "Photovoltaik Grenchen & Solothurn — präzise geplant | DoubleA Solar",
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Schweizer Photovoltaik-Fachbetrieb aus Grenchen: Photovoltaik, Batteriespeicher, Wallbox & Förderberatung in Solothurn, Bern und der ganzen Schweiz. Mit Solarrechner, transparenten Offerten und langfristigem Monitoring.",
  applicationName: siteConfig.name,
  keywords: [
    "Solaranlage Grenchen",
    "Photovoltaik Grenchen",
    "Solaranlage Solothurn",
    "Photovoltaik Solothurn",
    "Solaranlage Bern",
    "Photovoltaik Biel",
    "Solarteur Region Solothurn",
    "Solaranlage Kosten Schweiz",
    "Photovoltaik Offerte",
    "Solaranlage mit Speicher",
    "Photovoltaik Einfamilienhaus",
    "Solarrechner Schweiz",
    "Pronovo Förderung Photovoltaik",
    "PV Anlage installieren lassen",
    "Solarunternehmen Schweiz",
    "Wallbox Solar",
    "Wärmepumpe Photovoltaik",
    "ZEV Photovoltaik Mehrfamilienhaus",
    "Gewerbe Solaranlage",
    "Eigenverbrauch optimieren",
  ],
  authors: [{ name: siteConfig.legalName }],
  category: "energy",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon",
    apple: [{ url: "/logo.png", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title:
      "Photovoltaik Grenchen & Solothurn — präzise geplant | DoubleA Solar",
    description:
      "Schweizer Photovoltaik-Fachbetrieb aus Grenchen: Photovoltaik, Batteriespeicher, Wallbox & Förderberatung in Solothurn, Bern und der ganzen Schweiz. Mit Solarrechner und transparenten Offerten.",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Photovoltaik Grenchen & Solothurn — präzise geplant | DoubleA Solar",
    description:
      "Schweizer Photovoltaik-Fachbetrieb aus Grenchen: Photovoltaik, Batteriespeicher, Wallbox & Förderberatung in Solothurn, Bern und der ganzen Schweiz. Mit Solarrechner und transparenten Offerten.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const CORE_SERVICES = [
  "Standortanalyse & Verschattungsprüfung",
  "Planung und Auslegung der Photovoltaikanlage",
  "Installation & Netzanschluss",
  "Batteriespeicher & Eigenverbrauchsoptimierung",
  "Förderberatung Pronovo EIV",
  "Monitoring & Wartung",
];

function buildJsonLdGraph(
  contact: Awaited<ReturnType<typeof getSiteContent>>["contact"],
) {
  const orgId = `${siteConfig.url}#organization`;
  const businessId = `${siteConfig.url}#business`;

  const organization = {
    "@type": "Organization",
    "@id": orgId,
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    slogan: siteConfig.tagline,
  };

  const website = {
    "@type": "WebSite",
    "@id": `${siteConfig.url}#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    inLanguage: "de-CH",
    publisher: { "@id": orgId },
  };

  const localBusiness = {
    // Mehrere Typen: generisch + bautechnischer Subtyp für lokale Suche.
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": businessId,
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    image: `${siteConfig.url}/logo.png`,
    telephone: contact.phone,
    email: contact.email,
    priceRange: siteConfig.priceRange,
    currenciesAccepted: "CHF",
    parentOrganization: { "@id": orgId },
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.addressStreet,
      postalCode: contact.addressPostalCode,
      addressLocality: contact.addressCity,
      addressRegion: siteConfig.contact.address.canton,
      addressCountry: siteConfig.contact.address.countryCode,
    },
    hasMap:
      "https://www.google.com/maps/search/?api=1&query=Oelirain%201A%2C%202540%20Grenchen",
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.contact.geo.latitude,
      longitude: siteConfig.contact.geo.longitude,
    },
    openingHoursSpecification: siteConfig.openingHours.schema.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.dayOfWeek,
      opens: h.opens,
      closes: h.closes,
    })),
    foundingDate: String(siteConfig.founded),
    areaServed: [
      { "@type": "Country", name: "Schweiz" },
      ...siteConfig.serviceAreas.map((name) => ({
        "@type": "City",
        name,
      })),
    ],
    knowsAbout: [
      "Photovoltaik",
      "Solaranlagen",
      "Batteriespeicher",
      "Eigenverbrauchsoptimierung",
      "Förderberatung Pronovo",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Photovoltaik-Leistungen",
      itemListElement: CORE_SERVICES.map((service) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: service },
      })),
    },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, website, localBusiness],
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const content = await getSiteContent();
  const jsonLdGraph = buildJsonLdGraph(content.contact);
  return (
    <html
      lang="de-CH"
      className={`${archivo.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background">
        {/* Skip-Link: erstes fokussierbares Element (WCAG 2.4.1) */}
        <a
          href="#content"
          className="ring-focus sr-only z-50 border border-[color:var(--solar-ink)] bg-background px-4 py-3 text-sm font-medium text-foreground focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4"
        >
          Zum Inhalt springen
        </a>
        <TooltipProvider>
          {/* Zeichenblatt: Inhalt steht zwischen zwei sichtbaren Hairlines */}
          <div className="site-sheet flex min-h-screen flex-col">
            <SiteHeader phone={content.contact.phone} />
            <main id="content" className="flex-1">
              {children}
            </main>
            <SiteFooter contact={content.contact} />
          </div>
        </TooltipProvider>
        <Toaster position="top-right" richColors closeButton />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdGraph),
          }}
        />
      </body>
    </html>
  );
}
