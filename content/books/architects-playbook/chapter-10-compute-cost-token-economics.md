# Compute, Cost, and Token Economics

> "Price is what you pay. Value is what you get."
> — Warren Buffett

---

Most AI books skip the money. They explain what models can do, how to prompt them, which tools to use — and then leave you to discover the economics on your own, usually after a surprise invoice arrives at the end of the month.

This chapter does not skip the money. Because understanding token economics is not a finance skill — it is an architecture skill. The choices you make about which models to use, when to call APIs versus run local inference, and how to structure your prompts have direct cost implications that compound at scale. An architect who cannot reason about compute costs is an architect who cannot reason about systems.

The numbers I use here are from my own sessions — real consumption data, real invoices, real decisions about where to spend and where to save.

---

## I. What Is a Token, and Why Does It Cost Anything?

A token is the fundamental unit of AI computation. It is not a word. It is a fragment — roughly 0.75 words in English, meaning four tokens represent about three words. "The quick brown fox" is six tokens. A 1,000-word article is approximately 1,333 tokens.

The reason tokens are the unit of pricing rather than words or characters comes down to how language models work internally. Models process language as sequences of these subword fragments, and the computational cost scales with the sequence length. More tokens in the context window means more matrix multiplications per forward pass. The math is linear: double the tokens, double the compute.

Current pricing from the major providers, as of early 2026:

| Model | Input (per 1M tokens) | Output (per 1M tokens) |
|---|---|---|
| Claude Opus 4.5 | $15.00 | $75.00 |
| Claude Sonnet 4.5 | $3.00 | $15.00 |
| Claude Haiku 3.5 | $0.80 | $4.00 |
| GPT-5 | $5.00 | $15.00 |
| GPT-4.1 mini | $0.40 | $1.60 |
| DeepSeek V3 | $0.27 | $1.10 |
| Gemini 2.5 Pro | $1.25 | $10.00 |
| Llama 4 (local) | $0.00 | $0.00 |

Two things jump out of this table. First, output tokens cost significantly more than input tokens — typically 4–5x more. The reason: generating a token requires a full forward pass through the model, while processing an input token is computationally cheaper in a batched context. Every word the model writes costs more than every word you send it.

Second, the price spread is enormous. DeepSeek at $0.27/$1.10 versus Claude Opus at $15.00/$75.00 is a 55x spread on input and a 68x spread on output. This is not a rounding difference. It is an architectural decision.

In my coding sessions with Claude Code, I consume between 50,000 and 200,000 tokens per session. A complex refactoring session with large context windows easily hits 150,000 tokens. At Sonnet pricing ($3.00 input / $15.00 output), a 150K-token session with a 70/30 input-output split costs roughly $1.12 in API terms. At Opus pricing, that same session costs $6.75. Across a month of heavy usage, this difference is $50 versus $300 — for work that produces identical results on most tasks.

The model choice matters. But it only matters if you know when the difference in capability justifies the difference in cost.

---

## II. API Keys vs. Subscriptions: Two Different Bets

There are two ways to access frontier AI: subscription and API. Most practitioners start with subscriptions and graduate to both. Understanding when to use each is a genuine architectural decision.

**Subscriptions** — Claude Pro, ChatGPT Plus, Gemini Advanced — are flat-fee models. You pay $20–$30 per month and get generous (though rate-limited) access to the best models through the chat interface, plus whatever tools the provider bundles in. Claude Pro includes Claude Code. ChatGPT Plus includes code interpreter, image generation, and browsing.

The hidden cost of subscription is paying for unused capacity. If you use Claude Pro for 8 hours of intense work on Monday and then barely touch it for two weeks, you paid the same monthly fee as someone who used it every day. Subscriptions price for consistent, high-volume users. Sporadic users overpay.

**API access** is pay-as-you-go. You get a key, make calls, and pay for exactly what you consume. No monthly minimum, no seat license. For programmatic use — n8n workflows, custom scripts, automated pipelines — API is almost always the right choice because the usage pattern is unpredictable and often bursty.

