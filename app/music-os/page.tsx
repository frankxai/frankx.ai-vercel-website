'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  AudioWaveform,
  BadgeCheck,
  BarChart3,
  Bot,
  Check,
  CheckCircle2,
  CircuitBoard,
  ClipboardCheck,
  Clock3,
  Database,
  Disc3,
  Eye,
  ExternalLink,
  FileAudio,
  Film,
  Fingerprint,
  Gauge,
  GitBranch,
  Headphones,
  Image as ImageIcon,
  Layers3,
  Lock,
  Megaphone,
  Music2,
  Network,
  PackageCheck,
  Radio,
  ReceiptText,
  Rocket,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
  TestTube2,
  UploadCloud,
  Users,
  Video,
  WandSparkles,
  Workflow,
  XCircle,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import {
  getDistroKidCandidates,
  getGenreDistribution,
  getMusicStats,
  getPlaylists,
  getTrackAnalytics,
  type TrackAnalytics,
} from '@/lib/music'

type Tone = 'emerald' | 'cyan' | 'amber' | 'rose' | 'violet' | 'neutral'

const toneStyles: Record<Tone, string> = {
  emerald: 'border-emerald-400/25 bg-emerald-400/10 text-emerald-200',
  cyan: 'border-cyan-400/25 bg-cyan-400/10 text-cyan-200',
  amber: 'border-amber-400/25 bg-amber-400/10 text-amber-200',
  rose: 'border-rose-400/25 bg-rose-400/10 text-rose-200',
  violet: 'border-violet-400/25 bg-violet-400/10 text-violet-200',
  neutral: 'border-white/10 bg-white/[0.04] text-white/70',
}

const releasePacket = {
  id: 'franks-vibes_20260621_oh-chama',
  title: 'Oh Chama',
  artist: 'FrankX',
  label: "Frank's Vibes",
  state: 'asset ready local only',
  decision: 'REVISE',
  duration: '4:34',
  source: 'Suno v5.5 / chirp-fenix',
  loudness: '-13.0 LUFS',
  truePeak: '-0.2 dBTP',
  currentGate: 'Rights, persona lock, WAV master, hook listen',
}

const gates = [
  { label: 'Intake', status: 'done', detail: 'Suno URL, prompt, lyrics, source MP3' },
  { label: 'Audio Facts', status: 'done', detail: 'Duration, codec, loudness, peak, LRA' },
  { label: 'Rights', status: 'blocked', detail: 'Commercial rights confirmation pending' },
  { label: 'Persona', status: 'blocked', detail: 'FrankX music persona lock pending' },
  { label: 'Assets', status: 'done', detail: 'Cover, Canvas, short, GIF prepared' },
  { label: 'Distribution', status: 'manual', detail: 'DistroKid packet prepared, no upload' },
  { label: 'Telemetry', status: 'queued', detail: '7-day and 30-day loops after release' },
]

const agentLanes: {
  name: string
  role: string
  owns: string
  gate: string
  tone: Tone
  icon: LucideIcon
}[] = [
  {
    name: 'music-curator',
    role: 'A&R gate',
    owns: 'GREEN-LIGHT / REVISE / REFUSE',
    gate: 'Non-waivable taste and release decision',
    tone: 'amber',
    icon: Headphones,
  },
  {
    name: 'music-archivist',
    role: 'Catalog truth',
    owns: 'master.csv, packet manifests, IDs',
    gate: 'No released-row drift',
    tone: 'cyan',
    icon: Fingerprint,
  },
  {
    name: 'persona-keeper',
    role: 'Artist canon',
    owns: 'Name, voice DNA, visual DNA',
    gate: 'No orphan track',
    tone: 'violet',
    icon: BadgeCheck,
  },
  {
    name: 'music-producer',
    role: 'Audio and assets',
    owns: 'Cover, Canvas, shorts, visualizer',
    gate: 'No incomplete asset bundle',
    tone: 'emerald',
    icon: SlidersHorizontal,
  },
  {
    name: 'music-distributor',
    role: 'Release desk',
    owns: 'DistroKid, Bandcamp, Spotify tasks',
    gate: 'No external upload before pass',
    tone: 'rose',
    icon: UploadCloud,
  },
  {
    name: 'royalty-architect',
    role: 'Money graph',
    owns: 'Splits, ISRC/UPC, sync notes',
    gate: 'No monetization without graph',
    tone: 'amber',
    icon: GitBranch,
  },
]

