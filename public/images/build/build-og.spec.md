# OG Image Spec — /build

**Target:** 1200×630px, ≤200KB after compression
**Generation:** `node scripts/nb-generate.mjs --spec public/images/build/build-og.spec.md`
**Used by:** `app/build/page.tsx` metadata (currently inherits global `/hero-homepage.png` fallback)

## Palette
- Emerald primary: #10b981
- Tech cyan: #06b6d4
- Soul amber: #f59e0b (sparingly, for warmth)
- Void background: #0a0a0b
- Space surface: #111113

## Composition

Wide cinematic workshop scene, viewed slightly from above at a 15° angle. Foreground: a clean dark walnut workbench with three discrete objects laid out left-to-right in clear hierarchy — (1) a single sheet of architectural blueprint paper showing a sparse agent flow diagram with emerald nodes connected by thin cyan lines, (2) a closed silver laptop on a stand with a soft emerald glow leaking from the seam, (3) a stack of three slim hardback books labeled only by spine emboss. Mid-ground: shallow depth-of-field fall-off. Background: a dark, almost-black wall holding a single horizontal LED strip casting cool emerald-cyan light from the right edge. Editorial product photography, restrained, no people. Tokens: void background, tech-primary emerald accents, ink-muted body suggestion. The composition reads "this is where a team ships one working agent in a day" — not a hype reel.

## Type
- Headline: "Build with Frank" (Poppins Display, ~72px, weight 700, white)
- Subtitle: "Workshops · Sprints · The Agentic Template Pack" (Poppins, ~32px, weight 500, white at 65%)

Headline anchored bottom-left at 80px padding. Subtitle directly beneath, same left margin.

## Symbols / Iconography
- Architectural blueprint (one agent flow, not a wall of nodes — restraint)
- Single laptop with emerald glow (the working agent shipping)
- Three books (workshop / sprint / template pack — the three offers)
- LED light bar (the AI substrate, ambient not loud)

## Variants
- v1: The three-object workbench described above — restrained, premium, editorial.
- v2: Overhead flat-lay of an open notebook showing a hand-sketched agent architecture with emerald ink, surrounded by a fountain pen, a stopwatch (frozen at "1 day"), and a single USB drive. Magazine-cover aesthetic.
- v3: Architectural / symbolic — a single emerald keystone arch floating above a void plane, three thin cyan support columns rising to meet it. Reads as "the structure that holds — workshop, sprint, templates."

## Rationale

The `/build` page sells three precise offers (Workshop, Sprint, Template Pack) to teams — the OG image must signal craft, restraint, and "shipping things that work" without devolving into generic "AI builder" iconography. Editorial product photography matches the page's tone of one-day workshops, not a SaaS landing page. Emerald is the primary signal; cyan adds intelligence without taking over.
