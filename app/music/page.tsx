'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  Play,
  ExternalLink,
  Music2,
  Sparkles,
  ArrowRight,
  Disc3,
  Globe,
  Zap,
  Waves,
  Music,
  Flame,
  BookOpen,
  LayoutPanelTop,
  Clapperboard,
  Megaphone,
  Radar,
  ShoppingBag,
  BarChart3,
  AudioWaveform,
  Network,
  Orbit,
} from 'lucide-react'
import {
  getTopTracks,
  getLatestTracks,
  getAlbums,
  getAlbumTracks,
  getMusicStats,
  getPlaylists,
  type Track,
  type Album,
} from '@/lib/music'

// ============================================================================
// DATA FROM LIB
// ============================================================================

const topTracks = getTopTracks(6)
const latestTracks = getLatestTracks(6)
const albums = getAlbums()
const playlists = getPlaylists()
const musicStats = getMusicStats()

const compact = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n))

const stats = [
  { value: `${musicStats.totalTracks}+`, label: 'Public Tracks' },
  { value: compact(musicStats.totalPlays), label: 'Total Plays' },
  { value: String(musicStats.followers), label: 'Followers' },
  { value: String(musicStats.playlists), label: 'Playlists' },
]

const visualStoryFrames = [
  {
    title: 'Music as Consciousness Technology',
    detail: 'Core narrative visual that anchors the emotional positioning of the catalog.',
    image: '/images/blog/music-as-consciousness-technology-hero-v3-pro.png',
    href: '/blog/music-as-consciousness-technology',
    tag: 'Website Hero Narrative',
  },
  {
    title: 'State-Change Music Science',
    detail: 'Research-backed diagram for educational trust and conversion on long-form content.',
    image: '/images/blog/science-of-state-change-music-hero.png',
    href: '/blog/science-of-state-change-music',
    tag: 'Info Asset',
  },
  {
    title: 'Suno Production Workflow',
    detail: 'Step-based visual architecture for tutorials, workshops, and creator onboarding.',
    image: '/images/blog/suno-music-workflow-hero.png',
    href: '/blog/suno-music-production-workflow',
    tag: 'Workflow Asset',
  },
]

const swarmPods = [
  {
    name: 'Visual Narrative Swarm',
    icon: LayoutPanelTop,
    focus: 'Website visuals and landing composition',
    owns: ['Hero images', 'Section visuals', 'Infographic refreshes'],
    outputsPerWeek: '3-5 visuals',
  },
  {
    name: 'Catalog Intelligence Swarm',
    icon: AudioWaveform,
    focus: 'Track performance and packaging decisions',
    owns: ['Top track rotations', 'Album previews', 'Release candidate scoring'],
    outputsPerWeek: '2 release packets',
  },
  {
    name: 'Marketplace Packaging Swarm',
    icon: ShoppingBag,
    focus: 'Storefront-ready product and artwork bundles',
    owns: ['Cover variants', 'Playlist thumbnails', 'Product mockups'],
    outputsPerWeek: '4 product drops',
  },
  {
    name: 'Public Platform Swarm',
    icon: Megaphone,
    focus: 'Channel-native media and posting cadence',
    owns: ['Short video covers', 'Carousel snippets', 'Thread visuals'],
    outputsPerWeek: '14-21 posts',
  },
  {
    name: 'Performance Steering Swarm',
    icon: BarChart3,
    focus: 'Measurement, attribution, and optimization loops',
    owns: ['Weekly dashboards', 'A/B directives', 'Reallocation decisions'],
    outputsPerWeek: '1 strategy report',
  },
]

