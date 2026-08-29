import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const readRepoFile = (path) => readFile(new URL(`../../${path}`, import.meta.url), 'utf8')

test('blog recommendations serialize metadata instead of the full article corpus', async () => {
  const page = await readRepoFile('app/blog/[slug]/page.tsx')
  const blog = await readRepoFile('lib/blog.ts')
  const recommendations = await readRepoFile('components/recommendations/Recommendations.tsx')

  assert.match(page, /getAllBlogPostSummaries/)
  assert.match(page, /const allPosts = getAllBlogPostSummaries\(\)/)
  assert.doesNotMatch(page, /\bcontent\s*:/)
  assert.doesNotMatch(recommendations, /\bcontent\??\s*:/)
  assert.match(blog, /let productionBlogPosts: BlogPost\[\] \| undefined/)
  assert.match(blog, /let productionBlogPostSummaries: BlogPostSummary\[\] \| undefined/)
  assert.match(blog, /process\.env\.NODE_ENV === 'production'/)
  assert.doesNotMatch(blog, /getAllBlogPosts\s*=\s*cache\(/)
  assert.doesNotMatch(blog, /getAllBlogPostSummaries\s*=\s*cache\(/)
  assert.match(blog, /export const getBlogPost = cache\(/)

  for (const field of [
    'title',
    'url',
    'tags',
    'image',
    'category',
    'readingTime',
    'description',
  ]) {
    assert.match(recommendations, new RegExp(`\\b${field}\\??\\s*:`))
  }
})
