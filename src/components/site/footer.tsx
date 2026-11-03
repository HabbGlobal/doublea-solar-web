"use client";

import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import type { AppPathname } from "@/i18n/routing";
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

const OFFER_LINKS: AppPathname[] = ["/services", "/solarrechner", "/pakete", "/angebote"];
const COMPANY_LINKS: AppPathname[] = ["/projekte", "/ueber-uns", "/kontakt", "/impressum", "/datenschutz"];

/** Schlanker Footer: Logo, Kontakt, zwei Linkgruppen, eine Schlusszeile. */
export function SiteFooter({ contact: dynamicContact }: Props = {}) {
  const year = new Date().getFullYear();
  const t = useTranslations("common");
  const contact = dynamicContact
    ? {
        phone: dynamicContact.phone,
        phoneHref: `tel:${dynamicContact.phone.replace(/[^+0-9]/g, "")}`,
        email: dynamicContact.email,
        address: {
          street: dynamicContact.addressStreet,
          postalCode: dynamicContact.addressPostalCode,
          city: dynamicContact.addressCity,
        },
      }
    : siteConfig.contact;

  return (
    <footer className="mt-20 pb-10 sm:mt-24">
      <div className="container-page">
        <div className="neu grid gap-10 px-6 py-10 sm:px-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo className="h-10" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {t("footer.claim")}
            </p>
            <address className="mt-6 space-y-1.5 text-sm not-italic">
              <p className="text-muted-foreground">
                {contact.address.street}, {contact.address.postalCode} {contact.address.city}
              </p>
              <p>
                <a href={contact.phoneHref} className="ring-focus stat-mono rounded-md text-foreground">
                  {contact.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${contact.email}`}
                  className="ring-focus rounded-md text-muted-foreground transition-colors hover:text-foreground"
                >
                  {contact.email}
                </a>
              </p>
            </address>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-7 lg:pl-10">
            <FooterColumn title={t("footer.offer")} links={OFFER_LINKS} />
            <FooterColumn title={t("footer.company")} links={COMPANY_LINKS} />
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          © {year} {siteConfig.legalName} · Grenchen
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: AppPathname[] }) {
  const t = useTranslations("common.nav");
  return (
    <div>
      <h3 className="eyebrow">{title}</h3>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map((href) => (
          <li key={href}>
            <Link
              href={href}
              className="ring-focus inline-flex min-h-6 items-center rounded-md text-foreground/80 transition-colors hover:text-foreground"
            >
              {t(href)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
