# taste.md — the FrankX taste contract

> **Read together with `design.md`.** That file describes *what is* — tokens, components, do's and don'ts. This file describes *what good looks like* — the judgment calls, the references, the things we refuse, the polish that lives between the rules.
>
> Tokens make a system consistent. Taste makes it excellent.
> Without taste, a token system produces software that's correct and forgettable.

---

## North Star

**Elite Creator. AI Architect. Humble Excellence.**

Three words, three duties:

- **Elite** — every detail considered. We are not shipping the average. The reader can feel the work without being told.
- **Architect** — the surface signals technical depth. Code samples, system diagrams, real numbers. We earn intellectual trust with proof, not adjectives.
- **Humble** — the chrome stays out of the way. The work, the words, the craft is the loudest thing on the page. The brand never shouts; it carries itself.

If a screen feels like it's begging to be admired, strip it back. If it feels like the product *is* the design, the design has won at the wrong job.

---

## Reference points

The taste lineage we sit inside. Study these often.

| Brand | Why we look |
|---|---|
| **Vercel** | The deepest-dark, most precise dev brand on the internet. Note the restraint. |
| **Linear** | Density without overwhelm. Animation that feels structural, not decorative. |
| **Stripe** | Technical precision presented as inevitability. Every page reads like an API. |
| **Apple (Pro pages)** | Dramatic typography on near-black. Long-scroll cinema. |
| **Anthropic** | Quiet authority. Off-white warmth balancing technical content. We borrow the tonal restraint, not the palette. |
| **Studio Ghibli (production stills)** | The light. The composition. Why we treat hero imagery as cinema, not stock. |
| **The New Yorker** (online) | The discipline of editorial typography. Evidence that prose deserves art direction too. |
| **Ableton Live (UI)** | Dense pro-tools energy that creators trust. Why our music surfaces are tighter and darker than our marketing surfaces. |

We don't copy these. We are part of the conversation they belong to.

---

## What we refuse

The AI-slop checklist. If a draft contains any of these, send it back.

- ❌ **Stock-photo people on laptops.** If we can't generate or commission imagery, leave it out.
- ❌ **Decorative gradients with no purpose.** A gradient frames meaning or it leaves the page.
- ❌ **Generic SaaS hero language** — *"Empower your team"*, *"Unlock your potential"*, *"Take your X to the next level"*. Strike on sight.
- ❌ **Walls of identical cards** — three rows of nine cards is a sitemap, not a section.
- ❌ **Spinning loaders longer than 400ms** — pre-render, stream, or skeleton; never spin.
- ❌ **Confetti animations.** Once. Ever. Earned.
- ❌ **Pure black (`#000`)** — see `design.md`. `void` (`#0a0a0b`) is the answer.
- ❌ **Two equal CTAs** — design indecision in pixel form.
- ❌ **Emojis used as design.** They live in copy. Never in chrome, headers, or buttons.
- ❌ **Drop-shadow + border + blur** on the same element. Pick one.
- ❌ **Floating labels on inputs.** Reads as gimmick on this brand.
- ❌ **Auto-playing video with sound.** Hostile.
- ❌ **Marquee / news-ticker scrolls.** Decoration disguised as motion.
- ❌ **Glassmorphism without imagery underneath.** The effect needs something to blur.
- ❌ **AI-tone phrases in copy** — "delve into", "dive deep", "it's worth noting", "certainly", "absolutely", "in conclusion", "navigate the landscape", "unleash", "harness". Strike on sight.
- ❌ **Pricing-page tricks** — fake countdown timers, "limited time only", strike-through original prices. The brand is honest pricing. Founder pricing is real because it's first-wave; that's the only urgency we use.

---

## The restraint test

Before adding anything to a screen, ask in this order:

1. **Does removing this make the screen worse?** If no, remove it.
2. **Does this exist already in `components/`?** If yes, use it. If almost-yes, extend it.
3. **Does this carry meaning?** Decoration without meaning is noise.
4. **Will the reader notice if it's gone?** If no, it's not earning its space.
5. **Does this raise the page's signal-to-noise ratio?** If no, cut it.

The goal is not minimalism. The goal is that **everything on the page has a job**, and you can name the job in one sentence.

---

## Density & pacing

