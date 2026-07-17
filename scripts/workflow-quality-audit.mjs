#!/usr/bin/env node
// Static workflow quality auditor — deterministic, cheap, fast.
// Scores each workflow on 9 dimensions of world-class quality without spending tokens.

import { readdir, readFile } from 'node:fs/promises'
import { join, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const WORKFLOWS_DIR = join(ROOT, '.claude', 'workflows')

async function parseMeta(path) {
  const src = await readFile(path, 'utf8')
  const marker = 'export const meta = '
  const startIdx = src.indexOf(marker)
  if (startIdx === -1) return { _error: 'no meta block' }
  let depth = 0, i = startIdx + marker.length, started = false
  for (; i < src.length; i++) {
    if (src[i] === '{') { depth++; started = true }
    else if (src[i] === '}' && started) { depth--; if (depth === 0) { i++; break } }
  }
  try {
    return { meta: new Function(`return (${src.slice(startIdx + marker.length, i)})`)(), src }
  } catch (e) {
    return { _error: `meta parse: ${e.message}` }
  }
}

function score(meta, src) {
  const issues = []
  const strengths = []
  const dims = {}

  // 1. Prompt clarity — measure total prompt length per agent() call
  // Handles template literals + string concatenation (the common pattern)
  const agentMatches = src.match(/agent\(\s*[`'"]/g) || []
  // Heuristic: count agent() calls whose argument expression (until matching close paren)
  // exceeds 200 chars — that's a substantive prompt.
  let longPromptCount = 0
  const regex = /agent\(\s*([`'"])/g
  let m
  while ((m = regex.exec(src)) !== null) {
    // Find matching close paren by tracking nesting
    let depth = 1, i = m.index + m[0].length, len = 0
    while (i < src.length && depth > 0) {
      const c = src[i]
      if (c === '(') depth++
      else if (c === ')') depth--
      if (depth > 0) len++
      i++
    }
    if (len > 200) longPromptCount++
  }
  dims.promptClarity = Math.min(10, Math.round((longPromptCount / Math.max(1, agentMatches.length)) * 10))
  if (dims.promptClarity < 7) issues.push({ priority: 'p3', dimension: 'promptClarity', issue: `${longPromptCount}/${agentMatches.length} agent calls have substantive prompts (>200 char)` })
  else strengths.push('Substantive agent prompts (>200 char each)')

  // 2. Model tier discipline
  const modelOverrides = (src.match(/model:\s*['"](?:haiku|sonnet|opus)['"]/g) || []).length
  dims.modelTierDiscipline = Math.min(10, modelOverrides * 2 + 2)
  if (modelOverrides === 0) issues.push({ priority: 'p1', dimension: 'modelTierDiscipline', issue: 'No model tier overrides' })

  // 3. Schema rigor
  const schemaCount = (src.match(/schema:\s*\w+_SCHEMA/g) || []).length
  dims.schemaRigor = Math.min(10, Math.round((schemaCount / Math.max(1, agentMatches.length)) * 12))
  if (dims.schemaRigor < 6) issues.push({ priority: 'p1', dimension: 'schemaRigor', issue: `${schemaCount}/${agentMatches.length} agent calls have schemas` })

  // 4. Composition
  dims.compositionCorrectness = 10

  // 5. Cost calibration
  const hasEstCost = !!meta.acos?.estimatedCost
  const isCalibrated = !!(meta.acos?.estimatedCost?.calibratedRuns > 0)
  dims.costCalibration = isCalibrated ? 10 : hasEstCost ? 7 : 3
  if (!hasEstCost) issues.push({ priority: 'p1', dimension: 'costCalibration', issue: 'No estimatedCost' })
  if (isCalibrated) strengths.push('Cost calibrated from live runs')

  // 6. Doc completeness
  let docScore = 0
  if (meta.name) docScore += 1
  if (meta.description) docScore += 2
  if (meta.whenToUse) docScore += 3
  if (meta.phases?.length > 0) docScore += 2
  if (meta.acos?.cadence) docScore += 1
  if (meta.acos?.runtime) docScore += 1
  dims.docCompleteness = docScore
  if (!meta.whenToUse) issues.push({ priority: 'p2', dimension: 'docCompleteness', issue: 'Missing whenToUse' })
  if (!meta.acos?.runtime) issues.push({ priority: 'p2', dimension: 'docCompleteness', issue: 'Missing acos.runtime' })

  // 7. Trajectory wiring
  const hasRecall = /workflow-trajectory\.mjs recall/.test(src)
  const hasRecord = /workflow-trajectory\.mjs record/.test(src)
  dims.trajectoryWiring = (hasRecall && hasRecord) ? 10 : hasRecall || hasRecord ? 5 : 1
  if (!hasRecall) issues.push({ priority: 'p1', dimension: 'trajectoryWiring', issue: 'No trajectory recall — cold start every run' })
  if (!hasRecord) issues.push({ priority: 'p1', dimension: 'trajectoryWiring', issue: 'No trajectory record — outcomes lost' })
  if (hasRecall && hasRecord) strengths.push('Trajectory recall + record wired')

  // 8. Human-gate wiring
  const producesArtifact = /content\/(blog|newsletters|staging|drafts)/.test(src) || /writeFile|appendFile/.test(src)
  const hasGate = /workflow-gates\.mjs/.test(src) || /humanGate/.test(src)
  dims.humanGateWiring = producesArtifact ? (hasGate ? 10 : 4) : 9
  if (producesArtifact && !hasGate) issues.push({ priority: 'p1', dimension: 'humanGateWiring', issue: 'Produces artifact but no human gate' })

  // 9. Anti-pattern check
  let antiScore = 10
  const firstPhaseIdx = src.indexOf("phase('")
  const beforeFirstPhase = firstPhaseIdx > 0 ? src.slice(0, firstPhaseIdx) : src
  // Only flag P0 if there's a `throw` requiring args — the dangerous pattern
  // Plain `const x = args?.field ?? default` is fine at top level
  if (/throw\s+new\s+Error\(['"`][^'"`]*requires? args/.test(beforeFirstPhase)) {
    antiScore -= 3
    issues.push({ priority: 'p0', dimension: 'antiPatternCheck', issue: 'throw on args at top level — args is undefined at module eval, will always throw. Move check inside first phase() call.' })
  }
  if (/Date\.now\(\)|Math\.random\(\)/.test(src)) {
    antiScore -= 2
    issues.push({ priority: 'p1', dimension: 'antiPatternCheck', issue: 'Uses Date.now()/Math.random() — forbidden in workflow runtime' })
  }
  dims.antiPatternCheck = Math.max(0, antiScore)
  if (dims.antiPatternCheck === 10) strengths.push('No anti-patterns')

  const overall = Math.round((Object.values(dims).reduce((a, b) => a + b, 0) / 90) * 100)
  const verdict = overall >= 90 ? 'world-class' : overall >= 75 ? 'production-ready' : overall >= 60 ? 'needs-polish' : 'needs-rework'

  return { dims, overall, verdict, issues, strengths }
}

const files = (await readdir(WORKFLOWS_DIR)).filter(f => f.endsWith('.js')).sort()
const results = []

for (const f of files) {
  const parsed = await parseMeta(join(WORKFLOWS_DIR, f))
  if (parsed._error) {
    results.push({ name: basename(f, '.js'), error: parsed._error })
    continue
  }
  const s = score(parsed.meta, parsed.src)
  results.push({
    name: basename(f, '.js'),
    portable: parsed.meta.acos?.portable,
    overall: s.overall,
    verdict: s.verdict,
    dims: s.dims,
    issuesCount: s.issues.length,
    issues: s.issues,
    strengths: s.strengths,
  })
}

const mode = process.argv[2] ?? 'human'

if (mode === 'json') {
  console.log(JSON.stringify(results, null, 2))
} else if (mode === 'fixqueue') {
  const allIssues = results.flatMap(r => (r.issues || []).map(i => ({ ...i, workflow: r.name })))
  const byPri = { p0: [], p1: [], p2: [], p3: [] }
  for (const i of allIssues) byPri[i.priority]?.push(i)
  console.log('\nWorkflow quality — prioritized fix queue:\n')
  for (const p of ['p0', 'p1', 'p2', 'p3']) {
    if (!byPri[p].length) continue
    console.log(`### ${p.toUpperCase()} (${byPri[p].length} items)`)
    for (const i of byPri[p]) console.log(`  - [${i.workflow}] ${i.dimension}: ${i.issue}`)
    console.log()
  }
} else {
  const wc = results.filter(r => r.verdict === 'world-class').length
  const pr = results.filter(r => r.verdict === 'production-ready').length
  const np = results.filter(r => r.verdict === 'needs-polish').length
  const nr = results.filter(r => r.verdict === 'needs-rework').length
  const avg = Math.round(results.reduce((s, r) => s + (r.overall || 0), 0) / results.length)
  const allP0 = results.flatMap(r => (r.issues || []).filter(i => i.priority === 'p0')).length
  const allP1 = results.flatMap(r => (r.issues || []).filter(i => i.priority === 'p1')).length

  console.log(`\nWorkflow quality audit (static):\n`)
  console.log(`Distribution: ${wc} world-class · ${pr} production-ready · ${np} needs-polish · ${nr} needs-rework`)
  console.log(`Average: ${avg}/100 · P0: ${allP0} · P1: ${allP1}\n`)

  console.log('| Workflow | Tier | Verdict | Score | Issues | Top weakness |')
  console.log('|---|---|---|---|---|---|')
  for (const r of results) {
    const portable = r.portable ? 'portable' : 'local'
    const topWeakness = r.dims ? Object.entries(r.dims).sort(([, a], [, b]) => a - b)[0] : null
    console.log(`| \`${r.name}\` | ${portable} | ${r.verdict} | ${r.overall}/100 | ${r.issuesCount} | ${topWeakness ? `${topWeakness[0]}=${topWeakness[1]}/10` : '—'} |`)
  }
  console.log()
}
