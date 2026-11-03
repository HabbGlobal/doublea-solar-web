import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Toaster } from "sonner";

import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { htmlLang, localizedAlternates } from "@/i18n/seo";
import { routing, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/lib/site-config";
import { getSiteContent } from "@/lib/content/server";

import "../../globals.css";

/* Soft-Solar-Typografie: eine geometrische Familie für alles. */
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#ffffff" },
  ],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Pick<LayoutProps, "params">): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (hasLocale(routing.locales, raw) ? raw : routing.defaultLocale) as Locale;
  const t = await getTranslations({ locale, namespace: "common.meta" });
  const title = t("title");
  const description = t("description");
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: title, template: `%s | ${siteConfig.name}` },
    description,
    applicationName: siteConfig.name,
    keywords: t.raw("keywords") as string[],
    authors: [{ name: siteConfig.legalName }],
    category: "energy",
    alternates: localizedAlternates("/", locale),
    icons: {
      icon: "/icon",
      apple: [{ url: "/apple-icon", type: "image/png", sizes: "180x180" }],
    },
    openGraph: {
      type: "website",
      locale: locale === "de" ? "de_CH" : "en_GB",
      url: siteConfig.url,
      siteName: siteConfig.name,
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}

function buildJsonLdGraph(
  contact: Awaited<ReturnType<typeof getSiteContent>>["contact"],
  locale: Locale,
  services: string[],
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
    inLanguage: htmlLang[locale],
    publisher: { "@id": orgId },
  };

  const localBusiness = {
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
      { "@type": "Country", name: locale === "de" ? "Schweiz" : "Switzerland" },
      ...siteConfig.serviceAreas.map((name) => ({ "@type": "City", name })),
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
      name: locale === "de" ? "Photovoltaik-Leistungen" : "Photovoltaic services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: service },
      })),
    },
  };

  return { "@context": "https://schema.org", "@graph": [organization, website, localBusiness] };
}

export default async function SiteLayout({ children, params }: LayoutProps) {
  const { locale: raw } = await params;
  if (!hasLocale(routing.locales, raw)) notFound();
  const locale = raw as Locale;
  setRequestLocale(locale);

  const [content, t] = await Promise.all([
    getSiteContent(),
    getTranslations({ locale, namespace: "common" }),
  ]);
  const jsonLdGraph = buildJsonLdGraph(
    content.contact,
    locale,
    t.raw("meta.services") as string[],
  );

  return (
    <html lang={htmlLang[locale]} className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full bg-background">
        {/* Skip-Link: erstes fokussierbares Element (WCAG 2.4.1) */}
        <a
          href="#content"
          className="ring-focus sr-only z-50 rounded-2xl bg-background px-4 py-3 text-sm font-semibold text-foreground shadow-[var(--neu-raise-sm)] focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4"
        >
          {t("skipLink")}
        </a>
        <NextIntlClientProvider>
          <TooltipProvider>
            <div className="site-sheet flex min-h-screen flex-col">
              <SiteHeader phone={content.contact.phone} />
              <main id="content" className="flex-1">
                {children}
              </main>
              <SiteFooter contact={content.contact} />
            </div>
          </TooltipProvider>
          <Toaster position="top-right" richColors closeButton />
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
      </body>
    </html>
  );
}
