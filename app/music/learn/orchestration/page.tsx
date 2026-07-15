'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

// ── Orchestra Families ──────────────────────────────────────────────────────

const FAMILIES = [
  {
    name: 'Strings',
    emoji: '🎻',
    color: 'from-violet-500/15 to-purple-500/5',
    border: 'border-violet-500/20',
    accent: 'text-violet-400',
    instruments: ['Violin I', 'Violin II', 'Viola', 'Cello', 'Double Bass', 'Harp'],
    role: 'The backbone of the orchestra. Strings carry melody, harmony, and emotional weight. They can sustain notes indefinitely and play everything from delicate pianissimo to thunderous fortissimo.',
    range: 'Lowest (Double Bass: ~41Hz) to Highest (Violin: ~3.5kHz)',
    aiTip: 'In Suno, prompt "lush string quartet" or "cinematic strings, legato" for orchestral string textures.',
  },
  {
    name: 'Woodwinds',
    emoji: '🎵',
    color: 'from-emerald-500/15 to-teal-500/5',
    border: 'border-emerald-500/20',
    accent: 'text-emerald-400',
    instruments: ['Flute', 'Oboe', 'Clarinet', 'Bassoon', 'Piccolo', 'English Horn'],
    role: 'Color and character. Each woodwind has a distinct timbre — the warm clarinet, the pastoral oboe, the bright flute. They add detail and nuance to orchestral textures.',
    range: 'Bassoon (low, dark) through Piccolo (highest pitch in the orchestra)',
    aiTip: 'Prompt "solo oboe melody, pastoral" or "clarinet jazz, warm tone" for woodwind character.',
  },
  {
    name: 'Brass',
    emoji: '🎺',
    color: 'from-amber-500/15 to-orange-500/5',
    border: 'border-amber-500/20',
    accent: 'text-amber-400',
    instruments: ['Trumpet', 'French Horn', 'Trombone', 'Tuba'],
    role: 'Power and majesty. Brass instruments cut through the full orchestra. They announce themes, build climaxes, and add heroic or noble character. The French Horn bridges brass and woodwinds.',
    range: 'Tuba (lowest brass) to Trumpet (brilliant high register)',
    aiTip: 'Prompt "epic brass fanfare, triumphant" or "french horn, noble, film score" for brass impact.',
  },
  {
    name: 'Percussion',
    emoji: '🥁',
    color: 'from-rose-500/15 to-pink-500/5',
    border: 'border-rose-500/20',
    accent: 'text-rose-400',
    instruments: ['Timpani', 'Snare Drum', 'Bass Drum', 'Cymbals', 'Xylophone', 'Celesta', 'Triangle'],
    role: 'Rhythm, color, and dramatic effect. Timpani provide pitched thunder. Unpitched percussion (cymbals, bass drum) create impact. Mallet instruments (xylophone, celesta) add sparkle.',
    range: 'From thunder (bass drum) to shimmer (triangle, celesta)',
    aiTip: 'Prompt "orchestral percussion, timpani rolls, dramatic" for cinematic percussion.',
  },
]

// ── Orchestration Principles ────────────────────────────────────────────────

const PRINCIPLES = [
  {
    title: 'Balance',
    desc: 'Every instrument family must be heard without overpowering others. A single trumpet can drown out 10 violins. The orchestrator controls dynamics, doubling, and spacing to maintain clarity.',
    icon: '⚖️',
  },
  {
    title: 'Voicing',
    desc: 'How you distribute notes across instruments defines the sound. Close voicing (notes near each other) creates warmth. Open voicing (spread across octaves) creates grandeur.',
    icon: '🎼',
  },
  {
    title: 'Doubling',
    desc: 'Playing the same melody on multiple instruments creates richness. Flute + violin an octave apart = bright, shimmering. Cello + bassoon in unison = dark, warm. Every combination has a unique color.',
    icon: '🔄',
  },
  {
    title: 'Contrast',
    desc: 'The power of orchestration comes from contrast — loud vs. soft, thick vs. thin, high vs. low. A solo oboe after a full tutti is more powerful than either alone.',
    icon: '🌗',
  },
  {
    title: 'Register',
    desc: 'Every instrument sounds different in its low, middle, and high range. A clarinet in its low register is dark and woody. The same clarinet up high is bright and piercing. The orchestrator uses this.',
    icon: '📊',
  },
  {
    title: 'Texture',
    desc: 'Monophony (single line), homophony (melody + accompaniment), polyphony (multiple independent lines), heterophony (variations of the same melody). Each creates a different emotional effect.',
    icon: '🧶',
  },
]

