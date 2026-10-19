import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

const banned = [
  // Email variants must not claim current employment at Oracle (or any employer).
  ['emails/variants/CardBased.tsx', ['Oracle', 'enterprise systems for']],
  ['emails/variants/MinimalGradient.tsx', ['Oracle', 'enterprise systems for']],
  ['emails/variants/ModernLight.tsx', ['Oracle', 'enterprise systems for']],
  ['emails/variants/ClassicWhite.tsx', ['Oracle', 'enterprise systems for']],
  ['emails/variants/DarkPremium.tsx', ['Oracle', 'enterprise systems for']],
  ['data/products.json', ['500+', 'Top Plays', '25+ AI coaching', '40-60%', 'within 48 hours', '$250 billion', 'Limited Spots', 'Ship It Guarantee', 'Content Velocity Guarantee', '30-Day Money Back', '100% Satisfaction', 'Bespoke Execution', '2-3x more content', 'Agent Team Promise', 'Narrative Impact Guarantee', 'Creative Integrity Promise', 'Momentum Promise', 'Prompt Success Guarantee', 'Open source on GitHub for the creator community', 'Open Source & Free Forever', 'without paying a penny', 'originalPrice', ', guaranteed']],
  ['app/products/vibe-os/components/VibeOSModules.tsx', ['Instant Access', 'Lifetime Updates', "'/newsletter'", 'href="/newsletter"', 'exclusive discounts']],
  ['components/products/ProductHero.tsx', ["'/newsletter'", 'href="/newsletter"']],
  ['components/products/OfferStack.tsx', ["'/newsletter'", 'href="/newsletter"']],
  ['components/products/FinalCTA.tsx', ["'/newsletter'", 'href="/newsletter"']],
  ['app/products/vibe-os/app/page.tsx', ['href="/newsletter"']],
  ['app/products/vibe-os/docs/page.tsx', ['href="/newsletter"']],
  ['app/products/[slug]/page.tsx', ['href="/newsletter"']],
  ['components/products/OfferStack.tsx', ['Limited Bonuses', 'Lifetime updates included', 'exclusive discounts', 'early-bird pricing']],
  ['components/products/FinalCTA.tsx', ['exclusive launch discounts']],
  ['app/links/page.tsx', ['10K+ Creators', '500+ AI Songs', '50+ proven templates', 'exclusive creator community']],
  ['app/showcase/page.tsx', ['500+ Suno', '500+ creators', 'Proven Results', 'WCAG 2.2 AAA', 'Sarah Chen']],
  ['app/linktree/page.tsx', ['12K+', '75+', '90+']],
  ['app/linktree/layout.tsx', ['12K+']],
  ['app/linktree/linktree-data.ts', ['75+', '65+', '50+ proven', '38 agents', '35+ commands']],
  ['app/about/layout.tsx', ['12K+', '12,000+']],
  ['app/about/page.tsx', ['12K+', '12,000+', '500+ tracks']],
  ['app/downloads/preview/vibe-os/page.tsx', ['12K+', '500+']],
  ['app/for/creators/layout.tsx', ['12K+', '50+ battle-tested']],
  ['app/for/creators/page.tsx', ['12K+', '70+ tutorials', '70+ Tutorials', '75+ AI Skills']],
  ['app/frankx/page.tsx', ['12K+', '12,000+']],
  ['app/lab/page.tsx', ['12K+', '12,000+', '8+ genres']],
  ['app/vibe/VibeOSContent.tsx', ['12K+', 'Suno sessions']],
  ['components/connect/ConnectHero.tsx', ['12K+']],
  ['components/MobileNavOverlay.tsx', ['12K+', '12,000+']],
  ['components/NavigationMega.tsx', ['12K+', '12,000+']],
  ['app/coaching/faqs.ts', ['12,000+']],
  ['app/coaching/page.tsx', ['12,000+']],
  ['app/creators/page.tsx', ['12,000+', '500+ AI Songs', 'AI Songs Created']],
  ['components/creators/CreatorsShell.tsx', ['12,000+', '500+ AI Songs', 'AI Songs Created']],
  ['app/developers/page.tsx', ['500+', 'AI-Generated Songs']],
  ['components/developers/DevelopersShell.tsx', ['500+', 'AI-Generated Songs']],
  ['app/music/create/layout.tsx', ['500+ tracks']],
  ['app/music/create/page.tsx', ['500+ tracks', '500+ generations']],
  ['app/music/layout.tsx', ['500+']],
  ['app/music/learn/orchestration/page.tsx', ['500+ tracks']],
  ['app/music/learn/production/page.tsx', ['12,000+']],
  ['app/music/learn/theory/page.tsx', ['12,000+']],
  ['app/music/page.tsx', ['published tracks on Suno', 'Public Tracks', 'totalTracks}+']],
  ['components/music/MusicShell.tsx', ['published tracks on Suno', 'Public Tracks', 'totalTracks}+']],
  ['app/music-os/page.tsx', ['indexed tracks', 'totalTracks']],
  ['app/magic/page.tsx', ['12,000 songs', 'over 12,000 songs']],
  ['components/magic/MagicShell.tsx', ['12,000 songs', 'over 12,000 songs']],
  ['app/products/vibe-os/components/VibeOSFinalCTA.tsx', ['12,000+', '30-Day Guarantee', 'Lifetime Updates', 'Instant Access', 'Music Production', 'ultimate Suno workflow', 'finished track']],
  ['app/products/vibe-os/components/VibeOSFeatures.tsx', ['Music Production', 'shipping tracks', '60–90 min', 'finished track']],
  ['app/products/vibe-os/components/VibeOSBonuses.tsx', ['Limited Bonuses', 'music production journey', 'Total Bonus Value']],
  ['app/products/vibe-os/components/VibeOSModules.tsx', ['Instant Access', 'Lifetime Updates', "'/newsletter'", 'href="/newsletter"', 'exclusive discounts']],
  ['app/products/vibe-os/components/VibeOSHero.tsx', ["'/newsletter'", 'href="/newsletter"']],
  ['app/products/vibe-os/components/VibeOSFinalCTA.tsx', ["'/newsletter'", 'href="/newsletter"']],
  ['data/products.json', ['Notion Dashboard Template', 'Open Source & Free Forever', 'Science-backed']],
  ['app/products/vibe-os/components/VibeOSHero.tsx', ['500+ Sessions', '30-Day Guarantee', 'Lifetime Updates', '50+ Genre Prompts', 'Emotion Mapping', 'Release Playbooks']],
  ['data/learning-paths.ts', ['verified official walkthrough', 'Official supported agent']],
  ['app/products/vibe-os/components/VibeOSSocialProof.tsx', ['500+ Sessions', 'Creators in Early Access']],
  ['app/soul-frequency-assessment/page.tsx', ['500+ Suno']],
  ['app/team/page.tsx', ['12,000+', '50+ genres']],
  ['app/vibe/producer/page.tsx', ['500+', '12,000+']],
  ['app/year-of-the-fire-horse/vision/page.tsx', ['500+ AI-produced']],
  ['app/design-lab/frontend-design/page.tsx', ['12K+', '12,000+']],
  ['app/design-lab/nature/variants/homepage/page.tsx', ['12K+', '12,000+']],
  ['app/design-lab/strategy/page.tsx', ['12,000+']],
  ['app/bio/layout.tsx', ['12,000+', '12K+']],
  ['app/bio/page.tsx', ['12,000+', '12K+', '12,000 Songs']],
  ['app/achievements/page.tsx', ['12,000+', '12K+', '13K hooks']],
  ['app/api/send-pdf/route.ts', ['12,000+', '12K+']],
  ['app/llms.txt/route.ts', ['12,000+', '12K+']],
  ['app/llms-full.txt/route.ts', ['12,000+', '12K+']],
  ['app/media-kit/page.tsx', ['12,000+', '12K+']],
  ['app/frank-riemer/page.tsx', ['12,000+', '12K+']],
  ['app/(landing)/connect/page.tsx', ['12,000+', '12K+']],
  ['app/downloads/preview/soulbook/page.tsx', ['12,000+', '12K+']],
  ['app/soulbook/vault/page.tsx', ['regularPrice', 'Download Free Vault (.zip)', '25 Inquiry Prompts', '30-Day Money', 'Instant digital delivery', 'Acquire System Architect Kit', 'SQLite FTS5']],
  ['components/funnel/UpsellModal.tsx', ['Lifetime access', 'Money Back Guarantee', 'Sovereign Bundle', 'Download Starting']],
  ['app/free-playbook/layout.tsx', ['12,000+', '12K+']],
  ['app/free-playbook/page.tsx', ['12,000+', '12K+']],
  ['app/goals/page.tsx', ['12,000+', '12K+']],
  ['app/intelligence-map/page.tsx', ['12,000+', '12K+']],
  ['app/links/metadata.ts', ['12,000+', '12K+']],
  ['app/map/v3/page.tsx', ['12,000+', '12K+']],
  ['app/newsletter/thank-you/ThankYouContent.tsx', ['12,000+', '12K+']],
  ['app/path/aesthete/page.tsx', ['12,000+', '12K+']],
  ['app/rituals/layout.tsx', ['12,000+', '12K+']],
  ['app/rituals/page.tsx', ['12,000+', '12K+']],
  ['app/students/ai-briefing/page.tsx', ['12,000+', '12K+']],
  ['app/vision/VisionContent.tsx', ['12,000+', '12K+']],
  ['app/youtube/page.tsx', ['12,000+', '12K+']],
  ['components/about/AboutShell.tsx', ['12,000+', '12K+']],
  ['components/design-lab/CosmicForgeHero.tsx', ['12,000+', '12K+']],
  ['components/design-lab/GlassCathedralHero.tsx', ['12,000+', '12K+']],
  ['components/design-lab/NeonGridHero.tsx', ['12,000+', '12K+']],
  ['components/home/SignalRouteSelector.tsx', ['12,000+', '12K+', 'Suno audio', '100-tool', 'Suno prompt systems', 'video makers, musicians']],
  ['components/home/MindPalaceAtlas.tsx', ['100-tool', 'multi-modal creator studio', 'generative pipelines']],
  ['data/ecosystem.ts', ['100-tool', 'multi-modal creator studio', 'generative pipelines']],
  ['components/intelligence-map/IntelligenceMapShell.tsx', ['12,000+', '12K+']],
  ['components/rituals/RitualsShell.tsx', ['12,000+', '12K+']],
  ['components/rituals/rituals-data.ts', ['12,000+', '12K+']],
  ['components/start/StartShell.tsx', ['12K+', '12,000+']],
  ['components/v0-variants/AIAcademyV0.tsx', ['12K+', '12,000+']],
  ['components/v0-variants/HomepageHeroV0.tsx', ['500+', '12,000+', '12K+']],
  ['components/v0-variants/MusicLabV0.tsx', ['500+']],
  ['components/youtube/YouTubeHubShell.tsx', ['12,000+', '12K+']],
  ['components/v0-variants/AboutPageV0.tsx', ['AI Songs']],
  ['components/golden-age/GoldenAgeShell.tsx', ['500+', 'AI Songs Created']],
  ['app/golden-age/page.tsx', ['500+', 'AI Songs Created']],
  ['app/products/(index)/page.tsx', ['deployed across live operations', 'Battle-tested architectures', 'verified across live operations', 'rolling updates', 'instant fulfillment', 'continuous version updates', 'conform to standard Model Context Protocol', 'Center of Excellence', 'turnkey multi-agent meshes', 'Rigorous execution standards', 'Decoupled, observable, and reproducible']],
  ['lib/products.ts', ["startsWith('http')"]],
  ['public/pdf-templates/5-suno-prompts.html', ['$27', 'cta-price-old', 'battle-tested', '100+', '500+', 'plays &middot;', 'likes &middot;', '432Hz', '528Hz', '~2 min', 'Get the Full Library', '$29', 'Longer, more descriptive', 'most powerful Suno keywords', 'Top Plays']],
  ['data/products.json', ['battle-tested', 'proven prompts that actually produce', '100+ Suno Prompts', '100+ prompts and 12', 'Curated Prompts', 'Sessions Tested', 'Prompts Included', 'Automation Recipes"', 'Complete 100+', '25 prompts for', '20 prompts spanning', '15 prompts for', 'get the PDF delivered immediately', 'Empirical Grounding', 'AI Slop"', '180 seconds Time-to-First-Value', 'buy.lemonsqueezy.com/checkout/buy', '14-Day System Integration', '500+ plays', 'Max Members', 'in under 180 seconds', 'zero-slop', 'Anti-Slop Linter', 'empirical production benchmarks', 'Cryptographically verified SIP attestation', '100+ prompt library for', '/stream-atlas/download', '/anti-slop-matrix/download', '/capability-audit/download', '/stream-taxonomy/download', '/starlight-spec/download', '/mythic-codex/download', '100% Free Forever', 'Unconditional open access', 'PDF is delivered instantly']],
  ['lib/email-templates-premium.ts', ['12,000+', '12K+', '500+ AI Songs']],
  ['lib/email-templates-welcome.ts', ['12,000+', '12K+', '500+ AI']],
  ['lib/email-templates.ts', ['12,000+', '12K+']],
  ['lib/hub.ts', ['12,000+', '12K+']],
  ['lib/intake/personas.ts', ['12,000+', '12K+', '12k music catalog']],
  ['lib/visual-intelligence/platform-personas.ts', ['12,000+', '12K+', '12k music catalog']],
  ['lib/visual-intelligence/visual-stack.ts', ['12k catalog']],
  ['lib/gen/backends.ts', ['12k catalog']],
  ['lib/workshop-citations.ts', ['12,000+', '12K+']],
  ['lib/voice/frankx-voice.ts', ['12,000+', '12K+', '12,000+ AI songs', '12,000+ songs']],
  ['lib/plan/initiatives.ts', ['500+ AI songs', 'AI Songs Created']],
  ['lib/qualities.ts', ['12,000 Songs']],
  ['content/blog/suno-ai-12000-songs-production-lessons.mdx', ['12,000', '12K+', '65 tracks', '61 self-hosted', '61 catalog-quality', '61 tracks currently', '60+ tracks', 'six genre families', '12 cataloged', '12 neoclassical']],
  ['content/blog/voice-ai-agents-2026-elevenlabs-hume-audio.mdx', ['12,000 songs of lessons']],
]

