import assert from 'node:assert/strict'
import { once } from 'node:events'
import test from 'node:test'

import {
  processGroupHasRunningMember,
  spawnManagedProcess,
  stopManagedProcess,
} from './helpers/managed-next-process.mjs'

const parentWithLongLivedChild = `
  const { spawn } = require('node:child_process')
  spawn(
    process.execPath,
    ['-e', 'setInterval(() => {}, 1_000)'],
    { stdio: 'ignore' },
  )
  process.stdout.write('ready\\n')
  setInterval(() => {}, 1_000)
`

const waitForReady = async (child) => {
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(
      () => reject(new Error('managed process fixture did not become ready')),
      2_000,
    )

    once(child.stdout, 'data').then(
      () => {
        clearTimeout(timeout)
        resolve()
      },
      (error) => {
        clearTimeout(timeout)
        reject(error)
      },
    )
  })
}

test('managed process teardown exits the child tree and closes its pipes promptly', { timeout: 5_000 }, async () => {
  const child = spawnManagedProcess(process.execPath, ['-e', parentWithLongLivedChild])

  try {
    await waitForReady(child)
    const startedAt = Date.now()

    await stopManagedProcess(child, { graceMilliseconds: 500 })

    assert.ok(Date.now() - startedAt < 2_000, 'teardown must finish inside two seconds')
    assert.ok(child.exitCode !== null || child.signalCode !== null)
    assert.equal(child.stdout.destroyed, true)
    assert.equal(child.stderr.destroyed, true)

    if (process.platform !== 'win32') {
      // Every process in the group must be dead — but "dead" is not the same as
      // "gone from the process table". A killed orphan is reparented to init and
      // lingers as a zombie until init reaps it, which took 1.2-1.9s in a
      // container here while the processes themselves died in ~50ms. Asserting
      // on kill(-pgid, 0) measured init's reaping latency, not this teardown,
      // and failed about one run in four for that reason.
      //
      // A zombie holds no port, runs no code and writes no files, so the leak
      // this guards against is a *running* leftover. That is what we assert.
      assert.equal(
        processGroupHasRunningMember(child.pid),
        false,
        'no running process may remain in the group',
      )
    }
  } finally {
    await stopManagedProcess(child, { graceMilliseconds: 500 })
  }
})

test('managed process captures spawn failures without an uncaught error', async () => {
  const child = spawnManagedProcess('command-that-must-not-exist-for-managed-process-test', [])
  const [error] = await once(child, 'error')

  assert.equal(error.code, 'ENOENT')
  assert.equal(child.spawnError, error)

  await stopManagedProcess(child)
  assert.equal(child.stdout.destroyed, true)
  assert.equal(child.stderr.destroyed, true)
})
