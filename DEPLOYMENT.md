# Deploy frankx.ai (Next.js + Vercel)

This repo already contains a working Next.js site with content and a public reading index.

## Quick deploy (Vercel)

- Create a new project at vercel.com and import this repository.
- Build settings: default (framework: Next.js). No custom build command needed.
- Env vars:
  - `NEXT_PUBLIC_SITE_URL` = `https://frankx.ai`
- Domains: add `frankx.ai` in Vercel → Domains → assign to the project.
- DNS: create a CNAME at your registrar pointing `frankx.ai` → `cname.vercel-dns.com` (Vercel shows exact target).
- Production URL: after DNS resolves, the site is live (approx. < 5 min once DNS propagates).

## Reading index online

- The script writes a copy of the interlinked reading site into `public/reading/` so it’s accessible at `/reading/index.html`.
- Regenerate after edits: `npm run gen:html`.

## Optional: CI check

Add a GitHub Action to run `npm ci && npm run type-check && npm run build` on PRs before merging. Vercel will also build each PR automatically once linked.

## Notes

- API routes are used for newsletter endpoint, so static export (GitHub Pages) is not recommended.
- If you must host elsewhere, use a Node environment capable of running Next.js (or Docker with `next start`).

