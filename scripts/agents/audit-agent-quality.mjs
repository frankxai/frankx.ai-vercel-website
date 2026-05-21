#!/usr/bin/env node
/**
 * ACOS Agent Quality Audit — ESLint for .claude/agents/*.md
 *
 * Implements the 9-check rubric documented in @meta-agent-quality-auditor.
 * Pure deterministic — no LLM calls. Runs in CI.
 *
 * Usage:
 *   node scripts/agents/audit-agent-quality.mjs            # full audit, write report
 *   node scripts/agents/audit-agent-quality.mjs --json     # JSON to stdout
 *   node scripts/agents/audit-agent-quality.mjs <agent>    # audit single agent by name
 */

import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..', '..')
const AGENTS_DIR = path.join(ROOT, '.claude', 'agents')
const FIXTURES_DIR = path.join(ROOT, 'tests', 'fixtures')
const REPORT_DIR = path.join(ROOT, 'docs', 'acos')
const MACHINE_DIR = path.join(ROOT, '.frankx', 'machine')

const args = process.argv.slice(2)
const jsonOutput = args.includes('--json')
const filterAgent = args.find((a) => !a.startsWith('--'))

// Definite-tell banned phrases — no legitimate use in agent files (score-impacting)
// Refined 2026-05-15 after PR #42 false-positive analysis:
//   - 'deep dive' alone removed (legitimate domain term: "deep-dive mode", "deep dive on X")
//   - 'deep dive into' kept (clear prose AI slop)
//   - 'thought leader' kept but matched word-boundary-precisely
const DEFINITE_TELLS = [
  'delve into', 'dive into', 'deep dive into', 'dive deep',
  "it's worth noting", 'it is worth noting',
  'in conclusion', 'in summary,',
  'navigate the landscape', 'paradigm shift',
  'world-class', 'best-in-class', 'cutting-edge', 'bleeding-edge',
  'seamlessly', 'effortlessly',
  'synergy', 'synergies',
  'innovative solution', 'innovative solutions',
  'game-changing', 'game-changer',
  'unlock your potential', 'step into your power', 'level up your life',
]

// Phrases that need word-boundary matching to avoid false positives
// (e.g., 'thought leader' shouldn't match 'thought leadership')
const DEFINITE_TELLS_WORDBOUND = [
  'thought leader',      // not "thought leadership"
  'revolutionary',       // not part of larger word
  'absolutely',          // as standalone exclamation
  'certainly',           // as standalone
  'delve',               // standalone verb
]

// Context-sensitive — soft-flag for human review only (no score impact)
const SOFT_FLAGS = [
  'harness', 'leverage', 'leveraging', 'utilize', 'utilizing', 'utilization',
  'journey', 'transformation', 'transformative',
  'unleash', 'empower', 'helps you', 'enables you', 'allows you',
  'effortless', 'seamless', 'robust',
]

// Arcanean quarantine — existential fail (per lib/voice/frankx-voice.ts)
const ARCANEA_QUARANTINE = [
  'Guardian', 'Guardians', 'Realm', 'Realms', 'Seeker', 'Seekers',
  'Shinkami', 'Luminor', 'Luminors', 'Arcanean', 'Arcanea mythology',
  'Sage', 'Sages', 'Awakened One', 'Mystic', 'Mystics', 'Ascension',
]

// Skip files that aren't agent files
const SKIP_FILES = new Set(['CLAUDE.md', 'README.md', 'PRODUCT_TEAMS.md'])

function discoverAgents() {
  if (!existsSync(AGENTS_DIR)) return []
  const entries = readdirSync(AGENTS_DIR, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    if (!entry.isFile()) continue
    if (!entry.name.endsWith('.md')) continue
    if (SKIP_FILES.has(entry.name)) continue
    if (filterAgent && !entry.name.startsWith(filterAgent)) continue
    files.push(path.join(AGENTS_DIR, entry.name))
  }
  return files.sort()
}

function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---/m)
  if (!m) return { ok: false, error: 'no_frontmatter_block' }
  const block = m[1]
  const fields = {}
  for (const line of block.split('\n')) {
    const kv = line.match(/^([a-zA-Z_-]+):\s*(.*)$/)
    if (kv) {
      let value = kv[2].trim()
      // Strip surrounding quotes
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1)
      }
      fields[kv[1]] = value
    }
  }
  return { ok: true, fields, body: raw.slice(m[0].length) }
}

