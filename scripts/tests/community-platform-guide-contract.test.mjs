import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'

const root = process.cwd()
const contentPath = path.join(root, 'content/guides/community-platform-for-creators.mdx')
const matrixPath = path.join(root, 'public/downloads/community-platform-matrix-2026.csv')
const pagePath = path.join(root, 'app/guides/[slug]/page.tsx')
const componentPath = path.join(
  root,
  'components/guides/community-platform/CommunityPlatformGuidePage.tsx'
)
const atlasPath = path.join(
  root,
  'components/guides/community-platform/CommunityPlatformAtlas.tsx'
)
const aiHelperPath = path.join(root, 'lib/community-platform-ai.ts')
const ogRoutePath = path.join(root, 'app/api/og/route.tsx')

function parseCsv(source) {
  const rows = []
  let row = []
  let value = ''
  let quoted = false

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index]
    if (quoted) {
      if (character === '"' && source[index + 1] === '"') {
        value += '"'
        index += 1
      } else if (character === '"') {
        quoted = false
      } else {
        value += character
      }
    } else if (character === '"') {
      quoted = true
    } else if (character === ',') {
      row.push(value)
      value = ''
    } else if (character === '\n') {
      row.push(value.replace(/\r$/, ''))
      rows.push(row)
      row = []
      value = ''
    } else {
      value += character
    }
  }

  if (value || row.length) {
    row.push(value.replace(/\r$/, ''))
    rows.push(row)
  }
  return rows.filter((candidate) => candidate.some(Boolean))
}

test('guide content uses supported metadata and no rejected raster infographics', () => {
  const content = fs.readFileSync(contentPath, 'utf8')

  assert.match(content, /title: "Circle vs Custom Community App: The 2026 Creator Guide"/)
  assert.match(content, /image: "\/api\/og\?variant=community-platforms"/)
  assert.match(content, /community platform with MCP/)
  assert.match(content, /The overlooked technical dark horse: Whop/)
  assert.doesNotMatch(content, /^# /m)
  assert.doesNotMatch(content, /\.\/assets\//)
  assert.doesNotMatch(content, /infographic-0[1-4]/)
  assert.doesNotMatch(content, /seoTitle:|canonical:|primaryKeyword:|secondaryKeywords:/)
})

test('platform registry is one valid, dated, source-backed 60-row dataset', () => {
  const rows = parseCsv(fs.readFileSync(matrixPath, 'utf8'))
  const [header, ...platforms] = rows

  assert.equal(header.length, 20)
  assert.equal(platforms.length, 60)
  assert.equal(new Set(platforms.map((row) => row[0])).size, 60)

  for (const [index, row] of platforms.entries()) {
    assert.equal(row.length, 20, `row ${index + 2} must have 20 columns`)
    assert.match(row[18], /^https:\/\//, `${row[0]} must have at least one HTTPS source`)
    assert.equal(row[19], '2026-07-27', `${row[0]} must carry the verification date`)
  }

  const circle = platforms.find((row) => row[0] === 'Circle')
  const whop = platforms.find((row) => row[0] === 'Whop')
  const fourthwall = platforms.find((row) => row[0] === 'Fourthwall')
  const beehiiv = platforms.find((row) => row[0] === 'beehiiv Community')
  assert.ok(circle?.[10].includes('Official Circle MCP'))
  assert.ok(whop?.[10].includes('MCP'))
  assert.ok(fourthwall?.[6].includes('not a regular App Store/Google Play app'))
  assert.ok(beehiiv?.[10].includes('Official action-capable beehiiv MCP'))

  const expectedOfficialMcpPlatforms = [
    'Circle',
    'Discourse',
    'Fourthwall',
    'Gainsight Customer Communities',
    'Higher Logic Vanilla',
    'Hivebrite',
    'Kajabi',
    'Mighty Networks',
    'Nas.com',
    'Slack',
    'Substack',
    'Teachable',
    'Thinkific',
    'Uscreen',
    'Whop',
    'beehiiv Community',
  ].sort((left, right) => left.localeCompare(right))
  const officialMcpPlatforms = platforms
    .filter(
      (row) =>
        row[10].toLowerCase().startsWith('official') &&
        row[10].toLowerCase().includes('mcp')
    )
    .map((row) => row[0])
    .sort((left, right) => left.localeCompare(right))

  assert.deepEqual(officialMcpPlatforms, expectedOfficialMcpPlatforms)
  const duplicateMatrix = path.join(root, 'data/research/community-platform-matrix-2026.csv')
  assert.equal(fs.existsSync(duplicateMatrix), false, 'public download must remain the single source')
})

test('bespoke route contains four real visual decision modules and the full registry', () => {
  const page = fs.readFileSync(pagePath, 'utf8')
  const component = fs.readFileSync(componentPath, 'utf8')
  const atlas = fs.readFileSync(atlasPath, 'utf8')
  const aiHelper = fs.readFileSync(aiHelperPath, 'utf8')

  assert.match(page, /guide\.slug === 'community-platform-for-creators'/)
  assert.match(page, /getCommunityPlatforms\(\)/)
  assert.match(component, /id="control-spectrum"/)
  assert.match(component, /<CommunityPlatformAtlas platforms=\{platforms\}/)
  assert.match(component, /<AiPermissionTopology platforms=\{platforms\} \/>/)
  assert.match(component, /id="proof-system"/)
  assert.match(component, /id="full-registry"/)
  assert.match(component, /type="ItemList"/)
  assert.match(component, /community-platform-matrix-2026\.csv/)
  assert.match(atlas, /Official MCP/)
  assert.match(atlas, /No public agent surface/)
  assert.match(aiHelper, /claim\.startsWith\('official'\) && claim\.includes\('mcp'\)/)
  assert.doesNotMatch(aiHelper, /OFFICIAL_MCP_PLATFORMS/)
})

test('bespoke Open Graph route produces a 1200 by 630 social card', () => {
  const route = fs.readFileSync(ogRoutePath, 'utf8')
  assert.match(route, /variant === 'community-platforms'/)
  assert.match(route, /Circle vs Custom/)
  assert.match(route, /Circle Business for the 90-day pilot/)
  assert.match(route, /width: 1200/)
  assert.match(route, /height: 630/)
})
