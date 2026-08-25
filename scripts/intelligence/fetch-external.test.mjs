// Offline and local-loopback regression coverage for the external-intelligence
// supply-chain boundary. Production fixtures are deterministic; the only HTTP
// exercised here is a disposable 127.0.0.1 server for redirect/byte-limit tests.

import { createHash } from 'node:crypto'
import { execFile as execFileCallback, spawnSync } from 'node:child_process'
import { access, cp, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { promisify } from 'node:util'
import { fileURLToPath } from 'node:url'
import { after, test } from 'node:test'
import assert from 'node:assert/strict'
import { fetchBytesBounded } from './network-safety.mjs'

const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(HERE, '..', '..')
const SCRIPT = 'scripts/intelligence/fetch-external.mjs'
const VERIFY_SCRIPT = join(ROOT, 'scripts/intelligence/verify-licenses.mjs')
const FIXTURES = 'scripts/intelligence/__fixtures__'
const POLICY = 'data/intelligence/source-policy.json'
const SNAPSHOT = 'data/intelligence/external.json'
const FIXED_NOW = '2026-08-25T06:00:00.000Z'
const execFile = promisify(execFileCallback)
const cleanup = new Set()

after(async () => {
  await Promise.all([...cleanup].map((dir) => rm(dir, { recursive: true, force: true })))
})

async function workspace({ prior = false } = {}) {
  const dir = await mkdtemp(join(tmpdir(), 'frankx-intelligence-'))
  cleanup.add(dir)
  await mkdir(join(dir, 'scripts', 'intelligence'), { recursive: true })
  await mkdir(join(dir, 'data', 'intelligence'), { recursive: true })
  await cp(join(ROOT, SCRIPT), join(dir, SCRIPT))
  await cp(join(ROOT, 'scripts/intelligence/network-safety.mjs'), join(dir, 'scripts/intelligence/network-safety.mjs'))
  await cp(join(ROOT, FIXTURES), join(dir, FIXTURES), { recursive: true })
  await cp(join(ROOT, 'data/model-registry.json'), join(dir, 'data/model-registry.json'))
  await cp(join(ROOT, POLICY), join(dir, POLICY))
  if (prior) await cp(join(ROOT, `${FIXTURES}/prior-external.json`), join(dir, SNAPSHOT))
  return dir
}

async function readJson(path) {
  return JSON.parse(await readFile(path, 'utf8'))
}

async function mutateJson(path, mutate) {
  const value = await readJson(path)
  await mutate(value)
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`)
}

function source(policy, id) {
  const found = policy.sources.find((candidate) => candidate.id === id)
  assert.ok(found, `policy source ${id} exists`)
  return found
}

function confirmSource(policy, id) {
  const declared = source(policy, id)
  declared.enabled = true
  declared.license = {
    ...declared.license,
    name: `${id} test redistribution licence`,
    state: 'confirmed',
    redistribution_permitted: true,
    notice: `Copyright test fixture for ${id}`,
    evidence: [{
      role: 'test-evidence',
      url: 'https://evidence.example.test/LICENSE',
      allowed_hosts: ['evidence.example.test'],
      sha256: '0'.repeat(64),
    }],
    verified_at: '2026-08-24',
  }
}

async function editPolicy(dir, mutate) {
  await mutateJson(join(dir, POLICY), mutate)
}

function runFetch(dir, args = []) {
  return spawnSync('node', [SCRIPT, ...args], {
    cwd: dir,
    encoding: 'utf8',
    maxBuffer: 10 * 1024 * 1024,
  })
}

function fixtureArgs(now = FIXED_NOW) {
  return ['--fixtures', FIXTURES, '--now', now]
}

function assertSucceeded(result) {
  assert.equal(result.status, 0, `fetch failed\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`)
}

async function fullyEnabledSnapshot({ prior = false } = {}) {
  const dir = await workspace({ prior })
  await editPolicy(dir, (policy) => {
    confirmSource(policy, 'openrouter-models')
    confirmSource(policy, 'openrouter-rankings')
  })
  const result = runFetch(dir, fixtureArgs())
  assertSucceeded(result)
  return { dir, snapshot: await readJson(join(dir, SNAPSHOT)), result }
}

test('deterministic fixtures join, convert, normalise, and carry provenance', async () => {
  const { snapshot } = await fullyEnabledSnapshot()

  const opus = snapshot.models.find((model) => model.id === 'claude-opus-4-8')
  assert.ok(opus)
  assert.equal(opus.in_registry, true)
  assert.equal(opus.pricing.in_usd_per_m, 5)
  assert.equal(opus.pricing.out_usd_per_m, 25)

  const gpt = snapshot.models.find((model) => model.id === 'gpt-5-5')
  assert.ok(gpt)
  assert.equal(gpt.pricing.in_usd_per_m, 1.25)
  assert.equal(gpt.pricing.out_usd_per_m, 10)

  const adopted = snapshot.models.filter((model) => model.adoption)
  assert.equal(adopted.length, 2)
  assert.ok(Math.abs(adopted.reduce((sum, model) => sum + model.adoption.share, 0) - 1) < 1e-7)

  let figures = 0
  for (const model of snapshot.models) {
    assert.equal(model.in_registry, true, `${model.id} must stay inside the bounded registry-only output scope`)
    assert.doesNotMatch(model.id, /^external:/)
    assert.equal(Object.hasOwn(model, 'external_refs'), false, `${model.id} must not repeat link-only metadata`)
    for (const block of [model.pricing, model.adoption]) {
      if (!block) continue
      figures += 1
      for (const field of ['source', 'source_url', 'license', 'retrieved_at']) {
        assert.ok(block[field], `${model.id} ${field}`)
      }
      assert.equal(block.modified, true)
    }
  }
  assert.ok(figures > 0)
  assert.equal(snapshot.models.some((model) => model.name === 'Unpriced Preview'), false)
  assert.deepEqual(snapshot.link_only.map((entry) => entry.id), ['artificial-analysis', 'swe-bench', 'lmarena'])
})

test('production policy is declarative and only models.dev is licence-confirmed', async () => {
  const policy = await readJson(join(ROOT, POLICY))
  assert.equal(policy.schema, 'frankx/intelligence-source-policy@1')
  assert.equal(source(policy, 'models-dev').license.state, 'confirmed')
  assert.deepEqual(source(policy, 'models-dev').license.evidence.map((entry) => entry.role), ['dataset-scope', 'licence-grant'])
  for (const document of source(policy, 'models-dev').license.evidence) {
    assert.match(document.sha256, /^[a-f0-9]{64}$/)
  }
  assert.equal(source(policy, 'openrouter-models').license.state, 'unverified')
  assert.equal(source(policy, 'openrouter-rankings').license.state, 'unverified')
  assert.equal(source(policy, 'artificial-analysis').license.state, 'blocked')
  assert.equal(source(policy, 'swe-bench').license.state, 'blocked')
  assert.equal(policy.defaults.output_scope, 'registry-only')
  assert.equal(policy.defaults.provider_org_map.moonshotai, 'moonshot')

  const verifier = await readFile(VERIFY_SCRIPT, 'utf8')
  assert.match(verifier, /source-policy\.json/)
  assert.doesNotMatch(verifier, /fetch-external\.mjs[\s\S]*SOURCES|license_marker/)
  await assert.rejects(access(join(ROOT, 'components/intelligence/AttributionFootnotes.tsx')))
})

test('prior rows from currently unverified sources are purged', async () => {
  const dir = await workspace({ prior: true })
  const result = runFetch(dir, fixtureArgs())
  assertSucceeded(result)
  const snapshot = await readJson(join(dir, SNAPSHOT))

  assert.equal(snapshot.sources.find((entry) => entry.id === 'openrouter-models').status, 'unverified')
  assert.equal(snapshot.sources.find((entry) => entry.id === 'openrouter-rankings').status, 'unverified')
  const gpt = snapshot.models.find((model) => model.id === 'gpt-5-5')
  assert.equal(gpt.pricing, null)
  assert.equal(gpt.adoption, null)
  assert.equal(snapshot.models.some((model) => model.id === 'external:openrouter-only'), false)
})

test('blocked, revoked, unverified, and skipped sources can never carry prior rows', async (t) => {
  for (const state of ['blocked', 'revoked', 'unverified', 'skipped']) {
    await t.test(state, async () => {
      const dir = await workspace({ prior: true })
      await editPolicy(dir, (policy) => {
        const declared = source(policy, 'openrouter-models')
        if (state === 'skipped') {
          declared.enabled = false
        } else {
          declared.enabled = true
          declared.license.state = state
          declared.license.redistribution_permitted = state === 'blocked' || state === 'revoked' ? false : null
        }
      })
      const result = runFetch(dir, fixtureArgs())
      assertSucceeded(result)
      const snapshot = await readJson(join(dir, SNAPSHOT))
      assert.equal(snapshot.sources.find((entry) => entry.id === 'openrouter-models').status, state)
      assert.equal(snapshot.models.find((model) => model.id === 'gpt-5-5').pricing, null)
      assert.equal(snapshot.models.some((model) => model.id === 'external:openrouter-only'), false)
    })
  }
})

test('only a fresh field from a transiently failed, still-confirmed source carries', async () => {
  const dir = await workspace({ prior: true })
  await editPolicy(dir, (policy) => confirmSource(policy, 'openrouter-rankings'))
  await rm(join(dir, `${FIXTURES}/models-dev.json`))

  const result = runFetch(dir, fixtureArgs('2026-08-25T06:00:00.000Z'))
  assertSucceeded(result)
  const snapshot = await readJson(join(dir, SNAPSHOT))
  const opus = snapshot.models.find((model) => model.id === 'claude-opus-4-8')
  const status = snapshot.sources.find((entry) => entry.id === 'models-dev')
  assert.equal(status.status, 'failed')
  assert.equal(status.carried_forward, 1)
  assert.equal(opus.pricing.retrieved_at, '2026-08-20T06:00:00.000Z')
  assert.equal(opus.pricing.source, 'models-dev')
})

test('stale transient data expires instead of carrying forever', async () => {
  const dir = await workspace({ prior: true })
  await editPolicy(dir, (policy) => confirmSource(policy, 'openrouter-rankings'))
  await rm(join(dir, `${FIXTURES}/models-dev.json`))

  const result = runFetch(dir, fixtureArgs('2026-08-29T07:00:00.000Z'))
  assertSucceeded(result)
  const snapshot = await readJson(join(dir, SNAPSHOT))
  assert.equal(snapshot.models.find((model) => model.id === 'claude-opus-4-8').pricing, null)
  assert.equal(snapshot.sources.find((entry) => entry.id === 'models-dev').carried_forward, 0)
})

test('a total enabled-source outage fails before writing and preserves exact bytes', async () => {
  const dir = await workspace({ prior: true })
  await editPolicy(dir, (policy) => {
    confirmSource(policy, 'openrouter-models')
    confirmSource(policy, 'openrouter-rankings')
  })
  for (const id of ['models-dev', 'openrouter-models', 'openrouter-rankings']) {
    await rm(join(dir, `${FIXTURES}/${id}.json`))
  }
  const before = await readFile(join(dir, SNAPSHOT))
  const result = runFetch(dir, fixtureArgs())
  assert.notEqual(result.status, 0)
  assert.match(result.stderr, /snapshot not written/)
  assert.deepEqual(await readFile(join(dir, SNAPSHOT)), before)
})

test('response, per-source model, numeric, context, pricing, and token bounds fail closed', async (t) => {
  const cases = [
    {
      name: 'fixture response bytes', target: 'models-dev', survivor: 'openrouter-rankings',
      mutatePolicy: (policy) => { source(policy, 'models-dev').limits = { max_response_bytes: 16 } },
      error: /fixture response exceeds/,
    },
    {
      name: 'source model count', target: 'models-dev', survivor: 'openrouter-rankings',
      mutatePolicy: (policy) => { source(policy, 'models-dev').limits = { max_models: 1 } },
      error: /exceeds max_models/,
    },
    {
      name: 'negative price', target: 'models-dev', survivor: 'openrouter-rankings',
      mutateFixture: (fixture) => { fixture.anthropic.models['claude-opus-4-8'].cost.input = -1 },
      error: /must be between 0/,
    },
    {
      name: 'boolean is not numeric', target: 'models-dev', survivor: 'openrouter-rankings',
      mutateFixture: (fixture) => { fixture.anthropic.models['claude-opus-4-8'].cost.input = true },
      error: /must be a number or strict numeric string/,
    },
    {
      name: 'context ceiling', target: 'models-dev', survivor: 'openrouter-rankings',
      mutateFixture: (fixture) => { fixture.anthropic.models['claude-opus-4-8'].limit.context = 100000001 },
      error: /must be between 0 and 100000000/,
    },
    {
      name: 'strict per-token price', target: 'openrouter-models', survivor: null,
      mutateFixture: (fixture) => { fixture.data[0].pricing.prompt = '0.000005 USD' },
      error: /strict numeric value/,
    },
    {
      name: 'per-million price ceiling', target: 'openrouter-models', survivor: null,
      mutateFixture: (fixture) => { fixture.data[0].pricing.prompt = '0.2' },
      error: /must be between 0 and 0.1/,
    },
    {
      name: 'negative ranking tokens', target: 'openrouter-rankings', survivor: null,
      mutateFixture: (fixture) => { fixture.data[0].total_tokens = -1 },
      error: /must be between 0/,
    },
    {
      name: 'unsafe ranking integer', target: 'openrouter-rankings', survivor: null,
      mutateFixture: (fixture) => { fixture.data[0].total_tokens = 9007199254740992 },
      error: /safe integer/,
    },
  ]

  for (const scenario of cases) {
    await t.test(scenario.name, async () => {
      const dir = await workspace()
      await editPolicy(dir, (policy) => {
        if (scenario.target.startsWith('openrouter')) confirmSource(policy, scenario.target)
        if (scenario.survivor) confirmSource(policy, scenario.survivor)
        scenario.mutatePolicy?.(policy)
      })
      if (scenario.mutateFixture) {
        await mutateJson(join(dir, `${FIXTURES}/${scenario.target}.json`), scenario.mutateFixture)
      }
      const result = runFetch(dir, fixtureArgs())
      assertSucceeded(result)
      const snapshot = await readJson(join(dir, SNAPSHOT))
      const runtime = snapshot.sources.find((entry) => entry.id === scenario.target)
      assert.equal(runtime.status, 'failed')
      assert.match(runtime.note, scenario.error)
    })
  }
})

test('global model output bound refuses the snapshot', async () => {
  const dir = await workspace()
  await editPolicy(dir, (policy) => { policy.defaults.max_output_models = 1 })
  const result = runFetch(dir, fixtureArgs())
  assert.notEqual(result.status, 0)
  assert.match(result.stderr, /model output exceeds 1/)
  await assert.rejects(access(join(dir, SNAPSHOT)))
})

test('offline mode validates the normalized committed seed without network', () => {
  const result = runFetch(ROOT, ['--offline'])
  assertSucceeded(result)
  const report = JSON.parse(result.stdout)
  assert.equal(report.mode, 'offline-validate')
  assert.deepEqual(report.problems, [])
})

test('bounded HTTP helper enforces HTTPS, bytes, redirects, and every final host', async (t) => {
  let forwardedAuthorization = null
  const sink = createServer((request, response) => {
    forwardedAuthorization = request.headers.authorization || null
    response.end('ok')
  })
  await new Promise((resolveListen) => sink.listen(0, '127.0.0.1', resolveListen))
  t.after(() => new Promise((resolveClose) => sink.close(resolveClose)))
  const server = createServer((request, response) => {
    if (request.url === '/large') {
      response.end('0123456789abcdef')
    } else if (request.url === '/stream') {
      response.writeHead(200, { 'transfer-encoding': 'chunked' })
      response.write('0123')
      response.end('4567')
    } else if (request.url === '/r1') {
      response.writeHead(302, { location: '/r2' }).end()
    } else if (request.url === '/r2') {
      response.writeHead(307, { location: '/ok' }).end()
    } else if (request.url === '/foreign') {
      response.writeHead(302, { location: `http://localhost:${server.address().port}/ok` }).end()
    } else if (request.url === '/cross-origin') {
      response.writeHead(302, { location: `http://127.0.0.1:${sink.address().port}/ok` }).end()
    } else {
      response.end('ok')
    }
  })
  await new Promise((resolveListen) => server.listen(0, '127.0.0.1', resolveListen))
  t.after(() => new Promise((resolveClose) => server.close(resolveClose)))
  const base = `http://127.0.0.1:${server.address().port}`
  const options = {
    allowedHosts: ['127.0.0.1'], maxBytes: 64, maxRedirects: 2, timeoutMs: 2000, allowHttp: true,
  }

  await assert.rejects(fetchBytesBounded(`${base}/ok`, { ...options, allowHttp: false }), /only HTTPS/)
  await assert.rejects(fetchBytesBounded(`${base}/large`, { ...options, maxBytes: 5 }), /response exceeds 5 bytes/)
  await assert.rejects(fetchBytesBounded(`${base}/stream`, { ...options, maxBytes: 5 }), /response exceeds 5 bytes/)
  await assert.rejects(fetchBytesBounded(`${base}/r1`, { ...options, maxRedirects: 1 }), /redirect limit 1 exceeded/)
  await assert.rejects(fetchBytesBounded(`${base}/foreign`, options), /host localhost is outside allowlist/)
  const followed = await fetchBytesBounded(`${base}/r1`, options)
  assert.equal(followed.redirects, 2)
  assert.equal(followed.finalUrl, `${base}/ok`)
  await fetchBytesBounded(`${base}/cross-origin`, { ...options, headers: { authorization: 'Bearer do-not-forward' } })
  assert.equal(forwardedAuthorization, null, 'authorization must be stripped on an allowed cross-origin redirect')
})

