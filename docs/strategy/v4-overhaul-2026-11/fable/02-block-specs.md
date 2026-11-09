# 02. Block specs for the eight surfaces and the menu

**State:** proposal, 5 November 2026. Line numbers refer to the working tree on `ccr-323d835d-3u1dih` as read on 2026-11-05; re-read a file before editing it, lines move.

## How to read a block

- **Visual** is a VISUAL-SYSTEM section 2 class: `page hero`, `editorial`, `character scene`, `diagram`, `data chart`, `product plate`, `OG card`, `spot`, `portrait`, or `none`. `diagram (new)` means the visual producer authors an SVG from the named data file; the block ships as text until the SVG passes review.
- **Measure** is a `TrackedLink` or `trackEvent` name, `<surface>_<block>_<action>`. Page views are never the measure. New names go into `lib/analytics-events.ts` (new).
- **Acceptance** is what the reviewer checks on top of the standing gates on every slice: `pnpm run type-check`, `lint`, `ai-slop:audit:strict`, `build`; captures at 375, 768 and 1440 with no horizontal scroll; keyboard reach with visible focus; a reduced-motion pass.
- **Empty state** is given for every block that reads data; `n/a` means the block has no data source.

Shared rules on every surface: one `rounded-full` primary action per screen, text links for the rest (`taste.md` "Two equal CTAs"); sentence case outside the 11px eyebrow; no em dash; no `transition-all`; decorative icons `aria-hidden="true"`; every image has `width`, `height`, an `alt` under 125 characters and a manifest row; exactly one closing offer per SEO page (a flagship waitlist or the newsletter, never both).

---

## 1. Research hub, `/research`

Reader: founders running agent fleets; anyone who needs proof before buying. Primary action: "Read the investigations". Files: `app/research/page.tsx`, `research-hub-client.tsx`, `research-featured.tsx`, `research-hub-lead.tsx`, `research-model-watch.tsx`, `layout.tsx`.

| # | Block | Job | Source | Visual | Interaction, empty state | Mobile | Measure | Acceptance |
|---|---|---|---|---|---|---|---|---|
| 1 | Hero (`research-hub-client.tsx:80-151`) | Say what the hub proves, send the reader to the investigations | Copy at `:92-103` (wave 1, keep). Stats: `featuredInvestigations.length`, `publicTopicMaps.length`, `researchHubs.length` (replace the literal `'7'` at `:139`) | `none` now; `page hero` later (VISUAL-SYSTEM rank 9, needs generation) | One filled button to `#investigations`; "Search the research" and "How evidence is graded" (`:113-124`) become text links. Zero-value stats hide (already, `:133-138`) | Stats two columns; buttons wrap | `research_hero_investigations` | One filled button in the viewport; the eyebrow at `:87` is the only caps |
| 2 | Featured investigations (`research-featured.tsx`) | Five real instruments first | `lib/research/featured-investigations.ts:16-57` | `none`; the lead card's manifest schema stays monospace (`:72-93`) | Cards are `TrackedLink`s. Empty impossible by contract test (slice 2.7) | Lead card first, then one column; `pre` hidden below `md` (`:74`) | `research_investigation_open` (exists) | Lead border emerald, others neutral; method card last (`:144-158`) |
| 3 | Seven hubs (`research-hub-lead.tsx`) | Route by question | `lib/research/hubs.ts` `researchHubs` | `none`; brand SVGs with `width`/`height` (`:88-101`) | Count line `:63` reads "No reviewed topic maps yet" when `domainsForHub()` is empty | Two columns from `md` | `research_hub_open` (exists) | Eyebrow `:28` becomes "Choose a hub"; the page uses "hub" and "topic map" for the two things, nothing else |
| 4 | Method strip (`MethodologySection` `:334-421`, moved above the grid) | Say how a claim earns its grade before the held maps appear | Phases `:335-360` | `diagram (new)`: four steps as inline SVG from the same array, under 40 KB | "Read the full method" text link (`:405` says "Full Methodology"); sources link stays conditional (`:408`) | Four cards stack | `research_method_open` | Connector lines (`:385`) leave no orphan at 768; icons at `:406` and `:414` get `aria-hidden` |
| 5 | Model watch (`research-model-watch.tsx`) | Labs the hub tracks, with sources | `getProviders()`; lab list `:6-30` | `none` (brand SVGs) | Each row links its `source` | One column | `research_modelwatch_source` | The xAI row's empty `logo: ""` (`:30`) renders a text label, not a broken image |
| 6 | Topic maps on hold (`DomainsGrid` `:155-332`, demoted) | Keep 99 held maps reachable without leading with them | `lib/research/topic-maps.public.ts`, `lib/research/sources.ts` | `none` | Collapsed by default behind "Show the {n} topic maps on hold" (reuse `:256`); search and tabs stay; the per-card "Sources pending" badge (`:298-302`) becomes one sentence above the grid; empty search state `:264-275` stays | One column; tabs wrap | `research_topicmaps_expand`, `research_topicmap_open` | `All Domains` (`:223`) in sentence case; no card wall on first paint; `:304` icon `aria-hidden` |
| 7 | Qualities bridge (`:469-532`) | Introduce the Core Qualities program | Static | `none` | Two `TrackedLink`s exist | Stacks | existing | Em dash at `:484` replaced |
| 8 | About the research (`page.tsx:29-43`) | Three sceptic questions | `researchHubFaqs` (`lib/research/hubs.ts:107`) | `none` | n/a | One column | none | JSON-LD at `page.tsx:8-16` matches the visible list |
| 9 | Learn hand-off (`:583-592`) | Send a reader to practice | `lib/learn/related-portals.ts` | `none` | n/a | Compact | existing | Blurb `:591` becomes "These portals collect the videos, docs and expert channels for building with each platform." |
| 10 | Closing offer (`CTASection` `:423-467`) | One next step | Newsletter `EmailSignup listType="newsletter"` (`:439-445`); no flagship matches the hub | `none` | "Join Inner Circle" (`:448-454`) removed: `/inner-circle` is a dropped route (`scripts/tests/blog-footer-cta-drops.test.mjs:12`). "Read Latest Articles" (`:459`) becomes a text link in sentence case | Stacked | newsletter confirmation (exists) | Heading `:432` and copy `:435-436` lose "Stay Current", "intelligence briefs", "most important"; icon `:453` `aria-hidden` |
| 11 | Metadata (`layout.tsx:7-50`) | Honest title | `researchDomains.length` (`:4`) | `OG card` (existing brand card) | n/a | n/a | none | Title "Research: AI systems, creative work and human potential"; description names the five investigations, not the held count; no "Explore" (`:9`) |

