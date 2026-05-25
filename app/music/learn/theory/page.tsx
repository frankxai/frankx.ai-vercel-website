'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

const buildingBlocks = [
  {
    title: 'Notes',
    icon: '🎵',
    desc: '12 unique pitches form the chromatic scale: C, C#, D, D#, E, F, F#, G, G#, A, A#, B. Sharps (#) raise a note by a half step, flats (b) lower by a half step. Every piece of music draws from these 12 tones.',
  },
  {
    title: 'Intervals',
    icon: '📏',
    desc: 'The distance between two notes. A half step (C to C#) is the smallest interval. A whole step spans two half steps (C to D). Thirds, fifths, and octaves form the backbone of harmony and melody.',
  },
  {
    title: 'Scales',
    icon: '🎼',
    desc: 'Ordered sequences of notes that define a key. Major scales sound bright (C-D-E-F-G-A-B). Minor scales sound darker (A-B-C-D-E-F-G). Pentatonic and blues scales are essential for improvisation.',
  },
  {
    title: 'Chords',
    icon: '🎹',
    desc: 'Three or more notes played together. A C major chord (C-E-G) sounds bright. C minor (C-Eb-G) sounds somber. Diminished chords create tension; augmented chords create an ethereal, floating quality.',
  },
]

const majorMinor = [
  {
    type: 'Major',
    formula: 'W-W-H-W-W-W-H',
    mood: 'Bright, uplifting, triumphant, joyful',
    color: 'from-cyan-500/20 to-cyan-600/5',
    accent: 'text-cyan-400',
    examples: [
      { song: 'Happy Birthday', key: 'G Major' },
      { song: 'Ode to Joy', key: 'D Major' },
      { song: 'Here Comes the Sun', key: 'A Major' },
    ],
  },
  {
    type: 'Minor',
    formula: 'W-H-W-W-H-W-W',
    mood: 'Dark, melancholic, mysterious, intense',
    color: 'from-violet-500/20 to-violet-600/5',
    accent: 'text-violet-400',
    examples: [
      { song: 'Moonlight Sonata', key: 'C# Minor' },
      { song: 'Game of Thrones Theme', key: 'C Minor' },
      { song: 'Stairway to Heaven', key: 'A Minor' },
    ],
  },
]

const circleOfFifths = [
  { key: 'C', sharps: 0, flats: 0, label: '0' },
  { key: 'G', sharps: 1, flats: 0, label: '1#' },
  { key: 'D', sharps: 2, flats: 0, label: '2#' },
  { key: 'A', sharps: 3, flats: 0, label: '3#' },
  { key: 'E', sharps: 4, flats: 0, label: '4#' },
  { key: 'B', sharps: 5, flats: 0, label: '5#' },
  { key: 'F#/Gb', sharps: 6, flats: 6, label: '6#/6b' },
  { key: 'Db', sharps: 0, flats: 5, label: '5b' },
  { key: 'Ab', sharps: 0, flats: 4, label: '4b' },
  { key: 'Eb', sharps: 0, flats: 3, label: '3b' },
  { key: 'Bb', sharps: 0, flats: 2, label: '2b' },
  { key: 'F', sharps: 0, flats: 1, label: '1b' },
]

const timeSignatures = [
  {
    sig: '4/4',
    name: 'Common Time',
    feel: 'Steady, marching pulse. Four beats per measure.',
    examples: 'Most pop, rock, hip-hop, R&B, electronic dance music',
  },
  {
    sig: '3/4',
    name: 'Waltz Time',
    feel: 'Flowing, dance-like. Three beats per measure with emphasis on beat one.',
    examples: 'Waltz of the Flowers, My Favorite Things, Norwegian Wood',
  },
  {
    sig: '6/8',
    name: 'Compound Duple',
    feel: 'Rolling, swaying motion. Two groups of three eighth notes.',
    examples: 'House of the Rising Sun, Nothing Else Matters, Irish jigs',
  },
  {
    sig: '5/4',
    name: 'Odd Meter',
    feel: 'Asymmetric, compelling unease. Five beats grouped as 3+2 or 2+3.',
    examples: 'Take Five (Dave Brubeck), Mission Impossible Theme',
  },
]

