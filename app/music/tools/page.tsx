'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

type PriceTier = 'Free' | 'Freemium' | 'Paid'

interface Tool {
  name: string
  emoji: string
  description: string
  why: string
  price: PriceTier
  platforms: string[]
  url: string
  badge?: string
}

interface Category {
  title: string
  emoji: string
  color: string
  badgeBg: string
  tools: Tool[]
}

const categories: Category[] = [
  {
    title: 'Learning & Practice',
    emoji: '🎓',
    color: 'from-emerald-500/20 to-emerald-500/5',
    badgeBg: 'bg-emerald-500/20 text-emerald-400',
    tools: [
      {
        name: 'Simply Piano',
        emoji: '🎹',
        description: 'Gamified piano learning with instant feedback on your playing.',
        why: 'Best onboarding experience for absolute beginners.',
        price: 'Freemium',
        platforms: ['iOS', 'Android'],
        url: 'https://www.joytunes.com/simply-piano',
      },
      {
        name: 'Yousician',
        emoji: '🎸',
        description: 'Multi-instrument lessons with real-time listening technology.',
        why: 'Covers guitar, piano, bass, ukulele, and singing in one app.',
        price: 'Freemium',
        platforms: ['iOS', 'Android', 'Web'],
        url: 'https://yousician.com',
      },
      {
        name: 'Trala',
        emoji: '🎻',
        description: 'Violin learning with AI-powered pitch and bowing feedback.',
        why: 'Real-time AI feedback catches technique issues a book never could.',
        price: 'Freemium',
        platforms: ['iOS', 'Android'],
        url: 'https://trala.com',
      },
      {
        name: 'flowkey',
        emoji: '🎵',
        description: 'Premium piano courses from beginner to advanced repertoire.',
        why: 'Beautiful song library and wait mode that adapts to your pace.',
        price: 'Freemium',
        platforms: ['iOS', 'Android', 'Web'],
        url: 'https://www.flowkey.com',
      },
      {
        name: 'Fender Play',
        emoji: '🤘',
        description: 'Structured guitar, bass, and ukulele courses from Fender.',
        why: 'Learn songs you actually want to play, organized by genre.',
        price: 'Paid',
        platforms: ['iOS', 'Android', 'Web'],
        url: 'https://www.fender.com/play',
      },
    ],
  },
  {
    title: 'Music Theory',
    emoji: '🧠',
    color: 'from-violet-500/20 to-violet-500/5',
    badgeBg: 'bg-violet-500/20 text-violet-400',
    tools: [
      {
        name: 'Teoria',
        emoji: '📐',
        description: 'Interactive theory exercises covering intervals, scales, and chords.',
        why: 'Clean, distraction-free drills that build real theoretical fluency.',
        price: 'Free',
        platforms: ['Web'],
        url: 'https://www.teoria.com',
      },
      {
        name: 'musictheory.net',
        emoji: '📖',
        description: 'Step-by-step interactive music theory lessons.',
        why: 'The gold standard for self-paced theory education, completely free.',
        price: 'Free',
        platforms: ['Web'],
        url: 'https://www.musictheory.net',
      },
      {
        name: 'Tenuto',
        emoji: '✏️',
        description: 'Customizable theory exercises and drills for serious students.',
        why: 'The companion app to musictheory.net with deeper practice modes.',
        price: 'Paid',
        platforms: ['iOS'],
        url: 'https://www.musictheory.net/products/tenuto',
      },
      {
        name: 'Functional Ear Trainer',
        emoji: '👂',
        description: 'Train your ear to recognize intervals and scale degrees.',
        why: 'Develops relative pitch systematically through functional context.',
        price: 'Free',
        platforms: ['iOS', 'Android'],
        url: 'https://www.miles.be/software/34-functional-ear-trainer-v2',
      },
    ],
  },
  {
    title: 'Practice Tools',
    emoji: '🔧',
    color: 'from-cyan-500/20 to-cyan-500/5',
    badgeBg: 'bg-cyan-500/20 text-cyan-400',
    tools: [
      {
        name: 'Metronome by Soundbrenner',
        emoji: '⏱️',
        description: 'Precision metronome with polyrhythms and set lists.',
        why: 'The most versatile metronome app, period.',
        price: 'Free',
        platforms: ['iOS', 'Android', 'Web'],
        url: 'https://www.soundbrenner.com/the-metronome-app',
      },
      {
        name: 'TonalEnergy',
        emoji: '🎯',
        description: 'Chromatic tuner, metronome, recorder, and analysis in one.',
        why: 'Swiss army knife for instrumentalists who care about intonation.',
        price: 'Paid',
        platforms: ['iOS', 'Android'],
        url: 'https://tonalenergy.com',
      },
      {
        name: 'iReal Pro',
        emoji: '🎷',
        description: 'Realistic backing tracks for practicing jazz, pop, and more.',
        why: 'Like having a band ready to jam whenever you want to practice.',
        price: 'Paid',
        platforms: ['iOS', 'Android'],
        url: 'https://www.irealpro.com',
      },
      {
        name: 'Anytune',
        emoji: '🐌',
        description: 'Slow down any song without changing pitch to learn by ear.',
        why: 'Essential for transcribing solos and learning complex passages.',
        price: 'Freemium',
        platforms: ['iOS'],
        url: 'https://anytune.us',
      },
    ],
  },
  {
    title: 'Sheet Music',
    emoji: '🎼',
    color: 'from-amber-500/20 to-amber-500/5',
    badgeBg: 'bg-amber-500/20 text-amber-400',
    tools: [
      {
        name: 'MuseScore',
        emoji: '🖊️',
        description: 'Free notation software and the world\'s largest sheet music library.',
        why: 'Professional-quality notation without spending a cent.',
        price: 'Free',
        platforms: ['Desktop', 'iOS', 'Android', 'Web'],
        url: 'https://musescore.org',
      },
      {
        name: 'IMSLP',
        emoji: '📚',
        description: 'Public domain classical sheet music library with 200,000+ scores.',
        why: 'Every classical piece you could ever want, legally free.',
        price: 'Free',
        platforms: ['Web'],
        url: 'https://imslp.org',
      },
      {
        name: 'Noteflight',
        emoji: '☁️',
        description: 'Browser-based music notation editor with sharing and playback.',
        why: 'Compose and arrange from any device with zero installs.',
        price: 'Freemium',
        platforms: ['Web'],
        url: 'https://www.noteflight.com',
      },
      {
        name: 'Ultimate Guitar',
        emoji: '🎸',
        description: 'Massive database of guitar tabs, chords, and lyrics.',
        why: 'The definitive tab resource for guitarists worldwide.',
        price: 'Freemium',
        platforms: ['iOS', 'Android', 'Web'],
        url: 'https://www.ultimate-guitar.com',
      },
    ],
  },
  {
    title: 'AI Music Creation',
    emoji: '🤖',
    color: 'from-rose-500/20 to-rose-500/5',
    badgeBg: 'bg-rose-500/20 text-rose-400',
    tools: [
      {
        name: 'Suno AI',
        emoji: '🎤',
        description: 'Generate full songs from text prompts with vocals, instruments, and production.',
        why: 'The most expressive AI music tool available today.',
        price: 'Freemium',
        platforms: ['Web'],
        url: 'https://suno.com',
        badge: "Frank's primary tool",
      },
      {
        name: 'Udio',
        emoji: '🎧',
        description: 'AI music generation with fine-grained style and structure control.',
        why: 'Excellent at specific genres and sonic textures.',
        price: 'Freemium',
        platforms: ['Web'],
        url: 'https://www.udio.com',
      },
      {
        name: 'AIVA',
        emoji: '🎬',
        description: 'AI composer trained on classical masters for film and game scoring.',
        why: 'Best-in-class for orchestral and cinematic compositions.',
        price: 'Freemium',
        platforms: ['Web'],
        url: 'https://www.aiva.ai',
      },
      {
        name: 'Soundraw',
        emoji: '🎚️',
        description: 'Customizable AI-generated music with full editing control.',
        why: 'Tweak every section, tempo, and instrument after generation.',
        price: 'Paid',
        platforms: ['Web'],
        url: 'https://soundraw.io',
      },
    ],
  },
  {
    title: 'Recording & Production',
    emoji: '🎙️',
    color: 'from-blue-500/20 to-blue-500/5',
    badgeBg: 'bg-blue-500/20 text-blue-400',
    tools: [
      {
        name: 'GarageBand',
        emoji: '🍎',
        description: 'Apple\'s free DAW with instruments, loops, and recording.',
        why: 'The best free starting point for music production on Apple devices.',
        price: 'Free',
        platforms: ['iOS', 'Mac'],
        url: 'https://www.apple.com/garageband/',
      },
      {
        name: 'BandLab',
        emoji: '🌐',
        description: 'Collaborative online DAW with social features and free mastering.',
        why: 'Full DAW in your browser with zero cost and real-time collaboration.',
        price: 'Free',
        platforms: ['Web', 'iOS', 'Android'],
        url: 'https://www.bandlab.com',
      },
      {
        name: 'Audacity',
        emoji: '🔊',
        description: 'Open-source audio editor for recording, editing, and effects.',
        why: 'The workhorse audio editor that has served musicians for decades.',
        price: 'Free',
        platforms: ['Desktop'],
        url: 'https://www.audacityteam.org',
      },
      {
        name: 'FL Studio',
        emoji: '🎛️',
        description: 'Professional DAW with lifetime free updates and mobile companion.',
        why: 'Industry-standard for beat-making and electronic production.',
        price: 'Paid',
        platforms: ['Desktop', 'iOS', 'Android'],
        url: 'https://www.image-line.com',
      },
    ],
  },
]

