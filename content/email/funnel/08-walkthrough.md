---
day: 8
subject: "Day 8 — The 90-minute walkthrough (synthesis)"
preheader: "Reading time: 6 min. All six primitives in one shipped artifact."
---

Today is the synthesis. You've seen the six primitives independently. Now I want to show you how they compose into a working agent.

The agent we ship is a **research assistant**:

- Takes a question
- Uses a web_search tool
- Returns a structured `Research` object (answer, sources, confidence, caveats)
- Maintains conversation memory across turns
- Exposes an Agent Card at `/.well-known/agent.json`

Every primitive shows up. Here's the 90-minute timeline.

## Minute 0-10 — The mental model

Open with the six primitives diagram (it's in the handout you downloaded on Day 0). Point at each one and name it. Don't write code yet.

The point isn't memorization. The point is to have a **place to put** every line of code you're about to write.

## Minute 10-20 — Model

Clone the starter repo. Add Anthropic API key. Run `pnpm dev`. Verify a query returns something.

Then change `AGENT_PROVIDER=openai` and watch the same agent run on a different model.

Time spent: 10 minutes. Lesson: model is one line of config.

## Minute 20-35 — Tools + structured output

Open `src/tools/web-search.ts`. Read the four-field tool definition. Open `src/schemas/research.ts`. Read the zod schema.

The exercise: add a second tool. Anything you want. A calculator, a Wikipedia fetcher, a "current time" tool. Register it in `loop.ts`. Restart. Ask a question that needs it.

Time spent: 15 minutes. Lesson: tools are typed functions; schemas are contracts.

## Minute 35-55 — The Loop + Memory

Open `src/agent/loop.ts`. Read the `runAgent` function. Note `maxSteps: 5` — that's your termination guard.

Open `src/agent/memory.ts`. Read the in-process Map. Note the `MAX_TURNS = 20` prune.

The exercise: ask the same question in two different `sessionId` values. Watch each session maintain independent history.

Time spent: 20 minutes. Lesson: the loop orchestrates; memory partitions state by session.

## Minute 55-65 — Safety rails + eval

Run `pnpm eval`. Three eval cases:

1. Success-simple — agent answers a baseline question
2. Success-with-sources — agent returns 2+ cited sources
3. Refusal-medical — agent declines to give medical advice

If any case fails, the harness tells you why. Add your own cases (success / edge / refusal) to `evals/cases.json`.

Time spent: 10 minutes. Lesson: evals catch what tests don't — non-deterministic behavior.

## Minute 65-80 — The Agent Card

Open `public/.well-known/agent.json`. Read the Card. Update name, description, URL to fit your agent.

Validate against the A2A schema. Verify CORS headers in `next.config.mjs` are set so other origins can fetch the Card.

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

After 90 minutes, you have:

- A production URL: `https://your-name.vercel.app`
- A research-assistant agent that answers questions with cited sources
- A valid Google A2A Agent Card at `/.well-known/agent.json`
- Three passing eval cases
- Logs streaming in the Vercel dashboard

You can paste the URL into a Slack channel. Other people can use it. Other agents can discover it. That's the difference between "I read about agents" and "I shipped an agent."

## Where you are now

You've covered all six primitives — independently and synthesized. You have the mental model. If you've done the exercises, you have a working artifact.

This is what the 90-minute live workshop teaches in person. If you want the full live experience: [frankx.ai/workshops/build-first-ai-agent](https://frankx.ai/workshops/build-first-ai-agent). It's free and we run it monthly.

## Tomorrow

Day 9 — the transfer matrix. What changes between Vercel AI SDK / Claude / OpenAI / Google ADK / no-code, and what stays the same. Plus a final note on the build ladder for anyone going deeper.

— Frank
