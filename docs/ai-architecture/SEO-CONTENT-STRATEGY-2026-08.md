# AI Architecture Pillar + Series — Content & SEO Strategy

**Repo:** `frankxai/frankx.ai-vercel-website` (production — `main` deploys to frankx.ai)
**Date:** 2026-08-20 · **Author:** Claude (content/SEO strategy session) · **Status:** decision-ready, not yet executed
**Scope:** (1) the definitive AI Architecture pillar page, updated for August 2026, built to rank and to be cited by answer engines; (2) the supporting series that makes it defensible.

Every claim below about the repo was verified by reading source in this checkout on 2026-08-20. Every search-volume number comes from one source — the Semrush MCP connector (US database, pulled 2026-08-20) — and is labeled as such. Where something could not be verified, it says so.

---

## 0. Decisions this document asks for

| # | Decision | Recommendation | Risk if skipped |
|---|---|---|---|
| D1 | Canonical URL for the head topic | **`/ai-architecture` stays the pillar.** Enrich it in place; do not create a new guide URL | Equity split across a fifth URL |
| D2 | Sub-page metadata | Add per-route `layout.tsx` metadata + per-blueprint canonicals (P0 fixes, §2.4) | All sub-pages keep canonicalizing to the hub; cluster cannot rank |
| D3 | `/blueprint/[slug]` duplicates | Port deploy buttons to `/ai-architecture/[slug]`, then canonical-tag `/blueprint/[slug]` to it | 13 slugs × 2 live URLs of duplicate content |
| D4 | Sitemap + llms.txt | Remove redirected URLs from sitemap; add live sub-pages; add an AI Architecture section to llms.txt | Crawlers are told the wrong URLs; answer engines never see the hub |
| D5 | The series | One new 6-part series ("AI Architecture Decisions") + 2 refreshes + 6 new `/ask/` entries; reuse the existing 5-part Agentic Architecture Hierarchy as the orchestration spine | Redundant new posts cannibalize the 250-post archive |

None of these renames or deletes a working URL. D3's canonical tag keeps `/blueprint/*` reachable; a 308 would need explicit operator approval per CLAUDE.md and is **not** required for the strategy to work.

---

## 1. Ground truth — how this site's SEO machinery actually works

Verified mechanisms, file by file. This section exists so the executing agent doesn't re-derive (or mis-derive) any of it.

### 1.1 Metadata and canonicals

- **`lib/seo.ts`** — `createMetadata({ title, description, path, canonical?, noindex?, type?, publishedTime?, updatedTime? })` returns a Next `Metadata` object with `alternates.canonical` defaulting to `https://www.frankx.ai` + `path` (siteUrl is `www`; the file comments that Vercel serves `www` as primary and redirects apex). OG image defaults to `/images/brand/frankx-public-workspace-og-1200x630.png` (static fallback because `/api/og` had empty-body issues under Next 16 + next/og).
- **`app/layout.tsx:71`** — `metadataBase: new URL(siteConfig.url)`, so relative image paths resolve correctly.
- **Metadata inheritance (load-bearing):** Next App Router merges metadata per segment; fields a leaf does not define are inherited from the nearest parent layout. `app/ai-architecture/layout.tsx` defines title/description/canonical for `path: '/ai-architecture'`. Consequence: **every sub-page that defines no metadata of its own inherits the hub's canonical** (see §2.4-P0-1).

### 1.2 JSON-LD

- **`lib/seo/jsonld.ts`** — `ldJson()`: XSS-safe serializer for inline `<script type="application/ld+json">` (escapes `<`, `>`, `&`, U+2028/9).
- **`lib/structured-data.ts`** — older `serializeJsonLd()` (escapes `<` only). Two serializers coexist; prefer `ldJson`.
- **`lib/schema-builders.ts`** — `buildArticleSchema` / `buildFAQSchema` / `buildHowToSchema`. ⚠️ Its `SITE_CONFIG.url` is `https://frankx.ai` (apex), while `lib/seo.ts` uses `https://www.frankx.ai`. Host inconsistency in emitted `@id`s — flag for a one-line fix.
- **`components/seo/JsonLd.tsx`** — typed `<JsonLd type=… data=…>` component; supported types include `Article`, `FAQPage`, `HowTo`, `BreadcrumbList`, `QAPage`, `Course`, `ItemList`, `CollectionPage`. Also exports `buildFAQPageData`, `buildHowToData`.
- **`components/seo/Breadcrumbs.tsx`** — renders visible breadcrumbs **and** emits `BreadcrumbList` JSON-LD.
- In use today: blog posts emit `Article` (+`FAQPage` when Q&A headings are extractable) at `app/blog/[slug]/page.tsx:143-160`; guides emit `Article` + `FAQPage` from frontmatter `faqs` at `app/guides/[slug]/page.tsx:75-77`; `/ask/[slug]` emits `FAQPage` with Question/Answer at `app/ask/[slug]/page.tsx:270-292`; research pages emit their own blocks.
- **None of the `/ai-architecture` family emits any JSON-LD today** (verified by grep across `app/ai-architecture/`, `app/ai-architect*/`, `components/ai-architecture/`).

### 1.3 Content authoring pipelines

- **Blog:** MDX in `content/blog/` (250 files), loaded by `lib/blog.ts` (gray-matter + reading-time, `cache()`d). Frontmatter supports: `title, description, date, lastUpdated, category, tags, keywords, tldr, faq[], schema[], featured, flagship, canonical` (canonical override for duplicates), `series { slug, title, part, total }` (drives prev/next SeriesNav), and `architectNote` (an "AI Architect Recommendation" box). Rendered at `app/blog/[slug]/page.tsx` with canonical `${siteConfig.url}/blog/${slug}`, Article JSON-LD (author marked `jobTitle: 'AI Architect'`, `alumniOf: Oracle`), extracted-FAQ JSON-LD, visible `Breadcrumbs`.
- **Guides:** MDX in `content/guides/` (25 files) via `lib/guides.ts`; rendered at `app/guides/[slug]/page.tsx` with `createMetadata` + canonical + Article + FAQPage. The evergreen surface.
- **Research:** `lib/research/domains.ts` (data module ~15k lines) → `/research/[slug]`; five domains today: `agentic-life-architecture`, `agentic-memory`, `agentic-sovereignty`, `agentic-evals`, `agentic-life-observatory`; plus the series page `app/research/series/architecture-of-intelligence/page.tsx`.
- **Ask (Q&A/AEO surface):** `data/ask-questions.ts` (14 entries, categories include `ai-architecture`) → `/ask/[slug]` with FAQPage JSON-LD and `createMetadata`. Also fed into llms.txt.

### 1.4 Crawl surfaces

