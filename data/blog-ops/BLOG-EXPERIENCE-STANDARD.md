# FrankX Blog Experience Standard (Headers · Reading · SEO/AEO · Infographics)

**Version:** 2026-07-15  
**Owner lane:** Yogabook Frontend Queen + FrankX demand engine  
**Applies to:** `frankx.ai/blog/*` in `frankxai/frankx.ai-vercel-website`  
**Companion:** `data/blog-ops/ARTICLE-REGISTRY.md`, `docs/blog-premium-image-upgrade-plan.md`, estate `CONTENT-STRATEGY.md`

---

## 1. Problem we are fixing

Many posts still ship with:

- Decorative **SVG "headers"** (flat gradients, generic nodes, cheap geometric wallpaper)
- Broken frontmatter `image:` paths (versioned `-hero-vN.jpg` that no longer exist)
- Weak reading chrome (no progress, dense walls of text, weak TOC)
- Social/OG cards that do not match the article system
- Untracked agent authorship, no maker≠checker accuracy pass on tool docs

Competitive premium blogs (Linear-style product writing, Stripe press/docs, Lenny’s Newsletter web, Every.to, Reforge, Anthropic/OpenAI research blogs) win on **restraint + hierarchy + proof**, not more purple glow.

---

## 2. Competitive bar (what excellent teams do in 2026)

### Header / hero

| Practice | Why it wins | FrankX rule |
|---|---|---|
| **Cinematic 16:9 raster hero** with safe zones | Cards + OG + detail share one crop | Required for every published post |
| **Topic metaphor, not stock** | Instant semantic signal | Abstract architecture / signal / system metaphors; no people, robots, logos, readable UI chrome |
| **No primary SVG wallpaper** | SVG slop reads as agent-generated filler | SVG only for **labeled diagrams** inside body |
| **Title lives in HTML**, not burned into image | SEO + a11y + localization | Hero is visual; H1 is text |
| **Consistent brand light** | Editorial system, not random midjourney | Void base `#0a0a0b`, emerald `#10b981`, cyan `#06b6d4`, amber only for soul/human pillars |

### Reading experience

| Practice | FrankX implementation |
|---|---|
| Comfortable measure (~65–75 ch) | `prose` max-width already; enforce on all templates |
| Sticky mini-TOC for 1.5k+ words | Require for posts >1800 words |
| Progress indicator | Keep/repair reading progress bar |
| Early answer + scannable H2s | First 120 words = promise + who it's for |
| Proof blocks | Callout components for frameworks, checklists, evidence |
| Related rail | 3 internal links min; cluster links required for tool roundups |
| Mobile first | Hero 16:9 never crops critical motif; test 390px |

### Infographics

| Type | Medium | When |
|---|---|---|
| Process / stack maps | Exact-label SVG or code diagram | Architecture posts |
| Comparisons | Table + optional small diagram | Tool roundups |
| Narrative metaphors | Raster only | Flagship essays |
| Never | Illegible AI text in image | Always |

### SEO

- Unique title ≤60, description 140–160 with primary intent
- Canonical + Article JSON-LD
- One primary keyword cluster; secondary in H2s
- Internal links 3–8; no orphan posts
- Image `alt` descriptive, not keyword spam
- Freshness: `dateModified` when tool facts change

### AEO (Answer Engine Optimization)

- **Direct answer block** in first section (40–80 words) that an AI can cite
- Definitional H2: "What is X", "How X works", "When to use X"
- Structured lists/tables for multi-step procedures
- Explicit sources when claiming pricing, model limits, or vendor policy
- FAQ section (3–6) with schema when intent is informational
- Author entity consistency (`Frank` / FrankX) + last-reviewed date in frontmatter

---

## 3. Asset tiers (premium gate)

| Tier | Use as blog hero? | Notes |
|---|---|---|
| A — Real product/proof screenshot | Yes if branded UI is the story | Prefer for product launches |
| B — Custom cinematic generated raster | **Default hero** | 1920×1080 or 2560×1440, 16:9 |
| C — Exact vector/system diagram | **Body only**, not hero/OG | Labels must be real text |
| D — Decorative SVG/gradient filler | **Banned as hero** | Historical visual-system SVGs = replace queue |

