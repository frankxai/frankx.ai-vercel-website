# frankx.ai information-architecture audit

Read-only audit of `frankxai/frankx.ai-vercel-website` (production repo; `main` deploys). Date basis: 2026-11-05. Nothing was edited, committed or pushed.

Evidence rule used throughout: every route/nav claim below was read from source in this checkout. Anything not verified is labelled "unverified".

---

## 1. Current navigation

### 1.1 Shell

- Desktop (`components/NavigationMega.tsx`, 706 lines): Radix `NavigationMenu`, visible at `lg` and up. Left: wordmark "FrankX.AI" -> `/`. Five triggers in this exact order (`desktopSections`): **Founder, Build, Learn, Create, Music**. Right: a "Search" button (opens `CommandPalette`, Ctrl+K) and a gradient pill CTA **"Explore AI Architecture" -> `/ai-architecture`**.
- Mobile (`components/MobileNavOverlay.tsx`, 812 lines): full-screen dialog (`id="mobile-site-navigation"`, `role="dialog"`, `aria-modal`). Home view lists the five sections (keys `music`, `gencreators`, `learn`, `build`, `explore`), then two tiles **Blog -> /blog** and **Journal -> /journal**, then a CTA **"Map Your Stack" -> /founder-stack**. Section view drills into a door with the same groups as desktop.
- Grouping helper: `lib/navigation-groups.ts` `resolveNavigationGroups()` never drops an item; anything not named in a group falls into a trailing "More to explore" group.
- Data is duplicated by hand in desktop and mobile (two registries that must be edited together; the completeness test executes both).
- Footer (`components/Footer.tsx`, 280 lines): 5 link columns + email signup + social row + legal row. Command palette (`components/CommandPalette.tsx`) does not hold nav data; it searches `lib/site-search.ts`, which reads `data/route-index.json` (1,077 routes) and groups results as Music / GenCreators / Learn / Build / Invest / Explore / Shortcuts. It blocks `/admin /api /auth /studio /papa /partnerships/proposal /partnerships/van-ede /thank-you /unsubscribe` from results.

### 1.2 Desktop menu tree (exact labels, hrefs, descriptions)

Icons are Lucide, one per item (not listed; every item has one). No images in the menus. Each door has one "featured" card (title, description, badge, href).

**Founder** (key `explore`, door href `/founder-stack`). Featured: "Map your Founder Stack" - "Find the constraint across State, Signal, Systems, Scale, and Stewardship." - badge "Start here" - `/founder-stack`. 29 items in 4 groups:
- *Founder path*: Founder Stack `/founder-stack` (Five layers, one current constraint); Founder Signal `/founder-signal`; Foundry `/foundry` (Install a founder operating system); Founder's Circle `/founders-circle`; Human Layer `/human-layer`; Signal Loop `/newsletter` (Founder field notes and optional streams).
- *Current work*: Workspace `/workspace`; Research `/research`; Signals `/signals`; Guides `/guides`; Essays `/blog`; Journal `/journal`.
- *Systems & products*: Starlight IS `/starlight-intelligence-system`; ACOS `/acos`; Agent Catalog `/agents`; Design System `/design`; Resource Hub `/resources`; Downloads `/downloads`.
- *Connect*: Partnerships `/partnerships`; About Frank `/about`; Media Kit `/media-kit`; Connect `/connect`; Contact `/contact`.
- Defined in the items array but not in any named group, so they render under auto "More to explore": Ecosystem `/ecosystem`, Universe Map `/map`, Dream 100 `/dream-100`, Core Qualities `/qualities`, Intelligence Atlas `/intelligence-atlas`, Library `/library`, Agent Hub `/agent-hub`, ArcaneaVault `/vault`, Arcanea `/magic`, Bio `/bio`, Licensing `/licensing`.

**Build** (door href `/ai-architecture`). Featured: "AI Architecture Hub" - "Blueprints, prototypes, templates, and investor intelligence. From idea to deployment." - badge Hub. 16 items in 4 groups:
- *Architecture*: Architecture Hub `/ai-architecture`; Blueprints `/ai-architecture/blueprints` (FREE); Prototypes `/ai-architecture/prototypes`; Templates `/ai-architecture/templates` (Starter kits $29-199).
- *Deep Dives*: Build Stack `/build`; Template Pack `/build/template-pack`; Builder Lab `/agentic-builder-lab`; AI World `/ai-world`; Developer Hub `/developers`.
- *Work with Frank*: AI Studio `/work-with-me` (EUR 3k-25k); Consulting `/consulting`; Workshops `/workshops`; Coaching `/coaching`; Shop `/shop` ($27-$297).
- *Invest*: Intelligence Hub `/investor`; Agent Packs `/investor/agents`.
- Note: `/consulting` page is a one-line `redirect('/work-with-me')`, so "AI Studio" and "Consulting" are two menu entries to one destination.