banned.push(['components/products/ProductsShell.tsx', ['50+ genre-specific', '50+ battle-tested', 'Genre-specific prompts (electronic']])
for (const file of ['lib/email-templates.ts', 'emails/components/Layout.tsx', 'lib/email-design-system.ts', 'emails/templates/PdfDelivery.tsx', 'lib/email-templates-foundry.ts']) banned.push([file, ['I read every one']])

for (const [file, phrases] of banned) {
  test(file + ' does not publish an unsupported headcount', () => {
    const text = fs.readFileSync(path.join(root, file), 'utf8').toLowerCase()
    for (const phrase of phrases) {
      assert.equal(text.includes(phrase.toLowerCase()), false, phrase)
    }
  })
}

test('welcome email describes the Suno guide and prompt library without unsourced claims', () => {
  const welcome = fs.readFileSync(path.join(root, 'lib/email-templates-welcome.ts'), 'utf8')
  for (const phrase of ['Free Suno Prompt Pack', 'production-ready prompts', 'top-performing tracks', 'Battle-tested prompts']) {
    assert.equal(welcome.toLowerCase().includes(phrase.toLowerCase()), false, phrase)
  }
  for (const phrase of ['Suno prompt guide (coming soon)', 'Five Suno prompts with notes on why each works. Coming soon.', 'Prompts for Suno, ChatGPT, Claude, and Midjourney. Organized by use case.']) {
    assert.ok(welcome.includes(phrase), phrase)
  }
})

