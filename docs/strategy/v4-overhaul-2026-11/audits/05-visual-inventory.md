# Visual asset inventory: frankx.ai-vercel-website (read-only)

Generated 2026-11-05. Nothing was edited, committed, pushed, or deleted. Scan script and raw data: `scratchpad/scan.py`, `inventory2.json`, `ranked.json`.

## Method and limits
- 2,010 image files under `public/images` (825 PNG, 424 SVG, 298 WebP, 275 JPEG, 188 JPG), about 1,009 MB on disk. The Jan 2026 registry claims 237 MB and 289 assets, so it is stale.
- Reference check: text tokens from `app/ components/ content/ lib/ data/` were indexed. A file counts as referenced if its full `/images/...` path, or a distinctive hyphenated stem, appears. Generic basenames such as `portrait.png` were excluded after they caused false hits.
- Reference tiers: rendered (`app/`, `components/`, `lib/`), content (`content/blog`, `content/guides`), social drafts, and `data/` manifests. Almost every file is named in `data/vault-manifest.json` or `data/blog-hero-manifest.json`, so "referenced" overstates real use.
- Quality grades are heuristic (dimensions, file weight, format). I opened a contact sheet of the team and Omega art to check them. The other files were not viewed.

## 1. Conventions that exist

`public/images/CLAUDE.md` contains no rules. It is only a claude-mem activity block. The conventions come from the audit docs and `registry.json`:

- **Naming:** kebab-case. Blog heroes are `<slug>-hero.(jpg|png|webp)`, with premium variants `<slug>-hero-premium.png`. Thumbnails are `<name>_thumb.jpeg`. Raw generator names (`infographic-1769…png`, UUIDs) were flagged for renaming in Jan 2026 and are still common.
- **Folders:** `blog/` (heroes plus `generated/`, `editorial/headers/`, `visual-system/`), `mascot/`, `team/`, `portraits/`, `acos/`, `arcanea/`, `books/`, `products/plates/` (SVG), `social/blog/<slug>/` (portrait, square, wide). Collection folders are mapped in `registry.json`, which says `/images/blog/` has 180 assets and `/images/team/` has 10. Both counts are out of date.
- **Thumbs:** `_thumb.jpeg` companions, generated with `convert -resize 400x -quality 80` (CXO_IMAGE_AUDIT.md). Missing for soulbook, golden-age, and many infographics.
- **Formats:** the audits recommend WebP for large team PNGs (about 2.5 MB each) and PNG or JPEG for heroes. No size limit is written down.
- **Alt text:** no written rule. The only example is the proposed `alt` field in CXO_IMAGE_AUDIT.md. `FrankOmega.tsx` uses its display label as alt text, which is weak.
- **Registry schema:** `registry.json` v1.0 has `collections{path,count,hasThumbnails,status,assets[{name,use}]}`, plus `missingAssets` and `needsThumbnails`. The CXO proposal adds `id, path, thumbnail, category, usedIn[], dimensions, size, alt, tags`.
- **Other inventories:** `IMAGE_CATALOG.md`, `IMAGE_ASSIGNMENTS.md`, `IMAGE_ORGANIZATION_FINAL.md`, `QUALITY_AUDIT.md`, `CXO_IMAGE_AUDIT.md`, and `VISUAL_INVENTORY_2026.{md,csv}` (about 200 rows, with `quality_est`, `spectrum`, `status`, `storageLocalPath`). The CSV is the most current.
- **Brand rules** (from VISUAL_INVENTORY_2026.md and design.md): Tech spectrum (emerald/cyan) for agent and architecture work, Soul spectrum (amber/gold) for music, Bridge (purple) sparingly. Do not mix spectra in one hero. Avoid meditation and quantum-woo composites.

## 2. Characters and mascots

