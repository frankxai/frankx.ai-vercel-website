import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

async function source(relativePath) {
  return readFile(path.join(root, relativePath), 'utf8')
}

test('the public install button uses the published source installer', async () => {
  const command = await source('lib/acos/install-command.ts')
  const agents = await source('app/agents/page.tsx')
  const pack = await source('app/agents/packs/[pillar]/page.tsx')
  const card = await source('components/agents/AcosInstallCard.tsx')

  assert.match(command, /git clone https:\/\/github.com\/frankxai\/agentic-creator-os\.git/)
  assert.match(command, /install\.sh --platform=claude/)
  assert.equal(`${agents}\n${pack}\n${card}\n${command}`.includes('npx @frankx/acos'), false)
  assert.match(agents, /AcosInstallCard/)
  assert.match(card, /Copy the command/)
  assert.match(card, /min-h-11/)
  assert.equal(pack.includes('href="/agents/packs/meta"'), false)
})
