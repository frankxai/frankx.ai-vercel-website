import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

import {
  DATADOG_RUM_INTAKE_SOURCES,
  DATADOG_RUM_SCRIPT_ORIGIN,
  DATADOG_RUM_SCRIPT_URL,
  datadogRumConfig,
  isSensitiveRumPath,
  redactRumEvent,
  redactRumPath,
  scrubCredentialPaths,
} from '../../lib/datadog-rum-config.ts'

const readRepoFile = (path) => readFile(new URL(`../../${path}`, import.meta.url), 'utf8')

const APP = 'NEXT_PUBLIC_DD_RUM_APPLICATION_ID'
const TOKEN = 'NEXT_PUBLIC_DD_RUM_CLIENT_TOKEN'
const RATE = 'NEXT_PUBLIC_DD_RUM_SAMPLE_RATE'

test('RUM stays off unless both the application id and client token are set', () => {
  assert.equal(datadogRumConfig({}), null)
  assert.equal(datadogRumConfig({ [APP]: 'abc' }), null)
  assert.equal(datadogRumConfig({ [TOKEN]: 'pub123' }), null)
  assert.equal(datadogRumConfig({ [APP]: '  ', [TOKEN]: 'pub123' }), null)
  assert.notEqual(datadogRumConfig({ [APP]: 'abc', [TOKEN]: 'pub123' }), null)
})

test('the default is a small, replay-free, masked EU sample', () => {
  const config = datadogRumConfig({ [APP]: 'abc', [TOKEN]: 'pub123' })
  assert.equal(config.site, 'datadoghq.eu')
  assert.equal(config.sessionSampleRate, 10)
  assert.equal(config.sessionReplaySampleRate, 0)
  assert.equal(config.defaultPrivacyLevel, 'mask')
  assert.equal(config.trackUserInteractions, false)
  assert.equal(config.trackResources, false)
})

test('the sample rate is clamped to 0-100 and falls back when unparsable', () => {
  const base = { [APP]: 'abc', [TOKEN]: 'pub123' }
  assert.equal(datadogRumConfig({ ...base, [RATE]: '25' }).sessionSampleRate, 25)
  assert.equal(datadogRumConfig({ ...base, [RATE]: '500' }).sessionSampleRate, 100)
  assert.equal(datadogRumConfig({ ...base, [RATE]: '-3' }).sessionSampleRate, 0)
  assert.equal(datadogRumConfig({ ...base, [RATE]: 'lots' }).sessionSampleRate, 10)
  assert.equal(datadogRumConfig({ ...base, [RATE]: '' }).sessionSampleRate, 10)
})

test('the loader is the EU build served from the allowed script origin', () => {
  assert.ok(DATADOG_RUM_SCRIPT_URL.startsWith(`${DATADOG_RUM_SCRIPT_ORIGIN}/eu1/`))
  assert.ok(DATADOG_RUM_INTAKE_SOURCES.every((source) => source.includes('datadoghq.eu')))
})

test('the CSP admits Datadog only when RUM is configured, and the sources match the config', async () => {
  const csp = await readRepoFile('next.config.mjs')
  assert.match(csp, /NEXT_PUBLIC_DD_RUM_APPLICATION_ID/)
  assert.ok(csp.includes(DATADOG_RUM_SCRIPT_ORIGIN))
  for (const source of DATADOG_RUM_INTAKE_SOURCES) assert.ok(csp.includes(source), source)
})

test('bearer tokens in the path never reach Datadog (Vercel finding frankx-ai-vercel-website/5)', () => {
  assert.equal(redactRumPath('/workshops/me/FAKE-PORTAL-TOKEN'), '/workshops/me/:token')
  assert.equal(redactRumPath('/Workshops/Me/FAKE-PORTAL-TOKEN/'), '/workshops/me/:token')
  assert.equal(redactRumPath('/workshops/me/abc/def'), '/workshops/me/:token')
  assert.equal(redactRumPath('/workshops/ikigai-branding'), '/workshops/ikigai-branding')
  assert.equal(redactRumPath('/'), '/')
  assert.equal(isSensitiveRumPath('/workshops/me/FAKE-PORTAL-TOKEN'), true)
  assert.equal(isSensitiveRumPath('/workshops/me'), false)
  assert.equal(isSensitiveRumPath('/workshops/metrics'), false)
  assert.equal(isSensitiveRumPath('/blog/me/post'), false)
})

const PORTAL = 'https://frankx.ai/workshops/me/FAKE-PORTAL-TOKEN'

