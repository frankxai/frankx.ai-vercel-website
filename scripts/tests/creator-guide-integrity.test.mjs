import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import { compile } from '@mdx-js/mdx'
import matter from 'gray-matter'

const guides = [
  ['openai-chatgpt-guide', 'chatgpt-mastery', 'https://chatgpt.com/pricing/'],
  ['claude-anthropic-guide', 'claude-mastery', 'https://claude.com/pricing'],
]

for (const [slug, learningSlug, plans] of guides) {
  test(`${slug}: compiles with one layout-owned page title and source-backed access guidance`, async () => {
    const path = fileURLToPath(new URL(`../../content/guides/${slug}.mdx`, import.meta.url))
    const source = await readFile(path, 'utf8')
    const { data, content } = matter(source)
    assert.equal(data.date, '2026-01-12', 'retain original publication date')
    assert.equal(data.updated, '2026-10-27', 'targeted correction date stays separate')
    assert.ok(data.title && data.description)
    assert.doesNotMatch(content, /^#\s|<h1(?:\s|>)/m, 'guide layout owns H1')
    assert.match(content, new RegExp(`<LearnHubCallout slug="${learningSlug}"`))
    assert.ok(content.includes(plans), 'link the current official plan page')
    assert.match(content, /Editorial correction/)
    assert.match(content, /not benchmark results/)
    assert.doesNotMatch(content, /GPT-4o|o1-pro|DALL-E 3|Opus 4\.5|\b(?:128K|200K)\b|\$(?:20|200)\/month/i)
    assert.doesNotMatch(content, /current flagship|Unlimited access to all|Less likely to produce harmful|production-quality code|\| (?:Excellent|Very Good|Good|Fair|Basic) \|/)
    assert.ok((content.match(/^```/gm) ?? []).length >= 4, 'preserve usable practice prompts')
    await compile(content, { development: false })
  })
}

test('ChatGPT guide does not direct personal accounts to create a new GPT', async () => {
  const source = await readFile(new URL('../../content/guides/openai-chatgpt-guide.mdx', import.meta.url), 'utf8')
  assert.match(source, /New GPT creation is unavailable on personal accounts/)
  assert.doesNotMatch(source, /Build your first custom GPT|Create a custom GPT with your instructions|Upgrade to Plus if/)
})
