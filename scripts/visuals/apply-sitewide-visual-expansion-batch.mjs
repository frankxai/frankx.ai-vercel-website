#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const generatedA = 'C:/Users/frank/.codex/generated_images/019eee93-7525-7c43-bb1f-836e174dd5cb'
const generatedB = 'C:/Users/frank/.codex/generated_images/019ecfea-ab22-78d1-867e-585f3c5a941f'

const batchGeneratedAt = new Date().toISOString()

const accepted = [
  {
    slug: 'ai-agents-inner-family',
    surface: 'blog',
    contentFile: 'content/blog/ai-agents-inner-family.mdx',
    title: 'AI Agents Need an Inner Family, Not Just a Task List',
    sourceGeneratedFile: `${generatedA}/ig_0f176f3eb23cee4f016a390dae457081939df56d8f365316cd.png`,
    spectrum: 'bridge',
    qualityScore: 8,
    socialAngle: 'builder',
    prompt: 'Premium dark technical editorial hero for an AI agent inner-family architecture: distinct agent-role modules around a shared coordination core, emerald/cyan paths, restrained amber role markers, no readable text, logos, people, robots, or stock laptop.',
  },
  {
    slug: 'memory-as-exile-ai',
    surface: 'blog',
    contentFile: 'content/blog/memory-as-exile-ai.mdx',
    title: 'Memory as Exile: Why AI Systems Need Integration Loops',
    sourceGeneratedFile: `${generatedB}/ig_0e27b4901ba13c8a016a392adfc3bc819593263da36ab3e6d4.png`,
    spectrum: 'tech',
    qualityScore: 9,
    socialAngle: 'developer',
    prompt: 'Memory shards reintegrating into a central agent memory lattice on an obsidian operations table, emerald/cyan integration paths, restrained amber reconciliation node, no readable text, logos, people, robots, AI brain, or purple haze.',
  },
  {
    slug: 'inner-hr-ai-agent',
    surface: 'blog',
    contentFile: 'content/blog/inner-hr-ai-agent.mdx',
    title: 'Inner HR: The AI Agent for Your Internal Team',
    sourceGeneratedFile: `${generatedA}/ig_0f176f3eb23cee4f016a390f1c06e881938f91307cfd4f455d.png`,
    spectrum: 'bridge',
    qualityScore: 8,
    socialAngle: 'builder',
    prompt: 'Premium internal-team alignment system: role channels, coordination checkpoints, and a central operating loop rendered as dark technical glass modules with emerald/cyan paths and amber decision markers.',
  },
  {
    slug: 'ifs-ai-agent-architecture',
    surface: 'guide',
    contentFile: 'content/guides/ifs-ai-agent-architecture.mdx',
    title: 'IFS as an AI Architecture Pattern',
    sourceGeneratedFile: `${generatedA}/ig_0f176f3eb23cee4f016a390d6c55d481938ea5635d4248a50f.png`,
    spectrum: 'bridge',
    qualityScore: 8,
    socialAngle: 'developer',
    prompt: 'Premium layered systems hero for IFS as AI architecture: stacked agent layers, coordination planes, and integration paths in obsidian, emerald, cyan, and restrained amber, without text or faces.',
  },
  {
    slug: 'inner-hr-ai',
    surface: 'guide',
    contentFile: 'content/guides/inner-hr-ai.mdx',
    title: 'Inner HR - Building an AI System for Inner and Outer Team Alignment',
    sourceGeneratedFile: `${generatedA}/ig_0f176f3eb23cee4f016a390fc49668819383d2eb7e46e4969d.png`,
    spectrum: 'bridge',
    qualityScore: 8,
    socialAngle: 'builder',
    prompt: 'Premium alignment console for inner and outer team coordination: modular role panels, shared signals, and a quiet operational cadence, dark-first with emerald/cyan and restrained amber accents.',
  },
  {
    slug: 'internal-family-systems-personal-development',
    surface: 'guide',
    contentFile: 'content/guides/internal-family-systems-personal-development.mdx',
    title: 'Internal Family Systems for Personal Development',
    sourceGeneratedFile: `${generatedB}/ig_00e6455df870fa93016a392ef9e720819181404dc5c7476d2d.png`,
    spectrum: 'bridge',
    qualityScore: 9,
    socialAngle: 'creator',
    prompt: 'Premium bridge-spectrum visual for inner parts integration without spiritual imagery: abstract glass modules around a calm central integration space, warm amber empathy light balanced with emerald/cyan system paths.',
  },
  {
    slug: 'agentic-ai-roadmap-2025',
    surface: 'blog',
    contentFile: 'content/blog/agentic-ai-roadmap-2025.mdx',
    title: 'Agentic AI Roadmap 2025: From Studio Rituals to Enterprise Governance',
    sourceGeneratedFile: `${generatedA}/ig_060220fbd7fa9f0f016a38fd05b6148191b3e3170d09599c13.png`,
    spectrum: 'tech',
    qualityScore: 8,
    socialAngle: 'founder',
    prompt: 'Premium roadmap stack for agentic AI: layered maturity stages, governance rails, and deployment pathways rendered as a dark technical editorial system with emerald/cyan/amber signal hierarchy.',
  },
  {
    slug: 'best-ai-image-generators-2026',
    surface: 'blog',
    contentFile: 'content/blog/best-ai-image-generators-2026.mdx',
    title: 'Best AI Image Generators in 2026',
    sourceGeneratedFile: `${generatedB}/ig_050022bf22d8e63b016a392b47567c8191851f10f26d580b2f.png`,
    spectrum: 'tech',
    qualityScore: 9,
    socialAngle: 'creator',
    prompt: 'Premium creator-studio benchmark visual for AI image generators: multiple rendering bays and a central comparison rail, no brand logos, readable text, people, robots, or stock laptop.',
  },
  {
    slug: 'best-ai-video-editor-2026',
    surface: 'blog',
    contentFile: 'content/blog/best-ai-video-editor-2026.mdx',
    title: 'Best AI Video Editor 2026',
    sourceGeneratedFile: `${generatedB}/ig_0d98273effd505b8016a392b9998ec81919f1c7e3f8b5b6122.png`,
    spectrum: 'tech',
    qualityScore: 8,
    socialAngle: 'creator',
    prompt: 'Premium AI video editor comparison hero: cinematic timeline machine with modular clip blocks, waveform geometry, motion frames, and render nodes; no brand marks or readable labels.',
  },
  {
    slug: 'best-cheap-ai-music-generator-2026',
    surface: 'blog',
    contentFile: 'content/blog/best-cheap-ai-music-generator-2026.mdx',
    title: 'Best Cheap AI Music Generator 2026',
    sourceGeneratedFile: `${generatedB}/ig_025355431d994e17016a392beb273c8191803521a76e3d6dc3.png`,
    spectrum: 'soul',
    qualityScore: 8,
    socialAngle: 'creator',
    prompt: 'Premium music-production economics hero: compact synthesis modules, waveform strands, licensing-safe output, cost/right lanes as abstract geometry, no brand logos or readable text.',
  },
  {
    slug: 'personal-ai-coe-under-100-2026',
    surface: 'blog',
    contentFile: 'content/blog/personal-ai-coe-under-100-2026.mdx',
    title: 'How to Build a Personal AI Center of Excellence for Under $100 a Month',
    sourceGeneratedFile: `${generatedB}/ig_05e0e00dd48919ec016a392c3d27208191a380712c56d57b23.png`,
    spectrum: 'tech',
    qualityScore: 9,
    socialAngle: 'founder',
    prompt: 'Premium Personal AI CoE command-center visual: model routing, automation, knowledge base, evals, and publishing modules inside a restrained budget boundary, no currency text.',
  },
  {
    slug: 'ultimate-canva-ai-workflow-2026',
    surface: 'blog',
    contentFile: 'content/blog/ultimate-canva-ai-workflow-2026.mdx',
    title: 'The Ultimate Canva AI Workflow in 2026',
    sourceGeneratedFile: `${generatedA}/ig_0f176f3eb23cee4f016a390e47a234819391be0dc38f04abc0.png`,
    spectrum: 'tech',
    qualityScore: 8,
    socialAngle: 'creator',
    prompt: 'Premium creator asset workflow visual: brand-kit stations, visual generation modules, layout checkpoints, and publishing rails rendered as dark tactile systems, no logos or readable text.',
  },
  {
    slug: 'ultimate-capcut-workflow-2026',
    surface: 'blog',
    contentFile: 'content/blog/ultimate-capcut-workflow-2026.mdx',
    title: 'The Ultimate CapCut Workflow in 2026',
    sourceGeneratedFile: `${generatedB}/ig_00e6455df870fa93016a392cf9f5f08191805de7d4630c69c8.png`,
    spectrum: 'tech',
    qualityScore: 8,
    socialAngle: 'creator',
    prompt: 'Premium short-form video production pipeline: vertical-video assembly line, hook-to-export path, b-roll tiles, caption-safe lanes as abstract bars, no logos or readable text.',
  },
  {
    slug: 'ultimate-descript-workflow-2026',
    surface: 'blog',
    contentFile: 'content/blog/ultimate-descript-workflow-2026.mdx',
    title: 'The Ultimate Descript Workflow in 2026',
    sourceGeneratedFile: `${generatedB}/ig_00e6455df870fa93016a392d516288819187f13aed9c215198.png`,
    spectrum: 'tech',
    qualityScore: 8,
    socialAngle: 'creator',
    prompt: 'Premium text-to-edit production system: synchronized waveform, scene thumbnails, and transcript-like token blocks without readable text, dark creator workflow artifact.',
  },
  {
    slug: 'ultimate-elevenlabs-workflow-2026',
    surface: 'blog',
    contentFile: 'content/blog/ultimate-elevenlabs-workflow-2026.mdx',
    title: 'The Ultimate ElevenLabs Workflow in 2026',
    sourceGeneratedFile: `${generatedB}/ig_00e6455df870fa93016a392e550978819187eabf9cfe807dbf.png`,
    spectrum: 'tech',
    qualityScore: 9,
    socialAngle: 'creator',
    prompt: 'Premium voice AI pipeline using only abstract audio artifacts: voiceprint waveforms, spectral fingerprints, synthesis chambers, routing nodes, evaluation gates, no heads or faces.',
  },
  {
    slug: 'ultimate-gamma-workflow-2026',
    surface: 'blog',
    contentFile: 'content/blog/ultimate-gamma-workflow-2026.mdx',
    title: 'The Ultimate Gamma Workflow in 2026',
    sourceGeneratedFile: `${generatedB}/ig_00e6455df870fa93016a392d9b2a648191ad0e37f8dcf46cf2.png`,
    spectrum: 'tech',
    qualityScore: 9,
    socialAngle: 'founder',
    prompt: 'Premium prompt-to-investor-deck system: glass slide panels emerging from a prompt core into narrative, evidence, design, and memo modules, no actual slide text.',
  },
  {
    slug: 'ultimate-heygen-workflow-2026',
    surface: 'blog',
    contentFile: 'content/blog/ultimate-heygen-workflow-2026.mdx',
    title: 'The Ultimate HeyGen Workflow in 2026',
    sourceGeneratedFile: `${generatedA}/ig_0f176f3eb23cee4f016a390ed7681c8193b614e2ef374d506b.png`,
    spectrum: 'tech',
    qualityScore: 8,
    socialAngle: 'creator',
    prompt: 'Premium avatar-video workflow without faces: production booths, consent gates, script-to-scene modules, and output lanes as abstract creator systems, no people or logos.',
  },
  {
    slug: 'ultimate-higgsfield-workflow-2026',
    surface: 'blog',
    contentFile: 'content/blog/ultimate-higgsfield-workflow-2026.mdx',
    title: 'The Ultimate Higgsfield Workflow in 2026',
    sourceGeneratedFile: `${generatedA}/ig_0f176f3eb23cee4f016a390f59d738819389f9901823abb48d.png`,
    spectrum: 'soul',
    qualityScore: 8,
    socialAngle: 'creator',
    prompt: 'Premium cinematic video generation workflow: camera path table, shot identity modules, styleframe stations, and render lanes, dark technical studio with restrained amber highlights.',
  },
  {
    slug: 'ultimate-n8n-workflow-2026',
    surface: 'blog',
    contentFile: 'content/blog/ultimate-n8n-workflow-2026.mdx',
    title: 'The Ultimate n8n Workflow in 2026',
    sourceGeneratedFile: `${generatedA}/ig_0f176f3eb23cee4f016a390e8bba608193875b5f77080c6ffe.png`,
    spectrum: 'tech',
    qualityScore: 8,
    socialAngle: 'developer',
    prompt: 'Premium automation backend workflow: connected trigger, transform, agent, memory, and deployment modules as a dark operations ring, emerald/cyan signal paths, no labels.',
  },
  {
    slug: 'ultimate-opus-clip-workflow-2026',
    surface: 'blog',
    contentFile: 'content/blog/ultimate-opus-clip-workflow-2026.mdx',
    title: 'The Ultimate Opus Clip Workflow in 2026',
    sourceGeneratedFile: `${generatedB}/ig_00e6455df870fa93016a392ea3f5208191b09dcfc819e780bf.png`,
    spectrum: 'tech',
    qualityScore: 9,
    socialAngle: 'creator',
    prompt: 'Premium long-form-to-short-form clipping pipeline: source timeline analyzed into hook moments, vertical clip capsules, publish lanes, and performance feedback loops, no platform logos.',
  },
]