**Learn** (door `/learn`). Featured: "Learn Hub" - "Your learning OS - courses, guides, books, assessment, games, watch. Find your level." 9 items, no groups: Course Picks `/courses`; Guides `/guides`; Frank's Books `/books` (23 books, 411K+ words); Library `/library`; AI Assessment `/ai-assessment`; Student Hub `/students`; Games Lab `/games`; Watch `/watch`; AI Shorts `/watch/shorts`.

**Create** (key `gencreators`, door `/gencreator`). Featured: "Open GenCreator.AI" (external, `https://gencreator.ai/?utm_source=frankx&utm_medium=nav&utm_campaign=r1_bridge`, badge Product). 8 items, no groups: Open GenCreator.AI (external); GenCreator Hub `/gencreator`; Principles `/gencreator/principles`; Handbook `/gencreator/handbook`; Blueprints `/gencreator/blueprints`; Prompt Library `/prompt-library` (130+ prompts); Creation Chronicles `/creation-chronicles`; Templates `/templates`.

**Music** (door `/music`). Featured: "AI Music Portfolio" - badge Portfolio. 5 items: Music Showcase `/music`; Vibe OS `/products/vibe-os`; Music Lab `/music-lab`; Music School `/music/learn`; Suno Profile `https://suno.com/@frankx` (external).

### 1.3 Footer tree

