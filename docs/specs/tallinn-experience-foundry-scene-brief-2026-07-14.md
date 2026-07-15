# Tallinn Working Sessions — page and scene brief

Date: 2026-07-14

Status: internal implementation brief — not partner or attendee copy
Owner: Codex FrankX Tallinn production lane

## Problem and audience

Frank has six days before Mindvalley U begins in Tallinn. He needs one credible way to check interest in a small independent workshop without implying an official Mindvalley relationship, booking a room before enough people confirm, or assigning Ana any role before she accepts it.

The first audience is a warm group of creators, solo founders, team leaders, and people leaders who will already be in Tallinn. They do not need another talk. They need a compact working session and a useful plan, worksheet, or team agreement they can use after the event.

## Product decision

Build one Tallinn Working Sessions review experience with:

- one hub at `/experiences/tallinn-2026`;
- ten data-driven offer pages at `/experiences/tallinn-2026/[slug]`;
- five offers marked for Frank + Ana review on 2026-07-15;
- one shared interest form that remains hidden until privacy requirements and personal-data collection are explicitly approved;
- one transparent validation rule: eight compatible confirmations and two people on standby before any venue review;
- no checkout, room booking, email campaign, public counter, or automated follow-up in this release.

All pages remain `noindex` until Frank approves the offer, claims, timing, and venue. Any wording or role that names Ana also requires her explicit approval.

## First viewport

Eyebrow: `Tallinn · 20 July–2 August 2026 · independent working sessions`

Headline: `Leave Tallinn with one clear plan you can use the next morning.`

Deck: a small-room working-session promise, not a conference or inspiration claim.

Primary action: `Find the right session`, anchored to the session chooser.
Trust line: nothing is booked; Frank leads; Ana chooses whether and how she contributes; independent of Mindvalley.

The right side is a Tier C exact product surface: a four-stage map labelled `what matters → practical result → weekly rhythm → team use`. It is not a fake dashboard. Selecting a visitor context changes the recommended session, the take-home made in the session, and the existing material they can review now.

## Signature interaction

The session chooser has five explicit contexts:

1. creator;
2. solo founder;
3. team lead;
4. people / HR leader;
5. reflective professional.

The control uses real button semantics, visible focus, and a static first recommendation in server-rendered HTML. Motion is limited to color and border transitions. With reduced motion, nothing animates and no information is lost.

## Page rhythm

1. Independent working-session hero and practical map.
2. Session chooser.
3. Five review-first sessions as an editorial numbered sequence.
4. The remaining five ideas as a compact review index, clearly not proposed for the first pilot.
5. Frank / Ana role boundary: Frank leads; Ana has no role by default and may choose planning support, one agreed contribution, co-creation, or no participation.
6. Interest-to-venue decision: interest → compatible confirmations → human venue approval → confirmed session.
7. Tallink-first venue logic and explicit unconfirmed status.
8. Explicit no-store/no-send status while collection is disabled; shared interest form only after privacy approval.
9. Independent-event disclaimer and source links.

Each offer page repeats only what is needed to decide: promise, who it is for, 90-minute plan, take-home, existing material, host boundary, current venue status, and either the disabled-collection notice or approved interest form.

## Visual system

- Brand: FrankX, dark-first.
- Spectrum: bridge world with amber as the human signal and cyan as the system signal; both may appear in the operating map, but a section has one dominant signal.
- Canvas: `#0a0a0b`, hairline white borders, warm off-white copy, cyan primary action.
- Typography: existing Poppins display, Inter body, JetBrains Mono for labels.
- Shape: rounded-full primary action; large-radius material surfaces only where they group a workflow.
- Density: editorial rows and one large system surface; no grid of ten equal cards.
- Imagery: none required. Tier A proof is the existing Ikigai workshop, research, prompt library, ACOS, and AI architecture routes. Tier C is the exact interactive recommendation map.

## Responsive behavior

- Desktop: split hero; sticky or adjacent operating map; editorial two-column session rows.
- Tablet: hero stacks; compass remains horizontal-scroll-free.
- Mobile: headline, promise, primary action, and unconfirmed-venue truth fit before the operating map; all controls are at least 44px high; session rows become single-column.
- No horizontal overflow at 320px.

## Performance and accessibility budgets

- No WebGL, video, autoplay, generated hero, external font, or new runtime dependency.
- Server-render all offer and proof content.
- Client JavaScript is limited to the compass and interest form.
- Visible focus, native labels, live submission status, useful error text, and no color-only status.
- Respect `prefers-reduced-motion`; text never animates.
- LCP target below 2.5s on a normal preview route; CLS target below 0.1.

## Claims and approval boundaries

- Say `independent session in Tallinn`, never `official Mindvalley workshop` unless Mindvalley approves it through its application path.
- Do not use Mindvalley logos or imply access to its venue, agenda, attendees, or facilities.
- Do not publish psychology, IFS, therapist, neuroscientist, or health-outcome claims for Ana without verified credentials and her explicit approval.
- Ikigai is described as a modern reflection scaffold inspired by a broader Japanese idea of everyday meaning, not an ancient four-circle formula.
- Ana is presented as a co-design invitation, not a confirmed speaker.

## Release gates

- Static route and registry invariants pass for one hub, ten pages, and five review-first offers.
- Typecheck, scoped lint, claims audit, static internal-link check, and production build pass.
- Desktop and mobile screenshots are inspected; keyboard and reduced-motion routes are checked.
- `design-loop-evidence.json` reaches at least 26/30.
- An independent verifier reviews the implementation before the preview is presented as release-ready.
