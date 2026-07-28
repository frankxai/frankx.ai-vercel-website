import { execFile, spawn } from 'node:child_process'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const isWindows = process.platform === 'win32'
const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds))
const resolveNextCli = () => require.resolve('next/dist/bin/next')

function hasExited(child) {
  return child.exitCode !== null || child.signalCode !== null
}

function processGroupIsAlive(pid) {
  if (isWindows || !pid) return false

  try {
    process.kill(-pid, 0)
    return true
  } catch (error) {
    if (error?.code === 'ESRCH') return false
    throw error
  }
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
