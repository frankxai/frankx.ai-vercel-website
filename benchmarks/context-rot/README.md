# Context-rot benchmark

A first-party, reproducible measurement of **needle survival under context eviction** — as a
conversation grows past a fixed token budget, does a fact planted earlier in it still exist in
what gets sent to the model at all — across three context-management strategies:

| strategy | what it is |
|---|---|
| `fifo` | naive sliding window — oldest turns evicted first as the conversation grows |
| `keep-first-and-last` | anchor the earliest turns unconditionally, fill the rest with the most-recent turns |
| `retrieval-augmented` | content addressed by lookup, not recency — never evicted by window size |

This is the kind of number a hub should *generate*, not cite. It ships with its scenarios,
its simulator, its code, and its raw outputs so you can reproduce it — or point the same
harness at your own turn counts and budgets for a number representative of your stack.

## The number (reproducible offline, no API key)

On the included scenario set — **N = 5 scenarios × 3 needle depths (10% / 50% / 90% into the
conversation) = 15 cells per strategy**:

```
strategy               survival@10%   survival@50%   survival@90%   overall
fifo                   40.0%          40.0%          100.0%         60.0%
keep-first-and-last    60.0%          40.0%          80.0%          60.0%
retrieval-augmented    100.0%         100.0%         100.0%         100.0%
```

Two mechanisms are visible in this table:

1. **The middle is the danger zone.** Every non-retrieval strategy loses ground at 50% depth
   compared to 10% or 90% — a fact planted in the true middle of a growing conversation is the
   one both eviction strategies are least likely to still have on hand, because it's neither
   recent enough to be inside the recency window nor early enough to be inside an anchor.
2. **`keep-first-and-last` is not a strict win.** It only pulls ahead of `fifo` at the 10%
   depth (60% vs 40%) — reserving budget for the earliest turns recovers early facts. But that
   reserved budget shrinks the recency window, so in the small-budget long-session scenario
   (`c02`) `keep-first-and-last` actually *loses* a 90%-depth needle that `fifo` would have
   kept (see `results/per-scenario.json`). Both strategies land at the same 60.0% overall on
   this scenario set — the anchor helps in some regimes and costs in others, depending on how
   the reserved anchor budget compares to the total budget. `retrieval-augmented` is the only
   strategy immune to this trade-off, because it isn't evicting a transcript window at all.

