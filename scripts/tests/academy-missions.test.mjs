import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'

import {
  FRANKX_MCP_ENTRYPOINT_META,
  GUIDE_ACADEMY_MISSIONS,
  ICP_TRACKS,
  MAPPED_GUIDE_SLUGS,
  academyBridgeForGuide,
  guidesForIcpTrack,
} from '../../lib/learn/academy-missions.ts'

const root = process.cwd()
const guidesDir = path.join(root, 'content/guides')

const diskGuideSlugs = fs
  .readdirSync(guidesDir)
  .filter((name) => name.endsWith('.mdx'))
  .map((name) => name.replace(/\.mdx$/i, ''))
  .sort()

test('every guide MDX on disk has an explicit non-fallback academy mission mapping', () => {
  assert.ok(diskGuideSlugs.length >= 44, `expected at least 44 guides, found ${diskGuideSlugs.length}`)
  assert.deepEqual([...MAPPED_GUIDE_SLUGS], diskGuideSlugs)

  for (const slug of diskGuideSlugs) {
    const spec = academyBridgeForGuide(slug)
    assert.equal(spec.guideSlug, slug)
    assert.notEqual(spec.isFallback, true, `${slug} must have an explicit mapping`)
    assert.ok(spec.curriculumWeek.length > 0, `${slug} must declare curriculumWeek`)
    assert.ok(spec.artifact.deliverable.length > 10, `${slug} must declare artifact deliverable`)
    assert.ok(spec.artifact.redGateCondition.length > 10, `${slug} must declare red-gate check`)
  }
})

test('all four ICP tracks are valid, distinct per guide, and populated across the catalog', () => {
  const validTracks = new Set(Object.keys(ICP_TRACKS))
  assert.deepEqual(
    [...validTracks].sort(),
    ['enterprise-architect', 'production-builder', 'technical-creator', 'workflow-operator']
  )

  for (const slug of MAPPED_GUIDE_SLUGS) {
    const spec = GUIDE_ACADEMY_MISSIONS[slug]
    assert.ok(validTracks.has(spec.primaryIcp), `${slug} invalid primaryIcp`)
    assert.ok(validTracks.has(spec.secondaryIcp), `${slug} invalid secondaryIcp`)
    assert.notEqual(
      spec.primaryIcp,
      spec.secondaryIcp,
      `${slug} primaryIcp and secondaryIcp must be distinct`
    )
  }

  for (const track of validTracks) {
    const matches = guidesForIcpTrack(track)
    assert.ok(matches.length >= 5, `expected multiple guides routed to ${track}`)
  }
})

test('paired CLI labs and SIA missions use only public verified URLs', () => {
  for (const slug of MAPPED_GUIDE_SLUGS) {
    const spec = GUIDE_ACADEMY_MISSIONS[slug]
    assert.ok(spec.cliLabs.length >= 1, `${slug} needs at least one CLI lab`)
    assert.ok(spec.siaMissions.length >= 1, `${slug} needs at least one SIA mission`)

    for (const lab of spec.cliLabs) {
      assert.match(
        lab.githubUrl,
        /^https:\/\/github\.com\/frankxai\/ai-architect-academy\/tree\/main\/.+/,
        `${slug} lab URL must point to public frankxai/ai-architect-academy`
      )
      assert.doesNotMatch(
        lab.githubUrl,
        /starlight-command|agentic-ops|FrankX\b/i,
        `${slug} must never link private repositories`
      )
    }

    for (const mission of spec.siaMissions) {
      assert.match(mission.siaPath, /^\/academy(\/[a-z0-9-]+)?$/)
      assert.equal(mission.url, `https://starlightintelligence.academy${mission.siaPath}`)
    }
  }
})

test('MCP agent entrypoint metadata matches stateless POST /api/mcp and server-card routes', () => {
  assert.equal(
    fs.existsSync(path.join(root, 'app/api/mcp/route.ts')),
    true,
    'app/api/mcp/route.ts must exist'
  )
  assert.equal(
    fs.existsSync(path.join(root, 'app/api/mcp/server-card/route.ts')),
    true,
    'app/api/mcp/server-card/route.ts must exist'
  )

  const allowedTools = new Set(FRANKX_MCP_ENTRYPOINT_META.availableTools)

  for (const slug of MAPPED_GUIDE_SLUGS) {
    const mcp = GUIDE_ACADEMY_MISSIONS[slug].mcpEntrypoint
    assert.equal(mcp.endpointPath, '/api/mcp')
    assert.equal(mcp.serverCardPath, '/api/mcp/server-card')
    assert.equal(mcp.transport, 'streamable-http')
    assert.equal(mcp.method, 'POST')
    assert.equal(mcp.readOnly, true)
    assert.ok(allowedTools.has(mcp.toolName), `${slug} uses unsupported MCP tool ${mcp.toolName}`)

    const parsed = JSON.parse(mcp.jsonRpcSample)
    assert.equal(parsed.jsonrpc, '2.0')
    assert.equal(parsed.method, 'tools/call')
    assert.equal(parsed.params.name, mcp.toolName)
  }
})

