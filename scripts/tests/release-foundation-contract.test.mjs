import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

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

test('verified contrast and MVU link-name regressions stay closed', async () => {
  const homepage = await readRepoFile('components/home/HomePageElite.tsx')
  const mvu = await readRepoFile('app/mvu/page.tsx')

  assert.match(homepage, /font-serif text-lg italic leading-7 text-white\/70/)
  assert.match(homepage, /max-w-xl text-\[11px\] leading-5 text-white\/70/)
  assert.doesNotMatch(homepage, /function ScrollProgress/)
  assert.doesNotMatch(homepage, /<ScrollProgress \/>/)
  assert.match(mvu, /aria-label="Read Your Mind Is a Temporary Library"/)
})

test('connect schema describes the page without claiming third-party events', async () => {
  const connect = await readRepoFile('app/(landing)/connect/page.tsx')

  assert.doesNotMatch(connect, /CONNECT_EVENTS/)
  assert.doesNotMatch(connect, /'@type': 'Event'/)
  assert.match(connect, /'@type': 'WebPage'/)
})

test('primary spine keeps verified contrast and scroll-region failures closed', async () => {
  const [homepage, start, blog, blogCard, carousel, journal, mvu, mdx] = await Promise.all(
    [
      'components/home/HomePageElite.tsx',
      'app/start/page.tsx',
      'app/blog/BlogPageClient.tsx',
      'components/blog/BlogCard.tsx',
      'components/blog/PremiumVisualCarousel.tsx',
      'app/journal/page.tsx',
      'app/mvu/page.tsx',
      'components/blog/MDXComponents.tsx',
    ].map(readRepoFile),
  )

  assert.match(homepage, /bg-emerald-500 hover:bg-emerald-600 text-black/)
  assert.match(homepage, /max-w-md text-xs leading-5 text-white\/60/)
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
  assert.match(mvu, /tracking-widest text-white\/60/)
  assert.match(mvu, /loading="eager"/)
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
