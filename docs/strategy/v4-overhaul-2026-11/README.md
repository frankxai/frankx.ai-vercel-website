# FrankX v4: the overhaul blueprint

**State:** 5 November 2026. Proposal plus a first execution wave on branch `ccr-323d835d-3u1dih`. Nothing here changes the homepage, renames a URL or publishes a price. Every number below traces to a file in this repository or to the audits in [`audits/`](audits/).

**Authority order:** `taste.md` and `design.md`, then `CREATOR.md`, then this pack. Where this pack conflicts with them, they win.

---

## The verdict

frankx.ai has more depth than any page shows. The site's problem is routing and presentation, and the fixes are editorial rather than technical:

1. **The best work is buried under holding pages.** Ninety-nine generated research briefs went on a fail-closed hold on 2 October 2026 (commit `934d3e2da`, PR #825). That was the right integrity call for their fabricated citations, but the hub kept leading with them, so a visitor saw "0 reviewed domains" and "Sources pending" before reaching five real investigations. Wave 1 below fixes the order.
2. **The navigation describes the org chart.** Five doors, 67 menu items, no images, two entries for one destination, and the agent and LLM hubs missing from every menu. The menu should sell six destinations and hide the rest one click deeper.
3. **The copy still carries the 2025 register.** "Sovereign", "arsenal", "battle-tested", "X, not Y" headings. The strict slop gate passes (0 hits on 2,731 files) because it checks 24 phrases; the brand pack bans more than that. Wave 1 removed the worst lines on seven surfaces; the gate needs the full lexicon.
4. **The funnel has no floor.** 15 of 288 blog posts link to a product or waitlist; research and guides link to none. Nothing is purchasable today by design, so every SEO page should end in one of three waitlists, not twenty.
5. **The agentic promise has no agent.** /ask, /agent-hub, /agents and /agent-team are static. The first credible "talk to Frank's AI" ships as one grounded, rate-limited route, without accounts.

The positioning the site has earned, stated plainly: **an AI architect who publishes the evidence.** Receipts in Model Arena, a dataset in the Observatory, graded claims in The Light Within, open repositories behind ACOS and Starlight. Frontier tech is proven by showing the instruments, so the redesign puts the instruments first.

---

## What you asked, answered

| Question | Answer | Evidence |
|---|---|---|
| Why are the research reports at the top worse than months ago? | They are holding stubs. The August hub was agent-generated with about 396 Google Scholar search URLs as "sources". The October integrity hold (`934d3e2da`, `6f204384a`, `c0c990bb6`) correctly hid the claims, and the hub kept featuring the stubs. Prose depth (about 101,000 words) is still in `lib/research/domains.ts`; it is hidden, not deleted. | [audits/01](audits/01-research-archaeology.md) |
| Why are the images missing from the ACOS README? | The 7 September honesty rewrite (`3ada128`, PR #44) dropped all seven image references. The images still exist, but most carry garbled AI micro-text or stale counts (75+ skills, 38 agents, v5.0), so restoring them as-is would have reintroduced false claims. | [audits/02](audits/02-acos-and-templates.md) |
| Biro and Nilo? | The repository canon spells them **Brio** and **Nilo**, with **Riff**, Mini Frank and Echo. Their model sheets live in the private `content-os` repository; no image files for Nilo, Brio or Riff exist in these repos and none has an approved model assignment. Omega is `components/FrankOmega.tsx` with 10 variants. | [VISUAL-SYSTEM.md](VISUAL-SYSTEM.md) |
| Can Claude generate the images? | Not raster images natively. Claude writes the art direction, prompts and SVG infographics (the ACOS diagram in this wave is hand-authored SVG). Raster goes through Higgsfield (ACOS default), OpenArt, Canva or Figma MCPs, Codex with OpenAI image models, or Antigravity with Gemini image models for edits and character consistency. Credit spend stays your call. | [VISUAL-SYSTEM.md](VISUAL-SYSTEM.md) |
| Where do I put new images? | `content/images/images ingest/` already exists outside `public/` and holds 127 files, some personal. Drop new images there (renamed to `content/images/intake/` in its own PR). Agents classify against the manifest and rubric in the visual system spec and promote approved files. | [VISUAL-SYSTEM.md](VISUAL-SYSTEM.md) |
| Should frankx.ai be a Vercel eve agent? Do we need Supabase auth? | Not yet, on both. Phase 1 is one grounded `/api/ask-frank` route on the AI Gateway already wired in `lib/ai/gateway-client.ts`, mounted on /ask, with a rate limit and a spend cap and no accounts. Eve is in public preview and the site's own guides advise against standardizing on it in beta. Accounts arrive when a paid product needs per-user state. | [ASK-FRANK-AGENT-PRD.md](ASK-FRANK-AGENT-PRD.md) |
| The subscription stack page? | /stack is a 33-tool catalogue; `data/subscriptions.json` is your private cost tracker and stays in /admin. The public page becomes "the setup I would start with": 8 to 10 tools, links through /go only, disclosure beside each link, a non-affiliate alternative per row. Wave 1 fixed the /go redirect that sent unlinked programs to a 404. | [audits/06](audits/06-funnel-partners-agentic.md) |
| Partners: Riverside, Cloudflare, Supabase, ElevenLabs? | `data/affiliate/programs.json` is the only registry with verification dates. ElevenLabs, Higgsfield and Wispr Flow have dated links. Riverside, Cloudflare, Supabase, Suno and Vercel have no registry entry. /partners and /stack keep their own lists, which disagree with it. One registry, one renderer. | [audits/06](audits/06-funnel-partners-agentic.md) |
| Starlight Research Foundry? | The phrase is new to this repository. The closest work is the unmerged evidence-backed dossier branch `agent/codex/research-dossiers` (PR #949): three dossiers with independent review receipts, blocked by a missing attestation verifier. The Foundry is that pipeline with a name. | [audits/01](audits/01-research-archaeology.md) |

---

## Who the site is for

Three readers, one standard: show the work, state the cost, offer one next step.

| Reader | What they carry | What they hire frankx.ai for | First page | Proof they need |
|---|---|---|---|---|
| **Solo founders running agent fleets** | The risk and every consequential decision; a handful of agents doing real work; they want to stop being the approval layer | Architecture they can copy, model routing, evaluation, guardrails | /research (Model Arena), /ai-architecture, /acos | Receipts, cost caps, the check that caught a mistake |
| **Women building with AI** | An existing workflow and expertise; little patience for being rescued or hyped | One step worth delegating, the step she keeps, what she owns when the tool changes | /start, /guides, /founder-stack | Named builders with permission, small tests that need no call |
| **Creators with large audiences** | Distribution and a voice at risk of averaging out | A content system that keeps their voice | /gencreator, /acos, /blog | Before and after of a real post, with the human edits marked |

The repository holds no audience evidence for the second register. It is written from principle; five interviews come before any claim about this audience. See [VOICE-LIBRARY.md](../VOICE-LIBRARY.md#audience-registers).

---

## The system: four layers

```
Identity    taste.md · design.md · CREATOR.md · VOICE-LIBRARY.md · the cast
Evidence    Model Arena receipts · Observatory dataset · graded investigations · dossiers (Foundry)
Distribution research and blog (SEO) → hub → proof → one of three waitlists → product
Agents      Ask Frank (phase 1) · ACOS · Founder Kit · the build team in AGENT-TEAM.md
```

Each layer has one owner file in this pack:

| File | Decides |
|---|---|
| [IA-AND-SITEMAP.md](IA-AND-SITEMAP.md) | The menu (three directions, one recommended), page tiers, cross-link rules |
| [PAGE-BRIEFS.md](PAGE-BRIEFS.md) | Goal, reader, proof, primary action and measure for every key page and hub |
| [../VOICE-LIBRARY.md](../VOICE-LIBRARY.md) | Lexicon, exemplar lines, audience registers |
| [VISUAL-SYSTEM.md](VISUAL-SYSTEM.md) | Image classes, placement, the cast, generation routing, intake |
| [FOUNDER-KIT-PRD.md](FOUNDER-KIT-PRD.md) | Templates and installer for founders building their own hub, library, blog, book and content studios |
| [ASK-FRANK-AGENT-PRD.md](ASK-FRANK-AGENT-PRD.md) | The public AI representative, phases and evals |
| [AGENT-TEAM.md](AGENT-TEAM.md) | Which agents and skills build this, model routing, gates |
| [FABLE-BRIEF.md](FABLE-BRIEF.md) | The architecture prompt for the next, deeper pass |

---

## Wave 1: shipped on this branch

| Change | Files | Check |
|---|---|---|
| /research leads with five published investigations; the lead card shows the receipt manifest's real schema; "0 reviewed" stat hidden while zero; hero rewritten; primary action goes to the investigations | `app/research/research-featured.tsx`, `lib/research/featured-investigations.ts`, `app/research/page.tsx`, `app/research/research-hub-client.tsx` | Screenshots at 375, 768 and 1440; no horizontal scroll; type-check, lint |
| /go no longer redirects unlinked programs to a missing `/stack/<id>` route; each /stack card carries an anchor | `app/go/[slug]/route.ts`, `lib/tools/go-destination.ts`, `app/stack/StackGalleryClient.tsx`, `scripts/tests/tool-record-contract.test.mjs` | Contract test, 11 of 11 |
| /stack stops saying "Curated, not sponsored" beside affiliate links; slop lines removed | `app/stack/*` | Slop gate |
| Copy cleanup on /affiliates, /templates, /products, /foundry, /about hero, /work-with-me, /blog FAQ: no invented experts, no unsourced "110+", no "sovereign", no contrast-formula headings | seven files | Slop gate, public-claims test (142 pass) |
| ACOS README: clean hero image, a new hand-authored SVG of how a request moves through ACOS, a "pick one install path" table, `install.sh` executable on a fresh clone | `frankxai/agentic-creator-os` | `npm run verify:public-surface` |
| This pack, with the six audits as appendices | `docs/strategy/v4-overhaul-2026-11/` | n/a |

## Waves 2 to 4

| Wave | Outcome | Gate |
|---|---|---|
| **2. Front doors** | Visual six-door menu; /stack becomes the starting setup; one partner registry renders /partners and /stack; three flagship waitlists at the foot of every research, guide and blog page; slop gate extended to the full lexicon | Your pick of menu direction; nav contract tests updated in the same PR |
| **3. Evidence engine** | Dossier branch lands one dossier at a time behind the attestation verifier; prose of the top four agentic domains restored as "analysis, unreviewed" with primary sources only; authored MDX briefs routed | Research publication gate, claims audit |
| **4. Agents and kits** | Ask Frank phase 1 on /ask with evals; Founder Kit installer and the first two templates (research hub, blog); character scenes placed through the visual system | Evals pass; spend cap verified; scene review |

The homepage moves only through its own contract: baseline captures, a preservation matrix, three directions and your approval of one ([HOMEPAGE-PRESERVATION-CONTRACT.md](../HOMEPAGE-PRESERVATION-CONTRACT.md)).

---

## Decisions that are yours

1. Which menu direction: A (five doors, visual), B (six doors with Research), or C (intent-led). Recommendation: B.
2. Which three products carry the waitlists. Recommendation from the data: Vibe OS guide, the build-your-first-agent workshop, ACOS.
3. Which ten tools make the public starting setup, and which ones you use daily.
4. Which persona boundary Ask Frank holds on money, health and clients.
5. Which five builders you will interview before the site speaks to women building with AI.
6. Which name the newsletter keeps: Creation Chronicles, Signal Loop or the briefs.
