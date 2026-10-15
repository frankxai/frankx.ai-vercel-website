import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

import { publicOpenApi } from '../../lib/public-openapi.ts'

const METHODS = ['get', 'post', 'put', 'patch', 'delete']

function operations(document) {
  const found = []
  for (const [path, item] of Object.entries(document.paths)) {
    for (const method of METHODS) {
      if (item[method]) found.push({ path, method, operation: item[method] })
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

test('the public document is OpenAPI 3.1 and lists only the read surface', () => {
  assert.equal(publicOpenApi.openapi, '3.1.0')
  assert.equal(publicOpenApi.info.title, 'FrankX public API')
  assert.equal(publicOpenApi.info.version, '1.0.0')
  assert.equal(publicOpenApi.servers[0].url, 'https://www.frankx.ai')
  assert.equal(publicOpenApi.externalDocs.url, 'https://www.frankx.ai/llms.txt')

  const paths = Object.keys(publicOpenApi.paths)
  for (const expected of [
    '/api/quote/today',
    '/api/quote/random',
    '/api/dare/today',
    '/api/md',
    '/api/404/match',
    '/api/vcard',
    '/api/mcp',
  ]) {
    assert.ok(paths.includes(expected), expected)
  }
  const hidden = paths.join('\n')
  assert.doesNotMatch(hidden, /\/admin|\/checkout|\/webhooks|\/music|\/dashboard/)
})

test('every operation has an id, a description, and a response schema', () => {
  const found = operations(publicOpenApi)
  assert.ok(found.length >= 8)
  const ids = found.map((entry) => entry.operation.operationId)
  assert.equal(new Set(ids).size, ids.length)
  for (const { path, operation } of found) {
    assert.equal(typeof operation.description, 'string', path)
    assert.ok(operation.description.length >= 20, path)
    const responses = Object.values(operation.responses)
    assert.ok(responses.length > 0, path)
    for (const response of responses) {
      const media = response.content ? Object.values(response.content) : []
      assert.ok(media.length > 0, path)
      assert.ok(media.every((entry) => entry.schema), path)
    }
  }
})

test('local schema refs resolve and the markdown export keeps its plain-text errors', () => {
  for (const ref of refs(publicOpenApi)) {
    assert.notEqual(resolveRef(publicOpenApi, ref), undefined, ref)
  }
  const markdown = publicOpenApi.paths['/api/md'].get
  assert.equal(markdown.parameters[0].required, true)
  assert.equal(markdown.responses['400'].content['text/plain'].schema.const, 'Missing path parameter')
  assert.match(markdown.responses['404'].description, /Not found/)
  assert.match(markdown.responses['404'].description, /Content type not supported for markdown export/)
})

test('the published route and the agent index point at the document', () => {
  const route = readFileSync(new URL('../../app/openapi.json/route.ts', import.meta.url), 'utf8')
  const index = readFileSync(new URL('../../app/llms.txt/route.ts', import.meta.url), 'utf8')
  assert.match(route, /publicOpenApi/)
  assert.match(route, /NextResponse\.json/)
  assert.match(index, /\/openapi\.json/)
})
