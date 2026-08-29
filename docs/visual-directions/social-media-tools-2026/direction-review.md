# Social Tool Intelligence — visual direction review

Date: 2026-08-28
Surface: `/tools/social-media` and its first two canonical articles
Audience: solo founders, creator-led brands, developer/API brands, agencies, and enterprise social teams

## Decision

Selected: **Direction 02 — Decision Atlas**.

It best resolves the user job: “Which system can my brand actually operate?” The interface starts with brand shape and operating constraints, then reveals a recommendation, viable alternative, plan gate, and 30-day proof condition. It retains the exact pricing, evidence classes, and official documentation of Direction 01 underneath the route.

| Direction | Decision utility | Editorial distinction | Mobile integrity | Accessibility | Feasibility | Weighted score |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 01 — Evidence Console | 9.2 | 7.6 | 8.2 | 9.1 | 9.4 | 8.7 |
| 02 — Decision Atlas | 9.6 | 9.5 | 9.3 | 9.0 | 8.9 | **9.4** |
| 03 — Editorial Field Guide | 8.6 | 9.3 | 8.7 | 9.0 | 9.1 | 8.9 |

Rejected as the primary interface:

- **Evidence Console:** strongest reference view, but it asks a solo founder to interpret the whole matrix before receiving a route. Its evidence table remains in the selected direction as the comparison layer.
- **Editorial Field Guide:** strongest article treatment, but too linear for a reusable tool directory. Its evidence rail and short-answer typography remain in the long-form guide.

## Exactly three rendered directions

1. `01-evidence-console.svg` — dense evidence terminal; desktop table and mobile fact-sheet state.
2. `02-decision-atlas.svg` — role-based operating map; desktop topology and mobile one-decision-per-screen state.
3. `03-editorial-field-guide.svg` — deeply annotated editorial guide; desktop evidence rail and mobile field-note state.

No fourth direction artifact is part of this review.

## Competitive pattern matrix

Snapshot captured 2026-08-28 for:

- `best social media management tools for founders 2026`
- `Pallyy vs Metricool 2026`
- `best social media API for AI agents 2026`
- `Buffer vs HubSpot vs Sprout Social comparison`

| Pattern in current results | Representative pages | What works | Structural weakness | FrankX opening |
| --- | --- | --- | --- | --- |
| General “best tools” list | Zapier, Buffer, TechRadar | Broad recall and scannable winners | Collapses creators, API infrastructure, and enterprise suites into one list | Route by brand shape and operating model before ranking |
| Vendor-authored face-off | Pallyy vs Metricool, Buffer vs Sprout | Current product detail | Vendor is both contestant and judge | Separate official evidence from FrankX editorial judgment |
| Database comparison | SaaSworthy, SourceForge, G2 | Many fields and review volume | Stale prices, unclear plan gates, weak architectural context | Exact official pricing and access gates with retrieval dates |
| API-provider comparison | Upload-Post, Publora | Developer specificity and MCP visibility | Frequently crowns the author’s own product | Compare UI control planes and API infrastructure as different categories |
| Enterprise feature comparison | Software Advice, agency blogs | Team and governance context | Rarely explains when the suite is economically irrational | Expose the operating threshold that makes HubSpot, Hootsuite, or Sprout rational |

Current-result accuracy risk: one prominent 2026 Pallyy-vs-Metricool result states that Pallyy has no free plan and starts at $11. Pallyy’s current official pricing page shows a Free plan, Starter at $15/month, and Pro at $25/month. Fresh primary-source verification is therefore a visible product feature, not a footnote.

## White-space map

| Reader question | Existing coverage | FrankX answer unit |
| --- | --- | --- |
| What is best for one focused founder brand? | Generic SMB winners | Pallyy first; Metricool when analytics/MCP become central; pilot conditions shown |
| What changes for a developer brand? | API vendors compare themselves | Ayrshare, Upload-Post, Postiz, Mixpost, Buffer API, and Typefully shown as distinct infrastructure choices |
| What changes for an agent swarm? | “AI automation” claims | Research → plan → human approval → publish → measure → learn architecture with authority boundaries |
| When do HubSpot and Sprout make sense? | Feature and price lists | HubSpot for CRM-attributed marketing already on Pro/Enterprise; Sprout for governed social intelligence and care workflows |
| Can affiliate economics distort the answer? | Often undisclosed or vague | Editorial score and commercial relationship are separate fields; no commission enters ranking |
| What did FrankX actually test? | “Honest review” language without method | Official-doc evidence is labeled separately from first-party pilots; untested claims remain vendor claims |

