#!/usr/bin/env node
/**
 * Surface guard: a pull request that touches a protected surface (.github/protected-surfaces.json) must say, in a
 * Surface change brief, whose intent it serves and how each of the surface's jobs is kept. `evolve` changes then
 * pass to review; `rearchitect` changes and `locked` surfaces also need Frank's `surface-approved` label, given for
 * the current head.
 *
 * Why: on 2026-08-27 a valid, well-tested pull request replaced the homepage with a narrower page and rewrote the
 * tests that described it (docs/strategy/HOMEPAGE-PRESERVATION-CONTRACT.md). Tests cannot tell an improvement from
 * an erasure; a brief that has to name what survives can, and it gives the reviewer something to check the diff against.
 *
 *   node scripts/governance/surface-guard.mjs   (reads PR_BODY, PR_LABELS, EVENT_ACTION, GITHUB_BASE_REF)
 */
import { execFileSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const FIELDS = ['Surface', 'Kind', 'Intent', 'Keeps', 'Changes', 'Evidence']
const KINDS = ['evolve', 'rearchitect']
const APPROVAL_LABEL = 'surface-approved'
const REGISTRY_PATH = '.github/protected-surfaces.json'
const NEGATED = /\b(removed|dropped|deleted|gone|lost|cut|replaced by nothing)\b/i

// Built in, not in the registry: a gate that the PR under review can edit is not a gate.
const GOVERNANCE = {
  id: 'governance',
  policy: 'locked',
  paths: [REGISTRY_PATH, 'scripts/governance/**', 'scripts/tests/governance-gates.test.mjs', '.github/workflows/surface-guard.yml', '.github/workflows/review-gate.yml'],
  jobs: ['gate integrity'],
}

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
  // Only visible text counts: the PR template carries an example brief inside an HTML comment, and an unclosed
  // "<!--" hides the rest of the body on GitHub. Inside code spans and fences the marker renders as text instead.
  const visible = String(body ?? '')
    .replace(/```[\s\S]*?(?:```|$)|`[^`\n]*`/g, (code) => code.replaceAll('<!--', '<! --'))
    .replace(/<!--[\s\S]*?(?:-->|$)/g, '')
  for (const line of visible.split(/\r?\n/)) {
    const match = /^\s*[-*]?\s*\**(Surface|Kind|Intent|Keeps|Changes|Evidence)\**\s*:\s*(.*)$/i.exec(line)
    if (!match) continue
    const key = FIELDS.find((field) => field.toLowerCase() === match[1].toLowerCase())
    if (key === 'Surface') briefs.push({})
    if (briefs.length) briefs[briefs.length - 1][key] = match[2].trim()
  }
  return briefs
}

const filled = (value) => Boolean(value) && value.length >= 8 && !/^<.*>$/.test(value) && !/\b(TODO|TBD|n\/a)\b/i.test(value)

/** "identity: same portrait; conversion: same CTAs" -> jobs whose explanation is missing, too short or says it is gone. */
function unkeptJobs(keeps, jobs) {
  const parts = String(keeps ?? '').split(/;|\n/).map((p) => p.trim())
  return jobs.filter((job) => {
    const part = parts.find((p) => p.toLowerCase().startsWith(`${job.toLowerCase()}:`))
    const why = part ? part.slice(job.length + 1).trim() : ''
    return why.length < 8 || NEGATED.test(why)
  })
}

/**
 * `baseRegistry` is the registry on the base branch; null only when this PR introduces the gates. Reading it from
 * the base means a PR cannot unprotect a surface in the same change that edits it.
 */
export function evaluateSurfaces({ registry, baseRegistry, changed, body, labels, eventAction, approvedBy, approvedAt, headCommittedAt }) {
  const errors = []
  const briefs = parseBriefs(body)
  const trusted = baseRegistry ?? registry
  const surfaces = baseRegistry ? [...baseRegistry.surfaces, GOVERNANCE] : registry.surfaces
  const approvers = trusted.approvers ?? ['frankxai']
  // A label given before the latest push approved an earlier head; Frank re-applies it after reviewing this one.
  // Also by time, so a missed label removal cannot leave an old approval valid on a later event.
  const staleApproval = eventAction === 'synchronize' || Boolean(approvedAt && headCommittedAt && approvedAt < headCommittedAt)
  // Anyone with triage rights can add a label; only an approver's label is an approval.
  const approverLabel = approvers.includes(approvedBy)
  const approved = labels.includes(APPROVAL_LABEL) && !staleApproval && approverLabel
  let needsApproval = false
  const touched = surfaces
    .map((surface) => ({ surface, files: changed.filter((file) => surface.paths.some((p) => matches(file, p))) }))
    .filter(({ files }) => files.length)

  for (const { surface, files } of touched) {
    const where = `${surface.id} (${files.slice(0, 3).join(', ')}${files.length > 3 ? ', …' : ''})`
    const brief = briefs.find((b) => b.Surface?.toLowerCase() === surface.id)
    if (!brief) {
      errors.push(`${where} is a protected surface. Add a Surface change brief to the PR description: Surface: ${surface.id}, Kind (evolve|rearchitect), Intent (Frank's words or task link), Keeps ("job: how it survives" for each of: ${surface.jobs.join(', ')}; separate with ;), Changes, Evidence (preview URL, screenshots, measurements).`)
      if (surface.policy === 'locked') needsApproval = true
      continue
    }
    for (const field of FIELDS.slice(2)) if (!filled(brief[field])) errors.push(`${surface.id}: brief field ${field} is empty or a placeholder.`)
    if (!KINDS.includes(String(brief.Kind).toLowerCase())) errors.push(`${surface.id}: Kind must be evolve or rearchitect, got "${brief.Kind ?? ''}".`)
    const unkept = unkeptJobs(brief.Keeps, surface.jobs)
    if (unkept.length) errors.push(`${surface.id}: Keeps must say how each job survives ("job: explanation"); not explained or described as removed: ${unkept.join(', ')}.`)
    const gated = surface.policy === 'locked' || String(brief.Kind).toLowerCase() === 'rearchitect'
    if (!gated) continue
    needsApproval = true
    if (approved) continue
    const reason = surface.policy === 'locked' ? `${surface.id} is locked: any change` : `${surface.id}: a rearchitect change`
    if (staleApproval && labels.includes(APPROVAL_LABEL)) errors.push(`${surface.id}: ${APPROVAL_LABEL} was given for an earlier head; new commits need Frank to review and re-apply it.`)
    else if (labels.includes(APPROVAL_LABEL)) errors.push(`${surface.id}: ${APPROVAL_LABEL} was applied by ${approvedBy ?? 'an unknown actor'}; only ${approvers.join(', ')} can approve.`)
    else errors.push(`${reason} needs ${approvers.join(', ')}'s ${APPROVAL_LABEL} label.`)
  }
  return { touched: touched.map(({ surface, files }) => ({ id: surface.id, files })), errors, needsApproval, staleApproval: staleApproval && labels.includes(APPROVAL_LABEL) }
}

