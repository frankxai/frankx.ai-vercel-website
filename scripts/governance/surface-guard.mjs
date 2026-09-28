#!/usr/bin/env node
/**
 * Surface guard: a pull request that touches a protected surface (.github/protected-surfaces.json) must say, in a
 * Surface change brief, whose intent it serves and how each of the surface's jobs is kept. `evolve` changes then
 * pass to review; `rearchitect` changes and `locked` surfaces also need Frank's `surface-approved` label.
 *
 * Why: on 2026-08-27 a valid, well-tested pull request replaced the homepage with a narrower page and rewrote the
 * tests that described it (docs/strategy/HOMEPAGE-PRESERVATION-CONTRACT.md). Tests cannot tell an improvement from
 * an erasure; a brief that has to name what survives can, and it gives the reviewer something to check the diff against.
 *
 *   node scripts/governance/surface-guard.mjs     (reads PR_BODY, PR_LABELS, GITHUB_BASE_REF from the environment)
 */
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const FIELDS = ['Surface', 'Kind', 'Intent', 'Keeps', 'Changes', 'Evidence']
const KINDS = ['evolve', 'rearchitect']
const APPROVAL_LABEL = 'surface-approved'

export function matches(file, pattern) {
  const regex = pattern
    .split('**')
    .map((part) => part.split('*').map((s) => s.replace(/[.+?^${}()|[\]\\]/g, '\\$&')).join('[^/]*'))
    .join('.*')
  return new RegExp(`^${regex}$`).test(file)
}

/** Every "Surface: <id>" starts a brief; its Key: value lines follow until the next one. */
export function parseBriefs(body) {
  const briefs = []
  // Only visible text counts: the PR template carries an example brief inside an HTML comment.
  for (const line of String(body ?? '').replace(/<!--[\s\S]*?-->/g, '').split(/\r?\n/)) {
    const match = /^\s*[-*]?\s*\**(Surface|Kind|Intent|Keeps|Changes|Evidence)\**\s*:\s*(.*)$/i.exec(line)
    if (!match) continue
    const key = FIELDS.find((field) => field.toLowerCase() === match[1].toLowerCase())
    if (key === 'Surface') briefs.push({})
    if (briefs.length) briefs[briefs.length - 1][key] = match[2].trim()
  }
  return briefs
}

const filled = (value) => Boolean(value) && value.length >= 8 && !/^<.*>$/.test(value) && !/\b(TODO|TBD|n\/a)\b/i.test(value)

export function evaluateSurfaces({ registry, changed, body, labels }) {
  const errors = []
  const briefs = parseBriefs(body)
  const approved = labels.includes(APPROVAL_LABEL)
  const touched = registry.surfaces
    .map((surface) => ({ surface, files: changed.filter((file) => surface.paths.some((p) => matches(file, p))) }))
    .filter(({ files }) => files.length)

  for (const { surface, files } of touched) {
    const where = `${surface.id} (${files.slice(0, 3).join(', ')}${files.length > 3 ? ', …' : ''})`
    const brief = briefs.find((b) => b.Surface?.toLowerCase() === surface.id)
    if (!brief) {
      errors.push(`${where} is a protected surface. Add a Surface change brief to the PR description: Surface: ${surface.id}, Kind (evolve|rearchitect), Intent (Frank's words or task link), Keeps (one line per job: ${surface.jobs.join(', ')}), Changes, Evidence (preview URL, screenshots, measurements).`)
      continue
    }
    for (const field of FIELDS.slice(2)) if (!filled(brief[field])) errors.push(`${surface.id}: brief field ${field} is empty or a placeholder.`)
    if (!KINDS.includes(String(brief.Kind).toLowerCase())) errors.push(`${surface.id}: Kind must be evolve or rearchitect, got "${brief.Kind ?? ''}".`)
    const keeps = String(brief.Keeps ?? '').toLowerCase()
    const unaddressed = surface.jobs.filter((job) => !keeps.includes(job.toLowerCase()))
    if (unaddressed.length) errors.push(`${surface.id}: Keeps must say how each job survives; missing: ${unaddressed.join(', ')}.`)
    if (surface.policy === 'locked' && !approved) errors.push(`${surface.id} is locked: any change needs Frank's ${APPROVAL_LABEL} label.`)
    else if (String(brief.Kind).toLowerCase() === 'rearchitect' && !approved) errors.push(`${surface.id}: a rearchitect change needs Frank's ${APPROVAL_LABEL} label; an evolve change does not.`)
  }
  return { touched: touched.map(({ surface, files }) => ({ id: surface.id, files })), errors }
}

function changedFiles() {
  const base = process.env.GITHUB_BASE_REF || 'main'
  const mergeBase = execFileSync('git', ['merge-base', `origin/${base}`, 'HEAD'], { encoding: 'utf8' }).trim()
  return execFileSync('git', ['diff', '--name-only', mergeBase, 'HEAD'], { encoding: 'utf8' }).split('\n').filter(Boolean)
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const registry = JSON.parse(readFileSync('.github/protected-surfaces.json', 'utf8'))
  const labels = String(process.env.PR_LABELS ?? '').split(',').map((l) => l.trim()).filter(Boolean)
  const { touched, errors } = evaluateSurfaces({ registry, changed: changedFiles(), body: process.env.PR_BODY, labels })
  if (!touched.length) console.log('[surface-guard] No protected surface touched.')
  for (const t of touched) console.log(`[surface-guard] touches ${t.id}: ${t.files.join(', ')}`)
  for (const error of errors) console.error(`[surface-guard] ${error}`)
  if (errors.length) {
    console.error('[surface-guard] Protected surfaces are evolved, not replaced. See .github/protected-surfaces.json and docs/strategy/HOMEPAGE-PRESERVATION-CONTRACT.md.')
    process.exit(1)
  }
  if (touched.length) console.log('[surface-guard] Brief complete. The reviewer checks the diff against it.')
}
