# Apify research resource: editorial brief and evidence

State: DRAFT. Prepared 13 November 2026. Publication authority: draft only.
Content ID: `cnt_frankx_apify_mcp_actor_api`. Owner: FrankX editorial/product lane.

## Decision and scope

Serve a founder or AI architect deciding how an agent should retrieve repeatable,
source-linked web evidence. Deliver one comparison article, an offline request
planner, an evaluation contract and a starter-kit specification. No Actor runtime,
new MCP server, scheduler, checkout or production route is introduced.

The thesis is architectural judgment: use a deliberately restricted MCP tool set
for interactive discovery, and an explicit Actor API lifecycle for recurring jobs.
Both need admission, bounded execution, evidence validation and human review.
This recommendation is an inference from the documented interfaces, not a measured
speed, quality or price comparison.

Reader delta: construct the same bounded input through either interface, distinguish
a successful process from accepted evidence, and account for cost without confusing
prepaid usage, affiliate commissions and spend authorization.

## Reconciliation

- Website base: `baea0d3f51e3e6aed77f7d389f21c1f11b5697e1`.
- The existing `data/affiliate/programs.json` has no Apify record at that base.
- Existing PR #1224 owns three adjacent web-data/Actor-monetization essays. Preserve
  its work. This guide owns interface choice, reproducibility and research receipts;
  it does not duplicate Actor monetization or claim to operate the whole web stack.
- #1175 owns the single partner registry; #1149 owns evaluation evidence; #1174
  owns disclosure/attribution. Reuse `AffiliateLink`, `/go/[slug]`, the sponsor
  freshness check and privacy-aware tracking. Do not create another catalog.
- Keep the manuscript under `content/blog/_drafts/`. `lib/blog.ts` enumerates only
  immediate `.mdx` children of `content/blog`, and `getBlogPost` reads that same level.
  A `published: false` flag alone is insufficient protection in this loader.
- The new product is a specification proposal, not an admitted SKU or live offer.
  Existing studio/catalog/fulfillment owners must admit it before a sale or listing.

## Frozen source and claim ledger

All sources below were inspected on 2026-11-13. Recheck volatile facts within seven
days before publication, and immediately after a schema, permission or price change.
Publisher for A1–A8 is Apify. Public links are evidence, not affiliate destinations.

| ID | Source | Supported claim | Type and boundary |
| --- | --- | --- | --- |
| A1 | https://docs.apify.com/mcp | Hosted Streamable HTTP/OAuth; selectable tools; `call-actor` returns run/storage metadata; results require dataset retrieval | Documented capability, no client connection or invocation proved |
| A2 | https://docs.apify.com/api/v2/actors-runs-post | Asynchronous POST, numbered builds, timeout, memory, `maxItems`, `maxTotalChargeUsd`, limited-permission override | Current endpoint docs; API says total-cost cap applies across pricing models |
| A3 | https://docs.apify.com/api/v2/actor-run-get | Poll by run ID; final statistics/costs can lag completion; authenticated requests expose cost fields | A terminal response is not final billing reconciliation |
| A4 | https://docs.apify.com/api/v2/dataset-items-get | Dataset retrieval, pagination and field selection | Fetch limits do not cap the producing run |
| A5 | https://docs.apify.com/api/v2/actor-run-abort-post | Explicit abort endpoint | Local HTTP cancellation does not establish remote cancellation |
| A6 | https://docs.apify.com/platform/actors/development/permissions | Limited/full permission distinction; limited Actors can invoke other limited Actors | Limited permissions do not equal a total mission spend or network restriction |
| A7 | https://apify.com/pricing | Monthly Starter $19 with $19 prepaid usage; $0.20/CU; usage and event models, storage/transfer charges | Public monthly USD quote; not this account's plan or an all-in run quote |
| A8 | https://docs.apify.com/legal/affiliate-program-terms-and-conditions | Public referral terms and advertising restrictions | Not evidence of this account's tier, payout or usage credit |
| A9 | https://apify.com/apify/rag-web-browser | Actor identity `apify/rag-web-browser`, ID `3ox4R101TgZz67sLr`, input schema and tiered event prices | Metadata inspected through connected Actor-details tool; no run. Modified 2026-10-28. Output schema is inferred, not a stable guarantee |

The A9 metadata quote has BRONZE fetched-page $0.0019, search-result $0.0029 and
Actor-start $0.000225 per memory GB (minimum one event). A displayed pricing tier
does not prove execution entitlement. The manuscript labels all arithmetic examples
as hypothetical and leaves measured cost, elapsed time and output quality unknown.

### Interface discrepancies to preserve

The exposed `call-actor` schema still describes `maxTotalChargeUsd` as pay-per-event
only, while A2 describes an all-pricing-model API cap. Use the inspected pay-per-event
Actor for the example, recheck the installed MCP schema, and do not promise universal
MCP billing protection. `maxItems` caps billed items for pay-per-result Actors; it is
not a general crawl or output limit. `maxResults` is Actor-specific and, for the
example Actor, ignored when the query is a direct URL because that path fetches one URL.

### Starlight verification boundary

Source inspection establishes an existing operator-gated mission entry, a read-only
researcher with saved-evidence search and an allowlisted browser reader, tenant-scoped
retrieval, kill switches and a fail-closed budget-ledger interface. It does not prove
those features are enabled in the deployed environment or integrated with Apify.

The checked-in agent-plane configuration makes D1 a receipt index and Supabase the
budget authority. Extend that ledger for Apify reservations after runtime-owner review.
Do not turn a proposed D1 reservation ledger into a second spending authority. The
mission-control front door and agent-plane workflow are distinct source surfaces;
no source-inspected end-to-end link between them and Apify has been proved.

Private source revisions, policy hashes, account observations and infrastructure
details belong in the private coordination receipt. This public packet contains
only a sanitized architectural interpretation; no private code, correspondence,
account IDs, secrets or contact details are copied here.

## Commercial and rights decisions

Affiliate enrollment and the exact issued referral destination were checked against
private first-party evidence. Preserve that evidence privately. Stage one Apify
record in the existing registry with `status: hold`, `ourLink: null`, and the issued
URL in `candidateUrls`. This records enrollment without activating referral traffic.
Do not quote an account-specific rate, earnings, discount or awarded test credit.

Proposed article disclosure: “FrankX is an Apify affiliate. I may earn a commission
when you subscribe through a referral link, at no extra cost to you. This guide is
based on documentation, source inspection and synthetic fixtures. No live Actor
benchmark is reported, and no vendor-provided test credit was used for it.”

Code is original teaching material under the repository's existing reserved-rights
license. No new redistribution license is granted by this draft. Third-party source
content remains with its owners; storage and redistribution need separate rights.

## Search and acceptance

Primary query: `Apify MCP vs API`. Related intent: Actor API cost controls, MCP
research agent, Actor run provenance. No search-volume or ranking evidence obtained.
Proposed canonical: `https://frankx.ai/blog/apify-mcp-vs-actor-api` after approval.
Use the existing Article schema; visible FAQ only, no promised rich-result eligibility.
Internal links: `/ai-architecture`, `/resources/seo-aeo`, `/affiliates`.

Accept this draft when the comparison is source-linked, the example runs offline,
synthetic evidence cannot pass for a live result, the registry remains held, and
the starter-kit spec defines buyer value, delivery, failure/recovery and economics.
Independent exact-head review, live pilot evidence, governed final visuals, preview
inspection and Frank's approval remain release gates. This draft does not claim them.