The three fixed radial layers at `:544-573` are static, so MOTION.md allows them; the restraint test decides. Capture with and without, keep the better one.

---

## 2. Blog index, `/blog`

Reader: all three, from search. Primary action: open the latest post. Files: `app/blog/(index)/page.tsx`, `app/blog/BlogPageClient.tsx`.

| # | Block | Job | Source | Visual | Interaction, empty state | Mobile | Measure | Acceptance |
|---|---|---|---|---|---|---|---|---|
| 1 | Identity bar (`:79-114`) | Name the surface and its counts | `posts.length`, `categories.length` | `none`; Axi avatar `:86` stays (existing placement); the 208px decorative Axi `:67-76` is removed | Journal link stays; counts hide below `md` (`:109`) | Stack | none | No `motion.div` on the heading block (`:79-83`; `taste.md` "No animations on text") |
| 2 | Latest post (`:117-174`) | One strong entry | `buildBlogIndex().latestPost` | `editorial` from frontmatter `image` | Whole card links; block skips when `latestPost` is null (already) | Image above text | `blog_latest_open` | `sizes` present (`:132`); hover scale at most 1.03; no `motion` on text |
| 3 | Premium carousel (`:179-183`) | The nine posts with native visual systems | `PREMIUM_VISUAL_SLUGS` (`lib/blog-index.ts:8-18`) | `editorial` | Renders only when `carouselPosts.length > 0` | Scroll-snap row | `blog_carousel_open` | No auto-advance under reduced motion |
| 4 | Filter bar (`:186-226`) | Narrow by category | `categories` | `none` | `CategoryDropdown` stays. The "Frameworks:" chips (`:197-213`) go: "Video Intelligence" and "Short-Form Nexus" are coined labels and `/youtube`, `/opus-pro` belong to the Create door | Full-width dropdown, 44px targets | `blog_filter_select` | No `uppercase` label (`:198`) |
| 5 | Featured (`:229-252`) | Two editor picks | `featured: true` | `editorial` | Hidden when a category is selected | One column | `blog_featured_open` | Heading "Featured" (`:234-236`); fade once, no spring (`:244`) |
| 6 | Grid (`:255-317`) | Everything else | `gridPosts` | `editorial` thumbnails | Empty state `:279-296` stays; button `:289` gets `type="button"` | One column | `blog_grid_open` | Heading "More articles" (`:271`); `fadeUp` from `lib/motion.ts`, no spring (`:300-310`) |
| 7 | Closing offer (`:320-350`) | One next step | Newsletter | `none` | Link to `/newsletter`, label "Subscribe" (`:336` says "Start Here") | Stacked | `blog_newsletter_open` | Heading "The newsletter" until Q4; badge `:324` removed; em dash `:347` replaced |
| 8 | Metadata and FAQ (`page.tsx:7-49`) | Answer engines | Static | `none` | n/a | n/a | none | Em dash in `:37` replaced; keyword `'intelligence systems'` (`:41`) removed |

