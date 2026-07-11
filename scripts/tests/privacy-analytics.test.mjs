import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

import {
  allowsAnalyticsMeasurement,
  hasDoNotTrack,
  sanitizeAnalyticsProperties,
  sanitizeAnalyticsUrl,
} from '../../lib/analytics-policy.ts'

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
  const component = await readRepoFile('components/analytics/PrivacySafeAnalytics.tsx')
  const providerStart = component.indexOf('<Analytics')
  const mountGuard = component.indexOf('if (!measurementAllowed) return null')

  assert.equal(hasDoNotTrack(undefined), false)
  assert.equal(hasDoNotTrack(''), false)
  assert.equal(hasDoNotTrack('0'), false)
  assert.equal(hasDoNotTrack('no'), false)
  assert.equal(hasDoNotTrack('unspecified'), false)
  assert.equal(hasDoNotTrack('1'), true)
  assert.equal(hasDoNotTrack('yes'), true)
  assert.equal(hasDoNotTrack('maybe'), true)
  assert.equal(allowsAnalyticsMeasurement('0'), true)
  assert.equal(allowsAnalyticsMeasurement('no'), true)
  assert.equal(allowsAnalyticsMeasurement('unspecified'), true)
  assert.equal(allowsAnalyticsMeasurement('1'), false)
  assert.equal(allowsAnalyticsMeasurement('yes'), false)
  assert.equal(allowsAnalyticsMeasurement('custom-opt-out'), false)
  assert.equal(allowsAnalyticsMeasurement(undefined), true)
  assert.equal(sanitizeAnalyticsUrl('https://frankx.ai/connect?email=person@example.com#form'), '/connect')
  assert.match(component, /useSyncExternalStore/)
  assert.match(component, /subscribeToMeasurementPolicy: \(onStoreChange: \(\) => void\)/)
  assert.match(component, /getServerMeasurementPermission = \(\) => false/)
  assert.match(component, /typeof navigator !== 'undefined' \? navigator\.doNotTrack : undefined/)
  assert.ok(mountGuard >= 0 && mountGuard < providerStart)
  assert.match(component, /<Analytics beforeSend={beforeSend}/)
  assert.match(component, /<SpeedInsights \/>/)
  assert.match(component, /hasDoNotTrack/)
  assert.match(component, /return null/)
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
  assert.match(landed, /entry: hasCampaignTag/)
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