// ── Score Study ─────────────────────────────────────────────────────────────

const STUDY_SCORES = [
  { title: 'Bolero', composer: 'Ravel', why: 'A masterclass in orchestration — the same melody repeated with different instrument combinations, building from solo snare drum to full orchestra.', difficulty: 1 },
  { title: 'The Planets', composer: 'Holst', why: 'Each movement explores a different orchestral palette — from the brutal "Mars" to the mystical "Neptune." Essential for understanding orchestral color.', difficulty: 2 },
  { title: 'Pictures at an Exhibition', composer: 'Mussorgsky/Ravel', why: 'Originally for solo piano, then orchestrated by Ravel. Comparing both versions teaches you what orchestration ADDS to music.', difficulty: 2 },
  { title: 'Symphony No. 9', composer: 'Beethoven', why: 'The first symphony to include voices. Shows how to build from chamber textures to massive choral+orchestral climaxes.', difficulty: 3 },
  { title: 'The Rite of Spring', composer: 'Stravinsky', why: 'Radical use of rhythm, dissonance, and extreme registers. Changed what the orchestra could express.', difficulty: 4 },
  { title: 'Star Wars Suite', composer: 'John Williams', why: 'Modern orchestration at its finest. Shows how orchestral techniques translate directly to film scoring.', difficulty: 2 },
]

// ── Resources ───────────────────────────────────────────────────────────────

const RESOURCES = [
  { name: 'IMSLP Full Scores', url: 'https://imslp.org', desc: 'Free full orchestral scores for every major work. Study what the masters wrote.', icon: '📚' },
  { name: 'Orchestration Online', url: 'https://www.orchestrationonline.com', desc: 'Thomas Goss — the best orchestration teacher on YouTube. Clear, practical, deep.', icon: '🎓' },
  { name: 'Behind the Score', url: 'https://www.youtube.com/results?search_query=behind+the+score+orchestration', desc: 'YouTube series analyzing film scores and classical orchestration techniques.', icon: '🎬' },
  { name: 'MuseScore 4', url: 'https://musescore.org', desc: 'Free notation software with orchestral playback. Write and hear your arrangements instantly.', icon: '🎵' },
]

const AI_ORCHESTRATION = [
  { name: 'Suno AI', desc: 'Generate full orchestral tracks from text prompts. Frank\'s primary tool — 500+ tracks including orchestral compositions.', accent: 'text-emerald-400' },
  { name: 'AIVA', desc: 'AI composer trained on classical music. Generates score-ready orchestral compositions with part separation.', accent: 'text-violet-400' },
  { name: 'Amper/Shutterstock', desc: 'AI-composed production music with orchestral presets. Useful for understanding arrangement patterns.', accent: 'text-blue-400' },
  { name: 'MuseScore + AI plugins', desc: 'Notation software with AI-assisted arrangement suggestions. Write a melody, get orchestration ideas.', accent: 'text-amber-400' },
]

// ── Page ────────────────────────────────────────────────────────────────────

