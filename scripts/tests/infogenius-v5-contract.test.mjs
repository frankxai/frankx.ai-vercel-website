import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
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

test('InfoGenius v5.3 exports all 12 styles including living-world-hud and clean-stack-cards', () => {
  const keys = Object.keys(STYLES_V5)
  assert.equal(keys.length, 12)
  assert.ok(STYLES_V5.glassmorphic.instruction.includes('#0b0e14'))
  assert.ok(STYLES_V5.premium.instruction.includes('Apple meets Dior meets DeepMind'))
  assert.ok(STYLES_V5['living-world-hud'].instruction.includes('sapphire-and-violet'))
  assert.ok(STYLES_V5['clean-stack-cards'].instruction.includes('3-tier vertical'))
  assert.equal(Object.keys(AUDIENCES_V5).length, 4)
})

test('Preset library resolves v5.3 shorthand aliases and brand presets', async () => {
  const data = await loadPresets()
  assert.ok(data.presets.length >= 20)

  const glass = await getPreset('glassmorphic')
  assert.equal(glass.key, 'community/glassmorphic')

  const prem = await getPreset('premium')
  assert.equal(prem.key, 'community/premium')

  const livingWorld = await getPreset('living-world-hud')
  assert.equal(livingWorld.key, 'starlight/living-world-hud')

  const cleanStack = await getPreset('clean-stack-cards')
  assert.equal(cleanStack.key, 'frankx/clean-stack-cards')

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
    styleName: 'living-world-hud',
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

test('Platform route /api/byok/infogenius and InfoGeniusStudioWorkbench are strictly BYOK with no server keys', () => {
  const routePath = path.join(repoRoot, 'app', 'api', 'byok', 'infogenius', 'route.ts')
  const workbenchPath = path.join(
    repoRoot,
    'components',
    'infogenius',
    'InfoGeniusStudioWorkbench.tsx',
  )
  assert.ok(existsSync(routePath))
  assert.ok(existsSync(workbenchPath))

  const routeSource = readFileSync(routePath, 'utf8')
  const workbenchSource = readFileSync(workbenchPath, 'utf8')

  assert.doesNotMatch(routeSource, /AIza[0-9A-Za-z_-]{20,}/)
  assert.doesNotMatch(routeSource, /process\.env/)
  assert.doesNotMatch(workbenchSource, /AIza[0-9A-Za-z_-]{20,}/)
  assert.match(routeSource, /google\/gemini-2\.5-flash:online/)
  assert.match(routeSource, /gemini-2\.5-flash-preview-tts/)
  assert.match(routeSource, /decompose-article/)
  assert.match(routeSource, /living-world-hud/)
  assert.match(workbenchSource, /Article \/ Markdown → 5-Slide Pack/)
  assert.match(workbenchSource, /Custom Brand Style Builder/)
})

test('Waitlist intent, diagram registry adoption, and living-world provenance sidecars are complete', () => {
  const intentsPath = path.join(repoRoot, 'lib', 'diagnostic', 'waitlist-intents.ts')
  const cliPath = path.join(repoRoot, 'scripts', 'infogenius.mjs')
  const registryPath = path.join(repoRoot, 'data', 'diagrams', 'registry.json')
  const lwDir = path.join(repoRoot, 'public', 'images', 'living-world')

  const intentsSource = readFileSync(intentsPath, 'utf8')
  assert.match(intentsSource, /'infogenius-pro'/)

  const cliSource = readFileSync(cliPath, 'utf8')
  assert.match(cliSource, /--from-file/)
  assert.match(cliSource, /decomposeMarkdownToSlides/)

  const registry = JSON.parse(readFileSync(registryPath, 'utf8'))
  assert.ok(registry.diagrams.length >= 8, 'Expected at least 8 system diagrams')
  for (const d of registry.diagrams) {
    assert.ok(
      Array.isArray(d.adoptedBy) && d.adoptedBy.length >= 1,
      `System diagram "${d.id}" should be adopted by at least 1 page/component`,
    )
  }

  const images = readdirSync(lwDir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
  assert.ok(images.length >= 6, 'Expected at least 6 enrolled living-world visual plates')
  for (const img of images) {
    const sidecarPath = path.join(lwDir, `${img}.vis.provenance.json`)
    assert.ok(existsSync(sidecarPath), `Missing provenance sidecar for ${img}`)
    const sidecar = JSON.parse(readFileSync(sidecarPath, 'utf8'))
    assert.equal(sidecar.schema, 'vis.provenance.v1')
    assert.match(sidecar.sha256, /^[a-f0-9]{64}$/)
  }
})
