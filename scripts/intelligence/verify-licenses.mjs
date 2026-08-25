#!/usr/bin/env node
// Verify exact licence evidence declared in source-policy.json.
// Confirmed ingest sources pin the SHA-256 of a bounded evidence document;
// unverified/blocked/revoked sources remain ineligible without any network call.

import { readFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { fetchBytesBounded, sha256 } from './network-safety.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..', '..')
const argv = process.argv.slice(2)
const REPORT_ONLY = argv.includes('--report-only')
const ALLOW_HTTP_FOR_TESTS = argv.includes('--allow-http-for-tests')
const policyIndex = argv.indexOf('--policy')
const policyPath = resolve(ROOT, policyIndex === -1 ? 'data/intelligence/source-policy.json' : argv[policyIndex + 1])
const policy = JSON.parse(await readFile(policyPath, 'utf8'))

if (policy.schema !== 'frankx/intelligence-source-policy@1' || !Array.isArray(policy.sources)) {
  throw new Error('invalid declarative source policy')
}

const results = []
for (const source of policy.sources.filter((candidate) => candidate.mode === 'ingest')) {
  const license = source.license || {}
  if (!source.enabled) {
    results.push({ id: source.id, state: 'SKIPPED', detail: 'disabled by policy' })
    continue
  }
  if (license.state !== 'confirmed' || license.redistribution_permitted !== true) {
    results.push({
      id: source.id,
      state: license.state === 'revoked' ? 'REVOKED' : license.state === 'blocked' ? 'BLOCKED' : 'UNVERIFIED',
      detail: `policy state is ${license.state}; ingest remains blocked`,
    })
    continue
  }
  if (!license.notice || !Array.isArray(license.evidence) || !license.evidence.length) {
    results.push({ id: source.id, state: 'INVALID_POLICY', detail: 'confirmed source lacks a licence notice or evidence documents' })
    continue
  }

  const confirmed = []
  let failure = null
  for (const document of license.evidence) {
    if (
      typeof document?.role !== 'string' || !document.role ||
      typeof document?.url !== 'string' || !Array.isArray(document.allowed_hosts) ||
      !/^[a-f0-9]{64}$/.test(document.sha256 || '')
    ) {
      failure = { state: 'INVALID_POLICY', detail: 'evidence document lacks role/URL/hosts/SHA-256' }
      break
    }
    try {
      const evidence = await fetchBytesBounded(document.url, {
        allowedHosts: document.allowed_hosts,
        maxBytes: 65536,
        maxRedirects: policy.defaults?.max_redirects ?? 2,
        timeoutMs: policy.defaults?.timeout_ms ?? 15000,
        headers: { 'user-agent': 'frankx.ai licence verifier (https://frankx.ai)' },
        allowHttp: ALLOW_HTTP_FOR_TESTS,
      })
      const actual = sha256(evidence.bytes)
      if (actual !== document.sha256) {
        failure = {
          state: 'MISMATCH',
          detail: `${document.role}: expected ${document.sha256}; received ${actual}`,
        }
        break
      }
      confirmed.push(`${document.role} at ${evidence.finalUrl}`)
    } catch (error) {
      failure = { state: 'UNREACHABLE', detail: `${document.role}: ${String(error.message || error)}` }
      break
    }
  }
  results.push(failure || {
    id: source.id,
    state: 'CONFIRMED',
    detail: `${confirmed.length} exact evidence document(s) confirmed: ${confirmed.join('; ')}`,
  })
  if (failure) results[results.length - 1].id = source.id
}

const icons = {
  CONFIRMED: 'ok  ', UNVERIFIED: 'hold', BLOCKED: 'hold', REVOKED: 'hold', SKIPPED: 'skip',
  MISMATCH: 'FAIL', UNREACHABLE: 'FAIL', INVALID_POLICY: 'FAIL',
}
for (const result of results) {
  console.log(`[${icons[result.state]}] ${result.id} — ${result.state}\n         ${result.detail}`)
}

const dangerous = results.filter((result) => ['MISMATCH', 'UNREACHABLE', 'INVALID_POLICY'].includes(result.state))
const held = results.filter((result) => ['UNVERIFIED', 'BLOCKED', 'REVOKED'].includes(result.state))
console.log(`\n${results.filter((result) => result.state === 'CONFIRMED').length} confirmed · ${held.length} policy hold(s) · ${dangerous.length} failed evidence check(s).`)
if (held.length) console.log(`Held sources are not ingested: ${held.map((result) => result.id).join(', ')}.`)
if (dangerous.length) {
  console.error(`FAIL — confirmed licence evidence did not verify for: ${dangerous.map((result) => result.id).join(', ')}`)
  process.exit(REPORT_ONLY ? 0 : 1)
}
