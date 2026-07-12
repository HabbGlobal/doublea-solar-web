"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { siteConfig } from "@/lib/site-config";
import type { SiteContent } from "@/lib/content/schema";

type Props = {
  content: SiteContent["hero"];
  contact?: { phone: string; phoneHref: string };
};

/** Sachliche Fakten unter dem Hero-Visual — keine erfundenen Zahlen. */
const heroFacts = [
  { label: "Datenbasis", value: "Bundesdaten sonnendach.ch" },
  { label: "Offerte", value: "Innert eines Werktags" },
  { label: "Standort", value: "Grenchen — schweizweit tätig" },
];

export function HeroSection({ content, contact }: Props) {
  const reduce = useReducedMotion();
  const phoneDisplay = contact?.phone ?? siteConfig.contact.phone;
  const phoneHref = contact?.phoneHref ?? siteConfig.contact.phoneHref;
  const videoRef = useRef<HTMLVideoElement>(null);

  // Respektiert reduzierte Bewegung: pausiert das Video und zeigt das
  // Standbild (Poster). Sonst läuft die Energiefluss-Animation stumm im Loop.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (reduce) {
      v.pause();
    } else {
      void v.play().catch(() => {});
    }
  }, [reduce]);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: {
      delay: reduce ? 0 : delay,
      duration: reduce ? 0 : 0.6,
      ease: [0.2, 0.8, 0.2, 1] as const,
    },
  });

  return (
    <section className="relative overflow-hidden">
      <BackgroundDecor />
      <div className="container-page relative pt-8 pb-12 lg:pt-16 lg:pb-20">
        {/* Editorial-Stack: Eyebrow → H1 → Subline → CTAs → Telefon */}
        <div className="mx-auto max-w-4xl text-center">
          <motion.p {...fadeUp(0)} className="eyebrow">
            {content.eyebrow}
          </motion.p>

          <motion.h1
            {...fadeUp(0.05)}
            className="mt-4 text-balance text-4xl leading-[1.06] font-semibold tracking-tight text-foreground sm:mt-5 sm:text-6xl sm:leading-[1.04] lg:text-7xl"
          >
            {content.headlineLeading}
            {content.headlineLeading.endsWith(" ") ? "" : " "}
            <span className="gold-underline">{content.headlineHighlight}</span>
            {content.headlineTrailing}
          </motion.h1>

          <motion.p
            {...fadeUp(0.12)}
            className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:mt-6 sm:text-[17px]"
          >
            {content.subheadline}
          </motion.p>

          <motion.div
            {...fadeUp(0.18)}
            className="mt-7 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row"
          >
            <Link href="/solarrechner" className="btn-primary w-full sm:w-auto">
              {content.primaryCtaLabel}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link href="/angebote" className="btn-secondary w-full sm:w-auto">
              {content.secondaryCtaLabel}
            </Link>
          </motion.div>

          <motion.div
            {...fadeUp(0.24)}
            className="mt-3 flex items-center justify-center sm:mt-4"
          >
            <a
              href={phoneHref}
              className="ring-focus inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Phone
                className="size-3.5 text-[color:var(--solar-slate)]"
                aria-hidden="true"
              />
              <span>
                Lieber direkt sprechen?{" "}
                <span className="font-medium text-foreground">{phoneDisplay}</span>
              </span>
            </a>
          </motion.div>
        </div>

        {/* Zentrales Visual: Energiesystem, randlos in die Seitenfarbe eingebettet */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: reduce ? 0 : 0.3,
            duration: reduce ? 0 : 0.7,
            ease: [0.2, 0.8, 0.2, 1],
          }}
          className="relative mx-auto mt-10 w-full max-w-6xl sm:mt-14"
        >
          <div className="relative aspect-[16/9] w-full">
            <video
              ref={videoRef}
              className="absolute inset-0 size-full object-contain"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/energiesystem.png"
              aria-label="Animiertes Energiesystem eines Schweizer Einfamilienhauses: Photovoltaikanlage, Carport-Solar, Wallbox, Wärmepumpe, Wechselrichter, Batteriespeicher und Energiemanager mit Netzanschluss"
            >
              <source src="/energiesystem.mp4" type="video/mp4" />
            </video>
            {/* Kanten lösen sich vierseitig randlos in die exakte Seitenfarbe auf */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background: [
                  "linear-gradient(to right, var(--background) 0%, transparent 13%, transparent 87%, var(--background) 100%)",
                  "linear-gradient(to bottom, var(--background) 0%, transparent 12%, transparent 84%, var(--background) 100%)",
                ].join(","),
              }}
            />
          </div>
        </motion.div>

        {/* Feine Fakten-Leiste unter dem Visual */}
        <motion.dl
          {...fadeUp(0.42)}
          className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-4 border-t border-border pt-6 text-center sm:mt-10 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-border"
        >
          {heroFacts.map((fact) => (
            <div key={fact.label} className="px-4">
              <dt className="text-[11px] font-medium uppercase tracking-[0.16em] text-[color:var(--solar-slate)]">
                {fact.label}
              </dt>
              <dd className="stat-mono mt-1.5 text-[13px] text-foreground/85 sm:text-sm">
                {fact.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}

function BackgroundDecor() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div
        className="absolute inset-x-0 top-0 h-[560px]"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, color-mix(in oklab, var(--solar-leaf) 14%, transparent) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -top-40 right-[-12%] size-[560px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, color-mix(in oklab, var(--solar-gold) 12%, transparent) 0%, transparent 62%)",
        }}
      />
      <svg
        aria-hidden="true"
        className="absolute inset-0 size-full opacity-[0.04]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="hero-grid"
            width="36"
            height="36"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 36 0 L 0 0 0 36"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.6"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>
    </div>
  );
}
