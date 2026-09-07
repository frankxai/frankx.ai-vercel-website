# Managed AI agents: editorial source ledger

Reviewed September 7, 2026. Desk research plus authored architectural recommendations. No vendor performance benchmark, measured agent bill, purchased subscription or production agent deployment is represented by this article.

## Core sources

| Source | Claim supported | Treatment |
| --- | --- | --- |
| [Claude Managed Agents](https://platform.claude.com/docs/en/managed-agents/overview) | Managed loop; agent/environment/session/events; hosted and self-hosted sandbox options; stateful sessions; beta; ZDR and BAA limits | Vendor capability and limitation, not a quality score |
| [Claude pricing](https://platform.claude.com/docs/en/about-claude/pricing) | Sonnet 5 USD 2/10 and Opus 5 USD 5/25 per million input/output tokens; managed running sessions USD 0.08/hour | Standard rates on review date. Sonnet increase canceled. Runtime replaces the Managed Agents container-hour charge; do not add it again |
| [Responses migration](https://developers.openai.com/api/docs/guides/migrate-to-responses) | Responses application API | Modular application path |
| [Agents SDK](https://developers.openai.com/api/docs/guides/agents) | Agent framework | Framework is distinct from hosted compute |
| [Sandbox agents](https://developers.openai.com/api/docs/guides/agents/sandboxes) | Beta; trusted control loop can be separate from workspace compute | Does not imply all SDK deployments are hosted by OpenAI |
| [Background mode](https://developers.openai.com/api/docs/guides/background) | Asynchronous response execution | Does not substitute for all business-job state |
| [Workspace Agents trigger API](https://developers.openai.com/workspace-agents/trigger-runs) | Published workspace agents; durable queued triggers; idempotency; beta status polling; answer unavailable through API | Central limitation for external-product comparisons |
| [Workspace Agent authentication](https://developers.openai.com/workspace-agents/authentication) | Scoped access tokens and admin permissions | Distinct credential family |
| [ChatGPT Work](https://learn.chatgpt.com/docs/get-started-with-work) | Human-operated artifact/workflow experience | Separate from raw API product |
| [Agent Builder](https://developers.openai.com/api/docs/guides/agent-builder) | Deprecated; shutdown scheduled November 30, 2026; ChatKit remains | Avoid in new recommendations |
| [OpenAI pricing](https://developers.openai.com/api/docs/pricing) | Standard short-context Astra 5/25, Sol 2/10, Terra 1/6, Luna 0.10/0.60; container billing | USD per million input/output tokens. Sol promotional at least through November 21. Container table lists 20-minute sessions and qualifying minute billing with five-minute minimum |
| [Hyperagent agents](https://www.hyperagent.com/docs/concepts/agents) | Shared configurable agent workspace | Fit recommendation is editorial |
| [Hyperagent plans](https://www.hyperagent.com/docs/billing/plans) | Monthly 20/50/100 plans carry 20/55/115 credits; expiry; pause/recharge; supported ChatGPT OAuth connection | Plan credits and connected subscription usage must not be double-counted. PAYG/annual plans discontinued August 26 |
| [n8n pricing](https://n8n.io/pricing/) | Annual-billed Starter EUR 20/2,500 executions; Pro EUR 50/10,000 executions | No conversion into USD; no assumed unlimited model usage |
| [n8n license](https://docs.n8n.io/sustainable-use-license/) | Internal automation versus commercial embedding/reselling | Link for buyer review, not legal advice |
| [OpenClaw 2.0 announcement](https://openclaw.ai/blog/openclaw-2-accidentally) | OpenClaw 2.0 identity and persistent assistant development | Distinguish runtime from hosting operator |
| [Hermes documentation](https://hermes-agent.nousresearch.com/docs/) | Persistent memory and skills in a portable personal runtime | No claim Railway manages agent behavior |
| [Railway pricing](https://railway.com/pricing) | Plan minimum includes usage; per-second RAM, CPU and volume pricing | Hosting estimate explicitly authored, not observed |

## Additional shortlist sources

- [Vercel eve](https://vercel.com/docs/eve): beta, filesystem-first framework, Functions plus Workflows/Sandbox/Gateway/Connect.
- [AI Gateway pricing](https://vercel.com/docs/ai-gateway/pricing): no token markup; other platform services remain separately priced.
- [Cloudflare Agents](https://developers.cloudflare.com/agents/): durable identity, state, scheduling and recoverable execution.
- [Mastra](https://mastra.ai/docs): TypeScript agents and workflows.
- [LangGraph](https://docs.langchain.com/oss/python/langgraph/overview): stateful graph orchestration; [LangSmith](https://docs.langchain.com/langsmith/home): tracing, evaluation and deployment.
- [Dust](https://docs.dust.tt/docs) and [Lindy](https://www.lindy.ai/pricing): internal workplace alternatives; prices intentionally not normalized across dissimilar credit units.
- [AWS AgentCore](https://aws.amazon.com/bedrock/agentcore/) and [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/foundry/agents/overview): enterprise shortlist under an existing cloud boundary.
- [AWS Classic maintenance notice](https://docs.aws.amazon.com/bedrock/latest/userguide/agents-classic-maintenance-mode.html): Classic maintenance and closure to new customers July 30, 2026.

## Arithmetic and assumptions

Model illustration: input/1,000,000 × input rate + output/1,000,000 × output rate. Nominal input 50,000, output 10,000. Equal token counts are not equal text, quality or latency. No cache, long-context, fast, regional or batch adjustments.

Railway: 30 days = 2,592,000 seconds. Memory USD 0.00000386/GB-second; CPU USD 0.00000772/vCPU-second; volume USD 0.00000006/GB-second. Assumed 1 GB RAM + 0.5 CPU + 5 GB volume = USD 20.78784. Assumed 2 GB + 1 CPU + 5 GB volume = USD 40.79808. Platform charge is max(plan minimum, resource usage), plus applicable extras. No workload utilization measurements were taken.

Outcome example is reproduced by `render-figures.mjs` and `economics.json`: 1,000 attempts, 900 accepted, USD 200 model + 40 runtime + 50 infrastructure + 2,000 allocated review = 2,290; divided by 900 = 2.5444. Technical subtotal 290/900 = 0.3222. Zero additional tool/retry/incident charges is an explicit simplifying assumption, not a guarantee.

## Art and brand provenance

`brand-assets.json` stores official-source URLs and SHA-256 hashes. SVG marks are embedded unchanged inside the original editorial SVG. OpenAI uses the white Blossom from the official downloadable logo bundle. n8n and Railway marks come from their brand kits; Vercel from its design asset host; Claude and OpenClaw from official site SVGs; Hermes from the official docs icon. Hyperagent is identified in text. Do not substitute the repository's custom Hermes or OpenClaw illustrations as official marks.

Hero: generated September 7, 2026 with the native image-generation tool for this article. Original miniature founder studio, document trays, fabrication chamber, finished artifact and a small titanium companion. Obsidian, restrained emerald/cyan, cinematic side light. No vendor logos or factual chart data in generated artwork. Source result 1672 × 941 PNG; repository derivative is WebP, 163,672 bytes, same dimensions, quality 82. Generation requested 2K; returned dimensions are recorded as delivered, not claimed to be 2K. Council/image release review remains pending for production.

Figures: deterministic SVG, no added animation, meaningful text alternative and corresponding article tables/prose. Figure typography uses Inter with Arial fallback inside the SVG. The article inherits the existing blog's Poppins/Inter styles. No fonts or tracking dependencies added.

## Maintenance triggers

Recheck when leaving draft, before the November Agent Builder shutdown, when provider price terms change, and whenever a recommended beta reaches a new support stage. Reproduce calculations from the assumptions instead of editing chart labels independently. This document proposes maintenance; it does not create a scheduled automation.
