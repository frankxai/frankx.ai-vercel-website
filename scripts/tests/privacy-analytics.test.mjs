import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

import {
  allowsAnalyticsMeasurement,
  hasDoNotTrack,
  sanitizeAnalyticsProperties,
  sanitizeAnalyticsUrl,
} from '../../lib/analytics-policy.ts'
import { getConnectLandedProperties } from '../../lib/connect-attribution.ts'

const readRepoFile = (path) => readFile(new URL(`../../${path}`, import.meta.url), 'utf8')

test('optional analytics scripts stay unmounted without a consent control', async () => {
  const [layout, csp, envExample] = await Promise.all([
    readRepoFile('app/layout.tsx'),
    readRepoFile('next.config.mjs'),
    readRepoFile('.env.example'),
  ])

  const runtimeContract = `${layout}\n${csp}\n${envExample}`
  assert.doesNotMatch(runtimeContract, /plausible\.io|NEXT_PUBLIC_PLAUSIBLE_DOMAIN/)
  assert.doesNotMatch(runtimeContract, /googletagmanager|google-analytics|GoogleAnalytics|NEXT_PUBLIC_GA_/)
})

test('the aggregate default gates providers before mount and redacts page-view URLs', async () => {
  const [component, client] = await Promise.all([
    readRepoFile('components/analytics/PrivacySafeAnalytics.tsx'),
    readRepoFile('lib/privacy-safe-analytics-client.ts'),
  ])
  assert.equal(hasDoNotTrack(undefined), false)
  assert.equal(hasDoNotTrack(''), false)
  assert.equal(hasDoNotTrack('0'), false)
  assert.equal(hasDoNotTrack('no'), false)
  assert.equal(hasDoNotTrack('unspecified'), false)
  assert.equal(hasDoNotTrack('1'), true)
  assert.equal(hasDoNotTrack('yes'), true)
  assert.equal(hasDoNotTrack('maybe'), false)
  assert.equal(allowsAnalyticsMeasurement('0'), true)
  assert.equal(allowsAnalyticsMeasurement('no'), true)
  assert.equal(allowsAnalyticsMeasurement('unspecified'), true)
  assert.equal(allowsAnalyticsMeasurement('1'), false)
  assert.equal(allowsAnalyticsMeasurement('yes'), false)
  assert.equal(allowsAnalyticsMeasurement('custom-opt-out'), true)
  assert.equal(allowsAnalyticsMeasurement(undefined), true)
  assert.equal(allowsAnalyticsMeasurement(undefined, true), false)
  assert.equal(allowsAnalyticsMeasurement('0', true), false)
  assert.equal(sanitizeAnalyticsUrl('https://frankx.ai/connect?email=person@example.com#form'), '/connect')
  assert.match(component, /useState<boolean \| null>\(null\)/)
  assert.match(component, /privacyNavigator\.globalPrivacyControl/)
  assert.match(component, /if \(measurementAllowed !== true\) return null/)
  assert.match(component, /<Analytics beforeSend=\{privacySafeBeforeSend\} \/>/)
  assert.match(component, /<SpeedInsights \/>/)
  assert.match(client, /inject\(\{ beforeSend: privacySafeBeforeSend \}\)/)
  assert.match(client, /if \(analyticsInitialized\) return true/)
  assert.match(client, /privacyNavigator\.globalPrivacyControl/)
  assert.match(client, /sanitizeAnalyticsUrl\(event\.url\)/)
})

test('custom event properties exclude PII, free text, full URLs, and query data', () => {
  assert.deepEqual(
    sanitizeAnalyticsProperties({
      source: 'frankx_site',
      destination: '/products/vibe-os?email=person@example.com#buy',
      email: 'person@example.com',
      person_id: 'p_123',
      message: 'Please call me',
      url: 'https://example.com/private?token=secret',
      note: 'person@example.com',
      count: 2,
    }),
    {
      source: 'frankx_site',
      destination: '/products/vibe-os',
      count: 2,
    }
  )
})

