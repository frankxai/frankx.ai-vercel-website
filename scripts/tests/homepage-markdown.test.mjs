import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { wantsMarkdown } from '../../lib/accept-markdown.ts'
import { homepageMarkdown, homepageMarkdownResponse } from '../../lib/homepage-markdown.ts'

const root = path.resolve(import.meta.dirname, '../..')

function unescapeTs(value) {
  return value.replace(/\\'/g, "'")
}

function quotedValues(source, key) {
  const pattern = new RegExp(`${key}:\\s*'((?:\\\\'|[^'])*)'`, 'g')
  return [...source.matchAll(pattern)].map((match) => unescapeTs(match[1]))
}

test('markdown is preferred only when Accept says so', () => {
  const browser =
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
  assert.equal(wantsMarkdown(null), false)
  assert.equal(wantsMarkdown(''), false)
  assert.equal(wantsMarkdown('text/html'), false)
  assert.equal(wantsMarkdown('*/*'), false)
  assert.equal(wantsMarkdown('text/*'), false)
  assert.equal(wantsMarkdown(browser), false)
  assert.equal(wantsMarkdown('text/markdown'), true)
  assert.equal(wantsMarkdown('text/markdown;charset=utf-8'), true)
  assert.equal(wantsMarkdown('text/markdown, text/html'), true)
  assert.equal(wantsMarkdown('text/html, text/markdown'), false)
  assert.equal(wantsMarkdown('text/html, text/markdown;q=0.1'), false)
  assert.equal(wantsMarkdown('text/markdown;q=0'), false)
  assert.equal(wantsMarkdown('text/markdown;q=0.5, text/*;q=0.8'), false)
  assert.equal(wantsMarkdown('text/markdown, */*;q=0.8'), true)
  assert.equal(wantsMarkdown('text/markdown;q=0.2, */*'), false)
  assert.equal(wantsMarkdown('text/markdown, text/html;q=0.9, */*'), true)
})

test('homepage markdown follows the page copy', async () => {
  const page = fs.readFileSync(path.join(root, 'app/page.tsx'), 'utf8')
  const faqStart = page.indexOf('const homepageFAQs')
  const faqEnd = page.indexOf('export default function Page')
  const faqs = page.slice(faqStart, faqEnd)
  const home = fs.readFileSync(path.join(root, 'components/home/HomePageElite.tsx'), 'utf8')
  const productStart = home.indexOf('const products = [')
  const productEnd = home.indexOf('function ProductsTools')
  const products = home.slice(productStart, productEnd)
  const body = homepageMarkdown()

  assert.ok(body.length >= 20)
  assert.equal(body.includes('<!DOCTYPE'), false)
  assert.equal(body.includes('<html'), false)
  assert.match(
    body,
    /Frank Riemer's living studio for music, agent systems, books, field notes, and practical tools\./,
  )
  assert.match(home, /aria-label="Build intelligence that compounds\."/)
  assert.match(body, /Build intelligence that compounds\./)
  assert.match(home, /const heroOutcome = 'Explore your highest-leverage AI move\.'/)
  assert.match(body, /Explore your highest-leverage AI move\./)

  for (const question of quotedValues(faqs, 'question')) {
    assert.ok(body.includes(question), question)
  }
  for (const answer of quotedValues(faqs, 'answer')) {
    assert.ok(body.includes(answer), answer)
  }
  for (const title of quotedValues(products, 'title')) {
    assert.ok(body.includes(title), title)
  }
  for (const description of quotedValues(products, 'description')) {
    assert.ok(body.includes(description), description)
  }
  for (const href of ['/developers', '/llms.txt', '/sitemap.xml', '/api/v1', '/openapi.json', '/.well-known/api-catalog', '/.well-known/ai-catalog.json', '/api/mcp', '/api/mcp/server-card', '/music', '/guides']) {
    assert.ok(body.includes(`https://www.frankx.ai${href}`), href)
  }
  assert.equal(body.includes('https://www.frankx.ai/openapi.json'), true)

  const response = homepageMarkdownResponse('GET')
  assert.equal(response.status, 200)
  assert.equal(response.headers.get('content-type'), 'text/markdown; charset=utf-8')
  assert.equal(response.headers.get('vary'), 'Accept')
  assert.equal(response.headers.get('cache-control'), 'private, no-store')
  assert.equal(await response.text(), body)

  const head = homepageMarkdownResponse('HEAD')
  assert.equal(head.status, 200)
  assert.equal(head.headers.get('content-type'), 'text/markdown; charset=utf-8')
  assert.equal(head.headers.get('vary'), 'Accept')
  assert.equal(await head.text(), '')
})

test('negotiation stays in the proxy and off the not-found boundary', () => {
  const proxy = fs.readFileSync(path.join(root, 'proxy.ts'), 'utf8')
  assert.match(proxy, /wantsMarkdown\(request\.headers\.get\('accept'\)\)/)
  assert.match(proxy, /pathname === '\/'/)
  assert.match(proxy, /url\.pathname = '\/api\/homepage-markdown'/)
  assert.equal(proxy.includes("from 'next/headers'"), false)

  const notFound = fs.readFileSync(path.join(root, 'app/not-found.tsx'), 'utf8')
  assert.match(notFound, /'use client'/)
  assert.equal(notFound.includes("from 'next/headers'"), false)

  const markdownSource = fs.readFileSync(path.join(root, 'lib/homepage-markdown.ts'), 'utf8')
  assert.equal(markdownSource.includes('HomePageElite'), false)
  assert.equal(markdownSource.includes('app/page'), false)

  const route = fs.readFileSync(path.join(root, 'app/api/homepage-markdown/route.ts'), 'utf8')
  assert.match(route, /homepageMarkdownResponse\('GET'\)/)
  assert.match(route, /homepageMarkdownResponse\('HEAD'\)/)
  assert.match(route, /force-dynamic/)
  assert.equal(route.includes("from 'next/headers'"), false)

  const footer = fs.readFileSync(path.join(root, 'components/Footer.tsx'), 'utf8')
  assert.match(footer, /label: 'Developers', href: '\/developers'/)
  const llms = fs.readFileSync(path.join(root, 'app/llms.txt/route.ts'), 'utf8')
  assert.match(llms, /\$\{SITE_URL\}\/developers/)
  assert.match(llms, /\$\{SITE_URL\}\/api\/v1/)
  assert.match(llms, /\$\{SITE_URL\}\/openapi\.json/)
  assert.match(llms, /\$\{SITE_URL\}\/\.well-known\/api-catalog/)
  assert.match(llms, /application\/linkset\+json/)
  assert.match(llms, /application\/problem\+json/)
  assert.match(llms, /api_route_not_found/)
  assert.match(llms, /\$\{SITE_URL\}\/api\/mcp\/server-card/)
  assert.match(llms, /\$\{SITE_URL\}\/\.well-known\/ai-catalog\.json/)
})
