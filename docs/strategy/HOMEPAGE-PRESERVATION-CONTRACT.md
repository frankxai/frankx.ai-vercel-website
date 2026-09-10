# FrankX Homepage Preservation Contract

**Status:** Active production change control  
**Protected surfaces:** `app/page.tsx`, `components/home/**`  
**Current experience:** `HomePageElite`

## Why this contract exists

The homepage is not merely the first step of a conversion funnel. It is the compressed expression of FrankX: a living studio where enterprise-grade AI architecture, founder systems, music, books, research, experiments, and personal authorship make each other more credible.

On 2026-08-27, a broad founder-first funnel pull request replaced that accumulated experience with a narrower Founder Stack page. The replacement was technically valid, responsive, and covered by rewritten tests, but it reduced the site's identity, discovery value, emotional range, and portfolio proof. The test suite passed because the success criteria had changed with the implementation. The original homepage was restored on 2026-08-28.

The lesson is not “never improve the homepage.” It is: never confuse a positioning lens with permission to erase a valuable product surface, and never let the change redefine its own acceptance criteria.

## The homepage's jobs

Every proposal must preserve or deliberately improve all seven jobs:

| Job | What must remain true |
|---|---|
| Identity | A visitor meets Frank as an AI Architect, musician, builder, teacher, and human—not a generic funnel persona. |
| Orientation | The page explains what FrankX is without reducing it to one framework or offer. |
| Portfolio proof | Shipped systems, products, creative work, books, articles, and experiments remain discoverable. |
| Founder relevance | A founder can recognize a consequential problem and find a useful next move. |
| Human proof | Music and authored work demonstrate taste and practice; media remains optional and never autoplays. |
| Trust | Claims are inspectable, current, bounded, and free of guru or medical certainty. |
| Conversion | Clear routes exist without turning every section into the same call to action. |

## Founder is a lens, not the whole composition

The primary commercial reader is the founder. Entrepreneur, co-founder, solopreneur, coach, expert, and creator-led operator are founder contexts when they own risk and outcomes.

Use that decision in three places:

1. **Situation language:** name the founder's actual constraint rather than reciting demographics.
2. **Routing:** connect the constraint to the Founder Stack, Foundry, Founder’s Circle, a specialist product, or a relevant body of work.
3. **Follow-up:** let the newsletter and diagnostic paths continue the conversation.

Do not use it to flatten FrankX into generic founder coaching, repeat “founder” in every section, hide the creative portfolio, or move all Human Layer material onto the homepage.

## Preservation matrix

Before implementation, add this table to the pull request and complete every row with concrete evidence:

| Value dimension | Current evidence | Proposed treatment | Better, preserved, or removed? | Review evidence |
|---|---|---|---|---|
| Identity and voice |  |  |  |  |
| AI architecture authority |  |  |  |  |
| Music and creative proof |  |  |  |  |
| Products and tools |  |  |  |  |
| Books, library, and articles |  |  |  |  |
| Founder pathways |  |  |  |  |
| Human Layer boundaries |  |  |  |  |
| Conversion and newsletter routes |  |  |  |  |
| Accessibility and motion |  |  |  |  |
| SEO, metadata, and structured data |  |  |  |  |

A removal is not automatically forbidden. It must be named, justified against evidence, and approved before code is written. Moving value to another route counts as removal from the homepage and must include proof that the new route is visible and usable.

## Change classes

### 1. Copy polish

Small edits inside an existing section. Preserve meaning, hierarchy, claims, routes, and the active homepage component. Verify the affected viewport and language checks.

### 2. Additive enhancement

A bounded addition that does not remove or demote an existing job. Show where it fits, why the homepage is the correct surface, and the effect on length and navigation.

### 3. Section-level change

Reordering, replacing, or removing a section. Capture the current desktop and mobile baseline, complete the preservation matrix, compare exactly three directions, and obtain Frank's approval of the selected direction before implementation.

### 4. Structural replacement

Changing the active homepage experience, its central narrative, or its primary information architecture. This requires:

1. A contract-only pull request describing and testing the intended new acceptance criteria.
2. Frank's review and merge of that contract before implementation begins.
3. A separate, isolated implementation pull request measured against the already-reviewed contract.
4. Side-by-side desktop and mobile previews plus keyboard, focus-visible, reduced-motion, long-content, metadata, and route checks.

The implementation pull request may not rewrite its own homepage contract. The `[contract-change]` title tag cannot bypass this separation.

## Pull-request boundaries

Homepage changes must be reviewable as homepage changes. Do not combine them with:

- APIs, authentication, email delivery, payments, or security;
- unrelated routes or page rewrites;
- navigation or ecosystem-wide information architecture;
- bulk blog or knowledge-base migrations;
- unrelated shared-component refactors.

Companion homepage data, reviewed media, evidence, and new focused tests may travel with the implementation. The protected preservation contract may not. Everything else should be a separate pull request.

## Better expansion architecture

Grow the founder strategy around the homepage instead of through replacement:

```text
Living-studio homepage
  -> Founder Stack diagnostic -> useful next move
  -> Foundry -> implementation capability
  -> Founder's Circle -> judgment and consequential bets
  -> Specialist product or body of work
  -> Signal Loop plus explicit specialist newsletter preferences
  -> Human Layer hub -> governed practice and research content
```

The Human Layer should expand as a dedicated, well-labeled knowledge system. Meditation, breathwork, sound, neurotechnology, mind-body recovery, dream practice, manifestation, the Silva Method, and plant-medicine research belong under the four lenses—`established`, `emerging`, `experiential`, and `symbolic`—with uncertainty, safety, and legal boundaries intact. The homepage may introduce that world; it should not carry the whole curriculum.

## Release evidence

No homepage proposal is complete without:

- current desktop and mobile baseline captures;
- the completed preservation matrix;
- exactly three directions for structural work;
- Frank's explicit selection of one direction;
- an isolated draft pull request and preview;
- responsive checks at narrow mobile, tablet, and desktop widths;
- keyboard, focus-visible, reduced-motion, loading, error, and long-content checks where relevant;
- metadata, canonical, indexability, internal-route, and structured-data checks;
- post-merge production verification performed only after authorized merge.

Bots and agents provide evidence and recommendations. They do not convert strategy into approval and do not approve their own reinterpretation of the homepage.
