import assert from 'node:assert/strict'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { register } from 'node:module'
import test from 'node:test'
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js'
import { scoreTools } from './vendor/mcp-doctor-score.ts'

register('./support/app-module-hooks.mjs', import.meta.url)
const { createFrankxMcpServer, pageMarkdown } = await import('../../lib/mcp/frankx-server.ts')

const read = (path) => readFileSync(new URL(`../../${path}`, import.meta.url), 'utf8')
const server = read('lib/mcp/frankx-server.ts')
const route = read('app/api/mcp/route.ts')
const mdRoute = read('app/api/md/route.ts')
const TOOLS = ['frankx_get_article', 'frankx_list_products', 'frankx_search_site']

async function withClient(fn) {
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair()
  const mcp = createFrankxMcpServer()
  const client = new Client({ name: 'frankx-mcp-contract', version: '0.0.0' })
  await mcp.connect(serverTransport)
  await client.connect(clientTransport)
  try {
    return await fn(client)
  } finally {
    await client.close()
    await mcp.close()
  }
}

/** The structured result, after checking the text block carries the same JSON for clients without structuredContent. */
function structured(result) {
  assert.notEqual(result.isError, true, result.content?.[0]?.text)
  assert.ok(result.structuredContent, 'tool returns structuredContent')
  assert.deepEqual(JSON.parse(result.content[0].text), result.structuredContent)
  return result.structuredContent
}

test('the MCP endpoint serves exactly three read-only, frankx_-prefixed tools', () => withClient(async (client) => {
  const { tools } = await client.listTools()
  assert.deepEqual(tools.map((tool) => tool.name).sort(), TOOLS)
  for (const tool of tools) {
    assert.equal(tool.annotations?.readOnlyHint, true, tool.name)
    assert.equal(tool.annotations?.openWorldHint, false, tool.name)
  }
}))

test('the tool surface scores 100% on the mcp-doctor quality bar', () => withClient(async (client) => {
  const { tools } = await client.listTools()
  const report = scoreTools(tools, 'frankx')
  const misses = report.criteria.filter((item) => item.points < 2).map((item) => `${item.id}: ${item.failing.join(', ')}`)
  assert.equal(report.percent, 100, misses.join('; '))
}))