**Frank Omega (FRANK-Ω), the robot mascot**
- `components/FrankOmega.tsx` maps 10 variants to `/images/mascot/<file>`: `pixar-blue`, `hero`, `chill`, `portrait`, `chibi-avatar`, `pointing`, `thinking`, `chibi`, `pixar-chibi`, `pixar-v1`. Moods map to variants. Sizes xs and sm use `_thumb.jpeg`.
- Files: 9 PNG (1024², 1.1–1.8 MB each) plus `frank-omega-pixar-v1.webp` (4096², 291 KB, used by the component).
- Also `logos/frankx-omega.svg` (used by `EcosystemBadges.tsx`), `acos/acos-hero-omega.png` (1024², 1.8 MB, data manifest only), and `blog/generated/skills-vs-agents-hero-omega-v2.jpg` (content).
- Used on `/frankx`, `/acos`, `/lab`, `/linktree`, `/linktree/[audience]`, home (`HomePageElite`), `NotFoundClient`, and `NewsletterCTA`.
- Visual check: a dark chrome robot with cyan eyes and a purple core, on a dark blue backdrop. Strong brand fit. The hero PNG is heavy and should be WebP.

**Frank's mini-me avatar.** Two candidates:
- `portraits/frankx-avatar.png` (400×400, 106 KB). A cartoon of Frank with a small robot companion. It is used on `/connect` (`ConnectHero.tsx`). This is my best match.
- `mascot/` and `guides/mini-me/` (4 SVG plates, 941–1122 px wide). These are storyboard layouts, not portraits.
- The mini-me pipeline is `public/skills/mini-me-storyboard/` (SKILL.md plus two references). Its identity source photos are not in this repo.

**Biro and Nilo.** I could not find "Biro" anywhere on disk. "Nilo" appears only in two text files: `gencreator.ai/docs/product/agency-team-2026-10-12/agency-team-prd.md` ("existing Nilo/Brio silhouettes"), and `starlight-design-intelligence/playbooks/character-canon-retrieval.md` (`custom.nilo`). The matching "Brio" appears as `custom.brio`. No image files for either name exist in the repos I checked. The PRD may be the source of the name you have in mind ("Brio" might be the spelling you meant). If the silhouettes exist, they are in a private source not checked out here.

**Team roster** (`public/images/team/`): 19 top-level PNG (17 characters plus `team-lineup-composite.png`), 8 duplicate PNG under `team/archive/`, and `character-prompts.json` (17 entries with `name`, `role`, `image`). The roster is Arion & Mamoru, Lumina & Sol, Nero & Umbra, Draconia & Draconis, Shinkami, Codex & Talon, Echo & Kira, Nova & Inari, Stella & Athena, Luminor Prime, Codex, Sonnet, Lumi, Stella, Nova, Echo, Sensei, and Nexus (in the folder, not in the JSON). Sizes are 1024² or 896×1200, 0.4–1.6 MB. Used on `/team`, `/ai-architect`, `/shop`, `/music`. The visual style is a dark digital character (not uniform). Lumi, Stella, Nova, Echo, Sensei, Codex, and Sonnet form a separate chibi style set, distinct from the detailed digital characters.

**Axi** (`mascot/axi-*`): 7 PNG (v1 full, v2 avatar, v3 icon, v4 hero, v5 celebrating/thinking/waving at 1344×768). Used by `MascotInsight.tsx` and `/blog/[slug]`.

**Mascot series** (`mascot/mascot-v05`…`v25`, no v12): 20 PNG, mostly 1024² (a few 1376×768), 0.4–0.85 MB each, mostly used on `/ai-art`. Several are shown only in the data manifest.

**Other characters:** `mascot/frequency-alchemist-sonic.jpg`, `hermes-swarm-operator.jpg`, `luminor-crown-guardian.jpg`, `creation-engine-droid.jpg`, `starlight-codex-architect.jpg` (768², 78–127 KB, manifest only). `agents/*.svg` (4 files, 1 KB each, used by `app/api/agents/route.ts`). `alea/katze-*.webp` (Katze, used by `/alea/katze`).

## 3. Starlight-branded images

