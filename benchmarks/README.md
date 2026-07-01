# frankx.ai/ai-architecture — benchmark spine

First-party, reproducible benchmarks on the failure modes that actually break production AI
systems. Each one ships its harness, corpus, seeds, and raw outputs, so the number it reports
can be reproduced — or re-run on your own data.

The point is simple: a reference you can *check* beats a reference you have to *trust*. These
benchmarks are the headline; borrowed third-party stats live in the
[cost & reliability dataset](https://frankx.ai/ai-architecture/data), clearly tagged with their
denominators and sources, never dressed up as first-party rigor.

| benchmark | failure mode | status |
|---|---|---|
| [`retrieval-miss/`](./retrieval-miss) | the retriever doesn't return the passage that holds the answer | live |
| [`runaway-loop/`](./runaway-loop) | an agent loops without converging and cost scales with steps, not task complexity | live |
| `context-rot/` | accuracy degrades as the context window fills | planned |

Method, dating, and how to challenge a number: see the
[methodology page](https://frankx.ai/ai-architecture/methodology).

MIT-licensed. Corrections welcome — open an issue or a PR.

Built by [Frank Riemer](https://frankx.ai).
