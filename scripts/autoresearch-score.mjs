#!/usr/bin/env node
/**
 * autoresearch-score.mjs — the harness.
 *
 * Deterministic scorer for a research brief. Implements
 * research/_autoresearch/harness-rubric.md. No LLM calls.
 *
 * Usage:
 *   node scripts/autoresearch-score.mjs <path-to-brief.mdx>
 *   node scripts/autoresearch-score.mjs <path> --verbose
 *   node scripts/autoresearch-score.mjs <path> --json       # machine-readable only
 *
 * Exit codes:
 *   0 — score computed successfully
 *   1 — hard fail (missing file, missing frontmatter, etc.)
 *   2 — bad invocation
 *
 * Version: 1.0 · 2026-04-23
 */

import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const HARNESS_VERSION = '1.0.0'

const WEIGHTS = {
  claim_coverage: 0.20,
  recency:        0.15,
  aeo_score:      0.20,
  voice_score:    0.15,
  depth_score:    0.15,
  citation_density: 0.15,
}

const GRANDIOSE = [
  'revolutionary', 'game-changing', 'game changing', 'groundbreaking',
  'unprecedented', 'transform your life', 'unleash the power',
  'paradigm shift', 'disrupt the', 'cutting-edge solution',
]
const SPIRITUAL = [
  'consciousness', 'sacred', 'divine', 'awaken', 'manifest your',
  'spiritual journey', 'energetic alignment',
]
const HYPE = [
  'amazing', 'incredible', 'mind-blowing', 'mind blowing',
  'jaw-dropping', 'breathtaking',
]

function main() {
  const args = process.argv.slice(2)
  if (args.length < 1) {
    console.error('Usage: autoresearch-score.mjs <brief.mdx> [--verbose|--json]')
    process.exit(2)
  }
  const briefPath = resolve(args[0])
  const verbose = args.includes('--verbose')
  const jsonOnly = args.includes('--json')

  if (!existsSync(briefPath)) {
    emitHardFail(`Brief not found: ${briefPath}`, jsonOnly)
    process.exit(1)
  }

  const raw = readFileSync(briefPath, 'utf8')
  const { frontmatter, body } = splitFrontmatter(raw)

  const hardFails = detectHardFails(frontmatter, body)
  if (hardFails.length > 0) {
    emitResult({
      harness_version: HARNESS_VERSION,
      score: 0,
      components: null,
      word_count: wordCount(body),
      section_count: countSections(body),
      unique_sources: countUniqueUrls(body).length,
      flags: hardFails.map(f => `HARD_FAIL: ${f}`),
      path: briefPath,
    }, jsonOnly, verbose)
    process.exit(0)
  }

  const components = {
    claim_coverage:   scoreClaimCoverage(body),
    recency:          scoreRecency(body),
    aeo_score:        scoreAeo(frontmatter, body),
    voice_score:      scoreVoice(body),
    depth_score:      scoreDepth(body),
    citation_density: scoreCitationDensity(body),
  }

  let score = 0
  for (const [k, v] of Object.entries(components)) score += WEIGHTS[k] * v
  score = Math.round(score * 1000) / 10  // one decimal

  const flags = buildFlags(components)

  emitResult({
    harness_version: HARNESS_VERSION,
    score,
    components,
    word_count: wordCount(body),
    section_count: countSections(body),
    unique_sources: countUniqueUrls(body).length,
    flags,
    path: briefPath,
  }, jsonOnly, verbose)
}

// ─── parsing ─────────────────────────────────────────────────────────

function splitFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return { frontmatter: {}, body: raw }
  const fm = {}
  for (const line of match[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/)
    if (kv) fm[kv[1]] = kv[2].replace(/^["']|["']$/g, '')
  }
  return { frontmatter: fm, body: match[2] }
}

function wordCount(body) {
  return body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/\[.*?\]\(.*?\)/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .length
}

function countSections(body) {
  return (body.match(/^##\s+/gm) || []).length
}

function countUniqueUrls(body) {
  const urls = new Set()
  const linkMatches = body.matchAll(/\[[^\]]+\]\((https?:\/\/[^)]+)\)/g)
  for (const m of linkMatches) urls.add(m[1].replace(/[.,;]$/, ''))
  const footnotes = body.matchAll(/\[\^[^\]]+\]:\s*.*?(https?:\/\/\S+)/g)
  for (const m of footnotes) urls.add(m[1].replace(/[.,;]$/, ''))
  return Array.from(urls)
}

