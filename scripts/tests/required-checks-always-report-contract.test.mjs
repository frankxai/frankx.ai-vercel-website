import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { runInNewContext } from 'node:vm'
import {
  requiredCheckAlwaysReportsErrors,
  stripYamlComment,
  topLevelMappingBlock,
} from './helpers/workflow-yaml-contract.mjs'

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
  const jobs = topLevelMappingBlock(workflow, 'jobs') ?? ''
  const jobLines = jobs
    .split(/\r?\n/)
    .slice(1)
    .map(stripYamlComment)
    .filter((line) => line.match(/^\s*/)[0].length === 2 && line.trim() !== '')
  const jobIds = jobLines.map((line) => line.match(/^  ([A-Za-z0-9_-]+):\s*$/)?.[1])
  if (jobLines.length !== 1 || !jobIds[0]) {
    return [`${label} must be the only job in its workflow, found ${jobLines.length}`]
  }
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
    assert.deepEqual(
      requiredJobNameErrors(workflow, label),
      [],
      `${file} must keep job name "${label}"`,
    )
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

  const quotedRealAndDecoy =
    "jobs:\n  'merge-gate':\n    name: Merge Gate (lite)\n    runs-on: ubuntu-latest\n" +
    '  placeholder:\n    name: Merge Gate\n    runs-on: ubuntu-latest\n    steps: []\n'
  assert.notDeepEqual(requiredJobNameErrors(quotedRealAndDecoy, 'Merge Gate'), [])
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
    'a paths-ignore filter': canonical.replace(
      'staging]',
      "staging]\n    paths-ignore:\n      - 'docs/**'",
    ),
    "a missing 'edited' type": canonical.replace(' edited,', ''),
    'a missing base branch': canonical.replace('[main, staging]', '[main]'),
    'an extra push trigger': canonical.replace(
      '  pull_request:',
      '  push:\n    branches: [main]\n  pull_request:',
    ),
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
    assert.notDeepEqual(
      requiredCheckAlwaysReportsErrors(workflow, 'Merge Gate'),
      [],
      `must reject ${name}`,
    )
  }
})

const ciDecision = (workflow, github) => {
  const group = topLevelMappingBlock(workflow, 'concurrency')?.match(/^  group:\s*(.+)$/m)?.[1]
  const condition = topLevelMappingBlock(workflow, 'jobs')?.match(/^    if:\s*(.+)$/m)?.[1]
  assert.ok(group, 'CI must declare its concurrency group')
  assert.ok(condition, 'CI must declare its job admission')
  const context = {
    github,
    format: (pattern, ...args) => pattern.replace(/\{(\d+)\}/g, (_, i) => String(args[Number(i)])),
  }
  const evaluate = (expression) => runInNewContext(expression, context, { timeout: 100 })
  return {
    admitted: Boolean(evaluate(condition)),
    group: group.replace(/\$\{\{([\s\S]*?)\}\}/g, (_, expression) => String(evaluate(expression))),
  }
}

const ciEvent = (over = {}) => ({
  event_name: 'pull_request',
  ref: 'refs/pull/1088/merge',
  event: { pull_request: { number: 1088, state: 'open', draft: false } },
  ...over,
})

test('CI admits ready and retargeted open PRs, defers drafts, and refuses closed PR edits', async () => {
  const workflow = await read('.github/workflows/ci.yml')
  for (const [state, draft, expected] of [
    ['open', false, true],
    ['open', true, false],
    ['closed', false, false],
    ['closed', true, false],
  ]) {
    const github = ciEvent({
      event: { action: 'edited', pull_request: { number: 1088, state, draft } },
    })
    assert.equal(ciDecision(workflow, github).admitted, expected, `${state}, draft=${draft}`)
  }
  assert.equal(
    ciDecision(workflow, ciEvent({ event_name: 'push', ref: 'refs/heads/main', event: {} }))
      .admitted,
    true,
  )
})

test('a merged PR receipt edit cannot cancel the current main verification', async () => {
  const workflow = await read('.github/workflows/ci.yml')
  const main = ciDecision(
    workflow,
    ciEvent({ event_name: 'push', ref: 'refs/heads/main', event: {} }),
  )
  // GitHub sends refs/heads/main for this closed, merged PR edit. Workflow concurrency is
  // evaluated before the job condition, so skipping the job alone does not protect main.
  const mergedEdit = ciDecision(
    workflow,
    ciEvent({
      ref: 'refs/heads/main',
      event: {
        action: 'edited',
        pull_request: { number: 1088, state: 'closed', draft: false, merged: true },
      },
    }),
  )
  assert.notEqual(mergedEdit.group, main.group)
  assert.equal(mergedEdit.admitted, false)
})

test('CI supersedes the same PR while keeping distinct PRs and main in separate groups', async () => {
  const workflow = await read('.github/workflows/ci.yml')
  const first = ciDecision(workflow, ciEvent())
  const nextPush = ciDecision(
    workflow,
    ciEvent({
      event: { action: 'synchronize', pull_request: { number: 1088, state: 'open', draft: false } },
    }),
  )
  const other = ciDecision(
    workflow,
    ciEvent({
      ref: 'refs/pull/12/merge',
      event: { pull_request: { number: 12, state: 'open', draft: false } },
    }),
  )
  const main = ciDecision(
    workflow,
    ciEvent({ event_name: 'push', ref: 'refs/heads/main', event: {} }),
  )
  assert.equal(first.group, nextPush.group)
  assert.notEqual(first.group, other.group)
  assert.notEqual(first.group, main.group)
})

test('new main runs are isolated from closed PR edits still using a historical workflow', async () => {
  const workflow = await read('.github/workflows/ci.yml')
  const main = ciDecision(
    workflow,
    ciEvent({ event_name: 'push', ref: 'refs/heads/main', event: {} }),
  )
  // Closed pull refs may retain the old workflow after the fix reaches main.
  const historical = workflow.replace(/^  group:.*$/m, '  group: ci-${{ github.ref }}')
  const historicalClosedPR = ciDecision(
    historical,
    ciEvent({
      ref: 'refs/heads/main',
      event: {
        action: 'edited',
        pull_request: { number: 1088, state: 'closed', draft: false, merged: true },
      },
    }),
  )
  assert.notEqual(main.group, historicalClosedPR.group)
})