FrankX is a long-scroll brand. The cadence:

- **Hero** — one screen, one statement, one primary CTA, the eyebrow + headline + deck pattern, breathing room above the fold.
- **Sections** — `py-24 lg:py-32` (96–128px vertical), separated by hairline borders at `white/5`. The reader exhales between sections.
- **Section internals** — start dense (eyebrow + headline + deck), end with negative space (the CTA breathes).
- **Footer** — quiet. The footer is not the place for one more thing.

**Rhythm rule:** never stack two text-heavy sections without a visual break. Image, code block, quote, illustration — something. Three text sections in a row is a wall.

**Mobile rule:** mobile is not desktop scaled down; it's a different rhythm. Cards stack, type drops a step, padding tightens. Test both, design both.

---

## The sound of the brand

Voice principles that show up in every visual decision.

- **Cinematic** — scenes, not statements. Hero imagery composed like a film still. Section openers stage the topic before they explain it.
- **Intimate** — like late-night studio conversation. Use second person. Use questions. Don't hide behind the corporate "we" when "I" is the truth.
- **Technically warm** — complex made accessible without dumbing down. We name the abstraction, then we show the code. Both, always.
- **Direct, not harsh** — say what needs saying, with care. Never apologize for craft. Never punch down.
- **Studio-rooted** — the page should feel like the inside of a working studio: instruments, evidence, pinned references. Not a portfolio gallery.

When the visual feels off, it usually means the voice is off. Re-read the copy aloud first.

---

## What we've already decided

Frozen choices. Don't relitigate without explicit cause.

- **Dark-first.** Light mode is not on the roadmap. Most readers find FrankX at night, on a phone, between work and craft. The brand is for that hour.
- **One serif.** Playfair Display for italic quotes only. Not for headings, not for body. We are not a literary magazine.
- **One mono.** JetBrains Mono everywhere code, command, terminal output appears.
- **Inter for body, Poppins for display ≥18px.** This pairing is solved. Do not propose alternatives.
- **`rounded-full` primary CTAs.** This is the recognizable FrankX button shape. Don't square them.
- **The eyebrow pattern.** 11px / 0.25em tracking / 60% alpha / above the h2. This is the section-opener fingerprint of the brand.
- **No animations on text.** Type does not slide in, fade in, or scale in. It's already there. Page-load motion is reserved for hero imagery and accent elements — with one governed exception, see below.
- **No light-on-light.** White cards on white pages happen on other brands. Not this one.
- **The two-spectrum rule.** A page picks tech (emerald) *or* soul (amber). Bridge spectrum is a third tier for the worlds where they meet — not a license to mix.

---

## Motion: the earned scroll set-piece

Most motion on this brand is quiet — a hero fades up, a card lifts on hover, a number counts once. That's Framer Motion territory, and it stays that way for 95% of what ships.

But long-scroll cinema (see "Reference points" — Apple's Pro pages, Linear's landing) earns its motion budget differently: one section per flagship page where the *scroll itself* is the choreography. A pinned panel that reveals as you scroll through it. A hero video scrubbed frame-by-frame to your finger. Depth layers drifting at different speeds. That's a different tool — GSAP `ScrollTrigger` bridged to Lenis smooth-scroll, not Framer — and it's governed, not free, because unearned scroll tricks are exactly the kind of thing that makes a page feel like a demo instead of a product.

**The primitives:** `components/motion/SmoothScroll.tsx` (Lenis↔GSAP ticker bridge, wraps the page) and `components/motion/ScrollScene.tsx` (a scoped `ScrollTrigger` timeline for pin/scrub/parallax work). Both are no-ops under `prefers-reduced-motion: reduce` by design — the reduced-motion reader gets the real page, not a broken half-animation.

**The bar.** A scroll set-piece ships only when it clears all four:

1. **It demonstrates, not decorates.** It shows the product or the idea unfolding — a system assembling, a feature loop, a narrative beat. Never motion for its own sake.
2. **It holds the performance budget.** 60fps under scroll (`transform`/`opacity` only — never `width`, `height`, `top`, `left` in a scrubbed tween), LCP under 2.5s, hero video under 4MB.
3. **It degrades on purpose.** Under reduced-motion, the static composition still tells the whole story — the scrubbed video shows its poster, the scroll reveal shows all its content.
4. **There is exactly one per page.** One pinned or scrubbed moment. A second one turns cinema into a tech demo.

