# 03. The editorial standard, as a rubric

**State:** proposal, 5 November 2026. This is the bar a reviewer scores before a slice is marked ready. It sits under `taste.md`, `design.md` and `CREATOR.md` and borrows its thresholds from the design kernel (`starlight-design-intelligence/evals/editorial-articulation-gate.md` 18/20, `typography-quality-gate.md` 15/16, `web-visual-quality-rubric.md` 28/30, `motion-purpose-gate.md` 16/18). Those gates apply in full to a flagship release; this rubric is the per-slice version that fits in a PR review.

## How to score

1. Read the diff, then open the rendered page at 375 and 1440 (captures from `node .claude/skills/visual-proof/capture.mjs --url <url> --label after`).
2. Score each check 0, 1 or 2. Write the `file:line` for every 0 and 1. A score with no line is not a score.
3. Eight criteria, three checks each, 48 points. A slice is ready at **42 or more with no automatic failure**. Below 36 it goes back without line notes beyond the first five; the pattern is the problem.
4. Automatic failures end the review wherever they occur (list at the end).
5. The reviewer is never the maker. For a flagship surface, add the kernel gates and an independent verifier from a different vendor.

Pass examples are lines that ship today; fail examples are lines in the working tree that would score 0, with the fix the slice should carry.

---

## 1. Copy

| Check | 2 | 0 | Evidence |
|---|---|---|---|
| Name-swap | Swap Frank or the product for a stranger and the paragraph breaks | Reads the same for any AI site | Quote the line |
| Proof adjacency | Every important claim has its anchor in the same or next sentence (a file, a date, a number with its source, a named artifact) | Adjective where evidence should be | Line and the missing anchor |
| Register | Sentence case, no em dash, no "Explore" CTA, no contrast-formula heading, first person where the judgment is Frank's, no coined noun | Any of the VOICE-LIBRARY lexicon rows | `pnpm run ai-slop:audit:strict` output plus manual read for the rows the gate does not cover yet |

**Pass**
- `app/agent-hub/page.tsx:39` "The question is underspecified, and that is the useful answer." A refusal that teaches; no stranger's product could carry it.
- `app/agent-hub/page.tsx:43` "Because the leaderboards are known to be gameable." Reason stated, then the mechanism.
- `app/research/research-featured.tsx:39-45` "Investigations with their evidence attached. Each piece publishes what it rests on: receipts, a dataset, graded claims or inspectable sources." Claim, then the four kinds of anchor.
- `app/ai-architecture/page.tsx:129` "Seven planes map the system. Four decisions produce a verdict." Two numbers, two verbs.

**Fail**
- `app/acos/page.tsx:203` "The operating system for generative creators." Name-swap passes; any tool could say it. Fix: "A command set for Claude Code. One entry point: /acos."
- `app/acos/page.tsx:243-245` an invented quotation attributed to the mascot ("Drop a topic. I'll research, build, and deliver."). CREATOR.md: no invented quotations. Remove.
- `app/llm-hub/page.tsx:259` "Creators don’t pick a model — they assemble a stack." Contrast formula and an em dash in one line.
- `app/stack/page.tsx:7` "The FrankX Stack — Curated AI Tools & Templates": title case, em dash, "curated" (filler), repeated at `:14`, `:25`, `:31`.
- `app/partners/page.tsx:26`, `:334`, `:413`: "We are applying", "Frank is applying", "How I build". Three narrators on one page. Use "I".
- `components/ai-architecture/ArchitectureShowroom.tsx:39` "Your next idea. Built as a system." Slogan; fails name-swap.
- `app/blog/BlogPageClient.tsx:211` "Short-Form Nexus": a coined label for `/opus-pro`.

## 2. Typography

| Check | 2 | 0 | Evidence |
|---|---|---|---|
| Roles | Inter body, Poppins display at 18px and above (`font-display`), JetBrains Mono for code and data, Playfair only as an italic quote or one accent word | Serif on a heading, menu or label; display face on body text | Class names in the diff |
| Hierarchy | One H1; eyebrow 11px with 0.25em tracking above an H2; squint test still reads | Equal-weight headings; caps used as hierarchy | Capture at 1440, squinted |
| Reflow | No clipped heading, orphaned word or overflow at 375 and 768; measure under 75 characters | Horizontal scroll or a one-word line | Captures at 375 and 768 |

