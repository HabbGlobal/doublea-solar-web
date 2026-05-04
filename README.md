# DoubleA Solar Solutions – Website

Premium Next.js website for **DoubleA Solar Solutions** (Grenchen, Schweiz):
photovoltaic planning, funding advice, installation, and long-term operation.

## Tech Stack

- **Next.js 16** (App Router, RSC, Turbopack)
- **TypeScript** strict
- **Tailwind CSS v4** + **shadcn/ui** (base-nova / @base-ui/react)
- **framer-motion** for restrained motion design
- **react-hook-form** + **zod** for forms / validation
- **recharts** for the savings chart
- **Supabase** (Postgres + RLS) for leads & solar calculations
- **sonner** for toast notifications

## Getting Started

```bash
pnpm install
cp .env.example .env.local   # fill in Supabase keys
pnpm dev                     # http://localhost:3000
```

## Environment Variables

| Variable                          | Purpose                                          |
| --------------------------------- | ------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`            | Canonical site URL (used in OG, sitemap, etc.)   |
| `NEXT_PUBLIC_SUPABASE_URL`        | Supabase project URL                             |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`   | Public anon key (safe in browser)                |
| `SUPABASE_SERVICE_ROLE_KEY`       | Server-only key for inserts in route handlers    |
| `NEXT_PUBLIC_COMPANY_PHONE`       | Phone shown in header / footer                   |
| `NEXT_PUBLIC_COMPANY_EMAIL`       | E-mail shown in header / footer                  |

**Never expose `SUPABASE_SERVICE_ROLE_KEY` to the client.** It is only used in
`/src/lib/supabase/server.ts` and consumed by API route handlers.

## Supabase Setup

1. Create a new Supabase project.
2. Open the SQL editor and run [`supabase/schema.sql`](./supabase/schema.sql).
3. Copy the project URL, the **anon** key, and the **service role** key into
   `.env.local`.
4. Confirm RLS is enabled on `public.leads` and `public.solar_calculations`
   (the schema enables it explicitly).

The schema enables RLS, allows anonymous inserts under tight constraints
(consent must be true on `leads`; canton + plausible roof area on
`solar_calculations`), and reserves all reads to the service role.

## Deploy to Vercel

1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Add the environment variables above (Production + Preview).
4. Deploy. Static pages prerender; the API routes run as server functions.

The `opengraph-image.tsx` is generated at runtime via `next/og` (edge runtime).

## Project Structure

```
src/
  app/                       # routes (App Router)
    api/leads/                – POST /api/leads
    api/solar-calculation/    – POST /api/solar-calculation
    sitemap.ts | robots.ts | opengraph-image.tsx
  components/
    site/                    # header, footer, mobile-nav, cta-band, logo
    sections/                # hero, trust, services, process, calculator teaser, financing, projects, faq, final-cta
    solar/                   # solar-calculator wizard, result card, chart, canton select, roof inputs
    forms/                   # lead-form, contact-form
    ui/                      # shadcn primitives
  lib/
    solar/                   # calculate.ts, canton-data.ts, format.ts
    supabase/                # client.ts (browser), server.ts (service-role)
    validations/             # zod schemas
supabase/schema.sql          # Postgres + RLS policies
.claude/skills/ui-ux-pro-max # project-specific Claude Code skill
```

## Solar Calculator

`src/lib/solar/calculate.ts` returns ranges (conservative / realistic /
optimistic) for production and savings, never punctual numbers. The schema
explicitly disclaims that this is an estimation, not a binding offer.
Canton-specific yields are conservative defaults; verify with on-site analysis
before quoting.

## Manual QA Checklist

- [ ] `pnpm lint && pnpm exec tsc --noEmit && pnpm build`
- [ ] Mobile: header sheet nav opens, calculator scrolls cleanly, CTAs reachable
- [ ] Calculator: validation triggers on blank inputs, lead capture submits
- [ ] Forms: GDPR consent required, errors visible, success state shown
- [ ] Run Lighthouse / PageSpeed; verify Largest Contentful Paint on home
- [ ] Lawyer review on `/impressum` and `/datenschutz` before going live