---

## 3. Blog article, `/blog/[slug]`

Reader: the searcher with one question. Primary action: the article's single next step. File: `app/blog/[slug]/page.tsx`.

| # | Block | Job | Source | Visual | Interaction, empty state | Mobile | Measure | Acceptance |
|---|---|---|---|---|---|---|---|---|
| 1 | Breadcrumbs and meta (`:179-215`) | Orientation | frontmatter | `none` | n/a | Chips wrap | none | Keep |
| 2 | TL;DR (`:216-224`) | The decision in 120 words | `tldr` or `description` | `none` | Falls back to `description` (already) | n/a | none | Label keeps the eyebrow pattern |
| 3 | Author card (`:227-242`) | Who wrote it | Static | `portrait` | n/a | Stack | none | `:231` loses `rounded-full` (`design.md`); `:235` becomes "Former Oracle AI architect, now independent" (`docs/strategy/frankx-authority-positioning.md`) |
| 4 | Hero image (`:245-251`) | The one image | frontmatter `image` through `HeroImage`, `priority` | `editorial` or `page hero` | Title-card variant when `src` is missing (`HeroImage` handles it) | Full width | none | Within the class budget once the manifest check exists |
| 5 | Reading goal, architect note (`:259-311`) | What the reader gets | `readingGoal`, `architectNote` | `none` | Render only when present | Stack | none | "AI CoE pillar" (`:295`) reads "CoE pillar"; SVG icons stay, no emoji |
| 6 | Body (`:313-316`) | The argument with its proof | MDX; figures through `<Diagram>` (`components/blog/Diagram.tsx`, `scrollable` for labelled SVGs) and `<ArticleFigure id>` (`data/editorial-visuals.json`) | `diagram`, `data chart`, `editorial` | At least two visuals per 1,000 words and one diagram or table per mechanism H2 (VISUAL-SYSTEM section 3); ASCII diagrams replaced | `scrollable` keeps 13px labels above 10px | none | Slice 3.6 script lists posts under 1.0 visuals per 1,000 words |
| 7 | Start link (`:318-321`, `BlogFooterCTA`) | One plain route to `/start` | Component | `none` | Pinned by `blog-footer-cta-drops.test.mjs:41-48`: one `Link`, to `/start`, "Start here" | n/a | none | Not touched by a copy PR |
| 8 | Tags, related research, qualities (`:323-341`) | Lateral discovery | `tags`; `lib/research/blog-domain-map.ts` | `none` | `RelatedResearch` (`components/blog/RelatedResearch.tsx:32`) renders a target only if its slug is featured, analysis or brief (slice 3.5); otherwise nothing | Two columns from `sm` | `blog_related_research_open` | No link to a `noindex` holding page; `:325` and `RelatedResearch.tsx:24` lose `uppercase` |
| 9 | Footer accent (`:343-355`) | Sign-off | Static; Axi icon `:346` (existing) | `spot` | n/a | n/a | none | `:353` becomes "Read on FrankX.AI. AI architecture, music and creator systems." |
| 10 | Closing offer (`:372-377` plus new block) | Exactly one | `pickFlagship(post.tags, post.category)` from `lib/funnel/flagship-waitlists.ts`; fallback `InlineLeadMagnet` | `none` | Matched: `FlagshipWaitlist` renders, `InlineLeadMagnet` does not. Unmatched: the reverse. The `description` string at `:377` is pinned by `blog-footer-cta-drops.test.mjs:63-67`; the headline "Stay in the intelligence loop" is replaced by the component default | Full width | `blog_article_offer_open` with `destination` | Contract test: one offer element per rendered article |
| 11 | Recommendations (`:382-384`) | Keep reading | `documents` | `editorial` | Handles empty | One column | existing | Unchanged |

---

## 4. ACOS, `/acos`

Reader: founders and creators who run Claude Code. Primary action: copy the install command. Files: `app/acos/page.tsx`, `app/acos/layout.tsx`.

