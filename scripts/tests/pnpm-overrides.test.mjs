import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import test from 'node:test'

test('pnpm-workspace.yaml and pnpm-lock.yaml specify updated overrides for fast-uri and ip-address', () => {
  const root = process.cwd()
  const workspaceYaml = readFileSync(join(root, 'pnpm-workspace.yaml'), 'utf8')
  const lockYaml = readFileSync(join(root, 'pnpm-lock.yaml'), 'utf8')

  // Check pnpm-workspace.yaml overrides
  assert.match(workspaceYaml, /'fast-uri': '\^3\.1\.9'/)
  assert.match(workspaceYaml, /'ip-address': '\^10\.7\.4'/)

  // Check pnpm-lock.yaml overrides block
  assert.match(lockYaml, /fast-uri: \^3\.1\.9/)
  assert.match(lockYaml, /ip-address: \^10\.7\.4/)

  // Verify resolved packages in lockfile
  assert.match(lockYaml, /fast-uri@3\.1\.9:/)
  assert.match(lockYaml, /ip-address@10\.7\.4:/)

  // Verify old unpatched versions are not in lockfile
  assert.doesNotMatch(lockYaml, /fast-uri@3\.1\.8/)
  assert.doesNotMatch(lockYaml, /ip-address@10\.7\.3/)
})
