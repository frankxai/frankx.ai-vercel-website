#!/usr/bin/env node
/**
 * Contract-test syntax sweep.
 *
 * A contract test that does not parse is worse than no test: it reports as a
 * failure only if something runs it, and if nothing runs it, the surface it
 * guards is silently unprotected.
 *
 * This happened. #416 (2026-08-02) introduced `/from-void\\/20/` into
 * scripts/tests/homepage-mind-palace-contract.test.mjs — the escaped backslash
 * ends the escape, the following slash closes the pattern, and `20/` is read as
 * regex flags. The file was a SyntaxError on main for three days. Nothing
 * reported it, because merge:gate was invoked by no workflow at the time.
 *
 * This check costs ~2 seconds and would have caught it on the day it landed.
 * It runs first in the gate so a broken test file fails loudly rather than
 * hiding behind whatever runs after it.
 */
import { execFileSync } from 'node:child_process'
import { readdirSync } from 'node:fs'
import path from 'node:path'

const TEST_DIR = 'scripts/tests'

let files
try {
  files = readdirSync(TEST_DIR)
    .filter((f) => f.endsWith('.mjs'))
    .map((f) => path.posix.join(TEST_DIR, f))
    .sort()
} catch {
  console.error(`[test-syntax] ${TEST_DIR} not found`)
  process.exit(2)
}

const broken = []
for (const file of files) {
  try {
    execFileSync(process.execPath, ['--check', file], { stdio: 'pipe' })
  } catch (err) {
    broken.push({ file, detail: String(err.stderr || err.message).trim().split('\n').slice(0, 4) })
  }
}

if (broken.length === 0) {
  console.log(`[test-syntax] ${files.length} test files parse ✓`)
  process.exit(0)
}

console.error('')
console.error(`[test-syntax] ${broken.length} of ${files.length} test files do not parse:`)
console.error('')
for (const { file, detail } of broken) {
  console.error(`  ${file}`)
  for (const line of detail) console.error(`      ${line}`)
  console.error('')
}
console.error('A test that cannot parse cannot protect anything. Fix the syntax')
console.error('before relying on the contract it claims to enforce.')
console.error('')
process.exit(1)
