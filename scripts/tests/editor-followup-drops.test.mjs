import assert from 'node:assert/strict'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

const read = (relative) => readFileSync(new URL(relative, import.meta.url), 'utf8')
const positioning = read('../../docs/strategy/frankx-authority-positioning.md')
const voice = read('../../lib/voice/frankx-voice.ts')
const article = read('../../content/blog/music-as-consciousness-technology.mdx')
const linkingPosts = [
  read('../../content/blog/suno-music-production-workflow.mdx'),
  read('../../content/blog/ai-doesnt-have-to-be-soulless.mdx'),
]
const title = 'What AI Music Taught Me About Creative Systems'

test('approved bio language carries no song count', () => {
  assert.ok(!positioning.includes('12,000+ AI songs'))
  assert.ok(positioning.includes('"creator of AI music."'))
})

test('voice proof list keeps the Oracle CoE role without the unsourced request count', () => {
  assert.ok(!voice.includes('1000+ requests handled'))
  assert.ok(voice.includes("'Built Oracle EMEA AI CoE',"))
})

test('music article is retitled without the song count and keeps its slug', () => {
  const frontmatter = article.split('---')[1]
  assert.match(frontmatter, new RegExp(`^title: "${title}"$`, 'm'))
  assert.ok(!frontmatter.includes('12,000 Songs Later'))
})

test('links to the music article use the new title and contain no 12,000 song count', () => {
  for (const post of linkingPosts) {
    assert.ok(post.includes(`[${title}](/blog/music-as-consciousness-technology)`))
    assert.ok(!post.includes('12,000 Songs Later'))
    assert.ok(!post.includes('12,000+ songs'))
    assert.ok(!post.includes('12,000'))
  }
})

test('blog posts no longer link the unpublished manifestation research page', () => {
  const manifestation = read('../../content/blog/manifestation-reality-architect-ai-vibe.mdx')
  const domainMap = read('../../lib/research/blog-domain-map.ts')
  assert.ok(!manifestation.includes('/research/manifestation-law-of-attraction-ai-systems'))
  assert.ok(!manifestation.includes('The deeper write-up, with sources, lives in the research hub'))
  assert.ok(!domainMap.includes('manifestation-law-of-attraction-ai-systems'))
})

test('song counts are dropped from blog prose', () => {
  const soulFrequency = read('../../content/blog/02-the-soul-frequency-framework.mdx')
  const acos = read('../../content/blog/acos-philosophy-technology-amplifies.mdx')
  assert.ok(!soulFrequency.includes('over 500 songs'))
  assert.ok(soulFrequency.includes('From making music with AI, I discovered'))
  assert.ok(!acos.includes('After producing 500 songs'))
  assert.ok(acos.includes('Producing songs with AI, I noticed:'))
  assert.ok(!acos.includes('12,000+ AI songs produced with Suno'))
  assert.ok(acos.includes('- AI songs produced with Suno'))
})

test('golden-age and SEO masterplan copy carries no word-count claim', () => {
  for (const [relative, claims] of [
    ['../../content/blog/golden-age-of-intelligence.mdx', ['15,000-word masterplan', 'This 15,000-word operating system']],
    ['../../content/blog/08-golden-age-of-intelligence.mdx', ['A 15,000-word masterwork']],
    ['../../content/blog/agentic-seo-publishing-masterplan.mdx', ['15,000-word intelligence system', '15,000-word command center']],
    ['../../app/golden-age/metadata.ts', ['A 15,000-word masterwork']],
  ]) {
    const source = read(relative)
    for (const claim of claims) assert.ok(!source.includes(claim), `${relative}: ${claim}`)
  }
})

// Repo-wide guard: the song count and a few unsourced figures must not come back anywhere in blog content or app routes.
const repoRoot = fileURLToPath(new URL('../../', import.meta.url))
const walk = (dir, extensions) =>
  readdirSync(dir).flatMap((name) => {
    if (name === 'node_modules' || name === '.next') return []
    const full = `${dir}${name}`
    if (statSync(full).isDirectory()) return walk(`${full}/`, extensions)
    return extensions.some((extension) => name.endsWith(extension)) ? [full] : []
  })
const scanned = [
  ...walk(`${repoRoot}content/blog/`, ['.mdx', '.md']),
  ...walk(`${repoRoot}app/`, ['.ts', '.tsx', '.md', '.mdx']),
]
// Only the archived slug may carry the number; it is a URL, not a claim.
const withoutSlug = (source) => source.replaceAll('suno-ai-12000-songs-production-lessons', '')
const bannedClaims = [
  ['a 12,000 song or track count', /12,?000\s*\+?[\s-]*(?:[A-Za-z-]+\s+){0,2}(?:songs?|tracks?)\b/i],
  ['the 114,000-word book count', /114,000\s+words/i],
  ['the unsourced studio comparator', /500-1,000 tracks per year/i],
  ['the unsourced years-in-enterprise-AI count', /15 years (?:building|architecting|in) enterprise/i],
  ['the unsourced 320% impressions result', /Organic impressions rose 320%/i],
]

test('no blog post or app route carries the unsourced song count or figures', () => {
  assert.ok(scanned.length > 100, `expected to scan the whole blog and app tree, found ${scanned.length} files`)
  const hits = []
  for (const file of scanned) {
    const source = withoutSlug(readFileSync(file, 'utf8'))
    for (const [label, pattern] of bannedClaims) {
      if (pattern.test(source)) hits.push(`${file.slice(repoRoot.length)}: ${label}`)
    }
  }
  assert.deepEqual(hits, [])
})
