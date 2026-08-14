-- ============================================================================
-- DoubleA Solar Solutions — Komplett-Setup für Supabase
-- ============================================================================
-- Diese Datei stellt ALLES her, was die Website und der Admin brauchen:
--   1. Schema  — Tabellen, Indizes, RLS-Policies, Storage-Bucket
--   2. Seed    — die heute auf der Website sichtbaren Pakete und Anlagentypen
--
-- Anwendung: Inhalt vollständig kopieren, im Supabase-SQL-Editor einfügen
-- und ausführen («Run»).
--
-- Die Datei ist IDEMPOTENT und darf beliebig oft ausgeführt werden:
--   * Tabellen/Spalten via «if not exists»
--   * Policies via «drop policy if exists» + «create policy»
--   * Seed-Zeilen via «on conflict (slug) do nothing»
-- Bereits erfasste oder im Admin geänderte Inhalte werden dabei NICHT
-- überschrieben — der Seed legt nur an, was noch fehlt.
--
-- Der Schema-Teil ist inhaltsgleich mit supabase/schema.sql.
-- ============================================================================


-- ============================================================================
-- TEIL 1 — SCHEMA
-- ============================================================================

-- 1. Helper extension (gen_random_uuid)
create extension if not exists "pgcrypto";

-- 2. leads
create table if not exists public.leads (
    id            uuid primary key default gen_random_uuid(),
    created_at    timestamptz not null default now(),
    source        text not null default 'website',
    name          text,
    email         text not null,
    phone         text,
    address       text,
    heating_type  text,
    message       text,
    consent       boolean not null default false,
    status        text not null default 'new',
    ip_hash       text,
    user_agent    text
);

-- Migration: Spalten ergänzen (idempotent, nutzt IF NOT EXISTS)
alter table public.leads add column if not exists address text;
alter table public.leads add column if not exists heating_type text;
alter table public.leads add column if not exists household_size integer;

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_email_idx on public.leads (email);

alter table public.leads enable row level security;

-- Allow anonymous (public) clients to INSERT only; consent must be true and
-- email must be provided. No SELECT/UPDATE/DELETE for anon.
drop policy if exists "leads_anon_insert" on public.leads;
create policy "leads_anon_insert"
    on public.leads
    for insert
    to anon
    with check (
        consent = true
        and char_length(coalesce(email, '')) between 5 and 320
    );

-- Service role bypasses RLS automatically. The route handlers use it.

-- 3. solar_calculations
create table if not exists public.solar_calculations (
    id                       uuid primary key default gen_random_uuid(),
    created_at               timestamptz not null default now(),
    lead_id                  uuid references public.leads(id) on delete set null,
    building_type            text,
    canton                   text,
    postal_code              text,
    city                     text,
    roof_area_m2             numeric,
    usable_roof_percent      numeric,
    orientation              text,
    tilt                     text,
    shading                  text,
    annual_consumption_kwh   numeric,
    has_heat_pump            boolean,
    has_ev                   boolean,
    wants_battery            text,
    electricity_price_rappen numeric,
    feed_in_tariff_rappen    numeric,
    financing_interest       text,
    result                   jsonb,
    ip_hash                  text,
    user_agent               text
);

create index if not exists solar_calculations_created_at_idx
    on public.solar_calculations (created_at desc);
create index if not exists solar_calculations_lead_id_idx
    on public.solar_calculations (lead_id);

alter table public.solar_calculations enable row level security;

drop policy if exists "solar_calculations_anon_insert" on public.solar_calculations;
create policy "solar_calculations_anon_insert"
    on public.solar_calculations
    for insert
    to anon
    with check (
        canton is not null
        and roof_area_m2 is not null
        and roof_area_m2 between 10 and 5000
    );

-- 4. Comments / status enum (kept lightweight as text, validated in app layer)
comment on column public.leads.status is
    'new | contacted | qualified | offer_sent | won | lost (validated in app)';

