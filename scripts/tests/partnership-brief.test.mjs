import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import ts from 'typescript'
import { z } from 'zod'
import { buildPartnershipBrief } from '../../lib/partnership-brief.ts'

const read = file => readFileSync(new URL(`../../${file}`, import.meta.url), 'utf8')
function load(file, imports, globals = {}) {
  const { outputText } = ts.transpileModule(read(file), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  })
  const module = { exports: {} }
  new Function('require', 'module', 'exports', ...Object.keys(globals), outputText)(
    id => { assert.ok(Object.hasOwn(imports, id), `Unexpected import: ${id}`); return imports[id] },
    module, module.exports, ...Object.values(globals),
  )
  return module.exports
}

function brief(overrides = {}) {
  const data = new FormData()
  for (const [key, value] of Object.entries({
    briefKind: 'commissioned', productUrl: 'https://example.invalid/docs',
    audience: 'Small product teams', budget: '€3,000–€5,999',
    preferredDate: '2026-11-12', message: 'Turn one research question into a source-linked brief.',
    name: 'Test Builder', email: 'builder@example.invalid', consent: 'on',
    ...overrides,
  })) data.set(key, value)
  return data
}

test('the existing message carries all qualification fields without truncation', () => {
  const message = buildPartnershipBrief(brief())
  for (const value of ['reference build', 'https://example.invalid/docs', 'Small product teams', '2026-11-12', '€3,000–€5,999', 'source-linked brief']) assert.ok(message.includes(value), value)
  const max = buildPartnershipBrief(brief({ productUrl: `https://example.invalid/${'a'.repeat(270)}`, audience: 'a'.repeat(200), message: 'm'.repeat(2000) }))
  assert.ok(max.length < 4000)
  assert.ok(max.endsWith('m'.repeat(2000)))
  assert.throws(() => buildPartnershipBrief(brief({ productUrl: `https://example.invalid/${'界'.repeat(270)}`, audience: 'a'.repeat(200), message: 'm'.repeat(2000) })), /full brief is too long/)
})

test('invalid URLs, credentials, dates, unknown choices and oversized tasks are rejected', () => {
  for (const overrides of [
    { productUrl: 'javascript:alert(1)' }, { productUrl: 'https://user:password@example.invalid' },
    { productUrl: 'not-a-url' }, { preferredDate: '2026-02-30' },
    { briefKind: 'enterprise-guarantee' }, { budget: 'free unlimited work' },
    { message: 'x'.repeat(2001) }, { audience: '' },
  ]) assert.throws(() => buildPartnershipBrief(brief(overrides)), JSON.stringify(overrides).slice(0, 90))
  assert.match(buildPartnershipBrief(brief({ preferredDate: '', briefKind: 'editorial' })), /Suggest a product for a guide/)
})

const jsx = (type, props) => ({ type, props })
function flatten(node) {
  if (node == null || typeof node === 'boolean') return ''
  if (Array.isArray(node)) return node.map(flatten).join(' ')
  if (typeof node !== 'object') return String(node)
  return flatten(node.props?.children)
}

function formHarness(fetch) {
  let cursor = 0
  const states = [], events = []
  const mod = load('components/contact/ContactForm.tsx', {
    react: { useState: value => { const i = cursor++; if (!(i in states)) states[i] = value; return [states[i], next => { states[i] = next }] } },
    'react/jsx-runtime': { jsx, jsxs: jsx },
    'lucide-react': { ArrowRight: 'icon', CheckCircle2: 'icon', Loader2: 'icon' },
    '@/lib/intake-types': load('lib/intake-types.ts', {}),
    '@/lib/partnership-brief': { buildPartnershipBrief, ...load('lib/partnership-brief.ts', {}) },
    '@/lib/analytics': { trackEvent: (...args) => events.push(args) },
  }, {
    fetch, window: { location: { pathname: '/partnerships' } },
    FormData: function (form) { return form.data },
  })
  return { events, states, render: () => { cursor = 0; return mod.ContactForm({ defaultIntent: 'partnership', partnershipBrief: true }) } }
}

