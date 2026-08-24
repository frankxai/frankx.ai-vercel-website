# Branch Audit — frankx.ai-vercel-website

> **Non-executing governance snapshot.** This document records evidence and a staged retirement plan. This PR performs **no branch deletion**, does **not** authorize deletion by itself, and intentionally leaves `.github/cleanup-queue.txt` unchanged and empty.

## Snapshot

- Captured: `2026-08-24T22:47:28+00:00` (UTC; 2026-08-25 in Europe/Amsterdam).
- Baseline: `main` at `6c04442ff4bb941d04c373a8d422fb0756af57bb`.
- Remote refs: **96** branches = 1 `main` + **15** current open-PR heads + **80** non-open heads.
- Live change since the preceding working census: #549 and #545 merged and their head refs were deleted; eight other recently closed PR heads entered the non-open census; #564 protects `fix/game-embed-route-isolation`; #565 protects `agent/codex/graph-engineering-cluster`; and this audit branch is open as #566.
- Every non-self SHA below is the exact remote branch tip observed in this snapshot. PR #566 is the unavoidable self-reference: updating this document changes its own tip, so GitHub PR metadata is authoritative for that one row.

| Population | Count | Treatment |
|---|---:|---|
| `main` | 1 | Baseline only |
| Open PR heads | 15 | Excluded from retirement; one is an explicit live-work hold and one is this audit PR |
| `DELETE_SAFE` candidates | 13 | Evidence recorded only; not queued in this PR |
| `ARCHIVE_KEEP` | 16 | Retain until an owner-approved retention decision |
| `ACTIVE_DO_NOT_TOUCH` non-open heads | 0 | Live work; never queue |
| `NEEDS_SALVAGE` | 51 | Preserve and transplant deliberately |

The four non-open categories total 80 exactly. `agent/codex/graph-engineering-cluster` is shown both in the open-PR inventory and active-protection section for emphasis, but counted once. The voice-agent branch has merged through #545 and no longer exists as a ref.

## Methodology and proof standard

1. Fetch and prune `refs/heads/*`, then fetch every `refs/pull/*/head`; resolve `origin/main` and the open PR list again immediately before generation.
2. Exclude `main` and the exact current head branch of every open PR from the retirement census. Do not infer openness from branch age or naming.
3. For each remaining branch, compute the merge base with current `main`, ahead/behind counts, the files changed by the branch since that merge base, and byte-level blob identity against current `main`.
4. Exclude `public/reading/` from file evidence because it is known generated history removed from `main`; including it creates false multi-million-line divergence.
5. Record `A/B/R/N` as **ahead commits / behind commits / residual files / new paths**. Residual means a branch-touched path whose branch blob is not byte-identical to current `main`; it is not automatically valuable or mergeable.
6. Apply squash-aware proof in this order: exact tip tree in main history; all touched blobs in main; exact source-patch match to a squash merge; exact ancestor containment by a retained successor; then a documented non-product/invalid-artifact exception. A merged PR number alone is not enough.
7. Classify conservatively. No branch with unresolved product, editorial, family, or provenance intent is `DELETE_SAFE`, even when its measured residual count is zero.

## Open PR heads — excluded from retirement

These 15 refs remain governed by their PRs. Closing or merging a PR requires a new census before its branch can move into another category.

