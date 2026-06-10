# Starlight-Eval → Model Hub Integration Contract

*v0.1 · 2026-06-10 · Status: contract defined, awaiting first result drop from starlight-eval*

## Why this exists

The Model Hub's [honest assessment](../../MODEL_HUB_HONEST_ASSESSMENT.md) names its biggest gap: **zero independently-measured numbers of our own** — everything is vendor-reported or cited from third parties. The Starlight Intelligence System already practices "measured claims" (its retrieval recall@k harness grounds the BM25 claim in CI). **starlight-eval** extends that philosophy to model evaluation: small, reproducible, task-specific evals run on Frank's own workloads.

When starlight-eval results land here, the hub upgrades a model's evidence from *vendor-reported* to *first-party measured* — the trust tier no aggregator site has.

## Division of labor

| System | Owns |
|---|---|
| **starlight-eval** (SIS repo, separate session) | The harness: eval definitions, runners, scoring, attestation |
| **Model Hub** (this repo) | The contract (this doc), ingestion (`lib/evals/starlight.ts`), display (sources page, model pages, arena) |

The harness writes results; the hub reads them. Neither imports the other's code — the contract is **JSON files in `data/evals/results/`**.

## Result file contract

One JSON file per eval run: `data/evals/results/<eval-id>__<YYYY-MM-DD>.json`

```jsonc
{
  "schema": "starlight-eval/v0.1",
  "eval_id": "agentic-coding-frankx-suite",     // stable id of the eval definition
  "eval_name": "FrankX Agentic Coding Suite",   // human label
  "description": "20 real tasks from FrankX repos: multi-file edits, registry updates, MDX authoring.",
  "run_date": "2026-06-10",
  "runner": "starlight-eval@0.1.0",             // harness + version
  "method_url": "https://github.com/frankxai/Starlight-Intelligence-System", // where the method is documented
  "task_count": 20,
  "scoring": "pass@1, human-verified",           // free text, but be precise
  "models": [
    {
      "model_id": "claude-opus-4-8",             // MUST match a key in data/model-registry.json
      "registry": "text",                         // "text" | "multimodal"
      "score": 0.85,                              // 0..1 normalized
      "raw": "17/20 tasks passed",
      "notes": "Strongest on multi-file refactors; 2 failures were MDX frontmatter edge cases."
    }
  ],
  "caveats": [
    "Small N (20 tasks) — directional, not statistically robust",
    "Tasks drawn from FrankX repos; generalization to other codebases unproven"
  ]
}
```

### Rules

1. **`model_id` must match a registry key** (`data/model-registry.json` for text, `data/generative-model-registry.json` for multimodal). Unknown ids are skipped by the loader with a console warning — never a crash.
2. **`caveats` is strongly recommended and must be honest when present.** Small-N evals are valuable but must say so. The loader treats the field as optional (`caveats?: string[]`) and renders it verbatim when present; a result file without caveats is accepted but will be questioned in review.
3. **Scores are 0..1 normalized** so the hub can render bars without per-eval logic. Keep `raw` for the human truth.
4. **Files are append-only.** A re-run is a new file with a new date; history stays. The loader surfaces the latest run per eval_id and keeps the trend.
5. **No PII, no API keys, no private repo content** in result files — they ship to the public site.

## What the hub does with results

- **Sources page** (`/llm-hub/sources`): models with starlight-eval results get a `first-party measured` tag — a tier above `independent`.
- **Model pages**: a "Measured by starlight-eval" section showing score, raw, caveats, run date.
- **Arena**: eval scores become comparable rows when both contestants have results from the same eval_id.
- **`/llm-hub.json` + `/models.json`**: results embedded for agents under `starlight_evals`.

Display wiring lands when the first real result file does — the loader (`lib/evals/starlight.ts`) is live now and returns an empty set until then.

## For the starlight-eval session

To integrate: write conformant JSON files into `data/evals/results/` of `frankxai/frankx.ai-vercel-website` (PR them like any content). That's the whole integration. Schema questions → update this doc in the same PR.
