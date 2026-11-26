# Tella current-main integration candidate

Status: local candidate for review. No merge, deployment, or publication.

## Source and scope

- Base: `e6e937290a75d6f6e3eff79436d6d9c5b44cf6b8` from production repository main.
- Preserved source: PR #1076 at `544983ecae0f506300567a1e1d908ec3582a53a7`.
- Branch: `agent/codex/tella-current-main-20261022`.
- Source PR and branch remain unchanged.

Ported the eight named Tella/demo guides and free script template. Merged only the required category, Tella affiliate record, official outbound fallback and `/tella` alias into current files. Preserved the landed Wispr affiliate, category membership, `/guide` and `/guide/wispr-flow` aliases. Added stable `content_id` fields to the eight guides. No working URL was renamed or removed.

## Review corrections

- `record-a-course-or-tutorial`: 5–12 minutes is now explicitly a planning suggestion, governed by lesson outcome and learner feedback. No researched optimum is claimed.
- `tella-guide`: removed promised meeting savings and a universal 15-minute setup duration. The clip mechanism remains concrete.
- `tella-pricing`: removed the unsupported population claim that most users can ignore credits. Described the metered operation instead.
- Integration examples retain their explicit untested boundary and planning-target labels.

## Source checks

Read on 22 October 2026:

- https://www.tella.com/pricing — annual Pro $13 and Premium $19 per user/month, 3,000/6,000 monthly Agent credits, and listed feature boundaries.
- https://www.tella.com/affiliate-program — public recurring terms and program conditions. Owner-specific partner dashboard terms remain unverified; the inherited catalog note preserves that discrepancy.
- https://refer.tella.com/frankx — read-only request returned HTTP 200 after redirecting to Tella's canonical homepage with `via=frankx`. This confirms referral destination delivery, not attribution or a conversion.

The monthly toggle prices and other vendors' prices retain the source candidate's 20 October evidence date. They were not independently rechecked with interactive toggles in this integration pass. Do not relabel them as a 22 October verification.

Script template SHA-256: `fe5e26d87928a82a54546c5e89f7c725750c9c0830f13bc2244d2594e64d3b26`.

## Validation

Passed on this candidate:

- Eight guides compile through `@mdx-js/mdx` with `remark-gfm`.
- Unique stable content identities and current-main Wispr registry/alias preservation assertions.
- 63 internal guide links resolve against actual source routes, redirect aliases or public template.
- MDX safety: 340 content files.
- Content integrity: 340 content files, one asset-literal component, zero issues.
- Strict marketing claims audit.
- Strict language audit: 2,662 files, zero hits.
- Affiliate-destination and tool-record tests: 15 passed, zero failed or skipped.
- ESLint on changed TypeScript files.
- Full TypeScript check. The first attempt failed because this sparse checkout omitted `types/`; after materializing that directory, the full check passed.
- `git diff --check`.

Full production build, merge gate, remote CI, Vercel preview, viewport/keyboard checks and final independent review remain open. A passing local content check does not establish published state, Google indexing or conversion results.

## Remaining editorial and release gates

The inherited cluster lacks a validated flagship visual/program packet. No new media was generated or approved. The shared affiliate disclosure's global first-hand-use wording needs separate verification or narrowing; this candidate does not imply these integrations were personally tested. Publication remains held by the measurement baseline requirement in issue #905 and current founder/editorial authority.

Before release: recheck current source, vendor prices and terms; complete packet/media and independent reviews; run required full gates; inspect the exact candidate preview on mobile and desktop; verify preview download delivery, referral attribution and privacy-aware events. Record source, deployment and live URL separately.

Rollback: discard this unmerged branch, or revert its named commit after integration. Preserve PR #1076 as provenance.
