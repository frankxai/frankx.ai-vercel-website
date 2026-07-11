import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const readRepoFile = (path) => readFile(new URL(`../../${path}`, import.meta.url), 'utf8')
const OVERLAY_OPEN_TAG_PATTERN = /<div\b(?=[^>]*\bdata-home-proof-overlay\b)[^>]*>/
const DIV_TAG_PATTERN = /<\/?div\b[^>]*>/
const CLASS_NAME_PATTERN = /\bclassName="([^"]+)"/
const PARAGRAPH_TAG_PATTERN = /<p\b[^>]*>/g
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

test('homepage release evidence is portable and records the verified ship state', async () => {
  const rawEvidence = await readRepoFile('docs/premium-web-os/frankx-production-home-design-loop-evidence.json')
  const evidence = JSON.parse(rawEvidence)
  const mobileCheck = evidence.checks.find((check) => check.name === 'mobile-first-viewport')

  assert.doesNotMatch(rawEvidence, /[A-Za-z]:[\\/](?:Users|home)[\\/]/)
  assert.equal(mobileCheck?.status, 'pass')
  assert.equal(evidence.score.total, 28)
  assert.equal(evidence.score.max, 30)
  assert.equal(evidence.decision, 'ship')
  assert.ok(evidence.artifacts.every((artifact) => !artifact.path_or_url.startsWith('file:')))
})

test('portrait proof overlay is bounded by the card at narrow widths', async () => {
  const homepage = await readRepoFile('components/home/FrankXProductionHome.tsx')
  const overlayMarkup = extractElementSource(homepage, OVERLAY_OPEN_TAG_PATTERN)
  const overlayOpenTag = overlayMarkup?.match(OVERLAY_OPEN_TAG_PATTERN)?.[0]
  const overlayClasses = overlayOpenTag?.match(CLASS_NAME_PATTERN)?.[1].split(WHITESPACE_PATTERN) ?? []
  const copyClasses = Array.from(overlayMarkup?.matchAll(PARAGRAPH_TAG_PATTERN) ?? [], (match) =>
    (match[0].match(CLASS_NAME_PATTERN)?.[1] ?? '').split(WHITESPACE_PATTERN),
  )
    .find((classes) => classes.includes('text-base'))

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
  assert.ok(copyClasses?.includes('max-w-full'), 'proof copy must stay bounded at narrow widths')
  assert.ok(copyClasses?.includes('sm:max-w-sm'), 'proof copy must preserve its desktop measure')
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
