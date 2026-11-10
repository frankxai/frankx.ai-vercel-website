import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

import {
  DATADOG_RUM_INTAKE_SOURCES,
  DATADOG_RUM_SCRIPT_ORIGIN,
  DATADOG_RUM_SCRIPT_URL,
  datadogRumConfig,
  isSensitiveRumPath,
  redactRumPath,
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
  assert.equal(redactRumPath('/workshops/me/abc123SECRET'), '/workshops/me/:token')
  assert.equal(redactRumPath('/Workshops/Me/abc123SECRET/'), '/workshops/me/:token')
  assert.equal(redactRumPath('/workshops/me/abc/def'), '/workshops/me/:token')
  assert.equal(redactRumPath('/workshops/ikigai-branding'), '/workshops/ikigai-branding')
  assert.equal(redactRumPath('/'), '/')
  assert.equal(isSensitiveRumPath('/workshops/me/abc123SECRET'), true)
  assert.equal(isSensitiveRumPath('/workshops/me'), false)
  assert.equal(isSensitiveRumPath('/workshops/metrics'), false)
  assert.equal(isSensitiveRumPath('/blog/me/post'), false)
})

test('the component rewrites view URLs and drops every other event on token pages', async () => {
  const component = await readRepoFile('components/analytics/DatadogRum.tsx')
  assert.match(component, /isSensitiveRumPath/)
  assert.match(component, /redactRumPath/)
  assert.match(component, /event\.type !== 'view'\) return false/)
  assert.match(component, /resource\?\.url/)
})

test('the RUM component is gated by the same privacy signals as the default analytics', async () => {
  const [component, layout] = await Promise.all([
    readRepoFile('components/analytics/DatadogRum.tsx'),
    readRepoFile('app/layout.tsx'),
  ])
  assert.match(component, /allowsAnalyticsMeasurement/)
  assert.match(component, /globalPrivacyControl/)
  assert.match(component, /sanitizeAnalyticsEventUrl/)
  assert.match(component, /if \(!config \|\| measurementAllowed !== true\) return null/)
  assert.match(layout, /<DatadogRum \/>/)
})
