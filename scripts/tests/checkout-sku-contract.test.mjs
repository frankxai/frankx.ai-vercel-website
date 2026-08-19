import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Every productId handed to a CheckoutButton must be a key in the PRODUCTS map
 * of app/api/checkout/route.ts. A slug that is not a key returns 404 "Product
 * not found", so the failure is invisible until a buyer clicks Pay — the money
 * path breaks silently. This shipped once: /acos passed "acos-creator-kit"
 * while the route only knew "agentic-creator-os".
 */

const ROOT = process.cwd()

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry === '.next' || entry === '.worktrees' || entry.startsWith('.git')) continue
    const full = join(dir, entry)
    const info = statSync(full)
    if (info.isDirectory()) walk(full, out)
    else if (/\.(tsx|ts)$/.test(entry)) out.push(full)
  }
  return out
}

function knownSkus() {
  const source = readFileSync(join(ROOT, 'app/api/checkout/route.ts'), 'utf8')
  const map = source.slice(source.indexOf('const PRODUCTS'), source.indexOf('export async function POST'))
  return new Set([...map.matchAll(/^\s*'([^']+)':\s*\{/gm)].map((m) => m[1]))
}

test('every CheckoutButton productId resolves to a SKU the checkout route knows', () => {
  const skus = knownSkus()
  assert.ok(skus.size > 0, 'could not parse any SKU out of the checkout route PRODUCTS map')

  const offenders = []
  for (const file of [...walk(join(ROOT, 'app')), ...walk(join(ROOT, 'components'))]) {
    const source = readFileSync(file, 'utf8')
    if (!source.includes('CheckoutButton')) continue

    for (const match of source.matchAll(/productId=(?:"([^"]+)"|\{'([^']+)'\}|\{"([^"]+)"\})/g)) {
      const sku = match[1] ?? match[2] ?? match[3]
      if (!skus.has(sku)) offenders.push(`${file.replace(ROOT, '.')}: "${sku}"`)
    }
    // checkoutId fields feed the same component through a tier/config object.
    for (const match of source.matchAll(/checkoutId:\s*'([^']+)'/g)) {
      if (!skus.has(match[1])) offenders.push(`${file.replace(ROOT, '.')}: checkoutId "${match[1]}"`)
    }
  }

  assert.deepEqual(
    offenders,
    [],
    `checkout SKU(s) absent from the route PRODUCTS map (${[...skus].join(', ')}):\n  ${offenders.join('\n  ')}`
  )
})
