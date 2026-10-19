/**
 * Offline teaching lab. Node.js >=22, no packages, network or model calls.
 * In-memory fixtures only. This is not production auth or crash-safe storage.
 * Run: node lab.mjs   or   node --test lab.mjs
 */
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createHash } from 'node:crypto'

export function retrieveMemory(records, actor, now) {
  const nowMs = Date.parse(now)
  if (!Number.isFinite(nowMs)) throw new Error('Invalid retrieval time')
  return records.filter((record) => {
    const expiry = Date.parse(record.reviewDue)
    return actor.workspaces.includes(record.workspace)
      && record.audience.includes(actor.id)
      && record.status === 'accepted'
      && Number.isFinite(expiry) && nowMs < expiry
      && typeof record.source === 'string' && record.source.length > 0
  }).map((record) => ({ ...record, audience: [...record.audience] }))
}

export class VersionedRecord {
  #version = 0
  #value = null
  read() { return structuredClone({ version: this.#version, value: this.#value }) }
  propose(expectedVersion, value) {
    if (expectedVersion !== this.#version) return { accepted: false, reason: 'version_conflict', version: this.#version }
    this.#value = structuredClone(value)
    this.#version += 1
    return { accepted: true, version: this.#version }
  }
}

/** Same-process deduplication, including concurrent calls. Persist this in production. */
export class OperationLedger {
  #entries = new Map()
  async run(key, operation, execute) {
    const digest = createHash('sha256').update(JSON.stringify(operation)).digest('hex')
    const existing = this.#entries.get(key)
    if (existing) {
      if (existing.digest !== digest) throw new Error('Idempotency key reused for a different operation')
      return structuredClone(await existing.result)
    }
    const result = Promise.resolve().then(execute)
    this.#entries.set(key, { digest, result })
    // Retain failures: a side effect may have happened before acknowledgement.
    // A production reconciler must settle that ambiguity before any replay.
    return structuredClone(await result)
  }
}

/** This boundary uses caller context, not a model-provided permission flag. */
export function draftTool(actor, input, trace) {
  if (!actor.workspaces.includes(input.workspace) || !actor.tools.includes('create_draft')) {
    return { ok: false, reason: 'permission_denied' }
  }
  if (typeof input.title !== 'string' || !input.title.trim()) {
    return { ok: false, reason: 'invalid_input' }
  }
  const draft = { workspace: input.workspace, owner: actor.id, title: input.title, status: 'draft' }
  trace.push({ tool: 'create_draft', result: 'created', artifact: draft })
  return { ok: true, artifact: structuredClone(draft) }
}

export function acceptedOutputCost(costs, acceptedCount) {
  if (!Number.isInteger(acceptedCount) || acceptedCount < 1) throw new Error('No accepted-output denominator')
  if (costs.some((value) => !Number.isFinite(value) || value < 0)) throw new Error('Invalid cost')
  return costs.reduce((sum, value) => sum + value, 0) / acceptedCount
}

/** Deterministic state machine; substitute an evaluated model policy in a later lab. */
export function runFixture({ actor, input, maxSteps }) {
  const trace = []
  if (!Number.isInteger(maxSteps) || maxSteps < 2) return { state: 'budget_exhausted', reason: 'insufficient_step_budget', trace }
  if (!input.source) return { state: 'needs_input', reason: 'missing_source', trace }
  trace.push({ tool: 'read_source', source: input.source })
  const result = draftTool(actor, input, trace)
  return result.ok
    ? { state: 'completed', reason: 'draft_created', artifact: result.artifact, trace }
    : { state: 'failed', reason: result.reason, trace }
}

const actor = { id: 'operator', workspaces: ['demo-company'], tools: ['create_draft'] }
const record = { workspace: 'demo-company', audience: ['operator'], status: 'accepted', source: 'synthetic-note', reviewDue: '2026-10-09', claim: 'Review the campaign brief' }
const now = '2026-10-02'

test('retrieval excludes stale, proposed, unsupported and unauthorized records', () => {
  const records = [record,
    { ...record, claim: 'stale', reviewDue: '2026-10-01' },
    { ...record, claim: 'proposed', status: 'proposed' },
    { ...record, claim: 'wrong workspace', workspace: 'private-family' },
    { ...record, claim: 'wrong audience', audience: ['someone-else'] },
    { ...record, claim: 'no source', source: '' },
    { ...record, claim: 'bad date', reviewDue: 'unknown' },
  ]
  assert.deepEqual(retrieveMemory(records, actor, now).map((item) => item.claim), [record.claim])
  assert.deepEqual(retrieveMemory([record], actor, '2026-10-09'), [])
  assert.throws(() => retrieveMemory(records, actor, 'invalid'), /Invalid retrieval time/)
})

test('returned records cannot mutate the stored audience', () => {
  const result = retrieveMemory([record], actor, now)
  result[0].audience.push('intruder')
  assert.deepEqual(record.audience, ['operator'])
})

test('concurrent proposals require reconciliation after a version conflict', () => {
  const store = new VersionedRecord()
  const snapshotA = store.read()
  const snapshotB = store.read()
  assert.equal(store.propose(snapshotA.version, { result: 'A' }).accepted, true)
  assert.equal(store.propose(snapshotB.version, { result: 'B' }).reason, 'version_conflict')
  assert.deepEqual(store.read(), { version: 1, value: { result: 'A' } })
})

test('same-process concurrent retries create a single intended operation', async () => {
  const ledger = new OperationLedger()
  let calls = 0
  const operation = { tool: 'create_draft', asset: 'asset-7' }
  const execute = async () => { calls += 1; return { id: 'synthetic-draft-7' } }
  const [a, b] = await Promise.all([
    ledger.run('run-42:draft-7', operation, execute),
    ledger.run('run-42:draft-7', operation, execute),
  ])
  assert.equal(calls, 1)
  assert.deepEqual(a, b)
  await assert.rejects(ledger.run('run-42:draft-7', { tool: 'publish' }, execute), /different operation/)
})

test('ambiguous failure after a side effect blocks replay until reconciliation', async () => {
  const ledger = new OperationLedger()
  let sideEffects = 0
  const execute = async () => { sideEffects += 1; throw new Error('acknowledgement lost') }
  await assert.rejects(ledger.run('retry-1', { action: 'draft' }, execute), /acknowledgement lost/)
  await assert.rejects(ledger.run('retry-1', { action: 'draft' }, execute), /acknowledgement lost/)
  assert.equal(sideEffects, 1)
})

test('scope mismatch and model-provided approval do not authorize a write', () => {
  const trace = []
  assert.equal(draftTool(actor, { workspace: 'private-family', title: 'private', approved: true }, trace).reason, 'permission_denied')
  assert.equal(trace.length, 0)
  assert.equal(draftTool({ ...actor, tools: [] }, { workspace: 'demo-company', title: 'x' }, trace).reason, 'permission_denied')
})

test('completion requires a created artifact and a trace', () => {
  const completed = runFixture({ actor, input: { workspace: 'demo-company', title: 'Weekly briefing', source: 'synthetic-note' }, maxSteps: 2 })
  assert.equal(completed.state, 'completed')
  assert.equal(completed.reason, 'draft_created')
  assert.equal(completed.artifact.status, 'draft')
  assert.equal(completed.trace.length, 2)
  assert.equal(runFixture({ actor, input: {}, maxSteps: 2 }).state, 'needs_input')
  assert.equal(runFixture({ actor, input: {}, maxSteps: 1 }).state, 'budget_exhausted')
  assert.equal(runFixture({ actor, input: {}, maxSteps: 1 }).reason, 'insufficient_step_budget')
  assert.equal(runFixture({ actor, input: { workspace: 'private-family', title: 'x', source: 'note' }, maxSteps: 2 }).state, 'failed')
})

test('cost includes rejected attempts and rejects invalid denominators', () => {
  assert.equal(acceptedOutputCost([10, 30], 10), 4)
  assert.throws(() => acceptedOutputCost([40], 0), /denominator/)
  assert.throws(() => acceptedOutputCost([Infinity], 2), /Invalid cost/)
})

if (!process.env.NODE_TEST_CONTEXT) {
  console.log(JSON.stringify({
    lab: 'AI operating systems — synthetic contract drills',
    limitations: ['no model', 'no network', 'in-memory only', 'no MCP transport', 'no crash recovery'],
    result: runFixture({ actor, input: { workspace: 'demo-company', title: 'Weekly briefing', source: 'synthetic-note' }, maxSteps: 2 }),
  }, null, 2))
}
