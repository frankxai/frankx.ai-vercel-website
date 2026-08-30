import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const BRAND_TITLE_SUFFIX =
  /(?:\s*[|·—–-]\s*)(?:FrankX(?:\.AI|\.ai)?|FrankX\.AI)\s*$/i

function stripBrandTitleSuffix(title) {
  let next = title.trim()
  for (let i = 0; i < 2; i += 1) {
    const stripped = next.replace(BRAND_TITLE_SUFFIX, '').trim()
    if (stripped === next || stripped.length === 0) break
    next = stripped
  }
  return next
}

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
  assert.equal(
    stripBrandTitleSuffix('Design Lab | FrankX.AI'),
    'Design Lab',
  )
  assert.equal(
    stripBrandTitleSuffix('The FrankX Library'),
    'The FrankX Library',
  )
  assert.equal(
    stripBrandTitleSuffix('Testimonials | What Builders Say About FrankX | FrankX'),
    'Testimonials | What Builders Say About FrankX',
  )
})