test('the stale 5-suno PDF is not shipped or uploaded', () => {
  assert.equal(fs.existsSync(path.join(root, 'public/pdfs/5-suno-prompts.pdf')), false)
  const upload = fs.readFileSync(path.join(root, 'scripts/upload-products-to-blob.mjs'), 'utf8')
  assert.equal(upload.includes('public/pdfs/5-suno-prompts.pdf'), false)
})

test('5-suno-prompts is a waitlist item with no downloadable file', () => {
  const data = JSON.parse(fs.readFileSync(path.join(root, 'data/products.json'), 'utf8'))
  const list = Array.isArray(data) ? data : data.products
  const p = list.find((x) => x.slug === '5-suno-prompts')
  assert.ok(p, '5-suno-prompts not found')
  assert.equal(p.badge, 'Coming soon')
  assert.equal(p.offer.ctaPrimary, 'Join the waitlist')
  assert.equal(p.offer.ctaPrimaryHref, '/waitlist?intent=5-suno-prompts')
  assert.equal(p.offer.ctaPrimaryTracking, '5-suno-prompts-waitlist')
  assert.equal(p.offer.guarantee, undefined)
  assert.deepEqual(p.delivery?.files ?? [], [])
  const text = JSON.stringify(p)
  for (const phrase of ['COMING SOON', 'Proven Prompts', 'Get Free Prompts', 'Is this really free?', 'FREE DOWNLOAD', 'products/5-suno-prompts/5-suno-prompts.pdf']) {
    assert.equal(text.includes(phrase), false, phrase)
  }
})

