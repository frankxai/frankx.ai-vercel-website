import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

import { formatAsOfDate, formatLedgerTimestamp, parseProofLedger, scopeLabel } from '../../lib/proof/claims.ts'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const seed = JSON.parse(fs.readFileSync(path.join(root, 'data/proof/claims.json'), 'utf8'))
const clone = () => structuredClone(seed)

test('the committed ledger passes the runtime check unchanged', () => {
  const result = parseProofLedger(seed)
  assert.equal(result.ok, true)
  assert.deepEqual(result.ledger, seed, 'the guard must not alter any value it renders')
})

test('an empty claims list is valid, not an error', () => {
  const data = clone()
  data.claims = []
  const result = parseProofLedger(data)
  assert.equal(result.ok, true)
  assert.equal(result.ledger.claims.length, 0)
})

test('an unknown schema_version fails calmly with a reason', () => {
  for (const version of [2, '1', 0, undefined]) {
    const data = clone()
    data.schema_version = version
    const result = parseProofLedger(data)
    assert.equal(result.ok, false)
    assert.match(result.reason, /schema version/)
  }
})

test('malformed shapes fail without throwing', () => {
  const cases = [
    null,
    'not json',
    [],
    { ...clone(), claims: 'nope' },
    { ...clone(), does_not_claim: [1] },
    { ...clone(), generated_at: 'yesterday' },
    { ...clone(), claims: [null] },
    { ...clone(), claims: [{ ...seed.claims[0], text: '' }] },
    { ...clone(), claims: [{ ...seed.claims[0], method: 42 }] },
    { ...clone(), claims: [{ ...seed.claims[0], as_of: '22/10/2026' }] },
    { ...clone(), claims: [{ ...seed.claims[0], as_of: '2026-13-45' }] },
  ]
  for (const input of cases) {
    const result = parseProofLedger(input)
    assert.equal(result.ok, false, `expected failure for ${JSON.stringify(input)?.slice(0, 80)}`)
    assert.equal(typeof result.reason, 'string')
  }
})

test('an unknown scope is accepted and renders as its raw value', () => {
  const data = clone()
  data.claims[0].scope = 'brand-new-scope'
  const result = parseProofLedger(data)
  assert.equal(result.ok, true)
  assert.equal(scopeLabel(result.ledger.claims[0].scope), 'brand-new-scope')
  assert.equal(scopeLabel('constructor'), 'constructor')
})

test('known scopes map to plain labels', () => {
  assert.equal(scopeLabel('codex-cli-local'), 'Codex CLI, one machine')
  assert.equal(scopeLabel('chatgpt-account-export'), 'ChatGPT account export')
  assert.equal(scopeLabel('codex-cloud'), 'Codex cloud tasks')
  assert.equal(scopeLabel('claude-code-usage'), 'Claude Code usage')
  assert.equal(scopeLabel('github-reviews'), 'GitHub reviews')
  assert.equal(scopeLabel('other-stated'), 'As stated')
})

test('dates format in UTC without a day shift', () => {
  assert.equal(formatLedgerTimestamp('2026-10-22T20:06:04.534Z'), '22 October 2026, 20:06 UTC')
  assert.equal(formatAsOfDate('2026-10-22'), '22 October 2026')
})
