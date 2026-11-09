import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const source = readFileSync(new URL('../../app/admin/content-studio/page.tsx', import.meta.url), 'utf8')

test('content studio share windows set noopener', () => {
  assert.equal(source.includes("window.open('https://www.linkedin.com/feed/?shareActive=true', '_blank', 'noopener,noreferrer');"), true)
  assert.equal(source.includes("window.open(url, '_blank', 'noopener,noreferrer');"), true)
  assert.equal(source.includes("window.open('https://www.linkedin.com/feed/?shareActive=true', '_blank');"), false)
  assert.equal(source.includes("window.open(url, '_blank');"), false)
  assert.equal(source.includes('https://www.linkedin.com/feed/?shareActive=true'), true)
  assert.equal(source.includes('https://twitter.com/intent/tweet'), true)
})
