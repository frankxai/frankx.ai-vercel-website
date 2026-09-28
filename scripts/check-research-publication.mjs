import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const registry = JSON.parse(fs.readFileSync(path.join(root, 'data/research/approved-claims.json'), 'utf8'))

export function validateApprovedClaims(input) {
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
        let url
        try { url = new URL(source.url) } catch { /* reported below */ }
        if (!url || url.protocol !== 'https:' ||
            url.hostname === 'scholar.google.com' ||
            url.hostname === 'www.google.com' ||
            url.hostname === 'arxiv.org' && url.pathname.startsWith('/search') ||
            url.hostname === 'frankx.ai' || url.hostname === 'www.frankx.ai' ||
            /\/search(?:\/|$)/.test(url.pathname)) {
          errors.push(`${q}: provide the individual publication or benchmark URL, not search or self-reference`)
        }
        if (typeof source.title !== 'string' || source.title.trim().length < 5) errors.push(`${q}: source title required`)
        if (typeof source.locator !== 'string' || source.locator.trim().length < 4) errors.push(`${q}: exact section, page, table or run locator required`)
        if (!['journal', 'preprint', 'official-report', 'benchmark', 'documentation'].includes(source.type)) {
          errors.push(`${q}: explicit source type required`)
        }
      }
    }
    if (item.status === 'independently-replicated' && (item.sources?.length ?? 0) < 2) {
      errors.push(`${p}: replication needs independent source records and an experiment receipt`)
    }
    if (item.status === 'independently-replicated' && !item.replicationReceipt) {
      errors.push(`${p}: replication receipt required`)
    }
    if (typeof item.reviewedBy !== 'string' || item.reviewedBy.trim().length < 3 ||
        /^(ai|agent|bot|llm|gpt|claude|codex)$/i.test(item.reviewedBy.trim())) {
      errors.push(`${p}: named human reviewer required`)
    }
    if (typeof item.draftedBy !== 'string' || item.draftedBy.trim().length < 3 ||
        item.draftedBy.trim() === item.reviewedBy?.trim()) {
      errors.push(`${p}: drafter and reviewer must be distinct`)
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(item.reviewedAt ?? '') ||
        Number.isNaN(Date.parse(item.reviewedAt)) ||
        new Date(item.reviewedAt).toISOString().slice(0, 10) !== item.reviewedAt) {
      errors.push(`${p}: valid review date required`)
    }
    if (typeof item.reviewReceipt !== 'string' || !/[0-9a-f]{40}/.test(item.reviewReceipt)) {
      errors.push(`${p}: review receipt must bind a full commit SHA`)
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
