import assert from 'node:assert/strict'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

// The estate product registry recorded G1 FAIL for these products because their CTA pointed
// at a dead Gumroad link. Waitlist-first is the rule until a product holds a release-gate
// PASS, so every CTA for them must go to the per-product waitlist, never to gumroad.com.
const ROOT = fileURLToPath(new URL('../../', import.meta.url))
const PRODUCTS = ['creative-ai-toolkit', 'creation-chronicles']
const SCAN_DIRS = ['app', 'components', 'lib', 'data', 'content']
// Point-in-time audit reports record what the site looked like when they ran.
const SKIP_DIRS = new Set(['node_modules', '.next', 'audit'])
const EXTENSIONS = /\.(tsx?|jsx?|mjs|json|mdx?)$/

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue
    const path = join(dir, name)
    if (statSync(path).isDirectory()) walk(path, out)
    else if (EXTENSIONS.test(name)) out.push(path)
  }
  return out
}

const productNamePattern = /creative[-\s]?ai[-\s]?toolkit|creation[-\s]?chronicles/i
const gumroadUrlPattern = /https?:\/\/(?:[a-z0-9-]+\.)?gumroad\.com\/[^\s"'`)<>]*/gi

test('no source file links a Gumroad URL for these products', () => {
  const offenders = []
  for (const dir of SCAN_DIRS) {
    for (const file of walk(join(ROOT, dir))) {
      const lines = readFileSync(file, 'utf8').split('\n')
      lines.forEach((line, index) => {
        for (const url of line.match(gumroadUrlPattern) ?? []) {
          // A Gumroad URL counts when the URL itself or the record around it names the product.
          const window = lines.slice(Math.max(0, index - 4), index + 5).join('\n')
          if (productNamePattern.test(url) || productNamePattern.test(window)) {
            offenders.push(`${relative(ROOT, file)}:${index + 1} ${url}`)
          }
        }
      })
    }
  }
  assert.deepEqual(offenders, [], `Gumroad CTA found for a waitlist-only product:\n${offenders.join('\n')}`)
})

test('site link registry sends these products to their own waitlist', () => {
  const registry = JSON.parse(readFileSync(join(ROOT, 'data/site-links.json'), 'utf8'))
  const entries = []
  JSON.stringify(registry, (key, value) => {
    if (value && typeof value === 'object' && typeof value.id === 'string') entries.push(value)
    return value
  })
  for (const id of PRODUCTS) {
    const entry = entries.find((item) => item && item.id === id)
    assert.ok(entry, `${id} missing from data/site-links.json`)
    assert.equal(entry.url, `/waitlist?intent=${id}`)
  }
})

test('product records point every self-serve CTA at the per-product waitlist', () => {
  const products = JSON.parse(readFileSync(join(ROOT, 'data/products.json'), 'utf8'))
  for (const id of PRODUCTS) {
    const product = products.find((item) => item.id === id)
    assert.ok(product, `${id} missing from data/products.json`)
    const hrefs = []
    JSON.stringify(product, (key, value) => {
      if (/href$/i.test(key) && typeof value === 'string') hrefs.push(value)
      return value
    })
    assert.ok(hrefs.includes(`/waitlist?intent=${id}`), `${id} has no waitlist CTA`)
    for (const href of hrefs) {
      assert.doesNotMatch(href, /gumroad\.com/i, `${id} CTA points at Gumroad: ${href}`)
    }
  }
})
