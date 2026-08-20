import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const routeUrl = new URL('../../app/api/auctions/bid/route.ts', import.meta.url)

test('bid route gates on auction status, window, and minimum bid before provider work', async () => {
  const source = await readFile(routeUrl, 'utf8')

  const statusGuard = source.indexOf("auction.status !== 'active'")
  const windowGuard = source.indexOf('!isAuctionWindowOpen(auction)')
  const minimumBidGuard = source.indexOf('parsedBid < auction.startingBid')
  const firstProviderCall = source.indexOf('https://api.resend.com')

  assert.ok(statusGuard >= 0, 'non-active auctions must be rejected')
  assert.ok(windowGuard >= 0, 'the advertised start/end window must gate submissions')
  assert.ok(minimumBidGuard >= 0, 'bids below startingBid must be rejected')
  assert.ok(firstProviderCall >= 0, 'route is expected to call the email provider')
  assert.ok(statusGuard < firstProviderCall, 'status guard must precede provider work')
  assert.ok(windowGuard < firstProviderCall, 'window guard must precede provider work')
  assert.ok(minimumBidGuard < firstProviderCall, 'minimum-bid guard must precede provider work')
})

test('bid route does not report success while any email send is failing or pending', async () => {
  const source = await readFile(routeUrl, 'utf8')

  // Every provider call must be awaited. A fire-and-forget fetch can be
  // abandoned when the serverless execution ends with the response — the
  // exact false-success path this contract exists to prevent.
  for (const match of source.matchAll(/(await\s+)?fetch\(/g)) {
    assert.ok(
      match[1],
      'every fetch in this route must be awaited — a detached send can be abandoned after the response'
    )
  }
  assert.doesNotMatch(
    source,
    /\}\)\s*\.catch\(/,
    'no detached fire-and-forget .catch() send path may exist'
  )

  const notifyGuard = source.indexOf('!emailResponse.ok')
  const confirmationGuard = source.indexOf('!confirmationResponse.ok')
  const successReturn = source.indexOf('success: true')

  assert.ok(notifyGuard >= 0, 'a failing notify send must be detected')
  assert.ok(confirmationGuard >= 0, 'a failing confirmation send must be detected')
  assert.ok(successReturn >= 0, 'route is expected to have a success path')
  assert.ok(
    notifyGuard < successReturn,
    'the notify-send result must be checked before success is returned'
  )
  assert.ok(
    confirmationGuard < successReturn,
    'the confirmation-send result must be checked before success is returned'
  )

  // Both failure branches fail closed with a 5xx instead of success JSON.
  const notifyFailure = source.slice(notifyGuard, confirmationGuard)
  const confirmationFailure = source.slice(confirmationGuard, successReturn)
  assert.match(notifyFailure, /status: 502/, 'a failing notify send must return a 5xx')
  assert.match(
    confirmationFailure,
    /status: 502/,
    'a failing confirmation send must return a 5xx'
  )
})
