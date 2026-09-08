-- ============================================================================
-- ADD-ON: WhatsApp floating button + Instapay payment link
-- Run this in Supabase SQL Editor (New query) AFTER your existing setup.
-- Safe to run even if columns already exist (uses IF NOT EXISTS).
-- ============================================================================

alter table site_settings add column if not exists instapay_url text;
alter table site_settings add column if not exists whatsapp_button_enabled boolean not null default true;
alter table site_settings add column if not exists whatsapp_default_message text not null default 'Hello, I would like to inquire about your research services.';
