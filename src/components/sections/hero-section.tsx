import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { siteConfig } from "@/lib/site-config";
import type { SiteContent } from "@/lib/content/schema";

/** Ein Kopf für die Porträt-Reihe rechts im Hero. */
export type HeroFounder = {
  id: string;
  name: string;
  role: string;
  imageUrl: string | null;
};

type Props = {
  content: SiteContent["hero"];
  contact?: { phone: string; phoneHref: string };
  /** Die ersten beiden publizierten Team-Mitglieder; ohne Bild entfällt die Reihe. */
  founders?: HeroFounder[];
};

/**
 * Hero: Dachbild als verblasster Hintergrund (läuft nach unten in die
 * Grundfläche aus), links Titel + ein Satz + Aktionen, rechts die Gründer
 * in weichen Kreisen. Kein Video, kein Plankopf.
 */
export function HeroSection({ content, contact, founders = [] }: Props) {
  const koepfe = founders.filter((f) => f.imageUrl).slice(0, 2);
  const phoneDisplay = contact?.phone ?? siteConfig.contact.phone;
  const phoneHref = contact?.phoneHref ?? siteConfig.contact.phoneHref;

  return (
    <section
      aria-labelledby="hero-h"
      className="relative isolate -mt-[88px] overflow-hidden pt-[118px] pb-16 sm:pb-20 lg:pt-[150px] lg:pb-24"
    >
      {/* Dachbild — links stärker abgedeckt, damit der Text sitzt */}
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <Image
          src="/header-dach.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%]"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background: [
            "linear-gradient(90deg, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.80) 42%, rgba(255,255,255,0.48) 100%)",
            "linear-gradient(180deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.55) 55%, #ffffff 100%)",
          ].join(","),
        }}
      />

      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          <div>
            <h1
              id="hero-h"
              className="text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.6rem]"
            >
              {content.headlineLeading}
              {content.headlineLeading.endsWith(" ") ? "" : " "}
              {content.headlineHighlight}
              {content.headlineTrailing}
              {content.subclaim?.trim() && (
                <span className="mt-2 block text-muted-foreground">
                  {content.subclaim}
                </span>
              )}
            </h1>

            {content.subheadline?.trim() && (
              <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted-foreground sm:text-lg">
                {content.subheadline}
              </p>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/angebote" className="btn-primary w-full sm:w-auto">
                {content.primaryCtaLabel}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link href="/solarrechner" className="btn-secondary w-full sm:w-auto">
                {content.secondaryCtaLabel}
              </Link>
            </div>

            <p className="mt-5 text-sm text-muted-foreground">
              Direkter Draht:{" "}
              <a
                href={phoneHref}
                className="ring-focus stat-mono rounded-md text-foreground"
              >
                {phoneDisplay}
              </a>
            </p>
          </div>

          {koepfe.length > 0 && (
            <div className="flex justify-start gap-8 lg:justify-center">
              {koepfe.map((f) => (
                <figure key={f.id} className="m-0 text-center">
                  <span className="neu relative mx-auto block size-[120px] rounded-full! p-2 sm:size-[150px]">
                    <span className="relative block size-full overflow-hidden rounded-full shadow-[var(--neu-inset)]">
                      <Image
                        src={f.imageUrl as string}
                        alt={`${f.name}, ${f.role}`}
                        fill
                        sizes="150px"
                        className="object-cover"
                      />
                    </span>
                  </span>
                  <figcaption className="mt-4">
                    <p className="text-[15px] font-semibold leading-snug text-foreground">
                      {f.name}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">{f.role}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
