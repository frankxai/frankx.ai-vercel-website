---
name: motion-system
description: "Operationalized scroll-driven motion for frankx.ai. Use when a page needs cinematic scroll storytelling — pinned sections, parallax depth, scroll-scrubbed video, or a timeline-orchestrated reveal — beyond what Framer Motion's mount/hover/whileInView patterns cover. Covers the two-track model (Framer Motion for micro-interactions, GSAP ScrollTrigger + Lenis for scroll choreography), the decision rule for picking a track, copy-correct Next.js patterns, and the performance + accessibility budget every motion-heavy page must hold. Governed by taste.md's \"Motion: the earned scroll set-piece\" — read that section before shipping a Track-B moment."
---

# Motion System

Premium motion is not "more animation." It is **one continuous scroll timeline** the eye can follow, plus crisp component feedback — held inside a strict performance and taste budget.

frankx.ai already ships Framer Motion heavily (hundreds of components) for mount/hover/`whileInView` reveals — that's working and should stay untouched. What's missing is scroll storytelling: pinned sections, scrubbed media, coordinated multi-element scroll sequences. This skill is the manual for that missing half, and the governance that keeps it from becoming AI-slop.

---

## The two-track model

Two libraries, two jobs, never fighting for the same element.

| Track | Library | Owns | Use for |
|---|---|---|---|
| **Micro** | Framer Motion | mount/enter, hover, tap, layout, `whileInView` | buttons, cards, nav, modals, list reveals, the page-load hero moment — the current default everywhere |
| **Scroll** | GSAP `ScrollTrigger` + Lenis | the scroll timeline | pinned sections, parallax layers, scrubbed video/media, multi-element sequences tied to scroll progress |

**Decision rule — pick the Scroll track when ANY is true:**
- A section should **pin** (stay fixed) while content moves over/through it.
- Media (video, image sequence) should **scrub** — progress bound to scroll position.
- **≥5 elements** animate in a coordinated sequence as scroll crosses a threshold.
- You need **parallax depth** (≥3 layers moving at different rates).

Otherwise stay on Framer. Nearly every page is Framer-only. A flagship page (a hub landing, a hero-led product page) is Framer everywhere + **one** Scroll set-piece — see `taste.md`'s four-point bar before adding it.

> Never drive the same property of the same element from both libraries. Framer owns the card's hover; GSAP owns the section's scroll. Clean seam.

---

## Setup (once per page/layout)

### Smooth scroll root

Wrap the page (or a layout) in `SmoothScroll` — Lenis smoothing bridged to GSAP's ticker so `ScrollTrigger` reads Lenis positions.

```tsx
import { SmoothScroll } from '@/components/motion';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SmoothScroll>{children}</SmoothScroll>;
}
```

`SmoothScroll` is a no-op under `prefers-reduced-motion: reduce` — native scroll, zero smoothing. That's the correct fallback, not an afterthought.

### GSAP plugin registration

`ScrollScene` registers `ScrollTrigger` once, client-side, guarded so it never double-registers. Never `registerPlugin` in a server component.

---

## Patterns (copy-correct)

### A. Pinned scroll section

```tsx
'use client';
import { ScrollScene } from '@/components/motion';

export function ManifestoPin() {
  return (
    <ScrollScene
      pin
      scrub
      start="top top"
      end="+=120%"
      className="min-h-screen"
      timeline={(tl, root) => {
        const lines = root.querySelectorAll('[data-line]');
        tl.from(lines, { opacity: 0.15, y: 24, stagger: 0.2, ease: 'none' });
      }}
    >
      <p data-line>The work is the proof.</p>
      <p data-line>Everything else is chrome.</p>
    </ScrollScene>
  );
}
```

### B. Parallax depth (3 layers)

```tsx
timeline={(tl) => {
  tl.to('[data-depth="back"]',  { yPercent: -8,  ease: 'none' }, 0)
    .to('[data-depth="mid"]',   { yPercent: -18, ease: 'none' }, 0)
    .to('[data-depth="front"]', { yPercent: -32, ease: 'none' }, 0);
}}
```
`ease: 'none'` is mandatory for anything `scrub`-bound — the scroll *is* the easing. An easing curve on a scrubbed tween fights the reader's finger.

### C. Scroll-scrubbed video

```tsx
timeline={(tl, root) => {
  const v = root.querySelector('video') as HTMLVideoElement;
  v.pause();
  const onMeta = () => tl.fromTo(v, { currentTime: 0 }, { currentTime: v.duration, ease: 'none' });
  if (v.readyState >= 1) onMeta(); else v.addEventListener('loadedmetadata', onMeta, { once: true });
}}
```
Asset rules: short hero clip (≤4 MB WebM + MP4 fallback), `muted playsInline preload="auto"`, and a `poster` still that is exactly what reduced-motion readers see.

### D. Component micro (stays on Framer — the default)

```tsx
import { motion } from 'framer-motion';

<motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-15%' }}>
  {children}
</motion.div>
```

---

## Performance budget (non-negotiable)

Motion that drops frames reads as cheap, not premium.

- **60fps under scroll.** Only animate `transform` and `opacity`. Never `top/left/width/height/margin` in a scrubbed tween.
- **LCP unaffected.** Lazy-load any Scroll-track set-piece below the fold (`next/dynamic`, `ssr: false`). The hero's first paint never waits on GSAP.
- **Hero video ≤ 4 MB** WebM (+ MP4 fallback), poster ships immediately.
- **One pinned section per page**, max — see `taste.md`'s four-point bar.
- Call `ScrollTrigger.refresh()` after async content/images change layout, or pins drift.

---

## Accessibility (the fallback is part of the design)

- Every scroll set-piece has a **static composition** under `prefers-reduced-motion: reduce`. `SmoothScroll`/`ScrollScene` already early-return; the *static* layout must still tell the story (video → poster, scrubbed reveal → all content visible).
- Scrubbed video is `muted` (never autoplay sound — also a taste rule) and carries a poster.
- Pinned content stays keyboard-reachable — it's still in normal DOM order.
- Don't gate meaning behind motion. If a number only makes sense after a count-up, also render the final value.

---

## Workflow

1. **Classify the page.** Framer-only, or Framer + one Scroll set-piece? Apply the decision rule.
2. **Build static first.** Motion is added to approved structure, not baked into layout.
3. **Micro track:** Framer Motion, as already used across the codebase — no change to existing patterns.
4. **Scroll track:** `SmoothScroll` / `ScrollScene` from `@/components/motion` — read `taste.md`'s four-point bar first.
5. **Verify:** reduced-motion still tells the story; scroll at 60fps; hero video under budget; exactly one set-piece.

## Never

- Lenis + a CSS `scroll-behavior: smooth` at the same time (they fight).
- An easing curve on a `scrub` tween (use `ease: 'none'`).
- Two pinned sections stacked.
- A scroll set-piece above the fold that blocks LCP.
- Motion as the only carrier of meaning.
- Applying this to existing pages unprompted — Track B is opt-in per flagship page, not a retrofit sweep.
