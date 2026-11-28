import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { test } from 'node:test'

import {
  amsterdamDraftIsVisible, amsterdamPhotos, fieldNotePath, fieldNoteSlug, universityInquiryPath,
} from '../../content/amsterdam/editorial.ts'

test('the article is eligible for local development and Vercel preview only', () => {
  const keys = ['NODE_ENV', 'VERCEL_ENV']
  const original = keys.map((key) => [key, process.env[key]])
  try {
    for (const [node, vercel, expected] of [
      ['development', undefined, true],
      ['production', 'preview', true],
      ['production', 'production', false],
      ['production', undefined, false],
      ['development', 'production', false],
      ['development', 'development', false],
    ]) {
      process.env.NODE_ENV = node
      if (vercel === undefined) delete process.env.VERCEL_ENV
      else process.env.VERCEL_ENV = vercel
      assert.equal(amsterdamDraftIsVisible(), expected)
    }
  } finally {
    for (const [key, value] of original) {
      if (value === undefined) delete process.env[key]
      else process.env[key] = value
    }
  }
})

test('draft text stays outside the public checkout and has a single canonical slug', () => {
  assert.equal(fieldNotePath, '/blog/' + fieldNoteSlug)
  assert.equal(existsSync('content/blog/_drafts/' + fieldNoteSlug + '.mdx'), false)
  assert.equal(existsSync('content/blog/' + fieldNoteSlug + '.mdx'), false)
  assert.doesNotMatch(readFileSync('app/sitemap.ts', 'utf8'), new RegExp(fieldNoteSlug))
})

test('the Amsterdam directory uses the existing university inquiry', () => {
  const url = new URL(universityInquiryPath, 'https://www.frankx.ai')
  assert.equal(url.pathname, '/partnerships/universities')
  assert.equal(url.search, '?via=amsterdam')
  assert.equal(url.hash, '#join')
})

test('documentary photos are local, WebP, sized and attributed', () => {
  for (const photo of Object.values(amsterdamPhotos)) {
    assert.match(photo.src, /^\/images\/amsterdam\/.+\.webp$/)
    assert.ok(photo.width && photo.height && photo.alt && photo.credit)
    assert.equal(new URL(photo.source).hostname, 'commons.wikimedia.org')
    const data = readFileSync('public' + photo.src)
    assert.equal(data.toString('ascii', 8, 12), 'WEBP')
    assert.ok(data.length < 370_000)
  }
})
