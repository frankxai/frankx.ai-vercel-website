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
    name: 'Nahre Sol',
    handle: '@nahresol',
    url: 'https://www.youtube.com/@nahresol',
    lang: 'EN',
    desc: 'Concert pianist exploring theory, composition, and the creative side of piano. Beautifully produced videos that bridge classical training with modern musicianship.',
  },
  {
    name: 'Pianote',
    handle: '@Pianote',
    url: 'https://www.youtube.com/@Pianote',
    lang: 'EN',
    desc: 'Beginner-friendly lessons with structured courses. Great for adults starting from zero with clear, patient instruction.',
  },
  {
    name: 'Thomas Forschbach',
    handle: '@werdemusiker',
    url: 'https://www.youtube.com/@werdemusiker',
    lang: 'DE',
    desc: 'Germany\'s largest piano YouTube channel with 350K+ subscribers. Practical lessons, song tutorials, and music theory in German.',
  },
  {
    name: 'Fanny Engelhart',
    handle: '@FannyEngelhart',
    url: 'https://www.youtube.com/@FannyEngelhart',
    lang: 'DE',
    desc: 'Patient, methodical German piano teacher. Excellent for beginners who prefer a calm, structured approach to learning.',
  },
  {
    name: 'Rousseau',
    handle: '@Rousseau',
    url: 'https://www.youtube.com/@Rousseau',
    lang: 'EN',
    desc: 'Mesmerizing visual piano performances with falling-note animations. Perfect for learning by watching and absorbing repertoire.',
  },
  {
    name: 'Zapiano',
    handle: '@Zapiano',
    url: 'https://www.youtube.com/@Zapiano',
    lang: 'DE/EN',
    desc: 'Bite-sized 3-minute practice sessions. Ideal for building a consistent daily habit without overwhelm.',
  },
]

const firstSongs = [
  { title: 'Ode to Joy', composer: 'Beethoven', difficulty: 1, genre: 'Classical' },
  { title: 'Twinkle Twinkle Little Star', composer: 'Traditional', difficulty: 1, genre: 'Folk' },
  { title: 'Lean on Me', composer: 'Bill Withers', difficulty: 2, genre: 'Pop/Soul' },
  { title: 'Prelude in C Major', composer: 'J.S. Bach', difficulty: 2, genre: 'Classical' },
  { title: 'Clocks', composer: 'Coldplay', difficulty: 2, genre: 'Pop/Rock' },
  { title: 'River Flows in You', composer: 'Yiruma', difficulty: 3, genre: 'Contemporary' },
  { title: 'Comptine d\'un autre ete', composer: 'Yann Tiersen', difficulty: 3, genre: 'Film' },
  { title: 'Fur Elise', composer: 'Beethoven', difficulty: 3, genre: 'Classical' },
  { title: 'Someone Like You', composer: 'Adele', difficulty: 3, genre: 'Pop' },
  { title: 'Clair de Lune', composer: 'Debussy', difficulty: 4, genre: 'Classical' },
]

const sheetMusicSources = [
  { name: 'MuseScore', url: 'https://musescore.com', desc: 'Community-driven sheet music library with playback and transposition tools' },
  { name: 'IMSLP', url: 'https://imslp.org', desc: 'The Petrucci Music Library — massive archive of public domain classical scores' },
  { name: 'MoupMoup', url: 'https://www.moupmoup.com', desc: 'Free piano sheet music with clear arrangements for various skill levels' },
  { name: 'Klavierkranich', url: 'https://www.klavierkranich.de', desc: 'German resource with free sheet music and piano learning materials' },
]

