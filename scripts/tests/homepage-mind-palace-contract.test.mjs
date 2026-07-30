import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const readRepoFile = (path) => readFile(new URL(`../../${path}`, import.meta.url), 'utf8')

test('the public homepage explains the human-directed agentic workspace before any portfolio detour', async () => {
  const page = await readRepoFile('app/page.tsx')
  const homepage = await readRepoFile('components/home/FrankXProductionHome.tsx')
  const positioning = await readRepoFile('data/site-positioning.ts')
  const featuredCase = await readRepoFile('data/featured-workspace-case.ts')

  assert.match(page, /import FrankXProductionHome from '@\/components\/home\/FrankXProductionHome'/)
  assert.match(page, /<FrankXProductionHome latestPosts=\{latestPosts\} \/>/)
  assert.doesNotMatch(page, /HomePageElite/)
  assert.doesNotMatch(page, /homepageFeaturedRelease/)
  assert.doesNotMatch(page, /getPublishedBooks/)

  assert.match(positioning, /Public agentic workspace/)
  assert.match(positioning, /I bring the question and point of view/)
  assert.match(positioning, /I choose what becomes public/)
  assert.match(positioning, /Sets the question, context, standard, and final decision/)
  assert.match(positioning, /Specialist agents/)
  assert.match(positioning, /Human review/)
  assert.match(positioning, /Explore current work/)
  assert.match(positioning, /See how the workspace runs/)

  assert.match(homepage, /src="\/images\/portraits\/frank-presenting-oracle-2025\.jpg"/)
  assert.match(homepage, /data-home-proof-overlay/)
  assert.match(homepage, /Source material/)
  assert.match(homepage, /Specialist passes/)
  assert.match(homepage, /Frank decides/)
  assert.match(homepage, /Public result/)
  assert.match(homepage, /featuredWorkspaceCase/)
  assert.match(featuredCase, /Intent Architecture/)
  assert.match(featuredCase, /evidence grade at C/)
  assert.match(homepage, /sitePositioning\.currentWork\.map/)
  assert.match(homepage, /href="\/workspace"/)
  assert.match(homepage, /A generated draft is not a published FrankX position/)

  for (const forbidden of [
    /framer-motion/,
    /<iframe\b/,
    /suno\.com\/embed/,
    /loading="eager"/,
    /RotatingHeroOutcome/,
    /AnimatePresence/,
    /TrustedByBlock/,
    /MindPalaceAtlas/,
    /ScrollProgress/,
    /AuroraBackground/,
  ]) {
    assert.doesNotMatch(homepage, forbidden)
  }
})

test('the workspace page makes the responsibility chain and stop conditions inspectable', async () => {
  const workspace = await readRepoFile('app/workspace/page.tsx')

  assert.match(workspace, /A question becomes useful/)
  assert.match(workspace, /by surviving the passes/)
  assert.match(workspace, /Source to publication/)
  assert.match(workspace, /Four stages\. One accountable chain\./)
  assert.match(workspace, /Review can stop publication/)
  assert.match(workspace, /which are Frank’s judgment/)
  assert.match(workspace, /featuredWorkspaceCase\.href/)
  assert.match(workspace, /Frank’s decision/)
  assert.match(workspace, /sitePositioning\.workflow\.map/)
  assert.match(workspace, /sitePositioning\.currentWork\.map/)
  assert.doesNotMatch(workspace, /framer-motion/)
})

test('the global header leads with the workspace and keeps four primary doors', async () => {
  const navigation = await readRepoFile('components/NavigationMega.tsx')
  const mobile = await readRepoFile('components/MobileNavOverlay.tsx')

  assert.match(navigation, /label: 'Workspace'/)
  assert.match(navigation, /Public agentic workspace/)
  assert.match(navigation, /const desktopSections: NavKey\[\] = \['explore', 'build', 'learn', 'gencreators'\]/)
  assert.match(navigation, /label: 'Create'/)
  assert.doesNotMatch(navigation, /onClick=\{\(\) => router\.push/)

  assert.match(mobile, /Public agentic workspace/)
  assert.match(mobile, /How Frank and the agent team build in public/)
  assert.match(mobile, /label: 'Create'/)
  assert.match(mobile, /Source material, specialist passes, Frank’s decision, public artifact/)
})
