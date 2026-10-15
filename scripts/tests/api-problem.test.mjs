import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import {
  apiRouteNotFoundResponse,
  displayedApiPath,
  methodNotAllowedResponse,
} from '../../lib/api-problem.ts'
import { publicApiCatalog } from '../../lib/public-api-catalog.ts'

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
  assert.equal(response.headers.get('cache-control'), 'private, no-store')
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff')
  const body = await response.json()
  assert.equal(body.status, 404)
  assert.equal(body.code, 'api_route_not_found')
  assert.equal(body.detail, 'No API route exists at /api/v1/orank-probe-test.')
  assert.equal(body.message, body.detail)
  assert.match(body.resolution, /https:\/\/www\.frankx\.ai\/api\/v1/)
  assert.match(body.resolution, /https:\/\/www\.frankx\.ai\/llms\.txt/)
  assert.equal(JSON.stringify(body).includes('<'), false)
  assert.equal(JSON.stringify(body).includes('injected'), false)
})

test('HEAD on an unknown API route has no body', async () => {
  const response = apiRouteNotFoundResponse('HEAD', '/api/v1/orank-probe-test')
  assert.equal(response.status, 404)
  assert.equal(response.headers.get('content-type'), 'application/problem+json; charset=utf-8')
  assert.equal(await response.text(), '')
})

test('the catalog rejects other methods with JSON', async () => {
  const response = methodNotAllowedResponse('POST')
  assert.equal(response.status, 405)
  assert.equal(response.headers.get('allow'), 'GET, HEAD, OPTIONS')
  const body = await response.json()
  assert.equal(body.code, 'method_not_allowed')
  assert.match(body.resolution, /GET https:\/\/www\.frankx\.ai\/api\/v1/)
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
})

test('the catch-all returns JSON instead of the HTML not-found page', () => {
  const source = fs.readFileSync(path.join(root, 'app/api/[...slug]/route.ts'), 'utf8')
  assert.match(source, /apiRouteNotFoundResponse/)
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