| # | Block | Job | Source | Visual | Interaction, empty state | Mobile | Measure | Acceptance |
|---|---|---|---|---|---|---|---|---|
| 1 | Hero (`:182-261`) | What ACOS is, in facts, and the first command | "A command set for Claude Code. One entry point: /acos." Counts removed from `:205` and from `layout.tsx:5-6` | `character scene`: Omega `pixar-blue` (`:191`) stays; the ghost Omega (`:187`) goes (two of one character in a viewport) | One filled "Copy the install command" (clipboard with a select-text fallback); "View on GitHub" text link. "See Pricing" (`:255-258`), the `tracking-[0.4em]` badge (`:192-195`) and the "New" pill (`:208-214`) are removed | Terminal scrolls inside its box | `acos_install_copy` | The mascot quotation `:243-245` is removed (CREATOR.md: no invented quotations); terminal line `:229` reads the generated counts or is dropped |
| 2 | Pick one install path (new; replaces the stats band `:264-276`) | The decision the README already makes | Table copied from `agentic-creator-os/README.md` "Pick one install path" | `none` | Three rows, a copy button each | Rows stack | `acos_installpath_copy` with `path` | Commands match the README; the plugin command names `creator-os-core@frankx-creator` (`.claude-plugin/marketplace.json`) |
| 3 | How a request moves through ACOS (`:279-323`) | The mechanism | `public/images/acos/acos-how-it-works.svg` ported from `agentic-creator-os/docs/infographics/`, with a manifest row | `diagram` | n/a | SVG scales, text live | none | `acos-architecture.png` (`:285-293`, 1.3 MB, `fill` + `object-cover` crops a square into 4:3 and bakes counts) is gone; layer list `:305-309` loses its counts |
| 4 | Verified public surface (new) | Counts that are true | `data/acos/public-surface.json` (new, see 01) | `none`; a six-cell table | "Counts update from the repository; last generated {date}". Stale (over 60 days) or missing file: section hidden, no number anywhere | Two columns | none | No digit on the page outside this block |
| 5 | Smart router (`:326-364`) | The routing behaviour | Terminal example `:339-348` | `none` (the 1.9 MB `acos-smart-router.png` at `:353-359` is cut) | n/a | Text first | none | `:333` becomes "One command routes the work"; em dash `:346` replaced; eyebrow `:331` sentence case |
| 6 | Remembers what worked (`:367-407`) | Describe trajectories plainly | Steps `:383-386` | `none` (the 1.6 MB `acos-self-learning.png` at `:397-404` is cut) | n/a | 2 by 2 grid | none | `:372` "Remembers what worked"; `:370` eyebrow "Trajectories"; `:375` loses "pure local intelligence" |
| 7 | Commands by domain (`:410-440`) | Real commands | List `:419-423`, each verified against `agentic-creator-os/.claude/commands/` | `none` | n/a | One column | none | `:413` "Commands by domain", no count; `:426` loses `uppercase` |
| 8 | Tiers (`:443-518`) | Honest offer state | `tiers` `:46-102` | `none` | Paid tiers link `/newsletter?ref=…` (`:33-36`), which is email capture: label the buttons "Get launch updates"; schema keeps `PreOrder` (`:138-163`) | Three cards stack | `acos_tier_cta` with `tier` | `:446` "Pick a tier"; `:449` plain; count features `:53-55` removed; `MIT License` (`:50`, `:111`) becomes Apache-2.0 (`agentic-creator-os/LICENSE`, `package.json:6`); caps at `:462`, `:466`, `:488`, `:502` removed |
| 9 | FAQ (`:521-538`) | Objections | `faq` `:104-129` | `none` | `details` stay | n/a | none | `:127` "Absolutely." becomes "Yes."; counts in `:107` removed; `:111` corrected |
| 10 | Founder Kit (new, wave 4) | The install for a founder's own repo | FOUNDER-KIT-PRD section 6 | `none` | Appears only when `founder-kit init` exists | n/a | `acos_founderkit_copy` | States what installs and what the founder still does; no time-saved claim |
| 11 | Closing (`:541-559`) | Last chance to clone | Static | `none` | One filled "Clone the repo and type /acos" to GitHub; "Get launch updates" text link | Stack | `acos_close_github` | `:544` sentence case; `:547` kept |

---

## 5. AI architecture, `/ai-architecture`

Reader: founders running agent fleets; the "ai architecture" searcher (Semrush US 2,400, 20 August 2026, relative only). Primary action: "Run the architecture review" (`RunItCta`, exists). Files: `app/ai-architecture/page.tsx`, `components/ai-architecture/ArchitectureShowroom.tsx`, `components/ai-architecture/pillar/PillarGuide.tsx`.