**Pass**
- `app/research/research-featured.tsx:35-40` `font-display text-2xl font-semibold tracking-tight md:text-3xl` under an 11px eyebrow (`:32`). The fingerprint pattern from `taste.md`.
- `app/research/research-featured.tsx:72-93` monospace for the manifest schema, hidden below `md` so it never wraps badly on a phone.

**Fail**
- `app/stack/StackGalleryClient.tsx:524` `font-serif text-5xl font-bold` on the H1, again at `:575` and `:606` on H2s. `taste.md` "One serif, used scarcely": never a full heading.
- `app/acos/page.tsx:192` a badge in `uppercase tracking-[0.4em]`; `:462`, `:466`, `:488` and `:502` more uppercase tracking on tier labels and buttons. Caps as hierarchy.
- `app/blog/[slug]/page.tsx:325` `uppercase tracking-[0.35em]` on the "Tags" heading, and `components/blog/RelatedResearch.tsx:24` the same on "Related Research". Sentence case, 11px eyebrow weight instead.

## 3. Imagery

| Check | 2 | 0 | Evidence |
|---|---|---|---|
| Job | The image can be described in one sentence that the page needs; removing it makes the page worse | Decorative, duplicated, or a raster of text | One sentence per image in the PR |
| Class and budget | Matches a VISUAL-SYSTEM class, explicit `width` and `height`, `alt` under 125 characters and specific, inside the class weight budget, manifest row present | No dimensions, label-as-alt, over budget, no row | `pnpm run images:check`; file size in the PR |
| Rights and likeness | Owner photo, generated with provenance, or licensed; cast keys from `characters.json`; no circular face crop; no vendor mascot | Unknown source; a character drawn from memory | Manifest `rights`, `provenance`, `character_id` |

**Pass**
- `app/research/research-hub-lead.tsx:88-101` three provider marks as SVG with `width={90} height={24}`, alt set to the organisation name, `aria-label` on the group.
- `public/images/blog/production-agentic-ai-systems-six-plane.svg` (10 KB): a vector map whose text stays text, ready to serve as the architecture hub's explanatory figure.

**Fail**
- `app/acos/page.tsx:285-293` `acos-architecture.png` (1.3 MB) rendered with `fill` and `object-cover` into a 4:3 box, so the square infographic is cropped and its baked-in counts are stale (audit 02). Replace with the ACOS repository's `acos-how-it-works.svg`.
- `app/blog/[slug]/page.tsx:231` the author portrait in `rounded-full`. `design.md` forbids circular face portraits.
- `app/blog/BlogPageClient.tsx:67-76` a 208px decorative render of a 714 KB mascot PNG at 12% opacity with `alt=""`. Fails the restraint test; remove.
- `app/acos/page.tsx:187` and `:191` two renders of Omega in one hero viewport. One character placement per viewport.

## 4. Information density

| Check | 2 | 0 | Evidence |
|---|---|---|---|
| One job per block | Every section can state its job in one sentence; sections alternate dense (eyebrow, heading, deck) and open (one action) | Three text sections in a row, or a block with two jobs | The block list from 02 against the page |
| No card wall | Repeated items vary in weight, or are collapsed behind one control; three rows of identical cards do not appear on first paint | A grid of nine or more equal cards | Capture at 1440 |
| One primary action per screen | One filled `rounded-full` button; other actions are text links | Two equal buttons | Count filled buttons per viewport |

**Pass**
- `app/research/research-featured.tsx:48-159` one lead card spanning two columns and two rows, four smaller cards, one dashed method card. Varied weight, one visual rhythm.
- `app/agent-hub/page.tsx:154-159` the amber caveat as the only accent box above the tables.

**Fail**
- `app/research/research-hub-client.tsx:277-327` twelve to ninety-nine identical cards each labelled "Sources pending" (`:298-302`) on first paint. The definition of a card wall. Collapse behind one button, label once above.
- `app/llm-hub/page.tsx:147-178` five equal action chips in the hero. One primary, four text links.
- `app/research/research-hub-client.tsx:105-124` three buttons, two filled. One filled.
- `app/acos/page.tsx:250-258` "Star on GitHub" and "See Pricing" as two equal buttons; `:550-556` repeats the pair.