-- 4. site_content (für den Admin-Editor)
-- Key-Value-Store für editierbare Inhalte: Hero-Headline, Kontaktdaten,
-- FAQ-Items etc. Frontend liest mit Fallback auf hardcoded Defaults.
create table if not exists public.site_content (
    key         text primary key,
    value       jsonb not null,
    updated_at  timestamptz not null default now(),
    updated_by  text
);

alter table public.site_content enable row level security;

-- Public READ erlauben, damit das Frontend Inhalte ohne Auth lesen kann.
drop policy if exists "site_content_anon_read" on public.site_content;
create policy "site_content_anon_read"
    on public.site_content
    for select
    to anon
    using (true);

-- Schreibzugriff nur für authentifizierte User (Admin-Login).
drop policy if exists "site_content_auth_write" on public.site_content;
create policy "site_content_auth_write"
    on public.site_content
    for all
    to authenticated
    using (true)
    with check (true);

-- 5. projects — Anlagentypen (kind = 'typ') und freigegebene
-- Referenzprojekte (kind = 'referenz').
create table if not exists public.projects (
    id                uuid primary key default gen_random_uuid(),
    created_at        timestamptz not null default now(),
    title             text not null,
    slug              text not null unique,
    category          text not null, -- efh | mfh_zev | gewerbe | landwirtschaft | nachruestung | erweiterung
    location          text,          -- Region, keine exakte Kundenadresse
    kwp               numeric,
    storage_kwh       numeric,
    annual_production numeric,
    self_consumption  numeric,       -- Anteil 0–1
    description       text,
    images            jsonb not null default '[]'::jsonb,
    is_public         boolean not null default false,
    sort_order        integer not null default 0
);

-- Migration: Spalten ergänzen (idempotent). `kind` trennt kuratierte
-- Anlagentypen ('typ') von echten, freigegebenen Kundenprojekten
-- ('referenz'). Diese Trennung ist inhaltlich zwingend und darf nicht
-- vermischt werden.
alter table public.projects add column if not exists kind text not null default 'referenz';
alter table public.projects add column if not exists metric_label text;
alter table public.projects add column if not exists metric_value text;
alter table public.projects add column if not exists facts jsonb not null default '[]'::jsonb;
alter table public.projects add column if not exists deliverables jsonb not null default '[]'::jsonb;

do $$
begin
    if not exists (
        select 1 from pg_constraint where conname = 'projects_kind_check'
    ) then
        alter table public.projects
            add constraint projects_kind_check check (kind in ('typ', 'referenz'));
    end if;
end $$;

comment on column public.projects.kind is
    'typ = kuratierter Anlagentyp (Spannweiten, kein Kundenprojekt) | referenz = freigegebenes Kundenprojekt';

create index if not exists projects_kind_sort_idx
    on public.projects (kind, sort_order);

alter table public.projects enable row level security;

-- Öffentlich lesbar ist alles, was freigegeben ist (Anlagentypen werden
-- mit is_public = true geseedet).
drop policy if exists "projects_anon_read_public" on public.projects;
create policy "projects_anon_read_public"
    on public.projects
    for select
    to anon
    using (is_public = true);

drop policy if exists "projects_auth_write" on public.projects;
create policy "projects_auth_write"
    on public.projects
    for all
    to authenticated
    using (true)
    with check (true);

-- 6. packages — «Pakete & Preise» (Richtwerte, im Admin pflegbar).
create table if not exists public.packages (
    id                uuid primary key default gen_random_uuid(),
    created_at        timestamptz not null default now(),
    title             text not null,
    slug              text not null unique,
    kwp               numeric,
    target_group      text,
    price_from        numeric,
    price_to          numeric,
    included_features jsonb not null default '[]'::jsonb,
    optional_features jsonb not null default '[]'::jsonb,
    sort_order        integer not null default 0
);

-- Migration: Spalten ergänzen (idempotent).
alter table public.packages add column if not exists summary text;
alter table public.packages add column if not exists stats jsonb not null default '[]'::jsonb;
alter table public.packages add column if not exists is_featured boolean not null default false;

comment on column public.packages.stats is
    'Array von {label, value} — Eckwerte-Tabelle im Paket-Panel';

alter table public.packages enable row level security;

