// Verifies the external-intelligence ingest without network access.
// Runs the real script against __fixtures__/ and asserts the guarantees the
// public page depends on: registry join, unit conversion, provenance on every
// figure, and — the load-bearing one — that a redistribution-forbidden source
// cannot reach an ingested field.

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { readFile, writeFile, mkdtemp, rm, mkdir, cp } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

const ROOT = process.cwd()
const SCRIPT = 'scripts/intelligence/fetch-external.mjs'
const FIXTURES = 'scripts/intelligence/__fixtures__'

function run(args, { cwd = ROOT } = {}) {
  return execFileSync('node', [SCRIPT, ...args], { cwd, encoding: 'utf8' })
}

async function snapshot() {
  // --dry-run prints the summary but writes nothing; write into a temp copy of
  // the repo data dir so the committed snapshot is never touched by tests.
  const dir = await mkdtemp(join(tmpdir(), 'ext-intel-'))
  await mkdir(join(dir, 'data', 'intelligence'), { recursive: true })
  await mkdir(join(dir, 'scripts', 'intelligence'), { recursive: true })
  await cp(join(ROOT, SCRIPT), join(dir, SCRIPT))
  await cp(join(ROOT, FIXTURES), join(dir, FIXTURES), { recursive: true })
  await cp(join(ROOT, 'data', 'model-registry.json'), join(dir, 'data', 'model-registry.json'))
  run(['--fixtures', FIXTURES], { cwd: dir })
  const parsed = JSON.parse(await readFile(join(dir, 'data', 'intelligence', 'external.json'), 'utf8'))
  return { parsed, dir }
}

test('joins external pricing onto registry model ids', async () => {
  const { parsed, dir } = await snapshot()
  const opus = parsed.models.find((m) => m.id === 'claude-opus-4-8')
  assert.ok(opus, 'registry model claude-opus-4-8 present')
  assert.equal(opus.in_registry, true)
  assert.equal(opus.pricing.in_usd_per_m, 5, 'models.dev pricing joined onto the registry id')
  assert.equal(opus.pricing.out_usd_per_m, 25)
  await rm(dir, { recursive: true, force: true })
})

test('converts OpenRouter per-token prices to per-million', async () => {
  const { parsed, dir } = await snapshot()
  // gpt-5.5 has no models.dev row in the fixture, so OpenRouter supplies it:
  // 0.00000125/token -> 1.25 per 1M.
  const gpt = parsed.models.find((m) => (m.names?.['openrouter-models'] || '') === 'openai/gpt-5.5')
  assert.ok(gpt, 'openrouter model row present')
  assert.equal(gpt.pricing.in_usd_per_m, 1.25)
  assert.equal(gpt.pricing.out_usd_per_m, 10)
  await rm(dir, { recursive: true, force: true })
})

test('adoption shares are normalised against the round total', async () => {
  const { parsed, dir } = await snapshot()
  const withAdoption = parsed.models.filter((m) => m.adoption)
  assert.equal(withAdoption.length, 2)
  const sum = withAdoption.reduce((s, m) => s + m.adoption.share, 0)
  assert.ok(Math.abs(sum - 1) < 1e-6, `shares sum to 1, got ${sum}`)
  await rm(dir, { recursive: true, force: true })
})

test('every ingested figure carries full provenance', async () => {
  const { parsed, dir } = await snapshot()
  let checked = 0
  for (const m of parsed.models) {
    for (const block of [m.pricing, m.adoption]) {
      if (!block) continue
      checked++
      for (const k of ['source', 'source_url', 'license', 'retrieved_at']) {
        assert.ok(block[k], `${m.id} provenance field ${k}`)
      }
      assert.equal(block.modified, true, 'normalised data is marked as modified')
    }
  }
  assert.ok(checked > 0, 'at least one figure was checked')
  await rm(dir, { recursive: true, force: true })
})

test('models without a price are not given one', async () => {
  const { parsed, dir } = await snapshot()
  const unpriced = parsed.models.find((m) => m.name === 'Unpriced Preview')
  assert.equal(unpriced, undefined, 'a model with no cost block is not ingested as priced')
  await rm(dir, { recursive: true, force: true })
})

test('link-only sources are exposed as refs, never ingested', async () => {
  const { parsed, dir } = await snapshot()
  const ids = parsed.link_only.map((l) => l.id)
  assert.ok(ids.includes('artificial-analysis'))
  assert.ok(ids.includes('swe-bench'))
  for (const m of parsed.models) {
    for (const block of [m.pricing, m.adoption]) {
      if (block) assert.ok(!ids.includes(block.source), `${m.id} must not ingest a link-only source`)
    }
    assert.ok(m.external_refs.length >= 2, 'link-only refs attached for the reader')
  }
  await rm(dir, { recursive: true, force: true })
})

