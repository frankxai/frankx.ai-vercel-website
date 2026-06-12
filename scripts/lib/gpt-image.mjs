/**
 * scripts/lib/gpt-image.mjs
 *
 * The alt-image lane of the gen layer (lib/gen/backends.ts → id "gpt-image-2").
 * Routes through OpenRouter using the machine-global OPENROUTER_API_KEY, so no new
 * subscription. A second aesthetic read when InfoGenius output feels off-lane, and
 * strong text-in-image rendering. Mirrors the nb-image.mjs surface.
 *
 * Usage:
 *   import { generateGptImage } from './lib/gpt-image.mjs'
 *   await generateGptImage({ prompt, outputPath, size: '1024x1024' })
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { homedir } from 'node:os'

const ENV_KEY_NAMES = ['OPENROUTER_API_KEY', 'OPENAI_API_KEY']
const ENV_FILE_CANDIDATES = [
  resolve(process.cwd(), '.env.local'),
  resolve(process.cwd(), '.env'),
  resolve(homedir(), 'Arcanea', '.env.local'),
]

function loadKey() {
  for (const name of ENV_KEY_NAMES) {
    if (process.env[name]) {
      const base = name === 'OPENAI_API_KEY' ? 'https://api.openai.com/v1' : 'https://openrouter.ai/api/v1'
      return { key: process.env[name], base, source: `process.env.${name}` }
    }
  }
  for (const f of ENV_FILE_CANDIDATES) {
    if (!existsSync(f)) continue
    const content = readFileSync(f, 'utf8')
    for (const name of ENV_KEY_NAMES) {
      const m = content.match(new RegExp(`^\\s*${name}\\s*=\\s*(.+)$`, 'm'))
      if (m) {
        const base = name === 'OPENAI_API_KEY' ? 'https://api.openai.com/v1' : 'https://openrouter.ai/api/v1'
        return { key: m[1].trim().replace(/^["']|["']$/g, ''), base, source: f }
      }
    }
  }
  return { key: null, base: null, source: null }
}

/**
 * Generate via the OpenAI-compatible images endpoint (OpenRouter or OpenAI) and
 * write the result to disk.
 *
 * @param {object} opts
 * @param {string} opts.prompt
 * @param {string} opts.outputPath
 * @param {string} [opts.model='openai/gpt-image-1']  use 'gpt-image-1' for direct OpenAI
 * @param {string} [opts.size='1024x1024']  '1024x1024' | '1536x1024' | '1024x1536'
 * @param {boolean} [opts.verbose=true]
 * @returns {Promise<{ path: string, model: string, source: string }>}
 */
export async function generateGptImage(opts) {
  const { prompt, outputPath, model = 'openai/gpt-image-1', size = '1024x1024', verbose = true } = opts

  if (!prompt) throw new Error('generateGptImage: prompt is required')
  if (!outputPath) throw new Error('generateGptImage: outputPath is required')

  const { key, base, source } = loadKey()
  if (!key) {
    throw new Error(
      'generateGptImage: no OPENROUTER_API_KEY / OPENAI_API_KEY found.\n' +
        '  The machine-global OPENROUTER_API_KEY is the default route per ~/.claude/CLAUDE.md.',
    )
  }
  if (verbose) console.error(`✓ key from: ${source} → ${base}`)

  const res = await fetch(`${base}/images/generations`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, prompt, size, n: 1 }),
  })

  const text = await res.text()
  if (!res.ok) throw new Error(`generateGptImage: ${res.status} — ${text.slice(0, 500)}`)

  let data
  try {
    data = JSON.parse(text)
  } catch {
    throw new Error('generateGptImage: non-JSON response')
  }

  const item = data.data?.[0]
  let buffer
  let ext = 'png'
  if (item?.b64_json) {
    buffer = Buffer.from(item.b64_json, 'base64')
  } else if (item?.url) {
    const imgRes = await fetch(item.url)
    buffer = Buffer.from(await imgRes.arrayBuffer())
    const mime = imgRes.headers.get('content-type') || 'image/png'
    ext = mime.split('/')[1] || 'png'
  } else {
    throw new Error('generateGptImage: response had no image. ' + JSON.stringify(data).slice(0, 400))
  }

  const finalPath = outputPath.replace(/\.[a-z]+$/i, '') + '.' + ext
  const dir = dirname(finalPath)
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
  writeFileSync(finalPath, buffer)
  if (verbose) console.error(`✓ saved: ${finalPath} (${buffer.length} bytes)`)

  return { path: finalPath, model, source }
}