- **`app/sitemap.ts`** (818 lines) — hardcoded arrays + dynamic loaders (blog from `content/blog`, guides, journal, newsletter, shorts…). AI-architecture entries today: `/ai-architecture` (0.7), plus **redirected** URLs `/ai-architect` (0.7 and again in an `aiPages` array at line 206), `/ai-architectures` (0.7), `/prototypes` (0.5), `/ai-architect/multi-cloud-comparison` (0.7), and `/ai-architect-academy` (0.8). **Missing:** every live `/ai-architecture/*` sub-page and all 13 blueprint URLs.
- **`app/robots.ts`** — allows all + an explicit AI-crawler allowlist (GPTBot, ChatGPT-User, ClaudeBot, Claude-Web, PerplexityBot, Google-Extended, Applebot-Extended, Amazonbot, cohere-ai, Meta-ExternalAgent); disallows `/api/`, `/admin/`, `/prototype/`, etc. ⚠️ `sitemap:` points at `https://frankx.ai/sitemap.xml` (apex) while canonicals are `www` — works via redirect, but align it.
- **`app/llms.txt/route.ts`** + **`app/llms-full.txt/route.ts`** — generated llms.txt per llmstxt.org: sections for OS modules, Library, Research, Workshops, Ask, blog, journal. **The `/ai-architecture` family appears nowhere in either file** (grep-verified) — the single cheapest AEO gap on the site.

### 1.5 Redirects (already shipped — this changes the whole brief)

`next.config.mjs:252-271` — "AI Architecture Hub redirects - consolidate all variants to single hub", all `permanent: true`:

```
/prototypes                              → /ai-architecture/blueprints
/ai-architectures                        → /ai-architecture
/ai-architect                            → /ai-architecture
/ai-architect/:path((?!ai-coe-hub).*)    → /ai-architecture/:path     (ai-coe-hub carved out)
```

Config redirects run before the filesystem, so `app/ai-architectures/page.tsx`, `app/ai-architect/page.tsx` + `AIArchitectClient.tsx`, `app/ai-architect/multi-cloud-comparison/*`, and `app/prototypes/page.tsx` are **unreachable dead code**. `data/redirect-aliases.json` additionally 301s typo/alias paths (`/academy`, `/architect-academy`, `/ai-computer`, `/signal` → hub/academy). The cannibalization question is therefore already half-answered in routing; what remains is metadata, sitemap, llms.txt, one live duplicate route, and internal links.

### 1.6 Contracts and gates that must keep passing

- **`scripts/check-ai-architecture-contract.mjs`** (wired as `test:ai-architecture` inside `pnpm run merge:gate`): requires ≥8 entries in `data/ai-architecture/official-sources.json`, each with `docsUrl`, `source.kind/label/url`, `flow.length ≥ 4`; deployment coverage of Vercel + Railway + GCP; the visible sentence `Every external link in this catalog was checked` in `OfficialArchitectureAtlas.tsx`; no generic "Working repository" label; no `/blueprint/` links in `app/ai-architecture/blueprints/page.tsx` or the legacy `AIArchitectureShell.tsx`; and the canonical link template `/ai-architecture/${blueprint.slug}` present in both.
- **`scripts/audit-ai-slop.mjs --strict`** (CI): taste.md refusal list — "delve", "dive deep/into", "unleash", "harness the power", "unlock your potential", "next-level", "game-changing", "revolutionary", line-initial "certainly/absolutely", etc.
- **`scripts/audit-marketing-claims.mjs --strict`**: bans Fortune 100/500 claims, "trusted by", "Nx faster", "N% success rate", numeric ROI, and large vanity metrics — scans `app/ components/ lib/ data/` (not `content/`).
- **`scripts/check-internal-links.mjs`** (`links:check:static`) — broken internal links fail the gate.
- Voice: `taste.md` + `design.md` outrank everything; title is "AI Architect", never "AI Systems Architect"; independent of Oracle; UI work goes through the `web-release-gate` skill with before/after screenshots at 375/768/1440.


---

## 2. Current-state audit of the AI-architecture estate

### 2.1 Route by route

| URL | State | Source | What it is |
|---|---|---|---|
| `/ai-architecture` | **Live · canonical hub** | `app/ai-architecture/page.tsx` (5 lines) → `components/ai-architecture/OfficialArchitectureAtlas.tsx` (266 lines, `'use client'`) | "AI architecture field guide": 8 official reference architectures (Vercel agent interface, Vertex RAG, Google ADK team, Railway worker plane, OpenAI agent service, MCP tool plane, Temporal durable workflow, OTel observability) from `data/ai-architecture/official-sources.json`, each with owner, layer, 4-step flow, deployment badges, docs + repo links; a Vercel–Railway–GCP topology diagram; link-verification line "checked on 12 July 2026"; analytics events wired (`ai_architecture_cta_opened`, `ai_architecture_filter_selected`, `ai_architecture_source_opened`) |
| `/ai-architecture/[slug]` | Live ×13 | `app/ai-architecture/[slug]/page.tsx` (377 lines) + `data/ai-architecture/prototypes.json` (13 published blueprints, 2,001 lines) | Blueprint detail pages: mermaid architecture diagram, problem/solution, components, implementation steps, code examples, `estimatedCost.monthly`, `timeToImplement`. `generateMetadata` returns **title + description only** |
| `/ai-architecture/blueprints` | Live | `app/ai-architecture/blueprints/page.tsx` (client, **no metadata**) | Blueprint index; links `/ai-architecture/${slug}` (contract-enforced) |
| `/ai-architecture/prototypes` | Live | client, **no metadata** | Interactive BYOK prototypes (chat playground live, others planned) |
| `/ai-architecture/templates` | Live | client, **no metadata** | Paid starter kits via Lemon Squeezy checkout links |
| `/ai-architecture/tools` | Live | client, **no metadata** | Curated tool directory, 8 categories |
| `/ai-architecture/multi-cloud-comparison` | Live | client, **no metadata** | AWS/GCP/Azure/OCI comparison with CostBreakdown/GenAISetup/Roadmap components |
| `/ai-architectures` | **308 → hub** | dead file `app/ai-architectures/page.tsx` (465 lines) | Unreachable showcase. Contains exactly the class of unsourced metrics recent commits removed elsewhere ("94%" accuracy, "10M/day", "99.99%", "40% savings") and links to `/prototype/${slug}` — harmless only because unreachable |
| `/ai-architect` | **308 → hub** | dead `page.tsx` + `AIArchitectClient.tsx` (742 lines) | Unreachable methodology page |
| `/ai-architect/ai-coe-hub` | **Live (carve-out)** | `app/ai-architect/ai-coe-hub/page.tsx` (client) | Oracle/OCI + FrankX AI-CoE resource hub; referenced by `lib/cross-links.ts` (`'ai-coe'` surface) and `data/os-modules.ts:108` |
| `/ai-architect/multi-cloud-comparison` | 308 → `/ai-architecture/multi-cloud-comparison` | dead duplicate component tree | Unreachable |
| `/ai-architect-academy` | **Live** | `app/ai-architect-academy/page.tsx` (645 lines, client; layout has `createMetadata`) | Training/curriculum surface for the public GitHub repo `frankxai/ai-architect-academy` (patterns, learning paths, Claude config) |
| `/ai-architect-academy/patterns` | Live | server page with `createMetadata` | 8 pattern one-pagers linking into the GitHub repo |
| `/blueprint/[slug]` | **Live — unredirected duplicate** | `app/blueprint/[slug]/page.tsx` | Same 13 blueprints as `/ai-architecture/[slug]`, same data file — but this copy additionally renders affiliate-tracked `DeployButtonGroup` (from `data/deploy-targets.json`). No canonical on either side. The contract bans *linking* to `/blueprint/` from the two index surfaces but the route itself still resolves |
| `/prototype/[id]`, `/prototype/chat-playground` | Live, robots-disallowed | `app/prototype/*` | Interactive surfaces; correctly excluded from crawl |

