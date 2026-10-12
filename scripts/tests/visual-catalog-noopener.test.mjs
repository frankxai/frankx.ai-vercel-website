import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const source = readFileSync(new URL('../../app/research/visual-catalog/page.tsx', import.meta.url), 'utf8')
const layout = readFileSync(new URL('../../app/research/layout.tsx', import.meta.url), 'utf8')

test('every blank target on the visual catalog sets rel before the tag closes', () => {
  const tails = source.split('target="_blank"').slice(1)
  assert.equal(tails.length, 2)
  for (const tail of tails) {
    const close = tail.indexOf('>')
    assert.ok(close > 0)
    assert.match(tail.slice(0, close), /rel="noopener noreferrer"/)
  }
})

test('the catalog blog link no longer uses transition-all', () => {
  const blog = source.slice(source.indexOf('View Active Page') - 500, source.indexOf('View Active Page'))
  assert.match(blog, /target="_blank"/)
  assert.match(blog, /rel="noopener noreferrer"/)
  assert.equal(blog.includes('transition-all'), false)
  assert.match(blog, /transition-colors ease-out/)
})

test('the catalog keeps its document title, heading, and has no checkout', () => {
  assert.match(layout, /title: 'Research Hubs: AI, Creative Systems & Human Potential'/)
  assert.match(source, /<h1[\s\S]*?Visual Registry & Prompt Catalog/)
  assert.equal(source.includes('transition-all'), false)
  assert.equal(source.includes('transition: all'), false)
  assert.equal(source.includes('checkout'), false)
})
