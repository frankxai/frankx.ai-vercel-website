import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

const source = readFileSync(new URL('../../app/sitemap.ts', import.meta.url), 'utf8')

test('sitemap never stamps the build time as lastmod', () => {
  assert.doesNotMatch(source, /new Date\(\)\.toISOString\(\)/)
  assert.doesNotMatch(source, /lastModified:\s*new Date\(\)/)
  assert.doesNotMatch(source, /currentDate/)
})

test('free-text frontmatter dates go through a parser that cannot throw', () => {
  assert.doesNotMatch(source, /new Date\(\w+\.date\)\.toISOString\(\)/)
  assert.match(source, /Number\.isNaN\(parsed\.getTime\(\)\) \? undefined/)
})