test('accepted intake preserves source, consent and payload; analytics exclude personal data', async () => {
  let sent, resets = 0
  const h = formHarness(async (url, init) => {
    assert.equal(url, '/api/intake')
    assert.ok(init.signal instanceof AbortSignal)
    sent = JSON.parse(init.body)
    return Response.json({ ok: true, ackSent: false })
  })
  await h.render().props.onSubmit({ preventDefault() {}, currentTarget: { data: brief(), reset() { resets++ } } })
  assert.equal(sent.intent, 'partnership')
  assert.equal(sent.source, '/partnerships#architecture-brief')
  assert.equal(sent.consent, true)
  assert.equal(resets, 1)
  assert.deepEqual(h.events, [['partnership_brief_received', { surface: 'partnerships', source: 'architecture-brief' }]])
  assert.doesNotMatch(flatten(h.render()), /confirmation just hit your inbox/)
})

test('rejected, ambiguous and unavailable delivery retain the draft and never count a lead', async () => {
  for (const fetch of [
    async () => Response.json({ ok: false, error: 'No durable sink' }, { status: 500 }),
    async () => Response.json({}),
    async () => { throw new Error('offline') },
  ]) {
    let resets = 0
    const h = formHarness(fetch)
    const data = brief()
    await h.render().props.onSubmit({ preventDefault() {}, currentTarget: { data, reset() { resets++ } } })
    assert.equal(resets, 0)
    assert.equal(h.states[1], 'error')
    assert.equal(h.events.length, 0)
    assert.equal(data.get('message'), 'Turn one research question into a source-linked brief.')
  }
})

test('incomplete structured brief does not call the intake endpoint', async () => {
  const h = formHarness(() => { throw new Error('must not send') })
  await h.render().props.onSubmit({ preventDefault() {}, currentTarget: { data: brief({ audience: '' }) } })
  assert.equal(h.states[1], 'error')
  assert.equal(h.events.length, 0)
})

test('a silent honeypot success never becomes a received-lead event', async () => {
  const h = formHarness(async () => Response.json({ ok: true, message: 'Thanks.' }))
  await h.render().props.onSubmit({ preventDefault() {}, currentTarget: { data: brief({ website: 'bot-fill' }), reset() {} } })
  assert.equal(h.states[1], 'done')
  assert.deepEqual(h.events, [])
})

test('provider mocks verify full message persistence and fail-closed Vercel delivery', async () => {
  const message = buildPartnershipBrief(brief({ message: 'x'.repeat(2000) }))
  for (const notionWorks of [true, false]) {
    let stored, audienceCalls = 0
    const intake = load('lib/contact-intake.ts', {
      'node:fs': { promises: { mkdir: async () => {}, appendFile: async () => {} } },
      'node:path': { __esModule: true, default: path }, zod: { z },
      '@/lib/seo': { siteConfig: { url: 'https://example.invalid' } },
      './intake-types': load('lib/intake-types.ts', {}),
    }, {
      process: { env: { VERCEL: '1', RESEND_API_KEY: 'fixture', NOTION_TOKEN: 'fixture', NOTION_INQUIRIES_DB_ID: 'fixture' } },
      fetch: async (url, init) => {
        if (url.includes('audiences')) audienceCalls++
        if (url.includes('notion.com')) { stored = JSON.parse(init.body); return new Response('{}', { status: notionWorks ? 200 : 503 }) }
        return new Response('{}', { status: 503 })
      },
      console: { log() {}, error() {} },
    })
    const parsed = intake.IntakeSchema.parse({ intent: 'partnership', name: 'Test', email: 'test@example.invalid', message, consent: true })
    const result = await intake.processIntake(parsed, { referrer: null, userAgent: null })
    assert.equal(result.ok, notionWorks, 'ephemeral JSONL must not manufacture delivery')
    assert.equal(stored.properties.Message.rich_text.map(chunk => chunk.text.content).join(''), message)
    assert.equal(audienceCalls, 0)
    assert.equal(result.entry.audience, 'skipped')
  }
})
