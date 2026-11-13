# Apify product lane: maker verification and release handoff

Prepared 2026-11-13. State: DRAFT, with release gates pending.
Maker: OpenAI Codex. Independent verifier: not yet assigned or completed.
Website base: `baea0d3f51e3e6aed77f7d389f21c1f11b5697e1`.

## Reviewable outputs

| Artifact | Location |
| --- | --- |
| Article | `content/blog/_drafts/apify-mcp-vs-actor-api.mdx` |
| Editorial/source ledger | `docs/ops/apify-product-lane/brief-and-evidence.md` |
| Machine-readable article packet | `docs/ops/apify-product-lane/article-packet.json` |
| Product specification | `docs/ops/apify-product-lane/starter-kit-spec.md` |
| Evaluation contract | `docs/ops/apify-product-lane/evaluation.template.json` |
| Task envelope | `docs/ops/apify-product-lane/task-envelope.json` |
| Offline planner, fixture and tests | `examples/apify-research/` |
| Held enrollment record | `data/affiliate/programs.json` |

## Executed checks

| Check | Observed result |
| --- | --- |
| Dependency install from lockfile | Completed; no dependency/lockfile change retained |
| Offline planner suite | 6 tests passed; no live Actor run |
| Affiliate destination + tool-record + public-claims tests | 175 tests passed on the draft; focused affiliate test rerun passed after adding final `/go` fallback assertion |
| Full affiliate suite | 29 tests passed, including final held-referral and `/go` fallback assertion |
| Article packet validator | Passed at DRAFT; blocked review and visual fields are retained |
| MDX compilation with GFM | Passed; draft title 50 characters, description 153 |
| Internal article routes | 3 resolve in source |
| Draft exclusion | Immediate blog enumeration and direct lookup cannot select the nested draft |
| Changed-copy editorial audits | Local signal score 0; pinned shared language policy: zero hard failures/review signals on changed content/data lines after fixing a remote finding |
| `pnpm run type-check` | Passed |
| `pnpm run lint` | Passed with 12 warnings in unchanged files, zero errors |
| `pnpm run ai-slop:audit:strict` | Passed; 2685 files scanned, zero hits |
| `pnpm run claims:audit:strict` | Passed |
| MDX safety, content integrity, publish-hold checks | Passed; existing large-hero warnings remain outside this change |
| `CI=1 pnpm run build` | Failed: process killed during optimized compilation, exit 137. No completed build or rendered preview is claimed |
| `git diff --check` | Passed |

Prebuild regenerated unrelated indexes and changed a vendored file's executable
bit; those generated changes were removed from this candidate. No application,
component, infrastructure configuration, dependency or live publication path changes.

## Release decision

Keep the manuscript in `_drafts/` and the registry at `status: hold` with no active
`ourLink`. The issued destination is staged only as a candidate. Existing sponsor
and `/go` logic remains responsible for expiry, link qualification and privacy-aware
click recording. Marketing click ingestion and conversions were not exercised.

The artifact is a technical/editorial draft with a runnable offline example. It
does not establish successful Actor execution, live storage ingestion, runtime
budget enforcement, account entitlement, comparative latency, quality, revenue,
awarded platform credits or customer acceptance.

Before release, the runtime lane must supply a separately authorized real mission
with run/dataset IDs, retained evidence, all-attempt costs and human acceptance.
Resolve numbered build/schema and permission checks, actual orchestration/bindings,
single budget authority, current prices, final schema discrepancy, independent
exact-head review, governed visual/OG/mobile treatments, code reuse license and
completed build/rendered preview. Frank approves publication and referral activation.
No paid execution or publication permission is sought by this draft itself.

Recovery: close the draft PR or revert its isolated changes. No deploy, storage
migration or provider-side rollback is required by the work performed here.

## Source confidentiality

Private Registry, Starlight source and correspondence were inspected through the
authorized connections. Full source refs and loaded-policy hashes are recorded in
the private coordination receipt. Public files carry sanitized judgments and
public vendor sources. No private records, raw email, account IDs, secrets, contacts
or third-party scraped content are included.
