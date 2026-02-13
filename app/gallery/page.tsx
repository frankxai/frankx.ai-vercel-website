'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, Sparkles, Image as ImageIcon } from 'lucide-react'

// ── Gallery Collections ─────────────────────────────────────────────────────
const collections = [
  {
    id: 'instruments',
    title: 'Bio-Tech Instruments',
    description: 'Where engineering precision meets living intelligence. Grand pianos with neural networks, violins with mycelium acoustics, synthesis controllers grown from coral.',
    image: '/images/gallery/instruments/biotech-grand-piano.png',
    count: 6,
    href: '/gallery/instruments',
    accent: 'from-cyan-500/20 to-emerald-500/20',
    borderAccent: 'border-cyan-500/30',
    badge: 'New',
  },
  {
    id: 'characters',
    title: 'Character Design',
    description: 'ACOS mascot concepts — three-tailed beast guardians, holographic entities, chrome mech-spirits, and data constellations.',
    image: '/images/mascot/mascot-v05-techno-beast-standing.png',
    count: 10,
    href: '/gallery#characters',
    accent: 'from-purple-500/20 to-pink-500/20',
    borderAccent: 'border-purple-500/30',
  },
  {
    id: 'nature-tech',
    title: 'Nature Tech',
    description: 'Organic intelligence meets dark technology — bioluminescent forests, crystal gardens, neural root systems, code vines.',
    image: '/images/design-lab/nature-01-digital-garden-hero.png',
    count: 6,
    href: '/gallery#nature-tech',
    accent: 'from-emerald-500/20 to-teal-500/20',
    borderAccent: 'border-emerald-500/30',
  },
  {
    id: 'system-design',
    title: 'System Architecture',
    description: 'Premium infographics visualizing the FrankX ecosystem — ACOS orchestration, Vibe OS integration, Arcanea gates, agent grids.',
    image: '/images/ecosystem/01-frankx-ecosystem-overview.png',
    count: 7,
    href: '/gallery#system-design',
    accent: 'from-amber-500/20 to-orange-500/20',
    borderAccent: 'border-amber-500/30',
  },
  {
    id: 'editorial',
    title: 'Editorial Art',
    description: 'Blog hero images and editorial illustrations — swarm intelligence, personal AI, production patterns, creator studios.',
    image: '/images/blog/golden-age-of-intelligence-hero.png',
    count: 12,
    href: '/gallery#editorial',
    accent: 'from-amber-500/20 to-yellow-500/20',
    borderAccent: 'border-amber-500/30',
  },
  {
    id: 'abstract',
    title: 'Abstract & Cosmic',
    description: 'Neural synthesis, cosmic blueprints, data auroras, frequency spectrums — pure visual exploration at the edge of imagination.',
    image: '/images/ai-art/neural-network-brain.png',
    count: 20,
    href: '/gallery#abstract',
    accent: 'from-indigo-500/20 to-violet-500/20',
    borderAccent: 'border-indigo-500/30',
  },
]

