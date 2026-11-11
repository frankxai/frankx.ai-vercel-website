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


function layoutFixture(options = {}) {
  const admin = Object.hasOwn(options, 'admin') ? options.admin : 'fixture-admin-only'
  const candidate = options.candidate ?? null
  const notFound = new Error('fixture-not-found')
  const verifier = load(read('lib/admin-secret.ts'), {})
  const layout = load(read('app/ops/layout.tsx'), {
    '@/lib/admin-secret': verifier,
    'next/headers': { headers: async () => new Headers(candidate ? { 'x-admin-secret': candidate } : {}) },
    'next/navigation': { notFound: () => { throw notFound } },
  }, {
    process: { env: { ADMIN_SECRET: admin } },
  })
  return { layout, notFound }
}

function sitesFixture(options = {}) {
  const admin = Object.hasOwn(options, 'admin') ? options.admin : 'fixture-admin-only'
  const candidate = options.candidate ?? null
  const reads = []
  const notFound = new Error('fixture-not-found')
  const verifier = load(read('lib/admin-secret.ts'), {})
  const jsx = (type, props) => ({ type, props })
  const fsStub = {
    promises: {
      readdir: async (...args) => { reads.push(['readdir', ...args]); return [] },
      readFile: async (...args) => { reads.push(['readFile', ...args]); return '[]' },
      stat: async (...args) => { reads.push(['stat', ...args]); return { isDirectory: () => true } },
      access: async (...args) => { reads.push(['access', ...args]) },
    },
  }
  const page = load(read('app/ops/sites/page.tsx'), {
    'react/jsx-runtime': { jsx, jsxs: jsx },
    'next/link': { default: 'Link' },
    '@/lib/admin-secret': verifier,
    'next/headers': { headers: async () => new Headers(candidate ? { 'x-admin-secret': candidate } : {}) },
    'next/navigation': { notFound: () => { throw notFound } },
    'node:path': require('node:path'),
    'node:fs': fsStub,
  }, {
    process: { env: { ADMIN_SECRET: admin }, cwd: () => process.cwd() },
  })
  return { page, reads, notFound }
}

function calendarFixture(options = {}) {
  const admin = Object.hasOwn(options, 'admin') ? options.admin : 'fixture-admin-only'
  const candidate = options.candidate ?? null
  const reads = []
  const notFound = new Error('fixture-not-found')
  const verifier = load(read('lib/admin-secret.ts'), {})
  const jsx = (type, props) => ({ type, props })
  const page = load(read('app/ops/calendar/page.tsx'), {
    'react/jsx-runtime': { jsx, jsxs: jsx },
    'next/link': { default: 'Link' },
    '@/lib/seo': { defaultOpenGraphImages: [] },
    '@/lib/admin-secret': verifier,
    '@/components/ui/glow-card': { GlowCard: 'GlowCard' },
    '@/data/workshops': { workshops: [] },
    'gray-matter': { default: () => ({ data: {}, content: '' }) },
    'lucide-react': new Proxy({}, { get: () => 'Icon' }),
    'next/headers': { headers: async () => new Headers(candidate ? { 'x-admin-secret': candidate } : {}) },
    'next/navigation': { notFound: () => { throw notFound } },
    'node:path': require('node:path'),
    'node:fs': {
      readFileSync: (...args) => { reads.push(args); return '' },
    },
  }, {
    process: { env: { ADMIN_SECRET: admin }, cwd: () => process.cwd() },
  })
  return { page, reads, notFound }
}

for (const [label, options] of [
  ['unconfigured admin access', { admin: undefined }],
  ['empty admin configuration', { admin: '' }],
  ['anonymous visitor', {}],
  ['incorrect admin header', { candidate: 'fixture-wrong' }],
  ['provider token used as admin header', { candidate: 'fixture-github-only' }],
]) {
  test(`/ops layout denies ${label}`, async () => {
    const { layout, notFound } = layoutFixture(options)
    await assert.rejects(layout.default({ children: 'child' }), error => error === notFound)
  })

  test(`/ops/sites denies ${label} before reading sentinel data`, async () => {
    const { page, reads, notFound } = sitesFixture(options)
    await assert.rejects(page.default(), error => error === notFound)
    assert.equal(reads.length, 0)
  })

  test(`/ops/calendar denies ${label} before reading the calendar file`, async () => {
    const { page, reads, notFound } = calendarFixture(options)
    await assert.rejects(page.default(), error => error === notFound)
    assert.equal(reads.length, 0)
  })
}

test('/ops layout admits the configured admin and is request-time only', async () => {
  const { layout } = layoutFixture({ candidate: 'fixture-admin-only' })
  assert.equal(layout.dynamic, 'force-dynamic')
  assert.equal(layout.metadata.robots.index, false)
  assert.equal(layout.metadata.robots.follow, false)
  assert.equal(await layout.default({ children: 'child' }), 'child')
})

test('/ops/sites and /ops/calendar metadata stay noindex', () => {
  const { page: sites } = sitesFixture({ candidate: 'fixture-admin-only' })
  const { page: calendar } = calendarFixture({ candidate: 'fixture-admin-only' })
  assert.equal(sites.metadata.robots.index, false)
  assert.equal(sites.metadata.robots.follow, false)
  assert.equal(calendar.metadata.robots.index, false)
  assert.equal(calendar.metadata.robots.follow, false)
})
