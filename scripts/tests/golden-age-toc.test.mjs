import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'

import {
  extractChapterToc,
  isBareNumeralHeading,
} from '../../app/golden-age/lib/extractChapterToc.ts'

test('isBareNumeralHeading matches roman and arabic labels only', () => {
  assert.equal(isBareNumeralHeading('I.'), true)
  assert.equal(isBareNumeralHeading('XI.'), true)
  assert.equal(isBareNumeralHeading('XI'), true)
  assert.equal(isBareNumeralHeading('3.'), true)
  assert.equal(isBareNumeralHeading('II. The History You Carry'), false)
  assert.equal(isBareNumeralHeading('I. Something'), false)
})

test('extractChapterToc skips bare numeral headings and meta titles', () => {
  const markdown = [
    '# CHAPTER 1: WHEN CREATION CALLS',
    '',
    '## I.',
    '',
    'Something in you already knows.',
    '',
    '## II. The History You Carry',
    '',
    'For most of human history.',
    '',
    '## XI.',
    '',
    'Welcome to the golden age of creators.',
    '',
    '## Sources for Updated Statistics',
    '',
    '## Quotable Passages from This Chapter',
  ].join('\n')

  const items = extractChapterToc(markdown)
  assert.deepEqual(
    items.map((item) => item.text),
    ['II. The History You Carry'],
  )
  assert.equal(items[0].id, 'ii-the-history-you-carry')
  assert.equal(items[0].level, 2)
})

test('extractChapterToc on the real chapter-01 source omits I. and XI.', () => {
  const file = path.join(
    process.cwd(),
    'content',
    'golden-age-book',
    'chapter-01-when-creation-calls.md',
  )
  const content = fs.readFileSync(file, 'utf8')
  const items = extractChapterToc(content)
  const texts = items.map((item) => item.text)
  assert.ok(!texts.includes('I.'), 'should skip bare I.')
  assert.ok(!texts.includes('XI.'), 'should skip bare XI.')
  assert.ok(texts.includes('II. The History You Carry'))
  assert.ok(texts.includes('X. The Threshold'))
  assert.ok(!texts.some((t) => /chapter|source|quotable/i.test(t)))
})