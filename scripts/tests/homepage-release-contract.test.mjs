import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const readRepoFile = (path) => readFile(new URL(`../../${path}`, import.meta.url), 'utf8')
const OVERLAY_OPEN_TAG_PATTERN = /<div\b(?=[^>]*\bdata-home-proof-overlay\b)[^>]*>/
const DIV_TAG_PATTERN = /<\/?div\b[^>]*>/
const CLASS_NAME_PATTERN = /\bclassName="([^"]+)"/
const ORDERED_LIST_TAG_PATTERN = /<ol\b[^>]*>/
const WHITESPACE_PATTERN = /\s+/

const extractElementSource = (source, openingPattern) => {
  const openingMatch = source.match(openingPattern)
  if (openingMatch?.index === undefined) return undefined

  let depth = 0
  let cursor = openingMatch.index

  while (cursor < source.length) {
    const tag = source.slice(cursor).match(DIV_TAG_PATTERN)
    if (tag?.index === undefined) break

    const tagStart = cursor + tag.index
    const tagEnd = tagStart + tag[0].length
    depth += tag[0].startsWith('</') ? -1 : 1
    if (depth === 0) return source.slice(openingMatch.index, tagEnd)
    cursor = tagEnd
  }

  return undefined
}

test('homepage repository proof derives from the canonical social registry', async () => {
  const homepage = await readRepoFile('components/home/FrankXProductionHome.tsx')

  assert.match(homepage, /import \{ socialLinks \} from '@\/lib\/social-links'/)
  assert.match(homepage, /href: `\$\{socialLinks\.github\}\/agentic-creator-os`/)
  assert.doesNotMatch(homepage, /https:\/\/github\.com\/frankxai/)
})

test('homepage direction evidence records the three alternatives without claiming an unverified ship', async () => {
  const rawEvidence = await readRepoFile('docs/premium-web-os/frankx-public-workbench-direction-selection.json')
  const evidence = JSON.parse(rawEvidence)

  assert.doesNotMatch(rawEvidence, /[A-Za-z]:[\\/](?:Users|home)[\\/]/)
  assert.equal(evidence.directions.length, 3)
  assert.equal(evidence.decision.selected, 'public-workbench')
  assert.equal(evidence.baseline.desktop.status, 'captured')
  assert.equal(evidence.baseline.mobile.status, 'pending')
  assert.equal(evidence.release_status, 'build')
  assert.equal(evidence.production_receipt, 'not-created')
})

test('portrait proof overlay is bounded by the card at narrow widths', async () => {
  const homepage = await readRepoFile('components/home/FrankXProductionHome.tsx')
  const overlayMarkup = extractElementSource(homepage, OVERLAY_OPEN_TAG_PATTERN)
  const overlayOpenTag = overlayMarkup?.match(OVERLAY_OPEN_TAG_PATTERN)?.[0]
  const overlayClasses = overlayOpenTag?.match(CLASS_NAME_PATTERN)?.[1].split(WHITESPACE_PATTERN) ?? []
  const sequenceClasses =
    overlayMarkup?.match(ORDERED_LIST_TAG_PATTERN)?.[0]
      .match(CLASS_NAME_PATTERN)?.[1]
      .split(WHITESPACE_PATTERN) ?? []

  assert.ok(overlayMarkup, 'proof overlay must remain addressable')
  for (const token of [
    'absolute',
    'inset-x-0',
    'bottom-0',
    'min-w-0',
    'max-w-full',
    'p-5',
    'min-[360px]:p-6',
    'sm:p-8',
  ]) {
    assert.ok(overlayClasses.includes(token), `proof overlay must retain ${token}`)
  }
  assert.ok(sequenceClasses.includes('max-w-full'), 'proof sequence must stay bounded at narrow widths')
  assert.ok(sequenceClasses.includes('grid-cols-2'), 'proof sequence must keep a compact two-column map')
  assert.ok(sequenceClasses.includes('sm:max-w-sm'), 'proof sequence must preserve its desktop measure')
})

test('overlay source extraction includes nested divs and stops at the matching close', () => {
  const source = `<section>
    <div className="proof" data-home-proof-overlay>
      <p className="copy">Proof</p>
      <div className="nested"><p>Nested detail</p></div>
    </div>
    <div>Unrelated sibling</div>
  </section>`
  const overlayMarkup = extractElementSource(source, OVERLAY_OPEN_TAG_PATTERN)

  assert.match(overlayMarkup, /Nested detail/)
  assert.doesNotMatch(overlayMarkup, /Unrelated sibling/)
})

test('overlay source extraction has no shared state between calls', () => {
  const firstSource = '<div data-home-proof-overlay><p>First</p></div>'
  const secondSource = '<div data-home-proof-overlay><div><p>Second</p></div></div>'

  assert.match(extractElementSource(firstSource, OVERLAY_OPEN_TAG_PATTERN), /First/)
  assert.match(extractElementSource(secondSource, OVERLAY_OPEN_TAG_PATTERN), /Second/)
  assert.match(extractElementSource(firstSource, OVERLAY_OPEN_TAG_PATTERN), /First/)
})
