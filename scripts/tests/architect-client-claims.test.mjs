import { test } from 'node:test'
import assert from 'node:assert'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

test('AIArchitectClient.tsx should not contain unsupported numeric claims', async () => {
  const filePath = path.join(
    __dirname,
    '../../app/ai-architect/AIArchitectClient.tsx',
  )
  const content = await fs.readFile(filePath, 'utf8')

  assert.ok(
    !content.includes('20+ enterprise patterns'),
    'File should not contain "20+ enterprise patterns"',
  )
  assert.ok(
    !content.includes('15+ MCP Servers'),
    'File should not contain "15+ MCP Servers"',
  )
  assert.ok(
    !content.includes('80+ skills'),
    'File should not contain "80+ skills"',
  )

  // also test it contains the correct strings
  assert.ok(
    content.includes(
      'Enterprise patterns refined through real-world implementations',
    ),
    'File should contain the fixed patterns string',
  )
  assert.ok(
    content.includes(
      'Explore the full AI Architect Academy with 13 learning paths.',
    ),
    'File should contain the fixed academy string',
  )
})
