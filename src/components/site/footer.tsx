"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/lib/site-config";
import { Logo } from "./logo";

type Props = {
  contact?: {
    phone: string;
    email: string;
    addressStreet: string;
    addressPostalCode: string;
    addressCity: string;
  };
};

/**
 * Werkplan-Footer auf Papier: Hairline oben, vier Spalten (Adresse, Angebot,
 * Unternehmen, Rechtliches), darunter eine Mono-Colophon-Zeile mit den
 * Koordinaten des Firmensitzes.
 */
export function SiteFooter({ contact: dynamicContact }: Props = {}) {
  const year = new Date().getFullYear();
  const pathname = usePathname();
  const contact = dynamicContact
    ? {
        phone: dynamicContact.phone,
        phoneHref: `tel:${dynamicContact.phone.replace(/[^+0-9]/g, "")}`,
        email: dynamicContact.email,
        address: {
          street: dynamicContact.addressStreet,
          postalCode: dynamicContact.addressPostalCode,
          city: dynamicContact.addressCity,
          country: siteConfig.contact.address.country,
        },
      }
    : siteConfig.contact;

  // Im Admin-Bereich verstecken wir den Public-Footer.
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="border-t border-border bg-background">
      <div className="container-page grid gap-12 py-14 lg:grid-cols-12 lg:gap-8 lg:py-16">
        <div className="lg:col-span-5">
          <Logo />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {siteConfig.legalName} plant, installiert und betreut
            Photovoltaikanlagen in der Schweiz — präzise ausgelegt, transparent
            offeriert, langfristig betreut.
          </p>

          <address className="mt-8 space-y-2.5 text-sm not-italic text-foreground/85">
            <p>
              {contact.address.street}
              <br />
              {contact.address.postalCode} {contact.address.city},{" "}
              {contact.address.country}
            </p>
            <p>
              <a
                href={contact.phoneHref}
                className="ring-focus stat-mono inline-flex min-h-9 items-center text-foreground"
              >
                {contact.phone}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${contact.email}`}
                className="ring-focus inline-flex min-h-9 items-center text-muted-foreground transition-colors hover:text-foreground"
              >
                {contact.email}
              </a>
            </p>
            <p className="text-muted-foreground">
              {siteConfig.openingHours.weekdays}
              <br />
              {siteConfig.openingHours.saturday}
            </p>
          </address>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-7 lg:gap-8">
          <FooterColumn
            title="Angebot"
            links={[
              { href: "/services", label: "Leistungen" },
              { href: "/solarrechner", label: "Solarrechner" },
              { href: "/pakete", label: "Pakete & Preise" },
              { href: "/finanzierung", label: "Finanzierung" },
              { href: "/angebote", label: "Angebot anfragen" },
            ]}
          />
          <FooterColumn
            title="Unternehmen"
            links={[
              { href: "/projekte", label: "Projekte" },
              { href: "/ueber-uns", label: "Über uns" },
              { href: "/kontakt", label: "Kontakt" },
            ]}
          />
          <FooterColumn
            title="Rechtliches"
            links={[
              ...siteConfig.legalNav.map((item) => ({
                href: item.href,
                label: item.label,
              })),
              { href: "/sitemap.xml", label: "Sitemap" },
            ]}
          />
        </div>
      </div>

      {/* Colophon */}
      <div className="border-t border-border">
        <div className="container-page flex flex-col items-start justify-between gap-2 py-5 sm:flex-row sm:items-center">
          <p className="eyebrow normal-case tracking-[0.08em]">
            © {year} {siteConfig.legalName} · Photovoltaik aus Grenchen für die
            ganze Schweiz
          </p>
          <p className="eyebrow">47.19° N / 7.40° O</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="eyebrow">{title}</h3>
      <ul className="mt-4 space-y-2.5 text-sm text-foreground/80">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="ring-focus inline-flex min-h-6 items-center transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
