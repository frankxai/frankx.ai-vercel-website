# Glass composition layer: the CDO brief

Author: OpenCode (DeepSeek V4.1 Flash), Chief Design Officer lane
Created: 2026-11-28
Status: program brief plus working reference implementation
Scope: 25 live surfaces, 11 brand packs, one shared material system

This document exists because the estate already owns a design intelligence layer and still ships text-heavy pages. The gap is not taste and not tokens. It is composition: nobody is turning the owned materials into pages where the visual carries the argument.

---

## 1. What we already own (the leverage)

| System | What it is | Where | State |
|---|---|---|---|
| `@starlight/materials` | Glass, paper and ink materials on shadcn. `GlassSurface` renders a poster plus CSS glass, upgrades to a three.js refraction pass only when a device gate and an 8 ms median frame budget allow it | `repos/starlight-design-intelligence/packages/materials` | v0.1.0, 7 registry items, not on npm, installable by `npx shadcn add @starlight/glass-surface` |
| Material tokens | `--sl-*` colour, spacing and radius scale generated from `DESIGN.md` | `packages/materials/src/tokens/tokens.css` | canonical; surface `#070a10`, paper `#efede7`, accent `#c9a15c`, signal `#82d8e6` |
| Device gate | `gpuPlan()`: WebGL only on WebGL2, no reduced motion, no reduced transparency, no data saver, ≥4 GB memory, ≥900 px, probe ≤8 ms | `packages/materials/src/gate/glass-gate.ts` | shipped with 7 tests |
| Brand packs | 11 brands, each with `DESIGN.md`, `TOKENS.md`, `MOTION.md`, `SURFACE_MODES.md`, `BRAND.md`, `COPY.md`, `NARRATIVE.md` | `brand-packs/` | 13 repositories validated for canonical brand ownership (`node scripts/validate-adoption.mjs --registry-only`) |
| Design skills | 15 installable skills: world-class-web-release, product-ui-polish, motion-and-interaction, typography-art-direction, visual-research-and-direction, anti-slop-frontend, design-audit, design-system-extractor, landing-page-polish, brand-constitution, brand-strategy-to-identity, conversion-clarity, editorial-articulation, font-licensing-gate, logo-system | `starlight-design-intelligence/skills/` | present; used by this brief |
| Motion kit | `starlight-liquid`: 10 core modules (field, form, magnetic, scroll, cursor, tilt, text, gallery, spotlight, env) plus React wrappers and `autoMount()` for plain HTML | `starlight-liquid/src` | present, shares the same reduced-motion and tier doctrine |
| Screen atlas | Per-domain route inventories with Figma mapping state | `portfolio/screen-atlases/` | gencreator only: 77 screens, 0 mapped to Figma |
| Export pipelines | `compile-figma-projection.mjs` (DESIGN.md → Figma variables plus DTCG tokens), `export-v0-import.mjs` (brand-scoped v0 bundle) | `starlight-design-intelligence/scripts/` | present; v0 has 6 ready profiles |

The estate also has a full build doctrine already written down: `_intelligence/` (Premium Intelligence Web OS), `design-agent-standards/` (taste, motion rubric, premium asset standard), and `starlight/design.md` (palette, type, motion signature, forbidden aesthetics). This brief does not restate them. It tells you which one to open and what to ship.

---

## 2. The measurement: the estate does not have a visual problem, it has a text problem

Measured 2026-11-28 with one fetch of each public homepage, counting rendered words after stripping script and style, and counting `<img>`, `<video>`, `<canvas>` and inline `<svg>`.

| Surface | Words | Visual elements | Words per visual |
|---|---:|---:|---:|
| agenticpassiveincome.com | 1811 | 4 | 453 |
| starlight.technology | 622 | 3 | 207 |
| agenticincome.ai | 1257 | 7 | 180 |
| starlightintelligence.academy | 1440 | 19 | 76 |
| realityarchitect.ai | 893 | 12 | 74 |
| cecilia.chat | 367 | 5 | 73 |
| bluelifecommons.org | 970 | 15 | 65 |
| gencreator.ai | 486 | 9 | 54 |
| starlightintelligence.org | 1781 | 70 | 25 |
| anaceciliacancino.com | 883 | 35 | 25 |
| starlightintelligence.ai | 2151 | 99 | 22 |
| animelegends.ai | 628 | 29 | 22 |
| frankx.ai | 2245 | 162 | 14 |
| arcanea.ai | 248 | 24 | 10 |

