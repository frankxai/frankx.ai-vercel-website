# FrankX Design Lab Operating Model

`frankx.ai/design-lab` is the reference implementation for how FrankX turns design taste into inspectable experiments.

Local source:

- `app/design-lab/page.tsx`
- `app/design-lab/[slug]/page.tsx`
- `app/design-lab/[slug]/DesignLabExperimentPage.tsx`
- `lib/design-lab/experiments.ts`
- `components/ui/glow-card.tsx`

Canonical cross-site standard:

- `C:\Users\frank\starlight\repos\design-agent-standards\DESIGN_LAB_OPERATING_MODEL.md`
- `C:\Users\frank\starlight\repos\design-agent-standards\WEB_DESIGN_RESEARCH_ATLAS_2026.md`

FrankX-local research bridge:

- `docs/design/DESIGN_LAB_RESEARCH_ATLAS_2026.md`

## What The Current Lab Does

The live lab uses a simple operating loop:

1. Brief: every experiment starts with one shared challenge.
2. Build: multiple AI agents or tools create separate entries.
3. Rate: entries are scored across design, code, accessibility, performance, and creativity.
4. Ship: winners can become products or reusable site patterns.

The implementation is intentionally data-backed. `lib/design-lab/experiments.ts` records the brief, constraints, judging criteria, entries, scores, verdicts, winners, productized entries, related links, and update dates. The route renders the evidence instead of hiding it in notes.

## Portable Pattern

Use this same shape for every website we work on:

- A lab route or docs folder where unfinished patterns can mature away from production pages.
- Typed or structured experiment records.
- Side-by-side comparisons instead of single "make it better" passes.
- Fast 1-10 scores for comparison plus formal quality gates before shipping.
- Productization notes that explain what moved into the real site and what stayed research-only.

## Website Matrix

| Website | Lab destination | Use the lab for |
| --- | --- | --- |
| FrankX | `/design-lab` | public agent design arena, component patterns, productized templates |
| SIS / Starlight | `/interaction-lab` or `/design-lab` | agent handoff UI, mind graph, evidence dashboards, GSAP scroll systems |
| Arcanea | `/design-lab` under app/site | voice orb, world graph, portal reveals, studio workflow, cinematic onboarding |
| GenCreator | `/design-lab` or internal docs first | creator command center, cohort shell, research library, stack pages |
| JarvisOps | docs-first, UI later | local control-plane scanner, support packet UX, operator readiness, gated actions |

## FrankX-Specific Rules

- Keep the FrankX lab direct, technical, and founder-led. No Arcanea mythology in FrankX copy.
- Use `design.md` for tokens and `taste.md` for judgment before creating or scoring any entry.
- Use `/design-lab/design-excellence` for token, color, typography, glass, spacing, and component references.
- Use `/design-lab/frontend-design` for interaction snippets and reduced-motion examples.
- Use `GlowCard` only where cursor-following glow helps exploration or premium affordance; do not spread liquid glass everywhere.
- A winning lab entry is not production-ready until it passes the visual, accessibility, performance, and content gates.

## Experiment Template

For each new lab round, capture:

- Surface and audience.
- First-read promise.
- Shared brief.
- Constraints.
- Agent/tool entries.
- Desktop, mobile, and reduced-motion evidence.
- Scores: design, code, accessibility, performance, creativity, brand fit, and motion when relevant.
- Winner and productization decision.

Use the central template:

`C:\Users\frank\starlight\repos\design-agent-standards\templates\design-lab-experiment.md`

## Next Website Moves

1. SIS: create the first `/interaction-lab` using the FrankX registry pattern plus existing Hyperframes motion packages.
2. Arcanea: convert the voice orb and world graph work into scored lab entries before making them primary homepage behavior.
3. GenCreator: run creator dashboard and member-shell variants through a lab before production redesign.
4. JarvisOps: document operator UX experiments first, then build UI once the scanner/control-plane flows stabilize.
5. FrankX: run the first research-backed public lab round using the atlas links, then productize only the winning pattern.
