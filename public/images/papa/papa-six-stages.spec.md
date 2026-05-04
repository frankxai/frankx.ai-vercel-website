# /papa/erbe/ stages — six abstract symbols of becoming solid

**Filename:** `papa-six-stages.png`
**Aspect:** 16:9
**Size:** 2K
**Model:** nb2
**Use:** Inline visual on `/papa/erbe/#wege` and `/papa/en/inheritance/#stages`. Symbol-only — text labels overlaid in React, not baked into the image.

**Generate with:**
```bash
node scripts/nb-generate.mjs \
  --spec public/images/papa/papa-six-stages.spec.md \
  --out public/images/papa/papa-six-stages.png \
  --aspect 16:9 --size 2K --model nb2
```

## Variant 1 — primary

Six abstract symbols arranged in a horizontal row, evenly spaced, each contained in its own subtle circular frame. Black void `#0a0a0b` foundation. The symbols are NOT human figures — they are pure shape, like letterpress glyphs or alchemical sigils. Soul-amber `#f59e0b` linework, fine weight, slightly hand-drawn feel.

The six symbols, left to right (matching the six stages of becoming solid):

1. **The Boy (Der Junge)** — an open hand reaching upward, palm visible
2. **The Rebel (Der Rebell)** — a closed fist breaking through a horizontal line
3. **The Striver (Der Strebende)** — a stylized arrow ascending diagonally, intentionally a bit raw
4. **The Builder (Der Bauende)** — a single brick or block being laid into a foundation row
5. **The Father (Der Vater)** — a vessel (urn or cup) overflowing with line-light, source-form
6. **The Elder (Der Älteste)** — a circle being passed between two open palms, the passing emphasized over the holders

Each symbol is contained in a thin amber circle, ~120px diameter equivalent, with generous padding. Below each circle, leave deliberate empty space (~80px) for the React-rendered label to be overlaid (DE name + stage number).

Composition: balanced, breathing room, the six symbols share equal weight. Slight progressive amber-saturation increase from left (Boy) to right (Elder) suggests journey.

Color palette: void `#0a0a0b`, soul-amber line `#f59e0b`, soul-amber-dark `#d97706` for shadow accent, pale `#E8DDD0` for the highest-luminance touches inside Stage 5 and 6 only.

Refusals: no human figures, no faces, no body parts beyond hands (Stages 1, 2, 6), no Christian symbolism (no crosses, no halos), no text labels in the image, no decorative borders, no modern clipart aesthetics.

## Variant 2 — vertical stack

If horizontal feels rushed, render as a vertical 1:1 grid (3 rows × 2 columns).

## Variant 3 — single hero symbol

If six is too busy, render only Symbol 6 (The Elder) at hero scale. The page can still display all six via React-rendered text + numerals; the image carries the metaphor of the whole journey.
