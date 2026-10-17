import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { apiCatalogContentType, apiCatalogDocument, apiCatalogResponse } from '../../lib/api-catalog.ts'
import {
  apiDiscoveryLink,
  apiRouteNotFoundResponse,
  displayedApiPath,
  methodNotAllowedResponse,
  readOnlyOptionsResponse,
} from '../../lib/api-problem.ts'
import { publicApiCatalog, publicApiCatalogResponse } from '../../lib/public-api-catalog.ts'

const root = path.resolve(import.meta.dirname, '../..')

test('displayed API paths stay a single safe path', () => {
  assert.equal(displayedApiPath('/api/v1/orank-probe-test'), '/api/v1/orank-probe-test')
  assert.equal(displayedApiPath('/api/v1/orank-probe-test?q=1#frag'), '/api/v1/orank-probe-test')
  assert.equal(displayedApiPath('/api/v1/a\n<script>`evil`'), '/api/v1/ascriptevil')
  assert.equal(displayedApiPath('//evil.example/api'), '/evil.example/api')
  assert.equal(displayedApiPath(`/${'a'.repeat(400)}`).length, 200)
})

test('unknown API routes return problem+json', async () => {
  const response = apiRouteNotFoundResponse('GET', '/api/v1/orank-probe-test?injected=1')
  assert.equal(response.status, 404)
  assert.equal(response.headers.get('content-type'), 'application/problem+json; charset=utf-8')
  assert.equal(response.headers.get('cache-control'), 'no-store')
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff')
  assert.equal(response.headers.get('x-robots-tag'), 'noindex, nofollow')
  assert.equal(response.headers.get('link'), apiDiscoveryLink)
  const body = await response.json()
  assert.deepEqual(Object.keys(body), [
    'type',
    'title',
    'status',
    'detail',
    'instance',
    'code',
    'resolution',
  ])
  assert.equal(body.type, 'https://www.frankx.ai/llms.txt#api-route-not-found')
  assert.equal(body.title, 'API route not found')
  assert.equal(body.status, 404)
  assert.equal(body.code, 'api_route_not_found')
  assert.equal(body.detail, 'No API route exists at /api/v1/orank-probe-test.')
  assert.equal(body.instance, 'https://www.frankx.ai/api/v1/orank-probe-test')
  assert.match(body.resolution, /https:\/\/www\.frankx\.ai\/\.well-known\/api-catalog/)
  assert.match(body.resolution, /https:\/\/www\.frankx\.ai\/llms\.txt/)
  assert.equal(JSON.stringify(body).includes('<'), false)
  assert.equal(JSON.stringify(body).includes('injected'), false)
  assert.equal('message' in body, false)
})

test('HEAD on an unknown API route has no body', async () => {
  const response = apiRouteNotFoundResponse('HEAD', '/api/v1/orank-probe-test')
  assert.equal(response.status, 404)
  assert.equal(response.headers.get('content-type'), 'application/problem+json; charset=utf-8')
  assert.equal(await response.text(), '')
})

test('the catalog rejects other methods with JSON', async () => {
  const response = methodNotAllowedResponse('POST', '/api/v1')
  assert.equal(response.status, 405)
  assert.equal(response.headers.get('content-type'), 'application/problem+json; charset=utf-8')
  assert.equal(response.headers.get('allow'), 'GET, HEAD, OPTIONS')
  const body = await response.json()
  assert.equal(body.code, 'method_not_allowed')
  assert.equal(body.status, 405)
  assert.equal(body.instance, 'https://www.frankx.ai/api/v1')
  assert.match(body.resolution, /GET https:\/\/www\.frankx\.ai\/api\/v1/)
  assert.equal('message' in body, false)
  assert.deepEqual(Object.keys(body), [
    'type',
    'title',
    'status',
    'detail',
    'instance',
    'code',
    'resolution',
  ])
})

test('read routes answer OPTIONS with 204', async () => {
  const response = readOnlyOptionsResponse()
  assert.equal(response.status, 204)
  assert.equal(response.headers.get('allow'), 'GET, HEAD, OPTIONS')
  assert.equal(response.headers.get('access-control-allow-origin'), '*')
  assert.equal(response.headers.get('access-control-allow-methods'), 'GET, HEAD, OPTIONS')
  assert.equal(await response.text(), '')
})

test('GET /api/v1 returns the public catalog', async () => {
  const response = publicApiCatalogResponse()
  assert.equal(response.status, 200)
  assert.equal(response.headers.get('content-type'), 'application/json')
  assert.equal(response.headers.get('cache-control'), 'public, max-age=3600, s-maxage=86400')
  assert.equal(response.headers.get('access-control-allow-origin'), '*')
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff')
  assert.equal(response.headers.get('link'), apiDiscoveryLink)
  assert.deepEqual(await response.json(), publicApiCatalog)
})

