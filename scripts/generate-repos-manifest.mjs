#!/usr/bin/env node
/**
 * generate-repos-manifest.mjs
 *
 * Fetches frankxai org repos via GitHub CLI, merges with repos-overrides.json,
 * assigns clusters from name patterns, writes data/repos-manifest.json.
 *
 * No npm deps — uses only Node.js built-ins + gh CLI subprocess.
 *
 * Usage:
 *   node scripts/generate-repos-manifest.mjs
 *   GITHUB_TOKEN=xxx node scripts/generate-repos-manifest.mjs
 *
 * Fallback: If GitHub API is unavailable, keeps existing manifest unchanged.
 */

import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

const MANIFEST_PATH = join(ROOT, 'data/repos-manifest.json')
const OVERRIDES_PATH = join(ROOT, 'data/repos-overrides.json')

// ─── Cluster detection from repo name patterns ────────────────────────────

const CLUSTER_PATTERNS = [
  // Arcanea first (most specific prefix)
  { pattern: /^arcanea|^claude-arcanea|^oh-my-arcanea|^gemini-arcanea|^arcanean/, cluster: 'arcanea' },
  // ACOS & Intelligence
  { pattern: /^acos|^agentic-creator-os|^starlight|^knowledge-work-plugins/, cluster: 'acos' },
  // Websites & Content
  { pattern: /^frankx\.ai|^frankx-website|^frankx-logs|^ai-architect-academy|^FrankX$/, cluster: 'websites' },
  // Creator Tools
  { pattern: /^agentic-creator-skills|^awesome-claude|^agents$|^openclaw|^claude-code-music|^claude-skills|^claude-complete|^claude-code-config|^claude-codex/, cluster: 'creator-tools' },
  // Products & Revenue
  { pattern: /^investor|^oracle-work|^production-agent|^vibe-os|^life-sciences|^soulbook/i, cluster: 'products' },
  // Research & Experiments (default)
  { pattern: /.*/, cluster: 'research' },
]

function detectCluster(name) {
  for (const { pattern, cluster } of CLUSTER_PATTERNS) {
    if (pattern.test(name)) return cluster
  }
  return 'research'
}

// ─── Status detection from recent activity ────────────────────────────────

function detectStatus(pushedAt) {
  const days = (Date.now() - new Date(pushedAt).getTime()) / (1000 * 60 * 60 * 24)
  if (days < 30) return 'building'
  if (days < 90) return 'stable'
  return 'archived'
}

// ─── Main ─────────────────────────────────────────────────────────────────