The hidden cost of API is usage spikes. I have had single automation runs consume more tokens than I expected due to a loop bug that kept calling the API in a retry cycle. The bill was not catastrophic, but it was instructive. API spending requires monitoring. Anthropic provides usage dashboards and spend limits — use them.

My approach is a deliberate split: subscriptions for daily interactive work, API for automation. Claude Pro handles my daily coding and writing. The API handles my n8n workflows, the Content Atomizer, and any script that calls a model programmatically. The subscription gives me a predictable base cost. The API scales with actual automation usage.

The crossover point: if you are making more than ~500,000 tokens of API calls per month, you may be approaching subscription economics for the equivalent usage level. Do the math for your specific consumption pattern.

---

## III. Local vs. Cloud vs. Edge: The Three Compute Venues

Every AI inference call happens somewhere. Understanding *where* it happens determines your cost structure, latency, privacy posture, and capability ceiling.

**Local inference** means running the model on hardware you own. With a consumer GPU — an RTX 4090, or an Apple M4 Max — you can run Llama 4, Mistral, Qwen, and other open-weight models at meaningful quality. The marginal cost per token is zero. The electricity draw for an RTX 4090 running inference is roughly $0.012/hour in European residential rates. For high-volume use cases, local inference achieves cost crossover against cloud APIs surprisingly quickly.

Local is appropriate when: (1) privacy requires it — your data should not leave your machine, (2) you have high, sustained volume where zero marginal cost compounds into real savings, (3) latency matters and a round-trip to a remote API is measurable, or (4) you need offline capability. The tradeoff is capability ceiling. Llama 4 70B is genuinely impressive but it is not Claude Opus. For creative work, complex reasoning, and long-context tasks, the frontier cloud models remain materially better.

**Cloud APIs** — Anthropic, OpenAI, Google, Mistral — give you the best available models on demand with no infrastructure to manage. Zero setup friction, automatic model updates, and capability that local hardware cannot match for frontier models. The tradeoff is cost at scale, latency (typically 200ms–2s depending on model and region), and the fact that your prompts and completions leave your machine.

Cloud is appropriate for: interactive work where quality matters, tasks that require genuine frontier reasoning, and any situation where the value of the output clearly exceeds the cost of the call.

**Edge inference** — Cloudflare Workers AI, AWS Inferentia endpoints, Vercel AI Gateway — puts small, optimized models close to users geographically. Latency drops to single-digit milliseconds. Cost is generally lower than cloud frontier APIs because the models are smaller. Edge is appropriate for: latency-critical user-facing features (autocomplete, real-time suggestions), geographic distribution requirements, and high-volume simple tasks where a smaller model is sufficient.

The cost crossover point between local and cloud API depends on your hardware amortization period, electricity costs, and usage volume. A rough model: if you are spending more than $150/month on API calls for tasks a local model can handle adequately, the economics of owning a capable inference GPU start to favor purchase. For most individuals and small teams, cloud APIs remain the correct default — the infrastructure overhead of local inference is a real cost even when tokens are free.

---

## IV. The $50/Month Complete Stack

Here is what I actually pay to run a production AI-augmented workflow. Not what I spend on experiments. Not peak load. The operational baseline for frankx.ai, my automation empire, and my creative work.

| Service | Monthly Cost | What It Covers |
|---|---|---|
| Vercel Pro | $20 | Hosting, analytics, blob storage, Edge Network |
| Railway | $5 | Background services, PostgreSQL, Redis |
| n8n (on Railway) | $0 | Self-hosted on Railway's $5/mo allowance |
| Claude Pro | $20 | Daily coding, writing, Claude Code |
| Domain (annualized) | ~$2 | frankx.ai via IONOS |
| Resend | $0 | Free tier covers transactional email |
| **Total** | **~$47** | |

This stack runs a production website with server-side rendering, an automation layer with 9 active workflows, blob storage for product downloads, email delivery, database persistence, background job processing, and daily frontier AI access.

