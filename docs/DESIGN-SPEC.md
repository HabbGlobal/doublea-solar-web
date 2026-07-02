# DoubleA Solar Solutions — Relaunch-Designsystem (verbindlich)

Premium Swiss Energy-Tech: Apple/Tesla-Energy-Ruhe, Schweizer Präzision, Editorial-Look.
Nicht: Handwerker-Optik, grelle Solarfarben, SaaS-Template, überladene Verläufe.

## 1. Farben (nur über Tokens, nie Hex im Component-Code)

| Token | Wert | Verwendung |
|---|---|---|
| `--background` | #FFFDFD | Seitenhintergrund (Off-White) |
| `--solar-ink` / `--solar-navy` | #111315 | Deep Anthracite: starke Typo, Primär-Buttons, dunkle Flächen |
| `--solar-graphite` | #23272A | Zweite Dunkelstufe (Footer-Nuancen, Karten auf dunkel) |
| `--solar-slate` | #718E9E | Tech Blue-Grey: Eyebrows, Labels, technische Werte |
| `--solar-emerald` | #5B7332 | Deep Moss: lesbarer Grün-Textakzent auf hell (AA) |
| `--solar-leaf` | #CAE28E | Soft Solar Green: Signatur-Akzent — SPARSAM (Badges, Marker, CTA auf dunkel) |
| `--solar-gold` | #C8A35D | Dezentes Gold: Premium-Mikrodetails (feine Linien, Nummern) |
| `--solar-sand` | #D8D2C4 | Sand: feine Trennlinien, Editorial-Flächen |
| `--solar-cream` / `--secondary` | #F4F5F2 | Warm Light Grey: ruhige Zwischenflächen |

Regeln: Weissraum dominiert. Grün nie als grosse Fläche auf hell. Gold nur als Detail.
Dunkle Sektionen gezielt: Hero-Zone nein (bleibt hell mit Bild), Prozess/CTA-Band/Footer ja.

## 2. Typografie

- Headlines: `var(--font-heading)` = Inter Tight (automatisch auf h1–h4).
- Body: Inter. Technische Werte/Zahlen: Klasse `stat-mono` (Geist Mono, tabular-nums).
- H1: `text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight`
- H2 (Section): `text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-tight`
- Eyebrow über jeder Section-Headline: Klasse `eyebrow` (uppercase, Slate).
- Body: `text-[15px] sm:text-base leading-relaxed text-muted-foreground`, max-w-xl/2xl.
- Kurze, starke Aussagen. Keine Textwände. Magazine-Rhythmus.

## 3. Buttons (fertige Klassen aus globals.css — verwenden, nicht neu erfinden)

- `btn-primary` — Anthrazit-Pill, heller Text (Haupt-CTA auf hell)
- `btn-secondary` — Outline-Pill (Sekundär-CTA auf hell)
- `btn-ghost` — Textlink mit Pfeil
- `btn-primary-inverse` — Soft-Green-Pill auf dunklen Sektionen
- `btn-secondary-inverse` — weisse Outline-Pill auf dunkel
- Icons: lucide, `size-4`, Pfeil `ArrowRight` rechts.

## 4. Flächen & Karten

- `container-page` für jede Section; vertikaler Rhythmus `py-16 sm:py-24 lg:py-28`.
- Helle Karten: `rounded-3xl border border-border bg-white/70 p-6 lg:p-8` mit
  `transition hover:-translate-y-1 hover:shadow-[0_20px_50px_-24px_rgba(17,19,21,0.18)]`.
- `surface-glass` für hervorgehobene Panels, `surface-sand` für ruhige Zwischenzonen,
  `surface-navy` für dunkle Feature-Sektionen (ist jetzt Anthrazit).
- Auf dunkel: Karten `rounded-2xl border border-white/10 bg-white/[0.04]`.
- Radius-Sprache: aussen `rounded-3xl`, innen `rounded-2xl`, Buttons Pill.
- Fokus: IMMER `ring-focus` auf interaktiven Elementen.

## 5. Motion (framer-motion, restraint)

- Jede Section: `initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-80px"}} transition={{duration:reduce?0:0.6}}`.
- IMMER `useReducedMotion()` respektieren (Muster im Bestand).
- Erlaubt: Fade/Reveal, Count-up bei Zahlen, Hover-Lift, Stagger (0.04–0.08s).
- Verboten: Bounce, grosse Parallax, Dauer-Loops, Layout-Shift durch Animation.

## 6. Copy-Regeln

- Schweizer Hochdeutsch, IMMER ss statt ß. CHF-Beträge: `CHF 12'500` (Apostroph).
- Hauptclaim: «Solarenergie für Schweizer Dächer. Präzise geplant. Sauber umgesetzt.»
- Ton: präzise, ruhig, ehrlich, beratend. Keine Superlative, keine Renditeversprechen,
  keine Fake-Testimonials/-Logos/-Zahlen. Förderung/Wirtschaftlichkeit immer «indikativ».
- Microcopy-Bausteine: «Kostenfrei und unverbindlich», «Antwort innert eines Werktags»,
  «Wir empfehlen nur, was technisch und wirtschaftlich Sinn ergibt»,
  «Persönliche Beratung in Deutsch und Schweizerdeutsch».

## 7. Technische Leitplanken

- TypeScript strict; bestehende Props-Interfaces & Exporte NICHT brechen.
- Nur eigene zugewiesene Dateien anfassen. Keine neuen Dependencies.
- `next/image` für Bilder; lucide-react Icons; keine Emojis im UI.
- Mobile-first: 360px muss perfekt sein; grosse Touch-Ziele (min-h-12).
- Bestehende Funktionalität (Formulare, Rechner-Logik, APIs) unangetastet.
- Bild-Platzhalter: NICHT einbauen; wo ein Foto fehlt, hochwertige Token-Fläche
  (surface-sand/navy mit feiner Grafik) + im Code-Kommentar den AI-Bildprompt notieren.

## 8. Conversion

- Primär-CTA jeder Seite: «Solarpotenzial berechnen» → /solarrechner.
- Sekundär: «Kostenloses Angebot erhalten» → /angebote.
- Jede Seite endet mit CtaBand. CTAs nie doppelt direkt untereinander stapeln.
