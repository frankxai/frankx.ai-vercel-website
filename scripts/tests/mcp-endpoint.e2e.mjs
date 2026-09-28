// Live check of /api/mcp with the official MCP client.
// MCP_URL=http://localhost:3000/api/mcp node --test scripts/tests/mcp-endpoint.e2e.mjs
// (also works against a preview deployment or https://frankx.ai/api/mcp)
import assert from 'node:assert/strict'
import test from 'node:test'
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js'

const url = new URL(process.env.MCP_URL ?? 'http://localhost:3000/api/mcp')

async function withClient(fn) {
  const client = new Client({ name: 'frankx-mcp-e2e', version: '0.0.0' })
  await client.connect(new StreamableHTTPClientTransport(url))
  try {
    return await fn(client)
  } finally {
    await client.close()
  }
}
const json = (result) => JSON.parse(result.content[0].text)

test('lists three contract-clean tools', () => withClient(async (client) => {
  const { tools } = await client.listTools()
  assert.deepEqual(tools.map((tool) => tool.name).sort(), ['get_article', 'list_products', 'search_site'])
  for (const tool of tools) {
    assert.match(tool.name, /^[a-z][a-z0-9_]{0,63}$/)
    assert.ok(tool.description.length >= 20)
    assert.equal(tool.inputSchema.type, 'object')
  }
}))

test('search finds articles with absolute URLs, and get_article reads one', () => withClient(async (client) => {
  const hits = json(await client.callTool({ name: 'search_site', arguments: { query: 'agentic', limit: 10 } }))
  assert.ok(hits.length > 0)
  assert.ok(hits.every((hit) => /^https:\/\//.test(hit.url)))
  const article = hits.find((hit) => /^https:\/\/frankx\.ai\/blog\/[a-z0-9-]+$/.test(hit.url))
  assert.ok(article, 'at least one blog hit for "agentic"')
  const slug = article.url.split('/blog/')[1]
  const result = await client.callTool({ name: 'get_article', arguments: { slug } })
  assert.notEqual(result.isError, true)
  assert.match(result.content[0].text, /^# /)
  assert.match(result.content[0].text, new RegExp(`Source: https://frankx\\.ai/blog/${slug}`))
}))

test('unknown slugs and path tricks are refused', () => withClient(async (client) => {
  const missing = await client.callTool({ name: 'get_article', arguments: { slug: 'no-such-article-xyz' } })
  assert.equal(missing.isError, true)
  const traversal = await client.callTool({ name: 'get_article', arguments: { slug: '../CLAUDE' } })
  assert.equal(traversal.isError, true)
}))

test('products carry name, headline and URL only', () => withClient(async (client) => {
  const products = json(await client.callTool({ name: 'list_products', arguments: {} }))
  assert.ok(products.length > 0)
  for (const product of products) assert.deepEqual(Object.keys(product).sort(), ['headline', 'name', 'url'])
}))
