import { test } from 'node:test'
import assert from 'node:assert'
import fs from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

test('Dare page does not contain unsupported prompt count claim', async () => {
  const currentDir = path.dirname(fileURLToPath(import.meta.url))
  const pagePath = path.join(currentDir, '../../app/dare/page.tsx')

  const content = await fs.readFile(pagePath, 'utf8')

  // The test must fail if the page still contains '200+'
  assert.ok(
    !content.includes('200+'),
    'Page still contains unsupported claim "200+"',
  )
  assert.ok(
    content.includes('More in the prompt library'),
    'Page does not contain the corrected link text "More in the prompt library"',
  )
})
