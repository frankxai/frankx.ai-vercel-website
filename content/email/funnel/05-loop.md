---
day: 5
subject: "Primitive 4 — The Loop (where most agent bugs actually live)"
preheader: "Reading time: 6 min. Plus a brief note on the €7 Pack."
---

Five days in. You're past the warm-up — today's the dense one.

The loop is the orchestrator. Its job is one sentence:

> **Keep the model and tools talking until the agent has an answer or gives up.**

Most beginners think the loop is a small detail. It's not. **Most agent bugs are loop bugs.** Loops that never terminate. Loops that swallow errors. Loops that re-call the same tool 10 times in a row because the model didn't get what it wanted.

## The simplest loop

```ts
let messages = [{ role: 'user', content: question }]
while (true) {
  const response = await model.generate(messages, tools)
  messages.push({ role: 'assistant', content: response })
  if (response.finishReason === 'stop') return response
  if (response.toolCalls) {
    for (const call of response.toolCalls) {
      const result = await tools[call.name].execute(call.args)
      messages.push({ role: 'tool', content: result })
    }
  }
  if (messages.length > 50) throw new Error('loop overrun')
}
```

The `messages.length > 50` is the **termination guard**. Without it, a misbehaving model + a misbehaving tool can loop forever and burn your API budget before you notice.

In Vercel AI SDK, this whole loop is wrapped in `generateObject`:

```ts
const result = await generateObject({
  model,
  system: SYSTEM_PROMPT,
  messages,
  schema: ResearchSchema,
  tools: { web_search: webSearch },
  maxSteps: 5,  // ← always set this
})
```

`maxSteps: 5` is your guard. Always set it. Never trust the model to terminate on its own.

## The architectural test

For your loop, can you state in one sentence what makes it stop?

**Good answer:** "Either the model returns a final answer matching the schema, or we hit 5 steps, or a tool returns an unrecoverable error."

**Bad answer:** "It... stops when it's done?"

If you can't state your loop's termination condition, you don't own your loop. The model owns it. That's how surprise bills happen.

## Today's exercise (10 minutes)

In the starter repo, set `maxSteps: 1` (deliberately too low) and ask a question that needs web search:

```ts
maxSteps: 1
```

The agent will fail because it can't both call the tool AND return a final answer in one step.

Set it to 2 — now it works. Set it to 10 — works but unnecessary.

The exercise is to feel where the bound actually is for your agent. Most simple agents need 3-5 steps. Multi-step research agents need 8-15. Past 20 you're probably orchestrating something that should be split.

## A short case

A customer agent at FrankX once started looping because their `fetch_user_profile` tool returned `{ status: "rate_limited" }` and the model kept retrying without backoff. They had `maxSteps: 50` (way too high), no retry-aware tool design, and no observability.

The fix took 20 minutes once we knew what to look for: lower `maxSteps`, return tools as `{ ok: false, retryAfter: 60 }`, log every step. The post-mortem took 3 hours because they didn't have observability — which is Day 7's topic.

## A brief note — the Six Primitives Pack

Halfway through the course feels like the honest place to mention this. If you'd like:

- The 60-page polished pocket book (PDF + EPUB) of all six primitives
- A 5-card Agent Card library you can fork
- A 15-case eval harness
- The Vercel deploy checklist

It's all in the **Six Primitives Pack** at €7 — [frankx.ai/build/six-primitives-pack](https://frankx.ai/build/six-primitives-pack). 30-day refund. Many readers buy it just to have something to print and re-read.

If the email course is enough, it's enough. The Pack is convenience, not gating.

## Tomorrow

Day 6 — Primitive 5: **The Spec**. Your Agent Card and why it's the portability contract.

— Frank
