import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { calendarDay } from '../../lib/quote-day.ts'
import {
  AI_CATALOG_URL,
  aiCatalogContentType,
  aiCatalogResponse,
  frankxAiCatalog,
  frankxServerCard,
  MCP_ENDPOINT,
  publicRobotAllows,
  SERVER_CARD_SCHEMA,
  SERVER_CARD_URL,
  serverCardContentType,
  serverCardResponse,
} from '../../lib/mcp-server-card.ts'

const root = path.resolve(import.meta.dirname, '../..')

test('the server card matches SEP-2127 and omits tools', async () => {
  const card = frankxServerCard()
  assert.equal(card.$schema, SERVER_CARD_SCHEMA)
  assert.match(card.name, /^[a-zA-Z0-9.-]+\/[a-zA-Z0-9._-]+$/)
  assert.equal(card.version, '1.1.0')
  assert.ok(card.description.length >= 1 && card.description.length <= 100)
  assert.equal(card.remotes[0].type, 'streamable-http')
  assert.equal(card.remotes[0].url, MCP_ENDPOINT)
  assert.equal(card._meta['ai.frankx/serverInfoName'], 'frankx')
  const blob = JSON.stringify(card)
  assert.equal(blob.includes('frankx_search_site'), false)
  assert.equal(blob.includes('tools'), false)

  const response = serverCardResponse('GET', null)
  assert.equal(response.status, 200)
  assert.equal(response.headers.get('content-type'), serverCardContentType)
  assert.equal(response.headers.get('cache-control'), 'public, max-age=3600')
  assert.equal(response.headers.get('access-control-allow-origin'), '*')
  assert.equal(response.headers.get('access-control-expose-headers'), 'ETag')
  const etag = response.headers.get('etag')
  assert.match(etag ?? '', /^"[a-f0-9]{64}"$/)
  assert.deepEqual(await response.json(), card)

  const cached = serverCardResponse('GET', etag)
  assert.equal(cached.status, 304)
  assert.equal(await cached.text(), '')

  const head = serverCardResponse('HEAD', null)
  assert.equal(head.status, 200)
  assert.equal(await head.text(), '')
})

test('the AI catalog points at the server card', async () => {
  const catalog = frankxAiCatalog()
  assert.equal(catalog.specVersion, '1.0')
  assert.equal(catalog.entries.length, 1)
  assert.equal(catalog.entries[0].identifier, 'urn:air:frankx.ai:mcp:frankx')
  assert.equal(catalog.entries[0].type, 'application/mcp-server-card+json')
  assert.equal(catalog.entries[0].url, SERVER_CARD_URL)
  const response = aiCatalogResponse('GET', null)
  assert.equal(response.status, 200)
  assert.equal(response.headers.get('content-type'), aiCatalogContentType)
  assert.deepEqual(await response.json(), catalog)
  assert.equal(AI_CATALOG_URL, 'https://www.frankx.ai/.well-known/ai-catalog.json')
})

test('routes, robots, and the quote timezone use the published helpers', () => {
  const cardRoute = fs.readFileSync(path.join(root, 'app/api/mcp/server-card/route.ts'), 'utf8')
  const catalogRoute = fs.readFileSync(path.join(root, 'app/.well-known/ai-catalog.json/route.ts'), 'utf8')
  const robots = fs.readFileSync(path.join(root, 'app/robots.ts'), 'utf8')
  const quote = fs.readFileSync(path.join(root, 'app/api/quote/today/route.ts'), 'utf8')
  const layout = fs.readFileSync(path.join(root, 'app/layout.tsx'), 'utf8')

  assert.match(cardRoute, /serverCardResponse/)
  assert.match(catalogRoute, /aiCatalogResponse/)
  for (const allow of publicRobotAllows) {
    assert.ok(robots.includes(allow), allow)
  }
  assert.match(robots, /'\/api\/'/)
  assert.equal(robots.includes("'/api/admin'"), false)
  assert.equal(robots.includes("'/api/checkout'"), false)
  assert.match(quote, /calendarDay\(tz, new Date\(\)\)/)
  assert.match(quote, /Unrecognized IANA timezone\./)
  assert.match(quote, /status: 400/)
  assert.match(layout, /'is-agentic-site-type': 'content'/)

  assert.equal(calendarDay('UTC', new Date('2026-10-16T12:00:00Z')), '2026-10-16')
  assert.equal(calendarDay('NotAZone', new Date('2026-10-16T12:00:00Z')), null)
})
