import assert from 'node:assert/strict'
import { once } from 'node:events'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import net from 'node:net'
import test from 'node:test'

import {
  startNextServer,
  stopManagedProcess,
} from './helpers/managed-next-process.mjs'

/**
 * Product page -> checkout, against the built app (`next start`).
 *
 * With every buy flag off (the shipped default), a priced product page must
 * link to the waitlist and never to /checkout, /checkout/<slug> must show the
 * not-open state, and POST /api/checkout must refuse with `checkout_gated`
 * before any provider is called. The flag-on branch is covered by
 * scripts/tests/sku-buy-flags.test.mjs.
 */

const rootDirectory = fileURLToPath(new URL('../..', import.meta.url))
const catalog = JSON.parse(readFileSync(new URL('../../data/products.json', import.meta.url), 'utf8'))
const priced = catalog.filter((p) => (p.offer?.primaryPrice ?? 0) > 0 && p.id !== 'founders-circle-guild')

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds))

async function getAvailablePort() {
  const server = net.createServer()
  server.listen(0, '127.0.0.1')
  await once(server, 'listening')
  const { port } = server.address()
  await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())))
  return port
}

async function waitForReady(url, child, output) {
  for (let attempt = 0; attempt < 150; attempt += 1) {
    if (child.spawnError) throw new Error(`next start failed to spawn: ${child.spawnError.message}`)
    if (child.exitCode !== null) {
      throw new Error(`next start exited before readiness (code ${child.exitCode}):\n${output()}`)
    }
    try {
      const response = await fetch(url)
      if (response.ok) return
    } catch {
      // The listener may not be ready yet.
    }
    await delay(100)
  }
  throw new Error(`next start did not become ready:\n${output()}`)
}

const hrefs = (html) => [...html.matchAll(/<a[^>]+href="([^"]+)"/gi)].map((m) => m[1].replace(/&amp;/g, '&'))

test('priced products stay on the waitlist path end to end while flags are off', { timeout: 120_000 }, async () => {
  const port = await getAvailablePort()
  const base = `http://127.0.0.1:${port}`
  const outputChunks = []
  const child = startNextServer({ cwd: rootDirectory, port })
  const output = () => outputChunks.join('')
  child.stdout.on('data', (chunk) => outputChunks.push(chunk.toString()))
  child.stderr.on('data', (chunk) => outputChunks.push(chunk.toString()))

  try {
    await waitForReady(`${base}/products/${priced[0].slug}`, child, output)

    for (const product of priced) {
      const page = await fetch(`${base}/products/${product.slug}`)
      assert.equal(page.status, 200, `/products/${product.slug}`)
      const links = hrefs(await page.text())
      assert.ok(
        links.some((href) => href.startsWith('/waitlist')),
        `/products/${product.slug} must offer the waitlist`
      )
      assert.deepEqual(
        links.filter((href) => href.startsWith('/checkout/')),
        [],
        `/products/${product.slug} must not link to checkout while its flag is off`
      )

      const checkout = await fetch(`${base}/checkout/${product.slug}`)
      assert.equal(checkout.status, 200, `/checkout/${product.slug}`)
      const checkoutHtml = await checkout.text()
      assert.match(checkoutHtml, /not open yet/, `/checkout/${product.slug} must show the not-open state`)
      assert.doesNotMatch(checkoutHtml, /lemonsqueezy\.com/, `/checkout/${product.slug} must not render a provider link`)
    }

    const routeSource = readFileSync(new URL('../../app/api/checkout/route.ts', import.meta.url), 'utf8')
    const map = routeSource.slice(routeSource.indexOf('const PRODUCTS'), routeSource.indexOf('export async function POST'))
    const stripeSkus = [...map.matchAll(/^\s*'([^']+)':\s*\{/gm)].map((m) => m[1])
    for (const productId of stripeSkus) {
      const response = await fetch(`${base}/api/checkout`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ productId }),
      })
      assert.equal(response.status, 503, `POST /api/checkout ${productId}`)
      assert.equal((await response.json()).refusal, 'checkout_gated', productId)
    }
  } finally {
    await stopManagedProcess(child)
  }
})
