#!/usr/bin/env node

/**
 * QA Gatekeeper
 *
 * Lightweight orchestration for pre-publish quality checks.
 * Defaults to fast deterministic checks and supports optional heavier checks.
 *
 * Usage:
 *   node scripts/qa-gatekeeper.mjs
 *   node scripts/qa-gatekeeper.mjs --with-types --with-links
 *   node scripts/qa-gatekeeper.mjs --non-strict
 */

import { spawn } from 'node:child_process'

const args = new Set(process.argv.slice(2))
const withTypes = args.has('--with-types')
const withLinks = args.has('--with-links')
const strict = !args.has('--non-strict')

function run(label, cmd, cmdArgs) {
  return new Promise((resolve) => {
    console.log(`\n[gate] ${label}`)
    console.log(`[run ] ${cmd} ${cmdArgs.join(' ')}`)

    const child = spawn(cmd, cmdArgs, {
      stdio: 'inherit',
      shell: process.platform === 'win32',
    })

    child.on('close', (code) => {
      resolve({ label, code: code ?? 1 })
    })
  })
}

const checks = [
  {
    label: 'Content Validation',
    cmd: 'npm',
    args: ['run', 'content:validate'],
  },
  {
    label: 'Claims Audit (Strict)',
    cmd: 'npm',
    args: ['run', 'claims:audit:strict'],
  },
]

if (withTypes) {
  checks.push({
    label: 'Type Check',
    cmd: 'npm',
    args: ['run', 'type-check'],
  })
}

if (withLinks) {
  checks.push({
    label: 'Link Check (CI mode)',
    cmd: 'npm',
    args: ['run', 'links:check:ci'],
  })
}

console.log('========================================')
console.log('QA GATEKEEPER')
console.log('========================================')
console.log(`Checks: ${checks.length}`)
console.log(`Options: withTypes=${withTypes} withLinks=${withLinks} strict=${strict}`)

const results = []
for (const check of checks) {
  // eslint-disable-next-line no-await-in-loop
  const result = await run(check.label, check.cmd, check.args)
  results.push(result)
}

const failed = results.filter((result) => result.code !== 0)
const passed = results.filter((result) => result.code === 0)

console.log('\n========================================')
console.log('QA SUMMARY')
console.log('========================================')
console.log(`Passed: ${passed.length}`)
console.log(`Failed: ${failed.length}`)

if (failed.length > 0) {
  for (const result of failed) {
    console.log(`- FAIL: ${result.label} (exit ${result.code})`)
  }

  if (strict) {
    process.exit(1)
  }

  console.log('\nNon-strict mode: returning exit 0 despite failures.')
  process.exit(0)
}

console.log('All gate checks passed.')
process.exit(0)
