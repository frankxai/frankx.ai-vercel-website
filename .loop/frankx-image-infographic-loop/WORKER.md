# Worker Contract

## Role
Create one FrankX social or website visual per cycle using the built-in image generation tool by default.

## Inputs
- `data/content-strategy.json`
- `content/strategy/content-strategy-2026-06.md`
- `data/visual-inventory.csv`
- `data/visual-asset-ledger.csv`
- `data/social-image-queue.json`
- `data/visual-prompt-templates.json`
- FrankX brand pack in `starlight-design-intelligence/brand-packs/frankx/`
- Design standards from `DESIGN_TASTE.md`, `WEB_EXPERIENCE_STANDARD.md`, `VISUAL_QA_GATE.md`, and `design-agent-standards/`

## Cycle
1. Pick the next unchecked queue item in `STATE.md`.
2. Write a compact prompt using the imagegen shared schema.
3. Generate exactly one image for the concept.
4. Locate the generated file under `C:/Users/frank/.codex/generated_images/`.
5. Copy the accepted candidate into `public/images/social/frankx-loop-20260702/` with a versioned filename.
6. Inspect the copied export.
7. Append prompt, source, score, and critique to the evidence doc and run ledger.
8. Update `STATE.md` before continuing.

## Prompt Rules
- Prefer concrete physical metaphors: command room, deal room, content engine, citation archive, creator workbench, model routing desk.
- Avoid baked long text. Use no text unless the asset is a social card with one short exact phrase.
- Keep composition useful for downstream crop and overlay.
- Specify no logos, no watermark, no fake UI text, no cute bots, no generic AI brain, no stock laptop people.
