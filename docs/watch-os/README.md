# Watch OS — What, How, Why

_Version 0.1 — 2026-04-14_
_Owner: Frank Riemer · Status: Live_

---

## The one-sentence framing

**Watch OS is the personal knowledge capture + AI-architect curation layer of FrankX — every video Frank consumes is either compressed into signal for builders or trashed, with every retained signal compounding into SEO/AEO surface area and a productized client template.**

---

## What

A progressively-enhanced video library at `/watch/` with three formats:

| Route | Format | Primary use |
|---|---|---|
| `/watch/` | All videos (long + short + live) | Library index, category rails, search |
| `/watch/shorts/` | 9:16 vertical only | High-signal 60s scroll |
| `/watch/shorts/[id]/` | Per-Short detail page | SEO/AEO citation target |

Each Short carries: verified embed, editorial commentary, transcript slot, VideoObject JSON-LD, and category placement. Long-form video pages follow the same pattern via `VideoLightbox`.

---

## How — the pipeline

```
┌─────────────────────────────────────────────────────────────┐
│  MOBILE CAPTURE                                             │
│  iOS/Android share sheet → Notion "Video Inbox" database    │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  SYNC (hourly GitHub Action)                                │
│  scripts/sync-notion-video-inbox.mjs                        │
│  → appends to data/video-staging.json                       │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  EDITORIAL (Frank, local)                                   │
│  Review staging, add commentary, set format, promote to     │
│  data/video-vault-100.json with `format: "short"` etc.      │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  PUBLISH (auto)                                             │
│  Next.js 16 SSG page → VideoObject + FAQ + Breadcrumb +     │
│  CollectionPage schema → sitemap → OG image → RSS           │
└─────────────────────────────────────────────────────────────┘
```

### Components

- **Data layer:** `data/video-vault-100.json` with `format`, `uploadDate`, `commentary` fields
- **API:** `lib/video.ts` — `getShorts()`, `getLongForm()`, format inference
- **Embeds:** `components/embeds/UniversalEmbed.tsx` — click-to-load thumbnail (Paul Irish pattern), lazy iframe, 9:16 aware
- **Cards:** `components/watch/ShortCard.tsx` (9:16), `VideoCard.tsx` (16:9)
- **Pages:** `app/watch/shorts/page.tsx` (index), `app/watch/shorts/[id]/page.tsx` (per-Short)
- **Schema:** `lib/schema-builders.ts` — `buildVideoObjectSchema`, `durationToIso8601`
- **OG:** `app/watch/shorts/opengraph-image.tsx` (dynamic via `next/og`)
- **Discovery:** `app/sitemap.ts`, `NavigationMega.tsx`, RSS feed

---

## Why

### For Frank
- **Pattern library for an AI Architect.** Shorts compress frameworks into 60s. Scanning 20/week = compounding pattern recognition.
- **Commentary layer forces synthesis.** Can't publish without a take. Exposure without interpretation doesn't stick.
- **SEO/AEO flywheel.** Each curated Short → indexed page → AI citations → site authority → more discovery.

### For builders reading FrankX
- **Pre-filtered by an AI Architect & Creator.** The bar is: does this compress a real insight? If not, it doesn't ship.
- **Frameworks, not entertainment.** Every Short is tagged to a pillar (AI Foundations, Build & Ship, Strategy, Human Edge, Creative & Culture) — builders can subscribe to a lens.
- **Template to copy.** The Notion → GH Action pipeline is documented here, not behind a paywall.

### For clients (Watch OS as product)
- **Tier 1 — Template ($197):** Self-host this Next.js system for personal/team use.
- **Tier 2 — Managed ($49/mo):** We host + sync your Notion database.
- **Tier 3 — Done-for-you ($2–5k setup + retainer):** Your keynotes/podcast appearances get embedded, transcribed, schema-marked, cross-linked. Each becomes 3 assets: video page + blog post + social clips.

---

## SEO/AEO strategy (why the schema obsession matters)

Google video rich results and AI Overview citations need 5 signals. A raw `<iframe>` gives you zero. This system emits all 5:

| Signal | Our implementation | File |
|---|---|---|
| `VideoObject` JSON-LD | Per-Short with ISO-8601 duration, thumbnails, embedUrl, SeekToAction | `lib/schema-builders.ts` |
| Transcript on page | `<details>` slot populated by `/video-transcribe` command | `app/watch/shorts/[id]/page.tsx` |
| Chapter markers | `hasPart` Clip schema with timestamps | (planned) `lib/video-types.ts:ClipSchema` |
| Commentary (unique content) | Frank's editorial take above the embed | `data/video-vault-100.json:commentary` |
| Internal cross-links | Related Shorts, category page, blog cross-refs | `data/video-cross-refs.json` |

**AEO (AI Overview, Perplexity, ChatGPT citation) is the bigger lever.** Transcripts + commentary = text AI engines can read. A 60s Short + 300-word commentary + full transcript outranks YouTube's own page in AI answers because AI engines can't watch but can read.

---

## What "excellence" means here

- **Type-safe end-to-end.** `VaultVideo` → `EnhancedVideo` → per-component props. No `any`.
- **Zero client JS for static content.** Hero, schema, FAQ render server-side. Only the grid + lightbox are `'use client'`.
- **Accessible.** Breadcrumbs, keyboard nav in lightbox, semantic `<details>`, ARIA labels.
- **Performant.** Lazy iframe via thumbnail click-through. Image sizing specified.
- **Discoverable.** Sitemap, RSS, OG image, breadcrumb schema, internal links from /watch/ and nav.
- **Verified.** Playwright E2E test confirms page loads, schema parses, embed exists.

---

## Change log

- **2026-04-14** — Initial build. `/watch/shorts/` + target Short ("The Real Reason You're Always Tired" by OptimalMind) + full AEO stack + Notion ingestion pipeline + E2E test. Commit: pending.

---

## For future Claude sessions

**Before adding a new Short:**
1. Confirm YouTube ID via oembed: `https://www.youtube.com/oembed?url=<short-url>&format=json`
2. Append entry to `data/video-vault-100.json` with `format: "short"`, `commentary`, `uploadDate`, `category`
3. If it's worth its own essay, create `app/watch/shorts/[id]/page.tsx` will render it automatically via dynamic route
4. Run `npm run type-check` and `npx playwright test tests/e2e/watch-shorts.spec.ts`

**Never:**
- Invent YouTube IDs (404 = SEO damage)
- Embed without commentary (thin content)
- Bypass the schema builder (AEO skipped)
- Hardcode URLs (use `SITE_CONFIG.url`)