const practiceTips = [
  { title: 'Start Slow, Build Speed', desc: 'Practice at 60% tempo until accuracy is consistent. Speed follows precision, never the reverse.' },
  { title: 'Hands Separately First', desc: 'Master each hand independently before combining. This builds clean muscle memory from the start.' },
  { title: 'Short Sessions, High Focus', desc: '25 minutes of focused practice outperforms 2 hours of distracted playing. Use a timer.' },
  { title: 'Loop Difficult Passages', desc: 'Isolate the 4-8 bars that challenge you. Repeat them 10 times correctly before moving on.' },
  { title: 'Record Yourself Weekly', desc: 'Audio recordings reveal issues your ears miss in real-time. Track progress month over month.' },
  { title: 'Always Warm Up', desc: 'Begin with scales or Hanon exercises. Cold muscles lead to tension and bad habits.' },
]

const aiTools = [
  { name: 'Simply Piano', desc: 'Real-time feedback on your playing via microphone. Gamified progression system.' },
  { name: 'flowkey', desc: 'Premium song library with slow-motion playback and hand-separation modes.' },
  { name: 'Synthesia', desc: 'Visual falling-note display synced to MIDI. Learn songs by sight without reading notation.' },
  { name: 'Piano Marvel', desc: 'Adaptive assessment system that adjusts difficulty based on your performance data.' },
]

