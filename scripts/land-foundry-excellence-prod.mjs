#!/usr/bin/env node
/**
 * land-foundry-excellence-prod.mjs — open the Foundry excellence-pass PR on
 * frankx.ai-vercel-website via Trees API (prod main is un-checkoutable on
 * Windows; see land-foundry-prod.mjs). Mirrors FrankX 70218574.
 */
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const REPO = 'frankxai/frankx.ai-vercel-website'
const BRANCH = 'feat/foundry-excellence'

const gh = (a, i) => execFileSync('gh', a, { encoding: 'utf8', input: i, maxBuffer: 64e6 })
const j = (a, i) => JSON.parse(gh(a, i))
const fetchProd = (path, ref) =>
  Buffer.from(j(['api', `repos/${REPO}/contents/${encodeURIComponent(path)}?ref=${ref}`]).content, 'base64').toString('utf8')

const baseSha = j(['api', `repos/${REPO}/git/ref/heads/main`]).object.sha
const baseCommit = j(['api', `repos/${REPO}/git/commits/${baseSha}`])
console.log(`base: main @ ${baseSha.slice(0, 8)}`)

const files = new Map()

// Foundry-owned files — full copies from FrankX (we author both sides)
for (const p of [
  'app/foundry/page.tsx',
  'app/foundry/guide/page.tsx',
  'app/api/foundry/apply/route.ts',
  'components/foundry/FoundryApplicationForm.tsx',
]) files.set(p, readFileSync(p, 'utf8').replace(/\r\n/g, '\n'))

// Shared files — anchored patches against PROD's own versions
function patch(path, edits) {
  let content = fetchProd(path, baseSha)
  let changed = false
  for (const [from, to] of edits) {
    if (content.includes(to)) continue
    if (!content.includes(from)) throw new Error(`anchor missing in prod ${path}: ${from.slice(0, 70)}…`)
    content = content.replace(from, to)
    changed = true
  }
  if (changed) { files.set(path, content); console.log(`patched: ${path}`) }
  else console.log(`no-op: ${path}`)
}

patch('app/os/page.tsx', [
  [`  Layers,\n  LineChart,\n} from 'lucide-react'`, `  Layers,\n  LineChart,\n  Hammer,\n} from 'lucide-react'`],
  [`const ICON_MAP = { Video, Users, Film, Cpu, Building2, BookOpen, Zap, LineChart }`,
   `const ICON_MAP = { Video, Users, Film, Cpu, Building2, BookOpen, Zap, LineChart, Hammer }`],
])

patch('app/sitemap.ts', [
  [`    { url: '/music-lab', priority: 0.8, changeFrequency: 'weekly' as const },\n  ]`,
   `    { url: '/music-lab', priority: 0.8, changeFrequency: 'weekly' as const },\n    { url: '/foundry', priority: 0.9, changeFrequency: 'weekly' as const },\n    { url: '/foundry/guide', priority: 0.7, changeFrequency: 'monthly' as const },\n  ]`],
])

const foundrySection = readFileSync('app/work-with-me/StudioClient.tsx', 'utf8').replace(/\r\n/g, '\n')
const fsStart = foundrySection.indexOf('function FoundrySection()')
const fsEnd = foundrySection.indexOf('function IndustriesSection()')
if (fsStart === -1 || fsEnd === -1) throw new Error('FoundrySection extraction failed')
const foundrySectionCode = foundrySection.slice(fsStart, fsEnd)

patch('app/work-with-me/StudioClient.tsx', [
  [`        <HeroSection />\n        <ServicesSection />\n        <IndustriesSection />`,
   `        <HeroSection />\n        <ServicesSection />\n        <FoundrySection />\n        <IndustriesSection />`],
  [`function IndustriesSection() {`, `${foundrySectionCode}function IndustriesSection() {`],
])

// Prod refactored the page into components/inner-circle/InnerCircleShell.tsx —
// patch the shell, anchoring on the pricing grid close (identical markup).
const icBlock = readFileSync('app/inner-circle/page.tsx', 'utf8').replace(/\r\n/g, '\n')
const icStart = icBlock.indexOf('          {/* Foundry cross-link — the install path for founders */}')
const icEnd = icBlock.indexOf('          {/* Founding Member callout — first 100 only */}')
if (icStart === -1 || icEnd === -1) throw new Error('inner-circle block extraction failed')
const icCode = icBlock.slice(icStart, icEnd)

const PRICING_GRID_CLOSE = `          <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {MEMBERSHIP_TIERS.map((tier, index) => (
              <PricingCard key={tier.name} tier={tier} index={index} />
            ))}
          </div>
`
patch('components/inner-circle/InnerCircleShell.tsx', [
  [PRICING_GRID_CLOSE, `${PRICING_GRID_CLOSE}\n${icCode}`],
])

// Tree + commit + branch + PR
const entries = [...files.entries()].map(([path, content]) => ({
  path, mode: '100644', type: 'blob',
  sha: j(['api', `repos/${REPO}/git/blobs`, '--method', 'POST', '--input', '-'],
    JSON.stringify({ content: Buffer.from(content).toString('base64'), encoding: 'base64' })).sha,
}))
const tree = j(['api', `repos/${REPO}/git/trees`, '--method', 'POST', '--input', '-'],
  JSON.stringify({ base_tree: baseCommit.tree.sha, tree: entries }))
const commit = j(['api', `repos/${REPO}/git/commits`, '--method', 'POST', '--input', '-'],
  JSON.stringify({
    message: 'feat(foundry): excellence pass — icon fix, OG, hero visual, rate limit, a11y, cross-links\n\nMirrors FrankX 70218574.\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>',
    tree: tree.sha, parents: [baseSha],
  }))
try {
  gh(['api', `repos/${REPO}/git/refs`, '--method', 'POST', '--input', '-'],
    JSON.stringify({ ref: `refs/heads/${BRANCH}`, sha: commit.sha }))
} catch {
  gh(['api', `repos/${REPO}/git/refs/heads/${BRANCH}`, '--method', 'PATCH', '--input', '-'],
    JSON.stringify({ sha: commit.sha, force: true }))
}
const pr = j(['api', `repos/${REPO}/pulls`, '--method', 'POST', '--input', '-'],
  JSON.stringify({
    title: 'feat(foundry): excellence pass — icon fix, OG images, hero visual, rate limit, a11y, cross-links',
    head: BRANCH, base: 'main',
    body: `Closes every Tier-1 finding from the two-agent excellence audit. Mirrors FrankX \`70218574\`.

- **fix:** \`Hammer\` icon registered in /os ICON_MAP (foundry module was falling back to Sparkles)
- **OG/twitter cards** on /foundry + /foundry/guide (NB Pro forge render, 1200×675)
- **Hero visual anchor** on /foundry — next/image, lg-only, priority
- **Rate limit** (leadRatelimit 10/h, fail-open on KV outage) + **silent honeypot** on the apply endpoint
- **a11y:** aria-live on form error/success
- **Sitemap:** explicit /foundry (0.9) + /foundry/guide (0.7)
- **Cross-links:** FoundrySection on /work-with-me · emerald callout under /inner-circle pricing
- Hero meta contrast /40 → /50

Gates on source: tsc fully clean, links:check:static green.

🤖 Generated with [Claude Code](https://claude.com/claude-code)`,
  }))
console.log(`PR: ${pr.html_url}`)