## 5. Motion and reduced motion

| Check | 2 | 0 | Evidence |
|---|---|---|---|
| Job | Motion orients, confirms, shows causality or reveals a real artifact; text never animates | Text fades or slides in; decorative loops | `node .claude/skills/review-animations` verdict or "no motion in this change" |
| Properties | `transform` and `opacity` only; no `transition-all`; durations from `lib/motion.ts` | `transition-all`, width or height tweens | `node .claude/ci/web-guidelines-lint.mjs --changed` |
| Reduced motion | `prefers-reduced-motion` yields a complete static composition (`motion-reduce:` classes or `useReducedMotion()`) | Identical animation under reduce, or a half-rendered state | Capture with reduced motion emulated |

**Pass**
- `components/NavigationMega.tsx:616` `motion-reduce:transition-none` on the header, `:635` and `:641` `motion-reduce:animate-none` on panel and indicator.
- `components/MobileNavOverlay.tsx:481-483` `initial={shouldReduceMotion ? false : 'hidden'}` so the dialog appears complete under reduce.

**Fail**
- `app/blog/BlogPageClient.tsx:79-83` `motion.div initial={{ opacity: 0, y: 20 }}` wrapping the H1 block: text animates, no reduced-motion branch. `taste.md` "No animations on text".
- `app/blog/BlogPageClient.tsx:240-245` and `:300-310` spring stagger on card grids (`type: 'spring', stiffness: 100`) with no reduce branch; `lib/motion.ts` `fadeUp` is the sanctioned preset.
- `app/stack/StackGalleryClient.tsx:558` `transition-all duration-300` on the filter tabs.

## 6. Accessibility

| Check | 2 | 0 | Evidence |
|---|---|---|---|
| Keyboard | Every interactive element reachable, visible `focus-visible` ring, logical order, Escape closes dialogs, focus returns | `outline-none` with no `focus-visible` replacement | Tab through the page; list the first element that is lost |
| Semantics | Headings nest; lists are lists; decorative icons `aria-hidden`; buttons have `type`; live regions where content streams | Divs as buttons; icon-only links without a name | Lint output and a screen-reader pass on one block |
| Contrast and targets | Body text at 65% alpha or above on `void`; 44px targets on touch surfaces | Text under 50% alpha; 32px targets | `tests/wcag-contrast-contract.test.mjs` in `test:build-integrity`; capture |

**Pass**
- `app/research/research-hub-client.tsx:195-206` `sr-only` label for the search input and a `focus-visible` ring with offset on `void`.
- `components/MobileNavOverlay.tsx:431-460` Escape returns to the home view first, then closes; Tab is contained to the visible view.
- `components/MobileNavOverlay.tsx:359-360` `min-h-[44px]` on every tile.

**Fail**
- `app/stack/StackGalleryClient.tsx:480-485` `<a className="block h-full focus:outline-none">` removes the outline and adds no `focus-visible` ring; the card inside has none either.
- `app/blog/BlogPageClient.tsx:289-295` `<button onClick>` with no `type` inside a page with forms.
- `app/research/research-hub-client.tsx:304`, `:406` and `:453` decorative `ArrowUpRight` and `ArrowRight` icons without `aria-hidden` (compare `:111` and `research-featured.tsx:61-64`, which set it).
- `app/llm-hub/page.tsx:47` an emoji in FAQ copy ("⚡ icon") read aloud as "high voltage sign".

## 7. Performance

| Check | 2 | 0 | Evidence |
|---|---|---|---|
| Images | Hero has `priority` and explicit size; everything else lazy; raster under its class budget; AVIF or WebP | A megabyte PNG above the fold, or `fill` without `sizes` | File sizes and the build's route table |
| Scripts | Client components only where state needs them; data read at build or with `revalidate` | A client component for static copy; `use client` at the page root for a list | Diff review |
| Vitals | LCP under 2.5 s and CLS under 0.1 measured, or "not measured" stated | A claimed number with no measurement | `core-web-vitals` output or the honest sentence |

