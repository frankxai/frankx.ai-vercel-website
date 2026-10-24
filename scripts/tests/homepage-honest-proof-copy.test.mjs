import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

import { heroOf, normalise, renderedTest, textContent } from './helpers/homepage-rendered.mjs'

const read = (relative) => readFileSync(new URL(relative, import.meta.url), 'utf8')
const routes = read('../../components/home/SignalRouteSelector.tsx')

renderedTest('homepage hero drops the unsourced track count', (document) => {
  const { hero } = heroOf(document)
  const heroText = normalise(textContent(hero))
  assert.ok(heroText.includes('Excellence and agentic operating systems\u2014built'))
  assert.ok(!normalise(textContent(document)).includes('twelve thousand tracks of studio craft'))
})

test('signal routes carry no unsourced proof figures', () => {
  for (const claim of [
    'Songs made with Suno',
    '100 creator tools benchmarked',
    '630+ AI skills shipped across the operating system.',
  ]) assert.ok(!routes.includes(claim), claim)
  assert.ok(routes.includes('{route.proof ? ('), 'proof box renders only when a route has proof text')
})
