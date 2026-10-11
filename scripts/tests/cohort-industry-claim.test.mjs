import { test } from 'node:test'
import assert from 'node:assert'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const filePath = path.join(
  __dirname,
  '../../app/students/cohort/CohortClient.tsx',
)

test('CohortClient does not contain unsupported Industries claim', async () => {
  const content = await fs.readFile(filePath, 'utf8')
  assert.strictEqual(
    content.includes("{ value: '8+', label: 'Industries' }"),
    false,
    'CohortClient should not contain the Industries claim',
  )
})
