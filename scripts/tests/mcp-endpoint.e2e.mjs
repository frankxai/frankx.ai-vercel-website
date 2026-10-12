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
    await client.listTools()
    return await fn(client)
  } finally {
    await client.close()
  }
}

function structured(result) {
  assert.notEqual(result.isError, true, result.content?.[0]?.text)
  assert.deepEqual(JSON.parse(result.content[0].text), result.structuredContent)
  return result.structuredContent
}

test('lists three contract-clean tools', () => withClient(async (client) => {
  const { tools } = await client.listTools()
  assert.deepEqual(tools.map((tool) => tool.name).sort(), ['frankx_get_article', 'frankx_list_products', 'frankx_search_site'])
  for (const tool of tools) {
    assert.match(tool.name, /^frankx_[a-z0-9_]{1,56}$/)
    assert.ok(tool.description.length >= 80)
    assert.equal(tool.inputSchema.type, 'object')
    assert.equal(tool.outputSchema?.type, 'object')
  }
}))

test('search finds articles with absolute URLs, and frankx_get_article reads one', () => withClient(async (client) => {
  const { results } = structured(await client.callTool({ name: 'frankx_search_site', arguments: { query: 'agentic', limit: 10 } }))
  assert.ok(results.length > 0)
  assert.ok(results.every((hit) => /^https:\/\//.test(hit.url)))
  const hit = results.find((item) => /^https:\/\/frankx\.ai\/blog\/[a-z0-9-]+$/.test(item.url))
  assert.ok(hit, 'at least one blog hit for "agentic"')
  const slug = hit.url.split('/blog/')[1]
  const article = structured(await client.callTool({ name: 'frankx_get_article', arguments: { slug } }))
  assert.match(article.markdown, /^# /)
  assert.equal(article.url, `https://frankx.ai/blog/${slug}`)
}))

test('unknown slugs and path tricks are refused', () => withClient(async (client) => {
  const missing = await client.callTool({ name: 'frankx_get_article', arguments: { slug: 'no-such-article-xyz' } })
  assert.equal(missing.isError, true)
  const traversal = await client.callTool({ name: 'frankx_get_article', arguments: { slug: '../CLAUDE' } })
  assert.equal(traversal.isError, true)
}))

test('products carry name, headline and URL only', () => withClient(async (client) => {
  const { products, total } = structured(await client.callTool({ name: 'frankx_list_products', arguments: {} }))
  assert.ok(products.length > 0)
  assert.ok(total >= products.length)
  for (const product of products) assert.deepEqual(Object.keys(product).sort(), ['headline', 'name', 'url'])
}))
