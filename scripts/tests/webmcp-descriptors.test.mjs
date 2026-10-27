import test from 'node:test'
import assert from 'node:assert/strict'
import { browserDescriptors } from '../../lib/mcp/browser-descriptors.mjs'
import { createReadOnlyMcpTools, registerWebTools } from '../../lib/webmcp.mjs'
import { register } from 'node:module'

register('./support/app-module-hooks.mjs', import.meta.url)

test('only public FrankX reads reach the existing MCP endpoint', async () => {
  const registered = []
  const requests = []
  const tools = createReadOnlyMcpTools({
    endpoint: '/api/mcp', origin: 'https://frankx.ai', descriptors: browserDescriptors,
    fetchImpl: async (url, request) => {
      const body = JSON.parse(request.body)
      requests.push({ url, request, body })
      return Response.json({ jsonrpc: '2.0', id: body.id, result: { structuredContent: { verified: body.params.name } } })
    },
  })
  const registration = registerWebTools({ registerTool: tool => registered.push(tool) }, tools)
  assert.equal(await registration.ready, true)
  assert.deepEqual(registered.map(t => t.name), ['frankx_search_site', 'frankx_get_article', 'frankx_list_products'])
  for (const tool of registered) {
    assert.equal(tool.annotations.readOnlyHint, true)
    assert.equal(tool.annotations.untrustedContentHint, true)
    assert.deepEqual(await tool.execute({}), { verified: tool.name })
  }
  assert(requests.every(({ url, request, body }) =>
    url === 'https://frankx.ai/api/mcp' && request.redirect === 'error' &&
    request.cache === 'no-store' && body.method === 'tools/call'))
  registration.stop()
  await assert.rejects(() => registered[0].execute({ query: 'architecture' }))
})

test('the browser adapter reads through the actual stateless HTTP handler', async () => {
  const { POST } = await import('../../app/api/mcp/route.ts')
  const tools = createReadOnlyMcpTools({
    endpoint: '/api/mcp', origin: 'https://frankx.ai', descriptors: browserDescriptors,
    fetchImpl: (url, request) => POST(new Request(url, request)),
  })
  const search = await tools[0].execute({ query: 'agentic', limit: 3 })
  assert(search.results.length > 0 && search.results.length <= 3)
  const products = await tools[2].execute({ limit: 1 })
  assert.equal(products.products.length, 1)
  await assert.rejects(() => tools[1].execute({ slug: '../private' }))
})