| PR | Head branch | Exact tip SHA | State at snapshot | Title |
|---:|---|---|---|---|
| #565 | `agent/codex/graph-engineering-cluster` | `c071d8f1fbd5c224e25ffeccc0e86412bb302705` | ready / protected live work | feat(blog): publish the Graph Engineering Field Guide |
| #564 | `fix/game-embed-route-isolation` | `954522670726691d673ded03020bbdbdb22f786c` | ready | [contract-change] fix(games): isolate static embeds from player routes |
| #550 | `agent/codex/issue-546-book-publication-gate` | `2e1d7d14639511d269b3e8eeaf63e0fc38411288` | ready | fix(books): fail closed for draft parent routes [contract-change] |
| #566 | `agent/codex/branch-audit-20260825` | _self; see PR metadata_ | ready / this audit | docs: refresh live branch consolidation audit |
| #528 | `claude/ai-architecture-seo-guide-4n78jf` | `eaaf2808b35f585a27a4995921f9357336682a3a` | ready | fix(ai-architecture): one seven-plane vocabulary, and connect the three surfaces |
| #541 | `agent/codex/music-lab-violin` | `2176a8d870729c195a41ce6231e6cb9863c6c859` | ready | feat(music-lab): guided practice and digital violin |
| #534 | `cursor/fix-academy-counts-5a7e` | `dd3987b2b223df120354456a831ca2ea124e6329` | ready | Remove false skill and pattern counts from academy hero |
| #456 | `agent/codex/media-governance-hardening` | `95b70130ca11d68a15e1946e61ab41682e28ab5b` | ready / conflicting | [contract-change] fix: harden media guard against review-discovered bypasses |
| #532 | `claude/model-arena-automation-review-ikub2o` | `f83caf2765565625da6ad113b864c2c04b0c079a` | ready | feat(intelligence): external model-data ingest with enforced provenance |
| #531 | `agent/codex/spline-mcp-article` | `3a2a49d08e713ee8a1dfc3cfd51419cdb0baa6fc` | draft / human gate | Draft: Spline MCP AI-native 3D workflow series |
| #529 | `agent/claude/ai-architect-hub` | `09249d204341f72519d83e4c6d0f0cf3536cbf47` | ready | The AI Architect team, the worked examples, and the architecture canvas |
| #484 | `agent/codex/human-mastery-patternos` | `96b3aed71c5047b50dc59b8514f2d00d4ae87346` | ready | feat(research): seed Human Mastery PatternOS v0 |
| #524 | `agent/claude/unshadow-routes` | `404482bf1bb1f69b540b96626aa8818c9b0f32ca` | ready | fix(routes): unshadow three mis-mapped pages, shrink the grandfather list |
| #522 | `agent/hermes/salvage-media-guard-20260823` | `cad4033977083fd5d782b4ee7c1508f34e5d01d0` | draft | fix(media-guard): salvage #456 guard+tests without pull_request_target |
| #525 | `cursor/critical-bug-investigation-138d` | `f32a89eaf1926496c6ec7bdb17801baa02b03541` | draft / conflicting | fix(games): restore same-origin arcade iframes |

## ACTIVE_DO_NOT_TOUCH

| Scope | Branch | Exact tip SHA | Last commit | A/B/R/N | Evidence |
|---|---|---|---|---:|---|
| Explicit open-PR exception | `agent/codex/graph-engineering-cluster` | `c071d8f1fbd5c224e25ffeccc0e86412bb302705` | PR #565 | n/a | Created, force-updated, and opened as #565 during the final census; explicitly protected as live work. |

## DELETE_SAFE — 13 evidence-backed candidates, not queued

`DELETE_SAFE` means the branch ref is a retirement candidate after the staged protocol and one more live recheck. It does not mean this audit PR deletes it. The exact SHA is the recovery/proof anchor; for successor-contained rows, the containment precondition must still be true at queue time.

