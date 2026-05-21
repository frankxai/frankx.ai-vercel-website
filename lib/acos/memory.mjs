/**
 * lib/acos/memory.mjs
 *
 * Public memory facade for the ACOS 99-agent roster.
 * Delegates to a swappable MemoryStore (AgentDB, in-memory, or future engines).
 *
 * Why this exists:
 *   Without shared memory, every agent invocation is stateless. Wins don't compound,
 *   losses don't teach, agents don't discover each other's outputs.
 *   This module is the substrate that makes the roster genuinely intelligent.
 *
 * What it provides:
 *   - recall(intent, k)              — retrieve top-k similar past patterns for an intent
 *   - remember(record)               — store a new pattern (agent, approach, outcome, score)
 *   - recordOutcome(id, ok, reward)  — close the loop after observing real outcomes
 *   - stats()                        — counts, success rates, top task types
 *   - close()                        — release resources
 *   - currentDriver()                — which engine actually loaded
 *
 * Engine selection (see ./memory/store.mjs for the full contract):
 *   ACOS_MEMORY_DRIVER=agentdb     — force AgentDB (requires native better-sqlite3)
 *   ACOS_MEMORY_DRIVER=in-memory   — force pure-JS (Vercel, CI, Edge)
 *   ACOS_MEMORY_DRIVER=auto        — try AgentDB, fall back to in-memory (DEFAULT)
 *
 * Usage from an agent (via Bash):
 *   node -e "import('./lib/acos/memory.mjs').then(m=>m.recall('hook generation',3).then(r=>console.log(JSON.stringify(r))))"
 *
 * Usage from a Node script:
 *   import { recall, remember } from '../lib/acos/memory.mjs'
 *   const past = await recall('content polish', 3)
 *   const id = await remember({ agent: 'content-hook-learner', approach: '...', score: 0.82 })
 */

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getStore, resetStore, activeDriver } from './memory/store.mjs'

/**
 * @typedef {Object} MemoryRecord
 * @property {string} agent       — slug of the agent that produced this run (e.g., "content-hook-learner")
 * @property {string} [intent]    — what the agent was asked to do, free-text
 * @property {string} approach    — the strategy / prompt / process used
 * @property {number} [score]     — outcome score in [0,1]; 1 = perfect, 0 = failed; defaults to 0.5
 * @property {string[]} [tags]    — optional facets (platform, pillar, etc.)
 * @property {Record<string,unknown>} [metadata] — anything else worth remembering
 */

/**
 * @typedef {Object} RecalledPattern
 * @property {number} id
 * @property {string} taskType
 * @property {string} approach
 * @property {number} successRate
 * @property {number} similarity   — cosine similarity to the query, 0-1
 * @property {number} [uses]
 * @property {number} [avgReward]
 * @property {string[]} [tags]
 * @property {Record<string,unknown>} [metadata]
 */

/**
 * Retrieve the top-k past patterns most similar to an intent.
 * Empty array if the bank is fresh or nothing matches.
 *
 * @param {string} intent
 * @param {number} [k=5]
 * @param {{ taskType?: string, minSuccessRate?: number, tags?: string[] }} [filters]
 * @returns {Promise<RecalledPattern[]>}
 */
export async function recall(intent, k = 5, filters) {
  if (!intent || typeof intent !== 'string') return []
  const { store } = await getStore()
  return store.searchPatterns({ task: intent, k, filters })
}

/**
 * Store a new pattern. Returns the assigned id (use it later with recordOutcome).
 *
 * @param {MemoryRecord} record
 * @returns {Promise<number>}
 */
export async function remember(record) {
  if (!record?.agent || !record?.approach) {
    throw new Error('remember(record) requires { agent, approach } at minimum')
  }
  const { store } = await getStore()
  return store.storePattern({
    taskType: record.agent,
    approach: record.approach,
    successRate: clamp01(typeof record.score === 'number' ? record.score : 0.5),
    tags: record.tags ?? [],
    metadata: {
      intent: record.intent ?? '',
      ...(record.metadata ?? {}),
      first_recorded: new Date().toISOString(),
    },
  })
}

/**
 * Close the loop — call after a real outcome is observed.
 * Updates successRate, uses, and avgReward.
 *
 * @param {number} patternId
 * @param {boolean} success
 * @param {number} [reward]   — finer-grained signal in [0,1]; defaults to 0/1 from success
 * @returns {Promise<void>}
 */
export async function recordOutcome(patternId, success, reward) {
  const r = typeof reward === 'number' ? clamp01(reward) : success ? 1 : 0
  const { store } = await getStore()
  await store.recordOutcome(patternId, success, r)
}

/**
 * @returns {Promise<{ totalPatterns: number, avgSuccessRate: number, avgUses: number, topTaskTypes: Array<{taskType:string,count:number}>, recentPatterns: number, highPerformingPatterns: number }>}
 */
export async function stats() {
  const { store } = await getStore()
  return store.getPatternStats()
}

/**
 * Release the underlying store. Idempotent.
 * @returns {Promise<void>}
 */
export async function close() {
  await resetStore()
}

/**
 * Which engine is currently loaded? Returns null until first recall/remember/etc.
 * @returns {'agentdb'|'in-memory'|null}
 */
export function currentDriver() {
  return activeDriver()
}

function clamp01(n) {
  if (Number.isNaN(n)) return 0
  if (n < 0) return 0
  if (n > 1) return 1
  return n
}

// Tiny CLI for agents that need to call from Bash.
// Usage:
//   node lib/acos/memory.mjs recall "intent string" 3
//   node lib/acos/memory.mjs remember <json>
//   node lib/acos/memory.mjs outcome <id> true|false [reward]
//   node lib/acos/memory.mjs stats
//   node lib/acos/memory.mjs driver
function isDirectInvocation() {
  if (!process.argv[1]) return false
  try {
    return path.resolve(fileURLToPath(import.meta.url)) === path.resolve(process.argv[1])
  } catch {
    return false
  }
}
if (isDirectInvocation()) {
  const [, , cmd, ...rest] = process.argv
  ;(async () => {
    try {
      if (cmd === 'recall') {
        const intent = rest[0] ?? ''
        const k = Number(rest[1] ?? 5)
        const out = await recall(intent, k)
        console.log(JSON.stringify(out, null, 2))
      } else if (cmd === 'remember') {
        const record = JSON.parse(rest[0] ?? '{}')
        const id = await remember(record)
        console.log(JSON.stringify({ id }))
      } else if (cmd === 'outcome') {
        const id = Number(rest[0])
        const success = rest[1] === 'true'
        const reward = rest[2] != null ? Number(rest[2]) : undefined
        await recordOutcome(id, success, reward)
        console.log(JSON.stringify({ ok: true }))
      } else if (cmd === 'stats') {
        console.log(JSON.stringify(await stats(), null, 2))
      } else if (cmd === 'driver') {
        // Force initialization so the driver name is populated
        await stats()
        console.log(JSON.stringify({ driver: currentDriver() }))
      } else {
        console.error('usage: memory.mjs {recall|remember|outcome|stats|driver} ...')
        process.exit(2)
      }
      await close()
    } catch (e) {
      console.error(e.message)
      process.exit(1)
    }
  })()
}
