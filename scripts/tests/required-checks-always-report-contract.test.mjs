import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { requiredCheckAlwaysReportsErrors } from './helpers/workflow-yaml-contract.mjs'

const read = (path) => readFile(new URL(`../../${path}`, import.meta.url), 'utf8')

// The required contexts in branch protection are job names. A workflow that
// stops producing one of these exact names blocks every pull request, the same
// way a path filter does.
const REQUIRED = [
  { file: '.github/workflows/merge-gate.yml', label: 'Merge Gate' },
  { file: '.github/workflows/contract-guard.yml', label: 'Contract Guard' },
]

// The workflow must contain exactly one job and that job must carry the
// required name. Matching any `name:` line would let a pull request rename the
// real gate and add an unrelated job that keeps the old name, so the context
// would still report while the gate behind it was gone.
const requiredJobNameErrors = (workflow, label) => {
  const jobs = workflow.split(/^jobs:\s*$/m)[1] ?? ''
  const jobIds = [...jobs.matchAll(/^  ([A-Za-z0-9_-]+):\s*$/gm)].map((match) => match[1])
  if (jobIds.length !== 1) return [`${label} must be the only job in its workflow, found ${jobIds.length}`]
  const first = jobs.match(new RegExp(`^  ${jobIds[0]}:\\s*\\n    name: ${label}\\s*$`, 'm'))
  return first ? [] : [`job "${jobIds[0]}" must be named "${label}"`]
}

// The trigger both workflows carried until 2026-10-21, trimmed to the entries
// that matter here. Kept as a witness so the test reproduces the trap instead of
// only asserting its absence.
const OLD_FILTERED_TRIGGER = `
on:
  pull_request:
    types: [opened, synchronize, reopened, edited, ready_for_review]
    branches: [main, staging]
    paths:
      - 'app/**'
      - 'components/**'
      - 'package.json'
      - '.github/**'
      - '*.md'
      - 'eslint.config.*'
`

// GitHub path filters: '**' crosses directories, '*' does not.
const globToRegExp = (glob) =>
  new RegExp(
    `^${glob
      .replace(/[.+^${}()|[\]\\]/g, '\\$&')
      .replace(/\*\*/g, '\u0000')
      .replace(/\*/g, '[^/]*')
      .replace(/\u0000/g, '.*')}$`,
  )

const filterPatterns = (workflow) =>
  [...workflow.matchAll(/^\s+-\s+'([^']+)'\s*$/gm)].map((match) => match[1])

const reportsFor = (workflow, changedFiles) => {
  const patterns = filterPatterns(workflow)
  if (!/^\s+paths(?:-ignore)?:\s*$/m.test(workflow)) return true
  return changedFiles.some((file) => patterns.some((pattern) => globToRegExp(pattern).test(file)))
}

for (const { file, label } of REQUIRED) {
  test(`${label} reports on every pull request and keeps its required name`, async () => {
    const workflow = await read(file)

    assert.deepEqual(requiredCheckAlwaysReportsErrors(workflow, label), [])
    assert.deepEqual(requiredJobNameErrors(workflow, label), [], `${file} must keep job name "${label}"`)
  })

  test(`${label} produces a result for a .nvmrc-only pull request and for a surface change`, async () => {
    const workflow = await read(file)

    assert.equal(reportsFor(workflow, ['.nvmrc']), true)
    assert.equal(reportsFor(workflow, ['app/page.tsx']), true)
    assert.equal(reportsFor(workflow, ['some/new/class/of/file.xyz']), true)
  })
}

test('the retired path filter is the trap: it gave a .nvmrc-only pull request no result', () => {
  assert.equal(reportsFor(OLD_FILTERED_TRIGGER, ['.nvmrc']), false)
  assert.equal(reportsFor(OLD_FILTERED_TRIGGER, ['app/page.tsx']), true)
  assert.deepEqual(requiredCheckAlwaysReportsErrors(OLD_FILTERED_TRIGGER, 'Merge Gate'), [
    'Merge Gate is a required check and must report on every pull request: pull_request on main and staging, no paths or paths-ignore filter',
  ])
})

test('the job-name pin rejects a renamed gate and a decoy job that keeps the old name', () => {
  const real = 'jobs:\n  merge-gate:\n    name: Merge Gate\n    runs-on: ubuntu-latest\n'
  assert.deepEqual(requiredJobNameErrors(real, 'Merge Gate'), [])

  const renamed = 'jobs:\n  merge-gate:\n    name: Merge Gate (lite)\n    runs-on: ubuntu-latest\n'
  assert.notDeepEqual(requiredJobNameErrors(renamed, 'Merge Gate'), [])

  const decoy =
    'jobs:\n  merge-gate:\n    name: Merge Gate (lite)\n    runs-on: ubuntu-latest\n' +
    '  placeholder:\n    name: Merge Gate\n    runs-on: ubuntu-latest\n    steps: []\n'
  assert.notDeepEqual(requiredJobNameErrors(decoy, 'Merge Gate'), [])
})

test('the trigger pin rejects every way of bringing a filter or a gap back', () => {
  const canonical = `
on:
  pull_request:
    types: [opened, synchronize, reopened, edited, ready_for_review]
    branches: [main, staging]
`
  assert.deepEqual(requiredCheckAlwaysReportsErrors(canonical, 'Merge Gate'), [])

  const hostile = {
    'a paths filter': canonical.replace('staging]', "staging]\n    paths:\n      - 'app/**'"),
    'a paths-ignore filter': canonical.replace('staging]', "staging]\n    paths-ignore:\n      - 'docs/**'"),
    "a missing 'edited' type": canonical.replace(' edited,', ''),
    'a missing base branch': canonical.replace('[main, staging]', '[main]'),
    'an extra push trigger': canonical.replace('  pull_request:', '  push:\n    branches: [main]\n  pull_request:'),
    'a canonical trigger hidden in a block scalar above a filtered real one': `
env:
  DECOY: |
    on:
      pull_request:
        types: [opened, synchronize, reopened, edited, ready_for_review]
        branches: [main, staging]
on:
  pull_request:
    types: [opened, synchronize, reopened, edited, ready_for_review]
    branches: [main, staging]
    paths: ['app/**']
`,
  }

  for (const [name, workflow] of Object.entries(hostile)) {
    assert.notDeepEqual(requiredCheckAlwaysReportsErrors(workflow, 'Merge Gate'), [], `must reject ${name}`)
  }
})
