#!/usr/bin/env node
/**
 * land-foundry-prod.mjs — open the Foundry PR on frankx.ai-vercel-website
 * entirely via the GitHub Trees API (local checkout impossible on Windows:
 * prod main contains invalid `public/reading/C:\...` paths).
 *
 * New files are read from the local FrankX tree; edited files are fetched
 * from prod main and patched with anchored string edits — prod's own
 * versions, never overwritten with dev copies.
 */
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const REPO = 'frankxai/frankx.ai-vercel-website'
const BRANCH = 'feat/foundry-hub'

const gh = (args, input) =>
  execFileSync('gh', args, { encoding: 'utf8', input, maxBuffer: 64 * 1024 * 1024 })
const ghJson = (args, input) => JSON.parse(gh(args, input))

const fetchProd = (path, ref) => {
  const res = ghJson(['api', `repos/${REPO}/contents/${encodeURIComponent(path)}?ref=${ref}`])
  return Buffer.from(res.content, 'base64').toString('utf8')
}

// ── 1. Base ──
const baseSha = ghJson(['api', `repos/${REPO}/git/ref/heads/main`]).object.sha
const baseCommit = ghJson(['api', `repos/${REPO}/git/commits/${baseSha}`])
console.log(`base: main @ ${baseSha.slice(0, 8)}`)

// ── 2. New files from local FrankX ──
const newFiles = [
  'app/foundry/page.tsx',
  'app/foundry/guide/page.tsx',
  'app/api/foundry/apply/route.ts',
  'components/foundry/FoundryApplicationForm.tsx',
  'lib/foundry-faqs.ts',
  'lib/email-templates-foundry.ts',
]
const files = new Map()
for (const p of newFiles) files.set(p, readFileSync(p, 'utf8').replace(/\r\n/g, '\n'))

// ── 3. Anchored patches on prod's own content ──
function patch(path, edits, { optional = false } = {}) {
  let content
  try {
    content = fetchProd(path, baseSha)
  } catch {
    if (optional) return console.log(`skip (absent on prod): ${path}`)
    throw new Error(`required file missing on prod: ${path}`)
  }
  let changed = false
  for (const [from, to, required] of edits) {
    if (content.includes(to)) continue // already applied
    if (!content.includes(from)) {
      if (required) throw new Error(`anchor not found in prod ${path}: ${from.slice(0, 60)}…`)
      continue
    }
    content = content.replace(from, to)
    changed = true
  }
  if (changed) {
    files.set(path, content)
    console.log(`patched: ${path}`)
  } else {
    console.log(`no-op: ${path}`)
  }
}

patch('components/Footer.tsx', [
  [
    `<li><Link href="/start" className="hover:text-white transition-colors">Start here</Link></li>`,
    `<li><Link href="/foundry" className="text-emerald-400/70 hover:text-emerald-300 transition-colors">Foundry</Link></li>\n              <li><Link href="/start" className="hover:text-white transition-colors">Start here</Link></li>`,
    true,
  ],
])

patch('components/Navigation.tsx', [
  [
    `  { name: 'Blog', href: '/blog' },`,
    `  {\n    name: 'Foundry',\n    href: '/foundry',\n    subItems: [\n      { name: 'The Foundry', href: '/foundry' },\n      { name: 'Operating Guide', href: '/foundry/guide' },\n      { name: 'Apply', href: '/foundry#apply' },\n    ],\n  },\n  { name: 'Blog', href: '/blog' },`,
    true,
  ],
])

const foundryModule = `  {
    id: 'foundry',
    name: 'FrankX Foundry',
    slug: 'foundry',
    route: '/foundry',
    status: 'live',
    color: 'emerald',
    iconName: 'Hammer',
    shipped: '2026-06-11',
    oneLine: 'Operating-system installs for businesses we believe in.',
    description:
      'The service layer of the Agentic OS family. Evaluated installs of agentic-business-os — site, agent harness, claims gate, business memory — derived per brand, owned by the founder, connected via harness-sync PRs. Application-only; priority for sustainable, healthcare, and meaningful businesses.',
    phases: ['funnel', 'cross-cutting'],
    connectsTo: ['acos', 'coe-hub'],
    artifacts: ['OS installs', 'Brand derivations', 'Harness-sync PRs', 'Skill packs'],
    commands: ['/os-spawn'],
    deepDive: {
      route: '/foundry/guide',
      label: 'Read the operating guide',
      description:
        'How a founder runs an installed OS: day-1 onboarding, the 30-minute weekly rhythm, the gates, and how harness updates arrive.',
    },
  },
]`
patch('data/os-modules.ts', [[`\n]\n\nexport const osCRM`, `\n${foundryModule}\n\nexport const osCRM`, true]])

