# Flagship Pipeline & Excellence Gate

> The automated quality floor for FrankX blog posts — especially on mobile sessions where mid-stream course-correction is hard.

## What this is

Three pieces of glue that make excellence the default, not an end-of-session ask:

| File                                          | Role                                                                                 |
| --------------------------------------------- | ------------------------------------------------------------------------------------ |
| `.claude/settings.json`                       | Wires the hooks into every Claude Code session in this repo.                         |
| `.claude/hooks/session-start-excellence.sh`   | Prints the voice ban list + gate rules on session boot.                              |
| `.claude/hooks/blog-commit-gate.sh`           | **Fail-closed** PreToolUse gate that blocks `git commit` of unqualified blog MDX.    |
| `.claude/commands/flagship.md`                | Strict slash-command pipeline for `category: "Flagship"` posts.                      |
| `scripts/voice-audit.sh`                      | (Reused.) The brand-voice / AI-slop ban-list scanner.                                |

## Why

After shipping `magnifica-humanitas-benevolent-future-arcanea.mdx` we noticed the piece was good (≈7.5/10) but not flagship-grade (9+) on:

- Title (95 chars → truncates in SERPs)
- Description (212 chars → truncates in snippets)
- Statement H2s instead of question H2s
- FAQ answers in paragraph form, not the 40–60 word atoms AI engines extract
- No engaged counter-argument
- Missing `tldr` and `lastModified` frontmatter

These issues are all detectable mechanically. They don't need a human reviewer — they need a gate.

## What the gate enforces

The `blog-commit-gate.sh` script runs on any `git commit` that touches `content/blog/**.mdx`. It blocks the commit unless every staged MDX passes:

| Check                          | Threshold                                                    |
| ------------------------------ | ------------------------------------------------------------ |
| `title`                        | ≤ 60 chars                                                   |
| `description`                  | ≤ 155 chars                                                  |
| Image present                  | `image` or `coverAlt` frontmatter set                        |
| Question-format H2s            | ≥ 3                                                          |
| `## FAQ` section               | Present, with ≥ 5 `### Question?` entries                    |
| Brand voice                    | `scripts/voice-audit.sh` returns clean                       |
| **Flagship-only:** `tldr`      | Required                                                     |
| **Flagship-only:** `lastModified` | Required                                                  |
| **Flagship-only:** counter-arg | Body contains "counter-argument" / "objection" / "steelman" / "the case against" |

## Bypass

For genuine emergencies — hotfix typos, time-sensitive embargos — pass `--no-verify` to `git commit`. The gate documents this escape hatch so it doesn't have to be reverse-engineered. Use sparingly.

## Hook protocol

Both hooks follow the Claude Code spec:

- **SessionStart** — script prints to stdout. Output is appended to the session context.
- **PreToolUse** — script reads the tool-call JSON on stdin and emits a decision JSON on stdout:
  - `{"continue": true}` — allow the tool call.
  - `{"continue": false, "stopReason": "..."}` — block with the given reason shown to Claude.

The gate is fail-open on environment problems (missing `python3`, `yaml` module unavailable) so it never blocks an unrelated workflow.

## Testing the gate locally

```bash
# 1. Make a small change to a blog MDX
echo "<!-- test -->" >> content/blog/some-post.mdx
git add content/blog/some-post.mdx

# 2. Simulate the PreToolUse JSON the hook will receive
printf '{"tool_name":"Bash","tool_input":{"command":"git commit -m test"}}' \
  | bash .claude/hooks/blog-commit-gate.sh
```

The script will print either `{"continue": true}` or a JSON block with the violation list.

## Reference

- Blog pipeline command: `.claude/commands/flagship.md`
- Standard publish command: `.claude/commands/publish-content.md`
- Integrity-guard agent: `.claude/agents/integrity-guard.md`
- Voice config: `lib/voice/frankx-voice.ts`
- Voice scanner: `scripts/voice-audit.sh`