**Pass**
- `app/agent-hub/page.tsx:14` and `app/llm-hub/page.tsx:17` `export const revalidate = 3600`; data read on the server.
- `app/research/model-arena/receipts.json/route.ts` `force-static` with a comment that explains why (lines 13-27).

**Fail**
- `app/acos/page.tsx:285-293` a 1.3 MB PNG with `priority`; `:353-359` a 1.9 MB PNG; `:397-404` a 1.6 MB PNG. Three rasters, 4.8 MB, on one page (sizes from `ls -la public/images/acos`).
- `app/stack/StackGalleryClient.tsx:1` the entire page is `'use client'` for a static list with filter tabs; the list should be a server component with one small client control.
- `app/blog/BlogPageClient.tsx:68-76` a 1024px source decoded for a 208px decorative slot.

## 8. Proof

| Check | 2 | 0 | Evidence |
|---|---|---|---|
| Numbers | Every count, date and price is read from a file or carries "as of" and a path in a comment | A typed count | Grep the diff for digits; each one has a source |
| Status honesty | Waitlist, preview, held, measured and vendor-stated are labelled as such; license and affiliation statements match the source repository | A product shown as buyable that is not; a license named wrong | Compare against `data/products.json`, `programs.json`, the ACOS `LICENSE` |
| Inspectable | The reader can open the artifact behind the claim | A claim that points at a holding page or a repo name only | Click every proof link |

**Pass**
- `app/research/research-featured.tsx:72-93` the receipts manifest schema and `:97-109` "What you can open" listing the raw JSON, licensed third-party figures and the open methodology.
- `app/llm-hub/page.tsx:31` "There is no measured universal winner in this hub." and `:189` "Twelve synthetic evaluation cases are defined and have not run."
- `app/ai-architecture/page.tsx:11-13` the field guide pinned to a commit SHA, with the open reviews linked at `:97-102`.

**Fail**
- `app/acos/page.tsx:50` and `:111` "MIT License" and "MIT-licensed". `agentic-creator-os/LICENSE` and `package.json:6` say Apache-2.0.
- `app/acos/page.tsx:38-43`, `:107`, `:205`: three count sets on one page, none matching the ACOS README (176 skills, 85 commands, 81 agents).
- `app/partners/page.tsx:38` "30% first-year commission" for n8n and `:111-121` a Notion referral; `data/affiliate/programs.json` has no n8n entry and marks Notion `closed`.
- `app/llm-hub/page.tsx:382` "Last refreshed May 20, 2026" typed, while `data/model-registry.json` says `_updated 2026-10-09`.
- `components/blog/RelatedResearch.tsx:31` links a held `/research/[slug]` page as "Related Research"; the destination is a `noindex` holding stub.
- `components/NavigationMega.tsx:125` "23 books, 411K+ words" with no date or file.

---

## Automatic failures

Any one of these stops the review regardless of score:

1. An invented quotation, testimonial, client, partner, price or likeness (CREATOR.md; VISUAL-SYSTEM section 4).
2. A hand-typed count, date or price with no source file (01-layers rule 2).
3. A license, employer or affiliation statement that contradicts its source (`app/acos/page.tsx:50` today).
4. An em dash in public copy; a title-case heading; an "Explore" CTA (VOICE-LIBRARY lexicon).
5. Two equal filled buttons in one viewport (`taste.md`).
6. A circular face crop; serif on a full heading, menu or label; `#000` background (`design.md`, `taste.md`).
7. `transition-all`; `outline-none` without a `focus-visible` replacement; text that animates in (web guidelines lint, `taste.md`).
8. A raster image carrying text that is not also on the page (VISUAL-SYSTEM section 2).
9. A proof link that lands on a `noindex` holding page.
10. A change to `app/page.tsx`, `components/home/**` or `scripts/tests/homepage-mind-palace-contract.test.mjs` inside a slice from this plan.
11. A "done" without the commands run and their output.

## The hand-back format

```
Score:      <n>/48  (copy a/6, type b/6, image c/6, density d/6, motion e/6, a11y f/6, perf g/6, proof h/6)
Auto-fail:  none | <rule number and file:line>
Lines:      <file:line> <check> <what would make it a 2>
Captures:   .visual-proof/after/{375,768,1440}-dark.png
Verdict:    ready | back
```
