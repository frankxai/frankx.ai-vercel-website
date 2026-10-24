'use client'

import { motion, useReducedMotion } from 'framer-motion'
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
import { MusicCoverImage } from '@/components/music/MusicCoverImage'
import { SunoTrackCTA } from '@/components/music/SunoTrackCTA'
import { MusicLoadButton } from '@/components/music/MusicRuntime'
import { SpotifyAlbumEmbed } from '@/components/music/SpotifyAlbumEmbed'

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
  { value: compact(musicStats.totalPlays), label: 'Total plays' },
  { value: String(musicStats.followers), label: 'Followers' },
  { value: String(musicStats.playlists), label: 'Playlists' },
]

const visualStoryFrames = [
  {
    title: 'Music as consciousness technology',
    detail: 'Core narrative visual that anchors the emotional positioning of the catalog.',
    image: '/images/blog/music-as-consciousness-technology-hero-v3-pro.png',
    href: '/blog/music-as-consciousness-technology',
    tag: 'Website hero narrative',
  },
  {
    title: 'State-change music science',
    detail: 'Research-backed diagram for educational trust and long-form reading.',
    image: '/images/blog/science-of-state-change-music-hero.png',
    href: '/blog/science-of-state-change-music',
    tag: 'Research guide',
  },
  {
    title: 'Suno production workflow',
    detail: 'Step-based visual architecture for tutorials, workshops, and creator onboarding.',
    image: '/images/blog/suno-music-workflow-hero.png',
    href: '/blog/suno-music-production-workflow',
    tag: 'Workflow guide',
  },
]

const swarmPods = [
  {
    name: 'Visual narrative workflow',
    icon: LayoutPanelTop,
    focus: 'Website visuals and landing composition',
    owns: ['Hero images', 'Section visuals', 'Diagram refreshes'],
    outputsPerWeek: '3–5 visuals',
  },
  {
    name: 'Catalog intelligence workflow',
    icon: AudioWaveform,
    focus: 'Track performance and packaging decisions',
    owns: ['Top track rotations', 'Album previews', 'Release candidate scoring'],
    outputsPerWeek: '2 release packets',
  },
  {
    name: 'Marketplace packaging workflow',
    icon: ShoppingBag,
    focus: 'Storefront-ready product and artwork bundles',
    owns: ['Cover variants', 'Playlist thumbnails', 'Release mockups'],
    outputsPerWeek: '4 release drops',
  },
  {
    name: 'Public platform workflow',
    icon: Megaphone,
    focus: 'Channel-native media and publishing cadence',
    owns: ['Short video covers', 'Carousel snippets', 'Thread visuals'],
    outputsPerWeek: 'Weekly channel cadence',
  },
  {
    name: 'Performance review workflow',
    icon: BarChart3,
    focus: 'Measurement, attribution, and catalog review loops',
    owns: ['Weekly review notes', 'Arrangement comparisons', 'Catalog curation'],
    outputsPerWeek: '1 strategy review',
  },
]

const channelMatrix = [
  {
    channel: 'Website (frankx.ai/music)',
    objective: 'Share the catalog and connect listeners to learning and practice routes',
    assets: ['Featured track player', 'Interactive track embeds', 'Editorial guides'],
    swarm: 'Visual narrative workflow',
  },
  {
    channel: 'Suno and music platforms',
    objective: 'Increase discovery and organize tracks into coherent playlists',
    assets: ['Cover variants', 'Playlist art', 'Track release notes'],
    swarm: 'Catalog intelligence and packaging',
  },
  {
    channel: 'YouTube, Shorts, Reels, and TikTok',
    objective: 'Turn each track into multi-format discovery media',
    assets: ['Vertical visualizers', 'Hook clips', 'Behind-the-build notes'],
    swarm: 'Public platform workflow',
  },
  {
    channel: 'LinkedIn, X, and newsletter',
    objective: 'Share arrangement notes, prompt patterns, and studio lessons',
    assets: ['Architecture carousels', 'Process threads', 'Weekly studio dispatches'],
    swarm: 'Public platform and review workflow',
  },
]

const revenuePaths = [
  {
    title: 'Streaming distribution',
    icon: Orbit,
    summary: 'Promote standout tracks into full distribution pipelines and playlist collections.',
    actions: ['Review tracks weekly', 'Package metadata and cover sets', 'Publish curated releases'],
  },
  {
    title: 'Direct digital releases',
    icon: ShoppingBag,
    summary: 'Offer curated prompt templates, focus music collections, and creator stem bundles.',
    actions: ['Group by listening state', 'Document prompt structures', 'Include clear usage notes'],
  },
  {
    title: 'Creator licensing',
    icon: Clapperboard,
    summary: 'Provide clear licensing terms for creators, podcasters, and video teams.',
    actions: ['Define licensing tiers', 'Publish usage terms', 'Maintain pre-cleared collections'],
  },
]

