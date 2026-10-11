import assert from 'node:assert/strict'

import { classTokens, closest, findAll, heroOf, renderedTest } from './helpers/homepage-rendered.mjs'

// Asserts the server-rendered hero, not the class strings in components/home.
// The behaviour: at a 320px viewport nothing in the hero's text column forces
// the page wider than the screen, and the CTAs stack full-width with labels
// that wrap.

const NARROWEST_CONTENT = 288 // 320px viewport minus the hero's 16px gutters
const fixedPixels = (token) => Number(token.match(/^(?:min-)?w-\[(\d+)px\]$/)?.[1] ?? 0)
const isFilled = (node) =>
  classTokens(node).some((token) => /^bg-(?!white\b|black\b|transparent\b|clip-|gradient-|\[)[a-z]+-\d{2,3}$/.test(token))

renderedTest('hero identity column and CTAs shrink inside a 320px viewport', (document) => {
  const { h1, hero } = heroOf(document)

  // Grid and flex items default to min-width:auto, so one long word in the
  // headline column would stretch the whole grid. The column must opt out.
  const column = closest(h1, (node) => {
    const parent = node.parent
    return Boolean(parent?.tag) && classTokens(parent).some((token) => token === 'grid' || token === 'flex')
  })
  assert.ok(column, 'the headline sits in a layout column')
  assert.ok(classTokens(column).includes('min-w-0'), 'the headline column must be allowed to shrink (min-w-0)')

  for (const node of [column, ...findAll(column, () => true)]) {
    const tokens = classTokens(node)
    assert.ok(!tokens.includes('whitespace-nowrap'), `unwrappable text in the hero column: <${node.tag} class="${node.attrs.class}">`)
    for (const token of tokens) {
      assert.ok(fixedPixels(token) <= NARROWEST_CONTENT, `fixed width wider than a 320px screen: ${token}`)
    }
  }

  const primary = findAll(hero, (node) => node.tag === 'a' && /^\/(?!\/)/.test(node.attrs.href ?? '') && isFilled(node))
  assert.equal(primary.length, 1, 'expected one primary hero CTA')
  const group = primary[0].parent
  const ctas = findAll(group, (node) => node.tag === 'a')
  assert.ok(ctas.some((node) => node.attrs.href === '/ai-architecture'), 'primary CTA routes to /ai-architecture')
  assert.ok(ctas.some((node) => node.attrs.href === '/ecosystem'), 'secondary CTA routes to /ecosystem')

  const groupTokens = classTokens(group)
  assert.ok(
    !groupTokens.includes('flex') || groupTokens.includes('flex-col') || groupTokens.includes('flex-wrap'),
    'CTAs must stack (or wrap) at the narrowest width',
  )
  for (const cta of ctas) {
    const tokens = classTokens(cta)
    assert.ok(tokens.includes('w-full'), `${cta.attrs.href}: CTA must span the column on small screens`)
    assert.ok(tokens.includes('min-w-0') || tokens.includes('max-w-full'), `${cta.attrs.href}: CTA must be allowed to shrink`)
    assert.ok(!tokens.some((token) => /^h-\d+$/.test(token)), `${cta.attrs.href}: fixed CTA height would clip a wrapped label`)
  }
})
