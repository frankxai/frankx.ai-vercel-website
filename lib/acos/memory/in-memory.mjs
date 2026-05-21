/**
 * lib/acos/memory/in-memory.mjs
 *
 * Zero-dependency, pure-JS MemoryStore for the ACOS roster.
 *
 * When this is the right driver:
 *   - Vercel serverless functions (no native bindings, ephemeral disk)
 *   - CI / smoke tests (fast, hermetic, no model downloads)
 *   - Edge runtimes
 *   - Anywhere `agentdb` can't or shouldn't load
 *
 * What you give up vs AgentDB:
 *   - Persistence (records vanish at process exit unless you snapshot via dump/load)
 *   - True semantic embeddings (we use a deterministic bag-of-words vector instead)
 *   - HNSW index (we do brute-force cosine over a small in-process Map)
 *
 * What you keep:
 *   - The same MemoryStore interface — agents don't care which driver loaded
 *   - "Close enough" similarity for short tasks: lexically-overlapping queries
 *     consistently land at 0.4-0.9 cosine, well above the 0.25 smoke threshold
 *   - storePattern / searchPatterns / recordOutcome / getPatternStats / close
 *
 * Optional persistence:
 *   process.env.ACOS_MEMORY_INMEM_SNAPSHOT — path to a JSON snapshot file.
 *   If set, we load on startup and write on every store/outcome (best-effort).
 */

import fs from 'node:fs'
import path from 'node:path'

/**
 * @returns {MemoryStore}
 */
export function createInMemoryStore() {
  const snapshotPath = process.env.ACOS_MEMORY_INMEM_SNAPSHOT || null

  /** @type {Map<number, StoredPattern>} */
  const patterns = new Map()
  let nextId = 1

  if (snapshotPath && fs.existsSync(snapshotPath)) {
    try {
      const raw = JSON.parse(fs.readFileSync(snapshotPath, 'utf8'))
      if (Array.isArray(raw?.patterns)) {
        for (const p of raw.patterns) {
          patterns.set(p.id, p)
          if (p.id >= nextId) nextId = p.id + 1
        }
      }
    } catch (err) {
      console.warn(`[acos/memory:in-memory] snapshot load failed: ${err.message}`)
    }
  }

  function snapshot() {
    if (!snapshotPath) return
    try {
      fs.mkdirSync(path.dirname(snapshotPath), { recursive: true })
      const tmp = snapshotPath + '.tmp'
      fs.writeFileSync(
        tmp,
        JSON.stringify({ patterns: Array.from(patterns.values()) }, null, 2)
      )
      fs.renameSync(tmp, snapshotPath)
    } catch (err) {
      console.warn(`[acos/memory:in-memory] snapshot write failed: ${err.message}`)
    }
  }

  return {
    driver: 'in-memory',

    async storePattern(record) {
      const id = nextId++
      const text = `${record.taskType ?? ''} ${record.approach ?? ''}`
      const stored = {
        id,
        taskType: record.taskType ?? '',
        approach: record.approach ?? '',
        successRate: clamp01(record.successRate ?? 0.5),
        tags: Array.isArray(record.tags) ? [...record.tags] : [],
        metadata: { ...(record.metadata ?? {}) },
        uses: 0,
        avgReward: 0,
        embedding: tokenize(text),
      }
      patterns.set(id, stored)
      snapshot()
      return id
    },

    async searchPatterns({ task, k = 5, filters }) {
      const queryVec = tokenize(task ?? '')
      const candidates = []
      for (const p of patterns.values()) {
        if (filters?.taskType && p.taskType !== filters.taskType) continue
        if (filters?.minSuccessRate != null && p.successRate < filters.minSuccessRate) continue
        if (Array.isArray(filters?.tags) && filters.tags.length > 0) {
          const have = new Set(p.tags)
          if (!filters.tags.every((t) => have.has(t))) continue
        }
        const similarity = cosine(queryVec, p.embedding)
        candidates.push({
          id: p.id,
          taskType: p.taskType,
          approach: p.approach,
          successRate: p.successRate,
          similarity,
          uses: p.uses,
          avgReward: p.avgReward,
          tags: [...p.tags],
          metadata: { ...p.metadata },
        })
      }
      candidates.sort((a, b) => b.similarity - a.similarity)
      return candidates.slice(0, Math.max(0, k | 0))
    },

    async recordOutcome(id, success, reward) {
      const p = patterns.get(id)
      if (!p) return
      p.uses += 1
      // Running average of reward, weighted by use count
      const r = typeof reward === 'number' ? clamp01(reward) : success ? 1 : 0
      p.avgReward = (p.avgReward * (p.uses - 1) + r) / p.uses
      // Smooth successRate toward observed outcome (EWMA, alpha=0.3)
      const target = success ? 1 : 0
      p.successRate = clamp01(0.7 * p.successRate + 0.3 * target)
      snapshot()
    },

    async getPatternStats() {
      const arr = Array.from(patterns.values())
      const totalPatterns = arr.length
      const avgSuccessRate =
        totalPatterns === 0 ? 0 : arr.reduce((s, p) => s + p.successRate, 0) / totalPatterns
      const avgUses =
        totalPatterns === 0 ? 0 : arr.reduce((s, p) => s + p.uses, 0) / totalPatterns
      const counts = new Map()
      for (const p of arr) counts.set(p.taskType, (counts.get(p.taskType) ?? 0) + 1)
      const topTaskTypes = Array.from(counts.entries())
        .map(([taskType, count]) => ({ taskType, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)
      const recentPatterns = arr.length // no timestamp tracking in MVP
      const highPerformingPatterns = arr.filter((p) => p.successRate >= 0.75).length
      return {
        totalPatterns,
        avgSuccessRate,
        avgUses,
        topTaskTypes,
        recentPatterns,
        highPerformingPatterns,
      }
    },

    async close() {
      // Nothing to release; final snapshot if configured.
      snapshot()
    },
  }
}

// ---- helpers ---------------------------------------------------------------

const STOPWORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'for', 'to', 'of', 'in', 'on', 'at',
  'by', 'with', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'do', 'does', 'did', 'have', 'has', 'had', 'i', 'you', 'we', 'they', 'it',
  'my', 'our', 'your', 'their', 'this', 'that', 'these', 'those', 'how',
])

