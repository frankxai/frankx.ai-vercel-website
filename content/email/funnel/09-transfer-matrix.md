---
day: 9
subject: "Day 9 — The transfer matrix (and where you go from here)"
preheader: "Reading time: 5 min. The honest map of what changes between stacks."
---

Last day. Let's close the loop.

You've built one agent on Vercel AI SDK. The question that comes next is: what about Claude Agent SDK? OpenAI Agents SDK? Google ADK? n8n? Oracle?

The honest answer is the **transfer matrix** — what changes between stacks and what doesn't.

## What stays the same across all six paths

| Component | Changes per path? |
|---|---|
| **Agent Card contract** | Can stay stable only when every branch exposes the same A2A interface |
| **Agent behavior** | No — same research assistant |
| **Tool definition (the contract)** | Minor — schema same, call site differs |
| **Eval cases** | No — judge templates port directly |
| **Architectural mental model** | No — six primitives apply to every stack |

The Agent Card is the headline, with an important boundary: the same Card can describe implementations on different stacks only when each implementation exposes the declared A2A interface. Stacks without native A2A support need a compatible server binding or adapter. Publishing the same JSON does not make those frameworks interoperable by itself.

## What changes per path

| Component | Changes per path? |
|---|---|
| **Model** | Sometimes — each path has a default |
| **Memory implementation** | Sometimes — KV / vector / managed |
| **Loop orchestration syntax** | Yes — framework-specific idioms |
| **Deploy target** | Yes — path-specific infrastructure |
| **Observability** | Sometimes — provider-specific |

Loop orchestration is the biggest framework-specific surface. `generateObject` in Vercel AI SDK, `Anthropic.messages.create` with tool-use in Claude Agent SDK, `Runner` in OpenAI Agents — they're all the same primitive in different syntax.

## When to pick which path

Quick map (the workshop has six branches if you want depth):

- **Vercel AI SDK** — TypeScript-first, provider-agnostic, easiest first agent. Default for web builders.
- **Claude Agent SDK + MCP** — Best reasoning, growing tool ecosystem, MCP integration. Default if you're Claude-committed.
- **OpenAI Agents SDK + AgentKit** — Largest install base, visual workflow layer. Default if you're OpenAI-committed.
- **Google ADK + A2A** — Multi-agent first-class, long context, GCP-native. Default for multi-agent or GCP environments.
- **No-code (n8n / Notion AI / Dify)** — Workflow mental model, self-host options. Default for non-coding teams or workflow-heavy use cases.
- **Oracle ADK + OAS** — Enterprise compliance, portable spec, regulated environments. Default for Fortune 500 / regulated scale.

You don't need to pick today. Most builders use Vercel AI SDK as the learning stack and graduate to a model-specific SDK later when they have a reason.

## Where you go from here

You've finished the email course. You have the mental model and (if you did the exercises) a working artifact. Four honest paths forward:

### Path 1: keep the free version, build on what you have

The public essay and inline guide are available without a form or checkout. Build on those for as long as they are useful.

### Path 2: inspect the public implementation

If you want:
- The full architectural argument
- A guided TypeScript build
- The inline implementation sequence

→ [frankx.ai/start-here](https://frankx.ai/start-here)

These resources are public now. There is no form or checkout.

### Path 3: watch the planned Toolkit release

The Toolkit is a possible future release for builders working on production concerns. It is not currently available.

→ [frankx.ai/build/six-primitives-toolkit](https://frankx.ai/build/six-primitives-toolkit)

The status page is not a checkout. Final contents, delivery, and terms are not yet asserted.

### Path 4: discuss a real workflow

If you are responsible for a recurring workflow and need bounded implementation help, use the current service path:

→ [frankx.ai/work-with-me](https://frankx.ai/work-with-me)

## Whatever you do next, you have the map

The point of the six primitives is that they're **transferable**. Any framework you encounter for the rest of the year, you can evaluate in 30 minutes by asking: "How does it spell each of the six?"

That's the win. The frameworks come and go; the primitives stay.

Thanks for reading the course. Reply to this email if you have a question — I read every reply, and I write back.

— Frank

P.S. The workshop page describes a guided format: [frankx.ai/workshops/build-first-ai-agent](https://frankx.ai/workshops/build-first-ai-agent). Treat scheduling and availability as unconfirmed unless the page states a current date.

P.P.S. Paid Six Primitives offers remain unavailable until their release evidence is complete.
