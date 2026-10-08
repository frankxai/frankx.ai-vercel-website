import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import test from 'node:test'

// /music listed a "Membership + Inner Circle" monetization lane promising monthly
// drops of unreleased tracks. /inner-circle is not a live community, so the lane
// was dropped with no substitute. This keeps it from coming back through any
// music source: the route, its components and music data.

const root = process.cwd()
const roots = ['app/music', 'components/music', 'lib/music', 'lib/music.ts', 'data/music']

function sourceFiles(path) {
  const abs = join(root, path)
  if (!existsSync(abs)) return []
  if (statSync(abs).isFile()) return /\.(tsx?|mjs|js|json|mdx?)$/.test(abs) ? [abs] : []
  return readdirSync(abs).flatMap((name) => sourceFiles(join(path, name)))
}

const files = roots.flatMap(sourceFiles)
const pages = ['app/music/page.tsx', 'components/music/MusicShell.tsx']

const banned = [
  /Membership \+ Inner Circle/,
  /Inner Circle/i,
  /unreleased tracks/i,
  /Monthly drops with/i,
  /Reward early members/,
  /["'`]\/inner-circle\b/,
]

test('music sources are scanned', () => {
  for (const page of pages) assert.ok(files.includes(join(root, page)), `${page} must be scanned`)
})

test('no music source carries the Inner Circle lane or an /inner-circle link', () => {
  for (const file of files) {
    const text = readFileSync(file, 'utf8')
    for (const pattern of banned) {
      assert.doesNotMatch(text, pattern, `${relative(root, file)} matches ${pattern}`)
    }
  }
})

test('the monetization section keeps its other lanes and a grid sized to them', () => {
  for (const page of pages) {
    const text = readFileSync(join(root, page), 'utf8')
    const lanes = text.match(/const revenuePaths = \[([\s\S]*?)\r?\n\]/)
    assert.ok(lanes, `${page} defines revenuePaths`)
    const titles = [...lanes[1].matchAll(/title: '([^']+)'/g)].map((m) => m[1])
    assert.deepEqual(titles, ['Streaming Expansion', 'Direct Digital Products', 'Creator Licensing'], page)

    const section = text.slice(text.indexOf('function RevenuePathsSection'))
    assert.match(section, /className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">\s*\{revenuePaths\.map/, page)
    assert.doesNotMatch(section.slice(0, section.indexOf('revenuePaths.map')), /membership/i, page)
  }
})