Files named with "starlight" (or the starlight-* product plates):
- `agents/starlight-architect.svg` (render tier).
- `acos/starlight-orchestrator.png` (1024², 1.8 MB, content).
- `golden-age/starlight-intelligence-v2.png` and `.webp` (5504×3072).
- `blog/starlight-intelligence-system-how-ai-agents-learn-hero.jpg` (1408×768, content).
- `blog/generated/starlight-…-premium-hero.png` (1672×941) and `infogenius-starlight-neural-cosmos.jpg`.
- `social/blog/starlight-intelligence-system-how-ai-agents-learn/` (portrait, wide, square).
- `downloads/starlight-sip-starter.png` and `starlight-plugin-starter.png` (1024², downloads).
- `products/plates/starlight-operator-pack.svg` and `starlight-spec.svg`.

The `starlight-design-intelligence` repo has no image files. `brand-image-system/runtime/asset-registry.json` has zero assets. Its entry schema requires `jobId, brandId, workflowId, fingerprint, binding, evidence, approvalAssertion, outputs`, which is a different model from `registry.json`. The agentic-creator-os repo has 29 images, mostly `docs/infographics/`, and no `assets/` folder.

**Small icon-like images:** only 3 squares at 512 px or less exist: `portraits/frankx-icon.png` (96², manifest only), `qr/workshops-ikigai-branding.png` (250²), and `portraits/frankx-avatar.png` (400²). Nothing else fits "mini picture" icon use.

## 4. Top 60 assets

Ranked by rendered and content references (score = 3×rendered + 2×content + social + 0.1×manifest, with a small boost for character folders). Quality is 1–5 heuristic. Routes come from `app/` pages and from the components that import them.

