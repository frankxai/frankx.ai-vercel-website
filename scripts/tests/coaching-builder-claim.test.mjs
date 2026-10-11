import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const pagePath = path.join(root, 'app/coaching/page.tsx')

test('app/coaching/page.tsx does not contain the unsupported claim "1,000+ Builders"', () => {
  const content = fs.readFileSync(pagePath, 'utf8')
  assert.equal(
    content.includes('1,000+ Builders'),
    false,
    'Found unsupported claim "1,000+ Builders" in app/coaching/page.tsx',
  )
})
