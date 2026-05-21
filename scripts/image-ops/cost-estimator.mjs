#!/usr/bin/env node
import { loadRoutingConfig, buildRoutePlan } from './lib.mjs'

function parseArgs(argv) {
  const opts = {}
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i]
    if (token.startsWith('--')) {
      const key = token.slice(2)
      const next = argv[i + 1]
      if (!next || next.startsWith('--')) {
        opts[key] = true
      } else {
        opts[key] = next
        i += 1
      }
    }
  }
  return opts
}

function pickTier(provider, descriptor, { complexity = 'typical', resolution = '2K' } = {}) {
  const cost = descriptor.costPerImage || {}
  if (provider === 'nano-banana') {
    if (resolution === '4K') return cost.premium4K ?? cost.typical ?? 0
    if (complexity === 'batch') return cost.batch2K ?? cost.typical ?? 0
    return cost.typical ?? cost.simple ?? 0
  }
  if (complexity === 'simple') return cost.simple ?? cost.typical ?? 0
  if (complexity === 'premium' || resolution === '4K') return cost.premium ?? cost.typical ?? 0
  return cost.typical ?? cost.simple ?? 0
}

async function main() {
  const opts = parseArgs(process.argv.slice(2))
  const config = await loadRoutingConfig()

  if (opts.intent) {
    const plan = buildRoutePlan(config, {
      intent: opts.intent,
      priority: opts.priority || 'quality',
    })
    const rows = plan.providers.map((p) => {
      const descriptor = config.providers[p]
      return {
        provider: p,
        displayName: descriptor.displayName || p,
        defaultModel: descriptor.defaultModel,
        estimate: pickTier(p, descriptor, {
          complexity: opts.complexity,
          resolution: opts.resolution,
        }),
      }
    })

    console.log(JSON.stringify({
      intent: plan.intent,
      priority: plan.priority,
      complexity: opts.complexity || 'typical',
      resolution: opts.resolution || '2K',
      providers: rows,
      cheapest: rows.reduce((min, r) => (r.estimate < min.estimate ? r : min)),
    }, null, 2))
    return
  }

  if (opts.provider) {
    const descriptor = config.providers[opts.provider]
    if (!descriptor) {
      throw new Error(`Unknown provider "${opts.provider}"`)
    }
    const estimate = pickTier(opts.provider, descriptor, {
      complexity: opts.complexity,
      resolution: opts.resolution,
    })
    console.log(JSON.stringify({
      provider: opts.provider,
      displayName: descriptor.displayName,
      defaultModel: descriptor.defaultModel,
      complexity: opts.complexity || 'typical',
      resolution: opts.resolution || '2K',
      estimate,
      costTable: descriptor.costPerImage,
    }, null, 2))
    return
  }

  console.error('Usage: npm run image:cost -- --intent <intent> [--complexity simple|typical|premium|batch] [--resolution 2K|4K]')
  console.error('       npm run image:cost -- --provider <provider> [--complexity ...] [--resolution ...]')
  process.exit(1)
}

main().catch((error) => {
  console.error(`[image-cost] ${error.message}`)
  process.exit(1)
})
