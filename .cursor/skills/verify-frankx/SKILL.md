---
name: verify-frankx
description: Verify the frankx.ai Next.js public website (local `next start` or https://www.frankx.ai) by launching a production build, doctoring the instance, driving mapped user journeys with Python Playwright and system Chrome, and writing screenshots plus JSON evidence. Use when checking the golden-age chapter TOC, prompt library cards, /blueprints, legal typography, the homepage, or before merging UI work that touches those surfaces.
---

# Verify frankx.ai

This skill is for agents driving the public frankx.ai website the way a visitor would. The surface is the Next.js App Router site in this repo. Other surfaces (admin, APIs, CLI scripts) exist; do not treat them as the primary path here.

The maintained journey map is in [features/](features/README.md). Drive from that map. The executable helper is `scripts/verify/run-journey.py`.

Standing rule: never mint a Vercel OIDC token, never use a bypass secret, and never try to get past preview Deployment Protection. Verify on local `next start` before merge, and on production (`https://www.frankx.ai`) after deploy.

## Launch

The local verification instance is a production build served by `next start`, not `next dev`.

1. From the repo root, pick a free port (default `3107`). Two instances can run side by side if they use different ports. PID files are per-port under `.verify-run/`.
2. Install dependencies if needed: `pnpm install --frozen-lockfile`.
3. Build from a checkout that matches the SHA you intend to verify:

```bash
NEXT_TELEMETRY_DISABLED=1 NEXT_PUBLIC_SITE_URL=http://127.0.0.1:3107 pnpm run build
```

On Windows PowerShell:

```powershell
$env:NEXT_TELEMETRY_DISABLED='1'
$env:NEXT_PUBLIC_SITE_URL='http://127.0.0.1:3107'
pnpm run build
```

4. Immediately after a successful build, record the mapping from Next's `.next/BUILD_ID` to `git rev-parse HEAD` in `.verify-run/build-meta.json`. This is how Doctor later confirms the server is still the build we made. Do **not** add a public SHA endpoint.
5. Start only on localhost:

```bash
NEXT_TELEMETRY_DISABLED=1 pnpm exec next start -H 127.0.0.1 -p 3107
```

Record the launch PID (and, once the port is listening, the PID that owns that port) in `.verify-run/next-start-<port>.json`. Also record the build id and git SHA. Keep the server log at `.verify-run/next-start-<port>.log`.

6. **Ready** means an HTTP 200 from `http://127.0.0.1:<port>/legal/privacy` whose body contains both `Privacy Policy` and `Frank Riemer`. The port answering is not enough. Do not use a golden-age chapter as the ready probe: `ChapterReader` is loaded with `dynamic(..., { ssr: false })`, so the first HTML is a placeholder until the client hydrates.

The helper does steps 3–6:

```bash
python scripts/verify/run-journey.py --journey golden-age --target local --port 3107
```

If a doctor-clean instance is already running on that port for this SHA, the helper reuses it instead of rebuilding.

### Local env (no secrets)

A local production build does not need API keys, KV, auth secrets, or a `.env.local`. The helper sets only:

- `NEXT_TELEMETRY_DISABLED=1`
- `NEXT_PUBLIC_SITE_URL=http://127.0.0.1:<port>`

Leave Stripe, Resend, NextAuth, KV/Redis, Blob, Lemon Squeezy, Notion, Slack, Postiz, GitHub, GA4, and Datadog RUM unset. A leftover `.env.local` in the checkout would be picked up by Next automatically; this worktree should not have one, and you must not copy secrets in to make a journey pass.

Features that degrade without those values (the public pages below should still render):

- Newsletter signup and transactional email (Resend / ConvertKit).
- Checkout and webhooks (Stripe, Lemon Squeezy). Viewing `/blueprints` cards still works; completing a purchase will not.
- Admin, dashboard, and data-room routes (NextAuth, `ADMIN_*`, KV, Blob).
- KV-backed rate limits and persistent analytics counters.
- Datadog RUM and GA4 admin summaries.
- `/prompt-library` live GitHub corpus. Unauthenticated fetches are rate-limited; the page may show "Live data unavailable" and an empty grid. That is a journey failure with a stated reason, not a skip.

`NODE_ENV` is set to `production` by `next start`. Do not set it yourself during the build in a way that conflicts with `next build`.

## Doctor

A read-only check. Run it first whenever anything looks off. The helper also runs it before driving a `--target local` instance.

```bash
python scripts/verify/run-journey.py --doctor --target local --port 3107
```

Local doctor must confirm all of:

- The PID file for this port exists and the recorded launch PID is still running.
- The recorded port is in a listen state and is owned by that PID or by one of its descendants. Never assume "some node process is on 3107" is good enough.
- `.next/BUILD_ID` still matches `.verify-run/build-meta.json`, and that file's `gitSha` matches `git rev-parse HEAD`.
- The ready probe still returns HTTP 200 with `Privacy Policy` and `Frank Riemer`.

Production doctor (`--target prod`) only checks that `https://www.frankx.ai/legal/privacy` returns HTTP 200 with the same two strings. It cannot confirm a build SHA: there is no public SHA endpoint, and this skill does not add one.

Refuse to drive a local instance you did not start, unless `--target local` found a doctor-clean PID file for this port and SHA (reuse). Do not attach to a random dev server.

## Drive

Use the existing Python Playwright install with system Chrome (`channel="chrome"`), not a bundled Chromium, and not Puppeteer (which this repo also depends on for other scripts). Prefer stable handles from this codebase: route paths, `id`, ARIA names and roles, and visible heading text.

Important handles:

- Golden-age chapter: `/golden-age/chapter-01-when-creation-calls` and `/golden-age/chapter-02-the-orchestration-age`. The chapter title is an `h1` (wait for the exact name; a markdown `CHAPTER 1: …` heading also exists). The TOC lives in `aside#toc-panel` (`role="navigation"`, `aria-label="Table of contents"`). ChapterReader mounts **two** copies (`variant="desktop"` in a `hidden lg:block` wrapper and `variant="mobile"` in an `lg:hidden` wrapper), so always target the visible `#toc-panel` and the visible `button[aria-label="Toggle table of contents"]`. Tailwind `lg` is `min-width: 1024px`, so 1280 and 1024 are desktop (panel visible and focusable, no `inert` / `aria-hidden`, toggle hidden) and 375 is mobile (toggle visible; closed panel fully off-screen with `translate-x-[calc(100%+1.5rem)]`, `inert` and `aria-hidden` only while closed). `extractChapterToc` skips bare numerals when a chapter also has titled headings (chapter 1 starts at `II. The History You Carry`) and labels numerals-only chapters `Section I`–`Section VIII`. Jump ids stay derived from the original heading (`#ii-the-history-you-carry`). The chapter body hydrates client-side; wait for the `h1`, not the first 200.
- Prompt library: `/prompt-library` with `h1` "The Prompt Library" and search input `#prompt-search`. Cards link to `/prompt-library/<id>`. The older `/prompts` heading is "Prompt Library". `components/prompt-library/PromptCard.tsx` has a `Copy Prompt` button.
- Blueprints: `/blueprints`, `h1` "Architecture blueprints for …", grid `#blueprint-cards`. Card CTAs are buttons that open a checkout modal. Do not complete a payment.
- Legal: `/legal/privacy` (also `/legal/terms`, `/legal/imprint`, `/legal/refund`). The policy article is `article.prose.prose-invert.prose-zinc` with `h1` "Privacy Policy".
- Homepage: `/`. The hero `h1` has `aria-label="Build intelligence that compounds."`. The primary CTA is the link "Inspect the Blueprints" to `/ai-architecture`. The secondary CTA is "Map the Ecosystem" to `/ecosystem`.

Named journeys are listed in [features/README.md](features/README.md). Run one:

```bash
python scripts/verify/run-journey.py --journey golden-age --target local
python scripts/verify/run-journey.py --journey golden-age --target prod
```

`--target prod` is read-only: no form submits, no checkout, no writes.

## Evidence

Proof standards:

- Exercise the real user path (open the route, click the control the visitor uses). Do not call internal setters or test-only endpoints.
- Capture the action and the resulting state, not only the final screen (for example: TOC closed, then toggle, then open panel; TOC click, then the heading in view).
- Verify visible side effects (scroll target, clipboard, overflow) alongside the screenshot.
- Do not mock the site. External checkout and email providers are a production boundary: assert the public UI, not a completed payment.

Capture screenshots and a `measurements.json` at **1280**, **1024**, and **375**. Write them to a directory that survives cleanup:

- Default: `.verify-evidence/<YYYY-MM-DD>-<gitSha>/` at the repo root, which is gitignored and is outside `.next`.
- Override with `--evidence-dir` or `VERIFY_EVIDENCE_DIR`.

Date is Europe/Amsterdam. Each run also writes `summary.json` (pass/fail, doctor result, URLs, SHA, build id, viewport measurements). Cleanup must not delete this tree.

## Cleanup

```bash
python scripts/verify/run-journey.py --cleanup --target local --port 3107
```

Kill only the PIDs recorded in that port's PID file (the launch PID and, if different, the port-owner PID). On Windows this uses `taskkill /PID <pid> /T` so descendants of **that** PID are included. On POSIX it signals the process group started at launch. Never kill by process name (`node`, `next`, `chrome`). Leave `.verify-evidence/` in place. `--target prod` has nothing to tear down.

After every failed iteration, run cleanup so a broken attempt does not keep the port.

## Helpers

`scripts/verify/run-journey.py` is the one executable. From the repo root:

```bash
# Launch (or reuse a doctor-clean instance), doctor, drive, write evidence, cleanup
python scripts/verify/run-journey.py --journey golden-age --target local --port 3107

# Read-only against production
python scripts/verify/run-journey.py --journey golden-age --target prod

# Read-only instance check
python scripts/verify/run-journey.py --doctor --target local --port 3107

# Tear down only the PIDs we started on that port
python scripts/verify/run-journey.py --cleanup --target local --port 3107
```

Useful flags: `--port`, `--evidence-dir`, `--rebuild` (force a new production build), `--keep-server` (skip cleanup so a later journey can reuse the instance). Journeys: `golden-age`, `prompt-library`, `blueprints`, `legal-prose`, `homepage`.

As the app changes, update the feature map with `/maintain-verification-skill`.
