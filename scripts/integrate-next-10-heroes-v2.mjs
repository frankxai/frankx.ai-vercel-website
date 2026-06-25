#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const artifactDir = 'C:\\Users\\frank\\.gemini\\antigravity\\brain\\df205edb-e544-4f54-a0dd-bb752bc0fe88'
const promptBase = path.join(artifactDir, 'scratch', 'prompts')
const destDir = path.resolve('public/images/blog')
fs.mkdirSync(destDir, { recursive: true })

const batch = [
  {
    slug: '01-ai-doesnt-have-to-be-soulless',
    promptFile: '01-ai-doesnt-have-to-be-soulless.md',
    srcFile: 'ai_soulless_hero_1782178453731.png',
    destPath: 'public/images/blog/ai-doesnt-have-to-be-soulless.png',
    finalImgUrl: '/images/blog/ai-doesnt-have-to-be-soulless.png',
    style: 'davinci-dark',
    title: "AI Doesn't Have To Be Soulless (And Here's How I Know)",
    category: "AI & Creativity"
  },
  {
    slug: '30-minute-creator-os-quick-start',
    promptFile: '30-minute-creator-os-quick-start.md',
    srcFile: 'creator_os_hero_1782178463380.png',
    destPath: 'public/images/blog/30-minute-creator-os-quick-start.png',
    finalImgUrl: '/images/blog/30-minute-creator-os-quick-start.png',
    style: 'light-workshop',
    title: "The 30-Minute Creator OS: Build Your Minimum Viable Creative System",
    category: "Creator Systems"
  },
  {
    slug: 'ai-guide-for-families-and-professionals',
    promptFile: 'ai-guide-for-families-and-professionals.md',
    srcFile: 'ai_guide_hero_1782178470573.png',
    destPath: 'public/images/blog/ai-guide-for-families-and-professionals.png',
    finalImgUrl: '/images/blog/ai-guide-for-families-and-professionals.png',
    style: 'light-workshop',
    title: "The Family & Professional's Guide to Thriving with AI (Not Just Surviving It)",
    category: "AI Education"
  },
  {
    slug: 'build-your-own-jarvis-claude-code',
    promptFile: 'build-your-own-jarvis-claude-code.md',
    srcFile: 'jarvis_system_hero_1782178479365.png',
    destPath: 'public/images/blog/build-your-own-jarvis-hero.png',
    finalImgUrl: '/images/blog/build-your-own-jarvis-hero.png',
    style: 'holographic-command',
    title: "Build Your Own Jarvis: Turn Claude Code Into Your Personal Intelligence System",
    category: "Creator Systems"
  },
  {
    slug: 'building-deal-flow-pipelines-ai',
    promptFile: 'building-deal-flow-pipelines-ai.md',
    srcFile: 'deal_pipeline_hero_1782178489361.png',
    destPath: 'public/images/blog/deal-flow-pipeline.png',
    finalImgUrl: '/images/blog/deal-flow-pipeline.png',
    style: 'cyberpunk-neon',
    title: "Building Automated Deal Flow Pipelines with AI and n8n",
    category: "Intelligence Dispatches"
  },
  {
    slug: 'building-research-intelligence-system',
    promptFile: 'building-research-intelligence-system.md',
    srcFile: 'research_brain_hero_1782178498809.png',
    destPath: 'public/images/blog/building-research-intelligence-system-hero.png',
    finalImgUrl: '/images/blog/building-research-intelligence-system-hero.png',
    style: 'davinci-codex',
    title: "Building a Research Intelligence System: How I Use AI Agents for Daily Knowledge Operations",
    category: "Creator Systems"
  },
  {
    slug: 'claude-code-2-1-mcp-revolution',
    promptFile: 'claude-code-2-1-mcp-revolution.md',
    srcFile: 'claude_mcp_hero_1782178509407.png',
    destPath: 'public/images/blog/claude-code-mcp.png',
    finalImgUrl: '/images/blog/claude-code-mcp.png',
    style: 'cyberpunk-neon',
    title: "Claude Code 2.1: How MCP Tool Search Changed Everything",
    category: "AI & Systems"
  },
  {
    slug: 'claude-opus-4-6-analysis-2026',
    promptFile: 'claude-opus-4-6-analysis-2026.md',
    srcFile: 'opus_analysis_hero_1782178517640.png',
    destPath: 'public/images/models/claude-opus-4-6-hero.png',
    finalImgUrl: '/images/models/claude-opus-4-6-hero.png',
    style: 'holographic-command',
    title: "Claude Opus 4.6: What Actually Changed and Why It Matters",
    category: "Intelligence Dispatches"
  },
  {
    slug: 'enterprise-agent-roadmap',
    promptFile: 'enterprise-agent-roadmap.md',
    srcFile: 'enterprise_agent_hero_1782178526090.png',
    destPath: 'public/images/blog/enterprise-agent-roadmap-hero.png',
    finalImgUrl: '/images/blog/enterprise-agent-roadmap-hero.png',
    style: 'cyberpunk-neon',
    title: "The Enterprise Agent Roadmap 2026: Multi-Agent Orchestration Patterns",
    category: "Enterprise AI"
  },
  {
    slug: 'eu-inc-28th-regime-european-startups',
    promptFile: 'eu-inc-28th-regime-european-startups.md',
    srcFile: 'eu_inc_hero_1782178535200.png',
    destPath: 'public/images/blog/eu-inc-28th-regime-european-startups-hero.png',
    finalImgUrl: '/images/blog/eu-inc-28th-regime-european-startups-hero.png',
    style: 'davinci-dark',
    title: "EU Inc Explained: The '28th Regime' That Could Finally Unify European Startups",
    category: "Intelligence Dispatches"
  }
]

