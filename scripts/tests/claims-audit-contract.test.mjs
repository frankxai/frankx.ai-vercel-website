import assert from 'node:assert/strict'
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const scriptPath = path.join(root, 'scripts/audit-marketing-claims.mjs')

test('claims-audit script fails on seeded bad claims without evidence', () => {
  const badFixtureDir = path.join(root, 'app/_test_bad_claims_fixture')
  fs.mkdirSync(badFixtureDir, { recursive: true })
  const badFile = path.join(badFixtureDir, 'page.tsx')

  try {
    fs.writeFileSync(
      badFile,
      `
export default function BadPage() {
  return (
    <div>
      <p>We deliver a 99.99% uptime SLA guaranteed.</p>
      <p>Proven benchmark performance on all workloads.</p>
      <p>10K+ creators trust us daily.</p>
      <p>Guaranteed receipt payouts of $500k MRR.</p>
    </div>
  )
}
`
    )

    assert.throws(
      () => {
        execSync(`node "${scriptPath}" --strict`, {
          cwd: root,
          encoding: 'utf8',
          stdio: 'pipe',
        })
      },
      (err) => {
        const output = err.stdout || err.stderr || ''
        assert.match(output, /Numeric SLA or Uptime claim/)
        assert.match(output, /Unbacked benchmark claim/)
        assert.match(output, /Large vanity metric/)
        assert.match(output, /Unbacked receipt or financial claim/)
        return true
      }
    )
  } finally {
    fs.rmSync(badFixtureDir, { recursive: true, force: true })
  }
})

test('claims-audit script passes on clean claims and evidence-backed claims', () => {
  const cleanFixtureDir = path.join(root, 'app/_test_clean_claims_fixture')
  fs.mkdirSync(cleanFixtureDir, { recursive: true })
  const cleanFile = path.join(cleanFixtureDir, 'page.tsx')

  try {
    fs.writeFileSync(
      cleanFile,
      `
export default function CleanPage() {
  return (
    <div>
      <p>Built with reliable architecture and clear guarantees.</p>
      {/* evidence: /docs/sla-report.md */}
      <p>We offer a 99.99% uptime SLA for enterprise plans.</p>
      <p data-evidence="https://benchmarks.example.com">Proven benchmark metrics recorded in lab.</p>
    </div>
  )
}
`
    )

    const stdout = execSync(`node "${scriptPath}" --strict`, {
      cwd: root,
      encoding: 'utf8',
    })

    assert.match(stdout, /no high-risk claim patterns detected/)
  } finally {
    fs.rmSync(cleanFixtureDir, { recursive: true, force: true })
  }
})