test('event helpers do not fall back to ambient marketing globals or raw campaign values', async () => {
  const [analytics, workshop, landed, links, conversion] = await Promise.all([
    readRepoFile('lib/analytics.ts'),
    readRepoFile('lib/analytics-workshop.ts'),
    readRepoFile('components/connect/ConnectLandedTracker.tsx'),
    readRepoFile('app/links/page.tsx'),
    readRepoFile('lib/gtag.ts'),
  ])

  assert.doesNotMatch(
    `${analytics}\n${workshop}\n${links}\n${conversion}`,
    /window\.(plausible|gtag|posthog)|segment\.track|NEXT_PUBLIC_GA_/
  )
  assert.match(analytics, /sanitizeAnalyticsProperties\(params\)/)
  assert.doesNotMatch(landed, /utm_source:\s*utmSource|utm_medium:\s*utmMedium|utm_campaign:\s*utmCampaign/)
  assert.match(landed, /trackEvent\('connect_landed', getConnectLandedProperties\(params\)\)/)
  assert.doesNotMatch(landed, /trackEvent\('connect_landed',\s*\{[^}]*\bref(?:erral)?\s*:/s)
})

test('connect attribution emits only a fixed, privacy-safe entry enum', () => {
  assert.deepEqual(
    getConnectLandedProperties(new URLSearchParams('ref=mvu-sabrina')),
    { entry: 'mvu_sabrina_briefing' },
  )
  assert.deepEqual(
    getConnectLandedProperties(new URLSearchParams('ref=private-partner-name')),
    { entry: 'tagged_link' },
  )
  assert.deepEqual(
    getConnectLandedProperties(new URLSearchParams('utm_source=private-campaign')),
    { entry: 'tagged_link' },
  )
  assert.deepEqual(
    getConnectLandedProperties(new URLSearchParams()),
    { entry: 'direct_or_referral' },
  )
})

async function withFakeBrowser(doNotTrack, run, globalPrivacyControl = false) {
  const previousWindow = Object.getOwnPropertyDescriptor(globalThis, 'window')
  const previousDocument = Object.getOwnPropertyDescriptor(globalThis, 'document')
  const previousNodeEnv = process.env.NODE_ENV
  const scripts = []
  const fakeWindow = {
    navigator: { doNotTrack, globalPrivacyControl },
  }
  const fakeDocument = {
    createElement() {
      return { dataset: {} }
    },
    head: {
      appendChild(script) {
        scripts.push(script)
      },
      querySelector(selector) {
        return scripts.find((script) => selector.includes(script.src)) ?? null
      },
    },
  }

  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: fakeWindow,
    writable: true,
  })
  Object.defineProperty(globalThis, 'document', {
    configurable: true,
    value: fakeDocument,
    writable: true,
  })
  process.env.NODE_ENV = 'production'

  try {
    await run({ fakeWindow, scripts })
  } finally {
    if (previousWindow) Object.defineProperty(globalThis, 'window', previousWindow)
    else delete globalThis.window
    if (previousDocument) Object.defineProperty(globalThis, 'document', previousDocument)
    else delete globalThis.document
    if (previousNodeEnv === undefined) delete process.env.NODE_ENV
    else process.env.NODE_ENV = previousNodeEnv
  }
}

test('custom events initialize the provider before tracking and inject exactly once', async () => {
  await withFakeBrowser('0', async ({ fakeWindow, scripts }) => {
    const client = await import(
      `../../lib/privacy-safe-analytics-client.ts?runtime-order=${Date.now()}`
    )
    const properties = getConnectLandedProperties(
      new URLSearchParams('ref=mvu-sabrina&utm_source=private-campaign'),
    )

    assert.equal(
      client.trackPrivacySafeAnalyticsEvent('connect_landed', properties),
      true,
    )
    assert.equal(client.initializePrivacySafeAnalytics(), true)
    assert.equal(
      client.trackPrivacySafeAnalyticsEvent(
        'connect_landed',
        getConnectLandedProperties(new URLSearchParams()),
      ),
      true,
    )

    assert.equal(scripts.length, 1)
    assert.equal(fakeWindow.vaq.filter(([kind]) => kind === 'beforeSend').length, 1)
    assert.equal(fakeWindow.vaq[0][0], 'beforeSend')
    assert.deepEqual(fakeWindow.vaq[1], [
      'event',
      {
        name: 'connect_landed',
        data: { entry: 'mvu_sabrina_briefing' },
        options: undefined,
      },
    ])
    assert.doesNotMatch(JSON.stringify(fakeWindow.vaq), /mvu-sabrina|private-campaign/)

    const beforeSend = fakeWindow.vaq[0][1]
    assert.deepEqual(
      beforeSend({
        type: 'event',
        url: 'https://frankx.ai/connect?ref=mvu-sabrina#private',
      }),
      { type: 'event', url: '/connect' },
    )
  })
})

test('Do Not Track creates no provider, script, or event queue', async () => {
  await withFakeBrowser('1', async ({ fakeWindow, scripts }) => {
    const client = await import(
      `../../lib/privacy-safe-analytics-client.ts?dnt=${Date.now()}`
    )

    assert.equal(
      client.trackPrivacySafeAnalyticsEvent('connect_landed', {
        entry: 'mvu_sabrina_briefing',
      }),
      false,
    )
    assert.equal(fakeWindow.va, undefined)
    assert.equal(fakeWindow.vaq, undefined)
    assert.equal(scripts.length, 0)
  })
})

test('Global Privacy Control creates no provider, script, or event queue', async () => {
  await withFakeBrowser('0', async ({ fakeWindow, scripts }) => {
    const client = await import(
      `../../lib/privacy-safe-analytics-client.ts?gpc=${Date.now()}`
    )

    assert.equal(client.initializePrivacySafeAnalytics(), false)
    assert.equal(client.trackPrivacySafeAnalyticsEvent('blocked_event'), false)
    assert.equal(scripts.length, 0)
    assert.equal(fakeWindow.va, undefined)
    assert.equal(fakeWindow.vaq, undefined)
  }, true)
})

test('newsletter conversion remains provider-accepted and analytics receives no email', async () => {
  const [capture, newsletterTest] = await Promise.all([
    readRepoFile('components/funnels/EmailCaptureForm.tsx'),
    readRepoFile('scripts/tests/submit-newsletter.test.mjs'),
  ])

  assert.match(capture, /if \(!result\.ok\)/)
  assert.match(capture, /trackEvent\('lead_submitted'/)
  assert.doesNotMatch(
    capture.slice(capture.indexOf("trackEvent('lead_submitted'"), capture.indexOf('});', capture.indexOf("trackEvent('lead_submitted'"))),
    /\bemail\s*[:,]/
  )
  assert.match(newsletterTest, /returns success only after an accepted provider response/)
})
