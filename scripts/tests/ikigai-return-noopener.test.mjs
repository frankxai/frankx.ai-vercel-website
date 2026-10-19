import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const source = readFileSync(new URL('../../app/workshops/ikigai-branding/present/speaker/page.tsx', import.meta.url), 'utf8')
const layout = readFileSync(new URL('../../app/workshops/ikigai-branding/present/speaker/layout.tsx', import.meta.url), 'utf8')

test('every blank target on the speaker page sets rel before the tag closes', () => {
  const tails = source.split('target="_blank"').slice(1)
  assert.equal(tails.length, 1)
  for (const tail of tails) {
    const close = tail.indexOf('>')
    assert.ok(close > 0)
    assert.match(tail.slice(0, close), /rel="noopener noreferrer"/)
  }
})

test('the speaker page keeps its title and heading', () => {
  assert.match(layout, /title: 'Ikigai & Branding · Speaker View'/)
  assert.match(source, /<h2[\s\S]*?\{slide\.title\}/)
  assert.equal(source.includes('transition-all'), false)
  assert.equal(source.includes('transition: all'), false)
  assert.equal(source.includes('checkout'), false)
})