test('academyBridgeForGuide returns defensive clones and falls back cleanly for unknown slugs', () => {
  const first = academyBridgeForGuide('vercel-ai-sdk')
  first.artifact.deliverable = 'mutated'
  const second = academyBridgeForGuide('vercel-ai-sdk')
  assert.notEqual(second.artifact.deliverable, 'mutated')

  const unknown = academyBridgeForGuide('future-unmapped-guide-2027')
  assert.equal(unknown.isFallback, true)
  assert.equal(unknown.guideSlug, 'future-unmapped-guide-2027')
  assert.equal(unknown.mcpEntrypoint.endpointPath, '/api/mcp')
})

test('GuidePage wires AcademyMissionBridge above LearnHubSection and enforces a11y + noopener', () => {
  const guidePage = fs.readFileSync(path.join(root, 'app/guides/[slug]/page.tsx'), 'utf8')
  const bridgeIdx = guidePage.indexOf('<AcademyMissionBridge')
  const learnIdx = guidePage.indexOf('<LearnHubSection')
  assert.ok(bridgeIdx > 0, 'AcademyMissionBridge must be rendered in app/guides/[slug]/page.tsx')
  assert.ok(bridgeIdx < learnIdx, 'AcademyMissionBridge must appear before LearnHubSection')

  const component = fs.readFileSync(
    path.join(root, 'components/guides/AcademyMissionBridge.tsx'),
    'utf8'
  )
  assert.match(component, /aria-labelledby="academy-mission-bridge-heading"/)
  assert.match(component, /motion-reduce:transition-none/)
  assert.match(component, /focus-visible:outline/)

  const blankTargets = component.match(/target="_blank"/g) ?? []
  const safeRels = component.match(/rel="noopener noreferrer"/g) ?? []
  assert.ok(blankTargets.length >= 4)
  assert.equal(blankTargets.length, safeRels.length, 'every target="_blank" must carry noopener noreferrer')
})

