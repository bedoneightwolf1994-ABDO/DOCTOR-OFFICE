-- ============================================================================
-- STORAGE BUCKETS
-- You can create these visually in Supabase Dashboard > Storage > New Bucket,
-- OR run this SQL. Two buckets: "media" (public — images/PDFs shown on the
-- public site) and "client-files" (private — project deliverables).
-- ============================================================================

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('client-files', 'client-files', false)
on conflict (id) do nothing;

-- Public bucket: anyone can view files, only admins can upload/delete
create policy "public can view media" on storage.objects
  for select using (bucket_id = 'media');

create policy "admin can upload media" on storage.objects
  for insert with check (bucket_id = 'media' and is_admin());

create policy "admin can update media" on storage.objects
  for update using (bucket_id = 'media' and is_admin());

create policy "admin can delete media" on storage.objects
  for delete using (bucket_id = 'media' and is_admin());

-- Private client-files bucket: admins have full access
create policy "admin full access client-files" on storage.objects
  for all using (bucket_id = 'client-files' and is_admin())
  with check (bucket_id = 'client-files' and is_admin());

-- Clients can view files that belong to their own project
-- (file path convention: client-files/{project_id}/{filename})
create policy "client can view own project files" on storage.objects
  for select using (
    bucket_id = 'client-files'
    and (storage.foldername(name))[1] in (
      select p.id::text from projects p
      join clients c on c.id = p.client_id
      where c.auth_user_id = auth.uid()
    )
  );

create policy "client can upload to own project" on storage.objects
  for insert with check (
    bucket_id = 'client-files'
    and (storage.foldername(name))[1] in (
      select p.id::text from projects p
      join clients c on c.id = p.client_id
      where c.auth_user_id = auth.uid()
    )
  );
