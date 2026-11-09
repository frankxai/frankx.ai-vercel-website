// Owned canon (frankxai/starlight-estate#81): source contracts for llms.txt,
// blog canonical + licence metadata, and the syndication manifest.
// Rendered checks against a production build: owned-canon-rendered.test.mjs.
import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import test from 'node:test'

import matter from 'gray-matter'

import { isCanonicalBlogSlug } from '../../lib/blog-redirects.mjs'
import { validateSyndicationManifest } from '../../lib/syndication.ts'

const read = (path) => readFileSync(new URL(`../../${path}`, import.meta.url), 'utf8')

test('llms.txt and llms-full.txt are generated from content registries, not hand lists', () => {
  const llms = read('app/llms.txt/route.ts')
  assert.match(llms, /getAllBlogPosts\(\)/)
  assert.match(llms, /getProductCards\(\)/)
  assert.match(llms, /\/resources\/templates\)/)
  assert.match(llms, /contentLicense\.url/)

  const full = read('app/llms-full.txt/route.ts')
  assert.match(full, /getPublishedBooks\('en'\)/)
  assert.match(full, /getProductCards\(\)/)
  assert.match(full, /\/books\/\$\{b\.slug\}/)
  // Arcanea mythology stays out of FrankX copy.
  assert.match(full, /!b\.slug\.startsWith\('arcanea-'\)/)
  // Prices change and live on product pages; the machine-readable map must not restate them.
  assert.doesNotMatch(full, /priceDisplay|primaryPrice/)
  assert.doesNotMatch(llms, /priceDisplay|primaryPrice/)
})

test('every blog route sets a canonical and declares the content licence', () => {
  const dynamic = read('app/blog/[slug]/page.tsx')
  assert.match(dynamic, /path:\s*`\/blog\/\$\{post\.slug\}`/)
  assert.match(dynamic, /canonical:\s*post\.canonical \|\| undefined/)

  for (const page of [
    'app/blog/[slug]/page.tsx',
    'app/blog/intelligence-revolution-2025/page.tsx',
    'app/blog/soul-frequency-framework/page.tsx',
  ]) {
    const source = read(page)
    assert.match(source, /<link rel="license" href=\{contentLicense\.url\} \/>/, `${page} renders rel=license`)
    assert.match(source, /license: contentLicense\.url/, `${page} sets Article.license`)
    assert.match(source, /copyrightHolder:/, `${page} sets Article.copyrightHolder`)
  }

  for (const slug of ['intelligence-revolution-2025', 'soul-frequency-framework']) {
    assert.match(
      read(`app/blog/${slug}/page.tsx`),
      new RegExp(`alternates: \\{ canonical: \`\\$\\{siteConfig\\.url\\}/blog/${slug}\` \\}`),
    )
  }

  const seo = read('lib/seo.ts')
  assert.match(seo, /url: `\$\{siteUrl\}\/licensing`/)
  assert.match(read('LICENSE'), /All rights reserved\./)
})

test('product redirect map matches next.config.mjs, so llms.txt never links a redirect', () => {
  const config = read('next.config.mjs')
  const fromConfig = Object.fromEntries(
    [...config.matchAll(/source:\s*'(\/products\/[a-z0-9-]+)',\s*destination:\s*'([^']+)'/g)].map((m) => [m[1], m[2]]),
  )
  const products = read('lib/products.ts')
  const fromLib = Object.fromEntries(
    [...products.matchAll(/'(\/products\/[a-z0-9-]+)':\s*'([^']+)'/g)].map((m) => [m[1], m[2]]),
  )
  assert.ok(Object.keys(fromConfig).length > 0)
  assert.deepEqual(fromLib, fromConfig)
})

