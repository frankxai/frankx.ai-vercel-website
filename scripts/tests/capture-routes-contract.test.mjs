import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

for (const route of [
  'app/waitlist/page.tsx',
  'app/newsletter/page.tsx',
  'app/api/newsletter/route.ts',
]) {
  test(route + ' exists', () => {
    assert.equal(fs.existsSync(path.join(root, route)), true, route)
  })
}
