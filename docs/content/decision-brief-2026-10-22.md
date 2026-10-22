# FrankX content decision brief — 22 October 2026

Decision: finish the existing proof wave and restore observable measurement before increasing publication. All four new PRs are drafts. Production remains at e6e937290a75d6f6e3eff79436d6d9c5b44cf6b8 / READY dpl_6Vfg7RN8vM2L5D6t3TqKTHXcGRGy; no merge, social/newsletter send, paid activation or price change was performed.

## Completed changes

| Draft | Change and evidence | Release status |
|---|---|---|
| [#1085](https://github.com/frankxai/frankx.ai-vercel-website/pull/1085) | Measurement replaces simulated traffic, ranking and opportunity fallbacks with explicit provider states and nullable values. Independent review found and resolved four P2s; 26 behavioral tests pass. Code head 93336942340e92f1da85eeb9baec208cb1d80f45. | Provider configuration and delivered-event verification remain open. |
| [#1084](https://github.com/frankxai/frankx.ai-vercel-website/pull/1084) | Current-main Tella integration preserves Wispr routing/affiliate records and narrows unsupported claims. Full build, TypeScript, lint and eight rendered guide checks pass. Head dc60846bfd39f95d23caa73af5487b0cd3e0ec8d. | Original #1076 untouched. Eight draft candidates do not authorize eight releases. |
| [#1086](https://github.com/frankxai/frankx.ai-vercel-website/pull/1086) | Prevents known withdrawn claims/internal policy from resurfacing through both reading exporters. Failing-before regression; 2 new + 12 existing tests pass independently. Head 1f174388a99a17c81d5a2f0f6dc3a23697290efb. | Bounded fix, not universal publication/security policy. |
| [#1087](https://github.com/frankxai/frankx.ai-vercel-website/pull/1087) | Repairs the stub content-index generator, stale calendar/command wrappers, founder article refresh, blank cost worksheet, unrouted recovery draft/lab/claim ledger, draft visual specifications and two distribution review drafts. Initial implementation head 7e22b0d42aac3cc032596d89ef49499ed38fd40d; subsequent commits contain receipts. | Stacked on #1086; resolve main and all release holds before promotion. |

## Canonical strategy and inventory

The canonical query–intent–reader-job–URL–artifact–CTA map is [content-proof-wave-2026-10-22.md](content-proof-wave-2026-10-22.md). It prioritizes existing voice intent, the current Tella candidate and an original recovery experiment. Demand/volume/rank/conversion fields remain unmeasured hypotheses. No new persona spokes were commissioned.

The rebuilt shadow contains **277 canonical root-MDX blog source records plus 29 retained non-blog records**. These are source records, not 277 verified live/indexed pages. The nine Wispr/voice surfaces independently returned 200 with matching canonicals and index/follow robots; browser review followed the guide to the architect article. Notion reconciled nine published voice assets and four draft PR candidates without altering the prior 54 records; original Tella key/history remains intact. Final reconciliation totals 15 new Pieces records (including the durable commission and existing founder source) and two prepared Repurpose Queue records; Tella was also updated in place. Published source and pending refresh remain separate.

Pipeline: #978 remains behind main despite earlier successful checks/READY preview; #930 has a failing editorial gate and depends on open lab #5; #1028 conflicts and mixes editorial/download/commerce scope; #968 is closed without merge; #905 remains open and holds publication. No sitemap/deployment/source state is treated as Google indexing.

## Measurement truth and exact blockers

- GSC Wizard is installed and exposes GSC plus GA4 tools, but its property read returned `subscription_required`; further retries stopped. No ranking, click, impression, AI citation or conversion baseline was obtained.
- Vercel Web Analytics returned 404 for the exact project/team. No activation is inferred from an installed package.
- Environment metadata listing returned 403 forbidden; no decryption requested. The Vercel CLI fallback is not installed. Provider property/stream/hostname mappings and permissions therefore remain unverified.
- One production pageview and useful conversion have **not** been traced through a provider. DNT/GPC suppression tests pass; live preview exclusion, identity, timezone, settled dates and freshness still require the configured read path and delivery receipts. The setup contract is in #1085 at `docs/observability/GOOGLE_SETUP_GUIDE.md`.

## Actual verification and reviews

Editorial: full `CI=1 pnpm run build` passed (1,493 static pages; four postbuild checks), TypeScript and lint pass (eight existing warnings), strict language audit passes. Local `merge:gate` exits 0 using the existing managed production-server helper: 15 pages/492 unique internal URLs, zero 404s, five existing redirect warnings. Workflow smoke checks were **skipped** because no portable workflow fixtures exist; skipped checks are not validation. Tella builds 1,501 static pages and passes four postbuild checks. Measurement full TypeScript/lint pass; its local build was killed with exit 137 during concurrent compilation and is not called passing. Its generated-reading failure is addressed separately by #1086.

Independent review resolved measurement whitespace/shape/null/race errors and authored MDX/provenance/reproducibility defects. The recovery lab passes three subprocess cases plus independent negative reconciliation checks. It is an offline sequential Python/SQLite teaching model; no Vercel package, model, cloud queue, concurrent-worker reliability or operating costs were measured.

Article/visual validators pass **DRAFT**, not APPROVED. The visual package has exactly three concepts, source-traced Mermaid specifications and six explicitly planned roles. Approved rendered assets, responsive captures and independent flagship art/rights/responsive approvals remain incomplete; no media was promoted.

Vercel's `scripts/should-deploy.sh` intentionally skips drafts: Tella deployment dpl_CwuqRggtJv6SAVYcVyVjDRDbVY4R was CANCELED by the ignore step. Exact-head preview/mobile review is not completed and no override was used. Major remote CI/contract/media/merge checks are skipped on drafts; Surface Guard/scan success does not replace them. See dated evidence JSONs for snapshots.

## Distribution and learning

[Newsletter](distribution/voice-briefs-2026-10-22/voice-newsletter.candidate.md) and [LinkedIn](distribution/voice-briefs-2026-10-22/voice-linkedin.candidate.txt) are independently reviewed drafts from `blog-voice-prompting-for-ai-architects`, with clean canonical bases and channel UTMs. One reviewer applied editorial and ICP perspectives; these are not two independent reviewers. Founder treatment selection, actual previous-two/60-day history and publication approval remain pending. LinkedIn runtime supports profile search, not post-history retrieval; old repository drafts cannot establish what was published.

For the 21 October voice release: T+0 delivery/crawl/event check remains incomplete; T+7 is 28 October, T+28 is 18 November, T+90 is 19 January 2027. These are recorded checks, not scheduled automations. Keep discovery, qualified engagement, completed useful actions and verified commercial outcomes separate.

Learning: provider failure must survive through dashboard/CLI/API as unavailable; a successful wrapper response is insufficient. Regenerators must honor known editorial drops; tests should run after regeneration. A source inventory needs provenance and cannot serve as a deployment/indexing receipt. Reproduction instructions and source paths are part of the reader's artifact, not optional editorial administration.

## Prioritized next-week queue

1. Verify configured GA4/GSC identity and permissions, hostname/stream scope, production exclusion and one allowed pageview/useful action; obtain a settled baseline. Keep #905 open until that evidence exists.
2. Activate the existing Wispr cluster through approved distribution and the 28 October observation. Expand only on qualified engagement/action evidence or clear delivery defects.
3. Finish Tella flagship/disclosure/pricing/delivery reviews; select at most two canonical owners, plus the prepared founder refresh, for the initial release decision.
4. Run a version-pinned durable-harness integration under an authorized environment/budget, or explicitly narrow the commission to the offline model; finish the visual/release gates.
5. Research notes only: Claude's 21 October API/SDK migration, Gemini's 20 October small-business tools and OpenAI's 21 October Ads expansion. Each needs an original migration/comparison/measurement artifact and an existing-canonical overlap check before a new article. No paid campaign activation.

Google's 21 October sharing-controls documentation update is a clarification, not a ranking announcement. Current primary guidance does not support mandatory question headings, special AI schema or llms.txt ranking benefits. The latest listed ranking incident is the September spam update; no causal effect on FrankX is inferred. Primary sources and event dates are recorded in the canonical strategy.

## Resume prompt

```text
Activate $frankx-content-intelligence and $improve-outcome-loop with @GitHub @Vercel @Notion @GSC Wizard. Resume PRs #1084–#1087 and docs/content/decision-brief-2026-10-22.md in frankxai/frankx.ai-vercel-website. Re-resolve current heads/production/instructions before edits. Continue bounded independent specialist lanes, preserving review receipts and each unresolved gate. Load $write-like-frankx for copy, $govern-media-fabric for visuals and $frankx-social-studio for distribution. Restore real provider/event evidence first; stop GSC subscription retries. Complete authorized corrections and reviews; do not mark draft/skipped/canceled checks passed or publish/send/incur charges without applicable authority. Use the existing canonical map, Notion lifecycle records and source IDs; do not create another planning system.
```
