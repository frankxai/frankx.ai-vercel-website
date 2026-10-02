import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const registry = JSON.parse(fs.readFileSync(path.join(root, 'data/research/approved-claims.json'), 'utf8'))

const normalizedIdentity = (value) => String(value ?? '').normalize('NFKC').trim().replace(/\s+/g, ' ').toLocaleLowerCase('en')

function isDirectSourceUrl(value) {
  if (typeof value !== 'string') return false
  let url
  try { url = new URL(value) } catch { return false }
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash) return false
  const host = url.hostname.toLowerCase()
  if (host === 'frankx.ai' || host.endsWith('.frankx.ai') ||
      host.startsWith('search.') || host.startsWith('scholar.') ||
      host === 'google.com' || host.endsWith('.google.com') ||
      host === 'bing.com' || host.endsWith('.bing.com')) return false
  if (url.pathname === '/' || /\/(search|scholar|results?|queries)(?:\/|$)/i.test(url.pathname)) return false
  return true
}

// External attestation verification is deliberately absent from the build.
// A nonempty ledger cannot pass until a separate release service verifies
// review identity, PR decision and the exact reviewed revision.
export function validateApprovedClaims(input, options = {}) {
  const errors = []
  if (input?.schemaVersion !== 1 || !Array.isArray(input.claims)) {
    return ['Expected schemaVersion 1 and a claims array']
  }
  const ids = new Set()
  for (const [index, item] of input.claims.entries()) {
    const p = `claims[${index}]`
    if (!item || typeof item !== 'object') {
      errors.push(`${p}: expected an object`)
      continue
    }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.id ?? '') || ids.has(item.id)) {
      errors.push(`${p}: missing or duplicate stable id`)
    }
    ids.add(item.id)
    if (typeof item.text !== 'string' || item.text.trim().length < 20) errors.push(`${p}: claim text is required`)
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.domain ?? '')) errors.push(`${p}: domain slug is required`)
    for (const field of ['question', 'scope', 'method', 'inclusionCriteria', 'exclusionCriteria',
      'limitations', 'contraryEvidence', 'correctionCheck', 'rightsDecision']) {
      if (typeof item.dossier?.[field] !== 'string' || item.dossier[field].trim().length < 20) {
        errors.push(`${p}: dossier ${field} required`)
      }
    }
    if (!['supported-synthesis', 'vendor-claim', 'preprint-finding', 'independently-replicated'].includes(item.status)) {
      errors.push(`${p}: unsupported publication status`)
    }
    if (!Array.isArray(item.sources) || item.sources.length === 0) {
      errors.push(`${p}: at least one direct source is required`)
    } else {
      for (const [sIndex, source] of item.sources.entries()) {
        const q = `${p}.sources[${sIndex}]`
        if (!source || typeof source !== 'object') {
          errors.push(`${q}: source record required`)
          continue
        }
        if (!isDirectSourceUrl(source.url)) {
          errors.push(`${q}: provide the individual publication or benchmark URL, not search or self-reference`)
        }
        if (typeof source.title !== 'string' || source.title.trim().length < 5) errors.push(`${q}: source title required`)
        if (typeof source.locator !== 'string' || source.locator.trim().length < 4) errors.push(`${q}: exact section, page, table or run locator required`)
        if (typeof source.version !== 'string' || source.version.trim().length < 4) errors.push(`${q}: source version required`)
        if (!['journal', 'preprint', 'official-report', 'benchmark', 'documentation'].includes(source.type)) {
          errors.push(`${q}: explicit source type required`)
        }
      }
    }
    if (item.status === 'independently-replicated') {
      const sources = Array.isArray(item.sources) ? item.sources : []
      if (sources.length < 2 || sources.some((source) =>
        typeof source?.studyId !== 'string' || !source.studyId.trim() ||
        typeof source?.organization !== 'string' || !source.organization.trim()) ||
        new Set(sources.map((source) => String(source?.url ?? '').toLowerCase().replace(/\/$/, ''))).size < 2 ||
        new Set(sources.map((source) => normalizedIdentity(source?.studyId ?? ''))).size < 2 ||
        new Set(sources.map((source) => normalizedIdentity(source?.organization ?? ''))).size < 2) {
        errors.push(`${p}: replication requires two distinct studies and independent organizations`)
      }
      const receipt = item.replicationReceipt
      if (!receipt || typeof receipt !== 'object' ||
          !isDirectSourceUrl(receipt.protocolUrl) || !isDirectSourceUrl(receipt.resultUrl) ||
          typeof receipt.team !== 'string' || !receipt.team.trim() ||
          typeof receipt.performedAt !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(receipt.performedAt) ||
          Number.isNaN(Date.parse(receipt.performedAt)) ||
          new Date(receipt.performedAt).toISOString().slice(0, 10) !== receipt.performedAt ||
          normalizedIdentity(receipt.team) === normalizedIdentity(sources[0]?.organization ?? '') ||
          normalizedIdentity(receipt.team) !== normalizedIdentity(sources[1]?.organization ?? '')) {
        errors.push(`${p}: structured independent replication receipt required`)
      }
    }
    if (typeof item.reviewedBy !== 'string' || item.reviewedBy.trim().length < 3 ||
        /\b(ai|agent|bot|llm|gpt|claude|codex)(?:[-\d]|\b)/i.test(item.reviewedBy.trim())) {
      errors.push(`${p}: named human reviewer required`)
    }
    if (typeof item.draftedBy !== 'string' || item.draftedBy.trim().length < 3 ||
        normalizedIdentity(item.draftedBy) === normalizedIdentity(item.reviewedBy ?? '')) {
      errors.push(`${p}: drafter and reviewer must be distinct`)
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(item.reviewedAt ?? '') ||
        Number.isNaN(Date.parse(item.reviewedAt)) ||
        new Date(item.reviewedAt).toISOString().slice(0, 10) !== item.reviewedAt ||
        item.reviewedAt > new Date().toISOString().slice(0, 10)) {
      errors.push(`${p}: valid review date required`)
    }
    const receipt = item.reviewReceipt
    if (!receipt || typeof receipt !== 'object' ||
        receipt.repository !== 'frankxai/frankx.ai-vercel-website' ||
        !/^[0-9a-f]{40}$/.test(receipt.headSha ?? '') ||
        !Number.isSafeInteger(receipt.prNumber) || receipt.prNumber < 1 ||
        !Number.isSafeInteger(receipt.reviewId) || receipt.reviewId < 1 ||
        typeof receipt.reviewerLogin !== 'string' || !receipt.reviewerLogin.trim() ||
        typeof receipt.reviewedAt !== 'string' || receipt.reviewedAt !== item.reviewedAt) {
      errors.push(`${p}: structured review receipt with exact head and reviewer required`)
    }
    if (typeof options.verifyReviewReceipt !== 'function' ||
        !options.verifyReviewReceipt(receipt, item)) {
      errors.push(`${p}: external review attestation not verified; publication held`)
    }
  }
  return errors
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const errors = validateApprovedClaims(registry)
  if (errors.length) {
    console.error(errors.join('\n'))
    process.exitCode = 1
  } else {
    console.log(`Research publication gate: ${registry.claims.length} reviewed claims`)
  }
}
