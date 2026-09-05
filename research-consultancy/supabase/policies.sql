-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Run this AFTER schema.sql in the Supabase SQL Editor.
-- ============================================================================

-- Enable RLS on every table
alter table admins enable row level security;
alter table profile enable row level security;
alter table site_settings enable row level security;
alter table services enable row level security;
alter table portfolio_projects enable row level security;
alter table reviews enable row level security;
alter table publications enable row level security;
alter table clients enable row level security;
alter table projects enable row level security;
alter table project_files enable row level security;
alter table project_messages enable row level security;
alter table contact_requests enable row level security;
alter table media_files enable row level security;

-- Helper: is the current logged-in user an admin?
create or replace function is_admin() returns boolean as $$
  select exists (
    select 1 from admins where auth_user_id = auth.uid()
  );
$$ language sql security definer stable;

-- ----------------------------------------------------------------------------
-- PUBLIC READ policies (anonymous visitors) — only published/public content
-- ----------------------------------------------------------------------------
create policy "public read profile" on profile for select using (true);
create policy "public read settings" on site_settings for select using (true);

create policy "public read published services" on services
  for select using (is_published = true);

create policy "public read published public portfolio" on portfolio_projects
  for select using (is_published = true and visibility = 'public');

create policy "public read approved reviews" on reviews
  for select using (status = 'approved');

create policy "public read published publications" on publications
  for select using (is_published = true);

-- Anyone can INSERT a review (goes to "pending") or a contact request
create policy "anyone can submit review" on reviews
  for insert with check (status = 'pending');

create policy "anyone can submit contact request" on contact_requests
  for insert with check (true);

-- ----------------------------------------------------------------------------
-- ADMIN full-access policies (all tables, all operations)
-- ----------------------------------------------------------------------------
create policy "admin full access profile" on profile for all using (is_admin()) with check (is_admin());
create policy "admin full access settings" on site_settings for all using (is_admin()) with check (is_admin());
create policy "admin full access services" on services for all using (is_admin()) with check (is_admin());
create policy "admin full access portfolio" on portfolio_projects for all using (is_admin()) with check (is_admin());
create policy "admin full access reviews" on reviews for all using (is_admin()) with check (is_admin());
create policy "admin full access publications" on publications for all using (is_admin()) with check (is_admin());
create policy "admin full access clients" on clients for all using (is_admin()) with check (is_admin());
create policy "admin full access projects" on projects for all using (is_admin()) with check (is_admin());
create policy "admin full access project_files" on project_files for all using (is_admin()) with check (is_admin());
create policy "admin full access project_messages" on project_messages for all using (is_admin()) with check (is_admin());
create policy "admin full access contact_requests" on contact_requests for all using (is_admin()) with check (is_admin());
create policy "admin full access media" on media_files for all using (is_admin()) with check (is_admin());
create policy "admin read admins" on admins for select using (is_admin());

-- ----------------------------------------------------------------------------
-- CLIENT policies — a client may only ever see rows tied to their own account
-- ----------------------------------------------------------------------------
create policy "client reads own client row" on clients
  for select using (auth_user_id = auth.uid());

create policy "client reads own projects" on projects
  for select using (
    client_id in (select id from clients where auth_user_id = auth.uid())
  );

create policy "client reads own project files" on project_files
  for select using (
    project_id in (
      select p.id from projects p
      join clients c on c.id = p.client_id
      where c.auth_user_id = auth.uid()
    )
  );

create policy "client reads own project messages" on project_messages
  for select using (
    project_id in (
      select p.id from projects p
      join clients c on c.id = p.client_id
      where c.auth_user_id = auth.uid()
    )
  );

create policy "client can send own project messages" on project_messages
  for insert with check (
    sender = 'client' and
    project_id in (
      select p.id from projects p
      join clients c on c.id = p.client_id
      where c.auth_user_id = auth.uid()
    )
  );

create policy "client can upload own requirement files" on project_files
  for insert with check (
    uploaded_by = 'client' and
    project_id in (
      select p.id from projects p
      join clients c on c.id = p.client_id
      where c.auth_user_id = auth.uid()
    )
  );

-- NOTE: Because RLS defaults to "deny", any table/row not matched by a policy
-- above is automatically inaccessible. This means:
--  - Unpublished/private portfolio items never reach the public site.
--  - Pending/rejected reviews never reach the public site.
--  - A client can NEVER query another client's project, files, or messages.