| # | path | subject (from name) | style (inferred) | dims | KB | used on | quality 1-5 | suggested placement |
|---|---|---|---|---|---|---|---|---|
| 1 | `blog/agentic-creator-os.svg` | agentic creator os | vector | - | 2 | /acos; API route checkout; app/downloads/DownloadsClient.tsx | 3 | Blog hero (16:9) / social export |
| 2 | `products/plates/creation-chronicles.svg` | creation chronicles | vector | - | 6 | API route checkout; API route subscribe; /creation-chronicles | 3 | Product/book cover |
| 3 | `downloads/agentic-creator-os.png` | agentic creator os | AI-generated illustration | 1024x1024 | 1771 | /acos; API route checkout; app/downloads/DownloadsClient.tsx | 4 | Section header / inline |
| 4 | `products/plates/agentic-creator-os.svg` | agentic creator os | vector | - | 6 | /acos; API route checkout; app/downloads/DownloadsClient.tsx | 3 | Product/book cover |
| 5 | `products/plates/self-development.svg` | self development | vector | - | 4 | app/books/components/BookDownloadGate.tsx; app/books/layout.tsx; app/books/lib/books-registry.ts | 3 | Product/book cover |
| 6 | `portraits/frank-presenting-oracle-2025.jpg` | frank presenting oracle 2025 | illustration (photo-like if portrait, verify) | 1920x1440 | 292 | /connect; /about; /bio | 3 | About/Connect portrait (Frank only) |
| 7 | `courses/prompt-engineering.jpg` | prompt engineering | AI-generated illustration | 1024x1024 | 1488 | /ai-art; via AIArtShell; via related-portals -> /guides, /guides/[slug] | 4 | Section header / inline |
| 8 | `products/plates/creative-ai-toolkit.svg` | creative ai toolkit | vector | - | 6 | API route checkout; /products; /products/creative-ai-toolkit | 3 | Product/book cover |
| 9 | `agents/creation-engine.svg` | creation engine | vector | - | 1 | API route agents; API route content; /content-studio | 3 | Section header / inline |
| 10 | `products/plates/spartan-mindset.svg` | spartan mindset | vector | - | 4 | app/books/components/BookDownloadGate.tsx; app/books/lib/books-registry.ts; app/books/lib/theme-classes.ts | 3 | Product/book cover |
| 11 | `mascot/mascot-v25-crystal-familiar.png` | mascot v25 crystal familiar | 3D/pixar-style robot mascot | 1024x1024 | 558 | /ai-art; app/blog/BlogPageClient.tsx; /coaching | 4 | Mascot/ai-art gallery; blog MascotInsight |
| 12 | `blog/multi-agent-orchestration.png` | multi agent orchestration | AI-generated illustration | 1376x768 | 588 | /ai-architect-academy/patterns; /ai-architecture/blueprints; app/guides/GuidesPageClient.tsx | 4 | Blog hero (16:9) / social export |
| 13 | `products/plates/love-and-poetry.svg` | love and poetry | vector | - | 4 | app/books/components/BookDownloadGate.tsx; app/books/lib/books-registry.ts; app/books/lib/theme-classes.ts | 3 | Product/book cover |
| 14 | `blog/editorial/headers/best-ai-tools-for-creators-2026-hero.webp` | best ai tools for creators 2026 hero | AI-generated illustration | 1600x900 | 72 | via blog -> /, /blog, /blog/[slug]; /blog/ai-health-fitness-athletes-creators-2026; /blog/best-ai-affiliate... | 3 | Blog hero (16:9) / social export |
| 15 | `agents/frequency-alchemist.svg` | frequency alchemist | vector | - | 1 | API route agents; API route content; /content-studio | 3 | Section header / inline |
| 16 | `products/plates/suno-prompt-library.svg` | suno prompt library | vector | - | 6 | API route checkout; /products; /products/suno-prompt-library | 3 | Product/book cover |
| 17 | `team/codex-falcon.png` | codex falcon | anime/digital character art | 896x1200 | 782 | app/ai-architect/AIArchitectClient.tsx; /for/architects; /team | 3 | Team/character roster (/team, character cards) |
| 18 | `mascot/frank-omega-thinking-v1.png` | frank omega thinking v1 | 3D/pixar-style robot mascot | 1024x1024 | 1320 | /frankx; /gencreator; /gencreator/soul | 4 | Brand/character: FrankOmega slot (about, home, agents) |
| 19 | `mascot/frank-omega-chibi-avatar-v1.png` | frank omega chibi avatar v1 | 3D/pixar-style robot mascot | 1024x1024 | 1354 | /frankx; /gencreator; /infogenius | 4 | Brand/character: FrankOmega slot (about, home, agents) |
| 20 | `agents/starlight-architect.svg` | starlight architect | vector | - | 1 | API route agents; API route content; via AgentGrid | 3 | Section header / inline |
| 21 | `golden-age/hero-golden-age.png` | hero golden age | AI-generated illustration | 1584x672 | 717 | /ai-art; app/books/lib/books-registry.ts; app/golden-age/layout.tsx | 4 | Section header / inline |
| 22 | `ecosystem/01-frankx-ecosystem-overview.png` | 01 frankx ecosystem overview | AI-generated illustration | 1376x768 | 765 | /ai-art; /shop; /vault | 4 | Section header / inline |
| 23 | `products/plates/visual-creation-loop.svg` | visual creation loop | vector | - | 6 | API route checkout; /products; /products/visual-creation-loop | 3 | Product/book cover |
| 24 | `blog/generated/ai-image-video-generation-playbook-2026-premium-hero.png` | ai image video generation playbook 2026 premium hero | AI-generated illustration | 1672x941 | 2152 | via blog -> /, /blog, /blog/[slug]; /blog/ai-image-video-generation-playbook-2026; /blog/claude-opus-4-8-an... | 4 | Blog hero (16:9) / social export |
| 25 | `team/echo-leopard.png` | echo leopard | anime/digital character art | 896x1200 | 782 | /music; /team; via AboutShell | 3 | Team/character roster (/team, character cards) |
| 26 | `mascot/frank-omega-chill-v1.png` | frank omega chill v1 | 3D/pixar-style robot mascot | 1024x1024 | 1271 | /frankx; via FrankOmega -> /acos, /frankx, /lab; via AboutShell | 4 | Brand/character: FrankOmega slot (about, home, agents) |
| 27 | `mascot/frank-omega-hero-v1.png` | frank omega hero v1 | 3D/pixar-style robot mascot | 1024x1024 | 1805 | /frankx; via FrankOmega -> /acos, /frankx, /lab; via AboutShell | 4 | Brand/character: FrankOmega slot (about, home, agents) |
| 28 | `mascot/mascot-v16-organic-digital-split.png` | mascot v16 organic digital split | 3D/pixar-style robot mascot | 1024x1024 | 831 | /ai-art; app/vision/VisionContent.tsx; via AIArtShell | 4 | Mascot/ai-art gallery; blog MascotInsight |
| 29 | `mascot/frank-omega-pixar-blue-v1.png` | frank omega pixar blue v1 | 3D/pixar-style robot mascot | 1024x1024 | 1252 | /frankx; /gencreator; /infogenius | 4 | Brand/character: FrankOmega slot (about, home, agents) |
| 30 | `design-lab/nature-01-digital-garden-hero.png` | nature 01 digital garden hero | AI-generated illustration | 1376x768 | 727 | /ai-art; /design-lab/nature; via AIArtShell | 4 | Section header / inline |
| 31 | `design-lab/nature-05-forest-architecture.png` | nature 05 forest architecture | AI-generated illustration | 1376x768 | 767 | /ai-art; /design-lab/nature; via AIArtShell | 4 | Section header / inline |
| 32 | `design-lab/nature-10-constellation-garden.png` | nature 10 constellation garden | AI-generated illustration | 1376x768 | 997 | /ai-art; /design-lab/nature; via AIArtShell | 4 | Section header / inline |
| 33 | `products/plates/generative-creator-os.svg` | generative creator os | vector | - | 6 | /products; /products/generative-creator-os; via ProductsShell | 3 | Product/book cover |
| 34 | `brand/frankx-public-workspace-og-1200x630.png` | frankx public workspace og 1200x630 | AI-generated illustration | 1200x630 | 286 | app/research/layout.tsx; /research/model-arena; /stack | 3 | Section header / inline |
| 35 | `products/plates/agent-fleet-pro.svg` | agent fleet pro | vector | - | 6 | API route checkout; /products; via delivery | 3 | Product/book cover |
| 36 | `products/plates/dpi-field-kit.svg` | dpi field kit | vector | - | 6 | API route checkout; /products; via delivery | 3 | Product/book cover |
| 37 | `ai-art/neural-network-brain.png` | neural network brain | AI-generated illustration | 1024x1024 | 1230 | /ai-art; via AIArtShell; via index | 4 | Section header / inline |
| 38 | `blog/editorial/headers/ai-model-routing-guide-hero.webp` | ai model routing guide hero | AI-generated illustration | 1600x900 | 75 | via blog -> /, /blog, /blog/[slug]; /blog/CONTENT_SCHEMA; /blog/deepseek-r1-open-weight-reasoning-analysis | 3 | Blog hero (16:9) / social export |
| 39 | `mascot/mascot-v05-techno-beast-standing.png` | mascot v05 techno beast standing | 3D/pixar-style robot mascot | 1024x1024 | 683 | /ai-art; /team; via AIArtShell | 4 | Mascot/ai-art gallery; blog MascotInsight |
| 40 | `team/draconia-tiger.png` | draconia tiger | anime/digital character art | 896x1200 | 800 | /shop; /team; via AboutShell | 3 | Team/character roster (/team, character cards) |
| 41 | `mascot/mascot-v06-prowling-action.png` | mascot v06 prowling action | 3D/pixar-style robot mascot | 1024x1024 | 714 | /ai-art; app/blog/BlogPageClient.tsx; via AIArtShell | 4 | Mascot/ai-art gallery; blog MascotInsight |
| 42 | `mascot/frank-omega-pixar-chibi-v1.png` | frank omega pixar chibi v1 | 3D/pixar-style robot mascot | 1024x1024 | 1189 | /frankx; /infogenius; via FrankOmega -> /acos, /frankx, /lab | 4 | Brand/character: FrankOmega slot (about, home, agents) |
| 43 | `gallery/instruments/biotech-grand-piano.png` | biotech grand piano | AI-generated illustration | 1376x768 | 737 | /collectibles/instruments; /gallery/instruments; /gallery | 4 | Section header / inline |
| 44 | `ai-world/fire-gate-orchestration.png` | fire gate orchestration | AI-generated illustration | 1376x768 | 998 | /ai-art; /ai-world; via AIArtShell | 4 | Section header / inline |
| 45 | `ai-world/intelligence-atlas-hero.png` | intelligence atlas hero | AI-generated illustration | 1376x768 | 886 | /ai-art; /ai-world; via AIArtShell | 4 | Section header / inline |
| 46 | `ai-world/source-gate-meta.png` | source gate meta | AI-generated illustration | 1376x768 | 883 | /ai-art; /ai-world; via AIArtShell | 4 | Section header / inline |
| 47 | `blog/generated/sovereign-creator-wealth-os.jpg` | sovereign creator wealth os | AI-generated illustration | 1376x768 | 828 | /blog/is-revolut-safe-netherlands-2026; /blog/revolut-fees-netherlands-2026; /blog/revolut-plans-netherland... | 4 | Blog hero (16:9) / social export |
| 48 | `design-lab/nature-02-neural-roots.png` | nature 02 neural roots | AI-generated illustration | 1376x768 | 703 | /ai-art; /design-lab/nature; via AIArtShell | 4 | Section header / inline |
| 49 | `design-lab/nature-09-crystal-garden.png` | nature 09 crystal garden | AI-generated illustration | 1376x768 | 791 | /ai-art; /design-lab/nature; via AIArtShell | 4 | Section header / inline |
| 50 | `design-lab/nature-03-code-vines.png` | nature 03 code vines | AI-generated illustration | 1376x768 | 746 | /ai-art; /design-lab/nature; via AIArtShell | 4 | Section header / inline |
| 51 | `ecosystem/07-arcanea-10-gates.png` | 07 arcanea 10 gates | AI-generated illustration | 1376x768 | 867 | /ai-art; via AIArtShell; via StreamShowcase -> /newsletter | 4 | Section header / inline |
| 52 | `youtube/youtube-pipeline-infographic.png` | youtube pipeline infographic | infographic / diagram | 1376x768 | 804 | /youtube-strategy; /youtube; via YouTubeStrategyShell | 4 | Section header / inline |
| 53 | `guides/higgsfield/cinema-4-poster.jpg` | cinema 4 poster | AI-generated illustration | 1920x1072 | 42 | /guides/higgsfield-ai-video-guide; /guides/higgsfield-camera-movement-prompts; /guides/higgsfield-credits-p... | 3 | Section header / inline |
| 54 | `products/plates/command-center-template.svg` | command center template | vector | - | 6 | API route checkout; /checkout/[slug]; /products | 3 | Product/book cover |
| 55 | `products/plates/agentic-media-machine.svg` | agentic media machine | vector | - | 6 | API route checkout; /products; via delivery | 3 | Product/book cover |
| 56 | `products/plates/memory-palace-os.svg` | memory palace os | vector | - | 6 | API route checkout; /products; via delivery | 3 | Product/book cover |
| 57 | `products/plates/starlight-operator-pack.svg` | starlight operator pack | vector | - | 6 | API route checkout; /products; via delivery | 3 | Product/book cover |
| 58 | `books/family/david/cover.webp` | cover | AI-generated illustration | 1023x1537 | 187 | app/books/family/FamilyBooksHub.tsx; app/books/family/david/DavidStorybook.tsx; /books/family/david | 3 | Product/book cover |
| 59 | `blog/agentic-creator-os-complete-guide-hero.png` | agentic creator os complete guide hero | AI-generated illustration | 1376x768 | 735 | /ai-art; /gencreator/blueprints; via AIArtShell | 4 | Blog hero (16:9) / social export |
| 60 | `blog/acos-v10-social-infographic.png` | acos v10 social infographic | social card render | 1376x768 | 742 | via content-hub; 2-ready-to-publish | 4 | Blog hero (16:9) / social export |

