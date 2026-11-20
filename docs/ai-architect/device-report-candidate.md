# Architecture review: device save and Markdown export

Candidate implementation owner: Codex / OpenAI.
Base: `deee3505c4a986168939dd0e5024fe1c8cb3eee9`.
Quality owner: [#706](https://github.com/frankxai/frankx.ai-vercel-website/issues/706).

A builder can already complete the four-decision interview at `/ai-architect` and copy its report. This candidate adds explicit save/reopen/removal on the same browser and Markdown download. It preserves the exact report, source revision and self-reported-evidence limits. It sends no report text through analytics and makes no model calls.

This is a bounded continuation of the existing interview. Customer accounts, cloud projects, cross-device retrieval, automated codebase review and paid access are separate work. The current admin-only authentication is not reused as customer identity. Product catalog and checkout gates remain authoritative; this candidate does not activate an offer.

## Acceptance

- A complete review saves only after the user chooses the device-save action.
- Reloading exposes the saved report without changing the current interview answers.
- Markdown export retains the exact displayed report and provenance.
- Removal targets only the architecture-review storage key.
- Blocked/quota-limited storage reports failure, preserves the current report and leaves Markdown export available.
- Invalid/version-incompatible saved data does not crash the interview or silently delete the record.
- Save/reopen/removal/download-request events carry no answers or report text. Download is an initiation event; browser receipt is not inferred.

## Data and recovery

One bounded report is stored under `frankx:architecture-review:v1`. Saving replaces that slot. The interface explains browser sharing, local scope and deletion by browser settings. Reports are plain text rendered through React; local storage is not an authenticity or entitlement authority. Storage access, writes and removal are guarded. Downloaded Markdown is the portable recovery copy.

## Validation and release

Storage tests exercise persistence across fresh reads, exact provenance, replacing one review, targeted removal, malformed/unknown/oversized records, storage denial/quota errors and incomplete reports. The existing clipboard tests continue to cover delayed operations and stale-response recovery. The browser verification harness is private and outside this public change.

Required release evidence remains exact-head type-check, repository lint/copy/build gates, desktop/mobile browser observations and substantive review from another provider. A source pass or local browser harness does not establish production availability. Rollback is a normal revert; the versioned local slot can be removed through browser settings when the feature is absent.

Local design sources: `design.md`, `taste.md`, `CREATOR.md`. FrankX brand/reference sources were read through the authorized connection before drafting the added interface labels. No private source content is reproduced here.

Observed local checks on 2026-11-18: 14 focused tests and the architecture contract passed, full TypeScript passed, required repository lint reported 0 errors/12 existing warnings, and the strict language audit found zero hits in 2,697 files. The sequential 2GB production build generated 1,512 pages and passed its postbuild checks. That build preceded one JSX-only addition: the save button now confirms when the current report matches the saved copy. Final scoped lint (zero warnings) and full TypeScript both passed after that label addition. The first overlapping build/typecheck attempts exited 137; they are not counted as passes.

Rendered verification remains blocked: Chromium could not launch because the environment refused its process-singleton socket and ptrace operations. No screenshots, mobile visual acceptance or browser-journey success are claimed. These remain release gates, together with cross-provider review.
