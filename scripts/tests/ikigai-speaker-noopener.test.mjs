import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

test('every target="_blank" in ikigai branding present page is followed by rel="noopener noreferrer" before tag closes', async () => {
  const pageUrl = new URL(
    '../../app/workshops/ikigai-branding/present/page.tsx',
    import.meta.url,
  )
  const content = await readFile(pageUrl, 'utf8')

  const matches = Array.from(content.matchAll(/target="_blank"/g))
  assert.ok(matches.length > 0, 'Found target="_blank" elements')

  for (const match of matches) {
    const startIndex = match.index
    const tagEndIndex = content.indexOf('>', startIndex)
    assert.ok(
      tagEndIndex !== -1,
      'Tag closing ">" should exist after target="_blank"',
    )

    const tagChunk = content.slice(startIndex, tagEndIndex)
    assert.ok(
      tagChunk.includes('rel="noopener noreferrer"'),
      `Tag with target="_blank" at position ${startIndex} missing rel="noopener noreferrer"`,
    )
  }
})
