/**
 * lib/acos/memory/agentdb.mjs
 *
 * AgentDB v3 + ReasoningBank adapter for the MemoryStore interface.
 *
 * Use cases: local CLI, Node-server processes, anywhere better-sqlite3 can compile
 * and the filesystem is persistent. Do NOT use on Vercel functions — native bindings
 * won't load in the Edge or serverless runtimes.
 *
 * Storage:
 *   - data/acos/agentdb/agents.db (better-sqlite3 + ruvector backend)
 *   - 384-dim MiniLM embeddings (Xenova/all-MiniLM-L6-v2, runs locally)
 *   - HNSW vector index
 *
 * Env:
 *   AGENTDB_PATH       — override db path (default: data/acos/agentdb/agents.db)
 *   AGENTDB_DIMENSION  — override vector dim (default: 384)
 */

import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..', '..', '..')

/**
 * Build the AgentDB-backed MemoryStore.
 * Throws if `agentdb` cannot be loaded (native bindings missing, package missing, etc.).
 *
 * @returns {Promise<MemoryStore>}
 */
export async function createAgentDBStore() {
  const dbPath = process.env.AGENTDB_PATH
    ? path.resolve(ROOT, process.env.AGENTDB_PATH)
    : path.join(ROOT, 'data', 'acos', 'agentdb', 'agents.db')
  const vectorDimension = Number(process.env.AGENTDB_DIMENSION) || 384

  fs.mkdirSync(path.dirname(dbPath), { recursive: true })

  // Dynamic import — keeps the heavy native dep out of static bundles.
  const { AgentDB, ReasoningBank, EmbeddingService } = await import('agentdb')

  const db = new AgentDB({
    dbPath,
    vectorDimension,
    vectorBackend: 'auto',
  })
  await db.initialize()

  const embedder = new EmbeddingService({ provider: 'transformers' })
  await embedder.initialize()

  const bank = new ReasoningBank(db.database, embedder)

  return {
    driver: 'agentdb',

    async storePattern(record) {
      return bank.storePattern(record)
    },

    async searchPatterns({ task, k, filters }) {
      const results = await bank.searchPatterns({ task, k, filters })
      // Already in the right shape — id/taskType/approach/successRate/similarity/uses/avgReward/tags/metadata
      return results
    },

    async recordOutcome(id, success, reward) {
      await bank.recordOutcome(id, success, reward)
    },

    async getPatternStats() {
      return bank.getPatternStats()
    },

    async close() {
      await db.close()
    },
  }
}
