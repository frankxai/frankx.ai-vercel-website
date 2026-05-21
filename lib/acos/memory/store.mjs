/**
 * lib/acos/memory/store.mjs
 *
 * Engine-agnostic memory interface for the ACOS roster.
 *
 * Why this exists:
 *   AgentDB is a solo-maintainer alpha that uses native better-sqlite3 bindings.
 *   It is excellent for local CLI / Node-server use, but it cannot run on Vercel
 *   serverless functions (no native bindings, ephemeral filesystem). It also locks
 *   the ACOS roster into the ReasoningBank API, which churns between alphas.
 *
 *   This module decouples agents from the engine. Agents call recall / remember
 *   through the facade in ../memory.mjs; the facade asks createStore() for an
 *   adapter; the adapter is selected by ACOS_MEMORY_DRIVER. Swapping engines is
 *   one new file and one env var.
 *
 * Adapters live as siblings:
 *   - agentdb.mjs    — AgentDB v3 + ReasoningBank (local CLI, full power)
 *   - in-memory.mjs  — pure-JS, zero-dep, Vercel/CI/test safe
 *   - (future)       — chroma.mjs, upstash-vector.mjs, sqlite-vss.mjs, …
 *
 * The MemoryStore contract every adapter must satisfy:
 *
 *   interface MemoryStore {
 *     storePattern(record): Promise<number>
 *     searchPatterns({ task, k, filters? }): Promise<RecalledPattern[]>
 *     recordOutcome(id, success, reward): Promise<void>
 *     getPatternStats(): Promise<PatternStats>
 *     close(): Promise<void>
 *   }
 *
 * Driver selection:
 *   ACOS_MEMORY_DRIVER=agentdb     — force AgentDB, fail loud if unavailable
 *   ACOS_MEMORY_DRIVER=in-memory   — force pure-JS, never load native deps
 *   ACOS_MEMORY_DRIVER=auto        — try agentdb, fall back to in-memory (default)
 *   (unset)                        — same as auto
 *
 * The auto fallback is deliberate: serverless deploys and fresh CI checkouts
 * should not crash the agents that depend on memory. They get a working store
 * (just non-persistent across processes) and a console warning. Local dev gets
 * the full AgentDB experience whenever it loads.
 */

const VALID_DRIVERS = new Set(['agentdb', 'in-memory', 'auto'])

let _store = null
let _driverUsed = null
let _initializing = null

/**
 * Get (or lazily create) the singleton MemoryStore for this process.
 *
 * @returns {Promise<{ store: MemoryStore, driver: 'agentdb'|'in-memory' }>}
 */
export async function getStore() {
  if (_store) return { store: _store, driver: _driverUsed }
  if (_initializing) return _initializing

  _initializing = (async () => {
    const requested = (process.env.ACOS_MEMORY_DRIVER ?? 'auto').toLowerCase()
    if (!VALID_DRIVERS.has(requested)) {
      throw new Error(
        `ACOS_MEMORY_DRIVER=${requested} is not valid. Use one of: agentdb, in-memory, auto.`
      )
    }

    if (requested === 'in-memory') {
      _store = await loadInMemory()
      _driverUsed = 'in-memory'
    } else if (requested === 'agentdb') {
      _store = await loadAgentDB({ failHard: true })
      _driverUsed = 'agentdb'
    } else {
      // auto: try agentdb, fall back silently with a single warning
      try {
        _store = await loadAgentDB({ failHard: false })
        _driverUsed = 'agentdb'
      } catch (err) {
        if (process.env.ACOS_MEMORY_QUIET !== '1') {
          console.warn(
            `[acos/memory] AgentDB unavailable (${err.message}); falling back to in-memory driver. ` +
              `Set ACOS_MEMORY_DRIVER=in-memory to silence this warning.`
          )
        }
        _store = await loadInMemory()
        _driverUsed = 'in-memory'
      }
    }

    return { store: _store, driver: _driverUsed }
  })()

  const result = await _initializing
  _initializing = null
  return result
}

/**
 * Reset the singleton — primarily for tests that need a clean slate
 * or want to force a different driver mid-process.
 */
export async function resetStore() {
  if (_store && typeof _store.close === 'function') {
    try {
      await _store.close()
    } catch {
      /* ignore */
    }
  }
  _store = null
  _driverUsed = null
  _initializing = null
}

/**
 * Which driver actually loaded last? null until getStore() runs.
 * @returns {'agentdb'|'in-memory'|null}
 */
export function activeDriver() {
  return _driverUsed
}

async function loadAgentDB({ failHard }) {
  try {
    const mod = await import('./agentdb.mjs')
    return await mod.createAgentDBStore()
  } catch (err) {
    if (failHard) throw err
    throw err
  }
}

async function loadInMemory() {
  const mod = await import('./in-memory.mjs')
  return mod.createInMemoryStore()
}
