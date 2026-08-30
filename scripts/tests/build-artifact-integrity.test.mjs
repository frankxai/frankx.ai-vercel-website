import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { listEngagements } from '../../content/work/index.ts'

const readBuildJson = async (path) =>
  JSON.parse(await readFile(new URL(`../../.next/${path}`, import.meta.url), 'utf8'))

test('live LLM Hub pricing surfaces are absent from the prerender manifest', async () => {
  const manifest = await readBuildJson('prerender-manifest.json')
  const emittedRoutes = [
    ...Object.keys(manifest.routes ?? {}),
    ...Object.keys(manifest.dynamicRoutes ?? {}),
  ]
  const livePricingRoutes = emittedRoutes.filter(
    (route) =>
      route === '/llm-hub' ||
      route === '/llm-hub.json' ||
      (route.startsWith('/llm-hub/') && route !== '/llm-hub/opengraph-image'),
  )

  assert.deepEqual(
    livePricingRoutes,
    [],
    `request-time pricing surfaces must not be prerendered: ${livePricingRoutes.join(', ')}`,
  )
})

test('work routes emit every public engagement and no private engagement', async () => {
  const manifest = await readBuildJson('prerender-manifest.json')
  const workRoute = manifest.dynamicRoutes?.['/work/[slug]']
  assert.ok(
    workRoute,
    'the emitted prerender manifest must describe /work/[slug]',
  )
  assert.equal(
    workRoute.fallback,
    false,
    'unknown work slugs must be rejected by the closed static parameter set',
  )

  const expectedPublicRoutes = listEngagements()
    .filter((engagement) => engagement.status !== 'private')
    .map((engagement) => `/work/${engagement.slug}`)
    .sort()
  const emittedWorkRoutes = Object.entries(manifest.routes ?? {})
    .filter(([, route]) => route.srcRoute === '/work/[slug]')
    .map(([route]) => route)
    .sort()

  assert.deepEqual(
    emittedWorkRoutes,
    expectedPublicRoutes,
    'the built route set must exactly match the public work registry',
  )
})
