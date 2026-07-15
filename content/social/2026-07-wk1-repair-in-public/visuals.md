# Visual specs — Wk1 repair in public

Direction: FrankX brand world (black glass, graphite, thin signal lines, brushed metal, intelligence-console), **Tech spectrum** — cyan `#06b6d4` / emerald `#10b981` accents per DESIGN.md; a muted warning tone reserved strictly for "broken" status marks. No text baked into backgrounds — type is set in Canva so copy stays editable. No cute robots, no neon-hacker cliché, no soft SaaS gradients.

Palette corrected 2026-07-04 (v1 used amber/gold — Soul spectrum, wrong register for a technical audit). Shipped assets are v2. Full concept work + winning briefs: `starlight/higgsfield/experiments/frankx-wk1-repair-in-public.md`; the prompts in `assets/prompts/` mirror the v2 briefs.

Engine routing: NB2 via `scripts/nb-generate.mjs` (free) first; Higgsfield GPT Image 2 as fallback. Outputs land in `assets/`.

## A. Carousel background system (4:5, 1080×1350, three variants)

One visual system, three intensity levels, so all 8 slides feel like one object:

**A1 — hook background (S1, S8)**
> Ultra-dark premium tech editorial background, near-black glass surface with subtle graphite texture, a single thin horizontal signal line in cyan fading to emerald at the fracture point, breaking into offset segments toward the right edge, faint grid of dim console tick marks, vignette toward edges, large empty center-left area reserved for bold typography, cinematic rim light from top right, no text, no logos, no people, minimal, high contrast, 4:5 portrait

**A2 — body background (S2–S6)**
> Same world, quieter: near-black glass panel, very faint dim grid and one hairline cyan signal trace running vertically along the left margin, generous negative space for text, no focal object, no text, no people, subtle depth, 4:5 portrait
>
> Used by the Canva assembly path; `carousel.html` renders S2–S6 with an equivalent CSS gradient + cyan hairline, so the HTML export works without it.

**A3 — method background (S7)**
> Dark console visualization: an abstract sitemap of thin luminous nodes and edges being traced by a single bright cyan scanning line, most nodes dim cyan-white with emerald accents, exactly three nodes in a muted warning tone (reserved for broken status), black glass depth, no text, no people, no cartoon elements, precise and architectural, 4:5 portrait

## B. Hero card (16:9, LinkedIn LI-1 + X thread receipt frame)

> Wide cinematic intelligence-console scene: dark command-room table surface in black glass, a translucent floating audit report panel rendered as thin light strokes showing a long list with several rows in a muted warning tone among dim cyan-white rows, emerald accent glow at the panel edge, shallow depth of field, brushed-metal edge highlights, quiet authority, no readable text (suggest rows as abstract line segments), no people, no logos, 16:9

## C. Story frame (9:16)

Reuse A1 recomposed:
> Same near-black glass world as the hook background, vertical 9:16, signal line fracture moved to lower third, upper two-thirds clear for headline and poll sticker, no text

## Canva assembly

1. Upload backgrounds to Canva (connector: `upload-asset-from-url` once assets are on a public URL, or manual drag-in from `assets/`).
2. Type system: headline in the site's display weight, white #F5F5F3; accent stat in cyan #22d3ee (matches carousel.html `--accent`); body in 60% white. One idea per slide, headline ≤ 8 words.
3. Slide footer: `frankx.ai/research` + slide counter, 40% opacity.
4. Export 8-slide PNG set → back into `assets/final/` → approval queue.
