import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { runInNewContext } from 'node:vm'
import test from 'node:test'

const require = createRequire(import.meta.url)
const ts = require('typescript')
const read = path => readFileSync(new URL(`../../${path}`, import.meta.url), 'utf8')

function load(source, imports, globals = {}) {
  const module = { exports: {} }
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  })
  runInNewContext(outputText, {
    module,
    exports: module.exports,
    require: name => Object.hasOwn(imports, name) ? imports[name] : require(name),
    ...globals,
  })
  return module.exports
}

// Execute the actual page and timing-safe verifier. Only framework rendering,
// incoming headers and outbound HTTP are substituted; no live credentials or I/O.
function fixture(options = {}) {
  const admin = Object.hasOwn(options, 'admin') ? options.admin : 'fixture-admin-only'
  const candidate = options.candidate ?? null
  const requests = []
  const notFound = new Error('fixture-not-found')
  const verifier = load(read('lib/admin-secret.ts'), {})
  const jsx = (type, props) => ({ type, props })
  const page = load(read('app/ops/page.tsx'), {
    react: { Suspense: 'Suspense' },
    'react/jsx-runtime': { jsx, jsxs: jsx },
    './OpsClient': { OpsClient: 'OpsClient' },
    '@/lib/admin-secret': verifier,
    'next/headers': { headers: async () => new Headers(candidate ? { 'x-admin-secret': candidate } : {}) },
    'next/navigation': { notFound: () => { throw notFound } },
  }, {
    process: { env: { ADMIN_SECRET: admin, GITHUB_TOKEN: 'fixture-github-only', VERCEL_TOKEN: 'fixture-vercel-only' } },
    fetch: async (url, options) => {
      requests.push({ url, options })
      return { ok: true, json: async () => url.includes('api.vercel.com') ? { deployments: [] } : [] }
    },
  })
  return { page, requests, notFound }
}

for (const [label, options] of [
  ['unconfigured admin access', { admin: undefined }],
  ['empty admin configuration', { admin: '' }],
  ['anonymous visitor', {}],
  ['incorrect admin header', { candidate: 'fixture-wrong' }],
  ['provider token used as admin header', { candidate: 'fixture-github-only' }],
]) {
  test(`/ops denies ${label} before fetching telemetry`, async () => {
    const { page, requests, notFound } = fixture(options)
    await assert.rejects(page.default(), error => error === notFound)
    assert.equal(requests.length, 0)
  })
}

test('/ops admits the configured admin and never caches private responses', async () => {
  const { page, requests } = fixture({ candidate: 'fixture-admin-only' })
  assert.equal(page.dynamic, 'force-dynamic')
  assert.ok(await page.default())
  assert.equal(requests.length, 7)
  for (const { options } of requests) {
    assert.equal(options.cache, 'no-store')
    assert.equal(options.next, undefined)
    assert.equal(JSON.stringify(options).includes('fixture-admin-only'), false)
  }
})
