import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, copyFileSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { execFileSync } from 'node:child_process'

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