| # | Block | Job | Source | Visual | Interaction, empty state | Mobile | Measure | Acceptance |
|---|---|---|---|---|---|---|---|---|
| 1 | Showroom hero (`ArchitectureShowroom.tsx:34-58`) | A working system in the first viewport | `data/ai-architecture/showroom.ts` | `diagram` (XYFlow, dynamic `:12`) | System and step selectors exist | Diagram below text; selectors as a chip row | existing `trackEvent` | H1 `:39` "Your next idea. Built as a system." fails name-swap; use the door promise "Inspect the systems, then build your own"; eyebrow `:38` stays |
| 2 | Six-plane map (new, after the showroom) | One figure for how the parts relate | `public/images/blog/production-agentic-ai-systems-six-plane.svg` (10 KB, exists) via `<Diagram scrollable>` | `diagram` | Caption names the source commit | Pans on phones | `ai_architecture_sixplane_open` | Live SVG text; manifest row |
| 3 | Official atlas (`:70`) | Official templates, dated | component data | `none` | n/a | One column | existing | Unchanged in wave 2 |
| 4 | Field guide contents (`:72-116`) | Contents and provenance | `CONTENTS` `:27-38`, `GUIDE_COMMIT` `:11` | `none` | Anchor chips | Wrap | none | Claims `:94-96` stay pinned to the commit |
| 5 | Pillar guide (`PillarGuide.tsx`, sections `what-is-ai-architecture` to `keep-reading`) | The long-form argument | component | `diagram` where a section explains a mechanism | n/a | One column | none | Mechanism H2s get one SVG or table by slice 3.6; no new prose |
| 6 | Run it (`page.tsx:125-140`) | The next action | static | `none` | `RunItCta` filled button exists | Stack | `ai_architecture_cta_opened` (exists) | Em dash `:134` replaced |
| 7 | Closing offer (new) | Exactly one | `pickFlagship(['agents','architecture'])`, newsletter fallback | `none` | n/a | Full width | `ai_architecture_offer_open` | One offer element |
| 8 | Metadata (`:18-25`) | Title without a vague verb | static | `OG card` | n/a | n/a | none | `:19` becomes "AI architecture: inspect the systems, then start a build" |

---

## 6. Agent hub, `/agent-hub`

Reader: founders choosing a platform or framework. Primary action: open an entry. Files: `app/agent-hub/page.tsx`, `layout.tsx`, `data/agent-registry.json`.

| # | Block | Job | Source | Visual | Interaction, empty state | Mobile | Measure | Acceptance |
|---|---|---|---|---|---|---|---|---|
| 1 | Hero (`:141-176`) | Name the comparison and its date | `agentRegistryLastUpdated()` (`:94`) | `page hero` later (`blog/multi-agent-orchestration.png` as WebP, rank 4); text until then | One filled "Compare platforms" to the first kind; "Compare models in the LLM hub" text link (`:168-173`) | Stack | `agent_hub_hero_compare` | Eyebrow `:143-144` "Agent hub · updated {date}", no caps; H1 `:147` "Agent hub, 2026"; lede `:149-152` em dash replaced |
| 2 | Caveat (`:154-159`) | Read before the tables | `agentRegistryCaveat()` | `none` | n/a | Full width | none | Keep; the one accent box |
| 3 | Catalog link (`:161-167`) | Point to what Frank built | static | `none` | Text link "See the agent catalog" | n/a | `agent_hub_catalog_open` | "99-agent" at `:166` and `:51` removed until `data/acos/public-surface.json` exists |
| 4 | Kind sections (`:178-194`) | The comparison | `getAgentKinds()`, `getAgentEntriesByKind()` | `none` | `EntryCard` (`:59-89`); empty kind hidden | One column | `agent_hub_entry_open` with `id` | Visible grade legend above the first section ("A measured with receipts, B independent benchmark, C mixed, D vendor-stated"), not only `title` (`:74`) |
| 5 | Receipt link (new) | Tie an entry to Model Arena when a receipt exists | optional `arenaReceipt?: string` in `data/agent-registry.json`, validated against `public/research/arena-receipts/` | `none` | "Measured in Model Arena" link when present | n/a | `agent_hub_receipt_open` | A value with no matching file fails the registry test |
| 6 | FAQ (`:196-213`) | Questions worth asking first | `FAQ` `:36-57` | `none` | n/a | One column | none | Keep `:39`, `:43`; fix `:51` |
| 7 | Closing offer (new) | Exactly one | `pickFlagship(['agents'])` | `none` | Newsletter fallback | Full width | `agent_hub_offer_open` | One offer element |
| 8 | Metadata (`layout.tsx:5`) | Honest title | static | `OG card` | n/a | n/a | none | "Agent hub 2026: platforms and frameworks compared" |

---

## 7. LLM hub, `/llm-hub`

Reader: founders routing models. Primary action: "Compare all models". Files: `app/llm-hub/page.tsx`, `layout.tsx`, `lib/llm-hub/*`, `data/model-registry.json`.

