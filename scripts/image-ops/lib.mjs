import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const ROOT = process.cwd()
const DEFAULT_ROUTER_PATH = path.join(ROOT, 'data', 'ai-ops', 'image-model-router.json')

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function asInt(value, fallback) {
  const n = Number.parseInt(value, 10)
  return Number.isFinite(n) ? n : fallback
}

function safeJsonParse(raw, filePath) {
  try {
    return JSON.parse(raw)
  } catch (error) {
    throw new Error(`Invalid JSON in ${filePath}: ${error.message}`)
  }
}

function ensureProvider(config, provider) {
  if (!config.providers?.[provider]) {
    const known = Object.keys(config.providers || {}).join(', ')
    throw new Error(`Unknown provider \"${provider}\". Known providers: ${known}`)
  }
}

function ensurePrompt(prompt) {
  if (!prompt || !prompt.trim()) {
    throw new Error('Missing --prompt')
  }
}

function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

function detectExtFromUrl(url) {
  const clean = url.split('?')[0]
  const ext = path.extname(clean).toLowerCase()
  if (ext === '.jpg' || ext === '.jpeg') return '.jpg'
  if (ext === '.webp') return '.webp'
  if (ext === '.gif') return '.gif'
  return '.png'
}

async function readJsonFile(filePath) {
  const raw = await readFile(filePath, 'utf8')
  return safeJsonParse(raw, filePath)
}

function requireEnv(name) {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing ${name}. Export it in shell env before running this command.`)
  }
  return value
}

function requireFirstEnv(names) {
  for (const name of names) {
    if (process.env[name]) return process.env[name]
  }
  throw new Error(`Missing one of: ${names.join(', ')}. Export at least one in shell env.`)
}

async function parseErrorResponse(res) {
  const text = await res.text()
  try {
    const parsed = JSON.parse(text)
    return parsed.error?.message || parsed.message || text
  } catch {
    return text
  }
}

async function jsonPost(url, { headers = {}, body }) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const message = await parseErrorResponse(res)
    throw new Error(`${url} -> ${res.status}: ${message}`)
  }

  return res.json()
}

async function fetchJson(url, headers = {}) {
  const res = await fetch(url, { headers })
  if (!res.ok) {
    const message = await parseErrorResponse(res)
    throw new Error(`${url} -> ${res.status}: ${message}`)
  }
  return res.json()
}

async function saveBase64Image(base64Data, outPath) {
  await mkdir(path.dirname(outPath), { recursive: true })
  await writeFile(outPath, Buffer.from(base64Data, 'base64'))
  return outPath
}

async function saveUrlImage(url, outPath) {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Failed downloading image ${url}: ${res.status}`)
  }
  const bytes = Buffer.from(await res.arrayBuffer())
  await mkdir(path.dirname(outPath), { recursive: true })
  await writeFile(outPath, bytes)
  return outPath
}

function resolveOutputPath({ outputDir, output, provider, prompt, index = 0, extension = '.png' }) {
  if (output) {
    // Always trust the mime-derived extension; strip any user-provided extension to avoid mismatches
    // (per feedback_image_gen_mime.md — never let .png stick to a JPEG body)
    const absPath = path.isAbsolute(output) ? output : path.join(ROOT, output)
    const dir = path.dirname(absPath)
    const baseNoExt = path.basename(absPath, path.extname(absPath))
    return path.join(dir, `${baseNoExt}${extension}`)
  }

  const dir = outputDir ? (path.isAbsolute(outputDir) ? outputDir : path.join(ROOT, outputDir)) : path.join(ROOT, 'public', 'images', 'generated', provider)
  const base = `${new Date().toISOString().replace(/[:.]/g, '-')}-${slugify(prompt).slice(0, 36) || 'image'}${index ? `-${index + 1}` : ''}`
  return path.join(dir, `${base}${extension}`)
}

function normalizeAspect(aspect) {
  if (!aspect) return '16:9'
  if (aspect.includes('x')) {
    const [w, h] = aspect.split('x').map((v) => Number.parseInt(v, 10))
    if (w > h) return '16:9'
    if (w < h) return '9:16'
    return '1:1'
  }
  return aspect
}

function parseImageDataList(payload) {
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.images)) return payload.images
  if (payload?.data && typeof payload.data === 'object') return [payload.data]
  return []
}

function extFromMime(mime, fallback = '.png') {
  if (!mime) return fallback
  if (mime.includes('jpeg') || mime.includes('jpg')) return '.jpg'
  if (mime.includes('webp')) return '.webp'
  if (mime.includes('gif')) return '.gif'
  return '.png'
}

