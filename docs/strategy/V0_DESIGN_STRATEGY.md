# v0 design strategy — historical generation log

Date: 2026-09-19

## Status

This document is now a historical generation log, not the operating contract.

Use these files for current truth:

- `docs/strategy/v0-mcp-operating-standard.md`
- `docs/strategy/v0-product-foundry-roadmap-2026.md`
- `docs/strategy/v0-top-design-redesign-2026.md`
- `content/v0/foundry.ts`
- `app/v0/page.tsx`

## Current truth

- v0 MCP is a design-generation and interface-iteration layer.
- `/v0` is the public proving ground for interface studies and product-foundry evidence.
- The studies are references until repository-owned code, evidence, and release gates say otherwise.
- Creator Launch OS is the open, evidence-backed graduation path. The rest of the studies are not automatic deploy claims.
- The older `app/design-lab/v0/page.tsx` surface is legacy navigation, not the public authority route.

## Historical generation record

The study archive currently spans nineteen studies across three waves.

| Wave | Count | General role |
|---|---:|---|
| Wave 1 | 10 | Early premium route explorations |
| Wave 2 | 6 | Higher-fidelity interface directions |
| Wave 3 | 3 | Product-shell and console explorations |

Machine-readable registry:

- `data/v0-generations.json`

Public proving ground:

- `/v0`

## How to read the study archive now

- Treat chat URLs and demo URLs as references and preview infrastructure.
- Treat repository-owned routes and templates as the only shipping authority.
- Treat a study as useful when it improves layout, hierarchy, workflow visibility, or state design.
- Reject any attempt to infer deployability from a preview host alone.

## What changed from the earlier strategy

The older version of this document mixed generation history with product and deployment language. That is no longer the standard.

The current rule is simple:

1. generate directions quickly;
2. keep product truth in owned repos and routes;
3. promote only what survives the FrankX release gates.