Adjacent live surfaces that overlap topically: `/for/architects` (audience lander, sitemap 0.9, links to hub), `/ai-coe` (AI Center of Excellence), `/ai-ops/architecture` + `/ai-ops/patterns`, `/research/agentic-*` (5 domains), `/research/series/architecture-of-intelligence`, `/courses/agent-architecture-systems`, `/agents`, `/starlight-intelligence-system`.

### 2.2 What's good

- The **routing consolidation already happened** (§1.5) — four families → one canonical hub + one carved-out CoE hub + the academy. The strategy builds on it instead of re-litigating it.
- The **atlas is genuinely differentiated**: link-verified official sources with a dated verification statement that CI enforces. No competitor page has a CI contract that fails the build when the verification sentence disappears.
- The **blueprint data layer** (`prototypes.json`) is deep: 13 systems with diagrams, component inventories, implementation steps, cost estimates. Most "ultimate guide" competitors have prose only.
- Voice and copy on the current atlas already pass the taste bar ("Build the agent system you can operate", "Keep the web request short. Move durable work to workers…"). Nothing to unwrite.
- The blog machinery (tldr/faq/schema/series/canonical frontmatter) is exactly the machinery a pillar-cluster program needs, already proven on 250 posts.
- A 5-part series shipped 2026-08-18 — "The Agentic Architecture Hierarchy" (`agentic-hierarchy-2026`): skills-vs-agents-vs-prompts-vs-mcp (P1) → agent-skill-standard (P2) → MCP in production (P3, flagship) → subagent swarms & FSMs (P4) → context compression & memory vaults (P5). The orchestration spine of the cluster already exists and is fresh.

### 2.3 What's duplicated or thin — the concrete cannibalization risks

1. **13 slugs × 2 live URLs.** `app/blueprint/[slug]/page.tsx` vs `app/ai-architecture/[slug]/page.tsx` render near-identical pages (diff: the `/blueprint` copy has deploy buttons) with no canonical on either. Google picks arbitrarily; equity splits. *This is the sharpest live duplication in the estate.*
2. **Six sub-pages canonicalize to the hub.** `blueprints`, `prototypes`, `templates`, `tools`, `multi-cloud-comparison` export no metadata (client components), and `[slug]`'s `generateMetadata` omits `alternates` — all inherit `app/ai-architecture/layout.tsx`'s canonical `https://www.frankx.ai/ai-architecture` plus (for the five index pages) its identical title/description. Effect: the whole sub-tree tells Google "index only the hub". Verify in rendered HTML (`<link rel="canonical">`) before and after the fix.
3. **Sitemap advertises redirected URLs and omits live ones** (§1.4). Crawl budget goes to 308s; the 13 blueprint pages — the deepest content — are not declared anywhere.
4. **llms.txt omits the entire family.** Answer engines that honor llms.txt get routed to OS modules, Library, Research, Ask — never to the architecture estate this strategy is about.
5. **Internal links to redirected URLs.** `app/ai-architect-academy/page.tsx:299` links `/prototypes`; the dead `/ai-architectures` page links `/prototype/${slug}` (unreachable, ignore). Fresh anchors should point at final URLs.
6. **Title-space overlap inside the blog archive.** ≥4 posts compete on multi-agent orchestration (`multi-agent-orchestration-patterns-2026`, `swarm-intelligence-multi-agent-orchestration`, `subagent-swarm-orchestration-fsm-2026`, `enterprise-agent-roadmap`, `agentic-ai-roadmap-2026`); two near-identical tldrs on the two roadmap posts (grep confirms identical boilerplate sentence). New series titles must claim distinct intents, and duplicate posts should get frontmatter `canonical` pointing at the survivor.
7. **Metadata host inconsistency**: `lib/schema-builders.ts` (apex) vs `lib/seo.ts` (www); `robots.ts` sitemap at apex.
8. **Academy vs hub intent overlap** is acceptable (learn vs reference) but currently unmanaged: academy title says "Enterprise AI Training", hub says "Field Guide", yet neither links the other with descriptive anchors, and the academy's patterns page duplicates the pattern list the blueprints index also implies. Differentiation contract in §3.3 resolves this by intent, not deletion.

### 2.4 P0 technical fixes (ship before or with the pillar refresh)

All are additive; none renames a URL; each names its verification.

| # | Fix | Files | Verify |
|---|---|---|---|
| P0-1 | Per-route metadata: add server `layout.tsx` with `createMetadata` for `blueprints`, `prototypes`, `templates`, `tools`, `multi-cloud-comparison` (pattern already proven by `app/ai-architectures/layout.tsx` wrapping a client page) | `app/ai-architecture/{blueprints,prototypes,templates,tools,multi-cloud-comparison}/layout.tsx` (new) | `curl` rendered HTML: unique `<title>` + self-canonical per route |
| P0-2 | Blueprint canonicals: extend `generateMetadata` in `app/ai-architecture/[slug]/page.tsx` to use `createMetadata({ path: '/ai-architecture/' + slug, type: 'article', updatedTime: blueprint.updatedAt })` | one file | self-canonical on all 13; contract still passes (`pnpm run test:ai-architecture`) |
| P0-3 | De-duplicate `/blueprint/[slug]`: port `DeployButtonGroup` block into `/ai-architecture/[slug]`, then add `alternates.canonical → /ai-architecture/[slug]` in `app/blueprint/[slug]/page.tsx`. (Optional later, with operator approval: 308 redirect) | 2 files | both URLs render; `/blueprint/*` carries cross-canonical |
| P0-4 | Sitemap hygiene: remove `/ai-architect` (both entries, lines 206 + 300), `/ai-architectures` (302), `/prototypes` (304), `/ai-architect/multi-cloud-comparison` (317); add the 5 sub-pages, 13 blueprint URLs (derive from `prototypes.json` with `updatedAt` as lastmod), `/ai-architect/ai-coe-hub`, `/ai-architect-academy/patterns` | `app/sitemap.ts` | sitemap route renders; no redirected URLs remain (`grep`) |
| P0-5 | llms.txt: add an "AI Architecture" section — hub, blueprints index, 13 blueprints (title + one-liner from `prototypes.json`), tools, templates, multi-cloud comparison, academy, CoE hub, and the two architecture blog series | `app/llms.txt/route.ts` (+ llms-full) | fetch `/llms.txt`, links resolve 200 |
| P0-6 | Fix academy internal link `/prototypes` → `/ai-architecture/blueprints` | `app/ai-architect-academy/page.tsx:299` | `pnpm run links:check:static` |
| P0-7 | JSON-LD on the family: hub gets `CollectionPage` + `FAQPage` + `BreadcrumbList`; blueprints get `TechArticle`-shaped `Article` + `BreadcrumbList` + (where implementationSteps exist) `HowTo`; reuse `components/seo/JsonLd.tsx` + `Breadcrumbs.tsx` | hub page (compose server wrapper), `[slug]` page | Rich Results test / schema validator on 3 sample URLs |
| P0-8 | Host alignment: `robots.ts` sitemap → `https://www.frankx.ai/sitemap.xml`; `lib/schema-builders.ts` `SITE_CONFIG.url` → www | 2 lines | grep |

