# Retrieval-miss benchmark

A first-party, reproducible measurement of **retrieval miss rate** — the fraction of
queries where the gold passage is *not* in the top-k retrieved — across three retrievers:

| config | what it is |
|---|---|
| `lexical` | BM25 keyword matching |
| `dense` | OpenAI `text-embedding-3-small` + cosine |
| `hybrid` | reciprocal-rank fusion of lexical + dense |

This is the kind of number a hub should *generate*, not cite. It ships with its corpus,
its queries, its code, and its raw outputs so you can reproduce it — or run it on your own
data and get a number that's representative of your stack.

## The number (reproducible offline, no API key)

On the included corpus — **N = 20 queries, 24 passages** — BM25 lexical retrieval misses
the gold passage:

```
config    miss@1    miss@3    miss@5
lexical   20.0%      5.0%      5.0%
```

The one query lexical still misses at top-5 (`q13`) is a pure paraphrase — *"how big should
the pieces of a document be"* never says the word **chunk**, so BM25 ranks the wrong passage
first. That is exactly the gap dense retrieval is supposed to close, and the reason hybrid
exists. Run with a key (below) to measure the dense and hybrid miss rates on the same corpus.

> Scope, stated plainly: this is a small, hand-built corpus on AI-infrastructure topics. The
> miss rate is real and reproducible *on this corpus*; it is **not** a universal RAG number.
> Swap in your own corpus + queries (same JSON shape) for a number that reflects your data.

## Run it yourself

```bash
# offline — lexical only, ~1 second
npm run bench

# full — dense + hybrid + a cost receipt (BYOK; the key is never persisted or logged)
OPENAI_API_KEY=sk-... npm run bench
```

Outputs land in `results/`:
- `results.json` — miss@k per config, plus a cost receipt (tokens + $ for the embeddings)
- `per-query.json` — the top-5 for every query under every config, with hit/miss flags

The committed `results/` is a **lexical-only** run (it needs no key, so anyone can reproduce
it). Running with `OPENAI_API_KEY` regenerates it with dense + hybrid.

## How it's measured (so you can challenge it)

- **Metric:** `miss@k = (# queries whose gold passage is not in the top-k) / N`. Lower is better.
- **Corpus:** `data/corpus.json` — 24 passages, one topic each.
- **Queries:** `data/queries.json` — 20 queries, each with one gold passage id. A mix of
  keyword-overlap and pure-paraphrase queries, plus a few lexical traps, so the three
  retrievers genuinely differ.
- **Determinism:** rankings are deterministic; embeddings are deterministic per input. Same
  corpus + same queries → same miss rate.
- **Cost receipt:** tokens estimated at ~4 chars/token; dollars at the `text-embedding-3-small`
  list price (`$0.02 / 1M` as of 2026-06, override with `EMBED_PRICE_PER_M`).

Found a flaw in the corpus, the metric, or the method? Open an issue or a PR — corrections are
the point.

Built by [Frank Riemer](https://frankx.ai) · part of the frankx.ai/ai-architecture benchmark spine.