const connectorReality: {
  name: string
  owner: string
  automated: string
  manual: string
  state: string
  tone: Tone
}[] = [
  {
    name: 'Suno',
    owner: 'Intake',
    automated: 'Prompts, URLs, metadata, downloaded files, audio analysis',
    manual: 'Creation UI, exports, rights confirmation',
    state: 'UI-first, official public API not assumed',
    tone: 'cyan',
  },
  {
    name: 'xAI Imagine',
    owner: 'Asset Factory',
    automated: 'Image/video jobs, async polling, prompt packets',
    manual: 'Final art direction and brand approval',
    state: 'API-capable with key and queue',
    tone: 'emerald',
  },
  {
    name: 'DistroKid',
    owner: 'Distribution Desk',
    automated: 'Metadata packet, artwork/audio checks, upload checklist',
    manual: 'Submit release, select stores, confirm IDs',
    state: 'Dashboard-first unless partner API is verified',
    tone: 'amber',
  },
  {
    name: 'Spotify',
    owner: 'Profile Ops',
    automated: 'Web API readbacks, copy, Canvas file prep',
    manual: 'Canvas upload and artist profile claims',
    state: 'Canvas is Spotify for Artists UI flow',
    tone: 'violet',
  },
  {
    name: 'YouTube / Shorts',
    owner: 'Video Desk',
    automated: 'Shorts, thumbnails, tags, descriptions, chapters',
    manual: 'First channel decisions and uploads until governed',
    state: 'Draft packets first',
    tone: 'rose',
  },
  {
    name: 'FFmpeg / Essentia',
    owner: 'Audio Intelligence',
    automated: 'LUFS, true peak, waveform, fingerprints, MIR features',
    manual: 'Human listen and final mastering call',
    state: 'Best local foundation before paid APIs',
    tone: 'emerald',
  },
]

const systemLoops: {
  title: string
  detail: string
  proof: string
  icon: LucideIcon
  tone: Tone
}[] = [
  {
    title: 'Intake Core',
    detail: 'Suno URL, MP3/WAV, lyrics, prompt, source rights, packet manifest.',
    proof: 'packet.manifest.json',
    icon: FileAudio,
    tone: 'cyan',
  },
  {
    title: 'A&R Council',
    detail: 'Taste, canon, production, rights, distribution, social, royalty graph.',
    proof: 'ar-report.md',
    icon: ShieldCheck,
    tone: 'amber',
  },
  {
    title: 'Asset Factory',
    detail: 'Cover, Canvas, shorts, GIF, visualizer, platform crops.',
    proof: 'checksums.sha256',
    icon: Film,
    tone: 'emerald',
  },
  {
    title: 'Distribution Desk',
    detail: 'DistroKid fields, Spotify tasks, YouTube packet, Bandcamp notes.',
    proof: 'distribution/distrokid-packet.md',
    icon: UploadCloud,
    tone: 'rose',
  },
  {
    title: 'Amplification Mesh',
    detail: 'Platform-specific copy, voice-lock, frequency caps, post queue.',
    proof: 'launch packets',
    icon: Megaphone,
    tone: 'violet',
  },
  {
    title: 'Telemetry Loop',
    detail: 'Streams, saves, skips, follows, social watch-through, revenue.',
    proof: '7-day / 30-day review',
    icon: BarChart3,
    tone: 'cyan',
  },
]

const redBlueFindings = [
  {
    red: 'Old CLI could imply DistroKid or Spotify completion without proof.',
    blue: 'UI now labels all external actions as local-only until an upload receipt exists.',
  },
  {
    red: 'A&R scoring can become theater when it is not tied to audio facts.',
    blue: 'Current packet surfaces LUFS, peak, duration, codec, gate failures, and exact revisions.',
  },
  {
    red: 'Persona sprawl can produce cool names with no release cadence.',
    blue: 'Persona gate blocks release until artist identity and canon are locked.',
  },
  {
    red: 'Fragile private endpoints can look like production integrations.',
    blue: 'Connector matrix separates safe automation from manual platform steps.',
  },
  {
    red: 'The AI-music market is getting flooded, so more generation can reduce trust.',
    blue: 'The OS focuses on evidence, curation, persona, disclosure, and fan feedback before scale.',
  },
  {
    red: 'A beautiful dashboard can become passive theatre.',
    blue: 'The critical path now forces every agent task into intake, verify, shape, package, launch, or learn.',
  },
]

const assetFrames = [
  {
    title: 'Release Atomization Map',
    src: '/images/music/infogenius/platform-content-atomization-v1.png',
    format: '16:9',
    state: 'maps one song into channel-native assets',
  },
  {
    title: 'Agent Topology',
    src: '/images/music/infogenius/sub-agent-swarm-topology-v1.png',
    format: '16:9',
    state: 'shows lanes, memory bus, KPI loop',
  },
  {
    title: 'Revenue Flywheel',
    src: '/images/music/infogenius/music-revenue-flywheel-v1.png',
    format: '16:9',
    state: 'ties release work to audience and offers',
  },
  {
    title: 'Catalog Universe',
    src: '/images/music/infogenius/music-catalog-universe-poster-v1.png',
    format: '3:4',
    state: 'poster direction for the music identity',
  },
]

