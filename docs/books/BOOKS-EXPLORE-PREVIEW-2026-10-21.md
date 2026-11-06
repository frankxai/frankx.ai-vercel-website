# FrankX reading room: three directions

21 October 2026. Design study, not approved production UI.

## Source and boundary

Observed live `/books` at desktop 1440×1000 and mobile 390×844, plus `/books/fable/00-open-how-the-machine-got-its-name` at both widths. Firecrawl requested live captures with `maxAge:0`, mobile user-agent enabled for mobile. Four screenshots were downloaded, opened and inspected. CUA also confirmed the actual Fable chapter text rendered. Captures precede ideation.

Read production AGENTS.md, design.md, taste.md, CREATOR.md, app/books/page.tsx, app/books/components/BookReader.tsx and app/layout.tsx. Read cross-repository release kernel and FrankX BRAND/DESIGN/MOTION/SURFACE_MODES plus editorial and motion skills.

Local taste fixes Poppins/Inter with restrained Playfair accents; newer upstream brand guidance allows purpose-selected editorial families. This study preserves local sans display and body defaults, using a serif accent sparingly. The existing serif chapter reader stays intact. No typography policy is silently changed.

## Experience thesis

A first-time reader can recognize the kind of reading they want, find a specific existing book, and reach a real chapter without learning the venture map. One selected work gives the shelf a human center. Public metadata is separate from publication/commercial verification. Existing slugs and fiction boundaries remain.

## Exactly three directions

| Direction | Composition | Typography | Imagery | Interaction and motion | Tradeoff |
| --- | --- | --- | --- | --- | --- |
| A. Reading room | One asymmetric selected work above grouped editorial rows, with a narrow comfortable reading specimen | Large sans title, modest sans metadata, one quiet serif quotation | Existing Fable cover as the single hero object, small covers in rows | Search plus subject filters; direct links; still prose, short focus/hover feedback only | Best discovery and literary continuity, requires curation of the selected title |
| B. Catalogue desk | Search-first dense index, columns for title, shelf, chapters; featured book becomes a small sidebar | Compact sans, mono index and numerals; very limited display scale | Small vertical cover strip rather than dominant hero | Keyboard-first scanning and query; immediate filtering; no narrative motion | Fastest known-title lookup, less welcoming for a reader without a title |
| C. Reading paths | Three intentionally sequenced routes through craft, reflection and fictional worlds; cover and description follow one path at a time | Medium sans sectional hierarchy, generous paragraph rhythm; one serif path annotation | Public covers appear as route markers, fiction stays in a distinct section | Choose a reading intent, follow a bounded sequence; optional disclosure shows alternatives; no autoplay or scroll hijacking | Strongest guided onboarding, implies an editorial order that needs author acceptance |

## Selected direction

Select A for an additive `/books/explore` preview. Keep `/books` and every existing reader URL. Link to the existing family route separately rather than copy family text or infer permission for a new family publication. Existing Arcanea titles remain identified as fiction/worldbuilding. Do not move its canon into FrankX prose.

The prototype at `preview.html` is a public-safe working study using already-public title names, cover URLs and reading destinations. It uses fresh short editorial descriptions; no private manuscript, unpublished strategy, personal biography or pricing. Its internal sample is explicitly a layout specimen, not an edition. `direction-b.html` and `direction-c.html` preserve the other compositions for actual comparison.

## Observations

- Live shelf heading says six books, but 20 title cards appear in the current DOM. This is a metadata/copy mismatch, not evidence that 20 retail editions exist.
- The mobile first viewport shows the shelf heading and most of the family illustration, with the feature action below the fold. A reader seeking a specific adult title has no local shelf search or category control.
- All 20 title cards use long accessible link names including descriptions and metadata. This gives context but makes keyboard/screen-reader scanning verbose. Prefer concise linked titles with associated descriptions in production.
- Existing Fable prose renders at both viewport widths. The prior text-retrieval failure is not a current visual-reader failure for this tested chapter.
- The chapter starts body text about 560 CSS pixels down on mobile. Global navigation plus a second chapter header remain visible. The music button floats near the lower-right reading area. These are observed tradeoffs, not a reason to rewrite the root layout in this task.
- The opening has no table-of-contents headings, so the desktop article leaves a broad empty right region. Centering when no TOC exists is a focused follow-up, requiring screenshots and exact-reader tests.
- The public shelf labels cards PDF without this audit verifying each download. A new public discovery page should say Web chapters and reserve format badges for actual artifacts with receipts.

## Release conditions still open

Prototype interaction verification, mobile/reduced-motion captures, computed font evidence, screen-reader/manual reading, performance, analytics/privacy review, independent exact-revision review and accepted author direction are distinct gates. This study alone cannot authorize replacing the live shelf or declaring a flagship release. No homepage changes, no new hosted agent runtime, no production merge.
