# Visual system spec, v4 overhaul

Status: proposal for owner review, 2026-11-05. Nothing here is shipped. Inputs: `audits/05-visual-inventory.md`, `audits/04-voice-and-slop.md` section 3, `design.md`, `taste.md`, `public/images/IMAGE_CATALOG.md`, `public/images/VISUAL_INVENTORY_2026.md`, `components/FrankOmega.tsx`, `lib/blob-cdn.ts`, and two unmerged Codex branches (`agent/codex/character-reference-entry-20261023`, `agent/codex/collective-review-20261030`). `design.md` and `taste.md` outrank this file.

## 1. Principles

1. **Cinema, not stock.** Hero imagery is composed like a film still (taste.md, Ghibli reference). If we cannot generate or commission it, leave it out. No stock people on laptops.
2. **No decorative gradients.** A gradient frames meaning or leaves the page. Glass effects need imagery underneath.
3. **SVG first for anything that explains.** Diagrams, infographics and charts are authored as SVG with data read from source files (for example `data/*.json`, `lib/` registries), not typed into a picture. A raster diagram cannot be edited, translated or checked against its source.
4. **One spectrum per image.** Tech (emerald `#10b981`, cyan `#06b6d4`) for agents and architecture. Soul (amber) for music. Bridge (purple) sparingly. Background `#0a0a0b`, never `#000`.
5. **Every image carries provenance, rights and alt text.** An image with no manifest row (section 6) does not ship.
6. **Pictures that teach.** Each image has a job you can state in one sentence. If removing it changes nothing, remove it.
7. **Dark-first, no light-on-light.** Rhythm rule from taste.md: never two text-heavy sections in a row without a visual break.

## 2. Image classes

Weight budgets are per delivered file after optimisation. Formats: AVIF or WebP for raster delivered through `next/image`; SVG for vector; PNG only for lossless UI captures.

| Class | Aspect | Source size | Format | Budget | Where used |
|---|---|---|---|---|---|
| Page hero | 16:9 | 2560x1440 | WebP/AVIF | 250 KB delivered, 2.5 MB master cap | Top of hubs and flagship pages. One per page. LCP element, so `priority`, explicit dimensions. |
| Editorial section image | 16:9 or 3:2 | 1600x900 | WebP | 120 KB | Between text sections, blog and guide bodies. |
| Character scene | 4:5 portrait or 16:9 | 1344x1680 / 1920x1080 | WebP | 200 KB | Cast pages, guides, newsletter. Needs scene review (section 4). |
| Infographic / diagram | free, max 1200 wide | vector | SVG, inline or `<img>` | 40 KB | Mechanisms, flows, comparisons. Text stays live text. |
| Data chart | 16:9 or 1:1 | vector | SVG generated from data | 30 KB | Research, benchmarks, pricing. Axis labels, units, source and date in the figure. |
| Product plate | 4:5 | vector | SVG | 10 KB | Products, checkout, books. Existing set: `public/images/products/plates/*.svg`. |
| Social card / OG | 1.91:1 (1200x630) | 1200x630 | PNG or JPEG | 200 KB | `opengraph-image`, per-post cards. Existing default: `public/images/brand/frankx-public-workspace-og-1200x630.png`. |
| Mini icon / spot illustration | 1:1 | 256x256 (2x of 128) | SVG preferred, WebP fallback | 15 KB | Mega-menu doors, list rows, empty states. Lucide for UI icons; spot art only where a door needs identity. |
| Portrait | 4:5 or 1:1 | 1600x2000 | WebP | 180 KB | /about, /connect. Frank only, consent `owner`. Design.md forbids circular face crops. |

Rules for all classes: explicit `width` and `height`; `sizes` set; `alt` under 125 characters describing what is shown, not the label (FrankOmega.tsx currently passes its label as alt, which is weak); decorative images use `alt=""`; no text baked into raster images unless the same text appears in the page; masters over 1 MB never sit in `public/`.

## 3. Placement rules

**Home.** `app/page.tsx` and `components/home/**` are protected. No image change without the homepage preservation process: read `docs/strategy/HOMEPAGE-PRESERVATION-CONTRACT.md`, baseline captures, preservation matrix, three directions, Frank's approval of the exact direction. This spec proposes nothing for home beyond listing candidates.

**Hubs** (research, blog, ACOS, AI architecture, agent hub, LLM hub, stack, partners, ecosystem). One hero, then one visual per major section. Each hub gets one explanatory SVG that shows how its parts relate (a map, not a card wall). Hubs avoid grids of identical thumbnails; vary scale.

