---
day: 3
subject: "Primitive 2 — A tool is a typed function. That's the whole rule."
preheader: "Reading time: 5 min. Four fields. One example."
---

People over-complicate tools.

A tool is a typed function the agent can call. Four fields:

1. **Name** — `web_search`, `fetch_user_profile`, `calculate`
2. **Description** — what the tool does (the model reads this to decide when to call)
3. **Parameter schema** — typed inputs (zod in TypeScript, Pydantic in Python)
4. **Execute function** — the actual code that runs

Here's a tool, complete:

```ts
import { tool } from 'ai'
import { z } from 'zod'

export const webSearch = tool({
  description: 'Search the web for up-to-date information.',
  parameters: z.object({
    query: z.string().min(3),
    maxResults: z.number().int().min(1).max(5).default(3),
  }),
  execute: async ({ query, maxResults }) => {
    const results = await searchApi(query, maxResults)
    return { results }
  },
})
```

That's the whole thing. Same shape on Vercel AI SDK, Claude Agent SDK, OpenAI Agents, Google ADK — different ceremony, same four parts.

## Why the schema matters

The parameter schema is your contract with the model. The model is going to **fill in those parameters** based on the user's question. If your schema is too loose, the model sends junk. If it's too strict, the model can't use the tool when it should.

Common bugs:

- `query: z.string()` — model passes empty strings. Fix: `z.string().min(3)`.
- `maxResults: z.number()` — model passes 100, your search API rate-limits. Fix: `z.number().int().min(1).max(5)`.
- No `default()` on optional fields — model gets confused. Fix: `.default(3)`.

The schema isn't documentation. It's runtime validation that prevents the model from making mistakes.

## Today's exercise (10 minutes)

Open `src/tools/web-search.ts` in the starter repo. Add a second tool — anything you want. A `calculate` tool that does basic math. A `wikipedia` tool that fetches a summary. A `define` tool that returns dictionary entries.

Register it in `src/agent/loop.ts` next to `web_search`:

```ts
tools: { web_search: webSearch, your_tool: yourTool }
```

Restart `pnpm dev`. Ask a question that needs your new tool. Watch the model decide whether to call it.

The first time you see a model correctly route a question to a tool you wrote, the agentic paradigm clicks. That moment is what this email course is for.

## A short case

A FrankX customer last month was building a code-review agent. Their first version had one giant tool: `review_code(repo, branch, files)`. It was unreliable — the model couldn't decide when to call it and what to pass.

We split it into four small tools: `list_changed_files`, `read_file`, `run_linter`, `flag_issue`. The agent's accuracy went from ~40% to ~85% in one afternoon.

**Small, named, typed tools beat large generic ones.** Always.

## Tomorrow

Day 4 — Primitive 3: **Memory**. Why "memory" is actually three different primitives wearing the same word.

— Frank
