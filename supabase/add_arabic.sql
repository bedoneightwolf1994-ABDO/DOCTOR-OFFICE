-- Adds optional Arabic versions of every public text field.
-- Safe to run more than once. Run in Supabase > SQL Editor.
alter table site_settings add column if not exists homepage_headline_ar text;
alter table site_settings add column if not exists homepage_description_ar text;
alter table site_settings add column if not exists cta_text_ar text;
alter table site_settings add column if not exists footer_text_ar text;

alter table profile add column if not exists professional_title_ar text;
alter table profile add column if not exists biography_ar text;
alter table profile add column if not exists qualifications_ar text[] not null default '{}';
alter table profile add column if not exists specializations_ar text[] not null default '{}';
alter table profile add column if not exists research_interests_ar text[] not null default '{}';
alter table profile add column if not exists achievements_ar text[] not null default '{}';

alter table services add column if not exists title_ar text;
alter table services add column if not exists short_description_ar text;
alter table services add column if not exists full_description_ar text;
alter table services add column if not exists features_ar text[] not null default '{}';
alter table services add column if not exists price_label_ar text;

alter table portfolio_projects add column if not exists title_ar text;
alter table portfolio_projects add column if not exists category_ar text;
alter table portfolio_projects add column if not exists research_field_ar text;
alter table portfolio_projects add column if not exists description_ar text;
alter table portfolio_projects add column if not exists services_provided_ar text[] not null default '{}';

alter table publications add column if not exists title_ar text;
alter table publications add column if not exists journal_ar text;
alter table publications add column if not exists research_field_ar text;
alter table publications add column if not exists summary_ar text;