Columns: **Music** (Music Showcase, Music Lab, Vibe OS, Suno Profile); **Create** (GenCreator.AI [external, UTM `footer`], Starter Kits `/templates`, Prompt Library, ACOS, Creation Chronicles); **Learn** (Mental Models `/mental-models`, Courses, Guides, Books, Library, Games Lab, Watch, Blog, Journal); **Workspace** (How it works `/workspace`, Research, Signals, Dream 100, Core Qualities, Library, Guides, Architecture Hub, Agent Catalog, Developers); **Founder** (Founder Stack, Founder Signal, Foundry, Founder's Circle, Human Layer, Connect, Partnerships, Work with Frank `/work-with-me`, Licensing, Newsletter, About, Contact). Social: LinkedIn, GitHub, Suno, X, YouTube, Instagram (from `lib/social-links`). Legal row: Privacy, Terms, Legal, Licensing, RSS (`/rss.xml`). Library and Guides appear twice; Licensing appears twice.

### 1.4 What the tests require (do not break these)

`scripts/tests/navigation-completeness.test.mjs`
- Executes the real `navigation` object from `NavigationMega.tsx` (slice from `const navigation` to `\ntype NavKey`) and `sections` from `MobileNavOverlay.tsx` (to `\nconst overlayVariants`) in a VM with Lucide icons stubbed. Both files must still contain `resolveNavigationGroups(` and the Lucide import must be a single `import { ... } from 'lucide-react'`.
- For every section on both surfaces: every configured item survives grouping exactly once, no duplicates, and ungrouped items must keep source order in the trailing group.
- A section with `label === 'Founder'` must exist on both surfaces and must expose exactly one item each for `/magic /vault /ecosystem /map /qualities /intelligence-atlas /licensing`.
- Pure-function tests of `resolveNavigationGroups` (curated order, stale names, no empty fallback group).

`scripts/tests/navigation-mobile-contract.test.mjs` (regex over source text)
- Mobile overlay: `id="mobile-site-navigation"`, `className="fixed inset-0 ... lg:hidden"`, `role="dialog"`, `aria-modal="true"`, focus trap (`previousFocus`, `Tab`, `Escape`), `data-mobile-nav-view="home"` and `="section"`, `data-mobile-nav-autofocus`, `sectionTriggerRef`, `data-mobile-nav-section-autofocus`, `onSelectSection(section.key, event.currentTarget)`, `useReducedMotion()`, body scroll lock; no `offsetParent`.
- `NavigationMega` imports and renders `<MobileNavOverlay isOpen={isOpen}`, has `aria-controls="mobile-site-navigation"`, must not contain `router.push`, "Public agentic workspace", or `text-[8px]`.
- Literal strings required: `label: 'Founder'`, `title: 'Map your Founder Stack'`, `label: 'Founder path'`, `href: '/founder-stack'`, `label: 'Music'`, mobile `key: 'music'`, `Map Your Stack`, the group labels `Founder path`, `Current work`, `Systems & products`, `Connect` in the mobile file, and the exact regex `const desktopSections: NavKey[] = [ 'explore', 'build', 'learn', 'gencreators', 'music'` (that order, those keys).
- Required hrefs present in `NavigationMega.tsx`: `/intelligence-atlas /starlight-intelligence-system /acos /resources /downloads /vault /magic /bio /media-kit /licensing /contact`.
- Menu group heading (`<h5 className=...>`) must not use `uppercase` or `font-serif`. No `className="...uppercase..."` anywhere in NavigationMega, MobileNavOverlay, Footer, CommandPalette.
- History in the test comments: PR #409 collapsed the nav to four doors without Frank asking and demoted Music; Frank's ruling is that Music stays its own door. A redesign must not repeat that.

Practical consequence: a redesign that renames keys, reorders `desktopSections`, or removes the Founder door breaks tests that encode prior decisions. Changing them is legitimate only in a dedicated navigation PR that states the new contract first (the repo bans bundling nav/IA changes with homepage PRs).

`scripts/tests/sitemap-exclusions.test.mjs` is not a nav guard but constrains routes: redirect sources, aliases, redirect-only pages, noindex prefixes must stay out of `app/sitemap.ts`.

---

## 2. Route inventory

Method: `ls app` (242 entries; ~221 real route directories after removing files, groups, `api`), page counts per directory, redirect-only detection, noindex scan, `lib/sitemap-exclusions.mjs`, `next.config.mjs` redirects (98 unconditional) and `data/redirect-aliases.json` (20), `app/sitemap.ts`, `data/route-index.json` (1,077 routes: 447 section, 278 blog, 88 library, 75 tool, 46 guide, 33 product, 24 core, 23 research...). Blog content dir: 288 files.

### 2.1 Indexing facts

- `robots.ts` disallows `/api/ /admin/ /auth/ /dashboard/ /(preview)/ /prototype/ /onboarding/ /command-center/`; AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.) are explicitly allowed. `/llms.txt`, `/llms-full.txt`, `/llm-hub.json`, `/openapi.json` exist.
- Sitemap excludes: robots-blocked prefixes, noindex prefixes (`/books/family`, `/familie/geschichte/*-linie`, `/newsletter/preferences`, `/newsletter/thank-you`, `/on-consciousness|faith|god|reality`, `/unsubscribe`, `/valentines-day/tien`, `/workshops/ikigai-branding/present`), `/blueprint*` (canonical elsewhere), and `EXCLUDED_PATHS`: `/ahmad /ai-architect/multi-cloud-comparison /consulting /father-code /graph /harzfenster /hospitality-os /jojo /links /portal/ana /products/agentic-creator-os /sis /the-future-is-for-everyone /thefutureisforeveryone /updates`.
- Literal redirects in `next.config.mjs`/aliases (also excluded): `/academy /aiarchitectacademy /ar-architect-academy /architect-academy -> /ai-architect-academy`; `/aco -> /agents`; `/ais /ana /ana-intelligence-system -> /allies/ana-cancino`; `/build-first-ai-agent /ikigai /ikigai-branding /ikigai-content-studio /personal-ai-coe /sovereign-leadership -> /workshops/*`; `/guide -> /guides`; `/mindvalley-university /mindvalleyuniversity -> /mvu`; `/signal -> /ai-architecture`; `/soul-frequency-assessment -> /soul-frequency-quiz`; `/arcanea -> https://arcanea.ai`; `/creator-lab /creator-lab-starter -> /acos`; `/arena -> /research/model-arena`; `/prototypes -> /ai-architecture/blueprints`; `/ai-architectures -> /ai-architecture`; `/ai-art -> /gallery`; `/store /marketplace -> /shop`; `/cards -> /collectibles/trading-cards`.
- Note: `app/sitemap.ts` still lists `/ai-architectures`, `/ai-art`, `/prototypes`, `/updates` in source arrays, but `isExcludedFromSitemap` filters them (verified by test), so they are not emitted.
- Sitemap high-priority set (>=0.9): `/`, `/the-future-we-choose` (0.95), `/founder-stack` (0.95), `/canva` (0.95), `/about`, `/founder-signal`, `/frank-riemer`, `/qualities`, `/blog` (daily), `/products`, `/prompt-library`, `/foundry`, `/soulbook`, `/research`, `/signals` (daily), `/library`, `/starlight-intelligence-system`, `/intelligence-system`, `/youtube`, `/for/creators`, `/for/architects`, two `/insights/*` essays.

### 2.2 Tier classification (top-level routes)

**T0 front door**: `/` (living-studio homepage; protected), `/start` (Founder constraint router), `/start-here` (Build your first AI agent; different job, same name family: flag), `/founder-stack`.

**T1 flagship hubs** (earn top-level prominence):
- Founder: `/founder-stack`, `/founder-signal`, `/foundry`, `/founders-circle`, `/human-layer`, `/newsletter`
- Proof / evidence: `/research`, `/signals`, `/blog` (288 posts), `/intelligence-atlas`, `/library`, `/guides`, `/journal`, `/changelog`
- Agents/build: `/acos` (+`/acos/agents`), `/ai-architecture` (7 pages), `/agent-hub`, `/llm-hub` (3 pages; **not in nav at all**), `/agents`, `/agentic-builder-lab`, `/build`, `/developers`, `/ai-architect-academy`
- Commercial: `/products` (16 pages), `/shop`, `/work-with-me`, `/workshops`, `/coaching`, `/courses`, `/partners`, `/affiliates`
- Creative: `/music` (14), `/music-lab` (10), `/gencreator` (6), `/prompt-library`, `/templates`
- Identity: `/about`, `/frank-riemer`, `/bio`, `/media-kit`, `/contact`, `/connect`

