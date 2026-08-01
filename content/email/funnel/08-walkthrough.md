---
day: 8
subject: "Day 8 — The 90-minute walkthrough (synthesis)"
preheader: "Reading time: 6 min. All six primitives in one shipped artifact."
---

Today is the synthesis. You've seen the six primitives independently. Now I want to show you how they compose into a working agent without assuming that you downloaded a repository or handout.

The reference implementation is a **research assistant**:

- Takes a question
- Uses a web_search tool
- Returns a structured `Research` object (answer, sources, confidence, caveats)
- Maintains conversation memory across turns
- Exposes an Agent Card at `/.well-known/agent-card.json`

Every primitive shows up. Use a Next.js TypeScript project you control and adapt the file names to its structure. The complete reference boundaries are shown inline in the [First Agent Primer](https://frankx.ai/guides/first-agent-primer). Here is the 90-minute timeline.

## Minute 0-10 — The mental model

Write down the six primitives—model, tool, memory, loop, spec, and deploy—and name the responsibility of each one. Don't write code yet.

The point isn't memorization. The point is to have a **place to put** every line of code you're about to write.

## Minute 10-20 — Model

In your project, create or locate the model-provider boundary. Configure one provider key through a local environment file, run the development server, and verify a query returns a bounded response.

Then change `AGENT_PROVIDER=openai` and watch the same agent run on a different model.

Time spent: 10 minutes. Lesson: model is one line of config.

## Minute 20-35 — Tools + structured output

Create or inspect one typed `web_search` tool and one `Research` output schema. Keep the tool's description, parameters, execution boundary, and returned data explicit.

The exercise: add a second tool. Anything you want. A calculator, a Wikipedia fetcher, a "current time" tool. Register it with the agent loop, restart, and ask a question that needs it.

Time spent: 15 minutes. Lesson: tools are typed functions; schemas are contracts.

## Minute 35-55 — The Loop + Memory

Create or inspect the function that runs the model/tool loop. Add an explicit step limit such as `maxSteps: 5`; that is your termination guard.

Create or inspect session-scoped memory. An in-process `Map` is enough for the exercise if each session has an independent key and old turns are pruned.

The exercise: ask the same question in two different `sessionId` values. Watch each session maintain independent history.

Time spent: 20 minutes. Lesson: the loop orchestrates; memory partitions state by session.

## Minute 55-65 — Safety rails + eval

Add and run three eval cases with the test command your project already uses:

1. Success-simple — agent answers a baseline question
2. Success-with-sources — agent returns 2+ cited sources
3. Refusal-medical — agent declines to give medical advice

Make each failure explain which contract broke. Then add your own success, edge, and refusal cases in the format your project uses.

Time spent: 10 minutes. Lesson: evals catch what tests don't — non-deterministic behavior.

## Minute 65-80 — The Agent Card

Create `public/.well-known/agent-card.json`. Read every field, then set the identity, each `supportedInterfaces` entry (`url`, `protocolBinding`, and `protocolVersion`), media modes, capabilities, and skills for the endpoint you actually run.

Validate against the A2A schema for the protocol version you declare. If browser-based clients on other origins must fetch the public Card, configure and verify an explicit CORS policy; server-to-server A2A clients do not rely on browser CORS.

Time spent: 15 minutes. Lesson: the spec is a contract; specifying clearly costs nothing and pays for years.

## Minute 80-90 — Deploy

```bash
pnpm add -g vercel
vercel --prod
# set env vars in dashboard
```

Public URL. Verify Agent Card is reachable. Add the `onStepFinish` log line.

Time spent: 10 minutes. Lesson: deploy = public URL + auth + limits + observability.

## What's deployed

After 90 focused minutes, you should be able to verify:

- A deployed URL such as `https://your-name.vercel.app`
- A research-assistant agent that answers questions with cited sources
- A valid A2A 1.0 Agent Card at `/.well-known/agent-card.json`
- Three passing eval cases
- Logs streaming in the Vercel dashboard

Share the URL only after its authentication, limits, and data boundaries match the audience you intend. Other A2A clients can discover it once the Agent Card is publicly reachable. That's the difference between "I read about agents" and "I shipped an agent."

## Where you are now

You've covered all six primitives—independently and synthesized. You have the mental model. If your own checks pass, you have a working artifact rather than a promised starter.

The workshop page describes the same guided format: [frankx.ai/workshops/build-first-ai-agent](https://frankx.ai/workshops/build-first-ai-agent). Treat scheduling and availability as unconfirmed unless the page states a current date.

## Tomorrow

Day 9 — the transfer matrix. What changes between Vercel AI SDK / Claude / OpenAI / Google ADK / no-code, and what stays the same. Plus a final note on the build ladder for anyone going deeper.

— Frank