## Source ledger for the first release

All sources below are first-party product documentation, official pricing, an official standard, or a primary research publication. Retrieval date: 2026-08-28.

| Entity | Official pricing / product evidence | Architecture evidence | Commercial-program evidence |
| --- | --- | --- | --- |
| Pallyy | <https://pallyy.com/pricing> | <https://pallyy.com/features/api> | <https://pallyy.getrewardful.com> |
| Metricool | <https://metricool.com/pricing/> | <https://help.metricool.com/mcp-vs-api-access-what-is-the-difference-5y3ib> | <https://help.metricool.com/affiliate-program-66g59> |
| Buffer | <https://buffer.com/pricing> | <https://buffer.com/resources/social-media-api-multi-platform-posting/> | <https://buffer.com/partners> |
| Postiz | <https://postiz.com/pricing> | <https://docs.postiz.com/public-api/introduction> | <https://affiliate.postiz.com> |
| Blotato | <https://www.blotato.com/pricing> | <https://www.blotato.com/ai-info> | Not verified in this release |
| Typefully | <https://typefully.com/pricing> | <https://typefully.com/docs/api> | Official program linked from Typefully pricing footer |
| Later | <https://later.com/pricing/> | <https://later.com/social-media-scheduler/> | <https://later.com/affiliate-program/> |
| SocialBee | <https://socialbee.com/pricing/> | <https://socialbee.com/features/> | Official affiliate link exposed in product footer; terms not verified in this release |
| Publer | <https://publer.com/plans> | <https://publer.com/docs> | <https://publer.com/ambassador> |
| Mixpost | <https://mixpost.app/pricing> | <https://docs.mixpost.app> | Not verified in this release |
| Upload-Post | <https://www.upload-post.com/pricing-comparison/> | <https://www.upload-post.com/> | <https://www.upload-post.com/affiliates/> |
| Ayrshare | <https://www.ayrshare.com/pricing/> | <https://www.ayrshare.com/> | Not verified in this release |
| Hootsuite | <https://www.hootsuite.com/plans> | Official plan comparison includes Wisdom AI and MCP connectors | <https://www.hootsuite.com/partners> |
| HubSpot | <https://www.hubspot.com/pricing/marketing> | <https://knowledge.hubspot.com/social/create-and-publish-social-posts> | <https://www.hubspot.com/partners/affiliates> |
| Sprout Social | <https://sproutsocial.com/pricing/> | Official pricing exposes API at Advanced | <https://sproutsocial.com/partnership-program/> |

Research and standards:

- ReAct, Yao et al.: <https://arxiv.org/abs/2210.03629>
- AutoGen, Wu et al.: <https://www.microsoft.com/en-us/research/publication/autogen-enabling-next-gen-llm-applications-via-multi-agent-conversation-framework/>
- NIST AI RMF Generative AI Profile: <https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence>
- Model Context Protocol 2026-07-28 specification: <https://modelcontextprotocol.io/specification/2026-07-28>

The papers and standards support workflow principles—tool-grounded action, role specialization, human input, evaluation, and security boundaries. They do **not** validate a product ranking.

## Media and rights decision

- The comparison interface uses product names as neutral text, not scraped logos.
- Official marks may be added only when a public brand center or press kit is verified and its usage terms are compatible.
- No “partner” label appears unless a relationship is verified. A publicly available affiliate program does not make FrankX a partner or enrolled affiliate.
- The first release uses deterministic data and architecture visuals as the primary imagery. One official Metricool MCP walkthrough may appear as a lazy, user-initiated video in the article; it must be labeled as vendor-produced material.
- Product screenshots remain candidates for a later pilot-evidence wave, after capture rights and freshness can be governed.

## Production handoff

- Selected route: role → constraint → recommendation → alternative → 30-day proof.
- Evidence layer: sortable capability table driven by one typed registry.
- Mobile: no horizontal desktop table dependency; each tool becomes an accessible fact sheet.
- Motion: selection feedback only. Paths change with `transform` and `opacity`; no text animation and no pinned scroll scene in the first release.
- Reduced motion: every route and recommendation is present without animation.
- Type: Poppins display, Inter body, JetBrains Mono for prices, dates, plan gates, and evidence labels.
- Palette: FrankX Tech spectrum on obsidian; no decorative gradient blocks.
- Analytics: role selection, comparison open, official-doc click, article continuation, and commercial-link click are separate events.
