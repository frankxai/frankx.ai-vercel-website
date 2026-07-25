import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import test from 'node:test'

const artifacts = [
  {
    route: '/ai-architect-academy',
    title: 'AI Architect Academy | Enterprise AI Training | FrankX',
    canonical: 'https://frankx.ai/ai-architect-academy',
    absoluteFragment: 'absoluteTitle:!0',
  },
  {
    route: '/ai-architecture',
    title: 'AI Architecture Field Guide | Vercel, Railway & GCP | FrankX',
    canonical: 'https://frankx.ai/ai-architecture',
    absoluteFragment: 'absoluteTitle:!0',
  },
  {
    route: '/ai-ops',
    title: 'AI Operations Research Hub | FrankX.AI',
    canonical: 'https://frankx.ai/ai-ops',
    absoluteFragment: 'title:{absolute:',
  },
  {
    route: '/ai-ops/models-2026',
    title: 'AI Models 2026 | Frontier Model Benchmarks | FrankX',
    canonical: 'https://frankx.ai/ai-ops/models-2026',
    absoluteFragment: 'absoluteTitle:!0',
  },
  {
    route: '/tools',
    title: 'Tools | ROI Calculator, Strategy Canvas & More | FrankX',
    canonical: 'https://frankx.ai/tools',
    absoluteFragment: 'absoluteTitle:!0',
  },
  {
    route: '/skills',
    title: 'Skills | AI Agent Capabilities & Skill Library | FrankX',
    canonical: 'https://frankx.ai/skills',
    absoluteFragment: 'absoluteTitle:!0',
  },
  {
    route: '/vault',
    title: 'Visual Vault | AI Asset Library | FrankX',
    canonical: 'https://frankx.ai/vault',
    absoluteFragment: 'title:{absolute:',
  },
  {
    route: '/resources',
    title: 'Resources | Templates, Guides & Tools | FrankX',
    canonical: 'https://frankx.ai/resources',
    absoluteFragment: 'absoluteTitle:!0',
  },
  {
    route: '/coaching',
    title: 'AI Coaching | 1-on-1 Architecture & Creator Mentorship | FrankX',
    canonical: 'https://frankx.ai/coaching',
    absoluteFragment: 'absoluteTitle:!0',
  },
  {
    route: '/shop',
    title: 'Shop — Templates, Tools & Digital Products | FrankX',
    canonical: 'https://frankx.ai/shop',
    absoluteFragment: 'title:{absolute:',
  },
  {
    route: '/community',
    title: 'Community | AI Architects & Creators Network | FrankX',
    canonical: 'https://frankx.ai/community',
    absoluteFragment: 'absoluteTitle:!0',
  },
  {
    route: '/research',
    title: 'Research Intelligence Hub | FrankX.AI',
    canonical: 'https://frankx.ai/research',
    absoluteFragment: 'title:{absolute:',
  },
]

const findCompiledMetadataArtifact = async (expected) => {
  const { route, title, canonical, absoluteFragment } = expected
  const nftUrl = new URL(
    `../../.next/server/app${route === '/' ? '/page' : route + '/page'}.js.nft.json`,
    import.meta.url,
  )
  const nft = JSON.parse(await readFile(nftUrl, 'utf8'))
  const candidateFiles = nft.files.filter(
    (file) => file.includes('/chunks/ssr/') && file.endsWith('.js'),
  )

  for (const file of candidateFiles) {
    const compiled = await readFile(resolve(dirname(nftUrl.pathname), file), 'utf8')
    const hasCanonical =
      compiled.includes(JSON.stringify(canonical)) ||
      compiled.includes(JSON.stringify(new URL(canonical).pathname))

    if (
      compiled.includes(JSON.stringify(title)) &&
      compiled.includes(absoluteFragment) &&
      hasCanonical
    ) {
      return compiled
    }
  }

  assert.fail(`${route} must retain one compiled title/canonical metadata artifact`)
}

test('compiled route artifacts retain absolute branded titles and route-owned canonicals', async () => {
  for (const expected of artifacts) {
    const compiledLayout = await findCompiledMetadataArtifact(expected)

    assert.ok(
      compiledLayout.includes(JSON.stringify(expected.title)),
      `${expected.route} lost its approved title during compilation`,
    )
    assert.ok(
      compiledLayout.includes(expected.absoluteFragment),
      `${expected.route} must compile an explicit absolute-title boundary`,
    )
    assert.ok(
      compiledLayout.includes(JSON.stringify(expected.canonical)) ||
        compiledLayout.includes(JSON.stringify(new URL(expected.canonical).pathname)),
      `${expected.route} lost its route-owned canonical input during compilation`,
    )
  }
})
