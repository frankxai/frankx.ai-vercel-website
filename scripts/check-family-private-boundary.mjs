import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const requiredLayouts = [
  'app/familie/stammbaum/layout.tsx',
  'app/familie/mitmachen/layout.tsx',
  'app/familie/interview-kit/layout.tsx',
  'app/familie/geschichte/layout.tsx',
  'app/familie/forsche-selbst/layout.tsx',
  'app/familie/nachkommen-und-patenschaften/layout.tsx',
  'app/familie/vorsorge-und-notfall/layout.tsx',
  'app/family/tree/layout.tsx',
]

const failures = []

function collectSourceFiles(relativePath) {
  const absolutePath = path.join(root, relativePath)
  if (!fs.existsSync(absolutePath)) return []

  const stat = fs.statSync(absolutePath)
  if (stat.isFile()) return [absolutePath]

  return fs.readdirSync(absolutePath, { withFileTypes: true }).flatMap((entry) => {
    const child = path.join(absolutePath, entry.name)
    if (entry.isDirectory()) return collectSourceFiles(path.relative(root, child))
    return /\.(?:ts|tsx|js|mjs|json|md|mdx|ya?ml|html)$/.test(entry.name) ? [child] : []
  })
}

for (const relativePath of requiredLayouts) {
  const absolutePath = path.join(root, relativePath)
  if (!fs.existsSync(absolutePath)) {
    failures.push(`${relativePath}: missing server authorization layout`)
    continue
  }

  const source = fs.readFileSync(absolutePath, 'utf8')
  if (!source.includes('await requireFamilySession()')) {
    failures.push(`${relativePath}: does not re-check the family session`)
  }
  if (!source.includes("dynamic = 'force-dynamic'")) {
    failures.push(`${relativePath}: private content may be statically rendered`)
  }
}

const helperPath = path.join(root, 'lib/familie/require-family-session.ts')
const helper = fs.existsSync(helperPath) ? fs.readFileSync(helperPath, 'utf8') : ''
if (!helper.includes('await auth()') || !helper.includes("redirect('/familie?zugang=erforderlich')")) {
  failures.push('lib/familie/require-family-session.ts: fail-closed session helper is incomplete')
}

const proxyPath = path.join(root, 'proxy.ts')
const proxy = fs.readFileSync(proxyPath, 'utf8')
if (!proxy.includes("pathname.startsWith('/familie/')") || !proxy.includes("pathname === '/family/tree'")) {
  failures.push('proxy.ts: private family routes lack the defense-in-depth redirect')
}

const privateSourceRoots = [
  'app/familie',
  'app/family/tree',
  'app/opa-und-oma',
  'components/familie',
  'lib/familie',
  'lib/family-tree-data.ts',
  'app/design-lab/family-tree',
  '.frankx/family',
  'public/reading/.frankx/family',
  'public/reading/public/reading/.frankx/family',
]

const sourcePrivacyRules = [
  { label: 'embedded ISO date', pattern: /\b(?:18|19|20)\d{2}-\d{2}-\d{2}\b/ },
  { label: 'embedded email address', pattern: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i },
  { label: 'private-family source reference', pattern: /\.frankx[\\/]family/i },
  { label: 'record-shaped birth/death field', pattern: /\b(?:born|died|bornName|bornLocation|diedLocation|geburtsdatum|sterbedatum|wohnort)\s*:\s*['"`]/i },
  { label: 'living-person family record', pattern: /\bliving\s*:\s*true\b/i },
  { label: 'kinship record', pattern: /^\s*(?:relations|person)\s*:/im },
  { label: 'literal multi-token person name', pattern: /\bname\s*:\s*['"][A-ZÄÖÜ][^'"\n]+\s+[^'"\n]+['"]/ },
]

for (const absolutePath of privateSourceRoots.flatMap(collectSourceFiles)) {
  const source = fs.readFileSync(absolutePath, 'utf8')
  const relativePath = path.relative(root, absolutePath).replaceAll('\\', '/')
  const isSyntheticFixture = relativePath === 'lib/family-tree-data.ts'

  for (const rule of sourcePrivacyRules) {
    if (isSyntheticFixture && rule.label === 'literal multi-token person name') continue
    if (rule.pattern.test(source)) failures.push(`${relativePath}: ${rule.label} is not allowed in the public family shell`)
  }
}

const personalizedChildPortalRules = [
  /Heute wirst du \d+ Jahre alt/i,
  /Today you turn \d+ years old/i,
  /persönliche Musikschule/i,
  /virtuelles Kätzchen/i,
]

for (const absolutePath of collectSourceFiles('app')) {
  const source = fs.readFileSync(absolutePath, 'utf8')
  if (personalizedChildPortalRules.some((pattern) => pattern.test(source))) {
    const relativePath = path.relative(root, absolutePath).replaceAll('\\', '/')
    failures.push(`${relativePath}: personalized child portals must live in the private tenant, not public source`)
  }
}

const syntheticFixturePath = path.join(root, 'lib/family-tree-data.ts')
const syntheticFixture = fs.readFileSync(syntheticFixturePath, 'utf8')
if (!syntheticFixture.includes("dataClassification = 'synthetic-example'")) {
  failures.push('lib/family-tree-data.ts: public visualization data must declare synthetic classification')
}
for (const match of syntheticFixture.matchAll(/\bname:\s*'([^']+)'/g)) {
  if (!match[1].startsWith('Beispielperson ')) {
    failures.push('lib/family-tree-data.ts: every literal display name must be an explicit Beispielperson fixture')
  }
}

if (failures.length > 0) {
  console.error('Family private-boundary check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`Family privacy check passed for ${requiredLayouts.length} route groups and ${privateSourceRoots.length} source boundaries.`)
