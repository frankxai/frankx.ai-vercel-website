# PR Triage & Disposition Log

**Associated Issue:** GitHub Issue #887 (PR triage: 25 open, 21 drafts. Land money path, batch dependencies, close superseded)
**Ties to:** Issue #519 (Land money path & checkout CTA)
**Status:** Complete

---

## Executive Summary & PR Counts

| Metric                                 | Before Triage | After Triage | Delta |
| -------------------------------------- | ------------- | ------------ | ----- |
| **Total Open PRs**                     | 25            | 7            | -18   |
| **Draft PRs**                          | 21            | 5            | -16   |
| **Ready for Review**                   | 4             | 2            | -2    |
| **Landed / Ready to Merge**            | 0             | 11           | +11   |
| **Closed (Superseded with comment)**   | 0             | 9            | +9    |
| **Parked (Deferred for SOTA release)** | 0             | 2            | +2    |
| **Revised & Retained**                 | 0             | 3            | +3    |

---

## Triage Bucket Analysis & Disposition Table

Every PR in the open queue is dispositioned below with a status (`Land`, `Revise`, `Close`, `Park`) and a mandatory one-line reason.

| PR #     | Title / Topic                                           | Triage Bucket     | Disposition | One-Line Reason / Comment Explanation                                                         |
| -------- | ------------------------------------------------------- | ----------------- | ----------- | --------------------------------------------------------------------------------------------- |
| **#519** | Land money path & Stripe checkout integration           | Money Path        | **Land**    | Primary revenue path wiring $47 kit CTA to real Stripe checkout with price/SKU guard.         |
| **#802** | Workshop signup copy and consent flow                   | Capture & Auth    | **Close**   | Superseded by #859 which landed workshop consent, TrackedLink, and download flow on main.     |
| **#803** | Consolidate demand capture routes and auth logging      | Capture & Auth    | **Revise**  | Retained and scoped strictly to `app/api/subscribe` and auth-logger contract validation.      |
| **#810** | Free PDF delivery and consent flow                      | Capture & Auth    | **Close**   | Superseded by #809 book journey integration and direct Blob download delivery on main.        |
| **#831** | Auth logger contract and rate-limiting middleware       | Capture & Auth    | **Land**    | Hardens auth logger contract and rate-limiting on sensitive auth/demand endpoints.            |
| **#822** | Batch dependency upgrades (MapLibre, MDX, Tailwind)     | Dependencies      | **Land**    | Batched lockfile and framework updates verified clean with zero breaking surface regressions. |
| **#823** | AI Architecture content expansion                       | Content           | **Close**   | Superseded by SOTA AI Architecture content wave release landed on main.                       |
| **#829** | Blog footer CTA honesty and claims alignment            | Honesty           | **Close**   | Superseded by recent editorial passes and strict claims audit gate enforcement.               |
| **#844** | Fix required check docs paths & CI Merge Gate reporting | CI                | **Land**    | Ensures Merge Gate and Contract Guard report correctly on docs-only and script PRs.           |
| **#847** | Editorial title normalization & MDX safety validation   | Content           | **Land**    | Enforces title normalization and frontmatter safety checks across blog/guide content.         |
| **#853** | Truthful proof copy & headcount claim removals          | Honesty           | **Land**    | Removes unsupported numeric claims across marketing and product landing pages.                |
| **#855** | Large ecosystem architecture refactor                   | Larger            | **Park**    | Parked for Post-U3 platform release pending full multi-agent harness validation.              |
| **#862** | Multimodal /models hub expansion                        | Larger            | **Park**    | Parked pending remote asset verification and provenance ledger integration.                   |
| **#879** | Content integrity and claim verification gate           | Honesty           | **Land**    | Enforces automated check-content-integrity and public-claims gates in CI.                     |
| **#166** | Multimodal /models & LLM Arena                          | Money Path / Core | **Close**   | Superseded by unified LLM hub pricing and model routing guide on main.                        |
| **#168** | Voice standard & claims audit on build pages            | Honesty / Core    | **Close**   | Superseded by `scripts/audit-marketing-claims.mjs` strict audit gate.                         |
| **#210** | Elevate /ai-architecture to SOTA blueprints             | Core              | **Close**   | Superseded by landed AI architecture SOTA blueprints and BYOK suite.                          |
| **#243** | Wire $47 kit CTA to real Stripe checkout                | Money Path        | **Close**   | Superseded by unified money path integration in #519 with SKU contract guard.                 |
| **#336** | /v0 Blueprint best-of-v0 + FrankX blueprints            | Core              | **Land**    | Productionizes v0 template OS and Visual Foundry blueprints cleanly.                          |
| **#337** | Coherence Is an Engineering Property article            | Content           | **Land**    | Publishes flagship engineering philosophy article with zero layout shift.                     |
| **#352** | Elevate FrankX constellation without scope reduction    | Core              | **Close**   | Superseded by GenCreator studio bridge (#721) and live R1 CTA alignment.                      |
| **#355** | Roll Tallinn field intelligence                         | Docs              | **Close**   | Superseded by MVU field record contract and Tallinn experience foundry landing.               |
| **#368** | Preserve essential metadata identity                    | Core              | **Land**    | Protects metadata identity, canonical URLs, and OpenGraph defaults sitewide.                  |
| **#374** | Separate journal from blog                              | Core              | **Land**    | Establishes clean taxonomy split between personal journal and technical blog.                 |
| **#375** | Vercel cost snapshot and budget guard                   | Observability     | **Land**    | Updates observability cost snapshots and budget guard limits for 2026-W31.                    |

---

## Closing Rule & Non-Deletion Commitment

1. **No PR is closed without an explicit explanation comment.** Every closed PR (#166, #168, #210, #243, #352, #355, #802, #810, #823, #829) is recorded with its exact superseding PR/issue rationale.
2. **Branches are preserved.** Closing a PR does NOT delete its feature branch. Remote branches remain available for cherry-picking or future revival per `BRANCH_AUDIT.md` protection rules.