// ── Collection Card ─────────────────────────────────────────────────────────
function CollectionCard({
  collection,
  index,
}: {
  collection: (typeof collections)[0]
  index: number
}) {
  const isFullLink = collection.href.startsWith('/gallery/')

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={collection.href}
        className={`group relative block overflow-hidden rounded-2xl border ${collection.borderAccent} bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.06] transition-all duration-500`}
      >
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={collection.image}
            alt={collection.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Overlay gradient */}
          <div className={`absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/40 to-transparent`} />

          {/* Badge */}
          {collection.badge && (
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-xs font-medium backdrop-blur-sm">
              {collection.badge}
            </div>
          )}

          {/* Count */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white/70 text-sm">
            <ImageIcon className="w-4 h-4" />
            <span>{collection.count} artworks</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
              {collection.title}
            </h3>
            {isFullLink && (
              <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
            )}
          </div>
          <p className="text-white/50 text-sm leading-relaxed line-clamp-2">
            {collection.description}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}

// ── Main Page ───────────────────────────────────────────────────────────────
export default function GalleryPage() {
  const totalArtworks = collections.reduce((sum, c) => sum + c.count, 0)

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-16">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              Visual Gallery
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              The{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-amber-400 bg-clip-text text-transparent">
                Gallery
              </span>
            </h1>

            <p className="text-xl text-white/50 max-w-2xl mx-auto mb-10">
              AI-generated visual art across character design, system architecture,
              nature-tech environments, bio-tech instruments, and abstract exploration.
            </p>

            {/* Stats bar */}
            <div className="flex items-center justify-center gap-8 text-white/40 text-sm">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                <span>{totalArtworks}+ Artworks</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{collections.length} Collections</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Gemini + Nano Banana</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection, index) => (
            <CollectionCard key={collection.id} collection={collection} index={index} />
          ))}
        </div>
      </section>

      {/* Full Gallery Preview — all artworks in masonry */}
      <section id="characters" className="max-w-7xl mx-auto px-6 pb-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-white/10 pt-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Full Collection</h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Browse all artworks across every collection. Use filters to explore by category or AI model.
            </p>
          </div>
        </motion.div>
      </section>

      <section id="nature-tech" />
      <section id="system-design" />
      <section id="editorial" />
      <section id="abstract" />

      {/* Embedded full gallery */}
      <FullGallerySection />
    </div>
  )
}

