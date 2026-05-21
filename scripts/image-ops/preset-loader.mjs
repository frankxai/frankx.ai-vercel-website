import { readFile } from 'node:fs/promises'
import path from 'node:path'

const ROOT = process.cwd()
const DEFAULT_PRESETS_PATH = path.join(ROOT, 'data', 'ai-ops', 'infogenius-presets.json')

let cached = null

export async function loadPresets(presetsPath = DEFAULT_PRESETS_PATH) {
  if (cached && cached.path === presetsPath) return cached.data
  const raw = await readFile(presetsPath, 'utf8')
  const data = JSON.parse(raw)
  cached = { path: presetsPath, data }
  return data
}

export async function getPreset(key, presetsPath) {
  const data = await loadPresets(presetsPath)
  const preset = data.presets.find((p) => p.key === key)
  if (!preset) {
    const known = data.presets.map((p) => p.key).join(', ')
    throw new Error(`Unknown preset "${key}". Known: ${known}`)
  }
  return preset
}

export async function listByNamespace(namespace, presetsPath) {
  const data = await loadPresets(presetsPath)
  return data.presets.filter((p) => p.namespace === namespace)
}

export async function listAllKeys(presetsPath) {
  const data = await loadPresets(presetsPath)
  return data.presets.map((p) => p.key)
}

export function buildPromptFromPreset(preset, { topic, facts = [], aspectOverride } = {}) {
  const aspect = aspectOverride || preset.defaultAspect
  const factsBlock = facts.length
    ? `\n\nINCLUDE FACTS:\n${facts.map((f, i) => `${i + 1}. ${f}`).join('\n')}`
    : ''

  return [
    `Create a ${aspect} ${preset.name.toLowerCase()} infographic about ${topic}.`,
    '',
    `VISUAL STYLE: ${preset.promptFragment}`,
    '',
    preset.palette?.length ? `BRAND PALETTE: ${preset.palette.join(', ')}` : '',
    preset.composition ? `COMPOSITION: ${preset.composition}` : '',
    factsBlock,
    '',
    'Text labels should be large and legible. Premium quality.',
  ].filter(Boolean).join('\n')
}
