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
| **Agent Card** | No — identical across all six |
| **Agent behavior** | No — same research assistant |
| **Tool definition (the contract)** | Minor — schema same, call site differs |
| **Eval cases** | No — judge templates port directly |
| **Architectural mental model** | No — six primitives apply to every stack |

The Agent Card is the headline. **The same Card works whether you implemented the agent on Vercel AI SDK, Claude Agent SDK, OpenAI Agents, Google ADK, n8n, or Oracle ADK.** That's the portability contract you ship as part of every agent.

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

You've finished the email course. You have the mental model and (if you did the exercises) a working artifact. Three honest paths forward:

### Path 1: keep the free version, build on what you have

The starter repo is yours forever. The handout is yours. The mental model is yours. Many builders ship real production agents on just this. **Pay nothing else.** That's a fine outcome.

### Path 2: get the polished bundle (€7 — Six Primitives Pack)

If you want:
- The 60-page polished pocket book (PDF + EPUB)
- A 5-card Agent Card library (research / triage / scheduling / sales qual / code review)
- A 15-case eval harness with judge templates
- The Vercel deploy checklist

→ [frankx.ai/build/six-primitives-pack](https://frankx.ai/build/six-primitives-pack)

€7. Lifetime. 30-day no-questions refund. Most readers buy it just for the polished pocket book.

### Path 3: go deeper with the Toolkit (€197 — most chosen)

If you ship agents in your work and want:
- Six branch deep-dive videos (Claude / OpenAI / Google / no-code / AI-builds-AI / Oracle)
- 30+ Agent Card library
- A 50-pattern production cookbook
- A 100-case eval cookbook
- Observability templates
- Discord community (90 days, then €19/mo)

→ [frankx.ai/build/six-primitives-toolkit](https://frankx.ai/build/six-primitives-toolkit)

€197. Lifetime. 30-day refund. This is where most working builders settle.

### Path 4: enterprise / advisory

If you're building agents inside a company with governance / compliance / multi-stakeholder needs:

- The €497 **Mastery** tier adds a structured 6-week cohort + AI-assisted code review queue.
- The €997 **Architect** tier adds Frank's enterprise AI Center of Excellence framework, public Oracle ADK learning material, and compliance-oriented templates.
- The €2,997 **Founder's Circle** adds 4 hours of Frank's actual time per quarter, by application only.

→ [frankx.ai/build](https://frankx.ai/build)

## Whatever you do next, you have the map

The point of the six primitives is that they're **transferable**. Any framework you encounter for the rest of the year, you can evaluate in 30 minutes by asking: "How does it spell each of the six?"

That's the win. The frameworks come and go; the primitives stay.

Thanks for reading the course. Reply to this email if you have a question — I read every reply, and I write back.

— Frank

P.S. If you'd rather build live, the 90-minute workshop runs monthly: [frankx.ai/workshops/build-first-ai-agent](https://frankx.ai/workshops/build-first-ai-agent). It's free.

P.P.S. If you'd rather just ship a paid agent on someone else's stack and skip building your own — Founder's Circle exists for that. By application only. [frankx.ai/founders-circle](https://frankx.ai/founders-circle).