function findSection(body, sectionRegex) {
  // Match ## N. Title or ## Title — return content until next ## heading
  const startMatch = body.match(sectionRegex)
  if (!startMatch) return null
  const startIdx = startMatch.index + startMatch[0].length
  const tail = body.slice(startIdx)
  const nextMatch = tail.match(/\n## /)
  return nextMatch ? tail.slice(0, nextMatch.index) : tail
}

function stripCodeBlocks(text) {
  // Remove ```...``` fenced blocks so they don't trigger false positives
  // Also remove single-backtick inline code (file paths, agent refs, command refs)
  // since those legitimately contain words like "memory-guardian" or "Luminor Router"
  // as identifiers, not as prose mythology.
  return text
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`\n]*`/g, '')
}

/**
 * Strip the sections that legitimately mention banned phrases for rejection
 * purposes — §8 Anti-patterns and §10 Voice check both list "Does NOT use X"
 * or "No Arcanean mythology". Scanning those for compliance violations
 * generates false positives. Same for the description if it explicitly says
 * "rejects/refuses/blocks X" patterns.
 */
function stripRejectionSections(body) {
  // Remove sections that legitimately reference banned/quarantined vocab as RULES:
  //   §8 Anti-patterns (lists "Does NOT use X" patterns)
  //   §10 Voice check (lists "No Arcanean mythology...")
  //   §6 Integration (documents "Luminor Router" as system-name per template-v2)
  // Anchored to \n + ≥1 space-after-## to only match real headings, not in-text references.
  return body.replace(
    /\n##\s+\d*\.?\s*(Anti-?patterns?|Voice\s+check|Integration)\b[\s\S]*?(?=\n##\s|\n*$)/gi,
    '\n',
  )
}

function check1_frontmatter(parsed) {
  if (!parsed.ok) return { pass: false, reason: parsed.error }
  const required = ['name', 'description', 'tools', 'model']
  const missing = required.filter((k) => !parsed.fields[k] || !parsed.fields[k].trim())
  if (missing.length) return { pass: false, reason: `missing: ${missing.join(', ')}` }
  const validModels = ['haiku', 'sonnet', 'opus']
  if (!validModels.includes(parsed.fields.model)) {
    return { pass: false, reason: `invalid model: ${parsed.fields.model}` }
  }
  return { pass: true }
}

function check2_description(parsed) {
  if (!parsed.ok || !parsed.fields.description) return { pass: false, reason: 'no_description' }
  const desc = parsed.fields.description
  if (desc.length < 50) return { pass: false, reason: `too short (${desc.length} chars, need ≥50)` }
  const triggerPatterns = [
    /auto[- ]?invoke/i, /auto[- ]?fire/i, /use when/i, /trigger/i,
    /\bsays\b/i, /\*\*\//, /when frank/i, /when n\s*[≥>=]/i, /\/[a-z-]+\b/,
  ]
  const hasTrigger = triggerPatterns.some((re) => re.test(desc))
  if (!hasTrigger) return { pass: false, reason: 'no trigger language in description' }
  return { pass: true }
}

