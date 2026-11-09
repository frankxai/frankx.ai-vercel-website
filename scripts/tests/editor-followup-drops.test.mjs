import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
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

// Repo-wide guard: the song count and a few unsourced figures must not come back in any authored copy surface.
// It walks the blog and app routes plus the other places copy lives (all of content/, components, lib, email templates,
// data/*.ts, and public markdown, text, html and svg: text-bearing SVG art such as blog heroes and social cards renders on the vault and in link previews). Four JSON files are scanned by name (renderedJsonFiles): two route-rendered files and the two search indexes. Other JSON
// inventories (generated or admin-only) and the docs/ and scripts/ folders are not scanned.
const repoRoot = fileURLToPath(new URL('../../', import.meta.url))
const walk = (dir, extensions) => {
  if (!existsSync(dir)) return []
  return readdirSync(dir).flatMap((name) => {
    if (name === 'node_modules' || name === '.next') return []
    const full = `${dir}${name}`
    if (statSync(full).isDirectory()) return walk(`${full}/`, extensions)
    return extensions.some((extension) => name.endsWith(extension)) ? [full] : []
  })
}
const scanRoots = [
  ['content/blog/', ['.mdx', '.md']],
  ['app/', ['.ts', '.tsx', '.md', '.mdx']],
  ['content/', ['.md', '.mdx']],
  ['components/', ['.ts', '.tsx']],
  ['lib/', ['.ts', '.tsx']],
  ['email-templates/', ['.tsx']],
  ['data/', ['.ts']],
  ['public/', ['.md', '.txt', '.html', '.svg']],
]
// JSON that routes render or search serves: /newsletter (streams), /youtube + /content-strategy/video-creation (calendar), and the two search indexes.
// content-index.json is authoritative for descriptions (lib/route-enumeration.mjs takes its entries first) and route-index.json is what site search serves,
// so a withdrawn claim restored in either one would reach readers. The archived slug in route-index.json is stripped by withoutSlug like everywhere else. Not all of data/*.json.
const renderedJsonFiles = ['data/newsletter-streams.json', 'data/video-creation-calendar.json', 'data/content-index.json', 'data/route-index.json']
const scanned = [...new Set([
  ...scanRoots.flatMap(([root, extensions]) => walk(`${repoRoot}${root}`, extensions)),
  ...renderedJsonFiles.map((relative) => `${repoRoot}${relative}`),
])]
// Only the archived slug may carry the number; it is a URL, not a claim.
const withoutSlug = (source) => source.replaceAll('suno-ai-12000-songs-production-lessons', '')
// Matches "12,000", "12000", "12K", "12 thousand" or "twelve thousand" (with an optional "+") followed by up to two words and songs, tracks or experiments:
// "12,000+ AI songs", "12K songs", "12,000-experiment practice". It does not match "$12,000+" prices, "12K impressions" or "12,000 steps".
const songCountClaim = /\b(?:12(?:,?000|\s?k|\s+thousand)|twelve[\s-]+thousand)\b\s*\+?[\s-]*(?:[A-Za-z-]+\s+){0,2}(?:songs?|tracks?|experiments?)\b/i
// Matches "15 years building enterprise", "15 years in enterprise" and hyphenated forms such as "15-year architect's".
// It does not match "a 15-year veteran of enterprise software" persona examples or "the 15-year CUDA ecosystem".
// Unitless forms of the same count: "12k+ catalog", "12k+ song catalog", "most of my 12,000 live". A "$12,000 catalog" budget is not a count.
const songCatalogClaim = /(?<![$€£\d,.])\b12(?:,?000|\s?k)\b\s*\+?\s+(?:(?:AI|song|track)\s+)*catalog\b|\bmy\s+12(?:,?000|\s?k)\b\s*\+?\s+(?:live|catalog|here|are|were|still)\b/i
const yearsClaim = /\b15\+?[\s-]+years?(?:[\s-]+(?:of|in|building|architecting|as(?:\s+an?)?))*[\s-]+(?:an?\s+)?(?:enterprise|architect\w*)/i
// The withdrawn "15,000-word" length claim ("15,000-word masterplan", "15,000-word operating system", "15,000-word masterwork"), in two forms:
// the compound adjective, and the plural noun when it sizes authored work ("condenses 15,000 words of research", "15,000 words of written content").
// A plain quantity such as a context-window or token limit ("15,000 words of context window", "15,000 words per request") is fine.
const wordCountClaim = /(?<![$€£\d,.])\b15,?000(?:[\s-]word\b|\+?\s+words\s+(?:of|in)\s+(?:(?:original|written|authored|published|long-form|new)\s+)?(?:research|content|writing|copy|prose|analysis|documentation|strategy)\b)/i
const bannedClaims = [
  ['a 12,000 song, track or experiment count', songCountClaim],
  ['a 12,000 catalog count without a unit noun', songCatalogClaim],
  ['the 114,000-word book count', /114,000\s+words/i],
  ['the withdrawn 15,000-word length claim', wordCountClaim],
  ['the unsourced studio comparator', /500-1,000 tracks per year/i],
  ['the unsourced years-in-enterprise-AI count', yearsClaim],
  ['the unsourced 320% impressions result', /Organic impressions rose 320%/i],
]
// Known leftovers outside content/blog and app that still carry the song count, numeric or spelled out ("twelve thousand") in book chapters. They predate this guard and need their own
// copy sweep. Do not add to this list: new copy must not carry the count. Remove an entry when its file is cleaned.
const knownSongCountLeftovers = new Set([
  'content/2-ready-to-publish/social/frankx-intelligence-ecosystem-complete-guide/instagram-post.md',
  'content/2-ready-to-publish/social/frankx-intelligence-ecosystem-complete-guide/linkedin-post.md',
  'content/2-ready-to-publish/social/frankx-intelligence-ecosystem-complete-guide/twitter-thread.md',
  'content/books/agentic-builder/chapter-11-case-studies.md',
  'content/books/architects-playbook/chapter-01-the-personal-ai-coe.md',
  'content/books/architects-playbook/chapter-06-the-skill-stack.md',
  'content/books/architects-playbook/chapter-09-multi-cloud-ai-architecture.md',
  'content/books/architects-playbook/chapter-11-memory-and-learning.md',
  'content/books/architects-playbook/chapter-12-building-in-public.md',
  'content/books/architects-playbook/chapter-13-the-creators-stack.md',
  'content/books/architects-playbook/chapter-14-music-as-architecture.md',
  'content/books/architects-playbook/chapter-14-the-cross-domain-laboratory.md',
  'content/books/architects-playbook/chapter-15-design-as-architecture.md',
  'content/books/architects-playbook/chapter-16-evaluation-and-trust.md',
  'content/books/architects-playbook/chapter-18-from-enterprise-to-individual.md',
  'content/books/gencreator/chapter-01-the-one-person-studio.md',
  'content/books/gencreator/chapter-02-the-strategy-layer.md',
  'content/books/gencreator/chapter-08-the-compound-creator.md',
  'content/books/gencreator/chapter-10-the-gencreator-manifesto.md',
  'content/books/great-transition/chapter-09-the-intelligence-layer.md',
  'content/books/personal-ai-coe/chapter-01-the-million-dollar-framework-for-fifty-dollars.md',
  'content/books/personal-ai-coe/chapter-08-the-integration.md',
  'content/books/vibe-os/chapter-01-the-50-dollar-architecture.md',
  'content/books/vibe/chapter-07-the-compound-stack.md',
  'content/books/vibe/chapter-11-the-evidence.md',
  'content/golden-age-book/chapter-06-the-creator-who-stayed.md',
  'content/golden-age-book/chapter-07-a-letter-to-the-future-creator.md',
  'content/lead-magnets/5-suno-prompts.md',
  'content/social/blog/suno-ai-12000-songs-production-lessons.md',
  'email-templates/follow-up-3-day.tsx',
  'email-templates/follow-up-7-day.tsx',
  'email-templates/pdf-delivery.tsx',
  'public/images/products/suno-prompt-library/suno-prompt-library-og.spec.md',
  'public/social/linkedin/agentic-creator-os-complete-guide.md',
  'public/social/linkedin/build-your-own-jarvis-claude-code.md',
  'public/social/linkedin/build-your-own-jarvis.md',
  'public/social/twitter/agentic-creator-os-complete-guide.md',
  'public/social/twitter/build-your-own-jarvis-claude-code.md',
  'public/social/twitter/build-your-own-jarvis.md',
])

