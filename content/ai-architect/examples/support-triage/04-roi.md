# Economics — support triage

Every unit price below is a row in `prices.json`, each with a vendor URL and a retrieval date of
2026-08-22. Every volume below is a `fx.*` assumption from `00-frame.md` § fixture scenario. No
number appears here that is not one of those two things or arithmetic over them, and the
arithmetic is shown so a reader can re-derive the total without guessing an intermediate step.

Run date: 2026-08-23. Price rows are one day old.

## Cost drivers, taken from the blueprint

Every AI/Agents cell in `03-experience-blueprint.md` that spends money, and nothing else:

| driver | blueprint stage | priced row in `prices.json` |
|---|---|---|
| model input and output tokens | classify and route, draft reply | Model gateway — workhorse tier input tokens; — output tokens |
| vector store reads | retrieve macros | Managed vector store — read units |
| vector store writes and storage | embed changed macros, swap index | Managed vector store — write units; — storage |
| worker compute | all worker stages | Serverless function — compute duration; — invocations |
| workflow state transitions | the triage job's steps and retries | Durable workflow runtime — state transitions |

## Monthly cost at the fixture volume

Volume: `fx.volume` = 5,000 tickets per month.

Model tokens:

- input: 6,000 tokens (`fx.tokens.in`) × 5,000 = 30,000,000 = 30M × $2.00 per 1M = **$60.00**
- output: 700 tokens (`fx.tokens.out`) × 5,000 = 3,500,000 = 3.5M × $10.00 per 1M = **$35.00**
- model subtotal = **$95.00**

Vector store:

- reads: 3 per ticket (`fx.retrieval`) × 5,000 = 15,000 = 0.015M × $16.00 per 1M = **$0.24**
- writes: nightly re-index of changed macros, 60,000 write units per month = 0.06M × $4.00 per 1M = **$0.24**
- storage: 2 GB (`fx.corpus`) × $0.33 per GB per month = **$0.66**
- vector subtotal = **$1.14**

Worker compute:

- duration: 20 s (`fx.runtime`) × 0.5 GB = 10 GB-s per ticket × 5,000 = 50,000 GB-s × $0.0000166667 = **$0.83**
- invocations: 5,000 = 0.005M × $0.20 per 1M = **$0.001**
- compute subtotal = **$0.83**

Durable workflow:

- 12 transitions per ticket (`fx.transitions`) × 5,000 = 60,000 = 60 × $0.025 per 1,000 = **$1.50**

**Monthly run cost = 95.00 + 1.14 + 0.83 + 1.50 = $98.47.**
**Annual run cost = 98.47 × 12 = $1,181.64.**
**Cost per ticket = 98.47 ÷ 5,000 = $0.0197.**

The model line is 96 of every 100 dollars. Every other line is rounding by comparison, which is
worth knowing before anyone spends a week optimising the vector store.

## The benefit side, and what it is not

Benefit here is time, from two fixture assumptions: `fx.manual` = 4.0 minutes to triage and
compose by hand, `fx.review` = 1.5 minutes to review and send a draft. Saved time per ticket is
4.0 − 1.5 = 2.5 minutes.

- 2.5 min × 5,000 = 12,500 minutes = 208.33 hours per month
- 208.33 h × $38 (`fx.rate.support`) = **$7,916.67 per month of support time**
- net of run cost: 7,916.67 − 98.47 = **$7,818.20 per month**

**This is capacity, not cash.** Nobody's payroll drops when a queue gets faster. The saved hours
turn into money only if headcount plans change or ticket volume grows into the freed capacity —
and if neither happens, the correct reading of this section is that the system cost $98.47 a
month and bought a faster first reply, which may still be worth it and is a different claim.

`fx.rate.support` and `fx.rate.eng` are fixture assumptions, not sourced prices, which is why
they are not rows in `prices.json`. In a real run they are `[unknown]` until the operator
supplies a payroll figure, and until then this whole section is a shape with no magnitude.

## Payback

Build cost: `fx.build` = 140 engineer hours × $85 (`fx.rate.eng`) = **$11,900**.

Base payback = 11,900 ÷ 7,818.20 = **1.5 months**.

## Sensitivity

Band: plus or minus 30% on each driver, one at a time, baseline = the fixture assumptions in
`00-frame.md`. The three drivers below are the ones that move the answer; nothing else changes
the payback month by as much as a week.

| driver | low | base | high | annual run cost | payback (months) |
|---|---|---|---|---|---|
| monthly ticket volume (`fx.volume`) | 3,500 | 5,000 | 6,500 | $830.40 → $1,181.64 → $1,532.88 | 2.17 → 1.52 → 1.17 |
| minutes saved per ticket (`fx.manual` − `fx.review`) | 1.75 | 2.5 | 3.25 | unchanged at $1,181.64 | 2.19 → 1.52 → 1.17 |
| build effort (`fx.build`) | 98 h | 140 h | 182 h | unchanged at $1,181.64 | 1.07 → 1.52 → 1.98 |

Arithmetic for the volume row: $0.90 of the monthly cost is fixed (storage $0.66 and the fixed
part of the nightly write units $0.24); the remaining $97.57 scales with volume. At 3,500:
97.57 × 0.7 + 0.90 = $69.20 per month, $830.40 per year. At 6,500: 97.57 × 1.3 + 0.90 = $127.74
per month, $1,532.88 per year.

Combining all three in the same direction:

- **favourable** — 6,500 tickets, 3.25 minutes saved, 98 build hours: benefit 352.08 h × $38 =
  $13,379.17, less $127.74 run cost = $13,251.43; build $8,330; payback **0.6 months**.
- **unfavourable** — 3,500 tickets, 1.75 minutes saved, 182 build hours: benefit 102.08 h × $38 =
  $3,879.17, less $69.20 run cost = $3,809.97; build $15,470; payback **4.1 months**.

**Payback: 0.6 to 4.1 months, base case 1.5 months**, on the fixture assumptions and only if the
freed capacity converts. No return-rate figure is given: there is no cash-flow series here and no
stated discount rate, so a rate would be precision the inputs do not support.

## What this model does not price

- The cost of a wrong route that a person does not catch. Rare, because sending is human-gated,
  but not zero and not modelled.
- The support lead's weekly eval review, which is real time spent by the person whose time this
  system is meant to protect.
- The remediation named in `review.md` (the model plane has no owner). Whoever takes that plane
  takes hours with it, and those hours are not in `fx.build`.
- Any price change. Every row in `prices.json` is a snapshot dated 2026-08-22; the rows are
  re-fetched before this file is quoted anywhere, not carried forward on the assumption that
  vendor pricing pages hold still.

Generated by AI Architect · https://www.frankx.ai/ai-architect
