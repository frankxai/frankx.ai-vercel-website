import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { isWealthAdmin, parseWealthData } from '../../lib/wealth-data.ts'

// Synthetic fixture; never load the historical personal financial records.
const valid = () => ({
  netWorth: { current: 1, history: [{ date: '2026-01-01', amount: 1 }] },
  fireTarget: { annualExpenses: 1, multiple: 1, target: 1, currentProgress: 1, progressPercent: 1 },
  propertyTargets: [{ id: 'fixture', type: 'fixture', targetArea: 'fixture', budgetRange: { min: 1, max: 2 }, targetTimeline: 'fixture', status: 'fixture', notes: '' }],
  propertyWatchlist: [{ area: 'fixture', avgPriceM2: 1, trend: 'fixture' }],
  taxStrategy: { fixture: 'fixture' }, income: { fixture: null }, expenses: { monthly: { fixture: null } },
})
test('only the configured admin identity can access data', () => {
  for (const session of [null, {}, { user: null }, { user: {} }, { user: { email: 'other@example.invalid' } }]) {
    assert.equal(isWealthAdmin(session, 'owner@example.invalid'), false)
  }
  const session = { user: { email: 'owner@example.invalid' } }
  assert.equal(isWealthAdmin(session, undefined), false)
  assert.equal(isWealthAdmin(session, ' '), false)
  assert.equal(isWealthAdmin(session, 'owner@example.invalid'), true)
})
test('missing, broken, oversized and incomplete payloads fail closed', () => {
  for (const raw of [undefined, '', '{', 'null', '[]', '{}', JSON.stringify('x'.repeat(256_001))]) assert.equal(parseWealthData(raw), null)
})
test('valid nested synthetic data is accepted', () => assert.deepEqual(parseWealthData(JSON.stringify(valid())), valid()))
for (const field of ['netWorth', 'fireTarget', 'propertyTargets', 'propertyWatchlist', 'taxStrategy', 'income', 'expenses']) {
  test(`invalid ${field} is rejected`, () => {
    const value = valid(); value[field] = null
    assert.equal(parseWealthData(JSON.stringify(value)), null)
  })
}
test('nested type mismatches and non-finite numbers are rejected', () => {
  const bad = [
    value => { value.netWorth.history[0].amount = '1' },
    value => { value.propertyTargets[0].budgetRange.min = null },
    value => { value.propertyWatchlist[0].avgPriceM2 = false },
    value => { value.expenses.monthly.fixture = {} },
    value => { value.taxStrategy.fixture = [] },
    value => { value.income.fixture = true },
  ]
  for (const mutate of bad) { const value = valid(); mutate(value); assert.equal(parseWealthData(JSON.stringify(value)), null) }
  assert.equal(parseWealthData(JSON.stringify(valid()).replace('"current":1', '"current":1e400')), null)
})
test('page authorizes before reading financial configuration and stays dynamic', () => {
  const source = readFileSync(new URL('../../app/admin/wealth/page.tsx', import.meta.url), 'utf8')
  assert.ok(source.indexOf('isWealthAdmin(await auth()') < source.indexOf('parseWealthData(process.env.WEALTH_OPS_JSON)'))
  assert.match(source, /export const dynamic = 'force-dynamic'/)
  assert.doesNotMatch(source, /import .*wealth-ops\.json/)
})
