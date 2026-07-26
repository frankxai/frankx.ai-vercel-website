# FrankX Mind Palace Homepage

Date: 2026-07-11
Owner: Codex FrankX Mind Palace Lead
Status: implementation tranche one
Route: `/`

## Decision

FrankX is Frank Riemer's living studio and public mind palace: music, systems, books, field notes,
and tools created while learning how to live and build more deliberately. It is not positioned as a
generic agency or a client-acquisition shell.

Commercial paths remain present, but they are earned by usefulness. Visitors encounter real work,
choose a human intent, and only then reach free or paid tools that fit the next step.

## Regression Finding

The rich, music-led homepage was replaced on 2026-07-11 by a narrow executive-architecture page.
The replacement had stronger proof discipline, but removed music as the opening experience and hid
most of the living studio. The new direction is a synthesis:

- restore the music-led studio and its breadth;
- preserve evidence-before-adjectives and bounded claims;
- replace equal-weight navigation walls with a clear intent map;
- add one earned GSAP scene whose final state is useful;
- protect the experience with a release contract test.

## Audience And Intent Routes

| Intent | Human need | Primary route | Commercial posture |
| --- | --- | --- | --- |
| Listen | feel, recover, discover | `/music` | no sales interruption |
| Learn | understand agents, creativity, and deliberate living | `/learn` | free field guides first |
| Build | adapt open systems and workflows | `/acos` | open proof before premium help |
| Reflect | find language for meaning, healing, and direction | `/soulbook` | private, gentle, no urgency |
| Acquire | invest in a tool or guided system | `/products` | transparent scope, price, and fit |
| Explore | see the wider worlds, brands, and experiments | `/ecosystem` | route to the correct home |

## First Three Seconds

The visitor should understand:

1. this is a personal living studio, not a corporate consultancy;
2. music is available immediately and never autoplays;
3. the work extends into useful maps, tools, and experiments;
4. there is a clear next path for them without pressure.

## Page Architecture

1. **Music-led hero** — warm founder thesis, reviewed Suno release, two clear actions.
2. **Mind Palace Atlas** — one GSAP signal-convergence scene resolving into six usable routes.
3. **Proof and tools** — real repositories, products, architecture notes, and studio systems.
4. **Studio wings** — music, creative worlds, design, books, library, and current field notes.
5. **Learning and reflection** — routes for capability, recovery, meaning, and practice.
6. **Newsletter** — a quiet invitation to receive new experiments and releases.
7. **Final invitation** — take what helps, then build what matters.

The inherited sixteen-scene studio remains in tranche one because it contains the work that was
removed. Later tranches should consolidate repeated card grids only after analytics and visual QA
show which rooms deserve permanent homepage space.

## Voice

Warm, human, intelligent, poetic, grateful, precise. Frank sounds like a scientist-inventor sharing
field notes with people he cares about. Avoid guru language, empire language, manufactured scarcity,
client-service clichés, and claims that cannot be inspected.

Core thesis:

> I build to understand. I document so the people I love can build after me.

## Music Release Contract

- The homepage reads only from `data/homepage-featured-release.ts`.
- A catalog scrape never becomes a featured release automatically.
- Every candidate requires a human-reviewed title, link, rights state, artwork, and short studio note.
- Sound remains user initiated; no autoplay or surprise audio.
- A weekly automation may prepare a candidate packet, but it may not publish or mutate the homepage.
- If no new release passes review, the last approved studio release remains live without a false
  "new this week" label.

## Ethical Conversion Model

The homepage follows a contribution ladder:

1. feeling and proof — music, essays, public systems;
2. orientation — intent routes and free guides;
3. capability — open tools and low-friction downloads;
4. acceleration — paid packs and structured programs;
5. proximity — bounded cohorts, architecture work, or private access when fit is mutual.

No countdown, false scarcity, guaranteed outcome, invented demand, or hidden upsell. Pricing changes,
new offers, and customer-facing promises remain human-gated.

## Motion Thesis

FrankX motion behaves like signals converging on a decision. The page has one Track B GSAP scene.
Six route signals arrive from different directions and resolve into a calm, readable map. Everything
else stays Track A or static. Native scroll is preserved.

## Acceptance Gates

- music is visible in the hero on desktop and mobile;
- the embed has no autoplay parameters;
- all six intent routes are real and keyboard accessible;
- desktop choreography cleans up on unmount and breakpoint change;
- mobile, coarse-pointer, and reduced-motion states render the final map immediately;
- the final GSAP resting state is fully readable and clickable;
- no unverified latest-song, revenue, outcome, or inventory claim is introduced;
- the homepage release contract fails if the music-led entry or atlas is removed;
- design evidence validates and visual score reaches at least 26/30 before production promotion;
- browser evidence covers desktop, mobile, reduced motion, console, and link integrity.

## Human Gates

- production promotion;
- public social posts, email sends, or new destinations;
- cron or scheduled automation registration;
- pricing and offer changes;
- music rights and release approval;
- customer, partner, legal, DNS, credential, and spend actions.
