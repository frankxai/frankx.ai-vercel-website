/** Offline acceptance for the Academy ZIP. All provider reads and writes use fixtures. */
import assert from 'node:assert/strict'
import { createHash, randomBytes } from 'node:crypto'
import { mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import Stripe from 'stripe'
import { core } from './glass-sandbox-harness.mjs'
import { sqliteSandboxLedger } from './glass-sandbox-sqlite.mjs'

const digest = bytes => createHash('sha256').update(bytes).digest('hex')
const origin = 'https://academy-fixture.invalid'
const subject = 'learner_fixture_a'
const sessionId = 'cs_test_academy_fixture'
const intent = 'pi_academy_fixture'
const chargeId = 'ch_academy_fixture'

export async function rehearseAcademyDelivery({ archive, sha256, sourceSha, output }) {
  if (process.env.NODE_ENV === 'production') throw Error('Offline rehearsal only')
  if (!/^[a-f0-9]{64}$/.test(sha256) || !/^[a-f0-9]{40}$/.test(sourceSha) || !archive || !output) {
    throw Error('Supply the edition ZIP, publisher SHA-256, curriculum source revision, and a new output path')
  }
  const info = await stat(archive)
  if (!info.isFile() || info.size < 30 || info.size > 20_000_000) throw Error('Expected edition ZIP under 20 MB')
  const bytes = await readFile(archive)
  if (!bytes.subarray(0, 4).equals(Buffer.from([0x50, 0x4b, 0x03, 0x04])) || digest(bytes) !== sha256) {
    throw Error('Release bytes differ from the pinned Academy artifact')
  }

  const dir = await mkdtemp(join(tmpdir(), 'academy-delivery-'))
  const ledgerFile = join(dir, 'ledger.sqlite')
  let ledger
  try {
    ledger = sqliteSandboxLedger(ledgerFile)
    const release = {
      productId: 'win-the-ai-client', edition: '0.1', sourceSha, artifactId: 'win-the-ai-client-0.1.zip',
      artifactSha256: sha256, artifactBytes: bytes.length, priceId: 'price_offline_academy', amount: 1,
      currency: 'eur', termsVersion: 'fixture', termsSha256: digest('Only for offline purchase rehearsal'),
      termsScope: 'sandbox-rehearsal-only',
    }
    const acceptedAt = new Date().toISOString()
    const webhookSecret = 'whsec_' + randomBytes(24).toString('hex')
    let session
    const line = { quantity: 1, amount_total: 1, currency: 'eur', price: { id: release.priceId, currency: 'eur' } }
    const options = { mode: 'test', secretKey: 'sk_test_academy_offline_fixture', webhookSecret, ledger, release,
      products: [{ id: release.productId, slug: release.productId }],
      reads: {
        session: async id => { assert.equal(id, sessionId); return structuredClone(session) },
        lineItems: async id => { assert.equal(id, sessionId); return { data: [structuredClone(line)], has_more: false } },
        charge: async id => {
          assert.equal(id, chargeId)
          return { id, livemode: false, payment_intent: intent, currency: 'eur', amount_refunded: 1 }
        },
      },
    }
    const checkout = await core.glassSandboxCheckout(new Request(origin + '/checkout', {
      method: 'POST', headers: { origin },
    }), {
      ...options, siteOrigin: origin, purchaseAttemptId: 'academy_offline_attempt_01',
      authenticate: async () => ({ subjectId: subject, acceptedAt, termsSha256: release.termsSha256 }),
      transport: async (url, init) => {
        assert.equal(new URL(url).pathname, '/v1/checkout/sessions')
        assert.equal(init.method, 'POST')
        const form = new URLSearchParams(init.body)
        assert.equal(form.get('line_items[0][price]'), release.priceId)
        assert.equal(form.get('line_items[0][quantity]'), '1')
        const metadata = {}
        for (const [key, value] of form) {
          const match = /^metadata\[(\w+)\]$/.exec(key)
          if (match) metadata[match[1]] = value
        }
        session = { id: sessionId, object: 'checkout.session', livemode: false, mode: 'payment', status: 'open',
          payment_status: 'unpaid', payment_intent: intent, currency: 'eur', amount_total: 1,
          client_reference_id: form.get('client_reference_id'), metadata,
          url: 'https://checkout.stripe.com/c/pay/' + sessionId }
        return Response.json(session)
      },
    })
    assert.equal(checkout.status, 201)
    assert.equal((await checkout.json()).sessionId, sessionId)

    function callback(type, eventId, signingKey = webhookSecret) {
      const id = type === 'charge.refunded' ? chargeId : sessionId
      const payload = JSON.stringify({ id: eventId, object: 'event', type, livemode: false, data: { object: { id } } })
      return core.glassSandboxWebhook(new Request(origin + '/webhook', {
        method: 'POST', body: payload,
        headers: { 'stripe-signature': Stripe.webhooks.generateTestHeaderString({ payload, secret: signingKey }) },
      }), options)
    }
    const pay = () => callback('checkout.session.completed', 'evt_academy_paid')
    const refund = () => callback('charge.refunded', 'evt_academy_refund')
    const retrieve = (subjectId = subject, content = bytes) => core.glassSandboxDownload(
      new Request(origin + '/download?session=' + sessionId), {
        ...options, authenticate: async () => ({ subjectId }),
        readPrivateArtifact: async id => { assert.equal(id, release.artifactId); return content },
      })

    assert.equal((await retrieve()).status, 404)
    assert.equal((await callback('checkout.session.completed', 'evt_academy_paid', 'wrong-test-signer')).status, 401)
    assert.equal((await pay()).status, 422)
    session.payment_status = 'paid'
    line.price.id = 'price_offline_other'
    assert.equal((await pay()).status, 422)
    line.price.id = release.priceId
    for (const [object, key, wrong] of [[session, 'amount_total', 2], [session, 'currency', 'usd'], [session.metadata, 'productSlug', 'other-fixture']]) {
      const previous = object[key]
      object[key] = wrong
      assert.equal((await pay()).status, 422)
      object[key] = previous
    }
    assert.equal((await retrieve()).status, 404)
    assert.equal((await (await pay()).json()).result, 'applied')
    ledger.close()
    ledger = sqliteSandboxLedger(ledgerFile)
    options.ledger = ledger
    assert.equal((await (await pay()).json()).result, 'duplicate')
    assert.equal((await retrieve('learner_fixture_b')).status, 404)
    assert.equal((await retrieve(subject, Buffer.from('changed edition'))).status, 502)
    const response = await retrieve()
    assert.equal(response.status, 200)
    assert.equal(response.headers.get('content-type'), 'application/zip')
    assert.equal(response.headers.get('content-disposition'), 'attachment; filename="win-the-ai-client-0.1.zip"')
    const received = Buffer.from(await response.arrayBuffer())
    assert.deepEqual(received, bytes)
    assert.equal((await (await refund()).json()).result, 'applied')
    assert.equal((await (await refund()).json()).result, 'duplicate')
    assert.equal((await (await callback('checkout.session.completed', 'evt_academy_late_paid')).json()).result, 'applied')
    assert.equal((await retrieve()).status, 410)
    await writeFile(output, received, { flag: 'wx', mode: 0o600 })
    return { environment: 'offline-fixture', productId: release.productId, sourceSha, sha256, bytes: received.length,
      checkoutStatus: 201, grant: 'applied', replay: 'duplicate', refund: 'applied', afterRefundStatus: 410, providerTransactions: 0 }
  } finally {
    ledger?.close()
    await rm(dir, { recursive: true, force: true })
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [archive, sha256, sourceSha, output] = process.argv.slice(2)
  console.log(JSON.stringify(await rehearseAcademyDelivery({ archive, sha256, sourceSha, output }), null, 2))
}
