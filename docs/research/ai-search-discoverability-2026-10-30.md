# FrankX discoverability: identity and architecture teaching

Research checked 30 October 2026. Owning issue: [#1136](https://github.com/frankxai/frankx.ai-vercel-website/issues/1136).
Implementation base: `4d802cc10a903a73f583ff92688131f399730b37`.

## Decision

Repair inconsistent descriptions of Frank Riemer across existing pages. Keep
`/ai-architecture` as the architecture topic destination, `/frank-riemer` as the
preferred person page, `/bio` for reusable biography and `/media-kit` for press
and speaking information. Each page retains its own canonical URL. A shared
Person identifier connects them without declaring their different content to be
duplicates.

The initial production HTML on 30 October contained anonymous Person objects on
the profile and bio. The site graph used the homepage as the person URL while
page-local records used other URLs, titles and social-profile subsets. The bio
also represented a diaspora as a birthplace. These are observed consistency
defects; their effect on search outcomes has not been measured.

## What is newly identified

The three existing AEO articles were corrected on 27 October. They already cover
ordinary SEO foundations, unsupported citation formulas, evidence retention and
the distinction between citations, recommendations and visits. Those findings
are retained and are not presented as new research here. Neither of the October
papers below nor Bing's Topics Portfolio announcement appeared in the inspected
research and AEO source records. This is a scoped deduplication check, not proof
that no earlier conversation mentioned them.

| Source | Finding and quality | FrankX implication |
| --- | --- | --- |
| Chen and Koudas, [What Drives AI Citations?](https://arxiv.org/abs/2610.15033), 10 October 2026; full text inspected | Two 90-day commercial-query collections contain 158,099 answers and 468,037 citations. Within-site comparisons associate question-relevant paragraphs and titles with citations. API replay attributes more variation to retrieval than page features. **Moderate evidence:** a preprint combining observational comparisons and controlled probes; two markets, sampled models and incomplete page fetches constrain generalization. Its page-feature associations are not intervention effects. | Keep the useful architecture hub and its source-backed material. A speaker topic should name a real teaching subject and lead to inspectable work. The study does not establish that adding schema increases citations. |
| Jiang et al., [Understanding ChatGPT Citations](https://arxiv.org/abs/2610.15382), 11 October 2026; full text inspected | Repeated observations across four ChatGPT Web settings separate retrieval from citation. Google and Responses API proxies jointly recover only roughly a quarter of cited URLs in the matched settings; hostname/entity agreement is stronger. **Moderate evidence:** observational preprint, 80 aligned questions for two settings and smaller unmatched sets for the others. Its citation definition also includes supporting URLs attached to selected references, which may not be separately visible. | Treat Google ranks and API panels as distinct samples. Record URL, hostname and named-person accuracy separately. Entity consistency is a reasonable repair, with no demonstrated causal uplift from this implementation. |
| Microsoft Bing, [Topics Portfolio beta](https://blogs.bing.com/webmaster/2026/10/introducing-topics-portfolio-beta-in-ai-performance/), 13 October 2026 | Groups grounding activity into topics and surfaces opportunity queries. **High confidence about the documented feature; limited measurement coverage.** Classification and aggregates are approximate, low-volume topics may be absent, and competitor branded queries can appear as opportunities. | Review architecture teaching and speaking-related topics where the FrankX property has enough data. Do not interpret missing topics as zero demand or the feature as cross-engine coverage. |

Google's [ProfilePage documentation](https://developers.google.com/search/docs/appearance/structured-data/profile-page)
supports describing a person-focused page through `mainEntity` and linking author
records. This is implementation documentation, not new evidence of ranking
improvement. Its [generative AI guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
is an existing constraint: useful original work and technical access matter;
special AI markup is not required.

No inspected source directly tests discovery of an independent AI-architecture
teacher or speaker. Applying these findings to FrankX is an inference. Confirmed
talks, audience outcomes and third-party endorsements need separate evidence.

## Implementation

`lib/frank-person.ts` builds the shared Person record from the existing social
configuration. The global graph, biography, media kit and profile reuse it. The
profile identifies that person through `ProfilePage.mainEntity`; the architecture
page identifies its author and visibly links the profile and media kit. Personal
social profiles are no longer also asserted to be the Organization's identity.
No URL, price, employment claim, event or customer result is introduced.

The repeated Person record is deliberately small. Page-specific prose remains
on its existing page. This reduces future divergence while preserving each
reader's task. No graph database or additional runtime is needed.

## One experiment: can searchers resolve the architect and the next action?

Hypothesis: a consistent person record plus an explicit path from the architecture
guide to the person and speaking information reduces identity ambiguity. Search
citation changes remain exploratory because this is a bundled repair on one site.

Freeze this six-question panel before collecting answer observations:

| ID | Group | Exact question |
| --- | --- | --- |
| B1 | Branded | Who is Frank Riemer of FrankX, and where can I inspect his AI architecture work? |
| B2 | Branded | Where can I find Frank Riemer's AI architecture speaking topics and contact details? |
| B3 | Branded | What does FrankX teach about choosing between an AI workflow and an agent? |
| U1 | Unbranded | Where can a founder learn AI architecture from public source code and worked examples? |
| U2 | Unbranded | Who offers talks or workshops on human-led AI agents in Amsterdam? |
| U3 | Unbranded | Where can I inspect a practical guide to AI architecture and its failure modes? |

Use fresh sessions in two named consumer answer tools with web search enabled,
English and Netherlands context. Collect three independent responses per question
at baseline, day 7 and day 28: 36 attempts per wave. Record the exposed model,
timestamp, exact answer, citation destinations, failed attempts and collection
method. Keep API or ordinary search observations in separate groups. Do not buy
another service or run paid API sampling without an explicit budget.

Primary observation: correct identity and relevant architecture or media-kit
destination, with the numerator and attempted denominator reported for each
branded question and engine. Report mentions, source citations, recommendations,
referrals and qualified inquiries separately. Unbranded questions measure discovery
within this small panel; they are not a population estimate.

The technical acceptance check is deterministic:

```bash
node scripts/check-frankx-discoverability.mjs
DISCOVERY_BASE_URL=http://127.0.0.1:3107 node scripts/check-frankx-discoverability.mjs
pnpm run test:social-identity
```

The checker validates initial HTML, all four self-canonicals, consistent named
Person records, the profile relation and the architecture author/navigation links.
It reproduced the production defect before release. It does not establish Google
indexing, external account ownership, search-engine comprehension or conversion.

Answer-panel baseline and outcome counts are **not yet collected**. If a complete
pre-release baseline is unavailable, begin after release and report a descriptive
longitudinal panel; never reconstruct a before/after uplift. First-party Bing and
Search Console observations are unavailable in this session. Semrush ordinary
Google-search estimates informed selection of the existing topic page and are
not a substitute for first-party traffic or AI citation measurements. Raw provider
reports remain outside this public repository.

Keep unrelated music and library pages as contextual comparisons only. The pages
are too different, and the global person graph touches them too, so they cannot
serve as untreated causal controls. Other releases and search/model changes must
be recorded as confounders.

Retain the consistency repair after technical checks pass. At day 28, decide
whether to improve one specific teaching passage using observed grounding queries.
Do not scale content production on this panel alone. Stop collection for a broken
destination, material misidentification or an exhausted budget. Preserve failures
and report inconclusive or negative results.

## Release boundary

Work contract: Publishing Studio owns this research and existing-page correction,
with software verification for the schema and rendered checks. Frank Riemer owns
the site and release decision. The current request authorizes implementation and
release through GitHub and Vercel. Issue #1136 owns the bounded repair; it opens
no new revenue release or shared-platform project. The simpler alternative was to
retain the existing pages unchanged. The reusable contribution is the documented
experiment and regression checker. Acceptance requires consistent rendered facts,
working destinations, required checks and independent review. Customer acceptance,
cash cost, total token usage and human hours remain unknown. The session ceiling
is 120,000 tokens, three review rounds and no new paid service; at least a quarter
of effort is reserved for verification. Stop for an authority conflict, failed
required gate, unsupported public claim or exhausted allowance.

This record is research and an experiment protocol. The PR and deployment receipt
establish the release state. Required CI, independent review, inspected rendering
and production source binding remain separate gates. Roll back through the PR's
inverse patch or the preceding verified production deployment; do not delete or
redirect the working pages.