Score ship gate: **26/30+** on estate generated-asset quality gate; restart <22.

---

## 4. Header generation brief (prompt DNA)

```
FrankX premium blog hero, 16:9 cinematic still.
Subject metaphor: {TOPIC_METAPHOR}.
Palette: deep void black #0a0a0b, emerald #10b981 and cyan #06b6d4 accents,
subtle film grain, architectural geometry, high contrast, restrained luxury.
Composition: strong central motif, large empty safe zones top 12% and bottom 22%
for UI badges/gradients, no centered text block.
Hard bans: no readable text, no logos, no watermarks, no people, no robots,
no purple-dominant gradient soup, no generic stock dashboard, no cartoon stickers.
Style refs: Linear/Vercel product stills + studio Ghibli atmospheric restraint (not anime characters).
```

Save as: `public/images/blog/{slug}-hero-v{N}.jpg` (or `.png` if needed)  
Wire frontmatter: `image: "/images/blog/{slug}-hero-v{N}.jpg"`  
Log prompt in `data/blog-ops/prompt-log/{slug}.md` and registry.

---

## 5. Frontmatter ops schema (required going forward)

```yaml
title: ""
description: ""
date: "YYYY-MM-DD"
dateModified: "YYYY-MM-DD"   # when facts/tools change
author: "Frank"
category: ""
tags: []
keywords: []
image: "/images/blog/slug-hero-vN.jpg"
imageAlt: ""
featured: false
readingGoal: ""
# ops / multi-agent provenance
ops:
  authoringAgent: "codex|claude|hermes|grok|human"
  reviewingAgent: "..."
  contentAccuracy: "pass|fail|not_reviewed"
  visualQaScore: 0   # /30
  visualQaStatus: "pass|iterate|restart"
  heroPromptPath: "data/blog-ops/prompt-log/slug.md"
  sourcesChecked: []  # vendor docs URLs + access date
  lastFactCheck: "YYYY-MM-DD"
```

---

## 6. Multi-agent production loop (scale)

```
RESEARCH (web + vendor docs) → DRAFT (voice) → POLISH (humanizer)
 → ACCURACY CHECKER (different model) → HERO GEN (Tier B)
 → VISUAL QA (export inspect) → SEO/AEO GATE → SOCIAL PACK
 → REGISTRY UPDATE → DRAFT PR → READY when gates green
```

Rules:

1. **Maker ≠ checker** for tool pricing, model claims, API status.
2. One agent = one branch/worktree; registry is SSOT for status.
3. No production social send without Frank / 2h inversion veto.
4. Batch commits; draft-first PRs; `[skip ci]` for docs-only registry.

---

## 7. SVG slop retirement policy

1. If `header_class == svg_or_visual_system` → replace with Tier B raster within sprint.
2. Keep SVG under `public/images/blog/visual-system/` only as archive or body diagrams.
3. Never set OG/Twitter image to SVG wallpaper.
4. Body `legacy-diagram-*.svg` → either regenerate as exact-label infographic or remove if redundant with tables.

---

## 8. Social + distribution ops

| Day | Action |
|---|---|
| 0 | Publish + verify OG |
| 0 +2h | X/LinkedIn short (human gate) |
| 1 | Carousel / quote cards |
| 2 | Newsletter candidate |
| 7 | Performance note in registry |

Assets per flagship: wide 1200×630, square 1080, optional vertical. Prefer crop from hero + exact text overlay (code), not AI text-in-image.

---

## 9. Definition of done (single article)

- [ ] Registry row updated
- [ ] Hero exists on disk + frontmatter wired
- [ ] Visual QA ≥26/30 or iterate logged
- [ ] Content accuracy pass with sources (for tool posts)
- [ ] SEO fields complete (title, desc, keywords, 3+ internal links)
- [ ] AEO answer block + FAQ if informational
- [ ] No decorative SVG as hero
- [ ] Social pack path recorded OR deferred with reason

---

*This standard supersedes ad-hoc hero generation notes where they conflict. Keep `docs/blog-premium-image-upgrade-plan.md` for historical batch logistics.*