test('the RFC 9727 catalog is a linkset', async () => {
  assert.equal(
    apiCatalogContentType,
    'application/linkset+json; charset=utf-8; profile="https://www.rfc-editor.org/info/rfc9727"',
  )
  const document = apiCatalogDocument()
  assert.ok(Array.isArray(document.linkset))
  assert.equal(document.linkset[0].anchor, 'https://www.frankx.ai/api/v1')
  assert.equal(document.linkset[0]['service-desc'][0].href, 'https://www.frankx.ai/openapi.json')
  assert.equal(document.linkset[0]['service-desc'][0].type, 'application/vnd.oai.openapi+json')
  const anchors = document.linkset.map((entry) => entry.anchor)
  for (const endpoint of publicApiCatalog.endpoints.filter((item) => item.method === 'GET')) {
    assert.ok(anchors.includes(`https://www.frankx.ai${endpoint.path}`), endpoint.path)
  }
  const blob = JSON.stringify(document)
  assert.equal(blob.includes('https://www.frankx.ai/openapi.json'), true)
  assert.doesNotMatch(blob, /\/api\/(?:admin|checkout|webhooks|music|dashboard|leads)\b/)
  const route = fs.readFileSync(path.join(root, 'app/.well-known/api-catalog/route.ts'), 'utf8')
  assert.match(route, /return apiCatalogResponse\('GET'\)/)
  assert.match(route, /return apiCatalogResponse\('HEAD'\)/)
  assert.match(route, /return readOnlyOptionsResponse\(\)/)
  assert.match(route, /methodNotAllowedResponse\(request\.method, new URL\(request\.url\)\.pathname\)/)
  assert.equal(route.includes('NextResponse.json'), false)

  const response = apiCatalogResponse('GET')
  assert.equal(response.status, 200)
  assert.equal(response.headers.get('content-type'), apiCatalogContentType)
  assert.equal(response.headers.get('cache-control'), 'public, max-age=3600, s-maxage=86400')
  assert.equal(response.headers.get('access-control-allow-origin'), '*')
  assert.equal(response.headers.get('link'), apiDiscoveryLink)
  assert.deepEqual(await response.json(), document)

  const head = apiCatalogResponse('HEAD')
  assert.equal(head.status, 200)
  assert.equal(head.headers.get('content-type'), apiCatalogContentType)
  assert.equal(await head.text(), '')
})

test('the public catalog lists only real read routes', () => {
  assert.equal(publicApiCatalog.version, '1.0.0')
  assert.match(publicApiCatalog.authentication, /do not use an API key/)
  assert.match(publicApiCatalog.authentication, /30 requests per minute/)
  const seen = new Set()
  for (const endpoint of publicApiCatalog.endpoints) {
    const key = `${endpoint.method} ${endpoint.path}`
    assert.equal(seen.has(key), false, key)
    seen.add(key)
    assert.ok(endpoint.description.length >= 20, key)
    assert.ok(endpoint.example.startsWith('https://www.frankx.ai'), key)
    assert.ok(endpoint.example.includes(endpoint.path), key)
    const route = path.join(root, 'app', ...endpoint.path.split('/').filter(Boolean), 'route.ts')
    assert.equal(fs.existsSync(route), true, route)
  }
  const blob = [...seen].join('\n')
  assert.doesNotMatch(blob, /\/api\/(?:admin|checkout|webhooks|music|dashboard|leads)\b/)
  const byPath = Object.fromEntries(publicApiCatalog.endpoints.map((endpoint) => [`${endpoint.method} ${endpoint.path}`, endpoint]))
  assert.match(byPath['GET /api/quote/today'].description, /HTTP 400/)
  assert.match(byPath['GET /api/quote/random'].description, /404 JSON/)
  assert.match(byPath['GET /api/dare/today'].description, /HTTP 200/)
  assert.match(byPath['GET /api/md'].description, /Missing path parameter/)
  assert.match(byPath['GET /api/404/match'].description, /always 200/)
  assert.match(byPath['GET /api/vcard'].description, /text\/vcard/)
  assert.match(byPath['GET /api/mcp'].description, /text\/event-stream/)
  assert.match(byPath['GET /api/mcp'].description, /406/)
  assert.match(byPath['POST /api/mcp'].description, /30 requests per minute/)
  const index = fs.readFileSync(path.join(root, 'app/api/v1/route.ts'), 'utf8')
  assert.match(index, /return publicApiCatalogResponse\(\)/)
  assert.match(index, /return readOnlyOptionsResponse\(\)/)
  assert.match(index, /methodNotAllowedResponse\(request\.method, new URL\(request\.url\)\.pathname\)/)
})

test('the catch-all returns JSON instead of the HTML not-found page', () => {
  const source = fs.readFileSync(path.join(root, 'app/api/[...slug]/route.ts'), 'utf8')
  assert.match(source, /apiRouteNotFoundResponse\(request\.method, request\.nextUrl\.pathname\)/)
  assert.match(source, /force-dynamic/)
  assert.doesNotMatch(source, /notFound\(/)
  for (const method of ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']) {
    assert.match(source, new RegExp(`export const ${method}`))
  }
  const enumeration = fs.readFileSync(path.join(root, 'lib/route-enumeration.mjs'), 'utf8')
  assert.match(enumeration, /CATCH_ALL_PAGE_FILES/)
  assert.match(enumeration, /route\.ts alone does not/)
})

test('sitemap gate ignores a route.ts catch-all', async (t) => {
  let hasAppRoute
  try {
    ;({ hasAppRoute } = await import('../../lib/route-enumeration.mjs'))
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    if (message.includes('Cannot find package') || message.includes('Cannot find module')) {
      t.skip(message.split('\n')[0])
      return
    }
    throw error
  }
  assert.equal(hasAppRoute('/__ora-404-probe-5czgmg5h'), false)
  assert.equal(hasAppRoute('/developers'), true)
  assert.equal(hasAppRoute('/api/v1'), true)
  assert.equal(hasAppRoute('/api/quote/today'), true)
  assert.equal(hasAppRoute('/api/v1/orank-probe-test'), false)
  assert.equal(hasAppRoute('/blog/this-post-is-not-in-the-catalog'), true)
})