| Branch | Exact tip SHA | Last commit | A/B/R/N | PR ref | Exact proof |
|---|---|---|---:|---|---|
| `agent/c940/research-hub-recommend-preserve-20260818` | `7ba719b37eb7cbac0a24134db13ff41c526a3b6b` | 2026-08-17 | 10 / 45 / 5 / 0 | #483 (merged) | TREE_IN_MAIN — tip tree edc194513898832fa1e9eeeb72a0265c07d994a1 is the exact tree of main commit d98122db (#483). |
| `agent/claude/hero-splittext` | `d98de39cb8ad90f4dcb7786de48cacaa37add5c9` | 2026-08-14 | 1 / 57 / 1 / 0 | #470 | SUPERSEDED — #470 closed; main has the same SplitText rotation, height reservation, pause control, and exact contract test. The sole residual file is later authority/product copy, not unique implementation. |
| `agent/claude/lint-config-and-audit-refresh` | `a8c7d59b72b434c8ae966154508841f310f078e5` | 2026-07-29 | 4 / 106 / 3 / 0 | #395 | GOVERNANCE_STALE — #395 closed; residuals are an obsolete cleanup queue/audit and deletion of the secondary ESLint config. The idea remains in #395; current lint uses eslint.config.js. |
| `agent/claude/refresh-branch-audit` | `3f5ec11e8942f4bcde3d1c138259beace836cdea` | 2026-08-09 | 4 / 63 / 1 / 0 | #450 | GOVERNANCE_STALE — #450 closed; the sole residual is an Aug 9 BRANCH_AUDIT.md superseded by this live census. |
| `agent/claude/warriors-book-one` | `5e658df6584ee63047f2ca1a6265dd0255e2f16f` | 2026-08-10 | 1 / 58 / 0 / 0 | #458 | FILES_IN_MAIN — all 11 branch-touched files are byte-identical to current main. |
| `agent/codex/signal-note-2026-08-15` | `d933620b61986c880bde647fd041e5388d28e78c` | 2026-08-19 | 3 / 38 / 0 / 0 | #476 | FILES_IN_MAIN — the sole branch-touched file is byte-identical to current main. |
| `agent/codex/tallinn-tribe-studio-20260714` | `25ea19acd3115209fa8eaceaf360dcc1558e35dd` | 2026-07-15 | 5 / 187 / 17 / 1 | #278 | CONTAINED_SUCCESSOR — exact tip commit is an ancestor of three retained branches: agent/antigravity/lead-funnels-v1, agent/gemini/tallinn-reconciliation-main-prod, and codex/best-ai-hardware. |
| `agent/codex/vault-refresh-388` | `479b94796c1f5a3bc3fdd4f70703d70681e69d16` | 2026-07-28 | 4 / 108 / 4 / 1 | #388 (merged) | MERGED_SQUASH — the four-file source patch exactly matches main commit 12850052 (#388), including the rendered-metadata contract. |
| `agent/hermes/ai-architect-studio` | `de7cd2a03a69259ed0ad51498f63d1a95df06d1d` | 2026-08-23 | 1 / 10 / 2 / 1 | #523 | CONTAINED_SUCCESSOR — exact tip commit is an ancestor of open #529 head agent/claude/ai-architect-hub; #523 is closed as superseded. |
| `agent/worktree-sync` | `ecdd8176b425061c63e03c4699c8635e4139976d` | 2026-06-18 | 1 / 293 / 1 / 0 | — | PATCH_IN_MAIN — its only commit adds temporary-tool ignore rules now present in main; the residual .gitignore delta is later main-only safety coverage, not missing branch intent. |
| `cursor/add-research-hero-images-cbad` | `c6cf9ecd5105cf7e4afdd928dc9ca756410f7eab` | 2026-08-20 | 1 / 32 / 6 / 3 | #502 | INVALID_BLOBS — #502's three .png files are 82–99 byte ASCII placeholders beginning '[Binary content from …]', not PNG data. Filenames and regeneration intent remain recorded in #502 and here. |
| `cursor/empire-sprint-site-heal-9715` | `fd4174ac8007317bcd8733dcb2b1d80526910fea` | 2026-08-20 | 9 / 17 / 1 / 1 | #479 | GOVERNANCE_STALE — #479 closed; the sole residual adds BRANCH_CLEANUP_ANALYSIS.md, an obsolete audit superseded by this census. |
| `cursor/fix-music-title-duplication-e2d0` | `e0cf15d2ee3f1a867ad1a4062a5061c4ac63bbf0` | 2026-08-16 | 1 / 49 / 0 / 0 | #481 | FILES_IN_MAIN — the sole branch-touched file is byte-identical to current main. |

### DELETE_SAFE proof dependencies

- `agent/codex/tallinn-tribe-studio-20260714` is safe only while at least one listed retained successor still contains tip `25ea19acd3115209fa8eaceaf360dcc1558e35dd`.
- `agent/hermes/ai-architect-studio` is safe only while #529's head still contains tip `de7cd2a03a69259ed0ad51498f63d1a95df06d1d` or after its wanted content lands elsewhere.
- `cursor/add-research-hero-images-cbad` is a discard-only exception: preserve the three requested subjects and regenerate real, provenance-tracked assets; never copy the placeholder blobs.
- Stale-audit rows are safe because this file supersedes them and their closed PR conversations remain the forensic record.

## ARCHIVE_KEEP — 16

These are explicit save-points, historical observability snapshots, a strategy record, or human-held family material. Exact containment does not override the retention hold.

