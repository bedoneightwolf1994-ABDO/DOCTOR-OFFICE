-- ============================================================================
-- SAMPLE / PLACEHOLDER DATA
-- Everything here is clearly fake so you can see the system working.
-- Replace or delete all of it from the Admin Dashboard — no code editing needed.
-- Run this AFTER schema.sql and policies.sql (optional — the site works with
-- zero data too, it will just show empty states).
-- ============================================================================

-- Sample profile content (edit for real in Admin > Profile)
update profile set
  full_name = 'Dr. Abdelrahman Ahmed',
  professional_title = 'Scientific Research & Academic Consultant',
  biography = '[SAMPLE TEXT — replace in Admin > Profile] This is placeholder biography text describing academic background, research philosophy, and consulting approach. Replace with your real biography.',
  qualifications = array['[SAMPLE] PhD in Sample Field — Sample University', '[SAMPLE] MSc in Sample Field — Sample University'],
  specializations = array['[SAMPLE] Systematic Reviews', '[SAMPLE] Statistical Analysis', '[SAMPLE] Manuscript Writing'],
  research_interests = array['[SAMPLE] Clinical Research Methods', '[SAMPLE] Epidemiology'],
  experience_years = 8,
  achievements = array['[SAMPLE] Achievement placeholder one', '[SAMPLE] Achievement placeholder two'],
  email = 'sample@example.com',
  phone = '+00 000 000 0000',
  whatsapp = '+00 000 000 0000'
where id = 1;

update site_settings set
  homepage_headline = '[SAMPLE] Rigorous Scientific Research. Trusted Academic Guidance.',
  homepage_description = '[SAMPLE] Replace this homepage description in Admin > Website Settings.',
  contact_email = 'sample@example.com',
  contact_phone = '+00 000 000 0000',
  whatsapp_number = '+00 000 000 0000',
  stat_clients_served = 0,
  stat_projects_completed = 0,
  stat_publications = 0,
  stat_years_experience = 0
where id = 1;

-- Sample services
insert into services (title, slug, short_description, full_description, features, price_label, icon, is_featured, is_published, sort_order) values
('[SAMPLE] Research Protocol Writing', 'research-protocol-writing', 'Sample short description for this service.', 'Sample full description explaining the service in detail. Replace in Admin > Services.', array['Sample feature one','Sample feature two','Sample feature three'], 'Starting at $XXX', 'FileText', true, true, 1),
('[SAMPLE] Systematic Review', 'systematic-review', 'Sample short description for this service.', 'Sample full description explaining the service in detail.', array['PRISMA-compliant','Sample feature two'], 'Starting at $XXX', 'Search', true, true, 2),
('[SAMPLE] Statistical Analysis', 'statistical-analysis', 'Sample short description for this service.', 'Sample full description.', array['SPSS / R / Python', 'Sample feature two'], 'Starting at $XXX', 'BarChart3', false, true, 3),
('[SAMPLE] Scientific Manuscript Writing', 'scientific-manuscript-writing', 'Sample short description.', 'Sample full description.', array['Journal formatting', 'Sample feature two'], 'Starting at $XXX', 'PenTool', false, true, 4);

-- Sample portfolio
insert into portfolio_projects (title, slug, category, research_field, description, services_provided, year, project_status, tags, is_featured, visibility, is_published, sort_order) values
('[SAMPLE] Placeholder Portfolio Project One', 'placeholder-project-one', 'Systematic Review', 'Sample Field', 'Sample description of this portfolio project. Replace with real work in Admin > Portfolio.', array['Systematic Review','Statistical Analysis'], 2025, 'Completed', array['sample','placeholder'], true, 'public', true, 1),
('[SAMPLE] Placeholder Portfolio Project Two', 'placeholder-project-two', 'Manuscript Writing', 'Sample Field', 'Sample description of this portfolio project.', array['Manuscript Writing'], 2024, 'Completed', array['sample'], false, 'public', true, 2),
('[SAMPLE] Confidential Placeholder Project', 'placeholder-project-private', 'Data Analysis', 'Sample Field', 'This one demonstrates the PRIVATE visibility setting — it will never show on the public site.', array['Data Analysis'], 2024, 'Completed', array['sample'], false, 'private', true, 3);

-- Sample reviews (one approved, one pending, to demonstrate the workflow)
insert into reviews (reviewer_name, profession, research_field, rating, review_text, permission_to_publish, display_preference, status) values
('[SAMPLE] Jane Placeholder', 'PhD Candidate', 'Sample Field', 5, '[SAMPLE REVIEW TEXT] Replace or delete this in Admin > Reviews.', true, 'first_name', 'approved'),
('[SAMPLE] John Placeholder', 'Masters Student', 'Sample Field', 4, '[SAMPLE REVIEW TEXT — currently PENDING approval, demonstrating the moderation queue.]', true, 'initials', 'pending');

-- Sample publication
insert into publications (title, authors, journal, year, doi, research_field, summary, is_featured, is_published, sort_order) values
('[SAMPLE] Placeholder Publication Title', '[SAMPLE] A. Author, B. Author', '[SAMPLE] Journal of Sample Studies', 2024, '10.0000/sample.doi', 'Sample Field', '[SAMPLE] Replace with a real abstract/summary in Admin > Publications.', true, true, 1);

-- Sample client + project (for demonstrating the Client Portal)
insert into clients (full_name, email, phone, research_field, notes) values
('[SAMPLE] Client Placeholder', 'sample.client@example.com', '+00 000 000 0000', 'Sample Field', '[SAMPLE] This is placeholder client data — delete in Admin > Clients.');

insert into projects (client_id, title, research_field, study_design, service_type, start_date, deadline, status, progress_percent, description, notes)
select id, '[SAMPLE] Placeholder Thesis Support Project', 'Sample Field', 'Cross-sectional', 'Thesis Support', current_date, current_date + interval '30 days', 'Data Analysis', 45, '[SAMPLE] Placeholder project description.', '[SAMPLE] Placeholder notes.'
from clients where email = 'sample.client@example.com';

-- Sample contact request
insert into contact_requests (name, email, whatsapp, research_field, service_required, project_description, preferred_contact_method, status) values
('[SAMPLE] Prospective Client', 'prospect@example.com', '+00 000 000 0000', 'Sample Field', 'Systematic Review', '[SAMPLE] Placeholder inquiry text.', 'WhatsApp', 'new');
