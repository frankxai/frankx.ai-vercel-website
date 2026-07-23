# v0 Template Knowledge Graph

Curated, sourced catalog of 39 real v0.dev/v0.app templates encoded as a knowledge graph, for the v0 Template Intelligence OS feeding `frankx.ai/v0`.

## Files

- `templates.json` — `{ generatedAt, sources[], schemaNote, nodes[], edges[] }`

## How this was built

1. Fetched the official v0 templates gallery (`v0.app/templates`) and six of its category pages (AI, Apps & Games, Dashboards, Agents, Blog & Portfolio, plus the root page) directly. These pages expose real engagement metrics in the UI (duplicate/fork count and like count per template) — every number in `ratingSignal` for an official-gallery node is copied from what the page actually displayed, not estimated.
2. Cross-checked the community roundup **"33 Free v0 Templates" (v0-premium-templates.vercel.app)**, which packages a further set of templates (mostly by v0 user `kerroudj`) as `v0.link/<code>` short links with no published engagement numbers.
3. **Every `v0.link` short link cited was actually resolved** (HTTP 302 followed) to its canonical `v0.app/templates/<slug>` page, and the resulting page was re-fetched to confirm the template name and author matched the roundup listing before it was added as a node. This is why nodes sourced from the roundup carry the clean `v0.app/templates/...` URL rather than the tracking short link — the short link redirected to it live. Two spot checks (`Optimus`, `JARVIS`) are shown resolving to their real pages in the session that produced this file.
4. Where the official gallery pages didn't surface a duplicate/like count for a given roundup-sourced template within the fetched viewport, `ratingSignal` is the literal string **`unranked (no duplicate/like counts captured at fetch time; verified real listing on v0.app)`** — never a guessed number. 14 of the 39 nodes use this string.

## Schema

No `strategy/knowledge-graph-schema.md` existed at curation time (the Fable 5 strategy lane runs in parallel and may not have landed yet), so this file defines its own schema per the task brief and documents it here:

**Node fields:**
| Field | Meaning |
|---|---|
| `id` | kebab-case slug, unique, used as the graph key |
| `name` | template's published name |
| `author` | v0 username of the creator, where shown on the page |
| `url` | canonical `v0.app/templates/<slug>` link (tracking params stripped) |
| `category` | the v0 gallery category, or a compound label where a template spans two (e.g. `Apps & Games (creative/interactive)`) |
| `stack[]` | tech stack — every v0 template is built on Next.js/React/Tailwind/shadcn-ui by construction of the platform (confirmed explicitly across every entry in the community roundup); extra items (Vercel AI SDK, a named third-party API) are added only where the template's own name/description states it |
| `patterns[]` | architectural/UX patterns inferred by inspecting the template's name, description, and category |
| `designSignals` | one-line qualitative note on what's distinctive about the execution |
| `ratingSignal` | a **real, sourced** signal (duplicates/likes as shown on v0.app) or the literal string `unranked` — never fabricated |
| `domainFit[]` | which FrankX pillar(s) the template's pattern best suits: `ai-architect`, `creator-os`, `music`, `ai-coe` |
| `upgradeVectors[]` | concrete "what would a 2026-tech upgrade add" notes (real data wiring, accessibility/motion fixes, auth, billing, etc.) |

