import assert from 'node:assert/strict'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import test from 'node:test'
import { closeAgentDB } from '../../lib/acos/memory/agentdb.mjs'

test('AgentDB close always attempts database cleanup and surfaces close failures', async () => {
  const calls = []
  const vectorCloseError = new Error('vector backend close failed')
  const db = {
    vectorBackend: {
      async close() {
        calls.push('vector')
        throw vectorCloseError
      },
    },
    async close() {
      calls.push('database')
    },
  }

  await assert.rejects(() => closeAgentDB(db), vectorCloseError)
  assert.deepEqual(calls, ['vector', 'database'])
})

test('AgentDB satisfies the production memory adapter contract', async () => {
  const tempDir = await mkdtemp(path.join(tmpdir(), 'frankx-agentdb-runtime-'))
  const previousCwd = process.cwd()
  const previousEnv = {
    ACOS_MEMORY_DRIVER: process.env.ACOS_MEMORY_DRIVER,
    ACOS_MEMORY_QUIET: process.env.ACOS_MEMORY_QUIET,
    AGENTDB_DISABLE_TRANSFORMERS: process.env.AGENTDB_DISABLE_TRANSFORMERS,
    AGENTDB_PATH: process.env.AGENTDB_PATH,
  }

  process.env.ACOS_MEMORY_DRIVER = 'agentdb'
  process.env.ACOS_MEMORY_QUIET = '1'
  process.env.AGENTDB_DISABLE_TRANSFORMERS = '1'
  process.env.AGENTDB_PATH = path.join(tempDir, 'agents.db')
  process.chdir(tempDir)

  let memory

  try {
    memory = await import('../../lib/acos/memory.mjs')
    const id = await memory.remember({
      agent: 'agentdb-runtime-smoke',
      intent: 'verify the AgentDB alpha runtime contract',
      approach: 'initialize store search record outcome stats and close',
      score: 0.8,
      tags: ['smoke', 'agentdb'],
    })

    assert.equal(memory.currentDriver(), 'agentdb')
    assert.equal(typeof id, 'number')

    const recalled = await memory.recall(
      'agentdb-runtime-smoke: initialize store search record outcome stats and close',
      3,
    )
    assert.ok(recalled.some((pattern) => pattern.id === id))

    await memory.recordOutcome(id, true, 0.9)
    const statistics = await memory.stats()
    assert.equal(statistics.totalPatterns, 1)
    assert.ok(statistics.avgUses >= 1)

    const { getStore } = await import('../../lib/acos/memory/store.mjs')
    const { store } = await getStore()
    const closeError = new Error('public memory close failed')
    const closeStore = store.close.bind(store)
    store.close = async () => {
      await closeStore()
      throw closeError
    }

    await assert.rejects(() => memory.close(), closeError)
    assert.equal(memory.currentDriver(), null)
  } finally {
    try {
      await memory?.close()
    } finally {
      try {
        process.chdir(previousCwd)
        await rm(tempDir, { recursive: true, force: true })
      } finally {
        for (const [key, value] of Object.entries(previousEnv)) {
          if (value === undefined) delete process.env[key]
          else process.env[key] = value
        }
      }
    }
  }
})