test('search returns structured hits with absolute URLs, and frankx_get_article reads one', () => withClient(async (client) => {
  const search = structured(await client.callTool({ name: 'frankx_search_site', arguments: { query: 'agentic', limit: 10 } }))
  assert.ok(search.results.length > 0 && search.results.length <= 10)
  assert.ok(search.results.every((hit) => /^https:\/\//.test(hit.url)))
  const hit = search.results.find((item) => /^https:\/\/frankx\.ai\/blog\/[a-z0-9-]+$/.test(item.url))
  assert.ok(hit, 'at least one blog hit for "agentic"')
  const slug = hit.url.split('/blog/')[1]
  const article = structured(await client.callTool({ name: 'frankx_get_article', arguments: { slug } }))
  assert.equal(article.slug, slug)
  assert.equal(article.url, `https://frankx.ai/blog/${slug}`)
  assert.match(article.markdown, /^# /)
}))

test('long articles are cut at maxChars on a paragraph boundary and say so', () => withClient(async (client) => {
  const blog = new URL('../../content/blog/', import.meta.url)
  const longest = readdirSync(blog)
    .filter((file) => /^[a-z0-9][a-z0-9-]*\.mdx?$/.test(file))
    .sort((a, b) => statSync(new URL(b, blog)).size - statSync(new URL(a, blog)).size)
    .map((file) => file.replace(/\.mdx?$/, ''))
  let article
  for (const slug of longest) {
    const result = await client.callTool({ name: 'frankx_get_article', arguments: { slug } })
    if (!result.isError) { article = structured(result); break }
  }
  assert.ok(article.totalChars > 40000, `longest readable article is only ${article.totalChars} chars`)
  assert.equal(article.truncated, true)
  assert.ok(article.markdown.length <= 40000)
  assert.ok(article.markdown.length > 30000, 'cut lands near the limit, not far before it')

  const cut = structured(await client.callTool({ name: 'frankx_get_article', arguments: { slug: article.slug, maxChars: 1000 } }))
  assert.equal(cut.truncated, true)
  assert.equal(cut.totalChars, article.totalChars)
  assert.ok(cut.markdown.length <= 1000)

  const full = structured(await client.callTool({ name: 'frankx_get_article', arguments: { slug: article.slug, maxChars: 100000 } }))
  assert.equal(full.truncated, full.totalChars > 100000)
  assert.ok(full.markdown.length <= 100000)
  assert.ok(full.markdown.startsWith(article.markdown))
  assert.match(full.markdown.slice(article.markdown.length), /^[ \t]*\n[ \t]*\n/, 'default cut falls on a paragraph break')

  const short = structured(await client.callTool({ name: 'frankx_get_article', arguments: { slug: longest.at(-1) } }))
  assert.equal(short.truncated, false)
  assert.equal(short.markdown.length, short.totalChars)
}))

test('an article over 100k chars can be paged to the end via nextOffset, and the pages rebuild it exactly', () => withClient(async (client) => {
  const slug = 'agentic-seo-publishing-masterplan'
  const pages = []
  let offset = 0
  for (let call = 0; offset !== null; call++) {
    assert.ok(call < 10, 'paging terminates')
    const page = structured(await client.callTool({ name: 'frankx_get_article', arguments: { slug, maxChars: 100000, offset } }))
    assert.equal(page.offset, offset)
    assert.equal(page.truncated, page.nextOffset !== null)
    pages.push(page)
    offset = page.nextOffset
  }
  const { totalChars } = pages[0]
  assert.ok(totalChars > 100000, `${slug} is ${totalChars} chars, no longer a paging case`)
  assert.ok(pages.length >= 2)
  const rebuilt = pages.map((page) => page.markdown).join('')
  assert.equal(rebuilt.length, totalChars)
  assert.match(rebuilt, /^# /)

  const small = []
  for (let next = 0; next !== null;) {
    const page = structured(await client.callTool({ name: 'frankx_get_article', arguments: { slug, maxChars: 40000, offset: next } }))
    small.push(page.markdown)
    next = page.nextOffset
  }
  assert.equal(small.join(''), rebuilt)

  const past = structured(await client.callTool({ name: 'frankx_get_article', arguments: { slug, offset: totalChars + 5 } }))
  assert.equal(past.markdown, '')
  assert.equal(past.nextOffset, null)
  assert.equal(past.truncated, false)
}))

test('a hard cut never splits a surrogate pair', () => {
  const text = `${'a'.repeat(999)}😀${'b'.repeat(2000)}`
  const first = pageMarkdown(text, 0, 1000)
  assert.equal(first.markdown, 'a'.repeat(999))
  assert.equal(first.nextOffset, 999)
  const second = pageMarkdown(text, first.nextOffset, 1000)
  assert.ok(second.markdown.startsWith('😀'))
  let rebuilt = ''
  for (let next = 0; next !== null;) {
    const page = pageMarkdown(text, next, 1000)
    rebuilt += page.markdown
    next = page.nextOffset
  }
  assert.equal(rebuilt, text)
})

test('maxChars is bounded to 1000-100000', () => withClient(async (client) => {
  const { results } = structured(await client.callTool({ name: 'frankx_search_site', arguments: { query: 'agentic', limit: 25 } }))
  const slug = results.find((item) => item.url.includes('/blog/')).url.split('/blog/')[1]
  structured(await client.callTool({ name: 'frankx_get_article', arguments: { slug, maxChars: 1000 } }))
  for (const maxChars of [999, 100001]) {
    const result = await client.callTool({ name: 'frankx_get_article', arguments: { slug, maxChars } })
    assert.equal(result.isError, true, `maxChars ${maxChars} accepted`)
  }
}))

test('unknown slugs and path tricks are refused with a hint', () => withClient(async (client) => {
  const missing = await client.callTool({ name: 'frankx_get_article', arguments: { slug: 'no-such-article-xyz' } })
  assert.equal(missing.isError, true)
  assert.match(missing.content[0].text, /frankx_search_site/)
  const traversal = await client.callTool({ name: 'frankx_get_article', arguments: { slug: '../CLAUDE' } })
  assert.equal(traversal.isError, true)
}))

test('products carry name, headline and URL only, and honour the limit', () => withClient(async (client) => {
  const all = structured(await client.callTool({ name: 'frankx_list_products', arguments: {} }))
  assert.ok(all.products.length > 0)
  assert.equal(all.total, all.products.length)
  for (const product of all.products) assert.deepEqual(Object.keys(product).sort(), ['headline', 'name', 'url'])
  const two = structured(await client.callTool({ name: 'frankx_list_products', arguments: { limit: 2 } }))
  assert.equal(two.products.length, 2)
  assert.equal(two.total, all.total)
}))

test('it never calls a model, writes files or reads secrets', () => {
  for (const forbidden of [/@anthropic-ai|openai|@ai-sdk|from 'ai'/, /writeFile|appendFile|mkdir/, /process\.env/]) {
    assert.doesNotMatch(server, forbidden)
    assert.doesNotMatch(route, forbidden)
  }
})

test('products expose no price or testimonial: those claims stay on reviewed pages', () => {
  const listProducts = server.slice(server.indexOf("'frankx_list_products'"))
  assert.doesNotMatch(listProducts, /price|testimonial|originalPrice|badge/)
})

test('get_article only accepts plain slugs, so drafts and internal docs are unreachable', () => {
  assert.match(server, /slug: z\.string\(\)\.regex\(\/\^\[a-z0-9\]\[a-z0-9-\]/)
})

test('llms.txt advertises the endpoint and its tools to agents', () => {
  const llms = read('app/llms.txt/route.ts')
  assert.match(llms, /## Agent access/)
  assert.match(llms, /\/api\/mcp/)
  for (const tool of TOOLS) assert.match(llms, new RegExp(tool))
})

test('the route is stateless and the markdown format is shared with /api/md', () => {
  assert.match(route, /sessionIdGenerator: undefined/)
  assert.match(mdRoute, /blogPostToMarkdown\(post\)/)
  assert.match(server, /blogPostToMarkdown\(post\)/)
})
