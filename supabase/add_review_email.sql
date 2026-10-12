-- Private storage for the email address given with a review.
-- Only admins can read it; it is never exposed on the public site.
create table if not exists review_contacts (
  review_id uuid primary key references reviews(id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);
alter table review_contacts enable row level security;
drop policy if exists "admin full access review_contacts" on review_contacts;
create policy "admin full access review_contacts" on review_contacts
  for all using (is_admin()) with check (is_admin());
