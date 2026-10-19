import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..', '..')

test('robots.ts configures AI search crawlers and sitemap URL', async () => {
  const robotsSrc = await readFile(join(ROOT, 'app', 'robots.ts'), 'utf8')
  assert.match(robotsSrc, /GPTBot/)
  assert.match(robotsSrc, /ClaudeBot/)
  assert.match(robotsSrc, /PerplexityBot/)
  assert.match(robotsSrc, /Google-Extended/)
  assert.match(robotsSrc, /sitemap:/)
})

test('app/layout.tsx includes Google Search Console verification tag and OrganizationJsonLd', async () => {
  const layoutSrc = await readFile(join(ROOT, 'app', 'layout.tsx'), 'utf8')
  assert.match(layoutSrc, /verification:/)
  assert.match(layoutSrc, /NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION/)
  assert.match(layoutSrc, /OrganizationJsonLd/)
})

test('llms.txt and llms-full.txt route handlers exist and output valid structured content', async () => {
  const llmsSrc = await readFile(
    join(ROOT, 'app', 'llms.txt', 'route.ts'),
    'utf8',
  )
  assert.match(llmsSrc, /# FrankX/)
  assert.match(llmsSrc, /SITE_URL/)

  const llmsFullSrc = await readFile(
    join(ROOT, 'app', 'llms-full.txt', 'route.ts'),
    'utf8',
  )
  assert.match(llmsFullSrc, /GET/)
  assert(llmsFullSrc.length > 500)
})

test('observability analytics module returns valid GA4 and GSC structure', async () => {
  const ga4Module = await readFile(
    join(ROOT, 'lib', 'observability', 'google-analytics.ts'),
    'utf8',
  )
  assert.match(ga4Module, /export async function getGA4Overview/)
  assert.match(ga4Module, /export async function getGA4TopPages/)
  assert.match(ga4Module, /export async function getGA4TrafficSources/)

  const gscModule = await readFile(
    join(ROOT, 'lib', 'observability', 'google-search-console.ts'),
    'utf8',
  )
  assert.match(gscModule, /export async function getSearchPerformance/)
  assert.match(gscModule, /export async function inspectUrlIndexStatus/)
})
