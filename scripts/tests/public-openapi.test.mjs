import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { openApiContentType, publicOpenApi, publicOpenApiResponse } from '../../lib/public-openapi.ts'

const root = path.resolve(import.meta.dirname, '../..')
const METHODS = ['get', 'post', 'put', 'patch', 'delete']

function operations(document) {
  const found = []
  for (const [routePath, item] of Object.entries(document.paths)) {
    for (const method of METHODS) {
      if (item[method]) found.push({ routePath, method, operation: item[method] })
    }
  }
  return found
}

function refs(node, found = []) {
  if (!node || typeof node !== 'object') return found
  if (typeof node.$ref === 'string') found.push(node.$ref)
  for (const value of Object.values(node)) refs(value, found)
  return found
}

function resolveRef(document, ref) {
  if (!ref.startsWith('#/')) return undefined
  return ref
    .slice(2)
    .split('/')
    .reduce((current, part) => current?.[part], document)
}

test('the public document is OpenAPI 3.1 and lists the published reads', () => {
  assert.equal(publicOpenApi.openapi, '3.1.0')
  assert.equal(publicOpenApi.servers[0].url, 'https://www.frankx.ai')
  const paths = Object.keys(publicOpenApi.paths)
  for (const expected of [
    '/api/quote/today',
    '/api/quote/random',
    '/api/dare/today',
    '/api/md',
    '/api/404/match',
    '/api/vcard',
    '/api/mcp',
    '/api/mcp/server-card',
    '/api/v1',
    '/.well-known/api-catalog',
    '/.well-known/ai-catalog.json',
    '/openapi.json',
  ]) {
    assert.ok(paths.includes(expected), expected)
  }
  assert.doesNotMatch(paths.join('\n'), /\/admin|\/checkout|\/webhooks|\/music|\/dashboard/)
  assert.equal(
    publicOpenApi.paths['/api/quote/today'].get.responses['400'].content['application/json'].schema.$ref,
    '#/components/schemas/TimezoneError',
  )
  assert.equal(
    publicOpenApi.paths['/api/mcp'].get.responses['200'].content['text/event-stream'].schema.type,
    'string',
  )
  assert.equal(
    publicOpenApi.paths['/api/mcp'].get.responses['406'].content['application/json'].schema.$ref,
    '#/components/schemas/McpNotAcceptable',
  )
  for (const method of ['post', 'put', 'patch', 'delete']) {
    for (const routePath of ['/api/v1', '/.well-known/api-catalog', '/openapi.json']) {
      assert.equal(
        publicOpenApi.paths[routePath][method].responses['405'].content['application/problem+json'].schema.$ref,
        '#/components/schemas/Problem',
        `${method} ${routePath}`,
      )
    }
  }
  assert.equal(publicOpenApi.paths['/api/mcp/server-card'].post, undefined)
  assert.equal(publicOpenApi.paths['/.well-known/ai-catalog.json'].post, undefined)
})

test('every operation has an id, a description, and a response schema', () => {
  const found = operations(publicOpenApi)
  const ids = found.map((entry) => entry.operation.operationId)
  assert.equal(new Set(ids).size, ids.length)
  for (const { routePath, operation } of found) {
    assert.equal(typeof operation.operationId, 'string', routePath)
    assert.ok(operation.description.length >= 20, routePath)
    for (const response of Object.values(operation.responses)) {
      const media = response.content ? Object.values(response.content) : []
      assert.ok(media.length > 0, routePath)
      assert.ok(media.every((entry) => entry.schema), routePath)
    }
  }
  for (const ref of refs(publicOpenApi)) {
    assert.notEqual(resolveRef(publicOpenApi, ref), undefined, ref)
  }
  const markdown = publicOpenApi.paths['/api/md'].get
  assert.equal(markdown.responses['400'].content['text/plain'].schema.const, 'Missing path parameter')
})

test('GET /openapi.json uses the OpenAPI media type', async () => {
  const response = publicOpenApiResponse('GET')
  assert.equal(response.status, 200)
  assert.equal(response.headers.get('content-type'), openApiContentType)
  assert.equal(response.headers.get('content-type'), 'application/vnd.oai.openapi+json;version=3.1')
  assert.match(response.headers.get('link') ?? '', /rel="service-desc"/)
  assert.equal((await response.json()).openapi, '3.1.0')
  const head = publicOpenApiResponse('HEAD')
  assert.equal(head.status, 200)
  assert.equal(await head.text(), '')
  const route = fs.readFileSync(path.join(root, 'app/openapi.json/route.ts'), 'utf8')
  assert.match(route, /publicOpenApiResponse\('GET'\)/)
  assert.match(route, /publicOpenApiResponse\('HEAD'\)/)
  assert.equal(route.includes('NextResponse.json'), false)
})