drop policy if exists "packages_anon_read" on public.packages;
create policy "packages_anon_read"
    on public.packages
    for select
    to anon
    using (true);

drop policy if exists "packages_auth_write" on public.packages;
create policy "packages_auth_write"
    on public.packages
    for all
    to authenticated
    using (true)
    with check (true);

-- 7. team_members — Team-Seite (Admin-gepflegt, Portraits im Storage).
create table if not exists public.team_members (
    id           uuid primary key default gen_random_uuid(),
    created_at   timestamptz not null default now(),
    name         text not null,
    role         text not null,
    image_path   text,
    sort_order   integer not null default 0,
    is_published boolean not null default false
);

alter table public.team_members enable row level security;

drop policy if exists "team_anon_read_published" on public.team_members;
create policy "team_anon_read_published"
    on public.team_members
    for select
    to anon
    using (is_published = true);

drop policy if exists "team_auth_write" on public.team_members;
create policy "team_auth_write"
    on public.team_members
    for all
    to authenticated
    using (true)
    with check (true);

-- 8. Storage-Bucket für Website-Bilder (öffentlich lesbar; Uploads laufen
-- server-seitig über den Service-Role-Key).
insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do nothing;


-- ============================================================================
-- TEIL 2 — SEED: die heute auf der Website sichtbaren Inhalte
-- ============================================================================
-- Nach diesem Seed sind Pakete und Anlagentypen im Admin sichtbar und
-- editierbar. Der hartcodierte Satz im Code bleibt reiner Notfall-Fallback
-- (leere oder fehlende Tabelle).
--
-- Hinweis zu Apostrophen: in SQL-Zeichenketten wird ' verdoppelt,
-- z. B. CHF 15'500 → 'CHF 15''500'.


-- ----------------------------------------------------------------------------
-- 2a. packages — 3 Pakete von /pakete
-- ----------------------------------------------------------------------------

insert into public.packages
    (slug, title, target_group, summary, kwp, price_from, price_to,
     stats, included_features, optional_features, is_featured, sort_order)
values
    (
        'basis',
        'Basis 8.2 kWp',
        'Einfamilienhaus',
        'Der solide Einstieg für das typische Einfamilienhaus – vollständig montiert, angeschlossen und abgenommen.',
        8.2,
        15500,
        18500,
        '[
            {"label": "Leistung", "value": "8.2 kWp"},
            {"label": "Modulfläche (ca.)", "value": "~35 m²"},
            {"label": "Jahresertrag (typ.)", "value": "7''500–8''500 kWh"},
            {"label": "Speicher", "value": "nachrüstbar"}
        ]'::jsonb,
        '[
            "Module und Wechselrichter",
            "Montage und Netzanschluss",
            "Pronovo-EIV-Antrag",
            "Inbetriebnahme inkl. Sicherheitsnachweis",
            "Monitoring"
        ]'::jsonb,
        '[]'::jsonb,
        false,
        0
    ),
    (
        'komfort',
        'Komfort 10 kWp + Speicher',
        'EFH mit Wärmepumpe oder E-Auto',
        'Mehr Unabhängigkeit dank Batteriespeicher: Solarstrom vom Dach auch am Abend nutzen.',
        10,
        21500,
        26500,
        '[
            {"label": "Leistung", "value": "10 kWp"},
            {"label": "Modulfläche (ca.)", "value": "~42 m²"},
            {"label": "Jahresertrag (typ.)", "value": "9''000–10''500 kWh"},
            {"label": "Speicher", "value": "8–10 kWh"}
        ]'::jsonb,
        '[
            "Alles aus «Basis 8.2 kWp»",
            "Batteriespeicher 8–10 kWh",
            "Auslegung auf Eigenverbrauch optimiert"
        ]'::jsonb,
        '[]'::jsonb,
        true,
        1
    ),
    (
        'premium',
        'Premium 15 kWp + Wärmepumpen-Integration',
        'Grössere EFH und kleine MFH',
        'Für hohe Verbräuche: Photovoltaik, Wärmepumpe und Lastmanagement intelligent gekoppelt.',
        15,
        27500,
        34500,
        '[
            {"label": "Leistung", "value": "15 kWp"},
            {"label": "Modulfläche (ca.)", "value": "~63 m²"},
            {"label": "Jahresertrag (typ.)", "value": "13''500–16''000 kWh"},
            {"label": "Speicher (Option)", "value": "16 kWh"}
        ]'::jsonb,
        '[
            "Alles aus «Basis 8.2 kWp»",
            "Wärmepumpen-Integration und Energiemanagement im Preis eingerechnet",
            "Lastmanagement und Eigenverbrauchsoptimierung",
            "Speicher-Option 16 kWh"
        ]'::jsonb,
        '[]'::jsonb,
        false,
        2
    )