**T2 supporting**: `/ai-assessment`, `/assessment`, `/assess`, `/tools`, `/resources`, `/downloads`, `/skills`, `/students`, `/games`, `/watch`, `/youtube`, `/opus-pro`, `/canva`, `/content-studio`, `/creation-chronicles`, `/mental-models`, `/qualities`, `/dream-100`, `/ecosystem`, `/map`, `/workspace`, `/vault`, `/magic`, `/licensing`, `/community`, `/inner-circle`, `/testimonials`, `/for/*`, `/ask`, `/search`, `/ai-ops` (7), `/ai-world`, `/enterprise`, `/ai-coe`, `/ai-coe-readiness`, `/investor`, `/intelligence-system`, `/design`, `/design-system`, `/mvu`, `/soulbook` (7), `/manifestation`, `/golden-age`, `/books`, `/learn`, `/courses`, `/peak-performance`, `/human-layer`, `/ecosystems`, `/allies`, `/partnerships`, `/starlight-intelligence-system`, `/starlight`.

**T3 deep/archive**: `/design-lab` (32 pages, 3 noindex files), `/studio` (14; blocked from palette), `/downloads` sub-pages, `/collectibles`, `/auctions`, `/mind`, `/os`, `/the-secret`, `/think-and-grow-rich`, `/the-light-within`, `/year-of-the-fire-horse`, `/valentines-day`, `/travel`, `/quest`, `/realm`, `/rituals`, `/sprint`, `/drops`, `/feed`, `/gallery`, `/showcase`, `/inspiration`, `/observatory`, `/globe`, `/experiences`, `/experiments`, `/labs`, `/lab`, `/progress`, `/roadmap`, `/plan`, `/goals`, `/achievements`, `/path`, `/superpowers`, `/stack`, `/n8n`, `/v0`, `/automation`, `/cloud`, `/open-source`, `/see-through-the-noise`, `/the-builders-line`, `/the-future-we-choose`, `/product-development`, `/hospitality-intelligence`, `/agentic-life-os`, `/agentic-ai-center`, `/agentic-creator` (roles), `/youtube-strategy`, `/content-strategy`, `/free-playbook`, `/founder-playbook`, `/music-os`, `/music-intelligence`, `/infogenius`, `/prompts`, `/artists`, `/creators`, `/visionaries`, `/network`, `/presence`, `/team`, `/waitlist`, `/thank-you`, `/legal` `/privacy` `/terms`.

**P personal/family (keep, exclude from main nav)**: `/papa` (6 pages; indexed subset only `/papa`, `/papa/leben`, `/papa/en`, `/papa/en/life`; palette blocks it), `/familie` (8; noindex files), `/family` (2; noindex), `/opa-und-oma`, `/lebensbaum`, `/hoffnung`, `/erde`, `/svijet`, `/witali`, `/friends`, `/tribe`, `/jojo` (redirect), `/ahmad` (redirect), `/harzfenster` (redirect), `/father-code` (alias), `/valentines-day`, `/portal`, `/on-*` and `/canon` and `/rails` and `/study` (contemplative "rails" register; HUB_REGISTRY says do not flatten).

**X likely stale/duplicate/experimental (nav demotion only; no URL change)**: `/ai-architectures` (redirects; dead code `app/ai-architectures`), `/ai-art`, `/prototypes`, `/prototype`, `/blueprint` (canonical elsewhere), `/updates`, `/graph`, `/hospitality-os`, `/sis`, `/links` vs `/linktree`, `/family` vs `/familie`, `/consulting` (redirect), `/ecosystems` vs `/ecosystem`, `/lab` vs `/labs`, `/design` vs `/design-system`, `/frankx`, `/frankx-investment-dashboard`, `/operator-scorecard`, `/business-plan`, `/command-center` `/ops` `/admin` `/dashboard` `/onboarding` (owner-only, robots-blocked), `/error`.

### 2.3 Duplicate clusters (recommend prominence + cross-links only)

