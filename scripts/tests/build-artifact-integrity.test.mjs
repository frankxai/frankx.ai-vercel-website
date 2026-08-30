import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

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


test('unknown work slugs emit a route-local fallback', async () => {
  const manifest = await readBuildJson('prerender-manifest.json')
  const workRoute = manifest.dynamicRoutes?.['/work/[slug]']
  assert.ok(
    workRoute,
    'the emitted prerender manifest must describe /work/[slug]',
  )
  assert.notEqual(
    workRoute.fallback,
    false,
    'unknown work slugs must enter the route-local notFound() boundary',
  )
})
