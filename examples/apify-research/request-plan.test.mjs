import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { makeResearchPlan, costPerAcceptedArtifact } from './request-plan.mjs'

const fixture = JSON.parse(readFileSync(new URL('./fixtures/mission.json', import.meta.url)))

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

test('offline command prints a plan without touching fetch or exposing environment credentials', () => {
  const child = spawnSync(process.execPath, ['--input-type=module', '-e', `
    globalThis.fetch = () => { throw new Error('network forbidden') };
    process.env.APIFY_TOKEN = 'synthetic-canary-do-not-output';
    const { makeResearchPlan } = await import('./examples/apify-research/request-plan.mjs');
    const fs = await import('node:fs');
    console.log(JSON.stringify(makeResearchPlan(JSON.parse(fs.readFileSync('./examples/apify-research/fixtures/mission.json')))));
  `], { encoding: 'utf8' })
  assert.equal(child.status, 0, child.stderr)
  assert.equal(child.stdout.includes('synthetic-canary-do-not-output'), false)
  assert.equal(JSON.parse(child.stdout).requiresApproval, true)
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
