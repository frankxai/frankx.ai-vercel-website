#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const artifactDir = 'C:\\Users\\frank\\.gemini\\antigravity\\brain\\df205edb-e544-4f54-a0dd-bb752bc0fe88'
const destDir = path.resolve('public/images/blog')
fs.mkdirSync(destDir, { recursive: true })

const targets = [
  {
    slug: 'nvidia-ces-2026-physical-ai-revolution',
    prefix: 'nvidia_physical_ai_',
    destName: 'nvidia-ces-2026-physical-ai-revolution-hero.png',
    title: "NVIDIA CES 2026: The Physical AI Revolution",
    category: "AI Architecture",
    style: "cyberpunk-neon"
  },
  {
    slug: 'observability-stack-multi-agent-systems-2026',
    prefix: 'observability_multi_agent_',
    destName: 'observability-stack-multi-agent-systems-2026-hero.png',
    title: "The Multi-Agent Observability Stack (2026)",
    category: "AI Architecture",
    style: "cyberpunk-neon"
  },
  {
    slug: 'oracle-genai-agents-vs-langgraph-crewai-2026',
    prefix: 'oracle_vs_crewai_',
    destName: 'oracle-genai-agents-vs-langgraph-crewai-2026-hero.png',
    title: "Oracle GenAI Agents vs LangGraph vs CrewAI (2026)",
    category: "AI Architecture",
    style: "light-workshop"
  },
  {
    slug: 'personal-ai-assistant-setup-workshop',
    prefix: 'personal_assistant_setup_',
    destName: 'personal-ai-assistant-setup-workshop-hero.png',
    title: "Personal AI Assistant Setup Workshop",
    category: "Creator Systems",
    style: "light-workshop"
  },
  {
    slug: 'production-agent-patterns-7-pillars',
    prefix: 'agent_seven_pillars_',
    destName: 'production-agent-patterns-7-pillars-hero.png',
    title: "Production Agent Patterns: The 7 Pillars",
    category: "AI Architecture",
    style: "holographic-command"
  },
  {
    slug: 'production-agent-patterns-aws-bedrock',
    prefix: 'aws_bedrock_agents_',
    destName: 'production-agent-patterns-aws-bedrock-hero.png',
    title: "Production Agent Patterns on AWS Bedrock",
    category: "AI Architecture",
    style: "cyberpunk-neon"
  },
  {
    slug: 'production-llm-agents-oci-part-1-architecture',
    prefix: 'oci_agents_part1_',
    destName: 'production-llm-agents-oci-part-1-architecture-hero.png',
    title: "Production LLM Agents on OCI: Part 1 - Architecture",
    category: "AI Architecture",
    style: "cyberpunk-neon"
  },
  {
    slug: 'production-llm-agents-oci-part-2-agent-patterns',
    prefix: 'oci_agents_part2_',
    destName: 'production-llm-agents-oci-part-2-agent-patterns-hero.png',
    title: "Production LLM Agents on OCI: Part 2 - Agent Patterns",
    category: "AI Architecture",
    style: "cyberpunk-neon"
  },
  {
    slug: 'production-llm-agents-oci-part-3-operating-model',
    prefix: 'oci_agents_part3_',
    destName: 'production-llm-agents-oci-part-3-operating-model-hero.png',
    title: "Production LLM Agents on OCI: Part 3 - Operating Model",
    category: "AI Architecture",
    style: "cyberpunk-neon"
  },
  {
    slug: 'props-to-the-builders-of-this-era',
    prefix: 'props_to_builders_',
    destName: 'props-to-the-builders-of-this-era-hero.png',
    title: "Props to the Builders of This Era",
    category: "Intelligence Economy",
    style: "davinci-dark"
  },
  {
    slug: 'reader-first-golden-age',
    prefix: 'reader_first_age_',
    destName: 'reader-first-golden-age-hero.png',
    title: "Reader-First Growth Playbook in the Golden Age",
    category: "Intelligence Economy",
    style: "light-workshop"
  },
  {
    slug: 'science-of-state-change-music',
    prefix: 'state_change_music_',
    destName: 'science-of-state-change-music-hero.png',
    title: "The Science of State-Change Music",
    category: "Music Intelligence",
    style: "cinematic-studio"
  },
  {
    slug: 'seo-aeo-optimization-acos',
    prefix: 'seo_aeo_optimization_',
    destName: 'seo-aeo-optimization-acos-hero.png',
    title: "SEO & AEO Optimization with ACOS",
    category: "Creator Systems",
    style: "light-workshop"
  },
  {
    slug: 'gemini-3-5-pro-analysis-2026',
    prefix: 'gemini_three_five_',
    destName: 'gemini-3-5-pro-analysis-2026-hero.png',
    title: "Google Gemini 3.5 Pro: Technical Deep-Dive",
    category: "AI & Systems",
    style: "holographic-command"
  },
  {
    slug: 'gemma-3-analysis-2026',
    prefix: 'gemma_three_analysis_',
    destName: 'gemma-3-analysis-2026-hero.png',
    title: "Google Gemma 3: Open-Weights Enterprise Analysis",
    category: "AI & Systems",
    style: "holographic-command"
  },
  {
    slug: 'gpt-oss-analysis-2026',
    prefix: 'gpt_oss_analysis_',
    destName: 'gpt-oss-analysis-2026-hero-v5.jpg',
    title: "GPT-OSS: Open-Source Models Analysis 2026",
    category: "AI & Systems",
    style: "cyberpunk-neon"
  },
  {
    slug: 'kimi-k2-analysis-2026',
    prefix: 'kimi_k2_analysis_',
    destName: 'kimi-k2-analysis-2026-hero-v5.jpg',
    title: "Kimi K2: Long-Context Architectures Evaluated",
    category: "AI & Systems",
    style: "holographic-command"
  },
  {
    slug: 'llama-4-analysis-2026',
    prefix: 'llama_four_analysis_',
    destName: 'llama-4-analysis-2026-hero-v5.jpg',
    title: "LLaMA 4 Enterprise Review: Deep Integration Guide",
    category: "AI & Systems",
    style: "cyberpunk-neon"
  },
  {
    slug: 'llm-evals-claude-code-guide',
    prefix: 'llm_evals_claude_',
    destName: 'llm-evals-claude-code-guide-hero-v5.jpg',
    title: "LLM Evaluations: The Claude Code Setup Guide",
    category: "AI Architecture",
    style: "cyberpunk-neon"
  },
  {
    slug: 'microsoft-mai-frontier-models-2026',
    prefix: 'microsoft_mai_models_',
    destName: 'microsoft-mai-frontier-models-2026-hero-v5.jpg',
    title: "Microsoft MAI Frontier Models: Technical Roadmap",
    category: "AI & Systems",
    style: "holographic-command"
  },
  {
    slug: 'mistral-large-3-analysis-2026',
    prefix: 'mistral_large_three_',
    destName: 'mistral-large-3-analysis-2026-hero-v5.jpg',
    title: "Mistral Large 3: Technical Analysis & OCI Speedrun",
    category: "AI & Systems",
    style: "davinci-dark"
  },
  {
    slug: 'qwen3-max-analysis-2026',
    prefix: 'qwen_three_max_',
    destName: 'qwen3-max-analysis-2026-hero-v5.jpg',
    title: "Qwen3-Max: Deep Tech Analysis & Benchmark Review",
    category: "AI & Systems",
    style: "holographic-command"
  }
]