async function generateOpenAi({ prompt, model, size, quality, output, outputDir, n = 1, background, thinking }) {
  const token = requireEnv('OPENAI_API_KEY')
  const body = {
    model: model || 'gpt-image-2',
    prompt,
    size: size || '1536x1024',
    quality: quality || 'high',
    n: asInt(n, 1),
    response_format: 'b64_json',
  }

  if (background) {
    body.background = background
  }

  if (thinking) {
    body.thinking_level = thinking
  }

  const payload = await jsonPost('https://api.openai.com/v1/images/generations', {
    headers: { Authorization: `Bearer ${token}` },
    body,
  })

  const items = parseImageDataList(payload)
  if (!items.length) {
    throw new Error('OpenAI returned no images')
  }

  const writes = []
  for (let i = 0; i < items.length; i += 1) {
    const item = items[i]
    if (item?.b64_json) {
      const ext = extFromMime(item.mime_type || item.mimeType, '.png')
      const outPath = resolveOutputPath({ outputDir, output, provider: 'openai', prompt, index: i, extension: ext })
      writes.push(saveBase64Image(item.b64_json, outPath))
      continue
    }

    if (item?.url) {
      const ext = detectExtFromUrl(item.url)
      const outPath = resolveOutputPath({ outputDir, output, provider: 'openai', prompt, index: i, extension: ext })
      writes.push(saveUrlImage(item.url, outPath))
      continue
    }

    throw new Error('OpenAI response did not include b64_json or url image data')
  }

  const files = await Promise.all(writes)
  return { provider: 'openai', model: body.model, files }
}

async function generateXai({ prompt, model, aspect, resolution, output, outputDir, n = 1 }) {
  const token = requireEnv('XAI_API_KEY')
  const endpoints = [
    'https://api.x.ai/v1/image/generations',
    'https://api.x.ai/v1/images/generations',
  ]

  const body = {
    model: model || 'grok-imagine-image',
    prompt,
    n: asInt(n, 1),
    image_format: 'base64',
    response_format: 'b64_json',
    aspect_ratio: normalizeAspect(aspect || '16:9'),
  }

  if (resolution) {
    body.resolution = resolution
  }

  let payload
  let lastError
  for (const endpoint of endpoints) {
    try {
      payload = await jsonPost(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
        body,
      })
      break
    } catch (error) {
      lastError = error
    }
  }

  if (!payload) {
    throw lastError || new Error('xAI image generation failed')
  }

  const items = parseImageDataList(payload)
  if (!items.length) {
    throw new Error('xAI returned no images')
  }

  const writes = []
  for (let i = 0; i < items.length; i += 1) {
    const item = items[i]
    if (item?.b64_json) {
      const outPath = resolveOutputPath({ outputDir, output, provider: 'xai', prompt, index: i, extension: '.png' })
      writes.push(saveBase64Image(item.b64_json, outPath))
      continue
    }

    if (item?.url) {
      const ext = detectExtFromUrl(item.url)
      const outPath = resolveOutputPath({ outputDir, output, provider: 'xai', prompt, index: i, extension: ext })
      writes.push(saveUrlImage(item.url, outPath))
      continue
    }

    throw new Error('xAI response did not include b64_json or url image data')
  }

  const files = await Promise.all(writes)
  return { provider: 'xai', model: body.model, files }
}