Deliberately **not** proposed: deleting the dead `app/ai-architectures/`, `app/ai-architect/AIArchitectClient.tsx`, `app/prototypes/page.tsx`, or `components/ai-architecture/AIArchitectureShell.tsx` (the contract script reads the shell; dead-code removal is a separate, operator-approved cleanup). Flagged, not fixed.


---

## 3. Keyword & intent architecture

### 3.1 Data and its source

All volumes/difficulty below: **Semrush MCP connector, US database, batch keyword reports pulled 2026-08-20.** Volume = monthly US searches; KD = Semrush Keyword Difficulty 0–100. These are one country's numbers from one vendor — treat them as *relative* signals for prioritization, not totals. Where a term was not pulled, the table says "not pulled" instead of a guess. (A domain-level baseline pull for frankx.ai failed with `API UNITS BALANCE IS ZERO` on the domain-analytics unit pool — capture the baseline via Semrush position tracking when units refresh; §8.)

**The single most important data finding:** the question-SERP for "ai architecture" is dominated by *building*-architecture queries ("will architecture be replaced by ai" 170/mo, "can ai draw architectural plans" 40/mo…). The head term (2,400/mo, KD 61) is semantically contested with the architecture profession. Meanwhile "what is ai architecture" is only 30/mo. Consequence: **the pillar must disambiguate in its first sentence, and the winnable demand is in the qualified mid-tail**, where FrankX already has assets.

### 3.2 The demand map (Semrush US, 2026-08-20)

**Head / near-head**

| Term | Vol | KD | Intent | Owner URL |
|---|---|---|---|---|
| ai architecture | 2,400 | 61 | info+commercial | `/ai-architecture` (pillar) |
| ai architect | 1,600 | 47 | info (career-shaded) | `/ai-architect-academy` (+ `/frank-riemer` for the entity) |
| agentic ai architecture | 880 | 42 | info | `/ai-architecture` (pillar section + definition block) |
| ai agent architecture | 720 | 55 | info | `/ai-architecture` (pillar) |
| agentic architecture | 590 | 56 | info | pillar (synonym coverage, same section) |

**Mid-tail cluster (spoke owners)**

| Term | Vol | KD | Intent | Owner URL |
|---|---|---|---|---|
| mcp server | 40,500 | 56 | info+commercial | existing `/blog/mcp-protocol-production-architecture-2026` (+ MCP guides) |
| model context protocol | 14,800 | 82 | info | same MCP spoke (KD says: win via long-tail, not head) |
| prompt injection | 4,400 | 73 | info | S4 security spoke (section-level target, not page H1) |
| agentic rag | 3,600 | 48 | info | **S2 (new)** |
| context engineering | 3,600 | 68 | info | existing series P5 (context compression) — refresh title/meta |
| agentic workflows | 2,900 | 49 | info | existing `agentic-workflows-save-hours` + pillar section |
| a2a protocol | 2,900 | 56 | info | **S7 (new)** — upgrade of `guides/agent-card-a2a-spec` |
| llmops | 2,900 | 50 | info | `/ai-architecture/multi-cloud-comparison` + ops section of pillar |
| rag pipeline | 1,900 | 54 | info | S2 + `enterprise-rag-platform` blueprint |
| ai observability | 1,900 | 49 ($21 CPC) | info | existing `observability-stack-multi-agent-systems-2026` — refresh (S8) |
| ai gateway | 1,600 | 52 | info | **S1 (new)** |
| rag architecture | 1,300 | 60 | info | S2 (secondary) |
| multi-agent systems | 1,300 | 54 | info | series P4 + `/ask/what-is-a-multi-agent-system` |
| llm evaluation | 1,300 | 42 | info | existing evals posts — refresh + interlink (S8) |
| temporal workflow | 1,000 | 54 | info | **S3 (new)** |
| ai agents vs agentic ai | 1,000 | 54 | comparison | new `/ask/` entry |
| ai agent security | 880 | 43 ($28 CPC) | info | **S4 (new)** |
| llm gateway | 720 | **23** | info | S1 — lowest-KD/volume ratio in the set; the single best new-page bet |
| llm architecture | 720 | 46 | info | pillar §definition + model-layer section |
| ai agent framework | 590 | 34 | info+commercial | existing framework comparisons + pillar decision table |
| enterprise ai architecture | 260 | 42 ($11.76 CPC) | info/decision | pillar enterprise section + `/ai-coe` |
| ai system design | 260 | 35 | info | pillar (secondary) |
| multi agent orchestration | 210 | 55 ($10.73) | info | series P4 + `multi-agent-orchestration-patterns-2026` |
| durable execution | 170 | **30** | info | S3 |
| vector database comparison | 170 | 30 | comparison | existing tools page + blueprint; candidate later spoke |
| ai architecture diagram | 170 | 46 | info | pillar diagrams section + blueprints index |
| ai reference architecture | 90 | 53 | info | hub atlas section (exact-phrase H2) |
| ai architecture patterns | 30 | **0** | info | already owned ambition of `/ai-architect-academy/patterns` + `ai-architecture-patterns-solo-builders` — tiny volume, zero difficulty: free win, don't over-invest |

**Long-tail / question set** (for `/ask/` + pillar FAQ; Semrush phrase-questions pulls for "ai architecture" and "ai agent")

| Question | Vol | KD | Treatment |
|---|---|---|---|
| what is agentic ai | 27,100 | 95 | definition block inside pillar only — do not chase as a page |
| what is an ai agent | 12,100 | 90 | same |
| how to build an ai agent | 2,400 | 59 | maps to existing workshop `/workshops/build-first-ai-agent` + academy |
| how do ai agents work | 480 | 77 | pillar FAQ |
| what is agentic ai architecture | 30 | 37 | new `/ask/` entry (exact question-shaped URL) |
| when to use multi-agent vs single agent | not pulled | — | new `/ask/` (already half-answered by `what-is-a-multi-agent-system`) |
| llm gateway vs direct API calls | not pulled | — | new `/ask/` + S1 answer block |
| how much does it cost to run an ai agent | not pulled | — | new `/ask/` + S6 |
| what is durable execution for ai agents | not pulled | — | new `/ask/` + S3 |
| mcp vs a2a | not pulled | — | new `/ask/` + S7 |

("not pulled" = no volume data fetched for that phrasing; they are included on intent-fit grounds, not demand claims.)

### 3.3 Pillar + spoke model, and who owns what