test('visual curriculum guide embeds all three responsive dark-theme academy SVG diagrams', () => {
  const svgFiles = [
    'guide-to-academy-funnel.svg',
    'multi-icp-routing-matrix.svg',
    'dual-mode-verification-loop.svg',
  ]

  const mdx = fs.readFileSync(
    path.join(root, 'content/guides/ai-architect-academy-visual-curriculum-2026.mdx'),
    'utf8'
  )

  for (const file of svgFiles) {
    const svgPath = path.join(root, 'public/images/diagrams/academy', file)
    assert.equal(fs.existsSync(svgPath), true, `${file} must exist on disk`)
    const svg = fs.readFileSync(svgPath, 'utf8')
    assert.match(svg, /<svg[^>]+viewBox="0 0 1200 /)
    assert.match(svg, /<title id=/)
    assert.match(svg, /<desc id=/)
    assert.ok(
      mdx.includes(`/images/diagrams/academy/${file}`),
      `MDX guide must embed /images/diagrams/academy/${file}`
    )
  }
})

test('AcademyCustomerJourneyShowcase is mounted on /ai-architect-academy, covers all 4 ICPs and 3 SVG plates, enforces tablist a11y + AA contrast, and leaks zero private repo URLs', () => {
  const academyPage = fs.readFileSync(
    path.join(root, 'app/ai-architect-academy/page.tsx'),
    'utf8'
  )
  const learningPathsIdx = academyPage.indexOf('{/* Learning Paths Section */}')
  const showcaseIdx = academyPage.indexOf('<AcademyCustomerJourneyShowcase')
  const skillsIdx = academyPage.indexOf('{/* Skills Section */}')

  assert.ok(showcaseIdx > 0, 'AcademyCustomerJourneyShowcase must be mounted in app/ai-architect-academy/page.tsx')
  assert.ok(
    learningPathsIdx < showcaseIdx && showcaseIdx < skillsIdx,
    'AcademyCustomerJourneyShowcase must appear between the Learning Paths section and the Skills section'
  )

  const showcase = fs.readFileSync(
    path.join(root, 'components/guides/AcademyCustomerJourneyShowcase.tsx'),
    'utf8'
  )

  // Derives from lib/learn/academy-missions.ts without duplicating ICP arrays
  assert.match(showcase, /from '@\/lib\/learn\/academy-missions'/)
  assert.match(showcase, /Object\.values\(ICP_TRACKS\)/)
  assert.match(showcase, /academyBridgeForGuide\(/)
  assert.match(showcase, /guidesForIcpTrack\(/)

  // Covers all 4 ICP roles + runnable stdlib cli.py commands
  for (const roleTitle of [
    'Enterprise AI Architect',
    'Agentic Product Engineer',
    'Technical Founder / CTO',
    'Applied AI Lead',
  ]) {
    assert.ok(
      showcase.includes(roleTitle),
      `AcademyCustomerJourneyShowcase must cover ICP role "${roleTitle}"`
    )
  }
  assert.match(showcase, /python labs\/04-trust-boundary-firewall\/cli\.py/)
  assert.match(showcase, /python labs\/05-eval-admission-gate\/cli\.py/)

  // References all 3 SVG plates + 4-phase faded scaffolding + required curriculum/academy links
  for (const svgHref of [
    '/images/diagrams/academy/guide-to-academy-funnel.svg',
    '/images/diagrams/academy/multi-icp-routing-matrix.svg',
    '/images/diagrams/academy/dual-mode-verification-loop.svg',
  ]) {
    assert.ok(
      showcase.includes(svgHref),
      `AcademyCustomerJourneyShowcase must reference ${svgHref}`
    )
  }
  for (const phaseLabel of [
    'Weeks 1-3 Worked Trace',
    'Weeks 4-6 Completion Scaffold',
    'Weeks 7-9 Contract Spec',
    'Weeks 10-12 Greenfield Capstone',
  ]) {
    assert.ok(
      showcase.includes(phaseLabel),
      `AcademyCustomerJourneyShowcase must include scaffolding phase "${phaseLabel}"`
    )
  }
  assert.ok(showcase.includes('/guides/ai-architect-academy-visual-curriculum-2026'))
  assert.ok(showcase.includes('https://aiarchitectacademy.com'))

  // Accessible tablist + keyboard navigation + reduced motion + rel="noopener noreferrer"
  assert.match(showcase, /role="tablist"/)
  assert.match(showcase, /role="tab"/)
  assert.match(showcase, /role="tabpanel"/)
  assert.match(showcase, /aria-selected=/)
  assert.match(showcase, /aria-controls=/)
  for (const key of ['ArrowRight', 'ArrowLeft', 'Home', 'End']) {
    assert.ok(showcase.includes(`'${key}'`), `tablist keyboard handler must support ${key}`)
  }
  assert.match(showcase, /motion-reduce:transition-none/)

  const blankTargets = showcase.match(/target="_blank"/g) ?? []
  const safeRels = showcase.match(/rel="noopener noreferrer"/g) ?? []
  assert.ok(blankTargets.length >= 3)
  assert.equal(blankTargets.length, safeRels.length, 'every target="_blank" in showcase must carry noopener noreferrer')

  // Zero low-contrast slate-500/600 text classes and verified >= 4.5:1 hex pairs
  assert.doesNotMatch(showcase, /\btext-slate-(?:500|600|700)\b/)
  assert.doesNotMatch(showcase, /\btext-white\/(?:20|30|40|50)\b/)

  const luminance = (hex) => {
    const channels = hex.replace('#', '').match(/../g).map((c) => parseInt(c, 16) / 255)
    const linear = channels.map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
    return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722
  }
  const contrast = (fg, bg) => {
    const a = luminance(fg)
    const b = luminance(bg)
    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
  }
  // Primary CTA (#06120e on emerald-400 #34d399) and muted body text (slate-300 #cbd5e1 on #0d111a / #090d14)
  assert.ok(contrast('#06120e', '#34d399') >= 4.5)
  assert.ok(contrast('#cbd5e1', '#0d111a') >= 4.5)
  assert.ok(contrast('#cbd5e1', '#090d14') >= 4.5)

  // Enforce sentence-case headings inside AcademyCustomerJourneyShowcase
  const allowedProperWords = new Set(['Python', 'Circle', 'FrankX', 'GitHub', 'MCP'])
  const staticHeadings = [
    ...[...showcase.matchAll(/<h[2-4][^>]*>\s*([^<{]+?)\s*<\/h[2-4]>/g)].map((m) => m[1].trim()),
    ...[...showcase.matchAll(/\bheading:\s*'([^']+)'/g)].map((m) => m[1].trim()),
  ]
  assert.ok(staticHeadings.length >= 12, 'expected static and plate/phase headings to be inspected')
  for (const heading of staticHeadings) {
    const words = heading.split(/\s+/).slice(1)
    for (const rawWord of words) {
      const cleaned = rawWord.replace(/^[^A-Za-z0-9]+|[^A-Za-z0-9]+$/g, '')
      if (!cleaned || /^[0-9]/.test(cleaned) || allowedProperWords.has(cleaned)) continue
      assert.equal(
        cleaned[0],
        cleaned[0].toLowerCase(),
        `heading "${heading}" contains Title-Case word "${cleaned}"`
      )
    }
  }

  // Zero private-repo URLs or private repo names across both showcase and page
  for (const text of [showcase, academyPage]) {
    assert.doesNotMatch(
      text,
      /starlight-intelligence-academy|agentic-ops-hub|agentic-ops|frankx-starlight-command|starlightintelligence\.ai/i,
      'public academy surfaces must never mention or link private repositories'
    )
  }
})
