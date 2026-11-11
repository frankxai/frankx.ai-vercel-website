import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'

import {
  extractChapterToc,
  isBareNumeralHeading,
  labelBareNumeralHeading,
  tocHeadingSourceText,
} from '../../app/golden-age/lib/extractChapterToc.ts'

const book = (...parts) => path.join(process.cwd(), 'content', 'golden-age-book', ...parts)

test('isBareNumeralHeading matches roman and arabic labels only', () => {
  assert.equal(isBareNumeralHeading('I.'), true)
  assert.equal(isBareNumeralHeading('XI.'), true)
  assert.equal(isBareNumeralHeading('XI'), true)
  assert.equal(isBareNumeralHeading('3.'), true)
  assert.equal(isBareNumeralHeading('II. The History You Carry'), false)
  assert.equal(isBareNumeralHeading('I. Something'), false)
})

test('labelBareNumeralHeading uses a Section prefix without a trailing period', () => {
  assert.equal(labelBareNumeralHeading('I.'), 'Section I')
  assert.equal(labelBareNumeralHeading('VIII.'), 'Section VIII')
  assert.equal(labelBareNumeralHeading('XI'), 'Section XI')
})

test('mixed chapter skips bare numerals and keeps titled headings', () => {
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
  assert.equal(items[0].sourceText, 'II. The History You Carry')
})

test('extractChapterToc on the real chapter-01 source omits I. and XI.', () => {
  const content = fs.readFileSync(book('chapter-01-when-creation-calls.md'), 'utf8')
  const items = extractChapterToc(content)
  const texts = items.map((item) => item.text)
  assert.ok(!texts.includes('I.'), 'should skip bare I.')
  assert.ok(!texts.includes('XI.'), 'should skip bare XI.')
  assert.ok(!texts.includes('Section I'))
  assert.ok(!texts.includes('Section XI'))
  assert.ok(texts.includes('II. The History You Carry'))
  assert.ok(texts.includes('X. The Threshold'))
  assert.ok(!texts.some((t) => /chapter|source|quotable/i.test(t)))
})

test('numerals-only chapter keeps labelled Section entries and is not empty', () => {
  const markdown = [
    '# CHAPTER 2: THE ORCHESTRATION AGE',
    '',
    '## I.',
    '',
    'Body of section I.',
    '',
    '## II.',
    '',
    'Body of section II.',
    '',
    '## VIII.',
    '',
    '## Quotable Passages',
  ].join('\n')

  const items = extractChapterToc(markdown)
  assert.ok(items.length > 0, 'TOC must not be empty')
  assert.deepEqual(
    items.map((item) => item.text),
    ['Section I', 'Section II', 'Section VIII'],
  )
  assert.deepEqual(
    items.map((item) => item.id),
    ['i', 'ii', 'viii'],
  )
  assert.equal(tocHeadingSourceText(items[0]), 'I.')
  assert.equal(items[0].sourceText, 'I.')
  assert.equal(items[0].level, 2)
})

test('real chapter-02 and chapter-03 sources keep labelled numeral TOC entries', () => {
  for (const file of [
    'chapter-02-the-orchestration-age.md',
    'chapter-03-the-first-gesture.md',
  ]) {
    const items = extractChapterToc(fs.readFileSync(book(file), 'utf8'))
    assert.ok(items.length > 0, `${file} TOC must not be empty`)
    assert.deepEqual(
      items.map((item) => item.text),
      ['Section I', 'Section II', 'Section III', 'Section IV', 'Section V', 'Section VI', 'Section VII', 'Section VIII'],
      file,
    )
    assert.deepEqual(
      items.map((item) => item.id),
      ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii'],
      file,
    )
    assert.equal(items[0].sourceText, 'I.')
    assert.ok(!items.some((item) => /chapter|source|quotable/i.test(item.text)))
  }
})
