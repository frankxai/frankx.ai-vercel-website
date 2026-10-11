import { test } from 'node:test'
import assert from 'node:assert'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '../../')

test('Agentic Creator OS preview page contains no unsupported claims', async () => {
  const pagePath = path.join(
    rootDir,
    'app/downloads/preview/agentic-creator-os/page.tsx',
  )
  const content = await fs.readFile(pagePath, 'utf8')

  assert.ok(
    !content.includes('90+'),
    'Page should not contain unsupported number 90+',
  )
  assert.ok(
    !content.includes('65+ workflows'),
    'Page should not contain unsupported number 65+ workflows',
  )
  assert.ok(
    !content.includes('38 specialized agents'),
    'Page should not contain unsupported number 38 specialized agents',
  )
})
