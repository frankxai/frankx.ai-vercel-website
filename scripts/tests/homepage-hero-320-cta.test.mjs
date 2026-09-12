import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const readRepoFile = (path) => readFile(new URL(`../../${path}`, import.meta.url), 'utf8')

test('hero identity column and CTAs shrink inside a 320px viewport', async () => {
  const homepage = await readRepoFile('components/home/HomePageElite.tsx')

  assert.match(homepage, /className="order-1 min-w-0 space-y-8"/)
  assert.match(
    homepage,
    /className="inline-flex max-w-full min-w-0 flex-wrap items-center gap-2 px-3 py-1\.5 rounded-full/,
  )
  assert.match(
    homepage,
    /className="min-w-0 text-sm text-white\/60">AI architecture · agentic systems · creator intelligence/,
  )
  assert.match(
    homepage,
    /className="flex w-full min-w-0 max-w-full flex-col gap-3 sm:flex-row sm:gap-4"/,
  )
  assert.match(
    homepage,
    /href="\/ai-architecture"[\s\S]{0,220}className="group flex h-auto min-h-14 w-full min-w-0 max-w-full items-center/,
  )
  assert.match(
    homepage,
    /href="\/ecosystem"[\s\S]{0,180}className="flex h-auto min-h-14 w-full min-w-0 max-w-full items-center/,
  )
  assert.doesNotMatch(
    homepage,
    /href="\/ai-architecture"[\s\S]{0,220}className="group inline-flex h-auto min-h-14 w-full items-center/,
  )
})