Miss any of the four — cut it. This is the same restraint test as everything else on this brand; scroll choreography doesn't get a pass from it, it gets held to it more precisely because it's louder.

---

## The polish pass

Before any visual ships to production, walk the page through this list. Out loud. Mentally narrate each step.

### 1. The squint test
Squint at the screen until detail blurs. Is the visual hierarchy still readable? If everything is equally loud, nothing is.

### 2. The mobile test
Open on a phone. Is the headline above the fold? Is the primary CTA reachable with a thumb? Is the type still readable at the smallest size? Does the layout collapse gracefully or just shrink?

### 3. The contrast test
Ramp brightness to minimum on a phone in sunlight. If body text disappears at 65% alpha, you went too low. Re-tune.

### 4. The keyboard test
Tab through every interactive element. Is the focus ring visible? Is the order logical? Can you operate the page without a mouse?

### 5. The slowness test
Throttle to slow 3G in DevTools. Does the layout shift on load? Do images pop in? Is the page meaningful before it's pretty?

### 6. The reading test
Read all the copy aloud. Does it sound like a person? Does any sentence trigger AI-tone alarms? (See "What we refuse.")

### 7. The taste test
Show it to one person who didn't build it. Watch their face. Don't ask them what they think — watch what they do. The first three seconds tell you everything.

### 8. The compress test
Try removing the second-most-prominent element. If the page is *better* without it, remove it for real.

If the page passes all eight, ship it. If even one fails, the work isn't done — and the version that's almost-good is worse than the version that took one more pass.

---

## On AI-generated visuals

We use AI imagery (Nano Banana, NB Pro, NB2, Suno for music, Remotion for video). The taste rules:

- **Always derive ext from `inlineData.mimeType`** — not from the slug. (See `feedback_image_gen_mime`.)
- **Pass `imageSize: '2K'` or higher** for hero quality. Sub-1K renders are draft-only.
- **Council review before publish** — the image generation pipeline includes Council, Director, and Guardian review steps. Don't bypass them.
- **Never Canva-generate.** (See `feedback_no_canva_visuals`.) Nano Banana ships, Canva ships ugly.
- **Cinema, not stock.** Compose, don't generate-and-pray. State the lighting, the lens, the mood, the composition. Anything less is dice-rolling.
- **Imagery is voice.** If the imagery doesn't sound like the brand, the imagery is wrong. AI-perfect faces, generic city skylines, abstract gradients-as-art — all out.

---

## On AI-generated copy

We write *with* AI; we don't *publish* AI. The taste rules:

- **Read it aloud.** If a sentence sounds like a model, rewrite.
- **No filler verbs.** "Helps", "enables", "allows", "empowers" usually mark a sentence that hasn't found its real verb. Find the real one.
- **Concrete over abstract.** "12,000 songs" beats "extensive musical output". "Oracle EMEA AI Center of Excellence" beats "enterprise AI experience".
- **First person when first person is the truth.** "I built this" is stronger than "We built this" when one person built it.
- **One idea per paragraph.** If a paragraph turns a corner, it's two paragraphs.

---

## On taste itself

Taste is not opinion. Taste is the accumulated result of paying attention to what works and what doesn't, over years, on purpose. It can be cultivated. It cannot be skipped.

We sharpen taste by:

- **Reading the references** above, regularly. Not for inspiration — for calibration.
- **Studying our own ship history.** What aged well? What didn't? Why?
- **Cutting more than we add.** The edit is where the work happens.
- **Noticing what bothers us.** Discomfort with our own work is information. Sit with it before fixing it.
- **Not chasing trends.** Trends decay. Taste compounds.

The brand will be here in ten years. Design like the visit you make today is the one the reader remembers.

---

## Provenance

This file is the philosophical companion to `design.md` (Google Labs spec, alpha) and is intentionally outside the YAML schema — taste does not lint. It is read together with `design.md` by every coding agent before any visual work.

When in doubt: tokens come from `design.md`, judgment comes from `taste.md`, the answer is usually less.

Last reviewed: 2026-04-25
