import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../../${path}`, import.meta.url), 'utf8')
const server = read('lib/mcp/frankx-server.ts')
const route = read('app/api/mcp/route.ts')
const mdRoute = read('app/api/md/route.ts')

test('the MCP endpoint serves exactly three read-only tools', () => {
  const tools = [...server.matchAll(/registerTool\(\s*'([a-z_]+)'/g)].map((match) => match[1])
  assert.deepEqual(tools.sort(), ['get_article', 'list_products', 'search_site'])
  assert.equal(server.match(/readOnlyHint: true/g)?.length, 3)
})

test('it never calls a model, writes files or reads secrets', () => {
  for (const forbidden of [/@anthropic-ai|openai|@ai-sdk|from 'ai'/, /writeFile|appendFile|mkdir/, /process\.env/]) {
    assert.doesNotMatch(server, forbidden)
    assert.doesNotMatch(route, forbidden)
  }
})

test('products expose no price or testimonial: those claims stay on reviewed pages', () => {
  const listProducts = server.slice(server.indexOf("'list_products'"))
  assert.doesNotMatch(listProducts, /price|testimonial|originalPrice|badge/)
})

test('get_article only accepts plain slugs, so drafts and internal docs are unreachable', () => {
  assert.match(server, /slug: z\.string\(\)\.regex\(\/\^\[a-z0-9\]\[a-z0-9-\]/)
})

test('llms.txt advertises the endpoint and its tools to agents', () => {
  const llms = read('app/llms.txt/route.ts')
  assert.match(llms, /## Agent access/)
  assert.match(llms, /\/api\/mcp/)
  for (const tool of ['search_site', 'get_article', 'list_products']) assert.match(llms, new RegExp(tool))
})

test('the route is stateless and the markdown format is shared with /api/md', () => {
  assert.match(route, /sessionIdGenerator: undefined/)
  assert.match(mdRoute, /blogPostToMarkdown\(post\)/)
  assert.match(server, /blogPostToMarkdown\(post\)/)
})
