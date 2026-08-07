#!/usr/bin/env node
// Retrieval-miss benchmark — first-party, reproducible.
//
// Measures RETRIEVAL MISS RATE: the fraction of queries for which the gold
// passage is NOT in the top-k retrieved, across three retrievers:
//   1. lexical  (BM25)
//   2. dense    (OpenAI text-embedding-3-small + cosine)
//   3. hybrid   (RRF fusion of lexical + dense)
//
// The number is computed on the INCLUDED fixed corpus (see data/). It is
// reproducible: same corpus + same queries + deterministic ranking => same
// miss rate. Swap in your own corpus for numbers representative of your stack.
//
// BYOK: set OPENAI_API_KEY in the environment. It is never persisted or logged.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { BM25 } from './bm25.mjs'
import { embedBatch, denseRank, rrf, estimateTokens } from './embed.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const KS = [1, 3, 5]
// text-embedding-3-small list price, USD per 1M tokens, as of 2026-06. Override
// with EMBED_PRICE_PER_M to keep the cost receipt honest if the price changes.
const PRICE_PER_M = Number(process.env.EMBED_PRICE_PER_M || 0.02)

function load(name) {
  return JSON.parse(readFileSync(join(ROOT, 'data', name), 'utf8'))
}

function missRate(rankings, queries, k) {
  let miss = 0
  for (const q of queries) {
    const topk = rankings[q.id].slice(0, k)
    if (!topk.includes(q.gold)) miss++
  }
  return miss / queries.length
}

async function main() {
  const corpus = load('corpus.json')
  const queries = load('queries.json')
  const apiKey = process.env.OPENAI_API_KEY
  const model = process.env.EMBED_MODEL || 'text-embedding-3-small'

  console.error(`[bench] corpus=${corpus.length} passages  queries=${queries.length}  k=${KS.join(',')}`)

  // ---- lexical (always available) ----
  const bm25 = new BM25(corpus)
  const lexical = {}
  for (const q of queries) lexical[q.id] = bm25.rank(q.query)

  const configs = { lexical }
  let cost = null

  // ---- dense + hybrid (require a key) ----
  if (apiKey) {
    console.error(`[bench] embedding ${corpus.length} passages + ${queries.length} queries via ${model} ...`)
    const corpusVecs = await embedBatch(corpus.map((c) => c.text), apiKey, model)
    const queryVecs = await embedBatch(queries.map((q) => q.query), apiKey, model)
    const ids = corpus.map((c) => c.id)

    const dense = {}
    queries.forEach((q, i) => {
      dense[q.id] = denseRank(queryVecs[i], corpusVecs, ids)
    })
    const hybrid = {}
    for (const q of queries) hybrid[q.id] = rrf([lexical[q.id], dense[q.id]])

    configs.dense = dense
    configs.hybrid = hybrid

    const tokens = estimateTokens([...corpus.map((c) => c.text), ...queries.map((q) => q.query)])
    cost = {
      model,
      est_tokens: tokens,
      price_per_million_usd: PRICE_PER_M,
      est_cost_usd: Number(((tokens / 1_000_000) * PRICE_PER_M).toFixed(6)),
      note: 'Estimated from ~4 chars/token. Price is list price as of 2026-06; override with EMBED_PRICE_PER_M.',
    }
  } else {
    console.error('[bench] OPENAI_API_KEY not set — running lexical only. Set it for the dense + hybrid numbers.')
  }

  // ---- metric: miss@k per config ----
  const results = { metric: 'retrieval miss rate = fraction of queries with gold passage NOT in top-k', n_queries: queries.length, n_passages: corpus.length, k: KS, configs: {}, cost }
  const perQuery = []

  for (const [name, rankings] of Object.entries(configs)) {
    results.configs[name] = {}
    for (const k of KS) results.configs[name][`miss@${k}`] = Number(missRate(rankings, queries, k).toFixed(4))
  }
  for (const q of queries) {
    const row = { id: q.id, query: q.query, gold: q.gold }
    for (const [name, rankings] of Object.entries(configs)) {
      row[name] = { top5: rankings[q.id].slice(0, 5), hit5: rankings[q.id].slice(0, 5).includes(q.gold) }
    }
    perQuery.push(row)
  }

  mkdirSync(join(ROOT, 'results'), { recursive: true })
  writeFileSync(join(ROOT, 'results', 'results.json'), JSON.stringify(results, null, 2) + '\n')
  writeFileSync(join(ROOT, 'results', 'per-query.json'), JSON.stringify(perQuery, null, 2) + '\n')

  // ---- human-readable summary ----
  console.log('\nRetrieval miss rate (lower is better) — N=' + queries.length + ' queries, ' + corpus.length + ' passages')
  const head = ['config', ...KS.map((k) => `miss@${k}`)]
  console.log(head.join('\t'))
  for (const [name, m] of Object.entries(results.configs)) {
    console.log([name, ...KS.map((k) => (m[`miss@${k}`] * 100).toFixed(1) + '%')].join('\t'))
  }
  if (cost) console.log(`\ncost receipt: ~${cost.est_tokens} tokens, ~$${cost.est_cost_usd} (${cost.model})`)
  console.log('\nraw artifacts: results/results.json, results/per-query.json')
}

main().catch((e) => {
  console.error('[bench] failed:', e.message)
  process.exit(1)
})