Notes on the table: the top 60 is weighted toward the products and plates set, because the plates are used across checkout and book routes. Hero and character art rank lower by this measure, though it is the more valuable art. Placement suggestions are my reading of folder and name, not owner intent.

## 5. Unused assets

**Strictly unused** (no reference in any scanned folder): 12 files.
- `See-through-the-noise/` (6 screenshots, 79–454 KB, 0.6–1.3 MP). These are screenshots of unknown provenance under `public/` and will be served publicly. Review them before deploy.
- `products/plates/` (6 SVGs, 4–6 KB): golden-age, manifestation, soulbook, imagination, starter-kit, vibe-os.

**Not rendered by `app/`, `components/`, or `lib/`** (non-thumb): 1,383 files. By folder: blog 559, social 281, infographics 132, diagrams 109, library 24, lead-magnets 24, acos 20, ai-architecture 19, team 16, logos 16, books 14, downloads 13. These are reachable only through content, social drafts, or manifests. Blog MDX content is rendered by `app/blog/[slug]`, so the blog figure is not a true unused count.

**30 largest not rendered by app code** (candidates for WebP or resize, not deletion):

| size | dims | path | reference tiers |
|---|---|---|---|
| 7,887 KB | 5504×3072 | `bio/dawn-studio.jpg` | data |
| 7,535 KB | 2752×1536 | `ai-art/crystalline-brain-runes.png` | data |
| 3,624 KB | 2752×1536 | `priority-2026-04-25/05-library-approach-manifesto.jpg` | data |
| 3,479 KB | 2752×1536 | `priority-2026-04-25/08-agent-frameworks-triptych.jpg` | data |
| 3,314 KB | 1024×1536 | `portraits/frankx-magical-forest-v2.png` | data |
| 3,030 KB | 1536×1024 | `arcanea/arcanea-academy-vistas.png` | data |
| 3,015 KB | 1024×1536 | `arcanea/wormhole-portal.png` | data |
| 2,986 KB | 1024×1536 | `arcanea/luminor-majestic-leadership.png` | data |
| 2,979 KB | 1024×1536 | `ai-art/ai-architect-professor.png` | data |
| 2,831 KB | 1024×1536 | `ai-art/sustainable-architecture.png` | data |
| 2,816 KB | 1024×1536 | `ai-art/ai-architect-education.png` | data |
| 2,766 KB | 2752×1536 | `watch/watch-os-hero.jpg` | data |
| 2,645 KB | 2752×1536 | `blog/acos-v11-visual-intelligence-site-integrity.webp` | content, data |
| 2,599 KB | 2752×1536 | `priority-2026-04-25/02-coe-hub-framework.jpg` | data |
| 2,585 KB | 1200×1788 | `books/hoffnung-cover-v2.png` | data |
| 2,558 KB | 1024×1536 | `ai-art/epic-sci-fi-vibe.png` | data |
| 2,500 KB | 2752×1536 | `priority-2026-04-25/07-start-here-threshold.jpg` | data |
| 2,467 KB | 1672×940 | `blog/generated/frankx-intelligence-atlas-volume-1-premium-hero.png` | data, social |
| 2,452 KB | 1672×941 | `blog/generated/qwen3-max-analysis-2026-premium-hero.png` | content, data, social |
| 2,405 KB | 1672×941 | `blog/generated/mcp-ecosystem-2026-clawhub-smithery-guide-premium-hero.png` | data, social |
| 2,398 KB | 2048×2048 | `workshops/ikigai-branding/v6-venn-variant-2.jpg` | data |
| 2,391 KB | 2048×2048 | `workshops/ikigai-branding/v6-venn-variant-4.jpg` | data |
| 2,335 KB | 1672×941 | `blog/generated/agentic-os-family-foundry-launch-premium-hero.png` | data, social |
| 2,325 KB | 2048×2048 | `workshops/ikigai-branding/v6-venn-variant-1.jpg` | data |
| 2,309 KB | 2752×1536 | `workshops/ikigai-branding/v4-hero-variant-4.jpg` | data |
| 2,304 KB | 1672×941 | `blog/generated/magnifica-humanitas-benevolent-future-arcanea-premium-hero.png` | data, social |
| 2,297 KB | 1672×941 | `blog/generated/agentic-ai-roadmap-2026-premium-hero.png` | data |
| 2,296 KB | 2752×1536 | `priority-2026-04-25/04-sis-substrate-hero.jpg` | data |
| 2,294 KB | 1672×941 | `blog/generated/ai-video-generation-2026-sora-runway-kling-veo-premium-hero.png` | data |
| 2,293 KB | 1672×941 | `blog/generated/building-research-intelligence-system-premium-hero.png` | data, social |

