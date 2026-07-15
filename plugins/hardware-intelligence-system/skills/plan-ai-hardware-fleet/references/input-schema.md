# Planner input schema

Use JSON. Monetary fields share `currency`; power uses watts; memory uses GiB.

```json
{
  "project": "Creator studio",
  "currency": "EUR",
  "region": "NL",
  "electricity_per_kwh": 0.30,
  "horizon_years": 3,
  "budget": 9000,
  "monthly_cloud_spend": 300,
  "cloud_replaceable_fraction": 0.35,
  "workloads": {"development": 35, "image_generation": 20, "video_generation": 15, "editing": 15, "llm_agents": 15},
  "models": [{"name": "32B Q4", "weights_gib": 19, "runtime_overhead_fraction": 0.25, "context_cache_gib": 4}],
  "machines": [{
    "name": "Creator PC", "role": "workstation", "price": 4500,
    "accelerator_memory_gib": 16, "usable_memory_fraction": 0.90,
    "system_ram_gib": 128, "storage_tb": 6,
    "active_watts": 600, "idle_watts": 70,
    "active_hours_per_day": 6, "idle_hours_per_day": 2,
    "interactive_streams_small": 6, "interactive_streams_large": 1,
    "software_fit": ["windows", "cuda", "editing", "image"],
    "source_url": "https://example.com", "observed_on": "2026-07-15"
  }]
}
```

Required top-level keys: `project`, `currency`, `electricity_per_kwh`, `horizon_years`, `models`, `machines`.

For unified-memory systems, put documented allocatable model memory in `accelerator_memory_gib`. Otherwise use total unified memory and a conservative `usable_memory_fraction` such as 0.80. Use `role` values such as `workstation`, `unified-node`, `server`, or `cloud`. Stream estimates must come from measured or sourced benchmarks before a purchase decision.