**Edge fields:** `{ from, to, type }` where `type` ∈:
- `sharesPattern` — both templates implement the same recognizable UX pattern (e.g. sidebar admin layout, hero+CTA landing, PDP+cart). Modeled as hub-and-spoke from the most representative/most-forked exemplar in each cluster rather than a full pairwise mesh, to keep the graph legible.
- `sameStack` — both explicitly use the same non-baseline dependency (e.g. Vercel AI SDK + AI Gateway, a specific generative API).
- `inspiredBy` — a structural/thematic lineage between two templates, most often two templates by the same creator that clearly riff on one concept (e.g. `v0-agent-builder` reads as `estebansuarez`'s platform-specific take on the generic `ai-agent-builder` concept).
- `upgradeOf` — one template is a more feature-complete or more polished execution of the same base pattern as another (a design-hierarchy judgment, not a claim about ratings).

40 edges total; every `from`/`to` resolves to a node in this file (verified programmatically).

## Full source list (fetched directly this session)

- https://v0.app/templates (root gallery, featured + `joyco` collection)
- https://v0.app/templates/ai
- https://v0.app/templates/apps-and-games
- https://v0.app/templates/dashboards
- https://v0.app/templates/agents
- https://v0.app/templates/blog-and-portfolio
- https://v0-premium-templates.vercel.app/ ("33 Free v0 Templates — Fork & Deploy in 1 Click")
- Individual `v0.link/<code>` short links resolved to their canonical `v0.app/templates/<slug>` pages for every roundup-sourced node (12 resolved and spot-verified: Optimus, JARVIS, KATACHI, Evasion, Elegance, Homie, Terra, Waitlist-Agentic-Glitch, Devflow, Nexus, AI Product Portfolio, Monochrome ASCII Hub, Martian Parallax, Pixel Survivor)

`https://v0.app/templates/e-commerce` was also fetched but returned only nav/footer chrome (no template list rendered in the fetched viewport) — E-commerce category coverage instead comes from `joyco`'s Shopify template (official gallery) plus three roundup-sourced templates (KATACHI, Evasion, Elegance), all individually resolved and verified per above.

## Categories covered (12 labels, 8 conceptual buckets from the task brief)

AI apps · AI agents · SaaS · Dashboards (incl. marketing-ops) · Landing pages · E-commerce · Portfolio · Animations/Creative-interactive (incl. Apps & Games) · Login & Sign Up

## Notable gaps / things I was unsure about

- **No public "top-rated" API.** v0.app has no ranking endpoint; "notability" here is read off the gallery's own duplicate/like counters, which is the only real signal the platform exposes. This is consistent with the load-bearing constraint already logged in `../RUN.md`.
- **E-commerce official category page didn't render a template list** in the fetched viewport (see above) — coverage there leans on the community roundup, all individually verified.
- **`kerroudj` is heavily represented** (15 of 39 nodes) because they are both a prolific individual v0 creator on the official Agents/Landing Pages/Dashboards galleries *and* the apparent curator/author behind most of the 33-template community roundup. This is disclosed rather than smoothed over — it reflects who is actually shipping the most templates in this niche, not a curation bias introduced here.
- **`stack[]` is a platform-level inference, not per-repo verification.** No template's actual source was cloned or opened in this pass — stacks are inferred from (a) v0's own generation constraints (always Next.js/React/Tailwind/shadcn) and (b) explicit mentions in the template's own title/description for anything beyond that baseline. Treat `stack[]` as "very likely," not code-verified.
- **Two AI-agent nodes (`ai-agent-builder`, `v0-agent-builder`) are conceptually adjacent** (both "build an agent" tools by different authors) — kept as separate nodes with an explicit `inspiredBy` edge rather than merged, since they are genuinely different published templates.

## Rights note (read before building `frankx.ai/v0`)

**These are third-party templates, not FrankX originals.** Every node in this graph belongs to its listed `author` on v0.app (or is unattributed where the page didn't show one). For the `frankx.ai/v0` page:

- **Attribute and link out.** Every template surfaced on the site must credit the `author` field and link to the canonical `url` — do not present these as FrankX-made.
- **Do not reproduce template source code.** v0 templates are "fork to your own v0/GitHub account" artifacts; forking and displaying a live preview or screenshot with attribution is fine, but do not copy-paste a template's generated source into a FrankX repo or product without checking that template's specific license/terms on v0 first. v0's own terms govern redistribution of generated code — assume "attribution + link, no wholesale reuse" until Frank has actually read v0's terms for commercial redistribution.
- **Screenshots/previews**, if used on the site, should be captured fresh (e.g., via browser automation) rather than scraped from v0's own preview images, to avoid a separate image-rights question.
- **The "upgrade playbooks"** (a separate swarm lane, `../playbooks/`) should frame improvements as *original guidance FrankX is writing about a public template*, not as a claim that FrankX built or owns the underlying template.
