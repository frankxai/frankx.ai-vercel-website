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
