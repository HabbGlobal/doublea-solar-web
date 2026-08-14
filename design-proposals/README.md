# Design-Dokumentation — Relaunch «Architectural Precision» (Stand 14.08.2026)

Konzept A «Architectural Precision» wurde am 14.08.2026 vollständig in die
Produktion übertragen (verbindliche Spec: `../docs/DESIGN-SPEC.md`); die
isolierten Mockups (`concept-a/`, `concept-b/`) wurden danach
vereinbarungsgemäss entfernt. Dieses Verzeichnis behält die Faktenprüfung
(`claim-register.md`), die Konzept-Dokumentation und die Foto-Shotlist.

Screenshots (Mockups + finale Umsetzung): `../artifacts/design-review/`.

## Gemeinsame Grundlage (beide Konzepte identisch)

- Inhalt: identisches Copy-Deck (Hero-Claim, 4 Sachaussagen, Haltungszitat,
  6 Leistungen, 5 Prozessschritte, 3 Anlagentypen-Dossiers, Faktenblock,
  Kontakt, Footer) — faire Vergleichbarkeit.
- Faktenblock: nur verifizierte Werte mit Quelle und Stand (siehe
  `claim-register.md`): EIV CHF 360/kWp (EnFV Anhang 2.1, Fedlex Stand
  1.7.2026), ElCom-Median H4 2026 27.7 Rp./kWh, Rücklieferung seit 1.1.2026
  nach BFE-Referenz-Marktpreis (Minimum 6.0 Rp./kWh < 30 kW), Modulgarantie
  30 Jahre (AIKO-Datenblatt), Richtpreis EFH als Firmen-Richtwert.
- Logo: bestehendes SVG aus `src/components/site/logo.tsx` unverändert
  übernommen (einzige Stelle mit Logofarben); Interface-Paletten beider
  Konzepte verzichten vollständig auf Logo-Hellgrün und Logo-Orange.
- Bildsprache: ausschliesslich klar gekennzeichnete Platzhalter
  («Projektfotografie in Vorbereitung») — keine Stock-/KI-Bilder, keine
  erfundenen Referenzen, keine Testimonials.
- A11y: Skip-Link, eine h1, lückenlose Hierarchie, 44px-Ziele,
  `:focus-visible`, Escape schliesst Menü, WCAG-AA-Kontraste (geprüft),
  `prefers-reduced-motion` neutralisiert alle Transitions.

## Konzept A — «Architectural Precision» (UMGESETZT)

Werkplan-Ästhetik eines Schweizer Ingenieurbüros: Die Seite steht als
Zeichenblatt zwischen sichtbaren Hairlines, der Hero trägt einen «Plankopf»
(Titelblock) mit den vier Sachaussagen, Leistungen sind eine Index-Tabelle,
der Prozess läuft an einer Massstab-Leiste mit Tick-Marken, die Fakten sind
eine echte Tabelle mit Quelle-/Stand-Spalten.

- Farben: `#F7F7F4` Papier · `#EFEFEA` Wechselfläche · `#D8D8D0` Hairline ·
  `#65665F` Stone (AA 5.4:1) · `#1A1C1C` Ink · `#252827` Graphit (dunkle
  Sektionen). Bewusst achromatisch — Präzision statt Farbe.
- Schrift: Archivo (400/500/600) + IBM Plex Mono (Labels, Nummern, Werte).
- Raster: 12 Spalten, max 1360px, 0px-Radius, 1px-Linien; Sektionskopf mit
  Mono-Nummer 01–07.
- Interaktion: nur Farb-/Flächenwechsel 150ms, keine Reveals, kein Parallax.

## Konzept B — «Quiet Swiss Editorial» (nicht gewählt, dokumentiert)

Ruhige Schweizer Publikation: Zeitungs-Masthead (zentriertes Logo, Nav
zwischen Hairlines), rein typografischer Serifen-Hero, Leistungen als
nummerierte Kapitel in der 720px-Schmalspalte, Prozess an einer Vertikal-Regel,
Wirtschaftlichkeit als redaktioneller **Fussnotenapparat** mit Quellen.

- Farben: `#F6F3EC` Papier · `#FBFAF6` hell · `#DED9CC` Hairline · `#1C1B17`
  Tinte · `#57544A` Schiefer · `#2E3D4F` Tintenblau (nur Unterstreichungen,
  Fussnoten, Regeln) · `#232228` Nacht (CTA-Sektion).
- Schrift: Newsreader (Display/Italic) + Instrument Sans (Fliesstext/UI).
- Raster: Wechsel Schmalspalte 720px / Ausbrüche 1200px, 2px-Radius.
- Interaktion: Unterstreichungs-Übergänge 180ms, sonst Ruhe.

## Foto-Shotlist (für die spätere professionelle Fotoserie)

Ziel: dokumentarisch, ruhig, real — keine gestellten Szenen, keine Drohnen-
Stock-Optik. Empfohlen: 1 Fototag mit Architektur-/Industriefotograf:in,
goldene Stunde + Vormittag, Region Grenchen/Solothurn.

1. **Referenzanlage EFH komplett** (nach Kundenfreigabe): Süddach mit Modulen,
   frontal vom Boden, Morgenlicht — Hauptmotiv Hero/Projekte (Querformat 3:2 + 21:9-Crop).
2. **Dachdetail Modulkante/Unterkonstruktion**: Nahaufnahme Klemme, Schiene,
   Kabelführung — Beleg für Montagequalität (Konzept-A-Bildsprache).
3. **Technikraum**: Wechselrichter + Speicher an der Wand, aufgeräumte
   Kabelführung, neutrales Licht (4:3).
4. **Arbeitssituation Montage**: Monteur:in mit PSA auf dem Dach beim Setzen
   eines Moduls, dokumentarisch von der Leiter/Hebebühne (keine Posen).
5. **Beratungssituation**: Hände + Plan/Tablet mit sonnendach.ch-Auswertung am
   Tisch, Tageslicht — ohne Gesichter inszenierbar, DSG-unkritisch.
6. **Porträt Inhaber/Team**: schlicht, Tageslicht, neutraler Hintergrund
   (Werkstatt/Fassade) — für «Über uns» und Offerten.
7. **Firmenstandort Grenchen**: Gebäude/Umgebung Oelirain, zurückhaltend —
   lokale Verankerung ohne Postkarten-Klischee.
8. **Komponenten-Stillleben**: Modul, Optimierer, Klemmen auf neutralem Grund
   (Produkt-Detail für Pakete/Leistungen).
9. **ZEV/MFH-Flachdach** (sobald Referenz vorhanden): Ost-West-Aufständerung,
   erhöhter Standpunkt (kein Drohnen-Hochglanz nötig).
10. **Übergabemoment**: Schlüssel-/Protokollübergabe oder Monitoring-App in
    Kundenhand — Abschlussbild Prozess (Hände genügen).

Rechtliches: Kundenfreigaben schriftlich (Formular), Mitarbeitende einwilligen
lassen, keine Nachbargebäude prominent ohne Freigabe.

## Status

Übertrag abgeschlossen (alle öffentlichen Seiten, Formulare, Rechner-UI,
Admin), Register-Korrekturen umgesetzt, Mockup-Code entfernt (14.08.2026).