| Cluster | Facts | Recommended treatment |
|---|---|---|
| ai-architect / ai-architecture / ai-architectures | `/ai-architecture` = pillar (nav door + CTA, 7 pages). `/ai-architectures` redirects to it (dead dir). `/ai-architect` = "Run the Architecture Review Yourself" (3 pages, still in sitemap, one subroute redirects). `/ai-architect-academy` = learning (SEO doc maps "ai architect" 1,600/mo here). Aliases `/academy` etc. all point to the academy. | Keep `/ai-architecture` as the Build door. Surface `/ai-architect-academy` as the Learn "architect path". Link `/ai-architect` from the pillar as "run a review". |
| agents / agent-hub / agent-team / agentic-* | `/agents` = Agent Catalog (roles, packs). `/agent-hub` = platforms/frameworks compared (in Founder door only). `/agent-team` = "Claude Partners Orchestrating Creative AI Systems" (not in nav). `/acos` = the product. `/agentic-creator` = role pages. `/llm-hub` = model registry (not in nav). | One Build group "Agents & models": ACOS, Agent Hub (compare platforms), LLM Hub (compare models), Agent Catalog. Cross-link `/agent-team` from `/acos`. |
| stack / founder-stack | `/founder-stack` = diagnostic (sitemap 0.95; the front-door action). `/stack` = "FrankX Stack - curated tools & templates" (utility list). `/build` = "six primitives stack". | `/founder-stack` is the only "stack" in the main nav. `/stack` should be reached from Shop/Resources ("tools I use") with a disambiguating label. |
| partners / partnerships / affiliates / allies | `/partners` = affiliate policy page. `/affiliates` = program. `/partnerships` = applied work (case-based; subpaths blocked in palette). `/allies` = collaborators (e.g. `/allies/ana-cancino`). | Public label "Collaborations" -> `/partnerships`; `/allies` as a people-led sub-link; `/partners` and `/affiliates` stay in footer/disclosure surfaces. This matches the agenticincome convention (disclose before the click). |
| research / insights / intelligence-atlas / intelligence-map / intelligence-system / signals / observatory | `/research` flagship; `/signals` daily-updated; `/intelligence-atlas` = flagship research; `/insights` (3 pages; sitemap lists two essays at 0.9); `/intelligence-system` = *Investment* Intelligence System (name collides with SIS/atlas); `/intelligence-map` is a pipeline diagram; `/observatory` = ops control plane. | One "Research & proof" door: Research, Signals, Atlas; `/insights` linked from Research as "Essays"; rename nothing; add a disambiguation line on `/intelligence-system` (investing). |
| assessment / ai-assessment / assess / soul-frequency-* | Three AI-level quizzes + two soul-frequency routes (one alias). | Single nav entry "Find your starting point" -> `/start` (which already routes by constraint) and secondarily `/ai-assessment`. |
| links / linktree; family / familie; ecosystem / ecosystems / map | `/links` redirects (excluded), `/linktree` canonical. | Footer only. |
| start / start-here | Different jobs (founder constraint vs first AI agent). | Make `/start` the single door; link `/start-here` as one option inside it. |
| products / shop / downloads / templates / ai-architecture/templates | Five places a visitor can buy or download. `/store` and `/marketplace` already redirect to `/shop`. | One "Products" landing (`/products`) plus `/shop` as store; label the two templates pages distinctly ("Starter kits" vs "Architecture templates"). |

---

## 3. What strategy docs already decided

