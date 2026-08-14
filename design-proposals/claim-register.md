# Claim Register — DoubleA Solar Solutions

Prüfdatum: **14. August 2026** · Methode: Live-Recherche gegen Schweizer Primärquellen
(Fedlex/EnFV, Pronovo, ElCom, BFE/EnergieSchweiz, KBOB, ESTI/NIV, kantonale Steuerpraxis,
Original-Datenblätter, lokaler VNB SWG Grenchen). Jede zitierte Quelle wurde tatsächlich
geladen und inhaltlich geprüft; nicht ladbare Quellen wurden nicht zitiert.

Grundlage: vollständiges Claim-Inventar mit **230 Fundstellen** (130 Seiten/Sektionen + 100 Rechner/Engine/Metadaten),
verdichtet auf die untenstehenden fachlich eigenständigen Aussagen. Bewertungsskala:
verifiziert · bedingt gültig · veraltet · irreführend · unbelegt/nicht verifizierbar · falsch · Firmenangabe.

---

## Förderung (Pronovo EIV)

**Cluster-Fazit:** Der Kernwert der Website stimmt: Die Pronovo-Einmalvergütung beträgt für den Standardfall (angebaute/freistehende Anlage <30 kWp mit Eigenverbrauch, Inbetriebnahme ab 1.4.2025) exakt CHF 360/kWp — belegt durch EnFV Anhang 2.1 Ziff. 2.9 (Fedlex, Stand 1.7.2026, Volltext geprüft); alle Beispiele 8.2/10/15/23 kWp ergeben genau 360 CHF/kWp, erst ab 30 kWp sinkt der Mischsatz (40 kWp: 345 CHF/kWp). Der Begriff «Grundbeitrag» im Code ist jedoch falsch: Der Grundbeitrag ist seit 1.4.2024 abgeschafft (CHF 0), die 360 sind der Leistungsbeitrag; integrierte Anlagen erhalten 400 CHF/kWp, Volleinspeiser (HEIV) 450 CHF/kWp. Die FAQ-Aussage «tagesaktuell festgelegt … hängt von Eigenverbrauchsoptimierung ab» ist sachlich falsch — massgebend ist das Inbetriebnahmedatum mit verordnungsfixierten Sätzen (unverändert seit 1.4.2025), und Eigenverbrauchsoptimierung beeinflusst die Höhe nicht (nur binär mit/ohne Eigenverbrauch). 2026-Neuerungen betreffen nur Grossanlagen ab 100 kW (neuer Winterstrombonus per 1.1.2026, Parkflächenbonus; Höhenbonus in der Fassung Stand 1.7.2026 gestrichen) — für das DoubleA-Kernsegment 5-40 kWp gab es 2026 keine Kürzung.

### R-001 — irreführend

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | «Pronovo EIV 2026: ca. CHF 360/kWp Grundbeitrag» (Konstante PRONOVO_CHF_PER_KWP = 360) |
| Fundstelle | src/lib/solar/calculate.ts:197-198 |
| Bewertung | irreführend |
| Korrektur | Zahl beibehalten, Begriff korrigieren: CHF 360/kWp ist der LEISTUNGSBEITRAG für angebaute und freistehende Anlagen <30 kWp mit Eigenverbrauch (Inbetriebnahme ab 1.4.2025). Der Grundbeitrag beträgt seit 1.4.2024 CHF 0 (abgeschafft). Empfohlener Kommentar: «Pronovo-Einmalvergütung (KLEIV): Leistungsbeitrag CHF 360/kWp für angebaute Anlagen <30 kWp mit Eigenverbrauch (EnFV Anhang 2.1 Ziff. 2.9, Stand 1.7.2026); integriert CHF 400/kWp; ab 30 kWp anteilig CHF 300/kWp; kein Grundbeitrag mehr.» |
| Geltungsbereich | Schweizweit einheitliche Bundesförderung (keine regionale Varianz); gilt für Kategorie angebaut/freistehend, Leistungsklasse <30 kW, mit Eigenverbrauch; integriert: 400/kWp; ohne Eigenverbrauch (HEIV, <150 kW): 450/kWp |
| Zeitraum | Sätze gültig für Inbetriebnahmen ab 1.4.2025, unverändert in Kraft am Prüfdatum 2026-08-14 (EnFV Stand 1.7.2026) |
| Berechnung | EIV [CHF] = Grundbeitrag (0) + min(P;30)×360 + max(P−30;0)×300, P in kWp. Beispiele: 8.2 kWp → 2'952 (360.0/kWp); 10 kWp → 3'600 (360.0/kWp); 15 kWp → 5'400 (360.0/kWp); 23 kWp → 8'280 (360.0/kWp); 40 kWp → 13'800 (345.0/kWp). Keine Rundung nötig, Sätze sind ganzzahlig. |
| Quelle | Schweizerischer Bundesrat / Fedlex (SR 730.03) — Energieförderungsverordnung (EnFV), Stand 1. Juli 2026 |
| Quellen-URL | https://fedlex.data.admin.ch/filestore/fedlex.data.admin.ch/eli/cc/2017/766/20260701/de/html/fedlex-data-admin-ch-eli-cc-2017-766-20260701-de-html.html |
| Quellenstelle | Anhang 2.1 Ziff. 2.8-2.10 (Tabellen «Ab 1.4.2025»: angebaut/freistehend 360/300/250 Fr./kW, integriert 400/330/250 Fr./kW, Grundbeitrag 0; HEIV 450 Fr./kW) |
| Zweitquelle | Pronovo AG, «Häufige Fragen zur Einmalvergütung», https://pronovo.ch/de/foerderung/photovoltaik/haeufige-fragen/ (bestätigt HEIV 450 Fr./kW und Boni; nennt selbst keine KLEIV-Basissätze) |
| Unsicherheit | Zahl exakt (Verordnungswert, keine Bandbreite). Einzige Varianz: Kategorie (angebaut 360 / integriert 400 / ohne EV 450) und Leistungsklasse (ab 30 kWp anteilig 300). UVEK überprüft Sätze jährlich; Anpassungen historisch per 1.1./1.4. in 20-CHF-Schritten (380→360 per 1.4.2025). |
| Nächste Prüfung | 2026-12-15 (Pronovo publiziert Neuerungen fürs Folgejahr jeweils Ende Jahr; spätestens vor 1.4.2027 erneut prüfen) |