| # | Block | Job | Source | Visual | Interaction, empty state | Mobile | Measure | Acceptance |
|---|---|---|---|---|---|---|---|---|
| 1 | Hero (`:131-199`) | What is compared and when the data moved | `registryLastUpdated()`, `providers`, `rows`, `platforms`, `liveCount` (`:63-68`) | `none` | One filled "Compare all models" to `#explorer`; the other four chips (`:154-178`) become text links; stats (`:180-185`) stay, "Live-priced" shows `registry` at zero (already) | Chips wrap; stats two columns | `llm_hub_hero_compare` | Eyebrow `:133-135` no caps, no "Frontier Intelligence Directory"; H1 `:137` "LLM provider hub, 2026"; lede `:140` "Compare selected providers and models by capability, inspect their sources, and price a route." |
| 2 | Dated update (`:186-197`) | One release note | static | `none` | Links stay | Stack | `llm_hub_update_open` | `:188` becomes "what is documented, and what we have not tested" |
| 3 | Pick your constraint (`:202-218`) | The decision tool | `TaskRoutingPlayground`, `DecisionMatrix` | `none` | Exists | Stack | existing | `:205` stays |
| 4 | Cost calculator (`:221-225`) | Price a route | `rows` | `data chart (new)`: cost per million tokens by model from `data/model-registry.json` `pricing`, `_updated` inside the figure | Exists | Table scrolls | existing | Source and date inside the SVG |
| 5 | Capability grid (`:228-236`) | Browse by job | component | `none` | Exists | One column | existing | `:232` loses "that lead" |
| 6 | Model explorer (`:239-249`) | The table | `rows` | `none` | Sort and filter exist; `:244` already states the fallback | Horizontal scroll with a visible edge | `llm_hub_explorer_open` | Keep |
| 7 | Creator stacks (`:252-268`) | One model per modality | `CREATOR_STACKS` | `none` | Exists | One column | existing | `:259` becomes "A creator picks one model per modality. Here is what to use for each, and the workflow." |
| 8 | Providers and platforms (`:271-300`) | Directory | `providers`, `platforms` | `none` | Exist | One column | existing | `:290` loses "actually" and "The layer the data sites skip." |
| 9 | Sources and method (`:303-327`) | Where numbers come from | `SOURCES` `:19-26` | `none` | `noopener` links | One column | none | `:308-309` becomes "Live pricing is attributed. Benchmarks are sourced. Vendor-reported figures are labelled and wait for independent reproduction." |
| 10 | FAQ (`:330-348`) | Objections | `FAQ` `:28-53` | `none` | `details` | n/a | none | `:47` emoji replaced by "a live marker" |
| 11 | Related (`:351-378`) | Lateral | static | `none` | n/a | One column | existing | Keep |
| 12 | Closing offer (new) and footer (`:380-387`) | One offer; honest footer | `pickFlagship(['models'])`; `registryLastUpdated()` | `none` | Footer date reads the registry | Stack | `llm_hub_offer_open` | `:382` typed "May 20, 2026" replaced; `:384` keeps the data file reference |
| 13 | Metadata (`layout.tsx:4`) | Title | static | `OG card` (`opengraph-image.tsx`) | n/a | n/a | none | "LLM hub 2026: GPT-6 Astra, pricing and evaluation" |

---

## 8. Founder setup, `/stack`

Reader: a founder asking "what would you start with". Primary action: open a tool. Files: `app/stack/page.tsx`, `app/stack/StackGalleryClient.tsx` (replaced by a server component plus one small client control), `data/founder-setup.json` (new), `components/tools/ToolRow.tsx` (new).

| # | Block | Job | Source | Visual | Interaction, empty state | Mobile | Measure | Acceptance |
|---|---|---|---|---|---|---|---|---|
| 1 | Hero | Whose list this is and how it pays | `founder-setup.json` `updatedAt` | `none` (the `ai-toolchain-motherboard.jpeg` interim is a raster; wait for the SVG) | No filter tabs (`StackGalleryClient.tsx:430-437`, `:545-568`). `AffiliateDisclosure names={…}` renders here, before the first link | Stack | none | H1 "Tools I use for AI work" in `font-display`, not `font-serif` (`:524`); `:521` eyebrow and gold `#D4AF37` chrome (`:512-515`) removed, this is a tech-spectrum page; `page.tsx:7` title matches; em dashes `:531`, `:534` gone |
| 2 | The setup (new, 8 to 10 rows) | The list and the reason for each | `founder-setup.json` `tools[]`; links via `resolveProgramDestination()` (`lib/affiliates/resolve-destination.ts:17-32`) | `spot` optional (Lucide default) | Row: name, `job` in first person, `alternative`, status chip from `sponsorDecision()` ("Affiliate link" or "No referral"), `daily` marker; `rel="sponsored noopener"` only when sponsored | Rows stack, chip beside the link | `stack_tool_open` with `id`, `sponsored` | Every row has `alternative`; no vendor sentence as Frank's voice (`:109`, `:161`, `:203`, `:243` today); no `transition-all` (`:558`); no `focus:outline-none` without a ring (`:484`) |
| 3 | Also in the registry (new, collapsed) | Keep `/go` landings resolvable | `programs.json` entries with `hasProgram && status === 'active'` not in the setup, each with `id="<toolSlug>"` | `none` | Collapsed behind "Show the rest of the registry"; a `/stack#<id>` landing (`stackHref`, `lib/tools/go-destination.ts:44-45`) opens the list and scrolls to the row | List | `stack_registry_expand` | `scripts/tests/tool-record-contract.test.mjs` passes; `/go/elevenlabs` lands on a visible row |
| 4 | Not the diagnostic | Separate `/stack` from `/founder-stack` | static | `none` | One line with a text link to `/founder-stack` | n/a | `stack_founderstack_open` | Present (IA cross-link rule) |
| 5 | Instruments and XR (`:534-542`, `:571-584` merged) | Two text links | static | `none` | One short paragraph: `/tools` and Starlight's XR guide | n/a | none | No `font-serif` H2 (`:575`, `:606`) |
| 6 | Closing | Honest footer | `programs.json` `disclosure` | `none` | `:634` wording kept | n/a | none | Em dash free |

