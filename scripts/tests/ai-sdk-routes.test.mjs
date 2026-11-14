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
    console,
    Date,
    JSON,
    Error,
    Array,
    Object,
    Map,
    String,
    Boolean,
    Number,
    ...globals,
  })
  return module.exports
}

const NextResponse = {
  json(body, init = {}) {
    const status = init.status ?? 200
    return {
      status,
      headers: new Headers(init.headers),
      body,
      json: async () => body,
      text: async () => JSON.stringify(body),
    }
  },
}

function request({ headers = {}, body } = {}) {
  const normalized = Object.fromEntries(
    Object.entries(headers).map(([key, value]) => [key.toLowerCase(), value]),
  )
  return {
    headers: { get: key => normalized[key.toLowerCase()] ?? null },
    json: async () => {
      if (typeof body === 'function') return body()
      if (body === undefined) throw new SyntaxError('Unexpected end of JSON input')
      return body
    },
  }
}

function load404(options = {}) {
  const proposeCalls = []
  const writes = []
  const generateObjectCalls = []
  const cronSecret = Object.hasOwn(options, 'cronSecret') ? options.cronSecret : 'fixture-cron'
  const gateway = options.gateway === true
  const log = Object.hasOwn(options, 'log')
    ? options.log
    : JSON.stringify({
        ts: new Date().toISOString(),
        path: '/missing-page',
        referrer: 'https://example.com',
      }) + '\n'
  const aliases = options.aliases ?? {}
  const env = {
    CRON_SECRET: cronSecret,
    NODE_ENV: options.nodeEnv ?? 'test',
    AI_GATEWAY_API_KEY: gateway ? 'fixture-must-not-be-used' : undefined,
    VERCEL_OIDC_TOKEN: undefined,
  }

  const route = load(read('app/api/404/agent/route.ts'), {
    'next/server': { NextResponse },
    '@/data/route-index.json': {
      default: { routes: [{ href: '/canon', title: 'Canon' }], aliases },
      routes: [{ href: '/canon', title: 'Canon' }],
      aliases,
    },
    '@/lib/ai/gateway-client': {
      isGatewayAvailable: () => gateway,
      proposeAliasesAndStubs: async args => {
        proposeCalls.push(args)
        return options.proposals ?? null
      },
    },
    'node:fs': {
      promises: {
        readFile: async () => log,
        mkdir: async (...args) => { writes.push(['mkdir', ...args]) },
        appendFile: async (...args) => { writes.push(['appendFile', ...args]) },
      },
    },
    'node:path': require('node:path'),
  }, {
    process: { env, cwd: () => process.cwd() },
  })

  return { route, proposeCalls, writes, generateObjectCalls, env }
}

function loadCron(options = {}) {
  const councilCalls = []
  const cronSecret = Object.hasOwn(options, 'cronSecret') ? options.cronSecret : 'fixture-cron'
  const gateway = options.gateway === true
  const env = {
    CRON_SECRET: cronSecret,
    NODE_ENV: options.nodeEnv ?? 'test',
    AI_GATEWAY_API_KEY: gateway ? 'fixture-must-not-be-used' : undefined,
  }
  const route = load(read('app/api/swarm/cron/route.ts'), {
    'next/server': { NextResponse },
    '@/lib/swarm/catalog': { catalog: { team: 'fixture-team' } },
    '@/lib/swarm/executor': {
      gatewayExecutor: { runAgent: async () => { throw new Error('must not run the live executor') } },
      isGatewayAvailable: () => gateway,
    },
    '@/lib/swarm/store': { kvStore: { save: async () => { throw new Error('must not persist') } } },
    '@/lib/swarm/orchestrator': {
      runHostedCouncil: async (...args) => {
        councilCalls.push(args)
        return { ok: true, id: 'fixture-run', costUsd: 0, note: 'fixture', synthesis: { portfolioManager: { output: { proposed_actions: [] } } } }
      },
    },
  }, {
    process: { env },
  })
  return { route, councilCalls }
}

function loadRun(options = {}) {
  const councilCalls = []
  const admin = Object.hasOwn(options, 'admin') ? options.admin : 'fixture-admin-only'
  const gateway = options.gateway === true
  const env = {
    ADMIN_SECRET: admin,
    AI_GATEWAY_API_KEY: gateway ? 'fixture-must-not-be-used' : undefined,
    NODE_ENV: options.nodeEnv ?? 'test',
  }
  const verifier = load(read('lib/admin-auth.ts'), {
    'next/server': { NextResponse },
    crypto: require('node:crypto'),
  }, { process: { env }, Buffer, require })
  const route = load(read('app/api/swarm/run/route.ts'), {
    'next/server': { NextResponse },
    '@/lib/admin-auth': verifier,
    '@/lib/swarm/catalog': { catalog: { team: 'fixture-team' } },
    '@/lib/swarm/executor': {
      gatewayExecutor: { runAgent: async () => { throw new Error('must not run the live executor') } },
      isGatewayAvailable: () => gateway,
    },
    '@/lib/swarm/store': {
      kvStore: { save: async () => { throw new Error('must not persist') } },
      isKvAvailable: () => false,
    },
    '@/lib/swarm/orchestrator': {
      runHostedCouncil: async (...args) => {
        councilCalls.push(args)
        return { ok: true, id: 'fixture-run', costUsd: 0, note: 'fixture', synthesis: { portfolioManager: { output: { proposed_actions: [], summary: null } } } }
      },
    },
  }, {
    process: { env },
  })
  return { route, councilCalls }
}

