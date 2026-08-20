# AI Architecture Best Practices — Research Brief
**Compiled:** 2026-08-20 · **For:** definitive technical guide, "AI Architecture Best Practices, August 2026"

---

## READ THIS FIRST — provenance rules and a hard constraint

This session ran behind a restrictive egress proxy. **Many primary-source domains were network-blocked and could not be fetched directly.** Every line below carries a provenance tag. Do not publish a `[SEARCH]` claim as if it were read off the vendor's page — re-fetch it from an unblocked network first.

| Tag | Meaning |
|---|---|
| `[FETCHED]` | I directly retrieved this URL this session and read its content. Highest confidence. |
| `[SEARCH]` | Content came from a **search engine's synthesis** of that page, not a direct read. The URL and publisher are real; the wording is the search index's paraphrase. **Treat exact quotes and numbers as unconfirmed until re-fetched.** |
| `[INFERENCE]` | My own reasoning connecting sources. Not a sourced claim. |
| `UNVERIFIED` | Could not confirm at all. |

**Domains blocked this session (could NOT be fetched):** `anthropic.com`, `claude.com`, `platform.claude.com`, `docs.claude.com`, `modelcontextprotocol.io`, `openai.com`, `developers.openai.com`, `platform.openai.com`, `arxiv.org`, `simonwillison.net`, `opentelemetry.io`, `genai.owasp.org`, `docs.aws.amazon.com`, `learn.microsoft.com`, `docs.cloud.google.com`, `langchain.com`.

**Domains that DID work:** `github.com`, `raw.githubusercontent.com`, `blog.modelcontextprotocol.io`.

**The workaround that rescued this brief:** several blocked documentation sites publish their source in public GitHub repos. The **complete MCP 2026-07-28 changelog** and the **full OWASP GenAI LLM Top 10 2026** were both recovered that way and are `[FETCHED]`, not `[SEARCH]`. Reuse this technique for anything still marked unverified.

**Consequence for the writer:** the Anthropic engineering-blog material — the backbone of §1 and §2 — remains `[SEARCH]`-grade. It is directionally reliable (the search index returned consistent, specific, mutually corroborating detail across many independent secondary sources) but re-fetch the Anthropic posts before quoting them verbatim.

**Top three things to verify first, in order:** (1) Anthropic's ">80% system prompt removal" numbers, §1.1b; (2) the code-execution-with-MCP token-reduction figures, §1.1; (3) the multi-agent research numbers (90.2% / 15×), §1.1.

---

## 1. Agent architecture

### 1.1 Anthropic — the canonical pattern set

**Source:** "Building Effective AI Agents", Anthropic Engineering — https://www.anthropic.com/engineering/building-effective-agents `[SEARCH]` (blocked; published Dec 2024, still the most-cited agent-architecture reference as of Aug 2026)

The load-bearing distinction is **workflows vs. agents**: workflows orchestrate LLMs and tools through predefined code paths; agents dynamically direct their own process and tool usage. The named patterns are prompt chaining, routing, parallelization (sectioning + voting), orchestrator-workers, evaluator-optimizer, and the autonomous agent loop. `[SEARCH]`

The central *anti*-pattern advice: **start simple, add agency only when simpler solutions fall short.** Agentic systems trade latency and cost for better task performance, and that trade is often not worth it. `[SEARCH]`

**Source:** "Effective context engineering for AI agents", Anthropic Engineering — https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents `[SEARCH]` (blocked; published Sept 2025 per corroborating secondary sources)

Frames context as a **finite attention budget**, not a container to fill. Core techniques: compaction, structured note-taking, sub-agent context isolation, just-in-time retrieval. `[SEARCH]`

**Source:** "Writing effective tools for AI agents—using AI agents", Anthropic Engineering — https://www.anthropic.com/engineering/writing-tools-for-agents `[SEARCH]` (blocked)

