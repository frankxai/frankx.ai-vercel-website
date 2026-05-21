#!/usr/bin/env node
import { loadPresets } from './preset-loader.mjs'

const NS_FILTER = process.argv.find((a) => a.startsWith('--ns='))?.split('=')[1]

async function main() {
  const data = await loadPresets()
  const filtered = NS_FILTER
    ? data.presets.filter((p) => p.namespace === NS_FILTER)
    : data.presets

  if (process.argv.includes('--json')) {
    console.log(JSON.stringify(filtered, null, 2))
    return
  }

  const byNs = filtered.reduce((acc, p) => {
    acc[p.namespace] = acc[p.namespace] || []
    acc[p.namespace].push(p)
    return acc
  }, {})

  for (const ns of Object.keys(byNs).sort()) {
    console.log(`\n=== ${ns.toUpperCase()} (${byNs[ns].length}) ===`)
    for (const p of byNs[ns]) {
      const cost = p.estimatedCost ? `$${p.estimatedCost.toFixed(3)}` : 'n/a'
      console.log(`  ${p.key.padEnd(34)} ${p.defaultModel.padEnd(14)} ${cost.padStart(7)}  ${p.description}`)
    }
  }
  console.log('')
}

main().catch((error) => {
  console.error(`[image-presets] ${error.message}`)
  process.exit(1)
})
