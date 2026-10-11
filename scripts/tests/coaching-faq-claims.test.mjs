import test from 'node:test'
import assert from 'node:assert'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

test('coaching FAQ claims test', (t) => {
  const filePath = path.resolve(__dirname, '../../app/coaching/faqs.ts')
  const fileContent = fs.readFileSync(filePath, 'utf8')

  assert.ok(
    !fileContent.includes('38 agents'),
    'FAQ contains unsupported claim "38 agents"',
  )
  assert.ok(
    !fileContent.includes('75+ skills'),
    'FAQ contains unsupported claim "75+ skills"',
  )
  assert.ok(
    !fileContent.includes('in ACOS'),
    'FAQ contains unsupported claim "in ACOS"',
  )

  assert.ok(
    fileContent.includes(
      'I combine deep technical expertise in AI systems with practical creator experience. You get hands-on architecture guidance plus strategies that actually work in production.',
    ),
    'FAQ does not contain the correct replacement string',
  )
})
