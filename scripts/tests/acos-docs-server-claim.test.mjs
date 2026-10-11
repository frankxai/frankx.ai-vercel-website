import test from 'node:test'
import assert from 'node:assert'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

test('app/products/agentic-creator-os/docs/page.tsx does not contain unsupported claim MCP Servers', async () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  // The test script is in scripts/tests/, so we go up two levels to root, then to app/
  const pagePath = path.resolve(
    __dirname,
    '../../app/products/agentic-creator-os/docs/page.tsx',
  )

  const content = await fs.readFile(pagePath, 'utf-8')

  assert.ok(content.includes('Agents'), 'Page should still contain Agents')
  assert.ok(
    content.includes('Workflows'),
    'Page should still contain Workflows',
  )

  // Checking for the deleted string in the quickStats section or anywhere.
  // The prompt states: "The test fails if the page still contains MCP Servers."
  assert.ok(
    !content.includes("label: 'MCP Servers'"),
    'Page should not contain MCP Servers claim in stats',
  )
})
