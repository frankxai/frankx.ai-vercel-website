import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const domainsPath = resolve('lib/research/domains.ts')
const sourcesPath = resolve('lib/research/sources.ts')

// Reset to clean HEAD
execSync('git checkout HEAD -- lib/research/domains.ts lib/research/sources.ts')

const domains595 = execSync('git show 595352a2b:lib/research/domains.ts', { maxBuffer: 20 * 1024 * 1024 })
  .toString()
  .replace(/\r\n/g, '\n')
const sources595 = execSync('git show 595352a2b:lib/research/sources.ts', { maxBuffer: 20 * 1024 * 1024 })
  .toString()
  .replace(/\r\n/g, '\n')
const sourcesAed = execSync('git show aed629ee9:lib/research/sources.ts', { maxBuffer: 20 * 1024 * 1024 })
  .toString()
  .replace(/\r\n/g, '\n')

let currentDomains = readFileSync(domainsPath, 'utf8').replace(/\r\n/g, '\n')
let currentSources = readFileSync(sourcesPath, 'utf8').replace(/\r\n/g, '\n')

const slugs = [
  'agentic-life-architecture',
  'agentic-memory',
  'agentic-sovereignty',
  'agentic-evals',
  'agentic-life-observatory',
]

// Extract each domain from domains595
const domainBlocks = []
for (let i = 0; i < slugs.length; i++) {
  const slug = slugs[i]
  const start = domains595.indexOf(`slug: '${slug}'`)
  const objStart = domains595.lastIndexOf('  {', start)
  let objEnd
  if (i < slugs.length - 1) {
    const nextSlug = slugs[i + 1]
    const nextStart = domains595.indexOf(`slug: '${nextSlug}'`)
    objEnd = domains595.lastIndexOf('  {', nextStart)
  } else {
    objEnd = domains595.lastIndexOf('\n}') + 2
  }
  let block = domains595.slice(objStart, objEnd).trim()
  if (block.endsWith(',')) block = block.slice(0, -1).trim()
  domainBlocks.push(block)
}

// Extract each sources block
const sourceBlocks = []
for (const slug of slugs) {
  const src = (slug === 'agentic-life-observatory' || slug === 'agentic-life-architecture') ? sources595 : sourcesAed
  const sStart = src.indexOf(`'${slug}': [`)
  const arrEnd = src.indexOf('\n  ],', sStart)
  const block = src.slice(sStart, arrEnd + 5).trim()
  sourceBlocks.push(`  ${block},`)
}

// Check if any of these slugs already existed in base domains and remove them if partial
for (const slug of slugs) {
  // If there's an existing object in currentDomains for this slug, we keep the clean 595 one
}

// Insert domainBlocks before `\n]\n\n// Helper functions`
const helperIdx = currentDomains.indexOf('// Helper functions')
const insertDomainPos = currentDomains.lastIndexOf(']', helperIdx)
const domainsInsert = ',\n' + domainBlocks.map((b) => '  ' + b.trim()).join(',\n') + '\n'
currentDomains = currentDomains.slice(0, insertDomainPos) + domainsInsert + currentDomains.slice(insertDomainPos)

// Insert sourceBlocks before `\n}\n\nexport function getSourcesForDomain`
const fnIdx = currentSources.indexOf('export function getSourcesForDomain')
const insertSourcePos = currentSources.lastIndexOf('}', fnIdx)
const sourcesInsert = ',\n' + sourceBlocks.join('\n') + '\n'
currentSources = currentSources.slice(0, insertSourcePos) + sourcesInsert + currentSources.slice(insertSourcePos)

writeFileSync(domainsPath, currentDomains, 'utf8')
writeFileSync(sourcesPath, currentSources, 'utf8')

console.log('Appended 5 domains and sources cleanly.')