console.log('=== INTEGRATING GENERATED PREMIUM BLOG HEROES ===')

for (const item of batch) {
  const srcPath = path.join(artifactDir, item.srcFile)
  const fullDestPath = path.resolve(item.destPath)

  console.log(`\nIntegrating: ${item.slug}`)
  console.log(`  source: ${item.srcFile}`)
  console.log(`  dest:   ${item.destPath}`)

  // Copy image file
  try {
    fs.mkdirSync(path.dirname(fullDestPath), { recursive: true })
    fs.copyFileSync(srcPath, fullDestPath)
    console.log(`  ✓ Copied image to destination`)
  } catch (err) {
    console.error(`  ✗ Copy failed for ${item.slug}:`, err.message)
    continue
  }

  // Update MDX frontmatter
  const blogDir = 'content/blog'
  let mdxFile = path.join(blogDir, `${item.slug}.mdx`)
  if (!fs.existsSync(mdxFile)) {
    const clean = item.slug.replace(/^\d+-/, '')
    mdxFile = path.join(blogDir, `${clean}.mdx`)
  }

  if (fs.existsSync(mdxFile)) {
    let mdxContent = fs.readFileSync(mdxFile, 'utf8')
    const imgLine = `image: "${item.finalImgUrl}"`

    if (/^image:\s*["']?([^\s"']+)/m.test(mdxContent)) {
      mdxContent = mdxContent.replace(/^image:\s*["']?([^\s"']+)/m, imgLine)
    } else {
      mdxContent = mdxContent.replace(/^(---\n[\s\S]*?)(---)/, (m, pre, post) => {
        if (!pre.includes('image:')) {
          return pre + imgLine + '\n' + post
        }
        return m
      })
    }
    fs.writeFileSync(mdxFile, mdxContent)
    console.log(`  ✓ Updated MDX frontmatter in ${path.basename(mdxFile)}`)
  } else {
    console.warn(`  ⚠ Warning: MDX file not found for ${item.slug}`)
  }

  // Update data/blog-heroes.json in-place or insert
  const heroesPath = 'data/blog-heroes.json'
  if (fs.existsSync(heroesPath)) {
    const heroesData = JSON.parse(fs.readFileSync(heroesPath, 'utf8'))
    const id = item.slug.replace(/^\d+-/, '')
    const pPath = path.join(promptBase, item.promptFile)
    const promptText = fs.readFileSync(pPath, 'utf8').trim()

    let heroIndex = heroesData.heroes.findIndex(h => h.id === id || h.blog === `/blog/${id}`)
    const now = new Date().toISOString().slice(0, 10)

    const heroObj = {
      id,
      title: item.title,
      blog: `/blog/${id}`,
      image: item.finalImgUrl,
      proImage: item.finalImgUrl,
      date: now,
      category: item.category,
      exists: true,
      score: 9,
      proScore: 10,
      style: item.style,
      prompt: promptText,
      model: 'pro',
      proModel: 'pro'
    }

    if (heroIndex >= 0) {
      heroesData.heroes[heroIndex] = { ...heroesData.heroes[heroIndex], ...heroObj }
      console.log(`  ✓ Updated existing hero entry in blog-heroes.json`)
    } else {
      heroesData.heroes.push(heroObj)
      console.log(`  ✓ Appended new hero entry to blog-heroes.json`)
    }

    if (heroesData.meta) {
      heroesData.meta.totalHeroes = heroesData.heroes.length
      heroesData.meta.generatedAt = new Date().toISOString()
    }
    fs.writeFileSync(heroesPath, JSON.stringify(heroesData, null, 2))
  }

  // Update data/visual-registry.json in-place or insert
  const regPath = 'data/visual-registry.json'
  if (fs.existsSync(regPath)) {
    const reg = JSON.parse(fs.readFileSync(regPath, 'utf8'))
    let regIndex = reg.findIndex(r => r.path === item.finalImgUrl)

    const regObj = {
      path: item.finalImgUrl,
      directory: item.destPath.includes('models') ? 'models' : 'blog',
      category: 'blog',
      filename: path.basename(item.destPath),
      sizeKB: Math.round(fs.statSync(fullDestPath).size / 1024),
      tags: ['hero', 'premium', 'acos-batch-v2'],
      mood: 'branded',
      theme: item.style === 'light-workshop' ? 'light' : 'dark',
      suitableFor: ['blog-hero', 'homepage-showcase']
    }

    if (regIndex >= 0) {
      reg[regIndex] = { ...reg[regIndex], ...regObj }
      console.log(`  ✓ Updated existing entry in visual-registry.json`)
    } else {
      reg.push(regObj)
      console.log(`  ✓ Appended new entry to visual-registry.json`)
    }
    fs.writeFileSync(regPath, JSON.stringify(reg, null, 2))
  }

  // Update data/visual-inventory.csv
  const csvPath = 'data/visual-inventory.csv'
  if (fs.existsSync(csvPath)) {
    let csv = fs.readFileSync(csvPath, 'utf8')
    const sizeKB = Math.round(fs.statSync(fullDestPath).size / 1024)
    const folder = item.destPath.includes('models') ? 'models' : 'blog'
    const csvLine = `${item.finalImgUrl},${folder},${path.basename(item.destPath)},${sizeKB},"hero,premium,acos-batch-v2",branded,${item.style === 'light-workshop' ? 'light' : 'dark'},"blog-hero",NEW premium batch 2 autonomous`

    if (csv.includes(item.finalImgUrl)) {
      const lines = csv.split('\n')
      const updatedLines = lines.map(line => {
        if (line.startsWith(item.finalImgUrl + ',')) return csvLine
        return line
      })
      fs.writeFileSync(csvPath, updatedLines.join('\n'))
      console.log(`  ✓ Updated entry in visual-inventory.csv`)
    } else {
      if (!csv.endsWith('\n') && csv.length > 0) {
        fs.appendFileSync(csvPath, '\n')
      }
      fs.appendFileSync(csvPath, csvLine + '\n')
      console.log(`  ✓ Appended entry to visual-inventory.csv`)
    }
  }
}

console.log('\n=== ALL HEROES INTEGRATION COMPLETED ===')