test('/api/404/agent returns 401 when the cron secret does not match', async () => {
  const { route, proposeCalls } = load404()
  const res = await route.POST(request({ headers: { authorization: 'Bearer fixture-wrong' } }))
  assert.equal(res.status, 401)
  assert.equal((await res.json()).error, 'unauthorized')
  assert.equal(proposeCalls.length, 0)
})

test('/api/404/agent returns 503 in production when CRON_SECRET is unset', async () => {
  const { route, proposeCalls } = load404({ cronSecret: undefined, nodeEnv: 'production' })
  const res = await route.GET(request())
  assert.equal(res.status, 503)
  assert.equal((await res.json()).error, 'cron_secret_required')
  assert.equal(proposeCalls.length, 0)
})

test('/api/404/agent returns 200 and does not call the model when there are no unresolved 404s', async () => {
  const { route, proposeCalls, writes } = load404({
    log: JSON.stringify({ ts: new Date().toISOString(), path: '/canon' }) + '\n',
    aliases: { '/canon': '/canon' },
  })
  const res = await route.POST(request({ headers: { authorization: 'Bearer fixture-cron' } }))
  const body = await res.json()
  assert.equal(res.status, 200)
  assert.equal(body.ok, true)
  assert.equal(body.proposals, 0)
  assert.match(body.note, /no unresolved 404s/)
  assert.equal(proposeCalls.length, 0)
  assert.equal(writes.length, 0)
})

test('/api/404/agent returns 200 with a gateway-unconfigured note and never proposes', async () => {
  const { route, proposeCalls, writes } = load404({ gateway: false })
  const res = await route.POST(request({ headers: { authorization: 'Bearer fixture-cron' } }))
  const body = await res.json()
  assert.equal(res.status, 200)
  assert.equal(body.ok, true)
  assert.equal(body.proposals, 0)
  assert.match(body.note, /AI Gateway not configured/)
  assert.ok(body.unresolvedCount >= 1)
  assert.equal(proposeCalls.length, 0)
  assert.equal(writes.length, 0)
})

test('/api/swarm/cron returns 401 when the cron secret does not match', async () => {
  const { route, councilCalls } = loadCron()
  const res = await route.POST(request({ headers: { authorization: 'Bearer fixture-wrong' } }))
  assert.equal(res.status, 401)
  assert.equal((await res.json()).error, 'unauthorized')
  assert.equal(councilCalls.length, 0)
})

test('/api/swarm/cron returns 503 in production when CRON_SECRET is unset', async () => {
  const { route, councilCalls } = loadCron({ cronSecret: undefined, nodeEnv: 'production' })
  const res = await route.GET(request())
  assert.equal(res.status, 503)
  assert.equal((await res.json()).error, 'cron_secret_required')
  assert.equal(councilCalls.length, 0)
})

test('/api/swarm/cron returns 200 and skips the council when the gateway is unconfigured', async () => {
  const { route, councilCalls } = loadCron({ gateway: false })
  const res = await route.POST(request({ headers: { authorization: 'Bearer fixture-cron' } }))
  const body = await res.json()
  assert.equal(res.status, 200)
  assert.equal(body.ok, true)
  assert.match(body.note, /AI Gateway not configured/)
  assert.equal(councilCalls.length, 0)
})

test('/api/swarm/run returns 503 when ADMIN_SECRET is unset', async () => {
  const { route, councilCalls } = loadRun({ admin: undefined })
  const res = await route.POST(request({ body: {} }))
  assert.equal(res.status, 503)
  assert.match((await res.json()).error, /ADMIN_SECRET unset/)
  assert.equal(councilCalls.length, 0)
})

test('/api/swarm/run returns 401 when the admin header is missing or wrong', async () => {
  const missing = loadRun()
  const wrong = loadRun()
  const missingRes = await missing.route.POST(request({ body: {} }))
  const wrongRes = await wrong.route.POST(request({
    headers: { 'x-admin-secret': 'fixture-wrong' },
    body: {},
  }))
  assert.equal(missingRes.status, 401)
  assert.equal(wrongRes.status, 401)
  assert.equal((await missingRes.json()).error, 'Unauthorized')
  assert.equal(wrongRes.councilCalls?.length ?? wrong.councilCalls.length, 0)
  assert.equal(missing.councilCalls.length, 0)
})

test('/api/swarm/run returns 200 with a gateway-unconfigured note after admin auth and never runs the council', async () => {
  const { route, councilCalls } = loadRun({ gateway: false })
  const res = await route.POST(request({
    headers: { 'x-admin-secret': 'fixture-admin-only' },
    body: { context: 'fixture' },
  }))
  const body = await res.json()
  assert.equal(res.status, 200)
  assert.equal(body.ok, true)
  assert.match(body.note, /AI Gateway not configured/)
  assert.equal(councilCalls.length, 0)
})
