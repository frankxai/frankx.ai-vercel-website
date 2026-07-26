#!/usr/bin/env node

import { readFileSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const args = new Set(process.argv.slice(2))
const jsonOnly = args.has('--json')
const shouldWrite = args.has('--write')

const registryPath = process.env.AGENTIC_LIFE_REGISTRY_PATH
  ? resolve(process.env.AGENTIC_LIFE_REGISTRY_PATH)
  : join(ROOT, 'data/research/agentic-life-market.json')
const domainsPath = join(ROOT, 'lib/research/domains.ts')
const sourcesPath = join(ROOT, 'lib/research/sources.ts')
const pagePath = join(ROOT, 'app/research/agentic-life-observatory/page.tsx')
const apiPath = join(ROOT, 'app/research/agentic-life-observatory/registry.json/route.ts')
const componentPath = join(ROOT, 'components/research/AgenticLifeObservatory.tsx')

const registry = JSON.parse(readFileSync(registryPath, 'utf8'))
const domains = readFileSync(domainsPath, 'utf8')
const sources = readFileSync(sourcesPath, 'utf8')
const page = readFileSync(pagePath, 'utf8')
const api = readFileSync(apiPath, 'utf8')
const component = readFileSync(componentPath, 'utf8')

const failures = []
const warnings = []
const checks = []

function check(condition, id, detail) {
  checks.push({ id, status: condition ? 'pass' : 'fail', detail })
  if (!condition) failures.push(`${id}: ${detail}`)
}

function sectionForSlug(text, slug) {
  const start = text.indexOf(`slug: '${slug}'`)
  if (start === -1) return ''
  const next = text.indexOf("\n  {\n    slug: '", start + 10)
  return text.slice(start, next === -1 ? text.length : next)
}

function sourceBlock(text, slug) {
  const start = text.indexOf(`'${slug}': [`)
  if (start === -1) return ''
  const next = text.indexOf("\n  ],", start)
  return text.slice(start, next === -1 ? text.length : next)
}

const requiredAxes = ['context', 'composition', 'sovereignty', 'verifiability', 'multiDomain']
const requiredRoles = ['build', 'integrate', 'partner', 'compete', 'inspire', 'watch']
const capabilityKeys = ['openSource', 'selfHost', 'exportable', 'trajectoryAware', 'humanGateReady']
const capabilityStates = new Set(['yes', 'partial', 'no', 'unknown'])
const lifeSlugs = [
  'agentic-life-architecture',
  'agentic-memory',
  'agentic-sovereignty',
  'agentic-evals',
  'agentic-life-observatory',
]

const systems = Array.isArray(registry.systems) ? registry.systems : []

check(registry.schemaVersion === '1.0.0', 'schema-version', `expected 1.0.0; received ${registry.schemaVersion}`)
check(systems.length >= 24, 'registry-depth', `${systems.length} systems; minimum 24`)
check(registry.canonicalUrl === 'https://frankx.ai/research/agentic-life-observatory', 'canonical-url', registry.canonicalUrl)
check(typeof registry.registryUrl === 'string' && registry.registryUrl.endsWith('/registry.json'), 'registry-url', String(registry.registryUrl))

const ids = systems.map((system) => system.id)
check(new Set(ids).size === ids.length, 'unique-system-ids', `${new Set(ids).size}/${ids.length} unique`)

const roles = [...new Set(systems.map((system) => system.strategicRole))].sort()
check(requiredRoles.every((role) => roles.includes(role)), 'strategic-role-coverage', `present: ${roles.join(', ')}`)

const categories = [...new Set(systems.map((system) => system.category))].sort()
check(categories.length >= 8, 'category-coverage', `${categories.length} categories`)

for (const system of systems) {
  const prefix = `system:${system.id}`
  check(typeof system.name === 'string' && system.name.length >= 2, `${prefix}:name`, 'name is required')
  check(requiredRoles.includes(system.strategicRole), `${prefix}:role`, system.strategicRole)
  check(/^https:\/\//.test(system.sourceUrl), `${prefix}:source`, system.sourceUrl)
  if (system.repoUrl) check(/^https:\/\//.test(system.repoUrl), `${prefix}:repo`, system.repoUrl)
  check(typeof system.risk === 'string' && system.risk.length >= 20, `${prefix}:risk`, 'explicit risk is required')
  check(typeof system.nextAction === 'string' && system.nextAction.length >= 20, `${prefix}:next-action`, 'specific next action is required')
  check(/^\d{4}-\d{2}-\d{2}$/.test(system.lastVerified), `${prefix}:verified-date`, system.lastVerified)

  for (const axis of requiredAxes) {
    const score = system.scores?.[axis]
    check(Number.isInteger(score) && score >= 0 && score <= 3, `${prefix}:score:${axis}`, String(score))
  }

  for (const capability of capabilityKeys) {
    check(capabilityStates.has(system.capabilities?.[capability]), `${prefix}:capability:${capability}`, String(system.capabilities?.[capability]))
  }
}

const verifiedAt = new Date(`${registry.lastVerified}T00:00:00Z`)
const ageDays = Math.floor((Date.now() - verifiedAt.getTime()) / 86_400_000)
check(!Number.isNaN(verifiedAt.getTime()), 'registry-date-valid', registry.lastVerified)
check(ageDays <= 120, 'registry-freshness', `${ageDays} days old; hard limit 120`)
if (ageDays > 60) warnings.push(`Registry is ${ageDays} days old; begin the monthly refresh before the 120-day hard gate.`)

for (const slug of lifeSlugs) {
  const domainSection = sectionForSlug(domains, slug)
  check(Boolean(domainSection), `domain:${slug}`, 'registered in domains.ts')
  const block = sourceBlock(sources, slug)
  const sourceCount = (block.match(/url: 'https:\/\//g) ?? []).length
  check(sourceCount >= 12, `sources:${slug}`, `${sourceCount} HTTPS sources; minimum 12`)
}

for (const slug of lifeSlugs.slice(0, 4)) {
  check(sectionForSlug(domains, slug).includes("'agentic-life-observatory'"), `crosslink:${slug}`, 'links to observatory')
}
const observatorySection = sectionForSlug(domains, 'agentic-life-observatory')
for (const slug of lifeSlugs.slice(0, 4)) {
  check(observatorySection.includes(`'${slug}'`), `crosslink:observatory:${slug}`, 'observatory links back')
}

check(page.includes("agenticLifeMarketRegistry"), 'surface:page', 'page consumes registry')
check(page.includes("'@type': 'Dataset'"), 'surface:json-ld', 'Dataset JSON-LD present')
check(api.includes('NextResponse.json(agenticLifeMarketRegistry'), 'surface:json-endpoint', 'registry JSON route present')
check(component.includes('Install. Test. Observe. Evolve.'), 'surface:operating-loop', 'operating loop visible')
check(component.includes('aria-pressed'), 'surface:filter-accessibility', 'filter state exposed to assistive technology')
check(component.includes('focus-visible:ring-2'), 'surface:keyboard-focus', 'visible focus treatment present')

const publicSurface = [registryPath, domainsPath, sourcesPath, pagePath, componentPath, apiPath]
  .map((path) => readFileSync(path, 'utf8'))
  .join('\n')
const boundaryPatterns = [
  /C:\\Users\\/i,
  /\/c\/Users\//i,
  /BEGIN (RSA|OPENSSH|EC) PRIVATE KEY/i,
  /(?:api[_-]?key|secret|token)\s*[:=]\s*["'][^"']{8,}/i,
]
for (const pattern of boundaryPatterns) {
  check(!pattern.test(publicSurface), `public-boundary:${pattern.source}`, 'no private path or credential pattern')
}

const roleBreakdown = Object.fromEntries(requiredRoles.map((role) => [role, systems.filter((system) => system.strategicRole === role).length]))
const categoryBreakdown = Object.fromEntries(categories.map((category) => [category, systems.filter((system) => system.category === category).length]))
const scoreTotal = systems.reduce(
  (total, system) => total + requiredAxes.reduce((axisTotal, axis) => axisTotal + (system.scores?.[axis] ?? 0), 0),
  0,
)
const possibleScore = systems.length * requiredAxes.length * 3
const coveragePercent = possibleScore === 0 ? 0 : Math.round((scoreTotal / possibleScore) * 100)

const receipt = {
  audit: 'agentic-life-research',
  version: '1.0.0',
  generatedAt: new Date().toISOString(),
  status: failures.length === 0 ? 'pass' : 'fail',
  registry: {
    schemaVersion: registry.schemaVersion,
    lastVerified: registry.lastVerified,
    ageDays,
    systems: systems.length,
    categories: categories.length,
    roles: roleBreakdown,
    categoryBreakdown,
    coveragePercent,
  },
  checks: {
    total: checks.length,
    passed: checks.filter((item) => item.status === 'pass').length,
    failed: failures.length,
  },
  warnings,
  failures,
}

if (shouldWrite) {
  const receiptPath = join(ROOT, 'tmp/receipts/agentic-life-research-audit.json')
  mkdirSync(dirname(receiptPath), { recursive: true })
  writeFileSync(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`, 'utf8')
  receipt.receiptPath = receiptPath.replaceAll('\\', '/')
}

if (jsonOnly) {
  process.stdout.write(`${JSON.stringify(receipt)}\n`)
} else {
  console.log(`[agentic-life-audit] ${receipt.status.toUpperCase()} — ${receipt.checks.passed}/${receipt.checks.total} checks`)
  console.log(`[agentic-life-audit] ${receipt.registry.systems} systems · ${receipt.registry.categories} categories · ${receipt.registry.coveragePercent}% directional coverage`)
  if (receipt.receiptPath) console.log(`[agentic-life-audit] receipt: ${receipt.receiptPath}`)
  for (const warning of warnings) console.warn(`[agentic-life-audit] WARN: ${warning}`)
  for (const failure of failures) console.error(`[agentic-life-audit] FAIL: ${failure}`)
}

if (failures.length > 0) process.exitCode = 1
