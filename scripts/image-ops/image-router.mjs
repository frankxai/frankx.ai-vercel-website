#!/usr/bin/env node
import {
  availableProviders,
  buildRoutePlan,
  generateImage,
  loadRoutingConfig,
  providerStatus,
} from './lib.mjs'

function usage() {
  console.log(`Usage:
  npm run image:plan -- --intent <intent> [--priority quality|speed|cost]
  npm run image:status
  npm run image:generate -- --provider <provider> --prompt "..." [--model <model>] [--size 1536x1024] [--aspect 16:9] [--output <path>] [--output-dir <dir>]
  npm run image:generate -- --intent <intent> --prompt "..." [--priority quality] [--auto]

Examples:
  npm run image:plan -- --intent hero-brand
  npm run image:generate -- --provider openai --prompt "cinematic hero of AI studio" --size 1536x1024
  npm run image:generate -- --intent grounded-infographic --prompt "how retrieval augmented generation works" --auto
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

function resolveProviderFromPlan(config, opts) {
  const plan = buildRoutePlan(config, {
    intent: opts.intent || 'hero-brand',
    priority: opts.priority || 'quality',
  })

  if (!opts.auto) {
    return {
      provider: plan.primary,
      plan,
    }
  }

  for (const candidate of plan.providers) {
    const status = providerStatus(config, candidate)
    if (status.mode === 'mcp-manual') {
      continue
    }
    if (status.ready) {
      return {
        provider: candidate,
        plan,
      }
    }
  }

  return {
    provider: plan.primary,
    plan,
  }
}

async function run() {
  const { command, opts } = parseArgs(process.argv.slice(2))

  if (!command || command === '--help' || command === '-h') {
    usage()
    process.exit(command ? 0 : 1)
  }

  const config = await loadRoutingConfig()

  if (command === 'plan') {
    const plan = buildRoutePlan(config, {
      intent: opts.intent || 'hero-brand',
      priority: opts.priority || 'quality',
    })

    const statuses = plan.providers.map((provider) => providerStatus(config, provider))
    const manualProviders = statuses.filter((s) => s.mode === 'mcp-manual').map((s) => s.provider)

    console.log(JSON.stringify({
      ...plan,
      manualProviders,
      providers: statuses,
    }, null, 2))
    return
  }

  if (command === 'status') {
    const providers = availableProviders(config, { includeManual: true })
    const statuses = providers.map((provider) => providerStatus(config, provider))

    for (const status of statuses) {
      const state = status.ready ? 'ready' : `missing: ${status.missingEnv.join(', ')}`
      console.log(`${status.provider} (${status.mode}) -> ${state}`)
    }

    return
  }

  if (command === 'generate') {
    if (!opts.prompt) {
      throw new Error('Missing --prompt')
    }

    let provider = opts.provider
    let plan = null

    if (!provider) {
      const resolved = resolveProviderFromPlan(config, opts)
      provider = resolved.provider
      plan = resolved.plan
    }

    const result = await generateImage(config, {
      provider,
      prompt: opts.prompt,
      model: opts.model,
      size: opts.size,
      aspect: opts.aspect,
      quality: opts.quality,
      resolution: opts.resolution,
      background: opts.background,
      thinking: opts.thinking || opts['thinking-level'],
      output: opts.output,
      outputDir: opts['output-dir'],
      n: opts.n,
      version: opts.version,
      maxPolls: opts['max-polls'],
      pollMs: opts['poll-ms'],
    })

    if (plan) {
      console.log(`Resolved by intent \"${plan.intent}\" (${plan.priority}): ${provider}`)
    }

    console.log(JSON.stringify(result, null, 2))
    return
  }

  throw new Error(`Unknown command \"${command}\"`)
}

run().catch((error) => {
  console.error(`[image-router] ${error.message}`)
  process.exit(1)
})
