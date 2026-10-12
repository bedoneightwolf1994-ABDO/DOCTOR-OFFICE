-- Cache for automatic Arabic translation of dashboard content.
-- Run once in Supabase > SQL Editor.
create table if not exists translation_cache (
  hash text not null,
  lang text not null default 'ar',
  source text not null,
  translated text not null,
  created_at timestamptz not null default now(),
  primary key (hash, lang)
);
alter table translation_cache enable row level security;
-- No policies on purpose: only the server (service role key) can read/write it.
