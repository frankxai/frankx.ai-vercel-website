import assert from 'node:assert/strict'
import test from 'node:test'

import {
  DOCS_ORIGIN,
  DocsUpstreamRejected,
  buildDocsUpstreamUrl,
  markdownNegotiatedDocsUrl,
  nextAllowedDocsUrl,
} from '../../lib/docs-proxy.ts'

const origin = DOCS_ORIGIN

function build(slug, query = '') {
  return buildDocsUpstreamUrl(slug, new URLSearchParams(query))
}

test('document routes stay under the frankx prefix', () => {
  assert.equal(build(undefined).href, `${origin}/frankx/intro`)
  assert.equal(build(['intro']).href, `${origin}/frankx/intro`)
  assert.equal(build(['skills-and-mcp']).href, `${origin}/frankx/skills-and-mcp`)
  assert.equal(build(['frankx', 'intro']).href, `${origin}/frankx/intro`)
  assert.equal(
    build(['ai-architect-newsletter'], 'utm=1').href,
    `${origin}/frankx/ai-architect-newsletter?utm=1`,
  )
})

test('feeds and og images are pinned to frankx', () => {
  assert.equal(build(['llms.txt']).pathname, '/llms-index/frankx')
  assert.equal(build(['llms-full.txt']).pathname, '/llms-full.mdx/frankx')
  assert.equal(build(['llms-index', 'akamoto']).pathname, '/llms-index/frankx')
  assert.equal(build(['llms.mdx', 'akamoto', 'overview']).pathname, '/llms.mdx/frankx/overview')
  assert.equal(build(['og', 'gencreator', 'intro']).pathname, '/og/frankx/intro')
  assert.equal(build(['intro.md']).href, `${origin}/llms.mdx/frankx/intro/content.md`)
})

test('search is pinned to brand=frankx even when the query asks for another brand', () => {
  const url = build(['api', 'search'], 'q=fleet&brand=akamoto')
  assert.equal(url.pathname, '/api/search')
  assert.equal(url.searchParams.get('brand'), 'frankx')
  assert.equal(url.searchParams.get('q'), 'fleet')
})

test('dot segments cannot escape the frankx prefix', () => {
  const escapes = [
    ['foo', '..', '..', 'akamoto', 'overview'],
    ['llms.mdx', 'frankx', '..', '..', 'akamoto', 'overview'],
    ['foo', '..', '..', 'akamoto', 'overview.md'],
    ['%2e%2e', '%2e%2e', 'akamoto', 'overview'],
    ['..\\', '..\\', 'evil.example.md'],
    ['intro', '..'],
  ]
  for (const slug of escapes) {
    assert.throws(() => build(slug), DocsUpstreamRejected, slug.join('/'))
  }
})

test('markdown negotiation stays under the frankx feed', () => {
  assert.equal(
    markdownNegotiatedDocsUrl(undefined).href,
    `${origin}/llms.mdx/frankx/intro/content.md`,
  )
  assert.equal(
    markdownNegotiatedDocsUrl(['skills-and-mcp']).pathname,
    '/llms.mdx/frankx/skills-and-mcp/content.md',
  )
  assert.throws(
    () => markdownNegotiatedDocsUrl(['foo', '..', '..', 'akamoto']),
    DocsUpstreamRejected,
  )
})

test('upstream redirects that leave the frankx prefix are refused', () => {
  const current = new URL('/frankx/intro/', origin)
  assert.equal(nextAllowedDocsUrl(current, '/frankx/intro').href, `${origin}/frankx/intro`)
  assert.throws(() => nextAllowedDocsUrl(current, '/akamoto/overview'), DocsUpstreamRejected)
  assert.throws(
    () => nextAllowedDocsUrl(current, 'https://evil.example/frankx/intro'),
    DocsUpstreamRejected,
  )
  assert.throws(() => nextAllowedDocsUrl(current, '//evil.example/x'), DocsUpstreamRejected)
})
