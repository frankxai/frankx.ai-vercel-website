import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const source = readFileSync(new URL('../../app/workshops/ikigai-branding/present/page.tsx', import.meta.url), 'utf8')
const layout = readFileSync(new URL('../../app/workshops/ikigai-branding/present/layout.tsx', import.meta.url), 'utf8')

test('every blank target on the presenter page sets rel before the tag closes', () => {
  const tails = source.split('target="_blank"').slice(1)
  assert.equal(tails.length, 2)
  for (const tail of tails) {
    const close = tail.indexOf('>')
    assert.ok(close > 0)
    assert.match(tail.slice(0, close), /rel="noopener noreferrer"/)
  }
})

test('the presenter page keeps its title and heading', () => {
  assert.match(layout, /title: 'Ikigai & Branding · Presenter Mode'/)
  assert.match(source, /<h2[\s\S]*?\{slide\.title\}/)
  assert.equal(source.includes('transition-all'), false)
  assert.equal(source.includes('transition: all'), false)
  assert.equal(source.includes('checkout'), false)
})
