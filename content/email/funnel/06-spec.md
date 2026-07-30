---
day: 6
subject: "Primitive 5 — The Spec. Your Agent Card and why other agents need it."
preheader: "Reading time: 5 min. The portability contract."
---

Once your agent is shipped, who else can use it?

If the answer is "humans clicking my UI" — you have a product, but you don't have an agent in the architectural sense. You have a tool with an LLM inside it.

The spec primitive gives compatible A2A clients a structured way to find the interfaces and skills your agent declares. The Card does not implement those interfaces, make every framework A2A-compatible, or make an agent callable by itself.

## The Agent Card

The Agent-to-Agent (A2A) protocol defines an "Agent Card" — a JSON document describing your agent's identity, capabilities, and skills. You serve it at `/.well-known/agent-card.json` on your domain.

Here's a minimal public A2A 1.0 Card you can adapt:

```json
{
  "name": "First Agent — Research Assistant",
  "description": "A research assistant that answers questions with cited sources.",
  "supportedInterfaces": [
    {
      "url": "https://agent.example.com/a2a/v1",
      "protocolBinding": "HTTP+JSON",
      "protocolVersion": "1.0"
    }
  ],
  "provider": {
    "organization": "Frank Riemer",
    "url": "https://frankx.ai"
  },
  "version": "0.1.0",
  "capabilities": {
    "streaming": false,
    "pushNotifications": false
  },
  "defaultInputModes": ["text/plain"],
  "defaultOutputModes": ["text/plain", "application/json"],
  "skills": [{
    "id": "research-with-sources",
    "name": "Research with sources",
    "description": "Given a question, searches the web, synthesizes an answer.",
    "tags": ["research", "search"],
    "examples": ["What changed in Vercel AI SDK v5?"],
    "inputModes": ["text/plain"],
    "outputModes": ["application/json"]
  }]
}
```

That JSON is the contract. Compatible clients can fetch it, inspect `supportedInterfaces` and `skills`, and decide whether the declared endpoint fits their request.

## Why this matters now (not in some hypothetical future)

In 2026 the agent ecosystem still has different framework conventions. A2A 1.0 gives compatible clients a versioned discovery and interaction contract, but native support varies by stack. A framework without an A2A client or server binding needs an adapter.

Even if you never plug into a multi-agent system, having a valid Agent Card means:

- Your agent has documented identity (no "what does this thing do?" guessing)
- You can swap implementations without breaking callers (Card stays the same)
- A future you (or future teammate) can read the spec and not have to dig through code

## The architectural test

Can a compatible client locate your Card and determine which versioned interface, media types, security requirements, and skills you actually support **without reading your source code**?

If yes — you have a spec.

If no — your agent is a private tool, not a component.

## Today's exercise (10 minutes)

In a project that serves `public/` files from the domain root, place the Agent Card at `public/.well-known/agent-card.json`. If your stack uses a different static-file convention, configure the equivalent route. Start with the complete minimal example above, then verify these contract groups:

1. `name`, `description`, and `version`
2. At least one `supportedInterfaces` entry with `url`, `protocolBinding`, and `protocolVersion`
3. `capabilities`, default input/output modes, and at least one skill with non-empty `tags`

Deploy (`vercel --prod`). Then:

```bash
curl https://your-url.vercel.app/.well-known/agent-card.json | jq
```

It should return valid JSON. Validate it against the SDK and schema for the protocol version you declare; the current field-by-field guide is here: [frankx.ai/guides/agent-card-a2a-spec](https://frankx.ai/guides/agent-card-a2a-spec).

## What about Oracle's Open Agent Specification?

Oracle Open Agent Specification (Agent Spec) is a framework-agnostic declarative language for describing executable agents and structured workflows. It solves a different portability problem from an A2A Agent Card.

The two can complement each other, but neither is a subset of the other and there is no automatic mapping. For this exercise, publish only the A2A interface your running endpoint actually supports.

## Tomorrow

Day 7 — Primitive 6: **Deploy**. The four parts of "actually shipped" vs "running on my laptop."

— Frank
