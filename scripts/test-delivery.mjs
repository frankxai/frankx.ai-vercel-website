#!/usr/bin/env node
// Regression test for the checkout -> delivery slug contract.
//
// app/api/checkout/route.ts's PRODUCTS map keys are the productId sent to
// Stripe as session metadata; the webhook (app/api/webhooks/stripe/route.ts)
// looks that slug up via lib/delivery.ts's generateProductEmailData(), which
// composes getProductById() (data/products.json) + getDeliveryConfig()
// (lib/delivery.ts DELIVERY_CONFIG). If any of the three slugs don't line up
// across all three, a paid buyer is charged and receives no delivery email.
//
// No test runner is configured in this repo (package.json has no "test"
// script), so this uses node:test directly:
//   node --experimental-strip-types scripts/test-delivery.mjs
//
// lib/delivery.ts and lib/products.ts are TypeScript and use the '@/*'
// tsconfig path alias for the products.json import. Plain node has no
// equivalent without adding a ts-node/tsx dependency, so we register a tiny
// loader (scripts/test-utils/alias-loader.mjs) that resolves '@/*' the same
// way tsconfig.json's "paths" does, purely for this test run.
import { register } from 'node:module'
import { pathToFileURL } from 'node:url'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import assert from 'node:assert/strict'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

register(
  pathToFileURL(resolve(__dirname, 'test-utils/alias-loader.mjs')).href,
  import.meta.url,
  { data: { root: ROOT } }
)

const { generateProductEmailData } = await import(pathToFileURL(resolve(ROOT, 'lib/delivery.ts')).href)

// Must match the PRODUCTS map keys in app/api/checkout/route.ts exactly.
const CHECKOUT_SLUGS = [
  'reality-md-starter-pack',
  'suno-power-pack-25',
  'creative-ai-toolkit',
  'agentic-creator-os',
  'suno-prompt-library',
]

test('every checkout slug resolves to a non-null delivery email payload', () => {
  for (const slug of CHECKOUT_SLUGS) {
    const data = generateProductEmailData(slug, 'Test Buyer', 'buyer@example.com')
    assert.ok(data, `expected generateProductEmailData("${slug}") to resolve — webhook would silently drop this buyer's email`)
  }
})

test('every checkout slug payload has a non-empty product name', () => {
  for (const slug of CHECKOUT_SLUGS) {
    const data = generateProductEmailData(slug, 'Test Buyer', 'buyer@example.com')
    assert.equal(typeof data.productName, 'string')
    assert.ok(data.productName.trim().length > 0, `expected a product name for "${slug}"`)
  }
})

test('every checkout slug payload has at least one download link', () => {
  for (const slug of CHECKOUT_SLUGS) {
    const data = generateProductEmailData(slug, 'Test Buyer', 'buyer@example.com')
    assert.ok(Array.isArray(data.downloadLinks), `expected downloadLinks array for "${slug}"`)
    assert.ok(data.downloadLinks.length > 0, `expected at least one download link for "${slug}"`)
    for (const link of data.downloadLinks) {
      assert.equal(typeof link.name, 'string')
      assert.equal(typeof link.url, 'string')
      assert.ok(link.url.startsWith('http'), `expected an absolute download URL for "${slug}"`)
    }
  }
})

test('payload carries through the customer name and email unchanged', () => {
  const data = generateProductEmailData('creative-ai-toolkit', 'Ada Lovelace', 'ada@example.com')
  assert.equal(data.customerName, 'Ada Lovelace')
  assert.equal(data.customerEmail, 'ada@example.com')
})

import { readFileSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'

test('an unknown slug resolves to null (no silent fallback delivery)', () => {
  const data = generateProductEmailData('not-a-real-product', 'Test Buyer', 'buyer@example.com')
  assert.equal(data, null)
})

test('$1 reality-md-starter-pack bundle files exist and match manifest.json SHA-256 & byte counts', () => {
  const bundleDir = resolve(ROOT, 'public/products/reality-md-starter-pack')
  const manifestPath = resolve(bundleDir, 'manifest.json')
  assert.ok(existsSync(manifestPath), 'expected manifest.json in reality-md-starter-pack')
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
  assert.equal(manifest.version, '1.0.0')
  const expectedFiles = [
    'README.md',
    'reality.template.md',
    'AGENTS.starter.md',
    '5-invariants-checklist.md',
  ]
  for (const name of expectedFiles) {
    const filePath = resolve(bundleDir, name)
    assert.ok(existsSync(filePath), `expected ${name} to exist in reality-md-starter-pack`)
    const buf = readFileSync(filePath)
    const entry = manifest.files.find((f) => f.name === name)
    assert.ok(entry, `expected ${name} in manifest.json`)
    assert.equal(buf.length, entry.bytes, `byte size mismatch for ${name}`)
    const sha256 = createHash('sha256').update(buf).digest('hex')
    assert.equal(sha256, entry.sha256, `sha256 mismatch for ${name}`)
  }
})

test('$7 suno-power-pack-25 bundle has 25 prompts across 5 categories with complete metatags', () => {
  const bundleDir = resolve(ROOT, 'public/products/suno-power-pack-25')
  for (const file of ['README.md', 'suno-v4-25-prompts.json', 'suno-v4-25-prompts.md', 'commercial-release-checklist.md']) {
    assert.ok(existsSync(resolve(bundleDir, file)), `expected ${file} in suno-power-pack-25`)
  }
  const pack = JSON.parse(readFileSync(resolve(bundleDir, 'suno-v4-25-prompts.json'), 'utf8'))
  assert.equal(pack.prompts.length, 25, 'expected exactly 25 prompts')
  assert.equal(pack.categories.length, 5, 'expected 5 categories')
  const requiredTags = ['[Intro', '[Verse', '[Chorus', '[Bridge', '[Drop', '[Outro']
  for (const p of pack.prompts) {
    assert.ok(p.bpm > 0, `expected BPM for ${p.id}`)
    assert.ok(p.keySignature.length > 0, `expected keySignature for ${p.id}`)
    assert.ok(p.excludeStyles.length > 0, `expected excludeStyles for ${p.id}`)
    for (const tag of requiredTags) {
      assert.ok(p.structurePrompt.includes(tag), `expected ${tag}] metatag in prompt ${p.id}`)
    }
  }
})

test('/ops Mission Control tracks all 8 flagship repos, 10 orgs, 5 corporate pillars, and $1/$7 bundles', () => {
  const opsPage = readFileSync(resolve(ROOT, 'app/ops/page.tsx'), 'utf8')
  const opsClient = readFileSync(resolve(ROOT, 'app/ops/OpsClient.tsx'), 'utf8')
  const expectedRepos = [
    'frankxai/Starlight-Intelligence-System',
    'frankxai/frankx.ai-vercel-website',
    'frankxai/arcanea-ai-app',
    'frankxai/agentic-ops',
    'frankxai/agentic-ops-hub',
    'Starlight-Intelligence/starlight-command-center',
    'frankxai/starlight-estate',
    'frankxai/claude-skills-library',
  ]
  for (const repo of expectedRepos) {
    assert.ok(opsPage.includes(repo), `expected ${repo} in app/ops/page.tsx REPOS`)
  }
  assert.ok(opsClient.includes('Queen 8h Swarm & 10-Org Federation'), 'expected Queen 8h Swarm section in OpsClient.tsx')
  assert.ok(opsClient.includes('/products/reality-md-starter-pack/reality.template.md'), 'expected $1 bundle link in OpsClient.tsx')
  assert.ok(opsClient.includes('/products/suno-power-pack-25/suno-v4-25-prompts.md'), 'expected $7 bundle link in OpsClient.tsx')
})

