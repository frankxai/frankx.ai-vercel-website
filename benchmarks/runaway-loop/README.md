# Runaway-loop benchmark

A first-party, reproducible measurement of **agent loop runaway cost** — what happens to
cost when an agent keeps calling tools without converging, compared to the same task under
a hard step cap:

| policy | what it is |
|---|---|
| `uncapped` | no external stop condition; the loop runs until it converges or exhausts a simulation horizon |
| `capped` | `stepCountIs(N)` bounds the run at a fixed multiple of the task's known-optimal step count |

This is the kind of number a hub should *generate*, not cite. It ships with its scenarios,
its simulator, its code, and its raw outputs so you can reproduce it — or point the same
harness at your own step-count and token data for a number representative of your stack.

## The number (reproducible offline, no API key)

On the included scenario set — **N = 5 scenarios**, four of which script a non-convergent
trap (retrying without new information, revisiting prior state, chasing a moving goalpost,
retrying an identical failed call) and one clean control:

```
scenario                   trap                             optimal  uncapped  capped  uncapped $  capped $
single-file-fix            none                             3        3         3       $0.0081     $0.0081
flaky-test-retry           retry-without-new-information     4        500       12      $1.65       $0.0396
circular-tool-delegation   state-revisit-cycle               5        500       15      $2.1        $0.063
goal-drift-refactor        moving-goalpost                   8        500       24      $3.3        $0.1584
tool-error-loop            identical-retry                   2        500       6       $1.05       $0.0126

totals: uncapped $8.1081 (81.65x optimal) vs capped $0.2817 (2.84x optimal)
        the cap contains $7.8264 across 5 scenarios
```

The mechanism, plainly: **without a step cap, a non-convergent loop's cost is bounded only
by how long you let it run — it is linear in step count, not in task complexity.** Put a
`stepCountIs(N)` stop condition in front of it and the cost is bounded at `N × cost-per-step`,
no matter how badly the loop is behaving. In this scenario set the cap (set at 3× each task's
optimal step count) contains 96.5% of the uncapped cost while still leaving each capped run
well above what the task actually needed — the residual `2.84x optimal` is the price of
running a cap wide enough not to false-stop a legitimately slower task.

> Scope, stated plainly: the four "trap" scenarios are **scripted to be non-convergent by
> construction** — they demonstrate the mechanism (unbounded steps → unbounded cost; a step
> cap bounds it), not a measured real-world runaway rate. The `uncapped` step count for a
> trapped scenario is not "how long a real agent would loop" — it's cut at a fixed simulation
> horizon (500 steps) purely so the demo terminates. Nothing here claims to know how often
> production agents actually run away. For a verified, sourced number on multi-agent token
> overhead (~15x a single chat), see the [cost & reliability dataset](https://frankx.ai/ai-architecture/data)
> — that stat is measured; this benchmark's numbers are simulated to show the mechanism.

## Run it yourself

```bash
# offline — deterministic simulation, no key, < 1 second
npm run bench

# with a live sanity check — one real small agent loop against a real model (BYOK, never persisted or logged)
OPENAI_API_KEY=sk-... npm run bench
```

Outputs land in `results/`:
- `results.json` — totals (uncapped vs capped cost, ratio to optimal, cost contained by the
  cap), plus the live-leg result when a key is set
- `per-scenario.json` — the full step count and cost breakdown for every scenario under both
  policies

The committed `results/` is the **offline-only** run (it needs no key, so anyone can
reproduce it exactly). Running with `OPENAI_API_KEY` adds a `live` field to `results.json`
without changing the offline numbers.

## How it's measured (so you can challenge it)

- **Scenarios:** `data/scenarios.json` — 5 fixed task definitions, each with an
  `optimal_steps` count (how many tool-call steps a converging agent needs), a `trap` (a
  named, scripted non-convergent behavior, or `"none"` for the control), and an
  `avg_tokens_per_step` estimate.
- **Simulator:** `src/simulate.mjs` — pure functions, no randomness, no network. A trap other
  than `"none"` is defined to never converge under the uncapped policy (that's what makes it
  a trap); it converges immediately under the control. This is a scripted demonstration of
  the mechanism, not a stochastic model fit to real agent transcripts.
- **Cost:** `steps × avg_tokens_per_step`, priced at `src/pricing.mjs`'s `PRICE_PER_M`
  (**illustrative** blended $/1M-token rate, override with `STEP_PRICE_PER_M`) — the same
  pattern as the retrieval-miss benchmark's embedding cost receipt. A step's cost is
  dominated by the growing conversation history the model re-reads each turn, not by the
  tool result itself, which is why cost tracks step count.
- **Cap:** `stepCountIs(optimal_steps × 3)` — see `DEFAULT_CAP_MULTIPLIER` in
  `src/simulate.mjs`. 3× is a deliberately generous cap (room for a task to take longer than
  optimal without false-stopping); tighten or loosen it for your own scenarios.
- **Determinism:** the offline simulation has no randomness — same scenarios + same simulator
  → same step counts → same costs, every run. The optional live leg (`src/live.mjs`) is real
  and therefore not bit-for-bit deterministic, but its scenario is built so a naive
  stop-on-confidence agent will run to the cap regardless of model variance — you're checking
  that the mechanism holds, not reproducing an exact transcript.

Found a flaw in the scenarios, the metric, or the method? Open an issue or a PR — corrections
are the point.

Built by [Frank Riemer](https://frankx.ai) · part of the frankx.ai/ai-architecture benchmark spine.
