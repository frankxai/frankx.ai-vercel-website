import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const read = (path) => readFile(new URL(`../../${path}`, import.meta.url), 'utf8')
const canonicalAlternatesPattern = (route) => {
  const canonical = `https://frankx.ai${route}`
  const escapedCanonical = canonical.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  return new RegExp(
    `alternates\\s*:\\s*\\{[^{}]*canonical\\s*:\\s*'${escapedCanonical}'`,
  )
}

const helperRoutes = [
  {
    route: '/ai-architect-academy',
    file: 'app/ai-architect-academy/layout.tsx',
    title: 'AI Architect Academy | Enterprise AI Training | FrankX',
  },
  {
    route: '/ai-architecture',
    file: 'app/ai-architecture/layout.tsx',
    title: 'AI Architecture Field Guide | Vercel, Railway & GCP | FrankX',
  },
  {
    route: '/ai-ops/models-2026',
    file: 'app/ai-ops/models-2026/layout.tsx',
    title: 'AI Models 2026 | Frontier Model Benchmarks | FrankX',
  },
  {
    route: '/tools',
    file: 'app/tools/layout.tsx',
    title: 'Tools | ROI Calculator, Strategy Canvas & More | FrankX',
  },
  {
    route: '/skills',
    file: 'app/skills/layout.tsx',
    title: 'Skills | AI Agent Capabilities & Skill Library | FrankX',
  },
  {
    route: '/resources',
    file: 'app/resources/layout.tsx',
    title: 'Resources | Templates, Guides & Tools | FrankX',
  },
  {
    route: '/coaching',
    file: 'app/coaching/layout.tsx',
    title: 'AI Coaching | 1-on-1 Architecture & Creator Mentorship | FrankX',
  },
  {
    route: '/community',
    file: 'app/community/layout.tsx',
    title: 'Community | AI Architects & Creators Network | FrankX',
  },
]

const directRoutes = [
  {
    route: '/ai-ops',
    file: 'app/ai-ops/layout.tsx',
    title: 'AI Operations Research Hub | FrankX.AI',
  },
  {
    route: '/vault',
    file: 'app/vault/page.tsx',
    title: 'Visual Vault | AI Asset Library | FrankX',
  },
  {
    route: '/shop',
    file: 'app/shop/layout.tsx',
    title: 'Shop — Templates, Tools & Digital Products | FrankX',
  },
  {
    route: '/research',
    file: 'app/research/layout.tsx',
    title: 'Research Intelligence Hub | FrankX.AI',
  },
]

test('essential branded titles bypass the root title template explicitly', async () => {
  const [rootLayout, seoHelper] = await Promise.all([
    read('app/layout.tsx'),
    read('lib/seo.ts'),
  ])

  assert.match(
    rootLayout,
    /template:\s*`%s \| \$\{siteConfig\.shortName\}`/,
    'unbranded page titles should continue to receive the root FrankX suffix',
  )
  assert.match(seoHelper, /absoluteTitle\?: boolean/)
  assert.match(
    seoHelper,
    /title:\s*absoluteTitle\s*\?\s*\{\s*absolute:\s*title\s*\}\s*:\s*title/,
  )

  for (const { route, file, title } of helperRoutes) {
    const source = await read(file)

    assert.ok(source.includes(`title: '${title}'`), `${route} must retain its approved title`)
    assert.match(
      source,
      /absoluteTitle:\s*true/,
      `${route} already contains FrankX and must not receive the root suffix again`,
    )
    assert.ok(
      source.includes(`path: '${route}'`),
      `${route} must own its matching canonical path`,
    )
  }

  for (const { route, file, title } of directRoutes) {
    const source = await read(file)

    assert.ok(
      source.includes(`title: { absolute: '${title}' }`),
      `${route} must bypass the root suffix without changing its approved title`,
    )
    assert.match(
      source,
      canonicalAlternatesPattern(route),
      `${route} must retain its exact canonical`,
    )
  }

  assert.doesNotMatch(
    "alternates: {}, openGraph: { canonical: 'https://frankx.ai/tools' }",
    canonicalAlternatesPattern('/tools'),
    'an unrelated canonical outside alternates must not satisfy the contract',
  )

  const vaultLayout = await read('app/vault/layout.tsx')
  assert.doesNotMatch(
    vaultLayout,
    /alternates:\s*\{\s*canonical:/,
    '/vault must not leak its index canonical to collection pages through the parent layout',
  )
})

test('legacy entry aliases resolve to a destination with route-owned metadata', async () => {
  const redirects = JSON.parse(await read('data/redirect-aliases.json'))

  assert.equal(redirects.aliases['/signal'], '/ai-architecture')
  assert.equal(redirects.aliases['/llm-hub'], '/ai-ops/models-2026')

  const modelMetadata = await read('app/ai-ops/models-2026/layout.tsx')
  assert.match(modelMetadata, /path:\s*'\/ai-ops\/models-2026'/)
  assert.match(modelMetadata, /absoluteTitle:\s*true/)
})
