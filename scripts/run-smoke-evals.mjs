#!/usr/bin/env node
/**
 * ACOS L99 Smoke Eval Runner
 *
 * Discovers every `tests/fixtures/<agent-ref>/smoke.mjs` and runs them. Each
 * fixture is a self-contained Node script that exits 0 (pass) or 1 (fail).
 *
 * Used by:
 *   - CI gate before publishing the catalog
 *   - Local sanity check after editing an agent
 *   - The `tested` gate in data/acos/agents.ts → GATES_BY_REF
 *
 * Usage:
 *   node scripts/run-smoke-evals.mjs            # run all
 *   node scripts/run-smoke-evals.mjs meta-acos-score   # run one
 *   node scripts/run-smoke-evals.mjs --json     # JSON output for CI
 */

import { readdir, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const FIXTURES_DIR = path.join(ROOT, 'tests', 'fixtures')

const args = process.argv.slice(2)
const jsonOutput = args.includes('--json')
const filterAgent = args.find((a) => !a.startsWith('--'))

async function discoverFixtures() {
  if (!existsSync(FIXTURES_DIR)) return []
  const entries = await readdir(FIXTURES_DIR, { withFileTypes: true })
  const fixtures = []
  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    if (entry.name.startsWith('_')) continue // skip _shared etc
    if (filterAgent && entry.name !== filterAgent) continue
    const smokePath = path.join(FIXTURES_DIR, entry.name, 'smoke.mjs')
    if (existsSync(smokePath)) {
      fixtures.push({ agent: entry.name, path: smokePath })
    }
  }
  return fixtures
}

async function runOne(fixture) {
  const start = Date.now()
  return new Promise((resolve) => {
    const proc = spawn('node', [fixture.path], { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'] })
    let stdout = ''
    let stderr = ''
    proc.stdout.on('data', (d) => { stdout += d.toString() })
    proc.stderr.on('data', (d) => { stderr += d.toString() })
    proc.on('close', (code) => {
      resolve({
        agent: fixture.agent,
        path: fixture.path,
        exit: code,
        passed: code === 0,
        duration_ms: Date.now() - start,
        stdout: stdout.trim(),
        stderr: stderr.trim(),
      })
    })
  })
}

async function main() {
  const fixtures = await discoverFixtures()
  if (fixtures.length === 0) {
    const msg = filterAgent
      ? `No fixture found at tests/fixtures/${filterAgent}/smoke.mjs`
      : 'No fixtures found under tests/fixtures/'
    if (jsonOutput) {
      console.log(JSON.stringify({ status: 'no_fixtures', fixtures: [] }))
    } else {
      console.error(msg)
    }
    process.exit(1)
  }

  const results = []
  for (const fixture of fixtures) {
    results.push(await runOne(fixture))
  }

  const passed = results.filter((r) => r.passed).length
  const failed = results.filter((r) => !r.passed).length

  if (jsonOutput) {
    console.log(JSON.stringify({
      status: failed === 0 ? 'all_pass' : 'has_failures',
      total: results.length,
      passed,
      failed,
      results,
    }, null, 2))
  } else {
    for (const r of results) {
      const badge = r.passed ? 'PASS' : 'FAIL'
      console.log(`[${badge}] ${r.agent} (${r.duration_ms}ms)`)
      if (!r.passed && r.stderr) {
        console.log(`  stderr: ${r.stderr.split('\n').slice(0, 5).join('\n  ')}`)
      }
      if (!r.passed && r.stdout) {
        console.log(`  stdout: ${r.stdout.split('\n').slice(0, 5).join('\n  ')}`)
      }
    }
    console.log(`\n${passed}/${results.length} passed.`)
  }

  process.exit(failed === 0 ? 0 : 1)
}

main().catch((err) => {
  console.error('Runner error:', err)
  process.exit(2)
})
