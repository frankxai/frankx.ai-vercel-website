---
day: 1
subject: "Day 1 — What actually separates an agent from a chatbot"
preheader: "Reading time: 4 min. One sample. One exercise."
---

A friend asked me last week: "What's actually the difference between ChatGPT and an agent?"

The answer that gets you 80% of the way there in one sentence:

> **A chatbot generates a response. An agent runs a loop.**

The chatbot version: you ask, the model answers, conversation over.

The agent version: you ask, the model decides whether to answer directly or call a tool, the tool returns data, the model decides again, eventually it produces a final structured answer — and the loop stops.

The architectural difference is **the loop and the tools**. Everything else is window dressing.

```ts
// Chatbot — one shot
const reply = await model.generate({ prompt: userQuestion })

// Agent — loop until done
let messages = [{ role: 'user', content: userQuestion }]
while (true) {
  const response = await model.generate(messages, tools)
  messages.push({ role: 'assistant', content: response })
  if (response.finishReason === 'stop') return response
  // run tool calls, append results, loop again
}
```

Once you see this, "AI agents" stop being mysterious. They're just LLMs with a `while` loop and a typed function call.

## Today's exercise (10 minutes)

Open `https://chat.openai.com` or `claude.ai`. Ask any question that requires up-to-date information ("what's the latest Vercel AI SDK release?"). Notice if the model decided to use web search.

That decision — to use or not use a tool — is the whole agentic primitive. The architecture is just systematizing that decision and giving the model more tools.

## A short case from this week

A reader of this list emailed me last month asking "should we rip out our LangGraph setup and rewrite on Vercel AI SDK?" My answer was: no. They had already invested in LangGraph for the loop primitive — what they actually needed was to clean up their tools (which were leaking into the loop logic) and add a proper Agent Card.

Knowing the primitives let me answer in 30 seconds. Without that mental model, that conversation would have been an hour.

## Tomorrow

Day 2 covers Primitive 1 — the **model** — and why "pick a model" is the wrong frame.

— Frank
