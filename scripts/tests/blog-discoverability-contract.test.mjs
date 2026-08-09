import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'

import { buildBlogIndex } from '../../lib/blog-index.ts'
import { enumerateRoutes } from '../../lib/route-enumeration.mjs'

const post = (slug, { category = 'Architecture', featured = false } = {}) => ({
  slug,
  category,
  featured,
})

test('the unfiltered blog index renders every non-curated article exactly once', () => {
  const posts = [
    post('latest'),
    post('featured-one', { featured: true }),
    post('featured-two', { featured: true }),
    post('featured-three', { featured: true }),
    post('regular'),
    post('curated-recap', { category: 'Curated', featured: true }),
  ]

  const index = buildBlogIndex(posts, null)
  const rendered = [index.latestPost, ...index.featuredPosts, ...index.gridPosts]
    .filter(Boolean)
    .map((item) => item.slug)

  assert.deepEqual(rendered, [
    'latest',
    'featured-one',
    'featured-two',
    'featured-three',
    'regular',
  ])
  assert.equal(new Set(rendered).size, rendered.length)
  assert.equal(rendered.includes('curated-recap'), false)
})

test('a category filter renders every matching article in the grid', () => {
  const posts = [
    post('architecture-one', { featured: true }),
    post('music-one', { category: 'Music' }),
    post('architecture-two'),
  ]

  const index = buildBlogIndex(posts, 'Architecture')

  assert.equal(index.latestPost, null)
  assert.deepEqual(index.featuredPosts, [])
  assert.deepEqual(index.gridPosts.map((item) => item.slug), [
    'architecture-one',
    'architecture-two',
  ])
})

test('blog documentation markdown never becomes a public article route', () => {
  const markdownContracts = fs
    .readdirSync(path.join(process.cwd(), 'content/blog'))
    .filter((file) => file.endsWith('.md'))
    .map((file) => `/blog/${file.replace(/\.md$/, '')}`)
  const routes = new Set(enumerateRoutes().map((route) => route.href))

  assert.ok(markdownContracts.length > 0, 'fixture must include blog documentation')
  for (const href of markdownContracts) {
    assert.equal(routes.has(href), false, `${href} must not be indexed as an article`)
  }
})
