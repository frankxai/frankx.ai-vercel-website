#!/usr/bin/env node
// Confirms, at the source, that every license string fetch-external.mjs declares
// is actually the license that source publishes.
//
// assertProvenance() in fetch-external.mjs checks that a license string is
// PRESENT on every figure. It cannot check that the string is TRUE — a confident
// wrong license passes it and ships to a public page. This closes that gap.
//
// Each source declares license_evidence_url + license_marker. This fetches the
// evidence URL and requires the marker to appear in it. A null marker means the
// terms have never been read at source, and is a failure, not a skip: it is how
// "nobody has checked this" is prevented from silently becoming "this is fine."
//
// Needs egress, so it runs on the Actions runner — the dev sandbox blocks these
// hosts. intelligence-refresh.yml runs it BEFORE the fetch, so a snapshot PR can
// never be opened under an unverified license.
//
//   node scripts/intelligence/verify-licenses.mjs              # fails on any problem
//   node scripts/intelligence/verify-licenses.mjs --report-only # prints, exits 0

import { readFile } from 'node:fs/promises'

const REPORT_ONLY = process.argv.includes('--report-only')
const TIMEOUT_MS = 15000

// Read the declarations out of the fetcher rather than duplicating them, so the
// two can never drift apart into disagreeing about what a source claims.
async function loadSources() {
  const src = await readFile(new URL('./fetch-external.mjs', import.meta.url), 'utf8')
  const block = src.match(/const SOURCES = \[([\s\S]*?)\n\]/)
  if (!block) throw new Error('could not locate the SOURCES array in fetch-external.mjs')
  const sources = []
  for (const entry of block[1].split(/\n  \{/).slice(1)) {
    const pick = (k) => {
      const m = entry.match(new RegExp(`${k}: '([^']*)'`))
      return m ? m[1] : null
    }
    const nullMarker = /license_marker: null/.test(entry)
    sources.push({
      id: pick('id'),
      license: pick('license'),
      evidenceUrl: pick('license_evidence_url'),
      marker: nullMarker ? null : pick('license_marker'),
    })
  }
  return sources
}

async function fetchText(url) {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: { 'user-agent': 'frankx.ai license verifier (https://frankx.ai)' },
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.text()
  } finally {
    clearTimeout(timer)
  }
}

const results = []
for (const s of await loadSources()) {
  if (!s.evidenceUrl) {
    results.push({ ...s, state: 'NO_EVIDENCE_URL', detail: 'source declares no license_evidence_url' })
    continue
  }
  if (s.marker === null) {
    results.push({
      ...s,
      state: 'UNVERIFIED',
      detail: `license_marker is null — the terms at ${s.evidenceUrl} have not been read and confirmed`,
    })
    continue
  }
  try {
    const body = await fetchText(s.evidenceUrl)
    const found = body.toLowerCase().includes(s.marker.toLowerCase())
    results.push({
      ...s,
      state: found ? 'CONFIRMED' : 'MISMATCH',
      detail: found ? `"${s.marker}" present at source` : `"${s.marker}" NOT found at ${s.evidenceUrl}`,
    })
  } catch (e) {
    // An unreachable evidence page is not proof of anything, so it cannot pass.
    results.push({ ...s, state: 'UNREACHABLE', detail: `could not fetch evidence: ${e.message || e}` })
  }
}

// UNVERIFIED is a hold, not a failure: ingest is already blocked for it.
const ICON = { CONFIRMED: 'ok  ', UNVERIFIED: 'hold', MISMATCH: 'FAIL', UNREACHABLE: 'FAIL', NO_EVIDENCE_URL: 'FAIL' }
for (const r of results) {
  console.log(`[${ICON[r.state]}] ${r.id} — ${r.state}\n         declares: ${r.license}\n         ${r.detail}`)
}

// Two different failures, and only one of them is dangerous.
//
// UNVERIFIED (marker null) means nobody claimed to have read the terms — and
// fetch-external.mjs already refuses to ingest such a source, so the run is safe
// to continue. Reported, not fatal.
//
// MISMATCH / UNREACHABLE with a non-null marker means someone DID claim the
// terms say X and that claim could not be confirmed. That is an active wrong
// licence heading for a public page, so it fails closed.
const dangerous = results.filter((r) => r.state === 'MISMATCH' || r.state === 'NO_EVIDENCE_URL' || (r.state === 'UNREACHABLE' && r.marker !== null))
const unverified = results.filter((r) => r.state === 'UNVERIFIED')
const confirmed = results.filter((r) => r.state === 'CONFIRMED')

console.log(`\n${confirmed.length} confirmed · ${unverified.length} unverified (ingest blocked) · ${dangerous.length} unconfirmable claim(s).`)

if (unverified.length) {
  console.log(
    `Unverified sources are not ingested: ${unverified.map((u) => u.id).join(', ')}.\n` +
      'To enable one, read the terms at its license_evidence_url and set license_marker\n' +
      'to a substring that page actually contains — or move it to LINK_ONLY if the terms\n' +
      'do not permit redistribution. Do not set a marker you have not read.',
  )
}

if (!dangerous.length) process.exit(0)

console.error(`\nFAIL — ${dangerous.length} declared licence(s) could not be confirmed at source: ${dangerous.map((f) => f.id).join(', ')}`)
console.error('A declared licence that does not match its source is a licensing violation in waiting. Fix the declaration or drop the source.')
process.exit(REPORT_ONLY ? 0 : 1)