| Branch | Exact tip SHA | Last commit | A/B/R/N | PR ref | Retention reason |
|---|---|---|---:|---|---|
| `agent/witali-father-code` | `57881de4ef73942f22e0fc26d2407828f55d5921` | 2026-07-09 | 2 / 198 / 2 / 2 | #382 | Family memorial source. Closed #382 records an explicit human gate and no-branch-deletion instruction; canonical decision is #563. |
| `archive/claude-build-llm-research-hub-75ba8` | `faecc73616e3d13e5dadb71d69a5b867cbf24d01` | 2026-06-01 | 5 / 435 / 51 / 29 | — | Explicit archive save-point; retain until an owner approves a retention window and recovery policy. |
| `archive/claude-frankx-freemium-experience-hJuk4` | `caa1d68aaec58a8a6e1317c54c7edad6f20bdea9` | 2026-05-29 | 8 / 404 / 27 / 16 | #93 | Explicit archive save-point; retain until an owner approves a retention window and recovery policy. |
| `archive/feat-newsletter-launch-v1` | `620eec108769e1b0d0394ece6d2773ea782fd346` | 2026-05-19 | 1 / 442 / 12 / 2 | — | Explicit archive save-point; retain until an owner approves a retention window and recovery policy. |
| `archive/ikigai-upgrade-2-2026-W20` | `693d6219164d1405d92a06c7afc94575079475a2` | 2026-05-14 | 1 / 474 / 5 / 0 | #65 | Exact ancestor of archive/ikigai-upgrade-3-2026-W20; retain under the existing archive hold. |
| `archive/ikigai-upgrade-3-2026-W20` | `679c568e2057e5a1dfc43bc72fa07692a45bf039` | 2026-05-14 | 2 / 474 / 5 / 0 | #66 | Explicit archive save-point; retain until an owner approves a retention window and recovery policy. |
| `archive/normalize-line-endings-2026-05` | `06e86e8e3fcc090c08731205cd9582ed5d8bc330` | 2026-05-29 | 1 / 405 / 4 / 2 | #101 | Explicit archive save-point; retain until an owner approves a retention window and recovery policy. |
| `archive/normalize-line-endings-2026-W20` | `de8e4377382486d5fafb30f8ffd1a58686380464` | 2026-05-11 | 1 / 488 / 1 / 0 | — | Explicit archive save-point; retain until an owner approves a retention window and recovery policy. |
| `archive/observability-vercel-cost-2026-W21` | `ee9066a1a137d152f9202601797dc9533177e645` | 2026-05-29 | 3 / 465 / 2 / 1 | — | Explicit archive save-point; retain until an owner approves a retention window and recovery policy. |
| `archive/rails-phase-0` | `7f2e296626e6692f1b51657edbbab9193a948067` | 2026-05-03 | 58 / 643 / 58 / 49 | #46 (merged) | Tree appears in main history via merged #46, but a prior owner hold preserves this named archive snapshot. |
| `archive/recovery-nested-2026-04-20` | `3c6e5b3c9dc137e4af1b369007a2c7e1311ebedd` | 2026-04-14 | 169 / 779 / 681 / 205 | — | Explicit archive save-point; retain until an owner approves a retention window and recovery policy. |
| `archive/staging-madrid-2026-05-25` | `2ac661cc7897d8f2d888438820d02b243517cf4e` | 2026-05-25 | 15 / 763 / 424 / 21 | — | Explicit archive save-point; retain until an owner approves a retention window and recovery policy. |
| `archive/sync-prompt-hub-from-frankx` | `9c71e07a7e47dfd5d02578ee9fc278eb54aaaac5` | 2026-05-16 | 7 / 477 / 19 / 0 | — | Explicit archive save-point; retain until an owner approves a retention window and recovery policy. |
| `claude/ecosystem-audit-strategy-7ovdli` | `1976f761c74079e0581988c1691b816dad829a8f` | 2026-07-01 | 6 / 318 / 86 / 75 | #196 (merged) | Historical strategy/forensic audit; keep until its decisions are reconciled and an owner approves retirement. |
| `observability/vercel-cost-2026-W31` | `6fc9a5fc73ca643539e39cdba225bf7af2fdd3fc` | 2026-07-27 | 1 / 148 / 1 / 1 | #375, #444 | Historical Vercel cost snapshot; keep under the observability retention lane. |
| `observability/vercel-cost-2026-W35` | `83adfecb1729a7545ac4ec69c4528d9bba83e5e4` | 2026-08-24 | 1 / 9 / 1 / 1 | #535 | Historical Vercel cost snapshot; keep under the observability retention lane. |

## NEEDS_SALVAGE — 51

None of these refs should be deleted or merged wholesale. Each holds unresolved intent, unique files, or a decision that has not been closed by an owner. Create thin branches from current `main`, transplant the smallest coherent slice, verify it, then reassess the historical ref.

### Conversion and product — 21

