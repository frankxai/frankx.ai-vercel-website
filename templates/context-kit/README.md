# AI Architecture Context Kit

One file you paste into your repo root that makes an AI coding agent more reliable on your
codebase. No install, no dependency, no lock-in — it's a Markdown file your agent already
knows how to read.

## What's in it

- **[`CLAUDE.md`](./CLAUDE.md)** — the operating rules: five rules for thinking before coding,
  agent hygiene drawn from how LLMs actually fail in the loop, a "before you say done"
  verification checklist, and a short section you fill in with your repo's conventions.
- **[`AGENTS.md`](./AGENTS.md)** — a pointer so non-Claude harnesses (Cursor, Copilot, Codex,
  Gemini) pick up the same rules.

## 30-second install

```bash
# from your project root
curl -O https://raw.githubusercontent.com/frankxai/frankx.ai-vercel-website/main/templates/context-kit/CLAUDE.md
```

Then open `CLAUDE.md`, fill in the **Repository conventions** block (stack, build/test
commands, what not to touch), and delete anything that doesn't apply. That's it — your agent
reads it every session.

## Why it works

Most agent failures aren't model failures — they're context failures: the agent assumed a
path, invented an API, rewrote code it didn't understand, or claimed "done" without running
the build. These rules close those specific gaps. They're the same guardrails behind the
reference architectures and benchmarks at
[frankx.ai/ai-architecture](https://frankx.ai/ai-architecture).

## Contribute a failure mode

Hit a failure this kit didn't prevent?
[Open an issue](https://github.com/frankxai/frankx.ai-vercel-website/issues/new) describing what
the agent did wrong and what rule would have caught it (the
[failure-mode template](./.github/ISSUE_TEMPLATE/failure-mode.md) shows the shape). The best
ones get folded into the kit, with credit.

MIT-licensed. Built by [Frank Riemer](https://frankx.ai).
