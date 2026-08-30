import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

import { stripBrandTitleSuffix } from '../../lib/seo.ts'

test('createMetadata strips a trailing FrankX suffix so the root title template cannot double-brand', async () => {
  const src = await readFile('lib/seo.ts', 'utf8')
  assert.match(src, /export function stripBrandTitleSuffix/)
  assert.match(src, /const pageTitle = stripBrandTitleSuffix\(title\)/)
  assert.match(src, /title: pageTitle/)
  assert.match(src, /title: socialTitle/)
  assert.doesNotMatch(
    src.slice(src.indexOf('return {')),
    /^\s+title,$/m,
    'raw title must not be forwarded into Metadata.title',
  )
})

test('trailing brand suffixes collapse once without eating titles that mention FrankX in the body', () => {
  assert.equal(
    stripBrandTitleSuffix('Tools | ROI Calculator, Strategy Canvas & More | FrankX'),
    'Tools | ROI Calculator, Strategy Canvas & More',
  )
  assert.equal(stripBrandTitleSuffix('Design Lab | FrankX.AI'), 'Design Lab')
  assert.equal(stripBrandTitleSuffix('The FrankX Library'), 'The FrankX Library')
  assert.equal(
    stripBrandTitleSuffix('Testimonials | What Builders Say About FrankX | FrankX'),
    'Testimonials | What Builders Say About FrankX',
  )
  assert.equal(
    stripBrandTitleSuffix('Something-FrankX'),
    'Something-FrankX',
    'glued hyphen must not count as a brand separator',
  )
})
