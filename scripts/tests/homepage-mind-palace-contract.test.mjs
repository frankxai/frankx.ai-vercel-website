import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

import {
  byTag,
  classTokens,
  closest,
  contains,
  find,
  findAll,
  heroOf,
  homepageModules,
  jsonLd,
  normalise,
  renderedTest,
  textContent,
} from './helpers/homepage-rendered.mjs'

const readRepoFile = (path) => readFile(new URL(`../../${path}`, import.meta.url), 'utf8')

// [contract-change] 2026-10-10: this contract asserts what the homepage renders,
// not how components/home/** spells it. The previous version matched function
// names, class strings and JSX snippets in HomePageElite.tsx, so any refactor
// that kept every visible behaviour (a performance pass, a file split) still
// failed it. Each assertion below keeps the intent of the pin it replaced; the
// mapping is in the pull request that made this change.
//
// Rendered assertions read the production-build HTML for `/` (see
// helpers/homepage-rendered.mjs). They skip without a build and are required by
// the CI step that runs after `pnpm run build`.

const ANCHOR_HEADLINE = 'Build intelligence that compounds.'

// A solid fill (bg-emerald-500), not a tint (bg-white/5) or a gradient.
const isFilled = (node) =>
  classTokens(node).some((token) => /^bg-(?!white\b|black\b|transparent\b|clip-|gradient-|\[)[a-z]+-\d{2,3}$/.test(token))
const isInternal = (node) => node.tag === 'a' && /^\/(?!\/)/.test(node.attrs.href ?? '')

async function featuredRelease() {
  const source = await readRepoFile('data/homepage-featured-release.ts')
  const field = (name) => source.match(new RegExp(`\\b${name}:\\s*'([^']*)'`))?.[1]
  return { title: field('title'), sunoUrl: field('sunoUrl'), imageUrl: field('imageUrl') }
}

test('shared email capture stacks on narrow screens and keeps a 44px submit target', async () => {
  const emailSignup = await readRepoFile('components/email-signup.tsx')

  assert.match(emailSignup, /className="flex flex-col gap-2 sm:flex-row"/)
  assert.match(emailSignup, /className="w-full min-w-0 flex-1 rounded-full/)
  assert.match(emailSignup, /className="min-h-11 w-full rounded-full[^\n]+sm:w-auto"/)
})

// (a) Hero text and H1, from server HTML.
renderedTest('the server-rendered hero leads with the anchor headline and the ICP outcome', (document) => {
  const { h1, hero } = heroOf(document)

  // Index 0 of the rotation is the anchor. SSR, no-JS and reduced motion all
  // show it, and the visible heading says exactly what its accessible name
  // says: no rotation candidates leak into the heading for crawlers.
  assert.equal(h1.attrs['aria-label'], ANCHOR_HEADLINE)
  assert.equal(normalise(textContent(h1)), ANCHOR_HEADLINE)
  // Nothing interactive inside the heading, so hydration cannot shift it.
  assert.equal(findAll(h1, (node) => ['a', 'button', 'input'].includes(node.tag)).length, 0)

  const heroText = normalise(textContent(hero))
  assert.ok(heroText.includes('Explore your highest-leverage AI move.'), 'hero must state the ICP outcome')
  assert.ok(heroText.includes('Latest studio release · optional listening'), 'music stays optional proof')
})

renderedTest('the homepage does not frame itself as music-first', (document) => {
  const text = normalise(textContent(document))
  for (const phrase of ['Music first.', 'begin with music', 'Music is often the shortest path']) {
    assert.ok(!text.includes(phrase), `homepage still says: ${phrase}`)
  }
})

// (b) One primary call to action in the hero.
renderedTest('the hero offers a single primary call to action and a quieter secondary route', (document) => {
  const { hero } = heroOf(document)
  const internalLinks = findAll(hero, isInternal)
  const primary = internalLinks.filter(isFilled)

  assert.equal(
    primary.length,
    1,
    `expected one filled internal CTA in the hero, found ${primary.map((node) => node.attrs.href).join(', ') || 'none'}`,
  )
  assert.equal(primary[0].attrs.href, '/ai-architecture')
  assert.ok(normalise(textContent(primary[0])).length > 0, 'the primary CTA needs a visible label')

  const secondary = internalLinks.find((node) => node.attrs.href === '/ecosystem')
  assert.ok(secondary, 'the hero keeps the ecosystem route')
  assert.ok(!isFilled(secondary), 'the secondary route must not compete as a second primary CTA')
})

// (c) Reduced motion: what the server sends, and what the shipped modules do.
renderedTest('the changing headline has one pause control, outside the H1 and inert until rotation starts', (document) => {
  const { h1, hero } = heroOf(document)
  const controls = findAll(
    hero,
    (node) => node.tag === 'button' && /^(?:Pause|Play) changing headline$/.test(node.attrs['aria-label'] ?? ''),
  )

  assert.equal(controls.length, 1, 'exactly one pause/play control for the changing headline (WCAG 2.2.2)')
  const [control] = controls
  assert.ok(!contains(h1, control), 'the control sits outside the H1')
  assert.ok('aria-pressed' in control.attrs, 'the control exposes its pressed state')
  // The server cannot know whether motion is allowed. The control is present
  // (reserving its space, so hydration does not shift the headline) but hidden
  // and unfocusable until the client confirms the headline is rotating, which
  // it never does under prefers-reduced-motion.
  assert.equal(control.attrs['aria-hidden'], 'true')
  assert.equal(control.attrs.tabindex, '-1')
})

test('every animated module the homepage ships honours reduced motion', (t) => {
  const modules = homepageModules()
  assert.ok(modules.length > 0, 'the homepage entry must import at least one components/home module')

  for (const { file, source } of modules) {
    const animates =
      /from\s+['"](?:gsap(?:\/[\w-]+)?|@gsap\/react|framer-motion|motion\/react)['"]/.test(source) ||
      /\bsetInterval\(|\brequestAnimationFrame\(/.test(source)
    if (animates) {
      assert.match(
        source,
        /useReducedMotion|prefers-reduced-motion|reducedMotion/,
        `${file} animates but never checks reduced motion`,
      )
    }

    if (/\bScrollTrigger\b/.test(source)) {
      assert.doesNotMatch(source, /\bpin:\s*true/, `${file}: no pinned scroll scenes on the homepage`)
      assert.match(source, /prefers-reduced-motion:\s*reduce/, `${file}: scroll scenes must be gated on reduced motion`)
      assert.match(source, /pointer:\s*coarse/, `${file}: scroll scenes must be gated on coarse pointers`)
    }
    if (/gsap\.matchMedia\(/.test(source)) {
      assert.match(source, /\.revert\(\)/, `${file}: gsap.matchMedia contexts must be reverted on cleanup`)
    }
  }

  // The rotating headline indexes two lists off one counter. Their lengths
  // must be coprime or most pairings are unreachable (4 verbs x 8 tails gives
  // 8 headlines, not 32). Checked wherever the lists live, if they exist.
  const rotation = modules.find(({ source }) => /const heroVerbs = \[/.test(source) && /const heroTails = \[/.test(source))
  if (!rotation) {
    t.diagnostic('no heroVerbs/heroTails lists found; coprime rotation check not applicable')
    return
  }
  const verbCount = rotation.source.match(/const heroVerbs = \[([^\]]*)\]/)[1].split(',').filter((item) => item.trim()).length
  const tailCount = rotation.source.match(/const heroTails = \[([\s\S]*?)\n\]/)[1].trim().split('\n').length
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b))
  assert.strictEqual(
    gcd(verbCount, tailCount),
    1,
    `heroVerbs (${verbCount}) and heroTails (${tailCount}) must be coprime: ` +
      `only ${(verbCount * tailCount) / gcd(verbCount, tailCount)} of ${verbCount * tailCount} pairings are reachable. Add or drop one word.`,
  )
})

// (d) FAQ present in server HTML.
renderedTest('the FAQ is in the server HTML and matches its FAQPage structured data', (document) => {
  const faq = jsonLd(document).find((item) => item['@type'] === 'FAQPage')
  assert.ok(faq, 'the homepage must emit FAQPage structured data')
  const entries = [faq.mainEntity ?? []].flat()
  assert.ok(entries.length >= 3, `expected at least three FAQ entries, found ${entries.length}`)

  const main = find(document, byTag('main'))
  assert.ok(main, 'the homepage must render a <main> landmark')
  for (const entry of entries) {
    assert.ok(entry.name, 'every FAQ entry needs a question')
    assert.ok(normalise(String(entry.acceptedAnswer?.text ?? '')).length > 0, `no answer for: ${entry.name}`)
    const trigger = find(
      main,
      (node) => ['button', 'summary'].includes(node.tag) && normalise(textContent(node)) === entry.name,
    )
    assert.ok(trigger, `FAQ question is not visible in the server HTML: ${entry.name}`)
    if (trigger.tag === 'button') {
      assert.ok('aria-expanded' in trigger.attrs, `${entry.name}: disclosure must expose aria-expanded`)
      assert.ok(trigger.attrs['aria-controls'], `${entry.name}: disclosure must name the answer it controls`)
    }
  }

  const questions = entries.map((entry) => entry.name)
  assert.ok(questions.includes('How does music fit into FrankX?'))
  assert.ok(!questions.includes('Why does the homepage begin with music?'))
})

renderedTest('the featured release renders from the reviewed record, optional and never autoplaying', async (document, { html }) => {
  const release = await featuredRelease()
  assert.ok(release.title && release.sunoUrl && release.imageUrl, 'featured release record must name title, sunoUrl and imageUrl')

  const { hero } = heroOf(document)
  assert.ok(normalise(textContent(hero)).includes(release.title), 'the reviewed release title renders in the hero')
  assert.ok(
    findAll(hero, (node) => node.tag === 'a' && node.attrs.href === release.sunoUrl).length > 0,
    'the release links to its Suno page',
  )
  const encodedImage = encodeURIComponent(release.imageUrl)
  assert.ok(
    findAll(hero, (node) => node.tag === 'img').some((image) =>
      [image.attrs.src, image.attrs.srcset].some((value) => value?.includes(release.imageUrl) || value?.includes(encodedImage)),
    ),
    'the release cover is the self-hosted image from the record',
  )

  assert.equal(findAll(document, byTag('iframe')).length, 0, 'no third-party player iframe')
  assert.ok(!html.includes('suno.com/embed'), 'no Suno embed')
  // The retired release may still exist in the site-wide music catalog; it
  // must not be what the homepage features.
  const retired = '9cbad174-9276-427f-9aed-1ba00c7db3db'
  const main = find(document, byTag('main'))
  assert.ok(
    !normalise(textContent(main)).includes(retired) &&
      findAll(main, (node) => Object.values(node.attrs).some((value) => value.includes(retired))).length === 0,
    'the retired release must not return to the homepage',
  )
  assert.equal(findAll(document, (node) => 'autoplay' in node.attrs).length, 0, 'no media autoplays')
  assert.doesNotMatch(html, /autoplay=(?:1|true)/i)
})

renderedTest('the long-form homepage cannot silently lose its restored rooms and glow cards', (document) => {
  const main = find(document, byTag('main'))
  assert.ok(main, 'the homepage must render a <main> landmark')
  const headings = findAll(main, byTag('h2')).map((node) => normalise(textContent(node)))

  for (const [room, heading] of [
    ['AI stack proof', 'Real tools. Real workflows. Real outputs.'],
    ['Mind palace atlas', 'One studio. A connected portfolio.'],
    ['Products and tools', 'Ways to go further'],
    ['AI Architecture hub', 'AI Architecture'],
    ['Music Lab hub', 'Music Lab'],
    ['Creative worlds', 'Creative Systems Lab'],
    ['Design Lab', 'Design Lab'],
    ['Books', 'Books & Writing'],
    ['Library', 'Every book, a permanent asset'],
    ['Latest articles', 'Latest'],
    ['Learning hub', 'Learn & Explore'],
    ['Digital twin', 'Meet FRANK-Ω'],
    ['Email signup', 'Stay in the Signal Loop'],
    ['FAQ', 'Frequently asked'],
    ['Final CTA', 'Take what serves. Build what endures.'],
  ]) {
    assert.ok(headings.includes(heading), `missing homepage room: ${room} ("${heading}")`)
  }

  const books = find(main, (node) => node.attrs.id === 'books')
  assert.ok(books, 'the books room keeps its #books anchor')
  assert.ok(
    findAll(books, (node) => node.tag === 'a' && /^\/books\/[\w-]+$/.test(node.attrs.href ?? '')).length > 0,
    'the books room renders published books',
  )
  assert.ok(
    findAll(main, (node) => node.tag === 'a' && /^\/blog\/[\w-]+/.test(node.attrs.href ?? '')).length > 0,
    'the homepage links to articles',
  )
  assert.ok(find(main, (node) => node.tag === 'input' && node.attrs.type === 'email'), 'the homepage keeps an email signup')

  // GlowCard's glass surface. Counting rendered surfaces, not <GlowCard> in one
  // file, is what survives extracting a card into its own component (#416).
  const glowCards = findAll(main, (node) => classTokens(node).includes('[backdrop-filter:blur(32px)_saturate(160%)]'))
  assert.ok(glowCards.length >= 4, `expected multiple glow-card surfaces, found ${glowCards.length}`)
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

renderedTest('the mind palace renders a complete, keyboard-reachable route map without JavaScript', (document) => {
  const room = find(document, (node) => 'data-palace-room' in node.attrs)
  assert.ok(room, 'the atlas renders its rooms in server HTML')
  const atlas = closest(room, (node) => node.tag === 'section')
  assert.ok(atlas, 'the atlas is its own section')
  assert.ok(findAll(atlas, (node) => 'data-palace-corridor' in node.attrs).length > 0, 'the atlas renders its corridors')

  const links = findAll(atlas, (node) => node.tag === 'a')
  const hrefs = new Set(links.map((node) => node.attrs.href))
  for (const href of [
    '/ai-architecture',
    '/acos',
    '/products/vibe-os',
    '/library',
    '/ecosystem',
    'https://starlightintelligence.org',
    'https://gencreator.ai',
    'https://www.arcanea.ai',
    'https://www.agenticincome.ai',
  ]) {
    assert.ok(hrefs.has(href), `atlas lost a verified route: ${href}`)
  }
  for (const link of links) {
    assert.ok(
      classTokens(link).some((token) => token.startsWith('focus-visible:ring')),
      `atlas link without a visible focus ring: ${link.attrs.href}`,
    )
  }
  assert.ok(!normalise(textContent(atlas)).includes('Music stays first'))
})

test('homepage playback feedback is announced politely', () => {
  assert.ok(
    homepageModules().some(({ source }) =>
      /role="status"[^>]*aria-live="polite"|aria-live="polite"[^>]*role="status"/.test(source),
    ),
    'a homepage module must announce playback state through a polite status region',
  )
})
