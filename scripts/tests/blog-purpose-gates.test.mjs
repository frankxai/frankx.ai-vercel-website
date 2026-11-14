import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, copyFileSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { execFileSync } from 'node:child_process'
import { groupTocSections } from '../../lib/blog-toc.ts'

const sourceHook = process.env.BLOG_GATE_TEST_HOOK || resolve('.claude/hooks/blog-commit-gate.sh')
const sourceVoice = resolve('scripts/voice-audit.sh')

function gate(post) {
  const root = mkdtempSync(join(tmpdir(), 'blog-purpose-gate-'))
  try {
    mkdirSync(join(root, '.claude/hooks'), { recursive: true })
    mkdirSync(join(root, 'scripts'))
    mkdirSync(join(root, 'content/blog'), { recursive: true })
    copyFileSync(sourceHook, join(root, '.claude/hooks/blog-commit-gate.sh'))
    copyFileSync(sourceVoice, join(root, 'scripts/voice-audit.sh'))
    writeFileSync(join(root, 'content/blog/fixture.mdx'), post)
    execFileSync('git', ['init', '-q'], { cwd: root })
    execFileSync('git', ['add', 'content/blog/fixture.mdx'], { cwd: root })
    const output = execFileSync('bash', ['.claude/hooks/blog-commit-gate.sh'], {
      cwd: root,
      input: JSON.stringify({ tool_name: 'Bash', tool_input: { command: 'git commit -m fixture' } }),
      encoding: 'utf8',
    })
    return JSON.parse(output)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
}

const frontmatter = `---
title: "A measured result"
description: "What the experiment established."
date: "2026-11-14"
category: "AI Architecture"
image: "/images/experiment.webp"
---\n`

test('short essay passes without question headings or FAQ', () => {
  assert.equal(gate(frontmatter + '## The finding\n\nThe local benchmark measured 12 requests.\n').continue, true)
})

test('tutorial may contain one useful FAQ answer without filler', () => {
  assert.equal(gate(frontmatter + '## Run the example\n\nUse the supplied fixture.\n\n## FAQ\n\n### Does this require network access?\nNo.\n').continue, true)
})

test('malformed frontmatter remains blocked', () => {
  const result = gate('---\ntitle: [unclosed\n---\nA finding.\n')
  assert.equal(result.continue, false)
  assert.match(result.stopReason, /frontmatter unparseable/)
})

test('metadata length and image requirements remain blocked', () => {
  const post = frontmatter.replace('A measured result', 'x'.repeat(61))
    .replace('What the experiment established.', 'y'.repeat(156))
    .replace('image: "/images/experiment.webp"\n', '')
  const result = gate(post + 'The finding.\n')
  assert.equal(result.continue, false)
  assert.match(result.stopReason, /title is 61 chars/)
  assert.match(result.stopReason, /description is 156 chars/)
  assert.match(result.stopReason, /missing image or coverAlt/)
})

test('real voice scanner still blocks prohibited copy', () => {
  const result = gate(frontmatter + 'An effortless workflow.\n')
  assert.equal(result.continue, false)
  assert.match(result.stopReason, /voice-audit flagged lines/)
})

test('flagship evidence requirements remain blocked when absent', () => {
  const result = gate(frontmatter.replace('AI Architecture', 'Flagship') + 'The finding.\n')
  assert.equal(result.continue, false)
  assert.match(result.stopReason, /requires `tldr`/)
  assert.match(result.stopReason, /requires `lastModified`/)
  assert.match(result.stopReason, /requires a counter-argument/)
})

test('flagship with evidence metadata and an objection needs no FAQ quota', () => {
  const post = frontmatter.replace('AI Architecture', 'Flagship')
    .replace('---\n', '---\ntldr: "What was measured and what remains unknown."\nlastModified: "2026-11-14"\n')
  assert.equal(gate(post + '## The finding\n\nMeasured locally.\n\n## The objection\n\nThe sample is small.\n').continue, true)
})

function scoreBrief(content) {
  const root = mkdtempSync(join(tmpdir(), 'autoresearch-score-'))
  try {
    const filePath = join(root, 'brief.mdx')
    writeFileSync(filePath, content)
    const stdout = execFileSync(process.execPath, [resolve('scripts/autoresearch-score.mjs'), filePath, '--json'], {
      encoding: 'utf8',
    })
    return JSON.parse(stdout)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
}

test('autoresearch scorer accepts concise essay without FAQ quotas and penalizes duplicate body TL;DR', () => {
  const baseBody = [
    '## Problem scope',
    '',
    'Teams often wait on resumes instead of shipping a small verifier ([Greenhouse 2026](https://www.greenhouse.io/blog/benchmark)).',
    '',
    '## Reproduction steps',
    '',
    '1. Run the script against a fixture.',
    '2. Record pass or fail counts.',
    '',
    '## Limits and trade-offs',
    '',
    'This covers only deterministic checks and stops short of subjective review.',
    '',
    '## Sources',
    '',
    '- [Greenhouse hiring report (2026-10)](https://www.greenhouse.io/blog/benchmark)',
  ].join('\n')

  const singleSummary = [
    '---',
    'title: "Concise benchmark note"',
    'description: "Short empirical note without synthetic FAQ quotas."',
    'tldr: "Single-slot frontmatter summary."',
    '---',
    '',
    baseBody,
  ].join('\n')

  const duplicateBodySummary = [
    '---',
    'title: "Concise benchmark note"',
    'description: "Short empirical note without synthetic FAQ quotas."',
    'tldr: "Single-slot frontmatter summary."',
    '---',
    '',
    '## TL;DR',
    '',
    'Duplicate summary repeated right inside the body.',
    '',
    baseBody,
  ].join('\n')

  const cleanResult = scoreBrief(singleSummary)
  const dupResult = scoreBrief(duplicateBodySummary)
  assert.ok(cleanResult.score > 0)
  assert.equal(cleanResult.components.aeo_score, 1)
  assert.ok(dupResult.components.aeo_score < cleanResult.components.aeo_score)
})

test('groupTocSections counts top-level H2 sections only and nests H3 items beneath them', () => {
  const sections = groupTocSections([
    { id: 'orphan-sub', text: 'Ignored orphan', level: 3 },
    { id: 'sec-1', text: 'First Section', level: 2 },
    { id: 'sec-1-sub', text: 'Subsection', level: 3 },
    { id: 'sec-2', text: 'FAQ', level: 2 },
    { id: 'faq-1', text: 'Question 1', level: 3 },
    { id: 'faq-2', text: 'Question 2', level: 3 },
  ])

  assert.equal(sections.length, 2)
  assert.deepEqual(
    sections.map((section) => section.id),
    ['sec-1', 'sec-2'],
  )
  assert.equal(sections[0].children.length, 1)
  assert.equal(sections[1].children.length, 2)
})