- **Homepage Preservation Contract (2026-08-28, active).** `app/page.tsx` and `components/home/**` are protected; current experience is `HomePageElite`. Founder is "a lens, not the whole composition." Replacing the homepage with a funnel on 2026-08-27 caused a revert on 2026-08-28. Seven jobs must survive: identity, orientation, portfolio proof, founder relevance, human proof (music, never autoplay), trust, conversion. Section-level changes need baseline captures, a preservation matrix, exactly three directions, and Frank's approval of the direction. Structural replacement needs a contract-only PR first, merged by Frank. Navigation and ecosystem-wide IA must never ride in a homepage PR. Expansion pattern: homepage -> Founder Stack diagnostic -> Foundry -> Founder's Circle -> specialist product -> Signal Loop newsletter -> Human Layer hub. Human Layer content lives on its own hub under four lenses (`established`, `emerging`, `experiential`, `symbolic`), not the homepage.
- **Living Studio Platform Plan (2026-07-11).** Position: "living studio and mind palace for music, agent systems, and the design of a deliberate life." Three-layer estate: public archive; participant/customer spaces (auth only when needed); private operator palace (use existing authenticated `/ops`). Proposed public IA: **Listen `/music`, Learn `/learn`, Build `/acos`, Reflect `/soulbook`, Acquire `/products`, Explore `/ecosystem`**. Journeys: Listen, Learn, Build, Reflect, Founder/Team, each with rules (no purchase modal over playback; teach before gating; open proof before selling; no medical promise; exclusivity means fit, not scarcity). Ethical ladder: open proof -> orientation -> capability -> transformation -> proximity (application and mutual fit). Measurement: route-selection by intent, completion depth, newsletter confirmation, activation, qualified applications; avoid raw page views and forced signup rate. CEO decisions reserved for Frank: featured release, private vs public, offers, pricing, sends, partner/legal actions, whether high-proximity work opens. Phase 1 is "route and claim integrity" (hub/subdomain/redirect map and claim audit): a nav redesign should be sequenced after or with it.
- **Authority positioning (2026-06-25).** Use "AI Architect & Creator" and "former enterprise AI architect"; no Oracle endorsement implied; canonical disclaimer "Independent project. Not affiliated with, endorsed by, or sponsored by Oracle."; no deal sizes or revenue tiers without sources. Hero block already approved: eyebrow, headline "Build practical AI systems with enterprise-grade clarity", CTA "Build Your Creator OS", secondary "Read The AI Architect Field Notes". Bio language "helped build a business with his brother", "creator of AI music" is the approved proof line. CLAUDE.md adds: "AI Architect" title stays.
- **HUB_REGISTRY.md.** Tier 1 flagships: Home, ACOS, AI Architecture Hub, Music, Courses, About, Bio, Build, Start Here. Tier 3 contemplative register is "do not flatten" (rails, canon, soulbook, German family). Known duplicates to audit: `/ai-architecture` vs `/ai-architectures`, `/links` vs `/linktree`, `/family` vs `/familie`, `/assessment` vs `/ai-assessment` vs `/assess`, `/products/agentic-creator-os` vs `/acos`. Rule: "Hide from nav, keep the page. Flag, don't nuke."
- **COMPLETE_SITEMAP.md.** Stale (Jan 2026 style: 66 blog posts, 7 products, product prices that no longer match, `/ai-world` called "Intelligence Atlas"). Not a source of truth; current counts are 288 blog files, 33 products in `data/products.json`, 1,077 indexed routes in `route-index.json`. CLAUDE.md already warns that root-level docs are unverified.
- **FUNNEL_MAPPING_2026.md (Feb 2026, skim).** Three personas (Elite Creator, AI Architect, Knowledge Seeker); stages Awareness (short clips) -> Education (video intelligence + newsletter) -> Evaluation (playbooks, lead magnet) -> Conversion (ACOS) -> Retention (Inner Circle/Soulbook). Predates the founder pivot; its funnel pages (`/opus-pro`, `/youtube`) are not in the nav.
- **SEO strategy (docs/ai-architecture/SEO-CONTENT-STRATEGY-2026-08.md).** Pillar `/ai-architecture` owns "ai architecture" (2,400/mo, KD 61), `/ai-architect-academy` owns "ai architect" (1,600), plus a spoke plan (`llm gateway` KD 23, `agentic rag`, `a2a protocol`, `mcp server` 40,500 via an existing blog post). Constraint: head term is contested by building-architecture queries.
- **Conflict to resolve before any redesign.** The Living Studio plan's six doors (Listen/Learn/Build/Reflect/Acquire/Explore) differ from the shipped five (Founder/Build/Learn/Create/Music) which encode Frank's Music-is-a-door ruling and the founder pivot. The proposal below follows the shipped tests, borrows the plan's "Reflect" and "Acquire" intent as destinations inside doors, and does not claim Frank has approved it.

---

## 4. Analytics and traffic evidence

Result: **no first-party traffic or query data exists in this checkout.** Verified:
- Commit `08d4a85` ("weekly external snapshot (#1147)", 2026-11-03) changes only `data/intelligence/external.json`. That file is model intelligence from `models.dev` (MIT, confirmed licence; retrieved 2026-11-02T06:08Z); OpenRouter sources are `unverified`/not ingested; link-only sources are Artificial Analysis, SWE-bench, LMArena. It contains no page, session or query data.
- `scripts/analytics-pull.mjs` (GA4 Data API pull, maps paths to hub types via `route-index.json`) is dormant until `GA4_PROPERTY_ID` and credentials exist; `docs/ops/analytics/` does not exist. `scripts/pull-vercel-analytics.mjs`, `scripts/observability/analytics-cli.mjs`, `lib/observability/google-search-console.ts` and `app/api/admin/observability/search-console` exist as plumbing; no exports are committed.
- `docs/research/ai-search-discoverability-2026-10-30.md` states Search Console and Bing observations were unavailable; `docs/ai-architecture/SEO-CONTENT-STRATEGY-2026-08.md` states GSC access was not verifiable from the checkout. `docs/strategy/search-research-budget.md` says: no paid pull without a verified allowance; never present Semrush as first-party traffic.
- The only demand data is **Semrush US keyword volumes pulled 2026-08-20** in the SEO strategy doc (relative signals, one country, one vendor): ai architecture 2,400; ai architect 1,600; agentic ai architecture 880; ai agent architecture 720; mcp server 40,500; model context protocol 14,800; prompt injection 4,400; agentic rag 3,600; context engineering 3,600; agentic workflows 2,900; a2a protocol 2,900; llmops 2,900; ai observability 1,900; ai gateway 1,600; llm gateway 720 (KD 23, best-ratio new page). These are targets, not site performance.
- Sitemap priority values are editorial, not measured.