---

## 9. Partners, `/partners`

Reader: a visitor checking how recommendations are paid for. No commercial primary; the page is a disclosure. File: `app/partners/page.tsx`.

| # | Block | Job | Source | Visual | Interaction, empty state | Mobile | Measure | Acceptance |
|---|---|---|---|---|---|---|---|---|
| 1 | Hero (`:161-176`) | Name the page | static | `none` (rank 11 wants a real workflow scene; none exists) | n/a | Stack | none | `:169` "Partners and affiliate policy"; `:171-174` first person |
| 2 | Partnerships pointer (`:178-199`) | Route the strategic conversation | static | `none` | Text link (the filled button `:190-196` goes) | Stack | `partners_partnerships_open` | At most one filled button on the page |
| 3 | Four rules (`:201-249`) | The policy | static | `none` | n/a | List | none | Em dashes `:215`, `:241` replaced; "we" becomes "I" (`:26`, `:334`, `:413` are three narrators) |
| 4 | Affiliate programs (replaces `partners` `:20-122`) | Only dated, verified links | `programs.json` where `sponsorDecision().sponsored` (today Higgsfield, Wispr) through `ToolRow` | `none` | Row shows `verifiedOn`, `/go/<slug>` and the official URL. Empty: "No verified affiliate link is live right now." | Rows stack | `partners_registry_open` | n8n "30%" (`:38`), Cursor referral (`:47-55`), Notion referral (`:111-121`; registry says `closed`) gone |
| 5 | Tools I use, no referral (new) | The unpaid relationships | `founder-setup.json` rows with no live program | `none` | Official link, `noopener` | Rows stack | `partners_tool_open` | No "partner" label the registry does not record (`:22-26` today) |
| 6 | Programs in flight (`:323-364`) | Only what Frank confirms | Frank's answer to Q3 | `none` | Hidden until confirmed | n/a | none | `:352` removed regardless; `:360` "within 48 hours" removed unless a workflow enforces it |
| 7 | Revenue use, contact (`:366-391`) | What the money pays for | static | `none` | mailto stays | n/a | none | Em dash `:379` replaced |
| 8 | Caveat (`:420-431`) | Date | `programs.json.updatedAt` | `none` | n/a | n/a | none | `:427` typed date replaced |

Oracle wording at `:95` matches `frankx-authority-positioning.md:18`; keep it wherever Oracle is named.

---

## 10. Navigation, direction B

Files: `components/NavigationMega.tsx`, `components/MobileNavOverlay.tsx`, `scripts/tests/navigation-completeness.test.mjs`, `scripts/tests/navigation-mobile-contract.test.mjs`. One PR, `[contract-change]`, never with homepage files. Frank picks the direction first (06, Q1).

### Registry changes