// Helper to find file in artifact folder by prefix
function findArtifactByPrefix(prefix) {
  if (!fs.existsSync(artifactDir)) return null;
  const files = fs.readdirSync(artifactDir)
  const matched = files.find(f => f.startsWith(prefix) && f.endsWith('.png'))
  return matched ? path.join(artifactDir, matched) : null
}

console.log('=== INTEGRATING GENERATED HEROES ===')

for (const item of targets) {
  const finalImgUrl = `/images/blog/${item.destName}`
  const fullDestPath = path.join(destDir, item.destName)
  const srcPath = findArtifactByPrefix(item.prefix)
  let alreadyExists = false

  if (!srcPath) {
    if (fs.existsSync(fullDestPath)) {
      alreadyExists = true
    } else {
      console.log(`\n[-] Skipping ${item.slug} (no generated image found in artifacts yet, and no existing file in dest)`)
      continue
    }
  }

  console.log(`\n[+] Integrating: ${item.slug}`)
  if (alreadyExists) {
    console.log(`    info:   Image already exists in destination. Skip copying.`)
  } else {
    console.log(`    source: ${path.basename(srcPath)}`)
    console.log(`    dest:   ${finalImgUrl}`)

    // Copy image file
    try {
      fs.copyFileSync(srcPath, fullDestPath)
      console.log(`    ✓ Copied image to destination`)
    } catch (err) {
      console.error(`    ✗ Copy failed:`, err.message)
      continue
    }
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
    const imgLine = `image: "${finalImgUrl}"`

    if (/^image:\s*.*$/m.test(mdxContent)) {
      mdxContent = mdxContent.replace(/^image:\s*.*$/m, imgLine)
    } else {
      mdxContent = mdxContent.replace(/^(---\n[\s\S]*?)(---)/, (m, pre, post) => {
        if (!pre.includes('image:')) {
          return pre + imgLine + '\n' + post
        }
        return m
      })
    }
    // Also remove any duplicate image property that might have been left over by previous runs
    mdxContent = mdxContent.replace(/image:\s*""\/images[\s\S]*?"/g, '')

    fs.writeFileSync(mdxFile, mdxContent)
    console.log(`    ✓ Updated MDX frontmatter in ${path.basename(mdxFile)}`)
  } else {
    console.warn(`    ⚠ Warning: MDX file not found for ${item.slug}`)
  }

  // Update data/blog-heroes.json
  const heroesPath = 'data/blog-heroes.json'
  if (fs.existsSync(heroesPath)) {
    const heroesData = JSON.parse(fs.readFileSync(heroesPath, 'utf8'))
    const id = item.slug.replace(/^\d+-/, '')
    const promptText = `Premium ${item.style} visualization for ${item.title}.`
    let heroIndex = heroesData.heroes.findIndex(h => h.id === id || h.blog === `/blog/${id}`)
    const now = new Date().toISOString().slice(0, 10)

    const heroObj = {
      id,
      title: item.title,
      blog: `/blog/${id}`,
      image: finalImgUrl,
      proImage: finalImgUrl,
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
      console.log(`    ✓ Updated existing hero entry in blog-heroes.json`)
    } else {
      heroesData.heroes.push(heroObj)
      console.log(`    ✓ Appended new hero entry to blog-heroes.json`)
    }

    if (heroesData.meta) {
      heroesData.meta.totalHeroes = heroesData.heroes.length
      heroesData.meta.generatedAt = new Date().toISOString()
    }
    fs.writeFileSync(heroesPath, JSON.stringify(heroesData, null, 2))
  }

  // Update data/visual-registry.json
  const regPath = 'data/visual-registry.json'
  if (fs.existsSync(regPath)) {
    const reg = JSON.parse(fs.readFileSync(regPath, 'utf8'))
    let regIndex = reg.findIndex(r => r.path === finalImgUrl)
    const sizeKB = Math.round(fs.statSync(fullDestPath).size / 1024)

    const regObj = {
      path: finalImgUrl,
      directory: 'blog',
      category: 'blog',
      filename: item.destName,
      sizeKB,
      tags: ['hero', 'premium', 'acos-batch-v3-svg-replaces'],
      mood: 'branded',
      theme: 'dark',
      suitableFor: ['blog-hero']
    }

    if (regIndex >= 0) {
      reg[regIndex] = { ...reg[regIndex], ...regObj }
      console.log(`    ✓ Updated existing entry in visual-registry.json`)
    } else {
      reg.push(regObj)
      console.log(`    ✓ Appended new entry to visual-registry.json`)
    }
    fs.writeFileSync(regPath, JSON.stringify(reg, null, 2))
  }

  // Update data/visual-inventory.csv
  const csvPath = 'data/visual-inventory.csv'
  if (fs.existsSync(csvPath)) {
    let csv = fs.readFileSync(csvPath, 'utf8')
    const sizeKB = Math.round(fs.statSync(fullDestPath).size / 1024)
    const csvLine = `${finalImgUrl},blog,${item.destName},${sizeKB},"hero,premium,acos-batch-v3-svg-replaces",branded,dark,"blog-hero",NEW premium batch 3 autonomous replacements`

    if (csv.includes(finalImgUrl)) {
      const lines = csv.split('\n')
      const updatedLines = lines.map(line => {
        if (line.startsWith(finalImgUrl + ',')) return csvLine
        return line
      })
      fs.writeFileSync(csvPath, updatedLines.join('\n'))
      console.log(`    ✓ Updated entry in visual-inventory.csv`)
    } else {
      if (!csv.endsWith('\n') && csv.length > 0) {
        fs.appendFileSync(csvPath, '\n')
      }
      fs.appendFileSync(csvPath, csvLine + '\n')
      console.log(`    ✓ Appended entry to visual-inventory.csv`)
    }
  }
}

console.log('\n=== ALL PORTED HEROES INTEGRATED ===')