const channelMatrix = [
  {
    channel: 'Website (frankx.ai/music)',
    objective: 'Position authority and convert to deeper ecosystem paths',
    assets: ['Cinematic hero visual', 'Interactive track embeds', 'Storyframe panels'],
    swarm: 'Visual Narrative Swarm',
  },
  {
    channel: 'Suno + Music Marketplaces',
    objective: 'Increase discovery and package winning tracks for sales',
    assets: ['Cover variants', 'Playlist art', 'Track release packets'],
    swarm: 'Catalog Intelligence + Marketplace Packaging',
  },
  {
    channel: 'YouTube / Shorts / Reels / TikTok',
    objective: 'Turn each track into multi-format discovery media',
    assets: ['Vertical visualizers', 'Hook clips', 'Behind-the-build snippets'],
    swarm: 'Public Platform Swarm',
  },
  {
    channel: 'LinkedIn / X / Newsletter',
    objective: 'Translate music into thought leadership and trust',
    assets: ['Infographic carousels', 'Process threads', 'Weekly intelligence drops'],
    swarm: 'Public Platform + Performance Steering',
  },
]

const revenuePaths = [
  {
    title: 'Streaming Expansion',
    icon: Orbit,
    summary: 'Promote winners into full distribution pipelines and playlist ecosystems.',
    actions: ['Score tracks weekly', 'Package metadata + cover sets', 'Push batch releases'],
  },
  {
    title: 'Direct Digital Products',
    icon: ShoppingBag,
    summary: 'Sell curated packs: focus music, cinematic bundles, creator background sets.',
    actions: ['Bundle by use-case', 'Build product pages', 'Attach visual proof assets'],
  },
  {
    title: 'Creator Licensing',
    icon: Clapperboard,
    summary: 'Offer clean licensing lanes for creators, podcasters, and video teams.',
    actions: ['Create licensing tiers', 'Publish usage terms', 'Ship pre-cleared packs'],
  },
  {
    title: 'Membership + Inner Circle',
    icon: Network,
    summary: 'Monthly drops with unreleased tracks, prompts, and production breakdowns.',
    actions: ['Run themed monthly drop', 'Publish private breakdown notes', 'Reward early members'],
  },
]

const infoGeniusPromptQueue = [
  {
    asset: 'Music Revenue Flywheel Diagram',
    style: '3d',
    audience: 'college',
    ratio: '16:9',
    previewImage: '/images/music/infogenius/music-revenue-flywheel-v1.png',
    status: 'Using existing image (replace with InfoGenius output when ready)',
    prompt:
      'Create a 16:9 Dark Premium 3D infographic showing a music revenue flywheel: discovery content -> track release -> marketplace packaging -> licensing/product sales -> audience growth -> next release. Use navy background, chrome connectors, cyan highlights, and clear labels.',
  },
  {
    asset: 'Platform Content Atomization Map',
    style: 'technical',
    audience: 'expert',
    ratio: '16:9',
    previewImage: '/images/music/infogenius/platform-content-atomization-v1.png',
    status: 'Using existing image (replace with InfoGenius output when ready)',
    prompt:
      'Create a technical systems map of one track being atomized into website hero, Suno cover, YouTube short, Instagram reel, LinkedIn carousel, and X thread visual. Include arrows, timing layers, and role tags for each swarm.',
  },
  {
    asset: 'Sub-Agent Swarm Topology',
    style: 'futuristic',
    audience: 'college',
    ratio: '16:9',
    previewImage: '/images/music/infogenius/sub-agent-swarm-topology-v1.png',
    status: 'Using existing image (replace with InfoGenius output when ready)',
    prompt:
      'Create a cyberpunk HUD architecture diagram with 5 swarms: Visual Narrative, Catalog Intelligence, Marketplace Packaging, Public Platform, and Performance Steering. Show orchestration node, memory bus, and KPI feedback loop.',
  },
  {
    asset: 'Music Catalog Universe Poster',
    style: 'photorealistic',
    audience: 'highschool',
    ratio: '3:4',
    previewImage: '/images/music/infogenius/music-catalog-universe-poster-v1.png',
    status: 'Using existing image (replace with InfoGenius output when ready)',
    prompt:
      'Create a cinematic poster of a digital music universe with genre constellations, waveform rivers, and album planets. Include subtle labels for meditation, cinematic, tech house, and hip hop clusters.',
  },
]

// ============================================================================
// BACKGROUND
// ============================================================================

function MusicBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#0a0a0b]" />
      <div className="absolute inset-0 opacity-[0.25] [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.18)_1px,transparent_0)] [background-size:24px_24px]" />

      <motion.div
        className="absolute top-0 -right-[20%] w-[60%] h-[60%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.08) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.06) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute top-[25%] left-[20%] w-[35%] h-[35%]"
        style={{
          background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.08) 0%, transparent 72%)',
          filter: 'blur(80px)',
        }}
        animate={{ x: [0, 20, 0], y: [0, -25, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

// ============================================================================
// HERO
// ============================================================================

function HeroSection() {
  const heroTrack = topTracks[0]
  return (
    <section className="relative pt-32 pb-16 px-6">
      {/* Echo — Sound Weaver character accent */}
      <div className="pointer-events-none absolute right-6 top-20 hidden w-48 opacity-15 lg:block xl:w-56">
        <Image src="/images/team/echo-leopard.png" alt="" width={224} height={224} className="object-contain" aria-hidden="true" />
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1fr,1.2fr] gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8">
              <Music2 className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-300">AI Music Architecture</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="text-white">Architecting Music</span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
                for AI Worlds
              </span>
            </h1>

            <p className="text-xl text-white/80 mb-3 max-w-xl leading-relaxed">
              Architecting the future of AI, creation, and digital worlds through music.
            </p>

            <p className="text-lg text-white/50 mb-8 max-w-lg leading-relaxed">
              {musicStats.totalTracks}+ published tracks on Suno AI. From meditation-inspired soundscapes to orchestral epics
              to tech house and hip hop. This page now runs as a visual operating system: narrative assets,
              swarm-owned media pipelines, and platform-ready sales paths.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={musicStats.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-white text-black px-7 py-4 rounded-full font-semibold transition-all hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
              >
                <Play className="w-5 h-5" />
                Full Catalog on Suno
                <ExternalLink className="w-4 h-4" />
              </a>
              <Link
                href="/music/brainstorm"
                className="inline-flex items-center gap-3 border border-white/20 text-white px-7 py-4 rounded-full font-semibold transition-all hover:bg-white/5"
              >
                <Sparkles className="w-4 h-4" />
                Brainstorm Ideas
              </Link>
              <Link
                href="/infogenius"
                className="inline-flex items-center gap-3 border border-violet-500/40 text-violet-200 px-7 py-4 rounded-full font-semibold transition-all hover:bg-violet-500/10"
              >
                <Radar className="w-4 h-4" />
                Generate Visuals with InfoGenius
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-emerald-500/20 via-cyan-500/10 to-violet-500/10 blur-3xl opacity-50" />
              <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-4 overflow-hidden">
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-400/80 mb-3 px-2">Now Playing</p>
                {heroTrack?.sunoId && (
                  <iframe
                    src={`https://suno.com/embed/${heroTrack.sunoId}`}
                    className="w-full aspect-square rounded-2xl"
                    frameBorder="0"
                    allow="autoplay; clipboard-write"
                    loading="lazy"
                    title={heroTrack.title}
                  />
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// VISUAL STORYFRAMES
// ============================================================================

function VisualStoryframesSection() {
  return (
    <section className="py-20 border-y border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/80 mb-4">Visual Narrative System</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Make the Music Universe Visible</h2>
          <p className="text-lg text-white/50 max-w-3xl">
            Every major narrative gets a visual anchor. These assets are designed for homepage storytelling,
            educational trust, and cross-platform repurposing.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {visualStoryFrames.map((frame, i) => (
            <motion.div
              key={frame.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group"
            >
              <Link href={frame.href} className="block h-full">
                <article className="h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/25 transition-all">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={frame.image}
                      alt={frame.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <span className="absolute top-3 left-3 text-[11px] uppercase tracking-[0.16em] px-3 py-1.5 rounded-full bg-black/60 border border-white/20 text-white/80">
                      {frame.tag}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-white font-semibold text-lg mb-2">{frame.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed">{frame.detail}</p>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// STATS
// ============================================================================

function StatsSection() {
  return (
    <section className="py-12 border-y border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-3xl md:text-4xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-white/40 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// FEATURED TRACKS (data-driven)
// ============================================================================

function FeaturedTracksSection() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Top Tracks</h2>
          <p className="text-lg text-white/50">Most played tracks from the catalog</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {topTracks.map((track, i) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-4 hover:border-white/20 transition-all">
                <div className="flex items-center justify-between mb-3 px-2">
                  <div>
                    <h3 className="font-semibold text-white">{track.title}</h3>
                    <p className="text-sm text-white/40">
                      {track.genre?.join(' / ') || 'Mixed'}
                      {track.plays ? ` · ${track.plays} plays` : ''}
                    </p>
                  </div>
                  {track.sunoId && (
                    <a
                      href={`https://suno.com/song/${track.sunoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 text-white/60" />
                    </a>
                  )}
                </div>
                {track.sunoId && (
                  <iframe
                    src={`https://suno.com/embed/${track.sunoId}`}
                    className="w-full aspect-[2/1] rounded-xl"
                    frameBorder="0"
                    allow="autoplay; clipboard-write"
                    loading="lazy"
                    title={track.title}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// LATEST DROPS (data-driven)
// ============================================================================

const dropDate = (iso?: string) =>
  iso
    ? new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : ''

function LatestDropsSection() {
  return (
    <section className="py-20 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Latest Drops</h2>
          <p className="text-lg text-white/50">Fresh from the Suno studio — newest additions to the catalog</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {latestTracks.map((track, i) => (
            <motion.a
              key={track.id}
              href={track.sunoUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-white/25 transition-all"
            >
              <div className="relative aspect-square overflow-hidden">
                {track.imageUrl ? (
                  <Image
                    src={track.imageUrl}
                    alt={track.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-violet-500/20" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute left-3 bottom-3 text-[11px] uppercase tracking-[0.16em] px-2.5 py-1 rounded-full bg-black/60 border border-white/20 text-white/80">
                  {dropDate(track.createdAt)}
                </span>
              </div>
              <div className="p-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-white font-semibold truncate">{track.title}</h3>
                  <p className="text-xs text-white/40 truncate">
                    {track.genre?.slice(0, 3).join(' / ') || 'Mixed'}
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-white/40 shrink-0 group-hover:text-white/70 transition-colors" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// SUNO PLAYLISTS (data-driven)
// ============================================================================

function PlaylistsSection() {
  return (
    <section className="py-20 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Playlists</h2>
          <p className="text-lg text-white/50">
            Curated listening lanes on Suno — from training energy to meditation depth
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {playlists.map((playlist, i) => (
            <motion.a
              key={playlist.url}
              href={playlist.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="group rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-white/25 transition-all"
            >
              <div className="relative aspect-square overflow-hidden">
                {playlist.imageUrl ? (
                  <Image
                    src={playlist.imageUrl}
                    alt={playlist.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-emerald-500/20" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="text-white font-semibold text-sm leading-tight mb-1">
                    {playlist.name}
                  </h3>
                  <p className="text-[11px] text-white/50">{playlist.songs} tracks</p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// SWARM OPERATING MODEL
// ============================================================================

function SwarmOperatingModelSection() {
  return (
    <section className="py-20 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-violet-300/80 mb-4">Agentically Steered</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Sub-Agent Swarms and Asset Ownership</h2>
          <p className="text-lg text-white/50 max-w-3xl">
            Each swarm owns a clear output lane so visual content, distribution, and monetization run as one
            coordinated operating system.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-4 mb-10">
          {swarmPods.map((swarm, i) => {
            const Icon = swarm.icon
            return (
              <motion.article
                key={swarm.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-4"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-cyan-300" />
                </div>
                <h3 className="text-white font-semibold text-sm mb-2 leading-tight">{swarm.name}</h3>
                <p className="text-xs text-white/55 mb-3 leading-relaxed">{swarm.focus}</p>
                <ul className="space-y-1.5 mb-3">
                  {swarm.owns.map((item) => (
                    <li key={item} className="text-[11px] text-white/45 leading-relaxed">
                      • {item}
                    </li>
                  ))}
                </ul>
                <p className="text-[11px] text-emerald-300/90 uppercase tracking-[0.14em]">{swarm.outputsPerWeek}</p>
              </motion.article>
            )
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {channelMatrix.map((row, i) => (
            <motion.article
              key={row.channel}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-white/10 bg-black/30 p-5"
            >
              <h3 className="text-white font-semibold text-lg mb-2">{row.channel}</h3>
              <p className="text-sm text-white/55 mb-4 leading-relaxed">{row.objective}</p>
              <div className="space-y-1.5 mb-4">
                {row.assets.map((asset) => (
                  <p key={asset} className="text-sm text-white/45">• {asset}</p>
                ))}
              </div>
              <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/85">Owner: {row.swarm}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// INFOGENIUS VISUAL QUEUE
// ============================================================================

function InfoGeniusQueueSection() {
  return (
    <section className="py-20 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/80 mb-4">InfoGenius Prompt Queue</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready-to-Generate Visual Assets</h2>
          <p className="text-lg text-white/50 max-w-3xl">
            Production-ready prompts for the InfoGenius pipeline. These assets power website visuals,
            marketplace packaging, and public-platform media.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-4">
          {infoGeniusPromptQueue.map((item, i) => (
            <motion.article
              key={item.asset}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-5"
            >
              <div className="relative mb-4 overflow-hidden rounded-xl border border-white/10 aspect-[16/9]">
                <Image
                  src={item.previewImage}
                  alt={item.asset}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <span className="absolute left-3 bottom-3 text-[10px] uppercase tracking-[0.14em] px-2.5 py-1 rounded-full bg-black/60 border border-white/20 text-white/75">
                  Placeholder Visual
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-full text-[11px] uppercase tracking-[0.14em] bg-black/50 border border-white/15 text-white/70">
                  {item.style}
                </span>
                <span className="px-2.5 py-1 rounded-full text-[11px] uppercase tracking-[0.14em] bg-black/50 border border-white/15 text-white/70">
                  {item.audience}
                </span>
                <span className="px-2.5 py-1 rounded-full text-[11px] uppercase tracking-[0.14em] bg-black/50 border border-white/15 text-white/70">
                  {item.ratio}
                </span>
              </div>
              <h3 className="text-white font-semibold mb-3">{item.asset}</h3>
              <p className="text-xs text-amber-300/85 mb-3">{item.status}</p>
              <p className="text-sm text-white/55 leading-relaxed">{item.prompt}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// REVENUE PATHS
// ============================================================================

function RevenuePathsSection() {
  return (
    <section className="py-20 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-amber-300/80 mb-4">Music Sales Possibilities</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Monetization Lanes, Steered by Agents</h2>
          <p className="text-lg text-white/50 max-w-3xl">
            Keep revenue diversified: streaming, direct products, licensing, and membership. Each lane gets a
            dedicated asset system and feedback loop.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {revenuePaths.map((path, i) => {
            const Icon = path.icon
            return (
              <motion.article
                key={path.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
              >
                <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-amber-300" />
                </div>
                <h3 className="text-white font-semibold mb-2">{path.title}</h3>
                <p className="text-sm text-white/55 mb-4 leading-relaxed">{path.summary}</p>
                <div className="space-y-1.5">
                  {path.actions.map((action) => (
                    <p key={action} className="text-sm text-white/45">• {action}</p>
                  ))}
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// ALBUMS (data-driven)
// ============================================================================

const colorMap: Record<string, { bg: string; border: string; icon: string; badge: string }> = {
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20 hover:border-emerald-500/40', icon: 'text-emerald-400', badge: 'bg-emerald-500/20 text-emerald-300' },
  violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/20 hover:border-violet-500/40', icon: 'text-violet-400', badge: 'bg-violet-500/20 text-violet-300' },
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/20 hover:border-cyan-500/40', icon: 'text-cyan-400', badge: 'bg-cyan-500/20 text-cyan-300' },
  amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/20 hover:border-amber-500/40', icon: 'text-amber-400', badge: 'bg-amber-500/20 text-amber-300' },
  rose: { bg: 'bg-rose-500/10', border: 'border-rose-500/20 hover:border-rose-500/40', icon: 'text-rose-400', badge: 'bg-rose-500/20 text-rose-300' },
}

const albumIconMap: Record<string, typeof Disc3> = {
  amber: Waves,
  rose: Globe,
  violet: Music,
  cyan: Zap,
  emerald: Flame,
}

function AlbumsSection() {
  return (
    <section className="py-20 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Albums</h2>
          <p className="text-lg text-white/50">Curated collections organized by genre and mood</p>
        </motion.div>

        <div className="space-y-12">
          {albums.map((album, i) => {
            const colors = colorMap[album.color] || colorMap.emerald
            const Icon = albumIconMap[album.color] || Disc3
            const albumTracks = getAlbumTracks(album.id)
            const previewTracks = albumTracks.slice(0, 3)

            return (
              <motion.div
                key={album.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {/* Album Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${colors.bg} ${colors.icon}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-semibold text-white">{album.title}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${colors.badge}`}>
                          {albumTracks.length} tracks
                        </span>
                      </div>
                      <p className="text-white/50 text-sm">{album.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    {album.playlistUrl && (
                      <a
                        href={album.playlistUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
                      >
                        Full playlist
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Track Grid */}
                {previewTracks.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {previewTracks.map((track) => (
                      <div
                        key={track.id}
                        className={`rounded-xl border ${colors.border} ${colors.bg} p-3 transition-all`}
                      >
                        <div className="flex items-center justify-between mb-2 px-1">
                          <div>
                            <p className="text-sm font-medium text-white">{track.title}</p>
                            <p className="text-xs text-white/40">{track.genre?.join(', ') || album.genre}</p>
                          </div>
                          {track.sunoId && (
                            <a
                              href={`https://suno.com/song/${track.sunoId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                            >
                              <ExternalLink className="w-3 h-3 text-white/40" />
                            </a>
                          )}
                        </div>
                        {track.sunoId && (
                          <iframe
                            src={`https://suno.com/embed/${track.sunoId}`}
                            className="w-full aspect-[16/9] rounded-lg"
                            frameBorder="0"
                            allow="autoplay; clipboard-write"
                            loading="lazy"
                            title={track.title}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={`rounded-xl border ${colors.border} ${colors.bg} p-8 text-center`}>
                    <p className="text-white/40">Tracks coming soon</p>
                  </div>
                )}

                {/* Show remaining track count */}
                {albumTracks.length > 3 && (
                  <p className="mt-3 text-sm text-white/30 text-center">
                    + {albumTracks.length - 3} more tracks in this album
                  </p>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// CTA
// ============================================================================

function CTASection() {
  return (
    <section className="py-24 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Build the next wave of AI music media.
          </h2>
          <p className="text-xl text-white/50 mb-8 max-w-2xl mx-auto">
            Use the same system here: generate visuals with InfoGenius, orchestrate swarms by channel,
            and turn tracks into a durable catalog business.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/music/brainstorm"
              className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full text-lg font-semibold transition-all hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
            >
              <Sparkles className="w-5 h-5" />
              Brainstorm New Ideas
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/music-lab"
              className="inline-flex items-center gap-3 border border-white/20 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:bg-white/5"
            >
              <BookOpen className="w-4 h-4" />
              Learn AI Music Creation
            </Link>
            <Link
              href="/infogenius"
              className="inline-flex items-center gap-3 border border-violet-500/40 text-violet-200 px-8 py-4 rounded-full text-lg font-semibold transition-all hover:bg-violet-500/10"
            >
              <Radar className="w-4 h-4" />
              Open InfoGenius
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// MAIN
// ============================================================================

export default function MusicPage() {
  return (
    <main className="relative min-h-screen text-white">
      <MusicBackground />

      <div className="relative z-10">
        <HeroSection />
        <StatsSection />
        <LatestDropsSection />
        <FeaturedTracksSection />
        <PlaylistsSection />
        <VisualStoryframesSection />
        <SwarmOperatingModelSection />
        <InfoGeniusQueueSection />
        <RevenuePathsSection />
        <AlbumsSection />
        <CTASection />
      </div>
    </main>
  )
}
