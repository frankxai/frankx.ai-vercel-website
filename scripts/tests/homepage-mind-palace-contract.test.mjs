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
  // [contract-change] Frank restored the Jan-2026 dual rotation: both H1 lines
  // change, not just the verb. The prior "exactly one moving element" rule is
  // deliberately lifted. The lists are meant to grow weekly, so this guards the
  // structure that keeps growth safe rather than the copy itself.
  assert.match(homepage, /function SplitFlipLine\(/)
  assert.doesNotMatch(homepage, /function RotatingHeroOutcome\(/)
  assert.match(homepage, /const heroVerbs = \['Build', 'Design', 'Architect'\]/)
  assert.match(homepage, /const heroTails = \[/)
  assert.match(homepage, /font-serif italic/)
  // Each line indexes its own list off the shared counter, which is what makes
  // the cross-product work as the lists grow at different rates.
  assert.match(homepage, /text=\{heroVerbs\[phraseIndex % heroVerbs\.length\]\}/)
  assert.match(homepage, /text=\{heroTails\[phraseIndex % heroTails\.length\]\}/)
  // One index, one interval — a second timer is what desynced the old hero.
  assert.doesNotMatch(homepage, /setPhraseIndex[\s\S]{0,600}?window\.setInterval[\s\S]{0,600}?window\.setInterval/)
  // Coprime lengths, or the pairing repeats long before the cross-product is
  // exhausted (4 verbs x 8 tails yields 8 headlines, not 32). This is the rule
  // most likely to be broken by someone adding a word in a hurry.
  {
    const verbCount = homepage.match(/const heroVerbs = \[([^\]]*)\]/)[1].split(',').length
    const tailCount = homepage.match(/const heroTails = \[([\s\S]*?)\n\]/)[1].trim().split('\n').length
    const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b))
    const reachable = (verbCount * tailCount) / gcd(verbCount, tailCount)
    assert.strictEqual(
      gcd(verbCount, tailCount),
      1,
      `heroVerbs (${verbCount}) and heroTails (${tailCount}) must be coprime: ` +
        `only ${reachable} of ${verbCount * tailCount} pairings are reachable. Add or drop one word.`,
    )
  }
  // Index 0 of each list is the anchor headline, matched by the H1's aria-label,
  // so SSR, no-JS, and reduced-motion all render it without hydration.
  assert.match(homepage, /const heroTails = \[\n\s*'intelligence that compounds\.',/)
  assert.match(homepage, /aria-label="Build intelligence that compounds\."/)
  // The verb owns line one so a width change never reflows the sentence, and the
  // clip box is extended so the Playfair descender on every verb is not cut.
  // SplitText's own `mask` option is NOT used: its per-char box is the tight
  // 1.02 line box and would reintroduce that clipping.
  assert.match(homepage, /-mb-\[0\.15em\] overflow-hidden pb-\[0\.15em\]/)
  assert.doesNotMatch(homepage, /mask: '(chars|words|lines)'/)
  // Splits are reverted, so rotations cannot accumulate spans in the H1.
  assert.match(homepage, /activeSplit\?\.revert\(\)/)
  // The pause control sits outside the H1 and always reserves its space, so
  // hydration cannot shift the headline.
  assert.doesNotMatch(homepage, /<button[^>]*>[\s\S]{0,400}?<\/h1>/)
  assert.match(homepage, /isRotating \? 'visible' : 'invisible'/)
  assert.match(homepage, /useSyncExternalStore/)
  assert.match(homepage, /const isRotating = hasHydrated && !shouldReduceMotion/)
  assert.match(homepage, /Pause changing headline/)
  assert.match(homepage, /Play changing headline/)
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
  // The cover must be served by us. Pinning it to cdn2.suno.ai is what shipped a
  // 403 cover to production — Suno rotates CDN variants without notice.
  assert.match(release, /imageUrl: '\/images\/music\/[a-z0-9-]+\.(?:jpg|jpeg|png|webp)'/)
  assert.doesNotMatch(release, /imageUrl: 'https:\/\/cdn\d?\.suno\.ai\//)
  // Audio should be mirrored to Vercel Blob for the same reason. It is not yet,
  // because the local BLOB_READ_WRITE_TOKEN points at a deleted store — until
  // that is reissued the Suno CDN is the only reachable source.
  assert.match(release, /audioUrl: 'https:\/\/(?:cdn1\.suno\.ai|[a-z0-9]+\.public\.blob\.vercel-storage\.com)\//)
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
