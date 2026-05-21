---
day: 4
subject: "Primitive 3 — Memory is actually three primitives in disguise"
preheader: "Reading time: 5 min. Don't conflate them."
---

If your agent acts weird, memory is usually the cause.

The reason is that "memory" gets used to describe three different things, and most beginners conflate them.

## The three kinds

**Session memory** — the messages within one conversation. User says X, agent says Y, user says Z, agent remembers X-Y-Z. Lives in-process or in Vercel KV / Redis.

**Working memory** — state the agent accumulates *during a single task*. Half-finished plans, intermediate tool results, "still need to call X." Lives inside one `runAgent()` invocation, dies when it returns.

**Long-term memory** — facts the agent should remember across sessions. "User Frank prefers Vercel deploy. User Frank's projects are usually TypeScript." Lives in a vector DB or a typed key-value store.

Each one has different failure modes. Session memory grows unbounded if you don't prune. Working memory leaks into session memory if you're sloppy. Long-term memory becomes a vector-DB junk drawer if you let the agent write to it freely.

## The architectural test

For any piece of state in your agent, ask: **which of the three kinds is it?**

If you can answer cleanly, your memory primitive is architected.

If you have to think, you have a bug waiting to happen.

## In code

The starter repo has session memory only — that's all a 90-minute workshop needs:

```ts
const conversations = new Map<string, CoreMessage[]>()

const MAX_TURNS = 20

export function getHistory(sessionId: string): CoreMessage[] {
  return conversations.get(sessionId) ?? []
}

export function appendTurn(sessionId: string, messages: CoreMessage[]) {
  const prior = conversations.get(sessionId) ?? []
  const combined = [...prior, ...messages]
  // prune at 20 turns to prevent unbounded growth
  const pruned = combined.length > MAX_TURNS * 2 ? combined.slice(-MAX_TURNS * 2) : combined
  conversations.set(sessionId, pruned)
}
```

In production, swap the `Map` for Vercel KV. Same interface. Same code shape. The only thing that changes is where the data lives.

## When you need long-term memory (you don't yet)

Here's the rule that saves most beginners months: **don't add long-term memory until you have a specific user-facing reason.**

"My agent should remember things" is not a reason. "My agent should remember the user's project type so it doesn't ask every session" is a reason.

Without a specific reason, long-term memory becomes a vector-DB junk drawer that confuses the agent more than it helps.

## Today's exercise (10 minutes)

In the starter repo, ask your agent the same question twice in different sessions:

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"question":"What is your name?","sessionId":"alice"}'

curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"question":"What is your name?","sessionId":"bob"}'
```

Both sessions are independent. Now repeat the call with `sessionId:alice` — the agent has Alice's history.

That's session memory working as designed. Now imagine if Alice's questions started bleeding into Bob's session because long-term memory was overwriting things. That's what bad memory architecture looks like.

## Tomorrow

Day 5 — Primitive 4: **The Loop**. Where most agent bugs live, and how `maxSteps` saves you from runaway costs.

(I'll also mention the Six Primitives Pack on Day 5 — €7 — for builders who want the polished pocket book and the templates. Not pushing it; just letting you know it exists.)

— Frank