```
                         /ai-architecture  (PILLAR — "AI Architecture" head + reference intent)
                          │  owns: ai architecture, agentic ai architecture, ai agent architecture,
                          │        ai reference architecture, ai architecture diagram
      ┌───────────┬───────┼────────────┬──────────────┬─────────────┐
  blueprints   [slug]×13  tools     templates   multi-cloud-comparison   (owned sub-intents:
  (catalog)  (implementation)  (stack)  (transactional)  (llmops / provider choice)
      │
  BLOG SPINE (exists): agentic-hierarchy-2026 P1–P5 — skills/agents/prompts/MCP taxonomy,
      skill standard, MCP production, swarm FSMs, context+memory
  BLOG SERIES (new): "AI Architecture Decisions" S1–S6 — gateway, agentic RAG, durable
      execution, security, failure modes, cost
  GUIDES: agentic-engineering-mastery-2026, first-agent-primer, agent-card-a2a-spec (→S7)
  ASK: 6 new question pages (AEO edge)
  ACADEMY: /ai-architect-academy — learning/career intent ("ai architect", curriculum, repo)
  COE HUB: /ai-architect/ai-coe-hub — enterprise CoE intent (+ /ai-coe)
  RESEARCH: /research/agentic-* — theory/frontier intent (agentic memory, evals, sovereignty)
```

**Differentiation contract (resolves cannibalization without deleting anything):**

- `/ai-architecture` = *reference* intent: "show me the architecture." Never teaches a curriculum, never sells a course.
- `/ai-architect-academy` = *learning/career* intent: "make me the architect." Owns "ai architect" (1,600/KD 47) and the career long-tail (salary 320, certification 170, how-to-become 50). Its hero copy should say so and link the hub with anchor "AI architecture field guide" — one direction of authority.
- `/ai-architect/ai-coe-hub` + `/ai-coe` = *organizational* intent ("ai center of excellence", 320/KD 62).
- Blog = *dated analysis and decisions* (each post owns one decision or one pattern; `lastUpdated` discipline).
- `/ask/` = *single-question answers*, 150–400 words, FAQPage JSON-LD — the citation-bait layer.
- Research = *frameworks and original theses* (no keyword duty).

Rule going forward: **before any new architecture URL ships, it must claim a row in the table above that no existing URL owns** — enforceable as a checklist item in the publish flow (`.claude/commands/publish.md`).


---

## 4. The pillar page spec

### 4.1 URL: `/ai-architecture` — enrich in place. No new URL.

Justification against the alternatives:

| Option | Verdict | Why |
|---|---|---|
| `/ai-architecture` (existing hub) | **Chosen** | Already the redirect target of three legacy families (`next.config.mjs:252-271`); linked sitewide (NavigationMega, Footer, MobileNavOverlay, homepage routers, `/for/architects`); already titled "AI Architecture Field Guide"; carries whatever age/equity the estate has. Every alternative starts from zero and adds a fifth competing URL — the disease this brief asks to cure |
| `/ai-architecture/guide` (new) | Rejected | Splits head-term relevance between parent and child; the hub would outrank its own guide on nav-link weight alone |
| `/blog/...` post | Rejected | Blog is the dated-analysis surface; pillar is evergreen reference. Also blog canonical pattern hard-codes `/blog/` paths |
| `/guides/ai-architecture` | Rejected | Right machinery, wrong family — the architecture estate lives under `/ai-architecture`, and guides sit outside its internal-link cluster |

**Mechanics of "enrich in place":** `app/ai-architecture/page.tsx` is a 5-line server component rendering the client atlas. Convert it to a server page that composes: server-rendered guide sections (definition, decision framework, layers, failure modes, FAQ — crawlable HTML, no JS required) around the existing `<OfficialArchitectureAtlas />` as the interactive centerpiece. The contract (`check-ai-architecture-contract.mjs`) tests strings *inside the atlas component file* and file existence — composing around it does not touch the contract. UI change ⇒ goes through the `web-release-gate` skill with 375/768/1440 before/after screenshots per CLAUDE.md.

### 4.2 Title / H1 / meta

- **`<title>`:** `AI Architecture: The Field Guide to Production Agent Systems (2026) | FrankX`
  (keeps the established "field guide" identity; adds the head term first; year signals freshness — the year lives in the title only if the refresh protocol in §7 is actually followed.)
- **H1:** `AI architecture: build the agent system you can operate.`
  (extends the current H1 — keeps the earned brand line, adds the head term. One H1 on the page.)
- **Meta description (152 chars):** `Reference architectures for AI systems that survive production — verified sources, deployable blueprints, a Vercel–Railway–GCP split, and the failure modes.`
- **First paragraph (the disambiguation + definition block, quotable):** "AI architecture is the discipline of deciding where models, tools, data, and control flow live in a software system — this page is about designing AI systems, not about AI tools for building architects. It covers the layers every production agent system needs, the official reference architectures worth copying, and the decisions that separate demos from systems you can operate."
  (Two jobs in one paragraph: the Semrush question data (§3.1) shows the head SERP is polluted with building-architecture intent, so the page must disqualify that reading immediately — and the first sentence is the definition answer engines can lift verbatim.)

### 4.3 Section outline

H2s are question-shaped or claim-shaped so each can be cited standalone; every H2 opens with a 2–4 sentence self-contained answer before detail (AEO pattern, §5).

```
H1  AI architecture: build the agent system you can operate.
    [definition + disambiguation block — the quotable 40-word answer]
    [updated line: "Last verified: <date> · every external link checked · changelog"]

H2  What is AI architecture? (and what it is not)
    H3  The four decisions every AI system encodes (model, context, control flow, state)
    H3  AI architecture vs. ML architecture vs. agentic architecture — terms that get conflated

H2  The layers of a production AI system
    [the existing Vercel–Railway–GCP topology diagram, kept — annotated]
    H3  Experience layer — streaming UI, auth, request lifecycle
    H3  Orchestration layer — agents, tools, routing, handoffs
    H3  Runtime layer — workers, queues, durable execution
    H3  Intelligence layer — models, retrieval, evaluation
    H3  Operations layer — observability, cost, governance

H2  Which reference architecture should you start from?
    [decision table: 8 rows from official-sources.json × columns: start here if / avoid if /
     deployment / maintained by — the atlas itself follows as the interactive catalog]
    [existing OfficialArchitectureAtlas component — filter, flows, verified links]

H2  How do you choose between single-agent, multi-agent, and workflow designs?
    [decision tree — the only diagram on the page that is new]
    H3  When a single agent with good tools beats a swarm
    H3  When orchestration earns its complexity
    H3  When you want a workflow engine, not an agent

H2  Where AI architectures fail in production
    [the failure-mode catalog — only-here asset #3, seeded from the site's own shipped
     systems and the blueprints' problem/solution fields; each mode: symptom → cause →
     architectural fix → which blueprint demonstrates the fix]

H2  What does it cost to run?
    [cost-shape table by architecture class, derived from the estimatedCost data already
     in prototypes.json, labeled as estimates with assumptions — no invented benchmarks]

H2  The 13 deployable blueprints
    [3–4 featured cards + link to /ai-architecture/blueprints with descriptive anchor]

H2  Build the skills: where to go from here
    [→ /ai-architect-academy (anchor: "AI Architect Academy — the learning path"),
     → /workshops/build-first-ai-agent, → series P1 (the hierarchy), → newsletter]

H2  FAQ  [6–8 entries mirrored into FAQPage JSON-LD; sourced from §3.2 question set]
```

Estimated length: 2,500–3,500 words of server-rendered prose around the atlas. Long enough to be the reference; short enough that the atlas stays the centerpiece. taste.md cadence rules apply (no two text walls without a visual break; the atlas, decision tree, and tables are the breaks).

