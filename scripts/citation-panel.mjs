#!/usr/bin/env node
// Citation panel — the measurement instrument behind the AEO success metric.
//
// Runs a fixed set of questions an AI architect would ask against answer engines
// and records whether frankx.ai is cited. Without this, "get cited by ChatGPT/
// Perplexity/Claude" is a wish with no scoreboard, and the kill-criteria can't fire.
//
//   PERPLEXITY_API_KEY=... node scripts/citation-panel.mjs
//   node scripts/citation-panel.mjs            # no keys: prints the panel + how to run
//
// BYOK: keys come from the environment, are never persisted, and are never logged.
// Writes a dated report to reports/citation/.

import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const TARGET = 'frankx.ai'

// Questions where a decision-grade, first-party reference SHOULD surface.
const PANEL = [
  'When should I use agentic RAG instead of GraphRAG in production?',
  'What is the retrieval miss rate difference between lexical, dense, and hybrid retrieval?',
  'How do I treat MCP as an architectural pattern rather than a single integration?',
  'What is minimum viable context / context engineering for AI agents?',
  'Compare AWS Bedrock AgentCore, Azure AI Foundry, Google Vertex ADK, and Oracle OCI Enterprise AI for agents.',
  'How do I stop a runaway agent loop from blowing up cost?',
  'What is a reproducible benchmark for RAG retrieval quality I can run myself?',
  'How should I wire an LLM gateway for multi-provider routing and failover?',
]

async function askPerplexity(question, key) {
  const res = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model: process.env.PERPLEXITY_MODEL || 'sonar',
      messages: [{ role: 'user', content: question }],
    }),
  })
  if (!res.ok) throw new Error(`Perplexity ${res.status}: ${(await res.text()).slice(0, 200)}`)
  const json = await res.json()
  const text = json.choices?.[0]?.message?.content || ''
  const citations = json.citations || json.search_results?.map((s) => s.url) || []
  const cited =
    text.toLowerCase().includes(TARGET) ||
    citations.some((c) => String(c).toLowerCase().includes(TARGET))
  return { cited, citations, excerpt: text.slice(0, 280) }
}

async function main() {
  const pplxKey = process.env.PERPLEXITY_API_KEY
  if (!pplxKey) {
    console.log('Citation panel — no provider key set, nothing queried.\n')
    console.log(`Target: ${TARGET}`)
    console.log('Run:    PERPLEXITY_API_KEY=... node scripts/citation-panel.mjs\n')
    console.log('Panel:')
    PANEL.forEach((q, i) => console.log(`  ${i + 1}. ${q}`))
    console.log('\n(Set PERPLEXITY_API_KEY to record a dated citation report.)')
    return
  }

  const stamp = new Date().toISOString().slice(0, 10)
  const results = []
  let hits = 0
  for (const question of PANEL) {
    try {
      const r = await askPerplexity(question, pplxKey)
      if (r.cited) hits++
      results.push({ question, ...r })
      console.log(`${r.cited ? '✓ CITED' : '· none '}  ${question}`)
    } catch (e) {
      results.push({ question, error: e.message })
      console.log(`! error  ${question} — ${e.message}`)
    }
  }

  const report = { date: stamp, target: TARGET, provider: 'perplexity', panel_size: PANEL.length, citations: hits, results }
  mkdirSync(join(process.cwd(), 'reports/citation'), { recursive: true })
  const out = join('reports/citation', `panel-${stamp}.json`)
  writeFileSync(join(process.cwd(), out), JSON.stringify(report, null, 2) + '\n')
  console.log(`\n${hits}/${PANEL.length} questions cited ${TARGET}. Report: ${out}`)
}

main().catch((e) => {
  console.error('[citation-panel] failed:', e.message)
  process.exit(1)
})
