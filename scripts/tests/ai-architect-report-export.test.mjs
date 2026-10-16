import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'

import {
  copyReviewReport,
  createCopyAttemptGuard,
  REPORT_FORMAT,
  RUBRIC_SOURCE,
  withReportProvenance,
} from '../../lib/ai-architect/report-export.ts'

test('blocked clipboard keeps the report recoverable and records no successful copy', async () => {
  const report = withReportProvenance('## Architecture review\nTrust boundary — OPEN')
  const events = []
  const clipboard = { writeText: async () => { throw new Error('NotAllowedError') } }
  assert.equal(await copyReviewReport(report, clipboard, () => events.push('copied')), 'manual')
  assert.deepEqual(events, [])
  assert.ok(report.includes('Trust boundary — OPEN'))
  assert.ok(report.includes('self-reported answers'))
})

test('successful copy is recorded only after the clipboard promise resolves', async () => {
  let resolve
  let copiedText
  const events = []
  const clipboard = { writeText: (text) => {
    copiedText = text
    return new Promise((done) => { resolve = done })
  } }
  const attempt = copyReviewReport('portable report', clipboard, () => events.push('copied'))
  assert.deepEqual(events, [])
  resolve()
  assert.equal(await attempt, 'copied')
  assert.equal(copiedText, 'portable report')
  assert.deepEqual(events, ['copied'])
})

test('unavailable clipboard or an incomplete report never emits a successful copy', async () => {
  const events = []
  assert.equal(await copyReviewReport('report', undefined, () => events.push('copied')), 'manual')
  assert.equal(await copyReviewReport('', { writeText: async () => {} }, () => events.push('copied')), 'manual')
  assert.deepEqual(events, [])
})

test('copied markdown preserves the exact answers, source revision and limitations', async () => {
  const body = '## Architecture review — self-run, 2026-10-16\n\nTrust boundary — OPEN\nLong-run home — MADE'
  const report = withReportProvenance(body)
  let copiedText
  await copyReviewReport(report, { writeText: async (text) => { copiedText = text } }, () => {})
  assert.equal(copiedText, report)
  assert.ok(report.startsWith(body))
  assert.ok(report.includes(REPORT_FORMAT))
  assert.ok(report.includes(RUBRIC_SOURCE))
  assert.ok(report.includes('self-reported answers'))
  assert.ok(report.includes('remain unassessed'))
})

test('a stalled clipboard reveals manual recovery without counting a late success', async () => {
  let resolve
  const events = []
  const clipboard = { writeText: () => new Promise((done) => { resolve = done }) }
  assert.equal(await copyReviewReport('report', clipboard, () => events.push('copied'), 5), 'manual')
  resolve()
  await Promise.resolve()
  assert.deepEqual(events, [])
})

// Execute the actual component handler without React or a simulated clipboard
// implementation. This catches wiring mistakes around edits/reset and old timers.
const runnerSource = readFileSync(new URL('../../app/ai-architect/ReviewRunner.tsx', import.meta.url), 'utf8')
const handlerBody = runnerSource.split('const copyReport = async () => {')[1]
  .split('\n  const reset =')[0].replace(/\n  }\s*$/, '')
const runHandler = new Function('copyReviewReport', 'copyAttempt', 'trackEvent', 'navigator',
  'report', 'setCopyState', 'setTimeout', `return (async () => {${handlerBody}})()`)

test('edited/reset answers invalidate late clipboard results in the actual UI handler', async () => {
  for (const outcome of ['resolve', 'reject']) {
    let settle
    const events = [], states = []
    const copyAttempt = { current: createCopyAttemptGuard() }
    const clipboard = { writeText: () => new Promise((resolve, reject) => {
      settle = outcome === 'resolve' ? resolve : () => reject(new Error('denied'))
    }) }
    const attempt = runHandler(copyReviewReport, copyAttempt, (name) => events.push(name),
      { clipboard }, 'older answers', (state) => states.push(state), () => {})
    copyAttempt.current.invalidate()
    settle()
    await attempt
    assert.deepEqual(states, [])
    assert.deepEqual(events, [])
  }
})

test('an earlier success timer cannot erase a later UI operation', async () => {
  const states = [], timers = []
  const copyAttempt = { current: createCopyAttemptGuard() }
  const invoke = (clipboard) => runHandler(copyReviewReport, copyAttempt, () => {},
    { clipboard }, 'report', (state) => states.push(state), (timer) => timers.push(timer))
  await invoke({ writeText: async () => {} })
  await invoke({ writeText: async () => { throw new Error('denied') } })
  timers[0]()
  assert.deepEqual(states, ['copied', 'manual'])
})
