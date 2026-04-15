# PR Review Policy

**Status:** Active
**Last updated:** 2026-04-15

## Principle

One strong reviewer beats three mediocre ones. Signal dilution is worse than no review.

## Active reviewers

| Reviewer | Role | Can approve? |
|----------|------|--------------|
| **Frank** (`@frankxai`) | Final approver, CODEOWNER | ✅ Required |
| **Claude** (via `superpowers:requesting-code-review`) | Pre-PR self-review before opening | Advisory |
| **CodeRabbit** | Second-opinion code review, security, types | Advisory (comments only) |
| **Vercel** | Preview deployment per PR | Status check |

## Disabled / to-disable

| Reviewer | Reason |
|----------|--------|
| **Gemini Code Assist** | Overlaps CodeRabbit, weaker signal, mostly summarization |
| **Codex Connector** | Same overlap — triple coverage dilutes attention |

Remove these from the repo's GitHub App installations at:
`https://github.com/organizations/frankxai/settings/installations`

## Workflow

1. **Claude writes code** → runs `superpowers:requesting-code-review` on the diff before pushing
2. **Push to feature branch** → open PR → Vercel builds preview + CodeRabbit reviews
3. **Frank reviews** preview URL + CodeRabbit's critical/major comments only
4. **Frank approves** → auto-merge fires (`.github/workflows/auto-merge.yml`) → Vercel deploys `main` to frankx.ai

## CodeRabbit tuning

See `.coderabbit.yaml` at repo root:

- `profile: assertive` — fewer, stronger comments
- `path_filters` — ignore `public/images/`, `docs/`, generated scripts, sibling OSS directories
- `path_instructions` — domain-specific guidance per folder (App Router conventions, design tokens, data-registry caution)
- `drafts: false` — no noise on WIP
- `poem: false` — no preamble theatre

## The rule

**Bots comment. Frank approves.** CODEOWNERS enforces this:

```
*       @frankxai
```

No bot-only merges. Ever.
