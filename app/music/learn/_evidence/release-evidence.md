# FrankX Music Learning — Release Evidence

Date: 2026-07-10
Branch: `codex/frankx-music-learning-canonical-v3-20260710`

## Source and claim gates

- Contract tests: 5/5 pass (`node --test tests/music-learning-contract.test.mjs`).
- Scoped ESLint: pass (`app/music/learn/**/*.{ts,tsx}`).
- Full TypeScript: pass.
- Strict marketing-claims audit: pass; no high-risk patterns in scoped files.
- Design evidence schema: pass.
- Git diff whitespace check: pass.
- Whole-repo strict AI-slop audit: 97 pre-existing findings outside `app/music/learn`; no scoped finding introduced.

## Production build

- Next.js 16.2.6 / Turbopack compilation: pass in 92 seconds.
- TypeScript build phase: pass in 2.2 minutes.
- Static generation: 1,548/1,548 pages pass in 3.0 minutes.
- All nine learning URLs are present in the route manifest.

## Browser QA

Inspected local production output with system Chrome:

- Hub: 1440×900, 390×844, 640×900 reflow, and reduced-motion variants.
- Science: 1440×900 and 390×844, including the frequency-claim boundary state.
- Twelve screenshots: first viewport and primary state for each route/viewport combination.
- No horizontal overflow, clipped H1, running page animation, or page JavaScript error.
- Visible keyboard focus across global navigation and learning CTAs.
- Primary CTA navigates to `/music/learn/theory` and renders `Music Theory`.
- Local console notes: `/api/auth/session` returns 500 without local Auth configuration; Vercel Analytics and Speed Insights scripts return 404 outside Vercel. These are global environment requests, not changed-route runtime defects, and must be rechecked on the Vercel preview.

Screenshot evidence remains outside the tracked tree at:
`C:\Users\frank\AppData\Local\Temp\fxm-music-proof`

## Premium score

28/30 — ship to draft preview.

- First read and hierarchy: 5/5.
- Brand fit and distinctiveness: 5/5.
- Craft, type, spacing, composition: 5/5.
- Accessibility, responsiveness, reduced motion: 5/5.
- Factual accuracy and provenance: 4/5; external sources can change.
- Intended-surface usefulness: 4/5; legacy subroutes retain mixed visual systems.

## Remaining gates

- No merge, production promotion, domain, DNS, pricing, payment, distribution, or child-intake action is authorized.
- Preview must retain 200 responses and resolve the local-only global auth/telemetry noise before human review.
