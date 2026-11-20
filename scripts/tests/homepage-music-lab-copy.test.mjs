import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

import { closest, descendants, find, isElement, normalise, renderedTest, textContent } from './helpers/homepage-rendered.mjs'

const routes = readFileSync(new URL('../../components/home/SignalRouteSelector.tsx', import.meta.url), 'utf8')

// Asserts the server-rendered homepage, not the JSX in components/home.
const musicLabSection = (document) => {
  const heading = find(document, (node) => node.tag === 'h2' && normalise(textContent(node)) === 'Music Lab')
  assert.ok(heading, 'the homepage renders the Music Lab room')
  return { heading, section: closest(heading, (node) => node.tag === 'section') }
}

const CARD_DESCRIPTION = 'Playable browser instruments (violin, piano, drums, and pads) with guided notes and tabs.'

// The Music Lab card elsewhere on the page: the nearest link or list item
// around its description.
const musicLabCard = (document) => {
  let description
  for (const node of descendants(document)) {
    if (normalise(textContent(node)) === CARD_DESCRIPTION) description = node
  }
  assert.ok(description, 'the homepage renders the Music Lab card description')
  return closest(description, (node) => ['a', 'article', 'li'].includes(node.tag)) ?? description.parent
}

renderedTest('homepage Music Lab copy drops the invented workflow, frequency and daily claims', (document) => {
  const { section } = musicLabSection(document)
  const text = [section, musicLabCard(document)].map((node) => normalise(textContent(node))).join(' ')
  for (const claim of [
    'Suno production workflows',
    'genre-focused frequency field guides',
    'Suno prompt systems',
    'daily studio practice',
    'Public music room and studio notes.',
  ]) {
    assert.ok(!text.includes(claim), claim)
  }
  assert.ok(!text.includes('AI music production'), 'old "AI music production" eyebrow')
})

renderedTest('homepage Music Lab copy describes the playable browser instruments /music-lab ships', (document) => {
  const text = normalise(textContent(document))
  assert.ok(musicLabCard(document))
  assert.ok(
    text.includes(
      'Playable browser instruments (violin, piano, drums, and pads) with guided notes and tabs, next to a working archive of AI songs and production notes.',
    ),
  )
})

renderedTest('the Music Lab proof room keeps a factual eyebrow above its heading', (document) => {
  const { heading } = musicLabSection(document)
  const siblings = heading.parent.children.filter(isElement)
  const eyebrow = siblings[siblings.indexOf(heading) - 1]
  assert.ok(eyebrow, 'an eyebrow precedes the Music Lab heading')
  assert.equal(normalise(textContent(eyebrow)), 'Browser instruments')
})

test('the Creator Systems route describes the GenCreator workspace, not Suno or a tool count', () => {
  for (const claim of ['Suno audio', '100-tool', 'Suno prompt systems', 'video, or song shippable']) {
    assert.ok(!routes.includes(claim), claim)
  }
  assert.ok(routes.includes("title: 'Make the next campaign, article, or video script shippable.'"))
  assert.ok(
    routes.includes(
      "'The GenCreator workspace: turn one source idea into a social campaign, long-form article or video script, with proof checks, review notes and a portable export.'",
    ),
  )
  assert.ok(routes.includes("checks: ['Social campaigns', 'Long-form articles', 'Video scripts', 'Portable export']"))
})
