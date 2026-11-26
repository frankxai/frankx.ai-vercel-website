# Art direction: Black Friday 2026, Higgsfield + ElevenLabs

Route: `/blog/black-friday-2026-higgsfield-elevenlabs-ai-stack` · Date: 2026-11-26 · Status: candidate selected; independent review and owner approval still open.

## Inputs read

- `taste.md`, `design.md` (repo, highest authority)
- `starlight-design-intelligence/brand-packs/frankx/`: `CREATIVE-REFERENCE-LOCK-2026-11.md`, `DESIGN.md`, `SURFACE_MODES.md`
- Skills: `visual-research-and-direction`, `review-character-continuity`, `logo-system`, `cinematic-editorial-production`
- Route behaviour: `app/blog/[slug]/page.tsx` renders `post.image` through `HeroImage` directly under the H1, with the post description as caption. `ogImage` frontmatter overrides `image` for social metadata. `coverAlt` is not read by any blog code (HeroImage uses the title as alt).

## Reference lock

Surface mode: **Editorial**, with the article body in **Technical Atlas** for proof (screenshots, tables, diagrams).

Leading direction: **B, Studio Film** from the reference lock. One still frame, one idea, sparse annotation, room for the reader.

References (Refero MCP, `refero_search_styles`, 2026-11-26; preview level, full style documents not retrieved):

| Reference | Principle carried | Not copied |
|---|---|---|
| A24, "cinema meets the index" (a24films.com) | The photograph carries all the colour; labels are small, matter-of-fact mono | Its typefaces, white catalogue shell |
| Palantir, "operator cinema" (palantir.com) | Low-lit scene plus field-manual captions; huge statement, tiny equipment-style metadata | Its violet-grey palette, product chrome |
| Luma, "cinema meets workbench" (lumalabs.ai) | Creative output is the main event; the interface around it recedes | Angled UI collages, monochrome white shell |
| Reference lock 2026-11 (Christopher Ireland, Symbolic) | Authorship and negative space | Literal typography or grid |

Rejected per the lock: badge or logo walls, fake glass dashboards, floating 3D AI brains, generic light-beam stock, three-accent gradients, centred slogan over a card grid.

Spectrum: **soul (amber)**. The plate's only practical light is a tungsten lamp, so type accents use amber `#f59e0b` only. The cost chart is a data figure and reuses the sibling CoE diagram's encoding (amber = Higgsfield / picture, cyan = ElevenLabs / sound).

## Three directions considered

| Direction | What it would be here | Outcome |
|---|---|---|
| A, Living Journal | Real Frank portrait at the desk | Not pursued: no authorized portrait was in scope, and a synthetic headshot is prohibited as proof |
| B, Studio Film | A generated studio still, headline-free, one idea: picture and sound on one desk | **Selected for the cover** |
| C, Technical Atlas | The existing composite of the real pricing pages plus type | **Kept as in-body proof figure**, not the cover |

## Candidate comparison (cap of 4 generated, all used)

Board: `docs/editorial/black-friday-2026/hero-candidates-board.webp`

| # | Source | Read | Verdict |
|---|---|---|---|
| 0 | Existing composite `black-friday-2026-ai-stack-hero.webp` | Strongest proof: real pricing pages. As a cover it repeats the H1 in an image, and two tilted UI panels drift toward the "dashboard collage" pattern | Keep in body, after the disclosure |
| A | `gpt-image-2.6-sunburst`, flow `BSRpkMqSvfneu6Z4rbV8`, 1280x720, sha256 `eb743464…a1` | Warm studio, canal window. Floating node grid plus amber/cyan light threads read as the "AI network" cliché; fake editor UI on the monitor; the left third is busy | Reject |
| B | `gpt-image-2.6-sunburst`, session `wcs5RaocZhOCHnXJzeyl`, generation `EqiPYtTWbAlZbQPXZeRf`, 1280x720, sha256 `9031f16f…2e` | Same prompt as A, with a cleaner left third. Same node-grid and light-thread problem; two spectra mixed | Reject |
| C | `gemini-3-pro-image`, session `W6JQIWhakYLT3yWQcAIx`, generation `gCB2pEBMZKWnU2fp6on4`, 1376x768, sha256 `07529c9c…b5` | A film camera and a studio microphone either side of one lamp on an oak table, canal at blue hour. One subject, no screens, no glow, no text. The left 45% is clean wall for type | **Selected** |
| D | `gpt-image-2.6-sunburst`, session `BUc5ROccLMccjP6d6L30`, generation `UGsDqI2N0soMhZsDxcKB`, 1280x720, sha256 `b833545f…dd` | Flat lay of film strip, waveform, headphones and a ruled sheet. Literal and clean, but reads as stock flat lay, warm brown only, and is weaker as a scene | Runner-up |

Why C: it states the article's thesis (Higgsfield for picture, ElevenLabs for sound, one budget) as one physical scene without symbols, logos or fake interfaces. It is the only candidate with no reject-list pattern, and its negative space suits both the headline-free cover and the typed social crops.

