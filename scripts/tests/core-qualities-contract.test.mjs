import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'

const root = process.cwd()
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')

const registry = read('lib/qualities.ts')
const overview = read('app/qualities/page.tsx')
const detail = read('app/qualities/[slug]/page.tsx')
const desktopNav = read('components/NavigationMega.tsx')
const mobileNav = read('components/MobileNavOverlay.tsx')
const footer = read('components/Footer.tsx')
const routeEnumerator = read('lib/route-enumeration.mjs')
const researchDomains = read('lib/research/domains.ts')
const researchSources = read('lib/research/sources.ts')
const legacyValues = read('content/blog/frankx-vision-mission-values.mdx')
const routeIndex = JSON.parse(read('data/route-index.json'))

const slugs = ['freedom', 'mastery', 'meaning', 'connection']

test('the canonical qualities registry has exactly four unique slugs', () => {
  const declared = registry
    .match(/qualitySlugs = \[([^\]]+)\]/s)?.[1]
    ?.match(/'([a-z-]+)'/g)
    ?.map((slug) => slug.slice(1, -1))

  assert.deepEqual(declared, slugs)
  assert.equal(new Set(declared).size, 4)
})

test('overview and detail routes expose metadata and structured data', () => {
  assert.match(overview, /createMetadata\(/)
  assert.match(overview, /type="CollectionPage"/)
  assert.match(overview, /type="BreadcrumbList"/)
  assert.match(detail, /generateStaticParams/)
  assert.match(detail, /generateMetadata/)
  assert.match(detail, /type="Article"/)
  assert.match(detail, /type="BreadcrumbList"/)
})

test('desktop, mobile, footer, and route discovery expose the qualities hub', () => {
  for (const source of [desktopNav, mobileNav, footer, routeEnumerator]) {
    assert.match(source, /\/qualities/)
  }

  for (const slug of slugs) {
    assert.match(routeEnumerator, new RegExp(`/qualities/${slug}`))
  }

  for (const href of [
    '/books/great-transition/chapter-05-what-you-own',
    '/books/self-development/chapter-04-craft',
    '/books/self-development/chapter-03-soul',
    '/books/the-wordless-laws-book-two/the-third-mind',
  ]) {
    assert.match(routeEnumerator, new RegExp(href))
  }
})

test('all commissioned quality images exist', () => {
  for (const slug of slugs) {
    const image = path.join(root, 'public', 'images', 'qualities', `${slug}.webp`)
    assert.equal(fs.existsSync(image), true, `${slug} image is missing`)
    assert.ok(fs.statSync(image).size > 10_000, `${slug} image is unexpectedly small`)
  }
})

test('research domain and source registry stay in parity', () => {
  assert.match(researchDomains, /slug: 'core-qualities-and-human-drives'/)
  assert.match(researchSources, /'core-qualities-and-human-drives': \[/)
  assert.match(researchSources, /'meaning-os': \[/)
  assert.match(researchDomains, /sourceCount: 10/)
  assert.ok(
    routeIndex.routes.some((route) => route.href === '/research/core-qualities-and-human-drives'),
    'cross-quality research route is missing from the generated route index',
  )
})

test('legacy six-value article points to the canonical four-quality system', () => {
  assert.match(legacyValues, /Editorial note, August 2026/)
  assert.match(legacyValues, /\[Freedom, Mastery, Meaning, and Connection\]\(\/qualities\)/)
  assert.match(legacyValues, /no longer the canonical list/)
})

test('quality relationships are explained, not merely linked', () => {
  const noteCount = (registry.match(/note:/g) || []).length
  assert.ok(noteCount >= 12, `expected at least 12 editorial relationship notes, found ${noteCount}`)
  assert.match(registry, /shadow:/)
  assert.match(registry, /researchQuestion:/)
  assert.match(registry, /ambition:/)
})
