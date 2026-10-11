import test from 'node:test'
import assert from 'node:assert'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const filePath = path.resolve(__dirname, '../../app/acos/presence/page.tsx')

test('Presence page should not contain unsupported numeric claims', () => {
  const content = fs.readFileSync(filePath, 'utf-8')
  assert.ok(!content.includes('75+ skills'), 'Page still contains "75+ skills"')
  assert.ok(!content.includes('38 agents'), 'Page still contains "38 agents"')
  assert.ok(
    !content.includes('35+ commands'),
    'Page still contains "35+ commands"',
  )
})
