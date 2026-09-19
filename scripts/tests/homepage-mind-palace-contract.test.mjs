import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const readRepoFile = (path) => readFile(new URL(`../../${path}`, import.meta.url), 'utf8')

test('the public homepage leads with ICP outcomes while retaining music as living proof', async () => {
  const page = await readRepoFile('app/page.tsx')
  const homepage = await readRepoFile('components/home/HomePageElite.tsx')
  const player = await readRepoFile('components/home/FeaturedTrackPlayer.tsx')
  const emailSignup = await readRepoFile('components/email-signup.tsx')

  assert.match(emailSignup, /className="flex flex-col gap-2 sm:flex-row"/)
  assert.match(emailSignup, /className="w-full min-w-0 flex-1 rounded-full/)
  assert.match(emailSignup, /className="min-h-11 w-full rounded-full[^\n]+sm:w-auto"/)

  assert.match(page, /import HomePageElite from '@\/components\/home\/HomePageElite'/)
  assert.match(page, /<HomePageElite\b/)
  assert.doesNotMatch(page, /import FounderHome from '@\/components\/home\/FounderHome'/)
  assert.doesNotMatch(page, /<FounderHome\b/)
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
  const usesDock = /useMusicRuntime/.test(player)
  if (usesDock) {
    assert.match(player, /selectSuno\(track\.sunoId, track\.title, \{ streamUrl: track\.audioUrl \}\)/)
    assert.doesNotMatch(player, /<audio\b/)
    assert.doesNotMatch(player, /preload="metadata"/)
  } else {
    assert.match(player, /src=\{track\.audioUrl\}/)
    assert.match(player, /preload="metadata"/)
    assert.match(player, /useState\(\(\) => parseDuration\(track\.duration\)\)/)
    assert.match(player, /nextDuration : currentDuration/)
  }
  assert.match(player, /src=\{track\.imageUrl\}/)
  assert.match(player, /href=\{track\.sunoUrl\}/)
  assert.match(player, /role="status" aria-live="polite"/)
  assert.match(player, /from-void\/20/)
  assert.doesNotMatch(player, /#0a0a0b|#07110d/)
  assert.doesNotMatch(player, /<iframe\b/)
  assert.match(homepage, /featuredTrack \?\? homepageFeaturedRelease/)
  assert.doesNotMatch(homepage, /9cbad174-9276-427f-9aed-1ba00c7db3db/)
  assert.doesNotMatch(homepage, /Music first\./)
  assert.doesNotMatch(homepage, /begin with music/)
  // [contract-change] First contact is one claim, one instrument, one action.
  // The 21-headline rotator and logo-wall were substituting motion and brands
  // for a product. Music stays as living proof in the right column.
  assert.match(homepage, /const heroHeadline = 'Build systems you can inspect and own\.'/)
  assert.match(homepage, /aria-label=\{heroHeadline\}/)
  assert.match(homepage, /A working studio for architecture, music, and creator tools/)
  assert.match(homepage, /href="https:\/\/gencreator\.ai"/)
  assert.match(homepage, /Open GenCreator/)
  assert.match(homepage, /Inspect the blueprints/)
  assert.doesNotMatch(homepage, /function SplitFlipLine\(/)
  assert.doesNotMatch(homepage, /const heroVerbs =/)
  assert.doesNotMatch(homepage, /Pause changing headline/)
  assert.doesNotMatch(homepage, /<TrustedByBlock \/>/)
  assert.doesNotMatch(homepage, /FrankOmegaAvatar/)
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
  // The cover must be served by us. Pinning it to cdn2.suno.ai is what shipped a
  // 403 cover to production — Suno rotates CDN variants without notice.
  assert.match(release, /imageUrl: '\/images\/music\/[a-z0-9-]+\.(?:jpg|jpeg|png|webp)'/)
  assert.doesNotMatch(release, /imageUrl: 'https:\/\/cdn\d?\.suno\.ai\//)
  // In-browser audio: owned repo path, Vercel Blob, or empty (Listen on Suno).
  // Legacy cdn1.suno.ai remains allowed until homepage #591 clears it (CDN 403s in practice).
  assert.match(release, /audioUrl: '(?:'|\/[^']+'|https:\/\/(?:cdn1\.suno\.ai|[a-z0-9]+\.public\.blob\.vercel-storage\.com)\/[^']+')/)
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
