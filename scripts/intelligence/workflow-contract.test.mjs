import { readFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { test } from 'node:test'
import assert from 'node:assert/strict'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..')

test('privileged refresh workflow pins every action and preserves editorial review', async () => {
  const workflow = await readFile(join(ROOT, '.github/workflows/intelligence-refresh.yml'), 'utf8')
  const uses = [...workflow.matchAll(/^\s*(?:-\s*)?uses:\s*([^\s#]+)/gm)].map((match) => match[1])
  assert.equal(uses.length, 3)
  for (const action of uses) assert.match(action, /^[^@\s]+@[a-f0-9]{40}$/, `${action} must be immutable`)
  assert.match(workflow, /schedule:/)
  assert.match(workflow, /workflow_dispatch:/)
  assert.match(workflow, /persist-credentials:\s*false/)
  assert.match(workflow, /create-pull-request@/)
  assert.match(workflow, /Review the diff, then merge to publish/)
})
