'use client'

import { MidjourneyGallery, type AIArtwork } from '@/components/embeds'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Sparkles, Wand2, Image as ImageIcon } from 'lucide-react'

// AI Art collection - showcasing nano-banana (Gemini) generated visuals
const aiArtworks: AIArtwork[] = [
  // ── Character Design: ACOS Mascot Concepts ────────────────────────
  {
    id: 'char-01',
    src: '/images/mascot/mascot-v05-techno-beast-standing.png',
    title: 'Techno-Beast',
    prompt: 'Three-tailed wolf-fox hybrid with hexagonal armor plating, glowing cyan eyes, purple-cyan-gold energy tails, dark navy background, premium 3D character design',
    model: 'nano-banana',
    category: 'Character Design',
    tags: ['mascot', 'wolf', 'tech', '3d'],
    featured: true,
  },
  {
    id: 'char-02',
    src: '/images/mascot/mascot-v11-chrome-guardian.png',
    title: 'Chrome Guardian',
    prompt: 'Half-organic wolf with chrome mechanical body armor, purple energy core, segmented chrome tail with cyan LEDs, cyberpunk grid floor',
    model: 'nano-banana',
    category: 'Character Design',
    tags: ['mascot', 'chrome', 'mech', 'cyberpunk'],
    featured: true,
  },
  {
    id: 'char-03',
    src: '/images/mascot/mascot-v15-kitsune-mask.png',
    title: 'Kitsune Protocol',
    prompt: 'Sleek chrome kitsune mask with cyan eyes, purple neon circuit lines, three energy trails in purple-cyan-gold flowing behind, dark navy background',
    model: 'nano-banana',
    category: 'Character Design',
    tags: ['mascot', 'kitsune', 'mask', 'chrome'],
    featured: true,
  },
  {
    id: 'char-04',
    src: '/images/mascot/mascot-v19-hero-command-center.png',
    title: 'ACOS Command Center',
    prompt: 'Three-tailed wolf mascot seated on holographic platform surrounded by floating UI panels showing skill trees, workflow pipelines, /acos command title above',
    model: 'nano-banana',
    category: 'Character Design',
    tags: ['mascot', 'acos', 'command-center', 'hero'],
  },
  {
    id: 'char-05',
    src: '/images/mascot/mascot-v20-evolution-stages.png',
    title: 'Evolution Stages',
    prompt: 'Three stages of mascot evolution from skills to agents to full system, progressive complexity visualization, dark tech background',
    model: 'nano-banana',
    category: 'Character Design',
    tags: ['mascot', 'evolution', 'stages'],
  },
  {
    id: 'char-06',
    src: '/images/mascot/mascot-v08-holographic-entity.png',
    title: 'Holographic Entity',
    prompt: 'Digital holographic wolf projection, translucent blue-green form, particle effects, floating in dark space, ethereal and powerful',
    model: 'nano-banana',
    category: 'Character Design',
    tags: ['mascot', 'holographic', 'digital'],
  },
  {
    id: 'char-07',
    src: '/images/mascot/mascot-v10-data-constellation.png',
    title: 'Data Constellation',
    prompt: 'Wolf-fox form made entirely of star-like data points connected by thin light lines, constellation creature, cosmic dark background',
    model: 'nano-banana',
    category: 'Character Design',
    tags: ['mascot', 'constellation', 'stars'],
  },
  {
    id: 'char-08',
    src: '/images/mascot/mascot-v16-organic-digital-split.png',
    title: 'Organic-Digital Split',
    prompt: 'Wolf mascot split down the middle: one half organic fur and nature, other half chrome circuits and glass, duality of AI and nature',
    model: 'nano-banana',
    category: 'Character Design',
    tags: ['mascot', 'split', 'organic', 'digital'],
  },
  {
    id: 'char-09',
    src: '/images/mascot/mascot-v25-crystal-familiar.png',
    title: 'Crystal Familiar',
    prompt: 'Low-poly crystalline fox with three luminous tails in purple-cyan-gold, geometric facets, seated on chrome pedestal, FrankX.AI label',
    model: 'nano-banana',
    category: 'Character Design',
    tags: ['mascot', 'crystal', 'geometric', 'low-poly'],
  },
  {
    id: 'char-10',
    src: '/images/mascot/mascot-v06-prowling-action.png',
    title: 'Prowling Action',
    prompt: 'Dynamic wolf-fox hybrid in prowling stance, energy crackling through hexagonal armor, three tails splayed with power, cinematic pose',
    model: 'nano-banana',
    category: 'Character Design',
    tags: ['mascot', 'action', 'dynamic'],
  },
  // ── Nature Tech: Organic Intelligence ─────────────────────────────
  {
    id: 'nature-01',
    src: '/images/design-lab/nature-01-digital-garden-hero.png',
    title: 'Digital Garden',
    prompt: 'Glass tree with circuit-board copper roots, bioluminescent nodes at branch junctions, code windows floating around trunk, dark navy background',
    model: 'nano-banana',
    category: 'Nature Tech',
    tags: ['tree', 'digital', 'circuits', 'glass'],
    featured: true,
  },
  {
    id: 'nature-02',
    src: '/images/design-lab/nature-03-code-vines.png',
    title: 'Code Vines',
    prompt: 'Organic vines growing from code, programming syntax transforming into living plant tendrils, bioluminescent growth on dark background',
    model: 'nano-banana',
    category: 'Nature Tech',
    tags: ['code', 'vines', 'organic', 'growth'],
  },
  {
    id: 'nature-03',
    src: '/images/design-lab/nature-05-forest-architecture.png',
    title: 'Neural Forest Cathedral',
    prompt: 'Vast forest cathedral where ancient trees form neural network arches, glowing synaptic nodes at branch intersections, moss-covered circuit ground',
    model: 'nano-banana',
    category: 'Nature Tech',
    tags: ['forest', 'cathedral', 'neural', 'architecture'],
    featured: true,
  },
  {
    id: 'nature-04',
    src: '/images/design-lab/nature-09-crystal-garden.png',
    title: 'Crystal Garden',
    prompt: 'Underground cavern with massive purple amethyst crystals etched with golden circuit traces, bioluminescent mushrooms glowing emerald, lightning between crystals',
    model: 'nano-banana',
    category: 'Nature Tech',
    tags: ['crystal', 'cavern', 'amethyst', 'mushrooms'],
  },
  {
    id: 'nature-05',
    src: '/images/design-lab/nature-10-constellation-garden.png',
    title: 'Constellation Garden',
    prompt: 'Garden where plants are made of starlight and constellations, cosmic botany, celestial flowers blooming in dark space',
    model: 'nano-banana',
    category: 'Nature Tech',
    tags: ['constellation', 'garden', 'cosmic', 'starlight'],
  },
  {
    id: 'nature-06',
    src: '/images/design-lab/nature-02-neural-roots.png',
    title: 'Neural Roots',
    prompt: 'Tree roots transforming into neural networks underground, synaptic connections glowing beneath soil, cross-section view of digital nature',
    model: 'nano-banana',
    category: 'Nature Tech',
    tags: ['roots', 'neural', 'underground'],
  },
  // ── System Design: Architecture Visualizations ────────────────────
  {
    id: 'sys-01',
    src: '/images/ecosystem/01-frankx-ecosystem-overview.png',
    title: 'Creator Ecosystem Overview',
    prompt: 'Three-pillar architecture: Vibe OS, ACOS (630+ skills, 40+ agents), GenCreator OS with Starlight meta-intelligence layer, isometric 3D infographic',
    model: 'nano-banana',
    category: 'System Design',
    tags: ['ecosystem', 'architecture', 'acos', 'infographic'],
    featured: true,
  },
  {
    id: 'sys-02',
    src: '/images/ecosystem/03-vibe-os-integration.png',
    title: 'Vibe OS Integration',
    prompt: 'Circular integration diagram showing Vibe OS creative state management connected to Claude, Grok, Suno, ChatGPT, glassmorphic UI',
    model: 'nano-banana',
    category: 'System Design',
    tags: ['vibe-os', 'integration', 'ai-models'],
  },
  {
    id: 'sys-03',
    src: '/images/ecosystem/07-arcanea-10-gates.png',
    title: 'Arcanea 10 Gates',
    prompt: 'Progression system visualization showing 10 gates of creative development, mythology-infused skill tree, dark premium aesthetic',
    model: 'nano-banana',
    category: 'System Design',
    tags: ['arcanea', 'gates', 'progression'],
  },
  {
    id: 'sys-04',
    src: '/images/ecosystem/09-agent-specialist-grid.png',
    title: 'Agent Specialist Grid',
    prompt: 'Grid visualization of 40+ specialized AI agents with role cards, color-coded by domain, premium dark infographic style',
    model: 'nano-banana',
    category: 'System Design',
    tags: ['agents', 'grid', 'specialists'],
  },
  {
    id: 'sys-05',
    src: '/images/ecosystem/15-acos-claude-code.png',
    title: 'ACOS x Claude Code',
    prompt: 'ACOS integration with Claude Code visualization, command routing, skill trees, agent orchestration layer, technical architecture diagram',
    model: 'nano-banana',
    category: 'System Design',
    tags: ['acos', 'claude-code', 'integration'],
  },
  // ── Intelligence: AI World Visualizations ──────────────────────────
  {
    id: 'intel-01',
    src: '/images/ai-world/intelligence-atlas-hero.png',
    title: 'Intelligence Atlas',
    prompt: 'Neural constellation map showing six intelligence domains: Knowledge Systems, Agent Orchestration, Production Patterns, Research Frontiers, Creative Synthesis, Meta Intelligence',
    model: 'nano-banana',
    category: 'Intelligence',
    tags: ['atlas', 'constellation', 'domains', 'intelligence'],
    featured: true,
  },
  {
    id: 'intel-02',
    src: '/images/ai-world/fire-gate-orchestration.png',
    title: 'Fire Gate Orchestration',
    prompt: 'Agent orchestration visualization with fire energy motif, multiple coordinating agents, workflow pipelines, warm gold and orange accents',
    model: 'nano-banana',
    category: 'Intelligence',
    tags: ['orchestration', 'fire-gate', 'agents'],
  },
  {
    id: 'intel-03',
    src: '/images/ai-world/source-gate-meta.png',
    title: 'Source Gate: Meta',
    prompt: 'Meta-intelligence visualization, abstract representation of self-improving AI systems, recursive patterns, deep space aesthetic',
    model: 'nano-banana',
    category: 'Intelligence',
    tags: ['meta', 'source-gate', 'recursive'],
  },
  // ── ACOS Architecture (Premium Infographics) ──────────────────────
  {
    id: 'infra-01',
    src: '/images/infographics/v7-01-pillars-premium.png',
    title: 'Seven Pillars Architecture',
    prompt: 'ACOS v7 seven pillars visualization with glass/chrome 3D elements, dark navy background, neon accent highlights, premium system architecture',
    model: 'nano-banana',
    category: 'System Design',
    tags: ['acos', 'pillars', 'architecture', 'premium'],
  },
  {
    id: 'infra-02',
    src: '/images/infographics/v7-09-architecture-premium.png',
    title: 'Full System Architecture',
    prompt: 'Complete ACOS v7 system architecture with all layers, glass/chrome premium style, dark navy, interconnected components visualization',
    model: 'nano-banana',
    category: 'System Design',
    tags: ['acos', 'full-system', 'architecture', 'premium'],
  },
  // ── Editorial: Blog Hero Art ─────────────────────────────────────
  {
    id: 'edit-01',
    src: '/images/blog/swarm-intelligence-orchestration-hero.png',
    title: 'Swarm Intelligence Patterns',
    prompt: 'Four multi-agent orchestration patterns: pipeline, parallel, weighted synthesis, iterative. 3D crystal spheres, cyan energy flows, dark navy infographic',
    model: 'nano-banana',
    category: 'Editorial',
    tags: ['swarm', 'orchestration', 'infographic', 'patterns'],
    featured: true,
  },
  {
    id: 'edit-02',
    src: '/images/blog/build-your-own-jarvis-hero.png',
    title: 'Personal AI Command Center',
    prompt: 'Futuristic circular holographic command interface, dark navy cockpit, floating glass data panels, gold accent lighting, AI assistant control room',
    model: 'nano-banana',
    category: 'Editorial',
    tags: ['jarvis', 'command-center', 'holographic'],
    featured: true,
  },
  {
    id: 'edit-03',
    src: '/images/blog/mcp-doctor-hero.png',
    title: 'MCP Doctor Health Audit',
    prompt: 'Terminal-style health audit report with color-coded status indicators, dark background, cyan and red diagnostics, system monitoring aesthetic',
    model: 'nano-banana',
    category: 'Editorial',
    tags: ['mcp', 'terminal', 'diagnostics', 'health'],
  },
  {
    id: 'edit-04',
    src: '/images/blog/golden-age-of-intelligence-hero.png',
    title: 'Golden Age of Intelligence',
    prompt: 'Radiant golden brain at center with orbiting agent nodes (Research, Content, Security, Optimization, Orchestration), cosmic gold space background',
    model: 'nano-banana',
    category: 'Editorial',
    tags: ['golden-age', 'brain', 'agents', 'cosmic'],
    featured: true,
  },
  {
    id: 'edit-05',
    src: '/images/blog/agentic-creator-os-complete-guide-hero.png',
    title: 'ACOS Orchestrator Map',
    prompt: 'Central orchestrator node with seven satellite modules (Skills, Agents, Workflows, Intelligence, Instances, Templates, MCP Servers), purple glass 3D',
    model: 'nano-banana',
    category: 'Editorial',
    tags: ['acos', 'orchestrator', 'diagram', 'purple'],
  },
  {
    id: 'edit-06',
    src: '/images/blog/nvidia-physical-ai-hero.png',
    title: 'Physical AI Revolution',
    prompt: 'Chrome robotic hand holding NVIDIA H200 chip, green energy rays, industrial robotics and autonomous vehicles in background, cinematic lighting',
    model: 'nano-banana',
    category: 'Editorial',
    tags: ['nvidia', 'robotics', 'chip', 'cinematic'],
    featured: true,
  },
  {
    id: 'edit-07',
    src: '/images/blog/agentic-ai-roadmap-2026-hero.png',
    title: 'Agentic AI Horizon',
    prompt: 'Golden circuit highways converging toward brilliant sunrise horizon, low-poly city silhouettes, constellation network overhead, warm amber palette',
    model: 'nano-banana',
    category: 'Editorial',
    tags: ['roadmap', 'horizon', 'golden', 'cityscape'],
  },
  {
    id: 'edit-08',
    src: '/images/blog/production-agent-patterns-7-pillars-hero.png',
    title: 'Seven Pillars of Production AI',
    prompt: 'Classical Greek temple with seven pillars representing production agent capabilities, gold icons, dark navy background, MCP Protocol foundation, AWS/Oracle logos',
    model: 'nano-banana',
    category: 'Editorial',
    tags: ['pillars', 'production', 'classical', 'enterprise'],
  },
  {
    id: 'edit-09',
    src: '/images/blog/enterprise-agent-roadmap-hero.png',
    title: 'Agent Network Grid',
    prompt: 'Isometric 3D grid of interconnected agent nodes (Brain, Hand, Eye types), electric blue energy streams connecting them, light background, premium tech',
    model: 'nano-banana',
    category: 'Editorial',
    tags: ['enterprise', 'grid', 'isometric', 'agents'],
  },
  {
    id: 'edit-10',
    src: '/images/blog/creator-intelligence-systems-2026-hero.png',
    title: 'Creator Intelligence Studio',
    prompt: 'Photorealistic creator at desk with triple holographic screens showing music production, 3D modeling, and code. Warm amber and cyan lighting, city skyline window',
    model: 'nano-banana',
    category: 'Editorial',
    tags: ['creator', 'studio', 'holographic', 'photorealistic'],
    featured: true,
  },
  {
    id: 'edit-11',
    src: '/images/blog/suno-prompt-engineering-complete-guide-hero.png',
    title: 'Suno Prompt Engineering Blueprint',
    prompt: 'Dense music production infographic with beginner-to-pro progression, audio waveforms, genre badges, layered prompt formula visualization, dark tech aesthetic',
    model: 'nano-banana',
    category: 'Editorial',
    tags: ['suno', 'music', 'infographic', 'prompt-engineering'],
  },
  {
    id: 'edit-12',
    src: '/images/blog/what-is-agentic-ai-hero.png',
    title: 'What Is Agentic AI',
    prompt: 'Conceptual visualization of autonomous AI agents, abstract representation of intelligence and agency, futuristic dark tech aesthetic',
    model: 'nano-banana',
    category: 'Editorial',
    tags: ['agentic-ai', 'concept', 'introduction'],
  },
  // ── Original Collection ────────────────────────────────────────────
  {
    id: '1',
    src: '/images/ai-art/neural-network-brain.png',
    title: 'Neural Synthesis I',
    prompt: 'Abstract neural network visualization, cosmic energy flows, deep space aesthetics with emerald and cyan accents, digital art style',
    model: 'nano-banana',
    category: 'Abstract',
    tags: ['neural', 'cosmic', 'abstract'],
  },
  {
    id: '2',
    src: '/images/ai-art/chakra-energy-pillars.png',
    title: 'Energy Pillars',
    prompt: 'Glowing energy columns rising from dark ground, multiple frequency bands visualized as vertical light pillars, abstract tech aesthetic',
    model: 'nano-banana',
    category: 'Abstract',
    tags: ['energy', 'pillars', 'light'],
  },
  {
    id: '3',
    src: '/images/ai-art/digital-data-stream.png',
    title: 'Digital Aurora',
    prompt: 'Aurora borealis meets digital art, flowing data streams in the sky, northern lights with technological elements',
    model: 'nano-banana',
    category: 'Nature Tech',
    tags: ['aurora', 'digital', 'nature'],
  },
  {
    id: '4',
    src: '/images/ai-art/ai-hologram-boardroom.png',
    title: 'Holographic Architecture',
    prompt: 'Futuristic architect working with holographic blueprints, impossible structures, floating 3D schematics in dark room',
    model: 'nano-banana',
    category: 'Architecture',
    tags: ['architect', 'holographic', 'futuristic'],
  },
  {
    id: '5',
    src: '/images/ai-art/life-symphony-conductor.png',
    title: 'Frequency Spectrum',
    prompt: 'Sound waves visualized as light, frequency spectrum in 3D space, audio becoming visual art, synesthesia concept',
    model: 'nano-banana',
    category: 'Music',
    tags: ['sound', 'frequency', 'synesthesia'],
  },
  {
    id: '6',
    src: '/images/ai-art/tree-of-life-decorative.png',
    title: 'Bioluminescent Garden',
    prompt: 'Bioluminescent garden with quantum particles, plants made of light and energy, subatomic flowers blooming',
    model: 'nano-banana',
    category: 'Nature Tech',
    tags: ['quantum', 'garden', 'bioluminescent'],
  },
  {
    id: '8',
    src: '/images/ai-art/data-explosion-abstract.png',
    title: 'Starlight Cascade',
    prompt: 'Waterfall of starlight flowing into cosmic ocean, celestial bodies reflected in astral waters, peaceful infinity',
    model: 'nano-banana',
    category: 'Cosmic',
    tags: ['starlight', 'waterfall', 'cosmic'],
  },
  {
    id: '9',
    src: '/images/ai-art/isometric-tech-platform.png',
    title: 'Creation Engine',
    prompt: 'Massive engine of creation, gears made of light and thought, manufacturing reality itself, glowing machinery',
    model: 'nano-banana',
    category: 'Abstract',
    tags: ['creation', 'engine', 'light'],
  },
  {
    id: '10',
    src: '/images/ai-art/grand-wisdom-temple.png',
    title: 'Grand Architecture',
    prompt: 'Vast temple of knowledge, streams of data forming architectural visions, wisdom encoded in digital form',
    model: 'nano-banana',
    category: 'Architecture',
    tags: ['temple', 'vision', 'architecture'],
  },
  {
    id: '11',
    src: '/images/ai-art/knowledge-domains-wave.png',
    title: 'Harmonic Convergence',
    prompt: 'Multiple dimensions converging at single point, harmonic frequencies creating geometric patterns, abstract visualization',
    model: 'nano-banana',
    category: 'Abstract',
    tags: ['dimensions', 'harmony', 'convergence'],
  },
  {
    id: '12',
    src: '/images/ai-art/pyramid-hierarchy-layers.png',
    title: 'Frequency Alchemist',
    prompt: 'Sound frequencies transforming into golden light structures, ancient patterns meets technology, layered hierarchy',
    model: 'nano-banana',
    category: 'Music',
    tags: ['alchemist', 'frequency', 'transformation'],
  },
  {
    id: '14',
    src: '/images/ai-art/balance-trust-ethics.png',
    title: 'Neural Symphony',
    prompt: 'Brain neurons conducting symphony orchestra, thoughts as musical notes, neural pathways composing music',
    model: 'nano-banana',
    category: 'Music',
    tags: ['neural', 'symphony', 'music'],
  },
  {
    id: '15',
    src: '/images/ai-art/security-dashboard-shield.png',
    title: 'Cosmic Blueprint',
    prompt: 'Universal blueprint unfolding, sacred geometry of reality, architect of cosmos at work, golden ratio patterns',
    model: 'nano-banana',
    category: 'Cosmic',
    tags: ['blueprint', 'geometry', 'universe'],
  },
  {
    id: '16',
    src: '/images/ai-art/future-eco-city.png',
    title: 'Future City',
    prompt: 'Futuristic ecological city, ideas blooming into architectural reality, green technology and glass structures',
    model: 'nano-banana',
    category: 'Architecture',
    tags: ['city', 'future', 'eco'],
  },
  {
    id: '17',
    src: '/images/ai-art/golden-path-journey.png',
    title: 'Golden Path',
    prompt: 'Path made of golden light leading through cosmic landscape, journey through abstract space, transformation destination',
    model: 'nano-banana',
    category: 'Cosmic',
    tags: ['path', 'golden', 'journey'],
  },
  {
    id: '18',
    src: '/images/ai-art/isometric-growth-chart.png',
    title: 'Data Cosmos',
    prompt: 'Universe made entirely of data, galaxies as databases, stars as information points, cosmic computation',
    model: 'nano-banana',
    category: 'Cosmic',
    tags: ['data', 'cosmos', 'information'],
  },
  {
    id: '19',
    src: '/images/ai-art/managed-vs-custom-code.png',
    title: 'Emerald Protocol',
    prompt: 'Technology with soul, emerald energy flowing through circuits, organic technology, nature and machine as one',
    model: 'nano-banana',
    category: 'AI',
    tags: ['emerald', 'protocol', 'organic tech'],
  },
  {
    id: '20',
    src: '/images/ai-art/modern-coworking-space.png',
    title: 'First Light',
    prompt: 'The first moment of creation, light emerging from void, genesis of new ideas, beginning of everything',
    model: 'nano-banana',
    category: 'Cosmic',
    tags: ['creation', 'light', 'genesis'],
  },
  {
    id: '25',
    src: '/images/golden-age/hero-golden-age.png',
    title: 'Golden Age Dawn',
    prompt: 'The dawning of a new era of intelligence, golden light breaking through technological landscape, humanity and AI united',
    model: 'nano-banana',
    category: 'Cosmic',
    tags: ['golden-age', 'future', 'dawn'],
  },
  {
    id: '27',
    src: '/images/general/friendly-ai-robot.png',
    title: 'Friendly Intelligence',
    prompt: 'Approachable AI robot with warm expression, technology with heart, friendly future companion',
    model: 'nano-banana',
    category: 'AI',
    tags: ['robot', 'friendly', 'ai'],
  },
]

export default function AIArtGalleryPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-amber-500/10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              AI-Generated Art Gallery
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              AI Visual{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Lab
              </span>
            </h1>

            <p className="text-xl text-white/60 max-w-2xl mx-auto mb-8">
              Character concepts, system architecture, nature-tech environments, and abstract visualizations.
              All generated with Gemini via Nano Banana MCP.
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 text-white/50">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                <span>{aiArtworks.length} Artworks</span>
              </div>
              <div className="flex items-center gap-2">
                <Wand2 className="w-5 h-5" />
                <span>Nano-Banana AI</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <MidjourneyGallery
          artworks={aiArtworks}
          layout="masonry"
          columns={3}
          showPrompts={true}
          showFilters={true}
          theme="tech"
        />
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-emerald-500/10 to-amber-500/10 rounded-3xl border border-white/10 p-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Create Your Own AI Art
          </h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            Learn how to craft prompts that generate stunning visuals. Join our community
            and discover the art of AI-assisted creation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/guides"
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-xl transition-colors"
            >
              Explore AI Guides
            </Link>
            <Link
              href="/products/creative-ai-toolkit"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-colors"
            >
              Get the Toolkit
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