const rejected = [
  {
    slug: 'ultimate-elevenlabs-workflow-2026',
    sourceGeneratedFile: `${generatedB}/ig_00e6455df870fa93016a392e051ef481918fa439269ccffa73.png`,
    reviewStatus: 'rejected',
    reason: 'Rejected because the first voice workflow generation contained face/profile-like icons, which violated the no-faces prompt constraint.',
  },
]

const variants = [
  { name: 'wide', assetType: 'social-wide', publicPath: (slug) => `/images/social/blog/${slug}/wide.png` },
  { name: 'square', assetType: 'social-square', publicPath: (slug) => `/images/social/blog/${slug}/square.png` },
  { name: 'portrait', assetType: 'social-portrait', publicPath: (slug) => `/images/social/blog/${slug}/portrait.png` },
]

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true })
}

function relPublicPath(localPath) {
  return `/${path.relative(path.join(ROOT, 'public'), localPath).replaceAll(path.sep, '/')}`
}

function heroLocalPath(item) {
  const base = item.surface === 'guide'
    ? path.join(ROOT, 'public', 'images', 'guides', 'generated')
    : path.join(ROOT, 'public', 'images', 'blog', 'generated')
  return path.join(base, `${item.slug}-premium-hero.png`)
}

function updateFrontmatter(file, imagePath) {
  const full = path.join(ROOT, file)
  let raw = fs.readFileSync(full, 'utf8')
  if (!/^---\r?\n/.test(raw)) {
    throw new Error(`Missing frontmatter: ${file}`)
  }
  if (/^image:\s*.*$/m.test(raw)) {
    raw = raw.replace(/^image:\s*.*$/m, `image: "${imagePath}"`)
  } else {
    raw = raw.replace(/^---\r?\n/, `---\nimage: "${imagePath}"\n`)
  }
  fs.writeFileSync(full, raw)
}

