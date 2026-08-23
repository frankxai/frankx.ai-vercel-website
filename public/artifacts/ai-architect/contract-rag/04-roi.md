# Economics — contract question answering

Every unit price is a row in `prices.json`, each with a vendor URL and a retrieval date of
2026-08-22. Every volume is a `fx.*` assumption from `00-frame.md` § fixture scenario. Everything
else is arithmetic over those two, shown in full.

Run date: 2026-08-23.

## Cost drivers, taken from the blueprint

| driver | blueprint stage | priced row in `prices.json` |
|---|---|---|
| answer tokens | answer with citations | Model gateway — workhorse tier input tokens; — output tokens |
| scope-check and rerank tokens | scope check, rerank | Model gateway — economy tier input tokens; — output tokens |
| vector store reads | retrieve clauses | Managed vector store — read units |
| vector store writes and storage | embed, swap index | Managed vector store — write units; — storage |
| request compute | the whole question path | Serverless function — compute duration; — invocations |
| clause text and audit records | audit record | Object storage — standard storage |
| re-index orchestration | monthly re-index | Durable workflow runtime — state transitions |

## Monthly cost at the fixture volume

Volume: `fx.volume` = 900 questions per month.

Answer model:

- input: 18,000 (`fx.answer.in`) × 900 = 16,200,000 = 16.2M × $2.00 per 1M = **$32.40**
- output: 900 (`fx.answer.out`) × 900 = 810,000 = 0.81M × $10.00 per 1M = **$8.10**
- subtotal = **$40.50**

Scope check and rerank:

- input: 6,000 (`fx.rerank.in`) × 900 = 5,400,000 = 5.4M × $1.00 per 1M = **$5.40**
- output: 400 (`fx.rerank.out`) × 900 = 360,000 = 0.36M × $5.00 per 1M = **$1.80**
- subtotal = **$7.20**

Vector store:

- reads: 8 per question (`fx.retrieval`) × 900 = 7,200 = 0.0072M × $16.00 per 1M = **$0.12**
- writes: monthly re-index of 12,000 clauses (`fx.corpus.clauses`) = 0.012M × $4.00 per 1M = **$0.05**
- storage: 6 GB (`fx.index.gb`) × $0.33 per GB per month = **$1.98**
- subtotal = **$2.15**

Request compute:

- duration: 30 s (`fx.runtime`) × 1 GB = 30 GB-s per question × 900 = 27,000 GB-s × $0.0000166667 = **$0.45**
- invocations: 900 = 0.0009M × $0.20 per 1M = **$0.0002**
- subtotal = **$0.45**

Object storage: 40 GB (`fx.archive.gb`) × $0.015 per GB per month = **$0.60**

Durable workflow: 36,000 transitions (`fx.reindex.transitions`) = 36 × $0.025 per 1,000 = **$0.90**

**Monthly run cost = 40.50 + 7.20 + 2.15 + 0.45 + 0.60 + 0.90 = $51.80.**
**Annual run cost = 51.80 × 12 = $621.60.**
**Cost per question = 51.80 ÷ 900 = $0.0576.**

The stated budget line is $200 a month (`01-discovery.md` § 61); the fixture sits well under it.
Retrieving eight clauses instead of four would move the answer model's input tokens, which is the
largest line — worth knowing before anyone widens retrieval to improve recall.

## The benefit side, and what it is not

From `fx.manual` = 22 minutes to locate and read the governing clause by hand and `fx.assisted` = 7
minutes to read the answer and open the two cited clauses: 15 minutes saved per question.

- 15 min × 900 = 13,500 minutes = 225 hours per month
- 225 h × $95 (`fx.rate.legal`) = **$21,375 per month**
- net of run cost: 21,375 − 51.80 = **$21,323.20 per month**

**This is capacity, not cash.** Four lawyers do not become three because a queue got shorter. The
hours convert to money only if the freed time absorbs work the firm would otherwise buy, or if the
firm grows into it. If neither happens, this system costs $51.80 a month and shortens a wait, which
is a real benefit and a different claim.

Both hourly rates are fixture assumptions, not sourced prices, and are not rows in `prices.json`.

## Payback

Build cost: `fx.build` = 260 engineer hours, plus `fx.remediate` = 24 hours to close the
trust-boundary finding, which is not optional and therefore belongs in the build line rather than
in a footnote. 284 hours × $110 (`fx.rate.eng`) = **$31,240**.

Base payback = 31,240 ÷ 21,323.20 = **1.5 months**.

## Sensitivity

Band: plus or minus 30% on each driver, one at a time, baseline = the fixture assumptions in
`00-frame.md`.

| driver | low | base | high | annual run cost | payback (months) |
|---|---|---|---|---|---|
| question volume (`fx.volume`) | 630 | 900 | 1,170 | $447.84 → $621.60 → $795.36 | 2.09 → 1.47 → 1.13 |
| minutes saved per question (`fx.manual` − `fx.assisted`) | 10.5 | 15 | 19.5 | unchanged at $621.60 | 2.10 → 1.47 → 1.13 |
| build effort (`fx.build` + `fx.remediate`) | 199 h | 284 h | 369 h | unchanged at $621.60 | 1.03 → 1.47 → 1.90 |

Arithmetic for the volume row: $3.53 of the monthly cost is fixed (storage $1.98, re-index writes
$0.05, object storage $0.60, workflow $0.90); the remaining $48.27 scales with volume. At 630:
48.27 × 0.7 + 3.53 = $37.32 per month, $447.84 per year. At 1,170: 48.27 × 1.3 + 3.53 = $66.28 per
month, $795.36 per year.

Combining all three in the same direction:

- **favourable** — 1,170 questions, 19.5 minutes saved, 199 build hours: benefit 380.25 h × $95 =
  $36,123.75, less $66.28 run cost = $36,057.47; build $21,890; payback **0.6 months**.
- **unfavourable** — 630 questions, 10.5 minutes saved, 369 build hours: benefit 110.25 h × $95 =
  $10,473.75, less $37.32 run cost = $10,436.43; build $40,590; payback **3.9 months**.

**Payback: 0.6 to 3.9 months, base case 1.5 months**, on the fixture assumptions and only if the
freed capacity converts. No return-rate figure is given: there is no cash-flow series and no stated
discount rate, so a rate would be false precision.

## What this model does not price, and one of these dominates it

- **The cost of a wrong answer.** A wrong notice period acted on is a contractual position the firm
  cannot take back. It is not symmetric with fifteen saved minutes and nothing here prices it. This
  is the reason `00-frame.md`'s kill criterion turns the system off rather than retuning it, and
  the reason the payback figure above should never be quoted without this paragraph attached.
- **The trust-boundary finding's second-order cost.** The 24 remediation hours are in the build
  line. What is not in any line is the cost of the finding being wrong about its own scope — if
  external uploads are later allowed, that is a different threat model and a different number.
- **The weekly citation audit.** 40 answers a week read by the legal ops lead is roughly two hours
  of the most expensive time in the model, spent on the system rather than on the queue.
- **Retrieval quality.** No baseline exists (`01-discovery.md` § 45), so "15 minutes saved" assumes
  the right clause is in the retrieved eight. If it often is not, the saved minutes turn into
  wasted ones and this whole section inverts.

Generated by AI Architect · https://www.frankx.ai/ai-architect
