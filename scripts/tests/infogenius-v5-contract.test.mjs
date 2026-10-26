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

test('resolveProviderCredentials auto-detects Vercel AI Gateway, OpenRouter, and Google explicit keys', () => {
  const vCred = resolveProviderCredentials({ explicitKey: 'vck_test_vercel_gateway_token' })
  assert.equal(vCred.provider, 'vercel')

  const orCred = resolveProviderCredentials({ explicitKey: 'sk-or-v1-test-token' })
  assert.equal(orCred.provider, 'openrouter')

  const gCred = resolveProviderCredentials({ explicitKey: 'test-google-token' })
  assert.equal(gCred.provider, 'google')
  assert.ok(MODELS.openrouterResearch.includes(':online'))
  assert.equal(MODELS.vercelGatewayResearch, 'perplexity/sonar')
})

test('Platform route /api/byok/infogenius, Multi-Tenant Credit Engine, Polar Webhook, and InfoGeniusStudioWorkbench exist and contain no hardcoded keys', () => {
  const routePath = path.join(repoRoot, 'app', 'api', 'byok', 'infogenius', 'route.ts')
  const polarRoutePath = path.join(repoRoot, 'app', 'api', 'checkout', 'polar', 'route.ts')
  const polarWebhookPath = path.join(repoRoot, 'app', 'api', 'webhooks', 'polar', 'route.ts')
  const tenantCreditsPath = path.join(repoRoot, 'lib', 'infogenius', 'tenant-credits.ts')
  const workbenchPath = path.join(
    repoRoot,
    'components',
    'infogenius',
    'InfoGeniusStudioWorkbench.tsx'
  )
  assert.ok(existsSync(routePath))
  assert.ok(existsSync(polarRoutePath))
  assert.ok(existsSync(polarWebhookPath))
  assert.ok(existsSync(tenantCreditsPath))
  assert.ok(existsSync(workbenchPath))

  const routeSource = readFileSync(routePath, 'utf8')
  const polarSource = readFileSync(polarRoutePath, 'utf8')
  const webhookSource = readFileSync(polarWebhookPath, 'utf8')
  const creditsSource = readFileSync(tenantCreditsPath, 'utf8')
  const workbenchSource = readFileSync(workbenchPath, 'utf8')

  assert.doesNotMatch(routeSource, /AIza[0-9A-Za-z_-]{20,}/)
  assert.doesNotMatch(workbenchSource, /AIza[0-9A-Za-z_-]{20,}/)
  assert.match(routeSource, /google\/gemini-2\.5-flash:online/)
  assert.match(routeSource, /ai-gateway\.vercel\.sh/)
  assert.match(routeSource, /gemini-2\.5-flash-preview-tts/)
  assert.match(routeSource, /decompose-article/)
  assert.match(routeSource, /consumeTenantCredits/)
  assert.match(creditsSource, /UPSTASH_REDIS_REST_URL/)
  assert.match(creditsSource, /infogenius-credits-100/)
  assert.match(creditsSource, /infogenius-team-1000/)
  assert.match(webhookSource, /POLAR_WEBHOOK_SECRET/)
  assert.match(webhookSource, /creditTenantWallet/)
  assert.match(workbenchSource, /Article \/ Markdown → 5-Slide Pack/)
  assert.match(workbenchSource, /Custom Brand Style Builder/)
  assert.match(workbenchSource, /Multi-Tenant Workspace Credit Wallet/)
  assert.match(polarSource, /POLAR_PRODUCT_INFOGENIUS_PRO/)
  assert.match(polarSource, /POLAR_PRODUCT_INFOGENIUS_CREDITS_100/)
  assert.match(polarSource, /POLAR_PRODUCT_INFOGENIUS_TEAM_1000/)
})

test('Portable plugin package and live Vercel AI Gateway 2K infographic + provenance sidecar exist', () => {
  const pluginJsonPath = path.join(
    repoRoot,
    'plugins',
    'infogenius-visual-os',
    '.claude-plugin',
    'plugin.json'
  )
  const mcpJsonPath = path.join(repoRoot, 'plugins', 'infogenius-visual-os', '.mcp.json')
  const skillMdPath = path.join(
    repoRoot,
    'plugins',
    'infogenius-visual-os',
    'skills',
    'infogenius-v5',
    'SKILL.md'
  )
  assert.ok(existsSync(pluginJsonPath))
  assert.ok(existsSync(mcpJsonPath))
  assert.ok(existsSync(skillMdPath))

  const livePngPath = path.join(
    repoRoot,
    'public',
    'images',
    'blog',
    'generated',
    'infogenius-glassmorphic-sovereign-multi-tenant-ai-gateway.png'
  )
  const liveProvenancePath = `${livePngPath}.vis.provenance.json`
  assert.ok(existsSync(livePngPath))
  assert.ok(existsSync(liveProvenancePath))

  const prov = JSON.parse(readFileSync(liveProvenancePath, 'utf8'))
  assert.equal(prov.research.model, 'perplexity/sonar')
  assert.equal(prov.image.model, 'google/gemini-3-pro-image')
  assert.equal(prov.style, 'community/glassmorphic')

  const luxuryPngPath = path.join(
    repoRoot,
    'public',
    'images',
    'blog',
    'generated',
    'infogenius-premium-agentic-creator-os-6-layer.png'
  )
  assert.ok(existsSync(luxuryPngPath))
  assert.ok(existsSync(`${luxuryPngPath}.vis.provenance.json`))

  const pagePath = path.join(repoRoot, 'app', 'infogenius', 'page.tsx')
  const pageSource = readFileSync(pagePath, 'utf8')
  assert.match(pageSource, /End-to-End Workflows/)
  assert.match(pageSource, /Offer · Cost · Value · Outputs/)
  assert.match(pageSource, /\$0\.70 per 2K Infographic/)
  assert.match(pageSource, /infogenius-premium-agentic-creator-os-6-layer\.png/)
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
