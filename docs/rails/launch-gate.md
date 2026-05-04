# Rails Launch Gate

> Five forcing-questions from the original handoff §11. Until each has Frank's written answer, the rails stay `noindex/nofollow` and unlinked from the global navigation. The gate is enforced in `app/(rails)/layout.tsx` (metadata robots flag) and via the absence of links from `/`, `/network`, and the global header.

## State

- [ ] All 5 questions answered below
- [ ] At least 3 reviewers have read v1.0 of `/on-god/notes-on-god-a-first-synthesis`
  - [ ] One Christian thinker (someone who reads Lewis and Bonhoeffer)
  - [ ] One non-dual practitioner (Spira / Adyashanti reader)
  - [ ] One philosophically literate skeptic
- [ ] Robots noindex removed from `app/(rails)/layout.tsx`
- [ ] Rails linked from `/network` (5th lane: Contemplation)
- [ ] Rails linked from a quiet location on `/` (footer or single text link, not a marketing module)

When all checked, the rails go public.

## The five questions

### 1. Are you willing to be quoted out of context across hostile camps?

Christian readers will quote the Christian-affirming bits. Non-dual readers will quote the convergent bits. Skeptics will quote the science-honest bits. Each will be partial. Publishing this is committing to that fragmentation as a feature.

**Frank's answer:** _<to be filled in before public link>_

### 2. When an enterprise prospect Googles your name and lands on `/on-consciousness/penrose-hameroff/`, what's the move?

Load-bearing question. If "I'd want to talk about it" — ship. If "I'd deflect" — not ready.

**Frank's answer:** _<to be filled in>_

### 3. What's the relationship between this rail and any future book?

"Notes on God" is a known literary form. The rail can become a manuscript later. Decide now: maintain code MIT + prose CC BY-NC-ND so a book deal isn't blocked, or keep all rights reserved?

**Default in current implementation:** code MIT (rails substrate), prose CC BY-NC-ND 4.0 (publisher-friendly).

**Frank's answer / override:** _<to be filled in>_

### 4. Who reads v1.0 before public link?

Three filters recommended:

| Reviewer slot | Name | Read-by date |
|---|---|---|
| Christian thinker | _<name>_ | _<date>_ |
| Non-dual practitioner | _<name>_ | _<date>_ |
| Philosophically literate skeptic | _<name>_ | _<date>_ |

Fill in names. Send the v1.0 URL. Wait for honest pushback.

### 5. What's the off-ramp if you stop walking these questions seriously for a season?

The rail can pause without ending. Set `status: paused` in entry frontmatter and the page renders with a paused banner; URLs do not 404. Do not delete. Do not apologize.

**Frank's answer:** _<to be filled in>_

## Lift procedure

When all five answers are written and three reviewers have read the flagship entry:

1. Edit `app/(rails)/layout.tsx` — change `robots: { index: false, follow: false }` to `robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } }`.
2. Edit each per-route metadata helper in `lib/rails/render-helpers.tsx` similarly.
3. Add a single text link from `app/page.tsx` footer or appropriate quiet location: `<Link href="/on-god">Notes on the deepest open questions</Link>` — no marketing module.
4. Optionally: add Contemplation as a 5th lane on `/network` sunburst.
5. Commit with message starting `feat(rails): lift launch gate after Frank's review of v1.0` and a multi-line body summarizing the five answers.

## Pause procedure (if needed)

Reverse step 1-2. Add a `paused` banner to `RailEntryHeader` for entries with `status: paused`. Keep URLs live. The pause is part of the work, not a failure.
