#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const BLOG_DIR = path.join(ROOT, 'content', 'blog')
const SOCIAL_DIR = path.join(ROOT, 'content', 'social', 'blog')
const HERO_DIR = path.join(ROOT, 'public', 'images', 'blog', 'visual-system')
const INFOGRAPHIC_DIR = path.join(HERO_DIR, 'infographics')
const SOCIAL_IMAGE_DIR = path.join(ROOT, 'public', 'images', 'social', 'blog')
const MANIFEST_PATH = path.join(ROOT, 'data', 'blog-visual-system.json')

const PRIORITY_SLUGS = [
  'claude-agent-sdk-credit-pause-agent-stack-2026',
  'ultimate-guide-ai-coding-agents-2026',
  'production-agentic-ai-systems',
  'production-agent-patterns-7-pillars',
  'multi-agent-orchestration-patterns-2026',
  'swarm-intelligence-orchestration',
  'agentic-ai-roadmap-2026',
  'agent-family-architecture',
  'build-your-own-jarvis',
  'building-custom-skills-acos',
  'mcp-server-architecture-workshop',
  'mcp-server-integration',
  'mcp-doctor',
  'llm-evals-claude-code-guide',
  'claude-code-mcp',
  'claude-code-mastery',
  'claude-code-skills-2026-the-10-you-need',
  'terminal-first-ai-workflow',
  'vercel-ai-sdk-first-agent',
  'ai-model-routing-guide',
  'best-open-local-llms-2026',
  'gpt-oss-analysis-2026',
  'llama-4-analysis-2026',
  'deepseek-v4-analysis-2026',
  'kimi-k2-analysis-2026',
  'qwen3-max-analysis-2026',
  'gemini-3-5-pro-analysis-2026',
  'gpt-5-5-analysis-2026',
  'grok-4-3-analysis-2026',
  'ai-image-video-generation-playbook-2026',
  'ai-video-generation-2026',
  'best-ai-video-generators-2026',
  'best-ai-tools-for-creators-2026',
  'ai-agents-transform-due-diligence',
  'agentic-workflows-save-hours',
  'creator-intelligence-systems-2026',
  'golden-age-field-guide',
  'golden-age-of-intelligence',
  'research-generation-flywheel-2026',
  'building-research-intelligence-system',
]

const INFOGRAPHIC_COUNT = 24
const SOCIAL_COUNT = 32
const HERO_COUNT = 40

const palette = {
  bg: '#0a0a0b',
  panel: '#111318',
  line: '#1f2937',
  white: '#f8fafc',
  muted: '#9ca3af',
  dim: '#64748b',
  emerald: '#10b981',
  cyan: '#06b6d4',
  amber: '#f59e0b',
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true })
}

function xml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function kebab(value) {
  return String(value ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function wrapText(text, maxChars, maxLines = 4) {
  const words = String(text ?? '').split(/\s+/).filter(Boolean)
  const lines = []
  let line = ''

  for (const word of words) {
    const next = line ? `${line} ${word}` : word
    if (next.length > maxChars && line) {
      lines.push(line)
      line = word
    } else {
      line = next
    }
  }
  if (line) lines.push(line)

  if (lines.length > maxLines) {
    const clipped = lines.slice(0, maxLines)
    clipped[maxLines - 1] = `${clipped[maxLines - 1].replace(/[.,;:]$/, '')}...`
    return clipped
  }

  return lines
}

function readPosts() {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((name) => name.endsWith('.mdx'))
    .map((name) => {
      const slug = name.replace(/\.mdx$/, '')
      const filePath = path.join(BLOG_DIR, name)
      const raw = fs.readFileSync(filePath, 'utf8')
      const parsed = parseFrontmatter(raw)
      return {
        slug,
        filePath,
        raw,
        title: parsed.data.title || slug.replace(/-/g, ' '),
        description: parsed.data.description || parsed.data.excerpt || '',
        category: parsed.data.category || 'Intelligence Systems',
        tags: parsed.data.tags || [],
        date: parsed.data.date || parsed.data.publishedAt || '2026-01-01',
      }
    })
    .filter((post) => post.category?.toLowerCase() !== 'curated')
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) {
    return { frontmatter: '', content: raw, data: {} }
  }

  const frontmatter = match[1]
  const content = match[2]
  const data = {}
  const lines = frontmatter.split(/\r?\n/)

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    const field = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (!field) continue
    const [, key, rawValue] = field
    let value = rawValue.trim()

    if (!value) {
      if (key === 'tags') {
        const tags = []
        let cursor = index + 1
        while (cursor < lines.length && /^\s*-\s+/.test(lines[cursor])) {
          tags.push(stripYamlScalar(lines[cursor].replace(/^\s*-\s+/, '').trim()))
          cursor += 1
        }
        data[key] = tags
      }
      continue
    }

    if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = value
        .slice(1, -1)
        .split(',')
        .map((item) => stripYamlScalar(item.trim()))
        .filter(Boolean)
    } else {
      data[key] = stripYamlScalar(value)
    }
  }

  return { frontmatter, content, data }
}

