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
    Error,
    Date,
    JSON,
    Array,
    Object,
    String,
    Boolean,
    Number,
    Response,
    Headers,
    ...globals,
  })
  return module.exports
}

function request({ headers = {}, raw, body } = {}) {
  const normalized = Object.fromEntries(
    Object.entries(headers).map(([key, value]) => [key.toLowerCase(), value]),
  )
  return {
    headers: { get: key => normalized[key.toLowerCase()] ?? null },
    json: async () => {
      if (raw === 'invalid') throw new SyntaxError('Unexpected token')
      if (body === undefined) throw new SyntaxError('Unexpected end of JSON input')
      return body
    },
  }
}

function loadRag(options = {}) {
  const retrieveCalls = []
  const streamCalls = []
  const openaiCalls = []
  const env = { OPENAI_API_KEY: options.openaiKey }
  const route = load(read('templates/rag-starter/app/api/chat/route.ts'), {
    '@ai-sdk/openai': {
      createOpenAI: (opts) => {
        openaiCalls.push(opts)
        throw new Error('must not construct a live OpenAI client')
      },
    },
    ai: {
      convertToModelMessages: async () => { throw new Error('must not convert live messages') },
      streamText: (opts) => {
        streamCalls.push(opts)
        throw new Error('must not call streamText')
      },
    },
    '@/lib/rag': {
      retrieve: async (query, providerKey) => {
        retrieveCalls.push({ query, providerKey })
        return options.chunks ?? [
          { source: 'fixture.md', similarity: 0.9, text: 'fixture chunk' },
        ]
      },
      buildContext: chunks => chunks.map((c, i) => `[${i + 1}] ${c.text}`).join('\n'),
    },
  }, {
    process: { env },
  })
  return { route, retrieveCalls, streamCalls, openaiCalls }
}

function loadAgent(options = {}) {
  const streamCalls = []
  const generateTextCalls = []
  const openaiCalls = []
  const env = { OPENAI_API_KEY: options.openaiKey }
  const agents = load(read('templates/multi-agent/lib/agents.ts'), {
    '@ai-sdk/openai': {
      createOpenAI: (opts) => {
        openaiCalls.push(opts)
        throw new Error('must not construct a live OpenAI client')
      },
    },
    ai: {
      Experimental_Agent: class {
        constructor() { throw new Error('must not construct a live Agent') }
      },
      tool: def => def,
      stepCountIs: () => () => false,
      generateText: async (opts) => {
        generateTextCalls.push(opts)
        throw new Error('must not call generateText')
      },
    },
    zod: require('zod'),
  }, {
    process: { env },
  })
  const route = load(read('templates/multi-agent/app/api/agent/route.ts'), {
    ai: {
      convertToModelMessages: async messages => {
        throw new Error('must not convert live messages')
      },
    },
    '@/lib/agents': agents,
  }, {
    process: { env },
  })
  return { route, streamCalls, generateTextCalls, openaiCalls }
}

test('rag-starter /api/chat returns 400 for invalid JSON and never retrieves or streams', async () => {
  const { route, retrieveCalls, streamCalls, openaiCalls } = loadRag()
  const res = await route.POST(request({ raw: 'invalid' }))
  assert.equal(res.status, 400)
  assert.equal(await res.text(), 'Invalid JSON body.')
  assert.equal(retrieveCalls.length, 0)
  assert.equal(streamCalls.length, 0)
  assert.equal(openaiCalls.length, 0)
})

test('rag-starter /api/chat returns 400 when there is no user message', async () => {
  const { route, retrieveCalls, streamCalls, openaiCalls } = loadRag()
  const res = await route.POST(request({ body: { messages: [{ role: 'assistant', parts: [{ type: 'text', text: 'hi' }] }] } }))
  assert.equal(res.status, 400)
  assert.equal(await res.text(), 'No user message to answer.')
  assert.equal(retrieveCalls.length, 0)
  assert.equal(streamCalls.length, 0)
  assert.equal(openaiCalls.length, 0)
})

test('rag-starter /api/chat returns 401 when no provider key is present and never streams', async () => {
  const { route, retrieveCalls, streamCalls, openaiCalls } = loadRag()
  const res = await route.POST(request({
    body: { messages: [{ role: 'user', parts: [{ type: 'text', text: 'What is this?' }] }] },
  }))
  assert.equal(res.status, 401)
  assert.match(await res.text(), /No provider key/)
  assert.equal(retrieveCalls.length, 1)
  assert.equal(retrieveCalls[0].query, 'What is this?')
  assert.equal(streamCalls.length, 0)
  assert.equal(openaiCalls.length, 0)
})

test('multi-agent /api/agent returns 400 for invalid JSON and never starts the agent', async () => {
  const { route, generateTextCalls, openaiCalls } = loadAgent()
  const res = await route.POST(request({ raw: 'invalid' }))
  assert.equal(res.status, 400)
  assert.equal(await res.text(), 'Invalid JSON body.')
  assert.equal(generateTextCalls.length, 0)
  assert.equal(openaiCalls.length, 0)
})

test('multi-agent /api/agent returns 401 when no provider key is present and never calls the model', async () => {
  const { route, generateTextCalls, openaiCalls } = loadAgent()
  const res = await route.POST(request({
    body: { messages: [{ role: 'user', parts: [{ type: 'text', text: 'Research this' }] }] },
  }))
  assert.equal(res.status, 401)
  assert.match(await res.text(), /No provider key/)
  assert.equal(generateTextCalls.length, 0)
  assert.equal(openaiCalls.length, 0)
})
