import { execFile, spawn } from 'node:child_process'
import { readdirSync, readFileSync } from 'node:fs'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const isWindows = process.platform === 'win32'
const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds))
const resolveNextCli = () => require.resolve('next/dist/bin/next')

function hasExited(child) {
  return child.exitCode !== null || child.signalCode !== null
}

// A SIGKILLed process stays in the process table as a zombie until its parent
// reaps it — and an orphaned grandchild is reparented to init, so the reap is
// init's to do, not ours. `kill(-pgid, 0)` succeeds for a zombie, so the group
// reads as alive for however long that takes: measured at 1.2-1.9s inside a
// container, against the 1s budget stopManagedProcess allows after SIGKILL.
// That is what made teardown fail roughly one run in four while every process
// was in fact already dead within ~50ms.
//
// A zombie is not a running process, so it must not count as a live group
// member. Linux exposes the distinction in /proc/<pid>/stat; where it is not
// available we keep the original, more conservative answer.
export function processGroupHasRunningMember(pgid) {
  let entries
  try {
    entries = readdirSync('/proc')
  } catch {
    return true
  }

  for (const entry of entries) {
    if (!/^\d+$/.test(entry)) continue

    let stat
    try {
      stat = readFileSync(`/proc/${entry}/stat`, 'utf8')
    } catch {
      continue // exited between readdir and read
    }

    // Fields after the ")" that closes comm: state, ppid, pgrp, ...
    // comm itself can contain spaces and parentheses, so split on the last ")".
    const afterComm = stat.slice(stat.lastIndexOf(') ') + 2).split(' ')
    const state = afterComm[0]
    const processGroup = afterComm[2]

    if (processGroup === String(pgid) && state !== 'Z') return true
  }

  return false
}

function processGroupIsAlive(pid) {
  if (isWindows || !pid) return false

  try {
    process.kill(-pid, 0)
  } catch (error) {
    if (error?.code === 'ESRCH') return false
    throw error
  }

  return processGroupHasRunningMember(pid)
}

async function waitForTreeExit(child, timeoutMilliseconds) {
  const deadline = Date.now() + timeoutMilliseconds

  while (Date.now() < deadline) {
    if (hasExited(child) && !processGroupIsAlive(child.pid)) return true
    await delay(25)
  }

  return hasExited(child) && !processGroupIsAlive(child.pid)
}

function closePipes(child) {
  child.stdin?.destroy()
  child.stdout?.destroy()
  child.stderr?.destroy()
}

export function spawnManagedProcess(command, args, options = {}) {
  const child = spawn(command, args, {
    ...options,
    detached: !isWindows,
    shell: false,
    stdio: options.stdio ?? ['ignore', 'pipe', 'pipe'],
  })

  child.spawnError = null
  child.once('error', (error) => {
    child.spawnError = error
  })

  return child
}

export function startNextServer({ cwd, hostname = '127.0.0.1', port }) {
  return spawnManagedProcess(
    process.execPath,
    [resolveNextCli(), 'start', '--hostname', hostname, '--port', String(port)],
    { cwd },
  )
}

export async function stopManagedProcess(child, { graceMilliseconds = 5_000 } = {}) {
  try {
    if (!child.pid) return
    if (hasExited(child) && !processGroupIsAlive(child.pid)) return

    if (isWindows) {
      await new Promise((resolve) => {
        execFile('taskkill', ['/pid', String(child.pid), '/T', '/F'], () => resolve())
      })
      if (!(await waitForTreeExit(child, graceMilliseconds))) {
        throw new Error(`managed process tree ${child.pid} did not exit after taskkill`)
      }
      return
    }

    try {
      process.kill(-child.pid, 'SIGTERM')
    } catch (error) {
      if (error?.code !== 'ESRCH') throw error
    }

    if (await waitForTreeExit(child, graceMilliseconds)) return

    try {
      process.kill(-child.pid, 'SIGKILL')
    } catch (error) {
      if (error?.code !== 'ESRCH') throw error
    }

    if (!(await waitForTreeExit(child, 1_000))) {
      throw new Error(`managed process tree ${child.pid} did not exit after SIGKILL`)
    }
  } finally {
    closePipes(child)
  }
}
