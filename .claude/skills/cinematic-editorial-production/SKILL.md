---
name: cinematic-editorial-production
description: Brand-routed production contract for flagship articles (FrankX first, then Arcanea and Starlight). Use when a post needs verified commercial claims, original or verified media, an interactive element, affiliate links, or a "cinematic" editorial treatment. Sequences discovery, a bounded multi-agent team, independent review and release evidence. Extends the existing blog, asset-ledger and claims systems instead of creating new ones.
---

# Cinematic editorial production

The first run of this contract produced `content/blog/black-friday-2026-higgsfield-elevenlabs-ai-stack.mdx` (PR evidence under `docs/editorial/black-friday-2026/`). Every later flagship inherits the same evidence, design, language, asset and evaluation standards.

## Precedence

Repo `taste.md`, `design.md`, `CREATOR.md`, `CLAUDE.md` > brand pack in `frankxai/starlight-design-intelligence/brand-packs/<brand>/` (especially `CREATIVE-REFERENCE-LOCK-*.md`, `COPY.md`, `SURFACE_MODES.md`) > this skill > specialist skills.

## Brand routing

| Brand | Copy and voice | Visual lock | Character canon |
|---|---|---|---|
| FrankX | `frankx-brand` skill, `CREATOR.md`, brand pack `COPY.md` | brand pack `CREATIVE-REFERENCE-LOCK-2026-11.md` | Frank Omega, `public/images/mascot/frank-omega-*` (composite only, never regenerate a lookalike) |
| Arcanea | `arcanea` brand pack | Arcanea pack | Arcanea character canon in its own repo |
| Starlight | `starlight-intelligence` pack | Technical Atlas mode | none by default |

## Phase 0: discover before building

Report each as `found <path>` / `unavailable <reason>` / `substitute <what>`. Never claim a skill or connector you did not load.

- Skills: `anthropic-skills:humanizer`, `infogenius-<brand>`, `refero:refero-design`, `web-release-gate`, `visual-proof`, `web-design-guidelines`.
- Connectors: Semrush MCP, Firecrawl MCP (primary-source scraping and server-side screenshots), ElevenLabs creative MCP (image models incl. `gpt-image-2.6-sunburst`, `gemini-3-pro-image`), Refero MCP. GSC currently requires the analytics MCP; if it fails, say so.
- Repo systems to extend: `data/affiliate/programs.json` (ids, `ourLink`), `components/blog/MDXComponents.tsx`, `data/visual-asset-ledger.json` and `data/editorial-visuals.json` (DAM), `scripts/audit-marketing-claims.mjs`, `scripts/audit-ai-slop.mjs`, `scripts/voice-audit.sh`, `.claude/hooks/blog-commit-gate.sh`.
- Sandbox network: most vendor domains are blocked. Firecrawl screenshots download from `storage.googleapis.com`; ElevenLabs renders from `elevenlabsusercontent.com` (allowlisted); official icon SVGs from `raw.githubusercontent.com`.

## Phase 1: bounded team (parallel, each writes only its own files)

| Role | Owns | Output |
|---|---|---|
| Search intelligence | Semrush research | `docs/editorial/<slug>/search-intelligence.md` |
| Commercial verification | primary-source checks, affiliate integrity | `docs/editorial/<slug>/claim-ledger.json` + `.md` |
| Art direction and media | reference lock, hero candidates (max 4), logos, crops, DAM entries | `public/images/blog/<slug>/`, ledger records, `art-direction.md` |
| Experience engineering | one interactive element, embed performance | `components/blog/<Component>.tsx`, MDX registration |
| Author (lead) | narrative, integration | the MDX file only |

Workers never edit the MDX. The lead integrates their returned snippets.

## Phase 2: claim discipline

Every price, deadline, eligibility rule, renewal cost, credit amount and model name needs a primary source and a `verified_at` timestamp in the ledger. Secondary roundups may appear only when labelled as such in the copy. Superlatives without evidence are removed. Invented experience is removed: write documented work, stated intentions and labelled opinion.

## Phase 3: media rules

- Product proof: real screenshots with capture date, source URL and `third-party-screenshot` rights.
- AI art: labelled illustration with model id, prompt and flow id in the ledger. No logos, readable text or faces presented as proof inside generated images.
- Logos: official SVG only, composited as a separate layer. If none is obtainable, set the name in type.
- Reject: logo/badge walls, fake glass dashboards, floating 3D brains, generic light-beam stock.
- Deliver hero (2400x1350 webp), OG (1200x630 png), mobile crop (1080x1350), plus at most two chapter visuals that carry information.
- Video: official channels only (verify the channel id; impostor handles exist). Embeds must not load the iframe before interaction or viewport.

## Phase 4: narrative

Open with a specific human thought, not a keyword. Every section carries an observation, demonstration, finding or decision. Run `anthropic-skills:humanizer` as a substantive pass, then `node scripts/audit-ai-slop.mjs --strict` and `bash scripts/voice-audit.sh <file>`. Title ≤ 60 chars, description ≤ 155. Disclosure adjacent to the first affiliate link.

## Phase 5: independent review (author never approves own work)

Separate reviewers, each returning pass/fail with file:line findings:

1. Factual accuracy against the claim ledger.
2. Editorial quality and brand voice (Humanizer ban lists, `CREATOR.md`).
3. Affiliate integrity (ids resolve, `rel="sponsored"`, disclosure placement).
4. Character and logo fidelity.
5. Technical: type-check, lint, `web-design-guidelines` on changed UI, rendering at 375 / 768 / 1440 in the running app, reduced motion, CLS, image weights.

## Phase 6: release

Draft PR containing the article, reusable component changes, `docs/editorial/<slug>/` evidence, desktop and mobile screenshots, and the review results. Do not merge. Open claims stay open in the PR body; they are never silently marked done.
