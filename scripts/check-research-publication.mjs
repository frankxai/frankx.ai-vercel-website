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

const PRIMARY_URL = /doi\.org\/|pubmed\.ncbi\.nlm\.nih\.gov\/|arxiv\.org\/(?:abs|pdf)\//i
const SEARCH_URL = /scholar\.google|arxiv\.org\/search|bing\.com\/search/i
const SELF_URL = /frankx\.ai\/research\/|^\/research\//i
const DATA_EXPORTS = ['domainSources', 'validatedClaims', 'researchBriefs']

function sliceLiteral(text, name) {
  const marker = text.indexOf(`export const ${name}`)
  if (marker < 0) return null
  const eq = text.indexOf('=', marker)
  if (eq < 0) return null
  let i = eq + 1
  while (text[i] === ' ' || text[i] === '\n' || text[i] === '\r') i += 1
  const open = text[i]
  const close = open === '{' ? '}' : open === '[' ? ']' : ''
  if (!close) return null
  let depth = 0
  let quote = ''
  for (let j = i; j < text.length; j += 1) {
    const ch = text[j]
    if (quote) {
      if (ch === '\\') { j += 1; continue }
      if (ch === quote) quote = ''
      continue
    }
    if (ch === '"' || ch === "'") { quote = ch; continue }
    if (ch === open) depth += 1
    else if (ch === close) {
      depth -= 1
      if (depth === 0) return text.slice(i, j + 1)
    }
  }
  return null
}

function parseDataLiteral(literal) {
  try { return JSON.parse(literal) } catch { /* single quotes or bare keys */ }
  const normalized = literal
    .replace(/'([^'\\]*)'/g, (_, value) => JSON.stringify(value))
    .replace(/([{,]\s*)([A-Za-z_][A-Za-z0-9_]*)\s*:/g, '$1"$2":')
  return JSON.parse(normalized)
}

function isPrimary(url) {
  return PRIMARY_URL.test(url)
}

function hasPrimary(value) {
  if (typeof value?.url === 'string' && isPrimary(value.url)) return true
  return Array.isArray(value?.sources) && value.sources.some((source) => typeof source?.url === 'string' && isPrimary(source.url))
}

function walkEntry(value, where, errors) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => walkEntry(item, `${where}[${index}]`, errors))
    return
  }
  if (!value || typeof value !== 'object') return
  if (typeof value.url === 'string') {
    if (SEARCH_URL.test(value.url)) errors.push(`${where}: search URL`)
    if (SELF_URL.test(value.url)) errors.push(`${where}: self-referential citation`)
    if ((value.type === 'journal' || value.type === 'conference') && !isPrimary(value.url)) {
      errors.push(`${where}: type ${value.type} without a primary source id`)
    }
  }
  const backed = hasPrimary(value)
  if (value.confidence === 'high' && !backed) errors.push(`${where}: confidence high`)
  if (value.replicationStatus === 'replicated' && !backed) errors.push(`${where}: replicationStatus replicated`)
  if (value.evidenceQuality === 'rct' && !backed) errors.push(`${where}: evidenceQuality rct`)
  if (typeof value.crossRefCount === 'number' && value.crossRefCount > 0 && !backed) errors.push(`${where}: synthetic crossRefCount`)
  for (const [key, child] of Object.entries(value)) {
    if (typeof child === 'string' && /PhD-grade/i.test(child)) errors.push(`${where}: PhD-grade label`)
    if (child && typeof child === 'object') walkEntry(child, `${where}.${key}`, errors)
  }
}

function literalsIn(text) {
  const exported = DATA_EXPORTS.filter((name) => text.includes(`export const ${name}`))
  if (exported.length > 0) {
    return exported.map((name) => {
      const literal = sliceLiteral(text, name)
      if (!literal) throw new Error(`${name} is not a data literal`)
      return [name, literal]
    })
  }
  const trimmed = text.trim()
  if (trimmed.startsWith('{') || trimmed.startsWith('[')) return [['value', trimmed]]
  return []
}

export function findUnsupportedGeneratedGrades(files) {
  const errors = []
  for (const [label, text] of Object.entries(files)) {
    if (typeof text !== 'string') {
      errors.push(`${label}: missing text`)
      continue
    }
    let literals
    try {
      literals = literalsIn(text)
    } catch (error) {
      errors.push(`${label}: ${error.message}`)
      continue
    }
    for (const [name, literal] of literals) {
      try {
        walkEntry(parseDataLiteral(literal), `${label} ${name}`, errors)
      } catch {
        errors.push(`${label} ${name}: registry literal could not be parsed`)
      }
    }
  }
  return errors
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const errors = validateApprovedClaims(registry)
  const generated = findUnsupportedGeneratedGrades({
    'lib/research/sources.ts': fs.readFileSync(path.join(root, 'lib/research/sources.ts'), 'utf8'),
    'lib/research/validated-claims.ts': fs.readFileSync(path.join(root, 'lib/research/validated-claims.ts'), 'utf8'),
  })
  errors.push(...generated)
  if (errors.length) {
    console.error(errors.join('\n'))
    process.exitCode = 1
  } else {
    console.log(`Research publication gate: ${registry.claims.length} reviewed claims, generated grades clear`)
  }
}
