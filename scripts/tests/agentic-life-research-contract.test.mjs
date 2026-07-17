import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const auditScript = resolve(ROOT, 'scripts/audit-agentic-life-research.mjs')

function runAudit(options = {}) {
  const result = spawnSync(process.execPath, [auditScript, '--json'], {
    cwd: ROOT,
    encoding: 'utf8',
    env: { ...process.env, ...options.env },
  })

  if (!options.allowFailure) assert.equal(result.status, 0, result.stderr || result.stdout)
  return { result, receipt: JSON.parse(result.stdout) }
}

test('agentic life registry passes the production contract', () => {
  const { receipt } = runAudit()
  assert.equal(receipt.status, 'pass')
  assert.equal(receipt.checks.failed, 0)
  assert.ok(receipt.checks.total >= 300)
  assert.ok(receipt.registry.systems >= 24)
  assert.ok(receipt.registry.categories >= 8)
  assert.ok(receipt.registry.coveragePercent >= 50)
})

test('agentic life registry covers every strategic role', () => {
  const { receipt } = runAudit()
  for (const role of ['build', 'integrate', 'partner', 'compete', 'inspire', 'watch']) {
    assert.ok(receipt.registry.roles[role] >= 1, `${role} has no tracked system`)
  }
})

test('agentic life registry remains inside the freshness gate', () => {
  const { receipt } = runAudit()
  assert.ok(receipt.registry.ageDays <= 120)
})

test('audit emits a structured failure receipt when systems are missing', () => {
  const fixtureDir = mkdtempSync(join(tmpdir(), 'agentic-life-audit-'))
  const fixturePath = join(fixtureDir, 'missing-systems.json')
  writeFileSync(fixturePath, JSON.stringify({ schemaVersion: '1.0.0' }))

  try {
    const { result, receipt } = runAudit({
      allowFailure: true,
      env: { AGENTIC_LIFE_REGISTRY_PATH: fixturePath },
    })
    assert.equal(result.status, 1)
    assert.equal(result.stderr, '')
    assert.equal(receipt.status, 'fail')
    assert.equal(receipt.registry.systems, 0)
    assert.ok(receipt.failures.some((failure) => failure.startsWith('registry-depth:')))
  } finally {
    rmSync(fixtureDir, { recursive: true, force: true })
  }
})