// Known leftovers for the 15,000-word pattern only. They predate the pattern and are not part of the blog cleanup: an agent memory log and an unrouted social draft.
// Do not add to this list. Remove an entry when its file is cleaned.
const knownWordCountLeftovers = new Set([
  'content/blog/CLAUDE.md',
  'content/social/blog/golden-age-of-intelligence.md',
])

test('15,000-word pattern catches the withdrawn length claim but not other quantities', () => {
  for (const claim of ['A 15,000-word masterwork', '15,000-word masterplan', 'This 15,000-word operating system', '15,000-word intelligence system', '15000 word guide', '15,000-Word Strategic Operating System', 'condenses 15,000 words of research from my series', 'about 15,000 words of written content', 'the 15,000+ words in original research']) {
    assert.match(claim, wordCountClaim, claim)
  }
  for (const fine of ['115,000-word archive', '$15,000 word budget', '15,000 words of context window', 'fits 15,000 words of context for research', 'a limit of 15,000 words per request', 'about 115,000 words of research', '$15,000 words of content', 'a 1,500-word post', 'a 5,000-word post', '12-day sprint']) {
    assert.doesNotMatch(fine, wordCountClaim, fine)
  }
})

test('song-count pattern catches 12K and 12,000 variants but not legitimate figures', () => {
  for (const claim of ['12,000+ AI songs', '12000 tracks', '12K songs', '12K+ AI-generated tracks', 'the 12,000-experiment music practice', 'The Music Laboratory: 12,000 Experiments', 'Over 12,000 songs created', 'Twelve thousand songs in three years', 'twelve-thousand AI tracks', '12 thousand songs']) {
    assert.match(claim, songCountClaim, claim)
  }
  for (const fine of ['Studio & Residency ($2,500–$12,000+)', 'Walked 12,000 steps today', '12K impressions, 450 likes', 'Search impressions: 12K/month', '12x faster', '112,000 songs of noise', 'Raw Trajectory: [Tool 2: 12,000 lines]', 'Revenue: ~EUR 12,000 per batch', '$12,000 in the first month', 'Twelve thousand dollars in the first month', 'twelve thousand steps a day']) {
    assert.doesNotMatch(fine, songCountClaim, fine)
  }
})

