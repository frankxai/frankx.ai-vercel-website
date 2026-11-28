import { pathToFileURL } from 'node:url'
import Stripe from 'stripe'
import { acosCampaign } from '../../lib/commerce/acos-campaign.ts'

const product = 'agentic-creator-os'
const localDate = new Intl.DateTimeFormat('sv-SE', {
  timeZone: 'Europe/Amsterdam',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

export function reportWindow(day) {
  const stamp = Date.parse(day + 'T00:00:00Z')
  if (
    !Number.isFinite(stamp) ||
    new Date(stamp).toISOString().slice(0, 10) !== day
  )
    throw Error('Expected YYYY-MM-DD')
  // Find the first UTC second belonging to each Amsterdam date, including either DST boundary.
  function midnight(iso, approx) {
    let left = approx / 1000 - 86400
    let right = approx / 1000 + 86400
    while (left < right) {
      const mid = Math.floor((left + right) / 2)
      if (localDate.format(new Date(mid * 1000)) < iso) left = mid + 1
      else right = mid
    }
    return left
  }
  const next = stamp + 86400000
  return {
    gte: midnight(day, stamp),
    lt: midnight(new Date(next).toISOString().slice(0, 10), next),
  }
}

export async function dailyReport(stripe, day, live, now = Date.now()) {
  const created = reportWindow(day)
  if (created.lt > now / 1000 || created.gte < now / 1000 - 30 * 86400) {
    throw Error('Use a complete Amsterdam day inside Stripe event retention')
  }
  const totals = {}
  const purchaseEvents = []
  const purchases = new Set()
  const refunds = new Set()
  const unresolved = new Set()
  for (const type of [
    'payment_intent.succeeded',
    'refund.created',
    'refund.updated',
  ]) {
    for await (const event of stripe.events.list({
      type,
      created,
      limit: 100,
    })) {
      if (event.livemode !== live) throw Error('Stripe mode mismatch')
      const obj = event.data.object
      const paid = type === 'payment_intent.succeeded'
      if (
        type === 'refund.updated' &&
        event.data.previous_attributes?.status === 'succeeded' &&
        obj.status !== 'succeeded'
      ) {
        unresolved.add(obj.id)
      }
      if (obj.status !== 'succeeded') continue
      if (type === 'refund.updated' && !event.data.previous_attributes?.status)
        continue
      if (
        type === 'refund.updated' &&
        event.data.previous_attributes.status === 'succeeded'
      )
        continue
      const seen = paid ? purchases : refunds
      if (seen.has(obj.id)) continue
      seen.add(obj.id)
      const intentId = paid ? obj.id : obj.payment_intent
      if (!intentId) {
        unresolved.add(obj.id)
        continue
      }
      const intent = paid ? obj : await stripe.paymentIntents.retrieve(intentId)
      let metadata = intent.metadata
      if (!metadata?.productSlug) {
        const list = await stripe.checkout.sessions.list({
          payment_intent: intentId,
          limit: 2,
        })
        if (list.has_more || list.data.length > 1) {
          unresolved.add(obj.id)
          continue
        }
        metadata = list.data[0]?.metadata
      }
      if (!metadata?.productSlug) {
        unresolved.add(obj.id)
        continue
      }
      if (metadata.productSlug !== product) continue
      const amount = paid ? obj.amount_received : obj.amount
      if (!obj.currency || !Number.isSafeInteger(amount) || amount < 0)
        throw Error('Incomplete monetary fields')
      const row = (totals[obj.currency] ??= {
        purchases: 0,
        gross_minor: 0,
        refunds_minor: 0,
        gross_less_refunds_minor: 0,
        purchase_sources: {},
      })
      if (paid) {
        row.purchases++
        row.gross_minor += amount
        const campaign = acosCampaign(metadata)
        const source = campaign
          ? campaign.utm_campaign + '/' + campaign.utm_source
          : 'unattributed'
        purchaseEvents.push({
          name: 'purchase',
          event_id: event.id,
          transaction_id: intentId,
          timestamp: event.created,
          amount_minor: amount,
          currency: obj.currency,
          source,
          product,
        })
        row.purchase_sources[source] = (row.purchase_sources[source] || 0) + 1
      } else row.refunds_minor += amount
      row.gross_less_refunds_minor = row.gross_minor - row.refunds_minor
    }
  }
  return {
    day,
    timezone: 'Europe/Amsterdam',
    product,
    mode: live ? 'live' : 'test',
    coverage: unresolved.size ? 'partial' : 'complete',
    unresolved_objects: unresolved.size,
    totals,
    purchase_events: purchaseEvents,
  }
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  const [, , day, mode] = process.argv
  const key = process.env.STRIPE_REPORT_RESTRICTED_KEY || ''
  if (!['live', 'test'].includes(mode) || !key.startsWith('rk_' + mode + '_')) {
    throw Error(
      'Supply a matching read-only restricted key and an explicit test or live mode',
    )
  }
  const report = await dailyReport(new Stripe(key), day, mode === 'live')
  console.log(JSON.stringify(report, null, 2))
}
