import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const readRepoFile = (path) => readFile(new URL(`../../${path}`, import.meta.url), 'utf8')

test('the public homepage leads with ICP outcomes while retaining music as living proof', async () => {
  const page = await readRepoFile('app/page.tsx')
  const homepage = await readRepoFile('components/home/HomePageElite.tsx')
  const player = await readRepoFile('components/home/FeaturedTrackPlayer.tsx')

  assert.match(page, /import HomePageElite from '@\/components\/home\/HomePageElite'/)
  assert.match(page, /import \{ getPublishedBooks \} from '@\/app\/books\/lib\/books-registry'/)
  assert.match(page, /import \{ homepageFeaturedRelease \} from '@\/data\/homepage-featured-release'/)
  assert.match(page, /featuredTrack=\{homepageFeaturedRelease\}/)
  assert.match(page, /const books = getPublishedBooks\(\)/)
  assert.match(page, /books=\{books\}/)
  assert.doesNotMatch(page, /<FrankXProductionHome\b/)
  assert.doesNotMatch(page, /Why does the homepage begin with music\?/)
  assert.doesNotMatch(page, /Music is often the shortest path/)
  assert.match(page, /How does music fit into FrankX\?/)

  assert.match(homepage, /import \{ homepageFeaturedRelease \} from '@\/data\/homepage-featured-release'/)
  assert.match(homepage, /import \{ FeaturedTrackPlayer \} from '@\/components\/home\/FeaturedTrackPlayer'/)
  assert.match(homepage, /<FeaturedTrackPlayer track=\{track\} \/>/)
  assert.doesNotMatch(homepage, /suno\.com\/embed/)
  assert.match(player, /src=\{track\.audioUrl\}/)
  assert.match(player, /src=\{track\.imageUrl\}/)
  assert.match(player, /href=\{track\.sunoUrl\}/)
  assert.match(player, /preload="metadata"/)
  assert.match(player, /useState\(\(\) => parseDuration\(track\.duration\)\)/)
  assert.match(player, /nextDuration : currentDuration/)
  assert.match(player, /role="status" aria-live="polite"/)
  assert.match(player, /from-void\/20/)
  assert.doesNotMatch(player, /#0a0a0b|#07110d/)
  assert.doesNotMatch(player, /<iframe\b/)
  assert.match(homepage, /featuredTrack \?\? homepageFeaturedRelease/)
  assert.doesNotMatch(homepage, /9cbad174-9276-427f-9aed-1ba00c7db3db/)
  assert.doesNotMatch(homepage, /Music first\./)
  assert.doesNotMatch(homepage, /begin with music/)
  assert.match(homepage, /Explore your highest-leverage AI move\./)
  assert.match(homepage, /Architect your AI operating system\./)
  assert.match(homepage, /Build your AI Center of Excellence\./)
  assert.match(homepage, /Orchestrate agents around real work\./)
  assert.match(homepage, /Ship products that compound\./)
  assert.match(homepage, /function RotatingHeroOutcome\(\)/)
  assert.match(homepage, /useSyncExternalStore/)
  assert.match(homepage, /if \(!hasHydrated \|\| shouldReduceMotion\)/)
  assert.match(homepage, /Pause changing headline/)
  assert.match(homepage, /Play changing headline/)
  assert.match(homepage, /<AnimatePresence mode="wait" initial=\{false\}>/)
  assert.match(homepage, /Latest studio release · optional listening/)
  assert.match(homepage, /<MindPalaceAtlas \/>/)
  assert.doesNotMatch(homepage, /autoplay=(?:1|true)/i)
  assert.doesNotMatch(player, /autoPlay/)
})

test('the long-form homepage cannot silently lose its restored rooms and glow cards', async () => {
  const homepage = await readRepoFile('components/home/HomePageElite.tsx')
  // #416 extracted the featured-track block out of HomePageElite into its own
  // component, taking one glow-card surface with it. The homepage still renders
  // four; counting only one file undercounts after any such extraction.
  const player = await readRepoFile('components/home/FeaturedTrackPlayer.tsx')

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
  const glowCards = [homepage, player].reduce(
    (total, source) => total + (source.match(/<GlowCard\b/g) ?? []).length,
    0,
  )
  assert.ok(glowCards >= 4, `expected multiple glow-card surfaces, found ${glowCards}`)
})

test('the featured release stays human-reviewed instead of following the raw catalog', async () => {
  const release = await readRepoFile('data/homepage-featured-release.ts')

  assert.match(release, /reviewStatus: 'approved'/)
  assert.match(release, /Raw Suno catalog entries must never replace this object automatically/)
  assert.match(release, /reviewedAt: '\d{4}-\d{2}-\d{2}'/)
  assert.match(release, /sunoId: '[0-9a-f-]+'/)
  assert.match(release, /sunoUrl: 'https:\/\/suno\.com\/song\//)
  assert.match(release, /audioUrl:\s*\n\s*'https:\/\/vbmwpibfe0yzx3fd\.public\.blob\.vercel-storage\.com\//)
  assert.match(release, /imageUrl:\s*\n\s*'https:\/\/cdn2\.suno\.ai\//)
  assert.doesNotMatch(release, /Music is the first door/)
  assert.match(release, /one creative artifact among the architecture/)
})

test('the mind palace scene has a complete accessible fallback and scoped cleanup', async () => {
  const atlas = await readRepoFile('components/home/MindPalaceAtlas.tsx')

  for (const route of ['/ai-architecture', '/acos', '/products/vibe-os', '/library']) {
    assert.match(atlas, new RegExp(`href: '${route.replace('/', '\\/')}'`))
  }
  assert.match(atlas, /href="\/ecosystem"/)

  for (const venture of [
    'https://starlightintelligence.org',
    'https://gencreator.ai',
    'https://www.arcanea.ai',
    'https://www.agenticincome.ai',
  ]) {
    assert.ok(atlas.includes(venture), `missing verified public venture: ${venture}`)
  }

  assert.match(atlas, /useGSAP\(/)
  assert.match(atlas, /gsap\.matchMedia\(\)/)
  assert.match(atlas, /prefers-reduced-motion: reduce/)
  assert.match(atlas, /pointer: coarse/)
  assert.match(atlas, /return \(\) => media\.revert\(\)/)
  assert.match(atlas, /data-palace-room/)
  assert.match(atlas, /data-palace-corridor/)
  assert.match(atlas, /focus-visible:ring-2/)
  assert.doesNotMatch(atlas, /pin:\s*true/)
  assert.doesNotMatch(atlas, /Music stays first/)
})