const focusModes: {
  id: string
  label: string
  title: string
  detail: string
  primary: string
  secondary: string
  icon: LucideIcon
  tone: Tone
}[] = [
  {
    id: 'decide',
    label: 'Decide',
    title: 'A&R decision before asset excitement.',
    detail: 'The cockpit starts with the question a label would ask: should this track ship, revise, or stay private?',
    primary: 'Run hook listen, rights proof, persona fit, and production quality before distribution.',
    secondary: 'Current answer: revise Oh Chama until rights, persona, WAV master, and human listen pass.',
    icon: Target,
    tone: 'amber',
  },
  {
    id: 'package',
    label: 'Package',
    title: 'One song becomes a release packet.',
    detail: 'Every output is tied to a proof folder: audio facts, credits, AI disclosure, cover, Canvas, cutdowns, and upload fields.',
    primary: 'Make manual work faster by handing DistroKid and Spotify a complete, verified packet.',
    secondary: 'Next build: packet validator, checksum receipts, audio fingerprints, and asset dimensions.',
    icon: PackageCheck,
    tone: 'emerald',
  },
  {
    id: 'amplify',
    label: 'Amplify',
    title: 'Campaigns are planned from the first listen.',
    detail: 'Spotify, SoundCloud, YouTube Shorts, TikTok, and owned-site copy need separate hooks and feedback loops.',
    primary: 'Generate channel-native assets, then observe saves, follows, comments, watch-through, and playlist adds.',
    secondary: 'The winning pattern is listener-to-fan conversion, not raw upload volume.',
    icon: Rocket,
    tone: 'cyan',
  },
  {
    id: 'learn',
    label: 'Learn',
    title: 'The catalog gets smarter after release.',
    detail: 'The OS should remember what worked: sound, persona, visual direction, channel, audience segment, and revenue path.',
    primary: 'Feed 7-day and 30-day reviews back into prompts, production choices, and the next release queue.',
    secondary: 'This is where it becomes a label brain, not a song generator wrapper.',
    icon: Activity,
    tone: 'violet',
  },
]

const criticalPath = [
  {
    step: '01',
    label: 'Intake',
    state: 'ready',
    proof: 'Suno URL / MP3 / WAV / prompt',
    icon: AudioWaveform,
    tone: 'cyan' as Tone,
  },
  {
    step: '02',
    label: 'Verify',
    state: 'blocked',
    proof: 'rights, credits, AI disclosure',
    icon: ShieldCheck,
    tone: 'rose' as Tone,
  },
  {
    step: '03',
    label: 'Shape',
    state: 'manual',
    proof: 'persona, cover, Canvas, social cuts',
    icon: WandSparkles,
    tone: 'amber' as Tone,
  },
  {
    step: '04',
    label: 'Package',
    state: 'queued',
    proof: 'DistroKid packet, Spotify tasks',
    icon: ClipboardCheck,
    tone: 'emerald' as Tone,
  },
  {
    step: '05',
    label: 'Launch',
    state: 'human gate',
    proof: 'upload receipts and platform links',
    icon: Rocket,
    tone: 'violet' as Tone,
  },
  {
    step: '06',
    label: 'Learn',
    state: 'after release',
    proof: 'streams, saves, fans, revenue, notes',
    icon: BarChart3,
    tone: 'cyan' as Tone,
  },
]