test('a view on a credential page is rewritten, never sent with the token', () => {
  const event = { type: 'view', view: { url: `${PORTAL}?utm_source=x#frag`, name: '/workshops/me/FAKE-PORTAL-TOKEN', referrer: 'https://example.com/?q=1' } }
  assert.equal(redactRumEvent(event), true)
  assert.equal(event.view.url, 'https://frankx.ai/workshops/me/:token')
  assert.equal(event.view.name, '/workshops/me/:token')
  assert.equal(event.view.referrer, '')
  assert.doesNotMatch(JSON.stringify(event), /FAKE-PORTAL-TOKEN/)
})

test('every other event raised on a credential page is dropped', () => {
  for (const type of ['action', 'error', 'resource', 'long_task']) {
    const event = { type, view: { url: PORTAL }, error: { message: `failed ${PORTAL}` } }
    assert.equal(redactRumEvent(event), false, type)
  }
})

test('on ordinary pages events pass, with query strings and referrers stripped', () => {
  const event = { type: 'action', view: { url: 'https://frankx.ai/blog/post?email=a@b.co#x', referrer: 'https://t.co/abc' } }
  assert.equal(redactRumEvent(event), true)
  assert.equal(event.view.url, 'https://frankx.ai/blog/post')
  assert.equal(event.view.referrer, '')
})

test('a token inside a resource URL or an error message is scrubbed on any page', () => {
  const event = {
    type: 'error',
    view: { url: 'https://frankx.ai/products' },
    resource: { url: `${PORTAL}?x=1` },
    error: { message: `Failed to fetch ${PORTAL}?x=1 (network)`, stack: `Error\n    at load (${PORTAL}:1:2)`, resource: { url: PORTAL } },
  }
  assert.equal(redactRumEvent(event), true)
  assert.doesNotMatch(JSON.stringify(event), /FAKE-PORTAL-TOKEN/)
  assert.equal(event.resource.url, 'https://frankx.ai/workshops/me/:token')
  assert.match(event.error.message, /\/workshops\/me\/:token/)
})

test('scrubCredentialPaths leaves ordinary text alone', () => {
  assert.equal(scrubCredentialPaths('Failed to fetch /api/products (500)'), 'Failed to fetch /api/products (500)')
  // A token may contain dots (a JWT does), so trailing punctuation is swallowed with it: stopping at a
  // dot would leak the tail of the token, which is the worse error.
  assert.equal(scrubCredentialPaths('see /workshops/me/FAKE-PORTAL-TOKEN.'), 'see /workshops/me/:token')
  assert.equal(scrubCredentialPaths('see /workshops/me/aaa.bbb.ccc now'), 'see /workshops/me/:token now')
})

test('a relative or malformed URL cannot make the redactor throw', () => {
  for (const url of ['/workshops/me/FAKE-PORTAL-TOKEN?x=1', 'not a url', '', '//frankx.ai/workshops/me/FAKE-PORTAL-TOKEN']) {
    const event = { type: 'view', view: { url } }
    assert.doesNotThrow(() => redactRumEvent(event), url)
    assert.doesNotMatch(JSON.stringify(event), /FAKE-PORTAL-TOKEN/, url)
  }
})

test('the environment tag follows the Vercel environment unless set explicitly', () => {
  const base = { NEXT_PUBLIC_DD_RUM_APPLICATION_ID: 'abc', NEXT_PUBLIC_DD_RUM_CLIENT_TOKEN: 'pub123' }
  assert.equal(datadogRumConfig({ ...base }).env, 'production')
  assert.equal(datadogRumConfig({ ...base, NEXT_PUBLIC_VERCEL_ENV: 'preview' }).env, 'preview')
  assert.equal(datadogRumConfig({ ...base, NEXT_PUBLIC_VERCEL_ENV: 'preview', NEXT_PUBLIC_DD_RUM_ENV: 'staging' }).env, 'staging')
})

test('the component delegates redaction to the tested module and is mounted once', async () => {
  const [component, layout] = await Promise.all([
    readRepoFile('components/analytics/DatadogRum.tsx'),
    readRepoFile('app/layout.tsx'),
  ])
  assert.match(component, /beforeSend: redactRumEvent/)
  assert.match(component, /NEXT_PUBLIC_VERCEL_ENV: process\.env\.NEXT_PUBLIC_VERCEL_ENV/)
  assert.equal((layout.match(/<DatadogRum \/>/g) || []).length, 1)
})

test('the RUM component is gated by the same privacy signals as the default analytics', async () => {
  const [component, layout] = await Promise.all([
    readRepoFile('components/analytics/DatadogRum.tsx'),
    readRepoFile('app/layout.tsx'),
  ])
  assert.match(component, /allowsAnalyticsMeasurement/)
  assert.match(component, /globalPrivacyControl/)
  assert.match(component, /if \(!config \|\| measurementAllowed !== true\) return null/)
  assert.match(layout, /<DatadogRum \/>/)
})