| Door (key) | Promise | Featured destinations | Proof chip | Group changes |
|---|---|---|---|---|
| Founder (`explore`) | Find the constraint, then fix one layer | Founder Stack; Start here (`/start`); Foundry; Founder's Circle; the newsletter (label per Q4) | "Foundry selection rules" to `/foundry` | `Founder path` unchanged (pinned). `Current work` keeps Workspace, Research, Journal. `Systems & products`, `Connect` unchanged. The seven pinned hrefs (`/magic /vault /ecosystem /map /qualities /intelligence-atlas /licensing`) stay in this door |
| Build (`build`) | Inspect the systems, then build your own | AI architecture hub; ACOS; Agent hub; LLM hub; Work with Frank | "ACOS source on GitHub" to `https://github.com/frankxai/agentic-creator-os` | New group `Agents and models`: ACOS, Agent hub, LLM hub, Agent catalog. `Consulting` (`NavigationMega.tsx:169`, `MobileNavOverlay.tsx:205`) removed; `AI Studio` renamed `Work with Frank`. Price fragments (`:157`, `:171`, `:181`) removed |
| Research (`research`, new) | Investigations with the evidence attached | Research; Model Arena; Signals; Intelligence atlas; Blog; Journal | "Model Arena receipts" to `/research/model-arena` | New door. Items may duplicate Founder entries; the completeness test counts per door |
| Learn (`learn`) | Start where you are | Start with what you have (`/start-here`); AI architect academy; Guides; Courses; Books and library | "A seven-day protocol you can run" to `/blog/voice-typing-for-founders` | `:125` "23 books, 411K+ words" becomes "Frank's books"; `:116` em dash removed |
| Create (`gencreators`) | Content systems that keep your voice | GenCreator.AI (external); Creator path (`/for/creators`); Short-form video (`/opus-pro`, `/youtube`); Prompt library; Templates | None: no before-and-after artifact exists in the repository | `:103` "130+ curated prompts" becomes "Prompts I use and publish" (the mobile copy at `MobileNavOverlay.tsx:133`) |
| Music (`music`) | Unchanged | Unchanged | Featured release from `data/homepage-featured-release.ts` (`title`, `sunoUrl`) | None |

`desktopSections` (`NavigationMega.tsx:604-610`) becomes `['explore', 'build', 'research', 'learn', 'gencreators', 'music']`; the regex at `navigation-mobile-contract.test.mjs:57` changes in the same PR. `SectionKey` (`MobileNavOverlay.tsx:78`) gains `'research'`. The header action (`NavigationMega.tsx:667-672`) becomes "Find your starting point" to `/start`. The Build door's own action reads "Inspect the systems": `VOICE-LIBRARY.md` bans "Explore" CTAs, which outranks the line in `IA-AND-SITEMAP.md` that kept "Explore AI Architecture". Descriptions with "Sovereignty substrate" (`:274`), "CoE Playbook" (`MobileNavOverlay.tsx:182`) and "landscape" (`:199`) are rewritten.

### Panel blocks (desktop, 1024px and up)

| # | Block | Job | Source | Visual | Interaction | Acceptance |
|---|---|---|---|---|---|---|
| 1 | Door tile (replaces `FeaturedCard`, `NavigationMega.tsx:405-442`) | State the promise | `promise`, door `href` | `spot`: one 128px SVG or WebP under 15 KB per door (VISUAL-SYSTEM section 3), Lucide icon until a spot is approved. Not a 4:5 photo: the IA sketch said image tile, the visual system governs images | Whole tile links the door | No gradient wash (`:415`, `:418`); `void` background, hairline border |
| 2 | Featured destinations | Three to five titles with one plain sentence | registry `items` flagged `featured: true` | `none` | `MenuLink` as today | Sentence case; descriptions under 60 characters; no prices |
| 3 | Proof chip | One real artifact | `proof` | `none` | `TrackedLink` `nav_proof_open` with `door` | Hidden when `proof` is undefined |
| 4 | See everything in {door} | Nothing lost | `resolveNavigationGroups()` (`lib/navigation-groups.ts`) | `none` | Groups as today; trailing "More to explore" (`:30`) stays | Completeness test passes on both surfaces |

Panel width stays `w-[760px]` (`:455`); the grid becomes `[200px_1fr_180px]` for tile, destinations and proof. `h5` group headings (`:463`) keep no `uppercase` and no `font-serif` (`navigation-mobile-contract.test.mjs:82`).

### Mobile

The dialog (`MobileNavOverlay.tsx:486`), focus trap (`:431-460`), reduced-motion `initial` (`:481`), `Map Your Stack` CTA and the `data-mobile-nav-*` attributes stay as the test pins them. The section view gains the promise line and proof chip as its first row; no door tiles on mobile (no approved images under 15 KB exist, and a 44px text row is faster). The home view lists six doors; the separate "Blog" and "Journal" tiles below the doors go, because the Research door carries them.

### Acceptance for the navigation PR

- `node --experimental-strip-types --test scripts/tests/navigation-completeness.test.mjs scripts/tests/navigation-mobile-contract.test.mjs` passes with the updated pins; the PR quotes the old and new regex.
- `pnpm run links:check:static` passes (`/start`, `/llm-hub`, `/for/creators`, `/opus-pro`, `/youtube`, `/research/model-arena` resolve in `data/route-index.json`).
- Captures at 375, 768 and 1440 with each door open; Tab reaches every door, Escape closes, focus returns to the trigger.
- `node .claude/ci/web-guidelines-lint.mjs --changed` reports zero errors.
- No file under `app/page.tsx` or `components/home/**` in the diff.
