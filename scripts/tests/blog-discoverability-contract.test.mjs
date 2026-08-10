import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'

import { buildBlogIndex } from '../../lib/blog-index.ts'
import { BLOG_REDIRECTS } from '../../lib/blog-redirects.mjs'
import { enumerateRoutes } from '../../lib/route-enumeration.mjs'

const post = (slug, { category = 'Architecture', featured = false } = {}) => ({
  slug,
  category,
  featured,
  image: `/images/${slug}.webp`,
})

test('the unfiltered blog index partitions every non-curated article into one rendered surface', () => {
  const posts = [
    post('latest'),
    post('featured-one', { featured: true }),
    post('featured-two', { featured: true }),
    post('featured-three', { featured: true }),
    post('regular'),
    post('curated-recap', { category: 'Curated', featured: true }),
  ]

  const index = buildBlogIndex(posts, null, ['regular', 'featured-three'])
  const carouselPosts = index.carouselPosts ?? []
  const rendered = [
    index.latestPost,
    ...carouselPosts,
    ...index.featuredPosts,
    ...index.gridPosts,
  ]
    .filter(Boolean)
    .map((item) => item.slug)

  assert.deepEqual(rendered, [
    'latest',
    'regular',
    'featured-three',
    'featured-one',
    'featured-two',
  ])
  assert.deepEqual(carouselPosts.map((item) => item.slug), ['regular', 'featured-three'])
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
  assert.deepEqual(index.carouselPosts ?? [], [])
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

test('every canonical top-level blog MDX file has one blog route and redirect sources have none', () => {
  const blogDir = path.join(process.cwd(), 'content/blog')
  const redirectSources = new Set(
    BLOG_REDIRECTS.map(({ source }) => source.slice('/blog/'.length)),
  )
  const allMdxSlugs = fs
    .readdirSync(blogDir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''))
  const expectedSlugs = allMdxSlugs.filter((slug) => !redirectSources.has(slug)).sort()
  const blogRoutes = enumerateRoutes().filter((route) => route.href.startsWith('/blog/'))
  const routeBySlug = new Map(blogRoutes.map((route) => [route.href.slice('/blog/'.length), route]))

  assert.ok(redirectSources.size > 0, 'fixture must include permanent blog redirects')
  assert.equal(routeBySlug.size, expectedSlugs.length)
  assert.deepEqual([...routeBySlug.keys()].sort(), expectedSlugs)
  for (const slug of expectedSlugs) {
    assert.equal(routeBySlug.get(slug)?.type, 'blog', `/blog/${slug} must be typed as blog`)
  }
  for (const slug of redirectSources) {
    assert.equal(routeBySlug.has(slug), false, `/blog/${slug} is a redirect source, not canonical content`)
  }

  const blogLoader = fs.readFileSync(path.join(process.cwd(), 'lib/blog.ts'), 'utf8')
  assert.match(blogLoader, /isCanonicalBlogSlug/, 'the runtime blog loader must share redirect eligibility')
})
