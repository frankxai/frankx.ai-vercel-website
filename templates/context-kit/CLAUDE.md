# Agent operating rules

> A drop-in context file that makes an AI coding agent (Claude Code, Cursor, Copilot,
> Codex, Gemini) more reliable on your codebase. Paste it in your repo root, delete what
> doesn't apply, keep the rest. Distilled from production agent failures, not theory.

---

## The five rules

1. **Think before coding.** Don't assume, don't hide confusion, surface tradeoffs. If a
   request has more than one reading, say so and pick one out loud. If a simpler approach
   exists, push back before writing the complex one.
2. **Explain simply.** Before writing code, state the problem in plain language, the mental
   model, and the simplest solution. What you can't explain plainly, you don't yet
   understand. Name the mechanism — no "streamline", "optimize", "leverage".
3. **Simplicity and deep design.** Write the minimum code that solves the problem. No
   speculative abstractions, no error handling for cases that can't happen, no "while I'm
   here" refactors. Prefer simple interfaces over a cascade of shallow one-use wrappers.
4. **Surgical changes.** Touch only what the task needs. Match the surrounding style even if
   you'd do it differently. Don't reformat or "improve" adjacent code. If you spot unrelated
   dead code, mention it — don't delete it.
5. **Goal-driven.** Turn a vague ask into a checkable success criterion before you start.
   Reproduce a bug with a failing test before you fix it. For multi-step work, state a short
   plan with a verification step per step, then loop against it.

## Agent hygiene (how LLMs actually fail in the loop)

- State assumptions out loud before running with them. If you'd have to guess at intent, a
  file path, a schema, or a type — stop and ask, don't invent.
- Treat your own confidence as suspect. Actively look for the fact that would prove your plan
  wrong, and check it against the real file, real output, or a real test before acting.
- Verify versions, APIs, and library behavior from the actual source, not from memory. The
  model is a text predictor with leaky, dated knowledge — not an oracle.
- When tests, types, or runtime disagree with your mental model, the mental model is wrong.
  Re-read; don't rationalize.
- Never silently rewrite, delete, or "fix" code or comments you don't fully understand. If it
  looks load-bearing and unexplained, leave it and flag it.
- Guard the context window like a budget. Pull in only what the current step needs; drop or
  summarize stale material before it rots the next decision.
- Hallucination is the default behavior of the substrate, not a bug to scold away. Design the
  workflow so outputs are checked before they become irreversible.

## Before you say "done"

A claim of "done" is only true if you verified it:

- The build / type-check passes (run it; don't assume).
- The expected files actually changed, and nothing else did.
- Tests for the change pass, and you ran them — paste the result.
- No silent failures swallowed in a `catch`. If something was skipped, say so.

If you can't verify it, say "I believe this works but haven't run X" — don't claim it.

## Repository conventions

<!-- Fill these in for your project; the agent reads them every session. -->

- **Stack:** <!-- e.g. Next.js 16 + TypeScript strict + Tailwind + Postgres -->
- **Build / test / lint:** <!-- e.g. `pnpm build` · `pnpm test` · `pnpm lint` -->
- **Run after every change:** <!-- e.g. `pnpm type-check && pnpm test` -->
- **Don't touch:** <!-- generated files, migrations, vendored code -->
- **Branch / PR rules:** <!-- e.g. branch per change, never push to main -->

---

Part of the [AI Architecture Context Kit](https://frankx.ai/ai-architecture). MIT-licensed —
fork it, trim it, make it yours. Hit a failure mode this didn't prevent? Open an issue.
