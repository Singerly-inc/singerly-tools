# Production Auth Health Check

`Production auth health` runs on pushes, pull requests, a daily schedule, and manual dispatch.

It fails when:

- `https://singerly-tools.vercel.app` is unavailable.
- production HTML contains `localhost`.
- `supabase-config.js` points to the wrong Supabase project.
- `SUPABASE_URL` or `SUPABASE_ANON_KEY` is empty in production.
- Supabase Auth is unavailable or email auth is disabled.
- Supabase Auth Site URL is not `https://singerly-tools.vercel.app`.
- Supabase Auth Site URL or Redirect URLs contain `localhost`.

## Required GitHub Secret

Add this repository secret:

- `SUPABASE_ACCESS_TOKEN`

The token is required so CI can verify Supabase Dashboard Auth URL Configuration, including Site URL and Redirect URLs.

Without this secret, the workflow fails instead of giving a false green check.