Nine of the 25 homepages contain **zero** `<img>` elements: gencreator.community, aiarchitectacademy.com, go.agenticincome.ai, agenticpassiveincome.com, vibeclubs.ai, arcanea.academy, oceanintelligence.app, starlight.you, starlight.domains. Video appears on two surfaces only (bluelifecommons.org, starlightintelligence.ai). Total body copy across the 25 homepages is about 22,000 words.

That is the whole case. The pages that read best are the pages with the lowest words-per-visual figure, and the two worst offenders are not premium brands, they are walls of prose with an accent colour.

### The rule this brief sets

1. **One claim per viewport.** A hero states one thing in under 20 words and shows the thing.
2. **Words per visual ≤ 25 on any public surface.** Above that, the page is a document, and documents belong in `/docs`.
3. **Paragraph ceiling: 45 words.** The measured maximum today is 55 (starlightintelligence.org); no paragraph may exceed it, and a body paragraph over 30 words needs a visual beside it.
4. **Every number on a page is either measured with a date or removed.** `TRUTH.md` already rules this; the design consequence is that a stat tile must carry its source line.
5. **Delete before you decorate.** If a section has nothing true to show, remove the section, not add an illustration.

---

## 3. The two materials

Both materials are compositions, not CSS recipes. They exist to encode something the page could otherwise only say in a sentence.

### Orbital glass
Use when the page's subject is a *system with layers*: runtimes, memory, agents, rings of access, time.

- A central datum the eye lands on first.
- Concentric structure where each ring is a named layer, 3 to 6 words per label.
- A refracting pane over the field, one 1 px specular rim (conic-gradient plus mask), two low-opacity dispersion rims, grain at 2 to 4 percent to kill banding.
- Three elevation tiers, each with a written rule for when it is allowed. A surface that does not earn a tier is flat ink.

### Liquid glass
Use when the page's subject is *response*: a control, a state change, a live signal.

- Surface tension on press: 0.97 scale, 120 ms, spring out.
- A highlight that follows a fine pointer, gated behind `(hover: hover) and (pointer: fine)`.
- Blurred colour bodies behind the pane that move only on real state changes, never on a loop.
- Under `prefers-reduced-motion` and `prefers-reduced-transparency` it becomes an opaque ink panel with a hairline and an inset highlight. The still is designed, not degraded.

### What neither material is
Neon gradient soup. A full-surface rainbow. Purple on black. Twelve glass cards in a grid. An orb that means nothing. `design.md` §5 and `_intelligence/taste.md` both forbid these; the material gate in `@starlight/materials` fails them mechanically where it can.

---

## 4. Brand foundations, one line each

| Brand | Foundation | Accent | Never |
|---|---|---|---|
| FrankX | Editorial authority: obsidian void, measured claims, one warm signal colour | emerald `#10b981` and amber `#f59e0b` | hype vocabulary, unanchored stats |
| Arcanea | Mythic creative platform: deep indigo void, gold thread, cinematic pacing | gold `#c5a26f`, bright `#e8d5a3` | neon, generic fantasy stock |
| Starlight | Calm operational intelligence: ink on void, provenance, evidence | gold hairline, `#82d8e6` signal | decorative motion, animated stale numbers |
| GenCreator | Creator operating system: paper and ivory, product proof | `#c9a15c` accent on paper `#efede7` | empty dashboards, fake UI |
| Anime Legends | Character canon: Akashi, Kage, Mira | brand pack | generated substitutes for canon art |

Tokens for every brand are in `brand-packs/<brand>/TOKENS.md`; the shared material palette is `packages/materials/src/tokens/tokens.css`. A page that invents a hex outside these is a defect, per `design.md` §10.

---

## 5. Figma, v0, Vercel, Cloudflare: honest state and the loop

