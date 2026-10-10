import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const readRepoFile = (path) => readFile(new URL(`../../${path}`, import.meta.url), 'utf8')

const pages = [
  'app/products/suno-prompt-library/page.tsx',
  'app/products/creative-ai-toolkit/page.tsx',
  'app/products/creation-chronicles/page.tsx',
  'app/products/agentic-creator-os/page.tsx',
  'app/products/generative-creator-os/page.tsx',
  'app/products/visual-creation-loop/page.tsx',
  'app/products/[slug]/page.tsx',
  'app/products/vibe-os/page.tsx',
]

test('waitlist product pages do not advertise stock or a price in structured data', async () => {
  const helper = await readRepoFile('lib/seo.ts')
  assert.match(helper, /export function comingSoonProductStructuredData/)
  const helperBody = helper.slice(helper.indexOf('function comingSoonProductStructuredData'), helper.indexOf('export const robotsConfig'))
  assert.doesNotMatch(helperBody, /InStock|primaryPrice/)

  for (const page of pages) {
    const source = await readRepoFile(page)
    assert.equal(source.includes('schema.org/InStock'), false, page)
  }

  for (const page of pages.filter((entry) => entry !== 'app/products/vibe-os/page.tsx')) {
    const source = await readRepoFile(page)
    assert.equal(source.includes('offer={product.offer}'), false, page)
  }
})

test('coming soon bonuses do not render a dollar value', async () => {
  const stack = await readRepoFile('components/products/OfferStack.tsx')
  assert.match(stack, /!COMING_SOON_MODE && bonus\.value/)
})

test('vibe os does not sell a zero-dollar checkout or a missing template', async () => {
  const modules = await readRepoFile('app/products/vibe-os/components/VibeOSModules.tsx')
  assert.match(modules, /offer\.primaryPrice > 0/)
  for (const page of ['app/products/vibe-os/app/page.tsx', 'app/products/vibe-os/docs/page.tsx']) {
    const source = await readRepoFile(page)
    assert.equal(source.includes('#download'), false, page)
    assert.equal(source.toLowerCase().includes('notion template'), false, page)
  }
})
