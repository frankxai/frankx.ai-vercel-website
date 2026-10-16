import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const source = readFileSync(new URL('../../app/resources/skills/page.tsx', import.meta.url), 'utf8')

test('skills page points at frankxai/claude-skills-library and sets noopener', () => {
  assert.equal(source.includes('FrankXio/claude-skills'), false)
  assert.equal(source.includes('https://github.com/frankxai/claude-skills-library/archive/refs/heads/main.zip'), true)
  assert.equal(source.includes("window.open('https://github.com/frankxai/claude-skills-library/archive/refs/heads/main.zip', '_blank', 'noopener,noreferrer')"), true)
  assert.equal(source.includes('href="https://github.com/frankxai/claude-skills-library"'), true)
  assert.equal(source.includes('git clone https://github.com/frankxai/claude-skills-library.git'), true)
  assert.equal(source.includes('cp -r claude-skills-library/free-skills/* ~/.claude/skills/'), true)
  assert.equal(source.includes('cp -r claude-skills-library/* ~/.claude/skills/'), false)
  assert.equal(source.includes('cp -r claude-skills/*'), false)
})