const studioPracticeRoutes = [
  {
    title: 'Suno prompt templates',
    href: '/music/templates',
    cta: 'Open prompt templates',
    tags: ['Nine style templates', 'Tempo, key, and instruments', 'Free to copy'],
    summary:
      'Copy nine starting-point prompts with explicit tempo, key, mode, and instrumentation for deep focus, progressive house, orchestral scores, and ambient study.',
  },
  {
    title: 'Interactive music lab',
    href: '/music-lab',
    cta: 'Open the music lab',
    tags: ['Browser instruments', 'Violin, piano, guitar, and drums', 'No account required'],
    summary:
      'Play digital violin, concert piano, guided guitar tabs, and drum pads directly in the browser to test melodies and chord voicings before a studio session.',
  },
  {
    title: 'Self-paced music learning map',
    href: '/music/learn',
    cta: 'Explore learning paths',
    tags: ['Eight study paths', 'Theory to production', 'English and German'],
    summary:
      'Follow self-paced guides across music theory, sight reading, piano, violin, guitar, orchestration, production, and the acoustic science of sound.',
  },
  {
    title: 'Song brainstorm and tool directory',
    href: '/music/brainstorm',
    cta: 'Open the brainstorm workspace',
    tags: ['Arrangement hooks', 'Custom style and lyrics', 'Vetted tool guide'],
    summary:
      'Work through genre combinations, custom style prompts, and verse-to-chorus lyric arcs, or browse the practice and production tool directory at /music/tools.',
  },
]

// ============================================================================
// BACKGROUND
// ============================================================================

const backgroundOrbs = [
  {
    className: 'absolute top-0 -right-[20%] w-[60%] h-[60%]',
    color: 'rgba(16, 185, 129, 0.08)', // emerald — tech spectrum
    shape: 'ellipse',
    spread: '70%',
    blur: 100,
    animate: { x: [0, -50, 0], y: [0, 30, 0] },
    duration: 25,
  },
  {
    className: 'absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%]',
    color: 'rgba(6, 182, 212, 0.06)', // cyan — tech spectrum
    shape: 'ellipse',
    spread: '70%',
    blur: 100,
    animate: { x: [0, 40, 0], y: [0, -20, 0] },
    duration: 30,
  },
  {
    className: 'absolute top-[25%] left-[20%] w-[35%] h-[35%]',
    color: 'rgba(245, 158, 11, 0.07)', // amber — soul spectrum accent
    shape: 'circle',
    spread: '72%',
    blur: 80,
    animate: { x: [0, 20, 0], y: [0, -25, 0] },
    duration: 22,
  },
]

