import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";

import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import { siteConfig } from "@/lib/site-config";
import { getSiteContent } from "@/lib/content/server";

import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fffdfd" },
    { media: "(prefers-color-scheme: dark)", color: "#111315" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default:
      "Solaranlage & Photovoltaik Grenchen, Solothurn & Bern | DoubleA Solar",
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Ihr Solarunternehmen aus Grenchen: Photovoltaik, Batteriespeicher & Förderberatung in Solothurn, Bern und Umgebung. Gratis Solarrechner und unverbindliche Offerte.",
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
      "Solaranlage & Photovoltaik Grenchen, Solothurn & Bern | DoubleA Solar",
    description:
      "Ihr Solarunternehmen aus Grenchen: Photovoltaik, Speicher & Förderberatung in Solothurn, Bern und Umgebung. Gratis Solarrechner und unverbindliche Offerte.",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Solaranlage & Photovoltaik Grenchen, Solothurn & Bern | DoubleA Solar",
    description:
      "Ihr Solarunternehmen aus Grenchen: Photovoltaik, Speicher & Förderberatung in Solothurn, Bern und Umgebung. Gratis Solarrechner und unverbindliche Offerte.",
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
      className={`${inter.variable} ${interTight.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background">
        <SmoothScroll />
        <TooltipProvider>
          <SiteHeader />
          <main id="content" className="flex-1">
            {children}
          </main>
          <SiteFooter contact={content.contact} />
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
