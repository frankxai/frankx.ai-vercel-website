# /intelligence-system hero image — NB2 spec

**Purpose:** OG/Twitter card + on-page hero for the Investment Intelligence System hub at frankx.ai/intelligence-system.

**Brand:** Elite Creator. AI Architect. Humble Excellence.
**Positioning:** "The kata for personal capital stewardship" — discipline-imposing decision-support, NOT alpha-generation, NOT trading-bot, NOT crypto-bro.

**Anti-references (do NOT generate):**
- Bloomberg Terminal aesthetic
- Stock-chart screens, candlestick charts, ticker tapes
- Crypto-bro imagery (Lambos, gold, "to the moon")
- Robot/AI tropes (humanoid, brain renders)
- Generic "tech" abstract gradients

**References (positive):**
- Atul Gawande's *Checklist Manifesto* — medical/aviation rigor
- Zen kata practice — wooden bokken on tatami, ink brush at rest, raked-sand garden with one resolved stone
- Cockpit pre-flight checklist sheet — clean, formal, pre-action
- Architecture blueprints — restraint, geometry, deliberate
- Japanese minimalism (Kenya Hara design philosophy) — silence, white space, single resolved gesture

---

## Variant 1 — Wooden bokken on tatami (preferred)

A single wooden practice sword (bokken) resting on a black tatami mat in a darkened dojo. Soft warm light from above-left catching the wood grain. Background fades to deep zinc-black void. Composition: bokken on diagonal axis, lower-third of frame. Top-right area kept empty for text overlay. Color temperature: cool zinc-black background with a thin emerald-teal rim light catching the sword's edge — not garish, just barely-visible accent that ties to the page's emerald-teal brand gradient. Photorealistic, cinematic, contemplative. No people, no movement, no action — pre-action stillness. Atmosphere: 5am dojo before practice, before the first cut.

## Variant 2 — Raked Zen garden (alternate)

Top-down view of a small Zen garden. Smooth raked sand in concentric arcs around a single dark stone, perfectly placed. Background: deep zinc-black. Lighting: soft directional from upper-left, casting long defined shadows from the rake-marks. Subtle emerald-teal ambient at the very edges of frame. Composition: stone slightly off-center (golden ratio position), raked arcs leading the eye. No human elements, no tools visible — only the result of the practice. Atmosphere: post-practice resolved stillness, the kata complete.

## Variant 3 — Cockpit pre-flight checklist (alternate, more literal)

Close-up of a pilot's pre-flight checklist clipboard resting on a flight-deck console in deep blue dawn light. Single hand barely visible at edge holding a fountain pen, hovering above the next un-ticked item. Lighting: warm cockpit task-light + cool blue exterior dawn through windscreen. Color accent: emerald-teal glow from instrument panel reflections. The checklist itself shows generic items (no readable text — abstract typography). Atmosphere: pre-action discipline, the moment before commitment. No faces visible.

---

## Generation parameters

- **Model:** nb2 (Gemini 3.1 Flash Image)
- **Aspect:** 16:9 (closest to OG 1.91:1; will be center-cropped or padded)
- **Size:** 2K (1920×1080 → resize to 1200×630 for OG)
- **Output path:** `public/images/intelligence-system/hero.jpg`

## Output destinations

- `public/images/intelligence-system/hero.jpg` (high-res master)
- `public/og/intelligence-system.jpg` (1200×630 OG-ready, served by metadata)

## Brand-gate checklist

- [ ] No Bloomberg Terminal / chart imagery
- [ ] No human face or gesture suggesting "trading"
- [ ] No coins, tokens, currency symbols
- [ ] Composition allows text overlay in upper third
- [ ] Color temperature aligns with zinc-950 + emerald-teal brand
- [ ] Restraint test: would Frank's tasteful designer friend find this corny? If yes, reject.
- [ ] Single resolved subject, not visual noise
