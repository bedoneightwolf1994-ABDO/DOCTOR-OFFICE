# Deployment Guide (Beginner-Friendly)

Follow these steps in order. No coding required — just copying and pasting.
Total time: about 30–45 minutes the first time.

---

## 1. Create your Supabase project

1. Go to https://supabase.com and sign up / log in.
2. Click **New Project**.
3. Choose an organization, name the project (e.g. `dr-abdelrahman-research`),
   set a strong database password (save it somewhere safe), pick a region
   close to your clients, and click **Create new project**. Wait ~2 minutes
   while it provisions.

## 2. Create the database (run the schema)

1. In your Supabase project, open the left sidebar → **SQL Editor**.
2. Click **New query**.
3. Open `supabase/schema.sql` from this project, copy its entire contents,
   paste into the SQL editor, and click **Run**. You should see "Success. No rows returned."
4. Repeat the same steps for `supabase/policies.sql` (creates the security rules).
5. Repeat the same steps for `supabase/storage.sql` (creates the file storage buckets).
6. (Optional but recommended for your first look) Repeat for `supabase/seed.sql`
   to load sample placeholder data so you can see the system working immediately.

## 3. Configure authentication

1. In Supabase, go to **Authentication → Providers**. Email/Password is
   enabled by default — that's all you need.
2. Go to **Authentication → URL Configuration** and set:
   - **Site URL**: your future live domain, e.g. `https://your-domain.com`
     (you can update this later once you know your Vercel URL)
3. That's it — no further auth configuration needed. Admin and Client accounts
   both use this same email/password system; what makes someone an "admin" or
   a "client" is simply whether their account has a matching row in the
   `admins` or `clients` table (see step 6 and the Admin Guide for adding clients).

## 4. Create storage buckets

Already done in step 2 via `storage.sql` — you can double check under
**Storage** in the sidebar: you should see a `media` bucket (public) and a
`client-files` bucket (private).

## 5. Get your API keys

1. Go to **Project Settings → API**.
2. Copy these three values — you'll need them in the next step:
   - **Project URL** → this is `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → this is `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key (click "Reveal") → this is `SUPABASE_SERVICE_ROLE_KEY`
     — keep this one secret, never share it or put it in the browser.

## 6. Deploy to Vercel

1. Push this project folder to a GitHub repository (create a new repo on
   GitHub, then follow GitHub's "push an existing folder" instructions —
   or use GitHub Desktop if you prefer a visual tool).
2. Go to https://vercel.com, sign up / log in, click **Add New → Project**,
   and import your GitHub repository.
3. In the **Environment Variables** section during setup, add:
   - `NEXT_PUBLIC_SUPABASE_URL` = (from step 5)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (from step 5)
   - `SUPABASE_SERVICE_ROLE_KEY` = (from step 5)
   - `NEXT_PUBLIC_SITE_URL` = your Vercel URL once known (e.g. `https://your-project.vercel.app`)
4. Click **Deploy**. Wait a couple of minutes — you'll get a live URL like
   `https://your-project.vercel.app`.
5. Go back to Supabase → **Authentication → URL Configuration** and update
   the **Site URL** to this real Vercel URL.

## 7. Create your admin account

1. In Supabase, go to **Authentication → Users → Add user → Create new user**.
   Enter your email and a strong password. Leave "Auto Confirm User" checked.
2. Go back to **SQL Editor → New query** and run (replace the email with yours):

```sql
insert into admins (auth_user_id, full_name)
select id, 'Dr. Abdelrahman Ahmed'
from auth.users
where email = 'your-real-email@example.com';
```

3. Visit `https://your-project.vercel.app/admin/login` and sign in with that
   email and password. You now have full access to the dashboard.

## 8. Replace the sample data

Log into the dashboard and, section by section, replace everything marked
`[SAMPLE]`:
- **Profile** → your real bio, qualifications, photo
- **Website Settings** → your real contact info, homepage text, statistics
- **Services / Portfolio / Publications** → delete the sample entries, add your real ones
- **Reviews / Clients / Projects** → delete the sample rows

See **ADMIN_GUIDE.md** for details on every section.

## 9. Updating the website after deployment

This is the whole point of the system: **you never need to redeploy code to
update content.** Every change you make in `/admin` (adding a portfolio item,
approving a review, editing your bio, changing a price) is saved straight to
the database and appears on the live site immediately.

You (or a developer) would only need to redeploy code if you wanted to change
the site's actual design/layout — for that, update the code, push to GitHub,
and Vercel redeploys automatically.

## Custom domain (optional)

In Vercel, go to your project → **Settings → Domains** → add your domain
(e.g. `drabdelrahman.com`) and follow the DNS instructions shown. Then update
Supabase's **Site URL** to match your final domain.