The enterprise equivalent of this infrastructure — the separate vendors, enterprise support contracts, seat licenses, and DevOps overhead — runs $30,000–$100,000 per year in a Fortune 500 context. The productivity gap between someone running this $50 stack effectively and someone paying enterprise rates for equivalent capability is not a technology gap. It is an awareness gap.

Three caveats worth stating clearly: API calls are additive on top of this base cost. Vercel Pro includes a generous compute allowance but bills overages. And Railway's $5 allowance evaporates quickly if you run GPU workloads. The $47 figure is for a specific usage profile — heavy on automated workflows, light on API calls because Claude Pro handles the interactive work.

The architecture principle: design your stack to maximize the fixed-cost subscriptions before reaching for variable-cost APIs. Claude Pro's usage limit is generous for interactive work. Exhaust it before calling the API for conversational tasks.

---

## V. Cost Optimization Without Sacrificing Quality

Cost optimization in AI is a quality trade-off problem. Every technique that reduces cost also introduces a risk of quality degradation. The skill is knowing which optimizations are free lunches and which extract real quality cost.

**Prompt caching** is the closest thing to a free lunch. Anthropic's prompt caching reduces the cost of re-sending the same large context to roughly 10% of the original input cost after the initial cache population. If you are making multiple calls to a large document, a large codebase context, or a long system prompt — cache it. My n8n workflows that use a consistent system prompt pay full price on the first call and 90% less on subsequent calls within the cache window (currently 5 minutes, extendable). For workflows that run frequently against stable context, caching pays for itself immediately.

**Model routing** is about matching model capability to task complexity. Not every task requires Opus. A workflow that classifies incoming emails into categories does not need the same model as one that synthesizes a research report from 50 sources. Haiku handles classification, extraction, and formatting at a fraction of Sonnet's cost. Sonnet handles most coding tasks. Opus handles the genuinely hard problems — novel architecture decisions, complex reasoning chains, tasks where wrong answers are expensive.

A practical routing heuristic: ask whether the task requires synthesis and judgment, or pattern matching and formatting. The former benefits from Opus. The latter runs fine on Haiku.

**Batch processing** is valuable when you have non-real-time tasks that can tolerate delayed processing. Anthropic's Batch API processes requests asynchronously at roughly half the price of synchronous calls, with results available within 24 hours. For tasks like enriching a product catalog, generating metadata for a media library, or running analysis on historical data, batch API halves the bill without affecting the quality of results.

**Context management** is the most nuanced optimization. Shorter prompts cost less, but less context means worse output — and a wrong output that requires correction costs more than the tokens you saved. The discipline is being intentional about what context you include rather than blindly truncating. Irrelevant context is expensive. Relevant context is an investment.

The specific failure mode: truncating code context to save tokens on a debugging task, getting a solution that does not account for dependencies the model could not see, and then spending three hours debugging the wrong answer. The tokens you saved cost you hours.

**The quality/cost mistake** practitioners make most often: routing complex tasks to cheap models to save money, then spending more on corrections and rework than they would have spent on the better model in the first place. Haiku making a subtle architectural error in a production system is not actually cheaper than Sonnet getting it right the first time. The cost of AI inference is a fraction of the cost of developer time. Optimize for correctness first, then for cost at the margin.

---

## The Connection to the Personal AI CoE

Token economics lives in the Technology and Strategy pillars of the six-pillar framework. But its implications extend to Governance: without visibility into consumption, you cannot govern spend. And to Data: your data strategy determines how much context you pass per call, which drives cost directly.

The practitioners who build durable AI systems understand this layer. They know their monthly token consumption by model tier. They have alerts for API spend anomalies. They have thought through which tasks justify frontier model costs and which can route to cheaper alternatives.

This is not accountant thinking. It is architect thinking. The best systems are not the most powerful ones — they are the ones that route the right level of capability to each task at a cost structure that makes the system sustainable indefinitely.

Fifty dollars a month for a production stack that would cost an enterprise fifty thousand is not a number to be proud of. It is a number to understand. The gap between those figures is what happens when you know the economics of the medium you are building in.

Know the economics. Build accordingly.

---
