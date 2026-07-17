import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import test from 'node:test'

const ROOT = process.cwd()

async function source(path) {
  return readFile(resolve(ROOT, path), 'utf8')
}

test('the First €100 Weekend declares one truthful €99 ACOS checkout contract', async () => {
  const [ledgerSource, experience, checkout] = await Promise.all([
    source('data/challenges/first-100-weekend.json'),
    source('app/challenge/ChallengeExperience.tsx'),
    source('app/api/checkout/route.ts'),
  ])
  const ledger = JSON.parse(ledgerSource)

  assert.equal(ledger.product.id, 'agentic-creator-os')
  assert.equal(ledger.product.priceEur, 99)
  assert.equal(ledger.product.currency, 'EUR')
  assert.equal(ledger.completionProof.status, 'required')
  assert.ok(ledger.completionProof.requiredEvidence.includes('postmortem'))

  assert.match(experience, /Get the Creator Kit — €99/)
  assert.match(experience, /Get the kit — €99/)
  assert.match(experience, /Start with ACOS — €99/)
  assert.doesNotMatch(experience, /\$47/)

  assert.match(checkout, /STRIPE_PRICE_ACOS_EUR_99/)
  assert.match(checkout, /amount:\s*9900/)
  assert.match(checkout, /currency:\s*'eur'/)
  assert.match(checkout, /metadata\[productSlug\].*productId/)
  assert.match(checkout, /payment_intent_data\[metadata\]\[productSlug\].*productId/)
  assert.equal(
    [...checkout.matchAll(/params\.append\('metadata\[productSlug\]', productId\)/g)].length,
    1,
    'checkout must send productSlug session metadata exactly once'
  )
  assert.match(checkout, /if \(!product\.priceId\)/)
})

test('the challenge has a mobile-safe, keyboard-exposed checkout state and completion-proof boundary', async () => {
  const experience = await source('app/challenge/ChallengeExperience.tsx')

  assert.match(experience, /const checkoutUnavailable = isClosed \|\| checkoutState === 'loading'/)
  assert.match(experience, /disabled=\{checkoutUnavailable\}/)
  assert.match(experience, /aria-describedby="checkout-status"/)
  assert.match(experience, /id="checkout-status"/)
  assert.match(experience, /role="status"/)
  assert.match(experience, /Completion proof required/)
  assert.match(experience, /w-full[^"\n]*sm:w-auto/)
  assert.doesNotMatch(experience, /limited time|act now|last chance|hurry/i)
})