| Branch | Exact tip SHA | Last commit | A/B/R/N | PR ref | Required next action |
|---|---|---|---:|---|---|
| `agent/antigravity/lead-funnels-v1` | `660794fb61e31b26ad1352ad50783e5cf2351e8f` | 2026-08-05 | 15 / 187 / 673 / 576 | — | Extract unique files and intent into a thin current-main PR; do not merge the historical branch wholesale. |
| `agent/book/first-100-hardening` | `60808f3adc8b6f6edd0500533ff694b24ee9724e` | 2026-07-17 | 1 / 150 / 5 / 4 | #334 | Extract unique files and intent into a thin current-main PR; do not merge the historical branch wholesale. |
| `agent/book/r1-cta` | `062b0467288079f434a37b980981852701c4b0e8` | 2026-07-16 | 1 / 159 / 3 / 0 | #384 | All measured touched files are byte-contained in current main, but retain until the CTA/product owner closes the decision. |
| `agent/c940/r1-primary-cta-20260803` | `5f897f3cc962aca469a01a0a17bcb33433a40388` | 2026-08-03 | 2 / 89 / 3 / 0 | #419 | All measured touched files are byte-contained in current main, but retain until the CTA/product owner closes the decision. |
| `agent/claude/agentic-company-offer` | `49be157a2bdabaffdfb57c4977291cc074b942d1` | 2026-07-19 | 1 / 148 / 4 / 3 | #340 | Salvage the offer strategy only; discard the unsafe API implementation. Track through #561 and intake foundation #553. |
| `agent/claude/checkout-revenue-fix` | `85ddd2c5257cd4a034b118cc08abdc023bbf6623` | 2026-08-14 | 3 / 164 / 4 / 0 | #243 | Compare the residual patch with current main and transplant only still-valid intent into a thin PR. |
| `agent/claude/v0-blueprint` | `2fdf3c6fad326d4987873de4c064aa7a6127562c` | 2026-07-18 | 2 / 148 / 7 / 7 | #336 | Research-led rebuild with its successor branch, not a direct merge. Canonical gates are in #562; this tip is an exact ancestor of agent/claude/v0-products. |
| `agent/claude/v0-products` | `7a77f7f5e0d59b43574e109e8f81a8b4d87de6c7` | 2026-07-18 | 3 / 148 / 8 / 8 | #338 | Extract unique files and intent into a thin current-main PR; do not merge the historical branch wholesale. |
| `agent/gemini/agency-swarm-brand-factory` | `0e4f42dc23376688a328cb9f3ae11d83fe711615` | 2026-08-18 | 1 / 41 / 29 / 19 | — | Extract unique files and intent into a thin current-main PR; do not merge the historical branch wholesale. |
| `agent/gemini/auctions-upgrade` | `d08b28d3f6e2a3e742252ce5b3e41f9081935483` | 2026-07-14 | 1 / 188 / 5 / 0 | — | Compare the residual patch with current main and transplant only still-valid intent into a thin PR. |
| `agent/hermes/accelerator-surface` | `df4d6ebb7df8f014326c44dfd57fe8bf8d7d0036` | 2026-07-16 | 1 / 162 / 15 / 12 | #321 | Extract unique files and intent into a thin current-main PR; do not merge the historical branch wholesale. |
| `agent/hermes/commerce-launch-os-20260810` | `cba951e093fcd131811b4bbcc8d06fc698a6dd3c` | 2026-08-10 | 1 / 58 / 7 / 5 | #462 | Salvage commerce in fulfillment-safe stages; do not expose SKUs the webhook cannot fulfill. Canonical intent is #552. |
| `agent/hermes/template-catalog-conversion-foundation` | `fa197bf5a7ee4fbfaeacf1fc61d385bbc8512653` | 2026-07-28 | 1 / 111 / 6 / 4 | #389 | Extract unique files and intent into a thin current-main PR; do not merge the historical branch wholesale. |
| `claude/frankx-freemium-experience-hJuk4` | `03d00ffd14f85c3b16f34dcc5be1bef2ec3887c5` | 2026-06-24 | 2 / 261 / 5 / 0 | #204 | Compare the residual patch with current main and transplant only still-valid intent into a thin PR. |
| `claude/premium-ops-ruxnO` | `118377cb4cdeb86489fd1faff46ee554c5dbfa6a` | 2026-07-02 | 11 / 223 / 20 / 8 | #202 | Extract unique files and intent into a thin current-main PR; do not merge the historical branch wholesale. |
| `codex/connect-authority-production` | `c396afee64d9ae7b3e73d5560a5e0732b76a4a7f` | 2026-07-29 | 2 / 102 / 9 / 1 | #401 | Extract unique files and intent into a thin current-main PR; do not merge the historical branch wholesale. |
| `codex/first-100-weekend-challenge` | `8c1b56ec9cdeaff4efd2c43e37440bf188073dd8` | 2026-07-16 | 5 / 159 / 4 / 3 | #326, #443 | Split the challenge product from commerce hardening; track through #552 and #560. |
| `codex/frankx-constellation-elevation-20260722` | `767eb6805054e7e7556812e76e6b03a0c725729f` | 2026-07-22 | 4 / 146 / 57 / 14 | #352 | Extract unique files and intent into a thin current-main PR; do not merge the historical branch wholesale. |
| `codex/frankx-v0-template-os-production` | `f2449231d92226eac5da46cf1ecb6421739f5992` | 2026-07-22 | 5 / 146 / 75 / 70 | #351 | Extract unique files and intent into a thin current-main PR; do not merge the historical branch wholesale. |
| `feat/ikigai-branding-workshop` | `3760605223ed560ef4d80078e1d5f34b1e282353` | 2026-06-14 | 16 / 763 / 51 / 11 | — | Extract unique files and intent into a thin current-main PR; do not merge the historical branch wholesale. |
| `feat/map-v1-v2-v3-upgrades` | `bc21b3f78c2a586122d0dcbb3ea78c5b9049d35c` | 2026-07-15 | 18 / 215 / 97 / 64 | — | Extract unique files and intent into a thin current-main PR; do not merge the historical branch wholesale. |

