'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

const youtubeChannels = [
  {
    name: 'Violinspiration',
    handle: '@violinspiration',
    url: 'https://www.youtube.com/@violinspiration',
    lang: 'EN',
    desc: 'Julia Bushkova\'s channel with Suzuki-method lessons, technique breakdowns, and practice routines for beginners through intermediate players.',
  },
  {
    name: 'Hilary Hahn',
    handle: '@hilaryhahn',
    url: 'https://www.youtube.com/@hilaryhahn',
    lang: 'EN',
    desc: 'World-class violinist sharing practice insights, performance clips, and the mindset behind mastering the instrument at the highest level.',
  },
  {
    name: 'TwoSet Violin',
    handle: '@TwoSetViolin',
    url: 'https://www.youtube.com/@TwoSetViolin',
    lang: 'EN',
    desc: 'Entertaining and educational — classical music commentary, technique challenges, and a community of millions. Makes practice feel less solitary.',
  },
  {
    name: 'Esther Abrami',
    handle: '@EstherAbrami',
    url: 'https://www.youtube.com/@EstherAbrami',
    lang: 'EN',
    desc: 'Making classical violin accessible to a modern audience. Beautiful performances and behind-the-scenes looks at a professional violinist\'s life.',
  },
  {
    name: 'Antoine Morales',
    handle: '@AntoineMoralesViolin',
    url: 'https://www.youtube.com/@AntoineMoralesViolin',
    lang: 'DE',
    desc: 'Methodical German violin lessons with clear explanations. Excellent for German-speaking learners who want structured, step-by-step progression.',
  },
  {
    name: 'Violin MD',
    handle: '@ViolinMD',
    url: 'https://www.youtube.com/@ViolinMD',
    lang: 'EN',
    desc: 'Structured lessons covering technique, repertoire, and practice strategies. Well-organized content for self-directed learners.',
  },
]

const fourStrings = [
  { note: 'G', pitch: 'Lowest', color: 'from-amber-500/20 to-amber-600/5', accent: 'text-amber-400', desc: 'Rich, warm tone. The foundation string for deep melodies and lower register playing.' },
  { note: 'D', pitch: 'Low-Mid', color: 'from-emerald-500/20 to-emerald-600/5', accent: 'text-emerald-400', desc: 'Versatile middle string. Many folk and classical melodies sit naturally on the D string.' },
  { note: 'A', pitch: 'Mid-High', color: 'from-blue-500/20 to-blue-600/5', accent: 'text-blue-400', desc: 'Bright, singing quality. The primary melody string for most beginner and intermediate repertoire.' },
  { note: 'E', pitch: 'Highest', color: 'from-violet-500/20 to-violet-600/5', accent: 'text-violet-400', desc: 'Brilliant, piercing tone. Used for soaring melodies and virtuosic passages in upper positions.' },
]

const firstPieces = [
  { title: 'Twinkle Twinkle (Suzuki)', composer: 'Traditional / Suzuki', difficulty: 1, genre: 'Method' },
  { title: 'Lightly Row', composer: 'Traditional / Suzuki', difficulty: 1, genre: 'Folk' },
  { title: 'Allegro', composer: 'Suzuki Book 1', difficulty: 1, genre: 'Classical' },
  { title: 'Long Long Ago', composer: 'T.H. Bayly / Suzuki', difficulty: 2, genre: 'Classical' },
  { title: 'Minuet No. 1', composer: 'J.S. Bach / Suzuki', difficulty: 2, genre: 'Baroque' },
  { title: 'Hunters\' Chorus', composer: 'Weber / Suzuki', difficulty: 2, genre: 'Classical' },
  { title: 'Gavotte in D Major', composer: 'J.S. Bach', difficulty: 3, genre: 'Baroque' },
  { title: 'Concerto in A Minor', composer: 'Vivaldi', difficulty: 3, genre: 'Baroque' },
  { title: 'Czardas', composer: 'Monti', difficulty: 4, genre: 'Hungarian' },
  { title: 'Meditation from Thais', composer: 'Massenet', difficulty: 4, genre: 'Romantic' },
]

const sheetMusicSources = [
  { name: 'MuseScore', url: 'https://musescore.com', desc: 'Community sheet music with playback, transposition, and part extraction for violin' },
  { name: 'IMSLP', url: 'https://imslp.org', desc: 'Enormous public domain archive — Suzuki books, concertos, sonatas, chamber music parts' },
  { name: 'Violinspiration Free Sheets', url: 'https://violinspiration.com/free-violin-sheet-music/', desc: 'Curated free sheet music organized by difficulty level with play-along tracks' },
]