const NGRAM_SIZE = 3

/**
 * Tokenize text into a normalized term-frequency Map combining:
 *   - cleaned word tokens (weight 1.0) — exact-match channel
 *   - character n-grams of size NGRAM_SIZE (weight 0.5) — fuzzy / stem channel
 *
 * The dual channel cheaply approximates stemming: "hook" / "hooks" share the word
 * stem via 3-grams ("hoo","ook"), and "generate" / "generation" share several
 * 3-grams without needing a real stemmer or wordlist.
 *
 * Returns an L2-normalized vector represented as a Map<feature, weight>.
 */
function tokenize(text) {
  const tf = new Map()
  const cleaned = String(text).toLowerCase()

  // 1) word tokens
  for (const raw of cleaned.split(/[^\p{L}\p{N}]+/u)) {
    if (!raw) continue
    if (raw.length < 2) continue
    if (STOPWORDS.has(raw)) continue
    const key = `w:${raw}`
    tf.set(key, (tf.get(key) ?? 0) + 1)

    // 2) char n-grams within each word — borders prevent cross-word noise.
    // Weight 1.0 (equal to words) because exact word matches are rare across
    // queries written by different humans / agents — fuzzy matches do the work.
    if (raw.length >= NGRAM_SIZE) {
      for (let i = 0; i <= raw.length - NGRAM_SIZE; i++) {
        const gram = raw.slice(i, i + NGRAM_SIZE)
        const gkey = `g:${gram}`
        tf.set(gkey, (tf.get(gkey) ?? 0) + 1)
      }
    }
  }

  // L2 normalize
  let norm = 0
  for (const v of tf.values()) norm += v * v
  norm = Math.sqrt(norm)
  if (norm === 0) return tf
  for (const [k, v] of tf) tf.set(k, v / norm)
  return tf
}

function cosine(a, b) {
  if (!a?.size || !b?.size) return 0
  // Iterate the smaller map for speed
  const [small, large] = a.size <= b.size ? [a, b] : [b, a]
  let dot = 0
  for (const [k, v] of small) {
    const w = large.get(k)
    if (w) dot += v * w
  }
  return dot
}

function clamp01(n) {
  if (Number.isNaN(n)) return 0
  if (n < 0) return 0
  if (n > 1) return 1
  return n
}
