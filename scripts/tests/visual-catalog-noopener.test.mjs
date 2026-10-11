import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const pagePath = join(__dirname, '../../app/research/visual-catalog/page.tsx')

test('every target="_blank" in visual catalog page is followed by rel="noopener noreferrer" before tag closes', () => {
  const content = readFileSync(pagePath, 'utf8')
  const targetMatches = content.split('target="_blank"')

  assert.ok(
    targetMatches.length > 1,
    'Expected at least one target="_blank" in page.tsx',
  )

  for (let i = 1; i < targetMatches.length; i++) {
    const remainingTagContent = targetMatches[i].split('>')[0]
    assert.ok(
      remainingTagContent.includes('rel="noopener noreferrer"'),
      `target="_blank" occurrence ${i} is missing rel="noopener noreferrer" before the tag closes`,
    )
  }
})
