import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import {
  MODELS,
  STYLES_V5,
  AUDIENCES_V5,
  composeInfographicPrompt,
  resolveProviderCredentials,
} from '../lib/nb-image.mjs'
import { getPreset, loadPresets } from '../image-ops/preset-loader.mjs'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')

test('InfoGenius v5.2 exports all 10 styles including glassmorphic and premium', () => {
  const keys = Object.keys(STYLES_V5)
  assert.equal(keys.length, 10)
  assert.ok(STYLES_V5.glassmorphic.instruction.includes('#0b0e14'))
  assert.ok(STYLES_V5.premium.instruction.includes('Apple meets Dior meets DeepMind'))
  assert.equal(Object.keys(AUDIENCES_V5).length, 4)
})

test('Preset library v2026-04-25 resolves v5.2 shorthand aliases and brand presets', async () => {
  const data = await loadPresets()
  assert.ok(data.presets.length >= 18)

  const glass = await getPreset('glassmorphic')
  assert.equal(glass.key, 'community/glassmorphic')

  const prem = await getPreset('premium')
  assert.equal(prem.key, 'community/premium')

  const davinci = await getPreset('davinci')
  assert.equal(davinci.key, 'frankx/da-vinci-technical')
})

test('composeInfographicPrompt passes the 80/20 design-thinking gate', () => {
  const prompt = composeInfographicPrompt({
    topic: 'Sovereign AI Swarm Architecture',
    research: {
      facts: ['Fact 1: Independent verifier gate', 'Fact 2: Event-sourced memory'],
      visualElements: ['Central crystal node diagram'],
      labels: ['Coordinator', 'Verifier'],
    },
    styleName: 'glassmorphic',
    audience: 'expert',
    aspectRatio: '16:9',
    label: 'SOVEREIGN SWARM',
  })

  assert.match(prompt, /## CONCEPT/)
  assert.match(prompt, /VISUAL STYLE:/)
  assert.match(prompt, /Fact 1: Independent verifier gate/)
  assert.match(prompt, /TITLE: Render "SOVEREIGN SWARM"/)
})

test('resolveProviderCredentials auto-detects OpenRouter vs Google explicit keys', () => {
  const orCred = resolveProviderCredentials({ explicitKey: 'sk-or-v1-test-token' })
  assert.equal(orCred.provider, 'openrouter')

  const gCred = resolveProviderCredentials({ explicitKey: 'test-google-token' })
  assert.equal(gCred.provider, 'google')
  assert.ok(MODELS.openrouterResearch.includes(':online'))
})

test('Platform route /api/byok/infogenius and InfoGeniusStudioWorkbench exist and contain no hardcoded keys', () => {
  const routePath = path.join(repoRoot, 'app', 'api', 'byok', 'infogenius', 'route.ts')
  const workbenchPath = path.join(
    repoRoot,
    'components',
    'infogenius',
    'InfoGeniusStudioWorkbench.tsx'
  )
  assert.ok(existsSync(routePath))
  assert.ok(existsSync(workbenchPath))

  const routeSource = readFileSync(routePath, 'utf8')
  const workbenchSource = readFileSync(workbenchPath, 'utf8')

  assert.doesNotMatch(routeSource, /AIza[0-9A-Za-z_-]{20,}/)
  assert.doesNotMatch(workbenchSource, /AIza[0-9A-Za-z_-]{20,}/)
  assert.match(routeSource, /google\/gemini-2\.5-flash:online/)
  assert.match(routeSource, /gemini-2\.5-flash-preview-tts/)
  assert.match(routeSource, /decompose-article/)
  assert.match(workbenchSource, /Article \/ Markdown → 5-Slide Pack/)
  assert.match(workbenchSource, /Custom Brand Style Builder/)
})

test('InfoGenius Pro Pack SKU is staged in products.json and waitlist-intents.ts', () => {
  const productsPath = path.join(repoRoot, 'data', 'products.json')
  const intentsPath = path.join(repoRoot, 'lib', 'diagnostic', 'waitlist-intents.ts')
  const cliPath = path.join(repoRoot, 'scripts', 'infogenius.mjs')

  const products = JSON.parse(readFileSync(productsPath, 'utf8'))
  const infogeniusProduct = products.find((p) => p.id === 'infogenius-pro')
  assert.ok(infogeniusProduct, 'infogenius-pro product SKU should exist in data/products.json')
  assert.equal(infogeniusProduct.offer.ctaPrimaryHref, '/infogenius#studio')
  assert.equal(infogeniusProduct.offer.ctaSecondaryHref, '/waitlist?intent=infogenius-pro')

  const intentsSource = readFileSync(intentsPath, 'utf8')
  assert.match(intentsSource, /'infogenius-pro'/)

  const cliSource = readFileSync(cliPath, 'utf8')
  assert.match(cliSource, /--from-file/)
  assert.match(cliSource, /decomposeMarkdownToSlides/)
})
