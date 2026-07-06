# Madrid Demo 3 — Pre-staged Visual Batch

Drop **5–8 real PNGs** in this folder before Thursday's demo. They feed `/visual-strategy` to show per-image platform-fit recommendation.

## What to use
- Mix of image *types* (character, product, abstract, screenshot, hero) so the strategy output is varied and interesting.
- Real recent assets ideal — not stock — so the demo lands as live work.
- Suggested source: `_inbox/visual/` if you already have raw captures, or pull from a recent Higgsfield session.

## What the demo says
The cue card line:
> "Different audiences need different visuals. The system knows which model produces which kind. Nine platform personas, one source of truth."

`/visual-strategy <path>` analyzes each image and routes to the right platform persona (LinkedIn / Instagram / Threads / etc.). NB2 for character, GPT Image 2 for product, Soul V2 for avatars.

## Pre-flight check
- [ ] 5–8 PNG files present
- [ ] Run `/visual-strategy content/staging/visual/demo-batch/` once Wed evening to confirm output renders cleanly
- [ ] If output is broken, swap to a known-good batch from `content/staging/visual/2026-05-*/`
