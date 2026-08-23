# Economics — personal AI centre of excellence

Every unit price is a row in `prices.json` with a vendor URL and a retrieval date of 2026-08-22.
Every volume is a `fx.*` assumption from `00-frame.md` § fixture scenario. Nothing else appears
here except arithmetic over those two, shown in full.

Run date: 2026-08-23.

## Cost drivers, taken from the blueprint

| driver | blueprint stage | priced row in `prices.json` |
|---|---|---|
| scheduled loop tokens | summarise, classify, propose facts | Model gateway — economy tier input tokens; — output tokens |
| ad-hoc session tokens | operator-initiated work sessions | Model gateway — workhorse tier input tokens; — output tokens |
| weekly deep review tokens | the weekly review pass over the ledger | Model gateway — frontier tier input tokens; — output tokens |
| off-machine backup | backup | Object storage — standard storage |

Four drivers, not seven. There is no vector store row because memory is a local file store with an
on-disk index (`packages/memory/src/store.ts:L9`), and no compute rows because the machine is the
runtime. The machine's electricity and depreciation are real costs and are **not** modelled here;
the laptop existed before this system and would exist without it.

## Monthly cost at the fixture volume

Scheduled loops — 3 per day (`fx.loops`) × 30 days (`fx.days`) = 90 runs:

- input: 25,000 (`fx.sched.in`) × 90 = 2,250,000 = 2.25M × $1.00 per 1M = **$2.25**
- output: 2,500 (`fx.sched.out`) × 90 = 225,000 = 0.225M × $5.00 per 1M = **$1.13**
- subtotal = **$3.38**

Ad-hoc sessions — 40 per month (`fx.sessions`):

- input: 60,000 (`fx.session.in`) × 40 = 2,400,000 = 2.4M × $2.00 per 1M = **$4.80**
- output: 8,000 (`fx.session.out`) × 40 = 320,000 = 0.32M × $10.00 per 1M = **$3.20**
- subtotal = **$8.00**

Weekly deep reviews — 4 per month (`fx.reviews`):

- input: 150,000 (`fx.review.in`) × 4 = 600,000 = 0.6M × $5.00 per 1M = **$3.00**
- output: 12,000 (`fx.review.out`) × 4 = 48,000 = 0.048M × $25.00 per 1M = **$1.20**
- subtotal = **$4.20**

Backup — 20 GB (`fx.backup`) × $0.015 per GB per month = **$0.30**

**Monthly run cost = 3.38 + 8.00 + 4.20 + 0.30 = $15.88.**
**Annual run cost = 15.875 × 12 = $190.50.**

Four runs a month on the largest model cost more than ninety runs on the smallest one. That is the
whole argument for the routing table at `packages/model/src/route.ts:L14`: routing is not a
micro-optimisation here, it is the difference between $15.88 and roughly four times that if every
loop went to the judgement model.

The stated budget line is $25 a month (`01-discovery.md` § 61). The fixture sits $9.12 under it,
and the sensitivity band below is the first place to look before assuming that holds.

## The benefit side, and what it is not

From `fx.manual` = 45 minutes a day by hand and `fx.assisted` = 10 minutes a day reading the brief
and the distill: 35 minutes saved per day.

- 35 min × 30 days = 1,050 minutes = 17.5 hours per month
- 17.5 h × $60 (`fx.rate.self`) = **$1,050 per month**
- net of run cost: 1,050 − 15.88 = **$1,034.12 per month**

**This is not money.** There is no payroll here, no invoice, and nobody paying for the hour that
was freed. It becomes money only if the freed time goes into paid work or into something the
operator would otherwise have bought. If the 35 minutes goes into more reading, the honest reading
of this section is that the system costs $15.88 a month and changed how a morning feels — which
may be worth $15.88 and is a different claim from a return.

`fx.rate.self` is a fixture assumption, not a sourced price, and that is why it is not a row in
`prices.json`. The 45-minute baseline is self-reported from two weeks of the operator's own timer
entries (`01-discovery.md` § 1) — the weakest input in this model, and the one the sensitivity band
below is really about.

## Payback

Build cost: `fx.build` = 30 hours of the operator's own time × $60 = **$1,800**.

Base payback = 1,800 ÷ 1,034.12 = **1.7 months**.

## Sensitivity

Band: plus or minus 30% on each driver, one at a time, baseline = the fixture assumptions in
`00-frame.md`.

| driver | low | base | high | annual run cost | payback (months) |
|---|---|---|---|---|---|
| minutes saved per day (`fx.manual` − `fx.assisted`) | 24.5 | 35 | 45.5 | unchanged at $190.50 | 2.50 → 1.74 → 1.33 |
| build effort (`fx.build`) | 21 h | 30 h | 39 h | unchanged at $190.50 | 1.22 → 1.74 → 2.26 |
| token volume across all three tiers (baseline = the fixture token counts) | 30% below | base | 30% above | $133.35 → $190.50 → $247.65 | 1.733 → 1.741 → 1.749 |

Two things worth reading twice in that table.

**Token volume barely moves the answer.** Model spend is $15.88 against $1,050 of time; a swing of
30% either way (baseline = the fixture token volumes) changes payback by about half a day. The
economics of this system are labour, not tokens, and an afternoon spent shaving prompt size is an
afternoon spent on the wrong line.

**The operator's hourly value cancels out entirely**, which is why it is not a driver in the table.
It scales the benefit and the build cost by the same factor, so it changes the size of both numbers
and not the month they cross. At $30 an hour: benefit $525, less $15.88 run cost = $509.12, build
$900, payback 1.77 months. At $60: 1.74 months. At $300: 1.72 months. The whole residue is the run
cost, which is denominated in dollars and does not scale with what the operator's time is worth.

Combining the two drivers that do move:

- **favourable** — 45.5 minutes saved, 21 build hours, token volume 30% below baseline: benefit
  22.75 h × $60 = $1,365, less $11.11 run cost = $1,353.89; build $1,260; payback **0.9 months**.
- **unfavourable** — 24.5 minutes saved, 39 build hours, token volume 30% above baseline: benefit
  12.25 h × $60 = $735, less $20.64 run cost = $714.36; build $2,340; payback **3.3 months**.

**Payback: 0.9 to 3.3 months, base case 1.7 months**, and notional throughout, because the saved
hours are the operator's own. No return-rate figure is given: there is no cash flow here at all,
so a rate would be arithmetic performed on a feeling.

## What this model does not price

- The weekly ledger itself, which is the operator's time spent maintaining the thing that saves
  the operator time. The second kill criterion in `00-frame.md` exists because this is the most
  likely way the model goes negative.
- The machine, its power, and its replacement.
- The restore that has never been tested. If the memory store is ever lost, the recovery cost is
  unknown, which is a different and larger number than anything in this file (`review.md`, F1).
- Attention. Three drafts a day waiting to be read is a real cost to the person reading them, and
  minutes-saved arithmetic cannot see it.

Generated by AI Architect · https://www.frankx.ai/ai-architect