async function main() {
  console.log('🔍 Fetching frankxai repos via gh CLI...')

  // Load overrides
  let overrides = { repos: {} }
  if (existsSync(OVERRIDES_PATH)) {
    try {
      overrides = JSON.parse(readFileSync(OVERRIDES_PATH, 'utf8'))
      console.log(`✅ Loaded overrides for ${Object.keys(overrides.repos).length} repos`)
    } catch (e) {
      console.warn('⚠️  Could not parse repos-overrides.json, continuing without overrides')
    }
  }

  // Load existing manifest as fallback
  let existingManifest = null
  if (existsSync(MANIFEST_PATH)) {
    try {
      existingManifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'))
    } catch (e) {
      // Will create fresh
    }
  }

  // Fetch from GitHub using execFileSync with argument array (prevents injection)
  let rawRepos = []
  try {
    const ghArgs = [
      'repo', 'list', 'frankxai',
      '--limit', '100',
      '--json', 'name,description,isPrivate,pushedAt,url,stargazerCount,primaryLanguage,topics',
    ]

    const env = process.env.GITHUB_TOKEN
      ? { ...process.env, GH_TOKEN: process.env.GITHUB_TOKEN }
      : process.env

    const output = execFileSync('gh', ghArgs, { encoding: 'utf8', timeout: 30000, env })
    rawRepos = JSON.parse(output)
    console.log(`✅ Fetched ${rawRepos.length} repos from GitHub`)
  } catch (e) {
    console.warn('⚠️  GitHub fetch failed:', e.message)
    if (existingManifest) {
      console.log('📦 Using existing manifest (no changes)')
      process.exit(0)
    } else {
      console.error('❌ No existing manifest and GitHub unavailable — cannot generate')
      process.exit(1)
    }
  }

  // Skip low-value repos (forks, private templates, empty repos)
  const SKIP_REPOS = new Set([
    'skills-copilot-codespaces-vscode', // GitHub learning repo
    'lobe-chat-1', 'lobe-chat-new', 'lobe-chat-v3', 'frankx-lobe-chat', // Internal forks
    'arc-kilocode', 'arc-cline', // Fork archives
    'pipeshub-ai', // Fork
    'coding-agent-template', 'coding-agent-template1', 'coding-agent-template2',
    'coding-agent-template3', 'coding-agent-platform4',
    'nextjs-ai-chatbot', 'nextjs-commerce', 'empathic-voice-interface-starter',
    'ai-sdk-starter-xai', 'v0-kling-ai-clone', 'morphicc-ai-answer-engine-generative-ui',
    'payload-website-starter', 'payload-website-starterx',
    'v0-pointer-ai-landing-page', 'v0-skal-ventures-template',
    'my-waitlist-app', 'waitly',
    'frankxai', // Org profile repo
    'saas-ai-architect-academy', // Empty
    'infogenius', // Minimal
    'ai-and-web3', // Empty
    'FrankXAiHub-x-ghost', // Empty
    'ai-architect', // MOVED →
    'oci-ai-architect', // MOVED →
    'oracle-genai-guides', // MOVED →
    'claude-code-oracle-skills', // MOVED →
    'claude-infrastructure', 'claude-systematic-workflows', // Superseded
    'trinityaicoaching', 'trinity-platform', 'trinity-ai-slackbot', // Old Trinity brand
    'ai-music-academy', 'aiarchitectacademy', 'AI-Architect-Academy-Replit',
    'ux-design', 'notion-powered-blog',
    'arcanea-ai', 'arcanea-ai-research', 'arcanea-codex', // Older/superseded
    'codex-arcanea', // Superseded
    'oci-open-webui', // Fork
  ])

  // Build repo objects
  const repos = rawRepos
    .filter(r => !SKIP_REPOS.has(r.name))
    .map(repo => {
      const override = overrides.repos[repo.name] || {}
      const cluster = override.cluster || detectCluster(repo.name)
      const status = override.status || detectStatus(repo.pushedAt)

      return {
        name: repo.name,
        org: 'frankxai',
        cluster,
        description: repo.description || '',
        status,
        priority: override.priority || 'medium',
        ...(override.milestone ? { milestone: override.milestone } : {}),
        url: repo.url,
        ...(override.deployed ? { deployed: override.deployed } : {}),
        tags: override.tags || (repo.topics || []),
        updatedAt: repo.pushedAt ? repo.pushedAt.split('T')[0] : new Date().toISOString().split('T')[0],
        private: repo.isPrivate,
        stars: repo.stargazerCount || 0,
        language: repo.primaryLanguage?.name || null,
        ...(override.actionItem ? { actionItem: override.actionItem } : {}),
        ...(override.notes ? { notes: override.notes } : {}),
      }
    })
    .sort((a, b) => {
      const pOrder = { critical: 0, high: 1, medium: 2, low: 3 }
      const pa = pOrder[a.priority] ?? 4
      const pb = pOrder[b.priority] ?? 4
      if (pa !== pb) return pa - pb
      return a.name.localeCompare(b.name)
    })

  // Build cluster stats
  const clusterDefs = [
    { id: 'arcanea', name: 'Arcanea Universe', color: 'purple', tagline: 'The creative intelligence platform', description: '10 Guardian agents, Ten Gates progression, open creative infrastructure' },
    { id: 'acos', name: 'ACOS & Intelligence', color: 'emerald', tagline: 'The operating system for AI-powered creators', description: '75+ skills, 38 agents, universal intelligence layer across all coding tools' },
    { id: 'websites', name: 'Websites & Content', color: 'cyan', tagline: 'The public face of FrankX', description: 'frankx.ai, AI Architect Academy, logs, and dev workspace' },
    { id: 'creator-tools', name: 'Creator Tools', color: 'amber', tagline: 'Tools that empower AI-powered creators', description: 'Skill libraries, awesome lists, music production, deploy templates' },
    { id: 'products', name: 'Products & Revenue', color: 'rose', tagline: 'Revenue-generating products and enterprise work', description: 'Investor intelligence, Vibe OS, Oracle work, production patterns' },
    { id: 'research', name: 'Research & Experiments', color: 'sky', tagline: 'Experiments, tools, and emerging ideas', description: 'MCP tools, AI ops, student education, developer utilities' },
  ]

  const clusters = clusterDefs.map(c => ({
    ...c,
    count: repos.filter(r => r.cluster === c.id).length,
  }))

  const manifest = {
    version: '1.0',
    lastUpdated: new Date().toISOString().split('T')[0],
    totalRepos: repos.length,
    clusters,
    repos,
  }

  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n')
  console.log(`✅ Wrote ${repos.length} repos to data/repos-manifest.json`)
  console.log(`   Clusters:`)
  clusters.forEach(c => console.log(`   ${c.name}: ${c.count} repos`))
}

main().catch(e => {
  console.error('❌ Failed:', e)
  process.exit(1)
})