const git = (...args) => execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })

/** Who added the current surface-approved label: the last `labeled` event for it. */
async function labelActor() {
  if (!process.env.GITHUB_TOKEN) return {}
  const events = []
  for (let page = 1; page <= 10; page++) {
    const response = await fetch(`https://api.github.com/repos/${process.env.GITHUB_REPOSITORY}/issues/${process.env.PR_NUMBER}/events?per_page=100&page=${page}`, {
      headers: { authorization: `bearer ${process.env.GITHUB_TOKEN}`, accept: 'application/vnd.github+json' },
    })
    const batch = await response.json()
    if (!Array.isArray(batch)) break
    events.push(...batch)
    if (batch.length < 100) break
  }
  const last = events.filter((e) => e.event === 'labeled' && e.label?.name === APPROVAL_LABEL).at(-1)
  return { approvedBy: last?.actor?.login, approvedAt: last?.created_at }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  // Runs from the base branch (pull_request_target): PR_HEAD is fetched as data and never executed.
  const head = process.env.PR_HEAD || 'HEAD'
  const mergeBase = git('merge-base', `origin/${process.env.GITHUB_BASE_REF || 'main'}`, head).trim()
  // --no-renames: a file moved out of a protected path shows as a deletion there.
  const changed = git('diff', '--no-renames', '--name-only', mergeBase, head).split('\n').filter(Boolean)
  let baseRegistry = null
  try {
    // Policy from the base tip, not the merge base: a surface protected after the PR branched still applies.
    baseRegistry = JSON.parse(git('show', `origin/${process.env.GITHUB_BASE_REF || 'main'}:${REGISTRY_PATH}`))
  } catch {
    // The base has no registry yet: this PR introduces the gates.
  }
  // The head's registry matters only while the base has none (the PR introducing the gates); a PR branched before
  // the registry existed must still be judged, not crash on a missing file.
  const registry = baseRegistry ?? JSON.parse(git('show', `${head}:${REGISTRY_PATH}`))
  const labels = String(process.env.PR_LABELS ?? '').split(',').map((l) => l.trim()).filter(Boolean)
  const { approvedBy, approvedAt } = labels.includes(APPROVAL_LABEL) ? await labelActor() : {}
  const headCommittedAt = new Date(Number(git('log', '-1', '--format=%ct', head).trim()) * 1000).toISOString()
  const result = evaluateSurfaces({ registry, baseRegistry, changed, body: process.env.PR_BODY, labels, eventAction: process.env.EVENT_ACTION, approvedBy, approvedAt, headCommittedAt })
  if (!result.touched.length) console.log('[surface-guard] No protected surface touched.')
  for (const t of result.touched) console.log(`[surface-guard] touches ${t.id}: ${t.files.join(', ')}`)
  for (const error of result.errors) console.error(`[surface-guard] ${error}`)
  if (result.errors.length) {
    console.error('[surface-guard] Protected surfaces are evolved, not replaced. See .github/protected-surfaces.json and docs/strategy/HOMEPAGE-PRESERVATION-CONTRACT.md.')
    process.exitCode = 1
  } else if (result.touched.length) console.log('[surface-guard] Brief complete. The reviewer checks the diff against it.')
}
