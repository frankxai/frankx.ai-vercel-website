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
  assert.match(mvu, /aria-label="Read Your Mind Is a Temporary Library"/)
})

test('connect schema describes the page without claiming third-party events', async () => {
  const connect = await readRepoFile('app/(landing)/connect/page.tsx')

  assert.doesNotMatch(connect, /CONNECT_EVENTS/)
  assert.doesNotMatch(connect, /'@type': 'Event'/)
  assert.match(connect, /'@type': 'WebPage'/)
})
