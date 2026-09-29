---
description: Generate v0 MCP studies for route-specific interface exploration
thinking: false
---

# v0 Generate — Product Foundry interface generator

**Purpose**: Use v0 MCP for design generation and interface iteration, then
bring only the winning direction back into the FrankX repo under local
standards.

Read first:

- `docs/strategy/v0-mcp-operating-standard.md`
- `design.md`
- `taste.md`

## Input

The user's prompt: `$ARGUMENTS`

## Workflow

### Step 1: Classify the request before generating

Analyze `$ARGUMENTS` to determine:
- **What to generate**: Component, page, layout, section, dashboard, console,
  or state set
- **Route or hub**: `/v0`, `/foundry`, `/products`, `/cloud`,
  `/ai-architecture`, `/developers`, `/music`, or partner/client portal
- **Maturity label**: `study`, `reference`, `starter`, or
  `shippable product candidate`
- **Model tier**: Look for keywords like "fast" (sm), "quality" (lg), "best" (gpt-5). Default: `v0-1.5-md`
- **Iterate mode**: If the prompt starts with `iterate:` or `refine:`, find
  the existing chat and send a follow-up message instead of creating a new one

If the user does not specify a maturity label, default to `study`.

### Step 2: Refuse out-of-scope uses

Do not use v0 MCP as the primary tool for:

- homepage replacement;
- `/research`, `/blog`, `/books`, or `/library` structural rewrites;
- API routes;
- manifests;
- schema or data contracts;
- tests;
- SEO plumbing;
- governance scripts;
- release readiness claims;
- final source-of-truth copy.

If the request falls into one of those categories, redirect to local repo work
instead of generating.

### Step 3: Prepare the v0 brief

Enhance the user's prompt with the local operating standard. The brief must
always include:

- route or hub;
- audience and job to be done;
- exact page role;
- required proof or evidence blocks;
- forbidden aesthetics and language;
- motion constraints;
- CTA hierarchy;
- component reuse expectation;
- maturity label.

Use this structure:

```
CONTEXT: Building for frankx.ai — a dark-first, proof-led founder and product platform.
STACK: Next.js 16 App Router, TypeScript, Tailwind CSS. Generate interface directions, not source-of-truth product logic.
ROUTE OR HUB: [route]
AUDIENCE AND JOB: [audience and job to be done]
PAGE ROLE: [landing page / dashboard / console / section / study shell / etc.]
MATURITY LABEL: [study | reference | starter | shippable product candidate]
REQUIRED PROOF BLOCKS:
- [proof block 1]
- [proof block 2]
DESIGN CONTRACT:
- sentence case labels
- primary CTAs use rounded-full
- no text animation
- high restraint
- proof-led hierarchy
- dark-first FrankX surface
FORBIDDEN:
- fake metrics
- vague AI marketing language
- copied proprietary code, prompts, or assets
- unsupported testimonials
- product labels without matching source and evidence
MOTION: [allowed motion and reduced-motion behavior]
CTA HIERARCHY:
- primary: [action]
- secondary: [action]
COMPONENT REUSE EXPECTATION: favor patterns that can be rewritten into local components and analytics flows

REQUEST: [user's prompt here]
```

Do not ask v0 MCP for final copy authority. Ask it for layout, component, and
interaction direction.

### Step 4: Generate via v0 MCP

**For new generations:**
Use `mcp__v0__createChat` with:
- `message`: The enhanced prompt from Step 3
- `modelConfiguration.modelId`: Selected model tier
- `chatPrivacy`: "private"
- `responseMode`: "sync" (wait for result)

**For iterations:**
Use `mcp__v0__sendChatMessage` with:
- `chatId`: The existing chat ID
- `message`: The refinement instructions
- `modelConfiguration.modelId`: Same or upgraded model

### Step 5: Present results with honest labels

After v0 responds, present to the user:

```
## v0 Generation Complete

**Chat**: [title] ([web URL])
**Demo**: [live demo URL]
**Model**: [model used]
**Status**: [completed/in_progress]
**Maturity**: [study/reference/starter/shippable product candidate]

### What was generated
[Brief description of the component/page]

### Guardrails
- This output is a [maturity label], not an automatic shipping claim
- Product truth, copy, evidence, and route ownership stay in the repo

### Next Steps
1. View live demo: [demo URL]
2. Iterate: `/v0-generate iterate:[chatId] [refinement instructions]`
3. Export only the winning direction into the repo
```

### Step 6: Bring a winning direction into the repo (if requested)

If the user wants to integrate the generated code:
1. Use `mcp__v0__getChat` to retrieve the full chat with code
2. Extract only the parts worth keeping
3. Rewrite imports and structure to match FrankX project conventions
4. Remove fake data, placeholder claims, generic marketing copy, and v0-only
   assumptions
5. Integrate local analytics, local components, and real route content
6. Add loading, empty, error, responsive, keyboard, and reduced-motion states
7. Validate against the route's existing release gates before calling anything
   shippable

## Model Selection Guide

| Keyword | Model | Best For |
|---------|-------|----------|
| "fast", "quick" | v0-1.5-sm | Simple components, rapid iteration |
| (default) | v0-1.5-md | Most tasks, good balance |
| "quality", "detailed" | v0-1.5-lg | Complex layouts, full pages |
| "best", "premium" | v0-gpt-5 | Production-grade, complex systems |

## Examples

```
/v0-generate route:/products label:study pricing comparison with one primary CTA and proof blocks
/v0-generate quality route:/foundry label:starter founder install preview with evidence rail and application CTA
/v0-generate best route:/cloud label:reference enterprise console shell with operator workflow cards
/v0-generate iterate:oDHfwOglSAf make the colors more vibrant and add hover animations
/v0-generate fast route:/music label:study dense studio browser for tracks, tags, and licensing context
```

## Important Notes

- Default to `study` unless the user clearly asks for a higher maturity class
- `/v0` remains the proving ground, not the shipping authority
- Homepage structural work still requires the homepage preservation contract
- Content-first routes use v0 MCP only for bounded supporting layouts
- Do not let generated code or copy bypass local review, evidence, or release
  gates