async function generateGemini({ prompt, model, aspect, resolution, output, outputDir, n = 1 }) {
  const token = requireFirstEnv(['GEMINI_API_KEY', 'GOOGLE_GENERATIVE_AI_API_KEY'])
  const chosenModel = model || 'gemini-3-pro-image-preview'
  const cleanModel = chosenModel.replace(/^models\//, '')
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${cleanModel}:generateContent?key=${token}`

  const generationConfig = {
    responseModalities: ['IMAGE'],
  }

  const imageConfig = {}
  if (aspect) imageConfig.aspectRatio = normalizeAspect(aspect)
  if (resolution) imageConfig.imageSize = resolution
  if (Object.keys(imageConfig).length) generationConfig.imageConfig = imageConfig

  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig,
  }

  const payload = await jsonPost(endpoint, { body })

  const candidates = payload?.candidates || []
  const writes = []

  for (let i = 0; i < candidates.length && writes.length < asInt(n, 1); i += 1) {
    const parts = candidates[i]?.content?.parts || []
    for (const part of parts) {
      if (part.inlineData?.data) {
        const ext = extFromMime(part.inlineData.mimeType, '.png')
        const outPath = resolveOutputPath({
          outputDir,
          output,
          provider: 'nano-banana',
          prompt,
          index: writes.length,
          extension: ext,
        })
        writes.push(saveBase64Image(part.inlineData.data, outPath))
        if (writes.length >= asInt(n, 1)) break
      }
    }
  }

  if (!writes.length) {
    const blockReason = payload?.promptFeedback?.blockReason
    if (blockReason) {
      throw new Error(`Gemini blocked the prompt: ${blockReason}`)
    }
    throw new Error('Gemini returned no inline image data')
  }

  const files = await Promise.all(writes)
  return { provider: 'nano-banana', model: cleanModel, files }
}

function replicateOutputUrls(output) {
  if (!output) return []
  if (typeof output === 'string') return [output]
  if (Array.isArray(output)) return output.filter((v) => typeof v === 'string')
  if (typeof output === 'object' && typeof output.url === 'string') return [output.url]
  return []
}

async function generateReplicate({ prompt, model, aspect, output, outputDir, version, n = 1, maxPolls = 90, pollMs = 2000 }) {
  const token = requireEnv('REPLICATE_API_TOKEN')
  const endpoint = 'https://api.replicate.com/v1/predictions'

  const body = {
    input: {
      prompt,
      aspect_ratio: normalizeAspect(aspect || '16:9'),
      output_format: 'png',
    },
  }

  const chosenModel = model || 'black-forest-labs/flux-1.1-pro'
  body.version = version || chosenModel

  const created = await jsonPost(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
      Prefer: 'wait',
    },
    body,
  })

  let prediction = created
  let attempts = 0
  const pollLimit = asInt(maxPolls, 90)
  const waitMs = asInt(pollMs, 2000)

  while (['starting', 'processing', 'queued'].includes(prediction?.status) && attempts < pollLimit) {
    attempts += 1
    await sleep(waitMs)
    const getUrl = prediction?.urls?.get || `${endpoint}/${prediction.id}`
    prediction = await fetchJson(getUrl, { Authorization: `Bearer ${token}` })
  }

  if (prediction?.status !== 'succeeded') {
    const errorText = prediction?.error || 'prediction did not succeed'
    throw new Error(`Replicate prediction failed: ${prediction?.status} - ${errorText}`)
  }

  const urls = replicateOutputUrls(prediction.output).slice(0, asInt(n, 1))
  if (!urls.length) {
    throw new Error('Replicate returned no downloadable image output')
  }

  const writes = urls.map((url, i) => {
    const ext = detectExtFromUrl(url)
    const outPath = resolveOutputPath({ outputDir, output, provider: 'replicate', prompt, index: i, extension: ext })
    return saveUrlImage(url, outPath)
  })

  const files = await Promise.all(writes)
  return { provider: 'replicate', model: chosenModel, predictionId: prediction.id, files }
}

export async function loadRoutingConfig(routerPath = DEFAULT_ROUTER_PATH) {
  return readJsonFile(routerPath)
}

export function buildRoutePlan(config, { intent = 'hero-brand', priority = 'quality' } = {}) {
  const route = config.routes?.[intent]
  if (!route) {
    const known = Object.keys(config.routes || {}).join(', ')
    throw new Error(`Unknown --intent \"${intent}\". Known intents: ${known}`)
  }

  const priorityOrder = config.priorityRules?.[priority] || []
  const unique = [route.primary, ...(route.fallback || []), ...priorityOrder].filter(Boolean)
  const providers = [...new Set(unique)]

  return {
    intent,
    priority,
    primary: route.primary,
    fallback: route.fallback || [],
    providers,
    reason: route.reason,
  }
}

export function providerStatus(config, provider) {
  ensureProvider(config, provider)
  const descriptor = config.providers[provider]
  const requiredEnv = descriptor.requiredEnv || []

  // Each entry can be a single name or "A|B|C" — at least one must be set
  const missingEnv = requiredEnv.filter((entry) => {
    const alternatives = entry.split('|')
    return !alternatives.some((name) => process.env[name])
  })

  return {
    provider,
    mode: descriptor.mode,
    defaultModel: descriptor.defaultModel,
    requiredEnv,
    missingEnv,
    ready: missingEnv.length === 0,
  }
}

export async function generateImage(config, options) {
  const provider = options.provider
  ensureProvider(config, provider)
  ensurePrompt(options.prompt)

  const descriptor = config.providers[provider]

  if (provider === 'nano-banana') {
    const hasKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY
    if (!hasKey) {
      throw new Error(
        `Provider "nano-banana" needs GEMINI_API_KEY or GOOGLE_GENERATIVE_AI_API_KEY. ` +
        `Without one, fall back to in-Claude MCP tool mcp__nanobanana__generate_image.`
      )
    }
    return generateGemini({
      ...options,
      model: options.model || descriptor.defaultModel,
    })
  }

  if (descriptor.mode === 'mcp-manual') {
    throw new Error(
      `Provider \"${provider}\" is MCP-manual. Use Claude MCP tool mcp__nanobanana__generate_image in-session.`
    )
  }

  if (provider === 'openai') {
    return generateOpenAi({
      ...options,
      model: options.model || descriptor.defaultModel,
      thinking: options.thinking || options['thinking-level'],
    })
  }

  if (provider === 'xai') {
    return generateXai({
      ...options,
      model: options.model || descriptor.defaultModel,
    })
  }

  if (provider === 'replicate') {
    return generateReplicate({
      ...options,
      model: options.model || descriptor.defaultModel,
    })
  }

  throw new Error(`No generator implementation for provider \"${provider}\"`)
}

export function availableProviders(config, { includeManual = false } = {}) {
  return Object.entries(config.providers || {})
    .filter(([, descriptor]) => includeManual || descriptor.mode !== 'mcp-manual')
    .map(([name]) => name)
}
