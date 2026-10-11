import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '../../')

test('components/ai-architectures/AIArchitecturesShell.tsx does not publish unsupported scale claims', () => {
  const filePath = path.join(
    rootDir,
    'components/ai-architectures/AIArchitecturesShell.tsx',
  )
  const content = fs.readFileSync(filePath, 'utf8')

  assert.equal(
    content.includes('50M+'),
    false,
    'The claim "50M+" should be removed from AIArchitecturesShell.tsx',
  )
  assert.equal(
    content.includes('Avg Uptime'),
    false,
    'The claim "Avg Uptime" should be removed from AIArchitecturesShell.tsx',
  )
})