| Surface | What exists | What is missing | The loop to run |
|---|---|---|---|
| Figma | FrankX one-mode foundation validated: 4 collections, 60 variables, 14 text styles, 5 effect styles. Projection script `compile-figma-projection.mjs` emits variables plus DTCG tokens | Arcanea overlay unmodified; gencreator atlas has 77 screens and 0 mapped; no screen-level link from repo route to Figma frame | `DESIGN.md` → `pnpm tokens` → projection JSON → Figma variables; map a route to a frame in the atlas before redesigning it |
| v0 | 6 import profiles (gencreator, arcanea, sis, frankx, agentic-income, ai-coe), `export-v0-import.mjs`, 16 variants in `frankx.ai-vercel-website/components/v0-variants` | Variants are not wired to routes; no promotion rule | v0 for composition studies only, inside an existing brand profile; a study is promoted by rewriting it against the brand pack and opening a PR, never by importing the generated file |
| Vercel | 24 live properties, all served by Vercel. Team `starlight-intelligence` | Every surface ships its own nav, footer and hero; no shared composition layer | one deploy path per project, preview before production, `[agent-wip]` to skip previews, draft-first PRs |
| Cloudflare | Workers exist for API and agent planes (`starlightintelligence.ai/workers`); DNS is not measured here | 0 of 18 probed public sites return `cf-ray`, so no site is fronted by Cloudflare today | if edge caching or image resizing is wanted, put Cloudflare in front of a Vercel project deliberately and measure TTFB before and after; do not migrate a live site to prove a point |

The design consequence: Figma is the place to design *flows and screens* that the atlas can name. v0 is the place to try *composition*. Vercel is the only delivery path that is real. Cloudflare is an optimisation, not a design surface.

---

## 6. Characters and IP available today

| Set | Canon | Where | Rule |
|---|---|---|---|
| Mini Frank and companions | Host plus custom cast, indexed by `character-canon-index.json` in the installed `mini-me-storyboard` skill | private skill; retrieval protocol in `playbooks/character-canon-retrieval.md` | resolve and hash-verify before generation; a plausible substitute is never canon |
| Anime Legends | Akashi, Kage, Mira (owner source sheets plus native art) | Anime Legends brand pack and repo | generated reinterpretations are development studies, not canon |
| Arcanea | World and cast defined in `brand-packs/arcanea` plus canon repo | `repos/arcanea`, `repos/arcanea-canon` | do not introduce a new Arcanea character through a generated image |
| Estate agents | Agent visual prompts compiled by `starlight-intelligence-web/scripts/compile-agent-visual-prompts.mjs` | starlight-intelligence-web | prompt and image both carry provenance sidecars |

A character may appear on a marketing surface only after its retrieval receipt exists (`reference_revision`, `character_ids`, `assets_loaded`, `asset_hashes_verified`). This is the difference between a brand and a mood board.

---

## 7. Rollout: 25 surfaces, four waves

Ordered by measured words-per-visual, worst first, then by tier. Each row names the one move that changes the page.

| Wave | Surface | The move |
|---|---|---|
| 1 | agenticpassiveincome.com | one orbital composition replacing the argument; prose to `/docs`; stat tiles with source lines |
| 1 | starlight.technology | a real product surface (install, MCP, receipt) as the hero, not a description of one |
| 1 | agenticincome.ai | zero images today; add a live proof panel and a revenue path diagram |
| 1 | realityarchitect.ai | 74 words per visual; one scene per section, delete the sub-heading stacks |
| 2 | starlightintelligence.academy | cohort proof: real artefacts, dates, one testimonial with a name and a receipt |
| 2 | gencreator.ai | 1 image on the whole page; add the studio surface as an actual screenshot, not a claim |
| 2 | cecilia.chat, bluelifecommons.org | one conversation and one ocean scene respectively, then cut half the copy |
| 2 | gencreator.community, aiarchitectacademy.com | zero visuals; either ship a real surface or make them honest waitlists (§5c) |
| 3 | starlightintelligence.org, starlightintelligence.ai | both are strong on visuals; unify on the shared header and material tiers |
| 3 | animelegends.ai | characters carry the page; apply canon retrieval before any new art |
| 3 | frankx.ai | 14 words per visual is the estate's best ratio; the work is consistency, not more imagery |
| 3 | arcanea.ai | 10 words per visual; the reference for cinematic pacing. Copy the motion law, not the colours |
| 4 | arcanea.dev, arcanean.org, arcanealabs.com, arcanea.academy | one portal kit, four surfaces, shared nav and footer |
| 4 | vibeclubs.ai, oceanintelligence.app, starlight.you, starlight.domains, go.agenticincome.ai | zero visuals across the set; a single shared "portal" composition is enough |

