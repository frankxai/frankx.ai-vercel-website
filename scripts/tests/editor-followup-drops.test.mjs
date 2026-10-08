import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
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

test('links to the music article use the new title', () => {
  for (const post of linkingPosts) {
    assert.ok(post.includes(`[${title}](/blog/music-as-consciousness-technology)`))
    assert.ok(!post.includes('12,000 Songs Later'))
  }
})