// ─── hard fails ──────────────────────────────────────────────────────

function detectHardFails(fm, body) {
  const fails = []
  if (!body.trim()) fails.push('empty body')
  if (countSections(body) === 0) fails.push('no ## sections')
  if (!fm.title) fails.push('frontmatter missing title')
  if (!fm.tldr && !/##\s*tl;?dr/i.test(body)) fails.push('no TL;DR')
  return fails
}

// ─── components ──────────────────────────────────────────────────────

function scoreClaimCoverage(body) {
  const paragraphs = body
    .replace(/```[\s\S]*?```/g, '')  // strip code
    .split(/\n{2,}/)
  let total = 0, cited = 0
  const claimTrigger = /(\b\d+(\.\d+)?%|\$\d|\b(19|20)\d{2}\b|according to|studies show|research (shows|indicates|finds)|Gartner|OpenAI|Anthropic|Google|Meta|benchmarks? (show|indicate)|(\d+x\s+(faster|slower|cheaper)))/i
  const citeTrigger = /(\[[^\]]+\]\(https?:\/\/|\[\^[^\]]+\])/
  for (const p of paragraphs) {
    if (!claimTrigger.test(p)) continue
    total++
    if (citeTrigger.test(p)) cited++
  }
  if (total === 0) return 0
  return cited / total
}