const priceBadgeStyles: Record<PriceTier, string> = {
  Free: 'bg-green-500/20 text-green-400',
  Freemium: 'bg-yellow-500/20 text-yellow-400',
  Paid: 'bg-red-500/20 text-red-400',
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.04, duration: 0.4, ease: 'easeOut' },
  }),
}

export default function MusicToolsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <p className="text-5xl">🛠️</p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Music Tools & Apps
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
            A curated collection of the best digital tools for modern musicians.
            From AI composition engines to practice companions, selected with an
            architect&apos;s eye for quality and utility.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-white/40">
            {categories.map((cat) => (
              <a
                key={cat.title}
                href={`#${cat.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="rounded-full border border-white/10 px-4 py-1.5 transition hover:border-white/20 hover:text-white/60"
              >
                {cat.emoji} {cat.title}
              </a>
            ))}
          </div>
        </motion.header>

        {/* Categories */}
        <div className="space-y-16">
          {categories.map((category, catIndex) => (
            <motion.section
              key={category.title}
              id={category.title.toLowerCase().replace(/\s+/g, '-')}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: catIndex * 0.05 }}
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="text-3xl">{category.emoji}</span>
                <h2 className="text-2xl font-bold text-white">{category.title}</h2>
                <span className={`rounded-full px-3 py-0.5 text-xs font-medium ${category.badgeBg}`}>
                  {category.tools.length} tools
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {category.tools.map((tool, toolIndex) => (
                  <motion.a
                    key={tool.name}
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    custom={toolIndex}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className={`group relative rounded-2xl border border-white/[0.08] bg-gradient-to-b ${category.color} p-5 transition-all duration-300 hover:border-white/20 hover:shadow-lg hover:shadow-white/[0.02]`}
                  >
                    {tool.badge && (
                      <span className="absolute -top-2.5 right-4 rounded-full bg-rose-500/90 px-3 py-0.5 text-xs font-semibold text-white shadow-lg">
                        {tool.badge}
                      </span>
                    )}

                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 text-2xl">{tool.emoji}</span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-white group-hover:text-white/90">
                            {tool.name}
                          </h3>
                          <svg
                            className="h-3.5 w-3.5 text-white/30 transition group-hover:text-white/60"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </div>
                        <p className="mt-1 text-sm leading-relaxed text-white/50">
                          {tool.description}
                        </p>
                        <p className="mt-2 text-xs italic text-white/40">
                          &ldquo;{tool.why}&rdquo;
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${priceBadgeStyles[tool.price]}`}
                      >
                        {tool.price}
                      </span>
                      {tool.platforms.map((platform) => (
                        <span
                          key={platform}
                          className="rounded-full bg-white/[0.06] px-2.5 py-0.5 text-xs text-white/40"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Bottom Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-wrap justify-center gap-4"
        >
          <Link
            href="/music/learn"
            className="rounded-full border border-white/10 px-6 py-3 text-sm text-white/60 transition hover:border-white/20 hover:text-white/80"
          >
            🎓 Learn Music
          </Link>
          <Link
            href="/music"
            className="rounded-full border border-white/10 px-6 py-3 text-sm text-white/60 transition hover:border-white/20 hover:text-white/80"
          >
            🎵 Music Hub
          </Link>
          <Link
            href="/acos"
            className="rounded-full border border-white/10 px-6 py-3 text-sm text-white/60 transition hover:border-white/20 hover:text-white/80"
          >
            🧠 ACOS
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