**Blog posts.** Targets: at least 2 meaningful visuals per 1,000 words, counting the hero; one diagram or table per H2 that explains a mechanism; no 1,000-word stretch without a visual break. Audit 04 measured recent posts at 0.5 to 0.9 visuals per 1,000 words, so this is a real change. Use the `<Diagram>` and `<ArticleFigure>` components already in MDX. ASCII box diagrams are replaced with SVG.

**Research investigations.** Data chart per finding, with source, date and n. A method diagram at the top. Heroes optional. No decorative art on a page that reports a number.

**Product pages.** Product plate (SVG) plus one real artefact view (screenshot, file tree, or sample output). Never invented dashboards or fake metrics.

**Nav mega-menu.** One image or spot illustration per door, maximum. 128x128 delivered, SVG or WebP under 15 KB, `loading="lazy"` off-screen. If a door has no honest illustration, use a Lucide icon.

### Top 15 placements, ranked

Rank weighs reader impact, current weakness, and asset readiness. Paths are relative to `public/images/` and were confirmed to exist on 2026-11-05.

| # | Surface | Class | Candidate asset | Reason |
|---|---|---|---|---|
| 1 | Blog: `llm-gateway-architecture-guide` | Diagram | Needs generation (SVG: request plane, router, providers) | Architecture guide with no architecture diagram (audit 04). |
| 2 | AI architecture hub | Diagram | `blog/production-agentic-ai-systems-six-plane.svg` | Vector six-plane map already exists; use it as the hub's explanatory figure. |
| 3 | ACOS hub | Diagram | `blog/acos-agent-orchestration-diagram.jpeg` (interim), then SVG rebuild | Best existing orchestration picture; raster, so rebuild as SVG. |
| 4 | Agent hub | Page hero | `blog/multi-agent-orchestration.png` (1376x768) | Strong fit; convert to WebP. |
| 5 | Ecosystem hub | Editorial | `ecosystem/01-frankx-ecosystem-overview.png` | Already ranked 22 by use; confirm it matches current ecosystem before reuse. |
| 6 | Blog: `voice-typing-for-founders` | Diagram | Needs generation (SVG: seven-day protocol timeline) | Model post with no visual of its protocol. |
| 7 | LLM hub | Data chart | Needs generation (SVG from `lib` pricing data) | Pricing and routing comparisons belong in charts with dated sources. |
| 8 | Blog: `vercel-ship-2026-builder-decisions` | Hero + diagram | Needs generation (hero missing; decision matrix as SVG) | Only recent post with no hero. |
| 9 | Research hub | Page hero | `brand/frankx-public-workspace-og-1200x630.png` is OG only; hero needs generation | Hub lacks a research-specific visual. |
| 10 | Stack page | Diagram | `blog/ai-toolchain-motherboard.jpeg` (interim) | Reads as a toolchain; rebuild as SVG so tools stay editable. |
| 11 | Partners hub | Editorial | Needs generation (real workflow scene, not logos) | design.md: first viewport shows a real workflow signal. |
| 12 | /acos product | Product plate | `products/plates/agentic-creator-os.svg` | Exists, low risk. |
| 13 | Mega-menu, AI architecture door | Spot | Needs generation (SVG, 128 px) | Doors currently lack identity. |
| 14 | /frankx, /lab | Character scene | `mascot/frank-omega-pixar-v1.webp` (4096x4096, 291 KB, already optimised) | Omega slot; the only Omega file already in WebP. |
| 15 | Default OG | Social card | `brand/frankx-public-workspace-og-1200x630.png` | Exists; check against design.md OG spec (recraft, emerald light leaks). |

## 4. The cast