const marketSignals: {
  source: string
  signal: string
  absorb: string
  avoid: string
  tone: Tone
  icon: LucideIcon
}[] = [
  {
    source: 'Spotify for Artists',
    signal: 'Campaign Kit, playlist pitching, Canvas, and audience goals turn a release into a fan-development loop.',
    absorb: 'Add campaign goals, Canvas spec checks, pitch tasks, save-rate and playlist-add review loops.',
    avoid: 'Do not treat Spotify as only a link destination after upload.',
    tone: 'emerald',
    icon: Radio,
  },
  {
    source: 'DistroKid',
    signal: 'AI music is accepted with rules, and AI Credits now matter for lyrics, vocals, and instrumental disclosure.',
    absorb: 'Make AI disclosure, rights proof, credits, and anti-fraud notes first-class release gates.',
    avoid: 'Do not let a generated song ship with vague ownership or missing source evidence.',
    tone: 'amber',
    icon: ReceiptText,
  },
  {
    source: 'SoundCloud',
    signal: 'The strongest artist tools expose fans, comments, engagement, and direct relationships.',
    absorb: 'Build fan-intelligence and response tasks into the 7-day review, not only stream charts.',
    avoid: 'Do not optimize only for anonymous play counts.',
    tone: 'cyan',
    icon: Users,
  },
  {
    source: 'LANDR / BandLab',
    signal: 'Modern creator stacks bundle mastering, distribution, samples, plugins, storage, collaboration, and education.',
    absorb: 'Bundle finishing tools: loudness checks, stem paths, revision notes, collaborator review, and pre-save assets.',
    avoid: 'Do not make the OS a thin prompt launcher around Suno.',
    tone: 'violet',
    icon: SlidersHorizontal,
  },
  {
    source: 'Suno / xAI Imagine',
    signal: 'The creative frontier is fast generation, but trust comes from permission, provenance, review, and quality control.',
    absorb: 'Use generation as an asset factory behind receipts, queues, moderation, and taste review.',
    avoid: 'Do not confuse generated volume with a label-worthy release.',
    tone: 'rose',
    icon: TestTube2,
  },
]

const foundationStack: {
  layer: string
  job: string
  tech: string
  receipt: string
  gate: string
  icon: LucideIcon
  tone: Tone
}[] = [
  {
    layer: 'Packet Core',
    job: 'Normalize every song into one durable release object.',
    tech: 'JSON manifest + CSV catalog + SQLite/DuckDB index',
    receipt: 'packet.manifest.json, checksums.sha256',
    gate: 'No packet, no release.',
    icon: Database,
    tone: 'cyan',
  },
  {
    layer: 'Audio Intelligence',
    job: 'Extract evidence before opinion.',
    tech: 'ffmpeg/ffprobe, Essentia, waveform renderer, optional AcoustID',
    receipt: 'loudness, true peak, key/BPM, fingerprint',
    gate: 'No audio facts, no A&R score.',
    icon: AudioWaveform,
    tone: 'emerald',
  },
  {
    layer: 'Agent Loop Runtime',
    job: 'Run bounded agents with artifacts and refusal triggers.',
    tech: 'Codex skills, Hermes/Queen jobs, AGENTS.md loop contract, eval receipts',
    receipt: 'ar-report.md, gate.json, revision-plan.md',
    gate: 'No silent agent claims.',
    icon: Network,
    tone: 'violet',
  },
  {
    layer: 'Media Queue',
    job: 'Generate and review covers, Canvas, shorts, visualizers.',
    tech: 'xAI Imagine, Grok CLI router, Remotion, FFmpeg, image QA',
    receipt: 'job IDs, prompts, assets, visual QA score',
    gate: 'No asset without provenance.',
    icon: Film,
    tone: 'amber',
  },
  {
    layer: 'Distribution Desk',
    job: 'Prepare platform-ready packets without unsafe auto-submit.',
    tech: 'DistroKid checklist, Spotify API readbacks, YouTube upload packets',
    receipt: 'manual upload ID, ISRC, UPC, platform URLs',
    gate: 'Human approves uploads.',
    icon: UploadCloud,
    tone: 'rose',
  },
  {
    layer: 'Learning Ledger',
    job: 'Turn release outcomes into future creative decisions.',
    tech: 'PostHog/analytics, Spotify/SoundCloud exports, catalog retrospectives',
    receipt: '7-day and 30-day release review',
    gate: 'No next drop without learnings.',
    icon: Eye,
    tone: 'cyan',
  },
]

function StatusBadge({ children, tone = 'neutral' }: { children: React.ReactNode; tone?: Tone }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${toneStyles[tone]}`}>
      {children}
    </span>
  )
}

function Panel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[1.5rem] border border-white/10 bg-white/[0.035] shadow-2xl shadow-black/20 ${className}`}>
      {children}
    </div>
  )
}

function SectionHeader({
  eyebrow,
  title,
  detail,
}: {
  eyebrow: string
  title: string
  detail: string
}) {
  return (
    <div className="mb-8 max-w-3xl">
      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-emerald-300/70">{eyebrow}</p>
      <h2 className="text-2xl font-semibold tracking-tight text-white md:text-4xl">{title}</h2>
      <p className="mt-4 text-sm leading-6 text-white/55 md:text-base">{detail}</p>
    </div>
  )
}

