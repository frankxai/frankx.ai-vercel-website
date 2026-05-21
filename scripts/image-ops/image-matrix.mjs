#!/usr/bin/env node
import path from 'node:path'
import {
  availableProviders,
  buildRoutePlan,
  generateImage,
  loadRoutingConfig,
  providerStatus,
} from './lib.mjs'

function usage() {
  console.log(`Usage:
  npm run image:matrix -- --prompt "..." [--intent hero-brand] [--priority quality] [--providers openai,xai,replicate] [--output-dir public/images/generated/matrix]

Examples:
  npm run image:matrix -- --prompt "futuristic creator workspace" --intent creative-exploration
  npm run image:matrix -- --prompt "RAG architecture diagram" --providers openai,replicate
`)
}

function parseArgs(argv) {
  const [command, ...rest] = argv
  const opts = { _: [] }

  for (let i = 0; i < rest.length; i += 1) {
    const token = rest[i]
    if (token.startsWith('--')) {
      const key = token.slice(2)
      const next = rest[i + 1]
      if (!next || next.startsWith('--')) {
        opts[key] = true
      } else {
        opts[key] = next
        i += 1
      }
    } else {
      opts._.push(token)
    }
  }

  return { command, opts }
}

function resolveProviderList(config, opts) {
  if (opts.providers) {
    return opts.providers
      .split(',')
      .map((v) => v.trim())
      .filter(Boolean)
  }

  if (opts.intent) {
    const plan = buildRoutePlan(config, {
      intent: opts.intent,
      priority: opts.priority || 'quality',
    })
    return plan.providers.filter((provider) => providerStatus(config, provider).mode !== 'mcp-manual')
  }

  const defaults = config.matrixDefaults?.providers
  if (Array.isArray(defaults) && defaults.length) {
    return defaults
  }

  return availableProviders(config)
}

async function run() {
  const { command, opts } = parseArgs(process.argv.slice(2))
  if (!command || command !== 'run') {
    usage()
    process.exit(command ? 1 : 0)
  }

  if (!opts.prompt) {
    throw new Error('Missing --prompt')
  }

  const config = await loadRoutingConfig()
  const providers = resolveProviderList(config, opts)
  const outBase = opts['output-dir'] || path.join('public', 'images', 'generated', 'matrix')

  const summary = {
    prompt: opts.prompt,
    intent: opts.intent || null,
    priority: opts.priority || null,
    outputDir: outBase,
    providers,
    startedAt: new Date().toISOString(),
    results: [],
  }

  for (const provider of providers) {
    const status = providerStatus(config, provider)
    if (status.mode === 'mcp-manual') {
      summary.results.push({ provider, status: 'manual', message: 'Run via Claude MCP (nano-banana).' })
      continue
    }

    if (!status.ready) {
      summary.results.push({
        provider,
        status: 'skipped',
        message: `Missing env: ${status.missingEnv.join(', ')}`,
      })
      continue
    }

    try {
      const result = await generateImage(config, {
        provider,
        prompt: opts.prompt,
        aspect: opts.aspect,
        size: opts.size,
        quality: opts.quality,
        outputDir: path.join(outBase, provider),
        n: opts.n || '1',
      })

      summary.results.push({ provider, status: 'ok', files: result.files, model: result.model })
    } catch (error) {
      summary.results.push({ provider, status: 'error', message: error.message })
      if (!opts['continue-on-error']) {
        throw error
      }
    }
  }

  summary.finishedAt = new Date().toISOString()
  console.log(JSON.stringify(summary, null, 2))
}

run().catch((error) => {
  console.error(`[image-matrix] ${error.message}`)
  process.exit(1)
})
