# Planning methodology

## Memory fit

Required memory is `weights_gib × (1 + runtime_overhead_fraction) + context_cache_gib`. Usable memory is `accelerator_memory_gib × usable_memory_fraction`.

- `comfortable`: required is at most 80% of usable memory.
- `tight`: required fits but exceeds 80%.
- `offload`: required exceeds usable memory but host RAM may permit slower offload.
- `no-fit`: required exceeds both usable accelerator memory and practical host memory.

Prefer actual artifact size. Include KV cache, runtime workspace, vision encoders, batching, and concurrent contexts.

## Concurrency

Do not infer concurrency from TOPS. Start from a measured single stream and test representative prompt/output lengths. Report interactive streams at a latency target, aggregate batched throughput, queued capacity, context, and quantization. The planner preserves user-supplied estimates; it does not invent token rates.

## TCO

Annual electricity is `((active_watts × active_hours_per_day) + (idle_watts × idle_hours_per_day)) × 365 / 1000 × electricity_per_kwh`. Horizon TCO is capex plus electricity plus cloud spend not realistically replaced. State exclusions such as tax effects, financing, maintenance labor, resale, and downtime.

## Routing and phases

- Workstation: desktop interaction, builds, editing, gaming, CUDA media, and fast models that fit.
- Unified-memory node: larger quantized LLMs, independent 24/7 service, private inference, and background queues.
- Cloud: frontier quality, bursts, rare huge models, and resilient orchestration.
- Storage/network: shared assets and backups; storage is not accelerator memory.

Add a node after a measured gate: frequent memory failure, blocked creator work, uptime, privacy, three or more active users, sustained queue latency, or replaceable cloud spend approaching amortization plus operations. Matched-node distributed inference needs a supported runtime/interconnect and has overhead. Heterogeneous routing is the default.