**Members.** Mini Frank (Frank's mini-me), Echo, Nilo, Brio, Riff, and FRANK-Ω (Omega). Repo canon spells it Brio; the owner wrote "Biro". Confirm and record one spelling in the manifest.

**Identity source of truth.** Not this repo. Identity and model sheets live in the private `frankxai/content-os` (`knowledge/media/README.md`, `reference-index.json`, `character-reference-routes.json`) and the private VIS workflow. Omega's source is `components/FrankOmega.tsx` plus `public/images/mascot/frank-omega-*`. This repo holds approved web derivatives only, delivered through Vercel Blob (`lib/blob-cdn.ts`, `lib/blob-assets-manifest.json`).

**Approved for public use today** (from `public/media/characters.json` on the Codex branch, reviewed 2026-10-23, not yet merged):
- `mini-frank.travel`: `existing-public-example`.
- `mini-frank.debug-comic`: `existing-public-example`.
- `mini-frank.echo.piano`: `needs-scene-review`. Do not place anywhere new.
- `mini-frank.echo.song-brief`: `needs-scene-review`. Do not place anywhere new.
- All four set `identity_reference: false`. They are scenes, not identity sheets.
- Omega: ten variants in `FrankOmega.tsx` are live on `/frankx`, `/acos`, `/lab`, `/linktree`, `NotFoundClient`, `NewsletterCTA`. Treat as approved by existing use.
- Nilo, Brio, Riff: no approved provider or model assignment, no image files in these repos. Zero public placements until the owner releases them.

**Rule: no guessed likeness.** If an agent cannot read the private references, it reports missing access. It does not draw, prompt or describe a character from memory, from another edition, or by averaging editions. The resolver `node scripts/resolve-character-media.mjs <key>` (on the Codex branch) fails visibly on a missing or review-held key; there is no fallback to another character.

**Requesting a new scene.** File an issue with: character ids, page and class (section 2), the teaching or narrative job, alt-text draft, claims the image makes, and which edition. An authorised operator pulls the references from content-os, writes the scene brief, generates (section 5), then the scene enters review: independent visual check, rights and claims check, owner approval. Only then is a derivative uploaded to Blob and a key added to `characters.json` with sha256, source, edition and release decision.

**Candidates stay separate.** The collective workshop PR proposes Facet, Pico, Omni, Reel, Sprout, Lune and Pelago. All have `status: proposal`, `model_binding: null`, `public_approval: null`. They live under their own namespace (`candidate.*`), never in `characters.json`, never share a page with core cast unless the page is explicitly about the workshop, and carry a "proposal, not canon" note in the manifest. Their inspirations (Gemini, Nano Banana, Veo, Genie, Kimi, DeepSeek) are metaphors, not vendor identities.

**Visualising multi-agent work (for example Codex and Claude together).** Use roles, not vendors. Show the cast doing the jobs: one character drafting, one reviewing, a visible changed object between them (a diff, a patch, a score card). Codex and Claude appear as plain text labels or neutral tool glyphs in captions, never as mascots, logos, or look-alikes of vendor artwork, and never implying endorsement. The collective PR's Codex, Mona and Clawd guest study stays private. Where a vendor mark is needed to name a tool, follow the platform-mark ledger (`data/brand-kits/platform-mark-ledger.json`) and the vendor's published guidance. Add the line "Independent project, not affiliated with or endorsed by the vendors shown" to such pages.

## 5. Generation routing

Claude cannot natively produce raster images. Claude writes briefs, prompts, art direction and SVG (diagrams, charts, plates, spot icons), and reviews outputs. Raster generation routes to other tools.

| Job | Route | Notes |
|---|---|---|
| Character scene | Higgsfield MCP (ACOS default, `higgsfield-operator` skill) with the character's reference set; Antigravity/Gemini (Nano Banana) for consistency edits | Private references only. Scene review required. |
| Product plate | Claude authors SVG directly | No raster needed. |
| Editorial still | Higgsfield `nano_banana_pro` (design.md default) or Codex with OpenAI image models | Review the existing upscaled candidate before generating a new one. |
| Infographic / diagram | Claude authors SVG from source data; `infogenius` skill for research framing | Raster infographics only for social cards. |
| Data chart | Claude authors SVG from JSON; `dataviz` skill | Source and date in the figure. |
| OG card | Recraft per design.md, or SVG-to-PNG export from a template | Text must match page title. |
| Video still / motion | Higgsfield video models; HyperFrames or Canva where connected | Posters mandatory for reduced motion. |
| Editing, upscaling, background removal | Antigravity/Gemini, Canva, OpenArt where connected | Log the tool and version in provenance. |

OpenArt, Canva and Figma MCPs are available only where the session connects them; check before planning around them.

**Review gate before anything ships:** the `visual-brand-guidelines` agent (present in `.claude/agents/`) plus the `visual-proof` skill. A `worker-visual-qa` agent is referenced in the brief but was not found in this repo; if it lives in ACOS, vendor it by name in a dedicated PR before relying on it. Reviewers check spectrum, restraint test, alt text, claims, rights, and screenshots at 375, 768 and 1440.

**Credits.** No generation that spends credits (Higgsfield, OpenArt, Canva, OpenAI, Gemini) without the owner's explicit approval for that batch. Each job states model, count and estimated cost first, and is logged in the Higgsfield ledger named in design.md.

## 6. Intake and classification

**Where the owner drops images.** `content/images/images ingest/` already exists (21 top-level entries including `Profile/` and `infographic ingest/`; the inventory counted 127 files). It is under `content/`, so Next.js does not serve it. Recommendation: rename to `content/images/intake/` in a dedicated PR (the space breaks shell tooling), and add a README stating: private, never copied to `public/` wholesale, files are personal photos (`IMG_4967.jpg`, `Copy of P*.jpg`, student visit photos, `Profile/`) until reviewed for consent. If the rename is refused, add the README in place.

**Manifest.** Single file `public/images/assets.json` (projection) or extend `registry.json`; one row per image:

`id`, `path`, `sha256`, `width`, `height`, `bytes`, `subject`, `class`, `character_id`, `style`, `spectrum`, `rights` (owner, generated, licensed, released), `consent` (owner, released, n/a), `provenance` (tool, model, date, prompt file or "owner photo"), `alt`, `status` (intake, reviewed, approved, published, retired), `reviewer`, `placements[]`.

Private data (Drive ids, recovery URLs, unreleased model-sheet bytes) never enters the manifest.

**Ranking rubric**, 1 to 5 each, total out of 25. Ship threshold 20 with no score below 3 on rights.

| Axis | 1 | 5 |
|---|---|---|
| Craft | artefacts, muddy | clean at 2x, deliberate light |
| Brand fit | wrong spectrum, glossy stock feel | reads as FrankX at a squint |
| Clarity | needs a caption to make sense | job obvious in one second |
| Uniqueness | seen everywhere | only here |
| Rights certainty | unknown source | documented, cleared |

**Promotion path.** intake, reviewed (manifest row, hash, rubric), approved (owner), then optimise (WebP/AVIF, thumbnail), then deliver: SVG and small static files into `public/images/<folder>/`; larger or character derivatives to Vercel Blob with a `lib/blob-assets-manifest.json` entry. Originals stay private. Retired assets keep their URL until redirects are checked (CLAUDE.md: never delete pages with traffic; the same caution applies to image URLs used in OG tags).

## 7. Quality bar and checks

Pre-publish checklist:
- [ ] Job of the image stated in one sentence; restraint test passed.
- [ ] One spectrum; background `#0a0a0b`; no decorative gradient.
- [ ] Manifest row complete; rights and consent filled; no private path.
- [ ] Alt text under 125 characters, specific; decorative uses `alt=""`.
- [ ] Dimensions set; hero has `priority`; others lazy; within the class weight budget.
- [ ] SVG text is live text; data figures cite source and date.
- [ ] Cast: key exists in `characters.json`, `reuse_status` allows the placement, no vendor mascot implied.
- [ ] Screenshots at 375, 768, 1440; reduced-motion poster present.
- [ ] Copy next to the image passes the strict language audit.

Enforcement that exists today (from `package.json`): `pnpm run images:check` (image hosts), `test:media-guard`, `ai-slop:audit:strict`, `claims:audit:strict`, `type-check`, `lint`, `build`, `merge:gate`. Skills and agents: `web-release-gate`, `visual-proof`, `core-web-vitals`, `web-design-guidelines`, `visual-brand-guidelines`. Proposed additions (milestone 3): a manifest check that every referenced `/images/...` path has a row with non-empty `alt`, `rights` and `sha256`, and a size-budget check by class.

## 8. PR-sized milestones

1. **Intake hygiene.** Rename or README the intake folder; fill `public/images/CLAUDE.md` with the rules from sections 2 and 6 (it has none today). Verify: `git status` shows no personal photos under `public/`; `pnpm run images:check`.
2. **Manifest seed.** Create `assets.json` with rows for the top 60 in audit 05, `alt` and `rights` filled for the 15 placements above. Verify: JSON schema test passes.
3. **Manifest check in CI.** Script plus test for missing alt, rights, hash, over-budget size; wire into `merge:gate`. Verify: failing fixture fails, real tree passes.
4. **Optimise heavy files.** Convert large team and mascot PNGs and the 7.7 MB `bio/dawn-studio.jpg` (after consent check) to WebP; keep URLs via the same path with a new extension only where references are updated. Verify: `pnpm run build`, bytes before and after recorded.
5. **Cast governance merge.** Land the Codex `characters.json`, resolver and `character-references.md` (review the branch first; port named files, no bulk copy). Add a `candidate.*` namespace file for the workshop proposals. Verify: `node scripts/resolve-character-media.mjs --check`.
6. **Blog density pass, first ten posts.** SVG diagrams for the ten recent posts in audit 04 (llm-gateway, voice-typing-for-founders, vercel-ship first). Verify: visuals per 1,000 words counted by script; `ai-slop:audit:strict`; screenshots.
7. **Hub explanatory SVGs.** AI architecture (six-plane SVG), ACOS, agent hub, stack. Verify: `visual-proof` at three widths; Lighthouse LCP under 2.5 s.
8. **Mega-menu spots.** One 128 px spot per door, after the IA from audit 03 is settled. Verify: payload under 15 KB each; keyboard and reduced-motion review.

Home work is excluded from all eight and follows the preservation process separately.