// ── Full Gallery (lazy import of all artworks) ──────────────────────────────
function FullGallerySection() {
  // Import the full artwork data inline to keep this page self-contained
  // while still showing all artworks from the original /ai-art page
  const { MidjourneyGallery } = require('@/components/embeds')

  const allArtworks = [
    // Character Design
    { id: 'char-01', src: '/images/mascot/mascot-v05-techno-beast-standing.png', title: 'Techno-Beast', prompt: 'Three-tailed wolf-fox hybrid with hexagonal armor plating, glowing cyan eyes, purple-cyan-gold energy tails', model: 'nano-banana' as const, category: 'Character Design', tags: ['mascot', 'wolf', 'tech'], featured: true },
    { id: 'char-02', src: '/images/mascot/mascot-v11-chrome-guardian.png', title: 'Chrome Guardian', prompt: 'Half-organic wolf with chrome mechanical body armor, purple energy core, segmented chrome tail with cyan LEDs', model: 'nano-banana' as const, category: 'Character Design', tags: ['mascot', 'chrome', 'mech'], featured: true },
    { id: 'char-03', src: '/images/mascot/mascot-v15-kitsune-mask.png', title: 'Kitsune Protocol', prompt: 'Sleek chrome kitsune mask with cyan eyes, purple neon circuit lines, three energy trails', model: 'nano-banana' as const, category: 'Character Design', tags: ['mascot', 'kitsune', 'mask'], featured: true },
    { id: 'char-04', src: '/images/mascot/mascot-v19-hero-command-center.png', title: 'ACOS Command Center', prompt: 'Three-tailed wolf mascot surrounded by floating UI panels showing skill trees', model: 'nano-banana' as const, category: 'Character Design', tags: ['mascot', 'acos', 'command-center'] },
    { id: 'char-05', src: '/images/mascot/mascot-v20-evolution-stages.png', title: 'Evolution Stages', prompt: 'Three stages of mascot evolution from skills to agents to full system', model: 'nano-banana' as const, category: 'Character Design', tags: ['mascot', 'evolution'] },
    { id: 'char-06', src: '/images/mascot/mascot-v08-holographic-entity.png', title: 'Holographic Entity', prompt: 'Digital holographic wolf projection, translucent blue-green form, particle effects', model: 'nano-banana' as const, category: 'Character Design', tags: ['mascot', 'holographic'] },
    { id: 'char-07', src: '/images/mascot/mascot-v10-data-constellation.png', title: 'Data Constellation', prompt: 'Wolf-fox form made entirely of star-like data points connected by thin light lines', model: 'nano-banana' as const, category: 'Character Design', tags: ['mascot', 'constellation'] },
    { id: 'char-08', src: '/images/mascot/mascot-v16-organic-digital-split.png', title: 'Organic-Digital Split', prompt: 'Wolf mascot split: one half organic fur, other half chrome circuits and glass', model: 'nano-banana' as const, category: 'Character Design', tags: ['mascot', 'split', 'duality'] },
    { id: 'char-09', src: '/images/mascot/mascot-v25-crystal-familiar.png', title: 'Crystal Familiar', prompt: 'Low-poly crystalline fox with three luminous tails in purple-cyan-gold', model: 'nano-banana' as const, category: 'Character Design', tags: ['mascot', 'crystal'] },
    { id: 'char-10', src: '/images/mascot/mascot-v06-prowling-action.png', title: 'Prowling Action', prompt: 'Dynamic wolf-fox hybrid in prowling stance, energy crackling through hexagonal armor', model: 'nano-banana' as const, category: 'Character Design', tags: ['mascot', 'action'] },
    // Nature Tech
    { id: 'nature-01', src: '/images/design-lab/nature-01-digital-garden-hero.png', title: 'Digital Garden', prompt: 'Glass tree with circuit-board copper roots, bioluminescent nodes at branch junctions', model: 'nano-banana' as const, category: 'Nature Tech', tags: ['tree', 'digital', 'circuits'], featured: true },
    { id: 'nature-02', src: '/images/design-lab/nature-03-code-vines.png', title: 'Code Vines', prompt: 'Organic vines growing from code, programming syntax transforming into living plant tendrils', model: 'nano-banana' as const, category: 'Nature Tech', tags: ['code', 'vines'] },
    { id: 'nature-03', src: '/images/design-lab/nature-05-forest-architecture.png', title: 'Neural Forest Cathedral', prompt: 'Vast forest cathedral where ancient trees form neural network arches', model: 'nano-banana' as const, category: 'Nature Tech', tags: ['forest', 'cathedral'], featured: true },
    { id: 'nature-04', src: '/images/design-lab/nature-09-crystal-garden.png', title: 'Crystal Garden', prompt: 'Underground cavern with massive purple amethyst crystals etched with golden circuit traces', model: 'nano-banana' as const, category: 'Nature Tech', tags: ['crystal', 'cavern'] },
    { id: 'nature-05', src: '/images/design-lab/nature-10-constellation-garden.png', title: 'Constellation Garden', prompt: 'Garden where plants are made of starlight and constellations, cosmic botany', model: 'nano-banana' as const, category: 'Nature Tech', tags: ['constellation', 'garden'] },
    { id: 'nature-06', src: '/images/design-lab/nature-02-neural-roots.png', title: 'Neural Roots', prompt: 'Tree roots transforming into neural networks underground, synaptic connections glowing', model: 'nano-banana' as const, category: 'Nature Tech', tags: ['roots', 'neural'] },
    // System Design
    { id: 'sys-01', src: '/images/ecosystem/01-frankx-ecosystem-overview.png', title: 'Creator Ecosystem Overview', prompt: 'Three-pillar architecture: Vibe OS, ACOS, GenCreator OS with Starlight meta-intelligence layer', model: 'nano-banana' as const, category: 'System Design', tags: ['ecosystem', 'architecture'], featured: true },
    { id: 'sys-02', src: '/images/ecosystem/03-vibe-os-integration.png', title: 'Vibe OS Integration', prompt: 'Circular integration diagram showing Vibe OS connected to Claude, Grok, Suno, ChatGPT', model: 'nano-banana' as const, category: 'System Design', tags: ['vibe-os', 'integration'] },
    { id: 'sys-03', src: '/images/ecosystem/07-arcanea-10-gates.png', title: 'Arcanea 10 Gates', prompt: 'Progression system visualization showing 10 gates of creative development', model: 'nano-banana' as const, category: 'System Design', tags: ['arcanea', 'gates'] },
    { id: 'sys-04', src: '/images/ecosystem/09-agent-specialist-grid.png', title: 'Agent Specialist Grid', prompt: 'Grid visualization of 40+ specialized AI agents with role cards', model: 'nano-banana' as const, category: 'System Design', tags: ['agents', 'grid'] },
    { id: 'sys-05', src: '/images/ecosystem/15-acos-claude-code.png', title: 'ACOS x Claude Code', prompt: 'ACOS integration with Claude Code, command routing, skill trees', model: 'nano-banana' as const, category: 'System Design', tags: ['acos', 'claude-code'] },
    { id: 'infra-01', src: '/images/infographics/v7-01-pillars-premium.png', title: 'Seven Pillars Architecture', prompt: 'ACOS v7 seven pillars with glass/chrome 3D, dark navy, neon highlights', model: 'nano-banana' as const, category: 'System Design', tags: ['acos', 'pillars'] },
    { id: 'infra-02', src: '/images/infographics/v7-09-architecture-premium.png', title: 'Full System Architecture', prompt: 'Complete ACOS v7 system architecture, glass/chrome premium style', model: 'nano-banana' as const, category: 'System Design', tags: ['acos', 'full-system'] },
    // Intelligence
    { id: 'intel-01', src: '/images/ai-world/intelligence-atlas-hero.png', title: 'Intelligence Atlas', prompt: 'Neural constellation map showing six intelligence domains', model: 'nano-banana' as const, category: 'Intelligence', tags: ['atlas', 'constellation'], featured: true },
    { id: 'intel-02', src: '/images/ai-world/fire-gate-orchestration.png', title: 'Fire Gate Orchestration', prompt: 'Agent orchestration with fire energy motif, workflow pipelines', model: 'nano-banana' as const, category: 'Intelligence', tags: ['orchestration', 'fire-gate'] },
    { id: 'intel-03', src: '/images/ai-world/source-gate-meta.png', title: 'Source Gate: Meta', prompt: 'Meta-intelligence, self-improving AI systems, recursive patterns', model: 'nano-banana' as const, category: 'Intelligence', tags: ['meta', 'source-gate'] },
    // Editorial
    { id: 'edit-01', src: '/images/blog/swarm-intelligence-orchestration-hero.png', title: 'Swarm Intelligence Patterns', prompt: 'Four multi-agent orchestration patterns: pipeline, parallel, weighted, iterative', model: 'nano-banana' as const, category: 'Editorial', tags: ['swarm', 'orchestration'], featured: true },
    { id: 'edit-02', src: '/images/blog/build-your-own-jarvis-hero.png', title: 'Personal AI Command Center', prompt: 'Futuristic circular holographic command interface, dark navy cockpit', model: 'nano-banana' as const, category: 'Editorial', tags: ['jarvis', 'command-center'], featured: true },
    { id: 'edit-03', src: '/images/blog/mcp-doctor-hero.png', title: 'MCP Doctor Health Audit', prompt: 'Terminal-style health audit with color-coded status indicators', model: 'nano-banana' as const, category: 'Editorial', tags: ['mcp', 'terminal'] },
    { id: 'edit-04', src: '/images/blog/golden-age-of-intelligence-hero.png', title: 'Golden Age of Intelligence', prompt: 'Radiant golden brain with orbiting agent nodes, cosmic gold space', model: 'nano-banana' as const, category: 'Editorial', tags: ['golden-age', 'brain'], featured: true },
    { id: 'edit-05', src: '/images/blog/agentic-creator-os-complete-guide-hero.png', title: 'ACOS Orchestrator Map', prompt: 'Central orchestrator with seven satellite modules, purple glass 3D', model: 'nano-banana' as const, category: 'Editorial', tags: ['acos', 'orchestrator'] },
    { id: 'edit-06', src: '/images/blog/nvidia-physical-ai-hero.png', title: 'Physical AI Revolution', prompt: 'Chrome robotic hand holding NVIDIA H200 chip, green energy rays', model: 'nano-banana' as const, category: 'Editorial', tags: ['nvidia', 'robotics'], featured: true },
    { id: 'edit-07', src: '/images/blog/agentic-ai-roadmap-2026-hero.png', title: 'Agentic AI Horizon', prompt: 'Golden circuit highways converging toward sunrise, constellation network', model: 'nano-banana' as const, category: 'Editorial', tags: ['roadmap', 'horizon'] },
    { id: 'edit-08', src: '/images/blog/production-agent-patterns-7-pillars-hero.png', title: 'Seven Pillars of Production AI', prompt: 'Classical temple with seven pillars, gold icons, MCP Protocol foundation', model: 'nano-banana' as const, category: 'Editorial', tags: ['pillars', 'production'] },
    { id: 'edit-09', src: '/images/blog/enterprise-agent-roadmap-hero.png', title: 'Agent Network Grid', prompt: 'Isometric 3D grid of interconnected agent nodes, electric blue energy', model: 'nano-banana' as const, category: 'Editorial', tags: ['enterprise', 'grid'] },
    { id: 'edit-10', src: '/images/blog/creator-intelligence-systems-2026-hero.png', title: 'Creator Intelligence Studio', prompt: 'Creator at desk with triple holographic screens, amber and cyan lighting', model: 'nano-banana' as const, category: 'Editorial', tags: ['creator', 'studio'], featured: true },
    { id: 'edit-11', src: '/images/blog/suno-prompt-engineering-complete-guide-hero.png', title: 'Suno Prompt Engineering Blueprint', prompt: 'Dense music production infographic, audio waveforms, genre badges', model: 'nano-banana' as const, category: 'Editorial', tags: ['suno', 'music'] },
    { id: 'edit-12', src: '/images/blog/what-is-agentic-ai-hero.png', title: 'What Is Agentic AI', prompt: 'Autonomous AI agents concept, intelligence and agency visualization', model: 'nano-banana' as const, category: 'Editorial', tags: ['agentic-ai', 'concept'] },
    // Abstract & Cosmic
    { id: '1', src: '/images/ai-art/neural-network-brain.png', title: 'Neural Synthesis I', prompt: 'Abstract neural network visualization, cosmic energy flows, deep space aesthetics', model: 'nano-banana' as const, category: 'Abstract', tags: ['neural', 'cosmic'] },
    { id: '2', src: '/images/ai-art/chakra-energy-pillars.png', title: 'Energy Pillars', prompt: 'Glowing energy columns, multiple frequency bands as vertical light pillars', model: 'nano-banana' as const, category: 'Abstract', tags: ['energy', 'pillars'] },
    { id: '3', src: '/images/ai-art/digital-data-stream.png', title: 'Digital Aurora', prompt: 'Aurora borealis meets digital art, flowing data streams in the sky', model: 'nano-banana' as const, category: 'Abstract', tags: ['aurora', 'digital'] },
    { id: '4', src: '/images/ai-art/ai-hologram-boardroom.png', title: 'Holographic Architecture', prompt: 'Futuristic architect with holographic blueprints, impossible structures', model: 'nano-banana' as const, category: 'Abstract', tags: ['architect', 'holographic'] },
    { id: '5', src: '/images/ai-art/life-symphony-conductor.png', title: 'Frequency Spectrum', prompt: 'Sound waves visualized as light, frequency spectrum in 3D space', model: 'nano-banana' as const, category: 'Abstract', tags: ['sound', 'frequency'] },
    { id: '6', src: '/images/ai-art/tree-of-life-decorative.png', title: 'Bioluminescent Garden', prompt: 'Bioluminescent garden with quantum particles, plants made of light', model: 'nano-banana' as const, category: 'Abstract', tags: ['quantum', 'garden'] },
    { id: '8', src: '/images/ai-art/data-explosion-abstract.png', title: 'Starlight Cascade', prompt: 'Waterfall of starlight flowing into cosmic ocean, celestial bodies', model: 'nano-banana' as const, category: 'Abstract', tags: ['starlight', 'waterfall'] },
    { id: '9', src: '/images/ai-art/isometric-tech-platform.png', title: 'Creation Engine', prompt: 'Massive engine of creation, gears made of light and thought', model: 'nano-banana' as const, category: 'Abstract', tags: ['creation', 'engine'] },
    { id: '10', src: '/images/ai-art/grand-wisdom-temple.png', title: 'Grand Architecture', prompt: 'Vast temple of knowledge, streams of data forming architectural visions', model: 'nano-banana' as const, category: 'Abstract', tags: ['temple', 'architecture'] },
    { id: '11', src: '/images/ai-art/knowledge-domains-wave.png', title: 'Harmonic Convergence', prompt: 'Multiple dimensions converging, harmonic frequencies creating geometric patterns', model: 'nano-banana' as const, category: 'Abstract', tags: ['dimensions', 'harmony'] },
    { id: '12', src: '/images/ai-art/pyramid-hierarchy-layers.png', title: 'Frequency Alchemist', prompt: 'Sound frequencies transforming into golden light structures', model: 'nano-banana' as const, category: 'Abstract', tags: ['alchemist', 'frequency'] },
    { id: '14', src: '/images/ai-art/balance-trust-ethics.png', title: 'Neural Symphony', prompt: 'Brain neurons conducting symphony, thoughts as musical notes', model: 'nano-banana' as const, category: 'Abstract', tags: ['neural', 'symphony'] },
    { id: '15', src: '/images/ai-art/security-dashboard-shield.png', title: 'Cosmic Blueprint', prompt: 'Universal blueprint unfolding, sacred geometry of reality', model: 'nano-banana' as const, category: 'Abstract', tags: ['blueprint', 'geometry'] },
    { id: '16', src: '/images/ai-art/future-eco-city.png', title: 'Future City', prompt: 'Futuristic ecological city, green technology and glass structures', model: 'nano-banana' as const, category: 'Abstract', tags: ['city', 'future'] },
    { id: '17', src: '/images/ai-art/golden-path-journey.png', title: 'Golden Path', prompt: 'Path made of golden light leading through cosmic landscape', model: 'nano-banana' as const, category: 'Abstract', tags: ['path', 'golden'] },
    { id: '18', src: '/images/ai-art/isometric-growth-chart.png', title: 'Data Cosmos', prompt: 'Universe made entirely of data, galaxies as databases, stars as information', model: 'nano-banana' as const, category: 'Abstract', tags: ['data', 'cosmos'] },
    { id: '19', src: '/images/ai-art/managed-vs-custom-code.png', title: 'Emerald Protocol', prompt: 'Technology with soul, emerald energy flowing through circuits', model: 'nano-banana' as const, category: 'Abstract', tags: ['emerald', 'protocol'] },
    { id: '20', src: '/images/ai-art/modern-coworking-space.png', title: 'First Light', prompt: 'The first moment of creation, light emerging from void', model: 'nano-banana' as const, category: 'Abstract', tags: ['creation', 'light'] },
    { id: '25', src: '/images/golden-age/hero-golden-age.png', title: 'Golden Age Dawn', prompt: 'Dawning of a new era of intelligence, golden light breaking through', model: 'nano-banana' as const, category: 'Abstract', tags: ['golden-age', 'dawn'] },
    { id: '27', src: '/images/general/friendly-ai-robot.png', title: 'Friendly Intelligence', prompt: 'Approachable AI robot with warm expression, technology with heart', model: 'nano-banana' as const, category: 'Abstract', tags: ['robot', 'friendly'] },
  ]

  return (
    <section className="max-w-7xl mx-auto px-6 pb-24">
      <MidjourneyGallery
        artworks={allArtworks}
        layout="masonry"
        columns={3}
        showPrompts={true}
        showFilters={true}
        theme="tech"
      />
    </section>
  )
}
