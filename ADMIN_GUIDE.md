# Admin User Guide

This is your day-to-day guide to running the website from `/admin`. No
coding is ever required for anything described here.

## Logging in

Go to `yourdomain.com/admin/login` and sign in with your admin email/password
(created during deployment — see DEPLOYMENT.md step 7).

## Dashboard Overview

Your homepage after login. Shows live counts: total clients, active/completed
projects, pending reviews, average rating, and new contact requests — all
calculated automatically from your real data, never hard-coded. Quick-action
buttons jump straight to the most common tasks.

## Clients

- **+ Add Client** — enter their details. Optionally check "Create Client
  Portal login" and set a temporary password if you want them to be able to
  log into `/client` and track their project. Give them that email/password
  separately (e.g. by email) — they can change it later if you add a
  password-reset flow.
- **View Profile** — opens the client's page showing all their projects and
  lets you edit their details or add a new project for them directly.
- **Search** — the search box filters by name, email, or research field instantly.
- **Delete** — always asks for confirmation first.

## Projects

- **+ Add Project** — assign a project to an existing client with all the
  research details (field, study design, service type, dates).
- **Status dropdown** — change status right from the list; the client sees
  the update in their portal immediately, no extra step needed.
- **Progress slider** — drag to set completion percentage; also reflected
  instantly in the client portal's progress bar.
- **Manage →** — opens the full project page where you can:
  - Edit all project details
  - Upload/attach delivered files (visible to the client instantly)
  - Send messages/notes to the client and read their replies

## Portfolio

- **+ Add Portfolio Project** — fill in the details, upload a featured image
  (drag a file in — it's stored securely and a link is generated automatically),
  optionally attach a PDF, add tags.
- **Visibility toggle (Public/Private)** — click directly on the badge in the
  list to flip it. **Private** projects are never shown on the public site or
  API — this is enforced by the database itself, not just hidden in the UI.
- **Published/Draft toggle** — same idea; draft items stay invisible to
  visitors until you're ready.
- New/updated/deleted items appear on `yourdomain.com/portfolio` immediately.

## Reviews

- New reviews submitted through the public Reviews page start as **Pending**
  and appear at the top of this page for your approval.
- **Approve / Reject / Hide / Edit / Delete** — one click each, with delete
  requiring confirmation.
- The average rating, total review count, and 5-star percentage shown here
  and on the public Reviews page are always calculated live — never edit
  these numbers manually, they update themselves.
- Each review shows how the reviewer's name will display (full name / first
  name / initials / anonymous) — this was chosen by the reviewer when they
  submitted it, and is respected everywhere it's shown publicly.

## Services

- **+ Add Service** — title, description, comma-separated feature list,
  price label (can be a fixed price or something like "Custom Quote"), and
  an icon.
- **Featured** — highlights the service; **Published** toggle hides/shows it
  on the public Services page without deleting it.

## Publications

- **+ Add Publication** — title, authors, journal, year, DOI, link, and an
  optional cover image. Use this to add future publications as they come out.

## Profile

- Everything here (biography, qualifications, specializations, research
  interests, achievements, photo, contact info, social links) feeds directly
  into your public **Home** and **About** pages. Save once, both pages update.

## Website Settings

- **General**: site title, logo, favicon.
- **Contact Information**: shown in the footer and Contact page.
- **Social Media**: links shown in the footer.
- **Homepage Content**: the big headline/description/CTA button text visitors
  see first.
- **Homepage Statistics**: the four numbers shown on your homepage (clients
  served, projects completed, publications, years of experience) — these are
  plain numbers you set yourself; update them periodically as milestones happen.

## Media / Files

A simple file library. Upload once, then copy the link to reuse anywhere
(portfolio images, publication covers, your profile photo). Supports JPG,
PNG, WEBP, and PDF. Delete files you no longer need.

## Contact Requests

Every submission from the public Contact form lands here.
- **Search** by name, email, or requested service.
- **Status dropdown**: New → Contacted → Converted (or Archived) — track your
  sales pipeline right here.
- **Delete** removes spam or irrelevant requests.

## A note on privacy & security

- Clients can only ever see their **own** project, files, and messages —
  this is enforced by database security rules (Row Level Security), so it
  holds true even if there were a bug in the website code.
- Private portfolio projects and pending/rejected reviews are never exposed
  through the public website, no matter how someone tries to access them.
- Never share your `service_role` key (from Supabase) with anyone — it
  bypasses all these protections and is only meant to live in Vercel's
  environment variables.