Therefore: no "top pages" or "top queries" can be reported. Next step (needs credentials or an owner-approved Semrush allowance, not done here): export 90 days of GSC pages+queries and GA4 hub-type traffic, then validate the tiering in section 2 against it before nav order is final.

Gaps relevant to the ICPs (verified by search of `app/` and `content/blog`): there is **no women-oriented page or post** (one draft in `content/blog/_drafts` only); `/for/` has only `creators` and `architects`; `/testimonials` and `/allies` exist but their content was not audited here.

---

## 5. Proposed mega-menu IA

### 5.1 Design constraints

- Stay within what tests and rulings encode: keep **Music as its own door**, keep a **Founder** door labelled exactly `Founder` containing the required `/magic /vault /ecosystem /map /qualities /intelligence-atlas /licensing` items (or change the test in the same dedicated nav PR), keep sentence case, no uppercase, no serif in menu headings, no `router.push`.
- No URL changes. Prominence and cross-links only. Duplicates stay reachable via the "see everything" deep index.
- Separate PR from the homepage (contract). Needs Frank's direction choice (Frank decides nav doors; PR #409 precedent).
- Visual treatment: each door opens a 3-column panel: left = situation picker ("I want to...") with 3 to 5 featured cards (image/thumbnail slot + one-line promise), right = one proof tile (a real artifact such as a Research post, the Founder Stack result, or the featured release; no invented metrics), bottom strip = "See everything in <door>" linking to a deep index (an alphabetised, grouped list, using the existing `resolveNavigationGroups` so nothing is lost). No images exist in the menus today; thumbnails would come from existing hub OG/hero assets (unverified which exist per route).
- Voice for the women-building-with-AI ICP: situation-based, plain, calm, specific ("Start where you are", "Build one working thing this week"), no combat or dominance framing ("fleet command", "crush", "10x", "unfair advantage"), no gendered labels or pink-washing. Include evidence of range (builder stories, collaborators) only if real; do not fabricate testimonials. Route by constraint and stage, not by demographic.

### 5.2 Six doors

Order mirrors a visitor's journey and keeps `desktopSections` change minimal. (Tests currently pin the five-key order; adding a sixth "Research" door and reordering requires updating the test.)

**1. Founder** (key `explore`, href `/founder-stack`). ICP: solo founders; women building solo businesses.
- Founder Stack map `/founder-stack`: "Ten private questions to find your current constraint." (SEO entry/diagnostic)
- Start here `/start`: "Pick the route that matches what is stuck right now."
- Foundry `/foundry`: "Install a founder operating system, one layer at a time."
- Founder's Circle `/founders-circle`: "Think through consequential bets with other founders."
- Signal Loop `/newsletter`: "Weekly field notes; choose only the streams you want."
- See everything: Founder Signal, Human Layer, Workspace, Ecosystem, Map, Qualities, Atlas, Vault, Magic, Licensing, Dream 100, About, Bio, Media kit, Connect, Contact, Partnerships (all current Founder-door items stay).

**2. Build** (key `build`, href `/ai-architecture`). ICP: solo founders running agent fleets.
- AI architecture hub `/ai-architecture`: "Inspect the systems, then start a build."
- ACOS `/acos`: "A working skill, agent and workflow system for AI coding assistants."
- Agent hub `/agent-hub` and LLM hub `/llm-hub`: "Platforms and models compared side by side." (surfaces LLM Hub, currently unreachable from nav)
- Builder lab `/agentic-builder-lab`: "Build an agent from a spec, with the receipts."
- Work with Frank `/work-with-me`: "Studio engagements; apply for a fit call." (collapses the duplicate Consulting entry)
- See everything: blueprints, prototypes, templates, template pack, build stack, AI World, developers, workshops, coaching, shop, agent catalog, Starlight IS, investor.

**3. Learn** (key `learn`, href `/learn`). ICP: women building with AI (primary entry), all newcomers.
- Start with what you have `/start-here`: "Build your first AI agent; no prior setup assumed."
- AI architect academy `/ai-architect-academy`: "The structured path from builder to architect."
- Guides `/guides`: "Short, tested how-tos."
- Courses `/courses`: "Independent picks plus originals; clear scope and price."
- Books and library `/books`, `/library`: "23 books and the summaries behind them."
- See everything: assessment, students, games, watch, shorts, mental models.

