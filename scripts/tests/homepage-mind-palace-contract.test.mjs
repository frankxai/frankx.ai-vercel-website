import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const readRepoFile = (path) => readFile(new URL(`../../${path}`, import.meta.url), 'utf8')

test('the public homepage remains the music-led living studio', async () => {
  const page = await readRepoFile('app/page.tsx')
  const homepage = await readRepoFile('components/home/HomePageElite.tsx')

  assert.match(page, /import HomePageElite from '@\/components\/home\/HomePageElite'/)
  assert.match(page, /import \{ homepageFeaturedRelease \} from '@\/data\/homepage-featured-release'/)
  assert.match(page, /featuredTrack=\{homepageFeaturedRelease\}/)
  assert.doesNotMatch(page, /<FrankXProductionHome\b/)

  assert.match(homepage, /https:\/\/suno\.com\/embed\/\$\{track\.sunoId\}/)
  assert.match(homepage, /loading="eager"/)
  assert.match(homepage, /<MindPalaceAtlas \/>/)
  assert.doesNotMatch(homepage, /autoplay=(?:1|true)/i)
})

test('the featured release stays human-reviewed instead of following the raw catalog', async () => {
  const release = await readRepoFile('data/homepage-featured-release.ts')

  assert.match(release, /reviewStatus: 'approved'/)
  assert.match(release, /Raw Suno catalog entries must never replace this object automatically/)
  assert.match(release, /reviewedAt: '\d{4}-\d{2}-\d{2}'/)
  assert.match(release, /sunoId: '[0-9a-f-]+'/)
})

test('the mind palace scene has a complete accessible fallback and scoped cleanup', async () => {
  const atlas = await readRepoFile('components/home/MindPalaceAtlas.tsx')

  for (const route of ['/music', '/learn', '/acos', '/soulbook', '/products', '/ecosystem']) {
    assert.match(atlas, new RegExp(`href: '${route.replace('/', '\\/')}'`))
  }

  assert.match(atlas, /useGSAP\(/)
  assert.match(atlas, /gsap\.matchMedia\(\)/)
  assert.match(atlas, /prefers-reduced-motion: reduce/)
  assert.match(atlas, /pointer: coarse/)
  assert.match(atlas, /return \(\) => media\.revert\(\)/)
  assert.match(atlas, /data-palace-route/)
  assert.match(atlas, /focus-visible:ring-2/)
  assert.doesNotMatch(atlas, /pin:\s*true/)
})