// slug -> resolved canonical, mirroring lib/blog.ts (published .mdx files,
// frontmatter `canonical` override, else /blog/<slug>).
const blogPosts = new Map(
  readdirSync(new URL('../../content/blog', import.meta.url))
    .filter((name) => name.endsWith('.mdx'))
    .map((name) => name.replace(/\.mdx$/, ''))
    .filter((slug) => isCanonicalBlogSlug(slug))
    .map((slug) => {
      const { data } = matter(read(`content/blog/${slug}.mdx`))
      return [slug, data.canonical || `https://www.frankx.ai/blog/${slug}`]
    }),
)

test('the committed syndication manifest is valid and only references real posts', () => {
  const manifest = JSON.parse(read('data/syndication-manifest.json'))
  // Every lifecycle state is allowed; the validator enforces each state's required fields.
  assert.deepEqual(validateSyndicationManifest(manifest, blogPosts), [])
})

test('syndication validator rejects bad entries', () => {
  const slug = [...blogPosts.keys()][0]
  const ok = {
    version: 1,
    entries: [
      {
        slug,
        canonicalUrl: `https://www.frankx.ai/blog/${slug}`,
        channels: [{ channel: 'linkedin-article', cut: 'excerpt', status: 'draft' }],
      },
    ],
  }
  assert.deepEqual(validateSyndicationManifest(ok, blogPosts), [])

  // A copy can move through its whole lifecycle once the required fields are recorded.
  const lifecycle = {
    version: 1,
    entries: [
      {
        ...ok.entries[0],
        channels: [
          { channel: 'medium', cut: 'full', status: 'published', url: 'https://medium.com/@frankx/a', publishedAt: '2026-11-09' },
          { channel: 'substack', cut: 'excerpt', status: 'scheduled' },
          { channel: 'dev-to', cut: 'summary', status: 'withdrawn' },
        ],
      },
    ],
  }
  assert.deepEqual(validateSyndicationManifest(lifecycle, blogPosts), [])

  // A frontmatter canonical override is honoured.
  const overridden = new Map([[slug, 'https://www.frankx.ai/blog/primary-post']])
  assert.deepEqual(
    validateSyndicationManifest(
      { version: 1, entries: [{ ...ok.entries[0], canonicalUrl: 'https://www.frankx.ai/blog/primary-post' }] },
      overridden,
    ),
    [],
  )

  const cases = [
    [{ ...ok.entries[0], slug: 'no-such-post-xyz' }, /no blog post/],
    [{ ...ok.entries[0], canonicalUrl: `https://medium.com/@frankx/${slug}` }, /canonicalUrl must be the post's canonical/],
    [{ ...ok.entries[0], canonicalUrl: 'https://www.frankx.ai/' }, /canonicalUrl must be the post's canonical/],
    [{ ...ok.entries[0], canonicalUrl: 'https://www.frankx.ai/blog/some-other-post' }, /canonicalUrl must be the post's canonical/],
    [{ ...ok.entries[0], channels: [{ channel: 'myspace', cut: 'full', status: 'draft' }] }, /unknown channel/],
    [{ ...ok.entries[0], channels: [{ channel: 'medium', cut: 'remix', status: 'draft' }] }, /unknown cut/],
    [{ ...ok.entries[0], channels: [{ channel: 'medium', cut: 'full', status: 'published' }] }, /need url and publishedAt/],
    [
      {
        ...ok.entries[0],
        channels: [
          { channel: 'medium', cut: 'full', status: 'draft' },
          { channel: 'medium', cut: 'excerpt', status: 'draft' },
        ],
      },
      /duplicate channel/,
    ],
  ]
  for (const [entry, expected] of cases) {
    const errors = validateSyndicationManifest({ version: 1, entries: [entry] }, blogPosts)
    assert.ok(errors.some((e) => expected.test(e)), `expected ${expected} in ${JSON.stringify(errors)}`)
  }
  assert.match(
    validateSyndicationManifest({ version: 1, entries: [ok.entries[0], ok.entries[0]] }, blogPosts).join(),
    /duplicate slug/,
  )
  assert.match(validateSyndicationManifest({ version: 2, entries: [] }).join(), /unsupported version/)
})
