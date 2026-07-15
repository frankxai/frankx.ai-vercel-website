---
name: plan-ai-hardware-fleet
description: Plan and compare AI workstations, creator PCs, unified-memory nodes, local model servers, cloud capacity, and phased machine fleets. Use when Codex must translate workloads, budgets, uptime, privacy, local LLM or generative-media requirements into hardware recommendations; estimate model fit, concurrent agent capacity, power and three-year TCO; compare workstation versus DGX Spark/GX10/AMD/Mac-style nodes versus APIs; or emit Markdown, CSV, and JSON planning artifacts.
---

# Plan AI Hardware Fleet

Build an evidence-labeled plan. Separate current measured bottlenecks from aspirational workloads, and creator throughput from model-memory capacity.

## Workflow

1. Gather the minimum inputs in `references/input-schema.md`: region/currency, budget, electricity, existing devices, workload shares, uptime, privacy, target models, candidate machines, and cloud spend.
2. Browse current official specifications and live regional listings whenever prices, availability, compatibility, software support, or future launches affect the decision. Record URL and observation date. Label rumors as unverified and exclude them from the base case.
3. Normalize candidates into the input JSON schema. Never treat system RAM as discrete-GPU VRAM. Never add memory across heterogeneous machines unless a supported distributed runtime and interconnect are explicitly documented.
4. Use `references/methodology.md` for fit, concurrency, routing, TCO, and expansion rules.
5. Run `python scripts/plan_fleet.py --input requirements.json --output planning-output`.
6. Review all warnings and replace generic phase labels with evidence-backed purchase gates. Explain what each node does, what it cannot do, and which workloads remain cloud-first.
7. Deliver `fleet-plan.md`, `machine-comparison.csv`, `model-fit.csv`, and `fleet-plan.json`. Cite live sources in the narrative when web research was used.

## Decision rules

- Prefer a creator workstation first when desktop work, editing, CUDA media, gaming, builds, or interactive generation is the measured bottleneck.
- Prefer a unified-memory node first only when large-model capacity, privacy, independent 24/7 inference, or shared team serving is measured and a daily workstation already exists.
- Prefer cloud for frontier video, bursty giant models, uncertain demand, or low utilization. Compare only spend realistically replaceable by local models.
- Treat agents as software identities sharing endpoints. Estimate concurrency from simultaneous inference streams, context, and batch load—not named agents.
- Keep orchestration deterministic: queue, permissions, routing, logging, retries, and approval gates. A model is an inference dependency, not the control plane.
- Recommend phases with measurable gates. Do not buy a later-phase node merely because it is technically impressive.
- State uncertainty. Vendor TOPS/PFLOPS across precisions are not directly comparable and never substitute for workload benchmarks.

## Output quality gate

Confirm the plan includes one explicit recommendation and a lower-cost alternative; workload routing; model/media fit with headroom and quantization assumptions; interactive and queued concurrency; capex, electricity, cloud, and horizon TCO; an upgrade/redeployment path; procurement risks and dated sources; and no fabricated prices, speeds, launches, or compatibility claims.
