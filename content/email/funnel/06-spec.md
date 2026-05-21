---
day: 6
subject: "Primitive 5 — The Spec. Your Agent Card and why other agents need it."
preheader: "Reading time: 5 min. The portability contract."
---

Once your agent is shipped, who else can use it?

If the answer is "humans clicking my UI" — you have a product, but you don't have an agent in the architectural sense. You have a tool with an LLM inside it.

The spec primitive is what makes your agent **discoverable and callable by other agents**.

## The Agent Card

Google's Agent-to-Agent (A2A) protocol defines an "Agent Card" — a JSON document describing your agent's identity, capabilities, and skills. You serve it at `/.well-known/agent.json` on your domain.

Here's the Card from the workshop starter:

```json
{
  "name": "First Agent — Research Assistant",
  "description": "A research assistant that answers questions with cited sources.",
  "url": "https://first-agent-vercel-aisdk.vercel.app",
  "provider": { "name": "Frank Riemer", "url": "https://frankx.ai" },
  "version": "0.1.0",
  "capabilities": { "streaming": false },
  "skills": [{
    "id": "research-with-sources",
    "name": "Research with sources",
    "description": "Given a question, searches the web, synthesizes an answer.",
    "tags": ["research", "search"],
    "examples": ["What changed in Vercel AI SDK v5?"]
  }]
}
```

That JSON is the contract. Other agents fetch it, read your `skills`, and decide if you're the right router target for their request.

## Why this matters now (not in some hypothetical future)

In 2026 the agent ecosystem is fragmenting fast. Every framework (LangGraph, AgentKit, MCP, A2A, Oracle ADK, etc.) has slightly different conventions. The Agent Card is the **lowest-common-denominator spec** that's emerging as the de facto standard.

BCG's enterprise agent playbook references it as the discovery contract between agents in a mesh. That's the signal — once consultancies start templatizing around a spec, it has crossed the chasm.

Even if you never plug into a multi-agent system, having a valid Agent Card means:

- Your agent has documented identity (no "what does this thing do?" guessing)
- You can swap implementations without breaking callers (Card stays the same)
- A future you (or future teammate) can read the spec and not have to dig through code

## The architectural test

Can another system discover your agent and know how to talk to it **without reading your source code**?

If yes — you have a spec.

If no — your agent is a private tool, not a component.

## Today's exercise (10 minutes)

If you cloned the starter repo, the Agent Card is already at `public/.well-known/agent.json`. Update three fields:

```json
{
  "name": "Your agent name",
  "description": "Your one-paragraph description",
  "url": "https://your-vercel-url.vercel.app"
}
```

Deploy (`vercel --prod`). Then:

```bash
curl https://your-url.vercel.app/.well-known/agent.json | jq
```

Should return valid JSON. Validate against the A2A schema if you want to be thorough — there's a guide here: [frankx.ai/guides/agent-card-a2a-spec](https://frankx.ai/guides/agent-card-a2a-spec).

## What about Oracle's Open Agent Specification?

Brief mention because some of you will care: Oracle's OAS is a YAML-first spec that describes the **whole** agent (tools, memory, workflows) — not just the external interface.

Your Agent Card is a **subset** of what an OAS file contains. You can think of OAS as the OpenAPI for agents — define once, generate stacks for Oracle ADK / LangGraph / roll-your-own.

For your first agent, the Card is enough. OAS earns its keep when you're running agents in regulated enterprise environments. That's deep in the Architect tier.

## Tomorrow

Day 7 — Primitive 6: **Deploy**. The four parts of "actually shipped" vs "running on my laptop."

— Frank