function MusicBackground() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#0a0a0b]" />
      <div className="absolute inset-0 opacity-[0.25] [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.18)_1px,transparent_0)] [background-size:24px_24px]" />

      {backgroundOrbs.map((orb, i) => (
        <motion.div
          key={i}
          className={orb.className}
          style={{
            background: `radial-gradient(${orb.shape} at center, ${orb.color} 0%, transparent ${orb.spread})`,
            filter: `blur(${orb.blur}px)`,
          }}
          animate={shouldReduceMotion ? undefined : orb.animate}
          transition={{ duration: orb.duration, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
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
              <span className="text-sm font-medium text-emerald-300">AI music architecture</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="text-white">Architecting music</span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-amber-400 bg-clip-text text-transparent">
                for AI worlds
              </span>
            </h1>

            <p className="text-xl text-white/80 mb-3 max-w-xl leading-relaxed">
              Original tracks, prompt templates, browser instruments, and studio notes.
            </p>

            <p className="text-lg text-white/50 mb-8 max-w-lg leading-relaxed">
              Songs made with Suno, spanning meditation soundscapes, orchestral arrangements,
              tech house, and hip hop, paired with the prompts, practice tools, and workflows behind them.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={musicStats.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-white text-black px-7 py-4 rounded-full font-semibold transition-all hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
              >
                <Play className="w-5 h-5" />
                Full catalog on Suno
                <ExternalLink className="w-4 h-4" />
              </a>
              <Link
                href="/music/brainstorm"
                className="inline-flex items-center gap-3 border border-white/20 text-white px-7 py-4 rounded-full font-semibold transition-all hover:bg-white/5"
              >
                <Sparkles className="w-4 h-4" />
                Brainstorm ideas
              </Link>
              <Link
                href="/music/templates"
                className="inline-flex items-center gap-3 border border-amber-500/40 text-amber-200 px-7 py-4 rounded-full font-semibold transition-all hover:bg-amber-500/10"
              >
                <Radar className="w-4 h-4" />
                Open prompt templates
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-emerald-500/20 via-cyan-500/10 to-amber-500/10 blur-3xl opacity-50" />
              <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-4 overflow-hidden">
                <p className="text-xs font-medium tracking-wide text-emerald-400/80 mb-3 px-2">Listen here</p>
                {heroTrack?.sunoId && (
                  <MusicLoadButton sunoId={heroTrack.sunoId} title={heroTrack.title} />
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
          <p className="text-xs font-medium tracking-wide text-cyan-300/80 mb-4">Visual narrative system</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Make the music universe visible</h2>
          <p className="text-lg text-white/50 max-w-3xl">
            Every major narrative gets a visual anchor. These essays and guides document the arrangement patterns,
            acoustic research, and production workflows behind the catalog.
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
                    <span className="absolute top-3 left-3 text-[11px] font-medium px-3 py-1.5 rounded-full bg-black/60 border border-white/20 text-white/80">
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
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Top tracks</h2>
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
              {track.sunoId && (
                <SunoTrackCTA
                  sunoId={track.sunoId}
                  title={track.title}
                  genre={
                    (track.genre?.join(' / ') || 'Mixed') +
                    (track.plays ? ` · ${track.plays} plays` : '')
                  }
                  className="my-0 h-full"
                />
              )}
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Latest drops</h2>
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
                <MusicCoverImage
                  src={track.imageUrl}
                  alt={track.title}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  fallbackClassName="bg-gradient-to-br from-emerald-500/20 to-amber-500/20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute left-3 bottom-3 text-[11px] font-medium px-2.5 py-1 rounded-full bg-black/60 border border-white/20 text-white/80">
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
                <MusicCoverImage
                  src={playlist.imageUrl}
                  alt={playlist.name}
                  sizes="(max-width: 768px) 50vw, 25vw"
                  fallbackClassName="bg-gradient-to-br from-cyan-500/20 to-emerald-500/20"
                />
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
          <p className="text-xs font-medium tracking-wide text-amber-300/80 mb-4">Studio workflow</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Studio workflows and asset ownership</h2>
          <p className="text-lg text-white/50 max-w-3xl">
            Each workflow lane owns a clear responsibility so visual storytelling, catalog curation, and release packaging stay coordinated.
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
                <p className="text-[11px] font-medium text-emerald-300/90">{swarm.outputsPerWeek}</p>
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
              <p className="text-xs font-medium text-cyan-300/85">Owner: {row.swarm}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// STUDIO PRACTICE & TEMPLATES ROUTES
// ============================================================================

function StudioPracticeRoutesSection() {
  return (
    <section className="py-20 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <p className="text-xs font-medium tracking-wide text-emerald-300/80 mb-4">Practice, templates, and studio tools</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Explore the music studio routes</h2>
          <p className="text-lg text-white/50 max-w-3xl">
            Open the prompt templates, playable browser instruments, self-paced learning paths, and arrangement workspace that sit behind the catalog.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-4">
          {studioPracticeRoutes.map((item, i) => (
            <motion.article
              key={item.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col justify-between rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-6"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full text-xs font-medium bg-black/50 border border-white/15 text-white/75"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed mb-5">{item.summary}</p>
              </div>
              <Link
                href={item.href}
                className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 hover:text-emerald-200 transition-colors"
              >
                <span>{item.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
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
          <p className="text-xs font-medium tracking-wide text-amber-300/80 mb-4">Catalog pathways</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Distribution and licensing pathways</h2>
          <p className="text-lg text-white/50 max-w-3xl">
            Keep catalog distribution clear across streaming, direct releases, and creator licensing.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Collections &amp; releases</h2>
          <p className="text-lg text-white/50">Explore collections by genre and mood. Streaming releases appear when available.</p>
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

                {album.status === 'draft' && <p className="mb-4 text-sm text-white/70">Collection in progress</p>}
                {(album.status === 'released' || album.status === 'published') && album.spotifyUrl && (
                  <div className="mb-6"><SpotifyAlbumEmbed url={album.spotifyUrl} title={album.title} /></div>
                )}
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
                          <MusicLoadButton sunoId={track.sunoId} title={track.title} />
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
            Start from tested style prompts, practice on browser instruments in the music lab,
            or follow the self-paced learning paths.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/music/brainstorm"
              className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full text-lg font-semibold transition-all hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
            >
              <Sparkles className="w-5 h-5" />
              Brainstorm new ideas
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/music-lab"
              className="inline-flex items-center gap-3 border border-white/20 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:bg-white/5"
            >
              <BookOpen className="w-4 h-4" />
              Open the music lab
            </Link>
            <Link
              href="/music/learn"
              className="inline-flex items-center gap-3 border border-amber-500/40 text-amber-200 px-8 py-4 rounded-full text-lg font-semibold transition-all hover:bg-amber-500/10"
            >
              <Radar className="w-4 h-4" />
              Explore music learning
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
        <StudioPracticeRoutesSection />
        <RevenuePathsSection />
        <AlbumsSection />
        <CTASection />
      </div>
    </main>
  )
}
