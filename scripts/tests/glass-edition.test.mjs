import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { registerHooks } from 'node:module'

const root = new URL('../../', import.meta.url)
registerHooks({
  resolve(specifier, context, next) {
    if (specifier.startsWith('@/')) {
      const path = specifier.slice(2)
      return { url: new URL(path.endsWith('.json') ? path : path + '.ts', root).href, shortCircuit: true }
    }
    if (specifier === '../product-fulfillment') return next('../product-fulfillment.ts', context)
    return next(specifier, context)
  },
  load(url, context, next) {
    if (url === new URL('data/products.json', root).href) {
      return { format: 'module', source: 'export default ' + readFileSync(new URL(url), 'utf8'), shortCircuit: true }
    }
    return next(url, context)
  },
})
const { glassPublicManifest, glassManifestSchema, glassCompatibility, glassSandboxInstallationPlan } = await import('../../lib/commerce/glass-edition.ts')
const { GET } = await import('../../app/api/products/aurora-ui-kit/essential/manifest/route.ts')
const { GET: getSchema } = await import('../../app/api/products/aurora-ui-kit/essential/manifest/schema/route.ts')
const products = JSON.parse(readFileSync(new URL('data/products.json', root), 'utf8'))
const manifest = glassPublicManifest(products)
const args = { schema: 'starlight.glass.plan-request.v1', sessionId: 'cs_test_glass', runtime: manifest.compatibility.testedConsumer }
const release = {
  productId: 'aurora-ui-kit', edition: 'essential', sourceSha: manifest.release.sourceRevision,
  artifactId: manifest.assets[0].id, artifactSha256: manifest.assets[0].sha256, artifactBytes: manifest.assets[0].bytes,
  priceId: 'price_glass_fixture', amount: 7900, currency: 'eur',
  termsScope: 'sandbox-rehearsal-only', termsVersion: manifest.license.draft.version, termsSha256: manifest.license.draft.sha256,
}
function fixture() {
  const principal = { scope: 'personal', tenantId: 'alice', subjectId: 'alice' }
  const receipt = { source: 'human-inspection', subjectId: 'alice', tenantId: 'alice', sessionId: args.sessionId,
    artifactSha256: release.artifactSha256, inspectedAt: '2026-01-02T00:00:00.000Z' }
  const entitlement = { ...release, subjectId: 'alice', sessionId: args.sessionId, paymentIntent: 'pi_fixture',
    acceptedAt: '2026-01-01T00:00:00.000Z', state: 'active' }
  const calls = []
  return { principal, receipt, entitlement, calls, host: { products, release: { ...release },
    principal: async () => principal,
    inspection: async (order, owner) => { calls.push(['receipt', order, owner]); return receipt },
    ledger: { entitlement: async (order, owner) => { calls.push(['ledger', order, owner]); return entitlement } },
  } }
}
const denied = { ok: false, reason: 'plan-unavailable' }

test('public HTTP response follows the strict schema and only publishes the inspected candidate', async () => {
  const response = GET()
  assert.equal(response.status, 200)
  assert.match(response.headers.get('link'), /rel="describedby"/)
  assert.deepEqual(await response.json(), manifest)
  assert.match((await getSchema().json()).$schema, /2020-12/)
  assert.equal(manifest.commerce.checkoutEnabled, false)
  assert.equal(manifest.license.operativeGrant, null)
  assert.equal(glassPublicManifest([]), null)
  assert.equal(glassPublicManifest([...products, products.find(p => p.id === 'aurora-ui-kit')]), null)
  for (const added of [{ subjectId: 'alice' }, { ...manifest.capabilities, purchase: true }]) {
    assert.equal(glassManifestSchema.safeParse({ ...manifest, capabilities: added }).success, false)
  }
})