### AI, research, and learning — 15

| Branch | Exact tip SHA | Last commit | A/B/R/N | PR ref | Required next action |
|---|---|---|---:|---|---|
| `agent/antigravity/ai-agent-guide-august-2026` | `144296c5c00e56b0aa4373c11ea674ee0c41d18c` | 2026-08-20 | 3 / 18 / 3 / 0 | #513 | Preserve the evaluation framework and table-of-contents shell; current article is #509, canonical follow-up is #558. |
| `agent/codex/family-ai-operating-system` | `2495abb89375960de00451397866e41656284bd2` | 2026-07-13 | 8 / 193 / 135 / 60 | #266 | Extract unique files and intent into a thin current-main PR; do not merge the historical branch wholesale. |
| `agent/codex/frankx-agent-intelligence-20260804` | `a4090f11c586df9dd6b64cd6e3c918e5b91114bd` | 2026-08-04 | 2 / 89 / 56 / 31 | #420 | Extract unique files and intent into a thin current-main PR; do not merge the historical branch wholesale. |
| `agent/codex/frankx-ai-architecture-20260712` | `b0390c677e3b5f154bbf46f03f4c38686c14c7e1` | 2026-07-12 | 1 / 189 / 7 / 0 | #271 | Compare the residual patch with current main and transplant only still-valid intent into a thin PR. |
| `agent/codex/frankx-earbuds-2026` | `28075e655a6db91a4b8393b1c29924061e5cbc91` | 2026-06-26 | 2 / 248 / 62 / 3 | — | Extract unique files and intent into a thin current-main PR; do not merge the historical branch wholesale. |
| `agent/codex/mvu-day8-unhooking` | `0de2c6c90187a22f0d6460c8e76eea08c03bd68d` | 2026-07-27 | 3 / 117 / 11 / 5 | #377 | Extract unique files and intent into a thin current-main PR; do not merge the historical branch wholesale. |
| `agent/codex/qwen-38-release` | `1f6b1d0fcf4b310dc2da1514a8d0d7795e1a50b5` | 2026-08-15 | 3 / 53 / 12 / 2 | #477 | Extract unique files and intent into a thin current-main PR; do not merge the historical branch wholesale. |
| `agent/codex/starlight-retreat-vision-20260714` | `9839055bc741544605eeea8297c2f0e236a5e666` | 2026-07-14 | 12 / 189 / 54 / 33 | #276 | Extract unique files and intent into a thin current-main PR; do not merge the historical branch wholesale. |
| `agent/gemini/tallinn-reconciliation-main-prod` | `56cba889f82f443982246f8bdeb219438b9c6928` | 2026-07-15 | 7 / 185 / 17 / 1 | — | Extract unique files and intent into a thin current-main PR; do not merge the historical branch wholesale. |
| `agent/hermes/arrival-golden-age` | `c926dc13a44fd51dd776251cf5fa13a290bf4949` | 2026-08-11 | 7 / 58 / 14 / 11 | #461 | Rebuild as a thin current-main Arrival slice. Canonical intent is #559. |
| `claude/ai-architecture-templates-65188c` | `f0a6b84b0dcd24b516a5dc6b921afba532d20eb8` | 2026-07-19 | 36 / 150 / 41 / 19 | #210 | Extract unique files and intent into a thin current-main PR; do not merge the historical branch wholesale. |
| `claude/build-llm-research-hub-75ba8` | `b2c78bd1ea83be11eb3f0e8c0cb210bfd1e32c2c` | 2026-07-30 | 8 / 94 / 35 / 23 | #166 | Extract unique files and intent into a thin current-main PR; do not merge the historical branch wholesale. |
| `codex/best-ai-hardware` | `654866ec686c989f472b045fdec1985b672681cd` | 2026-07-15 | 8 / 187 / 42 / 23 | #284 | Extract unique files and intent into a thin current-main PR; do not merge the historical branch wholesale. |
| `codex/openai-devday-resource` | `10600a0aac198e4d5913420625b4464162b6e02b` | 2026-07-03 | 1 / 223 / 17 / 8 | — | Extract unique files and intent into a thin current-main PR; do not merge the historical branch wholesale. |
| `codex/openai-mastery-hub-20260729` | `09ff79fd4416e0fa77d4244e27d41c639dbb70f1` | 2026-07-29 | 2 / 102 / 19 / 9 | #399 | Extract unique files and intent into a thin current-main PR; do not merge the historical branch wholesale. |