const inspiringViolinists = [
  { name: 'Karolina Protsenko', desc: 'Young street performer turned viral sensation. Proof that dedication and public performance accelerate growth.' },
  { name: 'Anne-Sophie Mutter', desc: 'One of the greatest living violinists. Her interpretations of Mozart and Beethoven set the standard for classical excellence.' },
  { name: 'Lindsey Stirling', desc: 'Bridged violin and electronic music, performing while dancing. Expanded what the instrument can be in modern pop culture.' },
  { name: 'David Garrett', desc: 'Classical virtuoso who crossed into rock and pop. Holds the Guinness record for fastest violin playing.' },
  { name: 'Itzhak Perlman', desc: 'Legendary performer and teacher whose warmth and technical mastery have defined violin playing for half a century.' },
]

const practiceTips = [
  { title: 'Posture Before Notes', desc: 'Spend the first week perfecting your hold — chin rest contact, straight wrist, relaxed shoulders. Bad posture compounds into injury.' },
  { title: 'Open Strings Daily', desc: 'Even advanced players warm up with open string bowing. Focus on straight bow path, consistent contact point, and even tone.' },
  { title: 'Tune By Ear, Verify With App', desc: 'Develop relative pitch by tuning your A string to a reference, then tuning G-D-E in perfect fifths. Check with a chromatic tuner.' },
  { title: 'Slow Practice With Metronome', desc: 'Set the metronome to half your target tempo. Clean intonation at slow speed transfers to fast playing. Sloppy slow practice does not.' },
  { title: 'Scales In Every Key', desc: 'Two-octave scales build finger patterns, shifting confidence, and intonation. Prioritize G, D, A, and B-flat major first.' },
  { title: 'Record and Compare', desc: 'Record yourself playing a passage, then listen to a professional recording of the same piece. The gap reveals your next practice focus.' },
]

const aiTools = [
  { name: 'Trala', desc: 'AI violin tutor with real-time pitch detection. Identifies intonation errors note-by-note and tracks improvement over time.' },
  { name: 'Tunable / Pano Tuner', desc: 'Chromatic tuners with visual pitch feedback. Essential for developing accurate intonation when practicing alone.' },
  { name: 'Modacity', desc: 'Practice journal and tracker designed for string players. Set goals, log sessions, and visualize progress patterns.' },
  { name: 'Tomplay', desc: 'Interactive sheet music with orchestra accompaniment. Play along with professional backing tracks at adjustable tempos.' },
]

