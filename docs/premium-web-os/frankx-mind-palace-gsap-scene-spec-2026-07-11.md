# GSAP Scene Spec — Mind Palace Atlas

Date: 2026-07-11
Owner: Codex FrankX Mind Palace Lead
Brand: FrankX
Repo: `frankx.ai-vercel-website`
Page / route: `/`
Scene name: Mind Palace Atlas
Pattern state: signature

## Outcome Contract

Audience: friends, family, creators, founders, builders, and curious visitors
Primary user task: choose the room that matches what they need now
Motion job: turn breadth into one comprehensible decision map
What becomes clearer: music, learning, building, reflection, products, and the ecosystem are distinct routes
What becomes memorable: signals converge into a calm map rather than becoming another card wall
Why GSAP is required: the route arrivals share one scroll-linked, labelled sequence and responsive lifecycle
Why CSS or Motion is insufficient: independent entrances would not express convergence or provide one deterministic timeline

## Still-Frame Gate

First frame: founder thesis and first route are readable without movement
Hero object: the real route map and its six semantic links
Proof visible: every route names the actual destination and the work found there
Primary action visible: listen
What stays still: heading, explanatory copy, and all link text while it is being read
What is removed: ornamental orbs, fake UI, decorative network diagrams, cursor effects
Static verdict: pass

## Story Beats

| Label | Trigger / progress | Primary move | Supporting move | Hold | Final state |
| --- | --- | --- | --- | --- | --- |
| `setup` | section enters desktop viewport | first route is already legible | thread begins at the studio mark | short | a clear opening choice |
| `claim` | early scroll | listen and learn resolve | route numbers gain clarity | short | two human entry paths |
| `proof` | quarter progress | build and reflect arrive | supporting descriptions settle | read | proof and care coexist |
| `mechanism` | middle progress | acquire and explore arrive | thread reaches the final route | read | the complete system is visible |
| `decision` | late progress | all signals align | opacity resolves to full | proof | six usable destinations |
| `hold` | scene exit | no further movement | native page continues | long | stable clickable map |

## Runtime Contract

GSAP version: repository declaration `^3.14.2`
Plugins: ScrollTrigger, `@gsap/react` `useGSAP`
Plugin registration location: component module
React scope / root ref: `MindPalaceAtlas` section root
Cleanup route: `useGSAP` context plus `gsap.matchMedia().revert()`
Trigger creation order: one trigger, in document order
Competing runtimes checked: Motion does not animate atlas route properties
Smooth-scroll choice: native
Reason: smoothing adds no explanatory value

## ScrollTrigger Contract

Trigger: atlas section root
Start: `top 18%`
End: `bottom 76%`
Pin: false; the final list remains in normal flow
Scrub: `0.55` desktop only
Snap: none
`clamp()` use: not required for an unpinned scene
`fastScrollEnd`: true
`preventOverlaps` group: `frankx-mind-palace`
`invalidateOnRefresh`: true
Final resting state: every route visible, aligned, readable, and clickable
Native reading preserved: yes

## Responsive Router

| Condition | Composition | Motion | Pin / scrub | Final state |
| --- | --- | --- | --- | --- |
| desktop | two-column thesis and route rail | staggered signal convergence | scrub, no pin | complete route rail |
| mobile | single-column document | none | none | complete route rail |
| coarse pointer | single readable route sequence | none | none | complete route rail |
| reduced motion | final static composition | none | none | complete route rail |

Implementation uses `gsap.matchMedia()`: yes
Breakpoint changes revert cleanly: required

## Typography And Semantics

SplitText used: no
ARIA behavior: native headings, section label, and anchor semantics
Nested links or semantics: none
Text remains readable during motion: yes; text itself does not deform or split

## Performance Budget

Animated properties: transform and opacity
Layout properties avoided: yes
Maximum animated elements: seven (six routes and one thread)
Large paint / filter risk: none in the timeline
Media asset budget: zero additional media
Mobile simplification: all motion removed
Low-power fallback: coarse pointer gets static map
`will-change` lifecycle: GSAP-managed only; no permanent utility

## Accessibility

Reduced-motion static story: all routes are immediately visible
Keyboard and focus behavior: normal document order and visible focus rings
Pause / stop / hide requirement: not applicable; scroll-linked and finite
Motion-only meaning check: passes; meaning is in labels and descriptions
Touch target behavior: each route is a full-width minimum-height link

## Evidence

Desktop start: pending browser QA
Desktop middle: pending browser QA
Desktop end: pending browser QA
Mobile start: pending browser QA
Mobile end: pending browser QA
Reduced-motion: pending browser QA
Short capture: pending browser QA
Console / request result: pending
Performance note: pending
Vercel preview: pending

## Scores

Visual score /30: pending
Motion score /55: pending
Decision: iterate
Residual risks: visual density from inherited downstream scenes; machine admission currently blocks browser QA
