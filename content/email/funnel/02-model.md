---
day: 2
subject: "Primitive 1 — The Model (and why 'pick a model' is the wrong frame)"
preheader: "Reading time: 5 min. The 5-line provider swap."
---

The most common mistake with first agents is treating the model as the architecture.

It isn't. The model is a **pluggable component behind an interface**.

Here's the entire model primitive in the Vercel AI SDK starter repo:

```ts
import { anthropic } from '@ai-sdk/anthropic'
import { openai } from '@ai-sdk/openai'
import { google } from '@ai-sdk/google'

export function getModel() {
  const name = process.env.AGENT_PROVIDER ?? 'anthropic'
  if (name === 'anthropic') return anthropic('claude-sonnet-4-6')
  if (name === 'openai') return openai('gpt-5')
  return google('gemini-2.5-pro')
}
```

That's it. Five lines. The rest of your agent calls `getModel()` and doesn't know or care which provider it got.

The benefit isn't theoretical. Last quarter I had a customer agent on Claude Sonnet 4.6 hit a rate limit during a launch event. Three minutes later it was running on GPT-5 with one env var change and a redeploy. The agent didn't know. The customers didn't know. That's what a clean model primitive buys you.

## The architectural test

Ask yourself this about your current agent (if you have one):

**Can I swap providers in under 60 seconds without touching anything else?**

If yes — your model primitive is clean.

If no — your provider-specific code has bled into your loop, your tools, or your prompts. That's the leaky abstraction the workshop teaches you to fix.

## Today's exercise (10 minutes)

Clone the starter repo and try the swap yourself:

```bash
git clone https://github.com/frankxai/first-agent-vercel-aisdk
cd first-agent-vercel-aisdk
pnpm install
cp .env.example .env
# add ANTHROPIC_API_KEY=...
# (and optionally OPENAI_API_KEY=...)
pnpm dev
```

Visit http://localhost:3000. Ask any question. Then change `AGENT_PROVIDER=openai` in `.env`, restart, ask again. You're now running the same agent on a different provider.

Most people who do this never go back to "I'll just pick a model and commit to it." The portability lesson lands once you feel it.

## Which model would I pick today?

For first agents in 2026:

- **Claude Sonnet 4.6** — best reasoning + tool use, my default
- **GPT-5** — largest install base, best ecosystem integrations
- **Gemini 2.5 Pro** — best long-context (1M+ tokens), best multimodal

Try Claude Sonnet first. Swap to others when you have a specific reason.

## Tomorrow

Day 3 — Primitive 2: **Tools**. The four-field rule that makes tools port across every framework.

— Frank
