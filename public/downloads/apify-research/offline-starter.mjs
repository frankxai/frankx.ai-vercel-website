// Original FrankX teaching example. See LICENSE.txt. No network execution.
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'

const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const ACTOR = 'apify/rag-web-browser'

/** Teaching-only planner. It never reads credentials or sends requests. */
export function makeResearchPlan({ missionId, sourceUrl, allowedHosts, build, maxTotalChargeUsd = 0.10 }) {
  if (!/^[a-zA-Z0-9_-]{1,100}$/.test(missionId ?? '')) throw new Error('Invalid mission ID')
  const url = new URL(sourceUrl)
  if (url.protocol !== 'https:' || url.username || url.password || url.port || url.hash) {
    throw new Error('Use an https source without credentials, custom port or fragment')
  }
  if (!Array.isArray(allowedHosts) || !allowedHosts.includes(url.hostname)) throw new Error('Source host is not approved')
  if (!/^\d+\.\d+\.\d+$/.test(build ?? '')) throw new Error('Resolve a numbered Actor build; mutable tags are refused')
  if (!Number.isFinite(maxTotalChargeUsd) || maxTotalChargeUsd <= 0 || maxTotalChargeUsd > 0.25) {
    throw new Error('Example ceiling must be positive and no more than $0.25')
  }
  const input = {
    query: url.href,
    maxResults: 1,
    outputFormats: ['markdown'],
    scrapingTool: 'raw-http',
    requestTimeoutSecs: 30,
    maxRequestRetries: 0,
    desiredConcurrency: 1,
  }
  const callOptions = { build, timeout: 60, memory: 1024, maxTotalChargeUsd }
  const query = new URLSearchParams({
    ...Object.fromEntries(Object.entries(callOptions).map(([key, value]) => [key, String(value)])),
    waitForFinish: '0',
    restartOnError: 'false',
    forcePermissionLevel: 'LIMITED_PERMISSIONS',
  })
  return {
    kind: 'offline-request-plan', executionEnabled: false, requiresApproval: true,
    missionId, sourceUrl: url.href,
    inputSha256: hash(input),
    // This is a local dispatch key. No Apify idempotency guarantee is implied.
    dispatchKey: hash({ missionId, actor: ACTOR, input, callOptions }),
    mcp: { tool: 'call-actor', arguments: { actor: ACTOR, input, callOptions, waitSecs: 0 } },
    api: {
      method: 'POST',
      url: `https://api.apify.com/v2/actors/apify~rag-web-browser/runs?${query}`,
      headers: { 'Content-Type': 'application/json' },
      auth: 'Execution adapter must inject a scoped Bearer token from its secret manager',
      body: input,
    },
    results: { actorRunId: null, datasetId: null, actualCostUsd: null, acceptedRecords: null },
  }
}

/** Hypothetical arithmetic only. null is deliberately retained for unknown costs. */
export function costPerAcceptedArtifact({ apifyUsd, inferenceUsd, storageUsd, reviewUsd, acceptedArtifacts }) {
  const costs = [apifyUsd, inferenceUsd, storageUsd, reviewUsd]
  if (costs.some(value => value === null) || acceptedArtifacts === null || acceptedArtifacts === 0) return null
  if (!Number.isSafeInteger(acceptedArtifacts) || acceptedArtifacts < 0 || costs.some(value => !Number.isFinite(value) || value < 0)) {
    throw new Error('Cost and acceptance measurements must be non-negative')
  }
  return costs.reduce((sum, value) => sum + value, 0) / acceptedArtifacts
}


const fixture = {
  "missionId": "synthetic-pricing-watch-001",
  "sourceUrl": "https://research.example/pricing",
  "allowedHosts": ["research.example"],
  "build": "0.0.0",
  "maxTotalChargeUsd": 0.10
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (process.argv.includes('--verify')) {
    const { default: assert } = await import('node:assert/strict')
    const { default: test } = await import('node:test')
test('both interfaces describe the same bounded input; financial controls stay outside Actor input', () => {
  const plan = makeResearchPlan(fixture)
  assert.deepEqual(plan.api.body, plan.mcp.arguments.input)
  assert.equal(plan.mcp.arguments.callOptions.maxTotalChargeUsd, 0.1)
  assert.equal(new URL(plan.api.url).searchParams.get('maxTotalChargeUsd'), '0.1')
  assert.equal('maxTotalChargeUsd' in plan.api.body, false)
  assert.equal(plan.mcp.arguments.waitSecs, 0)
  assert.equal(plan.executionEnabled, false)
  assert.equal(plan.results.actorRunId, null)
})

test('offline command prints a plan without touching fetch or exposing credentials', () => {
  const originalFetch = globalThis.fetch
  globalThis.fetch = () => { throw new Error('network forbidden') }
  try {
    const output = JSON.stringify(makeResearchPlan(fixture))
    assert.equal(JSON.parse(output).executionEnabled, false)
    assert.equal(JSON.parse(output).requiresApproval, true)
    assert.equal(output.includes('Bearer token from its secret manager'), true)
  } finally { globalThis.fetch = originalFetch }
})

test('unapproved hosts, credentials, non-https URLs and mutable builds fail before dispatch', () => {
  for (const sourceUrl of ['http://research.example/pricing', 'https://research.example.attacker.example/', 'https://token@research.example/', 'https://research.example:8443/', 'https://research.example/#token']) {
    assert.throws(() => makeResearchPlan({ ...fixture, sourceUrl }))
  }
  for (const build of ['latest', 'beta', '', null]) assert.throws(() => makeResearchPlan({ ...fixture, build }))
})

test('zero, negative, non-finite and excessive caps fail; dry-run is implemented without a zero-dollar run', () => {
  for (const maxTotalChargeUsd of [0, -1, Infinity, NaN, 0.26, '0.10']) {
    assert.throws(() => makeResearchPlan({ ...fixture, maxTotalChargeUsd }))
  }
})

test('replays retain a dispatch key; changes to source, build, budget or mission produce another key', () => {
  const first = makeResearchPlan(fixture)
  assert.equal(first.dispatchKey, makeResearchPlan(fixture).dispatchKey)
  for (const change of [{ build: '0.0.1' }, { sourceUrl: 'https://research.example/docs' }, { missionId: 'another-mission' }, { maxTotalChargeUsd: 0.2 }]) {
    assert.notEqual(first.dispatchKey, makeResearchPlan({ ...fixture, ...change }).dispatchKey)
  }
})

test('unknown charges and unaccepted output cannot become a measured zero-cost artifact', () => {
  const costs = { apifyUsd: 1, inferenceUsd: 2, storageUsd: 0, reviewUsd: 3, acceptedArtifacts: 2 }
  assert.equal(costPerAcceptedArtifact(costs), 3)
  for (const field of Object.keys(costs)) assert.equal(costPerAcceptedArtifact({ ...costs, [field]: null }), null)
  assert.equal(costPerAcceptedArtifact({ ...costs, acceptedArtifacts: 0 }), null)
  assert.throws(() => costPerAcceptedArtifact({ ...costs, apifyUsd: -1 }))
})

  } else {
    console.log(JSON.stringify(makeResearchPlan(fixture), null, 2))
  }
}
