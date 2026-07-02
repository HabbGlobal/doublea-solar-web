-- DoubleA Solar Solutions — Supabase schema
-- Apply via Supabase SQL Editor or `supabase db push`.
-- This schema enables RLS and only allows public INSERTs through the
-- anon role. Reads are restricted to the service role used by the
-- Next.js route handlers.

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

-- 5. projects — echte Referenzprojekte (Relaunch-Vorbereitung).
-- Frontend zeigt Anlagentypen als Fallback, bis hier freigegebene
-- Projekte (is_public = true) erfasst sind.
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

alter table public.projects enable row level security;

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

-- 6. packages — Beispielpakete «Pakete & Preise» (Richtwerte).
-- Aktuell rendert das Frontend kuratierte Defaults; diese Tabelle
-- erlaubt spätere Pflege ohne Deployment.
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
