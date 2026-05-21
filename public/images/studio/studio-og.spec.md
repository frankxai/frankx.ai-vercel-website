# /studio OG image — 1200×630

**Target file:** `public/images/studio/studio-og.png`
**Aspect:** 16:9 (renders cleanly when scaled to 1200×630)
**Size:** 2K
**Model:** nb2 (Nano Banana 2 / `gemini-3.1-flash-image`)
**Used by:** `app/studio/page.tsx` metadata (`openGraph.images[]`) — currently missing per `/hub-audit studio` P1 finding

## Variant 1 (recommended)

A premium dawn-lit content studio scene viewed from a slight elevated angle. Three large dark monitors arranged in a slight curve, each displaying different content surfaces — one shows a clean writing canvas, one shows a wave-form audio editor, one shows a video timeline. Warm tungsten desk lamp on the left casts a soft amber pool across a leather-bound notebook + a single phone resting screen-up showing a glowing notification badge. To the right, a small Manfrotto-style tripod holds a sleek camera pointed slightly off-axis. Background fades into deep charcoal grey with a single accent line of emerald-cyan gradient running horizontally at desk-edge height. Composition follows the rule of thirds with the central monitor anchored on the right-third intersection. Cinematic, photo-realistic, high-detail, shallow depth of field on the foreground notebook. No people. No text overlays. Color palette: warm tungsten amber + cool emerald accent + deep neutral charcoal. Brand-quiet, premium, operator-ready.

## Variant 2

Overhead flat-lay of a content operations dashboard moment. Top-down view of a clean wooden desk surface. Center: a 16-inch laptop displaying a kanban-style content pipeline (capture → classify → produce → ship columns) rendered in dark UI with emerald accent badges. Around it: a chunky over-ear monitor headphone, a small condenser microphone on a desktop stand, a stack of three small index cards with hand-written notes (illegible), a single coffee cup with steam rising. Subtle morning light coming from one corner. No text on the laptop screen — just abstracted UI panels. No people. Editorial photography, slight grain, premium magazine-cover feel.

## Variant 3

Architectural symbol — abstract render of the content operations pipeline as a flowing emerald-cyan light trail moving through 8 minimalist geometric nodes (representing the 8 producers: vis, video, audio, music, prose, screen, food, travel). Nodes are simple chamfered rectangles in matte dark grey, the light trail enters from the left and forks/branches through them before converging at a single output point on the right. Set against a deep charcoal background with soft volumetric haze. No text. Half-abstract, half-architectural. Premium tech-magazine cover aesthetic.

## Brand gate

- Color palette: emerald + cyan + neutral grey + warm amber accent. NO purple/violet/magenta.
- Mood: premium, calm, capable. NOT excited, NOT busy, NOT consumer-tech-y.
- No people, no faces, no hands.
- No on-image text or logos.
- No "AI" symbols (no brain icons, no robot heads, no neural-net nodes).
- Composition should still read at 1200×630 thumb size on LinkedIn / X social previews.

## Generation command

```bash
node scripts/nb-generate.mjs \
  --spec public/images/studio/studio-og.spec.md \
  --out public/images/studio/studio-og.png \
  --aspect 16:9 \
  --size 2K \
  --model nb2 \
  --variant 1
```

## After generation

1. Sync output to production: `public/images/studio/studio-og.png` → `frankx-prod-sync/public/images/studio/`
2. Update `app/studio/page.tsx` metadata to reference the new file:
   ```ts
   openGraph: {
     ...,
     images: [{ url: 'https://frankx.ai/images/studio/studio-og.png', width: 1200, height: 630 }],
   }
   ```
3. Add vault-manifest entry under `studio-assets` collection.
4. Re-run `/hub-audit /studio` to confirm WARN → PASS.
