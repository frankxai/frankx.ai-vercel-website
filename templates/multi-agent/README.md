# Multi-Agent Starter

A multi-agent orchestration app on the Vercel AI SDK 6 `Agent` abstraction. **Pattern: orchestrator → workers** — one orchestrating agent plans the task and delegates to focused worker tools (a search worker and a writer sub-agent), with every step streamed to the UI so you can watch it think.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ffrankxai%2Ffrankx.ai-vercel-website%2Ftree%2Fmain%2Ftemplates%2Fmulti-agent&project-name=multi-agent&repository-name=multi-agent)

## What's inside

- **Orchestrator agent** (`lib/agents.ts`) — an `Agent` with a system plan and a `stopWhen: stepCountIs(8)` guard so the loop can't run away.
- **Worker tools** — a `search` tool (stubbed with deterministic results, ready to swap for a real search API) and a `write` tool that runs a focused sub-agent (`generateText`) to draft the final answer.
- **Visible step streaming** — the API streams the full UI message stream; the page renders each tool call, its input, and its output as the agent runs.
- **BYOK** — the provider key comes from the `x-provider-key` request header per call and is never persisted.

## How it fits together

```
app/page.tsx ──▶ /api/agent ──▶ researchAgent (orchestrator)
                                   │  loops:
                                   ├─ tool: search  (gather facts)
                                   ├─ tool: search  (more sub-questions)
                                   └─ tool: write   (sub-agent drafts answer)
                                   ▼
                          streamed steps + final text
```

## Quickstart

1. **Install**

   ```bash
   npm install
   ```

2. **Configure env (optional)** — copy `.env.example` to `.env`. The template runs with **no secret** in the env: you supply the OpenAI key in the UI (BYOK). The `search` tool returns canned results, so it works offline out of the box.

   ```bash
   cp .env.example .env
   ```

3. **Run**

   ```bash
   npm run dev
   ```

   Open http://localhost:3000, paste your OpenAI key, and ask the agent something like “Compare REST and GraphQL for a public API.”

## Make it real

- Replace the `search` tool body in `lib/agents.ts` with a real call (Tavily, Exa, Brave) — the schema and wiring are already in place.
- Add more workers (a `critic` tool, a `fact-check` tool) and let the orchestrator route between them.
- Swap the model: `@ai-sdk/anthropic` is already a dependency if you want Claude as the orchestrator.

## Recommended tools

These are plain links today and will later be swapped for affiliate links:

- [Vercel](https://vercel.com) — hosting and the AI SDK
- [Supabase](https://supabase.com) — Postgres if your agents need to persist state
- [Pinecone](https://pinecone.io) — vector memory for retrieval-augmented agents
- [Langfuse](https://langfuse.com) — tracing, step inspection, and evals for agent runs

## Scope (be honest)

This is a **starting point, not a turnkey production system.** It shows the orchestrator→workers shape with real step streaming. For production you'll want: a real search/tool backend, retries and timeouts on tool calls, per-tool cost and step budgets, observability (Langfuse or similar), structured-output validation on tool results, and guardrails on what the agent can do. Build up from here.

---

Built by Frank Riemer · [frankx.ai/ai-architecture](https://frankx.ai/ai-architecture)