patch(
  'content/blog/ai-model-routing-guide.mdx',
  [[`(/llm-hub/compare/claude-fable-5-vs-gemini-3-5-pro)`, `(/llm-hub/gemini-3-5-pro)`, false]],
  { optional: true },
)
patch(
  'content/blog/claude-fable-5-prompting-guide.mdx',
  [[`(/llm-hub/compare/claude-fable-5-vs-claude-opus-4-8)`, `(/llm-hub/claude-opus-4-8)`, false]],
  { optional: true },
)

// ── 4. Tree + commit + branch ──
const treeEntries = [...files.entries()].map(([path, content]) => {
  const blob = ghJson(
    ['api', `repos/${REPO}/git/blobs`, '--method', 'POST', '--input', '-'],
    JSON.stringify({ content: Buffer.from(content).toString('base64'), encoding: 'base64' }),
  )
  return { path, mode: '100644', type: 'blob', sha: blob.sha }
})
const tree = ghJson(
  ['api', `repos/${REPO}/git/trees`, '--method', 'POST', '--input', '-'],
  JSON.stringify({ base_tree: baseCommit.tree.sha, tree: treeEntries }),
)
const commit = ghJson(
  ['api', `repos/${REPO}/git/commits`, '--method', 'POST', '--input', '-'],
  JSON.stringify({
    message:
      'feat(foundry): FrankX Foundry hub — service layer of the Agentic OS family\n\nMirrors FrankX d5c07db4. /foundry + /foundry/guide + /api/foundry/apply +\nnav/footer/os-modules wiring + 2 blog link fixes. Application-only, no\npublic pricing. Priority: sustainable, healthcare, meaningful businesses.\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>',
    tree: tree.sha,
    parents: [baseSha],
  }),
)
try {
  gh(
    ['api', `repos/${REPO}/git/refs`, '--method', 'POST', '--input', '-'],
    JSON.stringify({ ref: `refs/heads/${BRANCH}`, sha: commit.sha }),
  )
} catch {
  gh(
    ['api', `repos/${REPO}/git/refs/heads/${BRANCH}`, '--method', 'PATCH', '--input', '-'],
    JSON.stringify({ sha: commit.sha, force: true }),
  )
}
console.log(`branch ${BRANCH} @ ${commit.sha.slice(0, 8)}`)

// ── 5. PR ──
const pr = ghJson(
  ['api', `repos/${REPO}/pulls`, '--method', 'POST', '--input', '-'],
  JSON.stringify({
    title: 'feat(foundry): FrankX Foundry hub — the service layer of the Agentic OS family',
    head: BRANCH,
    base: 'main',
    body: `## FrankX Foundry — /foundry

The premium service surface for the Agentic OS family. Mirrors FrankX \`d5c07db4\`.

**New routes**
- \`/foundry\` — 3-layer architecture showcase (SIS → agentic-*-os family → Foundry), 5-contract explainer, proof receipts (install #1, the harness-sync loop, frankx.ai as reference), published evaluation criteria, application form, 8 FAQs + FAQPage/Service/Breadcrumb JSON-LD
- \`/foundry/guide\` — founder-facing operating guide (long-form, reading measure)
- \`POST /api/foundry/apply\` — validated intake → JSONL backstop (/tmp on Vercel) + Resend contact + plain-text confirmation + internal notification to frank@frankx.ai

**Wiring** (anchored patches on this repo's own file versions, not dev overwrites)
- Navigation: Foundry top-level item · Footer: Work-with-me section · data/os-modules.ts: foundry module with /foundry/guide deepDive
- fix: 2 broken \`/llm-hub/compare/*\` blog links → existing model pages

**Deliberately absent:** pricing (BV-gated — application-only until further notice).

Upstream repos this page links: [agentic-business-os](https://github.com/frankxai/agentic-business-os) (v0.1.1, template + packs + sync) · [Starlight-Intelligence-System](https://github.com/frankxai/Starlight-Intelligence-System) · [agentic-creator-os](https://github.com/frankxai/agentic-creator-os).

Verification: tsc clean for all new files on FrankX; links:check:static green; Vercel preview on this PR is the authoritative build.

🤖 Generated with [Claude Code](https://claude.com/claude-code)`,
  }),
)
console.log(`PR: ${pr.html_url}`)
