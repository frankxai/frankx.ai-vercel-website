import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const sourcesPath = resolve('lib/research/sources.ts')

const sources595 = execSync('git show 595352a2b:lib/research/sources.ts', { maxBuffer: 20 * 1024 * 1024 })
  .toString()
  .replace(/\r\n/g, '\n')
const sourcesAed = execSync('git show aed629ee9:lib/research/sources.ts', { maxBuffer: 20 * 1024 * 1024 })
  .toString()
  .replace(/\r\n/g, '\n')

let currentSources = readFileSync(sourcesPath, 'utf8').replace(/\r\n/g, '\n')

const slugs = [
  'agentic-life-architecture',
  'agentic-memory',
  'agentic-sovereignty',
  'agentic-evals',
  'agentic-life-observatory',
]

// Extract each sources block
const sourceBlocks = []
for (const slug of slugs) {
  const src = (slug === 'agentic-life-observatory' || slug === 'agentic-life-architecture') ? sources595 : sourcesAed
  const sStart = src.indexOf(`'${slug}': [`)
  const arrEnd = src.indexOf('\n  ],', sStart)
  const block = src.slice(sStart, arrEnd + 5).trim()
  sourceBlocks.push(`  ${block}`)
}

const targetStr = '\n}\n\nexport function getSourcesForDomain'
const replacementStr = ',\n' + sourceBlocks.join(',\n') + '\n}\n\nexport function getSourcesForDomain'

if (!currentSources.includes(targetStr)) {
  throw new Error('Target string not found in sources.ts')
}

currentSources = currentSources.replace(targetStr, replacementStr)
writeFileSync(sourcesPath, currentSources, 'utf8')
console.log('Appended 5 sources cleanly to sources.ts')
