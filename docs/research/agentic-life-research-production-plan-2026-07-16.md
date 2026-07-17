# Production plan — Agentic Life Research Hub Cluster (2026-07-16)

## Goal

Get rich embedding research live on frankx.ai:

| Route | Failure mode |
|-------|----------------|
| `/research/agentic-life-architecture` | All five (spine) |
| `/research/agentic-memory` | #1 Context compounds |
| `/research/agentic-sovereignty` | #3 Ownership real |
| `/research/agentic-evals` | #4 Quality verifiable |

Auto-routed via `app/research/[slug]` + `lib/research/domains.ts` + sitemap/`llms.txt`.

## 4-fact git

| Fact | Value |
|------|-------|
| Path | `repos/.hermes-worktrees/frankx-agentic-life-research` |
| Origin | `frankxai/frankx.ai-vercel-website` |
| Branch | `agent/hermes/agentic-life-research` |
| PR | https://github.com/frankxai/frankx.ai-vercel-website/pull/322 (draft) |

## Best path to production (estate-safe)

1. **Batch content on draft PR** (this commit) — no per-tiny-push churn.
2. **Confirm CI green** on draft (heavy jobs may stay light until ready).
3. **Verify Vercel preview** for all four slugs (HTML + sources list + related domains).
4. **`gh pr ready 322`** only when content + preview look good → full suite fires.
5. **Hold if** another BUILDING production/preview deploy <10m old on same project.
6. **Squash-merge** when ready (one meaningful deploy).
7. **Post-merge smoke**: live frankx.ai routes + `llms.txt` includes new domains.
8. **Do not** double-deploy via Actions `vercel deploy` if native git integration deploys.

### Preview checklist

- [ ] `/research/agentic-life-architecture` sections + FAQ render
- [ ] `/research/agentic-memory` taxonomy + product table
- [ ] `/research/agentic-sovereignty` rights + privacy classes
- [ ] `/research/agentic-evals` trajectory + platforms
- [ ] Sources panels non-empty for each slug
- [ ] Related domain chips resolve (no dead slugs)
- [ ] Sanitizer: no private client names / internal IBANs / secrets

### Optional post-live

- Blog longform from briefs
- Cross-link from `/agentic-life-os` and ACOS marketing pages
- Queen report mirror under estate reports if ops wants receipt

## Embedding graph (public seed)

Primary nodes: four research URLs + GitHub SSOT (AOSS, field guide, ALOS, ACOS, SIS, starlight-memory, starlight-evals, ops-hub, awesome-agent-operating-systems) + external Mem0/Graphiti/Letta + Braintrust/LangSmith docs + LongMemEval/LOCOMO + OWASP LLM Top 10 + EU AI Act overview.

## Status

- Domains 1–2 shipped in PR #322 commit 1
- Domains 3–4 + production plan in follow-up commit on same branch
