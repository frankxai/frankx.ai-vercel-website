# E2E tests — intake & private engagement flows

Playwright tests covering the single front door (`/contact`) and the Strategic
Advisor private door (`/engagements/strategic-advisor`).

## What's covered

- `/contact` happy path: load → intent select → fill → submit → success state
- Success state shows the intent-specific 24-hour artifact and a calendar CTA
- `?intent=...` deep-link pre-selects the matching pill
- Garbage `?intent=` falls back to `general`
- Client-side email validation catches typos before the API is called
- Server errors surface a recovery email (`frank@frankx.ai`)
- Live character counter on the message field
- Mobile viewport (360×780): inputs ≥44px tall, font-size ≥16px, full-width submit
- Strategic Advisor: passcode gate blocks public; private copy never leaks
- Strategic Advisor error path; mobile touch target on the submit

The intake and private-access API endpoints are **mocked** via `page.route`, so
the tests don't depend on Resend / Notion / Slack / `PRIVATE_ACCESS_PASSCODE`
being configured locally.

## Run

```bash
# Auto-launches `next dev` per playwright.config.ts
npm run test:e2e

# Headed (watch the browser)
npm run test:e2e:headed

# UI mode (Playwright trace viewer)
npm run test:e2e:ui

# Single browser
npx playwright test --project=chromium
```

## Browsers

`playwright.config.ts` runs Chromium by default. Firefox and WebKit are only
added to the project matrix when `PLAYWRIGHT_FULL_MATRIX` is set. In the
remote execution env, Chromium falls back to `/opt/pw-browsers/chromium`;
locally override that with `PLAYWRIGHT_CHROMIUM_PATH=/path/to/chromium`.

## Add a flow

Drop a new `*.spec.ts` in this directory. Keep tests independent (no shared
state between specs) and prefer mocking API endpoints over real network calls.

## Why this exists

The intake pipeline (`lib/contact-intake.ts`) routes to five sinks, and the
success contract — "ack named the 24-hour artifact" — is the single most
important UX move per `docs/strategy/PREMIUM_OPERATIONS.md`. These tests are
the regression guard against any of those promises silently breaking.