test('unitless catalog-count pattern catches the forms cleaned from agents.ts and the music-generator post but not budgets', () => {
  for (const claim of ['Batch lyric video generation across 12k+ catalog.', 'Source-of-truth indexer for 12k+ song catalog.', 'where most of my 12,000 live', 'the 12,000 AI catalog']) {
    assert.match(claim, songCatalogClaim, claim)
  }
  for (const fine of ['a $12,000 catalog budget', 'EUR 12,000 for the catalog licence', 'my 12,000 steps', 'a 112,000 catalog']) {
    assert.doesNotMatch(fine, songCatalogClaim, fine)
  }
})

test('years-in-enterprise pattern catches hyphenated forms but not legitimate figures', () => {
  for (const claim of ["A 15-year architect's turning point", '15 years building enterprise AI systems', '15+ years in enterprise AI', 'after 15 years architecting enterprise systems']) {
    assert.match(claim, yearsClaim, claim)
  }
  for (const fine of ['You are Alex, a 15-year veteran of enterprise software architecture', "NVIDIA's 15-year CUDA software ecosystem", '15 years of scattered expertise into a second brain', 'average lifespan: 10-15 years']) {
    assert.doesNotMatch(fine, yearsClaim, fine)
  }
})

test('no authored copy carries the unsourced song count or figures', () => {
  assert.ok(scanned.length > 100, `expected to scan the whole copy tree, found ${scanned.length} files`)
  for (const relative of renderedJsonFiles) {
    assert.ok(existsSync(`${repoRoot}${relative}`), `${relative} must exist so the guard can scan it`)
    assert.ok(scanned.includes(`${repoRoot}${relative}`), `${relative} must be a scan target`)
    assert.ok(!knownSongCountLeftovers.has(relative) && !knownWordCountLeftovers.has(relative), `${relative} must not be allowlisted`)
  }
  const hits = []
  for (const file of scanned) {
    const relative = file.slice(repoRoot.length)
    const source = withoutSlug(readFileSync(file, 'utf8'))
    for (const [label, pattern] of bannedClaims) {
      if ((pattern === songCountClaim || pattern === songCatalogClaim) && knownSongCountLeftovers.has(relative)) continue
      if (pattern === wordCountClaim && knownWordCountLeftovers.has(relative)) continue
      if (pattern.test(source)) hits.push(`${relative}: ${label}`)
    }
  }
  assert.deepEqual(hits, [])
})