test('licence verifier confirms exact bounded evidence bytes and rejects a mismatch', async (t) => {
  const evidence = Buffer.from('test redistribution licence\n')
  const digest = createHash('sha256').update(evidence).digest('hex')
  const server = createServer((request, response) => {
    if (request.url === '/redirect') response.writeHead(302, { location: '/LICENSE' }).end()
    else response.end(evidence)
  })
  await new Promise((resolveListen) => server.listen(0, '127.0.0.1', resolveListen))
  t.after(() => new Promise((resolveClose) => server.close(resolveClose)))

  const dir = await mkdtemp(join(tmpdir(), 'frankx-licence-policy-'))
  cleanup.add(dir)
  const policyPath = join(dir, 'policy.json')
  const policy = {
    schema: 'frankx/intelligence-source-policy@1',
    defaults: { max_redirects: 1, timeout_ms: 2000 },
    sources: [{
      id: 'fixture-evidence', mode: 'ingest', enabled: true, url: 'https://source.example.test/data',
      license: {
        name: 'fixture licence', state: 'confirmed', redistribution_permitted: true,
        notice: 'Copyright test evidence', verified_at: '2026-08-24',
        evidence: [{
          role: 'licence-grant', url: `http://127.0.0.1:${server.address().port}/redirect`,
          allowed_hosts: ['127.0.0.1'], sha256: digest,
        }],
      },
    }],
  }
  await writeFile(policyPath, `${JSON.stringify(policy, null, 2)}\n`)
  const confirmed = await execFile('node', [VERIFY_SCRIPT, '--policy', policyPath, '--allow-http-for-tests'], { cwd: ROOT })
  assert.match(confirmed.stdout, /fixture-evidence — CONFIRMED/)

  policy.sources[0].license.evidence[0].sha256 = 'f'.repeat(64)
  await writeFile(policyPath, `${JSON.stringify(policy, null, 2)}\n`)
  await assert.rejects(
    execFile('node', [VERIFY_SCRIPT, '--policy', policyPath, '--allow-http-for-tests'], { cwd: ROOT }),
    (error) => /fixture-evidence — MISMATCH/.test(error.stdout) && /FAIL/.test(error.stderr),
  )
})