### Editorial, identity, and policy — 15

| Branch | Exact tip SHA | Last commit | A/B/R/N | PR ref | Required next action |
|---|---|---|---:|---|---|
| `agent/claude/homepage-music-email-fixes` | `faf6f577bcdac6e6ced64fbf62af4fa21d639eb5` | 2026-06-28 | 2 / 235 / 32 / 1 | #209 | Extract unique files and intent into a thin current-main PR; do not merge the historical branch wholesale. |
| `agent/codex/human-proof-studio-20260730` | `4b39b9c8fca08b009667b71affa884ed4bb03ef8` | 2026-07-30 | 12 / 94 / 57 / 4 | #408 | Mine only the A2A truth and inquiry/privacy slices; do not revive the 57-file reset. Track through #553 and #554. |
| `agent/codex/metadata-integrity-20260725` | `c44bcca9c1630d3c14cbafb90e21362623386800` | 2026-07-25 | 1 / 129 / 18 / 4 | #368 | Extract unique files and intent into a thin current-main PR; do not merge the historical branch wholesale. |
| `agent/hermes/frankx-decision-instrument-20260812` | `ed351cb27bf77287ca4195bc0cb8cb8cf78bc33b` | 2026-08-15 | 3 / 53 / 22 / 18 | #473 | Extract unique files and intent into a thin current-main PR; do not merge the historical branch wholesale. |
| `agent/hermes/frontend-excellence-20260811` | `1c325242815bb58680c684879f03662262468ba0` | 2026-08-11 | 5 / 58 / 1 / 0 | #463 | Compare the residual patch with current main and transplant only still-valid intent into a thin PR. |
| `blog-structure-and-content` | `db113fcebd03f1644522f786a5b070d5bf7bf3c4` | 2026-07-03 | 3 / 223 / 12 / 7 | #221 | Extract unique files and intent into a thin current-main PR; do not merge the historical branch wholesale. |
| `claude/exec-hardening-ruxnO` | `48c6d9eea8791dfcfe0f220eb98fc6da5c14b6f0` | 2026-06-10 | 2 / 325 / 4 / 1 | #168 | Extract unique files and intent into a thin current-main PR; do not merge the historical branch wholesale. |
| `claude/fable-cover-v3-spiral` | `55b75be14d3dc577887fc5302d30e8d69a038ba1` | 2026-07-04 | 1 / 221 / 2 / 0 | #225 | Compare the residual patch with current main and transplant only still-valid intent into a thin PR. |
| `claude/gifted-pasteur-9LsID` | `566ba6a9096f84c25e92c0646476793e70ea480d` | 2026-06-10 | 2 / 330 / 64 / 38 | — | Extract unique files and intent into a thin current-main PR; do not merge the historical branch wholesale. |
| `claude/magnifica-flagship-upgrade` | `893eec29b0d75c55743f0b5e82f94403871a0fd6` | 2026-07-17 | 2 / 149 / 1 / 0 | #335 | Compare the residual patch with current main and transplant only still-valid intent into a thin PR. |
| `claude/multi-agent-newsletter-system-anKSZ` | `88f50d76c094d1410be9de9e0403e09ca7be60a4` | 2026-06-10 | 4 / 435 / 34 / 26 | — | Extract unique files and intent into a thin current-main PR; do not merge the historical branch wholesale. |
| `claude/newsletter-doi-revival-ruxnO` | `d13b90537807e0d8fd91a0c69fd9c22bbc269a65` | 2026-06-10 | 2 / 325 / 10 / 2 | #169 | Extract unique files and intent into a thin current-main PR; do not merge the historical branch wholesale. |
| `claude/remove-personal-info-1DgLs` | `a6a7a7d6a215c7acf58e2c50a68b8df688252ac0` | 2026-06-22 | 4 / 271 / 46 / 2 | #190 | Extract unique files and intent into a thin current-main PR; do not merge the historical branch wholesale. |
| `codex/remove-acos-agentdb` | `89cd89916b0872eddad88a40a5d4c72c3e270433` | 2026-06-18 | 1 / 290 / 2 / 0 | #186 | Compare the residual patch with current main and transplant only still-valid intent into a thin PR. |
| `cursor/three-blog-posts-badd` | `ff083303bd6f06cf40d0e303e7eb2744dfa3d1cb` | 2026-08-17 | 3 / 43 / 3 / 3 | #491 | Extract unique files and intent into a thin current-main PR; do not merge the historical branch wholesale. |

