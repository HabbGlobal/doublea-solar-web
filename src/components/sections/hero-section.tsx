"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

import { siteConfig } from "@/lib/site-config";
import type { SiteContent } from "@/lib/content/schema";
import { SectionHead } from "@/components/site/section-head";

/** Ein Kopf für die Porträt-Reihe unter dem Plankopf. */
export type HeroFounder = {
  id: string;
  name: string;
  role: string;
  imageUrl: string | null;
};

type Props = {
  content: SiteContent["hero"];
  contact?: { phone: string; phoneHref: string };
  /**
   * Die ersten beiden publizierten Team-Mitglieder (Gründer). Werden im
   * Hero als runde Porträts unter dem Plankopf gezeigt — bewusste Ausnahme
   * von der kantigen Geometrie: Menschen, keine technischen Flächen.
   * Leer/ohne Bild ⇒ die Reihe entfällt ersatzlos.
   */
  founders?: HeroFounder[];
};

/** Plankopf-Zeilen: sachliche Eckdaten, keine erfundenen Zahlen. */
const plankopfRows = [
  {
    label: "Planungsbasis",
    value: "Bundesdaten sonnendach.ch, je Gebäude ausgewertet",
  },
  {
    label: "Offerte",
    value: "Jede Position einzeln ausgewiesen, Antwort innert eines Werktags",
  },
  {
    label: "Administration",
    value: "Pronovo-Antrag, Meldewesen und Sicherheitsnachweis inklusive",
  },
  {
    label: "Standort",
    value: "Oelirain 1A, 2540 Grenchen; Projekte in der ganzen Schweiz",
  },
];

export function HeroSection({ content, contact, founders = [] }: Props) {
  // Nur Köpfe mit Bild zeigen — ohne Foto bleibt die Reihe leer statt leerer Kreise.
  const koepfe = founders.filter((f) => f.imageUrl).slice(0, 2);
  const phoneDisplay = contact?.phone ?? siteConfig.contact.phone;
  const phoneHref = contact?.phoneHref ?? siteConfig.contact.phoneHref;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);

  // Respektiert reduzierte Bewegung: pausiert das Video und zeigt das
  // Standbild (Poster). Sonst läuft die Energiefluss-Animation stumm im Loop.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (mq.matches) {
        v.pause();
        setPaused(true);
      } else {
        setPaused(false);
        void v.play().catch(() => {});
      }
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Manueller Pausier-Mechanismus für die Loop-Animation (WCAG 2.2.2).
  const toggleVideo = () => {
    const v = videoRef.current;
    if (!v) return;
    if (paused) {
      void v.play().catch(() => {});
      setPaused(false);
    } else {
      v.pause();
      setPaused(true);
    }
  };

  return (
    <section aria-labelledby="hero-h">
      <SectionHead nr="01" label="Übersicht" />

      <div className="container-page pt-10 pb-12 lg:pt-14 lg:pb-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Textblock: Eyebrow → H1 + Subclaim → Subline → CTAs → Telefon */}
          <div className="lg:col-span-7">
            <p className="eyebrow">{content.eyebrow}</p>

            <h1
              id="hero-h"
              className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              {content.headlineLeading}
              {content.headlineLeading.endsWith(" ") ? "" : " "}
              {content.headlineHighlight}
              {content.headlineTrailing}
              <span className="mt-2 block text-muted-foreground">
                {content.subclaim}
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              {content.subheadline}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/angebote" className="btn-primary w-full sm:w-auto">
                {content.primaryCtaLabel}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/solarrechner"
                className="btn-secondary w-full sm:w-auto"
              >
                {content.secondaryCtaLabel}
              </Link>
            </div>

            <p className="mt-5 text-sm text-muted-foreground">
              Direkter Draht:{" "}
              <a
                href={phoneHref}
                className="ring-focus stat-mono text-foreground underline decoration-[color:var(--solar-line)] underline-offset-4 transition-colors duration-150 hover:decoration-[color:var(--solar-ink)]"
              >
                {phoneDisplay}
              </a>
            </p>
          </div>

          {/* Plankopf: Eckdaten als Definitionstabelle im Werkplan-Panel */}
          <div className="lg:col-span-5">
            <div
              role="group"
              aria-label="Plankopf: Eckdaten DoubleA Solutions"
              className="surface-glass p-5 sm:p-6"
            >
              <div className="flex items-center justify-between gap-4 border-b border-border pb-3">
                <span className="eyebrow">Plankopf</span>
                <span className="eyebrow">DoubleA Solutions GmbH</span>
              </div>
              <dl>
                {plankopfRows.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-[110px_1fr] gap-4 border-b border-border py-3"
                  >
                    <dt className="eyebrow pt-0.5">{row.label}</dt>
                    <dd className="text-sm leading-relaxed text-foreground">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="eyebrow pt-3">
                Blatt 01 · 2540 Grenchen · 47.19° N / 7.40° O
              </p>
            </div>

            {/* Gründer-Porträts: runde Rahmen als bewusste Ausnahme zur
                kantigen Geometrie — erscheinen automatisch, sobald im Admin
                Team-Mitglieder mit Bild veröffentlicht sind. */}
            {koepfe.length > 0 && (
              <div className="mt-7 grid grid-cols-2 gap-x-5 gap-y-6 sm:mt-8 sm:gap-x-8">
                {koepfe.map((f) => (
                  <figure key={f.id} className="min-w-0">
                    <span className="relative block size-20 overflow-hidden rounded-full border border-border bg-card ring-1 ring-[color:var(--solar-line)] ring-offset-4 ring-offset-background sm:size-24 lg:size-[104px]">
                      <Image
                        src={f.imageUrl as string}
                        alt={`${f.name}, ${f.role}`}
                        fill
                        sizes="(max-width: 640px) 80px, (max-width: 1024px) 96px, 104px"
                        className="object-cover"
                      />
                    </span>
                    <figcaption className="mt-4">
                      <p className="text-sm font-medium leading-snug text-foreground">
                        {f.name}
                      </p>
                      <p className="eyebrow mt-1.5 leading-snug">{f.role}</p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Energiefluss-Video im Werkplan-Rahmen */}
        <div className="mt-12 border border-border bg-card p-2 sm:mt-16">
          <video
            ref={videoRef}
            className="w-full"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/energiesystem-poster.jpg"
            aria-label="Animiertes Energiesystem eines Schweizer Einfamilienhauses: Photovoltaikanlage, Carport-Solar, Wallbox, Wärmepumpe, Wechselrichter, Batteriespeicher und Energiemanager mit Netzanschluss"
          >
            <source src="/energiesystem.mp4" type="video/mp4" />
          </video>
          <div className="mt-2 flex flex-col gap-1 border-t border-border px-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <p className="eyebrow py-2 leading-relaxed">
              Abb. 01 — Energiesystem eines Einfamilienhauses: PV, Speicher,
              Wallbox, Wärmepumpe
            </p>
            <button
              type="button"
              className="ring-focus eyebrow inline-flex min-h-11 shrink-0 items-center self-start px-2 underline decoration-[color:var(--solar-line)] underline-offset-4 hover:decoration-[color:var(--solar-ink)] sm:min-h-9 sm:self-auto"
              aria-pressed={!paused}
              onClick={toggleVideo}
            >
              {paused ? "Animation abspielen" : "Animation anhalten"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