on conflict (slug) do nothing;


-- ----------------------------------------------------------------------------
-- 2b. projects (kind = 'typ') — 7 Anlagentypen von /projekte
--     4 Haupttypen (sort_order 0–3) + 3 Erweiterungen (sort_order 4–6).
--     Bewusst KEINE Kundenprojekte: typische Spannweiten aus der Praxis.
-- ----------------------------------------------------------------------------

insert into public.projects
    (slug, title, kind, category, description,
     metric_label, metric_value, facts, deliverables,
     images, is_public, sort_order)
values
    (
        'einfamilienhaus',
        'Einfamilienhaus',
        'typ',
        'efh',
        'Die klassische Aufdachanlage mit Eigenverbrauchsoptimierung. Häufig als Gesamtsystem mit Speicher, Wärmepumpe und Wallbox gedacht – sauber dimensioniert statt maximal verkauft.',
        'Typische Anlagengrösse',
        '8–12 kWp',
        '[
            {"label": "Typ. Speicher", "value": "5–10 kWh"},
            {"label": "Montagezeit", "value": "2–3 Tage"}
        ]'::jsonb,
        '[
            "Verschattungsanalyse, Auslegung und Ertragsprognose",
            "Module, Wechselrichter, optional Speicher und Wallbox",
            "Pronovo-EIV-Antrag, Inbetriebnahme und Sicherheitsnachweis"
        ]'::jsonb,
        '[]'::jsonb,
        true,
        0
    ),
    (
        'mehrfamilienhaus-zev',
        'Mehrfamilienhaus / ZEV',
        'typ',
        'mfh_zev',
        'Zusammenschluss zum Eigenverbrauch (ZEV) für Eigentümerschaften und Verwaltungen. Entscheidend: Messkonzept und Mieterstromabrechnung werden von Anfang an mitgeplant – nicht nachgerüstet.',
        'Typische Anlagengrösse',
        '15–60 kWp',
        '[
            {"label": "Typ. Speicher", "value": "10–30 kWh"},
            {"label": "Abrechnung", "value": "Mieterstrom"}
        ]'::jsonb,
        '[
            "Messkonzept und ZEV-Gründung nach Vorgaben des Netzbetreibers",
            "Abrechnungslösung für Mietparteien (Mieterstrom)",
            "Koordination mit Verteilnetzbetreiber und Verwaltung"
        ]'::jsonb,
        '[]'::jsonb,
        true,
        1
    ),
    (
        'gewerbe',
        'Gewerbe',
        'typ',
        'gewerbe',
        'Produktions- und Gewerbedächer mit hohem Stromverbrauch tagsüber – dort fliesst Solarstrom direkt in den Betrieb. Entscheidungsgrundlage ist Ihr Lastprofil, nicht der Katalogwert.',
        'Typische Anlagengrösse',
        '30–150 kWp',
        '[
            {"label": "Typ. Speicher", "value": "20–60 kWh"},
            {"label": "Eigenverbrauch", "value": "tagsüber hoch"}
        ]'::jsonb,
        '[
            "Lastganganalyse und indikative Wirtschaftlichkeitsrechnung",
            "Tragwerksprüfung und Brandschutzkonzept",
            "Monitoring und Wartungskonzept für den laufenden Betrieb"
        ]'::jsonb,
        '[]'::jsonb,
        true,
        2
    ),
    (
        'landwirtschaft',
        'Landwirtschaft',
        'typ',
        'landwirtschaft',
        'Ställe, Scheunen und Remisen bieten grosse, ungenutzte Dachflächen. Wir planen um den Betrieb herum: Kühlung, Melken und Trocknung als Eigenverbraucher – der Überschuss wird eingespeist.',
        'Typische Anlagengrösse',
        '50–250 kWp',
        '[
            {"label": "Dachfläche", "value": "ab 500 m²"},
            {"label": "Typ. Speicher", "value": "optional"}
        ]'::jsonb,
        '[
            "Prüfung von Statik und Dacheindeckung (z. B. Faserzement)",
            "Eigenverbrauchskonzept für Kühlung, Melken und Trocknung",
            "Abklärung von Einspeisung und Rückliefertarif mit dem Netzbetreiber"
        ]'::jsonb,
        '[]'::jsonb,
        true,
        3
    ),
    (
        'batterie-nachruestung',
        'Batterie-Nachrüstung',
        'typ',
        'nachruestung',
        'Nachrüstung bestehender PV-Anlagen mit Speicher – unabhängig davon, wer die Anlage gebaut hat. Wir beurteilen ehrlich, ob sich ein Speicher in Ihrem Fall rechnet.',
        'Typische Speicherkapazität',
        '5–20 kWh',
        '[
            {"label": "Kopplung", "value": "AC / DC"},
            {"label": "Umsetzung", "value": "1–2 Tage"}
        ]'::jsonb,
        '[
            "Bestandsaufnahme von Wechselrichter und Verkabelung",
            "Kapazität nach Lastprofil ausgelegt – ohne Überdimensionierung",
            "Integration in Smart Meter und Energiemanagement"
        ]'::jsonb,
        '[]'::jsonb,
        true,
        4
    ),
    (
        'wallbox-e-mobilitaet',
        'Wallbox / E-Mobilität',
        'typ',
        'erweiterung',
        'Laden am eigenen Gebäude, gesteuert nach Solarüberschuss. Das dynamische Lastmanagement schützt den Hausanschluss und priorisiert selbst produzierten Strom.',
        'Typische Ladeleistung',
        '11–22 kW',
        '[
            {"label": "Lastmanagement", "value": "dynamisch"},
            {"label": "Laden", "value": "PV-optimiert"}
        ]'::jsonb,
        '[
            "Wallbox-Auswahl passend zu Fahrzeug und Hausanschluss",
            "Dynamisches Lastmanagement mit PV-Überschussladen",
            "Anmeldung beim Netzbetreiber und Inbetriebnahme"
        ]'::jsonb,
        '[]'::jsonb,
        true,
        5
    ),
    (
        'waermepumpen-integration',
        'Wärmepumpen-Integration',
        'typ',
        'erweiterung',
        'Photovoltaik und Wärmepumpe ergänzen sich im Gebäude besonders gut: Über SG-Ready oder ein Energiemanagementsystem heizt die Wärmepumpe bevorzugt dann, wenn das Dach produziert.',
        'Gekoppeltes Gesamtsystem',
        'PV + WP',
        '[
            {"label": "Schnittstelle", "value": "SG-Ready"},
            {"label": "Speicher", "value": "thermisch"}
        ]'::jsonb,
        '[
            "Abstimmung mit Heizungsfachpartner oder bestehender Anlage",
            "Ansteuerung über SG-Ready oder Energiemanagementsystem",
            "Warmwasser als thermischer Speicher für den Solarüberschuss"
        ]'::jsonb,
        '[]'::jsonb,
        true,
        6
    )
on conflict (slug) do nothing;


-- ============================================================================
-- TEIL 3 — Erfolgskontrolle
-- ============================================================================
-- Erwartet: packages = 3, projects (typ) = 7 (sofern nichts zusätzlich
-- erfasst wurde). team_members darf 0 sein.

select 'packages' as tabelle, count(*) from public.packages
union all
select 'projects (typ)', count(*) from public.projects where kind = 'typ'
union all
select 'team_members', count(*) from public.team_members;