## Branch dependencies and sequencing constraints

| Upstream/predecessor tip | Retained successor(s) | Constraint |
|---|---|---|
| `agent/claude/v0-blueprint` @ `2fdf3c6fad326d4987873de4c064aa7a6127562c` | `agent/claude/v0-products` | Salvage/review as one stack; the blueprint tip is an exact ancestor of products. |
| `agent/codex/tallinn-tribe-studio-20260714` @ `25ea19acd3115209fa8eaceaf360dcc1558e35dd` | `agent/antigravity/lead-funnels-v1`; `agent/gemini/tallinn-reconciliation-main-prod`; `codex/best-ai-hardware` | Recheck ancestry immediately before retirement; never delete all copies in the same cleanup batch. |
| `codex/best-ai-hardware` @ `654866ec686c989f472b045fdec1985b672681cd` | `agent/antigravity/lead-funnels-v1` | Salvage hardware intent before any later retirement of the containing funnel branch. |
| `agent/hermes/ai-architect-studio` @ `de7cd2a03a69259ed0ad51498f63d1a95df06d1d` | open #529 / `agent/claude/ai-architect-hub` | #529 currently carries the exact predecessor; do not retire both together. |
| `archive/ikigai-upgrade-2-2026-W20` @ `693d6219164d1405d92a06c7afc94575079475a2` | `archive/ikigai-upgrade-3-2026-W20` | Exact ancestry exists, but archive policy still wins: keep both until owner-approved retention. |

Recently closed branches also carry issue-level dependencies: #513 → #558; #340 → #561/#553; #336/#338 → #562; #408 → #553/#554; #461 → #559; #462 → #552; #443 → #552/#560; and family-held #382 → #563.

## Staged retirement protocol

1. **Stabilize product work first.** Keep all open-PR and `ACTIVE_DO_NOT_TOUCH` heads intact. Land or close successor PRs with explicit dispositions; do not use cleanup to resolve product disagreements.
2. **Salvage by dependency stack.** Start a fresh branch from then-current `main` for one thin intent at a time. Record source branch + exact tip SHA in the PR body, compare current main, and copy only still-valid code/content/data.
3. **Close the archive policy.** Obtain an owner decision for retention duration, family/human holds, observability snapshots, and recovery branches. Archive refs never enter a queue by inference.
4. **Re-prove DELETE_SAFE live.** Fetch/prune refs and open PR heads again; require the exact recorded tip SHA or re-audit the changed branch. Re-run tree/blob/patch/ancestry proof and confirm no branch became active.
5. **Create a separate cleanup PR.** Only after this audit is reviewed, populate `.github/cleanup-queue.txt` with one approved, dependency-safe stage. Never mix audit changes, product changes, and deletion authorization.
6. **Execute in conservative stages.** Stage A: exact-main and merged-squash rows. Stage B: superseded governance/non-product rows. Stage C: invalid-artifact row after its regeneration ticket is accepted. Stage D: successor-contained predecessors only after containment is re-proved. Observe the workflow result after every stage.
7. **Reconcile after execution.** Confirm each intended ref is gone and every non-target ref remains; immediately clear the queue in a follow-up PR and regenerate this audit from the new remote state.

No step above is executed by this PR. In particular, the cleanup workflow cannot delete branches because `.github/cleanup-queue.txt` is unchanged.

## Review contract for this audit PR

- The diff must contain exactly one path: `BRANCH_AUDIT.md`.
- `.github/cleanup-queue.txt` must be byte-identical to `main`.
- The document must cover all 96 live remote branches: 1 baseline + 15 open heads (including the self-referential audit ref) + 80 classified non-open heads.
- The non-open classification sets must be disjoint and total: 13 + 16 + 0 + 51 = 80.
- Except for the explicitly marked #566 self-reference, any ref, SHA, or PR-state change invalidates the affected row; no deletion action may proceed until the entire live preflight is rerun.