const chordProgressions = [
  {
    name: 'I - IV - V - I',
    label: 'The Backbone',
    desc: 'The foundation of Western music for centuries. Feels like a complete journey — departure and return.',
    inC: 'C - F - G - C',
    songs: ['La Bamba', 'Twist and Shout', 'Wild Thing'],
  },
  {
    name: 'I - V - vi - IV',
    label: 'The Pop Progression',
    desc: 'Behind an estimated 90% of pop hits since the 1990s. Emotionally satisfying with a hint of melancholy from the vi chord.',
    inC: 'C - G - Am - F',
    songs: ['Let It Be', 'Someone Like You', 'No Woman No Cry'],
  },
  {
    name: 'ii - V - I',
    label: 'The Jazz Standard',
    desc: 'The most important progression in jazz. Creates strong harmonic motion through circle-of-fifths movement.',
    inC: 'Dm - G - C',
    songs: ['Autumn Leaves', 'Fly Me to the Moon', 'All of Me'],
  },
]

const practiceResources = [
  {
    name: 'teoria.com',
    url: 'https://www.teoria.com',
    desc: 'Free interactive exercises for intervals, scales, chords, and ear training. Instant feedback on every answer.',
  },
  {
    name: 'musictheory.net',
    url: 'https://www.musictheory.net',
    desc: 'Clear, step-by-step interactive lessons covering every fundamental topic. The gold standard for self-study.',
  },
  {
    name: 'Functional Ear Trainer',
    url: 'https://play.google.com/store/apps/details?id=com.kaizen9.fet.android',
    desc: 'Mobile app that trains your ear to identify notes relative to a key center. Builds real musical hearing over time.',
  },
  {
    name: 'MuseScore',
    url: 'https://musescore.org',
    desc: 'Free open-source notation software. Write, play back, and share sheet music. Essential for applying theory to notation.',
  },
]

