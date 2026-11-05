import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { register } from 'node:module'
import { dirname, join } from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

register('./support/app-module-hooks.mjs', import.meta.url)

const {
  agentNotFoundMarkdown,
  agentNotFoundResponse,
  routeOwnsMarkdown,
  wantsMarkdownNotFound,
} = await import('../../lib/agent-not-found.ts')

const root = join(dirname(fileURLToPath(import.meta.url)), '../..')

test('docs keeps its own markdown negotiation', () => {
  assert.equal(routeOwnsMarkdown('/docs'), true)
  assert.equal(routeOwnsMarkdown('/docs/intro'), true)
  assert.equal(routeOwnsMarkdown('/docs/intro.md'), true)
  assert.equal(routeOwnsMarkdown('/docs-platform'), false)
  assert.equal(routeOwnsMarkdown('/developers'), false)
  assert.equal(routeOwnsMarkdown('/'), false)
})

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
  assert.equal(wantsMarkdownNotFound('text/markdown;q=0.5, text/*;q=0.9'), false)
  assert.equal(wantsMarkdownNotFound('text/markdown;q=0.9, text/*;q=0.5'), true)
  assert.equal(wantsMarkdownNotFound('text/markdown;q=0.5, */*;q=0.9'), false)
  assert.equal(wantsMarkdownNotFound('text/markdown;q=0.9, */*;q=0.5'), true)
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
  const page = readFileSync(join(root, 'app/[...slug]/page.tsx'), 'utf8')
  assert.match(page, /notFound\(\)/)
  assert.match(page, /force-dynamic/)

  const proxySource = readFileSync(join(root, 'proxy.ts'), 'utf8')
  assert.match(proxySource, /wantsMarkdownNotFound/)
  assert.match(proxySource, /routeOwnsMarkdown/)
  assert.match(proxySource, /\/api\/md/)

  const notFoundPage = readFileSync(join(root, 'app/not-found.tsx'), 'utf8')
  assert.match(notFoundPage, /'use client'/)
  assert.equal(notFoundPage.includes("from 'next/headers'"), false)

  const enumeration = readFileSync(join(root, 'lib/route-enumeration.mjs'), 'utf8')
  assert.match(enumeration, /CATCH_ALL_PAGE_FILES/)
  assert.match(enumeration, /route\.ts alone does not/)
})

test('/api/md distinguishes existing routes from unknown routes', async () => {
  const { GET, HEAD } = await import('../../app/api/md/route.ts')

  const reqUnknown = new Request('https://www.frankx.ai/api/md?path=/this-page-does-not-exist')
  const resUnknown = await GET(reqUnknown)
  assert.equal(resUnknown.status, 404)
  assert.equal(resUnknown.headers.get('content-type'), 'text/markdown; charset=utf-8')
  const bodyUnknown = await resUnknown.text()
  assert.match(bodyUnknown, /^# Page not found/)
  assert.match(bodyUnknown, /No page exists at `\/this-page-does-not-exist`\./)

  const reqHead = new Request('https://www.frankx.ai/api/md?path=/this-page-does-not-exist', {
    method: 'HEAD',
  })
  const resHead = await HEAD(reqHead)
  assert.equal(resHead.status, 404)
  assert.equal(resHead.headers.get('content-type'), 'text/markdown; charset=utf-8')
  assert.equal(await resHead.text(), '')

  const reqExisting = new Request('https://www.frankx.ai/api/md?path=/developers')
  const resExisting = await GET(reqExisting)
  assert.equal(resExisting.status, 404)
  assert.match(resExisting.headers.get('content-type') ?? '', /text\/plain/)
  const bodyExisting = await resExisting.text()
  assert.match(bodyExisting, /Content type not supported for markdown export/)
})
