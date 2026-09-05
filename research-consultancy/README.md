# Dr. Abdelrahman Ahmed — Scientific Research & Academic Consultancy Platform

A complete, deployable web application: public website + CMS + Admin Dashboard
+ Client Portal. Built so that **after deployment, everything is managed from
the Admin Dashboard — no code editing required.**

## What's included

- **Public website**: Home, About, Services, Portfolio, Reviews, Publications, Contact
- **Admin Dashboard** (`/admin`): full CRUD for Clients, Projects, Portfolio, Reviews,
  Services, Publications, Profile, Website Settings, Media Library, Contact Requests
- **Client Portal** (`/client`): each client logs in and sees only their own
  project — status, progress, timeline, files, and messages
- **Database**: PostgreSQL via Supabase, with Row Level Security enforcing
  every privacy rule (private portfolio items, pending reviews, and
  client-to-client isolation are enforced at the database level, not just
  in the UI)
- **File storage**: Supabase Storage (public bucket for site media, private
  bucket for client deliverables)

## Why this architecture

| Layer | Choice | Why |
|---|---|---|
| Frontend | Next.js 14 (App Router) + React | Server Components fetch data straight from the database with no separate API layer to build/maintain; Server Actions let admin forms write to the database directly and securely. Deploys natively on Vercel. |
| Backend/DB | Supabase (PostgreSQL) | A real, scalable relational database (not localStorage) with instant auto-generated APIs, built-in Auth, Storage, and — critically — Row Level Security, which lets us enforce "clients can only see their own data" and "private portfolio items never leak publicly" as database rules that hold even if there's a bug in the frontend. |
| Auth | Supabase Auth | One system handles both Admin login and every Client's individual login, with battle-tested password hashing, sessions, and cookie handling via `@supabase/ssr`. |
| Storage | Supabase Storage | Handles image/PDF uploads directly from the browser, integrated with the same RLS rules as the database. |
| Hosting | Vercel | Zero-config deploys for Next.js, generous free tier, simple environment-variable based configuration — matches the "beginner-friendly" requirement. |

This stack is fully managed (no servers to maintain) and scales automatically
as the practice grows.

## Project structure

```
research-consultancy/
├── supabase/
│   ├── schema.sql       ← run first: creates every table
│   ├── policies.sql     ← run second: Row Level Security rules
│   ├── storage.sql      ← run third: storage buckets + file access rules
│   └── seed.sql         ← optional: sample/placeholder data
├── src/
│   ├── app/
│   │   ├── (marketing)/ ← public site: home, about, services, portfolio, reviews, publications, contact
│   │   ├── admin/       ← admin dashboard (protected)
│   │   └── client/      ← client portal (protected)
│   ├── components/      ← shared UI (forms, cards, sidebar, upload widget)
│   ├── lib/
│   │   ├── actions/     ← server actions (all database writes happen here)
│   │   ├── supabase/    ← Supabase client setup (browser / server / admin)
│   │   └── types.ts     ← shared TypeScript types
│   └── middleware.ts    ← protects /admin and /client routes
├── package.json
└── .env.example
```

## Local development

```bash
npm install
cp .env.example .env.local   # fill in your Supabase credentials — see DEPLOYMENT.md
npm run dev
```

Visit `http://localhost:3000` for the public site, `/admin/login` for the
dashboard, `/client/login` for the client portal.

## Deployment

See **DEPLOYMENT.md** for full beginner-friendly, step-by-step instructions
(Supabase project setup → database → auth → storage → Vercel deploy →
creating your admin account → updating the live site afterward).

## Using the dashboard day-to-day

See **ADMIN_GUIDE.md** for a walkthrough of every dashboard section.

## Sample data

Everything seeded by `supabase/seed.sql` is clearly labeled `[SAMPLE]`.
No real clients, publications, statistics, or affiliations were invented —
replace or delete all sample rows from the Admin Dashboard before going live.
