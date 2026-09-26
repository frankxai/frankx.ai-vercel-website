import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { register } from 'node:module'
import test from 'node:test'
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js'
import { scoreTools } from './vendor/mcp-doctor-score.ts'

register('./support/app-module-hooks.mjs', import.meta.url)
const { createFrankxMcpServer } = await import('../../lib/mcp/frankx-server.ts')

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

test('search returns structured hits with absolute URLs, and get_article reads one', () => withClient(async (client) => {
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
