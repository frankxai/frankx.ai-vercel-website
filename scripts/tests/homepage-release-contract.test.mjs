import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const readRepoFile = (path) => readFile(new URL(`../../${path}`, import.meta.url), 'utf8')
const PROOF_OPEN_TAG_PATTERN = /<figcaption\b(?=[^>]*\bdata-home-proof-overlay\b)[^>]*>/
const CLASS_NAME_PATTERN = /\bclassName="([^"]+)"/
const WHITESPACE_PATTERN = /\s+/

const extractProofCaption = (source) => {
  const openingMatch = source.match(PROOF_OPEN_TAG_PATTERN)
  if (openingMatch?.index === undefined) return undefined
  const closingIndex = source.indexOf('</figcaption>', openingMatch.index)
  if (closingIndex === -1) return undefined
  return source.slice(openingMatch.index, closingIndex + '</figcaption>'.length)
}

test('homepage proof routes are internal, explicit, and stable', async () => {
  const homepage = await readRepoFile('components/home/FrankXProductionHome.tsx')

  assert.match(homepage, /href: '\/blog\/production-agentic-ai-systems'/)
  assert.match(homepage, /href: '\/ai-architecture\/blueprints'/)
  assert.match(homepage, /href: '\/journal'/)
  assert.doesNotMatch(homepage, /target="_blank"/)
  assert.doesNotMatch(homepage, /https:\/\/github\.com\/frankxai/)
})

test('homepage release evidence is portable and records the verified ship state', async () => {
  const rawEvidence = await readRepoFile(
    'docs/premium-web-os/frankx-production-home-design-loop-evidence.json',
  )
  const evidence = JSON.parse(rawEvidence)
  const mobileCheck = evidence.checks.find((check) => check.name === 'mobile-first-viewport')

  assert.doesNotMatch(rawEvidence, /[A-Za-z]:[\\/](?:Users|home)[\\/]/)
  assert.equal(mobileCheck?.status, 'pass')
  assert.equal(evidence.score.total, 28)
  assert.equal(evidence.score.max, 30)
  assert.equal(evidence.decision, 'ship')
  assert.ok(evidence.artifacts.every((artifact) => !artifact.path_or_url.startsWith('file:')))
})

test('portrait proof caption is bounded by the card at narrow widths', async () => {
  const homepage = await readRepoFile('components/home/FrankXProductionHome.tsx')
  const captionMarkup = extractProofCaption(homepage)
  const captionOpenTag = captionMarkup?.match(PROOF_OPEN_TAG_PATTERN)?.[0]
  const captionClasses =
    captionOpenTag?.match(CLASS_NAME_PATTERN)?.[1].split(WHITESPACE_PATTERN) ?? []

  assert.ok(captionMarkup, 'proof caption must remain addressable')
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
    assert.ok(captionClasses.includes(token), `proof caption must retain ${token}`)
  }
  assert.match(captionMarkup, /max-w-full text-base/)
  assert.match(captionMarkup, /sm:max-w-sm/)
})

test('primary actions expose focus states and reduced-motion-safe transforms', async () => {
  const homepage = await readRepoFile('components/home/FrankXProductionHome.tsx')
  const start = await readRepoFile('app/start/page.tsx')
  const footer = await readRepoFile('components/Footer.tsx')

  for (const source of [homepage, start, footer]) {
    assert.match(source, /focus-visible:ring-2/)
  }
  assert.match(homepage, /motion-reduce:transform-none/)
  assert.match(start, /motion-reduce:transform-none/)
  assert.match(footer, /prefers-reduced-motion: reduce/)
})
