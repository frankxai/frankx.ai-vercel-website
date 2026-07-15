/**
 * Downloads registry — plain data, no 'use client' boundary.
 *
 * Moved out of app/downloads/DownloadsClient.tsx so server code (e.g.
 * lib/portal/recommend.ts) can import it directly. A named export from a
 * 'use client' module becomes an opaque client reference across the RSC
 * boundary — calling .find() on it server-side throws at runtime, it's not
 * usable as plain data. DownloadsClient.tsx re-imports from here.
 */

export type DownloadCategory = 'all' | 'systems' | 'books' | 'dev'

export type DownloadItem = {
  id: string
  title: string
  subtitle: string
  description: string
  features: string[]
  variant: 'default' | 'emerald' | 'purple' | 'sunset' | 'ocean' | 'minimal'
  category: DownloadCategory
  icon: 'cpu' | 'book' | 'terminal'
  image: string
  previewUrl?: string
  href?: string
  external?: boolean
  cta?: string
}

export const downloadsList: DownloadItem[] = [
  {
    id: 'agentic-creator-os',
    title: 'Agentic Creator OS',
    subtitle: 'Universal AI Agent Operating System',
    description: 'One install. 90+ skills, 65+ commands, and 38 agents packaged for Claude Code, Codex, and Antigravity. Auto-activating context rules.',
    category: 'systems',
    previewUrl: '/downloads/preview/agentic-creator-os',
    features: ['90+ Skills', '65+ Commands', '38 Agents', 'Multi-Platform'],
    variant: 'purple',
    icon: 'cpu',
    image: '/images/downloads/agentic-creator-os.png',
  },
  {
    id: 'soulbook-guide',
    title: "The Creator's Soulbook",
    subtitle: 'Complete Life Architecture Framework',
    description: 'Map all 7 life pillars with structured reflection exercises. Includes the Life Symphony, Golden Path, and 7 Pillars frameworks.',
    category: 'books',
    previewUrl: '/downloads/preview/soulbook',
    features: ['7 Life Pillars', '3 Lenses', '25+ AI Prompts', 'Obsidian Templates'],
    variant: 'purple',
    icon: 'book',
    image: '/images/downloads/soulbook-guide.png',
  },
  {
    id: 'vibe-os-guide',
    title: 'Vibe OS Music Guide',
    subtitle: 'AI Music Creation System',
    description: 'From emotional vision to finished track in one studio session. 50+ genre-specific Suno prompts and the emotion mapping system.',
    category: 'systems',
    previewUrl: '/downloads/preview/vibe-os',
    features: ['50+ Suno Prompts', 'Emotion Mapping', 'Genre Templates', 'Release Playbooks'],
    variant: 'emerald',
    icon: 'cpu',
    image: '/images/downloads/vibe-os-guide.png',
  },
  {
    id: 'blue-life-commons',
    title: 'Blue Life Commons',
    subtitle: 'Ocean Intelligence System — Founding Commons',
    description: 'An open-source ocean-intelligence commons: 31 sourced species pages, 8 region briefings, welfare assessments, and a sanctuary model.',
    category: 'systems',
    href: 'https://github.com/frankxai/blue-life-commons/releases/tag/v0.1.0',
    external: true,
    cta: 'Download v0.1.0',
    features: ['31 Species Pages', '8 Region Briefings', '10 Audience Guides', 'Agent Skills'],
    variant: 'ocean',
    icon: 'book',
    image: '/images/downloads/blue-life-commons.png',
  },
  {
    id: 'health-intelligence-system',
    title: 'Health Intelligence System',
    subtitle: 'Cancer Prep & Decision Support',
    description: 'A SIP-aligned excellence pack for cancer screening prep, abnormal-result briefs, treatment discussion packets, and second opinions.',
    category: 'systems',
    previewUrl: '/downloads/health-intelligence-system',
    features: ['Cancer Module', 'Safety Gate', 'Clinician Briefs', 'GitHub Release'],
    variant: 'emerald',
    icon: 'cpu',
    image: '/images/downloads/health-intelligence-system.png',
  },
  {
    id: 'property-intelligence-os',
    title: 'Property Intelligence OS',
    subtitle: 'Rental Property Agentic Service Template',
    description: 'A public-safe starter kit for premium property pages, renter self-service, listing workflows, owner approvals, Codex/Claude agents, MCP/Railway architecture, and partner installs.',
    category: 'systems',
    previewUrl: '/work/property-intelligence-os',
    features: ['Renter Portal', 'Listing Studio', 'MCP/Railway', 'Partner Guide'],
    variant: 'emerald',
    icon: 'cpu',
    image: '/images/property-intelligence/portal-desktop.png',
  },
  {
    id: 'epicways-intelligence',
    title: 'EpicWays Intelligence Kit',
    subtitle: 'TheEpicWays Client Service System',
    description: 'A practical starter system for TheEpicWays: client signal, offer design, workshop flow, impact tracking, and agent briefs.',
    category: 'systems',
    previewUrl: '/downloads/epicways-intelligence',
    features: ['Signal Brief', 'Workshop Loop', 'Follow-Up Pack', 'Agent Briefs'],
    variant: 'emerald',
    icon: 'cpu',
    image: '/images/downloads/epicways-intelligence.png',
  },
  {
    id: 'starlight-sip-starter',
    title: 'Starlight SIP Starter',
    subtitle: 'Open Intelligence System Module',
    description: 'Download the open-core SIP starter from Starlight: portable files, public vault seeds, release manifest, and checksums.',
    category: 'dev',
    href: 'https://starlightintelligence.org/download',
    external: true,
    cta: 'Download SIP Core',
    features: ['SIP Core Files', 'Public Vault Seeds', 'SHA256 Checksums', 'Upgrade Path'],
    variant: 'ocean',
    icon: 'terminal',
    image: '/images/downloads/starlight-sip-starter.png',
  },
  {
    id: 'starlight-plugin-starter',
    title: 'Starlight Plugin Starter',
    subtitle: 'Codex Plugin Prerelease',
    description: 'Install four public-safe Codex plugins for enterprise AI, health intelligence safety, prompt evaluation, and Vibe OS.',
    category: 'dev',
    href: 'https://starlightintelligence.org/download#codex-plugin-starter',
    external: true,
    cta: 'Download Plugins',
    features: ['4 Codex Plugins', 'GitHub Prerelease', 'SHA256 Checksum', 'Install Guide'],
    variant: 'ocean',
    icon: 'terminal',
    image: '/images/downloads/starlight-plugin-starter.png',
  },
  {
    id: 'multi-llm-arena',
    title: 'Multi-LLM Arena Harness',
    subtitle: 'Advanced Benchmark & Testing Hub',
    description: 'A Next.js evaluation harness featuring interactive visual simulations, leaderboards, and scoring algorithms.',
    category: 'dev',
    href: 'https://github.com/frankxai/multi-llm-arena',
    external: true,
    cta: 'View on GitHub',
    features: ['Three.js Visuals', 'GSAP Animation', 'Multi-LLM Leaderboard', 'Benchmarking'],
    variant: 'purple',
    icon: 'terminal',
    image: '/images/downloads/multi-llm-arena.png',
  },
  {
    id: 'golden-age-of-creators',
    title: 'The Golden Age of Creators',
    subtitle: 'Futuristic AI Co-Creation Tome',
    description: 'The complete manuscript exploring the shift from consumer to creator, human-AI synthesis pipelines, and sovereign wealth.',
    category: 'books',
    href: '/books/golden-age.pdf',
    external: true,
    cta: 'Download PDF',
    features: ['Full Manuscript', 'AI Creator Era', 'System Co-Creation', 'Strategic Blueprint'],
    variant: 'sunset',
    icon: 'book',
    image: '/images/downloads/golden-age-of-creators.png',
  },
  // Cards for creators-life-architecture, golden-age-trilogy, the-goldmanack,
  // the-great-awakening, arcanea-chronicles, and fire-horse-poems were removed
  // 2026-07-02: their /pdfs/*.pdf files were never shipped (live 404s). Restore
  // a card only when its PDF actually exists under public/.
  {
    id: 'arcanea-creator-principles',
    title: 'Arcanea Creator Principles',
    subtitle: 'Code and Design Quality Protocols',
    description: 'Enforces strictly zero-slop guidelines, markdown styling rules, claims verification checklist, and design-council constraints.',
    category: 'dev',
    href: 'https://github.com/frankxai/agentic-creator-os/blob/main/docs/design/taste.md',
    external: true,
    cta: 'Download Principles',
    features: ['ACOS Code Spec', 'Design Guidelines', 'Adversarial Review', 'Integration Rules'],
    variant: 'minimal',
    icon: 'terminal',
    image: '/images/downloads/arcanea-creator-principles.png',
  },
  {
    id: 'acos-skills-pack',
    title: 'ACOS Skills Pack',
    subtitle: '90+ Autonomous Agent Skill Modules',
    description: 'Download the compiled agent skills folder: Framer, OCI, LangGraph, OADK, Spartan, Suno prompt architect, and more.',
    category: 'dev',
    href: '/downloads/acos-skills-pack.zip',
    external: true,
    cta: 'Download ZIP',
    features: ['90+ Claude Skills', 'Dynamic Registry', 'ACOS Primitives', 'JSON Schema'],
    variant: 'purple',
    icon: 'terminal',
    image: '/images/downloads/acos-skills-pack.png',
  },
  // acos-commands-pack card removed 2026-07-02 — /downloads/acos-commands-pack.zip
  // was never shipped (live 404). public/downloads/ has agents/skills/hooks/complete
  // packs only; restore the card when a commands zip actually exists.
  {
    id: 'acos-hooks-pack',
    title: 'ACOS Hooks Pack',
    subtitle: 'Automated Lifecycle Quality Gates',
    description: 'Pre-commit, post-execution, and session-restore hook scripts checking for slop, broken internal links, and credentials.',
    category: 'dev',
    href: '/downloads/acos-hooks-pack.zip',
    external: true,
    cta: 'Download ZIP',
    features: ['Agent Lifecycle', 'Commit Guards', 'Quality Gates', 'Diagnostics Script'],
    variant: 'purple',
    icon: 'terminal',
    image: '/images/downloads/acos-hooks-pack.png',
  },
]