function scoreRecency(body) {
  // Find footnote/source lines, parse dates
  const sourceLines = body.split('\n').filter(l => /\[\^?\d+\]:/.test(l) || /^\s*[-*]\s+.*https?:\/\//.test(l))
  if (sourceLines.length === 0) return 0
  const now = new Date()
  const scores = []
  for (const line of sourceLines) {
    const dateMatch =
      line.match(/\b(\d{4})-(\d{1,2})-(\d{1,2})\b/) ||
      line.match(/\b(\d{4})-(\d{1,2})\b/) ||
      line.match(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\w*\s+(\d{4})\b/i)
    if (!dateMatch) { scores.push(0); continue }
    let yr, mo
    if (dateMatch[0].match(/^\d{4}/)) {
      yr = parseInt(dateMatch[1], 10)
      mo = parseInt(dateMatch[2] || '6', 10)
    } else {
      const monthMap = { jan:1, feb:2, mar:3, apr:4, may:5, jun:6, jul:7, aug:8, sep:9, oct:10, nov:11, dec:12 }
      mo = monthMap[dateMatch[1].toLowerCase().slice(0,3)] || 6
      yr = parseInt(dateMatch[2], 10)
    }
    const ageMonths = (now.getFullYear() - yr) * 12 + (now.getMonth() + 1 - mo)
    if (ageMonths < 0) scores.push(1.0)
    else if (ageMonths < 3) scores.push(1.0)
    else if (ageMonths < 6) scores.push(0.8)
    else if (ageMonths < 12) scores.push(0.6)
    else if (ageMonths < 24) scores.push(0.3)
    else scores.push(0.1)
  }
  return scores.reduce((a, b) => a + b, 0) / scores.length
}

function scoreAeo(fm, body) {
  let points = 0
  const first100 = body.split(/\s+/).slice(0, 100).join(' ')
  if (/tl;?dr/i.test(first100) || fm.tldr) points++
  const questionHeadings = (body.match(/^#{2,3}\s+[^\n?]*\?\s*$/gm) || []).length
  if (questionHeadings >= 5) points++
  const faqEntries = (body.match(/^###\s+.+\?\s*$/gm) || []).length + (body.match(/^\*\*Q:/gm) || []).length
  if (faqEntries >= 5) points++
  // per-FAQ answer length is approximated: assume good if ≥5 entries and section exists
  if (faqEntries >= 5 && /##\s+FAQ/i.test(body)) points++
  if (fm.title && fm.description && fm.description.length <= 160) points++
  else if (fm.title && fm.description) points += 0.5
  if (/##\s+Key Takeaways/i.test(body) || /##\s+Summary/i.test(body)) points++
  return Math.min(points / 6, 1.0)
}

function scoreVoice(body) {
  let score = 1.0
  const lower = body.toLowerCase()
  for (const term of GRANDIOSE) {
    const n = (lower.match(new RegExp(escRx(term), 'g')) || []).length
    score -= 0.10 * n
  }
  for (const term of SPIRITUAL) {
    const n = (lower.match(new RegExp(escRx(term), 'g')) || []).length
    score -= 0.10 * n
  }
  for (const term of HYPE) {
    const n = (lower.match(new RegExp(escRx(term), 'g')) || []).length
    score -= 0.05 * n
  }
  // em-dash overuse
  const emStack = (body.match(/—[^—\n]{1,80}—/g) || []).length
  if (emStack > 3) score -= 0.05
  // buried lede — first real sentence
  const firstPara = body.split(/\n{2,}/).find(p => p.trim() && !p.startsWith('#') && !p.startsWith('>'))
  if (firstPara) {
    const firstSentence = firstPara.split(/[.!?]/)[0]
    const hasConcrete = /\d|\$|%|\b(20\d{2})\b|Gartner|OpenAI|Anthropic|Google|Meta|Claude|GPT|study|research|benchmark/i.test(firstSentence)
    if (!hasConcrete) score -= 0.05
  }
  return Math.max(score, 0)
}

function scoreDepth(body) {
  const wc = wordCount(body)
  let wcBand
  if (wc < 800) wcBand = 0.3
  else if (wc < 1500) wcBand = 0.6
  else if (wc < 3000) wcBand = 1.0
  else if (wc < 5000) wcBand = 0.9
  else wcBand = 0.7
  const sections = countSections(body)
  let secMul
  if (sections < 4) secMul = 0.7
  else if (sections < 6) secMul = 0.9
  else if (sections < 8) secMul = 1.0
  else secMul = 0.95
  const exCount = ((body.match(/```/g) || []).length / 2) + (body.match(/^\|/gm) || []).length / 3
  const exMul = exCount < 2 ? 0.8 : 1.0
  return wcBand * secMul * exMul
}

function scoreCitationDensity(body) {
  const wc = wordCount(body)
  if (wc === 0) return 0
  const urls = countUniqueUrls(body)
  const capped = Math.min(urls.length, 15)
  const refs_per_1k = capped / (wc / 1000)
  return Math.min(refs_per_1k / 5, 1.0)
}

// ─── utils ───────────────────────────────────────────────────────────

function escRx(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function buildFlags(components) {
  const flags = []
  if (components.voice_score >= 0.9) flags.push('voice_ok')
  else if (components.voice_score < 0.7) flags.push('voice_watch')
  if (components.recency < 0.5) flags.push('low_recency_watch')
  if (components.claim_coverage < 0.5) flags.push('low_claim_coverage')
  if (components.citation_density < 0.3) flags.push('needs_more_sources')
  return flags
}

function emitResult(result, jsonOnly, verbose) {
  if (jsonOnly) {
    process.stdout.write(JSON.stringify(result) + '\n')
    return
  }
  // pretty print
  console.log(`\n\x1b[1m\x1b[36mResearch Score:\x1b[0m \x1b[1m${result.score}/100\x1b[0m`)
  if (result.components) {
    console.log(`\n  claim_coverage   ${pct(result.components.claim_coverage)}`)
    console.log(`  recency          ${pct(result.components.recency)}`)
    console.log(`  aeo_score        ${pct(result.components.aeo_score)}`)
    console.log(`  voice_score      ${pct(result.components.voice_score)}`)
    console.log(`  depth_score      ${pct(result.components.depth_score)}`)
    console.log(`  citation_density ${pct(result.components.citation_density)}`)
  }
  console.log(`\n  words=${result.word_count}  sections=${result.section_count}  unique_sources=${result.unique_sources}`)
  if (result.flags.length) console.log(`  flags: ${result.flags.join(', ')}`)
  if (verbose) console.log('\n' + JSON.stringify(result, null, 2))
  console.log()
}

function emitHardFail(msg, jsonOnly) {
  const out = { harness_version: HARNESS_VERSION, score: 0, error: msg }
  if (jsonOnly) process.stdout.write(JSON.stringify(out) + '\n')
  else console.error(`\x1b[31mHARD FAIL:\x1b[0m ${msg}`)
}

function pct(x) {
  const p = Math.round(x * 100)
  const bar = '█'.repeat(Math.round(x * 20)) + '░'.repeat(20 - Math.round(x * 20))
  return `${bar}  ${String(p).padStart(3)}%`
}

main()