Tool-design principles: choose which tools to implement at all (don't wrap every API endpoint), **namespace** tools for clear domain boundaries (e.g. `cameron_get_expenses`), return meaningful context rather than raw dumps, optimize for token efficiency, and prompt-engineer the tool *descriptions* as carefully as the system prompt. Recommends pagination, range selection, filtering and truncation with sensible defaults on any tool that can return a lot. **Claude Code caps tool responses at 25,000 tokens by default.** The stated method is iterative and evaluation-driven — prototype, test on realistic scenarios, analyze failures, refine. `[SEARCH]`

**Source:** "Code execution with MCP: Building more efficient agents", Anthropic Engineering — https://www.anthropic.com/engineering/code-execution-with-mcp `[SEARCH]` (blocked; published ~Nov 2025)

The argument: loading all tool definitions upfront and round-tripping every intermediate result through the context window is the dominant cost in tool-heavy agents. The fix is to expose MCP servers to the model as **code modules on a filesystem**, have the model write TypeScript that imports and composes them, and run that code in a sandbox. Reported reductions: ~98.7% predicted (150,000 → 2,000 tokens) and ~98% observed in production (70,000 → 800 tokens). `[SEARCH]` — **numbers must be re-verified against the post; they are the single most-quoted figures in this space and also the most likely to be garbled in secondary retelling.**

**Source:** "How we built our multi-agent research system", Anthropic Engineering `[SEARCH]`; and "When to use multi-agent systems (and when not to)", https://claude.com/blog/building-multi-agent-systems-when-and-how-to-use-them `[SEARCH]` (blocked)

Orchestrator-worker: a Lead Researcher plans, spawns 3–5 parallel subagents each with **its own context window, tools and trajectory**, then synthesizes with a separate citation pass. Reported: **90.2% improvement over single-agent Claude Opus 4** on Anthropic's internal research eval; **token usage explains ~80% of performance variance**; multi-agent costs roughly **15× the tokens of a normal chat**. Anthropic's own stated boundary: this works for **breadth-first, read-heavy** questions where independent paths can be explored in parallel and total information exceeds one context window. `[SEARCH]`

**Source:** Agent Skills / `SKILL.md` — open standard released by Anthropic, **December 2025** `[SEARCH]`

Three-tier **progressive disclosure**: at startup only skill *names and descriptions* load (~80 tokens each); the full `SKILL.md` body loads when the agent judges the skill relevant; supporting scripts/assets load only during execution. Claimed adoption by OpenAI, Google, GitHub Copilot and Cursor "within weeks". `[SEARCH]` — **adoption claim is UNVERIFIED and reads like vendor-adjacent marketing; check each vendor's own docs before repeating it.**

### 1.1b The July 2026 reversal — "the new rules of context engineering"

**This is the most important single development in agent prompting since Jan 2026, and it partially inverts Anthropic's own earlier advice.**

**Source:** "The new rules of context engineering for Claude 5 generation models", Anthropic — https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models `[SEARCH]` (claude.com blocked). Announced by **Thariq Shihipar (Anthropic technical staff) on July 24, 2026**, the day **Claude Opus 5** launched — https://x.com/trq212/status/2080710971228918066 `[SEARCH]` (x.com blocked).

**The finding:** Anthropic **removed over 80% of Claude Code's system prompt** for its newest models (**Opus 5** and **Fable 5**) **with no measurable loss on coding evals.** Reported specifics: the old system prompt was **~800 tokens** of detailed instruction; the new one is **~164 tokens**. `[SEARCH]`

**The six shifts** `[SEARCH]`:
1. Give Claude rules → **let Claude use judgement**
2. Give Claude examples → **design interfaces**
3. Put it all upfront → **use progressive disclosure**
4. Repeat yourself → **simple tool descriptions**
5. Memory in `CLAUDE.md` files → **auto-memory**
6. Simple specs → **rich references**

**The diagnosis, in one word: overconstraining.** Reading transcripts of their own internal Claude Code usage, the team found conflicting instructions colliding inside a single request — a system prompt saying "DO NOT add comments" against a skill saying "leave documentation as appropriate" against the user's actual ask. `[SEARCH]`

Anthropic shipped **`/doctor`** in Claude Code to rightsize skills and `CLAUDE.md` files. `[SEARCH]`

`[INFERENCE]` **Why this matters for the guide, and why it is tricky:** taken naively this reads as "context engineering was wrong." It is not. Shifts 3, 4 and 6 are *continuous* with the 2025 guidance — progressive disclosure and lean tool descriptions were already the advice. What actually changed is shifts **1 and 2**: as models improved, **prescriptive rule-stuffing crossed over from helping to hurting**, because rules that contradict each other are worse than no rules. The correct synthesis for the guide is: *curate context aggressively (unchanged), but stop encoding judgment you can delegate to the model (new).* Note also that this is **model-generation-specific advice** — Anthropic scopes it to Claude 5-generation models. Do not present it as universal across providers or older models. That scoping is exactly the nuance the secondary coverage drops.

**Corroborating direct observation:** the Claude cookbooks repo — https://github.com/anthropics/claude-cookbooks `[FETCHED]` — contains a `managed_agents/` directory and a "Fable 5 fallback billing" addition, independently confirming that **Fable 5** and **Managed Agents** are real shipped surfaces, not secondary-source noise. Repo also carries `patterns/agents/`, `claude_agent_sdk/`, `tool_use/`, `evals/agentic_search/`, `tool_evaluation/`, `building_evals.ipynb`, `prompt_caching.ipynb`. 51.9k stars, 629 commits at fetch.

### 1.1c Claude Managed Agents — dreaming, outcomes, orchestration (May 6, 2026)

Shipped at **Code with Claude, San Francisco, May 6, 2026** `[SEARCH]`:

- **Dreaming** *(research preview, access by request)* — a **scheduled** process that reviews an agent's past sessions and memory stores, extracts recurring patterns, and curates reusable memories. Configurable as auto-update or **human-review-before-update**. Colloquially: the agent sleeps, organizes what it learned, and wakes with new priors.
- **Outcomes** *(public beta)* — a self-grading loop where a **separate evaluator** scores output against a **written rubric** and returns what to fix. Anthropic internal testing reportedly shows **up to +10 percentage points success rate on harder tasks**.
- **Multi-agent orchestration** *(public beta)* — a lead agent fans work out to specialist subagents in parallel; reported ceiling **up to 20 specialist subagents across up to 25 parallel threads**.

Sources: https://thenewstack.io/anthropic-managed-agents-dreaming-outcomes/ , https://www.forbes.com/sites/jonmarkman/2026/05/11/claudes-new-dreaming-feature-builds-self-improving-ai-agents/ `[SEARCH]`

`[INFERENCE]` **Outcomes is the notable one architecturally.** It is the evaluator-optimizer pattern from Anthropic's own 2024 post, promoted from "pattern you implement" to "platform primitive you configure." And it is a direct, practical answer to the LLM-as-judge problem in §5 — a rubric-scored evaluator in the loop is meaningfully more constrained than a free-form judge asked "did this succeed?". **Dreaming** is memory consolidation as a scheduled batch job; note the security posture — the human-review option exists because auto-updating memory from past sessions is a **memory-poisoning surface** (OWASP ASI06).

### 1.1d Anthropic 2026 Agentic Coding Trends Report

https://resources.anthropic.com/2026-agentic-coding-trends-report `[SEARCH]` (blocked). Eight trends across foundation / capability / impact: (1) engineering roles shift toward agent supervision, system design and output review; (2) multi-agent teams replace single agents; (3) long-running agents — sessions from minutes to hours, with **one reported 12.5M-line codebase change in a single 7-hour run**; (4) human oversight scales through agents flagging uncertainty and asking for help; (5) expansion to new surfaces and users (COBOL, Fortran; non-developers in security, design, ops); (6) productivity gains reshape economics via timeline compression; (7) cross-org adoption beyond engineering; (8) **the same scaling that helps defenders helps attackers**.

**The most quotable and most honest stat:** developers use AI in roughly **60% of their work** but report being able to **fully delegate only 0–20% of tasks**. `[SEARCH]` `[INFERENCE]` That gap is the entire business case for architecture work — it is a reliability gap, not a capability gap.

### 1.2 OpenAI

**Source:** OpenAI Agents SDK / AgentKit — https://openai.com/index/introducing-agentkit/ , https://developers.openai.com/learn/agents `[SEARCH]` (both blocked)

Responses API is positioned as the successor to the Assistants API beta. Agents SDK provides handoffs, guardrails, sessions, tracing; supports WebSocket transport for the Responses API and SIP connections. Reasoning-effort guidance is model-tiered: higher reasoning effort on the flagship for nuanced agent steps, a mini model for fast conversational steps. `[SEARCH]`

**Agents SDK, read directly from source** — https://github.com/openai/openai-agents-python `[FETCHED]`. Self-described as "a lightweight yet powerful framework for building multi-agent workflows," **provider-agnostic across OpenAI APIs and 100+ other LLMs**. Primitives: **Agents** (instructions + tools + guardrails + handoffs), **Handoffs/Agent-as-tool**, **Tools** (functions, MCP, hosted), **Guardrails** (input/output validation), **Sessions** (automatic history), **Tracing**, **Human-in-the-Loop**, plus **Sandbox Agents** (container-based, long-running) and **Realtime/Voice Agents** (`gpt-realtime-2.1`). Requires Python 3.10+; `pip install openai-agents`. `[FETCHED]`

> **MATERIAL AND TIME-SENSITIVE — now corroborated across multiple independent sources, though OpenAI's own tracker remained blocked:**
> **On June 3, 2026, OpenAI added three platform-level deprecations to its official deprecation tracker, all sharing a November 30, 2026 shutdown date: the Evals Platform, Agent Builder, and Reusable Prompts (`v1/prompts` API).** Evals content goes **read-only October 31, 2026** and **shuts down November 30, 2026**. OpenAI's stated migration path: the **Agents SDK** for code-managed agents, or **ChatGPT Workspace Agents** for workspace-managed natural-language workflows. `[SEARCH]`, multi-source
> Sources: https://therouter.ai/news/openai-evals-agent-builder-prompts-deprecation-november-2026/ , https://codex.danielvaughan.com/2026/06/04/openai-june-2026-platform-deprecations-evals-agent-builder-prompts-codex-cli-migration/ , https://linkloot.io/blog/openai-agent-builder-evals-shutdown-migration
> `[INFERENCE]` Directionally safe to publish given four independent corroborating sources and specific, consistent dates — but attribute it as "OpenAI's deprecation tracker" and re-check the tracker before print, since the exact date is the whole point of the claim.

Model names surfaced in 2026 sources: `gpt-5.5`, `gpt-5.4-mini`, `gpt-5.6`. `[SEARCH]` — **treat all model identifiers as UNVERIFIED**; they appear only in secondary blogs here.

### 1.3 Google

**Source:** Agent Development Kit (ADK), Python — https://github.com/google/adk-python `[FETCHED]`

Self-described as "an open-source, code-first Python framework for building, evaluating, and deploying sophisticated AI agents with flexibility and control." **Version 2.0 is current and carries breaking changes** to the agent API, event model and session schema. Sessions written by 2.0 remain readable by ADK 1.28+, but are **incompatible with older 1.x**. Two core primitives: **Agent** (instructions, tools, behavior) and **Workflow** (graph-based orchestration). The workflow runtime supports routing, fan-out/fan-in, loops, retries, state, human-in-the-loop and nested workflows. There is a **Task API for multi-agent delegation**. Built-in evaluation via `adk eval <agent> <evalset.json>`. Bi-weekly stable release cadence. `[FETCHED]`

**Source:** Gemini context windows — https://docs.cloud.google.com/vertex-ai/generative-ai/docs/release-notes `[SEARCH]` (blocked)

Gemini 3.1 Pro at 1M tokens; **Gemini 3.5 Pro reported GA in late June 2026 with a 2M-token context window and a "Deep Think" reasoning mode**, described as the largest production context window from a major provider. `[SEARCH]` — **UNVERIFIED model/version detail. Do not publish these version numbers without a Google primary source.**

Grounding surfaces: Grounding with Google Search, Grounding with Vertex AI Search / Agent Search, under the "Gemini Enterprise Agent Platform" branding (a rename from Vertex AI in some doc paths). `[SEARCH]`

### 1.4 Where the labs AGREE

`[INFERENCE]` from the sources above — this convergence is well-supported:

1. **Context is the scarce resource, not parameters or tokens-per-second.** Anthropic ("attention budget"), Cognition ("at the core of reliability is Context Engineering"), LangChain (write/select/compress/isolate) all say the same thing in different vocabulary.
2. **Tools are an interface design problem, not a plumbing problem.** Anthropic's ACI framing, OpenAI's guardrails/handoffs, ADK's tool ecosystem all treat tool definition quality as a first-class determinant of agent reliability.
3. **Evaluation is the control loop.** Every vendor now ships evals in-framework (ADK `adk eval`, OpenAI evals, LangSmith).
4. **Start simple.** Every vendor's own docs open with a version of "don't build an agent if a workflow will do."
5. **Human-in-the-loop and durable execution are production requirements**, not nice-to-haves — explicit in LangGraph and ADK feature lists. `[FETCHED]` for both.

### 1.5 Where the labs genuinely DISAGREE — the most valuable section

**Disagreement 1 — Multi-agent: parallelize, or don't.**
- **Anthropic:** orchestrator-worker multi-agent beat single-agent by 90.2% on internal research evals; subagent context isolation is a feature. `[SEARCH]`
- **Cognition (Devin):** "Don't Build Multi-Agents" — https://cognition.com/blog/dont-build-multi-agents `[SEARCH]`. Walden Yan's argument: multi-agent architectures produce **fragile systems through poor context sharing and conflicting decisions**; multiple agents fracture context and compound errors.
- **Resolution `[INFERENCE]`:** these are not actually contradictory once you condition on task shape. Anthropic's win case is **read-heavy, breadth-first, parallel-decomposable** (research). Cognition's failure case is **write-heavy, tightly-coupled, dependency-laden** (coding, where subagent A's edit invalidates subagent B's assumption). The real rule: *parallelize reads, serialize writes.* That framing is the single most useful thing in this brief and I have not seen it stated crisply by either vendor — it is a genuine editorial opening.
- Third position: LangChain, "How and when to build multi-agent systems" — https://www.langchain.com/blog/how-and-when-to-build-multi-agent-systems `[SEARCH]` (blocked).

**Disagreement 2 — MCP as tool transport, vs. code execution / CLI.**
- **Pro-MCP:** protocol gives auth, audit trails, multi-tenant support that CLI cannot. `[SEARCH]`
- **Anti-MCP:** MCP is a "context hog"; a standard GitHub MCP server reportedly dumps **~55,000 tokens** into context before doing anything useful; MCP tools don't chain or pipe. `[SEARCH]` (https://www.firecrawl.dev/blog/mcp-vs-cli)
- **Anthropic's own hedge:** Anthropic — the author of MCP — published the code-execution post arguing you should *stop calling MCP tools directly* and instead compile them to code modules. `[SEARCH]` That is a vendor arguing against the naive use of its own protocol, which is unusually honest and worth calling out.
- **Counter-counter:** Speakeasy argues dynamic toolsets get ~100× token reduction **without** code mode — https://www.speakeasy.com/blog/how-we-reduced-token-usage-by-100x-dynamic-toolsets-v2/ `[SEARCH]`. So there are at least three live positions, not two.

**Disagreement 3 — Framework or no framework.**
- Anthropic keeps the loop minimal and leans on model-native reasoning; vendor SDKs (Claude Agent SDK, OpenAI Agents SDK) ship tool use, memory and tracing "without the framework abstraction tax." `[SEARCH]`
- LangGraph's position: you need durable execution, checkpointing, time-travel debugging and graph-shaped control flow, and hand-rolling those is worse. `[FETCHED]` (README claims)
- Reported concrete cost: **CrewAI carries up to 3× the token overhead of LangGraph on simple workflows.** `[SEARCH]` — UNVERIFIED benchmark, single secondary source, no methodology seen.

**Disagreement 4 — Long context vs. retrieval.** See §3.

**Disagreement 5 — Statefulness in the protocol layer.** MCP's 2026-07-28 revision removed protocol-level sessions entirely — a direct reversal of the original design. See §4.

---

## 2. Context engineering & memory

> **Read §1.1b first.** Anthropic materially updated this guidance in **July 2026**. The curation principles below still hold; the *prescriptiveness* advice reversed. Presenting §2 without §1.1b would reproduce the exact error this brief exists to prevent.

**The core claim** (Anthropic, corroborated across many independents): every frontier model gets **measurably worse as context grows, well before the window fills**. `[SEARCH]`

**Named techniques:**
- **Compaction** — summarize, then restart in a fresh window. Described as the canonical implementation for extended interactions. `[SEARCH]`
- **Structured note-taking** — persist state outside the context window; the agent writes notes it can re-read.
- **Sub-agent context isolation** — split context across windows that communicate through narrow interfaces; quarantine noisy tool output in a subagent so it never touches the main thread. `[SEARCH]`
- **Just-in-time retrieval** — load context at the moment of need rather than pre-loading. `[SEARCH]`

**Competing taxonomy — LangChain: write / select / compress / isolate** — https://www.langchain.com/blog/context-engineering-for-agents `[SEARCH]` (blocked). `[INFERENCE]` This maps almost 1:1 onto Anthropic's technique list; the vocabulary differs, the engineering does not. Useful for the guide: give readers both vocabularies and one mapping table.

**Why "just use a bigger context window" is not the answer** — the actual arguments, in order of strength:
1. **Attention degrades before capacity does.** Information mid-context receives less attention than information at the start or end (lost-in-the-middle). `[SEARCH]`
2. **Measured degradation:** a 200K-token window reportedly shows serious accuracy loss at ~50K tokens of input. `[SEARCH]` — UNVERIFIED, single source.
3. **Multi-needle ≠ single-needle.** Single-needle NIAH scores reportedly **overstate production capability by 15–40 points**. Gemini 1.5 Pro cited at 99.7% single-needle recall but ~60% average recall on multi-fact retrieval. `[SEARCH]` — this is the strongest technical argument available and it deserves primary-source verification.
4. **Cost and latency scale with tokens**, and prefill dominates.

**Memory in 2026 — the shift to memory-as-tools.** Rather than a fixed pre-step retrieval, memory operations (store, retrieve, navigate, update, discard) are exposed as **callable tools** the agent invokes inside its reasoning loop. A vector DB returns similar records; a *memory system* decides what becomes a memory, links facts, replaces stale ones, preserves history, and ranks before injection — similarity search alone does not manage memory. `[SEARCH]` (https://usewire.io/blog/memory-as-tools-2026-agent-memory-pattern/)

Reported: Mem0's LOCOMO benchmark shows tool-based memory at **91% lower latency and 90% fewer tokens than full-context**. `[SEARCH]` — vendor benchmark, self-reported, treat accordingly. https://mem0.ai/blog/state-of-ai-agent-memory-2026

Named memory frameworks in play: Mem0, Letta, Cognee, EverMind, ReMe (file-based). `[SEARCH]`

Academic benchmarks that exist and would strengthen the guide if fetched: **AMA-Bench** (long-horizon memory, arXiv 2602.22769), **MemSyco-Bench** (sycophancy in agent memory, arXiv 2607.01071). Both `arxiv.org` blocked — UNVERIFIED.

---

## 3. Retrieval (RAG in 2026)

### 3.1 Is "RAG is dead" a real position or a strawman?

**It is a strawman in its strong form, and a real position in its weak form.** `[INFERENCE]`, well supported:

- The strong claim ("million-token windows eliminate retrieval") circulated virally in **January 2026** and is not held by serious practitioners. `[SEARCH]`
- The defensible claim is narrower and widely held: **naive RAG is dead.** Chunk everything → embed → top-k cosine → stuff the prompt. That specific pipeline is what practitioners are abandoning. `[SEARCH]`
- Reported split: the debate divides developers roughly 50/50, which itself indicates the strong form has real adherents. `[SEARCH]` — UNVERIFIED survey basis.

Sources: https://byteiota.com/rag-vs-long-context-2026-retrieval-debate/ , https://pmnorthstar.in/ai-decoded/rag-overrated-debate-2026 , https://www.neuramonks.com/blog/standard-rag-is-dead-heres-whats-replacing-it-in-2026 — all `[SEARCH]`, all secondary.

### 3.2 What the surviving architecture actually looks like

**The hybrid consensus:** dense (vector) + lexical (BM25) run in parallel → fused with **Reciprocal Rank Fusion (RRF)** → **cross-encoder reranking** → small final context. `[SEARCH]`

Concrete numbers reported by practitioners (all `[SEARCH]`, treat as directional):
- Retrieve top 100 via hybrid → rerank → keep top 5–10 for the LLM.
- Simpler rule of thumb: retrieve 20, rerank to 5, send 3–5.
- A cross-encoder reranker over top-50 improves top-5 precision without disproportionate cost.
- Named rerankers in use: Cohere Rerank 3.5, BGE-Reranker.
- **BM25 remains undefeated for exact-token retrieval** — product codes, legal terms, unique acronyms. This is the single most repeated practitioner point and the one most often missed by vector-only designs.

**Chunking:** the claim that **~80% of RAG failures trace to the ingestion/chunking layer, not the LLM** `[SEARCH]` is the most useful framing available. 500-token chunks with overlap is the "OK" default; mature systems use **semantic chunking** (split where embedding similarity between adjacent sentences drops below a threshold) plus enriched metadata. Target: each chunk should be independently answerable.

**Agentic retrieval** — the model decides *whether, what and how* to retrieve, across multiple steps, reformulating queries and judging sufficiency, rather than retrieval being a fixed pre-step. `[SEARCH]` This is the actual successor to classic RAG, and it is the same architectural move as memory-as-tools (§2): *turn a fixed pipeline stage into a tool the agent calls.* `[INFERENCE]` — that unifying observation is a strong editorial spine for the guide.

**The long-context/RAG decision framework** reported for 2026 `[SEARCH]`:
- Above ~200K tokens with non-Gemini frontier models, RAG over focused chunks typically beats naive long-context.
- Above ~400K tokens, RAG almost always wins.
- **The 2026 default is hybrid: retrieve 50K–200K relevant tokens, then reason over them with long context.**
- Retrieval still wins unconditionally when the corpus is huge, fresh, or access-controlled. (Access control is the argument nobody can wave away — you cannot ACL a context window.) `[INFERENCE]`

Useful survey (blocked, arXiv): "Engineering the RAG Stack: A Comprehensive Review of the Architecture and Trust Frameworks for RAG Systems", arXiv 2601.05264 — UNVERIFIED.

---

## 4. Protocols & interop

### 4.1 MCP — the 2026-07-28 revision is the biggest story in this brief

**This is what a guide written six months ago gets most wrong.**

**Primary sources (both fetched):**
- https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/ `[FETCHED]` — published **May 21, 2026**, authors **David Soria Parra and Den Delimarsky** (Lead Maintainers).
- https://github.com/modelcontextprotocol/modelcontextprotocol/releases `[FETCHED]` — confirms **2026-07-28 stable, released July 28, 2026**; RC tagged May 29, 2026.
- https://blog.modelcontextprotocol.io/posts/ `[FETCHED]` — blog index with dated post list.

**Current spec version: `2026-07-28`.** Supersedes `2025-11-25`. Described by its own maintainers as **"the largest revision of the protocol since launch."** `[FETCHED]`

**What changed — four pillars** `[FETCHED]`:

1. **Stateless protocol core.** The `initialize` / `notifications/initialized` handshake is **removed**. The `Mcp-Session-Id` header is **removed** from the Streamable HTTP transport. Servers no longer need sticky sessions, shared session stores, or deep packet inspection — **any instance can serve any request behind a round-robin load balancer.** Client information now travels in `_meta` on every request instead of once at connection time.
2. **Extensions framework** — formal governance, reverse-DNS identifiers, negotiated capabilities, independent versioning. Two official extensions ship: **MCP Apps** (server-rendered HTML UIs in sandboxed iframes) and **Tasks** (reshaped for stateless operation).
3. **Authorization hardening** — six SEPs aligning MCP with OAuth 2.0 and OpenID Connect, including **`iss` parameter validation per RFC 9207** and **OpenID Connect `application_type` declaration during Dynamic Client Registration**.
4. **Feature lifecycle / formal deprecation policy** — deprecated features (**Roots, Sampling, Logging**) follow a lifecycle with **at least twelve months between deprecation and removal**.

**The statelessness rationale, in the maintainers' own framing** `[FETCHED]`: removing protocol-level sessions does not require stateless *applications*. Instead of hidden session state, **servers mint explicit handles that the model passes between tool calls** — making state visible and composable rather than opaque. `[INFERENCE]` This is a genuinely good architectural idea and under-covered; it generalizes beyond MCP.

**Breaking changes are acknowledged**, particularly for Tasks API users. Ten-week validation window between RC lock (May 21) and final (July 28). `[FETCHED]`

**Forward-compatibility promise, quoted from the RC post** `[FETCHED]`:
> "With it landed, and with deprecation windows and extensions as the standard tools going forward, our expectation is that implementers targeting `2026-07-28` will be able to adopt future revisions without rewriting their transport or lifecycle code."

**Other dated MCP milestones from the blog index** `[FETCHED]`:
| Date | Post |
|---|---|
| 2026-01-23 | January MCP Core Maintainer Update |
| 2026-01-26 | MCP Apps — Bringing UI Capabilities To MCP Clients (official extension) |
| 2026-03-09 | The 2026 MCP Roadmap |
| 2026-03-11 | Understanding MCP Extensions |
| 2026-03-16 | Tool Annotations as Risk Vocabulary |
| 2026-04-08 | Expanding the MCP Maintainer Team (Clare Liguori joins Core; Den Delimarsky becomes Lead Maintainer) |
| 2026-06-18 | Enterprise-Managed Authorization: Zero-touch OAuth for MCP — extension now **stable**; adopted by Anthropic, Microsoft, Okta |
| 2026-06-29 | Beta SDKs for the 2026-07-28 RC |
| 2026-07-28 | The 2026-07-28 Specification |

Secondary but useful context: The Register, "Model Context Protocol prepares to break with its stateful past", 2026-07-23 — https://www.theregister.com/devops/2026/07/23/model-context-protocol_prepares_to_break_with_its_stateful_past/5276722 `[SEARCH]` (URL as returned by search; verify exact path). Also WorkOS on the auth changes — https://workos.com/blog/mcp-2026-spec-agent-authentication `[SEARCH]`.

**Full changelog — NOW FETCHED.** The docs site was blocked, but the changelog source lives in the spec repo and was retrieved directly:
https://raw.githubusercontent.com/modelcontextprotocol/modelcontextprotocol/main/docs/specification/2026-07-28/changelog.mdx `[FETCHED]`
It compares against **2025-11-25**. Item-by-item, with SEP numbers:

**Major changes** `[FETCHED]`
| Change | SEP |
|---|---|
| Remove protocol-level sessions and the `Mcp-Session-Id` header from Streamable HTTP. List operations stay consistent across connections; servers use **explicit handles** to maintain state | SEP-2567 |
| Make MCP stateless: remove the `initialize`/`notifications/initialized` handshake. Protocol version + client capabilities travel with **every request via `_meta`**. Version conflicts raise `UnsupportedProtocolVersionError` | SEP-2575 |
| New **`server/discover` RPC** — servers advertise protocol versions, capabilities and identity | SEP-2575 |
| Replace the HTTP GET endpoint and `resources/subscribe`/`unsubscribe` with a unified **`subscriptions/listen`** | SEP-2575 |
| Remove **`ping`**, **`logging/setLevel`**, **`notifications/roots/list_changed`**. Log levels now per-request via `_meta` | SEP-2575 |
| Tasks moved from experimental into the official extension **`io.modelcontextprotocol/tasks`**; blocking calls replaced by **polling** | SEP-2663 |
| **Multi Round-Trip Requests (MRTR)** replaces server-initiated requests, using `InputRequiredResult` to ask for more information | SEP-2322 |
| All results carry a required **`resultType`** field: `"complete"` or `"input_required"` | SEP-2322 |
| **Remove SSE stream resumability and message redelivery** — a broken stream requires full request resubmission | SEP-2575 |

**Minor changes** `[FETCHED]` — `extensions` field added to capability structures; **OpenTelemetry trace-context propagation conventions documented** (SEP-414); servers **SHOULD** return `tools/list` in **deterministic order** (for caching); standard MCP headers required on POST, custom headers via `x-mcp-header` (SEP-2243); **`ttlMs` and `cacheScope` required** on list/read operations (SEP-2549); resource-not-found error moves `-32002` → `-32602` for JSON-RPC compliance; authorization servers **SHOULD** include `iss` per RFC 9207 (SEP-2468); `application_type` specified during DCR (SEP-837); credentials keyed by issuer and **non-transferable between authorization servers** (SEP-2352); `inputSchema`/`outputSchema`/`structuredContent` validation loosened (SEP-2106); `notifications/elicitation/complete` removed under MRTR; error-code allocation formalized, spec-defined codes renumbered into **-32020…-32099**.

**Deprecated** `[FETCHED]` — **Roots, Sampling, Logging** (SEP-2577); **HTTP+SSE transport** reclassified Deprecated, migrate to Streamable HTTP (SEP-2596); `includeContext` values `"thisServer"`/`"allServers"` (SEP-2596); **OAuth 2.0 Dynamic Client Registration deprecated in favour of Client ID Metadata Documents** (PR #2858).

**Governance** `[FETCHED]` — feature lifecycle adopted with **Active / Deprecated / Removed** states and **minimum twelve-month** windows (SEP-2596).

`[INFERENCE]` Three of these are under-reported and architecturally significant beyond MCP itself: **`ttlMs` + `cacheScope` make cacheability a protocol-level contract**; **deterministic tool ordering exists specifically to keep prompt caches warm** (§6.2); and **OTel trace-context propagation is now written into the protocol**, which is how you actually get end-to-end traces across an agent/server boundary (§6.1).

### 4.2 A2A (Agent2Agent)

- Google transferred A2A to the **Linux Foundation in June 2025**; the Agent2Agent project provides vendor-neutral governance. `[SEARCH]`
- **A2A reached v1.0 in 2026.** `[SEARCH]`
- **One-year milestone, announced 2026-04-09:** **150+ organizations**, **22,000+ GitHub stars**, SDKs in **five** production languages, integration across Google, Microsoft and AWS platforms, production deployments in supply chain, financial services, insurance and IT operations. Sources: https://www.linuxfoundation.org/press/a2a-protocol-surpasses-150-organizations-lands-in-major-cloud-platforms-and-sees-enterprise-production-use-in-first-year and https://www.hpcwire.com/aiwire/2026/04/09/linux-foundation-a2a-protocol-marks-one-year-with-broad-enterprise-and-cloud-adoption/ `[SEARCH]`
- **Division of labor:** MCP connects an agent to *resources* (data, tools, APIs). A2A connects an agent to *another agent as an actor with its own capabilities*. They are complementary, not competing. `[SEARCH]`
- **Honest adoption read** `[SEARCH]` + `[INFERENCE]`: one analyst notes the Linux Foundation release cites organizations and stars but **not production deployment counts or usage metrics**, whereas MCP has thousands of publicly listed servers and directly measurable client adoption (Claude Desktop, Cursor, Windsurf). Treat A2A adoption as **real but earlier-stage and less instrumented than MCP's**. This is a defensible, sourced, contrarian line.

### 4.3 Tool registries
MCP registry ecosystem exists but is a demonstrated attack surface — see §6.3.

---

## 5. Evaluation & reliability

**The headline finding — LLM-as-judge fails specifically on agent trajectories.**

**Source:** "From Confident Closing to Silent Failure: Characterizing False Success in LLM Agents", arXiv 2606.09863 `[SEARCH]` (arxiv.org blocked — **not fetched, verify before citing**)

Reported result: judges **anchor on confident closing-message language as evidence of completion**, and false-success trajectories produce exactly that language. On **tau2-bench**, **no configuration across 5 judge models, 5 prompt strategies, and a strong baseline exceeded AUROC 0.65.** `[SEARCH]`

`[INFERENCE]` If that number holds, it is the most important eval finding of 2026 for practitioners: the default reliability mechanism the whole industry adopted (an LLM judge reading the trajectory) is barely better than a coin flip at catching silent failure. That is a headline claim worth the cost of verifying properly.

**Trajectory vs. outcome evals** `[SEARCH]`:
- **Outcome-only scoring hides** inefficiency, over-reliance on fallback loops, and brittle reasoning chains. An agent reaching the right answer through a convoluted, expensive, fragile path is not equivalent to one that reaches it cleanly.
- An agent can pass on outcome while the **trajectory reveals it used the wrong tool** and the results merely happened to overlap.
- Trajectory evaluation scores the whole execution path — tools selected, intermediate reasoning, conversation turns — commonly across grounding/context use, UX quality, and security/safety.
- Source: LangChain, "LLM Evaluation Framework: Trajectories vs. Outputs" — https://www.langchain.com/resources/llm-evaluation-framework `[SEARCH]` (blocked).

**Making LLM-as-judge usable at all** `[SEARCH]`: structured rubrics, multiple judge passes, and **calibration against human-labeled examples** to control bias and drift. Source: https://zylos.ai/research/2026-05-26-llm-as-judge-agent-evaluation-patterns/

**Other 2026 agent-eval literature surfaced (all arXiv, all BLOCKED, all UNVERIFIED):**
- "The Long-Horizon Task Mirage? Diagnosing Where and Why Agentic Systems Break" — arXiv 2604.11978
- "AgentRx: Diagnosing AI Agent Failures from Execution Trajectories" — arXiv 2602.02475
- "Counsel: A Meta-Evaluation Dataset for Agentic Tasks" — arXiv 2606.21627
- "CocoaBench: Evaluating Unified Digital Agents in the Wild" — arXiv 2604.11201

**In-framework eval support** `[FETCHED]`: Google ADK ships `adk eval <agent> <evalset.json>`. LangGraph pairs with LangSmith for tracing/visualization.

**Vendor eval churn:** OpenAI reportedly winding down its hosted Evals product Nov 30, 2026 (see §1.2) — if true, this pushes teams toward code-defined evals. `[SEARCH]`, UNVERIFIED.

---

## 6. Production concerns

### 6.1 Observability — OpenTelemetry GenAI semantic conventions

**Status: NOT stable. This is the single most commonly mis-stated fact in current writing.**

**Sources:**
- https://github.com/open-telemetry/semantic-conventions/tree/main/docs/gen-ai `[FETCHED]` — the directory now carries a relocation notice: "GenAI semantic conventions have moved to the OpenTelemetry GenAI semantic conventions repository. This page has moved and is no longer maintained in this repository."
- https://github.com/open-telemetry/semantic-conventions-genai `[FETCHED]` — the new home. Self-described: "Semantic Conventions for Generative AI (GenAI), including spans, metrics, and events for GenAI clients, MCP (Model Context Protocol), and provider-specific conventions." Repo state at fetch: 266 stars, 82 forks, 137 open issues, 47 PRs, 618 commits on main. **Schema URL listed as "TODO."** No stability marker or version stated on the landing page.
- Corroborating secondary: https://dev.to/azena-ai/opentelemetrys-genai-semantic-conventions-are-not-stable-yet-heres-what-actually-shipped-in-2026-3mke `[SEARCH]`

**Key facts:**
- **As of mid-July 2026, every `gen_ai.*` attribute, span, metric and event in the official registry carries the "Development" status badge. None are marked Stable.** No 1.0. Names can still change between versions. `[SEARCH]`
- **The split happened at semantic-conventions v1.42.0, 12 June 2026** — all `gen_ai.*` content moved out of the core repo into the dedicated GenAI repo, giving it its own release cadence away from the stability-bound core. `[SEARCH]`, and **corroborated by the relocation notice I fetched directly** `[FETCHED]`. This is a well-supported claim.
- Conventions now model **the whole agent execution as a span tree**, not just single LLM calls. `gen_ai.operation.name` covers `create_agent`, `invoke_agent`, `invoke_workflow`, `execute_tool`, `retrieval`, `plan`, plus memory operations. `[SEARCH]`
- Files present in the conventions set `[FETCHED]`: `gen-ai-spans.md`, `gen-ai-metrics.md`, `gen-ai-events.md`, `gen-ai-agent-spans.md`, `gen-ai-exceptions.md`, `mcp.md`, plus provider files `anthropic.md`, `openai.md`, `aws-bedrock.md`, `azure-ai-inference.md`.
- **Recommended engineering posture:** adopt now, **pin the convention version you build against**, expect changes. `[SEARCH]`

`[INFERENCE]` Note there is a dedicated **`mcp.md`** convention file — MCP tracing is being standardized inside OTel. That is a small but genuinely new and under-reported detail.

### 6.2 Caching, cost, latency

**Prompt caching semantics differ meaningfully across providers** — this is a real portability trap. All `[SEARCH]`, and **all pricing/TTL numbers should be re-verified against each provider's pricing page before publication; pricing is the fastest-moving fact in this brief.**

| Provider | Mechanism | Reported semantics |
|---|---|---|
| Anthropic | Explicit `cache_control` breakpoints | Writes ~1.25× base input for **5-min TTL**, ~2× for **1-hour TTL**; reads ~0.1× input (90% discount) |
| OpenAI | Historically automatic/implicit | Reported to have **moved to explicit breakpoints with a 1.25× write premium and 30-min TTL** — i.e. converging on Anthropic's model. Automatic caching triggered above ~1,024 tokens of stable prefix |
| Google Gemini | Context caching (implicit + explicit) | Explicit caching adds a **per-hour storage fee**; minimum ~32,768 tokens for cache usage |
| DeepSeek | Automatic | — |

Reported convergence: **as of June 2026 all three major providers discount cached input by ~90%**, but differ on write surcharge, minimum cacheable length, and cache lifetime. `[SEARCH]`

`[INFERENCE]` The architecturally important consequence: **cache-friendliness is a prompt-layout constraint.** Stable prefix first (system prompt, tool definitions, few-shot), volatile content last. Any design that interleaves changing content early destroys the cache across every provider. That principle is provider-independent and safe to publish even if the specific numbers move.

Contrarian data point worth chasing: one practitioner reports **turning caching off and saving 20%** — https://pub.towardsai.net/claude-vs-gpt-5-6-vs-gemini-vs-deepseek-prompt-caching-i-turned-it-off-and-saved-20-2eb63761becd `[SEARCH]`. `[INFERENCE]` Plausible mechanism: write surcharges on low-reuse prefixes exceed read savings. Worth a sidebar — cache writes are not free and low hit-rate caching is a net loss.

### 6.3 Security

**The lethal trifecta** — Simon Willison's framing, originally https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/ `[SEARCH]` (simonwillison.net blocked). Three conditions that together make an agent exploitable:
1. Access to **private data**
2. Exposure to **untrusted content**
3. An **exfiltration vector** (external requests, image rendering, link generation)

**Why it is load-bearing:** you cannot fix it by removing a leg, because removing any leg breaks the agent's usefulness. The 2026 consensus defense is **containment, not prevention** — constrain what each leg can do at runtime and observe every action to block exfiltration paths before they execute. `[SEARCH]` Sources: https://www.sophos.com/en-us/blog/inside-the-lethal-trifecta-blast-radius-reduction-in-ai-agent-deployments , https://www.roval.ai/research/blog/lethal-trifecta-containment-architecture

**OWASP Top 10 for Agentic Applications (2026)** — published by the **OWASP GenAI Security Project**, reported publication **December 9, 2025**, built with 100+ contributors and drawing on real incident data. `[SEARCH]` — **genai.owasp.org was BLOCKED; the list below comes from multiple corroborating secondary sources and MUST be checked against OWASP directly.**

| ID | Risk |
|---|---|
| ASI01 | Agent Goal Hijack |
| ASI02 | Tool Misuse & Exploitation |
| ASI03 | Identity & Privilege Abuse |
| ASI04 | Agentic Supply Chain Vulnerabilities |
| ASI05 | Unexpected Code Execution (RCE) |
| ASI06 | Memory & Context Poisoning |
| ASI07 | Insecure Inter-Agent Communication |
| ASI08 | Cascading Failures |
| ASI09 | Human-Agent Trust Exploitation |
| ASI10 | Rogue Agents |

> **CONFLICT IN SOURCES — flag for the writer.** One source describes ASI01 as "indirect prompt injection"; the corroborated list names ASI01 **"Agent Goal Hijack."** `[INFERENCE]` These are compatible if goal hijack is the *outcome* and indirect prompt injection the *mechanism*, but do not publish "ASI01 = prompt injection" as OWASP's wording. Verify.

**OWASP GenAI LLM Top 10 2026 — published August 4, 2026. Sixteen days old at time of writing. `[FETCHED]`**

This is a **separate list** from the agentic one above, it is **brand new**, and almost nothing currently ranking has absorbed it.

Fetched from the project repo: https://github.com/GenAI-Security-Project/GenAI-LLM-Top10 `[FETCHED]` (canonical page https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ was blocked)

| ID | Risk |
|---|---|
| LLM01:2026 | Prompt Injection |
| LLM02:2026 | Sensitive Information Disclosure |
| LLM03:2026 | Excessive Agency |
| LLM04:2026 | Supply Chain |
| LLM05:2026 | Data and Model Poisoning |
| LLM06:2026 | Unbounded Consumption |
| LLM07:2026 | Misinformation |
| LLM08:2026 | Hidden Context Exposure |
| LLM09:2026 | Vector and Embedding Weaknesses |
| LLM10:2026 | Improper Output Handling |

**What changed from 2025** `[SEARCH]`:
- **Methodology changed for the first time to include real incident data:** community vote carried **75%** of the weight, with the remaining **25%** driven by **6,639 real incidents** pulled from public vulnerability databases and an AI-harm database.
- **Excessive Agency jumped LLM06 → LLM03** — the largest move on the list.
- **Unbounded Consumption rose four places** to LLM06, reflecting availability and financial-DoS risk against extended-thinking models, multimodal inference and shared compute.
- **System Prompt Leakage was renamed and broadened to "Hidden Context Exposure"**, now covering all non-user-visible context — system instructions, **RAG schemas**, hidden policy logic.
- Prompt Injection and Sensitive Information Disclosure held the top two slots.

Sources for the diff: https://www.helpnetsecurity.com/2026/08/06/owasp-2026-llm-top-10-released/ , https://blog.checkpoint.com/ai-security/reading-the-signals-in-the-owasp-llm-top-10-2026/ `[SEARCH]`

`[INFERENCE]` **Excessive Agency moving to #3 and Unbounded Consumption climbing four places is the whole 2026 story compressed into a ranking diff:** the industry's risk profile shifted from "the model says something bad" to "the agent *does* something bad, repeatedly, at cost." That single observation is a strong framing device for the guide's security section, and it is sourced from a real methodology change rather than vibes.

**Three distinct OWASP lists now exist and are constantly conflated** `[FETCHED]` + `[SEARCH]`:
1. **GenAI LLM Top 10 2026** (LLM01–LLM10) — Aug 4, 2026
2. **Top 10 for Agentic Applications** (ASI01–ASI10) — reported Dec 9, 2025
3. **MCP Top 10** — reported mid-2025

A guide that conflates them will be wrong. Note also the repo move: `OWASP/www-project-top-10-for-large-language-model-applications` is now **"a legacy entry point and historical archive"**; active development is at `GenAI-Security-Project/GenAI-LLM-Top10`. `[FETCHED]`

**Reported incident/trend data** (all `[SEARCH]`, all secondary, all UNVERIFIED — these are attention-grabbing and correspondingly risky to repeat):
- January 7–15, 2026: four production exploits in five days (IBM Bob, Notion AI, Superhuman, Claude Cowork), all reportedly hitting the same trifecta pattern.
- A Google study (April 2026) reporting a **32% increase in malicious prompt-injection attempts** between Nov 2025 and Feb 2026.

**MCP supply chain — the most concrete security story of 2026** `[SEARCH]`:
- **February 2026:** the **SmartLoader** malware operation built a fake developer ecosystem with AI-generated personas and submitted a **trojanized Oura Ring MCP server** to a legitimate MCP market registry. Payload: **StealC** infostealer exfiltrating browser passwords, cloud session tokens, Discord credentials, SSH keys, crypto wallet files and API keys.
- **April 2026, OX Security research:** tested **11 MCP registries** with controlled malicious entries — **9 of 11 accepted them.**
- A 2026 survey of **1,800+ deployed MCP servers** found **over 30% had at least one exploitable vulnerability.**
- Attack vectors: server spoofing and name-squatting against trusted server names, intercepting agents at configuration or update time.
- **Conclusion the sources converge on:** the discovery layer cannot be treated as trusted. Registry-level verification and namespace controls are required.
- Sources: https://www.upguard.com/blog/mcp-security-incidents , https://cyberstrategyinstitute.com/mcp-security-supply-chain-crisis/ , https://appsentinels.ai/blog/mcp-supply-chain-security-how-malicious-mcp-servers-are-infiltrating-enterprise-ai-environments/

`[INFERENCE]` The MCP 2026-07-28 auth hardening (§4.1) and the Enterprise-Managed Authorization extension going stable in June 2026 read as a direct institutional response to this pressure. Worth stating as a connected narrative rather than two unrelated facts.

### 6.4 Sandboxing agent code execution

`[INFERENCE]` This section connects directly to §1.1 — if you adopt code-execution-with-MCP for its ~98% token savings, **you have just made arbitrary model-generated code an execution path**, and sandboxing stops being optional. The two topics are almost never discussed together, which is an opening.

**The threat model is different from classic sandboxing** `[SEARCH]`: the code is generated at runtime by an LLM and cannot be reviewed before execution, so the posture shifts from "protect against bugs" to **"protect against arbitrary adversarial code."**

**Reported 2026 consensus: shared-kernel isolation is not an acceptable default for untrusted agent code.** `[SEARCH]`

| Approach | Isolation | Reported tradeoff | Fits |
|---|---|---|---|
| **MicroVMs** (Firecracker, Kata) | Strongest — dedicated kernel per workload, hardware boundary | Highest overhead | Production agents running untrusted generated code |
| **gVisor** (user-space kernel) | Syscall-level; stronger than containers, weaker than VMs | **10–30% overhead on I/O-heavy** workloads; fast startup | Compute-heavy agents with limited I/O |
| **Hardened containers** (seccomp, AppArmor, capability dropping) | Weakest | Lowest overhead | **Only** code you have reviewed and trust |

Defense-in-depth is the stated requirement: isolation boundary **plus** resource limits **plus** network controls **plus** permission scoping **plus** monitoring. `[SEARCH]`

Sources: https://northflank.com/blog/how-to-sandbox-ai-agents , https://zylos.ai/research/2026-04-04-ai-agent-sandboxing-security-isolation/ , https://emirb.github.io/blog/microvm-2026/ , https://www.firecrawl.dev/blog/ai-agent-sandbox `[SEARCH]`

One widely-repeated figure — "sandboxed agents reduce security incidents by ~90% vs unrestricted host access" `[SEARCH]` — is **UNVERIFIED**, attributed only to unnamed "2026 infrastructure research." Do not publish it.

`[INFERENCE]` The network control is the one people skip and the one that matters most: it is the **exfiltration leg of the lethal trifecta**. A microVM with unrestricted egress has not closed the trifecta; it has only made the RCE harder.

---

## 7. Reference architectures that actually ship

| Name | URL | What it is | Good for | Concrete weakness |
|---|---|---|---|---|
| **LangGraph** | https://github.com/langchain-ai/langgraph `[FETCHED]` | "Low-level orchestration framework for building, managing, and deploying long-running, stateful agents." Durable execution, checkpointing, HITL, short+long-term memory, LangSmith tracing. ~40.1k stars at fetch (a widely-repeated "134k stars" figure `[SEARCH]` is **inconsistent with what I directly observed** — treat 134k as wrong or referring to the LangChain org/repo, not langgraph) | Graph-shaped control flow, resumable long-running agents, HITL approval gates, time-travel debugging | Abstraction tax on simple agents; the graph model is genuinely more concept-heavy than a while-loop. Ecosystem gravity pulls you into the whole LangChain stack |
| **Google ADK (Python)** | https://github.com/google/adk-python `[FETCHED]` | Code-first framework: Agent + Workflow primitives, Task API for delegation, built-in `adk eval`, bi-weekly releases | Teams on Vertex/Agent Engine; multi-agent hierarchies; wanting eval built in | **v2.0 is a breaking change** — agent API, event model and session schema all changed; sessions incompatible below ADK 1.28. Migration cost is real and current |
| **Vercel AI SDK** | https://github.com/vercel/ai `[FETCHED]` | Provider-agnostic TypeScript toolkit. `ToolLoopAgent`, `createAgentUIStreamResponse`, `UIToolInvocation`, `InferAgentUIMessage`, built-in `imageGeneration()` / `localShell()` tools; unified provider layer via AI Gateway or direct | TypeScript/React product surfaces; streaming agent UIs; provider portability | Weakest on long-running/durable orchestration — it is a client+loop SDK, not a workflow engine. High repo churn at fetch (1,000+ open PRs, 766 open issues) |
| **Microsoft Foundry baseline (chat)** | https://learn.microsoft.com/en-us/azure/architecture/ai-ml/architecture/baseline-microsoft-foundry-chat `[SEARCH]`, impl: https://github.com/Azure-Samples/microsoft-foundry-baseline `[SEARCH]` | Azure Architecture Center baseline + deployable reference implementation. Foundry Agent Service with dependencies in your own subscription (Storage, AI Search, Cosmos DB); declarative agent definition; landing-zone variant | Enterprises needing network isolation, governance and a defensible audit story on Azure | Heavy — you inherit the full Azure landing-zone footprint. Deeply Azure-coupled; near-zero portability. **Not fetched (learn.microsoft.com blocked)** |
| **AWS Well-Architected Agentic AI Lens** | https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentic-ai-lens.html `[SEARCH]` | Published **June 10, 2026**. Extends Well-Architected to agentic systems: agent compute and memory infrastructure, multi-agent orchestration patterns, operational practice for reliability/security/cost | Structured review checklist; getting security and cost review passed in an AWS shop | It is a **lens, not a runnable implementation** — guidance-shaped, so it tells you what to consider, not what to deploy. **Not fetched (blocked)** |
| **AWS Well-Architected Generative AI Lens** | https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/generative-ai-lens.html `[SEARCH]` | Foundation-model workloads; updated with SageMaker HyperPod guidance, expanded Responsible AI preamble, new agentic AI preamble | Non-agentic genAI workloads on AWS | Superseded in the agent-specific parts by the Agentic AI Lens; risk of citing the older one. **Not fetched** |
| **Claude Agent SDK** | (Anthropic; anthropic.com/claude.com blocked) `[SEARCH]` | Same architecture as Claude Code — hooks, deepest MCP integration, Skills, hierarchical subagents (reported up to 3 levels as of June 2026) | Anthropic-native production agents; teams already using Claude Code patterns | Vendor lock by construction. Subagent depth limit reported, UNVERIFIED |
| **Microsoft Agent Framework** | (Microsoft) `[SEARCH]` | Reported Python + .NET **GA simultaneously April 3, 2026**; declarative YAML agent config | .NET shops; declarative config preference | UNVERIFIED — single secondary source, no primary confirmation obtained |
| **awesome-ai-agents-2026** | https://github.com/caramaschiHG/awesome-ai-agents-2026 `[SEARCH]` | Community list, 300+ resources, 20+ categories, updated monthly | Landscape scanning | Unvetted link list; no quality bar; not an architecture |

---

## 8. What is genuinely NEW since ~January 2026

**This is the section that matters most. A guide written in Jan/Feb 2026 gets every one of these wrong.**

1. **MCP `2026-07-28` removed protocol-level sessions.** No `initialize` handshake, no `Mcp-Session-Id`, no `ping`, no `logging/setLevel`. Stateless core, ordinary HTTP scaling, round-robin load balancing; state moves to **explicit handles the model passes between calls**. New `server/discover` RPC; `subscriptions/listen` replaces the GET endpoint and resource subscribe/unsubscribe; **SSE resumability and message redelivery removed**; all results carry a required `resultType`; **MRTR replaces server-initiated requests**. Any guide describing MCP's stateful session lifecycle as current is **now wrong**. `[FETCHED]`
2. **MCP Extensions became the official evolution mechanism**, with reverse-DNS IDs and independent versioning — plus two official extensions, **MCP Apps** (Jan 26, 2026) and **Tasks** (`io.modelcontextprotocol/tasks`, polling instead of blocking). `[FETCHED]`
3. **MCP got a formal deprecation policy** — Active/Deprecated/Removed with a **12-month minimum** window. **Roots, Sampling and Logging are deprecated**; **HTTP+SSE transport is deprecated**; **OAuth 2.0 Dynamic Client Registration is deprecated** in favour of Client ID Metadata Documents. `[FETCHED]`
3b. **MCP made caching and tracing protocol-level concerns** — `ttlMs` + `cacheScope` required on list/read operations, `tools/list` **SHOULD** be deterministically ordered for cache stability, and **OpenTelemetry trace-context propagation is now documented in the spec** (SEP-414). `[FETCHED]`
4. **MCP auth aligned to OAuth 2.0 / OIDC** (six SEPs, RFC 9207 `iss` validation, OIDC `application_type` in DCR), and **Enterprise-Managed Authorization went stable June 18, 2026** with Anthropic, Microsoft and Okta adoption. `[FETCHED]`
5. **OpenTelemetry GenAI conventions split out of the core repo at semantic-conventions v1.42.0 (June 12, 2026)** into `semantic-conventions-genai`, and **remain entirely "Development" status — not one attribute is Stable.** Anyone claiming OTel GenAI is stable is wrong. `[FETCHED]` + `[SEARCH]`
6. **OTel now models agent execution as a span tree** with `create_agent` / `invoke_agent` / `invoke_workflow` / `execute_tool` / `retrieval` / `plan` operations, plus a dedicated **`mcp.md`** convention. `[FETCHED]` (file list) + `[SEARCH]` (operation names)
7. **The MCP supply chain got attacked for real** — SmartLoader's trojanized Oura Ring server (Feb 2026); OX Security poisoning **9 of 11 registries** (April 2026); 30%+ of 1,800 surveyed servers carrying an exploitable vulnerability. The discovery layer is no longer assumable-trusted. `[SEARCH]`
8. **OWASP Top 10 for Agentic Applications (ASI01–ASI10)** now exists as a distinct list from the LLM Top 10 and the MCP Top 10. `[SEARCH]`
9. **Google ADK 2.0 shipped with breaking changes** to agent API, event model and session schema. Any ADK 1.x tutorial is stale. `[FETCHED]`
10. **A2A hit v1.0 and its one-year Linux Foundation milestone (April 9, 2026)** — 150+ orgs, 22k+ stars, five language SDKs. `[SEARCH]`
11. **Memory-as-tools displaced fixed-pre-step retrieval** as the recommended memory pattern; likewise agentic retrieval over classic RAG pipelines. `[SEARCH]`
12. **Prompt-caching semantics converged** — OpenAI reportedly moving from implicit-free to explicit breakpoints with a write premium and 30-min TTL, landing near Anthropic's long-standing model. `[SEARCH]`, UNVERIFIED.
13. **Reported OpenAI wind-down of Agent Builder and hosted Evals (Nov 30, 2026)**, pushing teams to code-defined agents and evals. `[SEARCH]`, UNVERIFIED — **verify before publishing.**
14. **Empirical attack on LLM-as-judge for agents** — tau2-bench AUROC ≤0.65 across 5 judge models × 5 prompt strategies. `[SEARCH]`, UNVERIFIED.
15. **Context windows advanced but the honest ceiling did not** — reported 2M-token Gemini 3.5 Pro (late June 2026) alongside evidence that effective multi-needle context for most frontier models sits at **200–400K**. `[SEARCH]`, UNVERIFIED.
16. **Anthropic cut >80% of Claude Code's system prompt (July 24, 2026) with no measurable eval loss** — ~800 → ~164 tokens — and published "the new rules of context engineering" for Claude 5-generation models: rules → judgement, examples → interface design, upfront → progressive disclosure, repetition → simple tool descriptions, `CLAUDE.md` memory → auto-memory, simple specs → rich references. Diagnosis: **overconstraining**. Shipped `/doctor` to rightsize skills and `CLAUDE.md`. **This is the single most guide-invalidating item on this list** — prompt-engineering advice written before July 2026 now points the wrong way for current models. `[SEARCH]`
17. **Claude Managed Agents shipped dreaming, outcomes and multi-agent orchestration (May 6, 2026)** — scheduled memory consolidation, rubric-scored self-grading (reported +10pp on hard tasks), and lead-agent fan-out to up to 20 subagents across up to 25 parallel threads. `[SEARCH]`; existence of `managed_agents/` and Fable 5 independently confirmed in the cookbooks repo `[FETCHED]`.
18. **OWASP GenAI LLM Top 10 2026 published August 4, 2026** — two weeks old. First edition weighted by **real incident data (75% vote / 25% from 6,639 incidents)**. **Excessive Agency LLM06 → LLM03**; Unbounded Consumption up four; System Prompt Leakage broadened to **Hidden Context Exposure** (now covering RAG schemas and hidden policy logic). `[FETCHED]`
19. **OpenAI's June 3, 2026 deprecations** — Evals Platform, Agent Builder and Reusable Prompts (`v1/prompts`) all shut down **November 30, 2026**, Evals read-only from **October 31, 2026**. Migration path: Agents SDK or ChatGPT Workspace Agents. `[SEARCH]`, multi-source
20. **Sandboxing consensus hardened** — shared-kernel isolation is no longer an acceptable default for untrusted agent-generated code; microVMs (Firecracker/Kata) or gVisor, with network egress control treated as the exfiltration leg of the lethal trifecta. `[SEARCH]`

---

## 9. Competitive landscape

**First, the most important SEO finding: "AI architecture" is a genuinely ambiguous query and the SERP is fragmented across three unrelated intents** `[SEARCH]`:
1. **Chip/hardware architecture** — NVIDIA Rubin, inference-engine silicon, chiplets. This intent is loud, well-funded, and dominates a lot of "AI architecture" surface.
2. **Enterprise IT/system architecture** — AI-native enterprise, AgentOS, AI gateways, MLOps.
3. **LLM/agent application architecture** — the actual subject of this guide.

`[INFERENCE]` **Strategic consequence:** do not target the bare head term "AI architecture." It is contested by semiconductor content with far stronger domain authority and a different searcher. Target **"AI agent architecture," "LLM application architecture," "agent architecture best practices," "RAG architecture 2026"** — where intent is unambiguous and the competition is materially weaker.

### The competing resources

| # | Resource | URL | Publisher | Covers well | Concrete weakness |
|---|---|---|---|---|---|
| 1 | Building Effective AI Agents | anthropic.com/engineering/building-effective-agents | Anthropic | The canonical pattern vocabulary. Everyone cites it. Genuinely excellent | **Published Dec 2024 and never substantially revised.** Predates MCP statelessness, Skills, code-execution-with-MCP, the whole 2026 protocol layer. It is a *patterns* document with no production concerns — no observability, cost, security or eval depth |
| 2 | Effective context engineering for AI agents | anthropic.com/engineering/effective-context-engineering-for-ai-agents | Anthropic | Best single articulation of attention-budget thinking, compaction, sub-agent isolation | Anthropic-centric; no cross-vendor comparison. Conceptual — thin on runnable specifics and numbers |
| 3 | Types of AI Agent Architectures: 2026 Developer Guide | mlflow.org/articles/types-of-ai-agent-architectures-2026-developer-guide/ | MLflow (Databricks) | Well-organized taxonomy, current-dated, decent SEO position | Vendor-adjacent — funnels toward MLflow tracing/eval. Taxonomy-heavy, decision-light: tells you what architectures exist, not which to pick under what constraint |
| 4 | LLM Application Architecture: A 2026 Engineer's Guide | mlflow.org/articles/llm-application-architecture-a-2026-engineers-guide/ | MLflow (Databricks) | Clean layered model (UI → orchestration → agents/tools → retrieval → model → safety/eval) | Same vendor funnel. Layer diagrams are generic enough to have been written in 2024 — little that is specifically 2026 |
| 5 | The best AI agent frameworks in 2026 | langchain.com/resources/ai-agent-frameworks | LangChain | Actual comparison methodology (docs + repos + Reddit/HN sentiment + DX/reliability/observability axes) | **LangChain evaluating the framework category LangGraph competes in.** Structural conflict of interest, unacknowledged |
| 6 | Context Engineering | langchain.com/blog/context-engineering-for-agents | LangChain | The write/select/compress/isolate taxonomy is genuinely useful and more memorable than Anthropic's list | Maps everything back onto LangGraph primitives. Same COI |
| 7 | Don't Build Multi-Agents | cognition.com/blog/dont-build-multi-agents | Cognition | The strongest contrarian argument in the field. Specific failure mechanisms (context fracture, conflicting decisions) | **Overgeneralizes from coding to all agent work.** Presents a task-shape-conditional finding as a universal rule. Also self-interested — Devin is a single-agent product |
| 8 | AWS Well-Architected Agentic AI Lens | docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/ | AWS | Most rigorous review-checklist framing available; June 2026, genuinely current | AWS-only and abstraction-heavy. Guidance not implementation — you cannot deploy a lens. Long, dry, low readability |
| 9 | Baseline Microsoft Foundry Chat Reference Architecture | learn.microsoft.com/en-us/azure/architecture/ai-ml/architecture/baseline-microsoft-foundry-chat | Microsoft | Actually deployable, with a companion repo. Real network isolation and governance detail | Azure-locked; assumes landing zones. **Chat baseline, not an agent baseline** — the naming ("Foundry Agent Service") oversells how agentic the reference is |
| 10 | OWASP Top 10 for Agentic Applications | genai.owasp.org | OWASP GenAI Security Project | Vendor-neutral, incident-derived, 100+ contributors. The de facto security vocabulary | A **risk taxonomy, not an architecture**. Tells you what can go wrong, not how to build. Naming collision with two sibling OWASP lists confuses readers constantly |
| 11 | The lethal trifecta | simonwillison.net/2025/Jun/16/the-lethal-trifecta/ | Simon Willison (independent) | Best mental model in AI security. Independent, credible, endlessly cited | One idea, one page. From June 2025 — predates the 2026 incident wave and the containment-architecture responses built on top of it |
| 12 | awesome-ai-agents-2026 | github.com/caramaschiHG/awesome-ai-agents-2026 | Community | Breadth; 300+ resources, monthly updates | Link list with no editorial judgment, no evaluation, no architecture. Ranks on freshness alone |
| 13 | 9 advanced RAG techniques | meilisearch.com/blog/rag-techniques | Meilisearch | Concrete, implementable RAG techniques | Search-vendor content marketing. Technique catalog with no decision framework for choosing among them |
| 14 | The new rules of context engineering for Claude 5 | claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models | Anthropic | **The freshest high-authority primary source in the field (July 24, 2026).** Concrete, counterintuitive, backed by an internal eval result | Explicitly scoped to Claude 5-generation models — **not a cross-provider guide**, and secondary coverage strips that caveat. Blog-post length; no production or security dimension |
| 15 | OWASP GenAI LLM Top 10 2026 | genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ | OWASP GenAI Security Project | Two weeks old; first edition weighted by real incident data. Will become the reference security vocabulary | Published Aug 4, 2026 — **almost nothing currently ranking has absorbed it**, which is precisely the opening. Still a taxonomy, not an architecture |

### The gap — where a new guide can actually win

`[INFERENCE]`, but grounded in the table above:

1. **Nobody has integrated the 2026 protocol layer into an architecture guide.** The MCP statelessness rewrite (July 28, 2026) is six weeks old at time of writing and absent from every general architecture resource above. Being the first correct, source-anchored explanation of *why* stateless-with-explicit-handles is the better design is a real, defensible position.
2. **Every strong source is either vendor-authored or single-idea.** Anthropic's posts are excellent and Anthropic-shaped. LangChain's are excellent and LangGraph-shaped. MLflow's are broad and Databricks-shaped. Cognition's is sharp and single-claim. **There is no credible vendor-neutral synthesis that states the disagreements as disagreements** and gives the reader a rule for choosing. That is the opening.
3. **The disagreements are the product.** Nobody publishes "parallelize reads, serialize writes" as the resolution of the Anthropic/Cognition fight. Nobody sets the three-way MCP-vs-code-execution-vs-dynamic-toolsets argument side by side. Readers arrive already aware there is conflict and leave without a decision rule.
4. **Patterns documents skip production.** Anthropic's patterns post has no observability, cost, caching, or security section. AWS's lens has all of them but no patterns and no code. **Nothing covers both.**
5. **Freshness is a moat here and it decays fast.** At least ten load-bearing facts changed between January and August 2026 — MCP's stateless rewrite, the OTel GenAI repo split, ADK 2.0's breaking changes, the OWASP agentic list, the **OWASP LLM Top 10 2026 (Aug 4 — two weeks old)**, MCP supply-chain incidents, OpenAI's Nov 30 deprecations, Claude Managed Agents, and **Anthropic's July 24 reversal on prompt prescriptiveness**. Anything not updated since Q1 2026 is now actively misleading, and most of the ranking corpus is exactly that.
5b. **Two of the biggest changes are days-to-weeks old and effectively uncovered.** The OWASP LLM Top 10 2026 (Aug 4) and Anthropic's context-engineering reversal (Jul 24) have not propagated into any general architecture guide found in this research. A guide published now can be genuinely first on both — that is a narrow, real, and expiring window.
6. **Honest uncertainty is differentiating.** Every competitor states model capabilities and benchmark numbers with total confidence. A guide that marks what is measured, what is vendor-claimed, and what is unverified will read as more credible to the senior engineers who actually make architecture decisions.

---

## Verification log

**Successfully fetched and read this session (`[FETCHED]`):**

| URL | What it gave |
|---|---|
| https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/ | MCP RC detail: four pillars, statelessness rationale, dates, authors, the forward-compat quote |
| https://blog.modelcontextprotocol.io/posts/ | Dated MCP blog index, Jan–Jul 2026 |
| https://github.com/modelcontextprotocol/modelcontextprotocol/releases | Confirmed 2026-07-28 stable (Jul 28, 2026) and RC (May 29, 2026) |
| https://github.com/open-telemetry/semantic-conventions/tree/main/docs/gen-ai | Relocation notice + full file list of GenAI conventions |
| https://github.com/open-telemetry/semantic-conventions-genai | New GenAI conventions repo; scope statement; repo stats; "TODO" schema URL |
| https://github.com/langchain-ai/langgraph | LangGraph positioning, feature list, ~40.1k stars |
| https://github.com/google/adk-python | ADK 2.0, breaking changes, Agent/Workflow primitives, `adk eval`, release cadence |
| https://github.com/vercel/ai | Vercel AI SDK agent abstractions (`ToolLoopAgent` etc.), repo state |
| https://raw.githubusercontent.com/modelcontextprotocol/modelcontextprotocol/main/docs/specification/2026-07-28/changelog.mdx | **The complete MCP 2026-07-28 changelog with SEP numbers** — major, minor, deprecated, governance |
| https://github.com/GenAI-Security-Project/GenAI-LLM-Top10 | **OWASP GenAI LLM Top 10 2026 full list (LLM01–LLM10) + Aug 4, 2026 publication date** |
| https://github.com/OWASP/www-project-top-10-for-large-language-model-applications | Confirmed the 2026 release and that this repo is now a legacy archive |
| https://github.com/openai/openai-agents-python | OpenAI Agents SDK primitives incl. Sandbox Agents and Realtime Agents; provider-agnostic claim |
| https://github.com/anthropics/claude-cookbooks | Independent confirmation of `managed_agents/`, Fable 5, agent patterns, eval notebooks |

**Searched (results informed `[SEARCH]` claims; underlying pages NOT directly read):** Anthropic engineering posts (building-effective-agents, effective-context-engineering, writing-tools-for-agents, code-execution-with-mcp, multi-agent research); claude.com multi-agent guidance; Agent Skills / SKILL.md; OpenAI AgentKit / Agents SDK / Responses API + reported deprecation; Google Gemini context/grounding; OWASP Top 10 for Agentic Applications; lethal trifecta; MCP supply-chain incidents; A2A adoption; prompt caching across providers; OTel GenAI stability; RAG 2026 practice; long-context vs RAG benchmarks; agent memory; LLM-as-judge failure modes; agent framework comparisons; AWS/Azure reference architectures; competitive-landscape queries.

**Attempted and BLOCKED by egress policy (0 bytes retrieved):**
`www.anthropic.com` · `resources.anthropic.com` · `claude.com` · `docs.claude.com` (302 → `platform.claude.com`, which 404'd) · `modelcontextprotocol.io` · `openai.com` · `developers.openai.com` · `platform.openai.com` · `arxiv.org` · `simonwillison.net` · `opentelemetry.io` · `genai.owasp.org` · `docs.aws.amazon.com` · `learn.microsoft.com` · `docs.cloud.google.com` · `www.langchain.com` · `x.com`

**Workaround that paid off, and should be reused:** several blocked docs sites publish their source in a **public GitHub repo**, and `raw.githubusercontent.com` was reachable. That is how the full MCP changelog and the OWASP 2026 list were recovered. Before marking anything below as unverifiable, check for a repo mirror.

---

## Unverified / could not confirm

**RESOLVED since first draft — these moved from unverified to fetched:**
- MCP 2026-07-28 full changelog (recovered via `raw.githubusercontent.com`) — now `[FETCHED]`
- OWASP GenAI LLM Top 10 2026 list and Aug 4, 2026 date — now `[FETCHED]`
- OpenAI Agents SDK primitives — now `[FETCHED]` from the SDK repo
- Existence of Fable 5 and Managed Agents — now corroborated by direct repo observation `[FETCHED]`
- OpenAI Nov 30, 2026 deprecations — upgraded to multi-source `[SEARCH]` with consistent dates (still worth a tracker check)

**High priority — verify before publishing (load-bearing and likely to be quoted):**
1. **Anthropic's ">80% system prompt removal", ~800 → ~164 tokens, "no measurable loss on coding evals" (July 24, 2026).** This is the headline claim of §1.1b and it is `[SEARCH]`-grade only — claude.com and x.com were both blocked. Get the primary post before quoting the numbers.
2. **Code-execution-with-MCP token reductions (98.7% predicted / 98% observed; 150k→2k, 70k→800).** Most-quoted numbers in the space; read them off Anthropic's post.
3. **Multi-agent research numbers: 90.2% improvement, ~80% variance explained by tokens, 15× token cost.** Same.
4. **tau2-bench LLM-as-judge AUROC ≤0.65 across 5 models × 5 prompt strategies** (arXiv 2606.09863).
5. **OWASP ASI01 wording** — "Agent Goal Hijack" vs "indirect prompt injection." Sources conflict.
6. **All prompt-caching TTLs, multipliers and thresholds.** Pricing is the fastest-decaying fact here.
7. **All model version identifiers** — `gpt-5.5`, `gpt-5.4-mini`, `gpt-5.6`, `Claude Opus 4.7`, `Gemini 3.1 Pro`, `Gemini 3.5 Pro` (2M context, late June 2026 GA), `DeepSeek V4-Pro`, `GLM 5`. Every one is secondary-sourced. **Do not publish any model version number from this brief without a vendor primary source.**

**Medium priority:**
8. Claude Managed Agents specifics: **+10pp on hard tasks from Outcomes**, **20 subagents / 25 parallel threads** ceiling, dreaming's research-preview status. All `[SEARCH]`.
8b. The **OWASP 2026 methodology split (75% vote / 25% from 6,639 incidents)** — the list itself is fetched, but the methodology numbers are `[SEARCH]` from secondary coverage.
8c. Agentic Coding Trends Report stats: **60% of work / 0–20% fully delegable**, **12.5M-line change in a 7-hour run**. `[SEARCH]`; PDF at resources.anthropic.com was blocked.
9. Agent Skills adoption by OpenAI, Google, GitHub Copilot, Cursor "within weeks."
10. Claude Agent SDK hierarchical subagents "up to 3 levels, June 2026."
11. Microsoft Agent Framework GA April 3, 2026 (Python + .NET simultaneous).
12. CrewAI "3× token overhead of LangGraph."
13. LangGraph star count — I observed **~40.1k** directly; a secondary source claims **~134k**. Direct observation wins; the discrepancy is unexplained.
14. "~55,000 tokens" for a standard GitHub MCP server's tool definitions.
15. Mem0/LOCOMO "91% lower latency, 90% fewer tokens" — vendor self-report.
16. "80% of RAG failures trace to ingestion/chunking."
17. Effective-context ceilings of 200–400K for non-Gemini frontier models; "200K window degrades at 50K."
18. Single-needle overstating production capability "by 15–40 points"; Gemini 1.5 Pro "99.7% single-needle / ~60% multi-fact."

**Low confidence / do not repeat without independent confirmation:**
19. "Four production exploits in five days, Jan 7–15 2026 (IBM Bob, Notion AI, Superhuman, Claude Cowork)." Specific, damaging, named-product claims from secondary security-marketing blogs.
20. Google April 2026 study, "32% increase in malicious prompt injection attempts."
21. OX Security "9 of 11 registries poisoned"; "30% of 1,800 MCP servers exploitable"; SmartLoader/Oura/StealC detail.
22. "Codex >90% of average engineer usage by March 2026"; "5× active user growth in H1 2026."
23. Gartner "40% of enterprise applications will embed AI agents by end of 2026."
24. RAG market sizing ($1.2B 2024 → $11B 2030, 49.1% CAGR, Grand View Research).
25. "Developers split 50/50" on the RAG debate.

26. Sandboxing: **"~90% fewer security incidents"** and **gVisor "10–30% I/O overhead"** — both `[SEARCH]`, no named study. Do not publish the 90% figure.
27. **Claude Opus 5 / Fable 5** as model names — strongly implied by the cookbooks repo (`Fable 5 fallback billing`) `[FETCHED]` and by this session's own runtime metadata, but no vendor model-card page was reachable. Treat the *names* as solid, the *capabilities* as unverified.

**Not covered — genuine gaps in this brief:**
- **Databricks** reference architectures (Mosaic AI Agent Framework) — never surfaced by any search; unexamined. Real gap.
- **Latency budgeting and streaming** — no substantive primary guidance found. Thinnest section in the brief; treat as a research to-do, not a covered topic.
- **Fallback/routing and model-router patterns** — only generic advice surfaced, nothing citable.
- **Structured outputs** across providers — no primary cross-provider comparison obtained.
- **Cost-control patterns beyond caching** (batch APIs, model cascades, token budgets per request) — not researched in depth.
- **Evaluation tooling comparison** (LangSmith vs Braintrust vs Phoenix vs MLflow) — not researched.
- **Retrieval evaluation specifically** (how teams measure retrieval quality in isolation — recall@k, nDCG, faithfulness) — §3 covers architecture but not measurement. Notable gap given §5 covers agent eval well.