Known limitation: C is a 1K render. The generate tool exposes no resolution parameter, so the 2400x1350 hero is a 1.74x Lanczos upscale with unsharp mask and fine grain. It holds at article width (inspected at 100%); do not reuse it for 4K or print. The lamp arm geometry is slightly implausible at full size.

Prompt for C (also in both registries):

> A cinematic wide 16:9 film still of a quiet working studio in an old canal house at blue hour. On a long, worn oak worktable stand exactly two instruments facing each other: on the right, a compact cinema camera on a short tripod; beside it, a large-diaphragm studio microphone on a desk stand with its cable trailing across the wood. Between them lie a closed black notebook, a pencil and a ceramic mug. One small warm tungsten desk lamp is the only practical light, pooling amber on the table; the rest of the room falls into deep navy and slate shadow, never pure black. A tall window at the far right shows soft out-of-focus lights reflected on canal water. Composition: the instruments and lamp occupy the right 55 percent of the frame; the left 45 percent is an uncluttered, softly textured dark plaster wall with gentle falloff, left empty for a headline. Low eye-level camera, 40mm lens, shallow depth of field, restrained documentary realism, muted cinematic grade, fine 35mm film grain. The scene contains no people, no screens, no glowing lines, no holograms, no floating graphics, no text, no letters, no numbers, no logos or brand markings on any object.

## Deliverables

| File | Size | Use |
|---|---|---|
| `public/images/blog/black-friday-2026/black-friday-2026-studio-hero.webp` | 2400x1350, 167 KB | frontmatter `image` (headline-free; the page supplies H1 and caption) |
| `public/images/blog/black-friday-2026/black-friday-2026-studio-og.png` | 1200x630, 316 KB | frontmatter `ogImage` |
| `public/images/blog/black-friday-2026/black-friday-2026-studio-mobile.webp` | 1080x1350, 69 KB | social portrait / mobile share |
| `public/images/blog/black-friday-2026/cost-per-output-black-friday-2026.svg` | 1200x720, 5 KB | chapter figure in "What the discount buys per output" |

Typography on the social crops: Poppins 600 headline (OFL; file `public/education/fonts/poppins-600.woff2`), Inter deck, JetBrains Mono eyebrow and date line, sentence case. Copy claims: "up to 69% off annual plans" (Higgsfield) and "up to 55% off the first year" (ElevenLabs), both as printed in the article and read on the vendor pages on 2026-11-26.

Second chapter visual: not produced. The CoE diagram already covers the operating model, and a renewal timeline would add one number that the Callout already states. Higgsfield's renewal price is not documented in the article.

## Marks and character

- **No logos in any generated or composited asset.** Vendor names are set in type, following the repo's PlatformMarkGrid `name-only` convention.
- Higgsfield: no official SVG obtainable (simple-icons `icons/higgsfield.svg` returns 404; vendor site blocked by the sandbox proxy).
- ElevenLabs: simple-icons `icons/elevenlabs.svg` exists (the two-bar symbol; path data CC0, source and guidelines listed as `https://elevenlabs.io/brand`; the trademark stays with ElevenLabs; guidelines not reviewed because the domain is blocked). Not used, so both vendors get equal treatment and the cover does not look like a co-branded partner asset.
- Flag: `public/images/brands/elevenlabs.svg` in this repo is a hand-built approximation (rounded bars plus `system-ui` text), not the official mark. Do not use it as a verified asset.
- Mini Frank (Frank Omega): not included in the hero. The cover keeps one subject. If the author wants him in the article, use `MascotInsight` in the body with the existing approved PNGs. No lookalike was generated.

## Registry entries

- `data/visual-asset-ledger.json`: 11 records for slug `black-friday-2026-higgsfield-elevenlabs-ai-stack` (3 new derivatives, 1 new infographic, 4 screenshots, composite plus its OG, CoE diagram). Each record carries `rights` and `provenance` (sha256, dimensions, model, flow, generation and prompt, or source URL and capture date). `reviewStatus: pending-independent-review`, `qualityScore: null`: no self-scored quality. Meta counts recomputed.
- `data/editorial-visuals.json`: 8 figure entries prefixed `bf2026-`, usable through `<ArticleFigure id="…" />`.

## Open items (release packet)

- Independent visual review of the hero, OG and mobile crop (character/logo fidelity reviewer).
- Desktop and mobile render of the article in the running app at 375 / 768 / 1440.
- Cost chart is too small to read at 375 px (1200-wide SVG). The article table carries the same numbers, and LiquidGlassImage offers enlarge. A portrait variant is an option if review asks for it.
- Regenerate `data/blog-hero-manifest.json` (prebuild `scripts/build-route-index.mjs`) after the frontmatter change, or `lib/blog.ts` will fall back to a category hero.
- Existing OG `black-friday-2026-ai-stack-og.png` is 1200x675; it becomes unused once `ogImage` points to the new file.
- The existing CoE diagram mixes four accents (violet, emerald, amber, cyan) against the two-spectrum rule. Flagged, not changed.
- Owner (Frank) approval of the selected direction.
