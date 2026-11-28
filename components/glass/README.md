# Glass materials (composition layer)

Two materials, one state contract. This sits on top of `@starlight/materials`
(`starlight-design-intelligence/packages/materials`): the palette and the CSS-vs-WebGL gate
come from there, and `lib/glass/tokens.css` mirrors its `--sl-*` tokens verbatim.

| File | What it is |
|---|---|
| `lib/glass/materials.ts` | Palette mirror, material specs, state contract, gate constants |
| `lib/glass/tokens.css` | The same tokens as CSS custom properties |
| `glass-pane.tsx` | Client pane: pointer sheen, press depth, frost on stale |
| `orbital-field.tsx` | Server SVG: rings as named layers, one datum |
| `signal-tile.tsx` | One measured number with its source line |
| `glass-lab.tsx` | Material and state controls, caption, gate note |

Rules the code enforces:

1. Hover effects only under `(hover: hover) and (pointer: fine)`.
2. `prefers-reduced-motion` removes motion; `prefers-reduced-transparency` removes the blur and
   swaps in the opaque ink surface. Both are real paths, not shortened animations.
3. A stale signal frosts and desaturates. Never animate a number to imply freshness.
4. One claim per viewport; if a section has nothing true to show, delete the section.

Reference: `docs/design/GLASS-COMPOSITION-LAYER-OpenCode-2026-11-28.md`.
Visual proof: `docs/design/evidence/glass-{desktop,phone}.png`.
