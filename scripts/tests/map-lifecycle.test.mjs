import assert from 'node:assert/strict'
import { setImmediate } from 'node:timers/promises'
import test from 'node:test'
import { startMapLifecycle } from '../../lib/map-lifecycle.ts'

function scenario(overrides = {}) {
  const events = []
  const options = {
    load: async () => 'library',
    create: () => { events.push('create'); return 'map' },
    configure: () => { events.push('configure') },
    dispose: () => { events.push('dispose') },
    onError: (error) => { events.push(error.message) },
    ...overrides,
  }
  return { events, stop: startMapLifecycle(options) }
}

test('an import resolved after unmount does not create a map', async () => {
  let resolveImport
  const pending = new Promise((resolve) => { resolveImport = resolve })
  const { events, stop } = scenario({ load: () => pending })
  stop()
  resolveImport('library')
  await setImmediate()
  assert.deepEqual(events, [])
})

test('import failure reaches the fallback without allocating a map', async () => {
  const { events } = scenario({ load: async () => { throw new Error('import failed') } })
  await setImmediate()
  assert.deepEqual(events, ['import failed'])
})

test('unsupported GPU initialization reaches the fallback', async () => {
  const { events } = scenario({ create: () => { throw new Error('GPU unavailable') } })
  await setImmediate()
  assert.deepEqual(events, ['GPU unavailable'])
})

test('partial setup is disposed before rendering its fallback', async () => {
  const { events, stop } = scenario({ configure: () => { throw new Error('setup failed') } })
  await setImmediate()
  stop()
  assert.deepEqual(events, ['create', 'dispose', 'setup failed'])
})

test('runtime failure tears down the map once and ignores later callbacks', async () => {
  let failMap
  const { events, stop } = scenario({ configure: (_map, _library, fail) => { failMap = fail } })
  await setImmediate()
  failMap(new Error('worker failed'))
  failMap(new Error('late error'))
  stop()
  assert.deepEqual(events, ['create', 'dispose', 'worker failed'])
})

test('normal unmount disposes exactly once and ignores late error callbacks', async () => {
  let failMap
  const { events, stop } = scenario({ configure: (_map, _library, fail) => { failMap = fail } })
  await setImmediate()
  stop()
  stop()
  failMap(new Error('late error'))
  assert.deepEqual(events, ['create', 'dispose'])
})
