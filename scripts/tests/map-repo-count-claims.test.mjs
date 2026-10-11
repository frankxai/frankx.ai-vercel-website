import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const targetPath = path.join(root, 'app/map/page.tsx')

test('map route does not publish an unsupported repo count', () => {
  const content = fs.readFileSync(targetPath, 'utf8')
  assert.equal(
    content.includes('50+ repos'),
    false,
    'The file still contains the unsupported claim "50+ repos".',
  )
  assert.equal(
    content.includes('across 6 clusters'),
    true,
    'The description no longer contains "across 6 clusters".',
  )
})
