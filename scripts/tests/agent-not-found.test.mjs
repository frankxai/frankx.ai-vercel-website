import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

import {
  agentNotFoundMarkdown,
  agentNotFoundResponse,
  wantsMarkdownNotFound,
} from '../../lib/agent-not-found.ts'

const root = join(dirname(fileURLToPath(import.meta.url)), '../..')

test('markdown is chosen only when it is explicitly acceptable', () => {
  assert.equal(wantsMarkdownNotFound(null), false)
  assert.equal(wantsMarkdownNotFound('*/*'), false)
  assert.equal(
    wantsMarkdownNotFound('text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'),
    false,
  )
  assert.equal(wantsMarkdownNotFound('text/markdown'), true)
  assert.equal(wantsMarkdownNotFound('text/markdown, text/html;q=0.9, */*'), true)
  assert.equal(wantsMarkdownNotFound('text/html, text/markdown;q=0.1'), false)
  assert.equal(wantsMarkdownNotFound('text/html, text/markdown;q=0'), false)
  assert.equal(wantsMarkdownNotFound('text/markdown, text/html'), true)
  assert.equal(wantsMarkdownNotFound('text/html, text/markdown'), false)
})

test('the 404 body tells an agent where to recover', () => {
  const body = agentNotFoundMarkdown('/__ora-404-probe-5czgmg5h\n`')
  assert.equal(body.includes('`'), true)
  assert.equal(body.includes('\n`'), false)
  assert.match(body, /No page exists at `\/__ora-404-probe-5czgmg5h`\./)
  const explanation = body.split('\n').find((line) => line.startsWith('frankx.ai has no document'))
  assert.ok(explanation && explanation.length >= 20)
  assert.match(body, /https:\/\/www\.frankx\.ai\/sitemap\.xml/)
  assert.match(body, /https:\/\/www\.frankx\.ai\/llms\.txt/)
  assert.match(body, /https:\/\/www\.frankx\.ai\/developers/)
  assert.equal(body.includes('<'), false)
})

test('Accept: text/markdown receives HTTP 404 and text/markdown', async () => {
  const response = agentNotFoundResponse('GET', '/missing')
  assert.equal(response.status, 404)
  assert.equal(response.headers.get('content-type'), 'text/markdown; charset=utf-8')
  assert.equal(response.headers.get('vary'), 'Accept')
  assert.match(response.headers.get('x-robots-tag') ?? '', /noindex/)
  const body = await response.text()
  assert.match(body, /^# Page not found/)
  assert.match(body, /\/llms\.txt/)
})

test('HEAD keeps the 404 contract and omits the body', async () => {
  const response = agentNotFoundResponse('HEAD', '/missing')
  assert.equal(response.status, 404)
  assert.equal(response.headers.get('content-type'), 'text/markdown; charset=utf-8')
  assert.equal(await response.text(), '')
})

test('a missing root path stays missing for the sitemap gate', async (t) => {
  try {
    await import('gray-matter')
  } catch {
    t.skip('gray-matter is not installed in this worktree')
    return
  }
  const { hasAppRoute } = await import('../../lib/route-enumeration.mjs')
  assert.equal(hasAppRoute('/__ora-404-probe-does-not-exist'), false)
  assert.equal(hasAppRoute('/developers'), true)
  assert.equal(hasAppRoute('/blog/this-post-is-not-in-the-catalog'), true)
})

test('unknown URLs negotiate markdown outside the shared not-found boundary', () => {
  const route = readFileSync(join(root, 'app/[...slug]/route.ts'), 'utf8')
  assert.match(route, /wantsMarkdownNotFound/)
  assert.match(route, /agentNotFoundResponse/)
  assert.match(route, /notFound\(\)/)
  assert.match(route, /force-dynamic/)
  const notFoundPage = readFileSync(join(root, 'app/not-found.tsx'), 'utf8')
  assert.match(notFoundPage, /'use client'/)
  assert.equal(notFoundPage.includes("from 'next/headers'"), false)

  const enumeration = readFileSync(join(root, 'lib/route-enumeration.mjs'), 'utf8')
  assert.match(enumeration, /CATCH_ALL_PAGE_FILES/)
  assert.match(enumeration, /route\.ts alone does not/)
})
