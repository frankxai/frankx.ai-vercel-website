import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import test from 'node:test'
import { promisify } from 'node:util'

const execFileAsync = promisify(execFile)

test('analytics-cli outputs valid JSON payload for summary mode', async () => {
  const { stdout } = await execFileAsync('node', [
    'scripts/observability/analytics-cli.mjs',
    '--json',
  ])

  const data = JSON.parse(stdout)
  assert.ok(data.gsc, 'gsc payload exists')
  assert.ok(data.ga4, 'ga4 payload exists')

  // GSC assertions
  assert.equal(typeof data.gsc.totalClicks, 'number')
  assert.equal(typeof data.gsc.totalImpressions, 'number')
  assert.equal(typeof data.gsc.averageCtr, 'number')
  assert.equal(typeof data.gsc.averagePosition, 'number')
  assert.ok(Array.isArray(data.gsc.topQueries), 'topQueries is an array')
  assert.ok(Array.isArray(data.gsc.opportunities), 'opportunities is an array')

  // GA4 assertions
  assert.equal(typeof data.ga4.totalUsers, 'number')
  assert.equal(typeof data.ga4.activeUsers, 'number')
  assert.equal(typeof data.ga4.pageviews, 'number')
  assert.ok(Array.isArray(data.ga4.topPages), 'topPages is an array')
  assert.ok(Array.isArray(data.ga4.sources), 'sources is an array')
})

test('analytics-cli outputs valid JSON for GSC mode', async () => {
  const { stdout } = await execFileAsync('node', [
    'scripts/observability/analytics-cli.mjs',
    '--gsc',
    '--json',
  ])

  const data = JSON.parse(stdout)
  assert.equal(typeof data.totalClicks, 'number')
  assert.ok(Array.isArray(data.topQueries))
})

test('analytics-cli outputs valid JSON for GA4 mode', async () => {
  const { stdout } = await execFileAsync('node', [
    'scripts/observability/analytics-cli.mjs',
    '--ga4',
    '--json',
  ])

  const data = JSON.parse(stdout)
  assert.equal(typeof data.totalUsers, 'number')
  assert.ok(Array.isArray(data.topPages))
})