test('provenance guard FAILS the run when a licence is missing', async () => {
  // The guard is the whole point: prove it blocks rather than warns.
  const dir = await mkdtemp(join(tmpdir(), 'ext-intel-bad-'))
  await mkdir(join(dir, 'data', 'intelligence'), { recursive: true })
  await mkdir(join(dir, 'scripts', 'intelligence'), { recursive: true })
  await cp(join(ROOT, SCRIPT), join(dir, SCRIPT))
  await cp(join(ROOT, FIXTURES), join(dir, FIXTURES), { recursive: true })
  await cp(join(ROOT, 'data', 'model-registry.json'), join(dir, 'data', 'model-registry.json'))

  // Strip the licence from the script's models.dev source declaration.
  const src = await readFile(join(dir, SCRIPT), 'utf8')
  await writeFile(join(dir, SCRIPT), src.replace("license: 'MIT',", "license: '',"))

  assert.throws(
    () => execFileSync('node', [SCRIPT, '--fixtures', FIXTURES], { cwd: dir, encoding: 'utf8', stdio: 'pipe' }),
    /Provenance validation FAILED|source models-dev missing license/,
    'a missing licence must abort the write',
  )
  await rm(dir, { recursive: true, force: true })
})

test('offline mode re-validates the committed snapshot', async () => {
  const out = run(['--offline'])
  const parsed = JSON.parse(out)
  assert.equal(parsed.mode, 'offline-validate')
  assert.deepEqual(parsed.problems, [], 'committed snapshot has no provenance problems')
})

test('a source with no confirmed licence is blocked, not ingested', async () => {
  // The local half of the licence gate. Fixtures are exempt (hand-built shapes,
  // not redistributed data), so drive the real source list with network calls
  // that cannot succeed — status must be `blocked` for the unconfirmed sources
  // rather than `failed`, proving the licence check runs BEFORE any fetch.
  const dir = await mkdtemp(join(tmpdir(), 'ext-intel-block-'))
  await mkdir(join(dir, 'data', 'intelligence'), { recursive: true })
  await mkdir(join(dir, 'scripts', 'intelligence'), { recursive: true })
  await cp(join(ROOT, SCRIPT), join(dir, SCRIPT))
  await cp(join(ROOT, 'data', 'model-registry.json'), join(dir, 'data', 'model-registry.json'))

  const src = await readFile(join(dir, SCRIPT), 'utf8')
  // Force every source to be unconfirmed, so none may be ingested.
  await writeFile(join(dir, SCRIPT), src.replace(/license_marker: '[^']*'/g, 'license_marker: null'))

  try {
    execFileSync('node', [SCRIPT], { cwd: dir, encoding: 'utf8', stdio: 'pipe' })
  } catch {
    // All sources blocked means no data — a non-zero exit here is acceptable.
  }
  const snap = JSON.parse(await readFile(join(dir, 'data', 'intelligence', 'external.json'), 'utf8'))
  for (const s of snap.sources) {
    assert.equal(s.status, 'blocked', `${s.id} must be blocked when its licence is unconfirmed`)
    assert.match(s.note, /licence unconfirmed/)
  }
  for (const m of snap.models) {
    assert.ok(!m.pricing, `${m.id} must carry no figure from a blocked source`)
    assert.ok(!m.adoption, `${m.id} must carry no adoption figure from a blocked source`)
  }
  await rm(dir, { recursive: true, force: true })
})

test('verify-licenses treats a null marker as a hold and a false claim as fatal', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'ext-intel-lic-'))
  await mkdir(join(dir, 'scripts', 'intelligence'), { recursive: true })
  await cp(join(ROOT, SCRIPT), join(dir, SCRIPT))
  await cp(join(ROOT, 'scripts/intelligence/verify-licenses.mjs'), join(dir, 'scripts/intelligence/verify-licenses.mjs'))
  const src = await readFile(join(dir, SCRIPT), 'utf8')

  // All markers null -> every source is a hold, nothing is fetched, exit 0.
  await writeFile(join(dir, SCRIPT), src.replace(/license_marker: '[^']*'/g, 'license_marker: null'))
  const held = execFileSync('node', ['scripts/intelligence/verify-licenses.mjs'], { cwd: dir, encoding: 'utf8' })
  assert.match(held, /unverified \(ingest blocked\)/)
  assert.doesNotMatch(held, /could not be confirmed at source/)

  // A marker pointing at an unreachable evidence URL is an unconfirmable claim.
  await writeFile(
    join(dir, SCRIPT),
    src.replace(
      /license_evidence_url: '[^']*'/,
      "license_evidence_url: 'https://invalid.invalid/nope'",
    ),
  )
  assert.throws(
    () => execFileSync('node', ['scripts/intelligence/verify-licenses.mjs'], { cwd: dir, encoding: 'utf8', stdio: 'pipe' }),
    /could not be confirmed at source/,
    'an unconfirmable licence claim must fail the run',
  )
  await rm(dir, { recursive: true, force: true })
})