test('music-lab signup email and route promise no download, counts or price', () => {
  const route = fs.readFileSync(path.join(root, 'app/api/subscribe/route.ts'), 'utf8')
  for (const phrase of ['downloadUrl', '/api/download?product=5-suno-prompts', 'your free prompts', 'the prompt email could not be sent']) {
    assert.equal(route.includes(phrase), false, phrase)
  }
  const templates = fs.readFileSync(path.join(root, 'lib/email-templates.ts'), 'utf8')
  for (const phrase of ['Your 5 Suno prompts are ready', 'Download Your 5 Prompts', 'top-performing tracks', '500+ combined plays', '500+ plays', '142 plays', '128 plays', '119 plays', '108 plays', '34 likes', '100+ prompts', 'Get 100+ Prompts', '($27)', 'Want more?']) {
    assert.equal(templates.includes(phrase), false, phrase)
  }
  for (const phrase of ["You're on the list for the 5 Suno prompts", "The guide with five Suno prompts isn't ready yet.", 'The Suno Prompt Library is on the launch list.', 'waitlist?intent=suno-prompt-library']) {
    assert.ok(templates.includes(phrase), phrase)
  }
})

test('inner-circle waitlist email promises no launch, price, bonus, cap or position', () => {
  const text = fs.readFileSync(path.join(root, 'lib/email-templates-inner-circle.ts'), 'utf8')
  const start = text.indexOf('export function innerCircleWaitlistEmail')
  const end = text.indexOf('// Email 2:', start)
  assert.ok(start >= 0 && end > start, 'innerCircleWaitlistEmail bounds not found')
  const email = text.slice(start, end).toLowerCase()
  for (const phrase of ['100 founding members', 'founding-member bonus', 'small by design', 'capping the first cohort', 'opens June 1', 'June 1 launch', 'May 27', 'May 30', 'T-5', 'T-2', '4 days to decide', 'pricing email', 'Circle tier price', 'one-click checkout', 'open the doors', 'Just the three emails', 'No content marketing', 'waitlist confirmed', 'waitlistPosition', '/labs', 'member-only', 'P.S.']) {
    assert.equal(email.includes(phrase.toLowerCase()), false, phrase)
  }
  for (const phrase of ["You're on the Inner Circle interest list", 'Inner Circle is not currently open. It is not a paid membership or a live community, and no payment is collected.', 'list=inner-circle']) {
    assert.ok(email.includes(phrase.toLowerCase()), phrase)
  }
})

