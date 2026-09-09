# Canva for Founders — FrankX visual research and direction

## Research question

How should `frankx.ai/canva` help a founder understand, trust, and act on a Canva-enabled agentic publishing system—while preserving FrankX technical authority, complying with Canva’s current brand and commercial truth, and supporting a production decision for desktop and mobile?

- Product: independent FrankX Canva founder operating system
- Recipient: founder-operators, AI architects, technical creators
- Category: founder education, agentic architecture, creative operations, partner/affiliate content
- Surface: production pillar page, linked technical guide, long-form article
- Desired consequence: readers inspect the architecture, connect Canva safely, apply a playbook, and return to FrankX for the next operating layer
- Decision supported: which visual system should govern the `/canva` release

## Current truth

| State | Route | Viewport | Captured | Verified observation | Evidence status |
|---|---|---:|---|---|---|
| Desktop | `https://frankx.ai/` | 1363 × 936 | 2026-08-30 UTC | Live obsidian home, emerald technical signal, restrained cinematic hierarchy; current visible hero: “Architect your AI Operating System.” | Runtime-inspected in the parent release session; screenshot path to be attached to the PR evidence if exported |
| Mobile | `https://frankx.ai/` | target 390 × 844 | 2026-08-30 UTC | No claim made: the runtime capture was blocked by the available browser security boundary | **Release hard stop:** attach a real host capture before marking the release ready to merge |

The three boards below do include original mobile recompositions. Those are design proposals, not current-host proof.

## The three direction boards

1. [Direction A — The Operating Graph](direction-a-operating-graph.svg) — **recommended and implemented in draft**
2. [Direction B — The Creator Workbench](direction-b-creator-workbench.svg) — preserved alternative
3. [Direction C — The Editorial Field Manual](direction-c-editorial-field-manual.svg) — preserved alternative

Exactly three boards are in scope. They use the same real proposition, deck, and primary CTA at desktop and mobile sizes so the comparison tests visual systems, not copy variants.

## Comparison score

Scale: 1 weak, 5 strong.

| Direction | Audience fit | Distinctiveness | Clarity | Extensibility | Accessibility | Feasibility | Rights safety | Brand memory | Total / 40 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| A · Operating Graph | 5 | 5 | 5 | 5 | 4 | 5 | 5 | 5 | **39** |
| B · Creator Workbench | 4 | 4 | 4 | 4 | 4 | 4 | 5 | 4 | **33** |
| C · Editorial Field Manual | 5 | 4 | 5 | 4 | 5 | 5 | 5 | 4 | **37** |

## Recommendation record

- Recommendation owner: **Codex release team**
- Approval owner: **Frank**
- Selection basis: the brief explicitly requires a clickable agent architecture with official Canva MCP links and an official Canva logo inside the graph. Direction A turns that requirement into the page’s primary proof instead of treating the graph as a later illustration.
- Draft implementation: **Direction A — The Operating Graph**
- Approval state: **pending Frank’s review of the Vercel preview; this record does not claim prior approval**
- Keep from B: output-state language (`source`, `brand`, `human reviewed`) for the workflow detail panel.
- Keep from C: dated first-party citations and the source-rail posture for the long-form guide.
- Rejected as primary systems: B makes artifacts stronger than architecture; C explains the system elegantly but hides the interactive differentiation.
- Blending rule: B and C may contribute the two named behaviors above only. Do not combine their hero compositions, palettes, or signatures into A.

Frozen board hashes:

- A: `4181be71962b3d7acf52a87f97185cb027c4edcd0e1ecc05f93c90d9d0893f9c`
- B: `f678a7f48751564f634a35da518eb5243022d84f693012e7f2ade092bb673ad7`
- C: `e519603e658ff71906512762519042e20dca9354aca287ff5765faade96a26f3`

## Direction A production handoff

- Hero: real headline, short deck, one primary rounded CTA; architecture begins in the first viewport on wide screens.
- Interactive proof: XYFlow on `md+`; each focusable/clickable node opens one specific internal guide, official Canva source, or measurement route.
- Canva node: use `public/brand/canva/canva-icon.svg` below 50px, unchanged, with at least 8px clearspace and an explicit “Canva MCP” text label. Link directly to the official MCP documentation. Do not use Canva violet outside the Canva-owned node/context.
- Mobile: replace the free canvas with a semantic vertical path. Do not merely shrink the desktop graph.
- Motion: one path-draw set-piece on first view; `prefers-reduced-motion` receives the complete static graph. Do not animate text.
- Proof state: show source, permission/brand boundary, human-review state, and next measured action.
- Performance: dynamically load the XYFlow canvas below the first text paint; render meaningful static HTML before JavaScript.
- Accessibility: one logical focus order; visible focus ring; node action described in the accessible name; no drag requirement; minimum 44px action target.
- Rights: only exact official logo assets under Canva’s published terms. All external pages remain reference-only.

## Evidence files

- [Reference matrix](reference-matrix.md)
- [Source and rights ledger](source-ledger.csv)

## Open release gate

The mobile design state is resolved in every board, but current-host mobile capture remains missing. Keep the pull request in draft until a 390 × 844 runtime capture is attached and checked for first-viewport hierarchy, thumb reach, overflow, focus order, and reduced-motion behavior.
