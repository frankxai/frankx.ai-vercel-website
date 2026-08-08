# Model Hub — Daily & Weekly Workflow

*Last updated 2026-05-29 · Companion to `MODEL_HUB.md` and `LLM_HUB_STRATEGY.md`*

The model hubs maintain themselves with three running automations plus a clear human pipeline for adding new models. This is the operator's manual.

## Automation surfaces

| When | What | Where it runs | Output |
|---|---|---|---|
| **Daily** 07:00 UTC | Pricing freshness probe (OpenRouter) | Vercel Cron → `/api/cron/model-hub-refresh` | Drift report; (optional) redeploy hook |
| **Daily** 07:15 UTC | Belt-and-braces refresh + summary | GitHub Action `model-hub-refresh.yml` | Workflow summary with the drift JSON |
| **Weekly** Monday 08:00 UTC | Staleness audit over both registries | Vercel Cron → `/api/cron/model-hub-audit` | Structured report (JSON + markdown) |
| **Weekly** Monday 09:00 UTC | Audit → GitHub issue | GitHub Action `model-hub-audit.yml` | Opens (or updates) issue labelled `model-hub-audit` |

All cron endpoints accept `Authorization: Bearer ${CRON_SECRET}` and also accept Vercel's `x-vercel-cron` header. The audit endpoint accepts `?format=markdown` for human reading.

### One-time setup

In the Vercel project:
1. Set env var `CRON_SECRET` (any strong random string).
2. Optionally set `VERCEL_DEPLOY_HOOK_MODELS` to a deploy-hook URL — the daily refresh will fire it if pricing drift > 5% is detected, which rebuilds ISR pages with the new live numbers.

In the GitHub repo:
1. Add `CRON_SECRET` to repo secrets (same value).
2. Optionally set repo variables `MODEL_HUB_AUDIT_URL` and `MODEL_HUB_REFRESH_URL` if you want to point at preview deployments.

That's all the configuration. Both workflows already include manual-dispatch triggers so you can run them on demand from the Actions tab.

## The daily workflow (what actually happens)

```
07:00 UTC ─ Vercel cron hits /api/cron/model-hub-refresh
            └─ Fetches OpenRouter live pricing
            └─ Compares vs. data/model-registry.json (every model with openrouterId)
            └─ If drift > 5% on any field AND VERCEL_DEPLOY_HOOK_MODELS is set,
               fires the deploy hook → new ISR build → /llm-hub pages re-render
               with the updated live pricing badges.

07:15 UTC ─ GitHub Action re-hits the same endpoint (resilience)
            └─ Writes drift JSON to the workflow summary for inspection.
```

You see drift surface in two places: the next deploy on Vercel (automatic), and the workflow summary on the next GitHub run.

## The weekly workflow

```
Monday 08:00 UTC ─ Vercel cron hits /api/cron/model-hub-audit
                   └─ Runs runStalenessAudit() over both registries
                   └─ Flags any model with:
                        - released > 4 months ago and status != legacy  (stale)
                        - status: preview for > 3 months                 (preview-overdue)
                        - sources[] empty                                (missing-sources)

Monday 09:00 UTC ─ GitHub Action fetches the markdown report
                   └─ If all clear → no-op, logged.
                   └─ Else → opens (or updates) a GitHub issue
                     labelled `model-hub-audit` with the full audit body.
```

The issue is the work queue for `/new-model` and `/new-gen-model`.

## The human pipeline (adding a model)

This is the only path that touches the registries — and the automations exist so you only do this when something actually changed.

### Text LLM
```
/new-model <name>
```
- Updates `data/model-registry.json` (+ `lib/llm-hub/editorial.ts`, optional `openrouterId` for live pricing).
- Optional: add a comparison entry in `lib/llm-hub/comparisons.ts`.
- Optional: refresh decision matrix / creator stacks if rankings change.

### Multimodal (image/video/music/voice/embedding/world)
```
/new-gen-model <name> [category]
```
- Updates `data/generative-model-registry.json`.
- Optional: add a comparison entry in `lib/models-hub/comparisons.ts`.

Both commands are governed by the `model-intelligence` skill and run by the `model-intelligence-curator` agent. Both end with the same gate:
```
npx tsc --noEmit
NEXT_TURBOPACK_EXPERIMENTAL_USE_SYSTEM_TLS_CERTS=1 npm run build
```
Commit on the working branch, push. The sitemap, llms.txt, agent JSON, and every page regenerate from the registries.

## Failure modes & what to do

| Symptom | Likely cause | Fix |
|---|---|---|
| Daily refresh report is empty (`live_pricing_count: 0`) | OpenRouter network restricted in the cron region, or no models have `openrouterId` | Re-run manually; check `lib/llm-hub/editorial.ts` |
| Audit issue keeps reopening with the same flags | Models are getting old and nothing's being shipped | Run `/new-model` or `/new-gen-model` to refresh them |
| Drift > 5% but no redeploy | `VERCEL_DEPLOY_HOOK_MODELS` not set | Either set it, or run `vercel --prod` to redeploy manually |
| Audit endpoint returns 401 in Actions | Missing `CRON_SECRET` repo secret | Add it; or remove the `Authorization` header from the workflow if the endpoint is public |

## Monitoring on demand

```bash
# Run audit by hand and read the markdown
curl -sH "Authorization: Bearer $CRON_SECRET" \
  https://frankx.ai/api/cron/model-hub-audit?format=markdown

# Daily drift probe
curl -sH "Authorization: Bearer $CRON_SECRET" \
  https://frankx.ai/api/cron/model-hub-refresh | jq

# The full agent-readable registry
curl -s https://frankx.ai/llm-hub.json | jq '._meta'
curl -s https://frankx.ai/models.json   | jq '._meta'
```

## Why this shape

Three principles:

1. **One source of truth per layer.** The registries (`data/*.json`) drive everything; the automations only *read* them. The only writer is the human pipeline.
2. **Crons report, humans decide.** The refresh cron can trigger a redeploy with new pricing because that's safe and reversible. It does NOT write to the registry — that's always a human-reviewed PR.
3. **Workflows that work offline.** The audit and refresh logic are pure functions over the registries; even if every external API is down, the audit still runs and the build still ships.
