import assert from 'node:assert/strict'
import test from 'node:test'

import { buildTrackPayload, trackWith, priceBand, TRACK_EVENTS } from '../../lib/track.ts'
import { withUtm, readInboundUtm } from '../../lib/utm.ts'

const campaign = { source: 'linkedin', medium: 'social', campaign: '2026-11-launch' }

test('withUtm appends the estate params to absolute and relative urls', () => {
  assert.equal(
    withUtm('https://frankx.ai/start-here', campaign),
    'https://frankx.ai/start-here?utm_source=linkedin&utm_medium=social&utm_campaign=2026-11-launch',
  )
  assert.equal(
    withUtm('/waitlist?intent=x#top', { ...campaign, content: 'Hero Video' }),
    '/waitlist?intent=x&utm_source=linkedin&utm_medium=social&utm_campaign=2026-11-launch&utm_content=hero-video#top',
  )
})

test('withUtm keeps existing utm values and skips mailto and bad input', () => {
  assert.equal(
    withUtm('https://a.com/?utm_source=x', campaign),
    'https://a.com/?utm_source=x&utm_medium=social&utm_campaign=2026-11-launch',
  )
  assert.equal(withUtm('mailto:a@b.com', campaign), 'mailto:a@b.com')
  assert.equal(withUtm('not a url', campaign), 'not a url')
})

test('readInboundUtm returns only the three tracked params, cleaned', () => {
  assert.deepEqual(readInboundUtm('?utm_source=X&utm_medium=Social&utm_campaign=2026-11-a&utm_term=no&q=1'), {
    utm_source: 'x',
    utm_medium: 'social',
    utm_campaign: '2026-11-a',
  })
  assert.deepEqual(readInboundUtm(''), {})
})

test('only the three agreed event names exist', () => {
  assert.deepEqual([...TRACK_EVENTS], ['waitlist_join', 'cta_click', 'checkout_start'])
})

test('payload has exactly the event props plus inbound utm', () => {
  assert.deepEqual(buildTrackPayload('waitlist_join', { product: 'newsletter', source: 'home' }), {
    product: 'newsletter',
    source: 'home',
  })
  assert.deepEqual(
    buildTrackPayload('cta_click', { cta: 'join', location: 'hero' }, { utm_source: 'x', utm_medium: 'social' }),
    { cta: 'join', location: 'hero', utm_source: 'x', utm_medium: 'social' },
  )
  assert.deepEqual(buildTrackPayload('checkout_start', { product: 'p', price_band: '50-199' }), {
    product: 'p',
    price_band: '50-199',
  })
})

test('trackWith sends event name and payload, and never throws', () => {
  const calls = []
  trackWith((n, p) => calls.push([n, p]), () => ({ utm_source: 'youtube' }), 'cta_click', {
    cta: 'a',
    location: 'b',
  })
  assert.deepEqual(calls, [['cta_click', { cta: 'a', location: 'b', utm_source: 'youtube' }]])
  assert.doesNotThrow(() =>
    trackWith(() => { throw new Error('boom') }, () => ({}), 'cta_click', { cta: 'a', location: 'b' }),
  )
})

test('priceBand hides exact prices', () => {
  assert.equal(priceBand(0), 'free')
  assert.equal(priceBand(29), 'under-50')
  assert.equal(priceBand(197), '50-199')
  assert.equal(priceBand(497), '200-999')
  assert.equal(priceBand(2500), '1000-plus')
})
