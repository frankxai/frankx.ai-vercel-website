import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const read = (rel) => fs.readFileSync(path.join(root, rel), 'utf8')

test('/agents.md route exposes canonical FrankX discovery links and boundaries', () => {
  const source = read('app/agents.md/route.ts')
  assert.match(source, /text\/markdown; charset=utf-8/)
  assert.match(source, /\/llms\.txt/)
  assert.match(source, /\/llms-full\.txt/)
  assert.match(source, /\/ai-architecture/)
  assert.match(source, /\/products/)
  assert.match(source, /Not affiliated with, endorsed by, or sponsored by Oracle\./)
})

test('homepage hero replaces the staged noise contrast opener', () => {
  const homepage = read('components/home/HomePageElite.tsx')
  assert.doesNotMatch(homepage, /Most AI advice is noise\./i)
  assert.match(homepage, /Open blueprints for personal AI systems/)
})
