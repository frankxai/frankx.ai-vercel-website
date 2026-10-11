import test from 'node:test'
import assert from 'node:assert'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

test('downloads.ts should not contain unsupported numeric claims', () => {
  const currentFile = fileURLToPath(import.meta.url)
  const downloadsPath = path.resolve(currentFile, '../../../data/downloads.ts')

  const content = fs.readFileSync(downloadsPath, 'utf-8')

  const forbiddenClaims = [
    '90+ skills',
    '65+ commands',
    '38 agents',
    '90+ Skills',
    '65+ Commands',
    '38 Agents',
    '25+ AI Prompts',
    '50+ genre-specific Suno prompts',
    '50+ Suno Prompts',
    '90+ Autonomous Agent Skill Modules',
    '90+ Claude Skills',
  ]

  for (const claim of forbiddenClaims) {
    assert.ok(
      !content.includes(claim),
      `File data/downloads.ts must not contain the unsupported claim: "${claim}"`,
    )
  }
})
