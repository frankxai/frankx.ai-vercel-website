import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

import {
  classTokens,
  descendants,
  find,
  findAll,
  heroOf,
  normalise,
  renderedTest,
  textContent,
  whiteTextOpacity,
} from './helpers/homepage-rendered.mjs'

const readRepoFile = (path) => readFile(new URL(`../../${path}`, import.meta.url), 'utf8')

test('primary public routes emit direct www canonicals', async () => {
  const seo = await readRepoFile('lib/seo.ts')
  const criticalRoutes = await Promise.all(
    [
      'app/page.tsx',
      'app/start/page.tsx',
      'app/blog/[slug]/page.tsx',
      'app/journal/page.tsx',
      'app/mvu/page.tsx',
      'app/mvu/[slug]/page.tsx',
      'app/mvu/lab/page.tsx',
      'app/(landing)/connect/page.tsx',
      'app/vault/(index)/page.tsx',
    ].map(readRepoFile),
  )

  assert.match(seo, /const siteUrl = 'https:\/\/www\.frankx\.ai'/)
  for (const source of criticalRoutes) {
    assert.doesNotMatch(source, /https:\/\/frankx\.ai/)
  }
})

test('shared email capture has a named, labelled field and an inline privacy boundary', async () => {
  const signup = await readRepoFile('components/email-signup.tsx')
  const connectSignup = await readRepoFile('components/connect/ConnectNewsletterForm.tsx')

  for (const source of [signup, connectSignup]) {
    assert.match(source, /type="email"/)
    assert.match(source, /name="email"/)
    assert.match(source, /autoComplete="email"/)
    assert.match(source, /required/)
    assert.match(source, /Email address/i)
    assert.match(source, /Privacy details/)
    assert.match(source, /href="\/privacy"/)
  }

  assert.doesNotMatch(signup, />Leave this field blank</)
  assert.match(signup, /aria-hidden="true"/)
  assert.match(connectSignup, /name="website"/)
  assert.match(connectSignup, /tabIndex=\{-1\}/)
  assert.match(connectSignup, /JSON\.stringify\(\{ email, website,/)
})

test('shared navigation exposes one named navigation landmark', async () => {
  const navigation = await readRepoFile('components/NavigationMega.tsx')

  assert.match(navigation, /<NavigationMenu\.Root/)
  assert.doesNotMatch(
    navigation,
    /<nav className="mx-auto flex h-14 sm:h-16 max-w-6xl items-center justify-between/,
  )
})

test('verified MVU link-name regressions stay closed', async () => {
  const mvu = await readRepoFile('app/mvu/page.tsx')

  // Each note's visible title remains inside its link, so the accessible name
  // is specific without replacing the richer card content with aria-label.
  assert.match(mvu, /href=\{`\/mvu\/\$\{entry\.slug\}`\}[\s\S]*?\{entry\.title\}/)
})

// The homepage half of the verified-contrast contract reads the server-rendered
// homepage (helpers/homepage-rendered.mjs) instead of class strings in
// components/home, so the markup can move without loosening the floor.
const effectiveWhiteOpacity = (node) => {
  for (let current = node; current?.tag; current = current.parent) {
    const opacity = whiteTextOpacity(current)
    if (opacity !== undefined) return opacity
  }
  return undefined
}

const textElement = (scope, text) => {
  let match
  for (const node of descendants(scope)) {
    if (normalise(textContent(node)).includes(text)) match = node
  }
  assert.ok(match, `expected rendered text: ${text}`)
  return match
}

async function featuredStudioNote() {
  const release = await readRepoFile('data/homepage-featured-release.ts')
  const note = release.match(/studioNote:\s*(['"`])([\s\S]*?)\1/)?.[2]
  assert.ok(note, 'featured release record must carry a studio note')
  return normalise(note).slice(0, 48)
}

renderedTest('homepage hero keeps verified contrast and no scroll-progress hairline', async (document) => {
  const { hero } = heroOf(document)

  for (const [label, text, floor] of [
    ['founder quote', 'I build to understand', 70],
    ['Oracle disclaimer', 'Independent project by former Oracle AI architect', 70],
    ['studio note', await featuredStudioNote(), 60],
  ]) {
    const opacity = effectiveWhiteOpacity(textElement(hero, text))
    assert.ok(opacity !== undefined && opacity >= floor, `${label}: text-white/${opacity} is below the verified /${floor} floor`)
  }

  // Bright emerald fills carry dark text; white on emerald-500 fails contrast.
  const primary = findAll(
    hero,
    (node) =>
      node.tag === 'a' &&
      /^\/(?!\/)/.test(node.attrs.href ?? '') &&
      classTokens(node).some((token) => /^bg-emerald-\d{3}$/.test(token)),
  )
  assert.ok(primary.length > 0, 'the primary hero CTA keeps its emerald fill')
  for (const cta of primary) {
    const tokens = classTokens(cta)
    assert.ok(
      tokens.some((token) => /^text-(?:black|void|\[#0[0-9a-f]{2,5}\])$/i.test(token)),
      `${cta.attrs.href}: emerald CTA needs dark text`,
    )
    assert.ok(!tokens.some((token) => /^text-white(?:\/|$)/.test(token)), `${cta.attrs.href}: no white text on emerald`)
  }

  // #407 removed the fixed scroll-progress hairline; it must not come back.
  const main = find(document, (node) => node.tag === 'main')
  const hairlines = findAll(main, (node) => {
    const tokens = classTokens(node)
    return (
      tokens.includes('fixed') &&
      (tokens.includes('top-0') || tokens.includes('inset-x-0')) &&
      tokens.some((token) => /^h-(?:px|\[[12]px\]|0\.5|1)$/.test(token))
    )
  })
  assert.equal(hairlines.length, 0, 'no fixed scroll-progress bar on the homepage')
})

test('connect schema describes the page without claiming third-party events', async () => {
  const connect = await readRepoFile('app/(landing)/connect/page.tsx')

  assert.doesNotMatch(connect, /CONNECT_EVENTS/)
  assert.doesNotMatch(connect, /'@type': 'Event'/)
  assert.match(connect, /'@type': 'WebPage'/)
})

test('primary spine keeps verified contrast and scroll-region failures closed', async () => {
  // The homepage and featured-track contrast checks moved to the rendered test
  // above ('homepage hero keeps verified contrast ...').
  const [start, blog, blogCard, carousel, journal, mvu, mdx] = await Promise.all(
    [
      'app/start/page.tsx',
      'app/blog/BlogPageClient.tsx',
      'components/blog/BlogCard.tsx',
      'components/blog/PremiumVisualCarousel.tsx',
      'app/journal/page.tsx',
      'app/mvu/page.tsx',
      'components/blog/MDXComponents.tsx',
    ].map(readRepoFile),
  )

  assert.match(start, /bg-emerald-400 px-6 py-3 text-sm font-semibold text-\[#07120d\]/)
  assert.match(start, /tracking-\[0\.24em\] text-emerald-300\/80/)
  assert.match(blog, /bg-emerald-500 hover:bg-emerald-600 text-black/)
  assert.match(blogCard, /text-white\/75 leading-relaxed/)
  assert.match(blogCard, /text-xs text-white\/75 group-hover:text-white\/85/)
  assert.match(blogCard, /transition-colors duration-300/)
  assert.doesNotMatch(blog, /transition-all hover:shadow-xl/)
  assert.match(blog, /sizes="\(max-width: 767px\) 100vw, 50vw"/)
  assert.match(carousel, /text-white\/60 tracking-widest">Drag to browse/)
  assert.doesNotMatch(journal, /text-white\/(?:30|35|40)/)
  // /mvu now uses a source-led layer system with editorial transparency,
  // featuring frank-note, field-intelligence, and practice-guide layers.
  // The design uses precise tracking values for hierarchy and includes
  // getMvuEntrySummaries for the layer-based content system.
  assert.match(mvu, /getMvuEntrySummaries\(\)/)
  assert.match(mvu, /type MvuLayer/)
  // Keep normal and decorative foregrounds above the previous low-opacity floor.
  assert.doesNotMatch(mvu, /text-white\/(?:30|35|40|45)/)
  assert.match(mdx, /role="region"/)
  assert.match(mdx, /aria-label="Scrollable data table"/)
  assert.match(mdx, /tabIndex=\{0\}/)
})

test('404 recovery cannot surface consent-gated partnership routes from stale data', async () => {
  const matcher = await readRepoFile('lib/fuzzy-route-match.ts')

  assert.match(matcher, /const DISCOVERY_BLOCKED_PREFIXES = \[/)
  assert.match(matcher, /'\/partnerships\/proposal'/)
  assert.match(matcher, /'\/partnerships\/van-ede'/)
  assert.match(matcher, /route\.sitemap !== false && !isDiscoveryBlocked\(route\.href\)/)
  assert.match(matcher, /new Fuse\(discoverableRoutes,/)
  assert.match(matcher, /discoverableAliases\[normalized\] \|\| null/)
})