### R-002 — bedingt gültig

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | Rechner nutzt Förder-Spanne 330-390 CHF/kWp (PRONOVO_CHF_PER_KWP ± 30) mit Kommentar «Spanne dünn, weil der Wert sehr stabil ist» |
| Fundstelle | src/lib/solar/calculate.ts:316-319 |
| Bewertung | bedingt gültig |
| Korrektur | Für den Standardfall (angebaute Anlage <30 kWp mit Eigenverbrauch) ist die Spanne sicher: effektiver Wert exakt 360 CHF/kWp, bei 30-40 kWp anteilig 345-360 CHF/kWp — alles innerhalb 330-390. NICHT abgedeckt: integrierte Anlagen (400 CHF/kWp, z.B. Indach/Solarziegel) und Volleinspeiser (HEIV 450 CHF/kWp). Falls der Rechner solche Fälle bedienen soll: Spanne auf 330-400 erweitern oder Fussnote «angebaute Anlagen; Indach höher». Stabilitäts-Aussage ist belegt: Sätze seit 1.4.2025 unverändert, Änderungen erfolgen per Verordnungsrevision in kleinen Schritten. Rechenlogik gemäss Projektvorgabe nicht anfassen — nur Beschriftung präzisieren. |
| Geltungsbereich | Schweizweit (Bundesförderung); Spanne korrekt für angebaute/freistehende Anlagen 2-40 kWp mit Eigenverbrauch; zu tief für integrierte Anlagen und Volleinspeiser |
| Zeitraum | Sätze gültig für Inbetriebnahmen ab 1.4.2025; Prüfdatum 2026-08-14 |
| Berechnung | subsidyLow = kWp×330, subsidyHigh = kWp×390. Referenz: gesetzlicher Wert 360 CHF/kWp (<30 kWp angebaut, mit EV); 40 kWp effektiv 345 CHF/kWp (13'800/40); integriert 400 CHF/kWp läge 10 CHF/kWp über subsidyHigh. |
| Quelle | Schweizerischer Bundesrat / Fedlex (SR 730.03) — Energieförderungsverordnung (EnFV), Stand 1. Juli 2026 |
| Quellen-URL | https://fedlex.data.admin.ch/filestore/fedlex.data.admin.ch/eli/cc/2017/766/20260701/de/html/fedlex-data-admin-ch-eli-cc-2017-766-20260701-de-html.html |
| Quellenstelle | Anhang 2.1 Ziff. 2.5 (anteilige Berechnung ab 30 kW), Ziff. 2.8 (integriert 400/330), Ziff. 2.9 (angebaut 360/300), Ziff. 2.10 (HEIV 450) |
| Zweitquelle | Pronovo AG, «Neuerungen Einmalvergütung Photovoltaik», https://pronovo.ch/de/foerderinstrumente/neuerungen-einmalverguetung-photovoltaik/ (dokumentiert Satzanpassungen per 1.1./1.4.2025 in 20-CHF-Schritten) |
| Unsicherheit | Innerhalb der Kategorie keine Unsicherheit (Verordnungswerte). Kategorien-Streuung 300-450 CHF/kWp je nach Bauart, Grösse und Eigenverbrauch. Nächste reguläre Anpassungsfenster: 1.1.2027 / 1.4.2027. |
| Nächste Prüfung | 2026-12-15 |

### R-003 — verifiziert

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | «Pronovo-Einmalvergütung (indikativ ~CHF 360/kWp) reduziert die Investition zusätzlich.» |
| Fundstelle | src/app/pakete/page.tsx:354-356 |
| Bewertung | verifiziert |
| Korrektur | Claim beibehalten — «indikativ ~CHF 360/kWp» trifft den heute gültigen Leistungsbeitrag für den typischen Fall (angebaute EFH-Anlage <30 kWp mit Eigenverbrauch) exakt. Optionale Präzisierung für Vertrauensgewinn: «Pronovo-Einmalvergütung: aktuell CHF 360/kWp für angebaute Anlagen unter 30 kWp (integriert CHF 400/kWp), Stand EnFV, Inbetriebnahmen ab 1.4.2025.» |
| Geltungsbereich | Schweizweit; angebaute/freistehende Anlagen <30 kWp mit Eigenverbrauch (Standard-EFH-Fall der Paketseite) |
| Zeitraum | Gültig für Inbetriebnahmen ab 1.4.2025; in Kraft am Prüfdatum 2026-08-14 |
| Berechnung | Typische Paket-Grössen: 10 kWp → CHF 3'600; 15 kWp → CHF 5'400 (P×360, exakt). Erst ab 30 kWp sinkt der Mischsatz (40 kWp → 345 CHF/kWp). |
| Quelle | Schweizerischer Bundesrat / Fedlex (SR 730.03) — Energieförderungsverordnung (EnFV), Stand 1. Juli 2026 |
| Quellen-URL | https://fedlex.data.admin.ch/filestore/fedlex.data.admin.ch/eli/cc/2017/766/20260701/de/html/fedlex-data-admin-ch-eli-cc-2017-766-20260701-de-html.html |
| Quellenstelle | Anhang 2.1 Ziff. 2.9, Spalte «Ab 1.4.2025», Leistungsbeitrag <30 kW = 360 Fr./kW |
| Unsicherheit | Exakter Verordnungswert; ±0 für den Standardfall. Abweichung nur bei integrierter Bauweise (+40/kWp) oder Volleinspeisung (+90/kWp). |
| Nächste Prüfung | 2026-12-15 |

### R-004 — falsch

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | FAQ: «Die Einmalvergütung wird tagesaktuell festgelegt und hängt von Anlagengrösse und Eigenverbrauchsoptimierung ab.» |
| Fundstelle | src/components/sections/faq-section.defaults.ts:17-20 (Frage «Wie hoch ist die Förderung über Pronovo EIV?») |
| Bewertung | falsch |
| Korrektur | Ersatzformulierung: «Die Einmalvergütung ist in der Energieförderungsverordnung des Bundes festgelegt und richtet sich nach Anlagenkategorie (angebaut, integriert, freistehend), Leistung und danach, ob Sie Eigenverbrauch nutzen. Aktuell beträgt sie für typische Aufdach-Anlagen unter 30 kWp CHF 360 pro kWp. Massgebend sind die Ansätze am Tag der Inbetriebnahme; der Bund passt sie in der Regel auf Jahres-/Quartalsbeginn an. Wir prüfen den aktuellen Stand für Ihr Projekt und übernehmen den Antrag.» Begründung: (a) Sätze werden NICHT tagesaktuell festgelegt, sondern per Verordnungsrevision (zuletzt Satzsenkung per 1.4.2025, davor 1.4.2024); massgebend ist das Inbetriebnahmedatum. (b) «Eigenverbrauchsoptimierung» beeinflusst die EIV-Höhe nicht — relevant ist nur binär mit/ohne Eigenverbrauch (ohne EV = hohe EIV 450 Fr./kW). (c) Anlagengrösse stimmt (Leistungsklassen). |
| Geltungsbereich | Schweizweit (Bundesförderung); alle Kundentypen |
| Zeitraum | EnFV Stand 1.7.2026; Prüfdatum 2026-08-14 |
| Berechnung | Nicht zutreffend (Begriffs-/Verfahrensclaim). Beleg der Nicht-Tagesaktualität: Satz 360 Fr./kW unverändert seit 1.4.2025, d.h. >16 Monate konstant am Prüfdatum. |
| Quelle | Schweizerischer Bundesrat / Fedlex (SR 730.03) — Energieförderungsverordnung (EnFV), Stand 1. Juli 2026 |
| Quellen-URL | https://fedlex.data.admin.ch/filestore/fedlex.data.admin.ch/eli/cc/2017/766/20260701/de/html/fedlex-data-admin-ch-eli-cc-2017-766-20260701-de-html.html |
| Quellenstelle | Anhang 2.1 Ziff. 2.8-2.10 (Sätze nach Inbetriebnahme-Perioden, nicht tagesaktuell; Kategorien und Leistungsklassen); Art. 16 Abs. 3 (regelmässige Überprüfung, Anpassung bei wesentlicher Veränderung) |
| Zweitquelle | Pronovo AG, Tarifrechner-Seite, https://pronovo.ch/de/services/tarifrechner/ («Vergütungssätze variieren entsprechend dem Datum der Inbetriebnahme», Aktualisierung «jeweils per Anfang Januar») |
| Unsicherheit | Keine — Festlegungsmechanismus ist eindeutig verordnungsbasiert. Einzig kantonale/kommunale Zusatzförderungen (separates Thema) ändern häufiger. |
| Nächste Prüfung | 2026-12-15 |

### R-005 — bedingt gültig

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | Implizite Annahme des Rechners/der Website: EIV-Struktur und -Höhe 2026 unverändert; keine 2026-Neuerungen berücksichtigt |
| Fundstelle | src/lib/solar/calculate.ts:197-198, 316-319 (gesamte Förderlogik) |
| Bewertung | bedingt gültig |
| Korrektur | Für das Zielsegment (EFH/Gewerbe 5-40 kWp) ist die Annahme korrekt: KLEIV-Sätze 2026 unverändert (keine Kürzung seit 1.4.2025). Änderungen 2026 betreffen nur Grossanlagen und sollten bei Gewerbe-Beratung ab 100 kWp erwähnt werden: (1) NEU Winterstrombonus für grosse PV-Anlagen ab 100 kW mit Inbetriebnahme ab 1.1.2026 und spezifischem Winterertrag >500 kWh/kW: 3.50 Fr. (ohne EV) bzw. 2.50 Fr. (mit EV) pro kW multipliziert mit dem durchschnittlichen spezifischen Winterstrommehrertrag der ersten drei Winterhalbjahre (V vom 26.11.2025, in Kraft 1.1.2026). (2) Der frühere Höhenlagen-Bonus (250 Fr./kW ab 1500 m ü.M.) ist in der Fassung Stand 1.7.2026 nicht mehr enthalten (noch enthalten in Fassung Stand 1.1.2026). (3) Auktionen betreffen nur Volleinspeise-Anlagen ab 150 kW (HEIV), nicht das KLEIV-Segment. (4) Weiter gültige Boni: Neigungswinkel ≥75°: integriert 400 Fr./kW, angebaut/freistehend 200 Fr./kW; Parkflächenbonus 250 Fr./kW (ab 100 kW). |
| Geltungsbereich | KLEIV-Kernaussage schweizweit; 2026-Neuerungen (Winterstrombonus, Parkflächenbonus) nur Anlagen ab 100 kW; Höhenbonus-Streichung betrifft freistehende Anlagen ab 1500 m ü.M. |
| Zeitraum | Rechtsstand 1.7.2026 vs. 1.1.2026 verglichen; Prüfdatum 2026-08-14 |
| Berechnung | Vergleich Fassungen: angebaut <30 kW = 360 Fr./kW identisch in EnFV Stand 1.1.2026 und Stand 1.7.2026; keine neue Inbetriebnahme-Spalte nach «Ab 1.4.2025». |
| Quelle | Schweizerischer Bundesrat / Fedlex (SR 730.03) — Energieförderungsverordnung (EnFV), Stand 1. Juli 2026 (Vergleichsfassung: Stand 1. Januar 2026) |
| Quellen-URL | https://fedlex.data.admin.ch/filestore/fedlex.data.admin.ch/eli/cc/2017/766/20260701/de/html/fedlex-data-admin-ch-eli-cc-2017-766-20260701-de-html.html |
| Quellenstelle | Anhang 2.1 Ziff. 2.7.1-2.7.4 (Boni inkl. neuem Winterstrombonus), Ziff. 2.8/2.9 (unveränderte Sätze); Art. 38 Abs. 2 Bst. c (Winterstrombonus: grosse Anlagen, >500 kWh/kW Winterertrag, IBN ab 1.1.2026); Vergleichsfassung 1.1.2026: https://fedlex.data.admin.ch/filestore/fedlex.data.admin.ch/eli/cc/2017/766/20260101/de/html/fedlex-data-admin-ch-eli-cc-2017-766-20260101-de-html.html (dort Ziff. 2.7.3 noch Höhenbonus 250 Fr./kW ab 1500 m) |
| Zweitquelle | Pronovo AG, «Häufige Fragen zur Einmalvergütung», https://pronovo.ch/de/foerderung/photovoltaik/haeufige-fragen/ (Winterstrombonus ab 100 kW, IBN ab 1.1.2026, Winterproduktion mind. 500 kWh/kW; Parkflächenbonus 250 Fr./kW ab 1.1.2025) |
| Unsicherheit | Winterstrombonus-Auszahlung hängt vom tatsächlichen Winterertrag der ersten drei Winterhalbjahre ab (nicht ex ante fix). Mögliche EnFV-Teilrevision Mitte/Ende 2026 zum Bewirtschaftungsentgelt betrifft nur EVS-Direktvermarktung, nicht die EIV (Pronovo-News vom 10.12.2025). |
| Nächste Prüfung | 2026-12-15 |

---

## Strompreise (ElCom / SWG Grenchen)

**Cluster-Fazit:** Der Rechner-Default von 30 Rp./kWh ist 2026 nicht falsch, aber unscharf deklariert: Der ElCom-Median H4 liegt bei 27.7 Rp./kWh (Gesamtpreis, −4% ggü. 2025), was inkl. 8.1% MwSt ~29.9 Rp. ergibt — 30 Rp. entspricht also ziemlich genau dem Brutto-Gesamtpreis eines Medianhaushalts, und auch der lokale Versorger SWG Grenchen landet bei ~29.6 Rp. inkl. MwSt (BKW Bern 27.7, Stadt Solothurn ~28–29 exkl. MwSt). Methodisch problematisch ist jedoch, dass die Ersparnisformel (Eigenverbrauch × Preis) nur mit dem variablen Arbeitspreis korrekt ist: In Grenchen sind davon nur 24.50 Rp. exkl. / ~26.5 Rp. inkl. MwSt (Hochtarif-Tagfenster) tatsächlich vermeidbar, während 169 CHF/Jahr Grund- und Messgebühren fix bleiben — der Rechner überzeichnet die Eigenverbrauchs-Ersparnis damit um rund 13%. Der Mantelerlass verschärft das ab 2026 strukturell: Messkosten müssen neu als separater, fixer Tarif ausgewiesen werden, wodurch der nicht vermeidbare Anteil der Stromrechnung wächst. Empfehlung: Default auf 26–27 Rp. senken und als «variabler Arbeitspreis inkl. MwSt, ohne Grundgebühren» labeln, oder 30 Rp. behalten und explizit als Brutto-Gesamtpreis mit entsprechendem Vorbehalt deklarieren; die UI-Spanne 5–80 Rp. kann bleiben. Nebenbefund für den Einspeise-Cluster: SWG vergütet 2026 Rücklieferungen <150 kWp mit 8.70 Rp. (Winter) / 6.20 Rp. (Sommer) + 2.50 Rp. HKN — der Rechner-Default von 10 Rp. Einspeisetarif wäre dort zu prüfen.

### R-006 — bedingt gültig

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | Rechner-Default Strompreis 30 Rp./kWh (electricityPriceRappen ?? 30) |
| Fundstelle | src/lib/solar/calculate.ts:287, src/components/solar/solar-calculator.tsx:128, src/lib/email/notify.ts:246 |
| Bewertung | bedingt gültig |
| Korrektur | 30 Rp. liegt 2.3 Rp. über dem ElCom-Median 2026 (27.7 Rp./kWh, H4, Gesamtpreis). Inkl. 8.1% MwSt entspricht der Median ~29.9 Rp. — 30 Rp. ist also als Brutto-Gesamtpreis haltbar, als Netto-Wert leicht zu hoch. Empfehlung: Default auf 27 Rp. senken ODER 30 Rp. beibehalten und im UI explizit als «Gesamtpreis inkl. MwSt» deklarieren (besser: siehe Methodik-Zeile — vermeidbarer Arbeitspreis ansetzen). |
| Geltungsbereich | Schweiz, Grundversorgung Haushalte, Profil H4 (4500 kWh/Jahr, 5-Zi-Wohnung mit Elektroherd+Tumbler); Median über alle Netzbetreiber |
| Zeitraum | Tarifjahr 2026 (publiziert 2025-09-09); Prüfdatum 2026-08-14 |
| Berechnung | 27.7 Rp./kWh × 1.081 (MwSt 8.1%) = 29.94 Rp./kWh brutto; Abweichung Default: 30/27.7 = +8.3% (netto) bzw. +0.2% (brutto) |
| Quelle | ElCom (Eidgenössische Elektrizitätskommission) — Medienmitteilung «Leicht sinkende Strompreise 2026» |
| Quellen-URL | https://www.elcom.admin.ch/de/newnsb/8nuE_fvwnfqCu8OHNOwKu |
| Quellenstelle | Gesamttarif H4: 27.7 Rp./kWh (−1.3 Rp., ca. −4%), Jahresrechnung 1'247 CHF; Komponenten: Energie 12.11, Netz 10.75, Messtarif 74.40 CHF/Jahr (=1.65 Rp. bei H4), Netzzuschlag 2.3, Stromreserve 0.41, Solidaritätszuschlag 0.05, Gemeinwesen ~1 Rp. |
| Zweitquelle | BKW (Bern, Grossteil Versorgungsgebiet): ebenfalls 27.7 Rp./kWh 2026 bei Gemeindeabgabe 1.5 Rp. (Medienmitteilung 14.08.2025, https://www.bkw.ch/de/ueber-uns/aktuell/medien/medienmitteilungen/die-bkw-senkt-2026-die-stromtarife-in-der-grundversorgung, per Browser geladen) |
| Unsicherheit | MwSt-Status ist in der ElCom-Mitteilung nicht ausgewiesen (ElCom publiziert Tarife üblicherweise exkl. MwSt; nicht separat verifiziert, da strompreis.elcom.admin.ch als SPA nicht maschinell ladbar). Median ≠ Einzeltarif: Tarife variieren laut ElCom «zum Teil erheblich» zwischen Netzbetreibern — konkrete Spannweite in der MM nicht beziffert. |
| Nächste Prüfung | 2026-09-15 (ElCom publiziert Tarife 2027 Anfang September 2026) |

### R-007 — verifiziert (als Brutto-Gesamtpreis) / veraltet als Arbeitspreis-Annahme

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | 30 Rp./kWh als Default für Kunden im Heimmarkt Grenchen (Netzgebiet SWG) |
| Fundstelle | src/lib/solar/calculate.ts:287 (Default wirkt für alle Standorte, auch Grenchen) |
| Bewertung | verifiziert (als Brutto-Gesamtpreis) / veraltet als Arbeitspreis-Annahme |
| Korrektur | SWG Grenchen 2026, Haushalt NS bis 50'000 kWh: variabler Arbeitspreis HT (07–21 Uhr) 24.50 Rp./kWh, NT 22.10 Rp./kWh, jeweils exkl. MwSt; fix 8.50 CHF/Mt Grundpreis + 5.60 CHF/Mt Messpreis. Gesamtpreis H4-analog ≈ 27.4 Rp. exkl. / ≈ 29.6 Rp. inkl. MwSt → 30 Rp. ≈ Brutto-Gesamtpreis, ABER der für PV-Ersparnis vermeidbare Arbeitspreis (Tagfenster = HT) beträgt nur 24.50 exkl. / 26.5 Rp. inkl. MwSt. Für Grenchner Kunden Default eher 26–27 Rp. ansetzen. |
| Geltungsbereich | Stadt Grenchen SO, Netzgebiet SWG, Grundversorgung Niederspannung bis 50'000 kWh/Jahr |
| Zeitraum | Tarife gültig ab 2026-01-01; Prüfdatum 2026-08-14 |
| Annahmen | HT-Anteil 62.5% gemäss SWG-eigenem Berechnungsbeispiel (ElCom-H4 rechnet mit anderem HT-Anteil, Effekt < ±0.5 Rp.); MwSt-Normalsatz 8.1% |
| Berechnung | H4 4500 kWh, HT-Anteil 62.5% (SWG-Beispielprofil 500/300 kWh, S. 11): variabel = 0.625×24.50 + 0.375×22.10 = 23.60 Rp.; Fixkosten (8.50+5.60)×12 = 169.20 CHF/a ÷ 4500 kWh = 3.76 Rp. → Total 27.36 Rp. exkl. MwSt; ×1.081 = 29.58 Rp. inkl. MwSt. Vermeidbarer HT-Arbeitspreis: 24.50 × 1.081 = 26.48 Rp. inkl. MwSt (gerundet auf 2 Dezimalen) |
| Quelle | SWG (Städtische Werke Grenchen) — Preisinformation Elektrizität, gültig ab 1. Januar 2026 |
| Quellen-URL | https://www.swg.ch/hubfs/02_Dokumente/03_Preisinformation/2026_swg-preisinformation-elektrizitaet.pdf |
| Quellenstelle | S. 3 Tarifübersicht (HT 13.35+7.00+4.15=24.50; NT 12.15+5.80+4.15=22.10; Grundpreis 8.50, Messpreis 5.60 CHF/Mt, alle exkl. MwSt); S. 4 Abgaben-Zusammensetzung (SDL 0.27, Stromreserve 0.41, solidarisierte Kosten 0.05, Gemeinwesen 1.12, Netzzuschlag 2.30 = 4.15) |
| Unsicherheit | Spanne Total je nach HT/NT-Mix 27.0–28.0 Rp. exkl. MwSt; PV-Eigenverbrauch fällt fast vollständig ins HT-Fenster (07–21 Uhr), Batterieentladung nach 21 Uhr verschiebt einen kleinen Teil in den NT (22.10 Rp.) |
| Nächste Prüfung | 2026-10-01 (SWG publiziert Tarife 2027 üblicherweise Ende August/September) |

### R-008 — irreführend (methodisch, bei Interpretation von 30 Rp. als Gesamtpreis)

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | Ersparnis-Methodik: annualSavingsChf = Eigenverbrauch × voller Strompreis (30 Rp.) + Einspeisung × Einspeisetarif |
| Fundstelle | src/lib/solar/calculate.ts:290-294 (savings-Funktion) |
| Bewertung | irreführend (methodisch, bei Interpretation von 30 Rp. als Gesamtpreis) |
| Korrektur | Die Multiplikation Eigenverbrauch × Preis ist als Formel korrekt — aber nur mit dem VARIABLEN Arbeitspreis, nicht mit dem Gesamtpreis: fixe Grundgebühren (SWG Grenchen: 169.20 CHF/Jahr exkl. MwSt = Grundpreis + Messpreis; ElCom-Median Messtarif allein 74.40 CHF/Jahr) fallen mit PV unverändert an und sind NICHT vermeidbar. Wird 30 Rp. als Gesamtpreis verstanden, überzeichnet der Rechner die Ersparnis in Grenchen um ~13% (30 vs. 26.5 Rp. vermeidbar). Sichere Lösung: Default 26–27 Rp. + UI-Label «variabler Strompreis (Arbeitspreis) inkl. MwSt — Grundgebühren und Messtarif sparen Sie nicht ein». Hinweis Mantelerlass: Ab 2026 muss der Messtarif gesetzlich als eigene, fixe Komponente ausgewiesen werden — der fixe (nicht vermeidbare) Anteil der Stromrechnung steigt dadurch tendenziell, der vermeidbare variable Anteil sinkt. |
| Geltungsbereich | Rechner-Methodik schweizweit; Zahlenbeispiel Netzgebiet SWG Grenchen; Trend (Messtarif-Separierung) gilt schweizweit ab 2026 |
| Zeitraum | Tarifjahr 2026; Prüfdatum 2026-08-14 |
| Berechnung | Überzeichnung Grenchen: 30 Rp. (Default) ÷ 26.48 Rp. (vermeidbarer HT-Arbeitspreis inkl. MwSt) = 1.133 → Eigenverbrauchs-Ersparnis ~13% zu hoch; bei 4500 kWh Eigenverbrauch: 4500 × (0.30 − 0.2648) = 158 CHF/Jahr Überzeichnung |
| Quelle | SWG (Städtische Werke Grenchen); ElCom — Preisinformation Elektrizität 2026 (SWG); Medienmitteilung «Leicht sinkende Strompreise 2026» (ElCom) |
| Quellen-URL | https://www.swg.ch/hubfs/02_Dokumente/03_Preisinformation/2026_swg-preisinformation-elektrizitaet.pdf |
| Quellenstelle | SWG S. 3 (Trennung Variabel/Fix in der Tarifübersicht), S. 9 Ziff. 2.3.2 («Ab 2026 werden die Messkosten pro Messstelle und verursachergerecht abgerechnet, anstatt solidarisch über die Netzentgelte»); ElCom-MM: Messtarif neu separat, 74.40 CHF/Jahr bzw. 1.65 Rp./kWh bei H4 |
| Unsicherheit | Bei Versorgern mit höheren Arbeitspreisen (z.B. Teile der Romandie/Ostschweiz) kann 30 Rp. als Arbeitspreis zutreffen; die Überzeichnung ist versorgerabhängig 0–20%. Da das UI-Feld editierbar ist (5–80), ist der Mangel primär ein Deklarations-, kein Rechenfehler. |
| Nächste Prüfung | 2026-09-15 (mit Tarifrunde 2027) |

### R-009 — verifiziert (als Plausibilitätsspanne)

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | Zulässige UI-Eingabespanne Strompreis 5–80 Rp./kWh |
| Fundstelle | src/lib/validations/lead.ts:150 (z.number().min(5).max(80)) |
| Bewertung | verifiziert (als Plausibilitätsspanne) |
| Korrektur | Claim beibehalten — die Spanne deckt alle 2026 belegten Werte ab (Grenchen ~24.5–29.6, Bern/BKW 27.7, Solothurn ~28–29 Rp.) und lässt Raum für teure Netzgebiete sowie reine Arbeitspreis-Eingaben. ElCom bestätigt erhebliche Tarifunterschiede zwischen Netzbetreibern, beziffert die Spannweite in der Medienmitteilung aber nicht. |
| Geltungsbereich | Schweiz, alle Netzgebiete, Haushalts- und Gewerbekunden Niederspannung |
| Zeitraum | Tarifjahr 2026; Prüfdatum 2026-08-14 |
| Quelle | ElCom — Medienmitteilung «Leicht sinkende Strompreise 2026» |
| Quellen-URL | https://www.elcom.admin.ch/de/newnsb/8nuE_fvwnfqCu8OHNOwKu |
| Quellenstelle | Abschnitt Tarifunterschiede: «Tatsächlich variieren die Tarife innerhalb der Schweiz zwischen den Netzbetreibern zum Teil erheblich» (ohne Zahlen) |
| Unsicherheit | Konkrete Min/Max-Werte 2026 pro Gemeinde nur über die interaktive Karte strompreis.elcom.admin.ch abrufbar (SPA, maschinell nicht ladbar) — Extremwerte daher nicht einzeln belegt; die Spanne 5–80 ist grosszügig genug, dass kein realistischer Tarif ausgeschlossen wird |
| Nächste Prüfung | 2027-09-15 (nur bei ausserordentlichen Tarifsprüngen früher) |

### R-010 — bedingt gültig

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | Implizite Annahme: 30 Rp./kWh ist repräsentativ für das gesamte Einzugsgebiet Grenchen/Solothurn/Biel/Bern |
| Fundstelle | src/lib/solar/calculate.ts:287 (ein einziger Default für alle Standorte) |
| Bewertung | bedingt gültig |
| Korrektur | Regionale Belege 2026: Bern (BKW, Grossteil der Gemeinden) 27.7 Rp./kWh Gesamtpreis (bei Gemeindeabgabe 1.5 Rp.); Stadt Solothurn (Regio Energie) Gesamtpreissenkung um durchschnittlich 3.0 Rp./kWh (−9.5%), H4-Haushalt spart 131 CHF/Jahr (≈ 2.9 Rp./kWh) — daraus abgeleitet Gesamtpreis grob 28–29 Rp. exkl. MwSt (H4-Absolutwert in der MM nicht direkt genannt); Grenchen (SWG) ≈ 27.4 Rp. exkl. MwSt. Alle Kernregionen liegen 2026 bei ~27–29 Rp. exkl. MwSt → 30 Rp. ist im Einzugsgebiet einheitlich als Brutto-Gesamtpreis vertretbar, als Netto- oder Arbeitspreis überall zu hoch. Biel (Energie Service Biel/Bienne) wurde nicht geprüft. |
| Geltungsbereich | Netzgebiete BKW (Kanton Bern, Grossteil), Regio Energie Solothurn (Stadt Solothurn), SWG (Grenchen); Biel NICHT geprüft |
| Zeitraum | Tarifjahr 2026 (BKW-MM 2025-08-14, Regio-Energie-MM 2025-08-28); Prüfdatum 2026-08-14 |
| Annahmen | MwSt-Status in BKW- und Regio-Energie-MM nicht ausgewiesen (branchenüblich exkl. MwSt) |
| Berechnung | Solothurn-Ableitung: 131 CHF/a ÷ 4500 kWh = 2.91 Rp./kWh Ersparnis H4; Durchschnittssenkung 3.0 Rp. = 9.5% → Vorjahresniveau ≈ 31.6, neu ≈ 28.6 Rp./kWh (Durchschnitt über Kundengruppen, nicht exakt H4) |
| Quelle | BKW Energie AG — Medienmitteilung «Die BKW senkt 2026 die Stromtarife in der Grundversorgung» |
| Quellen-URL | https://www.bkw.ch/de/ueber-uns/aktuell/medien/medienmitteilungen/die-bkw-senkt-2026-die-stromtarife-in-der-grundversorgung |
| Quellenstelle | Abschnitt «In den meisten Gemeinden 27.7 Rappen pro Kilowattstunde»: Senkung um 0.9 Rp./kWh bzw. 3.15%, H4 Energy Blue −40 CHF/Jahr; Energietarif −0.5 Rp., neu Messtarif separat, solidarisierte Kosten 0.05 Rp., Stromreserve +0.18 Rp. |
| Zweitquelle | Regio Energie Solothurn, Medienmitteilung «Strompreise für das Jahr 2026» (28.08.2025), https://www.regioenergie.ch/de/medienmitteilung/strompreise-fuer-das-jahr-2026/ — Energietarif −3.29 Rp. (−19.5%), Gesamt −3.0 Rp. (−9.5%), Netz +0.19 Rp., neu Saisontarife Sommer/Winter statt HT/NT |
| Unsicherheit | BKW-Wert gilt «für den Grossteil der Haushalte» — Gemeinden mit abweichender Gemeindeabgabe liegen höher/tiefer; Solothurner H4-Gesamtwert ist abgeleitet, nicht direkt publiziert (±1 Rp.); Biel/ESB offen |
| Nächste Prüfung | 2026-09-15 (Tarifrunde 2027; dann auch Biel/ESB ergänzen) |

---

## Rückliefervergütung

**Cluster-Fazit:** Seit 1.1.2026 ist die Rückliefervergütung schweizweit harmonisiert (Art. 15 EnG, Art. 12 EnV, in Kraft seit 1.1.2026): Sie folgt dem vierteljährlichen BFE-Referenz-Marktpreis (PV: Q1/2026 = 10.27, Q2/2026 = 3.90 Rp./kWh) mit gesetzlicher Minimalvergütung für Anlagen <150 kW (PV <30 kW: 6.0 Rp./kWh; 30–150 kW Formel 180/kW). Die FAQ-Formulierung «nach dessen Tarif vergütet» ist damit veraltet und muss neu gefasst werden. Der Rechner-Default 10 Rp./kWh ist 2026 optimistisch: Im Einzugsgebiet zahlt SWG Grenchen fix 6.20 (Sommer) / 8.70 (Winter) Rp./kWh — produktionsgewichtet ca. 7.0 Rp./kWh — und BKW reicht den RMP mit Floor durch (Q1 10.27 / Q2 6.00); 10 Rp. wird nur inkl. HKN-Vergütung (SWG: +2.50 Rp./kWh, nur mit Vereinbarung + Pronovo-Dauerauftrag) annähernd erreicht. Empfehlung: Default auf 7 Rp./kWh (ohne HKN) senken und HKN als separaten, netzbetreiberabhängigen Zusatzerlös transparent ausweisen. Nächster Fixpunkt: RMP-Q3-Publikation Mitte Oktober 2026 sowie die beschlossene Umstellung auf stündliche Vergütung ab 2027/2028.

### R-011 — bedingt gültig

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | Rechner-Default Rückliefervergütung 10 Rp./kWh (feedInTariffRappen ?? 10; UI-Default 10, Slider 0–60 Rp.) |
| Fundstelle | src/lib/solar/calculate.ts:288; src/components/solar/solar-calculator.tsx:129 u. 643 |
| Bewertung | bedingt gültig |
| Korrektur | Default auf 7 Rp./kWh senken (produktionsgewichteter Energie-Tarif SWG/BKW 2026 ohne HKN) und im UI ergänzen: «+ ca. 2–2.5 Rp./kWh, falls Ihr Netzbetreiber Herkunftsnachweise vergütet (z. B. SWG Grenchen: 2.5 Rp./kWh)». Alternativ 10 Rp. nur mit explizitem Hinweis «inkl. HKN-Vergütung, optimistisch» beibehalten. Slider 0–60 kann bleiben. |
| Geltungsbereich | Einzugsgebiet DoubleA: Netzgebiete SWG (Stadt Grenchen) und BKW (Region Solothurn/Biel/Bern); Kleinanlagen <30 kW (EFH-Segment des Rechners) |
| Zeitraum | Preisstand 2026 (SWG gültig ab 1.1.2026; BKW-Preisblatt gültig ab 14.7.2026; BFE-RMP Q1+Q2 2026); Prüfdatum 2026-08-14 |
| Annahmen | PV-Produktionsverteilung 65–75% Sommerhalbjahr (typisches CH-Profil, Mittelland); Kleinanlage <30 kW mit Eigenverbrauch; keine Börsen-/Direktvermarktung |
| Berechnung | SWG energie-only produktionsgewichtet: 0.70 × 6.20 (Sommer, 1.4.–30.9.) + 0.30 × 8.70 (Winter) = 4.34 + 2.61 = 6.95 ≈ 7.0 Rp./kWh; inkl. HKN: 6.95 + 2.50 = 9.45 ≈ 9.5 Rp./kWh. BKW 2026 (RMP-Durchreich mit Floor): Q1 10.27, Q2 6.00 Rp./kWh (RMP Q2 3.896 < Minimalvergütung 6.0). Gewichtung: ~70% der CH-PV-Jahresproduktion fällt in Apr–Sep. Rundung auf 0.5 Rp. |
| Quelle | SWG Grenchen (Verteilnetzbetreiber) / BKW Energie AG / Bundesamt für Energie BFE — SWG Preisinformation Elektrizität 2026; BKW Rückliefervergütung 2026; BFE Referenz-Marktpreise gemäss Art. 15 EnFV |
| Quellen-URL | https://www.swg.ch/hubfs/02_Dokumente/03_Preisinformation/2026_swg-preisinformation-elektrizitaet.pdf |
| Quellenstelle | SWG Kap. 2.4.1 Rückliefertarife (S. 12): <150 kWp Winter 8.70 / Sommer 6.20 Rp./kWh, HKN 2.50 Rp./kWh; BKW-Preisblatt: PV <30 kW Q1 10.27 / Q2 6.00 Rp./kWh; BFE-PDF S. 2: RMP PV Q1 102.66 / Q2 38.96 CHF/MWh |
| Zweitquelle | BKW Energie AG, «Rückliefervergütung 2026» (https://www.bkw.ch/fileadmin/user_upload/02_Gebaeude/02_02_Eigenen_Strom_produzieren/Ruecklieferverguetung/2026_Q1/Preisblatt_Ruecklieferverguetung_DE_2026.pdf, gültig ab 14.7.2026, Netzgebiet BKW): quartalsweiser RMP-Durchreich (Q1 10.27 / Q2 6.00) — anderes Modell als SWG-Fixpreise (Winter 8.70 / Sommer 6.20). Beide dokumentiert, kein Mittelwert gebildet; zusätzlich BFE-RMP-Publikation https://pubdb.bfe.admin.ch/de/publication/download/11515 (14.7.2026). |
| Unsicherheit | Ohne HKN realistisch 6–8 Rp./kWh (2026); inkl. HKN 8.5–10 Rp./kWh bei SWG. BKW-Jahreswert hängt von RMP Q3/Q4 ab (Publikation 14.10.2026 bzw. 15.1.2027) — Q3 dürfte wegen tiefer Sommer-Spotpreise erneut auf der Minimalvergütung 6.0 liegen. 10 Rp. als Default ist damit 2026 optimistisch, aber nicht absurd (Q1-RMP lag bei 10.27). |
| Nächste Prüfung | 2026-10-15 (nach BFE-Publikation RMP Q3/2026; Tarifblätter 2027 ab ca. Ende August 2026) |

### R-012 — veraltet

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | FAQ: «Strom, den Sie nicht direkt verbrauchen, wird ins Netz Ihres Verteilnetzbetreibers eingespeist und nach dessen Tarif vergütet.» |
| Fundstelle | src/components/sections/faq-section.defaults.ts:31 |
| Bewertung | veraltet |
| Korrektur | Neu formulieren: «Überschüssiger Strom wird ins Netz eingespeist. Seit 1. Januar 2026 richtet sich die Vergütung schweizweit nach dem vierteljährlichen Referenz-Marktpreis des Bundesamts für Energie; für Anlagen unter 150 kW gilt eine gesetzliche Minimalvergütung (bei Anlagen unter 30 kW: 6 Rp./kWh). Viele Netzbetreiber vergüten zusätzlich den Herkunftsnachweis (HKN).» — «nach dessen Tarif» suggeriert freie Tariffestlegung durch den VNB, was seit dem Mantelerlass nicht mehr zutrifft. |
| Geltungsbereich | Schweizweit (Art. 15 EnG, Art. 12 EnV — harmonisierte Vergütung ab 1.1.2026); keine Übergangsfrist für Kleinanlagen erkennbar, SWG und BKW wenden das neue Regime seit 1.1.2026 an |
| Zeitraum | Rechtsstand 1.1.2026 (EnV-Änderung vom 19.2.2025, AS 2025 138, in Kraft seit 1.1.2026); Prüfdatum 2026-08-14 |
| Annahmen | Der Referenz-Marktpreis gilt als schweizweit harmonisierter Preis, wenn sich Netzbetreiber und Produzent nicht anders einigen (BFE-Publikation vom 14.7.2026, S. 1); höhere vertragliche Vergütungen bleiben möglich |
| Quelle | Bundesrat / Fedlex (Energieverordnung EnV, SR 730.01) — Energieverordnung (EnV), Art. 12, konsolidierte Fassung in Kraft seit 1.1.2026 |
| Quellen-URL | https://fedlex.data.admin.ch/filestore/fedlex.data.admin.ch/eli/cc/2017/763/20260101/de/html/fedlex-data-admin-ch-eli-cc-2017-763-20260101-de-html.html |
| Quellenstelle | Art. 12 Abs. 1 (vierteljährlich gemittelter Referenz-Marktpreis) und Abs. 1bis (Minimalvergütung: PV <30 kW 6 Rp./kWh; 30–150 kW mit Eigenverbrauch anteilsmässig [entspricht Formel 180/kW, vgl. BKW-Preisblatt]; ohne Eigenverbrauch 6.2 Rp./kWh) |
| Zweitquelle | BFE, «Referenz-Marktpreise» (https://www.bfe.admin.ch/bfe/de/home/foerderung/erneuerbare-energien/referenz-marktpreise.html): RMP ist seit 1.1.2026 der schweizweit harmonisierte Preis nach Art. 15 Abs. 1 EnG; Publikation bis zum 10. Arbeitstag nach Quartalsende |
| Unsicherheit | Keine Wertunsicherheit (Rechtsnorm). Hinweis: Per 2027/2028 ist eine weitere Revision Richtung stündlicher Spotpreise mit Minimalvergütungs-Prämie beschlossen (Swissolar-Meldung, ergänzend geladen: https://www.swissolar.ch/de/news/detail/2026-was-gilt-neu-fuer-photovoltaikanlagen-80786) — FAQ-Text dann erneut anpassen. |
| Nächste Prüfung | 2027-01-15 (Inkraftsetzungsdetails der nächsten Revisionsstufe stündliche Vergütung prüfen) |

### R-013 — verifiziert

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | Finanzierungsseite: «Die Vergütung für eingespeisten Überschuss liegt in der Regel deutlich tiefer [als der Bezugspreis] – darum bestimmt der Eigenverbrauchsanteil die Wirtschaftlichkeit.» |
| Fundstelle | src/app/finanzierung/page.tsx:52 |
| Bewertung | verifiziert |
| Korrektur | Claim beibehalten — Aussage stimmt 2026 deutlicher denn je: SWG-Bezug Haushalt ≈ 24.5 Rp./kWh (HT, exkl. MwSt.) vs. Rücklieferung 6.2–8.7 Rp./kWh (Faktor ~3). |
| Geltungsbereich | Netzgebiet SWG Grenchen (Bezugstarif) — Grössenordnung gilt schweizweit für Grundversorgungskunden |
| Zeitraum | Preisstand 2026 (SWG-Preisblatt gültig ab 1.1.2026); Prüfdatum 2026-08-14 |
| Annahmen | Grundversorgung, Haushalts-Lastprofil, exkl. MwSt. auf beiden Seiten |
| Berechnung | Verhältnis Bezug/Rücklieferung: 24.50 / 6.95 (gewichtet) ≈ 3.5; selbst Winter: 24.50 / 8.70 ≈ 2.8 — «deutlich tiefer» ist belegt |
| Quelle | SWG Grenchen (lokaler Verteilnetzbetreiber) — SWG Preisinformation Elektrizität 2026 |
| Quellen-URL | https://www.swg.ch/hubfs/02_Dokumente/03_Preisinformation/2026_swg-preisinformation-elektrizitaet.pdf |
| Quellenstelle | Kap. 1 Tarifübersicht (S. 3): Bezug NS bis 50'000 kWh Total HT 24.50 / NT 22.10 Rp./kWh exkl. MwSt.; Kap. 2.4.1 (S. 12): Rücklieferung <150 kWp 8.70/6.20 Rp./kWh |
| Zweitquelle | BKW-Preisblatt Rückliefervergütung 2026 (URL siehe Zeile 1): auch im BKW-Gebiet lag die Vergütung Q2/2026 bei 6.00 Rp./kWh und damit deutlich unter üblichen Bezugstarifen |
| Unsicherheit | Keine relevante — qualitative Aussage mit Faktor ≥2.8 robust abgestützt |
| Nächste Prüfung | 2026-10-15 (Strompreise 2027 werden Ende August 2026 publiziert) |

### R-014 — verifiziert

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | Finanzierungsseite (Glossar/Tabelle): Überschuss «wird ins Netz eingespeist und vergütet» (Abnahme- und Vergütungspflicht als gegeben dargestellt) |
| Fundstelle | src/app/finanzierung/page.tsx:211 (analog src/app/projekte/page.tsx:137) |
| Bewertung | verifiziert |
| Korrektur | Claim beibehalten — gesetzliche Abnahme- und Vergütungspflicht des Verteilnetzbetreibers besteht (Art. 15 EnG); SWG und BKW bestätigen sie ausdrücklich in ihren Preisblättern. |
| Geltungsbereich | Schweizweit; konkret bestätigt für SWG Grenchen (Kap. 2.4.2 «Abnahmeverpflichtung») und BKW («nimmt … aufgrund der gesetzlichen Abnahmepflicht ab») |
| Zeitraum | Rechtsstand 2026; Prüfdatum 2026-08-14 |
| Annahmen | Anlage ordnungsgemäss angemeldet/beglaubigt; Einspeisung ins Verteilnetz (nicht Direktvermarktung) |
| Quelle | SWG Grenchen / BKW Energie AG (je Verteilnetzbetreiber, gestützt auf Art. 15 EnG) — SWG Preisinformation Elektrizität 2026, Kap. 2.4.2; BKW Rückliefervergütung 2026 |
| Quellen-URL | https://www.swg.ch/hubfs/02_Dokumente/03_Preisinformation/2026_swg-preisinformation-elektrizitaet.pdf |
| Quellenstelle | SWG Kap. 2.4.2 «Abnahmeverpflichtung» und «Eigenverbrauch» (S. 12); BKW-Preisblatt Einleitungstext (Art. 15 EnG, Art. 12 EnV) |
| Zweitquelle | BKW Energie AG, «Rückliefervergütung 2026» (URL siehe Zeile 1) |
| Unsicherheit | Keine |
| Nächste Prüfung | 2027-08-01 |

### R-015 — bedingt gültig

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | Implizite Rechner-Annahme: HKN-Erlös in der Rückliefervergütung enthalten (Default 10 Rp./kWh ist ohne HKN kaum erreichbar); Website erwähnt HKN nirgends |
| Fundstelle | src/lib/solar/calculate.ts:288 (impliziert); Website-weit kein HKN-Hinweis |
| Bewertung | bedingt gültig |
| Korrektur | HKN nicht stillschweigend einrechnen: Die HKN-Vergütung ist NICHT gesetzlich garantiert, variiert je Netzbetreiber (SWG: 2.50 Rp./kWh, nur ≤100 kWp, nur mit schriftlicher Vereinbarung + Pronovo-HKN-Dauerauftrag) und kann jährlich ändern. Empfehlung: im Rechner-Ergebnis oder FAQ einen Satz ergänzen: «Zusätzlich vergüten viele Netzbetreiber den Herkunftsnachweis (HKN) separat — bei der SWG Grenchen aktuell 2.5 Rp./kWh; dafür ist eine Vereinbarung mit dem Netzbetreiber und ein Pronovo-Dauerauftrag nötig.» |
| Geltungsbereich | SWG Grenchen: 2.50 Rp./kWh für Anlagen ≤100 kWp; BKW-Preisblatt 2026 weist keine HKN-Vergütung aus (dort separat geregelt, nicht im geprüften Dokument) — keine schweizweite Pauschale zulässig |
| Zeitraum | Preisstand 2026 (SWG gültig ab 1.1.2026); Prüfdatum 2026-08-14 |
| Annahmen | Produzent schliesst HKN-Vereinbarung ab und richtet Pronovo-Dauerauftrag ein (nicht automatisch) |
| Berechnung | SWG inkl. HKN produktionsgewichtet: 6.95 + 2.50 = 9.45 Rp./kWh — erst damit kommt der 10-Rp.-Default in Reichweite |
| Quelle | SWG Grenchen (lokaler Verteilnetzbetreiber) — SWG Preisinformation Elektrizität 2026, Kap. 2.4 Rückliefertarife / Herkunftsnachweise (HKN) |
| Quellen-URL | https://www.swg.ch/hubfs/02_Dokumente/03_Preisinformation/2026_swg-preisinformation-elektrizitaet.pdf |
| Quellenstelle | S. 4 u. 12: Spalte «Herkunftsnachweis … ≤ 100 kWp möglich: 2.50 Rp./kWh»; Kap. 2.4.2 «Herkunftsnachweise (HKN)»: schriftliche Vereinbarung + HKN-Dauerauftrag (Pronovo) vorausgesetzt; ≥150 kWp: keine HKN-Übernahme («-») |
| Zweitquelle | SWG-Blog «Rückliefervergütung ab 2026» (https://www.swg.ch/blog/r%C3%BCcklieferverg%C3%BCtung-ab-2026): HKN-Abnahme erfordert schriftliche Vereinbarung + Pronovo-Dauerauftrag (bis 100 kWp) |
| Unsicherheit | HKN-Preise sind Marktpreise ohne gesetzlichen Floor; Bandbreite bei CH-Netzbetreibern 2026 grob 0–3 Rp./kWh (pvtarif.ch der VESE weist HKN aus, sofern abgenommen — Aggregatswerte dort nicht direkt publiziert; Startseite geladen: https://www.vese.ch/pvtarif/) |
| Nächste Prüfung | 2026-10-15 (HKN-Ansätze 2027 mit neuen Preisblättern prüfen) |

---

## Investitionskosten

**Cluster-Fazit:** Alle Investitionskosten-Claims sind Firmenangaben (kalibriert an eigenen Offerten) und liegen im Marktvergleich durchgehend auf der günstigen Seite — es besteht kein Risiko überhöhter Preisversprechen, wohl aber ein leichtes Unterbietungs-/Erwartungsrisiko. Gegen die massgebliche Primärquelle (BFE/EnergieSchweiz «Photovoltaikmarkt: Preisbeobachtungsstudie 2025», Abschlussbericht 3.8.2026, Regression Kosten exkl. MwSt = MIN(1628·kW+5278; 681·kW+76265)) liegt die CHF/kWp-Staffel je nach Grössenklasse 17–28% unter dem Schweizer Median 2025 — plausibel für einen preisaggressiven Anbieter im unteren Quartil, sollte aber klar als eigener Richtpreis (nicht Marktdurchschnitt) kommuniziert werden. Auffälligster Punkt ist der Speicher-Richtwert «~CHF 350/kWh»: er liegt 36–53% unter den BFE-Medianen 2025 (504–686 CHF/kWh exkl. MwSt) und unter der Swissolar-Faktenblatt-Spanne (6'000–10'000 CHF für 10–15 kWh) — als Bündel-«ab»-Preis vertretbar, als kontextloser Richtwert irreführungsanfällig. Die Pakete Basis und Komfort sind mit der eigenen Staffel rechnerisch konsistent; beim Premium-Paket (27'500–34'500) muss der Leistungsumfang präzisiert werden, da der Preis 5–16% über der reinen 15-kWp-Staffel liegt und nur mit WP-Integration/Speicheranteil aufgeht. Wallbox «ab CHF 1'950 inkl. Installation» liegt unter der VNB-Referenzspanne (CKW: meist 2'500–5'000 CHF) und ist nur im PV-Bündel plausibel — Bedingung ergänzen.

### R-016 — Firmenangabe

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | CHF/kWp-Preisstaffel des Rechners (inkl. MwSt 8.1%): ≤6 kWp 2'100, ≤10 kWp 1'900, ≤16 kWp 1'750, ≤25 kWp 1'550, ≤40 kWp 1'400, >40 kWp 1'300 CHF/kWp; «kalibriert anhand DoubleA-Offerten 2026, inkl. Montage und Meldewesen» |
| Fundstelle | src/lib/solar/calculate.ts:178-185 |
| Bewertung | Firmenangabe |
| Korrektur | Claim beibehalten. Die Staffel ist als eigene Offertenkalibration deklariert und liegt konsistent 17–28% UNTER dem BFE-Median 2025 — also klar marktplausibel als preisaggressiver Anbieter (unteres Quartil), nicht überteuert. Empfehlung: im UI weiterhin als «Richtpreis auf Basis eigener Offerten» kennzeichnen, nicht als Marktdurchschnitt ausgeben. |
| Geltungsbereich | DoubleA-Offerten schweizweit (Schwerpunkt Grenchen/Solothurn/Biel/Bern); Referenz: Aufdachanlagen ganze Schweiz. BFE-Studie zeigt regionale Streuung (Nordschweiz und GE teurer) — Raum Mittelland eher im günstigeren Bereich. |
| Zeitraum | Firmen-Preisstand 2026; Referenzdaten BFE Datenjahr 2025 (publiziert 03.08.2026); Prüfdatum 2026-08-14 |
| Annahmen | BFE-Regression = Median über 1'598 Aufdachanlagen-Datensätze (Offerten+Rechnungen 2025, exkl. MwSt, inkl. Lieferung/Montage/Planung/Monitoring/Baustellensicherung bis Netzanschlusstrennschalter, exkl. Speicher/ZEV/Dachsanierung). Ein einzelner Anbieter kann deutlich unter dem Median liegen (Rechnungen entsprechen laut Studie i.d.R. dem besten Angebot; Q1-Quartile liegen laut Boxplots deutlich unter dem Median). Die zusätzliche −10%-Spanne des Rechners (calculate.ts:187-191) reicht allerdings bis ~30–35% unter den BFE-Median — untere Rechnerkante nur bei einfachen Dächern realistisch. |
| Berechnung | BFE-Medianregression 2025 (exkl. MwSt), auf inkl. MwSt umgerechnet (×1.081), vs. DoubleA-Staffel (inkl. MwSt): 6 kWp: BFE 15'046 CHF exkl → 2'508/kWp exkl → 2'711/kWp inkl vs. DoubleA 2'100 (−22.5%). 10 kWp: 21'558 → 2'156 → 2'331 vs. 1'900 (−18.5%). 15 kWp: 29'698 → 1'980 → 2'140 vs. 1'750 (−18.2%). 25 kWp: 45'978 → 1'839 → 1'988 vs. 1'550 (−22.0%). 40 kWp: 70'398 → 1'760 → 1'903 vs. 1'400 (−26.4%). 100 kWp: 144'365 → 1'444 → 1'561 vs. 1'300 (−16.7%). Rundung auf ganze CHF. |
| Quelle | EnergieSchweiz / Bundesamt für Energie BFE — Photovoltaikmarkt: Preisbeobachtungsstudie 2025 (Abschlussbericht, 3. August 2026) |
| Quellen-URL | https://pubdb.bfe.admin.ch/de/publication/download/12694 |
| Quellenstelle | Kap. 4.1, Tabelle 3 / Excel-Regression S. 16: Kosten (ohne MwSt) = MIN(1628·kW+5278; 681·kW+76265); Kap. 7 Fazit: Preisrückgang 4–9% ggü. 2024, Stabilisierung für 2026 erwartet |
| Zweitquelle | Swissolar, Solarmonitor Schweiz 2025, Abb. 11 «Kosten pro installierte Leistung» (Datenjahr 2024, exkl. MwSt): Dach <30 kW 2'100 CHF/kW, Dach 30–100 kW 1'445, Dach 100–300 kW 1'097 — https://www.swissolar.ch/02_markt-politik/solarmonitor-schweiz/2025/ssr-solarmonitor-2025-final.pdf (basiert auf BFE-Preisstudie + eigenen Erhebungen; bestätigt die Grössenordnung, Datenjahr 1 Jahr älter) |
| Unsicherheit | BFE-Werte sind Mediane mit grosser Streuung (R² der Regression nur 0.15–0.38); regionale Abweichungen ±10–15%. Modulpreise Ende 2025 stabil bei ~100 CHF/kW → für 2026 keine grossen Verschiebungen erwartet. DoubleA-Staffel selbst extern nicht verifizierbar (eigene Offerten). |
| Nächste Prüfung | 2027-08-15 (nächste BFE-Preisbeobachtungsstudie 2026 erscheint erfahrungsgemäss Juli/August 2027) |

### R-017 — Firmenangabe

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | Preisspanne der Staffel: ±10% nach unten / +15% nach oben «für Marktvariation (Komponenten-Wahl, Dachsituation)» |
| Fundstelle | src/lib/solar/calculate.ts:187-191 |
| Bewertung | Firmenangabe |
| Korrektur | Claim beibehalten, Spanne ist methodisch sinnvoll. Hinweis: die reale Marktstreuung ist grösser (BFE-Interquartilsabstand pro Grössenklasse deutlich breiter als −10/+15%); die Spanne bildet also die DoubleA-interne Offertenstreuung ab, nicht die Marktstreuung — so kommunizieren. |
| Geltungsbereich | DoubleA-Richtofferten schweizweit |
| Zeitraum | Preisstand 2026; Prüfdatum 2026-08-14 |
| Berechnung | Spanne = Staffelmittelwert × 0.9 bzw. × 1.15; z.B. 10 kWp: 19'000 → 17'100–21'850 CHF inkl. MwSt |
| Quelle | EnergieSchweiz / Bundesamt für Energie BFE — Photovoltaikmarkt: Preisbeobachtungsstudie 2025 (Abschlussbericht, 3. August 2026) |
| Quellen-URL | https://pubdb.bfe.admin.ch/de/publication/download/12694 |
| Quellenstelle | Kap. 4.1, Abbildung 16 / Tabelle 4 (Boxplots: 25%–75%-Quartile pro Leistungsbereich umfassen 50% der Daten, Interquartilsspanne deutlich breiter als ±10–15%) |
| Unsicherheit | Als Darstellung der eigenen Offertenstreuung plausibel; als Marktstreuung zu eng |
| Nächste Prüfung | 2027-08-15 |

### R-018 — Firmenangabe

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | Batteriespeicher CHF 350/kWh (GoodWe, konstant); auf Pakete-Seite «~CHF 350/kWh Richtwert» |
| Fundstelle | src/lib/solar/calculate.ts:194 und src/app/pakete/page.tsx:106 |
| Bewertung | Firmenangabe |
| Korrektur | Deutlich unter Marktmedian — als eigenständiger «Richtwert» ohne Kontext irreführungsanfällig, wenn Kunden ihn als Marktpreis oder als Preis für Nachrüstungen lesen. Empfehlung: präzisieren zu «ab ~CHF 350/kWh im Bündel mit einer PV-Installation (GoodWe-System); marktüblich sind gemäss BFE 2025 ca. 500–750 CHF/kWh» — oder zumindest «ab» statt «~» und Bündel-Bedingung nennen. |
| Geltungsbereich | DoubleA-Bündelpreis (Speicher zusammen mit PV-Anlage installiert, GoodWe); Referenz: Heimspeicher <30 kWh ganze Schweiz, Einbau im Rahmen einer PV-Errichtung |
| Zeitraum | Firmen-Preisstand 2026; BFE-Referenz Datenjahr 2025; Swissolar-Faktenblatt Stand Juli 2025; Prüfdatum 2026-08-14 |
| Annahmen | BFE erfasst Offertpreise inkl. anteiliger Logistik/Administration; reine Hardware-Grenzkosten grosser LFP-Speicher (GoodWe Lynx) können 2026 deutlich darunter liegen — 350/kWh ist als aggressiver Bündel-Grenzpreis technisch möglich, aber weit unter dem, was der Markt median offeriert |
| Berechnung | DoubleA 350 CHF/kWh inkl. MwSt = 324 CHF/kWh exkl. (÷1.081). Vergleich exkl. MwSt: 324 vs. BFE-Median 686 (<10 kWh) = −53%; vs. 504 (20–30 kWh) = −36%. Komfort-Paket rechnet 8–10 kWh × 350 = 2'800–3'500 CHF inkl.; BFE-marktüblich wären für ~9 kWh eher 6'700 CHF inkl. (9 × 686 × 1.081). |
| Quelle | EnergieSchweiz / Bundesamt für Energie BFE — Photovoltaikmarkt: Preisbeobachtungsstudie 2025 (Abschlussbericht, 3. August 2026) |
| Quellen-URL | https://pubdb.bfe.admin.ch/de/publication/download/12694 |
| Quellenstelle | Kap. 6 Batteriekosten, Abbildung 26: Median 2025 = 686 CHF/kWh (<10 kWh) bzw. 504 CHF/kWh (20–30 kWh), exkl. MwSt, im Rahmen einer PV-Errichtung; signifikanter Preisrückgang ggü. 2024 |
| Zweitquelle | Swissolar, Faktenblatt Photovoltaik Schweiz (Stand Juli 2025): «6'000–10'000 CHF geschätzter Installationspreis eines Batteriespeichers mit 10–15 kWh im EFH ohne Notstromfunktion» = ca. 400–1'000 CHF/kWh — https://www.swissolar.ch/02_markt-politik/faktenblatt/de_2025_faktenblatt_pv_schweiz_sws.pdf |
| Unsicherheit | Speicherpreise fallen weiter (BFE: signifikanter Rückgang 2024→2025); plausible Marktbandbreite 2026 für Heimspeicher im PV-Bündel: ~450–750 CHF/kWh inkl. MwSt je nach Grösse und Notstromfunktion |
| Nächste Prüfung | 2027-02-15 (Speicherpreise fallen schnell; halbjährlich prüfen, spätestens mit BFE-Studie 2026 im Sommer 2027) |

### R-019 — Firmenangabe

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | Wallbox 11 kW (GoodWe HCA Gen2a) pauschal CHF 1'950 inkl. Installation; Pakete-Seite «ab CHF 1'950» |
| Fundstelle | src/lib/solar/calculate.ts:196 und src/app/pakete/page.tsx:113 |
| Bewertung | Firmenangabe |
| Korrektur | Claim beibehalten — «ab CHF 1'950» ist im Bündel mit einer PV-Installation plausibel (Elektriker bereits vor Ort, Verteilkasten offen), liegt aber unter der marktüblichen Gesamtspanne für Einzelinstallationen. Empfehlung: Bedingung ergänzen: «ab CHF 1'950 im Rahmen einer PV-Installation; bei langen Kabelwegen oder Verteiler-Ausbau Mehrkosten». Im Rechner (Pauschale ohne «ab») sollte derselbe Vorbehalt erscheinen. |
| Geltungsbereich | DoubleA-Bündelpreis bei PV-Installation, Standardfall EFH mit kurzem Kabelweg; Referenz: Deutschschweizer Verteilnetzbetreiber-Angaben (CKW, Kanton LU) — für Grenchen/SO keine abweichenden Publikationen gefunden |
| Zeitraum | Firmen-Preisstand 2026; CKW-Angaben Abruf 2026-08-14; Prüfdatum 2026-08-14 |
| Annahmen | CKW-Preise als Konsumentenangaben inkl. MwSt interpretiert; kein BFE/EnergieSchweiz-Dokument mit konkreten Wallbox-CHF-Werten auffindbar (energieschweiz.ch verweist nur auf Podcast ohne Zahlen) |
| Berechnung | DoubleA 1'950 inkl. vs. CKW-Untergrenze Einzelinstallation ~2'000 CHF (500 Gerät + 1'500 Installation) und typische Spanne 2'500–5'000 CHF → DoubleA am/unter dem unteren Marktrand; Differenz erklärbar durch Synergien im PV-Bündel (keine separate Anfahrt, Elektroarbeiten gebündelt) |
| Quelle | CKW (Centralschweizerische Kraftwerke AG, Verteilnetzbetreiber) — Wallbox Kosten: Tipps & Preise für die eigene Ladestation |
| Quellen-URL | https://www.ckw.ch/gebaeudetechnik/ladeinfrastruktur/wallbox-ladestation-installation-kosten |
| Quellenstelle | Abschnitt Kostenübersicht: einfache 11-kW-Geräte ab 500 CHF; fachgerechte Installation 1'500–3'000 CHF; Gesamtkosten meist 2'500–5'000 CHF; Zuschläge 500–1'000 CHF bei langen Kabelwegen/zusätzlichen Schutzschaltern |
| Unsicherheit | Marktspanne 11-kW-Wallbox inkl. Standardinstallation 2026: ca. 2'000–3'500 CHF einzeln, im PV-Bündel ab ~1'800 CHF plausibel; stark abhängig von Kabelweg und Zählerschrank |
| Nächste Prüfung | 2027-08-15 |

### R-020 — Firmenangabe

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | Paket «Basis 8.2 kWp»: CHF 15'500–18'500 |
| Fundstelle | src/app/pakete/page.tsx:42-58 |
| Bewertung | Firmenangabe |
| Korrektur | Claim beibehalten — intern konsistent mit der eigenen Staffel (Untergrenze = Staffelmittelwert, Obergrenze = +15%-Spanne) und im Marktvergleich 8–23% unter dem BFE-Median → glaubwürdig-kompetitiv. Kleiner Hinweis: die Paketuntergrenze 15'500 nutzt die −10%-Rechnerspanne (14'022) nicht aus; Rechner und Paketseite zeigen für 8.2 kWp also leicht unterschiedliche Untergrenzen — bei einem Relaunch harmonisieren. |
| Geltungsbereich | DoubleA-Richtpaket EFH, Einzugsgebiet Grenchen/Solothurn/Biel/Bern |
| Zeitraum | Preisstand 2026 inkl. MwSt 8.1%; Referenz BFE Datenjahr 2025; Prüfdatum 2026-08-14 |
| Berechnung | Eigene Staffel: 8.2 kWp ≤10 → 1'900 CHF/kWp → Mitte 8.2×1'900 = 15'580 ≈ 15'500 (Paket-Untergrenze); Obergrenze 8.2×1'900×1.15 = 18'517 ≈ 18'500 ✓. Marktvergleich: BFE-Median 8.2 kWp = 1'628×8.2+5'278 = 18'628 CHF exkl. MwSt = 20'137 CHF inkl. (×1.081) → Paket liegt 8% (Obergrenze) bis 23% (Untergrenze) unter dem Median. |
| Quelle | EnergieSchweiz / Bundesamt für Energie BFE — Photovoltaikmarkt: Preisbeobachtungsstudie 2025 (Abschlussbericht, 3. August 2026) |
| Quellen-URL | https://pubdb.bfe.admin.ch/de/publication/download/12694 |
| Quellenstelle | Kap. 4.1, Excel-Regression S. 16 |
| Unsicherheit | ±10–15% je nach Dachsituation und Region; BFE-Median mit breiter Streuung |
| Nächste Prüfung | 2027-08-15 |

### R-021 — Firmenangabe

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | Paket «Komfort 10 kWp + 8–10 kWh Speicher»: CHF 21'500–26'500 |
| Fundstelle | src/app/pakete/page.tsx:63-77 |
| Bewertung | Firmenangabe |
| Korrektur | Claim beibehalten — rechnerisch konsistent mit eigener Staffel (Untergrenze exakt: 10×1'900 + 8×350 = 21'800 ≈ 21'500; Obergrenze 26'500 liegt nur ~4.5% über der berechneten Maximalspanne 25'350, erklärbar durch Zusatzausstattung wie Backup-Box/EMS). Marktvergleich: deutlich unter BFE-Median (~28'700 CHF inkl.) → kompetitiv, plausibel. |
| Geltungsbereich | DoubleA-Richtpaket EFH, Einzugsgebiet Grenchen/Solothurn/Biel/Bern |
| Zeitraum | Preisstand 2026 inkl. MwSt 8.1%; Referenz BFE Datenjahr 2025; Prüfdatum 2026-08-14 |
| Annahmen | Speicher-Median für 8–10 kWh zwischen den BFE-Klassen <10 kWh (686) und 20–30 kWh (504) interpoliert; Rundung auf 100 CHF |
| Berechnung | Eigene Staffel: PV 10×1'900 = 19'000; Spanne 17'100–21'850. Speicher 8–10 kWh × 350 = 2'800–3'500. Summe: 19'900–25'350 CHF inkl. MwSt; Paketmitte-basiert 21'800–22'500. Markt-Median: PV 21'558 exkl → 23'304 inkl; Speicher 9 kWh × ~590 CHF/kWh exkl (interpoliert 504–686) × 1.081 ≈ 5'740 inkl → Median-Gesamt ≈ 29'000 CHF; Paket-Obergrenze 26'500 liegt ~9% darunter. |
| Quelle | EnergieSchweiz / Bundesamt für Energie BFE — Photovoltaikmarkt: Preisbeobachtungsstudie 2025 (Abschlussbericht, 3. August 2026) |
| Quellen-URL | https://pubdb.bfe.admin.ch/de/publication/download/12694 |
| Quellenstelle | Kap. 4.1 Excel-Regression S. 16 (PV) + Kap. 6 Abbildung 26 (Speicher-Mediane 504–686 CHF/kWh exkl. MwSt) |
| Unsicherheit | ±10–15%; Speicherpreisverfall kann den Marktabstand bis 2027 verkleinern |
| Nächste Prüfung | 2027-08-15 |

### R-022 — Firmenangabe

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | Paket «Premium 15 kWp + Wärmepumpen-Integration»: CHF 27'500–34'500 (Speicher 16 kWh als Option ausgewiesen) |
| Fundstelle | src/app/pakete/page.tsx:83-98 |
| Bewertung | Firmenangabe |
| Korrektur | Präzisieren, was im Preis enthalten ist. Als reine 15-kWp-PV-Anlage läge die eigene Staffel bei 23'625–30'188 CHF — das Paket (27'500–34'500) liegt 5–16% darüber. Konsistent wird der Preis nur, wenn WP-Integration/EMS (und ggf. ein Speicheranteil) eingerechnet sind: mit 16-kWh-Speicher (+5'600) ergäbe die Staffel 29'225–35'788 ≈ Paketspanne. Empfehlung: Leistungsumfang der Preisspanne explizit auflisten («inkl. WP-Anbindung/EMS, exkl./inkl. Speicher»), sonst wirkt der Preis gegen den eigenen Rechner inkonsistent. |
| Geltungsbereich | DoubleA-Richtpaket EFH mit Wärmepumpe, Einzugsgebiet Grenchen/Solothurn/Biel/Bern |
| Zeitraum | Preisstand 2026 inkl. MwSt 8.1%; Referenz BFE Datenjahr 2025; Prüfdatum 2026-08-14 |
| Annahmen | Interpretation: Paketpreis enthält WP-Integrationskosten und liegt zwischen «PV pur» und «PV + 16 kWh»; genaue Abgrenzung aus der Seite nicht ersichtlich |
| Berechnung | Eigene Staffel: 15 kWp ≤16 → 1'750 CHF/kWp → 26'250; Spanne 15×1'575=23'625 bis 15×2'012.5=30'188. Paket 27'500–34'500 = +5% bis +16% über der Staffel-Spanne. Mit 16-kWh-Speicher-Option: +16×350=5'600 → 29'225–35'788 ≈ Paketspanne. Markt-Median (reine PV): BFE 15 kWp = 29'698 exkl = 32'104 inkl → Paket auch inkl. WP-Integration unter/around Median → marktplausibel. |
| Quelle | EnergieSchweiz / Bundesamt für Energie BFE — Photovoltaikmarkt: Preisbeobachtungsstudie 2025 (Abschlussbericht, 3. August 2026) |
| Quellen-URL | https://pubdb.bfe.admin.ch/de/publication/download/12694 |
| Quellenstelle | Kap. 4.1, Excel-Regression S. 16 |
| Unsicherheit | Interne Inkonsistenz von −5 bis −16% gegenüber dem Rechner, falls der Preis als reine PV gelesen wird; marktseitig unauffällig |
| Nächste Prüfung | 2027-08-15 |

---

## Erträge & Produktion

**Cluster-Fazit:** Die Ertragslogik der Website ist insgesamt konservativ und seriös kalibriert: Die Paket-Jahresertragsspannen (915–1067 kWh/kWp) und die Kantonstabelle liegen unterhalb der per PVGIS und BFE-Sonnendach-Livedaten verifizierten Optimalwerte für die Region (Grenchen: 1170–1190 kWh/kWp für gute Süddächer) und sind damit als «typische Praxiswerte» haltbar — nur die Beschriftung «(Süd, optimal)» und die Schweiz-Obergrenze 1'150 kWh/kWp (Tessin real ~1'330) sollten präzisiert werden. Der gravierendste Befund ist der Modul-Footprint: Das AIKO Neostar G3/3P54 480 Wp existiert und hat exakt 24.0 % Wirkungsgrad, misst aber laut Original-Datenblatt 1762×1134 mm = 1.998 m² (nicht 1.87 m²), womit 4.16 m²/kWp korrekt wären statt 3.9 — alle Flächenangaben (32/39/59 m²) sind dadurch 6–8 % zu klein, inkl. Randabstände eher 15–25 %. Die Orientierungs-/Neigungsfaktoren sind weitgehend PVGIS-konform (SO/SW 0.95 und alle Neigungs-Buckets bestätigt); einzig Ost/West 0.85 ist gegenüber PVGIS/Sonnendach (0.78–0.82 bei 26–30° Neigung) leicht optimistisch, und die Verschattungsfaktoren sind extern nicht belegbare, aber grössenordnungsplausible Heuristiken. Der Mantelerlass 2025/2026 ändert an diesen physikalisch-meteorologischen Grössen nichts. Alle zitierten Quellen (AIKO-Datenblatt, BFE-Schlussbericht pubdb 8196, geo.admin.ch-Sonnendach-API, PVGIS 5.2, Swissolar-Faktenblatt) wurden live geladen und geprüft.

### R-023 — bedingt gültig

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | Kantonstabelle spezifischer Ertrag «(Süd, optimal)»: 980 (JU) bis 1150 (TI) kWh/kWp/Jahr, 26 Kantonswerte |
| Fundstelle | src/lib/solar/canton-data.ts:22-49 |
| Bewertung | bedingt gültig |
| Korrektur | Werte als «konservative Praxis-Richtwerte» beibehalten, aber Beschriftung «(Süd, optimal)» ändern in «typischer Praxiswert bei guter Südausrichtung» — echte Optimalwerte liegen laut BFE-Sonnendach-Daten und PVGIS 10–17 % höher (Grenchen ~1170–1190, Bern ~1190, Lugano ~1330 kWh/kWp). Die Pro-Kanton-Differenzierung (z. B. JU=980 als Minimum) ist durch keine Quelle einzeln belegbar; ehrlicher wäre eine Bandbreite pro Kanton oder der Live-Sonnendach-Wert des konkreten Dachs (wird im Rechner bereits genutzt). |
| Geltungsbereich | alle Kantone; Einstrahlung variiert innerhalb der Kantone stärker als zwischen den Kantonshauptorten (Nebellagen vs. Höhenlagen) |
| Zeitraum | PVGIS-Klimatologie SARAH2 (2005–2020), Sonnendach-Datenstand 2026; Prüfdatum 2026-08-14 |
| Annahmen | PVGIS-Standorte = Kantonshauptort/Region als Proxy; PR-Umrechnung Sonnendach gemäss BFE-Methodik (fixe PR 0.8) |
| Berechnung | PVGIS: E_y [kWh/Jahr] für 1 kWp, Systemverlust 14 %, optimale Neigung/Azimut. Vergleich: Claim SO 1010 vs. PVGIS 1187 (−15 %), BE 1000 vs. 1191 (−16 %), TI 1150 vs. 1327 (−13 %) |
| Quelle | Europäische Kommission JRC (PVGIS) / BFE (sonnendach.ch) — PVGIS 5.2 PVcalc API (1 kWp, Verlust 14 %, optimale Winkel) für Grenchen, Bern, Lugano |
| Quellen-URL | https://re.jrc.ec.europa.eu/api/v5_2/PVcalc?lat=47.192&lon=7.396&peakpower=1&loss=14&optimalangles=1&outputformat=json |
| Quellenstelle | outputs.totals.fixed.E_y: Grenchen 1187 kWh (37° Süd), Bern 1191 kWh (38°), Lugano 1327 kWh (40°) |
| Zweitquelle | BFE/geo.admin.ch Sonnendach-API, Dächer in Grenchen: bestes Süd-Dach (6° Azimut, 31° Neigung) mstrahlung 1465 kWh/m² × PR 0.8 = ~1172 kWh/kWp |
| Unsicherheit | PVGIS-Ertragsmodell ±5–10 %; reale Anlagen im Mittelland erreichen wetter- und anlagenabhängig meist 900–1100 kWh/kWp — die Tabellenwerte liegen in dieser realistischen Zone, sind also als konservative Erstindikation vertretbar |
| Nächste Prüfung | 2027-08 |

### R-024 — bedingt gültig

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | Kommentar: «Quellen-orientiert an publizierten Spannweiten von ca. 900–1'150 kWh/kWp für Schweizer Standorte (Plateau bis Alpenrand)» |
| Fundstelle | src/lib/solar/canton-data.ts:7-8 |
| Bewertung | bedingt gültig |
| Korrektur | Präzisieren: «ca. 900–1'100 kWh/kWp im Mittelland; alpine Lagen und Südtessin erreichen gemäss BFE-Daten/PVGIS 1'200–1'330 kWh/kWp». Die Obergrenze 1'150 ist für «Plateau bis Alpenrand» haltbar, unterschlägt aber, dass die Schweiz-Spannweite nach oben deutlich weiter reicht |
| Geltungsbereich | Schweiz gesamt; Formulierung «Plateau bis Alpenrand» schliesst die höchsten Lagen selbst aus |
| Zeitraum | Klimatologien 2005–2020; Prüfdatum 2026-08-14 |
| Berechnung | 1 kWp, Verlust 14 % → Lugano 1327 kWh/kWp > 1150 (Claim-Obergrenze um ~15 % überschritten) |
| Quelle | Europäische Kommission JRC (PVGIS) — PVGIS 5.2 PVcalc, Lugano TI (optimale Winkel) |
| Quellen-URL | https://re.jrc.ec.europa.eu/api/v5_2/PVcalc?lat=46.005&lon=8.953&peakpower=1&loss=14&optimalangles=1&outputformat=json |
| Quellenstelle | outputs.totals.fixed.E_y = 1326.75 kWh/Jahr bei 40° Süd |
| Zweitquelle | Sonnendach-Eignungsklassen (BFE-Schlussbericht): «hervorragend» = ≥1400 kWh/m²/Jahr Einstrahlung ≙ ≥1120 kWh/kWp bei PR 0.8 — Klassen nach oben offen |
| Unsicherheit | Für reine Mittelland-Kommunikation ist 900–1'150 brauchbar; als Schweiz-Spannweite zu eng |
| Nächste Prüfung | 2027-08 |

### R-025 — bedingt gültig

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | SO (Solothurn) = 1010 kWh/kWp/Jahr (Kanton des Firmensitzes Grenchen) |
| Fundstelle | src/lib/solar/canton-data.ts:40 |
| Bewertung | bedingt gültig |
| Korrektur | Als konservativer Praxis-Richtwert beibehalten, aber nicht als «optimal» deklarieren: Für Grenchen selbst liefern BFE-Sonnendach-Daten für gute Süddächer ~1130–1170 kWh/kWp und PVGIS 1187 kWh/kWp (optimal). Sichere Formulierung: «typisch rund 950–1'100 kWh/kWp, gute Süddächer in der Region Grenchen bis ~1'150» |
| Geltungsbereich | Kanton Solothurn, speziell Region Grenchen/Jurasüdfuss (überdurchschnittliche Einstrahlung, Klasse 4–5 Dächer verbreitet) |
| Zeitraum | Sonnendach-Datenstand 2026, abgefragt 2026-08-14 |
| Annahmen | PR 0.8 gemäss BFE-Schlussbericht Sonnendach (pubdb.bfe.admin.ch/de/publication/download/8196) |
| Berechnung | kWh/kWp = mstrahlung × PR 0.8 (BFE-Methodik): Süd-Dach 1465 × 0.8 = 1172; SSW 1418 × 0.8 = 1134; empirisch bestätigt: stromertrag/flaeche = 0.16 × mstrahlung ≙ Modulwirkungsgrad 20 % × PR 0.8 |
| Quelle | BFE via geo.admin.ch — Sonnendach-Layer ch.bfe.solarenergie-eignung-daecher, Identify-Abfrage Grenchen (LV95 2596000/1225800) |
| Quellen-URL | https://api3.geo.admin.ch/rest/services/api/MapServer/identify?geometryType=esriGeometryPoint&geometry=2596000,1225800&sr=2056&layers=all:ch.bfe.solarenergie-eignung-daecher&tolerance=100&mapExtent=2595500,1225300,2596500,1226300&imageDisplay=500,500,96&returnGeometry=false |
| Quellenstelle | Attribute mstrahlung/stromertrag/flaeche realer Dächer: Süd 31° → 1465 kWh/m², SSW 35° → 1418, Ost 28° → 1196 kWh/m² |
| Zweitquelle | PVGIS Grenchen optimal: 1187 kWh/kWp (37° Süd, Verlust 14 %) |
| Unsicherheit | ±10 % je nach Dach; Nebellagen im Wasseramt/Gäu tiefer als Jurasüdfuss |
| Nächste Prüfung | 2027-08 |

### R-026 — verifiziert

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | Paket «Basis 8.2 kWp»: Jahresertrag (typ.) 7'500–8'500 kWh |
| Fundstelle | src/app/pakete/page.tsx:48 |
| Bewertung | verifiziert |
| Korrektur | Claim beibehalten — entspricht 915–1037 kWh/kWp und liegt sauber in der belegten Mittelland-Spanne für gut ausgerichtete Dächer; Zusatz «bei guter Ausrichtung, Region Mittelland» empfohlen |
| Geltungsbereich | Mittelland/Region Grenchen–Solothurn–Biel–Bern, unverschattete Dächer mit guter Ausrichtung |
| Zeitraum | Prüfdatum 2026-08-14 |
| Annahmen | keine Verschattung, Neigung 20–45° |
| Berechnung | 8.2 kWp × 915–1037 kWh/kWp = 7'503–8'503 kWh/Jahr; obere Claim-Grenze ≙ Ost/West-bis-Süd-Realbereich abzüglich Praxisverlusten, untere Grenze ≙ Ost/West-Dach (956 × 8.2 = 7'840) |
| Quelle | Europäische Kommission JRC (PVGIS) + BFE (Sonnendach) — PVGIS 5.2 PVcalc Grenchen (30° Süd) und Sonnendach-Dachdaten Grenchen |
| Quellen-URL | https://re.jrc.ec.europa.eu/api/v5_2/PVcalc?lat=47.192&lon=7.396&peakpower=1&loss=14&angle=30&aspect=0&outputformat=json |
| Quellenstelle | E_y = 1181 kWh/kWp (Süd 30°); Ost/West 30°: 956–959 kWh/kWp |
| Unsicherheit | Bei starker Verschattung oder Nordkomponente wird die Untergrenze unterschritten — Formulierung «typ.» deckt das ab |
| Nächste Prüfung | 2027-08 |

### R-027 — verifiziert

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | Paket «Komfort 10 kWp»: Jahresertrag (typ.) 9'000–10'500 kWh |
| Fundstelle | src/app/pakete/page.tsx:69 |
| Bewertung | verifiziert |
| Korrektur | Claim beibehalten (900–1050 kWh/kWp, konsistent mit belegter Mittelland-Spanne) |
| Geltungsbereich | Mittelland, gut ausgerichtete unverschattete Dächer |
| Zeitraum | Prüfdatum 2026-08-14 |
| Berechnung | 10 kWp × 900–1050 = 9'000–10'500 kWh/Jahr; Spanne deckt Ost/West- (≈9'560) bis konservativ gerechnete Süddächer ab |
| Quelle | Europäische Kommission JRC (PVGIS) — PVGIS 5.2 PVcalc Grenchen (Süd 30° und Ost/West 30°) |
| Quellen-URL | https://re.jrc.ec.europa.eu/api/v5_2/PVcalc?lat=47.192&lon=7.396&peakpower=1&loss=14&angle=30&aspect=90&outputformat=json |
| Quellenstelle | E_y West 30° = 959 kWh/kWp, Süd 30° = 1181 kWh/kWp |
| Unsicherheit | wie Paket Basis; ±10 % Wetterjahr |
| Nächste Prüfung | 2027-08 |

### R-028 — verifiziert

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | Paket «Premium 15 kWp»: Jahresertrag (typ.) 13'500–16'000 kWh |
| Fundstelle | src/app/pakete/page.tsx:89 |
| Bewertung | verifiziert |
| Korrektur | Claim beibehalten (900–1067 kWh/kWp); Obergrenze 16'000 setzt sehr gutes Süddach voraus — ggf. «bis 16'000 bei optimaler Südausrichtung» präzisieren |
| Geltungsbereich | Mittelland, gut ausgerichtete unverschattete Dächer |
| Zeitraum | Prüfdatum 2026-08-14 |
| Berechnung | 15 kWp × 900–1067 = 13'500–16'005 kWh/Jahr; PVGIS-Referenz Süd: 15 × 1181 = 17'718 (theoretisch möglich, Claim bleibt konservativ) |
| Quelle | Europäische Kommission JRC (PVGIS) — PVGIS 5.2 PVcalc Grenchen (Süd 30°) |
| Quellen-URL | https://re.jrc.ec.europa.eu/api/v5_2/PVcalc?lat=47.192&lon=7.396&peakpower=1&loss=14&angle=30&aspect=0&outputformat=json |
| Quellenstelle | E_y = 1181 kWh/kWp (Süd 30°, Verlust 14 %) |
| Unsicherheit | ±10 %; grössere Anlagen belegen oft auch Ost/West-Flächen → Mittelwert sinkt Richtung Untergrenze |
| Nächste Prüfung | 2027-08 |

### R-029 — verifiziert

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | «AIKO Neostar G3 480 Wp, 24 % Wirkungsgrad» (Modulreferenz im Code-Kommentar) |
| Fundstelle | src/lib/solar/calculate.ts:202 |
| Bewertung | verifiziert |
| Korrektur | Claim beibehalten: Das Modell existiert (AIKO Neostar 3. Generation, Mono-Glass 3P54/3S54, Leistungsklassen 470/480–495 Wp), und die 480-Wp-Klasse hat laut Original-Datenblatt exakt 24.0 % Modulwirkungsgrad |
| Geltungsbereich | Produktspezifikation herstellerseitig, global |
| Zeitraum | Datenblatt-Version DSDr_EN_2405_V1.5 (2024); Prüfdatum 2026-08-14 |
| Berechnung | Kontrolle: 480 W / (1.762 m × 1.134 m × 1000 W/m²) = 480/1998.1 = 24.02 % ✓ |
| Quelle | AIKO (Original-Datenblatt, gehostet beim CH-Distributor Elektrobedarf) — Neostar 3P54 Mono-glass Module 470W–495W, AIKO-A-MCE54Mw |
| Quellen-URL | https://kundencenter.elektrobedarf.ch/data/moddir/DB_Aiko_NeoG3_480W.pdf |
| Quellenstelle | Electrical Characteristics: AIKO-A480-MCE54Mw → Pmax 480 W (STC), Module Efficiency 24.0 % |
| Zweitquelle | aikosolar.com Produktseite «NEOSTAR 3S54 Mono-Glass 480W-495W»: 3. Generation, bis 24.8 % (495-W-Klasse) — https://aikosolar.com/en/products/neostar-pro-3s54-mono-glass/ |
| Unsicherheit | keine — Herstellerangabe unter STC, konsistent |
| Nächste Prüfung | bei Sortimentswechsel (Modulgenerationen wechseln ~jährlich) |

### R-030 — falsch

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | «~1.87 m² pro Modul» und daraus M2_PER_KWP = 3.9 m²/kWp |
| Fundstelle | src/lib/solar/calculate.ts:202-210 |
| Bewertung | falsch |
| Korrektur | Modulfläche laut Original-Datenblatt: 1762 × 1134 mm = 1.998 m² (nicht 1.87 m²). Korrekt: 1.998 m² / 0.480 kWp = 4.16 m²/kWp reine Modulfläche; für benötigte Dachfläche inkl. Randabstände/Firstabstand eher 4.5–5.0 m²/kWp ansetzen. Der Wert 3.9 ist physikalisch unmöglich für dieses Modul (erforderte 25.6 % Wirkungsgrad) und widerspricht dem eigenen 24-%-Claim im selben Kommentar (24 % ⇒ exakt 4.17 m²/kWp) |
| Geltungsbereich | Rechner-Kernkonstante, wirkt auf alle Flächen-/Dimensionierungsausgaben |
| Zeitraum | Datenblatt DSDr_EN_2405_V1.5; Prüfdatum 2026-08-14 |
| Annahmen | Hinweis: die im Kommentar erwähnte Offerten-Validierung kann das Verhältnis Wp/Modul betreffen, nicht die physische Fläche |
| Berechnung | Fläche = 1.762 m × 1.134 m = 1.9981 m² (Rundung 2 Dez.: 2.00 m²). m²/kWp = 1.9981 / 0.480 = 4.163 ≈ 4.2. Claim-Herleitung 1.87/0.48 = 3.896 ≈ 3.9 beruht auf falscher Modulfläche. Generischer Zusammenhang: m²/kWp = 1/(η × 1 kW/m²) = 1/0.24 = 4.17 |
| Quelle | AIKO (Original-Datenblatt) — Neostar 3P54 Mono-glass Module 470W–495W, AIKO-A-MCE54Mw |
| Quellen-URL | https://kundencenter.elektrobedarf.ch/data/moddir/DB_Aiko_NeoG3_480W.pdf |
| Quellenstelle | Product Specification: Dimension 1762×1134×30 mm; Electrical Characteristics: 480 W / 24.0 % |
| Zweitquelle | Swissolar Faktenblatt Photovoltaik (Feb. 2024): CH-Bestand 6200 MW ≈ 35 Mio. m² ⇒ Flottenmittel 5.6 m²/kWp (ältere Module eingerechnet) — https://www.swissolar.ch/01_wissen/swissolar-publikationen/branchen-faktenblatt_pv_ch_d.pdf |
| Unsicherheit | Falls künftig Module >25.6 % verbaut würden, wäre 3.9 erreichbar — aktuell (2026) bei kommerziellen Glas-Folien-Modulen nicht der Fall. Fehlerwirkung: ausgewiesene Flächen ~6.5 % zu klein (nur Modulfläche), real inkl. Abstände 15–25 % zu klein |
| Nächste Prüfung | bei Sortimentswechsel |

### R-031 — falsch

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | Paket-Modulflächen: 8.2 kWp «~32 m²», 10 kWp «~39 m²», 15 kWp «~59 m²» |
| Fundstelle | src/app/pakete/page.tsx:47,68,88 |
| Bewertung | falsch |
| Korrektur | Mit korrekter Modulfläche (4.16 m²/kWp): 8.2 kWp ≈ 34 m², 10 kWp ≈ 42 m², 15 kWp ≈ 62 m² reine Modulfläche; als «benötigte Dachfläche» kommuniziert besser ~38 / ~46 / ~70 m² (inkl. Randabstände). Empfohlene sichere Angabe: «ca. 35 m² / 42 m² / 63 m² Modulfläche» |
| Geltungsbereich | Paketseite, EFH-Anlagen mit AIKO-480-Wp-Modulen |
| Zeitraum | Prüfdatum 2026-08-14 |
| Annahmen | Flächenangabe = reine Modulfläche (so auch im Rechner verwendet) |
| Berechnung | Module: 8200/480 = 17.1 → 17 Module × 1.998 m² = 34.0 m²; 10000/480 = 20.8 → 21 × 1.998 = 42.0 m²; 15000/480 = 31.25 → 31–32 × 1.998 = 61.9–63.9 m². Claim-Abweichung: −6 bis −8 % |
| Quelle | AIKO (Original-Datenblatt) — Neostar 3P54 Mono-glass 470W–495W, AIKO-A-MCE54Mw |
| Quellen-URL | https://kundencenter.elektrobedarf.ch/data/moddir/DB_Aiko_NeoG3_480W.pdf |
| Quellenstelle | Dimension 1762×1134 mm, 480 W |
| Unsicherheit | Modulmix kann variieren (490/495 Wp → geringfügig weniger Fläche); Randabstände je nach Dach 5–20 % |
| Nächste Prüfung | bei Sortimentswechsel |

### R-032 — verifiziert

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | Orientierungsfaktoren: Süd 1.0, Südost/Südwest 0.95 |
| Fundstelle | src/lib/solar/calculate.ts:96-99 |
| Bewertung | verifiziert |
| Korrektur | Claim beibehalten — PVGIS Grenchen: Südost 30° = 94.4 % von Süd 30°; 0.95 ist eine korrekte Rundung |
| Geltungsbereich | Mittelland-Breitengrade (~47° N); Faktoren relativ zu Süd 30° |
| Zeitraum | PVGIS-Klimatologie SARAH2; Prüfdatum 2026-08-14 |
| Annahmen | Referenz = Süd 30° |
| Berechnung | 1114.62 / 1181.19 = 0.9436 ≈ 0.95 (Rundung 2 Dez.) |
| Quelle | Europäische Kommission JRC (PVGIS) — PVGIS 5.2 PVcalc Grenchen, 30° Neigung, Azimut −45° (SO) |
| Quellen-URL | https://re.jrc.ec.europa.eu/api/v5_2/PVcalc?lat=47.192&lon=7.396&peakpower=1&loss=14&angle=30&aspect=-45&outputformat=json |
| Quellenstelle | E_y = 1114.6 kWh (SO 30°) vs. 1181.2 kWh (Süd 30°) |
| Unsicherheit | ±0.02 je nach Neigung und Horizont |
| Nächste Prüfung | 2028-08 (stabile Physik/Klimatologie) |

### R-033 — bedingt gültig

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | Orientierungsfaktor Ost/West = 0.85 |
| Fundstelle | src/lib/solar/calculate.ts:100-101 |
| Bewertung | bedingt gültig |
| Korrektur | Eher 0.80–0.82 ansetzen oder Bandbreite kommunizieren: PVGIS Grenchen liefert Ost 30° = 0.81, West 30° = 0.81 relativ zu Süd 30°; reale Sonnendach-Dächer in Grenchen (Ost 26–28°) liegen bei 0.78–0.82 der besten Süddächer. 0.85 gilt nur für flach geneigte O/W-Dächer (Ost/West 15°: Faktor ~0.85–0.87). Empfehlung: 0.82, oder neigungsabhängig differenzieren |
| Geltungsbereich | Mittelland ~47° N; Faktor stark neigungsabhängig (je steiler, desto grösser der O/W-Malus) |
| Zeitraum | Prüfdatum 2026-08-14 |
| Annahmen | Referenz = Süd 30°, horizontfrei |
| Berechnung | Ost: 956.18/1181.19 = 0.809; West: 958.84/1181.19 = 0.812 |
| Quelle | Europäische Kommission JRC (PVGIS) — PVGIS 5.2 PVcalc Grenchen, 30° Neigung, Azimut ±90° |
| Quellen-URL | https://re.jrc.ec.europa.eu/api/v5_2/PVcalc?lat=47.192&lon=7.396&peakpower=1&loss=14&angle=30&aspect=-90&outputformat=json |
| Quellenstelle | E_y Ost = 956.2, West = 958.8 vs. Süd = 1181.2 kWh |
| Zweitquelle | BFE-Sonnendach Grenchen: Ost-Dach 28° mstrahlung 1196 vs. Süd-Dach 31° 1465 kWh/m² → Verhältnis 0.82 |
| Unsicherheit | 0.80–0.90 je nach Neigung (flacher = besser); Abweichung des Website-Faktors ca. +5 % → Erträge für O/W-Dächer werden leicht überschätzt |
| Nächste Prüfung | 2028-08 |

### R-034 — bedingt gültig

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | Orientierungsfaktor Flachdach = 0.92 (und gemischt 0.9) |
| Fundstelle | src/lib/solar/calculate.ts:102-103 |
| Bewertung | bedingt gültig |
| Korrektur | 0.92 ist für aufgeständerte Süd-Module (~10°) ohne Reihenverschattung korrekt (PVGIS: 0.93); für typische Flachdach-Belegungen mit Reihenabständen oder Ost/West-Aufständerung realistisch 0.85–0.93. Claim vertretbar, ideal wäre «0.88–0.93 je nach Aufständerung» |
| Geltungsbereich | Flachdächer Mittelland, Aufständerung ~10–15° |
| Zeitraum | Prüfdatum 2026-08-14 |
| Annahmen | Flachdach ≙ aufgeständert ~10° Süd; «gemischt 0.9» als Mittel aus Süd/O/W plausibel |
| Berechnung | 1094.1/1181.19 = 0.926 ≈ 0.92–0.93; horizontal 0°: 1012.36/1181.19 = 0.857 |
| Quelle | Europäische Kommission JRC (PVGIS) — PVGIS 5.2 PVcalc Grenchen, 10° Süd |
| Quellen-URL | https://re.jrc.ec.europa.eu/api/v5_2/PVcalc?lat=47.192&lon=7.396&peakpower=1&loss=14&angle=10&aspect=0&outputformat=json |
| Quellenstelle | E_y = 1094.1 kWh (10° Süd) vs. 1181.2 kWh (30° Süd) |
| Unsicherheit | Reihenverschattung und Belegungsdichte nicht in PVGIS-Einzelflächenrechnung enthalten (−2 bis −5 PP) |
| Nächste Prüfung | 2028-08 |

### R-035 — verifiziert

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | Neigungsfaktoren: 0–10° = 0.9, 10–25° = 0.96, 25–40° = 1.0, 40°+ = 0.94 |
| Fundstelle | src/lib/solar/calculate.ts:106-111 |
| Bewertung | verifiziert |
| Korrektur | Claim beibehalten — alle vier Bucket-Werte liegen innerhalb der PVGIS-berechneten Spannen: 0°=0.86/10°=0.93 (Bucket-Mitte ≈0.90 ✓), 10–25° ≈ 0.93–0.99 (0.96 ✓), Optimum 37° im Bucket 25–40 (1.0 ✓), 50°=0.98/60°=0.94 (0.94 = konservative Untergrenze, für 40–50°-Dächer etwas zu pessimistisch) |
| Geltungsbereich | Mittelland ~47° N, Südausrichtung als Referenz; bei O/W-Ausrichtung verschieben sich die Optima zu flacheren Neigungen |
| Zeitraum | Prüfdatum 2026-08-14 |
| Annahmen | Buckets bewertet an Bucket-Mitte bzw. -Grenzen |
| Berechnung | Faktoren relativ zu 30° Süd: 0°→0.857, 10°→0.926, 50°→0.985, 60°→0.943 (Division, Rundung 3 Dez.) |
| Quelle | Europäische Kommission JRC (PVGIS) — PVGIS 5.2 PVcalc Grenchen, Süd bei 0/10/30/50/60° und optimal 37° |
| Quellen-URL | https://re.jrc.ec.europa.eu/api/v5_2/PVcalc?lat=47.192&lon=7.396&peakpower=1&loss=14&angle=60&aspect=0&outputformat=json |
| Quellenstelle | E_y: 0°=1012.4, 10°=1094.1, 30°=1181.2, 37°=1187.3, 50°=1162.9, 60°=1113.7 kWh |
| Unsicherheit | ±0.02; multiplikative Kombination mit O/W-Faktor überzeichnet den Malus steiler O/W-Dächer leicht — konservativ, daher unkritisch |
| Nächste Prüfung | 2028-08 |

### R-036 — nicht verifizierbar (extern)

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | Verschattungsfaktoren: keine 1.0, leicht 0.92, mittel 0.78, stark 0.6 |
| Fundstelle | src/lib/solar/calculate.ts:113-118 |
| Bewertung | nicht verifizierbar (extern) |
| Korrektur | Als Heuristik plausibel und grössenordnungskonform (BFE-Sonnendach modelliert Verschattung objektscharf in der Einstrahlung statt mit Pauschalfaktoren; publizierte Pauschalwerte existieren nicht). Beibehalten, aber im UI klar als grobe Selbsteinschätzung kennzeichnen und bei «mittel/stark» auf die Standortanalyse verweisen — was der Rechner via Sonnendach-Anbindung bereits besser löst |
| Geltungsbereich | Selbstdeklaration im Rechner, alle Standorte |
| Zeitraum | Prüfdatum 2026-08-14 |
| Annahmen | Website nutzt bei verfügbaren Sonnendach-Daten ohnehin die BFE-Werte (dataSource 'sonnendach'), Faktoren greifen nur im Fallback |
| Quelle | BFE — Solarpotentialanalyse für Sonnendach.ch (Schlussbericht, Meteotest/D. Klauser) |
| Quellen-URL | https://pubdb.bfe.admin.ch/de/publication/download/8196 |
| Quellenstelle | Kap. Strahlungsberechnung: Verschattung durch Gelände, Gebäude, Vegetation wird pro Dachfläche in der Einstrahlung modelliert (keine Pauschalfaktoren publiziert) |
| Zweitquelle | Sonnendach-Grenchen-Daten: Nord-Dach (−174°, 27°) erreicht nur 60 % des besten Süd-Dachs — Grössenordnung 0.6 als Untergrenze konsistent |
| Unsicherheit | Reale Verschattungsverluste reichen von wenigen % (ferner Horizont) bis >50 % (naher Baum/Kamin auf String ohne Optimierer); Faktor hängt stark von Modulelektronik ab |
| Nächste Prüfung | 2027-08 |

### R-037 — verifiziert

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | Sonnendach-/BFE-Methodik als Datengrundlage: «basieren … direkt auf den BFE-Bundesdaten (sonnendach.ch)» |
| Fundstelle | src/lib/solar/calculate.ts:216-218 (Kommentar) + dataSource-Feld |
| Bewertung | verifiziert |
| Korrektur | Claim beibehalten; bei der Umrechnung Sonnendach→kWh/kWp die offizielle Methodik nutzen: Stromertrag = Einstrahlung × Modulwirkungsgrad (aktuell 20 %) × PR 0.8; kWh/kWp = Einstrahlung × 0.8. Eignungsklassen Dach: gering <800, mittel 800–1000, gut 1000–1200, sehr gut 1200–1400, hervorragend ≥1400 kWh/m²/Jahr |
| Geltungsbereich | ganze Schweiz (Sonnendach deckt ~alle Gebäude ab) |
| Zeitraum | Methodik-Bericht 2016 (aktualisiert); Datenfaktor 0.16 empirisch am 2026-08-14 an Live-Daten bestätigt |
| Berechnung | Validierung an Live-Daten Grenchen: stromertrag/flaeche = 0.16 × mstrahlung für alle 12 abgefragten Dächer (z. B. 18'381 kWh / 85.4 m² = 215.2 = 1345 × 0.16) ⇒ 20 % × 0.8 |
| Quelle | BFE — Solarpotentialanalyse für Sonnendach.ch (Schlussbericht, Meteotest) |
| Quellen-URL | https://pubdb.bfe.admin.ch/de/publication/download/8196 |
| Quellenstelle | Kap. 5.5 (Klassifizierung, Tabelle 2) und Kap. 6 (Berechnung Ertrag Photovoltaik: fixe Performance Ratio 0.8) |
| Zweitquelle | BFE Sonnendach-FAQ (EN): Berechnung aus Fläche, Einstrahlung, Modulwirkungsgrad; Werte als Richtgrösse — https://www.bfe.admin.ch/bfe/en/home/supply/digitalization-and-geoinformation/geoinformation/geodata/solar-energy/suitability-of-roofs-for-use-of-solar-energy/faq.html |
| Unsicherheit | Bericht nennt historisch auch 17 %/19 % Modulwirkungsgrad (ältere Datenstände); aktueller Datenbestand rechnet mit 20 % — bei Übernahme von Sonnendach-Stromertragswerten auf eigene Modulwirkungsgrade (24 %) umrechnen |
| Nächste Prüfung | 2027-08 |

---

## CO₂ & Umwelt

**Cluster-Fazit:** Der im Rechner verwendete CO2-Faktor 0.12 kg/kWh ist NICHT veraltet, sondern eine leicht konservative Rundung des offiziellen Schweizer Verbrauchermixes: KBOB Ökobilanzdaten im Baubereich V9.0 (publiziert 14.07.2026, per Excel-Download verifiziert) weist 0.125 kg CO2-eq/kWh aus, der BFE/treeze-Bericht «Umweltkennwerte 2024» (13.06.2024) 127 g CO2-eq/kWh für 2020-2022 ab Niederspannungssteckdose. Methodisch überzeichnet die Formel «Produktion × 0.12» jedoch die Netto-Einsparung um rund 50 %, weil PV-Strom selbst einen Lebenszyklus-Rucksack von 34-43 g CO2-eq/kWh trägt (KBOB 46.002/46.009); sauber wäre ein Netto-Faktor von ~0.08 kg CO2-eq/kWh mit Fussnote (Faktor, KBOB V9.0, Lebenszyklus-Systemgrenze) — wobei die Verbrauchermix-Basis gegenüber einer Export-Substitution des ENTSO-E-Mixes (0.523 kg) konservativ bleibt. Positiv: Die Website behauptet nirgends «emissionsfrei» oder «klimaneutral», und der UI-Hinweis «Indikativ, abhängig vom Strommix» existiert bereits; es fehlt nur die belastbare Faktor-Fussnote. Der Mantelerlass (revidiertes Energierecht 2025/2026) ändert an den Emissionsfaktoren nichts — sie sind Ökobilanz-, nicht Regulierungsdaten. Die BAFU-Studie «Umweltbilanz Strommixe Schweiz 2018» war zum Prüfzeitpunkt nicht abrufbar (HTTP 502) und wurde daher nicht als Quelle verwendet.

### R-038 — bedingt gültig

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | Code-Kommentar src/lib/solar/calculate.ts:328: «CO2-Faktor Schweiz-Mix grob ~0.12 kg/kWh» |
| Fundstelle | src/lib/solar/calculate.ts:328 |
| Bewertung | bedingt gültig |
| Korrektur | Faktor auf den offiziellen KBOB-Wert stellen: Schweizer Verbrauchermix = 0.125 kg CO₂-eq/kWh (KBOB/ecobau-Liste 2022, Version 9.0 vom 14.07.2026, Datensatz 45.020 «CH-Verbrauchermix», Lebenszyklus, Strom ab Netz). Zweitwert BFE/treeze: 127 g CO₂-eq/kWh (Verbrauchermix 2020–2022, ab Niederspannungssteckdose). 0.12 ist als konservative Rundung davon vertretbar, sollte aber als «KBOB-Verbrauchermix 0.125, gerundet» mit Datenjahr dokumentiert werden. Zum Vergleich: CH-Produktionsmix nur 0.0324, ENTSO-E-Mix 0.523, CH-Lieferantenmix HKN 0.0544 kg CO₂-eq/kWh (alle KBOB V9.0). |
| Geltungsbereich | Schweiz gesamt (Verbrauchermix = Inlandproduktion + kommerzieller Handel/Importe); nicht regional differenziert |
| Zeitraum | KBOB V9.0 publiziert 14.07.2026 (Hintergrunddaten UVEK Ökobilanzdatenbestand DQRv2:2022); BFE-Wert Bezugsjahre 2020–2022; Prüfdatum 2026-08-14 |
| Annahmen | Der Website-Faktor soll den substituierten Schweizer Strom ab Steckdose abbilden (so der Code-Kommentar «substituierter Strom konservativ») |
| Berechnung | Kein eigener Rechenschritt; reiner Faktorvergleich: 0.12 vs. 0.125 kg CO₂-eq/kWh → Abweichung −4 % |
| Quelle | KBOB (Koordinationskonferenz der Bau- und Liegenschaftsorgane der öffentlichen Bauherren) — Ökobilanzdaten im Baubereich, KBOB/ecobau-Liste 2022, Version 9.0 (Excel) |
| Quellen-URL | https://www.kbob.admin.ch/de/oekobilanzdaten-im-baubereich |
| Quellenstelle | Excel «Ökobilanzdaten_im_Baubereich_V9.0.xlsx», Blatt «Energie Énergie», Zeile 99 (ID 45.020 CH-Verbrauchermix: 0.125 kg CO₂-eq/kWh), Zeile 100 (45.019 CH-Produktionsmix: 0.0324), Zeile 103 (45.021 ENTSO-E-Mix: 0.523), Zeile 102 (45.025 CH-Lieferantenmix HKN: 0.0544) |
| Zweitquelle | BFE/treeze Ltd., «Energieetikette für Personenwagen: Umweltkennwerte 2024 der Strom- und Treibstoffbereitstellung», Bericht vom 13.06.2024, Kap. 4.5.2/Fig. 4.3: Schweizer Verbraucher-Strommix 2020–2022 = 127 g CO₂-eq/kWh ab Niederspannungssteckdose; HKN-Lieferantenmix 2022 = 31.9 g CO₂-eq/kWh (https://pubdb.bfe.admin.ch/de/publication/download/11822, per WebFetch geladen) |
| Unsicherheit | Jahresschwankung des Verbrauchermix je nach Importanteil/Winterimporten: publizierte Werte der letzten Jahre 125–128 g CO₂-eq/kWh (KBOB 125 / BFE 127 / frühere BAFU-Bilanz 2018: 128). Achtung Verwechslungsgefahr: 110 g CO₂/kWh im BFE-Bericht ist NUR fossiles CO₂, nicht CO₂-eq. Faktorwahl (Verbrauchermix vs. Produktionsmix vs. ENTSO-E) ändert das Ergebnis um Faktor 4–16 |
| Nächste Prüfung | 2027-08 (nach Erscheinen der nächsten KBOB-Version, Updates jeweils ca. Mitte Jahr) |

### R-039 — bedingt gültig

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | co2SavedKgPerYear = realistischer Jahresertrag × 0.12 — die gesamte PV-Produktion wird als «CO₂-Einsparung» in kg/Jahr ausgewiesen (Brutto-Substitution, ohne Abzug der PV-eigenen Emissionen) |
| Fundstelle | src/lib/solar/calculate.ts:329 (Anzeige: src/components/solar/calculator-result-card.tsx:73, Mail: src/lib/email/notify.ts:272) |
| Bewertung | bedingt gültig |
| Korrektur | Sauber ist die Netto-Betrachtung: Einsparung = Produktion × (Verbrauchermix − PV-Lebenszyklusemissionen) = Produktion × (0.125 − 0.043) ≈ Produktion × 0.08 kg CO₂-eq/kWh (KBOB V9.0: 45.020 minus 46.009 «Photovoltaik Schrägdach, Kleinanlage, Mono-Si, am Standort erzeugt» 0.0431; mit Marktmix-Datensatz 46.002 = 0.0342 ergäbe sich 0.09). Empfehlung: Faktor 0.08 verwenden mit Fussnote: «Netto-CO₂-Einsparung: Schweizer Verbrauchermix 125 g CO₂-eq/kWh abzüglich Lebenszyklusemissionen des PV-Stroms ~43 g CO₂-eq/kWh (KBOB Ökobilanzdaten im Baubereich, Version 9.0, 14.07.2026; Lebenszyklus-Systemgrenze). Effektive Einsparung abhängig davon, welcher Strom ersetzt wird.» Alternativ 0.12 beibehalten, dann aber zwingend als Brutto-Substitutionswert deklarieren — als «Einsparung» ohne diesen Hinweis überzeichnet er das Netto-Resultat um ~50 % |
| Geltungsbereich | Schweiz; Kleinanlagen auf Schrägdach (typisches DoubleA-Segment EFH Grenchen/Solothurn/Biel/Bern); bei Fassaden-PV höhere PV-Emissionen (0.0594) |
| Zeitraum | KBOB V9.0 vom 14.07.2026; Prüfdatum 2026-08-14 |
| Annahmen | PV-Strom (Eigenverbrauch + Einspeisung) ersetzt vollumfänglich Strom mit Verbrauchermix-Fussabdruck; PV-Rucksack gemäss KBOB-Kleinanlage Schrägdach Mono-Si; keine Speicherverluste/Batterie-Herstellungsemissionen eingerechnet (Batterie würde Netto-Bilanz weiter mindern) |
| Berechnung | Netto-Faktor = 0.125 kg CO₂-eq/kWh (45.020) − 0.0431 kg CO₂-eq/kWh (46.009) = 0.0819 ≈ 0.08 kg CO₂-eq/kWh (auf 2 Dezimalen abgerundet, konservativ). Beispiel: 10'000 kWh/Jahr × 0.08 = 800 kg CO₂-eq/Jahr ≈ 0.8 t. Heutige Formel: 10'000 × 0.12 = 1'200 kg (+46 % gegenüber Netto) |
| Quelle | KBOB — Ökobilanzdaten im Baubereich, KBOB/ecobau-Liste 2022, Version 9.0 (Excel) |
| Quellen-URL | https://www.kbob.admin.ch/de/oekobilanzdaten-im-baubereich |
| Quellenstelle | Blatt «Energie Énergie»: Zeile 99 (45.020 CH-Verbrauchermix 0.125), Zeilen 105–113 (Rubrik 46 «Elektrizität am Standort erzeugt»: 46.002 PV Schrägdach Marktmix 0.0342; 46.009 Kleinanlage Mono-Si 0.0431; 46.004 Fassade 0.0594 kg CO₂-eq/kWh) |
| Zweitquelle | BFE/treeze «Umweltkennwerte 2024» (13.06.2024): Verbrauchermix 2020–2022 = 127 g CO₂-eq/kWh — bestätigt den Minuenden; für die Export-Perspektive KBOB 45.021 ENTSO-E-Mix 0.523 kg CO₂-eq/kWh: wird eingespiesener PV-Strom als Ersatz von Importstrom gerechnet, läge die Einsparung mit ~0.48 kg/kWh netto weit HÖHER — die Verbrauchermix-Basis ist also die konservative Wahl |
| Unsicherheit | Netto-Faktor je nach PV-Datensatz 0.08–0.09 kg CO₂-eq/kWh; je nach Substitutionsannahme (Verbrauchermix vs. ENTSO-E für Einspeisung) 0.08–0.48 kg/kWh. Beispiel 10'000 kWh/Jahr: heutige Anzeige 1'200 kg, netto konservativ 820–910 kg. Der bestehende UI-Hinweis «Indikativ, abhängig vom Strommix» ist korrekt, ersetzt aber die fehlende Faktor-/Datenjahr-Fussnote nicht |
| Nächste Prüfung | 2027-08 (nächste KBOB-Version) |

### R-040 — verifiziert

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | Implizite Umweltdarstellung der Website: keine Stelle behauptet «emissionsfrei», «CO₂-frei» oder «klimaneutral» (geprüft per Volltextsuche über src/, content/, public/); PV-Strom ist tatsächlich NICHT emissionsfrei |
| Fundstelle | gesamte Codebase (Grep über *.ts/*.tsx/*.md/*.mdx/*.json); einzige Umwelt-Aussagen: calculator-result-card.tsx:73 «CO₂-Einsparung … Indikativ, abhängig vom Strommix» und ueber-uns/page.tsx:76-80 «Nachhaltig im Detail» (qualitativ, ohne Zahlen) |
| Bewertung | verifiziert |
| Korrektur | Claim-Lage beibehalten — es gibt nichts zu korrigieren, nur abzusichern: Formulierungsregel für alle künftigen Texte festschreiben: NIE «emissionsfrei/CO₂-frei/klimaneutral» schreiben. Sichere Formulierung: «Solarstrom verursacht im Betrieb praktisch keine Emissionen; über den ganzen Lebenszyklus (Herstellung, Transport, Montage, Entsorgung) liegen die Emissionen einer Schrägdach-Kleinanlage bei rund 34–43 g CO₂-eq/kWh — rund ein Drittel des Schweizer Verbrauchermixes (125 g CO₂-eq/kWh) und ein Bruchteil des europäischen ENTSO-E-Mixes (523 g CO₂-eq/kWh).» (KBOB V9.0) |
| Geltungsbereich | Schweiz, netzgekoppelte Aufdach-Kleinanlagen (Mono-/Multi-Si); Fassadenanlagen höher (59.4 g), Dünnschicht CdTe tiefer (27.2 g) |
| Zeitraum | KBOB V9.0 vom 14.07.2026 (Hintergrunddaten UVEK DQRv2:2022, inkl. neu publizierter technologie-spezifischer PV-Kennwerte); Prüfdatum 2026-08-14 |
| Annahmen | Grep-Suchmuster: emissionsfrei, CO2-frei, klimaneutral, 100% sauber/grün, saubere Energie, grüner Strom — keine Treffer mit quantitativem Umwelt-Claim |
| Quelle | KBOB — Ökobilanzdaten im Baubereich, KBOB/ecobau-Liste 2022, Version 9.0 (Excel) |
| Quellen-URL | https://www.kbob.admin.ch/de/oekobilanzdaten-im-baubereich |
| Quellenstelle | Blatt «Energie Énergie», Rubrik 46 (am Standort erzeugt): 46.002 PV Schrägdach Marktmix 0.0342 / 46.009 Mono-Si 0.0431 / 46.010 Multi-Si 0.0429 / 46.011 CdTe 0.0272 / 46.004 Fassade 0.0594 kg CO₂-eq/kWh; Rubrik 45 (via Netz bezogen): 45.012 PV Schrägdach 0.0447 |
| Zweitquelle | Keine nötig (kein aktiver Website-Claim); PV-Werte sind KBOB-primär belegt |
| Unsicherheit | PV-Lebenszyklusemissionen 27–59 g CO₂-eq/kWh je nach Technologie und Montageart; Werte sinken tendenziell mit jeder KBOB-Revision (sauberere Modulproduktion, höhere Wirkungsgrade) |
| Nächste Prüfung | 2027-08 (nächste KBOB-Version); zusätzlich bei jedem neuen Marketing-Text redaktionell prüfen |

---

## Steuerabzüge

**Cluster-Fazit:** Alle drei Steuer-Claims sind im Kern richtig, aber unpräzise und ohne die ab 2029 entscheidende Rechtsänderung. Bundesrechtlich sind PV-Investitionen an bestehenden Gebäuden den Unterhaltskosten gleichgestellt (Art. 32 Abs. 2 DBG i.V.m. Liegenschaftskostenverordnung SR 642.116, Art. 1/3/4; Übertrag auf zwei Folgeperioden), und seit Luzern 2023 den Abzug bei den Staats-/Gemeindesteuern eingeführt hat, kennen ihn praktisch alle Kantone — «in den meisten Kantonen» ist damit untertrieben, aber nicht falsch. Kritische Lücken der Website: (1) Die Startseiten-Version lässt «bei bestehenden Liegenschaften» weg, obwohl gerade der Heimkanton Solothurn Neubauten und Gebäude der letzten 5 Jahre vom Abzug ausschliesst (Bern erlaubt PV auf Neubauten ab 2024 — regionale Divergenz im Kernmarkt); (2) massgebend ist je nach Kanton das Rechnungs- (SO/BE) oder Zahlungsjahr (LU), nicht pauschal das «Investitionsjahr», und der Abzug setzt den effektiven statt pauschalen Unterhaltsabzug sowie die Verrechnung der Einmalvergütung voraus; (3) mit dem vom Bundesrat am 1.4.2026 auf den 1.1.2029 festgelegten Systemwechsel (Eigenmietwert-Abschaffung, Volksabstimmung 28.9.2025) entfällt der Energiespar-Abzug bei der direkten Bundessteuer — bis Ende 2028 gilt das heutige Recht, danach dürfen Kantone den Abzug nur befristet weiterführen. Empfehlung: Formulierungen präzisieren, Neubau-Vorbehalt und 2029-Horizont ergänzen, und den bisher unerwähnten Übertrag auf zwei Folgejahre als Verkaufsargument aufnehmen; kein Steuerberatungsversprechen, Verweis auf die Veranlagungspraxis des Kantons beibehalten.

### R-041 — bedingt gültig

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | «In den meisten Kantonen lassen sich Investitionen in Photovoltaik bei bestehenden Liegenschaften vom steuerbaren Einkommen abziehen. Massgebend ist die Praxis Ihres Kantons» |
| Fundstelle | src/app/finanzierung/page.tsx:110-113 (fundingItems «Steuerabzüge») |
| Bewertung | bedingt gültig |
| Korrektur | Präziser und weiterhin vorsichtig: «Investitionen in Photovoltaik an bestehenden Gebäuden sind bei der direkten Bundessteuer den Unterhaltskosten gleichgestellt und heute auch in den Kantonen – seit 2023 einschliesslich Luzern – vom steuerbaren Einkommen abziehbar. Massgebend bleiben die Praxis Ihres Kantons (z.B. Fristen für Neubauten) und der effektive statt pauschale Unterhaltsabzug. Keine Steuerberatung – verbindlich ist die Veranlagung.» Wichtig: Hinweis ergänzen, dass der Abzug bei der direkten Bundessteuer mit dem Systemwechsel Wohneigentumsbesteuerung per 1.1.2029 entfällt (Kantone dürfen ihn befristet weiterführen); PV-Projekte mit Steuerabzugs-Argument sollten bis Ende 2028 abgerechnet sein. |
| Geltungsbereich | Schweizweit (dBSt einheitlich); kantonal: SO = Abzug nur an Bauten, die seit >5 Jahren bestehen (Neubau/Ersatzneubau ausgeschlossen); BE = ab Steuerjahr 2024 sogar auf Neubauten abziehbar; LU = Abzug bei Staats-/Gemeindesteuern erst seit Steuerperiode 2023 (vorher nur dBSt) |
| Zeitraum | Rechtsstand bis 31.12.2028 (altes Recht); Systemwechsel per 1.1.2029 (Bundesratsbeschluss 1.4.2026); Prüfdatum 2026-08-14 |
| Annahmen | Zielgruppe = private Eigentümer (Privatvermögen); bei Geschäftsvermögen gelten stattdessen Aktivierung/Abschreibung (SO Ziff. 3). Der Mantelerlass (Stromversorgungsgesetz, in Kraft seit 1.1.2025/2026) ändert an den Steuerabzügen nichts — die relevante Rechtsänderung ist die Wohneigentumsbesteuerungs-Reform per 2029 |
| Quelle | Bundeskanzlei/Fedlex (EFD-Verordnung) — Verordnung über den Abzug der Kosten von Liegenschaften des Privatvermögens bei der direkten Bundessteuer (Liegenschaftskostenverordnung) vom 9. März 2018, SR 642.116, in Kraft seit 1.1.2020 |
| Quellen-URL | https://fedlex.data.admin.ch/filestore/fedlex.data.admin.ch/eli/cc/2018/212/20200101/de/pdf-a/fedlex-data-admin-ch-eli-cc-2018-212-20200101-de-pdf-a-1.pdf |
| Quellenstelle | Art. 1 (energiesparende Investitionen den Unterhaltskosten gleichgestellt; Abzug nur für selbst getragene Kosten), Art. 3 (Ersatzneubau/bestehende Gebäude), Art. 4 (Übertrag auf die zwei nachfolgenden Steuerperioden); i.V.m. Art. 32 Abs. 2 DBG (wörtlich zitiert im Solothurner Steuerbuch § 27 Nr. 4, S. 2) |
| Zweitquelle | Kantonale Praxen weichen ab: Solothurner Steuerbuch § 27 Nr. 4 (Fassung 06.06.2024), Ziff. 2.2.1/2.2.2: kein Abzug bei (Ersatz-)Neubau und Gebäuden, die in den letzten 5 Jahren fertiggestellt wurden (steuerbuch.so.ch, PDF geladen) — vs. Kanton Bern TaxInfo «Photovoltaikanlagen und Solarthermieanlagen im Privatvermögen (ab 1.1.2024)» (taxinfo.sv.fin.be.ch/taxinfo/6e6e9fc4-dabe-450c-8df9-c334f9f64027, geladen): Abzug ab 2024 auch auf Neubauten — vs. Kanton Luzern, Dienststelle Steuern, FAQ «Einführung Abzug für Energiespar- und Umweltschutzmassnahmen ab 2023» (steuern.lu.ch, PDF geladen): Abzug bei Staats-/Gemeindesteuern erst ab 1.1.2023, Neubau ausgeschlossen |
| Unsicherheit | Aussage ist korrekt, aber untertrieben: seit LU 2023 kennen praktisch alle Kantone den Abzug (eine Einzeldurchsicht aller 26 kantonalen Praxen wurde nicht vorgenommen, daher «in den meisten/praktisch allen» beibehalten statt «in allen» zu behaupten). Einschränkungen, die der Text verschweigt: (1) Abzug setzt effektiven Liegenschaftsunterhalts-Abzug voraus (nicht kombinierbar mit Pauschale — SO Ziff. 2.3, LU FAQ); (2) nur selbst getragene Kosten (Einmalvergütung/Subventionen werden verrechnet bzw. als Einkommen besteuert — Art. 1 Abs. 2 LKV, SO Ziff. 2.4, BE TaxInfo); (3) Neubau-Definition variiert (SO: 5-Jahres-Frist); (4) ab 1.1.2029 entfällt der Abzug bei der dBSt (EFD-Medienmitteilung vom 1.4.2026, https://www.efd.admin.ch/de/newnsb/yGTqBPowRqyVh0zPokW-q, geladen: Kantone können ihn «weiterhin aufrechterhalten, wenn auch zeitlich begrenzt»); Ausführungsbestimmungen des Bundes noch in Erarbeitung (Konsultation 2026) |
| Nächste Prüfung | 2027-06 (nach Publikation der Ausführungsbestimmungen zum Systemwechsel); zwingend vor Steuerperiode 2029 |

### R-042 — bedingt gültig

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | Startseite/Live-Site: «Eigenfinanzierung mit Steuerabzug — Investitionen in Photovoltaik lassen sich in den meisten Kantonen vom steuerbaren Einkommen abziehen. Wir weisen den Effekt indikativ in der Offerte aus.» |
| Fundstelle | Startseite (Live-Site doubleasolutions.ch, Abschnitt Finanzierung/Eigenfinanzierung) |
| Bewertung | bedingt gültig |
| Korrektur | Satz 1 wie Zeile 1 präzisieren und zwingend um «bei bestehenden Gebäuden» ergänzen — auf der Startseite fehlt diese Einschränkung, dadurch ist die Aussage für Neubau-Kunden irreführend (SO: kein Abzug bei Neubauten und Gebäuden <5 Jahre; LU: kein Abzug bei Neubau; nur BE erlaubt PV auf Neubau ab 2024). Vorschlag: «Investitionen in Photovoltaik an bestehenden Gebäuden lassen sich beim Bund und in praktisch allen Kantonen vom steuerbaren Einkommen abziehen (bei der direkten Bundessteuer noch bis Ende 2028). Wir weisen den möglichen Effekt indikativ in der Offerte aus – die verbindliche Beurteilung liegt bei Ihrer Steuerbehörde.» Satz 2 («Wir weisen den Effekt indikativ aus») als Firmenangabe beibehalten, aber nie als Steuerberatung framen |
| Geltungsbereich | Schweizweit; kritisch für das Einzugsgebiet: SO (5-Jahres-Neubaufrist) und BE (Neubau abziehbar ab 2024) weichen genau im Kernmarkt der Firma voneinander ab |
| Zeitraum | Rechtsstand 2026 (gültig bis Steuerperiode 2028 bei der dBSt); Prüfdatum 2026-08-14 |
| Annahmen | Formulierung «in den meisten Kantonen» stammt aus der Zeit vor 2023 (LU als letzter Kanton ohne Abzug); heute faktisch flächendeckend, «praktisch allen» ist belegbar vorsichtig |
| Quelle | Steueramt Kanton Solothurn — Solothurner Steuerbuch, § 27 Nr. 4 «Betrieb einer Photovoltaikanlage», Fassung vom 06.06.2024 |
| Quellen-URL | https://steuerbuch.so.ch/fileadmin/steuerbuch/230220/027-04_Photovoltaikanlage_V05_2024-06-06.pdf |
| Quellenstelle | Ziff. 2.2.1 ((Ersatz-)Neubau: wertvermehrend, NICHT abziehbar, inkl. Gebäude der letzten 5 Jahre), Ziff. 2.2.2 (Altbau: abziehbar nach Art. 5 LKV, § 39 Abs. 3 lit. d StG SO; Übertrag § 39 Abs. 3bis StG), Ziff. 2.3 (nur bei effektivem Abzug, nicht mit Pauschale), Ziff. 2.4 (EIV wird bei abzugsfähiger Investition als übriges Einkommen besteuert), Ziff. 6 (dBSt identisch) |
| Zweitquelle | Kanton Bern, TaxInfo «Photovoltaikanlagen und Solarthermieanlagen im Privatvermögen (ab 1.1.2024)» (https://www.taxinfo.sv.fin.be.ch/taxinfo/6e6e9fc4-dabe-450c-8df9-c334f9f64027, geladen): Investitionskosten als Unterhalt abziehbar, ab 2024 auch auf Neubauten; Subventionen/EIV werden mit den Investitionskosten verrechnet |
| Unsicherheit | «Effekt indikativ in der Offerte» = Firmenangabe, extern nicht verifizierbar; plausibel und marktüblich, sofern als unverbindlich gekennzeichnet. Steuereffekt hängt vom Grenzsteuersatz, der Wahl effektiver Abzug vs. Pauschale und der Verrechnung der Einmalvergütung ab — ein pauschaler CHF-Wert wäre unseriös, die indikative Ausweisung ist korrekt gewählt. Achtung Doppelzählung in Offerten: Abzug nur auf selbst getragene Kosten (netto nach EIV) bzw. EIV als steuerbares Einkommen |
| Nächste Prüfung | 2027-06; zwingend vor Steuerperiode 2029 (Wegfall dBSt-Abzug per 1.1.2029, Bundesratsbeschluss vom 1.4.2026) |

### R-043 — bedingt gültig

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | «Steuerabzug wirkt direkt im Investitionsjahr – je nach Kanton» |
| Fundstelle | src/app/finanzierung/page.tsx:124 (financingPaths «Eigenfinanzierung», Bullet 2) |
| Bewertung | bedingt gültig |
| Korrektur | Kern stimmt, aber das massgebende Jahr ist kantonal unterschiedlich definiert: BE und SO stellen auf das Jahr der Rechnungsstellung ab, LU auf das Zahlungsdatum — «Investitionsjahr» ist also nur ungefähr richtig. Sichere Formulierung: «Der Abzug wirkt in der Regel bereits in der Steuerperiode der Rechnungsstellung bzw. Zahlung – massgebend ist die Praxis Ihres Kantons. Übersteigen die Kosten Ihr Einkommen, können Energiespar-Investitionen auf die zwei folgenden Steuerperioden übertragen werden.» Der Übertrag (Art. 4 LKV; SO § 39 Abs. 3bis StG; LU analog) ist ein verkaufsrelevanter Zusatznutzen, den die Seite bisher nicht erwähnt |
| Geltungsbereich | Schweizweit (dBSt: Art. 4 LKV); kantonale Abweichung beim Zeitpunkt: SO/BE = Rechnungsstellungsjahr, LU = Zahlungsjahr; Übertrag überall nur bei negativem Reineinkommen und nur für Energiespar-/Umweltschutzmassnahmen (nicht für übrigen Unterhalt) |
| Zeitraum | Rechtsstand 2026 (Übertragsregel seit Steuerperiode 2020); Prüfdatum 2026-08-14 |
| Annahmen | «Investitionsjahr» wird vom Leser als Jahr von Bestellung/Bau verstanden; bei Jahresübergreifenden Projekten (Anzahlung Dezember, Schlussrechnung Februar) können die Kantone SO/BE vs. LU zu unterschiedlichen Perioden kommen — für die Offerte relevant |
| Quelle | Bundeskanzlei/Fedlex (EFD-Verordnung) — Liegenschaftskostenverordnung vom 9. März 2018, SR 642.116 |
| Quellen-URL | https://fedlex.data.admin.ch/filestore/fedlex.data.admin.ch/eli/cc/2018/212/20200101/de/pdf-a/fedlex-data-admin-ch-eli-cc-2018-212-20200101-de-pdf-a-1.pdf |
| Quellenstelle | Art. 4 LKV (Übertrag auf die zwei nachfolgenden Steuerperioden); ergänzend Solothurner Steuerbuch § 27 Nr. 4 Ziff. 2.2.2 («im Rechnungsstellungsjahr … ab Steuerperiode 2020 auf die zwei nachfolgenden Steuerperioden», Übertrag nur bei negativem Reineinkommen) |
| Zweitquelle | Kanton Luzern, FAQ Energiespar-Abzug ab 2023 (steuern.lu.ch, PDF geladen): «Für die steuerliche Berücksichtigung ist der Zahlungszeitpunkt (Datum) relevant» — abweichend von SO/BE (Rechnungsstellung); beide Praxen dokumentiert, kein Mittelwert |
| Unsicherheit | Wirkung «direkt im Investitionsjahr» setzt zusätzlich voraus: effektiver Unterhaltsabzug gewählt (keine Pauschale) und genügend steuerbares Einkommen; bei sehr grossen Anlagen verteilt sich der Effekt via Übertrag auf bis zu 3 Jahre. Ab Steuerperiode 2029 entfällt der Abzug bei der dBSt (Systemwechsel Wohneigentumsbesteuerung); kantonale Weiterführung nur befristet zulässig |
| Nächste Prüfung | 2027-06; zwingend vor Steuerperiode 2029 |

---

## Recht, Prozess & Garantien

**Cluster-Fazit:** Der Cluster Recht/Prozess/Garantien ist überwiegend solide, hat aber einen echten Korrekturbedarf: Die FAQ-Aussage, bei «Flachdächern mit Aufständerung» könne eine Bewilligung nötig sein, ist seit der RPV-Revision überholt — Art. 32a Abs. 1bis RPV erklärt aufgeständerte Flachdach-Anlagen ausdrücklich für bewilligungsfrei (max. 1 m über Dachrand, 45°-Sichtbarkeitsregel, reflexionsarm), und «grössere Gewerbeflächen» ist kein bundesrechtliches Kriterium; nur der Schutzobjekt-Teil stimmt (Art. 18a Abs. 3 RPG). Die Kernaussage «meist nur meldepflichtig» ist verifiziert, mit klaren kantonalen Fristen: Solothurn verlangt die Meldung 30 Tage vor Baubeginn (KBV § 3bis), Bern 7 Arbeitstage via eBau; seit 1.1.2026 sind in Bern auch Fassadenanlagen meldeverfahrensfähig (Rechtsänderung durch die jüngste RPG-Revision). Die Garantie-Claims sind gedeckt: AIKO Neostar 3S54 bietet sogar 30 Jahre Produkt- UND Leistungsgarantie (die Website könnte hier stärker verkaufen), während die Wechselrichter-Spanne «12–20 Jahre» leicht optimistisch am oberen Rand liegt (BFH: typisch ein Ersatz im Anlagenleben, Störung ~alle 10 Jahre; GoodWe-Standardgarantie nur 5 Jahre, verlängerbar). Der Begriff «Sicherheitsnachweis (SiNa)» ist korrekt (Art. 37 NIV), inkl. relevanter Pflichten: TAG beim Netzbetreiber, SiNa-Einreichung innert 6 Monaten, ESTI-Planvorlage erst über 30 kVA. Die reinen Firmenangaben (8–16 Wochen, Antwort innert eines Werktags, Öffnungszeiten) sind plausibel und als solche gekennzeichnet.

### R-044 — Firmenangabe

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | «Von der Standortanalyse bis zur Inbetriebnahme rechnen wir typischerweise mit 8 bis 16 Wochen. Faktoren sind Bewilligung der Gemeinde, Verfügbarkeit des Verteilnetzbetreibers und Materiallieferzeiten.» |
| Fundstelle | src/components/sections/faq-section.defaults.ts:11 |
| Bewertung | Firmenangabe |
| Korrektur | Claim beibehalten — Plausibilität gestützt: EnergieSchweiz nennt als Idealfall «innerhalb von zwölf Werktagen geplant und installiert» (nur bei freien Kapazitäten); real kommen hinzu: Meldefrist SO mind. 30 Tage vor Baubeginn (KBV § 3bis), BE spätestens 7 Arbeitstage via eBau, TAG-Bearbeitung durch den VNB und Materialbeschaffung. 8–16 Wochen ist damit eine realistische, eher konservative Gesamtspanne. Optional präzisieren: «je nach Gemeinde, Netzbetreiber und Materialverfügbarkeit». |
| Geltungsbereich | DoubleA-Einzugsgebiet Grenchen/Solothurn/Biel/Bern; Einfamilienhaus-Aufdachanlagen |
| Zeitraum | Stand 2026; Prüfdatum 2026-08-14 |
| Annahmen | Firmenspezifisches Serviceversprechen; extern nur auf Plausibilität prüfbar |
| Quelle | EnergieSchweiz (BFE) — Leitfaden Solaranlagen (7 Schritte zur Solaranlage) |
| Quellen-URL | https://www.energieschweiz.ch/wohnen/solaranlagen/ |
| Quellenstelle | Abschnitt Planung/Installation («Im Idealfall … innerhalb von zwölf Werktagen geplant und installiert») |
| Zweitquelle | Kanton Solothurn, Meldeformular für Solaranlagen auf (Flach-)Dächern (https://so.ch/fileadmin/internet/bjd/Anhang_II_zu_Bulletin_2_2022.pdf): Meldung spätestens 30 Tage vor Baubeginn — belegt kantonale Mindestvorlaufzeit |
| Unsicherheit | Spanne stark projektabhängig (Netzverstärkung, Bewilligungsverfahren bei Schutzobjekten kann Monate dauern); untere Grenze 8 Wochen bei bewilligungspflichtigen Objekten kaum haltbar — Formulierung «typischerweise» fängt das ab |
| Nächste Prüfung | 2027-08 |

### R-045 — verifiziert

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | «Aufdach-Anlagen auf Wohngebäuden sind in der Schweiz meist nur meldepflichtig.» (Teilaussage 1 der Bewilligungs-FAQ) |
| Fundstelle | src/components/sections/faq-section.defaults.ts:15 |
| Bewertung | verifiziert |
| Korrektur | Claim beibehalten. Rechtsgrundlage: Art. 18a Abs. 1 RPG — in Bau- und Landwirtschaftszonen bedürfen auf Dächern (seit der jüngsten Revision auch an Fassaden) genügend angepasste Solaranlagen keiner Baubewilligung; sie sind der zuständigen Behörde lediglich zu melden. Optional stärken: «in Bau- und Landwirtschaftszonen» ergänzen, da ausserhalb dieser Zonen andere Regeln gelten. |
| Geltungsbereich | Schweizweit (Bundesrecht); Meldefristen kantonal: SO 30 Tage (KBV § 3bis), BE 7 Arbeitstage via eBau |
| Zeitraum | RPG-Fassung in Kraft Stand 2026-01-01; Prüfdatum 2026-08-14 |
| Quelle | Bundeskanzlei / Fedlex — Raumplanungsgesetz (RPG, SR 700), konsolidierte Fassung Stand 2026-01-01 |
| Quellen-URL | https://fedlex.data.admin.ch/filestore/fedlex.data.admin.ch/eli/cc/1979/1573_1573_1573/20260101/de/html/fedlex-data-admin-ch-eli-cc-1979-1573_1573_1573-20260101-de-html.html |
| Quellenstelle | Art. 18a Abs. 1 RPG |
| Zweitquelle | Kanton Solothurn, Meldeformular Solaranlagen inkl. Auszug KBV § 3bis (https://so.ch/fileadmin/internet/bjd/Anhang_II_zu_Bulletin_2_2022.pdf); Kanton Bern: Meldeverfahren via eBau, Stadt Bern (https://www.bern.ch/themen/planen-und-bauen/baubewilligung/baubewilligungsfreie-anlagen-zur-gewinnung-erneuerbarer-energien) |
| Unsicherheit | «Meist» ist korrekt: Ausnahmen sind Schutzzonen/Kulturdenkmäler (Art. 18a Abs. 2-3 RPG) und Anlagen, die die Kriterien von Art. 32a RPV nicht erfüllen; in SO sind zudem Juraschutzzone und Ortsbildschutzzonen bewilligungspflichtig (Richtplan E-2.5) |
| Nächste Prüfung | 2027-01 (Rechtsänderungen jeweils per 1.1.) |

### R-046 — veraltet

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | «Bei Schutzobjekten, Flachdächern mit Aufständerung oder grösseren Gewerbeflächen kann eine Bewilligung nötig sein.» (Teilaussage 2 der Bewilligungs-FAQ) |
| Fundstelle | src/components/sections/faq-section.defaults.ts:15 |
| Bewertung | veraltet |
| Korrektur | Flachdach-Teil korrigieren: Aufgeständerte Anlagen auf Flachdächern sind nach Art. 32a Abs. 1bis RPV (seit der RPV-Revision 2022) ausdrücklich AUCH bewilligungsfrei, wenn sie die Dachrand-Oberkante um höchstens 1 m überragen, von unten in 45° nicht sichtbar sind und reflexionsarm ausgeführt werden. «Grössere Gewerbeflächen» ist kein bundesrechtliches Bewilligungskriterium (die Anlagengrösse spielt in Art. 18a RPG/32a RPV keine Rolle). Korrekt bleibt nur der Schutzobjekt-Teil (Art. 18a Abs. 3 RPG: Kultur-/Naturdenkmäler stets bewilligungspflichtig). Ersatzformulierung: «Bei Schutzobjekten und in Schutzzonen ist eine Bewilligung nötig; auf Flachdächern gilt die Meldefreiheit, sofern die Anlage den Dachrand um höchstens einen Meter überragt und zurückversetzt ist. Wir klären das vorab mit Ihrer Gemeinde.» |
| Geltungsbereich | Bundesrecht schweizweit; kantonale Verschärfungen: SO Juraschutzzone/Ortsbildschutzzonen bewilligungspflichtig; BE erhöhte Anforderungen bei K-Objekten |
| Zeitraum | RPV-Fassung Stand 2026-01-01; Prüfdatum 2026-08-14 |
| Quelle | Bundeskanzlei / Fedlex — Raumplanungsverordnung (RPV, SR 700.1), konsolidierte Fassung Stand 2026-01-01 |
| Quellen-URL | https://fedlex.data.admin.ch/filestore/fedlex.data.admin.ch/eli/cc/2000/310/20260101/de/html/fedlex-data-admin-ch-eli-cc-2000-310-20260101-de-html.html |
| Quellenstelle | Art. 32a Abs. 1bis RPV (Flachdach-Kriterien), Art. 32b RPV (Kulturdenkmäler); Art. 18a Abs. 3 RPG |
| Zweitquelle | Kanton Solothurn, Meldeformular (https://so.ch/fileadmin/internet/bjd/Anhang_II_zu_Bulletin_2_2022.pdf): Baubehörde prüft explizit «Art. 32a Abs. 1 oder Abs. 1bis RPV» — Flachdach-Aufständerung ist im SO-Meldeverfahren ausdrücklich enthalten; Kanton Bern Medienmitteilung (https://www.be.ch/de/start/dienstleistungen/medien/medienmitteilungen.html?newsID=1d81c106-42fc-4a42-8833-a9cf98cc65db): Fassadenanlagen seit 1.1.2026 im Meldeverfahren, K-Objekte weiterhin bewilligungspflichtig |
| Unsicherheit | Kantone dürfen via Art. 18a Abs. 2 RPG Schutzzonen-Bewilligungspflichten vorsehen; Anlagen, die die 1-m-/45°-Kriterien nicht einhalten (hohe Aufständerung bis Dachkante), bleiben tatsächlich bewilligungspflichtig — der pauschale Kategorienverweis «Flachdach mit Aufständerung» ist dennoch überholt |
| Nächste Prüfung | 2027-01 |

### R-047 — verifiziert

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | «Module haben heute Leistungsgarantien von 25 bis 30 Jahren.» / finanzierung: «Module 25–30 Jahre Auslegung» (Jahr 25–30 als Horizont) |
| Fundstelle | src/components/sections/faq-section.defaults.ts:27; src/app/finanzierung/page.tsx:31-33, 88 |
| Bewertung | verifiziert |
| Korrektur | Claim beibehalten. Für das von DoubleA verbaute AIKO Neostar 3S54 (480-495 W) gilt sogar der obere Rand: 30 Jahre Produktgarantie UND 30 Jahre Leistungsgarantie (Degradation ≤1 % im 1. Jahr, danach ≤0,35 %/Jahr). Die Bandbreite 25–30 Jahre ist als Branchenaussage korrekt und konservativ. Optional: «unsere AIKO-Module: 30 Jahre Produkt- und Leistungsgarantie» als stärkeres, belegtes Verkaufsargument. |
| Geltungsbereich | Herstellerangabe AIKO (global); Branchenspanne für aktuelle Premium-Glas-Glas/N-Type-Module |
| Zeitraum | Datenblatt-Stand abgerufen 2026-08-14 |
| Annahmen | Website nennt keine Marke in der FAQ; Kalibrierung des Rechners (calculate.ts:202) referenziert AIKO Neostar als Standardmodul |
| Quelle | AIKO (Shanghai Aiko Solar Energy) — NEOSTAR 3S54 Mono-Glass 480W-495W — Produktseite mit Garantieangaben |
| Quellen-URL | https://aikosolar.com/en/products/neostar-pro-3s54-mono-glass/ |
| Quellenstelle | Abschnitt Warranty: 30-year product warranty, 30-year performance warranty, ≤1 % first-year / ≤0.35 %/year degradation; Wirkungsgrad bis 24,8 % |
| Unsicherheit | Garantiebedingungen setzen Registrierung/korrekte Installation voraus; ältere oder günstigere Modulserien anderer Hersteller liegen teils bei 12-15 Jahren Produktgarantie — die Aussage betrifft «Leistungsgarantien», dort sind 25-30 Jahre marktüblich korrekt |
| Nächste Prüfung | 2027-08 (Datenblatt-/Sortimentswechsel) |

### R-048 — bedingt gültig

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | «Wechselrichter halten in der Regel 12 bis 20 Jahre.» / finanzierung: «Wechselrichter-Ersatz Jahr 12–20» («realistischer Horizont für den Wechselrichter-Ersatz») |
| Fundstelle | src/components/sections/faq-section.defaults.ts:27; src/app/finanzierung/page.tsx:36-38, 82-83 |
| Bewertung | bedingt gültig |
| Korrektur | Vertretbar, aber am oberen Rand: Die BFH-Langzeitforschung (PV-Labor, Messungen seit 1992) geht davon aus, dass ein Wechselrichter im Anlagenleben (25-30 J.) einmal ersetzt werden muss, mit im Schnitt etwa alle zehn Jahre einer Störung; als typische Lebensdauer werden verbreitet 10-15 Jahre genannt, hochwertige Geräte erreichen bis 25 Jahre. Sicherere Formulierung: «Wechselrichter halten in der Regel 10 bis 20 Jahre — wir planen einen Ersatz einmal im Anlagenleben ein.» Wichtig: Lebensdauer nicht mit Garantie verwechseln — GoodWe (Hausmarke DoubleA) gewährt standardmässig nur 5 Jahre Garantie (verlängerbar; Hybrid-Aktion 10 Jahre, Optionen bis 25 Jahre). |
| Geltungsbereich | Allgemeine Komponentenaussage; Garantieangabe spezifisch GoodWe global |
| Zeitraum | BFH-Projektstand 2022-2025; GoodWe-Garantiedokument Rev 5.2 vom 2026-04-10; Prüfdatum 2026-08-14 |
| Quelle | Berner Fachhochschule BFH, PV-Labor — Referenzprojekt «Lebenserwartung Photovoltaik-Wechselrichter» |
| Quellen-URL | https://www.bfh.ch/de/forschung/referenzprojekte/lebenserwartung-photovoltaik-wechselrichter/ |
| Quellenstelle | Projektbeschrieb: Störung im Schnitt ca. alle 10 Jahre; Faustregel einmaliger Ersatz im Anlagenleben; Module 25-30 J. vs. Wechselrichter-Austausch oft nach 15 J. |
| Zweitquelle | GoodWe Technologies, «GOODWE Limited Warranty for Inverter System (Global)», Rev 5.2, 2026-04-10 (https://en.goodwe.com/Ftp/Downloads/Warranty/GOODWE%20Limited%20Warranty%20for%20Inverter%20System-GLOBAL.pdf): 5 Jahre Standardgarantie für On-Grid- und Hybrid-Serien (ET/EH/ES u.a.) — Garantie liegt deutlich unter der kommunizierten Haltbarkeitsspanne |
| Unsicherheit | Feldstudien zeigen grosse Streuung (>50 % der Geräte bis Jahr 15 ohne ertragsrelevante Fehler); die Untergrenze 12 statt 10 Jahre ist leicht optimistisch, die Kernaussage «ein Ersatz im Anlagenleben» ist wissenschaftlich gedeckt |
| Nächste Prüfung | 2027-08 |

### R-049 — verifiziert

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | services: «Sicherheitsnachweis (SiNa) und Inbetriebnahme mit Protokoll» / Live-Site: «Inbetriebnahme inkl. Sicherheitsnachweis» |
| Fundstelle | src/app/services/page.tsx:109 |
| Bewertung | verifiziert |
| Korrektur | Claim beibehalten — Terminologie korrekt: Der Nachweis heisst offiziell «Sicherheitsnachweis (SiNa)» nach Art. 37 NIV (SR 734.27), für PV ergänzt um das Mess- und Prüfprotokoll Photovoltaik. Kontext gemäss ESTI Weisung 233: (1) TAG (technisches Anschlussgesuch) und Installationsanzeige sind vor Netz-Parallelbetrieb beim Verteilnetzbetreiber einzureichen (Werkvorschriften WVCH, Zustimmung des VNB nötig); (2) SiNa + Prüfprotokoll gehen an den Netzbetreiber; (3) der Eigentümer muss innert 6 Monaten nach Übernahme eine Abnahmekontrolle durch ein unabhängiges Kontrollorgan/akkreditierte Inspektionsstelle veranlassen (Art. 35 Abs. 3 NIV); (4) ESTI-Planvorlage ist nur für Anlagen über 30 kVA am Niederspannungsverteilnetz nötig (Art. 1 Abs. 1 Bst. b VPeA, SR 734.25) — typische EFH-Anlagen sind davon befreit. |
| Geltungsbereich | Schweizweit (NIV/VPeA Bundesrecht); Details Anschlussgesuch je Verteilnetzbetreiber |
| Zeitraum | ESTI Weisung 233 Version 0918 (weiterhin publiziert); Prüfdatum 2026-08-14 |
| Quelle | Eidgenössisches Starkstrominspektorat ESTI — Weisung ESTI Nr. 233: Photovoltaik-Energieerzeugungsanlagen (PV-EEA) — Planvorlagepflicht, Bewilligungspflicht, Abnahmekontrolle |
| Quellen-URL | https://www.esti.admin.ch/inhalte/pdf/Weisungen/Deutsch/ESTI_233_0918_d.pdf |
| Quellenstelle | Ziff. 2 (Planvorlagepflicht >30 kVA, Art. 1 Abs. 1 Bst. b VPeA), Ziff. 4.2 (SiNa an Netzbetreiberin innert 6 Monaten, Art. 35 Abs. 3 / Art. 37 NIV), Ziff. 6.3/6.7 (TAG und Installationsanzeige, Netzparallelbetrieb nur mit Zustimmung der Netzbetreiberin) |
| Unsicherheit | Keine — Begriff und Pflichtenlage eindeutig; einzige Variable ist die VNB-spezifische Ausgestaltung des Anschlussgesuchs |
| Nächste Prüfung | 2027-08 (ESTI-Weisungen werden periodisch revidiert) |

### R-050 — Firmenangabe

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | «Antwort innert eines Werktags» (Hero-Trust-Element, Kontakt, Services, Finanzierung) |
| Fundstelle | src/components/sections/hero-section.tsx:19; src/app/kontakt/page.tsx:28; src/app/services/page.tsx:175; src/app/finanzierung/page.tsx:487 |
| Bewertung | Firmenangabe |
| Korrektur | Claim beibehalten, sofern operativ eingehalten — extern nicht verifizierbar. Empfehlung: intern als Service-Level dokumentieren (z.B. Erstantwort, nicht Offerte) und bei Ferienabwesenheiten Auto-Reply mit realistischer Frist schalten, damit das Versprechen einklagbar bleibt (UWG-Risiko bei systematischer Nichteinhaltung). |
| Geltungsbereich | Firmenspezifisches Serviceversprechen DoubleA Solar Solutions |
| Zeitraum | Prüfdatum 2026-08-14 |
| Quelle | DoubleA Solar Solutions (Eigenangabe) — Website-Eigenangabe — keine externe Quelle existent |
| Quellen-URL | https://www.energieschweiz.ch/wohnen/solaranlagen/ |
| Quellenstelle | Referenz-URL dient nur als Markt-Kontext (EnergieSchweiz empfiehlt Offerten-Vergleich mehrerer Installateure); für die Antwortfrist selbst existiert keine Prüfquelle |
| Unsicherheit | Nicht extern prüfbar; marktüblich sind 1-3 Werktage für Erstantworten — Versprechen ist ambitioniert, aber plausibel für einen Kleinbetrieb mit klarer Lead-Pipeline |
| Nächste Prüfung | 2027-02 (operative Einhaltung intern prüfen) |

### R-051 — Firmenangabe

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | Öffnungszeiten «Montag – Freitag, 08:00 – 18:00 Uhr» (Kontaktseite + LocalBusiness-Schema) |
| Fundstelle | src/lib/site-config.ts:30-37; src/app/kontakt/page.tsx:62 |
| Bewertung | Firmenangabe |
| Korrektur | Claim beibehalten — extern nicht verifizierbar. Wichtig: Die Angabe steht auch im LocalBusiness-Schema (openingHoursSpecification) und wird von Google übernommen; sie muss mit dem Google-Business-Profile-Eintrag identisch gehalten werden, sonst drohen inkonsistente SERP-Anzeigen. |
| Geltungsbereich | Firmenspezifisch, Standort Oelirain 1A, 2540 Grenchen SO |
| Zeitraum | Prüfdatum 2026-08-14 |
| Quelle | DoubleA Solar Solutions (Eigenangabe) — Website-Eigenangabe — keine externe Quelle existent |
| Quellen-URL | https://www.energieschweiz.ch/wohnen/solaranlagen/ |
| Quellenstelle | Keine externe Prüfquelle; Referenz-URL nur als Platzhalter des Prüfkontexts — Öffnungszeiten sind ausschliesslich firmenintern belegbar |
| Unsicherheit | Keine externe Verifikation möglich; Konsistenz mit Google Business Profile und Telefonerreichbarkeit intern sicherstellen |
| Nächste Prüfung | 2027-02 |

---

## Verbrauch & Eigenverbrauch

**Cluster-Fazit:** Die Verbrauchs-Presets und Eingabegrenzen des Rechners halten der Prüfung gegen die offiziellen ElCom-Verbrauchsprofile (Wegleitung Tarifdeklaration 2027, live geladen) gut stand: H1–H8 bestätigen den Default 5’500 kWh und die Grenzen 500–500’000 kWh; nur die Hilfetext-Spannen sollten präzisiert werden (EFH mit Elektroboiler liegt bei ~7’500 kWh, WP+EV kann bis ~16’000–17’000 kWh gehen, vgl. H7 = 13’000 kWh ohne EV). Die kalibrierten Eigenverbrauchs-Bandbreiten (22–32 % ohne, 35–50 % mit Speicher, WP/EV-Zuschläge) liegen innerhalb der von EnergieSchweiz/BFE publizierten Rahmen (ohne Massnahmen 15–35 %, mit passendem Speicher bis 70 % bei kleinen Anlagen; Lastverschiebung +~10 %) und sind für DoubleAs grosse Anlagen sogar angenehm konservativ — sie sind aber Firmen-Kalibrierung (n=3 Offerten), nicht amtlich, und sollten so deklariert werden. Kernbefund des Clusters ist ein methodischer Fehler: Der Rechner kalibriert eine Eigenverbrauchsquote (Anteil der Produktion), wendet sie aber auf min(Produktion, Verbrauch) an — sobald die Produktion den Verbrauch übersteigt (Regelfall bei 13–23-kWp-Anlagen), widersprechen sich angezeigter Prozentwert und kWh-Wert, und Ersparnis/Amortisation werden um grob 25 % zu pessimistisch gerechnet; Fix: selfConsumedKwh = min(share × Produktion, Verbrauch) plus saubere UI-Trennung der Begriffe «Eigenverbrauchsanteil» (Anteil der Produktion) und «Autarkiegrad» (Anteil des Verbrauchs) gemäss EnergieSchweiz-Definition. Das revidierte Energierecht 2025/2026 (Mantelerlass; u.a. separate Messtarife ab 2026 nach Art. 17a StromVG, neue Teilungsmodelle vZEV/LEG) ändert an Verbrauchsprofilen und Eigenverbrauchs-Definitionen nichts, eröffnet aber zusätzliche Eigenverbrauchs-Optionen, die die Website erwähnen könnte.

### R-052 — bedingt gültig

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | Hilfetext Jahresverbrauch: «Typisch: EFH 4’000–6’000 kWh» |
| Fundstelle | src/components/solar/solar-calculator.tsx:524-525 |
| Bewertung | bedingt gültig |
| Korrektur | Präzisieren: «Typisch: EFH ohne Elektroboiler ca. 4’500 kWh, mit Elektroboiler ca. 7’500 kWh (ElCom-Profile H4/H5)». Die Spanne 4’000–6’000 gilt nur für EFH ohne elektrische Warmwasseraufbereitung und ohne WP/EV. |
| Geltungsbereich | Schweizweit (ElCom-Standardprofile, netzbetreiberunabhängig); Haushalte ohne Wärmepumpe/EV |
| Zeitraum | ElCom-Profile für Tarifjahr 2027 (Dokument 2026, Profile seit Jahren unverändert); geprüft 2026-08-14 |
| Quelle | ElCom (Eidgenössische Elektrizitätskommission) — Wegleitung zur Tarifdeklaration für die Tarife 2027 |
| Quellen-URL | https://www.elcom.admin.ch/dam/de/sd-web/r2cyvoFjFaT1/Wegleitung%20zur%20Tarifdeklaration%20f%C3%BCr%20Tarife%202027%20-%20DE.pdf |
| Quellenstelle | Ziff. 7.3.2 «Verbrauchsprofile typischer Haushalte» (S. 6): H4 = 4’500 kWh/Jahr (5-Zi-Wohnung, Elektroherd+Tumbler, ohne Elektroboiler); H5 = 7’500 kWh/Jahr (5-Zi-EFH mit Elektroherd, Elektroboiler, Tumbler) |
| Unsicherheit | Reale EFH streuen stark (Haushaltsgrösse, Effizienz, Boiler): plausibel 3’500–8’000 kWh ohne WP/EV. Die ElCom-Profile sind normierte Vergleichsprofile, keine Statistik-Mittelwerte. |
| Nächste Prüfung | 2027-09 (jährliche ElCom-Tarifpublikation Anfang September) |

### R-053 — bedingt gültig

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | Hilfetext Jahresverbrauch: «mit Wärmepumpe + EV 8’000–14’000 kWh» |
| Fundstelle | src/components/solar/solar-calculator.tsx:525 |
| Bewertung | bedingt gültig |
| Korrektur | Spanne nach oben öffnen: «mit Wärmepumpe + Elektroauto typisch 8’000–16’000 kWh» — ElCom H7 (EFH mit WP, ohne EV) liegt allein bei 13’000 kWh; ein EV addiert je nach Fahrleistung ca. 2’000–4’000 kWh. |
| Geltungsbereich | Schweizweit; EFH mit Wärmepumpe und Elektroauto; Untergrenze gilt für effiziente Neubauten mit kleiner WP |
| Zeitraum | ElCom-Profil Tarifjahr 2027 / BFE-Faktenblatt Nov 2022; geprüft 2026-08-14 |
| Quelle | ElCom — Wegleitung zur Tarifdeklaration für die Tarife 2027 |
| Quellen-URL | https://www.elcom.admin.ch/dam/de/sd-web/r2cyvoFjFaT1/Wegleitung%20zur%20Tarifdeklaration%20f%C3%BCr%20Tarife%202027%20-%20DE.pdf |
| Quellenstelle | Ziff. 7.3.2: H7 = 13’000 kWh/Jahr (5-Zi-EFH mit Elektroherd, Elektroboiler, Tumbler, Wärmepumpe 5 kW), ohne Elektroauto |
| Zweitquelle | EnergieSchweiz/BFE, Faktenblatt «Photovoltaik Eigenverbrauch — Optimierung mit Wärmeerzeugung» (Nov 2022), https://pubdb.bfe.admin.ch/de/publication/download/11200, Grafik 1: eMobilität und Wärmepumpe je grösster Verbraucher mit ca. 4’000–4’500 kWh/a — H7+EV ergäbe bis ~17’000 kWh; effiziente Neubauten (kleine modulierende WP, ohne Elektroboiler) liegen dagegen bei ~8’000–11’000 kWh |
| Unsicherheit | Sehr grosse Streuung: WP-Bedarf 2’500–8’000 kWh (Gebäudestandard, Boiler ja/nein), EV 1’500–4’500 kWh (Fahrleistung). Plausibles Gesamtband 8’000–17’000 kWh. |
| Nächste Prüfung | 2027-09 |

### R-054 — verifiziert

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | Formular-Default Jahresverbrauch 5’500 kWh (annualConsumptionKwh: 5500) |
| Fundstelle | src/components/solar/solar-calculator.tsx:124 |
| Bewertung | verifiziert |
| Korrektur | Claim beibehalten — 5’500 kWh liegt sinnvoll zwischen ElCom H4 (4’500 kWh, Wohnung/EFH ohne Boiler) und H5 (7’500 kWh, EFH mit Elektroboiler) und ist als neutraler EFH-Startwert gut gewählt. |
| Geltungsbereich | Schweizweit; Default für EFH-Zielgruppe des Rechners |
| Zeitraum | ElCom-Profile Tarifjahr 2027; geprüft 2026-08-14 |
| Quelle | ElCom — Wegleitung zur Tarifdeklaration für die Tarife 2027 |
| Quellen-URL | https://www.elcom.admin.ch/dam/de/sd-web/r2cyvoFjFaT1/Wegleitung%20zur%20Tarifdeklaration%20f%C3%BCr%20Tarife%202027%20-%20DE.pdf |
| Quellenstelle | Ziff. 7.3.2, Profile H4 (4’500 kWh) und H5 (7’500 kWh) |
| Unsicherheit | Als Default unkritisch, da vom Nutzer überschreibbar. |
| Nächste Prüfung | 2027-09 |

### R-055 — verifiziert

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | Validierungs-/Eingabegrenzen Jahresverbrauch 500–500’000 kWh |
| Fundstelle | src/lib/validations/lead.ts:146; src/components/solar/solar-calculator.tsx:531-532 |
| Bewertung | verifiziert |
| Korrektur | Claim beibehalten — die Grenzen decken das gesamte relevante ElCom-Spektrum ab: H1 (kleinste Haushaltskategorie, 1’600 kWh) bis C4/C5 (grosser Betrieb Niederspannung, 500’000 kWh). Untergrenze 500 kWh lässt Ferien-/Kleinstverbraucher zu; nur Grossindustrie (C6 1.5 GWh, C7 7.5 GWh) ist ausgeschlossen — für das DoubleA-Zielsegment (EFH/MFH/Gewerbe/Landwirtschaft) korrekt. |
| Geltungsbereich | Schweizweit; alle Kundentypen des Rechners bis grosses Gewerbe (Niederspannung) |
| Zeitraum | ElCom-Kategorien Tarifjahr 2027; geprüft 2026-08-14 |
| Quelle | ElCom — Wegleitung zur Tarifdeklaration für die Tarife 2027 |
| Quellen-URL | https://www.elcom.admin.ch/dam/de/sd-web/r2cyvoFjFaT1/Wegleitung%20zur%20Tarifdeklaration%20f%C3%BCr%20Tarife%202027%20-%20DE.pdf |
| Quellenstelle | Ziff. 7.3.2 (H1: 1’600 kWh) und 7.3.3 (C4/C5: 500’000 kWh; C6: 1’500’000 kWh; C7: 7’500’000 kWh) |
| Unsicherheit | Keine — reine Plausibilitätsgrenze, kein publizierter Faktenclaim. |
| Nächste Prüfung | 2028-08 (unkritisch) |

### R-056 — bedingt gültig

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | Eigenverbrauchs-Basis OHNE Speicher: 22–32 % (ratio-abhängig: <1.0 → 32 %, 1–2 → 25 %, >2.0 → 22 %) |
| Fundstelle | src/lib/solar/calculate.ts:149,156-159 |
| Bewertung | bedingt gültig |
| Korrektur | Claim beibehalten, aber im UI als Schätzband kennzeichnen. Die Werte liegen im publizierten Rahmen: EnergieSchweiz-Beispiele ergeben ohne Optimierung 15–30 % Eigenverbrauchsanteil je nach Anlagengrösse (kleine Anlage 30 %, doppelt überdimensionierte Anlage 15 %); die Ratio-Logik des Codes (grössere Anlage → tieferer Anteil) ist methodisch korrekt. 22 % bei Ratio >2 ist eher optimistisch (publiziert: bis hinunter ~15 %) — vertretbar, weil DoubleA standardmässig Smart-Steuerung/Lastverschiebung mitdenkt (EnergieSchweiz: +~10 % durch automatisierte Lastverschiebung). |
| Geltungsbereich | EFH/Wohnbereich Schweiz; ohne Batteriespeicher; kalibriert an DoubleA-Offerten (Region Grenchen/Solothurn/Biel/Bern) |
| Zeitraum | EnergieSchweiz-Handbuch Ausgabe 2020 (Grundlagen zeitlos, da physikalisch/verhaltensbasiert); geprüft 2026-08-14 |
| Quelle | EnergieSchweiz / Bundesamt für Energie BFE — Handbuch Solarstrom-Eigenverbrauch optimieren (Art.-Nr. 805.529.D) |
| Quellen-URL | https://www.vese.ch/wp-content/uploads/9323-EnergieSchweiz-Broschuere-Solarstrom_Eigenverbrauch_optimieren-DE.pdf |
| Quellenstelle | Kap. 1.1 (S. 4): Beispiel 4’000 kWh Verbrauch / 8’000 kWh Produktion → 15 % Eigenverbrauchsanteil; kleinere Anlage (3’000 kWh Produktion) → 30 %; Kap. 2.2 (S. 7): automatisierte Lastverschiebung erhöht Eigenverbrauch «typischerweise um ca. 10 %» |
| Unsicherheit | Publizierte Bandbreite ohne Massnahmen ca. 15–35 % je nach Dimensionierung und Nutzerverhalten. PDF liegt auf vese.ch (SSES-Fachgruppe), ist aber eine offizielle EnergieSchweiz-Publikation (BFE, Art.-Nr. 805.529.D — vom BFE-Faktenblatt Nov 2022 als Literatur referenziert). |
| Nächste Prüfung | 2027-08 (auf Neuauflage des Handbuchs prüfen) |

### R-057 — bedingt gültig

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | Eigenverbrauchs-Basis MIT Speicher: 35–50 % (ratio-abhängig: <1.0 → 50 %, 1–2 → 42 %, >2.0 → 35 %) |
| Fundstelle | src/lib/solar/calculate.ts:152-155 |
| Bewertung | bedingt gültig |
| Korrektur | Claim beibehalten — bewusst konservativ und dadurch seriös. Publiziert: passend dimensionierter Speicher (4–6 kWh bei 4’500 kWh Verbrauch, 3–6 kWp) hebt den Eigenverbrauch «von 30 % auf bis zu 70 %»; die tieferen Code-Werte sind für DoubleAs typisch grosse Anlagen (13–23 kWp, Produktion oft >> Verbrauch) korrekt, weil der Eigenverbrauchsanteil mit der Anlagengrösse sinkt. Nicht als «bis 70 %» bewerben, ohne die Anlagengrösse zu nennen. |
| Geltungsbereich | EFH Schweiz mit Batteriespeicher; DoubleA-Anlagenmix (grosse Anlagen mit 16–24 kWh GoodWe-Speicher) |
| Zeitraum | Handbuch 2020 / HTW-Berlin-Daten; geprüft 2026-08-14 |
| Quelle | EnergieSchweiz / BFE — Handbuch Solarstrom-Eigenverbrauch optimieren (Art.-Nr. 805.529.D) |
| Quellen-URL | https://www.vese.ch/wp-content/uploads/9323-EnergieSchweiz-Broschuere-Solarstrom_Eigenverbrauch_optimieren-DE.pdf |
| Quellenstelle | Kap. 2.3 (S. 8): 4-Personen-Haushalt 4’500 kWh, PV 3–6 kWp, Speicher 4–6 kWh → Eigenverbrauch «von 30 % auf bis zu 70 %» (Datengrundlage HTW Berlin, Abb. 5) |
| Zweitquelle | EnergieSchweiz/BFE, Faktenblatt «Photovoltaik Eigenverbrauch» Nov 2022, https://pubdb.bfe.admin.ch/de/publication/download/11200, S. 3: Speichergrösse von 50–75 % des Tages-Strombedarfs genügt in der Regel; Warnung, dass Maximierung von Eigenverbrauchsquote/Autarkiegrad zu ineffizienten Systemen führt |
| Unsicherheit | Publizierte Spannweite mit Speicher ca. 40–70 %, stark abhängig vom Verhältnis Speicher/PV/Verbrauch. Die 3 DoubleA-Kalibrierpunkte (37/47/71 %) liegen innerhalb dieser Spanne. |
| Nächste Prüfung | 2027-08 |

### R-058 — Firmenangabe

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | Zuschläge auf Eigenverbrauchsanteil: Wärmepumpe +12 PP, Elektroauto +8 PP, kombiniert zusätzlich +5 PP; Clamp 25–85 % |
| Fundstelle | src/lib/solar/calculate.ts:164-168 |
| Bewertung | Firmenangabe |
| Korrektur | Claim beibehalten (kalibriert an 3 realen DoubleA-Offerten: 37 % / 47 % mit WP / 71 % mit WP+EV) — die Richtung und Grössenordnung sind durch Bundesquellen gestützt: WP und eMobilität sind laut BFE die mit Abstand grössten Stromverbraucher im Gebäude, und die PV-gesteuerte Warmwasser-/EV-Ladung senkt den Netzbezug erheblich; EnergieSchweiz beziffert allein automatisierte Lastverschiebung mit ca. +10 %. Exakte PP-Zuschläge sind nirgends amtlich publiziert → als kalibrierte Firmenschätzung deklarieren, nicht als offizielle Werte. Obergrenze 85 % im Wohnbereich vorsichtig-korrekt (publiziert: >80 % praktisch nur im Gewerbe mit Tageslast). |
| Geltungsbereich | DoubleA-Angebotslogik; EFH mit Smart-Steuerung (PV-geführte WW-/EV-Ladung), Region Grenchen/Solothurn/Biel/Bern |
| Zeitraum | Kalibrierung an Offerten 2026; Quellenstand Nov 2022/2020; geprüft 2026-08-14 |
| Quelle | EnergieSchweiz / Bundesamt für Energie BFE — Faktenblatt «Photovoltaik Eigenverbrauch — Optimierung mit Wärmeerzeugung» (November 2022) |
| Quellen-URL | https://pubdb.bfe.admin.ch/de/publication/download/11200 |
| Quellenstelle | S. 1 Grafik 1 (eMobilität/Wärmepumpe je ~4’000–4’500 kWh/a = grösste Verbraucher); S. 3 Grafik 4 (WW-Mittagsladung senkt Anteil Netzbezug deutlich gegenüber Referenz); S. 4 Empfehlungen (Kopplung PV mit WP-Warmwasserladung und EV-Ladung als wirtschaftlichste Eigenverbrauchsmassnahme) |
| Zweitquelle | EnergieSchweiz, Handbuch Solarstrom-Eigenverbrauch optimieren, Kap. 2.2: automatisierte Lastverschiebung +ca. 10 %; Kap. 2.7: >50–100 % Eigenverbrauch nur bei Gewerbe mit hoher Tageslast |
| Unsicherheit | Zuschläge sind aus n=3 Offerten abgeleitet — statistisch dünn, aber richtungs- und grössenordnungskonsistent mit BFE-Publikationen. Plausible Spanne: WP +8–15 PP, EV +5–12 PP (je nach Steuerung und Ladeverhalten). |
| Nächste Prüfung | 2027-02 (nach weiteren realisierten Anlagen re-kalibrieren) |

### R-059 — irreführend

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | Berechnung: selfConsumedKwh = min(Produktion, Verbrauch) × selfConsumptionShare; UI-Label «Eigenverbrauchsanteil» mit Hint «X kWh direkt genutzt» |
| Fundstelle | src/lib/solar/calculate.ts:283-284 (+ savings() Z. 290-293); src/components/solar/calculator-result-card.tsx:51-53 |
| Bewertung | irreführend |
| Korrektur | Methodischer Defekt: Die Grösse ist als Eigenverbrauchsquote kalibriert (= Anteil der PRODUKTION, der selbst verbraucht wird — die Offerten-Kalibrierpunkte 37/47/71 % sind genau so definiert), wird aber auf min(Produktion, Verbrauch) angewendet. Sobald Produktion > Verbrauch (Regelfall bei DoubleA-Anlagengrössen: 14.4 kWp ≈ 14’000+ kWh Produktion vs. 6’000 kWh Verbrauch) rechnet der Code «share × Verbrauch» — das ist Autarkie-Semantik und widerspricht dem angezeigten Prozentwert. Fix: selfConsumedKwh = min(round(Produktion_realistisch × share), Verbrauch); identisch in savings(). UI-Beschriftung: «Eigenverbrauchsanteil — Anteil Ihrer Solarproduktion, den Sie selbst nutzen»; optional zusätzlich und klar getrennt: «Autarkiegrad — Anteil Ihres Stromverbrauchs, den die Anlage deckt» = selfConsumedKwh / Jahresverbrauch. Die beiden Kennzahlen nie mischen (EnergieSchweiz definiert beide explizit unterschiedlich). |
| Geltungsbereich | Rechnerlogik der Website (alle Regionen); wirkt sich auf selfConsumedKwh, fedInKwh, annualSavingsChf und paybackYears aus |
| Zeitraum | Codestand geprüft 2026-08-14; Begriffsdefinitionen EnergieSchweiz 2020 (unverändert gültig) |
| Annahmen | Strompreis 30 Rp./kWh, Einspeisevergütung 10 Rp./kWh (Code-Defaults, Z. 287-288); Produktion 14.4 kWp × ~1’000 kWh/kWp ≈ 14’500 kWh |
| Berechnung | Gegenbeispiel Kalibrierfall 1: P = 14’500 kWh (14.4 kWp), C = 6’000 kWh, share = 0.37. Code heute: min(14’500, 6’000) × 0.37 = 2’220 kWh «direkt genutzt» → impliziert nur 15.3 % der Produktion, angezeigt werden aber 37 %. Korrekt (Eigenverbrauchsquote): 14’500 × 0.37 = 5’365 kWh (≤ C, plausibel mit 16-kWh-Speicher) → Autarkiegrad 5’365/6’000 = 89 %. Folgefehler: Ersparnis heute 2’220×0.30 + 12’280×0.10 = CHF 1’894/Jahr statt korrekt 5’365×0.30 + 9’135×0.10 = CHF 2’523/Jahr (−25 %); Amortisation entsprechend zu pessimistisch. Rundung: kWh ganzzahlig, CHF ganzzahlig. |
| Quelle | EnergieSchweiz / BFE — Handbuch Solarstrom-Eigenverbrauch optimieren (Art.-Nr. 805.529.D) |
| Quellen-URL | https://www.vese.ch/wp-content/uploads/9323-EnergieSchweiz-Broschuere-Solarstrom_Eigenverbrauch_optimieren-DE.pdf |
| Quellenstelle | Kap. 1.1 (S. 4): «Der Autarkiegrad ist ein Mass der Unabhängigkeit: Wie viel Prozent meines Stromverbrauchs kann ich mit selbst produziertem Solarstrom abdecken? Der Eigenverbrauchsgrad dagegen gibt an, wieviel Prozent der gesamten Solarstromproduktion zeitgleich lokal verbraucht werden» — inkl. Zahlenbeispiel (8’000 kWh Produktion / 4’000 kWh Verbrauch / 1’200 kWh zeitgleich → Autarkie 30 %, Eigenverbrauchsanteil 15 %) |
| Unsicherheit | Kein Zahlen-, sondern ein Konsistenzbefund: Prozentwert und kWh/CHF-Werte widersprechen sich derzeit bei P > C. Nach dem Fix muss share×P > C zusätzlich auf C gekappt bleiben (physikalische Obergrenze), was die estimate-Funktion heute nicht garantiert. |
| Nächste Prüfung | Sofort fixen; danach mit den 3 Kalibrier-Offerten regressionstesten |

### R-060 — Firmenangabe

| Feld | Inhalt |
|---|---|
| Bisheriger Claim | Kontaktformular: «Personen im Haushalt — wir leiten daraus den typischen Verbrauch ab» (Beispiel: 4 Personen) |
| Fundstelle | src/components/forms/contact-form.tsx:271-274 |
| Bewertung | Firmenangabe |
| Korrektur | Beibehalten, aber Ableitung absichern: Als Anker taugt der EnergieSchweiz-Referenzwert «4-Personen-Haushalt ≈ 4’500 kWh/Jahr»; entscheidender als die Personenzahl sind jedoch Elektroboiler (+~3’000 kWh, vgl. ElCom H3 vs. H2), Wärmepumpe (+~5’000–8’500 kWh, H7 vs. H5) und Elektroauto (+~2’000–4’000 kWh). Empfohlene Formulierungsergänzung: «… den typischen Verbrauch ab — Heizart und Elektroauto berücksichtigen wir dabei separat.» |
| Geltungsbereich | Schweizweit; Lead-Qualifizierung DoubleA |
| Zeitraum | EnergieSchweiz-Handbuch 2020 / ElCom Tarifjahr 2027; geprüft 2026-08-14 |
| Quelle | EnergieSchweiz / BFE — Handbuch Solarstrom-Eigenverbrauch optimieren (Art.-Nr. 805.529.D) |
| Quellen-URL | https://www.vese.ch/wp-content/uploads/9323-EnergieSchweiz-Broschuere-Solarstrom_Eigenverbrauch_optimieren-DE.pdf |
| Quellenstelle | Kap. 2.3 (S. 8): «4-Personen-Haushalt mit einem jährlichen Stromverbrauch von 4500 kWh» |
| Zweitquelle | ElCom, Wegleitung Tarife 2027, Ziff. 7.3.2: Profilsprünge H2→H3 (Elektroboiler +2’000 kWh bei gleicher Wohnung), H5→H7 (WP +5’500 kWh) belegen, dass Ausstattung stärker wiegt als Personenzahl |
| Unsicherheit | Personenzahl erklärt nur einen Teil der Verbrauchsvarianz; ±50 % Streuung bei gleicher Haushaltsgrösse üblich. |
| Nächste Prüfung | 2027-09 |

---

## Anhang: Roh-Inventar aller Fundstellen (230 Einträge)

Vollständige Fundstellenliste (Datei:Zeile) als Arbeitsgrundlage; fachliche Bewertung siehe Register oben.

| ID | Fundstelle | Kategorie | Wortlaut/Wert |
|---|---|---|---|
| C-001 | src/lib/site-config.ts:3 | unternehmen | legalName: "DoubleA Solutions GmbH" |
| C-002 | src/lib/site-config.ts:6 | unternehmen | founded: 2025 |
| C-003 | src/lib/site-config.ts:14 | unternehmen | +41 76 307 31 59 |
| C-004 | src/lib/site-config.ts:16 | unternehmen | solar@doubleasolutions.ch |
| C-005 | src/lib/site-config.ts:18 | unternehmen | Oelirain 1A, 2540 Grenchen, Kanton Solothurn, Schweiz |
| C-006 | src/lib/site-config.ts:26 | unternehmen | geo: { latitude: 47.1924, longitude: 7.3958 } |
| C-007 | src/lib/site-config.ts:30 | unternehmen | Montag – Freitag, 08:00 – 18:00 Uhr |
| C-008 | src/lib/site-config.ts:31 | unternehmen | Samstag nach Vereinbarung |
| C-009 | src/lib/site-config.ts:42 | kosten | priceRange: "$$" |
| C-010 | src/lib/site-config.ts:5 | sonstiges | Solarenergie für Schweizer Dächer. Präzise geplant. Sauber umgesetzt. |
| C-011 | src/lib/site-config.ts:48 | unternehmen | Grenchen, Solothurn, Biel/Bienne, Bettlach, Selzach, Lengnau BE, Pieterlen, Zuchwil, Bellach, Bern, Burgdorf, Lyss, Aarau, Olten |
| C-012 | src/lib/content/schema.ts:44 | unternehmen | Schweizer Photovoltaik · Sitz in Grenchen |
| C-013 | src/lib/content/schema.ts:48 | sonstiges | DoubleA Solar Solutions begleitet Sie von der ersten Standortanalyse bis zur langfristigen Wartung Ihrer Photovoltaikanlage – transparent, p |
| C-014 | src/lib/content/schema.ts:51 | kosten | Kostenloses Angebot erhalten |
| C-015 | src/components/sections/hero-section.tsx:18 | sonstiges | Datenbasis: Bundesdaten sonnendach.ch |
| C-016 | src/components/sections/hero-section.tsx:19 | dauer_prozess | Offerte: Innert eines Werktags |
| C-017 | src/components/sections/hero-section.tsx:20 | unternehmen | Standort: Grenchen — schweizweit tätig |
| C-018 | src/components/sections/hero-section.tsx:132 | sonstiges | Animiertes Energiesystem eines Schweizer Einfamilienhauses: Photovoltaikanlage, Carport-Solar, Wallbox, Wärmepumpe, Wechselrichter, Batterie |
| C-019 | src/components/sections/trust-section.tsx:14 | unternehmen | Sitz in Grenchen |
| C-020 | src/components/sections/trust-section.tsx:15 | unternehmen | Schweizweit tätig |
| C-021 | src/components/sections/trust-section.tsx:17 | foerderung | Förderberatung inklusive |
| C-022 | src/components/sections/trust-section.tsx:19 | sonstiges | Beratung in Deutsch und Schweizerdeutsch |
| C-023 | src/components/sections/services-section.tsx:44 | foerderung | Pronovo EIV, kantonale Beiträge und Steueraspekte – klar erklärt und im Antrag begleitet. Beträge stets indikativ. |
| C-024 | src/components/sections/services-section.tsx:68 | sonstiges | Reaktionszeiten, die in der Schweiz zählen |
| C-025 | src/components/sections/services-section.tsx:97 | lebensdauer_garantie | Anlagen, die zu Ihrem Gebäude passen – und über Jahrzehnte zuverlässig liefern |
| C-026 | src/components/sections/process-section.tsx:22 | sonstiges | Montage durch geprüfte Schweizer Partnerbetriebe – von uns koordiniert und verantwortet |
| C-027 | src/components/sections/solar-calculator-section.tsx:8 | dauer_prozess | Anlagengrösse, Produktion und Eigenverbrauch in 60 Sekunden |
| C-028 | src/components/sections/solar-calculator-section.tsx:33 | sonstiges | fundierte Erstauswertung basierend auf kantonalem Ertrag, Ausrichtung, Verschattung und Verbrauchsprofil. Keine generische Faustformel. |
| C-029 | src/components/sections/solar-calculator-section.tsx:93 | produktion | Empfohlene Anlage: 9,8 kWp / ≈ 49 m² Modulfläche |
| C-030 | src/components/sections/solar-calculator-section.tsx:98 | produktion | Jahresproduktion ≈ 9'400 kWh |
| C-031 | src/components/sections/solar-calculator-section.tsx:99 | eigenverbrauch | Eigenverbrauch ≈ 38 % |
| C-032 | src/components/sections/solar-calculator-section.tsx:101 | ersparnis | Ersparnis / Jahr ≈ CHF 1'700 |
| C-033 | src/components/sections/project-showcase.tsx:20 | produktion | Typische Grösse 8–12 kWp |
| C-034 | src/components/sections/project-showcase.tsx:27 | produktion | Typische Grösse 15–60 kWp |
| C-035 | src/components/sections/project-showcase.tsx:34 | produktion | Typische Grösse 30–150 kWp |
| C-036 | src/components/sections/financing-section.tsx:24 | steuern | Investitionen in Photovoltaik lassen sich in den meisten Kantonen vom steuerbaren Einkommen abziehen. |
| C-037 | src/components/sections/financing-section.tsx:36 | foerderung | Die Einmalvergütung des Bundes senkt die Investition spürbar. Wir prüfen den tagesaktuellen Ansatz … – Werte indikativ. |
| C-038 | src/components/sections/financing-section.tsx:58 | lebensdauer_garantie | Strom vom eigenen Dach ersetzt über Jahrzehnte eingekauften Netzstrom. |
| C-039 | src/components/sections/faq-section.defaults.ts:11 | dauer_prozess | Von der Standortanalyse bis zur Inbetriebnahme rechnen wir typischerweise mit 8 bis 16 Wochen. |
| C-040 | src/components/sections/faq-section.defaults.ts:15 | sonstiges | Aufdach-Anlagen auf Wohngebäuden sind in der Schweiz meist nur meldepflichtig. |
| C-041 | src/components/sections/faq-section.defaults.ts:19 | foerderung | Die Einmalvergütung wird tagesaktuell festgelegt und hängt von Anlagengrösse und Eigenverbrauchsoptimierung ab. |
| C-042 | src/components/sections/faq-section.defaults.ts:23 | eigenverbrauch | Speicher rechnen sich vor allem bei hohem Eigenverbrauch in den Abendstunden oder bei kombinierter Wärmepumpe und Elektromobilität. |
| C-043 | src/components/sections/faq-section.defaults.ts:27 | lebensdauer_garantie | Module haben heute Leistungsgarantien von 25 bis 30 Jahren. Wechselrichter halten in der Regel 12 bis 20 Jahre. |
| C-044 | src/components/sections/faq-section.defaults.ts:31 | ruecklieferung | Strom, den Sie nicht direkt verbrauchen, wird ins Netz Ihres Verteilnetzbetreibers eingespeist und nach dessen Tarif vergütet. Mit Speicher  |
| C-045 | src/components/sections/faq-section.defaults.ts:39 | unternehmen | Unser Hauptsitz ist in Grenchen, wir sind aber schweizweit tätig. Anfahrtswege werden transparent in der Offerte ausgewiesen. |
| C-046 | src/components/sections/faq-section.tsx:48 | dauer_prozess | Antwort innert eines Werktags |
| C-047 | src/components/sections/final-cta-section.tsx:7 | dauer_prozess | In 60 Sekunden zur Erstauswertung. |
| C-048 | src/components/sections/final-cta-section.tsx:8 | dauer_prozess | Antwort innert eines Werktags, persönliche Beratung in Deutsch und Schweizerdeutsch |
| C-049 | src/app/services/page.tsx:20 | unternehmen | … begleitet Ihr Solarprojekt in Grenchen, Solothurn, Bern und der ganzen Schweiz. |
| C-050 | src/app/services/page.tsx:63 | sonstiges | …dass die Anlage zu Ihrem Verbrauch passt – heute und in zehn Jahren… |
| C-051 | src/app/services/page.tsx:86 | foerderung | Indikative Berechnung der Einmalvergütung (Pronovo EIV) für Ihre Anlage |
| C-052 | src/app/services/page.tsx:89 | steuern | Hinweise zu Steuerabzügen – die verbindliche Auskunft gibt Ihre Steuerbehörde |
| C-053 | src/app/services/page.tsx:106 | sonstiges | Montage durch zertifizierte Solartechnikerinnen und -techniker |
| C-054 | src/app/services/page.tsx:107 | sonstiges | Elektroanschluss durch konzessionierte Elektriker |
| C-055 | src/app/services/page.tsx:139 | lebensdauer_garantie | Eine Photovoltaikanlage ist eine Investition über 25 Jahre und mehr. |
| C-056 | src/app/services/page.tsx:146 | sonstiges | Klare Reaktionszeiten und ein fester Ansprechpartner in der Region |
| C-057 | src/app/services/page.tsx:171 | kosten | Kostenfrei und unverbindlich |
| C-058 | src/app/services/page.tsx:175 | dauer_prozess | Antwort innert eines Werktags |
| C-059 | src/app/pakete/page.tsx:19 | kosten | Transparente Richtpreise für Photovoltaik-Pakete: Einfamilienhaus, Komfort mit Speicher, Premium mit Wärmepumpen-Integration. Definitive Aus |
| C-060 | src/app/pakete/page.tsx:42 | produktion | Basis 8.2 kWp — Leistung 8.2 kWp, Modulfläche ~32 m² |
| C-061 | src/app/pakete/page.tsx:48 | produktion | Jahresertrag (typ.) 7'500–8'500 kWh |
| C-062 | src/app/pakete/page.tsx:58 | kosten | CHF 15'500–18'500 |
| C-063 | src/app/pakete/page.tsx:63 | produktion | Komfort 10 kWp + Speicher — Leistung 10 kWp, Modulfläche ~39 m², Speicher 8–10 kWh |
| C-064 | src/app/pakete/page.tsx:69 | produktion | Jahresertrag (typ.) 9'000–10'500 kWh |
| C-065 | src/app/pakete/page.tsx:77 | kosten | CHF 21'500–26'500 |
| C-066 | src/app/pakete/page.tsx:180 | superlativ | Meistgewählt |
| C-067 | src/app/pakete/page.tsx:83 | produktion | Premium 15 kWp + Wärmepumpen-Integration — Leistung 15 kWp, Modulfläche ~59 m², Speicher-Option 16 kWh |
| C-068 | src/app/pakete/page.tsx:89 | produktion | Jahresertrag (typ.) 13'500–16'000 kWh |
| C-069 | src/app/pakete/page.tsx:98 | kosten | CHF 27'500–34'500 |
| C-070 | src/app/pakete/page.tsx:106 | kosten | ~CHF 350/kWh (Richtwert) |
| C-071 | src/app/pakete/page.tsx:113 | kosten | ab CHF 1'950 (inkl. Installation) |
| C-072 | src/app/pakete/page.tsx:120 | kosten | Monitoring: inklusive (bei jedem Paket) |
| C-073 | src/app/pakete/page.tsx:127 | foerderung | Förderberatung: inklusive (bei jedem Paket) |
| C-074 | src/app/pakete/page.tsx:254 | produktion | Hallen-, Scheunen- und Flachdächer ab 30 kWp planen wir projektspezifisch |
| C-075 | src/app/pakete/page.tsx:355 | foerderung | Pronovo-Einmalvergütung (indikativ ~CHF 360/kWp) reduziert die Investition zusätzlich. |
| C-076 | src/app/pakete/page.tsx:144 | kosten | Diese Pakete zeigen, was eine Photovoltaikanlage in der Schweiz realistisch kostet – als Richtwerte, nie als verbindliche Offerte. |
| C-077 | src/app/finanzierung/page.tsx:22 | kosten | …mit transparenter Investitionsspanne, Pronovo EIV, kantonalen Förderungen, Steueraspekten und ehrlicher Wirtschaftlichkeitsrechnung. |
| C-078 | src/app/finanzierung/page.tsx:31 | lebensdauer_garantie | 25–30 Jahre – Auslegung moderner Solarmodule |
| C-079 | src/app/finanzierung/page.tsx:36 | lebensdauer_garantie | 12–20 Jahre – realistischer Horizont für den Wechselrichter-Ersatz |
| C-080 | src/app/finanzierung/page.tsx:52 | ruecklieferung | Die Vergütung für eingespeisten Überschuss liegt in der Regel deutlich tiefer – darum bestimmt der Eigenverbrauchsanteil die Wirtschaftlichk |
| C-081 | src/app/finanzierung/page.tsx:76 | kosten | Jahr 1–30: Betrieb mit planbaren Kosten … Die laufenden Kosten einer Photovoltaikanlage sind gering |
| C-082 | src/app/finanzierung/page.tsx:82 | lebensdauer_garantie | Jahr 12–20: Wechselrichter-Ersatz einplanen … Der Wechselrichter erreicht seine Lebensdauer meist vor den Modulen. |
| C-083 | src/app/finanzierung/page.tsx:91 | lebensdauer_garantie | Moderne Module sind auf 25 bis 30 Jahre Betrieb ausgelegt; Hersteller garantieren die Leistung über lange Zeiträume mit definierter Degradat |
| C-084 | src/app/finanzierung/page.tsx:100 | foerderung | Die Einmalvergütung des Bundes senkt die Investition um einen relevanten Anteil. Die Höhe hängt von Leistung, Anlagekategorie und den zum Ze |
| C-085 | src/app/finanzierung/page.tsx:112 | steuern | In den meisten Kantonen lassen sich Investitionen in Photovoltaik bei bestehenden Liegenschaften vom steuerbaren Einkommen abziehen. |
| C-086 | src/app/finanzierung/page.tsx:291 | lebensdauer_garantie | Eine Photovoltaikanlage ist ein Bauteil mit 25 bis 30 Jahren Lebensdauer. |
| C-087 | src/app/finanzierung/page.tsx:142 | strompreis | Strompreise und Einspeisevergütungen schwanken. Wir rechnen konservativ statt optimistisch. |
| C-088 | src/app/finanzierung/page.tsx:124 | steuern | Steuerabzug wirkt direkt im Investitionsjahr – je nach Kanton |
| C-089 | src/app/finanzierung/page.tsx:487 | dauer_prozess | Antwort innert eines Werktags. |
| C-090 | src/app/projekte/page.tsx:31 | unternehmen | Typische Photovoltaik-Projekte … geplant von Grenchen aus für die ganze Schweiz. Referenzen auf Anfrage. |
| C-091 | src/app/projekte/page.tsx:68 | produktion | Typische Anlagengrösse 8–12 kWp; Typ. Speicher 5–10 kWh; Montagezeit 2–3 Tage |
| C-092 | src/app/projekte/page.tsx:91 | produktion | Typische Anlagengrösse 15–60 kWp; Typ. Speicher 10–30 kWh |
| C-093 | src/app/projekte/page.tsx:112 | produktion | Typische Anlagengrösse 30–150 kWp; Typ. Speicher 20–60 kWh |
| C-094 | src/app/projekte/page.tsx:134 | produktion | Typische Anlagengrösse 50–250 kWp; Dachfläche ab 500 m² |
| C-095 | src/app/projekte/page.tsx:159 | produktion | Typische Speicherkapazität 5–20 kWh; Umsetzung 1–2 Tage |
| C-096 | src/app/projekte/page.tsx:181 | produktion | Typische Ladeleistung 11–22 kW |
| C-097 | src/app/projekte/page.tsx:318 | unternehmen | Sieben Anlagentypen prägen unsere Arbeit – vom Einfamilienhaus über den ZEV im Mehrfamilienhaus bis zur landwirtschaftlichen Grossanlage. |
| C-098 | src/app/projekte/page.tsx:397 | dauer_prozess | Kostenfrei und unverbindlich, Antwort innert eines Werktags. |
| C-099 | src/app/ueber-uns/page.tsx:22 | unternehmen | …Schweizer Solarunternehmen aus Grenchen SO – gegründet 2025, tätig in Solothurn, Biel, Bern und der ganzen Schweiz. |
| C-100 | src/app/ueber-uns/page.tsx:48 | unternehmen | 2025 – Gegründet in Grenchen SO |
| C-101 | src/app/ueber-uns/page.tsx:49 | sonstiges | 1 – Feste Ansprechperson pro Projekt |
| C-102 | src/app/ueber-uns/page.tsx:50 | lebensdauer_garantie | 25+ – Jahre Planungshorizont je Anlage |
| C-103 | src/app/ueber-uns/page.tsx:161 | unternehmen | {siteConfig.legalName} wurde {siteConfig.founded} in Grenchen gegründet und ist von hier aus in der ganzen Schweiz tätig. |
| C-104 | src/app/ueber-uns/page.tsx:108 | sonstiges | Montage ausschliesslich durch geprüfte Schweizer Partnerbetriebe – koordiniert und verantwortet von uns. |
| C-105 | src/app/ueber-uns/page.tsx:111 | sonstiges | Verbindliche Reaktionszeiten bei Störungen – Sie erreichen eine Person, keine Warteschleife. |
| C-106 | src/app/ueber-uns/page.tsx:124 | lebensdauer_garantie | Komponenten von Herstellern mit langen Produkt- und Leistungsgarantien und etablierten Rücknahmesystemen. |
| C-107 | src/app/ueber-uns/page.tsx:129 | co2 | Gebündelte Lieferungen und kurze Anfahrtswege aus der Region |
| C-108 | src/app/ueber-uns/page.tsx:383 | co2 | Eine Photovoltaikanlage spart über ihre Lebensdauer ein Vielfaches der Energie ein, die ihre Herstellung benötigt. |
| C-109 | src/app/ueber-uns/page.tsx:430 | sonstiges | …es gibt keine anonymen Subunternehmerketten. |
| C-110 | src/app/ueber-uns/page.tsx:460 | dauer_prozess | kostenfrei, unverbindlich und mit Antwort innert eines Werktags |
| C-111 | src/app/angebote/page.tsx:16 | kosten | Fordern Sie ein kostenloses, unverbindliches Solar-Angebot an. Wir prüfen Ihr Photovoltaik-Projekt in Grenchen, Solothurn, Bern und Umgebung |
| C-112 | src/app/angebote/page.tsx:28 | dauer_prozess | Kostenfrei und unverbindlich / Antwort innert eines Werktags |
| C-113 | src/app/kontakt/page.tsx:10 | dauer_prozess | …Solarberatung, Offerte, Solarrechner-Auswertung oder Serviceanfrage in der Schweiz. Antwort innert eines Werktags. |
| C-114 | src/app/kontakt/page.tsx:28 | dauer_prozess | Kostenfrei und unverbindlich – Antwort innert eines Werktags. |
| C-115 | src/app/kontakt/page.tsx:96 | unternehmen | zentral zwischen Solothurn und Biel, gut erreichbar aus der ganzen Region |
| C-116 | src/app/kontakt/page.tsx:14 | unternehmen | destination=Oelirain+1A,+2540+Grenchen |
| C-117 | src/app/solarrechner/page.tsx:7 | dauer_prozess | Solarrechner – Photovoltaik-Potenzial Ihres Dachs in 60 Sek. |
| C-118 | src/app/solarrechner/page.tsx:9 | sonstiges | …Kosten und Amortisation Ihrer Photovoltaikanlage – mit echten Schweizer Dachdaten, kantonsspezifisch und unverbindlich. |
| C-119 | src/app/solarrechner/page.tsx:33 | sonstiges | Offizielle Dachdaten des Bundes (Sonnendach.ch) |
| C-120 | src/app/solarrechner/page.tsx:24 | amortisation | …liefert eine fundierte Erstauswertung mit Investitionsspanne, Eigenverbrauch und Amortisation. |
| C-121 | src/app/solarrechner/page.tsx:50 | dauer_prozess | …wir prüfen Förderoptionen, Lastprofil und Wirtschaftlichkeit und melden uns innert eines Werktags. |
| C-122 | src/app/services/page.tsx:92 | foerderung | Fördersätze und Programme ändern sich laufend. Alle Angaben sind indikativ – wir prüfen sie zum Zeitpunkt Ihrer Offerte tagesaktuell. |
| C-123 | src/app/pakete/page.tsx:354 | kosten | Alle Preise sind Richtwerte inkl. Montage; definitive Offerte nach Standortanalyse. |
| C-124 | src/app/projekte/page.tsx:326 | sonstiges | Diese Seite zeigt typische Anlagentypen aus unserer Praxis – keine konkreten Kundenprojekte. … Alle Wertspannen sind indikativ. |
| C-125 | src/components/sections/why-us-section.tsx:10 | sonstiges | Geplant nach Schweizer Normen, montiert mit dokumentierten Abläufen – vom ersten Aufmass bis zum Sicherheitsnachweis. |
| C-126 | src/components/sections/why-us-section.tsx:34 | lebensdauer_garantie | Monitoring, Wartung und planbare Servicekosten über die Inbetriebnahme hinaus – eine Anlage ist ein Projekt über Jahrzehnte. |
| C-127 | src/app/pakete/page.tsx:17 | kosten | Pakete & Preise – Solaranlage Richtpreise Schweiz |
| C-128 | src/app/angebote/page.tsx:14 | kosten | Kostenloses Solar-Angebot – Grenchen, Solothurn & Bern |
| C-129 | src/app/services/page.tsx:121 | eigenverbrauch | Ein Speicher erhöht den Eigenverbrauch spürbar – aber er rechnet sich nicht in jedem Fall. |
| C-130 | src/app/finanzierung/page.tsx:58 | eigenverbrauch | Läuft sie tagsüber mit eigenem Solarstrom, steigt der Eigenverbrauch spürbar – besonders in den Übergangsmonaten mit Sonne und Heizbedarf zu |
| C-100 | src/lib/solar/calculate.ts:97 | produktion | sued: 1.0 |
| C-101 | src/lib/solar/calculate.ts:98 | produktion | suedost: 0.95, suedwest: 0.95 |
| C-102 | src/lib/solar/calculate.ts:100 | produktion | ost: 0.85, west: 0.85 |
| C-103 | src/lib/solar/calculate.ts:102 | produktion | flachdach: 0.92, gemischt: 0.9 |
| C-104 | src/lib/solar/calculate.ts:106 | produktion | "0-10": 0.9, "10-25": 0.96, "25-40": 1.0, "40+": 0.94 |
| C-105 | src/lib/solar/calculate.ts:113 | produktion | keine: 1.0, leicht: 0.92, mittel: 0.78, stark: 0.6 |
| C-106 | src/lib/solar/calculate.ts:134 | eigenverbrauch | 14.4 kWp / 16 kWh / 6'000 kWh / kein WP/EV → 37 % Eigenverbrauch |
| C-107 | src/lib/solar/calculate.ts:135 | eigenverbrauch | 23.0 kWp / 24 kWh / ~12'000 kWh / mit WP → 47 % Eigenverbrauch |
| C-108 | src/lib/solar/calculate.ts:136 | eigenverbrauch | 13.4 kWp / 16 kWh / ~46'000 kWh / mit WP+EV → 71 % Eigenverbrauch |
| C-109 | src/lib/solar/calculate.ts:149 | eigenverbrauch | let base = hasBattery ? 0.4 : 0.25; |
| C-110 | src/lib/solar/calculate.ts:153 | eigenverbrauch | mit Speicher: ratio<1.0 → 0.5; ratio>2.0 → 0.35; sonst 0.42 |
| C-111 | src/lib/solar/calculate.ts:157 | eigenverbrauch | ohne Speicher: ratio<1.0 → 0.32; ratio>2.0 → 0.22 |
| C-112 | src/lib/solar/calculate.ts:164 | eigenverbrauch | if (hasHeatPump) base += 0.12; if (hasEv) base += 0.08; if (hasHeatPump && hasEv) base += 0.05; |
| C-113 | src/lib/solar/calculate.ts:168 | eigenverbrauch | return clamp(base, 0.25, 0.85); |
| C-114 | src/lib/solar/calculate.ts:173 | steuern | kalibriert anhand DoubleA-Offerten 2026 (vor Rabatt, inkl. MwSt 8.1 %, inkl. Montage und Meldewesen) |
| C-115 | src/lib/solar/calculate.ts:179 | kosten | kwp<=6→2100; <=10→1900; <=16→1750; <=25→1550; <=40→1400; sonst 1300 |
| C-116 | src/lib/solar/calculate.ts:190 | kosten | { low: Math.round(mid * 0.9), high: Math.round(mid * 1.15) } |
| C-117 | src/lib/solar/calculate.ts:194 | kosten | const BATTERY_CHF_PER_KWH = 350; |
| C-118 | src/lib/solar/calculate.ts:196 | kosten | const WALLBOX_CHF = 1950; |
| C-119 | src/lib/solar/calculate.ts:198 | foerderung | const PRONOVO_CHF_PER_KWP = 360; |
| C-120 | src/lib/solar/calculate.ts:210 | produktion | const M2_PER_KWP = 3.9; |
| C-121 | src/lib/solar/calculate.ts:202 | produktion | AIKO Neostar G3 480 Wp (24 % Wirkungsgrad, ~1.87 m² pro Modul) → 3.9 m²/kWp |
| C-122 | src/lib/solar/calculate.ts:207 | produktion | Frühere Annahme (5 m²/kWp) entsprach veralteten 200-W/m² Panels und gab 22 % zu kleine Anlagen. |
| C-123 | src/lib/solar/calculate.ts:242 | produktion | conservative = round(realistic * 0.92); optimistic = round(realistic * 1.05); |
| C-124 | src/lib/solar/calculate.ts:246 | produktion | clamp(input.usableRoofPercent, 30, 100) |
| C-125 | src/lib/solar/calculate.ts:250 | produktion | specificYield = canton?.specificYield ?? 1000; |
| C-126 | src/lib/solar/calculate.ts:254 | produktion | conservative = round(realistic * 0.88); optimistic = round(realistic * 1.08); |
| C-127 | src/lib/solar/calculate.ts:258 | produktion | Faustregel: 1 kWh Speicher pro 1 kWp Anlage, gerundet auf 8/16/24/32-kWh-Schritte (GoodWe-Module à 8 kWh) |
| C-128 | src/lib/solar/calculate.ts:267 | produktion | target<=10→8; <=18→16; <=26→24; <=34→32; sonst 40 kWh |
| C-129 | src/lib/solar/calculate.ts:287 | strompreis | const electricityPrice = (input.electricityPriceRappen ?? 30) / 100; |
| C-130 | src/lib/solar/calculate.ts:288 | ruecklieferung | const feedInTariff = (input.feedInTariffRappen ?? 10) / 100; |
| C-131 | src/lib/solar/calculate.ts:303 | kosten | 14.4 kWp / 16 kWh → CHF 30'870 (mit 10% Rabatt) |
| C-132 | src/lib/solar/calculate.ts:304 | kosten | 13.4 kWp / 16 kWh → CHF 23'932 (mit 10% Rabatt + KLEIV BE 4824) |
| C-133 | src/lib/solar/calculate.ts:305 | kosten | 23.0 kWp / 24 kWh / Wallbox → CHF 42'356 (mit 15% Rabatt); vor Rabatt 1500-1900 CHF/kWp |
| C-134 | src/lib/solar/calculate.ts:318 | foerderung | subsidyLow = kwp * (360 - 30); subsidyHigh = kwp * (360 + 30) |
| C-135 | src/lib/solar/calculate.ts:323 | amortisation | fast = (investment.low - subsidyHigh) / savings.optimistic; slow = (investment.high - subsidyLow) / savings.conservative |
| C-136 | src/lib/solar/calculate.ts:329 | co2 | const co2SavedKgPerYear = round(realistic * 0.12); |
| C-137 | src/lib/solar/calculate.ts:385 | sonstiges | "Diese Auswertung basiert auf den BFE-Sonnendach.ch-Daten zu Ihrem Gebäude und ist deutlich präziser als generische Schätzungen." |
| C-138 | src/lib/solar/canton-data.ts:7 | produktion | Quellen-orientiert an publizierten Spannweiten von ca. 900–1'150 kWh/kWp für Schweizer Standorte (Plateau bis Alpenrand). |
| C-139 | src/lib/solar/canton-data.ts:40 | produktion | { code: "SO", name: "Solothurn", specificYield: 1010 } |
| C-140 | src/lib/solar/canton-data.ts:26 | produktion | { code: "BE", name: "Bern", specificYield: 1000 } |
| C-141 | src/lib/solar/canton-data.ts:48 | produktion | { code: "ZH", name: "Zürich", specificYield: 1010 } |
| C-142 | src/lib/solar/canton-data.ts:33 | produktion | { code: "JU", name: "Jura", specificYield: 980 } |
| C-143 | src/lib/solar/canton-data.ts:43 | produktion | { code: "TI", name: "Tessin", specificYield: 1150 } |
| C-144 | src/lib/solar/format.ts:12 | sonstiges | formatChf/formatKwh runden auf ganze Zahlen (Math.round), de-CH-Tausendertrennung; formatKwp mit max. 1 Dezimale; formatPercent rundet Proze |
| C-145 | src/lib/solar/format.ts:38 | amortisation | if (Math.abs(high - low) < 0.6) return Mittelwert als Einzelwert |
| C-146 | src/lib/sonnendach/api.ts:10 | produktion | api3.geo.admin.ch SearchServer + MapServer/identify, Layer "ch.bfe.solarenergie-eignung-daecher" |
| C-147 | src/lib/sonnendach/api.ts:16 | sonstiges | next: { revalidate: 86400 } |
| C-148 | src/lib/sonnendach/api.ts:166 | produktion | flaeche→areaM2, flaeche_kollektoren→usableAreaM2, mstrahlung→specificIrradiation, gstrahlung→totalIrradiation, stromertrag→electricityYieldK |
| C-149 | src/lib/sonnendach/api.ts:188 | sonstiges | fixe ~1km-Box mit 2400×1500 px und Toleranz 50 px ≈ effektive Suchtoleranz ~16 m |
| C-150 | src/lib/sonnendach/api.ts:118 | sonstiges | geocodeAddress(query, limit = 6), min. 3 Zeichen |
| C-151 | src/components/solar/calculator-result-card.tsx:47 | sonstiges | Jahresproduktion als Wert (realistic) mit hint "Spanne conservative – optimistic"; Ersparnis analog (Z.57–59); Investition als Spanne (Z.64) |
| C-152 | src/components/solar/calculator-result-card.tsx:73 | co2 | CO₂-Einsparung … kg/Jahr — hint "Indikativ, abhängig vom Strommix" |
| C-153 | src/components/solar/calculator-result-card.tsx:124 | lebensdauer_garantie | "Kumulierte Ersparnis über 25 Jahre" — "Lineare Hochrechnung auf Basis der realistischen Jahresersparnis. Ohne Strompreis-Anstieg." |
| C-154 | src/components/solar/calculator-result-card.tsx:199 | dauer_prozess | "…melden uns innert eines Werktags persönlich für die nächsten Schritte." |
| C-155 | src/components/solar/savings-chart.tsx:26 | ersparnis | years = 25 (Default); cumulative = annualSavings * i (linear); Investition als konstante Stufenlinie |
| C-156 | src/components/solar/solar-calculator.tsx:321 | dauer_prozess | "Erstauswertung in 60 Sekunden" |
| C-157 | src/components/solar/solar-calculator.tsx:113 | strompreis | canton "SO", roofAreaM2 80, usableRoofPercent 75, orientation "sued", tilt "25-40", shading "keine", annualConsumptionKwh 5500, electricityP |
| C-158 | src/components/solar/solar-calculator.tsx:307 | produktion | oversize = EFH && recommendedKwp > 25 → Warnung "Die ausgewählten Dachflächen ergeben über 25 kWp – das ist mehr als typisch für ein EFH." |
| C-159 | src/components/solar/solar-calculator.tsx:525 | eigenverbrauch | "Typisch: EFH 4’000–6’000, mit Wärmepumpe + EV 8’000–14’000." (kWh/Jahr) |
| C-160 | src/components/solar/solar-calculator.tsx:627 | strompreis | Strompreis-Input min 5 / max 80 Rp., Schritt 0.5; Einspeisetarif min 0 / max 60 Rp., Schritt 0.5 |
| C-161 | src/components/solar/solar-calculator.tsx:464 | sonstiges | "Bei aktiven Bundesdaten werden Ausrichtung, Neigung und Verschattung nicht für die Berechnung verwendet — die Sonnendach-Werte sind genauer |
| C-162 | src/components/solar/solar-calculator.tsx:483 | produktion | "Wir rechnen mit {usableAreaM2} m² nutzbarer Modulfläche aus Sonnendach.ch." |
| C-163 | src/app/api/solar-calculation/route.ts:40 | sonstiges | // Server-seitige Berechnung — nicht den Client-Werten vertrauen. const result = calculateSolar(parsed.data.input); |
| C-164 | src/app/api/solar-calculation/route.ts:14 | sonstiges | sha256(ip + NEXT_PUBLIC_SITE_URL).slice(0, 32) |
| C-165 | src/app/api/leads/route.ts:39 | sonstiges | Honeypot company_website → bei Befüllung freundliche 200-Antwort ohne Speicherung |
| C-166 | src/app/api/leads/route.ts:93 | sonstiges | Mail immer senden — auch wenn die DB-Speicherung gescheitert ist; Fehler nur wenn weder persisted noch emailed |
| C-167 | src/app/layout.tsx:44 | unternehmen | "Solaranlage & Photovoltaik Grenchen, Solothurn & Bern \| DoubleA Solar" — Description: "…in Solothurn, Bern und der ganzen Schweiz…" |
| C-168 | src/app/layout.tsx:50 | sonstiges | 20 Keywords, u.a. "Solaranlage Kosten Schweiz", "Pronovo Förderung Photovoltaik", "ZEV Photovoltaik Mehrfamilienhaus" |
| C-169 | src/app/layout.tsx:141 | unternehmen | @type ["LocalBusiness","HomeAndConstructionBusiness"], telephone, email, priceRange, currenciesAccepted "CHF", address, geo, openingHoursSpe |
| C-170 | src/app/layout.tsx:174 | unternehmen | foundingDate: String(siteConfig.founded) |
| C-171 | src/app/layout.tsx:175 | unternehmen | [{ Country: "Schweiz" }, …siteConfig.serviceAreas als City] |
| C-172 | src/app/layout.tsx:105 | unternehmen | CORE_SERVICES: Standortanalyse & Verschattungsprüfung; Planung/Auslegung; Installation & Netzanschluss; Batteriespeicher & Eigenverbrauchsop |
| C-173 | src/lib/site-config.ts:14 | unternehmen | phone "+41 76 307 31 59", email "solar@doubleasolutions.ch" |
| C-174 | src/lib/site-config.ts:18 | unternehmen | Oelirain 1A, 2540 Grenchen, Kanton Solothurn, CH |
| C-175 | src/lib/site-config.ts:26 | unternehmen | geo: { latitude: 47.1924, longitude: 7.3958 } |
| C-176 | src/lib/site-config.ts:30 | unternehmen | "Montag – Freitag, 08:00 – 18:00 Uhr"; "Samstag nach Vereinbarung"; schema: Mo–Fr opens 08:00 closes 18:00 |
| C-177 | src/lib/site-config.ts:42 | kosten | priceRange: "$$" |
| C-178 | src/lib/site-config.ts:48 | unternehmen | Grenchen, Solothurn, Biel/Bienne, Bettlach, Selzach, Lengnau BE, Pieterlen, Zuchwil, Bellach, Bern, Burgdorf, Lyss, Aarau, Olten |
| C-179 | src/lib/site-config.ts:3 | unternehmen | name "DoubleA Solar Solutions", legalName "DoubleA Solutions GmbH", founded: 2025, url doubleasolutions.ch |
| C-180 | src/app/sitemap.ts:8 | sonstiges | 11 Routen; priority 1.0 Startseite, 0.9 /solarrechner und /pakete, 0.7 Rest; changeFrequency "monthly" |
| C-181 | src/app/robots.ts:9 | sonstiges | allow "/", disallow ["/api/", "/admin"] |
| C-182 | supabase/schema.sql:44 | sonstiges | anon-INSERT nur wenn consent = true und char_length(email) between 5 and 320 |
| C-183 | supabase/schema.sql:92 | produktion | roof_area_m2 between 10 and 5000 (und canton not null) |
| C-184 | supabase/schema.sql:96 | sonstiges | 'new \| contacted \| qualified \| offer_sent \| won \| lost (validated in app)' |
| C-185 | supabase/schema.sql:136 | sonstiges | category efh\|mfh_zev\|gewerbe\|landwirtschaft\|nachruestung\|erweiterung; location "Region, keine exakte Kundenadresse"; self_consumption "Antei |
| C-186 | supabase/schema.sql:165 | kosten | packages-Tabelle mit kwp, price_from, price_to — Kommentar: "Beispielpakete «Pakete & Preise» (Richtwerte). Aktuell rendert das Frontend kur |
| C-187 | src/components/sections/faq-section.defaults.ts:11 | dauer_prozess | "Von der Standortanalyse bis zur Inbetriebnahme rechnen wir typischerweise mit 8 bis 16 Wochen." |
| C-188 | src/components/sections/faq-section.defaults.ts:15 | sonstiges | "Aufdach-Anlagen auf Wohngebäuden sind in der Schweiz meist nur meldepflichtig." |
| C-189 | src/components/sections/faq-section.defaults.ts:19 | foerderung | "Die Einmalvergütung wird tagesaktuell festgelegt und hängt von Anlagengrösse und Eigenverbrauchsoptimierung ab." |
| C-190 | src/components/sections/faq-section.defaults.ts:27 | lebensdauer_garantie | "Module haben heute Leistungsgarantien von 25 bis 30 Jahren. Wechselrichter halten in der Regel 12 bis 20 Jahre." |
| C-191 | src/components/sections/faq-section.defaults.ts:31 | ruecklieferung | "…wird ins Netz Ihres Verteilnetzbetreibers eingespeist und nach dessen Tarif vergütet." |
| C-192 | src/components/sections/faq-section.defaults.ts:39 | unternehmen | "Unser Hauptsitz ist in Grenchen, wir sind aber schweizweit tätig. Anfahrtswege werden transparent in der Offerte ausgewiesen." |
| C-193 | src/lib/content/schema.ts:44 | unternehmen | eyebrow "Schweizer Photovoltaik · Sitz in Grenchen"; subheadline "…von der ersten Standortanalyse bis zur langfristigen Wartung … transparen |
| C-194 | src/lib/email/notify.ts:246 | strompreis | `${input.electricityPriceRappen ?? 30} / ${input.feedInTariffRappen ?? 10} Rp./kWh` |
| C-195 | src/lib/email/notify.ts:238 | sonstiges | ["Ausrichtung / Neigung", `${input.orientation} · ${input.tilt}°`] |
| C-196 | src/lib/email/notify.ts:167 | sonstiges | "Antworten Sie direkt auf diese E-Mail – die Antwort geht an die anfragende Person." |
| C-197 | src/components/solar/solar-calculator.tsx:288 | dauer_prozess | "Anfrage gesendet — wir melden uns innert eines Werktags." |
| C-198 | src/lib/solar/calculate.ts:151 | eigenverbrauch | "Speicher schubst Eigenverbrauch grob um +12 Prozentpunkte" |
| C-199 | src/components/solar/calculator-result-card.tsx:93 | sonstiges | "Bundesdaten · sonnendach.ch" |
