import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const readRepoFile = (path) => readFile(new URL(`../../${path}`, import.meta.url), 'utf8')

test('the public homepage leads with ICP outcomes while retaining music as living proof', async () => {
  const page = await readRepoFile('app/page.tsx')
  const homepage = await readRepoFile('components/home/HomePageElite.tsx')

  assert.match(page, /import HomePageElite from '@\/components\/home\/HomePageElite'/)
  assert.match(page, /import \{ getPublishedBooks \} from '@\/app\/books\/lib\/books-registry'/)
  assert.match(page, /import \{ homepageFeaturedRelease \} from '@\/data\/homepage-featured-release'/)
  assert.match(page, /featuredTrack=\{homepageFeaturedRelease\}/)
  assert.match(page, /const books = getPublishedBooks\(\)/)
  assert.match(page, /books=\{books\}/)
  assert.doesNotMatch(page, /<FrankXProductionHome\b/)

  assert.match(homepage, /import \{ homepageFeaturedRelease \} from '@\/data\/homepage-featured-release'/)
  assert.match(homepage, /https:\/\/suno\.com\/embed\/\$\{track\.sunoId\}/)
  assert.match(homepage, /loading="eager"/)
  assert.match(homepage, /featuredTrack \?\? homepageFeaturedRelease/)
  assert.doesNotMatch(homepage, /9cbad174-9276-427f-9aed-1ba00c7db3db/)
  assert.doesNotMatch(homepage, /Music first\./)
  assert.doesNotMatch(homepage, /begin with music/)
  assert.match(homepage, /Architect your AI operating system\./)
  assert.match(homepage, /Build your AI Center of Excellence\./)
  assert.match(homepage, /Create agentic workflows that compound\./)
  assert.match(homepage, /Explore the systems behind the work\./)
  assert.match(homepage, /Ship the next version of your business\./)
  assert.match(homepage, /function RotatingHeroOutcome\(\)/)
  assert.match(homepage, /useSyncExternalStore/)
  assert.match(homepage, /if \(!hasHydrated \|\| shouldReduceMotion\)/)
  assert.match(homepage, /<AnimatePresence mode="wait" initial=\{false\}>/)
  assert.match(homepage, /Latest studio release · optional listening/)
  assert.match(homepage, /<MindPalaceAtlas \/>/)
  assert.doesNotMatch(homepage, /autoplay=(?:1|true)/i)
})

test('the long-form homepage cannot silently lose its restored rooms and glow cards', async () => {
  const homepage = await readRepoFile('components/home/HomePageElite.tsx')

  for (const section of [
    '<TrustedByBlock />',
    '<MindPalaceAtlas />',
    '<ProductsTools />',
    '<CreativeWorlds />',
    '<DesignLab />',
    '<BooksShowcase books={books} />',
    '<LibraryShowcase libraryBooks={libraryBooks} />',
    '<LatestArticles posts={latestPosts} />',
    '<LearningHub />',
    '<DigitalTwin />',
    '<EmailCTA />',
    '<FAQSection faqs={faqs} />',
    '<FinalCTA />',
  ]) {
    assert.ok(homepage.includes(section), `missing homepage section: ${section}`)
  }

  assert.match(homepage, /import \{ GlowCard \} from '@\/components\/ui\/glow-card'/)
  assert.match(homepage, /<section id="books" className="scroll-mt-24/)
  assert.ok((homepage.match(/<GlowCard\b/g) ?? []).length >= 4, 'expected multiple glow-card surfaces')
})

test('the featured release stays human-reviewed instead of following the raw catalog', async () => {
  const release = await readRepoFile('data/homepage-featured-release.ts')

  assert.match(release, /reviewStatus: 'approved'/)
  assert.match(release, /Raw Suno catalog entries must never replace this object automatically/)
  assert.match(release, /reviewedAt: '\d{4}-\d{2}-\d{2}'/)
  assert.match(release, /sunoId: '[0-9a-f-]+'/)
})

test('the mind palace scene has a complete accessible fallback and scoped cleanup', async () => {
  const atlas = await readRepoFile('components/home/MindPalaceAtlas.tsx')

  for (const route of ['/music', '/learn', '/acos', '/soulbook', '/products', '/ecosystem']) {
    assert.match(atlas, new RegExp(`href: '${route.replace('/', '\\/')}'`))
  }

  assert.match(atlas, /useGSAP\(/)
  assert.match(atlas, /gsap\.matchMedia\(\)/)
  assert.match(atlas, /prefers-reduced-motion: reduce/)
  assert.match(atlas, /pointer: coarse/)
  assert.match(atlas, /return \(\) => media\.revert\(\)/)
  assert.match(atlas, /data-palace-route/)
  assert.match(atlas, /focus-visible:ring-2/)
  assert.doesNotMatch(atlas, /pin:\s*true/)
})
