# FrankX Mind Palace v2 — Motion Spec

## First read

FrankX is the central studio connecting a portfolio of real systems, ventures, and creative worlds. The user can open any room directly or continue to the complete ecosystem.

## Motion thesis

- Job: orient and explain relationship.
- Behavior: rooms assemble into an architectural plan; corridors resolve after the rooms have a stable place.
- Memorable idea: many ventures, one operating mind.

## Still-frame gate

- Hero object: the blueprint itself.
- What stays still: section copy, room labels, links, and final corridor geometry.
- What is removed: decorative particle fields, orbiting objects, parallax wallpaper, and pinning.
- Static requirement: the complete map remains useful with JavaScript, motion, coarse pointer, or animation disabled.

## Desktop beat sequence

1. Setup: rooms begin slightly offset from the central command room; corridors are undrawn.
2. Trigger: section enters the middle third of the viewport.
3. Primary: center settles, then eight rooms arrive from their nearest edge.
4. Secondary: corridor paths draw from FrankX to each room.
5. Hold: every room rests in the complete blueprint and remains directly interactive.
6. Exit: none; the final state persists.

## Runtime

- GSAP ScrollTrigger for the one authored scrubbed sequence already budgeted for this section.
- Transform, opacity, and SVG stroke-dash only.
- No pinning, snapping, or smooth-scroll dependency.

## Mobile and reduced motion

- Mobile/coarse pointer: no spatial flight. Rooms are a static sequential trail with native scroll.
- Reduced motion: full desktop blueprint appears in its final state; corridors are visible; no scrub timeline.
- Hero changing outcome: Motion presence transition, separate pause/play control, and a single static phrase under reduced motion.

## QA proof

- Desktop screenshot at 1440px.
- Mobile screenshot at 390px.
- Tablet/menu check at 820px.
- Reduced-motion screenshot.
- Menu keyboard/focus proof.
- Short section frame sequence or video when machine admission allows.
- Type, lint, build, contracts, Vercel preview, and production evidence.
