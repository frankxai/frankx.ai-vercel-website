---
day: 7
subject: "Primitive 6 — Deploy. Published is not deployed."
preheader: "Reading time: 5 min. Four parts of shipped."
---

An agent on your laptop is a demo. The deploy primitive turns it into a system.

Deploy means **four things**, not one:

1. **A public URL** other systems can reach
2. **Auth** — not every endpoint should be open
3. **Rate limits** — at the network layer
4. **Observability** — logs, traces, cost tracking you can read

Most beginners ship #1 and call it deployed. Then six weeks later they're surprised by an open agent endpoint, an API bill they can't explain, and a runaway loop they can't debug.

**Published is not deployed.**

## The four parts in code

```ts
// 1. Public URL — vercel --prod gives you this

// 2. Auth — protect tool-using endpoints with at least an API key
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const apiKey = req.headers.get('x-api-key')
  if (apiKey !== process.env.AGENT_API_KEY) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }
  // ... agent logic
}

// 3. Rate limit — Vercel KV + Upstash Ratelimit
import { Ratelimit } from '@upstash/ratelimit'
const ratelimit = new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(10, '1 m') })

// 4. Observability — onStepFinish callback in Vercel AI SDK
await generateObject({
  model,
  system: SYSTEM_PROMPT,
  messages,
  schema: ResearchSchema,
  tools: { web_search: webSearch },
  maxSteps: 5,
  onStepFinish: ({ toolCalls, usage }) => {
    log.info({
      timestamp: Date.now(),
      toolCalls: toolCalls?.length ?? 0,
      promptTokens: usage.promptTokens,
      completionTokens: usage.completionTokens,
      cost: estimateCost(usage),
    })
  },
})
```

That's the whole deploy primitive. Four parts. None of them optional in production.

## The architectural test

If your agent misbehaved right now, could you tell what it did from the logs?

If yes — you deployed.

If no — you published.

## What "observability" actually means

You don't need a fancy tracing platform to start. The minimum is one log line per agent step:

- Timestamp
- Tool calls made
- Tokens used (input + output)
- Estimated cost in fractions of a cent
- Latency

Vercel logs stream into the dashboard automatically. For anything more serious — replay, distributed tracing — look at:

- **Langfuse** — best if you're standardizing on LangChain ecosystem
- **Helicone** — drop-in proxy, easy to start
- **OpenTelemetry** — open-source, integrates with Grafana / Datadog

Pick one. Don't ship without it.

## Today's exercise (10 minutes)

Two parts:

**Part 1:** Deploy the starter repo to Vercel. Set environment variables in the Vercel dashboard. Verify your agent is live at `https://your-name.vercel.app`.

**Part 2:** Add a log line to `src/agent/loop.ts`:

```ts
onStepFinish: ({ toolCalls, usage }) => {
  console.log(JSON.stringify({
    sessionId: 'demo',
    toolCalls: toolCalls?.length ?? 0,
    tokens: usage.totalTokens,
  }))
}
```

Redeploy. Send a query. Open Vercel dashboard → your project → logs. You should see the log line.

That's observability working — the bare minimum, but better than nothing.

## A short case

A FrankX customer's agent had a 30-day API bill that was 8x normal. They had no logs and no idea what happened. We added the `onStepFinish` log line. Within an hour they spotted the issue: a single query was triggering 47 tool calls because their `fetch_pricing_tier` tool returned ambiguous data and the model kept retrying.

Without observability, that bill would have repeated next month. With observability, the fix was a 5-line tool change.

## Tomorrow

Day 8 — putting it all together: shipping a research-assistant agent in 90 minutes (the actual workshop walkthrough, abbreviated).

— Frank
