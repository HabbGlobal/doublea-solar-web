# DoubleA Solar Solutions — Designsystem «Architectural Precision» (verbindlich, Stand 08/2026)

Werkplan-Ästhetik eines Schweizer Ingenieurbüros: mineralisches Papier, Tinte,
sichtbare Hairlines, Mono-Beschriftung, kantige Geometrie. Vertrauen entsteht
aus dokumentarischer Präzision — nicht aus Effekten.
Nicht: SaaS-Template, Karten-Flut, Pills, Gradients, Glow, Gold-Dekor,
Logofarben im Interface.

## 1. Farben (nur über Tokens; Logofarben NUR im Logo-SVG)

| Token | Wert | Verwendung |
|---|---|---|
| `--background` / `--solar-paper` | #F7F7F4 | Seitengrund (Papier) |
| `--secondary` / `.surface-sand` | #EFEFEA | Wechselflächen |
| `--card` / `.surface-glass` | #FFFFFF | Panels mit Hairline-Rahmen |
| `--border` / `--solar-line` | #D8D8D0 | Hairlines — sichtbar, 1px, tragendes Ordnungselement |
| `--muted-foreground` / `--solar-stone` | #65665F | Sekundärtext, Labels (AA 5.4:1) |
| `--foreground` / `--solar-ink` / `--solar-navy` | #1A1C1C | Text, Buttons, starke Typo |
| `--solar-graphite` / `.surface-navy` | #252827 | Dunkle Sektionen — FLACH und matt |
| auf Graphit | #F2F2EE / #A9ABA3 / #3A3D3B | Text / Sekundär / Hairline |

Historische Tokennamen (`--solar-emerald/leaf/gold`) sind auf Neutraltöne
gemappt — in neuem Code nicht mehr verwenden. Keine Chromatik im Interface.

## 2. Typografie

- Alles Redaktionelle: Archivo (`--font-sans` = `--font-heading`), 400/500/600.
- Labels, Nummern, Werte, Meta: IBM Plex Mono via `.eyebrow` (11px uppercase
  tracking 0.16em Stone) und `.stat-mono` (tabular-nums).
- H1: `text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight`
- H2: `text-3xl sm:text-4xl font-semibold leading-tight` (via `SectionTitle`)
- Fliesstext: `text-[15px] sm:text-base leading-relaxed text-muted-foreground`,
  max-w-xl/2xl (55–75 Zeichen).

## 3. Sektions-Grammatik

- JEDE Sektion beginnt mit `<SectionHead nr="0X" label="…" />`
  (`@/components/site/section-head`) — vollbreite Hairline, Mono-Nr links,
  Mono-Label rechts. Das ist das EINZIGE Nummern-Ornament.
- Startseiten-Nummern: 01 Übersicht · 02 Haltung · 03 Leistungen ·
  04 Solarrechner · 05 Prozess · 06 Anlagentypen · 07 Fakten · 08 Grundsätze ·
  09 Fragen · 10 Team.
- Rhythmus: `container-page py-14 sm:py-20`; Seite steht im `.site-sheet`
  (sichtbare Aussenkanten ab 1024px).

## 4. Komponenten

- KEINE Karten: Inhalte als Index-Zeilen/Tabellen mit `border-t`-Hairlines;
  Hover = Flächenwechsel (`hover:bg-card` / `hover:bg-secondary`), NIE
  translate/Schatten.
- Buttons: `btn-primary` (Tinte, Hover invertiert), `btn-secondary` (Outline),
  `btn-ghost` (unterstrichener Textlink); auf Graphit `-inverse`-Varianten.
  Rechteckig — `--radius` ist global 0.
- Aufzählungen: Quadrat-Bullet `size-1.5 bg-[color:var(--solar-ink)]` statt
  Check-Icons. Lucide-Icons nur funktional (Menü, Spinner, Formulare,
  ArrowRight in Buttons) — nie als Inhalts-Dekor.
- Bild-Platzhalter: Schraffur-Fläche
  (`repeating-linear-gradient(45deg, var(--solar-line) 0 1px, transparent 1px 9px)`)
  mit `.eyebrow`-Label «Projektfotografie in Vorbereitung». Keine Stock-/KI-Bilder.
- Plankopf-Muster (Hero, Kontakt): weisses Panel als Definition-Tabelle
  (eyebrow-Label-Spalte + Wert), Fusszeile mit Koordinaten «47.19° N / 7.40° O».
- Fokus: IMMER `.ring-focus`.

## 5. Motion

- Kein framer-motion in Inhalts-Sektionen, keine Scroll-Reveals, kein Lenis.
- Erlaubt: Farb-/Flächen-Transitions 150ms; Wizard-Schritt-Übergänge im
  Solarrechner. `prefers-reduced-motion` neutralisiert alles (globals.css).

## 6. Copy-Regeln

- Schweizer Hochdeutsch, ss statt ß, `CHF 12'500`, `10 kWp`, `12'500 kWh/Jahr`.
- Hauptclaim: «Solarenergie für Schweizer Dächer.» + Subclaim «Präzise geplant.
  Sauber umgesetzt.» (editierbar via Admin).
- Zahlen nur belegt oder als Richtwert gekennzeichnet; Förderung/Steuern
  indikativ; Quellen+Stand im Faktenblock (Startseite 07). NIE «emissionsfrei/
  klimaneutral»; CO₂ immer netto mit KBOB-Fussnote.
- Floskel-Diät: «Kostenfrei und unverbindlich · Antwort innert eines Werktags»
  steht in Header/CtaBand/Footer — nicht zusätzlich in Sektionstexten.

## 7. Technische Leitplanken

- TypeScript strict; Props-APIs stabil; keine neuen Dependencies ohne Freigabe.
- `next/image` für echte Bilder (Team/Projekte aus Supabase Storage
  `site-images`, `remotePatterns **.supabase.co`).
- Editierbare Inhalte via `site_content` (Hero inkl. Subclaim, Kontakt, FAQ)
  + Tabellen `team_members`, `projects`, `packages` — Admin unter `/admin`.
  Frontend fällt bei leeren Tabellen IMMER auf kuratierte Defaults zurück.
- Mobile-first: 360px muss sitzen; Touch-Ziele ≥44px; Tabellen stapeln unter
  `sm` als Definitionen (nie horizontal scrollen).
- Rechner: Spannen statt Punktwerte; Kernkonstanten sind faktengeprüft
  (siehe design-proposals/claim-register.md) — Änderungen nur mit Quelle.

## 8. Conversion

- Primär-CTA: «Projekt unverbindlich prüfen» → /angebote (Header + CtaBand).
- Sekundär: «Solarpotenzial berechnen» → /solarrechner.
- Jede Seite endet mit CtaBand; keine Floating-CTAs, keine CTA-Stapel.