test('5-suno naming no longer claims "best" tracks', () => {
  for (const file of ['data/products.json', 'lib/diagnostic/waitlist-intents.ts', 'public/pdf-templates/5-suno-prompts.html']) {
    const text = fs.readFileSync(path.join(root, file), 'utf8')
    assert.equal(text.includes('Made My Best'), false, file)
  }
  const index = fs.readFileSync(path.join(root, 'app/products/(index)/page.tsx'), 'utf8')
  assert.equal(index.includes('immediate download'), false)
})

test('higgsfield-mastery publishes no estimatedHours', () => {
  const text = fs.readFileSync(path.join(root, 'data/learning-paths.ts'), 'utf8')
  const at = text.indexOf("slug: 'higgsfield-mastery'")
  assert.ok(at > 0, 'higgsfield-mastery path not found')
  const start = text.lastIndexOf('\n  {', at)
  const end = text.indexOf('\n  },', at)
  assert.ok(start >= 0 && end > at, 'higgsfield-mastery object bounds not found')
  assert.doesNotMatch(text.slice(start, end), /\bestimatedHours\s*:/)
})

test('email follow-ups drop early-access promises, song counts and the prompt download', () => {
  const read = (p) => fs.readFileSync(path.join(root, p), 'utf8')
  const bans = [
    ['lib/email-templates-welcome.ts', ['new guides, frameworks, and products before anyone else', 'early access to new work']],
    ['lib/email-templates.ts', ['new guides and frameworks before public', 'Tracks Included']],
    ['emails/templates/Welcome.tsx', ['12,000+', 'AI-generated songs and counting']],
    ['emails/templates/MusicPrompts.tsx', ['Download Your 5 Prompts', 'Your 5 Suno prompts are ready', '500+', 'plays', 'likes', 'top-performing tracks', 'Tracks Included', 'downloadUrl}']],
    ...['CardBased', 'ClassicWhite', 'DarkPremium', 'MinimalGradient', 'ModernLight'].map((v) => [`emails/variants/${v}.tsx`, ['500+ AI songs']]),
  ]
  // Case-insensitive; scoped to the files this PR owns. 'I read every one' still signs other live emails (lib/email-templates.ts,
  // emails/components/Layout.tsx, lib/email-design-system.ts, emails/templates/PdfDelivery.tsx, lib/email-templates-foundry.ts).
  for (const file of ['emails/index.ts', 'emails/templates/MusicPrompts.tsx', 'emails/templates/Welcome.tsx', 'lib/email-templates-welcome.ts']) {
    bans.push([file, ['ready to use', 'three things happen', 'I read every one']])
  }
  for (const [file, phrases] of bans) {
    const text = read(file).toLowerCase()
    for (const phrase of phrases) assert.equal(text.includes(phrase.toLowerCase()), false, `${file}: ${phrase}`)
  }
  assert.ok(read('emails/index.ts').includes("subject: \"You're on the list for the 5 Suno prompts\""))
  assert.ok(read('lib/email-templates-welcome.ts').includes('New guides, frameworks and products in your inbox'))
  assert.ok(read('lib/email-templates-welcome.ts').includes('and notes on new work.'))
  assert.ok(read('lib/email-templates.ts').includes('New guides and frameworks in your inbox'))
  assert.ok(read('lib/email-templates.ts').includes('Tracks in the guide'))
  assert.ok(read('emails/templates/Welcome.tsx').includes("I'm Frank. I build enterprise AI systems during the day and make songs with Suno at night."))
  const mp = read('emails/templates/MusicPrompts.tsx')
  for (const phrase of ["isn't ready yet", 'Join the launch list', 'waitlist?intent=suno-prompt-library', 'Tracks in the guide']) assert.ok(mp.includes(phrase), phrase)
})

test('Vibe OS final CTA and products shell carry no music-mastery claims', () => {
  const cta = fs.readFileSync(path.join(root, 'app/products/vibe-os/components/VibeOSFinalCTA.tsx'), 'utf8')
  assert.equal(cta.includes('Start using Vibe OS'), false)
  assert.ok(cta.includes('Vibe OS is free'))
  const shell = fs.readFileSync(path.join(root, 'components/products/ProductsShell.tsx'), 'utf8')
  for (const phrase of ['Emotion-to-sound mapping system', 'Production enhancement and mastering guide', 'Suno Music Mastery', 'production checklists for Suno creators']) {
    assert.equal(shell.includes(phrase), false, phrase)
  }
})
