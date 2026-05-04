# Reality Intelligence System — Extraction Roadmap

> The contemplative rails are the proving ground. The Reality Intelligence System (RIS) is the open-source artifact that ships once the architecture has been pressure-tested on frankx.ai for a quarter or two.
>
> RIS sits as a sibling to Library OS (`github.com/frankxai/library-os`) and Starlight Intelligence System (`github.com/frankxai/Starlight-Intelligence-System`).

## What RIS is

A Markdown-first, Next.js-bootable, MIT-licensed substrate for building a four-hub contemplative-research site. Adopters bring their own canon and prose; RIS provides the architecture.

| RIS includes | RIS does NOT include |
|---|---|
| Hub config schema (with example: 4-hub god/reality/consciousness/faith) | Frank's actual prose |
| Tradition vocabulary (with default 17-tradition list) | Frank's tradition selections (replaceable) |
| Entry frontmatter contract | FrankX branding, fonts, colors |
| Canon page schema | The /on-X/ URL prefix lock (RIS lets you choose) |
| MDX/Markdown loader | Library-OS / Research-Hub integration |
| JSON-LD schema generators (Article + Quotation + Person + FAQPage + BreadcrumbList) | Vercel-specific config |
| RSS generator (combined + per-hub) | The launch-gate doc (template only) |
| Discipline validators (frontmatter, no-emoji, cross-link integrity) | Frank's incident-response playbook |
| ContemplativeReader typography component | Source Serif 4 specifically — RIS supports any serif |
| Hub manifesto / entry / canon page renderers | The CC BY-NC-ND 4.0 license declaration on prose (adopter chooses) |
| Bootable example site | Anything FrankX-specific |

## Phase plan

### Phase 0 — proven on frankx.ai (current state, May 2026)

- 4 hubs live (noindex'd until launch gate clears)
- Flagship entry + 4 canon pages
- All schema, RSS, sitemap, validators working
- Library OS / Research Hub integration

### Phase 1 — substrate mature (target: 6-8 weeks after Phase 0)

- 4 entries total (manifesto + 3 canonical entries) on `/on-god/`
- 8 canon pages
- First-draft of `/on-reality/` flagship
- Editorial-process documented in `docs/rails/voice-rules.md` revision

**Gate to Phase 2:** Phase 0 + 1 prose passes 3-reviewer gate (per launch-gate.md), launch-gate is lifted, ≥1 month of public traffic without incident, validators have caught 0 false positives.

### Phase 2 — RIS public extraction (target: 12-16 weeks after Phase 0)

Create `github.com/frankxai/reality-intelligence-system`:

- MIT license
- README modeled on Library OS pattern (cross-AI guide for Claude / ChatGPT / Cursor / Codex / Gemini)
- `src/` — extracted lib/rails/ with framework-agnostic types
- `examples/minimal/` — Next.js 15 minimal bootable example with 1 hub + 1 entry + 1 canon
- `examples/four-hub/` — the full 4-hub example using FrankX hub config (replaceable)
- `docs/cross-ai-guide.md` — paste-ready commands per AI tool
- `docs/architecture.md` — explains the four-hub topology, cross-tag rules, AEO structure
- `docs/customizing.md` — how to swap hubs, traditions, colors, fonts, license

After repo public, add `app/research/reality-intelligence-system/page.tsx` to frankx.ai (parallel to `/library/approach`) — landing page explaining RIS and linking to GitHub.

### Phase 3 — adoption support (target: 6+ months after Phase 0)

- A 5-minute video walkthrough (Frank-recorded, talking-head, per video-production skill)
- An "RIS-built" gallery on the README (sites built with RIS)
- Optional: Vercel template button for one-click deploy of the four-hub example

## Extraction details

### What stays portable in lib/rails/

`lib/rails/types.ts` is already framework-agnostic. Audit at extraction time:
- Replace any Next.js-specific types with adapter interfaces
- Provide a `RisAdapter` interface for: routing (Next/Astro/Remix), MDX rendering, file loading

### What stays portable in components/rails/

The components are React+Tailwind. RIS extracts them to `src/components/` with a note: "Customize freely; the typography contract is `font-serif-editorial` + `text-ink-contemplative-*`." Adopters skin to taste.

### What stays portable in scripts/rails/

The validators are zero-dep ES modules using `gray-matter` + `glob` (both standard). They drop into any project with `npm install gray-matter glob`.

### What's NOT portable

`lib/rails/render-helpers.tsx` imports from `@/data/rails/hubs.ts` which contains FrankX-specific manifesto text. RIS extraction keeps the helper, replaces the data.

### License model

RIS code: **MIT** (consistent with Library OS, SIS).

Default adopter prose license suggested: **CC BY-NC-ND 4.0** (publisher-friendly, citation-required).

Adopters can override either; RIS is configuration, not coercion.

## Naming

- **Reality Intelligence System** — formal name, repo-name slug `reality-intelligence-system`
- **RIS** — short form
- Tagline: "The open-source contemplative-research substrate"

## Sister-system positioning

| System | Domain | Status |
|---|---|---|
| Library OS | Book intelligence | Live, frankx.ai/library + library-os repo |
| Starlight Intelligence System | Strategic AI substrate | Live, frankx.ai/starlight-intelligence-system + SIS repo |
| **Reality Intelligence System** | **Contemplative research substrate** | **Phase 0, frankx.ai/on-god/ etc., RIS repo Phase 2** |

All three are MIT code + author-prose. All three are Markdown-first. All three are bootable Next.js. Together they form a triad of "research-grade open-source substrates" Frank publishes alongside the work itself.