function check3_toolsMinimality(parsed, body) {
  if (!parsed.ok || !parsed.fields.tools) return { pass: false, reason: 'no_tools' }
  const declared = parsed.fields.tools.split(',').map((t) => t.trim()).filter(Boolean)
  if (declared.length === 0) return { pass: false, reason: 'empty tools' }
  // Search either the explicit Process section or the entire body (some agents
  // describe tool usage in non-numbered sections like Workflow, Steps, etc.)
  const processSection = findSection(body, /\n##\s+\d*\.?\s*Process\b/i) ||
                          findSection(body, /\n##\s+Workflow\b/i) ||
                          findSection(body, /\n##\s+Steps\b/i)
  const scanText = processSection || body
  const unused = []
  for (const tool of declared) {
    const re = new RegExp(`\\b${tool.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`)
    if (!re.test(scanText)) unused.push(tool)
  }
  if (unused.length > 0) return { pass: false, reason: `unused tools: ${unused.join(', ')}` }
  return { pass: true }
}

const CANONICAL_SECTIONS = [
  'Purpose', 'Triggers', 'Inputs', 'Process', 'Outputs', 'Integration',
  'Smoke eval', 'Anti-patterns', 'Model choice', 'Voice check',
]

function check4_sections(body) {
  const found = []
  for (const section of CANONICAL_SECTIONS) {
    const escaped = section.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const re = new RegExp(`##\\s*\\d*\\.?\\s*${escaped}\\b`, 'i')
    if (re.test(body)) found.push(section)
  }
  if (found.length < 8) return { pass: false, reason: `only ${found.length}/10 sections (missing: ${CANONICAL_SECTIONS.filter((s) => !found.includes(s)).join(', ')})` }
  return { pass: true, found_count: found.length }
}

function check5_memoryContract(body) {
  const process = findSection(body, /\n##\s+\d*\.?\s*Process\b/i) || body
  const hasRecall = /memory\.mjs\s+recall/.test(process)
  const hasRemember = /memory\.mjs\s+remember/.test(process)
  if (!hasRecall && !hasRemember) return { pass: false, reason: 'no memory.mjs calls' }
  if (!hasRecall) return { pass: false, reason: 'missing recall' }
  if (!hasRemember) return { pass: false, reason: 'missing remember' }
  return { pass: true }
}

function check6_antiPatterns(body) {
  // Anchor to \n so we only match real headings, not in-text references
  // (e.g., agent prose describing "## 8 or ## Anti-patterns" in its Process section)
  const antiSection = findSection(body, /\n##\s+(\d*\.?\s*[Aa]nti-?patterns?\b|[Aa]nti-?patterns?\b)/)
  if (!antiSection) return { pass: false, reason: 'no anti-patterns section' }
  const lines = antiSection.split('\n').map((l) => l.trim()).filter(Boolean)
  const bullets = lines.filter((l) => /^[-*]\s/.test(l))
  if (bullets.length < 4) return { pass: false, reason: `only ${bullets.length} bullets, need ≥4` }
  const negationRe = /(Does\s+NOT|Never\s|Refuses?\s+to|Doesn't|Don't)/i
  const negationBullets = bullets.filter((l) => negationRe.test(l))
  if (negationBullets.length < 4) {
    return { pass: false, reason: `only ${negationBullets.length}/${bullets.length} bullets have negation` }
  }
  return { pass: true, bullets: bullets.length }
}

function check7_brandVoice(body, agentName) {
  // The agent-quality auditor itself documents the banned-phrase rules — exempt it
  if (agentName === 'meta-agent-quality-auditor') return { pass: true, note: 'lint-tool exempt' }
  // Exempt rejection sections (Anti-patterns, Voice check, Integration) which legitimately
  // LIST banned phrases as rules ("Does NOT use 'delve'", "No spiritual...")
  const scanText = stripRejectionSections(stripCodeBlocks(body)).toLowerCase()
  const hits = []
  // Plain substring match for unambiguous prose tells
  for (const phrase of DEFINITE_TELLS) {
    if (scanText.includes(phrase.toLowerCase())) hits.push(phrase)
  }
  // Word-boundary match for terms with legitimate-use-as-substring patterns
  for (const phrase of DEFINITE_TELLS_WORDBOUND) {
    const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const re = new RegExp(`\\b${escaped}\\b`, 'i')
    if (re.test(scanText)) hits.push(phrase)
  }
  if (hits.length > 0) return { pass: false, reason: `hits: ${hits.slice(0, 3).join(', ')}${hits.length > 3 ? ', ...' : ''}` }
  return { pass: true }
}

function check7_softFlags(body) {
  const scanText = stripRejectionSections(stripCodeBlocks(body)).toLowerCase()
  const hits = []
  for (const phrase of SOFT_FLAGS) {
    if (scanText.includes(phrase.toLowerCase())) hits.push(phrase)
  }
  return hits
}

function check8_arcanean(body, agentName) {
  // Exception 1: agent name starts with arcanea- (legitimate cross-brand reference)
  if (agentName && agentName.toLowerCase().startsWith('arcanea-')) {
    return { pass: true, note: 'arcanea-prefixed exempt' }
  }
  // Exception 2: the agent-quality auditor itself documents the quarantine
  if (agentName === 'meta-agent-quality-auditor') return { pass: true, note: 'lint-tool exempt' }
  // Exempt rejection sections (Anti-patterns, Voice check, Integration) — Voice/Anti
  // legitimately reject the quarantine; Integration documents "Luminor Router" as a
  // system-name per template-v2 (separate concern from Arcanean mythology in prose).
  const scanText = stripRejectionSections(stripCodeBlocks(body))
  const hits = []
  for (const term of ARCANEA_QUARANTINE) {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const re = new RegExp(`\\b${escaped}\\b`, 'i')
    if (re.test(scanText)) hits.push(term)
  }
  if (hits.length > 0) return { pass: false, reason: `Arcanean: ${hits.join(', ')}` }
  return { pass: true }
}

function check9_smokeFixture(parsed) {
  if (!parsed.ok || !parsed.fields.name) return { pass: false, reason: 'no_name_to_lookup_fixture' }
  const ref = parsed.fields.name
  const fixturePath = path.join(FIXTURES_DIR, ref, 'smoke.mjs')
  if (!existsSync(fixturePath)) return { pass: false, reason: `missing: tests/fixtures/${ref}/smoke.mjs` }
  return { pass: true }
}

function auditOne(filePath) {
  const raw = readFileSync(filePath, 'utf-8')
  const parsed = parseFrontmatter(raw)
  const body = parsed.ok ? parsed.body : raw
  const agentName = parsed.ok ? parsed.fields.name : path.basename(filePath, '.md')

  const results = {
    name: agentName,
    file: path.relative(ROOT, filePath),
    checks: {
      frontmatter: check1_frontmatter(parsed),
      description: check2_description(parsed),
      tools_minimality: check3_toolsMinimality(parsed, body),
      sections: check4_sections(body),
      memory_contract: check5_memoryContract(body),
      anti_patterns: check6_antiPatterns(body),
      brand_voice: check7_brandVoice(body, agentName),
      arcanean_leak: check8_arcanean(body, agentName),
      smoke_fixture: check9_smokeFixture(parsed),
    },
    soft_flags: check7_softFlags(body),
  }

  const pass = (c) => (c.pass ? 1 : 0)
  const score =
    pass(results.checks.frontmatter) +
    pass(results.checks.description) +
    pass(results.checks.tools_minimality) +
    pass(results.checks.sections) +
    pass(results.checks.memory_contract) +
    pass(results.checks.anti_patterns) +
    pass(results.checks.brand_voice) +
    pass(results.checks.arcanean_leak) +
    pass(results.checks.smoke_fixture)

  const disqualified =
    !results.checks.frontmatter.pass ||
    !results.checks.brand_voice.pass ||
    !results.checks.arcanean_leak.pass

  results.score = score
  results.disqualified = disqualified
  return results
}

function priorityRank(r) {
  // Sort key: disqualified first (0), then ascending score (so lowest first), then name
  return [r.disqualified ? 0 : 1, r.score, r.name]
}

function compareRank(a, b) {
  const A = priorityRank(a)
  const B = priorityRank(b)
  for (let i = 0; i < A.length; i++) {
    if (A[i] < B[i]) return -1
    if (A[i] > B[i]) return 1
  }
  return 0
}

function renderReport(results, generatedAt) {
  const total = results.length
  const disqualified = results.filter((r) => r.disqualified)
  const score04 = results.filter((r) => !r.disqualified && r.score <= 4)
  const score56 = results.filter((r) => !r.disqualified && r.score >= 5 && r.score <= 6)
  const score78 = results.filter((r) => !r.disqualified && r.score >= 7 && r.score <= 8)
  const score9 = results.filter((r) => !r.disqualified && r.score === 9)
  const meanScore = total > 0 ? (results.reduce((s, r) => s + r.score, 0) / total).toFixed(2) : '0'

  const failuresList = (r) => {
    const fails = []
    for (const [name, check] of Object.entries(r.checks)) {
      if (!check.pass) fails.push(`${name}${check.reason ? ` (${check.reason})` : ''}`)
    }
    return fails.join('; ')
  }

  let md = `# ACOS Agent Quality Audit — ${generatedAt.slice(0, 10)}\n\n`
  md += `_Deterministic structural audit per the 9-check rubric. Run via \`npm run agents:quality\`._\n\n`
  md += `## Summary\n\n`
  md += `| | Count |\n|---|---:|\n`
  md += `| Audited | ${total} |\n`
  md += `| Disqualified (existential check fail) | ${disqualified.length} |\n`
  md += `| Score ≤ 4 (significant rework) | ${score04.length} |\n`
  md += `| Score 5-6 (priority revision) | ${score56.length} |\n`
  md += `| Score 7-8 (minor fixes) | ${score78.length} |\n`
  md += `| Score 9/9 (L99 structural-ready) | ${score9.length} |\n`
  md += `| **Mean score** | **${meanScore}/9** |\n\n`

  if (disqualified.length > 0) {
    md += `## 🚨 Disqualified — must fix before next ship\n\n`
    md += `Existential checks (frontmatter / brand voice / Arcanean leak) failed.\n\n`
    for (const r of disqualified.sort(compareRank)) {
      md += `- **${r.name}** (score ${r.score}/9, file \`${r.file}\`)\n  - ${failuresList(r)}\n`
    }
    md += '\n'
  }

  const queueLow = results.filter((r) => !r.disqualified && r.score <= 6).sort(compareRank)
  if (queueLow.length > 0) {
    md += `## 🔧 Priority revision queue (score ≤ 6)\n\n`
    for (const r of queueLow) {
      md += `- **${r.score}/9 · ${r.name}** — fails: ${failuresList(r)}\n`
    }
    md += '\n'
  }

  const queueMinor = results.filter((r) => !r.disqualified && r.score >= 7 && r.score <= 8).sort(compareRank)
  if (queueMinor.length > 0) {
    md += `## ⚙️ Minor fixes (score 7-8) — batch revision\n\n`
    md += `<details><summary>${queueMinor.length} agents</summary>\n\n`
    for (const r of queueMinor) {
      md += `- **${r.score}/9 · ${r.name}** — fails: ${failuresList(r)}\n`
    }
    md += `\n</details>\n\n`
  }

  if (score9.length > 0) {
    md += `## ✅ L99-ready (score 9/9)\n\n`
    md += `<details><summary>${score9.length} agents pass all 9 structural checks</summary>\n\n`
    for (const r of score9.sort((a, b) => a.name.localeCompare(b.name))) {
      md += `- ${r.name}\n`
    }
    md += `\n</details>\n\n`
  }

  const softFlagged = results.filter((r) => r.soft_flags.length > 0)
  if (softFlagged.length > 0) {
    md += `## 📋 Soft flags (human review — not score-impacting)\n\n`
    md += `These words have legitimate technical uses but warrant a glance:\n\n`
    md += `<details><summary>${softFlagged.length} agents</summary>\n\n`
    for (const r of softFlagged.sort((a, b) => b.soft_flags.length - a.soft_flags.length)) {
      md += `- **${r.name}** — ${r.soft_flags.join(', ')}\n`
    }
    md += `\n</details>\n\n`
  }

  md += `## Rubric (9 checks · 1 point each)\n\n`
  md += `1. Frontmatter complete (name, description, tools, model) — **EXISTENTIAL**\n`
  md += `2. Description with trigger language (≥50 chars, auto-invoke cues)\n`
  md += `3. Tools minimality — every declared tool referenced in Process\n`
  md += `4. Template-v2 sections — ≥8 of 10 canonical sections\n`
  md += `5. Memory contract — Process includes recall + remember\n`
  md += `6. Anti-patterns block — ≥4 negation bullets in §8\n`
  md += `7. Brand voice clean — zero definite-tell hits — **EXISTENTIAL**\n`
  md += `8. No Arcanean leak — zero quarantine matches — **EXISTENTIAL**\n`
  md += `9. Smoke fixture exists — tests/fixtures/<ref>/smoke.mjs present\n\n`
  md += `Sort priority: disqualified first → ascending score → alphabetical.\n`

  return md
}

const generatedAt = new Date().toISOString()
const files = discoverAgents()
const results = files.map(auditOne).sort(compareRank)

if (jsonOutput) {
  console.log(JSON.stringify({
    generated_at: generatedAt,
    audited: results.length,
    disqualified: results.filter((r) => r.disqualified).length,
    mean_score: results.length > 0 ? results.reduce((s, r) => s + r.score, 0) / results.length : 0,
    results,
  }, null, 2))
  process.exit(0)
}

const date = generatedAt.slice(0, 10)
const reportPath = path.join(REPORT_DIR, `agent-quality-audit-${date}.md`)
const jsonPath = path.join(MACHINE_DIR, `agent-quality-audit-${date}.json`)
mkdirSync(REPORT_DIR, { recursive: true })
mkdirSync(MACHINE_DIR, { recursive: true })

writeFileSync(reportPath, renderReport(results, generatedAt))
writeFileSync(jsonPath, JSON.stringify({
  generated_at: generatedAt,
  audited: results.length,
  results,
}, null, 2))

// Console summary
const total = results.length
const disqualified = results.filter((r) => r.disqualified).length
const score9 = results.filter((r) => r.score === 9).length
const meanScore = total > 0 ? (results.reduce((s, r) => s + r.score, 0) / total).toFixed(2) : '0'

console.log(`Audited ${total} agents.`)
console.log(`  Disqualified: ${disqualified}`)
console.log(`  L99-ready (9/9): ${score9}`)
console.log(`  Mean score: ${meanScore}/9`)
console.log(`\nReport: ${path.relative(ROOT, reportPath)}`)
console.log(`JSON:   ${path.relative(ROOT, jsonPath)}`)

if (disqualified > 0 || results.some((r) => r.score < 7)) {
  console.log(`\nTop priority fixes:`)
  const top = results.slice(0, 8)
  for (const r of top) {
    const badge = r.disqualified ? '🚨 DISQ' : `   ${r.score}/9`
    console.log(`  ${badge} · ${r.name}`)
  }
}
