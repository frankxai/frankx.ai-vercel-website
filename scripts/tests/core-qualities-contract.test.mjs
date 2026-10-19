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

const extractScopedBlock = (source, startMarker, endMarker, label) => {
  const start = source.indexOf(startMarker)
  assert.notEqual(start, -1, `${label} start marker is missing`)

  const contentStart = start + startMarker.length
  const end = source.indexOf(endMarker, contentStart)
  assert.notEqual(end, -1, `${label} end marker is missing`)

  return source.slice(contentStart, end)
}

const extractIndentedObjects = (source, indent) => {
  const pattern = new RegExp(`^${indent}\\{([\\s\\S]*?)^${indent}\\},?$`, 'gm')
  return [...source.matchAll(pattern)].map((match) => match[1])
}

const qualityRecords = () =>
  extractIndentedObjects(
    extractScopedBlock(
      registry,
      'export const qualities: Quality[] = [\n',
      '\n]\n\nexport const qualitiesBySlug',
      'qualities registry',
    ),
    '  ',
  )

test('the canonical qualities registry has exactly four unique slugs', () => {
  const declared = registry
    .match(/qualitySlugs = \[([^\]]+)\]/s)?.[1]
    ?.match(/'([a-z-]+)'/g)
    ?.map((slug) => slug.slice(1, -1))
  const records = qualityRecords()
  const recordSlugs = records.map((record) => record.match(/^    slug: '([a-z-]+)'/m)?.[1])

  assert.deepEqual(declared, slugs)
  assert.deepEqual(recordSlugs, slugs)
  assert.equal(new Set(recordSlugs).size, slugs.length)
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
  const domainRecords = extractIndentedObjects(
    extractScopedBlock(
      researchDomains,
      'export const researchDomains: ResearchDomain[] = [\n',
      '\n]\n\n// Helper functions',
      'research domain registry',
    ),
    '  ',
  )
  const coreDomain = domainRecords.find((record) =>
    /^    slug: 'core-qualities-and-human-drives'/m.test(record),
  )
  assert.ok(coreDomain, 'cross-quality research domain is missing')

  const declaredSourceCount = Number(coreDomain.match(/^    sourceCount: (\d+),?$/m)?.[1])
  const coreSources = extractIndentedObjects(
    extractScopedBlock(
      researchSources,
      "  'core-qualities-and-human-drives': [\n",
      '\n  ],',
      'cross-quality research sources',
    ),
    '    ',
  )
  const meaningSources = extractIndentedObjects(
    extractScopedBlock(
      researchSources,
      "  'meaning-os': [\n",
      '\n  ],',
      'meaning research sources',
    ),
    '    ',
  )

  assert.equal(declaredSourceCount, 10)
  assert.equal(coreSources.length, declaredSourceCount)
  assert.ok(meaningSources.length > 0, 'meaning research sources are missing')
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
  const relationshipNotes = qualityRecords().flatMap((record) => {
    const slug = record.match(/^    slug: '([a-z-]+)'/m)?.[1]
    const evidenceRecords = extractIndentedObjects(
      extractScopedBlock(record, '    evidence: [\n', '\n    ],', `${slug} evidence`),
      '      ',
    )

    assert.equal(evidenceRecords.length, 3, `${slug} must have three evidence relationships`)
    assert.match(record, /^    shadow: /m, `${slug} shadow is missing`)
    assert.match(record, /^    researchQuestion:/m, `${slug} research question is missing`)
    assert.match(record, /^    ambition:/m, `${slug} ambition is missing`)

    return evidenceRecords.map((evidence, index) => {
      const note = evidence.match(/^        note: '(.+)',$/m)?.[1]
      assert.ok(note, `${slug} evidence relationship ${index + 1} needs an editorial note`)
      return note
    })
  })

  assert.equal(relationshipNotes.length, 12)
})
