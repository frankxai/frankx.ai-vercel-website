# LLM hub portfolio audit — 10 September 2026

## Assessment

The portfolio has useful model discovery, creative specialization and architecture education. Its largest gap is evidence consistency: catalog data, editorial recommendations and first-party measurements can look equally authoritative. Prioritize trustworthy decisions over additional ranking pages.

This audit inspected live HTTP responses, structured feeds, GitHub sources and Vercel deployment state. It did not run frontier-model benchmarks, measure search traffic or establish conversion performance. Visual mobile acceptance was not performed. This change corrects existing data, metadata and copy; it does not redesign the hubs.

## Production inventory and value

| Surface | Observed state before this change | Value and gap |
| --- | --- | --- |
| [FrankX LLM Hub](https://www.frankx.ai/llm-hub) | 32 model rows, 10 providers; no populated agentic platforms | Strong decision entry point. Calculator and registry prices diverged; open weights were encoded as zero inference cost. |
| [FrankX Model Arena](https://www.frankx.ai/research/model-arena) | Public receipts present; canonical inherited `/research` | Useful evidence foundation. Sole July 1 receipt contains two measured cases and one blocked case; insufficient to rank current frontier models. |
| [Arcanea text arena](https://www.arcanea.ai/models) | Live; canonical inherited homepage | Creative task framing is valuable. Precise quality metrics lack traceable receipts; API model additions derive quality numbers from price/context heuristics. |
| [Arcanea image arena](https://www.arcanea.ai/models/image) | Live; April catalog and homepage canonical | Useful creative categories. Refresh current model coverage and replace unsupported routing percentages with observations. |
| [Starlight research](https://starlightintelligence.org/research) | Live; research/arena canonical inherited homepage | Make this the repeatable evaluation and architecture source. `/research/models` is an unpublished soft 404. |
| [Starlight runtime](https://starlightintelligence.ai) | Live lab, council, departments and configuration | Demonstrate agent architecture and permissions. Keep runtime authorization separate from catalog recommendations. |
| [Starlight research app](https://starlight-research-hub.vercel.app) | 404; latest deployment failed; repository lacks app/pages implementation | Treat as an unfinished project, not an additional production hub. Decide whether to finish a distinct purpose or consolidate discovery into existing research. |
| [GenCreator research](https://gencreator.ai/research) | Live; four research programs display zero reports | Applied production is a good role. Publish concrete artifacts and receipts before promising a weekly report cadence. |
| [Starlight Academy](https://starlightintelligence.academy) | Live; legacy AI Architect Academy domain redirects here | Teaching and practice. Existing proposed Operator Lab is explicitly labelled; preserve that distinction. |

## Corrections in this patch

- Preserve the existing model-row array endpoint and add pricing provenance, weight availability, capability source and registry evaluation status.
- Add a versioned discovery manifest linking model rows, editorial candidates, historical comparisons and public receipts. Identifiers do not authorize dispatch; unknown values remain null.
- Use one price resolver for the explorer, calculator, detail pages and comparisons. Weight availability is independent of hosted inference charges. Never infer a free offer from a weights-only registry entry.
- Make task recommendations proposed candidates, with explicit acceptance checks for software, websites, games, books, content and operations.
- Restore the Arena canonical, social metadata and receipt alternate. Stop assigning build-time modification dates to every model and comparison.
- Remove private protocol links presented as public Astra evidence. The suite remains explicitly unrun.

## Shared approach across brands

Maintain one versioned evidence contract, with brand-specific views. FrankX owns task selection and operating guidance; Starlight owns evaluation methods and runtime architecture; Arcanea owns creative acceptance; GenCreator owns applied workflows and finished artifacts; Academy owns teaching and practice. Preserve useful URLs and internal links. Do not create duplicate model catalogs merely to populate every brand.

Separate five records: model identity, provider endpoint, price observation, evaluation receipt and routing policy. A model can have several endpoints, processing tiers, prices and task results. Every claim needs its source, observed/verified date and evidence class. Architectural details such as dense versus mixture-of-experts must remain unknown when the provider does not disclose them.

Recommended receipt fields: model snapshot and provider, task/dataset version, harness commit, tools and permissions, context/retrieval configuration, sampling settings, acceptance rubric, independent judge version, artifacts, retries, tokens, tool cost, elapsed time, human correction time, failure category and source links. Publish sanitized receipts; retain sensitive traces privately.

## Selection policies

Minimize total cost per accepted outcome subject to quality, risk and latency requirements. Include failed attempts, retries, tools, cache, infrastructure and human correction. A token calculator is only one input. Report sample size and uncertainty; do not average unrelated benchmark versions into a universal score.

| Policy | Constraint | Escalation |
| --- | --- | --- |
| Intelligence ceiling | Budget removed; quality and permission gates remain | Independent critique or parallel candidates only where measured gain justifies added complexity |
| Balanced default | Task quality floor, latency target, spending cap | Cheaper candidate first; escalate on validation failure or uncertainty |
| Cost constrained | Fixed budget per accepted task and bounded retries | Abstain or hand off when no qualified route fits |
| Privacy/local | Approved data region, license, retention and hardware | Use only qualifying endpoints; account for utilization and operator cost |
| Interactive | Tail latency, interruption and recovery | Small bounded steps, streaming and checkpointed tool actions |

Start with deterministic workflows for stable tasks. Add a single tool-using agent where planning varies; add orchestration only when independent subtasks and measurable gains justify coordination overhead. Essential primitives: typed task contracts, scoped tools, retrieval provenance, checkpoints, idempotent writes, retry budgets, validation, escalation and rollback.

## Task acceptance and continuous improvement

| Workload | Acceptance evidence |
| --- | --- |
| Software | Tests and build, regression behavior, dependency/security review, maintainability, actual tool execution |
| Web | Working user journey, responsive/accessibility checks, metadata/crawlability, performance, deploy verification |
| Games | Engine build, deterministic simulation, playability, frame budget, asset integration and playtester feedback |
| Books | Voice, continuity, factual/citation checks where applicable, chapter revision and blind reader preference |
| Content | Source fidelity, brand fit, factual review, editable finished artifacts and human acceptance |
| Research/data | Reproducible calculations, source coverage, uncertainty and traceable evidence |
| Support/operations | Schema validity, accurate retrieval, escalation, abstention and recovery from tool failure |

Create a small versioned workload set from each live product, with difficult failures and a held-out set. Run new model/provider/harness changes in shadow mode, compare against the incumbent and promote only after explicit acceptance. Publish dated receipts and update the relevant task policy. Schedule future runs only after execution infrastructure, access and budgets exist; this patch does not activate automated inference.

## Search and agent discovery

Correct self-canonicals, real 404 responses, descriptive titles, crawlable text, internal links and structured data that matches visible content come first. Add clear authorship, source dates, evidence limits and useful original examples. Do not claim traffic or answer-engine visibility improvements without Search Console and analytics measurements.

Google states that its AI search features use existing SEO foundations; no special AI schema or text file is required. `llms.txt` and a versioned JSON manifest are practical discovery aids for agents, not ranking guarantees. Track indexed canonical pages, qualified visits, cited referrals where observable, task completion and agent feed usage separately.

Sources: [Google AI features guidance](https://developers.google.com/search/docs/appearance/ai-features), [Google canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls). Explicit open-weight additions were checked against the publishers' [Mistral Large 3](https://huggingface.co/mistralai/Mistral-Large-3-675B-Instruct-2512), [Kimi K2.6](https://huggingface.co/moonshotai/Kimi-K2.6), [DeepSeek V4 Pro](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro) and [V4 Pro 0813](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813) model cards. Existing catalog claims were not all reverified by this patch.

## Next priorities

1. Replace Arcanea generated quality scores with unknown values or measured receipts, with coordinated sorting/filtering/UI handling. Correct its arena canonicals.
2. Correct Starlight research canonicals and the unpublished route's HTTP status. Resolve the unfinished research app's intended role.
3. Populate model-level capability evidence and a separately verified platform catalog; audit stale comparison claims and missing current model variants.
4. Publish task receipts for games, web, software, books and content before asserting task winners or automated promotion.
5. Add source-expiry checks, schema validation and observed cost/quality dashboards once the shared data contract and collection process are operating.