export default function OrchestrationPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:py-24">
        {/* Hero */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <p className="text-5xl">🎼</p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Learn Orchestration
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/50">
            The art of painting with sound. Learn to arrange music for ensembles, understand the orchestra as a system, and use AI to compose at scale — from an AI Architect who thinks about orchestration the same way he thinks about system design.
          </p>
          <p className="mx-auto mt-3 max-w-xl text-base text-white/30">
            Orchestration is to music what architecture is to software — it&apos;s how you organize components into something greater than the sum of its parts.
          </p>
        </motion.header>

        {/* The Orchestra as a System */}
        <motion.section {...fadeUp} className="mb-16">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/5 to-violet-500/5 p-8">
            <h2 className="text-2xl font-bold text-white">The Orchestra as a System</h2>
            <p className="mt-4 text-white/50 leading-relaxed">
              An orchestra is a distributed system. 80+ musicians, 4 instrument families, each with distinct capabilities and constraints. The conductor is the orchestrator — routing signals, managing timing, balancing load. The score is the architecture document. If you can think in systems, you can think in orchestration.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: '4 Families', desc: 'Strings, Woodwinds, Brass, Percussion', icon: '🏛️' },
                { label: '~80 Musicians', desc: 'Each a specialist in their instrument', icon: '👥' },
                { label: '1 Conductor', desc: 'The orchestrator — timing, dynamics, expression', icon: '🎯' },
                { label: '1 Score', desc: 'The architecture document — every note planned', icon: '📋' },
              ].map((item) => (
                <div key={item.label} className="rounded-xl bg-white/[0.03] p-4 text-center">
                  <p className="text-2xl">{item.icon}</p>
                  <p className="mt-2 text-sm font-bold text-white">{item.label}</p>
                  <p className="mt-1 text-xs text-white/40">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Instrument Families */}
        <motion.section {...fadeUp} className="mb-16">
          <h2 className="mb-2 text-2xl font-bold text-white">The 4 Instrument Families</h2>
          <p className="mb-6 text-white/40">Each family has a distinct sonic character, range, and role in the orchestra.</p>
          <div className="space-y-4">
            {FAMILIES.map((fam) => (
              <div key={fam.name} className={`rounded-2xl border ${fam.border} bg-gradient-to-br ${fam.color} p-6`}>
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{fam.emoji}</span>
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold ${fam.accent}`}>{fam.name}</h3>
                    <p className="mt-1 text-sm text-white/60">{fam.role}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {fam.instruments.map((inst) => (
                        <span key={inst} className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white/50">
                          {inst}
                        </span>
                      ))}
                    </div>
                    <p className="mt-3 text-xs text-white/30">Range: {fam.range}</p>
                    <p className="mt-1 text-xs text-emerald-400/70">AI tip: {fam.aiTip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 6 Principles */}
        <motion.section {...fadeUp} className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white">6 Principles of Orchestration</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-2xl">{p.icon}</p>
                <h3 className="mt-2 font-bold text-white">{p.title}</h3>
                <p className="mt-2 text-sm text-white/45 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Score Study */}
        <motion.section {...fadeUp} className="mb-16">
          <h2 className="mb-2 text-2xl font-bold text-white">Essential Scores to Study</h2>
          <p className="mb-6 text-white/40">Learn orchestration by studying the masters. All scores available free on IMSLP.</p>
          <div className="space-y-3">
            {STUDY_SCORES.map((score) => (
              <div key={score.title} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-white">{score.title} <span className="font-normal text-white/40">— {score.composer}</span></h3>
                    <p className="mt-1 text-sm text-white/45">{score.why}</p>
                  </div>
                  <span className="flex shrink-0 gap-0.5">
                    {Array.from({ length: 4 }, (_, i) => (
                      <span key={i} className={`h-1.5 w-2.5 rounded-full ${i < score.difficulty ? 'bg-violet-400' : 'bg-white/10'}`} />
                    ))}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* AI Orchestration */}
        <motion.section {...fadeUp} className="mb-16">
          <h2 className="mb-2 text-2xl font-bold text-white">AI-Powered Orchestration</h2>
          <p className="mb-6 text-white/40">How AI tools handle orchestral arrangement — and how to use them effectively.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {AI_ORCHESTRATION.map((tool) => (
              <div key={tool.name} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className={`font-bold ${tool.accent}`}>{tool.name}</h3>
                <p className="mt-2 text-sm text-white/45">{tool.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6">
            <h3 className="font-bold text-emerald-400">The AI Architect&apos;s Perspective</h3>
            <p className="mt-2 text-sm text-white/50 leading-relaxed">
              Traditional orchestration requires years of study — learning each instrument&apos;s range, transposition, technique limitations, and timbre in every register. AI collapses this learning curve by letting you hear the result instantly. But understanding WHY certain combinations work — why flute + violin in octaves shimmers, why horn + cello in unison feels noble — that&apos;s the knowledge that makes you a true orchestrator, not just someone who types prompts.
            </p>
          </div>
        </motion.section>

        {/* Frank's Orchestral Music */}
        <motion.section {...fadeUp} className="mb-16">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/5 to-indigo-500/5 p-8 text-center">
            <h2 className="text-2xl font-bold text-white">Frank&apos;s Orchestral Compositions</h2>
            <p className="mt-3 text-white/45">AI-generated orchestral music — from cinematic scores to neoclassical meditation-inspired soundscapes.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a href="https://suno.com/playlist/898c6c67-1b25-495f-82ce-53d9139d9a25" target="_blank" rel="noopener noreferrer" className="rounded-full bg-violet-500/20 px-6 py-2.5 text-sm font-medium text-violet-400 transition hover:bg-violet-500/30">
                Arcanean Choir 🎻
              </a>
              <a href="https://suno.com/playlist/0625352a-74c5-478a-933e-1204549efd36" target="_blank" rel="noopener noreferrer" className="rounded-full bg-blue-500/20 px-6 py-2.5 text-sm font-medium text-blue-400 transition hover:bg-blue-500/30">
                Orchestral Beauty 🎶
              </a>
              <a href="https://suno.com/playlist/77e7f75f-24b4-4c8f-b02c-10eff76a7052" target="_blank" rel="noopener noreferrer" className="rounded-full bg-amber-500/20 px-6 py-2.5 text-sm font-medium text-amber-400 transition hover:bg-amber-500/30">
                Golden Frequencies ✨
              </a>
              <Link href="/music" className="rounded-full bg-white/10 px-6 py-2.5 text-sm font-medium text-white/60 transition hover:bg-white/15">
                All Music →
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Resources */}
        <motion.section {...fadeUp} className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white">Resources for Learning Orchestration</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {RESOURCES.map((r) => (
              <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer" className="group rounded-xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20">
                <span className="text-2xl">{r.icon}</span>
                <h3 className="mt-2 font-bold text-white group-hover:text-violet-400">{r.name}</h3>
                <p className="mt-1 text-sm text-white/40">{r.desc}</p>
              </a>
            ))}
          </div>
        </motion.section>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/music/learn/piano" className="rounded-full border border-white/10 px-6 py-3 text-sm text-white/60 transition hover:border-white/20 hover:text-white/80">🎹 Piano</Link>
          <Link href="/music/learn/violin" className="rounded-full border border-white/10 px-6 py-3 text-sm text-white/60 transition hover:border-white/20 hover:text-white/80">🎻 Violin</Link>
          <Link href="/music/learn/theory" className="rounded-full border border-white/10 px-6 py-3 text-sm text-white/60 transition hover:border-white/20 hover:text-white/80">📐 Theory</Link>
          <Link href="/music/create" className="rounded-full border border-white/10 px-6 py-3 text-sm text-emerald-400/60 transition hover:border-emerald-500/30 hover:text-emerald-400">🤖 Create with AI</Link>
          <Link href="/music/learn" className="rounded-full border border-white/10 px-6 py-3 text-sm text-white/60 transition hover:border-white/20 hover:text-white/80">← Learning map</Link>
        </div>
      </div>
    </div>
  )
}