function readJson(file, fallback) {
  const full = path.join(ROOT, file)
  if (!fs.existsSync(full)) return fallback
  return JSON.parse(fs.readFileSync(full, 'utf8'))
}

function writeJson(file, value) {
  fs.writeFileSync(path.join(ROOT, file), `${JSON.stringify(value, null, 2)}\n`)
}

function csvEscape(value) {
  const str = String(value ?? '')
  if (/[",\n\r]/.test(str)) return `"${str.replaceAll('"', '""')}"`
  return str
}

function upsertBy(items, predicate, next) {
  const index = items.findIndex(predicate)
  if (index >= 0) items[index] = next
  else items.push(next)
}

for (const item of accepted) {
  if (!fs.existsSync(item.sourceGeneratedFile)) {
    throw new Error(`Generated source not found for ${item.slug}: ${item.sourceGeneratedFile}`)
  }
  const dest = heroLocalPath(item)
  ensureDir(path.dirname(dest))
  fs.copyFileSync(item.sourceGeneratedFile, dest)
  const publicPath = relPublicPath(dest)
  updateFrontmatter(item.contentFile, publicPath)
  ensureDir(path.join(ROOT, 'public', 'images', 'social', item.surface === 'guide' ? 'guides' : 'blog', item.slug))
}

const batchManifest = {
  meta: {
    name: 'FrankX Sitewide Visual Expansion Batch 1',
    generatedAt: batchGeneratedAt,
    generationMode: 'built-in-image-gen',
    acceptedCount: accepted.length,
    rejectedCount: rejected.length,
    notes: 'Hero images are copied from verified Codex built-in image generation cache into stable public paths. Social derivatives are generated deterministically after this script.',
  },
  accepted: accepted.map((item) => {
    const local = heroLocalPath(item)
    return {
      ...item,
      assetType: 'hero',
      localPath: path.relative(ROOT, local).replaceAll(path.sep, '/'),
      publicUrl: relPublicPath(local),
      reviewStatus: 'accepted',
      deploymentStatus: 'pending-verification',
      generatedMode: 'built-in-image-gen',
    }
  }),
  rejected,
}
writeJson('data/visual-expansion-batch-2026-06-22.json', batchManifest)

const blogVos = readJson('data/blog-visual-system.json', {
  meta: { name: 'FrankX Blog Visual Operating System' },
  posts: [],
})
blogVos.meta = {
  ...blogVos.meta,
  generatedAt: batchGeneratedAt,
  generationMode: 'hybrid-built-in-image-gen-plus-deterministic-social-png',
}
for (const item of accepted) {
  const local = heroLocalPath(item)
  const publicPath = relPublicPath(local)
  const socialBase = item.surface === 'guide' ? `/images/social/guides/${item.slug}` : `/images/social/blog/${item.slug}`
  upsertBy(
    blogVos.posts,
    (entry) => entry.slug === item.slug,
    {
      slug: item.slug,
      title: item.title,
      contentType: item.surface === 'guide' ? 'guide' : 'blog-post',
      hero: publicPath,
      infographic: null,
      social: {
        wide: `${socialBase}/wide.png`,
        square: `${socialBase}/square.png`,
        portrait: `${socialBase}/portrait.png`,
      },
      prompt: item.prompt,
      source: 'FrankX Sitewide Visual Expansion Batch 1',
      generationMode: 'built-in-image-gen',
      generatedMode: 'built-in-image-gen',
      qualityScore: item.qualityScore,
      qualityTier: item.qualityScore >= 9 ? 'flagship' : 'premium',
      spectrum: item.spectrum,
      reviewStatus: 'accepted-premium-bitmap',
      deploymentStatus: 'pending-verification',
      sourceGeneratedFile: item.sourceGeneratedFile,
      notes: 'Generated with built-in image_gen and copied into a stable public asset path. Social derivatives are deterministic PNG crops with overlays.',
    },
  )
}
blogVos.meta.counts = {
  headers: blogVos.posts.filter((post) => post.hero).length,
  infographics: blogVos.posts.filter((post) => post.infographic).length,
  socialCards: blogVos.posts.reduce((count, post) => count + Object.values(post.social || {}).filter(Boolean).length, 0),
  socialCopyPacks: fs.existsSync(path.join(ROOT, 'content', 'social', 'blog'))
    ? fs.readdirSync(path.join(ROOT, 'content', 'social', 'blog')).filter((name) => name.endsWith('.md')).length
    : 0,
  premiumBitmapHeaders: blogVos.posts.filter((post) => post.hero?.includes('/generated/')).length,
}
writeJson('data/blog-visual-system.json', blogVos)

const ledger = readJson('data/visual-asset-ledger.json', {
  meta: { name: 'FrankX Visual Asset Ledger' },
  assets: [],
})
ledger.meta = {
  ...ledger.meta,
  generatedAt: batchGeneratedAt,
  generationMode: 'built-in-image-gen heroes + deterministic PNG social derivatives',
  websiteSourceOfTruth: 'repo public/images assets',
  optionalWebsiteCdnMirror: 'Vercel Blob images/blog/<slug>/<filename>',
  humanCampaignLibrary: 'Google Drive: FrankX Visual OS / Blog Social Assets',
}
for (const item of accepted) {
  const local = heroLocalPath(item)
  const publicPath = relPublicPath(local)
  const base = {
    slug: item.slug,
    title: item.title,
    surface: item.surface,
    contentType: item.surface === 'guide' ? 'guide' : 'blog-post',
    qualityScore: item.qualityScore,
    qualityTier: item.qualityScore >= 9 ? 'flagship' : 'premium',
    spectrum: item.spectrum,
    reviewStatus: 'accepted',
    deploymentStatus: 'pending-verification',
    socialAngle: item.socialAngle,
    prompt: item.prompt,
    sourceGeneratedFile: item.sourceGeneratedFile,
    postUrl: item.surface === 'guide'
      ? `https://www.frankx.ai/guides/${item.slug}`
      : `https://www.frankx.ai/blog/${item.slug}`,
    googleDriveUrl: null,
    vercelBlobKey: null,
    googleDriveStatus: 'not-uploaded',
  }
  upsertBy(ledger.assets, (asset) => asset.localPath === path.relative(ROOT, local).replaceAll(path.sep, '/'), {
    ...base,
    assetType: 'hero',
    localPath: path.relative(ROOT, local).replaceAll(path.sep, '/'),
    publicUrl: publicPath,
  })
  for (const variant of variants) {
    const variantPublic = item.surface === 'guide'
      ? `/images/social/guides/${item.slug}/${variant.name}.png`
      : variant.publicPath(item.slug)
    const variantLocal = `public${variantPublic}`
    upsertBy(ledger.assets, (asset) => asset.localPath === variantLocal, {
      ...base,
      assetType: variant.assetType,
      localPath: variantLocal,
      publicUrl: variantPublic,
      fallbackPath: publicPath,
    })
  }
}
for (const item of rejected) {
  upsertBy(ledger.assets, (asset) => asset.sourceGeneratedFile === item.sourceGeneratedFile, {
    slug: item.slug,
    title: item.slug,
    surface: 'blog',
    assetType: 'hero',
    sourceGeneratedFile: item.sourceGeneratedFile,
    qualityScore: 0,
    qualityTier: 'reject',
    spectrum: 'tech',
    reviewStatus: 'rejected',
    deploymentStatus: 'not-deployed',
    rejectionNotes: item.reason,
    localPath: null,
    publicUrl: null,
    googleDriveUrl: null,
    vercelBlobKey: null,
  })
}
ledger.meta.counts = {
  assets: ledger.assets.length,
  heroes: ledger.assets.filter((asset) => asset.assetType === 'hero' && asset.reviewStatus !== 'rejected').length,
  socialCards: ledger.assets.filter((asset) => String(asset.assetType).startsWith('social-')).length,
  rejected: ledger.assets.filter((asset) => asset.reviewStatus === 'rejected').length,
}
writeJson('data/visual-asset-ledger.json', ledger)

const inventoryPath = path.join(ROOT, 'public', 'images', 'VISUAL_INVENTORY_2026.csv')
const header = fs.existsSync(inventoryPath) ? fs.readFileSync(inventoryPath, 'utf8').split(/\r?\n/)[0] : ''
const columns = header.split(',')
const rows = []
for (const item of accepted) {
  const local = heroLocalPath(item)
  const publicPath = relPublicPath(local)
  const row = {
    slug_or_collection: item.slug,
    current_image: publicPath,
    has_thumb: 'yes',
    quality_est: item.qualityScore,
    spectrum: item.spectrum,
    topic_pillar: item.surface === 'guide' ? 'guide' : 'blog',
    asset_type: 'hero',
    notes: 'FrankX Sitewide Visual Expansion Batch 1 premium bitmap hero',
    recommended_action: 'deployed after verification',
    new_premium_candidate: path.basename(publicPath),
    status: 'accepted-pending-verification',
    generated_or_audited: 'generated-2026-06-22',
    qualityScore: item.qualityScore,
    qualityTier: item.qualityScore >= 9 ? 'flagship' : 'premium',
    reviewStatus: 'accepted',
    storageLocalPath: path.relative(ROOT, local).replaceAll(path.sep, '/'),
    publicUrl: publicPath,
    vercelBlobKey: '',
    googleDriveUrl: '',
    socialAngle: item.socialAngle,
    promptFile: 'data/visual-expansion-batch-2026-06-22.json',
  }
  rows.push(columns.map((column) => csvEscape(row[column] ?? '')).join(','))
}
if (rows.length > 0) {
  fs.appendFileSync(inventoryPath, `${fs.readFileSync(inventoryPath, 'utf8').endsWith('\n') ? '' : '\n'}${rows.join('\n')}\n`)
}

console.log(`Accepted heroes wired: ${accepted.length}`)
console.log(`Rejected generations logged: ${rejected.length}`)
console.log('Wrote data/visual-expansion-batch-2026-06-22.json')
