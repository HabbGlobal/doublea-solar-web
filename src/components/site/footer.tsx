"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";

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
    <footer className="surface-navy relative mt-24 overflow-hidden">
      {/* Feine Gold-Hairline als Premium-Mikrodetail am oberen Rand */}
      <div
        aria-hidden
        className="h-px w-full bg-gradient-to-r from-transparent via-[color:var(--solar-gold)]/45 to-transparent"
      />

      <div className="container-page relative grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-5">
          <Logo variant="light" />
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/70">
            DoubleA Solar Solutions plant, installiert und betreut
            Photovoltaikanlagen in der Schweiz. Unser Anspruch: präzise
            Auslegung, transparente Offerten und langfristig betreute Anlagen.
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/50">
            Persönliche Beratung in Deutsch und Schweizerdeutsch.
          </p>

          <ul className="mt-8 space-y-3 text-sm text-white/80">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-[color:var(--solar-gold)]" />
              <span>
                {contact.address.street}
                <br />
                {contact.address.postalCode} {contact.address.city},{" "}
                {contact.address.country}
              </span>
            </li>
            <li>
              <a
                href={contact.phoneHref}
                className="ring-focus -mx-1 inline-flex min-h-9 items-center gap-3 rounded-md px-1 transition-colors hover:text-white"
              >
                <Phone className="size-4 shrink-0 text-[color:var(--solar-gold)]" />
                {contact.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="ring-focus -mx-1 inline-flex min-h-9 items-center gap-3 rounded-md px-1 transition-colors hover:text-white"
              >
                <Mail className="size-4 shrink-0 text-[color:var(--solar-gold)]" />
                {contact.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-7 lg:gap-8">
          <FooterColumn
            title="Navigation"
            links={siteConfig.primaryNav.map((item) => ({
              href: item.href,
              label: item.label,
            }))}
          />
          <FooterColumn
            title="Leistungen"
            links={[
              { href: "/services#standortanalyse", label: "Standortanalyse" },
              { href: "/services#planung", label: "Planung & Auslegung" },
              { href: "/services#foerderung", label: "Förderberatung" },
              { href: "/services#installation", label: "Installation" },
              { href: "/services#monitoring", label: "Monitoring & Wartung" },
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

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-start justify-between gap-4 pt-6 pb-[calc(4.5rem+env(safe-area-inset-bottom))] text-xs text-white/55 lg:flex-row lg:items-center lg:pb-6 lg:pr-24">
          <p>
            © {year} {siteConfig.legalName}. Alle Rechte vorbehalten.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {siteConfig.legalNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="ring-focus rounded-sm transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/solarrechner"
              className="ring-focus group inline-flex items-center gap-1.5 rounded-sm font-medium text-[color:var(--solar-leaf)] transition-colors hover:text-white"
            >
              Solarpotenzial berechnen
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
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
      <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-white/45">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5 text-sm text-white/75">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="ring-focus rounded-sm transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
