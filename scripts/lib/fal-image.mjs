/**
 * scripts/lib/fal-image.mjs
 *
 * The batch / cheap-volume lane of the gen layer (lib/gen/backends.ts → id "fal").
 * fal.ai is pay-per-use, 30–80% under Higgsfield credits on video — the economical
 * path for the 12k catalog and bulk B-roll. Mirrors the nb-image.mjs surface so the
 * gen router treats it as one more backend.
 *
 * Requires FAL_KEY in process.env or a .env(.local). Get one at fal.ai/dashboard/keys.
 *
 * Usage:
 *   import { generateFal } from './lib/fal-image.mjs'
 *   await generateFal({ prompt, model: 'fal-ai/flux/dev', outputPath, imageSize: 'landscape_16_9' })
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { homedir } from 'node:os'

const ENV_KEY_NAMES = ['FAL_KEY', 'FAL_API_KEY']
const ENV_FILE_CANDIDATES = [
  resolve(process.cwd(), '.env.local'),
  resolve(process.cwd(), '.env'),
  resolve(homedir(), 'Arcanea', '.env.local'),
]

function loadKey() {
  for (const name of ENV_KEY_NAMES) {
    if (process.env[name]) return { key: process.env[name], source: `process.env.${name}` }
  }
  for (const f of ENV_FILE_CANDIDATES) {
    if (!existsSync(f)) continue
    const content = readFileSync(f, 'utf8')
    for (const name of ENV_KEY_NAMES) {
      const m = content.match(new RegExp(`^\\s*${name}\\s*=\\s*(.+)$`, 'm'))
      if (m) return { key: m[1].trim().replace(/^["']|["']$/g, ''), source: f }
    }
  }
  return { key: null, source: null }
}

const MIME_TO_EXT = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp' }

/**
 * Generate via the fal.ai queue API and write the first image to disk.
 *
 * @param {object} opts
 * @param {string} opts.prompt
 * @param {string} opts.outputPath        absolute target; extension derived from response
 * @param {string} [opts.model='fal-ai/flux/dev']
 * @param {string} [opts.imageSize='landscape_16_9']  fal size enum or {width,height}
 * @param {string} [opts.negativePrompt]
 * @param {boolean} [opts.verbose=true]
 * @returns {Promise<{ path: string, model: string, source: string }>}
 */
export async function generateFal(opts) {
  const {
    prompt,
    outputPath,
    model = 'fal-ai/flux/dev',
    imageSize = 'landscape_16_9',
    negativePrompt,
    verbose = true,
  } = opts

  if (!prompt) throw new Error('generateFal: prompt is required')
  if (!outputPath) throw new Error('generateFal: outputPath is required')

  const { key, source } = loadKey()
  if (!key) {
    throw new Error(
      'generateFal: no FAL_KEY found.\n' +
        '  Set FAL_KEY in process.env or .env.local (get one at fal.ai/dashboard/keys).',
    )
  }
  if (verbose) console.error(`✓ FAL key from: ${source}`)

  const res = await fetch(`https://fal.run/${model}`, {
    method: 'POST',
    headers: { Authorization: `Key ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt,
      image_size: imageSize,
      ...(negativePrompt ? { negative_prompt: negativePrompt } : {}),
    }),
  })

  const text = await res.text()
  if (!res.ok) throw new Error(`generateFal: ${res.status} — ${text.slice(0, 500)}`)

  let data
  try {
    data = JSON.parse(text)
  } catch {
    throw new Error('generateFal: non-JSON response from fal.ai')
  }

  const image = data.images?.[0]
  if (!image?.url) {
    throw new Error('generateFal: response had no image url. ' + JSON.stringify(data).slice(0, 500))
  }

  const imgRes = await fetch(image.url)
  const buffer = Buffer.from(await imgRes.arrayBuffer())
  const mime = image.content_type || imgRes.headers.get('content-type') || 'image/png'
  const ext = MIME_TO_EXT[mime] || mime.split('/')[1] || 'png'
  const finalPath = outputPath.replace(/\.[a-z]+$/i, '') + '.' + ext

  const dir = dirname(finalPath)
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
  writeFileSync(finalPath, buffer)
  if (verbose) console.error(`✓ saved: ${finalPath} (${buffer.length} bytes, ${mime})`)

  return { path: finalPath, model, source }
}
