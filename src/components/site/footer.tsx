import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { siteConfig } from "@/lib/site-config";
import { Logo } from "./logo";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const { contact } = siteConfig;

  return (
    <footer className="surface-navy relative mt-24 overflow-hidden">
      <div className="container-page relative grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-5">
          <Logo variant="light" className="text-white" />
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/70">
            DoubleA Solar Solutions plant, installiert und betreut Photovoltaikanlagen
            in der Schweiz. Unser Anspruch: präzise Auslegung, transparente Offerten
            und langfristig betreute Anlagen.
          </p>

          <ul className="mt-8 space-y-3 text-sm text-white/80">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 text-[color:var(--solar-gold)]" />
              <span>
                {contact.address.street}
                <br />
                {contact.address.postalCode} {contact.address.city}, {contact.address.country}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="size-4 text-[color:var(--solar-gold)]" />
              <a
                href={contact.phoneHref}
                className="ring-focus rounded-sm hover:text-white"
              >
                {contact.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="size-4 text-[color:var(--solar-gold)]" />
              <a
                href={`mailto:${contact.email}`}
                className="ring-focus rounded-sm hover:text-white"
              >
                {contact.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-8 lg:col-span-7 lg:grid-cols-3">
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
            title="Unternehmen"
            links={[
              { href: "/ueber-uns", label: "Über uns" },
              { href: "/projekte", label: "Projekte" },
              { href: "/finanzierung", label: "Finanzierung" },
              { href: "/kontakt", label: "Kontakt" },
            ]}
          />
          <FooterColumn
            title="Tools"
            links={[
              { href: "/solarrechner", label: "Solarrechner" },
              { href: "/angebote", label: "Angebot anfordern" },
            ]}
          />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-start justify-between gap-3 py-6 text-xs text-white/55 lg:flex-row lg:items-center">
          <p>
            © {year} {siteConfig.legalName}. Alle Rechte vorbehalten.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {siteConfig.legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/sitemap.xml" className="hover:text-white">
                Sitemap
              </Link>
            </li>
          </ul>
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
      <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[color:var(--solar-gold)]">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5 text-sm text-white/75">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="ring-focus rounded-sm hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
