import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, writeFileSync, copyFileSync, existsSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { execFileSync } from 'node:child_process'

test('optional AIS export preserves app discovery with and without a sibling checkout', () => {
  for (const siblingAvailable of [true, false]) {
    const base = mkdtempSync(join(tmpdir(), 'ais-discovery-test-'))
    const root = join(base, 'site')
    try {
      mkdirSync(join(root, 'scripts'), { recursive: true })
      mkdirSync(join(root, 'public'), { recursive: true })
      copyFileSync('scripts/sync-ais.mjs', join(root, 'scripts/sync-ais.mjs'))
      for (const name of ['llms.txt', 'llms-full.txt']) {
        mkdirSync(join(root, 'app', name), { recursive: true })
        writeFileSync(join(root, 'app', name, 'route.ts'), 'export function GET() {}')
        writeFileSync(join(root, 'public', name), 'stale discovery')
      }
      if (siblingAvailable) {
        const sibling = join(base, 'Agent-Intelligence-System')
        mkdirSync(sibling)
        writeFileSync(join(sibling, 'agents.json'), '[]')
        writeFileSync(join(sibling, 'llms.txt'), 'optional discovery')
      }
      execFileSync(process.execPath, [join(root, 'scripts/sync-ais.mjs')], { env: { ...process.env, CI: '1' }, stdio: 'pipe' })
      for (const name of ['llms.txt', 'llms-full.txt']) {
        assert.equal(existsSync(join(root, 'public', name)), false)
        assert.equal(readFileSync(join(root, 'app', name, 'route.ts'), 'utf8'), 'export function GET() {}')
      }
      if (siblingAvailable) assert.equal(readFileSync(join(root, 'public/agents.json'), 'utf8'), '[]')
    } finally {
      rmSync(base, { recursive: true, force: true })
    }
  }
})
