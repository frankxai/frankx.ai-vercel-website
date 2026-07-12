import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const requiredLayouts = [
  'app/familie/stammbaum/layout.tsx',
  'app/familie/mitmachen/layout.tsx',
  'app/familie/interview-kit/layout.tsx',
  'app/familie/geschichte/layout.tsx',
  'app/familie/forsche-selbst/layout.tsx',
  'app/family/tree/layout.tsx',
]

const failures = []

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

if (failures.length > 0) {
  console.error('Family private-boundary check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`Family private-boundary check passed for ${requiredLayouts.length} route groups.`)