**4. Create** (key `gencreators`, href `/gencreator`). ICP: creators with large audiences (and women-led brands who publish).
- GenCreator.AI (external, UTM kept): "Turn one trusted source into a week of content in your voice." (matches the gencreator.ai promise in its own CLAUDE.md)
- Creator OS path `/for/creators`: "Systems for publishing, repurposing and selling without losing your voice."
- Short-form and video `/opus-pro`, `/youtube`: "Repurpose long video into clips." (currently orphaned from nav)
- Prompt library `/prompt-library`: "130+ curated prompts you can copy."
- Canva growth `/canva`: unverified page content, sitemap priority 0.95; confirm before featuring.
- See everything: GenCreator principles, handbook, blueprints, templates, content studio, creation chronicles.

**5. Music** (unchanged; ruled a door).
- Music showcase `/music`, Vibe OS `/products/vibe-os`, Music lab `/music-lab`, Music school `/music/learn`, Suno profile (external). Keep the existing featured card.
- See everything: album pages, piano, violin, guitar tabs, drums.

**6. Research** (new; key suggestion `research`, href `/research`). ICP: anyone who needs proof before buying; SEO entry point.
- Research `/research`: "Source-led investigations with methods stated."
- Signals `/signals`: "Daily source-backed notes."
- Intelligence atlas `/intelligence-atlas`: "Flagship research map."
- Blog `/blog`: "288 articles on agents, creator systems and architecture." (count from `content/blog`; verify before publishing, include drafts exclusion)
- Journal `/journal`: "Short notes from work in progress."
- See everything: insights, changelog, library, guides, mvu, dream-100.

Utility (persistent, not a door): Search, About, Shop (`/shop`), a single primary CTA that varies by door (default `/start`, "Find your starting point"). The existing CTA "Explore AI Architecture" can remain the Build door CTA only.

Excluded from main nav, kept in footer/deep index: all P routes (`/papa`, `/familie`, `/family`, `/opa-und-oma`, `/lebensbaum`, ...), legal, owner-only, and X-cluster routes.

### 5.3 Funnel mapping

| Door | SEO entry | Hub | Proof | Waitlist / product |
|---|---|---|---|---|
| Founder | brand and "founder operating system" queries (unverified demand) | `/founder-stack` -> `/start` | Founder Stack result, Foundry, case pages under `/partnerships` | `/newsletter` (Signal Loop), Foundry, Founder's Circle application |
| Build | ai architecture 2,400; agentic ai architecture 880; mcp server 40,500 via blog; llm gateway 720 | `/ai-architecture` | blueprints, ACOS source, LLM/Agent hubs, `/ai-architect` review tool | ACOS, `/shop`, architecture templates, `/work-with-me` application |
| Learn | ai architect 1,600; how-to guides; Ask pages | `/learn`, academy | guides, books, library summaries | `/courses`, workshops, newsletter |
| Create | creator-system and repurposing queries (unverified), `/youtube` | `/gencreator`, `/for/creators` | GenCreator product, prompt library, Creation Chronicles | gencreator.ai alpha (waitlist; no public checkout during alpha per its ADR-010), Prompt library, templates |
| Music | music and Suno-prompt queries (unverified) | `/music` | catalog, music lab | Vibe OS, Suno prompt library, licensing |
| Research | long-tail question pages, `/ask/*`, blog | `/research`, `/signals` | method pages, atlas, datasets | newsletter, then Build/Founder CTAs inside articles |

### 5.4 Implementation notes (if Frank approves a direction)

1. Contract-first: write the new nav acceptance criteria and update the two nav tests in the same dedicated nav PR; do not alter homepage files or homepage contract tests.
2. Collapse the duplicated desktop/mobile registries into one typed data file (`lib/navigation-data.ts`); the completeness test loads the registries by slicing source text, so it would need a small update to read the shared module. (Judgment call: only do this if Frank wants it; a surgical alternative is to edit both registries in place.)
3. Add `/llm-hub`, `/agent-team`, `/opus-pro`, `/youtube`, `/for/creators`, `/start` to nav or deep index; none is currently in any menu.
4. Replace the `/consulting` redirect duplicate with a single "Work with Frank" entry.
5. Verification set: `pnpm run type-check`, `pnpm run lint`, `pnpm run ai-slop:audit:strict`, `pnpm run build`, `pnpm run merge:gate`, `node --test scripts/tests/navigation-*.test.mjs scripts/tests/sitemap-exclusions.test.mjs`, plus web-release-gate evidence (375/768/1440 captures, keyboard and reduced-motion).
6. Before ordering doors, pull GSC + GA4 (see section 4); these unknowns could change door order.

### 5.5 Open decisions for Frank

- Six doors (adds Research) vs keeping five and folding Research into Founder as today.
- Whether "Founder" stays the first door label for the women-building-with-AI ICP, or a neutral "Start" door fronts the nav with Founder as one path.
- Which proof tile per door (real artifacts only).
- Whether women-focused content (a `/for/` landing, builder stories) should be created before the nav promises it; today there is none, so the nav should not imply it.