`bio/dawn-studio.jpg` (7.7 MB) sits in the `bio/` folder and may be a personal photo. Confirm it is meant for the public site before optimizing it.

## 6. Where new images should go

**Intake.** Use the existing folder `content/images/images ingest/`. It already has 127 files in subfolders (`infographic ingest/`, `Profile/`, and loose files). It sits under `content/`, so Next.js does not serve it. Keep it there until an image is approved. After approval, copy the file into the served folder.

Two problems to fix before using it:
- It contains files that look like personal photos from their names (`IMG_4967.jpg`, `Copy of P1081522.jpg`, `Student Visit Catolica January 2026.jpeg`, `Profile/`). I did not open them. Check consent and privacy before any of them go public.
- The name has a space. Rename it to `content/images/intake/` (or keep the name and add a README) so tooling does not break on spaces.

**Promotion path.** Approved file goes to the matching served folder: `blog/` for heroes, `mascot/` for Omega and robot variants, `team/` for characters, `portraits/` for people, `products/plates/` for SVG. It gets a kebab-case name, a `_thumb.jpeg` (about 400 px wide), and a WebP copy if over 1 MB.

**Manifest fields.** Use one entry per image in `public/images/registry.json` (or a sibling `assets.json`). Required:
- `id`, `path`, `thumbnail`, `dimensions`, `bytes`, `sha256`, `ext`
- `category` (folder), `status` (intake | approved | published | retired)
- `subject`, `style` (for example `pixar-robot`, `anime-character`, `photo`, `infographic`, `svg`), `spectrum` (tech | soul | bridge)
- `alt` (required, under 125 characters, describes what is shown, not the label)
- `character_id` (for team and mascot art; match `character-prompts.json` ids)
- `usedIn[]` (routes), `tags[]`
- `provenance`: generator and model with date, or `owner-photo`, plus `prompt_file` if generated
- `consent` (required when a real person appears: `owner`, `released`, or `n/a`)
- `quality` (1–5) and `reviewedBy`

The Starlight `asset-registry.schema.json` is for a different workflow (job, binding, approval). Do not reuse it for this site.

## 7. Recommended first actions (owner decisions)

1. Confirm the name: Biro, Brio, or Nilo. Ask where the silhouettes live (private skill or gencreator repo).
2. Choose the mini-me avatar: `portraits/frankx-avatar.png` or a new export.
3. Review `See-through-the-noise/` before deploy, since it is publicly served.
4. Convert `frank-omega-pixar-v1` and the large team PNGs to WebP.
5. Pick one intake folder and document it in `public/images/CLAUDE.md`, which currently has no rules.
