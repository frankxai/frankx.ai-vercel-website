# QA Report — Decision Instrument v3

- **Article:** Production Agentic AI Systems / Enterprise Agentic Architecture
- **Date:** 2026-08-14
- **Branch package:** `agent/hermes/frankx-decision-instrument-20260812`
- **Verdict:** **PASS for draft PR integration** (not a production deploy claim)

## Assets

| Format | Path | Size |
|---|---|---|
| Website hero | `public/images/blog/production-agentic-ai-systems-hero-v3.png` | 1600×900 |
| Open Graph | `public/images/blog/production-agentic-ai-systems-og-v3.png` | 1200×630 |
| Portrait | `public/images/blog/production-agentic-ai-systems-portrait-v3.png` | 1080×1350 |
| Story | `public/images/blog/production-agentic-ai-systems-story-v3.png` | 1080×1920 |
| Hero thumb | `…/qa/hero-320x180.png` | 320×180 |
| OG thumb | `…/qa/og-320x168.png` | 320×168 |

## Source

- Deterministic HTML: `decision-instrument-v2.html`
- Local OFL fonts only (Poppins Bold, Inter Variable, JetBrains Mono Variable)
- Renderer: Edge headless via `render_decision_instrument.py` (temp → atomic replace)
- No image-model text, no remote Google Fonts at render time

## Visual checks

- Hero: thesis as primary claim (“Don’t hire a symphony…”), 01–02 recommendation, four tiers, DEFAULT EDGE — **PASS**
- OG: full title + thesis + tiers — **PASS**
- 320px hero thumb: argument survives (thesis + 01–02) — **PASS**
- Not generic AI hardware / robot / cyan void catalog — **PASS**
- Exact typography deterministic — **PASS**

## Code integration (this branch)

- Frontmatter image → hero-v3; socialImage → og-v3; imageAlt set
- `lib/blog.ts` exposes `imageAlt` + `socialImage`
- Blog page uses socialImage for OG metadata and imageAlt for HeroImage
- Manifest lists new public paths

## Explicit non-claims

- No production Vercel deploy performed by this package step
- No DNS / GSC changes
- Founder visual taste remains final authority after preview
