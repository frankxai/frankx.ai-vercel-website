# Wearable AI implementation and release roadmap

Owner: FrankX editorial / Starlight integration owner to be assigned for product work. Owning issue: [FrankX #1233](https://github.com/frankxai/frankx.ai-vercel-website/issues/1233). Base revision: `baea0d3f51e3e6aed77f7d389f21c1f11b5697e1`. Authority: feature branch and draft PR only. No production promotion or external social publishing.

## Proposed PR sequence

| Work item | Repository / ownership | Acceptance | Dependency |
| --- | --- | --- | --- |
| 1. Editorial + teaching starter (this PR) | FrankX #1233 | Source-bound article; runnable mock; capability CSV; visuals; SEO; free download; documented limits | Local content gates and preview review |
| 2. Native camera adapter validation | Existing Starlight integration package after architecture-owner review | Exact DAT pin; installation, permission denial, disconnect, 10 physical capture runs; byte re-encoding | SDK/device access and allowed use |
| 3. Android projected adapter validation | Same owning runtime, separate adapter | Current template baseline; audio-only fallback; host-phone lifecycle; supported Samsung firmware tested | Current Studio + actual retail device |
| 4. Durable tool-action integration | Existing gateway/memory identity owners | Transactional actor/tenant-bound proposal consumption; scoped real destination; deletion/export; budget reservation | Tenant boundary audit; no new parallel vector database |
| 5. Paid developer-kit release | Starlight product owner; FrankX distribution | Two tested adapters, support/license/refund/tax contract, honest capability support matrix | Customer evidence and exact deliverables before checkout |

Items 2–5 are plans, not created issues or PRs. Create them in the current owning repository after selecting the existing package; do not scatter duplicate wearable runtimes across brands. Merge/release review requires the repository’s accepted provider-review policy and Frank’s publication approval.

## Thirty days from acceptance

| Days | Accountable role | Deliverable | Measurable gate | Stop / adaptation |
| --- | --- | --- | --- | --- |
| 1–3 | Founder | Five operator conversations; one receiving record | Three independently confirm the same costly step | Change buyer/workflow before adding integrations |
| 4–7 | Builder + reviewer | Mock record + explicit local action; fixture set | 20 representative fixtures; rejected consent/replays; no unauthorized action | Fix policy before any external connector |
| 8–10 | Native integration owner | Official Meta camera sample baseline | Reproducible install/build; permissions denied and granted; 10 controlled captures | Phone-only when terms/device access block |
| 11–14 | Android integration owner | Current projected template + audio fallback | Native build and paired-emulator run; no headset API claim; device test plan | Keep Samsung support experimental until tested |
| 15–17 | Runtime owner | Existing identity/memory/tool contracts assessed | Tenant isolation, durable idempotency and budget design accepted | Dedicated tenant pilot if shared scope cannot enforce isolation |
| 18–21 | Product owner | Five consenting users on permitted scope | ≥80% drafts accepted with minor edits; measured latency/cost/corrections | Remove fragile capture dependency or narrow task |
| 22–25 | Product + reviewer | One real destination, deletion/export and recovery | Exact target/payload approvals; tested revocation; no duplicate external records | Do not charge for unbounded support or unreliable actions |
| 26–30 | Founder | Priced offer and delivery contract | Two written paid-pilot commitments, subject to platform clearance | Continue phone-first or sell education, defer hardware-dependent promise |

Calendar targets are relative to the accepted start date. They are not completed milestones. Customer thresholds are proposed decisions, not market statistics.

## Release and measurement

Before editorial approval, recheck Samsung dates/prices, canonical Android distribution, current Meta changelog/publishing/country pages and all media permissions. Keep the article and kit version together. Test the exact PR head, rendered mobile/desktop article, source cards, video fallback, images, FAQ/schema, internal links and downloadable ZIP.

After publication, measure seven-day downloads and tutorial success, 28-day qualified enquiries, and 90-day paid activation/retention. These are measurement plans only; no scheduled automation was created. Do not substitute impressions for a successful user workflow.

Recovery: before merge, close the draft PR to discard the proposal. After an explicitly approved publication, revert its merge commit to restore the previous article/registry/assets; preserve all existing routes. Kit versions must remain immutable and identify their source revision/checksum.
