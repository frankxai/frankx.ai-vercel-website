import type { MapGroup } from './model'
// Curated navigation relationships, never inferred software dependencies.
export const mapDestinations: Array<{
  id: MapGroup; name: string; verb: string; description: string; href: string
  image: string; imageLabel: string; links: Array<{ label: string; href: string }>
}> = [
  { id: 'websites', name: 'FrankX', verb: 'Learn & build', description: 'Architecture guides, published books and field notes from the work.', href: '/ai-architecture', image: '/images/home/ai-architecture-atelier-v2.webp', imageLabel: 'Architecture collection artwork', links: [{ label: 'Read the books', href: '/books' }, { label: 'Listen to the music', href: '/music' }] },
  { id: 'acos', name: 'Starlight & ACOS', verb: 'Run your agents', description: 'Inspect the creator operating system, agent catalog and reusable workflows.', href: '/acos', image: '/images/acos/acos-architecture.png', imageLabel: 'ACOS architecture illustration', links: [{ label: 'Agent catalog', href: '/agents' }, { label: 'Developer resources', href: '/developers' }] },
  { id: 'creator-tools', name: 'Skills', verb: 'Take the methods', description: 'Install the architect and creator skill packs in your own coding agent.', href: '/skills', image: '/images/blog/claude-code-skills-2026-hero-v3.jpg', imageLabel: 'Skills guide artwork', links: [{ label: 'Architect pack', href: 'https://skills.sh/frankxai/skills' }, { label: 'Creator pack', href: 'https://skills.sh/frankxai/creator-skills' }] },
  { id: 'arcanea', name: 'Arcanea', verb: 'Explore the worlds', description: 'The creative world and its public source projects.', href: 'https://arcanea.ai', image: '/images/newsletter/arcanea-transmissions-banner.png', imageLabel: 'Arcanea newsletter artwork', links: [{ label: 'Arcanea source', href: 'https://github.com/Arcanea-Labs' }] },
  { id: 'products', name: 'Products', verb: 'Put it to work', description: 'Browse the published products and reusable project templates.', href: '/products', image: '/images/lead-magnets/acos-playbook-cover.png', imageLabel: 'ACOS playbook cover', links: [{ label: 'Starter kits', href: '/templates' }, { label: 'Work with Frank', href: '/work-with-me' }] },
  { id: 'research', name: 'Research', verb: 'Follow the evidence', description: 'Research notes, sources and experiments behind the published work.', href: '/research', image: '/images/architectures/llmops.png', imageLabel: 'LLMOps architecture illustration', links: [{ label: 'Research signals', href: '/signals' }, { label: 'Reading library', href: '/library' }] },
]
// Install contract verified against public READMEs, 2026-11-14.
export const mapSkillPacks = [
  { name: 'Architect skills', repo: 'frankxai/skills', description: 'MCP design, agent orchestration, model routing and context engineering.', branch: 'main' },
  { name: 'Creator skills', repo: 'frankxai/creator-skills', description: 'Music prompts, video routing, visual production and brand voice.', branch: 'main' },
]
