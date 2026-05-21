#!/usr/bin/env node
/**
 * scripts/chronicle-roll-day.mjs
 *
 * Daily companion to chronicle-roll-week.mjs. Mines yesterday's git activity
 * across canonical FrankX-namespace repos, joins to the typed ecosystem
 * registry (data/ecosystem.ts) by repo+path heuristics, and writes
 * data/daily-walk.json — the input to the /admin/daily page.
 *
 * The Daily Walk reads this file and renders one card per system that
 * changed yesterday, with the commit list and a "Approve | Flag" tick-box.
 *
 * Re-entrant: re-running same day overwrites the day's entry without
 * duplicating.
 *
 * Usage:
 *   node scripts/chronicle-roll-day.mjs                  # yesterday → today
 *   node scripts/chronicle-roll-day.mjs --date 2026-05-03
 *   node scripts/chronicle-roll-day.mjs --since 2026-05-02 --until 2026-05-03
 */

import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { homedir } from 'node:os'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = join(__dirname, '..')
const OUTPUT_PATH = join(REPO_ROOT, 'data', 'daily-walk.json')
const BLESSINGS_PATH = join(REPO_ROOT, 'data', 'blessings.jsonl')

const CANONICAL_REPOS = [
  { name: 'frankx',                        path: join(homedir(), 'frankx') },
  { name: 'frankx.ai-vercel-website',      path: join(homedir(), 'frankx.ai-vercel-website') },
  { name: 'library-os',                    path: join(homedir(), 'library-os') },
  { name: 'starlight-intelligence-system', path: join(homedir(), 'Starlight-Intelligence-System') },
  { name: 'starlight-agent-lab',           path: join(homedir(), 'starlight-agent-lab') },
  { name: 'gencreator.ai',                 path: join(homedir(), 'gencreator.ai') },
  { name: 'arcanea',                       path: join(homedir(), 'Arcanea') },
]

// Map commit subject hints / file paths → ecosystem system slugs.
// Order matters: first match wins. If nothing matches, commit is bucketed
// under the synthetic "uncategorized" system so the Daily Walk still surfaces it.
const SYSTEM_HINTS = [
  { match: /\b(rails|on-god|on-reality|on-consciousness|on-faith|canon|study)\b/i, slug: 'contemplative-rails' },
  { match: /\b(workshop|ikigai|nldigital|madrid|amplify-attendee|crm-log)\b/i,    slug: 'workshop-os' },
  { match: /\b(library|book-distiller|library-add|library-deepen)\b/i,            slug: 'library-os' },
  { match: /\b(watch|short|talking-head|video-clip|video-publish)\b/i,            slug: 'watch-os' },
  { match: /\b(aco|remotion|smartcut)\b/i,                                         slug: 'aco' },
  { match: /\b(acos|99-agent|hook-learn|hook-learner)\b/i,                         slug: 'acos' },
  { match: /\b(ana|alea|piano|klavier|familie)\b/i,                                slug: 'characters' },
  { match: /\b(blessing|chronicle|palace|sunday)\b/i,                              slug: 'starlight-chronicle' },
  { match: /\b(meta|ecosystem|substrate|sip|sis)\b/i,                              slug: 'starlight-intelligence-system' },
  { match: /\b(design|hero|brand|nb2|nano-banana)\b/i,                             slug: 'design-system' },
  { match: /\b(seo|sitemap|network)\b/i,                                           slug: 'network' },
  { match: /\b(handover|eod|log\b)\b/i,                                            slug: 'ops-tooling' },
]

// ---------- arg parsing ----------
const args = process.argv.slice(2)
const flag = (n) => { const i = args.indexOf(n); return i === -1 ? null : args[i + 1] }

function dateString(d) { return d.toISOString().slice(0, 10) }

const dateArg  = flag('--date')
const sinceArg = flag('--since')
const untilArg = flag('--until')

let since, until
if (sinceArg && untilArg) {
  since = sinceArg; until = untilArg
} else if (dateArg) {
  since = dateArg; until = dateArg
} else {
  // Default: yesterday → today
  const today = new Date()
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
  since = dateString(yesterday); until = dateString(today)
}

const sinceForGit = since
const untilForGit = `${until} 23:59:59`

