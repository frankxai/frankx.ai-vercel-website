import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

import { authLogger } from '../../lib/auth-logger.ts'

function capture(run) {
  const calls = []
  const original = { error: console.error, warn: console.warn }
  console.error = (...args) => calls.push({ level: 'error', text: args.join(' ') })
  console.warn = (...args) => calls.push({ level: 'warn', text: args.join(' ') })
  try {
    run()
  } finally {
    console.error = original.error
    console.warn = original.warn
  }
  return calls
}

// Shaped like an Auth.js AuthError: `name` and `type` are both the class name.
function authError(type, message, extra = {}) {
  return Object.assign(
    new Error(`${message}. Read more at https://errors.authjs.dev#${type.toLowerCase()}`),
    { name: type, type },
    extra,
  )
}

test('an unknown auth action is a warning, not a runtime error', () => {
  const calls = capture(() =>
    authLogger.error(authError('UnknownAction', 'Cannot parse action at /api/auth/config')),
  )

  assert.deepEqual(
    calls.map((call) => call.level),
    ['warn'],
  )
  assert.match(calls[0].text, /UnknownAction: Cannot parse action at \/api\/auth\/config/)
})

test('every other Auth.js error keeps the error level and the Auth.js format', () => {
  const calls = capture(() => {
    authLogger.error(authError('CredentialsSignin', 'Read more'))
    authLogger.error(new Error('boom'))
  })

  const errorLines = calls.filter((call) => call.level === 'error')
  assert.equal(errorLines.length, calls.length, 'nothing else may be downgraded')
  assert.match(errorLines[0].text, /^\[auth\]\[error\] CredentialsSignin: /)
  assert.ok(
    errorLines.some((call) => call.text.startsWith('[auth][error] Error: boom')),
    'a plain Error is reported under its own name',
  )
})

test('an error caused by another error still reports the cause', () => {
  const calls = capture(() =>
    authLogger.error(
      authError('AdapterError', 'Adapter failed', { cause: { err: new Error('db down'), code: 7 } }),
    ),
  )

  assert.ok(calls.every((call) => call.level === 'error'))
  assert.ok(calls.some((call) => call.text.startsWith('[auth][cause]:')))
  assert.ok(calls.some((call) => call.text.startsWith('[auth][details]:') && call.text.includes('"code": 7')))
})

test('the Auth.js config uses this logger', async () => {
  const source = await readFile(new URL('../../lib/auth.ts', import.meta.url), 'utf8')

  assert.match(source, /import \{ authLogger \} from '\.\/auth-logger'/)
  assert.match(source, /logger:\s*authLogger/)
})