### 4.4 Why each section beats what currently ranks

*Honesty note: a SERP-competitor pull for "ai architecture" failed on Semrush unit balance (§3.1), so the competitor characterization below is an **assumption from general knowledge of these SERPs, not a verified crawl** — verify with a live SERP check before drafting begins.* Typical rankers for this class of term are cloud-vendor explainers and glossary-style listicles. The structural edges this page has regardless of who ranks:

| Section | The structural edge |
|---|---|
| Definition | Disambiguates against building-architecture intent explicitly (no glossary page does; the Semrush question data shows the confusion is real) |
| Layers | Maps every layer to a *deployable* target and a maintained repo, not vendor abstractions |
| Reference-architecture chooser | The atlas is link-verified on a printed date and CI fails if the claim is removed — a freshness receipt no vendor page carries |
| Single vs multi-agent | A decision tree with named thresholds, versus the "it depends" prose that dominates |
| Failure modes | Vendor pages don't publish failure catalogs about their own patterns; independence is the moat |
| Cost | Real per-blueprint estimates with assumptions, versus no numbers at all (vendors) or invented ROI (listicles) — and the claims audit keeps ours honest |
| Blueprints | Working diagrams + steps + code, one click from the guide |

### 4.5 Only-here assets (the defensibility list)

1. **CI-enforced freshness receipt** — the dated "every external link checked" line, contractually required by `check-ai-architecture-contract.mjs`. Extend the contract to also require the guide's "Last verified" line once it ships.
2. **The Vercel–Railway–GCP deployment split** with per-architecture deployment matrix (contract requires all three providers covered).
3. **The failure-mode catalog** (new, §4.3) — grounded in systems this site actually runs (`ai-architecture-patterns-solo-builders` documents the site's own architecture; blueprints carry problem/solution fields to mine).
4. **13 deployable blueprints** with mermaid diagrams, implementation steps, cost estimates — after P0-3, with one-click deploy buttons.
5. **Working public repos** — `frankxai/ai-architect-academy` (+ SIS, ACOS) let every pattern claim resolve to code.
6. **The decision tables** (reference-architecture chooser; single-vs-multi-agent tree) — extractable, citable, and absent from prose-only competitors.

---

## 5. AEO / answer-engine strategy

The site already allowlists AI crawlers in `robots.ts` and ships generated `llms.txt`/`llms-full.txt`. The gap is that the architecture estate is invisible in those files and emits no structured data. The play:

1. **Question-shaped H2s + answer-first blocks** (§4.3): every H2 is followed by a 40–80-word self-contained answer that survives being quoted alone — no "as we saw above", no pronouns without antecedents. This is the single highest-leverage citation pattern for ChatGPT/Claude/Perplexity extraction.
2. **Definition blocks:** one-sentence bolded definitions for: AI architecture, agentic architecture, AI gateway, durable execution, agentic RAG, MCP, A2A. Each ≤ 40 words, each on the URL that owns the term (§3.3), phrased to stand alone.
3. **JSON-LD, using what `lib/`/`components/seo` already support** (§1.2):
   - Pillar: `CollectionPage` (+ `mainEntity` ItemList of the 8 reference architectures) + `FAQPage` + `BreadcrumbList` via `<JsonLd>` and `<Breadcrumbs>`.
   - Blueprints `[slug]`: `Article` (with `dateModified` from `updatedAt`) + `BreadcrumbList`; where `implementationSteps` exist, `HowTo` via `buildHowToData`.
   - Series posts: already emit `Article` + extracted `FAQPage`; add explicit `faq:` frontmatter (supported by `lib/blog.ts`) instead of relying on extraction.
   - New `/ask/` entries: FAQPage ships automatically via the existing template.
   - Fix the apex/www `@id` inconsistency first (P0-8) so entity linking is consistent.
4. **llms.txt treatment (P0-5):** dedicated `## AI Architecture` section — hub first with a one-line definition, then blueprints (each with its one-liner from `prototypes.json`), then academy, CoE hub, and both blog series. llms-full.txt mirrors with tldrs. This is the file the site already regenerates hourly (`revalidate = 3600`), so new blueprints appear automatically once the section reads from the JSON.
5. **Comparison tables as citable units:** the reference-architecture chooser and the cost-shape table each get a stable `id` anchor (`#choose-architecture`, `#cost`) so engines and humans can deep-link.
6. **Every claim independently quotable and sourced:** each factual sentence in the pillar either (a) derives from repo data (blueprint counts, deployment matrix), (b) cites an official doc already listed in `official-sources.json`, or (c) is labeled an opinion. The claims audit (§1.6) mechanically enforces the floor; the editorial rule finishes the job. No statistic without a named source survives review.
7. **Freshness signals engines can read:** `dateModified` in Article JSON-LD from real `updatedAt`/`lastUpdated` fields; the visible "Last verified" line; `changeFrequency: 'weekly'` only where true.


---

## 6. The series

Two spines, one new + one existing, plus an `/ask/` layer. Total new writing: **6 posts + 6 ask entries + 2 refreshes** — twelve pieces, sized to what one operator can actually ship at quality (§7).

### 6.1 Existing spine (reuse, don't duplicate): "The Agentic Architecture Hierarchy" (`agentic-hierarchy-2026`)

Five parts, all `lastUpdated: 2026-08-18`, wired with SeriesNav. P1 `skills-vs-agents-vs-prompts-vs-mcp` · P2 `agent-skill-standard-evaluated-workflows-2026` · P3 `mcp-protocol-production-architecture-2026` (flagship) · P4 `subagent-swarm-orchestration-fsm-2026` · P5 `context-compression-memory-vault-systems`. Work needed: each part gains one link **up** to the pillar (anchor: "AI architecture field guide") in its intro or architectNote, and the pillar's hierarchy section links **down** to P1. Nothing else — the series is fresh.

### 6.2 New series: "AI Architecture Decisions" (`architecture-decisions-2026`, blog MDX, 6 parts)

Decision intent is the gap in the 250-post archive (which skews to analysis and patterns). Each post: one decision, a decision table, a "what we run" section grounded in a blueprint, explicit `faq:` frontmatter, `architectNote` routing box.

| # | Working title (slug) | Target terms (Semrush US 2026-08-20) | Intent | The argument |
|---|---|---|---|---|
| S1 | LLM Gateway or Direct Calls? When a Gateway Earns Its Hop (`llm-gateway-vs-direct-2026`) | llm gateway 720/KD 23 · ai gateway 1,600/KD 52 | decision | A gateway is justified by exactly four needs — routing, spend attribution, failover, audit; below those, it's latency and a bill. Table of thresholds; maps to the model-gateway step in the Vercel reference flow |
| S2 | Agentic RAG: When Retrieval Becomes a Tool, Not a Pipeline (`agentic-rag-architecture-2026`) | agentic rag 3,600/KD 48 · rag pipeline 1,900/KD 54 · rag architecture 1,300/KD 60 | comparison/impl. | Classic RAG is a pipeline the app owns; agentic RAG hands retrieval decisions to the model — worth it only when queries are non-uniform. Decision table + the `enterprise-rag-platform` blueprint as the worked example |
| S3 | Durable Execution for Agents: Queues, Workflows, or Temporal? (`durable-execution-ai-agents`) | durable execution 170/KD 30 · temporal workflow 1,000/KD 54 | decision | Anything an agent does past one request lifecycle needs replayable state; three tiers (queue+idempotency → workflow engine → durable execution) and when each is enough. Extends the atlas's Temporal entry |
| S4 | Agent Security Architecture: Scoping Tools Before Prompts (`ai-agent-security-architecture`) | ai agent security 880/KD 43 · prompt injection 4,400/KD 73 (section-level) | implementation | Prompt-injection defense is an architecture property, not a prompt property: tool scoping, egress control, human gates on irreversible actions. Draws on the payment-fail-closed doctrine already in the FrankX estate |
| S5 | Why AI Agents Fail in Production: A Field Catalog (`why-ai-agents-fail-production`) | long-tail "why do ai agents fail"-class (not pulled — intent bet) | informational | The failure-mode catalog in long form: each mode with symptom/cause/fix and the blueprint that demonstrates the fix. The pillar's §failure-modes summarizes and links here |
| S6 | What an AI Agent Actually Costs to Run (`ai-agent-cost-model`) | cost long-tail (not pulled — intent bet; CPC signals §3.2 imply commercial value) | decision | A cost model with named assumptions per architecture class, built from the `estimatedCost` fields in `prototypes.json` — estimates labeled as estimates; zero invented benchmarks |

### 6.3 Refreshes (spokes that exist but predate the cluster)

- S8a `observability-stack-multi-agent-systems-2026` — refresh toward "ai observability" (1,900/KD 49): add decision table, faq frontmatter, pillar link. Re-date only if substantively changed (§7).
- S8b evals pair `llm-evals-claude-code-guide` + `evals-are-the-experiment` — interlink, point both at pillar, target "llm evaluation" (1,300/KD 42); consider frontmatter `canonical` if they cannibalize each other on the same queries (check GSC first).
- S7 `guides/agent-card-a2a-spec` — upgrade to own "a2a protocol" (2,900/KD 56): retitle meta toward the term, add definition block + MCP-vs-A2A table; the corresponding `/ask/mcp-vs-a2a` entry links here.

### 6.4 New `/ask/` entries (6, in `data/ask-questions.ts`, category `ai-architecture`)

`what-is-agentic-ai-architecture` (30/KD 37 — exact question, easy win) · `ai-agents-vs-agentic-ai` (1,000/KD 54) · `single-agent-vs-multi-agent` · `llm-gateway-vs-direct-api` · `what-does-an-ai-agent-cost` · `mcp-vs-a2a`. Each ≤ 400 words, tldr ≤ 50 words, CTA to its owning spoke, `related` cross-links within the set.

### 6.5 Internal-link graph (who links whom, with anchors)

```
PILLAR /ai-architecture
  ├─→ each spoke once, descriptive anchor (e.g. "when a gateway earns its hop",
  │    "agentic RAG decision guide", "durable execution for agents")
  ├─→ /ai-architecture/blueprints  anchor: "13 deployable AI architecture blueprints"
  ├─→ /ai-architect-academy        anchor: "AI Architect Academy — the learning path"
  └─→ series P1                    anchor: "the agentic hierarchy: skills, agents, prompts, MCP"

EVERY SPOKE (S1–S8, P1–P5)
  ├─→ pillar in intro or architectNote  anchor: "AI architecture field guide"  (exact, consistent)
  ├─→ 1–2 sibling spokes where the argument touches (S1↔S6 cost, S2↔S5 failures,
  │    S3↔P4 orchestration, S4↔S3 blast radius, S7↔P3 protocols)
  └─→ its blueprint, anchor = blueprint title (e.g. "Enterprise RAG Platform blueprint")

BLUEPRINT [slug] pages
  ├─→ pillar (breadcrumb + "part of the AI architecture field guide" line)
  └─→ owning spoke where one exists (rag blueprints → S2; worker/queue blueprints → S3)

ASK entries → owning spoke (primary CTA) + pillar (related)
ACADEMY → pillar (hero secondary CTA) + blueprints index  [P0-6 fixes the /prototypes link]
/for/architects → pillar (already links /ai-architecture — keep; tighten anchor text)
```

Anchor discipline: the pillar is always referenced as "AI architecture field guide" (consistent partial-match anchor, never bare "click here", never keyword-stuffed exact-match everywhere). Spoke anchors describe the decision, not the keyword. All new links must pass `pnpm run links:check:static`.

---

## 7. Cadence — August 2026 onward, and the refresh protocol

Sequencing principle: **technical substrate → pillar → spokes at a sustainable beat.** Volume is capped at ~2 substantial pieces/month because every piece must clear merge:gate, the slop/claims audits, and (for UI) web-release-gate — quality gates are the real throughput limit in this repo.

| When | Ship | Notes |
|---|---|---|
| **Aug (now)** | P0-1…P0-8 as one PR (`agent/claude/ai-architecture-seo-substrate`) | Pure metadata/sitemap/llms/links — no visual change except none; run full merge:gate |
| **Sep, wk 1–2** | Pillar enrichment (§4) + 3 `/ask/` entries | web-release-gate applies (UI change); contract extended to require the "Last verified" line |
| **Sep, wk 3–4** | S1 (gateway — best KD/volume ratio) + S8a observability refresh | S1 links live from pillar on day one |
| **Oct** | S2 (agentic RAG) + S3 (durable execution) + remaining 3 `/ask/` entries | |
| **Nov** | S4 (security) + S7 (A2A guide upgrade) + S8b evals interlink | |
| **Dec** | S5 (failure catalog) + S6 (cost model) | Both feed back into pillar sections (summary + link) |
| **Jan 2027** | Quarterly verification pass (below) + GSC-driven pruning decisions | |

**Refresh / re-date protocol (what keeps "updated August 2026" honest):**

1. **Link verification, quarterly.** Re-check every external link in `official-sources.json` and update the printed "checked on <date>" line in `OfficialArchitectureAtlas.tsx` in the same commit. The contract already fails if the sentence disappears; the date changes only when the check actually ran. Next due: **October 12, 2026** (last: July 12).
2. **`lastUpdated` discipline (blog/guides):** re-date only for substantive changes — new sections, changed recommendations, corrected claims. Typos, link fixes, formatting keep the old date. `dateModified` in JSON-LD follows `lastUpdated` automatically via the existing blog template.
3. **Re-date triggers for the pillar:** a reference architecture added/removed/re-owned in `official-sources.json`; a provider materially changes a linked offering; a blueprint added; a failure mode added from real operation. Each bumps the visible "Last verified" line + `updatedTime` in the layout metadata.
4. **Versioned, not silently mutated:** substantive pillar changes get a one-line entry on `/changelog` (surface already exists), giving answer engines and returning readers a diff trail.
5. **Title-year rule:** "(2026)" in the title survives into 2027 only if a January verification pass actually revises content; otherwise strip the year rather than fake it.


---

## 8. Measurement — only what this stack can actually observe

**Instrumentation that exists in the repo today**

- `lib/analytics.ts` `trackEvent` — already firing on the hub: `ai_architecture_cta_opened` (hero + footer, with `destination`/`placement`), `ai_architecture_filter_selected` (deployment filter), `ai_architecture_source_opened` (per architecture, `link_kind`: official_docs vs repository). These are the pillar's engagement baseline — capture 4 weeks of pre-change numbers before the Sep enrichment ships so before/after is real.
- Vercel Web Analytics (the Vercel MCP connector exposes `get_web_analytics`) — page-level traffic + referrers. Referrer entries from `chat.openai.com` / `chatgpt.com`, `perplexity.ai`, `claude.ai`, `gemini.google.com` are the observable proxy for answer-engine citation traffic.
- Lemon Squeezy checkout clicks from `/ai-architecture/templates` (bottom-funnel), newsletter signups from pillar CTAs — both already wired on their surfaces.

**Instrumentation to add (small)**

- Extend `trackEvent` coverage to the enriched pillar: `ai_architecture_guide_section_viewed` (per H2, IntersectionObserver), `ai_architecture_faq_expanded`, `ai_architecture_blueprint_opened` (guide → blueprint clickthrough). Client-side, respects the existing analytics policy (`lib/analytics-policy.ts` exists — read it first).
- A tiny answer-engine probe ledger: once a month, ask ChatGPT, Claude, Perplexity, and Google (AI Overview) the 10 target questions from §3.2; record model/date/question/cited-URL in `data/audit/aeo-probes.jsonl` (the `data/audit/` directory already exists). Manual, ~30 minutes, and it is the only direct citation evidence available — nothing in the repo can observe engine citations passively.

**External (standard practice, outside the repo — named so nobody pretends the repo shows it)**

- Google Search Console: impressions/clicks/position for the cluster URLs; the query report filtered to "architecture", "agent", "rag", "gateway", "mcp". GSC access was not verifiable from this checkout.
- Semrush position tracking for the §3.2 term set (connector exists; the domain-analytics unit pool was empty on 2026-08-20 — capture the baseline when it refreshes).

**What "this worked" looks like (relative targets, no invented absolutes)**

1. **Indexation (4–6 wks post P0):** all 13 blueprint URLs + 5 sub-pages show self-canonicals in rendered HTML and appear in GSC's indexed set; zero redirected URLs left in the sitemap.
2. **Rankings (one–two quarters):** first-page movement on the low-KD wedge (llm gateway KD 23, durable execution KD 30, what-is-agentic-ai-architecture KD 37, ai-architecture-patterns KD 0) and measurable position improvement on "agentic ai architecture" / "ai agent architecture". The 2,400-vol head term is the trailing indicator, not the test.
3. **Citations:** the monthly probe ledger shows ≥1 frankx.ai architecture URL cited for ≥3 of the 10 questions by any engine, trending up; answer-engine referrers appear in Vercel Analytics for cluster URLs.
4. **Engagement flow:** guide-section→blueprint clickthrough events fire at a stable rate; templates checkout clicks and newsletter signups attributable to cluster pages exist at all (baseline first, then growth).
5. **Graph health:** `links:check:static` clean; every spoke reachable ≤2 clicks from the pillar.

---

## 9. Risks, and what to cut first

**Risks**

1. **Head-term ambiguity (evidence-backed).** The "ai architecture" question SERP is mostly building-architecture intent (§3.1). Even a perfect page may cap below expectations on the head term. Mitigation: the strategy's center of gravity is the qualified mid-tail; the head term is upside, not the plan. Also why the disambiguation sentence leads the page.
2. **Sequencing risk.** Publishing spokes before P0-1/P0-2 land means new content inherits the canonical defect and self-suppresses. The Aug PR is a hard prerequisite — treat it as blocking.
3. **Freshness debt.** Every printed "checked on <date>" is a liability the moment the quarterly pass slips; a stale receipt is worse than none. Mitigation: calendar the October 12 pass now; the year leaves the title if the pass doesn't happen (§7.5).
4. **Archive cannibalization.** 250 posts, several already overlapping (§2.3-6). Each new spoke must claim an intent row (§3.3 rule) and the GSC query report should be checked before S8b-style canonical decisions — merging on gut feeling violates the URL-safety doctrine.
5. **Client-rendering fragility.** The atlas and all sub-pages are client components; the pillar's new prose must be server-rendered or the whole bet on extraction weakens. The §4.1 composition handles this — hold that line in review.
6. **Unsourced-number regression.** The dead `/ai-architectures` file still contains the metric style the site purged; if anyone resurrects that code, the claims audit catches some patterns ("94%" accuracy would pass the current regexes). Editorial review stays the last gate.

**Cut list (in order, if capacity shrinks)**

1. New interactive tools/prototypes — the existing BYOK surface is enough; zero new ones for this program.
2. Multi-cloud-comparison rebuild — it gets metadata (P0-1) and nothing else this year.
3. S6 (cost model) → fold a cost table into the pillar instead of a standalone post.
4. S5 (failure catalog) → ship as a pillar section only; expand to a post when material accumulates from real operation.
5. Academy expansion — no new curriculum pages; the academy's job this cycle is differentiated framing + links.
6. The 6 `/ask/` entries compress to 3 (keep `what-is-agentic-ai-architecture`, `ai-agents-vs-agentic-ai`, `llm-gateway-vs-direct-api` — the three with demand evidence).

**Not cuttable:** P0 fixes, pillar enrichment, S1, the link-graph pass, the quarterly verification. That is the minimum credible version of "definitive."

---

## Appendix A — Pre-ship verification checklist (per PR)

```
pnpm run type-check && pnpm run lint && pnpm run ai-slop:audit:strict && pnpm run build
pnpm run merge:gate                      # includes test:ai-architecture + claims + links
curl rendered pages → check <title>, <link rel="canonical">, JSON-LD blocks parse
Rich-results validation on: pillar, 1 blueprint, 1 series post, 1 ask entry
web-release-gate skill for the pillar UI change (375/768/1440 before/after screenshots)
No banned phrases (taste.md refusal list) — the audit enforces; read aloud anyway
Every number: repo-derived, Semrush-cited (with date), or cut
```

## Appendix B — Facts register (verify-before-reuse)

| Fact | Source | Status |
|---|---|---|
| 8 official architectures; Vercel/Railway/GCP matrix | `data/ai-architecture/official-sources.json` (counted) | verified 2026-08-20 |
| 13 published blueprints | `data/ai-architecture/prototypes.json` (counted) | verified |
| 250 blog MDX files, 25 guides, 14 ask entries, 5 research domains | `ls | wc -l` / grep counts | verified |
| Redirects consolidate 3 families → hub | `next.config.mjs:252-271` | verified |
| Sub-pages inherit hub canonical | Next metadata-inheritance semantics + absence of leaf metadata (grep) | high-confidence; **confirm in rendered HTML before P0 PR** |
| `/blueprint/[slug]` live duplicate w/ deploy buttons | route diff + no redirect found | verified |
| All keyword volumes/KD | Semrush MCP, US db, 2026-08-20 | pulled; single-vendor, single-country |
| SERP competitor characterization (§4.4) | not verified (Semrush units exhausted) | **assumption — check before drafting** |
| frankx.ai ranking baseline | unavailable (same) | to capture |

— End of strategy. —
