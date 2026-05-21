#!/usr/bin/env node
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const ROOT = process.cwd()
const STORE_PATH = path.join(ROOT, 'agents', 'coordination', 'file-locks.json')
const VALID_AGENTS = new Set(['claude', 'codex', 'gemini'])

function usage() {
  console.log(`Usage:
  npm run agents:locks -- init --task <task-id>
  npm run agents:locks -- claim --task <task-id> --agent <claude|codex|gemini> <file...> [--note "<text>"]
  npm run agents:locks -- release --task <task-id> --agent <claude|codex|gemini> <file...|--all>
  npm run agents:locks -- list [--task <task-id>]
  npm run agents:locks -- audit [--task <task-id>]
`)
}

function nowIso() {
  return new Date().toISOString()
}

function normalizeFile(filePath) {
  return filePath.replace(/\\/g, '/').replace(/^\.\//, '')
}

function parseArgs(argv) {
  const [command, ...rest] = argv
  const opts = { _: [] }

  for (let i = 0; i < rest.length; i += 1) {
    const token = rest[i]
    if (token === '--task') {
      opts.task = rest[++i]
    } else if (token === '--agent') {
      opts.agent = rest[++i]
    } else if (token === '--note') {
      opts.note = rest[++i]
    } else if (token === '--all') {
      opts.all = true
    } else {
      opts._.push(token)
    }
  }

  return { command, opts }
}

async function readStore() {
  try {
    const raw = await readFile(STORE_PATH, 'utf8')
    return JSON.parse(raw)
  } catch {
    return {
      version: 1,
      updatedAt: nowIso(),
      tasks: {},
    }
  }
}

async function writeStore(store) {
  await mkdir(path.dirname(STORE_PATH), { recursive: true })
  store.updatedAt = nowIso()
  await writeFile(STORE_PATH, `${JSON.stringify(store, null, 2)}\n`, 'utf8')
}

function getTask(store, taskId, create = false) {
  if (!store.tasks[taskId] && create) {
    store.tasks[taskId] = {
      status: 'active',
      updatedAt: nowIso(),
      locks: [],
    }
  }
  return store.tasks[taskId]
}

function assertTask(taskId) {
  if (!taskId) {
    throw new Error('Missing --task <task-id>')
  }
}

function assertAgent(agent) {
  if (!VALID_AGENTS.has(agent)) {
    throw new Error('Invalid --agent (expected claude, codex, or gemini)')
  }
}

function printTask(taskId, task) {
  console.log(`\nTask: ${taskId}`)
  console.log(`Status: ${task.status}`)
  console.log(`Updated: ${task.updatedAt}`)
  if (!task.locks.length) {
    console.log('Locks: none')
    return
  }

  console.log('Locks:')
  for (const lock of task.locks) {
    console.log(`  - ${lock.file} :: ${lock.owner}${lock.note ? ` (${lock.note})` : ''}`)
  }
}

function auditTask(taskId, task) {
  const ownership = new Map()
  const issues = []

  for (const lock of task.locks) {
    const file = normalizeFile(lock.file)
    if (!VALID_AGENTS.has(lock.owner)) {
      issues.push(`[${taskId}] invalid owner "${lock.owner}" for ${file}`)
      continue
    }

    const existing = ownership.get(file)
    if (!existing) {
      ownership.set(file, lock.owner)
      continue
    }

    if (existing !== lock.owner) {
      issues.push(`[${taskId}] conflict: ${file} locked by both ${existing} and ${lock.owner}`)
    }
  }

  return issues
}

async function main() {
  const { command, opts } = parseArgs(process.argv.slice(2))
  if (!command) {
    usage()
    process.exit(1)
  }

  const store = await readStore()

  if (command === 'init') {
    assertTask(opts.task)
    getTask(store, opts.task, true)
    await writeStore(store)
    console.log(`Initialized lock task: ${opts.task}`)
    return
  }

  if (command === 'claim') {
    assertTask(opts.task)
    assertAgent(opts.agent)
    if (!opts._.length) {
      throw new Error('claim requires at least one file path')
    }

    const task = getTask(store, opts.task, true)
    const files = opts._.map(normalizeFile)
    const conflicts = []

    for (const file of files) {
      const existing = task.locks.find((lock) => normalizeFile(lock.file) === file)
      if (existing && existing.owner !== opts.agent) {
        conflicts.push(`${file} already locked by ${existing.owner}`)
      }
    }

    if (conflicts.length) {
      console.error('Lock conflict(s):')
      for (const conflict of conflicts) console.error(`  - ${conflict}`)
      process.exit(2)
    }

    for (const file of files) {
      const existingIndex = task.locks.findIndex((lock) => normalizeFile(lock.file) === file)
      const lock = {
        file,
        owner: opts.agent,
        note: opts.note || '',
        updatedAt: nowIso(),
      }

      if (existingIndex >= 0) {
        task.locks[existingIndex] = lock
      } else {
        task.locks.push(lock)
      }
    }

    task.updatedAt = nowIso()
    await writeStore(store)
    console.log(`Claimed ${files.length} file(s) for ${opts.agent} on task ${opts.task}`)
    return
  }

  if (command === 'release') {
    assertTask(opts.task)
    assertAgent(opts.agent)
    const task = getTask(store, opts.task, false)
    if (!task) {
      throw new Error(`Unknown task: ${opts.task}`)
    }

    let before = task.locks.length
    if (opts.all) {
      task.locks = task.locks.filter((lock) => lock.owner !== opts.agent)
    } else {
      if (!opts._.length) {
        throw new Error('release requires file paths or --all')
      }
      const files = new Set(opts._.map(normalizeFile))
      task.locks = task.locks.filter((lock) => {
        const target = files.has(normalizeFile(lock.file))
        return !(target && lock.owner === opts.agent)
      })
    }

    const released = before - task.locks.length
    task.updatedAt = nowIso()
    await writeStore(store)
    console.log(`Released ${released} lock(s) for ${opts.agent} on task ${opts.task}`)
    return
  }

  if (command === 'list') {
    if (opts.task) {
      const task = getTask(store, opts.task, false)
      if (!task) {
        throw new Error(`Unknown task: ${opts.task}`)
      }
      printTask(opts.task, task)
      return
    }

    const tasks = Object.entries(store.tasks)
    if (!tasks.length) {
      console.log('No tasks in lock store.')
      return
    }

    for (const [taskId, task] of tasks) {
      printTask(taskId, task)
    }
    return
  }

  if (command === 'audit') {
    const tasks = opts.task ? [[opts.task, getTask(store, opts.task, false)]] : Object.entries(store.tasks)
    const issues = []

    for (const [taskId, task] of tasks) {
      if (!task) throw new Error(`Unknown task: ${taskId}`)
      issues.push(...auditTask(taskId, task))
    }

    if (issues.length) {
      console.error('Lock audit failed:')
      for (const issue of issues) console.error(`  - ${issue}`)
      process.exit(2)
    }

    console.log('Lock audit passed.')
    return
  }

  usage()
  process.exit(1)
}

main().catch((error) => {
  console.error(`Error: ${error.message}`)
  process.exit(1)
})
