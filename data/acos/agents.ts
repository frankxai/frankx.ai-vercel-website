/**
 * ACOS Agent Catalog — 99-agent architecture
 *
 * Structure: 11 pillars × 9 specialists = 99 agent-slots.
 * Each slot maps to a shipped skill/command/agent OR is marked as a gap.
 *
 * Source of truth: .claude/commands/, .claude/skills/, .claude/agents/
 * Update when new skills ship; keep counts accurate for /acos marketing copy.
 */

export type AgentStatus = 'shipped' | 'in-progress' | 'gap'

export interface AgentSlot {
  name: string
  kind: 'skill' | 'command' | 'agent' | 'mcp'
  ref?: string
  status: AgentStatus
  one_liner: string
}

export interface Pillar {
  id: string
  number: number
  title: string
  tagline: string
  accent: 'emerald' | 'cyan' | 'violet' | 'amber' | 'rose' | 'sky' | 'teal' | 'fuchsia' | 'indigo' | 'lime' | 'orange'
  surface: string
  specialists: AgentSlot[]
}

export const PILLARS: Pillar[] = [
  {
    id: 'content',
    number: 1,
    title: 'Content Engine',
    tagline: 'Raw recording → published short, blog, or social post.',
    accent: 'emerald',
    surface: '/acos',
    specialists: [
      { name: 'ACO Router', kind: 'command', ref: '/aco', status: 'shipped', one_liner: 'Agentic Content Officer — routes every content ask to the right sub-workflow.' },
      { name: 'Talking Head Ship', kind: 'command', ref: '/talking-head-ship', status: 'shipped', one_liner: 'Raw .mp4 → transcribe → cut → caption → b-roll → render → publish in one command.' },
      { name: 'Hook Engineer', kind: 'skill', ref: 'hook', status: 'shipped', one_liner: 'Tri-modal hook generation — visual + audio + text — across 6 platforms.' },
      { name: 'Social Distributor', kind: 'command', ref: '/generate-social', status: 'shipped', one_liner: 'One blog → platform-optimized posts for X, LinkedIn, Threads, IG.' },
      { name: 'Publishing Factory', kind: 'command', ref: '/factory', status: 'shipped', one_liner: 'End-to-end pipeline: idea → polish → publish → distribute.' },
      { name: 'Content Polisher', kind: 'command', ref: '/polish-content', status: 'shipped', one_liner: 'AI pattern elimination, voice consistency, SEO ready.' },
      { name: 'Content Classifier', kind: 'command', ref: '/classify-content', status: 'shipped', one_liner: 'Routes incoming content from any AI assistant to the right destination.' },
      { name: 'Video Vault Clip', kind: 'command', ref: '/video-clip', status: 'shipped', one_liner: 'Annotate timestamps and extract high-value clips.' },
      { name: 'Hook Learning Loop', kind: 'skill', ref: 'hook-learn', status: 'in-progress', one_liner: 'Analytics → learned.json → biases future hook generation toward winners.' },
    ],
  },
  {
    id: 'music',
    number: 2,
    title: 'Music Production',
    tagline: 'Suno prompts to mastered tracks and commercial release.',
    accent: 'violet',
    surface: '/music-lab',
    specialists: [
      { name: 'Suno Prompt Architect', kind: 'skill', ref: 'suno-prompt-architect', status: 'shipped', one_liner: 'Professional-quality Suno prompts with style stacking.' },
      { name: 'Suno v4.5 Mastery', kind: 'skill', ref: 'suno-ai-mastery', status: 'shipped', one_liner: 'Genre-specific production across 12+ styles.' },
      { name: 'Music Producer Agent', kind: 'agent', ref: 'Music Producer', status: 'shipped', one_liner: 'Premium soundscapes and commercial tracks.' },
      { name: 'Music Video Batch', kind: 'command', ref: '/music-video-batch', status: 'gap', one_liner: 'Batch-generate lyric videos for the 12k Suno catalog.' },
      { name: 'Create Music Wizard', kind: 'command', ref: '/create-music', status: 'shipped', one_liner: 'Guided Suno creation with brand-voice constraints.' },
      { name: 'Music Catalog Indexer', kind: 'skill', ref: 'catalog-indexer', status: 'gap', one_liner: 'Maintains /data/music-catalog.json across 12k+ tracks.' },
      { name: 'Mastering QC', kind: 'skill', ref: 'mastering-qc', status: 'gap', one_liner: '-14 LUFS target, loudness normalization, spectrum check.' },
      { name: 'Licensing & Rights', kind: 'skill', ref: 'music-licensing', status: 'gap', one_liner: 'Royalty tracking, sync license templates, platform ToS.' },
      { name: 'Release Manager', kind: 'skill', ref: 'music-release', status: 'gap', one_liner: 'Distrokid + Spotify + Apple Music orchestration.' },
    ],
  },
  {
    id: 'visuals',
    number: 3,
    title: 'Visual Intelligence',
    tagline: 'Research-grounded visuals, covers, and kinetic typography.',
    accent: 'cyan',
    surface: '/design-lab',
    specialists: [
      { name: 'Infogenius', kind: 'skill', ref: 'infogenius', status: 'shipped', one_liner: 'Research-grounded infographics with 5 Guardian art directors.' },
      { name: 'Nano Banana 2', kind: 'mcp', ref: 'nano-banana', status: 'shipped', one_liner: 'Gemini 3.1 Flash Image for on-brand b-roll and covers.' },
      { name: 'VIS Registry', kind: 'skill', ref: 'vis', status: 'shipped', one_liner: 'Scan, audit, manage images across the site with registry search.' },
      { name: 'Arcanea Book Cover', kind: 'skill', ref: 'arcanea-book-cover', status: 'shipped', one_liner: 'Premium book covers via NB2 with typography overlays.' },
      { name: 'Frontend Designer', kind: 'skill', ref: 'frontend-design', status: 'shipped', one_liner: 'Production-grade interfaces with high design quality.' },
      { name: 'Canvas Design', kind: 'skill', ref: 'canvas-design', status: 'shipped', one_liner: 'Beautiful .png and .pdf documents using design philosophy.' },
      { name: 'Brand Guidelines', kind: 'skill', ref: 'brand-guidelines', status: 'shipped', one_liner: 'Frankx brand palette, typography, voice applied to any artifact.' },
      { name: 'V0 Generate', kind: 'command', ref: '/v0-generate', status: 'shipped', one_liner: 'Rapid UI component prototyping with live previews.' },
      { name: 'Design Gods Orchestrator', kind: 'command', ref: '/design-gods', status: 'shipped', one_liner: 'Design Excellence Orchestrator v2.0 — multi-agent design reviews.' },
    ],
  },
  {
    id: 'books',
    number: 4,
    title: 'Book Publishing',
    tagline: 'Golden Age books with research-driven methodology.',
    accent: 'amber',
    surface: '/books',
    specialists: [
      { name: 'Author Team', kind: 'command', ref: '/author-team', status: 'shipped', one_liner: 'Master Story Architect orchestration for world-class books.' },
      { name: 'Master Story Architect', kind: 'agent', ref: 'Master Story Architect', status: 'shipped', one_liner: 'Chief orchestrator for all book projects.' },
      { name: 'Character Psychologist', kind: 'agent', ref: 'Character Psychologist', status: 'shipped', one_liner: 'Authentic psychological profiles, believable arcs, distinct voices.' },
      { name: 'World Architect', kind: 'agent', ref: 'World Architect', status: 'shipped', one_liner: 'Internally consistent universes with rich cultures and magic/tech systems.' },
      { name: 'Developmental Editor', kind: 'agent', ref: 'Developmental Editor', status: 'shipped', one_liner: 'Structure, pacing, and narrative architecture.' },
      { name: 'Line Editor & Voice Alchemist', kind: 'agent', ref: 'Line Editor', status: 'shipped', one_liner: 'AI pattern elimination, voice consistency, compelling prose.' },
      { name: 'Research Librarian', kind: 'agent', ref: 'Research Librarian', status: 'shipped', one_liner: 'Fact-checking, source verification, case-study validation.' },
      { name: 'Publishing Strategist', kind: 'agent', ref: 'Publishing Strategist', status: 'shipped', one_liner: 'Market positioning, cover direction, launch planning.' },
      { name: 'Chapter Draft', kind: 'command', ref: '/write-chapter', status: 'shipped', one_liner: 'AI-assisted chapter drafting with continuity guards.' },
    ],
  },
  {
    id: 'workshops',
    number: 5,
    title: 'Workshop OS',
    tagline: 'Plan, deliver, amplify — in-person and virtual.',
    accent: 'rose',
    surface: '/workshops',
    specialists: [
      { name: 'Workshop New', kind: 'command', ref: '/workshop-new', status: 'shipped', one_liner: 'Scaffold a new workshop folder and CRM record.' },
      { name: 'Workshop Prep', kind: 'command', ref: '/workshop-prep', status: 'shipped', one_liner: 'Research an attendee via LinkedIn and generate per-attendee brief.' },
      { name: 'Workshop Debrief', kind: 'command', ref: '/workshop-debrief', status: 'shipped', one_liner: 'Post-workshop reflection, content kit draft, CRM attendance log.' },
      { name: 'Amplify Attendee', kind: 'command', ref: '/amplify-attendee', status: 'shipped', one_liner: 'Draft Frank\'s repost per amplification protocol.' },
      { name: 'CRM Log', kind: 'command', ref: '/crm-log', status: 'shipped', one_liner: 'Log meetings, intros, emails, content posts to JSON CRM.' },
      { name: 'Workshop Producer', kind: 'agent', ref: 'workshop-producer', status: 'shipped', one_liner: 'End-to-end workshop production orchestration.' },
      { name: 'Prep Briefer', kind: 'agent', ref: 'prep-briefer', status: 'shipped', one_liner: 'Per-attendee LinkedIn research + structured brief.' },
      { name: 'Amplification Liaison', kind: 'agent', ref: 'amplification-liaison', status: 'shipped', one_liner: 'Content-kit generation and amplification cadence.' },
      { name: 'Portable Workshop OS', kind: 'skill', ref: 'workshop-os-portable', status: 'shipped', one_liner: 'Zip-able, multi-LLM workshop kit for Claude/ChatGPT/Codex/Gemini.' },
    ],
  },
  {
    id: 'research',
    number: 6,
    title: 'Research Hub',
    tagline: 'Structured deep research with source validation.',
    accent: 'sky',
    surface: '/research',
    specialists: [
      { name: 'Deep Research', kind: 'command', ref: '/deepresearch', status: 'shipped', one_liner: 'Parallel sub-agent research with AEO-optimized output.' },
      { name: 'Daily Research Ops', kind: 'command', ref: '/research', status: 'shipped', one_liner: 'Daily multi-agent research workflow.' },
      { name: 'AI Architect Newsletter', kind: 'command', ref: '/ai-architect-newsletter', status: 'shipped', one_liner: 'Weekly newsletter with research integration.' },
      { name: 'New Model Intelligence', kind: 'command', ref: '/new-model', status: 'shipped', one_liner: 'Frontier model intelligence pipeline.' },
      { name: 'Iterative Retrieval', kind: 'skill', ref: 'iterative-retrieval', status: 'shipped', one_liner: 'Progressively refined context retrieval.' },
      { name: 'Search First', kind: 'skill', ref: 'search-first', status: 'shipped', one_liner: 'Research-before-coding workflow.' },
      { name: 'Opus Extended Thinking', kind: 'skill', ref: 'opus-extended-thinking', status: 'shipped', one_liner: 'Deep reasoning for complex analysis.' },
      { name: 'Super Intelligence', kind: 'command', ref: '/superintelligence', status: 'shipped', one_liner: 'Maximum reasoning depth with multi-perspective analysis.' },
      { name: 'Research Librarian', kind: 'agent', ref: 'Research Librarian', status: 'shipped', one_liner: 'Fact-check + source verification for books and long-form.' },
    ],
  },
  {
    id: 'products',
    number: 7,
    title: 'Product Engine',
    tagline: 'Digital products from FrankX components to paid offers.',
    accent: 'orange',
    surface: '/products',
    specialists: [
      { name: 'Product Engine', kind: 'skill', ref: 'product-engine', status: 'shipped', one_liner: 'Premium digital products from FrankX components.' },
      { name: 'Product Team Launch', kind: 'command', ref: '/product-team-launch', status: 'shipped', one_liner: 'Orchestrated build with full product team.' },
      { name: 'Product Sprint', kind: 'command', ref: '/product-sprint', status: 'shipped', one_liner: 'Focused build phase.' },
      { name: 'Product QA', kind: 'command', ref: '/product-qa', status: 'shipped', one_liner: 'Quality assurance cycle.' },
      { name: 'Product Deploy', kind: 'command', ref: '/product-deploy', status: 'shipped', one_liner: 'Production release orchestration.' },
      { name: 'Product Retro', kind: 'command', ref: '/product-retro', status: 'shipped', one_liner: 'Team retrospective with action items.' },
      { name: 'Template Monetization', kind: 'skill', ref: 'template-monetization', status: 'shipped', one_liner: 'Blueprint-to-template monetization workflows.' },
      { name: 'Product Management Expert', kind: 'skill', ref: 'product-management-expert', status: 'shipped', one_liner: 'PM craft applied to creator products.' },
      { name: 'Template Catalog', kind: 'skill', ref: 'template-catalog', status: 'gap', one_liner: 'Unified catalog of templates across repos.' },
    ],
  },
  {
    id: 'business',
    number: 8,
    title: 'Business Ops',
    tagline: 'Dutch BV, wealth, tax, legal — sovereign operator.',
    accent: 'teal',
    surface: '/bv',
    specialists: [
      { name: 'BV Operations', kind: 'command', ref: '/bv-ops', status: 'shipped', one_liner: 'Arcanea Labs BV — status, milestones, compliance.' },
      { name: 'Business Ops Skill', kind: 'skill', ref: 'business-ops', status: 'shipped', one_liner: 'Legal, tax, accounting, GDPR, trademarks.' },
      { name: 'Wealth Operations', kind: 'command', ref: '/wealth-ops', status: 'shipped', one_liner: 'Real estate, mortgages, tax optimization, FIRE planning.' },
      { name: 'Wealth Ops Skill', kind: 'skill', ref: 'wealth-ops', status: 'shipped', one_liner: 'Multi-property portfolio and net-worth tracking.' },
      { name: 'Oracle Work', kind: 'command', ref: '/oracle-work', status: 'shipped', one_liner: 'Customer projects, presentations, demos, internal content.' },
      { name: 'Oracle AI Architect', kind: 'skill', ref: 'oracle-ai-architect', status: 'shipped', one_liner: 'Enterprise AI CoE frameworks and reference architectures.' },
      { name: 'OCI Services Expert', kind: 'skill', ref: 'oci-services-expert', status: 'shipped', one_liner: 'Oracle Cloud architecture, cost optimization.' },
      { name: 'Oracle Diagram Generator', kind: 'skill', ref: 'oracle-diagram-generator', status: 'shipped', one_liner: 'Reference architecture diagrams for presentations.' },
      { name: 'Compliance Guardian', kind: 'skill', ref: 'compliance-guardian', status: 'gap', one_liner: 'GDPR, DSA, AI Act compliance scanning across the site.' },
    ],
  },
  {
    id: 'personal',
    number: 9,
    title: 'Personal & Family',
    tagline: 'Heritage, health, philosophy — the human core.',
    accent: 'fuchsia',
    surface: '/familie',
    specialists: [
      { name: 'Familie Hub', kind: 'command', ref: '/familie', status: 'shipped', one_liner: 'German-first private family hub with Wolgadeutsche history.' },
      { name: 'Hoffnung Book', kind: 'command', ref: '/hoffnung', status: 'shipped', one_liner: 'German book launch on hope + Lebensbaum narrative.' },
      { name: 'Atlas Globe', kind: 'command', ref: '/globe', status: 'shipped', one_liner: 'Trilingual EN/DE/HR interactive globe for nephew\'s kids.' },
      { name: 'Lebensbaum', kind: 'command', ref: '/lebensbaum', status: 'shipped', one_liner: 'Life-tree visualization — family across generations.' },
      { name: 'Health & Nutrition Expert', kind: 'skill', ref: 'health-nutrition-expert', status: 'shipped', one_liner: '2025 longevity, metabolic health, microbiome science.' },
      { name: 'Gym Training Expert', kind: 'skill', ref: 'gym-training-expert', status: 'shipped', one_liner: 'Hypertrophy, progressive overload, biomechanics — 2025 research.' },
      { name: 'Greek Philosopher', kind: 'skill', ref: 'greek-philosopher', status: 'shipped', one_liner: 'Socratic questioning, Stoic principles, philosophical inquiry.' },
      { name: 'Spartan Warrior', kind: 'skill', ref: 'spartan-warrior', status: 'shipped', one_liner: 'Unbreakable discipline, courage, relentless excellence.' },
      { name: 'Family Timeline', kind: 'skill', ref: 'family-timeline', status: 'gap', one_liner: 'Unified visualization: Hoffnung + Lebensbaum + Atlas + heritage.' },
    ],
  },
  {
    id: 'community',
    number: 10,
    title: 'Community Fabric',
    tagline: 'Vibeclubs, Circle, Studio — where creators meet.',
    accent: 'lime',
    surface: '/community',
    specialists: [
      { name: 'Vibeclubs Extension', kind: 'mcp', ref: 'vibeclubs', status: 'in-progress', one_liner: 'Chrome extension — shared pomodoro + ambient mixer + AI recap.' },
      { name: 'GenCreator Lounge', kind: 'skill', ref: 'gencreator-lounge', status: 'in-progress', one_liner: 'Free Skool community for AI-native creators.' },
      { name: 'Circle Membership', kind: 'skill', ref: 'gencreator-circle', status: 'in-progress', one_liner: '$49/mo hosted ACOS + live Vibeclubs sessions.' },
      { name: 'Studio Tier', kind: 'skill', ref: 'gencreator-studio', status: 'in-progress', one_liner: '$297/mo 1:1 Personal AI CoE buildout.' },
      { name: 'Social Media Strategy', kind: 'skill', ref: 'social-media-strategy', status: 'shipped', one_liner: 'Platform-native content strategy with audience research.' },
      { name: 'Social Content Generator', kind: 'agent', ref: 'social-content-generator', status: 'shipped', one_liner: 'Transform blog articles into platform-optimized social content.' },
      { name: 'Slack Gif Creator', kind: 'skill', ref: 'slack-gif-creator', status: 'shipped', one_liner: 'Animated GIFs optimized for Slack.' },
      { name: 'Amplification Protocol', kind: 'command', ref: '/amplify-attendee', status: 'shipped', one_liner: 'Structured repost of attendee content per brand guidelines.' },
      { name: 'Community Dashboard', kind: 'skill', ref: 'community-dashboard', status: 'gap', one_liner: 'Unified view of Skool, Discord, Circle, Studio activity.' },
    ],
  },
  {
    id: 'meta',
    number: 11,
    title: 'Meta-Infrastructure',
    tagline: 'The system that runs the system.',
    accent: 'indigo',
    surface: '/acos',
    specialists: [
      { name: 'ACOS Router v10', kind: 'command', ref: '/acos', status: 'shipped', one_liner: 'Auto-routing command across 130+ commands and 38+ agents.' },
      { name: 'Memory Guardian', kind: 'skill', ref: 'memory-guardian', status: 'shipped', one_liner: 'Memory safety and scaling guardrails for sessions and parallel agents.' },
      { name: 'Safety Guard', kind: 'skill', ref: 'safety-guard', status: 'shipped', one_liner: 'Prevents destructive operations.' },
      { name: 'Agentic Jujutsu', kind: 'skill', ref: 'agentic-jujutsu', status: 'shipped', one_liner: 'Self-learning version control for AI agents.' },
      { name: 'Verification Loop', kind: 'skill', ref: 'verification-loop', status: 'shipped', one_liner: 'Comprehensive verification before completion.' },
      { name: 'Handover', kind: 'command', ref: '/handover', status: 'shipped', one_liner: 'Cross-session continuity briefing.' },
      { name: 'EOD Capture', kind: 'command', ref: '/eod', status: 'shipped', one_liner: 'End of day session capture with unfinished work.' },
      { name: 'Sync Repos', kind: 'command', ref: '/sync-repos', status: 'shipped', one_liner: 'Multi-repo synchronization across 6 brand domains.' },
      { name: 'ACOS Score', kind: 'command', ref: '/acos-score', status: 'shipped', one_liner: 'Intelligence score report — trajectory learning + pattern quality.' },
    ],
  },
]

export function pillarCounts() {
  let total = 0
  let shipped = 0
  let inProgress = 0
  let gap = 0
  for (const p of PILLARS) {
    for (const s of p.specialists) {
      total++
      if (s.status === 'shipped') shipped++
      else if (s.status === 'in-progress') inProgress++
      else gap++
    }
  }
  return { total, shipped, inProgress, gap }
}