function WaveformBars({ active = false }: { active?: boolean }) {
  const bars = [32, 52, 28, 72, 44, 86, 38, 64, 31, 58, 76, 41, 69, 34, 49, 80, 55, 36, 71, 47]
  return (
    <div className="flex h-24 items-end gap-1 overflow-hidden rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
      {bars.map((height, index) => (
        <span
          key={`${height}-${index}`}
          className={`w-full rounded-t-full ${
            active && index % 3 === 0 ? 'bg-emerald-300' : index % 4 === 0 ? 'bg-cyan-300/80' : 'bg-white/25'
          }`}
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  )
}

function GateIcon({ status }: { status: string }) {
  if (status === 'done') return <CheckCircle2 className="h-4 w-4 text-emerald-300" />
  if (status === 'blocked') return <XCircle className="h-4 w-4 text-rose-300" />
  if (status === 'manual') return <Lock className="h-4 w-4 text-amber-300" />
  return <Clock3 className="h-4 w-4 text-cyan-300" />
}

function CandidateRow({
  candidate,
  active,
  onSelect,
}: {
  candidate: TrackAnalytics
  active: boolean
  onSelect: () => void
}) {
  const score = Math.round((candidate.track.plays || 0) * 0.6 + candidate.engagementRate * 4)

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group w-full rounded-2xl border p-4 text-left transition ${
        active
          ? 'border-emerald-300/40 bg-emerald-300/10'
          : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.055]'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-white">{candidate.track.title}</span>
            <StatusBadge tone={candidate.tier === 'breakout' ? 'emerald' : candidate.tier === 'strong' ? 'cyan' : 'neutral'}>
              {candidate.tier}
            </StatusBadge>
          </div>
          <p className="mt-2 text-xs leading-5 text-white/45">
            {candidate.track.genre?.slice(0, 3).join(' / ') || 'genre pending'} · {candidate.track.duration || 'duration pending'}
          </p>
        </div>
        <div className="text-right font-mono text-xs text-white/50">
          <div className="text-white">{score}</div>
          <div>packet score</div>
        </div>
      </div>
    </button>
  )
}

export default function AgenticMusicOsPage() {
  const candidates = useMemo(() => getDistroKidCandidates().slice(0, 6), [])
  const analytics = useMemo(() => getTrackAnalytics(), [])
  const genres = useMemo(() => getGenreDistribution().slice(0, 6), [])
  const playlists = useMemo(() => getPlaylists(), [])
  const musicStats = useMemo(() => getMusicStats(), [])
  const [selectedId, setSelectedId] = useState(candidates[0]?.track.id || analytics[0]?.track.id || '')
  const [selectedFocusId, setSelectedFocusId] = useState(focusModes[0].id)
  const selected =
    candidates.find((candidate) => candidate.track.id === selectedId) ||
    analytics.find((candidate) => candidate.track.id === selectedId) ||
    candidates[0] ||
    analytics[0]
  const selectedFocus = focusModes.find((mode) => mode.id === selectedFocusId) || focusModes[0]
  const SelectedFocusIcon = selectedFocus.icon

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#08090b] text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(16,185,129,0.10),transparent_28%,rgba(6,182,212,0.08)_62%,transparent)]" />
        <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-white/[0.06] to-transparent" />
      </div>

      <section className="relative px-4 pt-28 md:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-300/25 bg-emerald-300/10">
                <CircuitBoard className="h-5 w-5 text-emerald-200" />
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/40">FrankX / Music IS</p>
                <h1 className="text-xl font-semibold tracking-tight text-white md:text-2xl">Agentic Music OS</h1>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge tone="emerald">catalog online</StatusBadge>
              <StatusBadge tone="amber">external uploads gated</StatusBadge>
              <StatusBadge tone="cyan">release packets local-first</StatusBadge>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div>
              <Panel className="relative overflow-hidden p-5 md:p-6">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/70 to-transparent" />
                <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
                  <div className="flex min-h-[420px] flex-col justify-between">
                    <div>
                      <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-emerald-300/70">
                        release command surface
                      </p>
                      <h2 className="max-w-xl text-4xl font-semibold leading-[0.98] tracking-tight text-white md:text-5xl">
                        Suno-native songs into release packets.
                      </h2>
                      <p className="mt-5 max-w-xl text-base leading-7 text-white/58">
                        The cockpit turns a song link or audio file into evidence: catalog row, A&R gate, rights status, cover,
                        Canvas, social cuts, distribution packet, and telemetry loop.
                      </p>
                    </div>

                    <div className="mt-7 rounded-[1.4rem] border border-white/10 bg-black/25 p-3">
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" role="tablist" aria-label="Music OS focus">
                        {focusModes.map((mode) => {
                          const Icon = mode.icon
                          const active = selectedFocus.id === mode.id
                          return (
                            <button
                              key={mode.id}
                              type="button"
                              onClick={() => setSelectedFocusId(mode.id)}
                              className={`flex items-center justify-center gap-2 rounded-full border px-3 py-2 text-xs font-medium transition ${
                                active
                                  ? 'border-emerald-300/45 bg-emerald-300/15 text-white'
                                  : 'border-white/10 bg-white/[0.03] text-white/50 hover:border-white/20 hover:text-white/80'
                              }`}
                              role="tab"
                              aria-selected={active}
                            >
                              <Icon className="h-3.5 w-3.5" />
                              {mode.label}
                            </button>
                          )
                        })}
                      </div>
                      <div className="mt-3 rounded-[1.1rem] border border-white/10 bg-[#0c1012] p-4">
                        <div className="flex gap-4">
                          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border ${toneStyles[selectedFocus.tone]}`}>
                            <SelectedFocusIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-white">{selectedFocus.title}</h3>
                            <p className="mt-2 text-sm leading-6 text-white/55">{selectedFocus.detail}</p>
                            <p className="mt-3 text-xs leading-5 text-white/42">{selectedFocus.primary}</p>
                          </div>
                        </div>
                        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 font-mono text-[11px] leading-5 text-white/45">
                          {selectedFocus.secondary}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {[
                        { label: 'indexed tracks', value: musicStats.totalTracks },
                        { label: 'followers', value: musicStats.followers },
                        { label: 'playlists', value: playlists.length },
                        { label: 'release candidates', value: candidates.length },
                      ].map((item) => (
                        <div key={item.label} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                          <div className="font-mono text-2xl text-white">{item.value}</div>
                          <div className="mt-1 text-xs text-white/45">{item.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[1.35rem] border border-white/10 bg-black/35 p-4">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-white">{releasePacket.title}</p>
                        <p className="mt-1 text-xs text-white/45">
                          {releasePacket.artist} · {releasePacket.label} · {releasePacket.source}
                        </p>
                      </div>
                      <StatusBadge tone="amber">{releasePacket.decision}</StatusBadge>
                    </div>

                    <WaveformBars active />

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {[
                        ['state', releasePacket.state],
                        ['duration', releasePacket.duration],
                        ['loudness', releasePacket.loudness],
                        ['true peak', releasePacket.truePeak],
                      ].map(([label, value]) => (
                        <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-3">
                          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">{label}</div>
                          <div className="mt-2 break-words text-sm text-white/80">{value}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="mt-0.5 h-4 w-4 text-amber-200" />
                        <div>
                          <p className="text-sm font-medium text-amber-100">Current blocker</p>
                          <p className="mt-1 text-sm leading-6 text-amber-100/70">{releasePacket.currentGate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Panel>
            </motion.div>

            <motion.div>
              <Panel className="h-full p-5 md:p-6">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-cyan-300/70">candidate stack</p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">Next release queue</h2>
                  </div>
                  <StatusBadge tone="cyan">ranked from catalog</StatusBadge>
                </div>

                <div className="space-y-3">
                  {candidates.map((candidate) => (
                    <CandidateRow
                      key={candidate.track.id}
                      candidate={candidate}
                      active={selected?.track.id === candidate.track.id}
                      onSelect={() => setSelectedId(candidate.track.id)}
                    />
                  ))}
                </div>

                {selected && (
                  <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-white">{selected.track.title}</p>
                        <p className="mt-1 text-xs text-white/45">
                          {selected.track.plays || 0} plays · {selected.track.likes || 0} likes ·{' '}
                          {selected.engagementRate.toFixed(1)}% engagement
                        </p>
                      </div>
                      {selected.track.sunoUrl && (
                        <a
                          href={selected.track.sunoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition hover:border-cyan-300/40 hover:text-white"
                          aria-label={`Open ${selected.track.title} on Suno`}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </Panel>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative px-4 py-12 md:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-white/35">
                critical path
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                The interface should make the next correct move obvious.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-white/48">
              This is the operating spine: intake, verify, shape, package, launch, learn. Any agent or plugin that cannot place its work on this path is decorative.
            </p>
          </div>

          <div className="overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/[0.035]">
            <div className="grid gap-px bg-white/10 md:grid-cols-3 xl:grid-cols-6">
              {criticalPath.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.step} className="bg-[#0c0f12] p-5">
                    <div className="mb-5 flex items-center justify-between gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-2xl border ${toneStyles[item.tone]}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">{item.state}</span>
                    </div>
                    <p className="font-mono text-[11px] text-white/35">{item.step}</p>
                    <h3 className="mt-2 text-base font-semibold text-white">{item.label}</h3>
                    <p className="mt-3 text-xs leading-5 text-white/46">{item.proof}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-4 py-16 md:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div>
            <SectionHeader
              eyebrow="release proof"
              title="The gate shows why a track can or cannot ship."
              detail="The system is strongest when it blocks the right things. Oh Chama is asset-ready, but not distribution-ready until rights, persona, master, and human listen checks pass."
            />
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-7">
            {gates.map((gate, index) => (
              <motion.div key={gate.label}>
                <Panel className="h-full p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <GateIcon status={gate.status} />
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">{gate.status}</span>
                  </div>
                  <h3 className="text-sm font-medium text-white">{gate.label}</h3>
                  <p className="mt-2 text-xs leading-5 text-white/45">{gate.detail}</p>
                </Panel>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-4 pb-16 md:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <motion.div>
            <SectionHeader
              eyebrow="agent lanes"
              title="Persona names are not the system. Evidence loops are."
              detail="Each lane has a job, proof artifact, refusal trigger, and human approval boundary. This keeps agents useful without letting them cosplay authority."
            />
            <div className="space-y-3">
              {agentLanes.map((lane) => {
                const Icon = lane.icon
                return (
                  <div key={lane.name} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                    <div className="flex gap-4">
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border ${toneStyles[lane.tone]}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-mono text-sm text-white">{lane.name}</h3>
                          <StatusBadge tone={lane.tone}>{lane.role}</StatusBadge>
                        </div>
                        <p className="mt-2 text-sm text-white/58">{lane.owns}</p>
                        <p className="mt-1 text-xs text-white/38">Gate: {lane.gate}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          <motion.div>
            <Panel className="overflow-hidden">
              <div className="border-b border-white/10 p-5 md:p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-emerald-300/70">
                      operating graph
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">From song to label memory</h2>
                  </div>
                  <Workflow className="h-5 w-5 text-white/40" />
                </div>
              </div>
              <div className="grid gap-px bg-white/10 md:grid-cols-2">
                {systemLoops.map((loop) => {
                  const Icon = loop.icon
                  return (
                    <div key={loop.title} className="bg-[#0d0f12] p-5">
                      <div className="flex items-start gap-4">
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border ${toneStyles[loop.tone]}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">{loop.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-white/50">{loop.detail}</p>
                          <p className="mt-3 font-mono text-[11px] text-white/35">{loop.proof}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Panel>
          </motion.div>
        </div>
      </section>

      <section className="relative px-4 pb-16 md:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div>
            <SectionHeader
              eyebrow="asset factory"
              title="Every release becomes a media kit, not a lonely MP3."
              detail="The route uses existing visual assets as proof of the system direction: atomization, topology, revenue loop, and catalog identity."
            />
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {assetFrames.map((asset) => (
              <motion.div key={asset.title}>
                <div className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.035]">
                  <div className="relative aspect-[4/3] overflow-hidden bg-black/40">
                    <Image
                      src={asset.src}
                      alt={asset.title}
                      fill
                      sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover opacity-85 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-sm font-medium text-white">{asset.title}</h3>
                      <span className="font-mono text-[10px] text-white/35">{asset.format}</span>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-white/45">{asset.state}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-4 pb-16 md:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div>
            <SectionHeader
              eyebrow="market intelligence"
              title="Steal the right lessons, then build the missing operating layer."
              detail="The best artist platforms do one thing well: creation, mastering, distribution, campaign tools, or fan relationships. The opening is to connect those jobs with proof, taste, and release memory."
            />
          </motion.div>

          <div className="grid gap-4 lg:grid-cols-5">
            {marketSignals.map((signal) => {
              const Icon = signal.icon
              return (
                <motion.div key={signal.source}>
                  <div className="flex h-full flex-col rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
                    <div className={`mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border ${toneStyles[signal.tone]}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/35">{signal.source}</p>
                    <p className="mt-3 text-sm leading-6 text-white/62">{signal.signal}</p>
                    <div className="mt-5 space-y-3 border-t border-white/10 pt-4">
                      <div>
                        <p className="text-xs font-medium text-emerald-100">Absorb</p>
                        <p className="mt-1 text-xs leading-5 text-white/45">{signal.absorb}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-rose-100">Refuse</p>
                        <p className="mt-1 text-xs leading-5 text-white/45">{signal.avoid}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="relative px-4 pb-16 md:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div>
            <SectionHeader
              eyebrow="connector reality"
              title="The best stack is honest about what can run unattended."
              detail="The cockpit separates local automation from human-gated platform work. That is the difference between a label OS and a brittle browser-script demo."
            />
          </motion.div>

          <div className="grid gap-4 lg:grid-cols-2">
            {connectorReality.map((connector) => (
              <motion.div key={connector.name}>
                <Panel className="p-5">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-semibold text-white">{connector.name}</h3>
                        <StatusBadge tone={connector.tone}>{connector.owner}</StatusBadge>
                      </div>
                      <p className="mt-2 text-sm text-white/45">{connector.state}</p>
                    </div>
                    <Bot className="h-5 w-5 text-white/35" />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-emerald-300/15 bg-emerald-300/[0.06] p-4">
                      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-emerald-100">
                        <Check className="h-4 w-4" />
                        Safe automation
                      </div>
                      <p className="text-xs leading-5 text-emerald-50/60">{connector.automated}</p>
                    </div>
                    <div className="rounded-2xl border border-amber-300/15 bg-amber-300/[0.06] p-4">
                      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-amber-100">
                        <Lock className="h-4 w-4" />
                        Human gate
                      </div>
                      <p className="text-xs leading-5 text-amber-50/60">{connector.manual}</p>
                    </div>
                  </div>
                </Panel>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-4 pb-16 md:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div>
            <SectionHeader
              eyebrow="foundation stack"
              title="The next leap is a receipt-backed runtime, not more prompting."
              detail="Every technology choice should answer one question: what artifact proves this step happened? That is how Codex, Claude, Grok, Hermes, and future agents stay aligned."
            />
          </motion.div>

          <Panel className="overflow-hidden">
            <div className="grid gap-px bg-white/10 lg:grid-cols-2">
              {foundationStack.map((layer) => {
                const Icon = layer.icon
                return (
                  <div key={layer.layer} className="bg-[#0d0f12] p-5 md:p-6">
                    <div className="grid gap-5 md:grid-cols-[12rem_1fr]">
                      <div>
                        <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border ${toneStyles[layer.tone]}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">{layer.layer}</h3>
                        <p className="mt-2 text-sm leading-6 text-white/48">{layer.job}</p>
                      </div>
                      <div className="space-y-3">
                        {[
                          ['tech', layer.tech],
                          ['receipt', layer.receipt],
                          ['gate', layer.gate],
                        ].map(([label, value]) => (
                          <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/32">{label}</p>
                            <p className="mt-2 text-sm leading-6 text-white/58">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </Panel>
        </div>
      </section>

      <section className="relative px-4 pb-20 md:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <motion.div>
            <Panel className="p-5 md:p-6">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-rose-300/70">red / blue</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">Critical test of the system</h2>
                </div>
                <ShieldCheck className="h-5 w-5 text-white/40" />
              </div>

              <div className="space-y-3">
                {redBlueFindings.map((finding) => (
                  <div key={finding.red} className="grid gap-3 rounded-2xl border border-white/10 bg-black/25 p-4 md:grid-cols-2">
                    <div>
                      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-rose-100">
                        <AlertTriangle className="h-4 w-4" />
                        Red team
                      </div>
                      <p className="text-sm leading-6 text-white/52">{finding.red}</p>
                    </div>
                    <div>
                      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-emerald-100">
                        <ShieldCheck className="h-4 w-4" />
                        Blue team
                      </div>
                      <p className="text-sm leading-6 text-white/52">{finding.blue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </motion.div>

          <motion.div>
            <Panel className="p-5 md:p-6">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-cyan-300/70">signal</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">Catalog intelligence</h2>
                </div>
                <Gauge className="h-5 w-5 text-white/40" />
              </div>

              <div className="space-y-4">
                {genres.map((genre) => {
                  const max = Math.max(...genres.map((item) => item.plays || 1))
                  const width = Math.max(8, Math.round(((genre.plays || 0) / max) * 100))
                  return (
                    <div key={genre.genre}>
                      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                        <span className="text-white/75">{genre.genre}</span>
                        <span className="font-mono text-xs text-white/38">{genre.plays} plays</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300" style={{ width: `${width}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  { label: 'packet core', value: 'v0.1', icon: Layers3 },
                  { label: 'release state', value: 'REVISE', icon: AlertTriangle },
                  { label: 'media modes', value: '4', icon: Video },
                  { label: 'manual gates', value: '4', icon: Lock },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                      <Icon className="mb-4 h-4 w-4 text-white/40" />
                      <div className="font-mono text-xl text-white">{item.value}</div>
                      <div className="mt-1 text-xs text-white/40">{item.label}</div>
                    </div>
                  )
                })}
              </div>
            </Panel>
          </motion.div>
        </div>
      </section>

      <section className="relative border-t border-white/10 px-4 py-14 md:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/35">next blue-team build</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              Wire the cockpit to packet validators and media job receipts.
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/50">
              The route is the front office. The next foundation is deterministic: validate packet manifests, verify checksums,
              score gate completeness, and render asset jobs with receipt IDs.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/music"
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white/80 transition hover:border-white/25 hover:text-white"
            >
              <Music2 className="h-4 w-4" />
              Public music
            </Link>
            <Link
              href="/music-lab"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              <Sparkles className="h-4 w-4" />
              Music lab
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
