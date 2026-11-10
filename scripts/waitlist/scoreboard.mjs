#!/usr/bin/env node
// Daily waitlist scoreboard, read straight from KV with the read-only token.
//   KV_REST_API_URL=... KV_REST_API_READ_ONLY_TOKEN=... node scripts/waitlist/scoreboard.mjs [productId] [--json]
import { appendFileSync } from 'node:fs'
import { tally, toMarkdown } from './scoreboard-core.mjs'

const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
// Read-only token only: a writable one is never used, so this script cannot change the list.
const token = process.env.KV_REST_API_READ_ONLY_TOKEN
const productId = process.argv.slice(2).find((a) => !a.startsWith('--')) || 'starlight-academy-operator-lab'

if (!url || !token) {
  console.error('scoreboard: KV_REST_API_URL and KV_REST_API_READ_ONLY_TOKEN are required. Nothing was read.')
  process.exit(2)
}

const res = await fetch(url, {
  method: 'POST',
  headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  body: JSON.stringify(['hgetall', `waitlist:${productId}:signals`]),
})
const body = await res.json().catch(() => ({}))
if (!res.ok || body.error) {
  console.error(`scoreboard: KV refused the read (${res.status} ${body.error ?? ''}). No numbers reported.`)
  process.exit(1)
}
const raw = body.result ?? []
const values = Array.isArray(raw) ? raw.filter((_, i) => i % 2 === 1) : Object.values(raw)
const t = tally(values.map((v) => JSON.parse(String(v))))

if (process.argv.includes('--json')) console.log(JSON.stringify(t, null, 2))
else console.log(toMarkdown(productId, t))
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, toMarkdown(productId, t) + '\n')
