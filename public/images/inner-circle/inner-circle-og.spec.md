# /inner-circle OG image — 1200×630

**Target file:** `public/images/inner-circle/inner-circle-og.png`
**Aspect:** 16:9 (renders cleanly when scaled to 1200×630)
**Size:** 2K
**Model:** nb2 (Nano Banana 2 / `gemini-3.1-flash-image`)
**Used by:** `app/inner-circle/layout.tsx` metadata. Replaces the current 1024×1024 hero fallback (wrong dimensions for social previews per `/hub-audit inner-circle` P0.2).

## Variant 1 (recommended)

A premium private studio reading-room moment, photographed at golden hour. Wide horizontal composition. Foreground: a low wooden coffee table holding a single small leather-bound notebook (closed), a fountain pen resting on top, and a tumbler with whisky-amber liquid catching the light. Mid-ground: the corner of a deep emerald-green velvet armchair just visible on the right edge. Background, on the far wall: a built-in bookshelf with leather-bound volumes blurred into a warm bokeh; one small spotlight illuminates a single open page somewhere in the middle distance. Soft window light comes from the left, casting long shadows. Color palette: deep emerald + leather brown + warm amber light + cool shadow grey. Cinematic, photo-realistic, shallow depth of field. No people, no text, no faces. The composition should suggest "a small room where serious people gather" — not a public broadcast.

## Variant 2

Architectural / symbolic. A single circular ring made of fine gold filament floating in deep space, viewed slightly from above. The ring has a subtle emerald-cyan inner glow. Around it, six smaller satellite rings orbit at varying distances, each catching light from a different angle. Background is deep charcoal with a barely-visible grid of cool blue stars. Composition centers the main ring on the rule-of-thirds intersection. Minimal, premium, calm. No text. Editorial-grade render quality. Read intent: an inner circle is a sustained orbit, not a single moment.

## Variant 3

Overhead flat-lay of a single hand-written invitation. A cream-colored card sits centered on a deep walnut wood surface. The card reads (legible at thumb size): "Inner Circle — June 2026" in elegant serif type. Beside the card: a fountain pen, a small wax seal in emerald, and a single sprig of olive leaves. Soft directional light from upper-left. Premium stationery photography, slight grain, magazine cover aesthetic. Note: this variant DOES include text — only use if Frank wants the date locked visually.

## Brand gate

- Color palette: emerald + leather brown + warm amber + cool charcoal. NO purple/violet/magenta.
- Mood: private, considered, premium. NOT exclusive-club-elitist, NOT MLM-energy, NOT consumer-tech.
- No people, no faces, no hands (Variant 3 may include disembodied stationery, that's fine).
- No "AI" iconography.
- Composition reads at 1200×630 thumb size on LinkedIn / X / Slack previews.

## Generation command

```bash
node scripts/nb-generate.mjs \
  --spec public/images/inner-circle/inner-circle-og.spec.md \
  --out public/images/inner-circle/inner-circle-og.png \
  --aspect 16:9 \
  --size 2K \
  --model nb2 \
  --variant 1
```

## After generation

1. Sync output to production: `public/images/inner-circle/inner-circle-og.png` → `frankx-prod-sync/`
2. Update `lib/seo.ts` `siteConfig.ogImage` ONLY if you want this as the global fallback. Otherwise update `app/inner-circle/layout.tsx` to pass `image:` to `createMetadata`.
3. Add vault-manifest entry under new `inner-circle` collection.
4. Re-test social card preview via LinkedIn Post Inspector or X Cards Validator.
