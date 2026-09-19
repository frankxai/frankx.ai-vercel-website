# v0 MCP operating standard

Date: 2026-09-19

## Decision

Use v0 MCP as a design-generation and interface-iteration layer.

Do not use it as the source of truth, the architecture owner, or the authority
that decides whether something is ready to ship.

FrankX owns the brief, the content, the evidence, the code that lands in this
repository, and the release decision.

## What v0 MCP is for

v0 MCP is useful when the question is about:

- layout;
- hierarchy;
- workflow visibility;
- component composition;
- responsive direction;
- interface states;
- visual exploration across a known route.

It is not the system that decides product truth. The generated surface is an
input into a governed product flow.

## Core operating rules

1. Start from the local contracts: `design.md`, `taste.md`, `AGENTS.md`, and
   the current route contract.
2. Generate the experience plane only. Keep product logic, data ownership,
   proofs, and route truth inside this repository.
3. Export only the winning direction. Do not paste large generated files into
   production untouched.
4. Rewrite imported code to local patterns, components, analytics, and content
   contracts.
5. Add proof states before any release claim: loading, empty, error,
   responsive, keyboard, and reduced-motion.
6. Keep maturity labels honest. A visual study is not a product because it has
   a good preview URL.
7. Release standards stay the same after generation. v0 does not bypass any
   gate.

## Route-by-route adoption matrix

| Surface | Use v0 MCP for | Limit it to | Notes |
|---|---|---|---|
| `/v0` | Public lab, study archive, pattern exploration, interface evidence | Never imply every study is deployable | This remains the proving ground |
| `/foundry` | Starter-kit framing, install previews, evidence views, operating-system interface directions | Do not let generated copy define the Foundry offer | Flagship workflow surface |
| `/products` | Offer pages, comparison layouts, pricing ladders, checkout-adjacent states | Product truth, pricing truth, and claims stay repo-authored | High-leverage packaging surface |
| `/cloud` | Architecture dashboards, prototype consoles, tool galleries | Do not let generated UI become enterprise claim evidence | Use for systems visibility |
| `/ai-architecture` | Control-plane demos, architecture views, operating-console directions | Do not treat diagrams or generated UI as the architecture source | Keep specs repo-authored |
| `/developers` | Docs landings, starter-kit shells, manifest explorers, integration consoles | API contracts, manifests, and examples stay hand-owned | Strong fit for interface shells |
| `/music` and creator-tool routes | Dense studio layouts, catalog browsers, operational dashboards | Music facts, licensing, and release truth stay local | Good fit for pro-tool density |
| Partner and client portals | Rounded liquid UI, workflow-led first viewport, operator surfaces | Never ship generic SaaS card walls | Follow the partner-surface rules in `design.md` |
| Homepage | Bounded exploration only | Never use v0 MCP as authority for structural replacement | Homepage preservation contract still governs |
| `/research`, `/blog`, `/books`, `/library` | Supporting section layouts only | Do not let prompt-generated design override content/trust priorities | These are content-first surfaces |
| APIs, manifests, data contracts, SEO plumbing, governance scripts, tests | Not a v0 MCP job | Full exclusion | Hand-authored only |

## Design constraints every brief must carry

- Dark-first.
- High restraint.
- Proof-led hierarchy.
- Sentence case labels.
- Primary CTAs stay `rounded-full`.
- No text animation.
- No fake metrics.
- No vague AI marketing language.
- No copied proprietary code, prompts, or assets.
- No product labels without matching source and evidence.

## Required maturity labels

Every v0 MCP output must declare one of these labels before generation begins:

- **Study** — interactive design exploration; no product or deploy claim.
- **Reference** — useful pattern or captured direction; still not a shipping
  claim.
- **Starter** — candidate foundation for a maintained template; source,
  setup, and core state work is expected next.
- **Shippable product candidate** — eligible for release validation after the
  generated work is rewritten into local code and evidence is attached.

If the label is missing, default to **Study**.

## Promotion policy

### Study → Reference

Allowed when the direction is worth keeping as a reusable pattern, capture, or
example for future work.

Required:

- a named route or workflow;
- a saved chat/demo reference;
- a note on what the pattern is good at.

### Reference → Starter

Allowed when the direction should become a real template or route foundation.

Required:

- a clean-room brief;
- repository-owned code;
- local component and analytics integration;
- loading, empty, error, keyboard, responsive, and reduced-motion states;
- a documented source/license posture.

### Starter → Shippable product candidate

Allowed when the surface behaves like a real product path and is ready for the
same verification used elsewhere in the repo.

Required:

- real copy and claims review;
- real route ownership and content wiring;
- evidence-backed maturity language;
- validated deploy/build posture;
- review against release gates for the target route.

## Prompt standard

Every v0 MCP brief should include these fields in plain language:

1. **Route or hub**
2. **Audience and job to be done**
3. **Exact page role**
4. **Required proof or evidence blocks**
5. **Forbidden aesthetics and forbidden language**
6. **Motion constraints**
7. **CTA hierarchy**
8. **Component reuse expectation**
9. **Maturity label**

### Prompt template

```txt
Route or hub:
[route]

Audience and job:
[who this is for and what they need to do]

Page role:
[landing page / dashboard / console / pricing section / study shell / etc.]

Maturity label:
[study | reference | starter | shippable product candidate]

Required proof blocks:
- [evidence block 1]
- [evidence block 2]

Design contract:
- FrankX dark-first surface
- sentence case labels
- primary CTAs use rounded-full
- no text animation
- high restraint, proof-led hierarchy

Forbidden:
- fake metrics
- vague AI marketing language
- copied proprietary work
- unsupported testimonials
- product labels without evidence

Motion:
[what can move, what must stay still, reduced-motion behavior]

CTA hierarchy:
- primary: [action]
- secondary: [action]
- tertiary: [if needed]

Component reuse:
[name existing local patterns or require a structure that can be rewritten into them]

Request:
[the actual generation ask]
```

## Review checklist for any exported direction

- Does the route still read like FrankX rather than generic SaaS?
- Is the work clearly marked as study, reference, starter, or shippable
  product candidate?
- Are the claims and stats either removed or backed by repository-owned truth?
- Are the CTAs `rounded-full` where they are primary?
- Is text static while motion is limited to imagery or accent elements?
- Are labels in sentence case?
- Did the export get rewritten to local components and patterns?
- Are loading, empty, error, responsive, keyboard, and reduced-motion states
  present?
- Did a human keep only the winning direction instead of importing the whole
  generated artifact?
- Does the route still satisfy its own release contract after the rewrite?

## Capability stack to prioritize

1. Variant generation for hero, section, and system-flow directions
2. State generation for loading, empty, error, and permission states
3. Responsive exploration across desktop, tablet, and mobile
4. Design-system conformance passes before export
5. Template-family generation for Foundry and commercial starters
6. Hub-specific shells for creators, AI startups, and partner portals

## Explicit exclusions

Do not use v0 MCP as the primary tool for:

- homepage replacement;
- SEO metadata strategy;
- API routes;
- manifests;
- schema and data contracts;
- governance scripts;
- tests;
- claim-heavy source copy;
- route ownership decisions.

## Operating summary

Generate interfaces fast. Keep authorship and standards in-repo. Promote only
the directions that survive the same evidence, restraint, and release gates as
everything else on frankx.ai.