// ---------- mining ----------
const PREFIX_RE = /^(feat|fix|ship|release|perf|docs)(\([^)]+\))?:/i

function gitLogIn(repoPath) {
  if (!existsSync(join(repoPath, '.git'))) return []
  try {
    const fmt = '%h%x1f%ai%x1f%an%x1f%s'
    const out = execSync(
      `git log --since="${sinceForGit}" --until="${untilForGit}" --pretty=format:"${fmt}" --shortstat`,
      { cwd: repoPath, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
    )
    if (!out.trim()) return []
    const lines = out.split('\n')
    const commits = []
    for (let i = 0; i < lines.length; i++) {
      const ln = lines[i]
      if (!ln.includes('')) continue
      const [hash, date, author, subject] = ln.split('')
      let files = 1, additions = 0, deletions = 0
      const next = lines[i + 1] || ''
      const m = next.match(/(\d+) files? changed(?:, (\d+) insertions?\(\+\))?(?:, (\d+) deletions?\(-\))?/)
      if (m) {
        files = +m[1]
        additions = +(m[2] || 0)
        deletions = +(m[3] || 0)
        i += 1
      }
      commits.push({ hash, date: date.slice(0, 10), author, subject, files, additions, deletions })
    }
    return commits
  } catch {
    return []
  }
}

function classifyToSystem(subject) {
  for (const h of SYSTEM_HINTS) if (h.match.test(subject)) return h.slug
  return 'uncategorized'
}

// ---------- aggregate per-system ----------
const bySystem = new Map()
const repoStatus = []

for (const repo of CANONICAL_REPOS) {
  if (!existsSync(repo.path)) { repoStatus.push({ name: repo.name, status: 'missing' }); continue }
  if (!existsSync(join(repo.path, '.git'))) { repoStatus.push({ name: repo.name, status: 'no-git' }); continue }
  const commits = gitLogIn(repo.path)
  repoStatus.push({ name: repo.name, status: 'ok', commits: commits.length })

  for (const c of commits) {
    if (!PREFIX_RE.test(c.subject)) continue
    const slug = classifyToSystem(c.subject)
    if (!bySystem.has(slug)) bySystem.set(slug, { slug, commits: [], totalFiles: 0, repos: new Set() })
    const s = bySystem.get(slug)
    s.commits.push({
      repo: repo.name,
      hash: c.hash,
      date: c.date,
      author: c.author,
      subject: c.subject.replace(/^(\w+(\([^)]+\))?:\s*)/, ''),
      raw: c.subject,
      files: c.files,
      additions: c.additions,
      deletions: c.deletions,
    })
    s.totalFiles += c.files
    s.repos.add(repo.name)
  }
}

// ---------- read existing blessings (for state hint) ----------
let recentBlessings = []
if (existsSync(BLESSINGS_PATH)) {
  const lines = readFileSync(BLESSINGS_PATH, 'utf8').split('\n').filter(Boolean)
  // Last 50 entries — enough to surface recent verdicts on the same systems
  recentBlessings = lines.slice(-50).map(l => { try { return JSON.parse(l) } catch { return null } }).filter(Boolean)
}

// ---------- write daily-walk.json ----------
const systemsArray = Array.from(bySystem.values())
  .map(s => ({
    slug: s.slug,
    commitCount: s.commits.length,
    totalFiles: s.totalFiles,
    repos: Array.from(s.repos),
    commits: s.commits.sort((a, b) => b.date.localeCompare(a.date)),
    lastBlessing: recentBlessings.filter(b => b.slug === s.slug).slice(-1)[0] || null,
  }))
  .sort((a, b) => b.commitCount - a.commitCount)

const totalCommits = systemsArray.reduce((n, s) => n + s.commitCount, 0)
const totalSystems = systemsArray.length

const output = {
  generatedAt: new Date().toISOString(),
  window: { since, until },
  totals: { commits: totalCommits, systems: totalSystems, repos: repoStatus.filter(r => r.status === 'ok' && r.commits > 0).length },
  repoStatus,
  systems: systemsArray,
}

writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2) + '\n')

console.log(`✓ daily-walk.json — ${since} → ${until}`)
console.log(`  ${totalCommits} commits across ${totalSystems} systems in ${output.totals.repos} repos`)
console.log(`  written to ${OUTPUT_PATH}`)
