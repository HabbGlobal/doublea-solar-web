# DoubleA Solar Solutions — Designsystem «Soft Solar» (verbindlich, Stand 08/2026)

Neumorphism, hell, schlicht. Eine warme Grundfläche, Tiefe nur durch weiche
Doppelschatten, Schwarz und Gold aus dem Logo 2026. Wenig Text, schnell verstanden.
Löst das Werkplan-System «Architectural Precision» vollständig ab.

## 1. Farben (nur über Tokens in `src/app/globals.css`)

| Token | Wert | Verwendung |
|---|---|---|
| `--background` (auch `--card`) | #EEECE6 | die eine Grundfläche — Seite UND Karten |
| `--foreground` / `--solar-ink` | #121212 | Text (Logo-Schwarz) |
| `--muted-foreground` | #5C5B55 | Zweittext, Labels (AA 6.1:1) |
| `--secondary` | #E6E4DD | leichte Flächen, Trennlinien-Ton |
| `--primary` / `--solar-gold` | #C9A227 → Verlauf #DDB955→#B8912A | Hauptaktion, Punkte, Badges, aktive Zustände |
| `--accent` | #F1E7C8 | Badge-Grund, Selektion |
| `--neu-light` / `--neu-dark` | #FFFFFF / #CFCABF | die beiden Schatten |

Gold nie für kleinen Fliesstext. Keine dunklen Sektionen, kein Dunkelmodus,
keine Verläufe als Flächen (nur im Gold-Button).

## 2. Tiefe statt Linien

| Utility | Wirkung | Einsatz |
|---|---|---|
| `.neu` | erhaben, Radius 22 px | Karten, Panels, Footer, Abschluss-Band |
| `.neu-sm` | erhaben klein, Radius 16 px | Header-Leiste, Pills, Thumbnails, Zahlenkreise |
| `.neu-in` | eingelassen | Eingabefelder, Anzeigen, Foto-Rahmen, Leerzustände |
| `.neu-photo` | Foto im eingelassenen Rahmen | alle Bilder in Kacheln |
| `.gold-dot` | goldener Punkt | einziges Ornament (Karten-Kopf, Mini-Bullets) |

Keine Rahmenlinien um Karten. Radius überall: `rounded-2xl` für Karten/Buttons/
Felder, `rounded-full` für Kreise und Pills. Dezente `border-t border-border`
nur als Zeilentrenner innerhalb einer Karte.

## 3. Typografie

- Eine Familie: Plus Jakarta Sans (`--font-sans`); Mono-Rolle zeigt auf dieselbe Schrift.
- H1 `text-4xl sm:text-5xl lg:text-[3.6rem] font-bold leading-[1.08]`; H2 via `SectionTitle`
  (`text-3xl sm:text-4xl font-bold`); Karten-Titel `text-lg font-semibold`.
- `.eyebrow` = kleiner Kicker (uppercase, gesperrt, gedämpft). `.stat-mono` = Zahlen
  tabellarisch, halbfett.
- Text kurz: Sektion = Titel + ein Satz; Karte = Titel + ein Satz.

## 4. Komponenten

- Buttons: `.btn-primary` (Gold) für die eine Hauptaktion je Sicht, `.btn-secondary`
  (weich erhaben), `.btn-ghost` (Text mit Gold-Unterstrich). Gedrückt = eingelassen.
- Header: durchscheinende Leiste (`bg-background/70 backdrop-blur`) mit `.neu-sm`-Bar;
  Höhe 88 px. Der Hero zieht sich mit `-mt-[88px]` darunter, damit das Dachbild
  hinter dem Header liegt.
- Hero: `/header-dach.jpg` verblasst (horizontal links 94 % → rechts 48 % Deckung,
  vertikal in die Grundfläche auslaufend); links Titel + Satz + Aktionen, rechts die
  ersten zwei publizierten Team-Mitglieder als `.neu`-Kreise. Kein Video, kein Plankopf.
- `SectionHead` rendert nichts mehr (historischer Hook); `SectionTitle` bleibt.
- Bilder immer über `next/image` (Supabase Storage `site-images`, `remotePatterns **.supabase.co`).
- Logo: `/logo-2026.png` (Original, transparent, getrimmt, 2.93:1) via `Logo`-Komponente.

## 5. Bewegung & Zugänglichkeit

- Nur Farb-/Schatten-Transitions 150 ms, Buttons `hover:-translate-y-px`; keine Reveals.
- `prefers-reduced-motion` neutralisiert alles (globals.css).
- Fokus: `.ring-focus` (Goldring 3 px). Touch-Ziele ≥ 44 px. Skip-Link vorhanden.
- Kontrast: Text auf Grundfläche ≥ 6:1; Schatten sind nie der einzige Träger einer
  Information (Labels/Texte immer vorhanden).

## 6. Inhalte

- Alles Editierbare kommt aus dem Admin (`site_content`, `team_members`, `projects`,
  `packages`); Fallbacks im Code bleiben kuratiert und kurz.
- Schweizer Hochdeutsch, ss statt ß, `CHF 12'500`, Zahlen nur belegt oder als
  Richtwert gekennzeichnet (Quellen auf /finanzierung).
- Primär-CTA «Angebot einholen» → /angebote; sekundär «Solarpotenzial berechnen».