> Scope, stated plainly: **this measures whether a fact survives in the context sent to the
> model — not whether the model correctly recalls it.** Those are two different questions. A
> naive FIFO window deterministically evicting a turn is a mechanical, 100%-reproducible fact
> about how the harness assembled the prompt; it is upstream of, and simpler than, "context
> rot" in the sense the literature uses the term — the empirical finding that LLM *accuracy*
> degrades non-uniformly by position even when the relevant tokens are technically present in
> context (the "lost in the middle" effect). This benchmark's offline number demonstrates the
> structural precondition (a fact must survive eviction before a model can possibly recall it);
> it does **not** measure real LLM accuracy, and it is not a substitute for the measured,
> sourced numbers below. For those, see the
> [cost & reliability dataset](https://frankx.ai/ai-architecture/data) — in particular the
> Databricks long-context RAG study, NVIDIA's RULER benchmark, Adobe's NoLiMa evaluation, and
> Chroma's "Context Rot" report, all of which measure actual model accuracy degradation, not a
> structural eviction proxy. Run the optional live leg below for a small, real (non-deterministic)
> sanity check that the accuracy phenomenon itself is observable — it is not this benchmark's
> headline number and is not designed to reproduce any of those papers' exact figures.

## Run it yourself

```bash
# offline — deterministic simulation, no key, < 1 second
npm run bench

# with a live sanity check — a small needle-in-haystack grid against a real model
# (BYOK; the key is never persisted or logged)
OPENAI_API_KEY=sk-... npm run bench
```

Outputs land in `results/`:
- `results.json` — survival rate per strategy, overall and by needle depth, plus the live-leg
  result when a key is set
- `per-scenario.json` — the full per-scenario, per-depth breakdown (turn index, survived
  true/false per strategy) that the totals in `results.json` are computed from

The committed `results/` is the **offline-only** run (it needs no key, so anyone can
reproduce it exactly). Running with `OPENAI_API_KEY` adds a `live` field to `results.json`
without changing the offline numbers.

## How it's measured (so you can challenge it)

- **Scenarios:** `data/scenarios.json` — 5 fixed sessions, each with a `total_turns` count, an
  `avg_tokens_per_turn` estimate, and a `context_budget_tokens` window size. `c01` is the
  control (the session fits the window entirely, so eviction never triggers); `c03` replays
  `c02`'s exact session against a much wider window, isolating the effect of budget alone.
- **Needle depths:** fixed at `NEEDLE_DEPTHS = [0.1, 0.5, 0.9]` in `src/simulate.mjs` (10%,
  50%, 90% into the conversation) — the standard needle-in-haystack convention. The needle's
  turn index is `floor(depth × (total_turns − 1))`.
- **Simulator:** `src/simulate.mjs` — pure functions, no randomness, no network.
  - `fifo`: keeps the most-recent `floor(budget / avg_tokens_per_turn)` turns; a needle
    survives if its turn index falls inside that recency window.
  - `keep-first-and-last`: reserves the earliest `ANCHOR_TURNS` turns (fixed at 10)
    unconditionally, then fills whatever budget remains with the most-recent turns. A needle
    survives if it's inside the anchor OR inside the (smaller) remaining recency window.
  - `retrieval-augmented`: always survives, by construction — see the scope note above for
    exactly what this does and doesn't claim.
- **Determinism:** no randomness anywhere in the offline path — same scenarios + same simulator
  → same survival table, every run. Verified by running `node src/bench.mjs` twice and diffing
  `results/results.json` and `results/per-scenario.json` byte-for-byte.
- **Live leg (`src/live.mjs`, optional, BYOK):** a 2-haystack-length × 3-depth grid (6 chat
  completions total) against a real model (`gpt-4o-mini` by default, override with
  `LIVE_MODEL`). Each cell plants a fixed verification-code sentence in a filler haystack at
  the target depth and asks the model to report the code back; a cell is a hit if the exact
  code appears in the answer. The API key is read only from `OPENAI_API_KEY` and is never
  written to disk or logged. This leg is real, cheap, and **not deterministic** — it's a sanity
  check that the underlying accuracy phenomenon is observable, not a benchmark result to cite.

## Sourced numbers on real LLM accuracy vs. context length

These are measured findings from published studies, not generated by this benchmark. Full
entries (denominator, source, confidence, retrieval date) live in the
[cost & reliability dataset](https://frankx.ai/ai-architecture/data):

- **Databricks — Long Context RAG Performance of LLMs:** across 2,000+ experiments on 13
  models and 4 RAG datasets, most models' answer correctness peaks then degrades past a
  model-specific context length (e.g. Llama-3.1-405B after ~32K tokens, GPT-4-0125-preview
  after ~64K tokens).
- **NVIDIA — RULER:** on a 13-task synthetic long-context suite, only about half of evaluated
  models effectively handle 32K tokens, and every model's *effective* context length falls
  below its *advertised* one.
- **Adobe Research — NoLiMa:** under needle-in-haystack tests requiring latent (non-literal)
  association rather than keyword match, 10 of the evaluated models drop below 50% of their
  short-context base score by 32K tokens.
- **Chroma — Context Rot:** across 18 frontier models on LongMemEval, every model scored
  30-60% higher on a ~300-token focused version of a question than on the same question inside
  a ~113K-token full conversation — with the relevant 300 tokens held identical in both.

Found a flaw in the scenarios, the metric, or the method? Open an issue or a PR — corrections
are the point.

Built by [Frank Riemer](https://frankx.ai) · part of the frankx.ai/ai-architecture benchmark spine.