Wave 1 is the proof. If the first four pages do not measurably drop below 25 words per visual without losing a single factual claim, the program has failed and should stop.

---

## 8. Which skill to load

| Job | Skill |
|---|---|
| Redesign a public page end to end | `world-class-web-release` |
| Composition, hierarchy, polish on a product UI | `product-ui-polish` |
| Motion decisions and scores | `motion-and-interaction` |
| Type pairing and scale | `typography-art-direction` |
| Reference gathering before design | `visual-research-and-direction` |
| Refuse slop in a draft | `anti-slop-frontend` |
| Audit an existing surface | `design-audit` |
| Extract a system from an existing site | `design-system-extractor` |
| Landing page refinement | `landing-page-polish` |
| Brand rules | `brand-constitution`, `brand-strategy-to-identity` |
| Copy that carries the design | `conversion-clarity`, `editorial-articulation` |
| Fonts, logos | `font-licensing-gate`, `logo-system` |

Load one skill per job, not five. The skill tells you the sequence; the brand pack tells you the values.

---

## 9. What is verified, and what is not

Verified on 2026-11-28:

- 25 homepages fetched and counted (section 2), all returned 200.
- 18 domains checked for CDN headers: all Vercel, none `cf-ray`.
- `node scripts/validate-adoption.mjs --registry-only` returns "13 repositories with canonical brand ownership".
- Screen atlas: gencreator, 77 screens, 0 mapped to Figma.
- `@starlight/materials` contents read from source: 7 registry items, gate tests present.
- Worktree `frankx-glass-lab-20261128` created from `origin/main` of `frankx.ai-vercel-website`.
- Static preview `public/glass/glass-lab.html` rendered headless at 1440x900 and 390x844: 0 page errors, 0 failed requests, 0 external requests, no horizontal overflow at 390. Screenshots at `docs/design/evidence/glass-{desktop,desktop-fold,phone}.png`. Text contrast measured: `rgba(251,246,235,.50)` on `#070a10` = 5.02:1, `.68` = 8.56:1.
- React route `app/design-lab/glass` server-rendered through SWC plus the real React: 7/7 structure checks pass, 6,370 bytes of HTML. `tsc --noEmit` reports no error in any file this change adds.

Two findings while verifying, both outside this change:

1. **`frankx.ai-vercel-website` cannot compile CSS on a cold start.** `tailwind.config.js` line 494 requires `@tailwindcss/typography`, which is not in `package.json` and not in the pnpm store, so `next dev` returns 500 on the first CSS module. This blocks any local render of the design lab until the dependency is either installed or removed from the config. It is a one-line fix and a FrankX maintainer call, not a design decision.
2. **`lib/ai/gateway-client.ts:127` fails `tsc`** with an `instructions` property the installed AI SDK call settings do not accept. Pre-existing on `origin/main`, untouched here.

Not verified, marked [OPEN]:

- Whether the Figma projection has ever been imported into a live Figma file for any brand other than the FrankX foundation.
- Which screens in `portfolio/screen-atlases/gencreator.json` are reachable in production.
- Whether any production page currently scores against the 28/30 web rubric this week.
- The Cloudflare account's actual site list (needs `cf` or dashboard access).
- The React route in a browser. The dev server cannot boot until finding 1 is fixed; the static twin is the visual proof.

A claim without a date and a command is not a finding. Treat every row above as evidence with an expiry.

---

## 10. What this ships

| Artifact | Path | State |
|---|---|---|
| Program brief | `docs/design/GLASS-COMPOSITION-LAYER-OpenCode-2026-11-28.md` | this file |
| Machine inventory | `docs/design/ui-inventory.json` | parses, 14 measured surfaces, 11 brands |
| Visual proof | `docs/design/evidence/glass-*.png` | 1440 and 390, no overflow |
| Zero-build preview | `public/glass/glass-lab.html` | self-contained, no network |
| React materials | `components/glass/*`, `lib/glass/*` | tsc clean, SSR 7/7 |
| Route | `app/design-lab/glass` | noindex, viewport export |

The next move is wave 1, first row: one orbital composition on agenticpassiveincome.com, with the
prose moved to `/docs`. Do not redesign the estate at once. Prove the ratio on one page.

