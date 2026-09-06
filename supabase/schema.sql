-- ============================================================================
-- Dr. Abdelrahman Ahmed — Scientific Research Platform
-- DATABASE SCHEMA (PostgreSQL / Supabase)
-- Run this in Supabase SQL Editor: Project -> SQL Editor -> New Query -> Paste -> Run
-- ============================================================================

create extension if not exists "uuid-ossp";

-- ----------------------------------------------------------------------------
-- ADMINS  (links a Supabase Auth user to admin privileges)
-- ----------------------------------------------------------------------------
create table if not exists admins (
  id uuid primary key default uuid_generate_v4(),
  auth_user_id uuid unique not null references auth.users(id) on delete cascade,
  full_name text not null,
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- PROFILE  (single-row table: the public "about me" content)
-- ----------------------------------------------------------------------------
create table if not exists profile (
  id int primary key default 1,
  full_name text not null default 'Dr. Abdelrahman Ahmed',
  professional_title text not null default 'Scientific Research & Academic Consultant',
  biography text not null default '',
  qualifications text[] not null default '{}',
  specializations text[] not null default '{}',
  research_interests text[] not null default '{}',
  experience_years int not null default 0,
  achievements text[] not null default '{}',
  photo_url text,
  email text,
  phone text,
  whatsapp text,
  linkedin_url text,
  twitter_url text,
  researchgate_url text,
  orcid_url text,
  constraint single_row check (id = 1)
);

-- ----------------------------------------------------------------------------
-- SITE SETTINGS  (single-row table: global website configuration)
-- ----------------------------------------------------------------------------
create table if not exists site_settings (
  id int primary key default 1,
  site_title text not null default 'Dr. Abdelrahman Ahmed | Scientific Research & Academic Consultancy',
  logo_url text,
  favicon_url text,
  contact_email text,
  contact_phone text,
  whatsapp_number text,
  facebook_url text,
  linkedin_url text,
  twitter_url text,
  instagram_url text,
  homepage_headline text not null default 'Rigorous Scientific Research. Trusted Academic Guidance.',
  homepage_description text not null default 'Sample description — edit this in Admin > Website Settings.',
  cta_text text not null default 'Book a Free Consultation',
  footer_text text not null default '© Dr. Abdelrahman Ahmed. All rights reserved.',
  stat_clients_served int not null default 0,
  stat_projects_completed int not null default 0,
  stat_publications int not null default 0,
  stat_years_experience int not null default 0,
  constraint single_row_settings check (id = 1)
);

-- ----------------------------------------------------------------------------
-- SERVICES
-- ----------------------------------------------------------------------------
create table if not exists services (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  short_description text,
  full_description text,
  features text[] not null default '{}',
  price_label text,          -- e.g. "Starting at $150" or "Custom Quote"
  icon text default 'FlaskConical', -- lucide-react icon name
  is_featured boolean not null default false,
  is_published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- PORTFOLIO PROJECTS
-- ----------------------------------------------------------------------------
create table if not exists portfolio_projects (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  category text,
  research_field text,
  description text,
  services_provided text[] not null default '{}',
  year int,
  project_status text default 'Completed',
  featured_image_url text,
  additional_images text[] not null default '{}',
  pdf_url text,
  external_link text,
  tags text[] not null default '{}',
  is_featured boolean not null default false,
  visibility text not null default 'public' check (visibility in ('public','private')),
  is_published boolean not null default true, -- draft/published
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- REVIEWS
-- ----------------------------------------------------------------------------
create table if not exists reviews (
  id uuid primary key default uuid_generate_v4(),
  reviewer_name text not null,
  profession text,
  research_field text,
  rating int not null check (rating between 1 and 5),
  review_text text not null,
  permission_to_publish boolean not null default false,
  display_preference text not null default 'first_name'
     check (display_preference in ('full_name','first_name','initials','anonymous')),
  status text not null default 'pending' check (status in ('pending','approved','rejected','hidden')),
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- PUBLICATIONS
-- ----------------------------------------------------------------------------
create table if not exists publications (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  authors text not null,
  journal text,
  year int,
  doi text,
  url text,
  research_field text,
  summary text,
  image_url text,
  is_featured boolean not null default false,
  is_published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- CLIENTS  (each client may optionally have a linked auth account for the portal)
-- ----------------------------------------------------------------------------
create table if not exists clients (
  id uuid primary key default uuid_generate_v4(),
  auth_user_id uuid unique references auth.users(id) on delete set null,
  full_name text not null,
  email text not null,
  phone text,
  research_field text,
  notes text,
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- PROJECTS  (internal work tracked per client; drives the client portal)
-- ----------------------------------------------------------------------------
create table if not exists projects (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references clients(id) on delete cascade,
  title text not null,
  research_field text,
  study_design text,
  service_type text,
  start_date date,
  deadline date,
  status text not null default 'Consultation' check (status in (
    'Consultation','Planning','Protocol','Literature Review','Data Analysis',
    'Writing','Revision','Finalization','Completed'
  )),
  progress_percent int not null default 0 check (progress_percent between 0 and 100),
  description text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- PROJECT FILES  (delivered files + client-uploaded requirement files)
-- ----------------------------------------------------------------------------
create table if not exists project_files (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid not null references projects(id) on delete cascade,
  file_name text not null,
  file_url text not null,
  uploaded_by text not null default 'admin' check (uploaded_by in ('admin','client')),
  file_type text default 'delivered' check (file_type in ('delivered','requirement','revision')),
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- PROJECT MESSAGES / NOTES  (simple thread visible to client + admin)
-- ----------------------------------------------------------------------------
create table if not exists project_messages (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid not null references projects(id) on delete cascade,
  sender text not null check (sender in ('admin','client')),
  message text not null,
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- CONTACT / CONSULTATION REQUESTS
-- ----------------------------------------------------------------------------
create table if not exists contact_requests (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  whatsapp text,
  research_field text,
  service_required text,
  project_description text,
  preferred_contact_method text,
  status text not null default 'new' check (status in ('new','contacted','converted','archived')),
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- MEDIA LIBRARY  (metadata for files uploaded to Supabase Storage)
-- ----------------------------------------------------------------------------
create table if not exists media_files (
  id uuid primary key default uuid_generate_v4(),
  file_name text not null,
  file_url text not null,
  file_type text, -- image/pdf
  size_bytes bigint,
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- Seed the single-row tables so they always exist
-- ----------------------------------------------------------------------------
insert into profile (id) values (1) on conflict (id) do nothing;
insert into site_settings (id) values (1) on conflict (id) do nothing;

-- ----------------------------------------------------------------------------
-- updated_at triggers
-- ----------------------------------------------------------------------------
create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_services_updated on services;
create trigger trg_services_updated before update on services
  for each row execute function set_updated_at();

drop trigger if exists trg_portfolio_updated on portfolio_projects;
create trigger trg_portfolio_updated before update on portfolio_projects
  for each row execute function set_updated_at();

drop trigger if exists trg_projects_updated on projects;
create trigger trg_projects_updated before update on projects
  for each row execute function set_updated_at();