export default function ViolinLearnPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:py-24">
        {/* Hero */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <p className="text-5xl">🎻</p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Learn Violin
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
            A curated guide to learning violin — from holding the bow to performing concertos. The best teachers, Suzuki method progression, free sheet music, and AI tools that sharpen your intonation and accelerate your growth.
          </p>
        </motion.header>

        {/* Why Violin */}
        <motion.section {...fadeUp} className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white">Why Violin?</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                title: 'Emotional Expression',
                desc: 'The violin is the closest instrument to the human voice. It can whisper, cry, soar, and rage — often within a single phrase.',
                icon: '🎶',
              },
              {
                title: 'Orchestral Versatility',
                desc: 'From solo concertos to string quartets to film scores, the violin sits at the center of Western music\'s most powerful ensembles.',
                icon: '🏛️',
              },
              {
                title: 'Discipline That Transfers',
                desc: 'Violin demands precision, patience, and daily commitment. The discipline built here strengthens every other area of your life.',
                icon: '⚡',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-6"
              >
                <p className="text-2xl">{item.icon}</p>
                <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-white/50">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* The 4 Strings */}
        <motion.section {...fadeUp} className="mb-16">
          <h2 className="mb-2 text-2xl font-bold text-white">The 4 Strings</h2>
          <p className="mb-6 text-white/50">From lowest to highest pitch — each string has a distinct character.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {fourStrings.map((s) => (
              <div
                key={s.note}
                className={`rounded-xl border border-white/10 bg-gradient-to-br ${s.color} p-5`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-3xl font-black ${s.accent}`}>{s.note}</span>
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/40">{s.pitch}</span>
                </div>
                <p className="mt-2 text-sm text-white/50">{s.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Getting Started */}
        <motion.section {...fadeUp} className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white">Getting Started: Foundations First</h2>
          <div className="space-y-4">
            {[
              { step: 1, title: 'Master Your Posture', desc: 'Stand straight, chin rests gently on the chin rest, left hand supports the neck without gripping. The violin should feel balanced, not clamped.' },
              { step: 2, title: 'Learn the Bow Hold', desc: 'Curved fingers, relaxed thumb on the frog, pinky on top for balance. The bow hold determines your entire tone quality — spend real time here.' },
              { step: 3, title: 'Play Open Strings', desc: 'Draw the bow across G, D, A, and E strings individually. Focus on straight bowing, consistent pressure, and a clear, even tone without scratching.' },
              { step: 4, title: 'Start the Suzuki Method', desc: 'Begin with "Twinkle Twinkle" variations — they teach rhythm patterns, bow control, and basic finger placement on the A and E strings.' },
              { step: 5, title: 'Build Daily Practice Habits', desc: '15-20 minutes daily: 5 min open strings, 5 min scales, 10 min current piece. Increase duration gradually as stamina builds.' },
            ].map((item) => (
              <div
                key={item.step}
                className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-sm font-bold text-violet-400">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="mt-1 text-sm text-white/50">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* YouTube Teachers */}
        <motion.section {...fadeUp} className="mb-16">
          <h2 className="mb-2 text-2xl font-bold text-white">Best YouTube Violin Teachers</h2>
          <p className="mb-6 text-white/50">Curated channels for structured learning and musical inspiration.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {youtubeChannels.map((ch) => (
              <a
                key={ch.handle}
                href={ch.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-violet-400/30 hover:bg-white/[0.05]"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white group-hover:text-violet-400">{ch.name}</h3>
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/40">{ch.lang}</span>
                </div>
                <p className="mt-1 text-xs text-white/30">{ch.handle}</p>
                <p className="mt-2 text-sm text-white/50">{ch.desc}</p>
              </a>
            ))}
          </div>
        </motion.section>

        {/* First 10 Pieces */}
        <motion.section {...fadeUp} className="mb-16">
          <h2 className="mb-2 text-2xl font-bold text-white">Your First 10 Pieces</h2>
          <p className="mb-6 text-white/50">A Suzuki-inspired progression from first notes to intermediate repertoire.</p>
          <div className="overflow-hidden rounded-xl border border-white/10">
            <div className="hidden grid-cols-[1fr_1fr_auto_auto] gap-4 border-b border-white/10 bg-white/[0.05] px-5 py-3 text-xs font-medium uppercase tracking-wider text-white/40 sm:grid">
              <span>Title</span>
              <span>Composer</span>
              <span>Genre</span>
              <span>Level</span>
            </div>
            {firstPieces.map((piece, i) => (
              <div
                key={piece.title}
                className={`grid grid-cols-1 gap-1 px-5 py-3 sm:grid-cols-[1fr_1fr_auto_auto] sm:gap-4 sm:items-center ${
                  i % 2 === 0 ? 'bg-white/[0.02]' : 'bg-white/[0.04]'
                }`}
              >
                <span className="font-medium text-white">{piece.title}</span>
                <span className="text-sm text-white/50">{piece.composer}</span>
                <span className="text-xs text-white/30">{piece.genre}</span>
                <span className="flex gap-0.5">
                  {Array.from({ length: 5 }, (_, j) => (
                    <span
                      key={j}
                      className={`h-1.5 w-3 rounded-full ${
                        j < piece.difficulty ? 'bg-violet-400' : 'bg-white/10'
                      }`}
                    />
                  ))}
                </span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Free Sheet Music */}
        <motion.section {...fadeUp} className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white">Free Sheet Music Resources</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {sheetMusicSources.map((src) => (
              <a
                key={src.name}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-violet-400/30"
              >
                <h3 className="font-semibold text-white group-hover:text-violet-400">{src.name}</h3>
                <p className="mt-2 text-sm text-white/50">{src.desc}</p>
              </a>
            ))}
          </div>
        </motion.section>

        {/* Inspiring Violinists */}
        <motion.section {...fadeUp} className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white">Inspiring Violinists</h2>
          <div className="space-y-3">
            {inspiringViolinists.map((v) => (
              <div
                key={v.name}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
              >
                <h3 className="font-semibold text-white">{v.name}</h3>
                <p className="mt-1 text-sm text-white/50">{v.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Practice Tips */}
        <motion.section {...fadeUp} className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white">Violin-Specific Practice Tips</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {practiceTips.map((tip) => (
              <div
                key={tip.title}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
              >
                <h3 className="font-semibold text-violet-400">{tip.title}</h3>
                <p className="mt-2 text-sm text-white/50">{tip.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* AI Tools */}
        <motion.section {...fadeUp} className="mb-16">
          <h2 className="mb-2 text-2xl font-bold text-white">AI Tools for Violin</h2>
          <p className="mb-6 text-white/50">Technology that listens to your playing and helps you improve faster.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {aiTools.map((tool) => (
              <div
                key={tool.name}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
              >
                <h3 className="font-semibold text-blue-400">{tool.name}</h3>
                <p className="mt-2 text-sm text-white/50">{tool.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Frank's Orchestral Music */}
        <motion.section {...fadeUp} className="mb-16">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/5 to-blue-500/5 p-8 text-center">
            <h2 className="text-2xl font-bold text-white">Frank&apos;s Orchestral Music</h2>
            <p className="mt-3 text-white/50">
              Explore AI-generated orchestral and string compositions — from cinematic scores to neoclassical arrangements.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/music"
                className="rounded-full bg-violet-500/20 px-6 py-2.5 text-sm font-medium text-violet-400 transition hover:bg-violet-500/30"
              >
                Browse All Music
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
            🎹 Learn Piano
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
