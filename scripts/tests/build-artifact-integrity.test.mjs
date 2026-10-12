import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import { listPublicEngagements } from '../../content/work/index.ts'
import { researchDomains } from '../../lib/research/domains.ts'
import { publicTopicMaps } from '../../lib/research/topic-maps.public.ts'

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

test('work routes emit every public engagement and no non-public engagement', async () => {
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

  const expectedPublicRoutes = listPublicEngagements()
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

async function listClientJsUnderStatic(staticRoot) {
  const jsFiles = []
  const walk = async (dir) => {
    let entries
    try {
      entries = await readdir(dir, { withFileTypes: true })
    } catch (error) {
      if (error && error.code === 'ENOENT') return
      throw error
    }
    for (const entry of entries) {
      const fullPath = join(dir, entry.name)
      if (entry.isDirectory()) {
        await walk(fullPath)
        continue
      }
      if (entry.isFile() && entry.name.endsWith('.js')) {
        jsFiles.push(fullPath)
      }
    }
  }
  await walk(staticRoot)
  return jsFiles
}

test('research client chunks contain only the narrow topic projection', async () => {
  const expected = researchDomains
    .filter((domain) => !domain.slug.startsWith('REMOVED-') && !domain.title.startsWith('[REMOVED]'))
    .map((domain) => domain.slug)
  assert.deepEqual(publicTopicMaps.map((domain) => domain.slug), expected)
  for (const topic of publicTopicMaps) {
    assert.deepEqual(Object.keys(topic).sort(), ['category', 'color', 'icon', 'slug', 'title'])
  }

  // Next on Vercel may not emit a flat `.next/static/chunks/` directory.
  // Scan all client JS under `.next/static` (not server bundles) and fail closed
  // if the build produced no client JS at all.
  const staticRoot = fileURLToPath(new URL('../../.next/static/', import.meta.url))
  const jsFiles = await listClientJsUnderStatic(staticRoot)
  assert.ok(
    jsFiles.length > 0,
    'expected client JS under .next/static after build; found none',
  )
  const chunks = await Promise.all(jsFiles.map((file) => readFile(file, 'utf8')))
  for (const heldText of [
    'OpenAI o1 Technical Report',
    'AIME 2024 pass@1',
    'scholar.google.com/scholar?q=Frontier',
  ]) {
    assert.equal(chunks.some((chunk) => chunk.includes(heldText)), false,
      `held research text reached a client chunk: ${heldText}`)
  }
})
