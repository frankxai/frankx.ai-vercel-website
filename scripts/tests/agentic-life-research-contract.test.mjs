import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const auditScript = resolve(ROOT, 'scripts/audit-agentic-life-research.mjs')

function runAudit() {
  const result = spawnSync(process.execPath, [auditScript, '--json'], {
    cwd: ROOT,
    encoding: 'utf8',
  })

  assert.equal(result.status, 0, result.stderr || result.stdout)
  return JSON.parse(result.stdout)
}

test('agentic life registry passes the production contract', () => {
  const receipt = runAudit()
  assert.equal(receipt.status, 'pass')
  assert.equal(receipt.checks.failed, 0)
  assert.ok(receipt.checks.total >= 300)
  assert.ok(receipt.registry.systems >= 24)
  assert.ok(receipt.registry.categories >= 8)
  assert.ok(receipt.registry.coveragePercent >= 50)
})

test('agentic life registry covers every strategic role', () => {
  const receipt = runAudit()
  for (const role of ['build', 'integrate', 'partner', 'compete', 'inspire', 'watch']) {
    assert.ok(receipt.registry.roles[role] >= 1, `${role} has no tracked system`)
  }
})

test('agentic life registry remains inside the freshness gate', () => {
  const receipt = runAudit()
  assert.ok(receipt.registry.ageDays <= 120)
})
