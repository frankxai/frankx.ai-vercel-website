import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const pagePath = new URL(
  '../../app/workshops/ikigai-branding/present/speaker/page.tsx',
  import.meta.url,
)

test('every target="_blank" in ikigai speaker page is followed by rel="noopener noreferrer" before tag closes', () => {
  const content = readFileSync(pagePath, 'utf8')
  const targetBlankMatches =
    content.match(/<[^>]*target="_blank"[\s\S]*?>/g) || []
  assert.ok(
    targetBlankMatches.length > 0,
    'Expected at least one target="_blank" in page.tsx',
  )

  for (const tag of targetBlankMatches) {
    assert.match(
      tag,
      /target="_blank"\s+rel="noopener noreferrer"/,
      `tag containing target="_blank" must be followed by rel="noopener noreferrer" before tag closes: ${tag}`,
    )
  }
})
