# Founder story — release candidate

Owning issue: https://github.com/frankxai/frankx.ai-vercel-website/issues/1062
Base: 38710b2aa0a02a8bc9b8fc29996ee7325c417dd2
Change class: additive enhancement. No homepage contract or acceptance tests changed.

## Experience thesis

A builder deciding whether to learn from or work with Frank should meet the person, understand his creative and technical practice, inspect examples, and choose a useful next step. The primary action is Work with me. The signature evidence is an existing documentary presentation photo beside existing, explicitly illustrated creative work.

## Direction decision

| Direction | Composition and behavior | Decision |
| --- | --- | --- |
| Editorial studio chapter | Real portrait, connected first-person prose, asymmetrical mini-me diptych, existing Inter/Poppins, emerald links, no new motion | Selected: a bounded addition preserving the current living-studio page |
| Character-led hero | Mini-me ensemble above the fold with a new hero narrative | Deferred: section replacement requiring exact direction review |
| Interactive studio world | Navigable rooms, 3D character staging and contextual guides | Deferred: larger runtime/performance/accessibility scope and structural approval |

The selected addition sits after AuthorityBar, before TrustedByBlock. It adds reading length; existing section order relative to one another and every prior route remain intact. Mobile posters stack so the original image text is not reduced to tiny thumbnails. No new dependency, tracking, autoplay, credential or external request is added.

## Preservation matrix

| Dimension | Existing evidence | Treatment | Result |
| --- | --- | --- | --- |
| Identity and voice | Hero, FRANK-Ω, founder quote | Add real portrait, connected rationale and illustrated practice | Expanded |
| AI architecture | Hero links, HubShowcase | Preserve; link personal practice to source biography | Preserved |
| Music and creative proof | FeaturedTrack, Music Lab, CreativeWorlds, DesignLab | Preserve all; add two existing music story illustrations | Expanded |
| Products and tools | ProductsTools, SignalRouteSelector | No changes | Preserved |
| Books, library, articles | BooksShowcase, LibraryShowcase, LatestArticles | No changes | Preserved |
| Founder pathways | Existing /work-with-me and /coaching | Add honest discovery links; no booking/capacity promise | Expanded |
| Human Layer | Dedicated governed routes | No private or clinical detail added | Preserved |
| Conversion/newsletter | EmailCTA, FAQ, FinalCTA | No changes; add relevant guide/research links | Preserved |
| Accessibility/motion | Existing homepage controls | Semantic section/figures/nav, visible focus, 44px targets, static content | Pending rendered proof |
| SEO/structured data | app/page.tsx metadata and JSON-LD | No changes, no new route | Preserved |

## Source boundaries

- Identity facts: existing `.frankx/identity.md`, `app/frank-riemer/page.tsx`, existing homepage metadata, current user request.
- Voice: `CREATOR.md`; calibration card revision 2026-10-16.1 loaded during authoring. Proposed prose is an assisted draft, not a recovered quotation or complete chat synthesis.
- Photo: existing `public/images/portraits/frank-presenting-oracle-2025.jpg`, as used by the biography route. No synthetic documentary portrait.
- Miniature images: exact existing `collection-01-01.svg` and `collection-02-08.svg`, described and already published in `content/guides/mini-me-storyboard.mdx`. No regeneration, crop, provider reassignment or new character-canon claim. Echo is explicitly original FrankX art.
- Current Mini Me skill reference revision 2026-10-09.4 and both identity/cast sheets were inspected. Existing guide scenes are a published edition, not asserted to be the current model sheet. New Nilo/Brio/Riff scenes and Claude/Codex mascot applications remain a separate review.
- Private conversation history, client context and internal business records are not copied into this public repository.

## Audit and evidence limits

Independent source review: story_review found no correctness/claim blockers in the initial candidate; homepage preservation tests passed. Revised mobile stacking was independently checked with no source blockers. Final rendered evidence must be bound separately. This is not GitHub review approval.

Live baseline was inspected through the connected browser at 1440×1000 and 375×812. New section introduces no motion. Dark-first design only; a light theme is not part of this surface. Vercel Web Interface Guidelines were retrieved from their upstream source; local CREATOR.md first-person/sentence-case rules take precedence over upstream generic copy conventions.

Do not mark production-complete from this document. Record final checks, preview, independent verdict, source SHA, production binding and rollback after execution. Rollback is a revert of this additive release commit through the normal PR gate.

## Validation record

- `npm run typecheck`: pass.
- `npm run lint`: pass, zero errors and eight existing warnings.
- Strict copy/slop check: 2,622 files, zero hits.
- Homepage preservation suite: pass; no acceptance tests changed.
- Public claims check: pass for its source scope.
- `CI=1 npm run build`: pass on the final mobile poster revision (exit 0, including postbuild).
- `npm run merge:gate`: blocked at `scripts/tests/editor-followup-drops.test.mjs:214`. Build integrity reports 113 pass / 1 fail. The preceding prebuild generated ignored `public/reading` HTML from existing sources containing withdrawn claims. Tracked source files in this candidate do not introduce those claims. Follow-up: https://github.com/frankxai/frankx.ai-vercel-website/issues/1063.

Keep this PR draft until that required gate is resolved, final rendered desktop/mobile proof is reviewed, and GitHub approval is present. No production deployment is asserted. The selected Code Review connector exposed no callable capability in this session; independent source verification is recorded above and does not replace repository approval.