function stripYamlScalar(value) {
  return value.replace(/^['"]|['"]$/g, '')
}

function selectPosts(posts) {
  const bySlug = new Map(posts.map((post) => [post.slug, post]))
  const selected = []
  for (const slug of PRIORITY_SLUGS) {
    if (bySlug.has(slug) && !selected.some((post) => post.slug === slug)) {
      selected.push(bySlug.get(slug))
    }
  }
  for (const post of posts) {
    if (selected.length >= HERO_COUNT) break
    if (!selected.some((item) => item.slug === post.slug)) selected.push(post)
  }
  return selected.slice(0, HERO_COUNT)
}

function themeFor(post, index) {
  const text = `${post.title} ${post.description} ${post.tags.join(' ')}`.toLowerCase()
  if (/agent|mcp|claude|coding|orchestration|workflow|sdk|opencode|deepagent|hermes|openclaw/.test(text)) {
    return {
      label: 'Agent Stack',
      thesis: 'Tools become durable systems when memory, evals, and deployment discipline converge.',
      nodes: ['Interface', 'Memory', 'Tools', 'Evals', 'Deploy'],
      accent: palette.emerald,
      secondary: palette.cyan,
    }
  }
  if (/model|llm|gpt|llama|gemini|grok|deepseek|qwen|kimi|oss/.test(text)) {
    return {
      label: 'Model Intelligence',
      thesis: 'Model choice is now portfolio strategy: capability, latency, cost, openness, and governance.',
      nodes: ['Capability', 'Routing', 'Cost', 'Latency', 'Governance'],
      accent: palette.cyan,
      secondary: palette.emerald,
    }
  }
  if (/video|image|creator|music|tool|generation/.test(text)) {
    return {
      label: 'Creator Systems',
      thesis: 'Creative leverage compounds when taste, tooling, and distribution are built as one machine.',
      nodes: ['Taste', 'Assets', 'Workflow', 'Audience', 'Revenue'],
      accent: palette.amber,
      secondary: palette.emerald,
    }
  }
  if (/invest|due diligence|business|startup|founder|capital/.test(text)) {
    return {
      label: 'Founder Intelligence',
      thesis: 'AI-native operators turn scattered market signal into decisions faster than committees can meet.',
      nodes: ['Market', 'Diligence', 'Risk', 'Memo', 'Action'],
      accent: palette.emerald,
      secondary: palette.amber,
    }
  }
  return {
    label: 'Intelligence Systems',
    thesis: 'The advantage is shifting from isolated tools to operating systems for builders.',
    nodes: ['Signal', 'Synthesis', 'System', 'Ship', 'Compound'],
    accent: index % 2 ? palette.cyan : palette.emerald,
    secondary: index % 2 ? palette.emerald : palette.cyan,
  }
}

function lineText(lines, x, y, size, weight = 600, fill = palette.white, gap = Math.round(size * 1.18)) {
  return lines
    .map((line, index) => `<text x="${x}" y="${y + index * gap}" fill="${fill}" font-family="Inter, Arial, sans-serif" font-size="${size}" font-weight="${weight}" letter-spacing="0">${xml(line)}</text>`)
    .join('\n')
}

function heroSvg(post, index) {
  const theme = themeFor(post, index)
  const titleLines = wrapText(post.title, 28, 4)
  const descLines = wrapText(post.description || theme.thesis, 54, 3)
  const nodeText = theme.nodes
    .map((node, i) => {
      const x = 995 + (i % 2) * 230
      const y = 220 + Math.floor(i / 2) * 135
      return `
        <rect x="${x}" y="${y}" width="184" height="72" rx="10" fill="${palette.panel}" stroke="${i % 2 ? theme.secondary : theme.accent}" stroke-opacity=".55"/>
        <text x="${x + 18}" y="${y + 44}" fill="${palette.white}" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="650">${xml(node)}</text>
      `
    })
    .join('\n')

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900" role="img" aria-label="${xml(post.title)}">
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#050607"/>
      <stop offset="48%" stop-color="${palette.bg}"/>
      <stop offset="100%" stop-color="#0d1117"/>
    </linearGradient>
    <radialGradient id="glowA" cx="26%" cy="18%" r="56%">
      <stop offset="0%" stop-color="${theme.accent}" stop-opacity=".28"/>
      <stop offset="52%" stop-color="${theme.accent}" stop-opacity=".07"/>
      <stop offset="100%" stop-color="${theme.accent}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowB" cx="82%" cy="74%" r="48%">
      <stop offset="0%" stop-color="${theme.secondary}" stop-opacity=".20"/>
      <stop offset="62%" stop-color="${theme.secondary}" stop-opacity=".05"/>
      <stop offset="100%" stop-color="${theme.secondary}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="42" height="42" patternUnits="userSpaceOnUse">
      <path d="M42 0H0V42" fill="none" stroke="#ffffff" stroke-opacity=".045" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1600" height="900" fill="url(#bg)"/>
  <rect width="1600" height="900" fill="url(#grid)"/>
  <rect width="1600" height="900" fill="url(#glowA)"/>
  <rect width="1600" height="900" fill="url(#glowB)"/>
  <path d="M112 690 C360 565 568 746 812 610 C996 508 1124 294 1444 222" fill="none" stroke="${theme.accent}" stroke-width="2" stroke-opacity=".42"/>
  <path d="M116 734 C360 640 580 790 828 668 C1050 560 1180 390 1458 352" fill="none" stroke="${theme.secondary}" stroke-width="2" stroke-opacity=".30"/>
  <rect x="88" y="82" width="1424" height="736" rx="24" fill="none" stroke="#ffffff" stroke-opacity=".10"/>
  <rect x="116" y="112" width="256" height="42" rx="21" fill="${theme.accent}" fill-opacity=".10" stroke="${theme.accent}" stroke-opacity=".45"/>
  <text x="140" y="140" fill="${theme.accent}" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="750" letter-spacing="0">${xml(theme.label)}</text>
  <text x="116" y="212" fill="${palette.dim}" font-family="JetBrains Mono, Consolas, monospace" font-size="18" font-weight="600">FRANKX.AI / CREATION CHRONICLES</text>
  ${lineText(titleLines, 116, 308, 62, 760, palette.white, 72)}
  ${lineText(descLines, 120, 640, 25, 450, '#cbd5e1', 34)}
  <g opacity=".96">
    <circle cx="1166" cy="450" r="132" fill="${palette.panel}" stroke="${theme.accent}" stroke-opacity=".55" stroke-width="2"/>
    <circle cx="1166" cy="450" r="88" fill="none" stroke="${theme.secondary}" stroke-opacity=".5" stroke-width="2"/>
    <circle cx="1166" cy="450" r="38" fill="${theme.accent}" fill-opacity=".20" stroke="${theme.accent}" stroke-opacity=".85"/>
    <text x="1166" y="444" text-anchor="middle" fill="${palette.white}" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="800">BUILD</text>
    <text x="1166" y="474" text-anchor="middle" fill="${theme.secondary}" font-family="JetBrains Mono, Consolas, monospace" font-size="16">SYSTEM</text>
    ${nodeText}
  </g>
  <text x="120" y="780" fill="${palette.muted}" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="500">${xml(post.category)}</text>
  <text x="1480" y="780" text-anchor="end" fill="${palette.muted}" font-family="Inter, Arial, sans-serif" font-size="18">${xml(post.date)}</text>
</svg>`
}

function infographicSvg(post, index) {
  const theme = themeFor(post, index)
  const title = wrapText(`${theme.label}: ${post.title}`, 44, 2)
  const stages = theme.nodes
  const stageBlocks = stages
    .map((stage, i) => {
      const x = 145 + i * 265
      return `
        <rect x="${x}" y="365" width="206" height="156" rx="14" fill="${palette.panel}" stroke="${i % 2 ? theme.secondary : theme.accent}" stroke-opacity=".55"/>
        <text x="${x + 103}" y="422" text-anchor="middle" fill="${palette.white}" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="750">${xml(stage)}</text>
        <text x="${x + 103}" y="462" text-anchor="middle" fill="${palette.muted}" font-family="JetBrains Mono, Consolas, monospace" font-size="15">${String(i + 1).padStart(2, '0')}</text>
      `
    })
    .join('\n')

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900" role="img" aria-label="${xml(post.title)} infographic">
  <rect width="1600" height="900" fill="${palette.bg}"/>
  <rect x="70" y="70" width="1460" height="760" rx="28" fill="#0d0f13" stroke="#ffffff" stroke-opacity=".11"/>
  <path d="M170 570H1430" stroke="${theme.accent}" stroke-width="3" stroke-opacity=".55"/>
  <path d="M250 570C430 230 660 730 810 420C980 70 1140 660 1360 275" fill="none" stroke="${theme.secondary}" stroke-width="3" stroke-opacity=".45"/>
  <text x="145" y="150" fill="${theme.accent}" font-family="JetBrains Mono, Consolas, monospace" font-size="18" font-weight="700">FRANKX OPERATING MAP</text>
  ${lineText(title, 145, 220, 50, 780, palette.white, 58)}
  ${stageBlocks}
  <rect x="145" y="650" width="1310" height="94" rx="14" fill="#050607" stroke="#ffffff" stroke-opacity=".10"/>
  ${lineText(wrapText(theme.thesis, 92, 2), 178, 698, 24, 500, '#d1d5db', 34)}
</svg>`
}

function socialSvg(post, index, variant) {
  const sizes = {
    wide: [1200, 630],
    square: [1080, 1080],
    vertical: [1080, 1350],
  }
  const [width, height] = sizes[variant]
  const theme = themeFor(post, index)
  const titleChars = variant === 'wide' ? 30 : 24
  const titleLines = wrapText(post.title, titleChars, variant === 'vertical' ? 5 : 4)
  const yTitle = variant === 'wide' ? 210 : 330
  const titleSize = variant === 'wide' ? 48 : 56
  const descLines = wrapText(post.description || theme.thesis, variant === 'wide' ? 58 : 42, variant === 'vertical' ? 4 : 3)

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${xml(post.title)} social card">
  <defs>
    <radialGradient id="a" cx="25%" cy="15%" r="68%">
      <stop offset="0%" stop-color="${theme.accent}" stop-opacity=".28"/>
      <stop offset="100%" stop-color="${theme.accent}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="b" cx="85%" cy="78%" r="58%">
      <stop offset="0%" stop-color="${theme.secondary}" stop-opacity=".22"/>
      <stop offset="100%" stop-color="${theme.secondary}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="${palette.bg}"/>
  <rect width="${width}" height="${height}" fill="url(#a)"/>
  <rect width="${width}" height="${height}" fill="url(#b)"/>
  <rect x="56" y="56" width="${width - 112}" height="${height - 112}" rx="22" fill="none" stroke="#ffffff" stroke-opacity=".12"/>
  <text x="84" y="112" fill="${theme.accent}" font-family="JetBrains Mono, Consolas, monospace" font-size="18" font-weight="700">FRANKX.AI</text>
  <text x="${width - 84}" y="112" text-anchor="end" fill="${palette.muted}" font-family="Inter, Arial, sans-serif" font-size="18">${xml(theme.label)}</text>
  ${lineText(titleLines, 84, yTitle, titleSize, 780, palette.white, Math.round(titleSize * 1.12))}
  ${lineText(descLines, 86, height - (variant === 'vertical' ? 300 : 170), variant === 'wide' ? 24 : 28, 480, '#cbd5e1', variant === 'wide' ? 34 : 40)}
  <line x1="84" y1="${height - 96}" x2="${width - 84}" y2="${height - 96}" stroke="${theme.accent}" stroke-opacity=".55" stroke-width="2"/>
  <text x="84" y="${height - 56}" fill="${palette.muted}" font-family="Inter, Arial, sans-serif" font-size="18">AI systems, creator tooling, and builder strategy</text>
</svg>`
}

function socialCopy(post, index) {
  const theme = themeFor(post, index)
  return `# Social Pack: ${post.title}

Source: https://frankx.ai/blog/${post.slug}
Visuals:
- Wide: /images/social/blog/${post.slug}/wide.svg
- Square: /images/social/blog/${post.slug}/square.svg
- Vertical: /images/social/blog/${post.slug}/vertical.svg

## LinkedIn
${post.title}

${post.description || theme.thesis}

What matters now: ${theme.thesis}

For builders, this is a practical shift from tool collection to system design. The winners will connect ${theme.nodes.slice(0, 3).join(', ').toLowerCase()}, and execution into one operating cadence.

Read the full analysis: https://frankx.ai/blog/${post.slug}

## X Thread
1/ ${post.title}

${post.description || theme.thesis}

2/ The real signal is not another isolated AI tool. It is the move toward ${theme.label.toLowerCase()} as an operating layer.

3/ Watch the stack: ${theme.nodes.join(' -> ')}.

4/ Builders should ask: what becomes faster, cheaper, measurable, or newly possible when this workflow is agent-native?

5/ Full analysis: https://frankx.ai/blog/${post.slug}

## Short Caption
${theme.label}: what changes for users, devs, builders, founders, and investors.

## Founder Angle
Use this to identify the workflows where AI can compress cycle time, reduce coordination drag, and create a defensible operating advantage.

## Developer Angle
Treat the article as an implementation map: isolate the interface, wire the memory/tools layer, add evals, then deploy with observability.

## Builder Takeaway
Do not chase every tool. Build the smallest system that compounds.
`
}

function updateFrontmatter(post, heroPath) {
  const match = post.raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) return

  const cleaned = []
  const lines = match[1].split(/\r?\n/)
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    if (/^image:\s*/.test(line)) continue
    if (/^visualSystem:\s*/.test(line)) {
      while (index + 1 < lines.length && /^\s+/.test(lines[index + 1])) index += 1
      continue
    }
    cleaned.push(line)
  }
  const frontmatter = cleaned.join('\n')
  const content = match[2]
  const injected = [
    frontmatter,
    `image: "${heroPath}"`,
    'visualSystem:',
    '  version: "2026-06-frankx-vos"',
    `  hero: "${heroPath}"`,
    '  generatedMode: "repo-native-svg"',
  ].join('\n')

  fs.writeFileSync(post.filePath, `---\n${injected}\n---\n${content}`)
}

function main() {
  ensureDir(HERO_DIR)
  ensureDir(INFOGRAPHIC_DIR)
  ensureDir(SOCIAL_IMAGE_DIR)
  ensureDir(SOCIAL_DIR)

  const posts = selectPosts(readPosts())
  const socialPosts = posts.slice(0, SOCIAL_COUNT)
  const infographicPosts = posts.slice(0, INFOGRAPHIC_COUNT)
  const manifest = {
    meta: {
      name: 'FrankX Blog Visual Operating System',
      generatedAt: new Date().toISOString(),
      generationMode: 'repo-native-svg',
      builtInImageGeneration: 'reserved for cinematic bitmap hero art; not used for this exact-text batch',
      counts: {
        headers: posts.length,
        infographics: infographicPosts.length,
        socialCards: socialPosts.length * 3,
        socialCopyPacks: socialPosts.length,
      },
      reviewPolicy: 'Reject stock-like, generic, over-purple, logo-like, unreadable, or text-artifacted assets.',
    },
    posts: [],
  }

  posts.forEach((post, index) => {
    const heroPublic = `/images/blog/visual-system/${post.slug}-hero.svg`
    const heroFile = path.join(HERO_DIR, `${post.slug}-hero.svg`)
    fs.writeFileSync(heroFile, heroSvg(post, index))
    updateFrontmatter(post, heroPublic)

    let infographicPublic = null
    if (index < INFOGRAPHIC_COUNT) {
      infographicPublic = `/images/blog/visual-system/infographics/${post.slug}-map.svg`
      fs.writeFileSync(path.join(INFOGRAPHIC_DIR, `${post.slug}-map.svg`), infographicSvg(post, index))
    }

    let social = null
    if (index < SOCIAL_COUNT) {
      const slugSocialDir = path.join(SOCIAL_IMAGE_DIR, post.slug)
      ensureDir(slugSocialDir)
      social = {
        wide: `/images/social/blog/${post.slug}/wide.svg`,
        square: `/images/social/blog/${post.slug}/square.svg`,
        vertical: `/images/social/blog/${post.slug}/vertical.svg`,
      }
      for (const variant of Object.keys(social)) {
        fs.writeFileSync(path.join(slugSocialDir, `${variant}.svg`), socialSvg(post, index, variant))
      }
      fs.writeFileSync(path.join(SOCIAL_DIR, `${post.slug}.md`), socialCopy(post, index))
    }

    manifest.posts.push({
      slug: post.slug,
      title: post.title,
      category: post.category,
      date: post.date,
      hero: heroPublic,
      infographic: infographicPublic,
      social,
      prompt: `FrankX editorial visual for "${post.title}" using dark-first architecture, emerald/cyan spectrum, exact readable title, no stock people, no generic AI shapes.`,
      source: 'design.md + taste.md + post frontmatter',
      generationMode: 'repo-native-svg',
      reviewStatus: 'accepted',
      deploymentStatus: 'ready',
      notes: 'Exact text rendered as SVG to avoid AI text artifacts and extra API costs.',
    })
  })

  fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`)
  console.log(`Generated ${posts.length} headers, ${infographicPosts.length} infographics, ${socialPosts.length * 3} social cards.`)
}

main()
