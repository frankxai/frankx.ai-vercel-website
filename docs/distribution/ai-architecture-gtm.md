# AI Architecture hub — go-to-market drafts (Phase 0a / Phase 1 probes)

> Internal drafts for Frank to review and post. Nothing here is published automatically.
> Every number traces to a row in the [cost & reliability dataset](https://frankx.ai/ai-architecture/data)
> or the [benchmark spine](https://github.com/frankxai/frankx.ai-vercel-website/tree/main/benchmarks).
> Frame fast-moving figures "as of mid-2026". Voice: direct, technical, humble. Independent project — not affiliated with Oracle.

---

## A. The demand probe — failure-mode / decision table (Phase 0a)

**Purpose:** the differentiated claim stripped of design cost. Post the table first. If it travels
(saves/shares above your baseline within 7 days) the diagram and the deeper build are worth it.
If 2–3 posts get no traction → re-examine the wedge before building more.

**The core table** (plain text — the asset itself):

| Failure mode | What the data shows (as of mid-2026) | The decision |
|---|---|---|
| Retrieval misses the passage | BM25 alone misses the gold passage at top-1 for **20%** of queries on my benchmark (N=20); pure paraphrases are the misses | Start hybrid + rerank, not dense-only. Reranking lifts Recall@5 from **0.70 → 0.82** (+17%) on table/text QA |
| RAG still hallucinates | **13.7–65.9%** of RAG answers carried ≥1 hallucinated span across six models (RAGTruth, ACL 2024); **4–12%** even on clean single-doc summaries (Vectara) | Ground + cite + eval. "It has the context" is not "it won't make things up" |
| Long context rots | **13.9–85%** accuracy drop from input length alone, even with perfect retrieval; only **~half** of models hold their claimed 32K | Dose context (minimum viable context); don't stuff the window |
| Agents are unreliable | GPT-4+plugins hit **15%** vs **92%** human on GAIA; GPT-4o pass^8 falls to **~25%** from **60%** pass^1 on τ-bench | Bound the loop, gate risky tools, measure pass^k not pass^1 |
| Cost runs away | A multi-agent run uses **~15×** the tokens of a single chat; prompt caching cuts cost up to **90%** | Cache stable prefixes; cap steps; route through a gateway |

**Closing line:** "Full sources, denominators, and a benchmark you can run yourself:
frankx.ai/ai-architecture/data — corrections by PR."

### X / thread variant
1/ Most "AI agent" failures aren't model failures. They're five architecture failures, and each has a number attached. A thread, with sources you can check 👇
2/ Retrieval misses. BM25 alone misses the right passage at top-1 for 20% of queries on my benchmark (N=20) — pure paraphrases. Hybrid + rerank lifts Recall@5 0.70→0.82. (link to benchmark)
3/ RAG still hallucinates. 13.7–65.9% of answers had a hallucinated span across 6 models (RAGTruth, ACL 2024). "It has the context" ≠ "it won't invent."
4/ Long context rots. 13.9–85% accuracy drop from length alone — even with perfect retrieval; ~half of models don't hold their claimed 32K. Dose context, don't stuff it.
5/ Agents are unreliable. 15% vs 92% human on GAIA. pass^8 collapses to ~25% from 60% on τ-bench. Measure pass^k.
6/ Cost runs away. Multi-agent ≈ 15× the tokens of one chat. Caching cuts up to 90%.
7/ I put the harness, the dataset (every number with its N + source), and the decisions here → frankx.ai/ai-architecture. Run it. Correct it. PRs open.

### Reddit variant (r/LLMDevs, r/LocalLLaMA)
**Title:** I benchmarked retrieval miss rate (BM25 vs dense vs hybrid) and tabled the 5 RAG/agent failure modes with sources — here's the harness
Body: short, first-person, "here's what I ran, here are the raw logs, here's the dataset with denominators, tell me where I'm wrong." Link benchmark + dataset. No marketing.

### LinkedIn variant
Lead with the table as an image + 3-line caption: "Five failure modes break most production AI systems. Each one has a measured number and a decision. Sources + a benchmark you can run: [link]." End: "What would you add?"

**Measure:** saves/shares vs your baseline, replies asking "what's N?" (good — you have the repo), referral clicks to /ai-architecture. **Kill:** no traction after 2–3 posts.

---

## B. Enterprise buyer probe — EU AI Act carousel (Phase 1)

**Purpose:** test whether the enterprise/governance buyer is reachable via LinkedIn before building
a regulation-blueprint suite. ONE deadline-anchored carousel. **Kill:** zero named-title
(architect / head of AI governance) engagement → don't build the regulation suite; rethink buyer reach.

**Label on every slide:** *Architecture guidance, not legal advice. Verify obligations with counsel.*

- **Slide 1:** "EU AI Act high-risk obligations are landing. Is your AI architecture ready — before the deadline?"
- **Slide 2:** The gap most teams have: governance, logging, data residency, human oversight aren't in the diagram. They should be.
- **Slide 3:** A cloud-agnostic reference architecture that maps high-risk obligations to components (not vendor lock-in).
- **Slide 4:** Where it's enforced: audit logging, PII handling, human-in-the-loop gates, residency — at the architecture layer.
- **Slide 5:** Built by someone who built AI CoE frameworks at Oracle EMEA — now independent, vendor-neutral. "Architecture guidance, not legal advice."
- **CTA:** "The full reference is at frankx.ai/ai-architecture. Reviewing your high-risk architecture? DM me."

**Measure:** named-title engagement / inbound DMs from architects or governance leads.

---

## C. Amplifier outreach (Phase 1)

Pitch the **benchmark repo** (the first-party result), not the curation, to reading lists that cite
primary work: EthicalML/awesome-agentic-engineering, chiphuyen/aie-book, DataExpert-io, and
newsletters (Latent Space, TLDR, The Batch). One line: "I ran a reproducible retrieval-miss
benchmark — harness, corpus, raw logs. Here's the number and how to reproduce it."

---

## D. Benchmark-as-result — `runaway-loop` (Phase 1, second post)

**Purpose:** spend the second first-party result — same "here's the harness, here's the raw
output" pattern as the retrieval-miss table, on a different failure mode. Post 1–2 weeks after A,
not simultaneously (avoid diluting either).

**The number** (from `benchmarks/runaway-loop/results/results.json`, N=5 scripted scenarios, 4
non-convergent traps + 1 control): uncapped cost totals **$8.1081** (81.65× the optimal-step cost)
vs. capped cost **$0.2817** (2.84× optimal) — a `stepCountIs(N)` cap contains **96.5%** of the
uncapped cost across the scenario set.

> Scope discipline for the post itself: the traps are *scripted* to be non-convergent — this
> demonstrates the mechanism (unbounded steps → unbounded cost; a cap bounds it), not a measured
> real-world runaway rate. Don't let the post imply otherwise.

### X / thread variant
1/ An agent that loops without converging doesn't fail loudly — it fails expensively. I built 4 scripted non-convergent traps + 1 control and measured the cost with and without a step cap.
2/ Uncapped: $8.11 total across 5 scenarios (81.65× the optimal-step cost). Capped at 3× each task's known-optimal step count: $0.28 (2.84× optimal). The cap contains 96.5% of the uncapped cost.
3/ The mechanism is simple and it's the whole point: without a stop condition, cost is bounded only by how long you let the loop run — linear in steps, not task complexity. `stepCountIs(N)` bounds it at N × cost-per-step, full stop.
4/ Harness, scenarios, and raw output are public — reproduce it or point it at your own step/token data: [link to benchmarks/runaway-loop]

### LinkedIn variant
Lead with the totals line as the hook: "An uncapped agent loop cost 29× more than the same loop with a hard step cap, across 5 scripted scenarios." One paragraph on the mechanism (cost tracks steps, not task complexity), link to the harness + raw output, close with "the fix is one line: `stepCountIs(N)`."

**Measure:** same as section A — saves/shares vs. baseline, "what's N?" replies, referral clicks.

---

## E. Benchmark-as-result — `context-rot` (Phase 1, third post)

**Purpose:** third first-party result. This one needs the most care in the post copy — the
underlying benchmark is explicit that it measures a *structural precondition* (does a fact
survive context eviction), not real LLM recall accuracy. Do not let the post copy blur that line;
it's the exact overclaim this hub's credibility depends on avoiding.

**The number** (from `benchmarks/context-rot/results/results.json`, N=5 scenarios × 3 needle
depths = 15 cells/strategy): naive FIFO context truncation and a "keep-first-and-last" anchoring
strategy both land at **60% overall needle survival**; a retrieval-augmented strategy holds
**100%** by construction. The interesting finding: "smarter" anchoring isn't a strict win — it
only pulls ahead of FIFO at the earliest needle depth (60% vs 40% at 10%), and loses ground in a
small-budget/long-session scenario where the reserved anchor budget shrinks the recency window.

### X / thread variant
1/ Before an LLM can "forget" something in a long conversation, that something has to survive being evicted from context at all. I measured that — not accuracy, just survival.
2/ Naive FIFO truncation and a "keep first + last turns" strategy both land at 60% needle-survival across 5 sessions × 3 depths. Retrieval-augmented (never evicted by window size) holds 100%, by construction.
3/ The counter-intuitive part: "keep first + last" isn't a strict upgrade over FIFO. It wins at shallow depth, but reserving anchor budget shrinks the recency window — and in one long-session scenario it actually *loses* a needle FIFO would've kept. Both land at the same 60% overall.
4/ This measures whether the fact is even still in the prompt — upstream of the harder question of whether the model recalls it correctly (that's the real "context rot" literature — Databricks, NVIDIA RULER, Adobe NoLiMa, Chroma all measure that directly; I cite their numbers, not my own, for the accuracy question).
5/ Harness + raw output: [link to benchmarks/context-rot]

### LinkedIn variant
Lead with the counter-intuitive finding, not the survival numbers: "The 'smarter' context strategy I tested wasn't actually better than naive truncation — same 60% survival rate, just a different failure pattern." One paragraph on why (anchor budget trades off against recency window), explicit line that this measures eviction not recall accuracy, link to harness, close with the four real accuracy-degradation citations (Databricks / RULER / NoLiMa / Chroma) for readers who want the measured phenomenon, not the structural proxy.

**Measure:** same as section A. **Extra care:** if any reply reads the post as claiming an LLM-accuracy number, that's a real problem with the copy — fix it before the next post, don't just let it stand.