export default function PianoLearnPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:py-24">
        {/* Hero */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <p className="text-5xl">🎹</p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Learn Piano
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
            A curated guide to learning piano in the age of AI — from your first chord to concert-level repertoire. The best teachers, free sheet music, structured practice methods, and AI-powered tools that accelerate every stage of your journey.
          </p>
        </motion.header>

        {/* Why Piano */}
        <motion.section {...fadeUp} className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white">Why Piano?</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                title: 'Universal Versatility',
                desc: 'Piano spans every genre — classical, jazz, pop, electronic, film scoring. One instrument, infinite possibilities.',
                icon: '🎵',
              },
              {
                title: 'Music Theory Foundation',
                desc: 'The keyboard layout makes theory visual and intuitive. Scales, chords, and intervals become tangible patterns you can see.',
                icon: '📐',
              },
              {
                title: 'AI-Compatible Instrument',
                desc: 'MIDI keyboards connect directly to DAWs and AI composition tools. Piano is the native language of digital music production.',
                icon: '🤖',
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

        {/* Getting Started */}
        <motion.section {...fadeUp} className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white">Getting Started: 5-Step Quickstart</h2>
          <div className="space-y-4">
            {[
              { step: 1, title: 'Find Middle C', desc: 'Locate the C nearest the center of your keyboard. This is your home base. Every piece of music references this position.' },
              { step: 2, title: 'Learn the C Major Scale', desc: 'Play C-D-E-F-G-A-B-C with proper fingering (1-2-3, thumb under, 1-2-3-4-5). This scale uses only white keys and teaches hand position.' },
              { step: 3, title: 'Master 3 Essential Chords', desc: 'Learn C major (C-E-G), F major (F-A-C), and G major (G-B-D). These three chords unlock hundreds of songs.' },
              { step: 4, title: 'Play Your First Song', desc: 'Start with a simple melody like "Ode to Joy" or "Twinkle Twinkle." Play right hand melody first, then add left hand bass notes.' },
              { step: 5, title: 'Build a Practice Routine', desc: 'Set 20 minutes daily: 5 min warm-up scales, 10 min current piece, 5 min sight-reading or improvisation. Consistency beats marathon sessions.' },
            ].map((item) => (
              <div
                key={item.step}
                className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-sm font-bold text-blue-400">
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
          <h2 className="mb-2 text-2xl font-bold text-white">Best YouTube Piano Teachers</h2>
          <p className="mb-6 text-white/50">Curated channels for every learning style — English and German.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {youtubeChannels.map((ch) => (
              <a
                key={ch.handle}
                href={ch.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-blue-400/30 hover:bg-white/[0.05]"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white group-hover:text-blue-400">{ch.name}</h3>
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/40">{ch.lang}</span>
                </div>
                <p className="mt-1 text-xs text-white/30">{ch.handle}</p>
                <p className="mt-2 text-sm text-white/50">{ch.desc}</p>
              </a>
            ))}
          </div>
        </motion.section>

        {/* First 10 Songs */}
        <motion.section {...fadeUp} className="mb-16">
          <h2 className="mb-2 text-2xl font-bold text-white">Your First 10 Songs</h2>
          <p className="mb-6 text-white/50">Sorted by difficulty. Build confidence with early wins, then level up.</p>
          <div className="overflow-hidden rounded-xl border border-white/10">
            <div className="hidden grid-cols-[1fr_1fr_auto_auto] gap-4 border-b border-white/10 bg-white/[0.05] px-5 py-3 text-xs font-medium uppercase tracking-wider text-white/40 sm:grid">
              <span>Title</span>
              <span>Composer</span>
              <span>Genre</span>
              <span>Level</span>
            </div>
            {firstSongs.map((song, i) => (
              <div
                key={song.title}
                className={`grid grid-cols-1 gap-1 px-5 py-3 sm:grid-cols-[1fr_1fr_auto_auto] sm:gap-4 sm:items-center ${
                  i % 2 === 0 ? 'bg-white/[0.02]' : 'bg-white/[0.04]'
                }`}
              >
                <span className="font-medium text-white">{song.title}</span>
                <span className="text-sm text-white/50">{song.composer}</span>
                <span className="text-xs text-white/30">{song.genre}</span>
                <span className="flex gap-0.5">
                  {Array.from({ length: 5 }, (_, j) => (
                    <span
                      key={j}
                      className={`h-1.5 w-3 rounded-full ${
                        j < song.difficulty ? 'bg-blue-400' : 'bg-white/10'
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
          <div className="grid gap-4 sm:grid-cols-2">
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

        {/* Practice Tips */}
        <motion.section {...fadeUp} className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white">Evidence-Based Practice Tips</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {practiceTips.map((tip) => (
              <div
                key={tip.title}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
              >
                <h3 className="font-semibold text-blue-400">{tip.title}</h3>
                <p className="mt-2 text-sm text-white/50">{tip.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* AI Tools */}
        <motion.section {...fadeUp} className="mb-16">
          <h2 className="mb-2 text-2xl font-bold text-white">AI-Powered Piano Tools</h2>
          <p className="mb-6 text-white/50">Technology that listens, adapts, and accelerates your progress.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {aiTools.map((tool) => (
              <div
                key={tool.name}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
              >
                <h3 className="font-semibold text-violet-400">{tool.name}</h3>
                <p className="mt-2 text-sm text-white/50">{tool.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* How AI Changes Piano Learning */}
        <motion.section {...fadeUp} className="mb-16">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/5 to-violet-500/5 p-8">
            <h2 className="text-2xl font-bold text-white">How AI Is Changing Piano Learning</h2>
            <p className="mt-4 text-white/60 leading-relaxed">
              AI-powered apps can now listen to your playing through a microphone or MIDI connection and provide instant feedback on timing, dynamics, and accuracy — something that previously required a human teacher in the room. Practice tracking algorithms identify your weak spots and generate targeted exercises. Generative AI can compose custom etudes at your exact skill level, and adaptive platforms adjust difficulty in real-time based on your performance data.
            </p>
            <p className="mt-3 text-white/60 leading-relaxed">
              The result: the gap between self-taught and formally trained pianists is narrowing. AI handles the repetitive correction work, freeing human teachers to focus on musicality, interpretation, and artistic expression.
            </p>
          </div>
        </motion.section>

        {/* Frank's Piano Music */}
        <motion.section {...fadeUp} className="mb-16">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
            <h2 className="text-2xl font-bold text-white">Frank&apos;s Piano Music</h2>
            <p className="mt-3 text-white/50">
              Explore AI-generated piano compositions — from neoclassical pieces to cinematic instrumentals.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/music"
                className="rounded-full bg-blue-500/20 px-6 py-2.5 text-sm font-medium text-blue-400 transition hover:bg-blue-500/30"
              >
                Browse All Music
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Navigation */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link
            href="/music/learn/violin"
            className="rounded-full border border-white/10 px-6 py-3 text-sm text-white/60 transition hover:border-white/20 hover:text-white/80"
          >
            🎻 Learn Violin
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