export default function TheoryPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:py-24">
        {/* Hero */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <p className="text-5xl">🎼</p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Music Theory
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
            The universal language behind every instrument, genre, and song. Understanding theory
            transforms you from someone who plays notes into someone who speaks music.
          </p>
        </motion.header>

        {/* Building Blocks */}
        <motion.section {...fadeUp} className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white">The Building Blocks</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {buildingBlocks.map((block) => (
              <div
                key={block.title}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-6"
              >
                <p className="text-2xl">{block.icon}</p>
                <h3 className="mt-3 text-lg font-semibold text-white">{block.title}</h3>
                <p className="mt-2 text-sm text-white/50">{block.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Major vs Minor */}
        <motion.section {...fadeUp} className="mb-16">
          <h2 className="mb-2 text-2xl font-bold text-white">Major vs Minor</h2>
          <p className="mb-6 text-white/50">
            Two scales that define the emotional palette of nearly all Western music.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {majorMinor.map((scale) => (
              <div
                key={scale.type}
                className={`rounded-xl border border-white/10 bg-gradient-to-br ${scale.color} p-6`}
              >
                <h3 className={`text-xl font-bold ${scale.accent}`}>{scale.type}</h3>
                <p className="mt-1 font-mono text-xs text-white/30">{scale.formula}</p>
                <p className="mt-3 text-sm text-white/60">{scale.mood}</p>
                <div className="mt-4 space-y-1.5">
                  {scale.examples.map((ex) => (
                    <div key={ex.song} className="flex items-center justify-between text-sm">
                      <span className="text-white/70">{ex.song}</span>
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/40">
                        {ex.key}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Circle of Fifths */}
        <motion.section {...fadeUp} className="mb-16">
          <h2 className="mb-2 text-2xl font-bold text-white">The Circle of Fifths</h2>
          <p className="mb-6 text-white/50">
            The map of all 12 major keys and how they relate. Moving clockwise adds a sharp;
            moving counterclockwise adds a flat. Adjacent keys share the most notes, making
            modulation between them smooth and natural.
          </p>
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
            {circleOfFifths.map((item) => (
              <div
                key={item.key}
                className="flex flex-col items-center rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center"
              >
                <span className="text-lg font-bold text-cyan-400">{item.key}</span>
                <span className="mt-1 text-xs text-white/30">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-4">
            <p className="text-sm text-white/60">
              <span className="font-semibold text-cyan-400">How to read it:</span> Start at C
              (zero sharps or flats). Move clockwise to G (1 sharp: F#), then D (2 sharps: F#,
              C#), and so on. Move counterclockwise from C to F (1 flat: Bb), then Bb (2 flats:
              Bb, Eb). Keys next to each other on the circle sound closely related.
            </p>
          </div>
        </motion.section>

        {/* Time Signatures */}
        <motion.section {...fadeUp} className="mb-16">
          <h2 className="mb-2 text-2xl font-bold text-white">Time Signatures</h2>
          <p className="mb-6 text-white/50">
            How beats are organized within a measure. The top number counts beats; the bottom
            number defines which note value gets one beat.
          </p>
          <div className="space-y-3">
            {timeSignatures.map((ts) => (
              <div
                key={ts.sig}
                className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-lg bg-cyan-500/10 font-mono text-lg font-bold leading-tight text-cyan-400">
                  <span>{ts.sig.split('/')[0]}</span>
                  <div className="h-px w-6 bg-cyan-400/40" />
                  <span>{ts.sig.split('/')[1]}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">{ts.name}</h3>
                  <p className="mt-1 text-sm text-white/50">{ts.feel}</p>
                  <p className="mt-1 text-xs text-white/30">{ts.examples}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Chord Progressions */}
        <motion.section {...fadeUp} className="mb-16">
          <h2 className="mb-2 text-2xl font-bold text-white">Essential Chord Progressions</h2>
          <p className="mb-6 text-white/50">
            Roman numerals represent chords built on each scale degree. These three progressions
            cover the vast majority of music ever written.
          </p>
          <div className="space-y-4">
            {chordProgressions.map((prog) => (
              <div
                key={prog.name}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-mono text-lg font-bold text-cyan-400">{prog.name}</h3>
                  <span className="rounded-full bg-white/10 px-3 py-0.5 text-xs text-white/40">
                    {prog.label}
                  </span>
                </div>
                <p className="mt-2 text-sm text-white/50">{prog.desc}</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs text-white/30">In C major:</span>
                  <span className="font-mono text-sm font-medium text-white/70">{prog.inC}</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {prog.songs.map((song) => (
                    <span
                      key={song}
                      className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300/70"
                    >
                      {song}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Practice Resources */}
        <motion.section {...fadeUp} className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white">Practice Resources</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {practiceResources.map((res) => (
              <a
                key={res.name}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-cyan-400/30 hover:bg-white/[0.05]"
              >
                <h3 className="font-semibold text-white group-hover:text-cyan-400">{res.name}</h3>
                <p className="mt-2 text-sm text-white/50">{res.desc}</p>
              </a>
            ))}
          </div>
        </motion.section>

        {/* How AI Uses Music Theory */}
        <motion.section {...fadeUp} className="mb-16">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/5 to-violet-500/5 p-8">
            <h2 className="text-2xl font-bold text-white">How AI Uses Music Theory</h2>
            <p className="mt-4 leading-relaxed text-white/60">
              AI music generators like Suno and Udio have internalized music theory at scale.
              When you prompt for a &ldquo;melancholic piano ballad in A minor,&rdquo; the model
              applies minor scale intervals, appropriate chord voicings, and tempo conventions
              learned from millions of tracks. Understanding theory gives you precise control over
              AI output — you stop guessing at prompts and start engineering them.
            </p>
            <p className="mt-3 leading-relaxed text-white/60">
              Knowing the difference between a Dorian mode and a natural minor, or between a
              I-V-vi-IV and a ii-V-I, lets you communicate exactly the sound you hear in your
              head. Theory is the shared vocabulary between human musicians and AI systems.
            </p>
          </div>
        </motion.section>

        {/* Frank's Music */}
        <motion.section {...fadeUp} className="mb-16">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
            <h2 className="text-2xl font-bold text-white">
              Frank&apos;s Music Collection
            </h2>
            <p className="mt-3 text-white/50">
              Explore 12,000+ AI-generated tracks spanning orchestral, electronic, neoclassical,
              and pop — all built on the theory foundations covered here.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/music"
                className="rounded-full bg-cyan-500/20 px-6 py-2.5 text-sm font-medium text-cyan-400 transition hover:bg-cyan-500/30"
              >
                Browse All Music
              </Link>
              <Link
                href="/music/create"
                className="rounded-full border border-white/10 px-6 py-2.5 text-sm font-medium text-white/60 transition hover:border-white/20 hover:text-white/80"
              >
                AI Music Creation
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Navigation */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link
            href="/music/learn/piano"
            className="rounded-full border border-white/10 px-6 py-3 text-sm text-white/60 transition hover:border-white/20 hover:text-white/80"
          >
            Learn Piano
          </Link>
          <Link
            href="/music/learn/production"
            className="rounded-full border border-white/10 px-6 py-3 text-sm text-white/60 transition hover:border-white/20 hover:text-white/80"
          >
            Music Production
          </Link>
          <Link
            href="/music/learn"
            className="rounded-full border border-white/10 px-6 py-3 text-sm text-white/60 transition hover:border-white/20 hover:text-white/80"
          >
            All Instruments
          </Link>
          <Link
            href="/music"
            className="rounded-full border border-white/10 px-6 py-3 text-sm text-white/60 transition hover:border-white/20 hover:text-white/80"
          >
            Music
          </Link>
        </div>
      </div>
    </div>
  )
}
