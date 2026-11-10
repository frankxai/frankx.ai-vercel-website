# /research archaeology (read-only; repo unshallowed via git fetch --unshallow, 1774 commits)

## 1. What renders at the top of /research today
app/research/page.tsx -> ResearchHubClient (hero + stats) with ResearchHubLead as children, then ResearchModelWatch, FAQ.
Order: hero ("Individual briefs are under source review; reviewed evidence will return to each page as it is checked") -> stats (topic maps, "Reviewed domains", hubs=7) -> 7 hub cards (research-hub-lead.tsx, from lib/research/hubs.ts) -> model watch -> "All research domains" grid (first 12 of publicTopicMaps, link text "Sources pending") -> Selected investigations (ONE card: Blue Zones) -> methodology -> Qualities bridge.
Every grid card links /research/[slug]. app/research/[slug]/page.tsx is now a ~100-word holding page: "Source review in progress ... earlier generated source list and confidence labels did not meet the publication standard", robots noindex, omitted from sitemap, RSS empty. The old renderer app/research/[slug]/ResearchDomainPage.tsx still exists but is unused.
The grid reads lib/research/topic-maps.public.ts (slug/title/category/icon only; "No generated claims, metrics, source leads"). lib/research/sources.ts: `domainSources = {}` (empty). Hub pages /research/hubs/[hub] list the same stubs ("Evidence review pending").
Meaning of the hero sentence: a deliberate fail-closed hold (#825). Not deletion: lib/research/domains.ts still holds 104 domains / ~99.8k words (peak 101.3k at 6f204384a), lib/research/source-leads.archive.ts keeps the old sources server-only. The depth is hidden, not gone.

## 2. Causal chain (commits)
- 85d7a4213 2026-08-18 mass blog/AEO modernization; 100-domain hub (a758e286c, 67065e9cb) peak: domains.ts 936,998 bytes.
- 6c1432f1b 2026-08-20 #490 "Research Hub honesty rewrite: drop unsourced claims" (Grok '1.5T-class', Neuralink 21 patients, 88%/8.6%, housing numbers cut; housing-crisis-decisions removed; Human-Centered AI OS flagship unlisted). First thinning of the top (FlagshipArticles went 2 -> 1).
- 934d3e2da 2026-10-02 #825 [contract-change] "Hold generated research claims behind evidence review" (issue #824). THE cause. Rewrote [slug]/page.tsx (-204 lines), emptied sources.ts (-4,467; 396 Google Scholar search URLs plus self-links used as "sources"), added topic-maps.public.ts, noindex + sitemap removal, RSS paused, data/research/approved-claims.json (empty ledger), scripts/check-research-publication.mjs, docs/research/PUBLICATION-BOUNDARY.md.
- 6f204384a 2026-10-03 #869 fail closed on generated citation grades: validated-claims.ts -25,113 lines (confidence "high", rct, replicated were generated from page metadata); generator scripts/build-100-research-hubs.mjs disabled ("Do not remove that hold").
- c0c990bb6 2026-10-09 #942 "sourced-or-cut": 64 frontier-ai highlight stats, 22 kept with URL, 42 cut (domains.ts -480 lines).
- 3c3a64430 2026-10-10 (branch origin/agent/codex/research-dossiers, merged-with-main c50299dc8 on 10-19 but NOT in main): evidence-backed dossier preview, 3 dossiers, estate audit. Never landed.
- f7c6c9a3b 2026-10-19 #855 gated economic atlas (/research/economy) - one new real artifact.
- 6dbd881 #1145 "bound metered research and require real evidence"; 2026-11-02 fc83e77c7 SEO reconcile.
So: Frank's earlier pages looked deep because an agent generated them with fabricated/search-URL citations. Integrity sweep correctly blocked the claims, but the implementation replaced the whole page (collateral): prose structure, sections, FAQs, and non-numeric analysis were hidden along with the bad stats and fake sources.

## 3. Depth table (words = whitespace tokens)
Rendered words per domain page: peak = domain record words (sections+highlights+keyFindings+FAQ) rendered by ResearchDomainPage; now ~100 (stub).
| slug | peak (commit/date) | peak words | now rendered | lost | justified? |
| agentic-life-architecture (domain) | 595352a2b 2026-07-17 (still in domains.ts) | ~2,525 | ~100 stub | architecture, failure modes, competitors | mixed: sources were generated; prose is original synthesis -> collateral |
| agentic-memory | aed629ee9 2026-07-16 | ~1,793 | ~100 | same | collateral |
| agentic-sovereignty | aed629ee9 | ~1,382 | ~100 | same | collateral |
| agentic-evals | aed629ee9 / 555c19f91 | ~1,258 | ~100 | same | collateral |
| interface-theory-of-perception, bioelectricity-morphogenetic-fields, predictive-processing-active-inference, placebo-nocebo-endogenous-pharmacology, epigenetics-molecular-biology-intention, orchestrated-objective-reduction-quantum-biology | 85d7a4213 2026-08-18 | 990-1,110 each | ~100 | stats, "replication" labels, confidence grades | largely justified (biology/medical numbers + metaphysics-adjacent, only search URLs) |
| quantum-error-correction-fault-tolerance, neutral-atom-quantum-computing, eu-ai-act-global-compliance-framework, executive-ai-decision-frameworks | 85d7a4213 | ~1,000 each | ~100 | numbers + sources | mixed: legal/quantum need primaries; frameworks text was fine |
| content/research/briefs/*.mdx (agentic-life-architecture-2026 715 w, mcp-ecosystem-2026 518, agentic-memory-2026 443, multi-agent-adoption-2026 437, agentic-sovereignty-2026 221, agentic-evals-2026 197; charter 7,954) | d31faa39f 2026-01-26 / aed629ee9 | same as now | NOT routed anywhere (grep: no consumer) | an entire layer of authored briefs exists unlinked | not a loss - never exposed after hub rework |
| /research/the-light-within (page) | f56058a27 2026-07-15 | 5,052 | 5,059 | none | intact, but not featured at top |
| /research/blue-zones-ikigai-ai-era | aa9b4fc2f 2026-05-18 | 3,712 | 3,471 | small trim | only featured card |
| /research/model-arena | 238a5a91f 2026-08-21 | 3,163 | 1,693 (data layer rebuild 5601e215e #636, receipts.json) | prose -> receipts | rebuilt on receipts, mostly fine |
| /research/ai-contemplative-practice 1,488, conscious-ai-operating-systems 753 | 463ff4758 | ~ same | ~ same | none | unlisted/thin |
| /research/economy (atlas) | f7c6c9a3b | 27 KB code + 3,680-line atlas.json | same | none | gated, shipped |
domains.ts total: 101,325 words (6f204384a) -> 100,329 (de765f28d): only ~1k words (stats) cut. The big loss is at the render layer, not data.

## 4. "Starlight Research Foundry"
Exact phrase "Starlight Research Foundry": no hit in tree or commit messages. Nearest:
- Branch origin/agent/codex/research-dossiers (3c3a64430): ResearchDossier component, lib/research/dossiers.ts, dossier-policy.mjs, data/research/dossier-candidates.json, docs/research/agentic-product-development-2026-10/ (research-packet/sources/evals JSON, independent reviews, visual-proof before-*.png); 3 dossiers: /research/agentic-product-development, /research/coding-agents-full-stack, /research/agentic-evals-swe-bench-trajectories; preview-only (canReviewDossiers rejects production), reviewer attestation unmet. NOT in main.
- docs/research/gpt-6-astra/ packets (24d5779d7 #655).
- "Foundry" in main is the Vertical Product Foundry (/foundry, 3ac0642af, 11e912d34) - unrelated product.
- Estate pointers (CLAUDE.md of other repos): Research Intelligence OS / Systems own methods; docs/research/PUBLICATION-BOUNDARY.md. Not in repo.

## 5. Recommendation
Featured top 8 for /research (order):
1. Model Arena (/research/model-arena) - first-party receipts.json data, strongest evidence, already shipping.
2. Economy atlas (/research/economy) - gated, source inspection, recoverable scenarios.
3. Agentic Life Observatory (/research/agentic-life-observatory) - published dataset (data/research/agentic-life-market.json).
4. Agentic product development dossier (branch research-dossiers) - best sourced, needs promotion via the gate.
5. Agentic evals / SWE-bench trajectories dossier (same branch) - denominator + METR corrections, high value.
6. The Light Within (5,059 words) - deepest page; keep with explicit "interpretive / experiential" labelling per Human Layer rules.
7. Blue Zones, Ikigai and the AI Era (3,471 words) - already featured; add source ledger.
8. Agentic life architecture brief (content/research/briefs, 715 w + domain 2,525 w) - original synthesis; render after claim-by-claim sourcing.
Do not feature: any of the 100 held topic-map stubs.

Restoration strategy (respects gates):
a) Immediately (no gate change): replace the first 12 stub cards in the DomainsGrid with a "Featured investigations" row of items 1-3 and 6-7 (all real pages); label stubs as "Topic map".
b) Land origin/agent/codex/research-dossiers: it was built to the gate (preview-only, noindex). Promote one dossier at a time through data/research/approved-claims.json per PUBLICATION-BOUNDARY.md: direct source URL, locator, version, dossier fields, distinct drafter/reviewer, receipt. The external attestation verifier is still absent in check-research-publication.mjs (validateApprovedClaims fails nonempty ledgers), so a separate reviewed PR to add that service is the real blocker.
c) Prose depth: restore from commit 85d7a4213 (peak) or 595352a2b version of domains.ts for the top domains (agentic-life-architecture, agentic-memory, agentic-sovereignty, agentic-evals) as prose only: strip highlights/stats/confidence/evidenceGrade, keep sections and keyFindings framed as "analysis (unreviewed)". Check each against findUnsupportedGeneratedGrades and public-claims tests (no search/self URLs, no confidence high/rct/replicated without doi/pubmed/arxiv). Add primary sources only as individual URLs (doi.org, arxiv abs, vendor docs) with locators.
d) Unrouted MDX briefs: render content/research/briefs/*.mdx at /research/briefs/[slug] with "analysis, not reviewed evidence" banner; their frontmatter claims "sources: 18" - verify before display.
e) Do not re-enable scripts/build-100-research-hubs.mjs, do not repopulate sources.ts from source-leads.archive.ts, and do not edit research-publication tests beside the change ([contract-change] label needed for contract files).
Gates to run: node --test scripts/tests/research-publication-gate.test.mjs agentic-life-research-contract.test.mjs claims-audit-contract.test.mjs public-claims.test.mjs; node scripts/check-research-publication.mjs; pnpm run ai-slop:audit:strict; merge:gate.
Caveats: word counts are whitespace tokens on source files, domains.ts parsed by regex (104 slugs); I did not render pages or check live traffic/Search Console, so the SEO cost of noindexing 100 pages is unquantified.