test('runtime reports only the independently observed tuple as tested', () => {
  assert.equal(glassCompatibility(args.runtime), 'tested')
  for (const change of [{ react: '18.3.1' }, { reactDom: '20.0.0' }, { node: '22.17.9' }]) {
    assert.equal(glassCompatibility({ ...args.runtime, ...change }), 'outside-declaration')
  }
  for (const change of [{ node: '22.18.0' }, { vite: '9.0.0' }, { react: '19.3.1-beta' }, { authorize: true }]) {
    assert.equal(glassCompatibility({ ...args.runtime, ...change }), 'unverified')
  }
})

test('human-inspected active test entitlement yields only a non-executable rehearsal', async () => {
  const { host, calls } = fixture()
  const plan = await glassSandboxInstallationPlan(args, host)
  assert.equal(plan.ok, true)
  assert.equal(plan.executable, false)
  assert.equal(plan.commercialGrant, null)
  assert.equal(plan.inspectedSha256, manifest.assets[0].sha256)
  assert.deepEqual(calls, [['receipt', args.sessionId, 'alice'], ['ledger', args.sessionId, 'alice']])
  assert.doesNotMatch(JSON.stringify(plan), /alice|cs_test|pi_fixture|price_glass|npm install|https?:/)
})

test('caller identity claims, wrong scope, missing or forged inspection and stale acceptance fail closed', async () => {
  for (const [which, patch] of [
    ['principal', { scope: 'organization' }], ['principal', { tenantId: 'bob' }], ['principal', { tenantId: undefined, subjectId: undefined }],
    ['receipt', { source: 'agent' }], ['receipt', { tenantId: 'bob' }], ['receipt', { subjectId: 'bob' }],
    ['receipt', { sessionId: 'cs_test_other' }], ['receipt', { artifactSha256: '0'.repeat(64) }],
    ['receipt', { inspectedAt: '2099-01-01T00:00:00.000Z' }], ['receipt', { inspectedAt: '2025-01-01T00:00:00.000Z' }],
    ['entitlement', { subjectId: 'bob' }], ['entitlement', { sessionId: 'cs_test_other' }], ['entitlement', { state: 'revoked' }],
    ['entitlement', { paymentIntent: null }], ['entitlement', { acceptedAt: '' }], ['entitlement', { acceptedAt: '2099-01-01T00:00:00.000Z' }],
  ]) {
    const f = fixture()
    Object.assign(f[which], patch)
    assert.deepEqual(await glassSandboxInstallationPlan(args, f.host), denied)
  }
  const { host } = fixture()
  for (const patch of [{ subjectId: 'alice' }, { receipt: {} }, { schema: 'v2' }, { sessionId: 'cs_live_x' },
    { runtime: { ...args.runtime, react: '18.3.1' } }]) {
    assert.deepEqual(await glassSandboxInstallationPlan({ ...args, ...patch }, host), denied)
  }
  for (const patch of [{ principal: async () => null }, { inspection: async () => null }, { ledger: { entitlement: async () => null } },
    { ledger: { entitlement: async () => { throw Error('sensitive infrastructure error') } } }]) {
    assert.deepEqual(await glassSandboxInstallationPlan(args, { ...host, ...patch }), denied)
  }
})

test('grant is bound to the pinned release, exact order/terms and provider price across all fields', async () => {
  for (const [field, value] of Object.entries(release)) {
    const f = fixture()
    f.entitlement[field] = typeof value === 'number' ? value + 1 : value + '-different'
    assert.deepEqual(await glassSandboxInstallationPlan(args, f.host), denied)
    if (field !== 'priceId') {
      f.host.release[field] = f.entitlement[field]
      assert.deepEqual(await glassSandboxInstallationPlan(args, f.host), denied)
    }
  }
})

test('checked design archive and terms bytes match the immutable public projection',
  { skip: !process.env.GLASS_ARCHIVE || !process.env.GLASS_DRAFT_TERMS }, () => {
    const bytes = readFileSync(process.env.GLASS_ARCHIVE)
    const hash = input => createHash('sha256').update(input).digest('hex')
    assert.equal(bytes.length, manifest.assets[0].bytes)
    assert.equal(hash(bytes), manifest.assets[0].sha256)
    assert.equal(hash(readFileSync(process.env.GLASS_DRAFT_TERMS)), manifest.license.draft.sha256)
  })
