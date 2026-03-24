'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

const productionChain = [
  {
    step: 1,
    title: 'Composition',
    desc: 'Writing melodies, harmonies, and lyrics. The creative seed — every track starts with an idea, whether hummed into a phone or sketched on a MIDI keyboard.',
    icon: '✍️',
  },
  {
    step: 2,
    title: 'Arrangement',
    desc: 'Structuring the song: intro, verse, pre-chorus, chorus, bridge, outro. Deciding which instruments play when, building and releasing energy across the timeline.',
    icon: '🏗️',
  },
  {
    step: 3,
    title: 'Recording',
    desc: 'Capturing audio — microphones for vocals and acoustic instruments, DI boxes for electric guitar, MIDI controllers for virtual instruments. Room acoustics matter enormously.',
    icon: '🎙️',
  },
  {
    step: 4,
    title: 'Mixing',
    desc: 'Balancing all tracks into a cohesive whole. EQ shapes tone, compression controls dynamics, reverb creates space, panning places instruments in the stereo field.',
    icon: '🎚️',
  },
  {
    step: 5,
    title: 'Mastering',
    desc: 'The final polish. Ensuring consistent loudness, tonal balance, and format compatibility across all playback systems — from earbuds to club speakers.',
    icon: '💎',
  },
]

const daws = [
  {
    name: 'GarageBand',
    price: 'Free',
    platform: 'Mac / iOS',
    accent: 'text-green-400',
    color: 'from-green-500/20 to-green-600/5',
    desc: 'Apple\'s free DAW — surprisingly powerful for beginners. Built-in instruments, loops, and a clean interface that teaches production fundamentals without overwhelm.',
  },
  {
    name: 'Ableton Live',
    price: 'Paid',
    platform: 'Mac / Windows',
    accent: 'text-amber-400',
    color: 'from-amber-500/20 to-amber-600/5',
    desc: 'The electronic music standard. Session View enables live performance and improvisation. Exceptional for beat-making, sound design, and live sets.',
  },
  {
    name: 'FL Studio',
    price: 'Paid',
    platform: 'Mac / Windows',
    accent: 'text-orange-400',
    color: 'from-orange-500/20 to-orange-600/5',
    desc: 'The beat-making king. Pattern-based workflow is intuitive for hip-hop, trap, and EDM. Lifetime free updates — buy once, own every future version.',
  },
  {
    name: 'Logic Pro',
    price: 'Paid',
    platform: 'Mac',
    accent: 'text-blue-400',
    color: 'from-blue-500/20 to-blue-600/5',
    desc: 'Apple\'s professional DAW. Massive instrument and loop library included. Seamless GarageBand upgrade path. Exceptional for songwriting and scoring.',
  },
  {
    name: 'Pro Tools',
    price: 'Paid',
    platform: 'Mac / Windows',
    accent: 'text-violet-400',
    color: 'from-violet-500/20 to-violet-600/5',
    desc: 'The recording studio industry standard. Unmatched for audio editing, comping takes, and professional mixing workflows. The choice of major studios worldwide.',
  },
  {
    name: 'Reaper',
    price: 'Freemium',
    platform: 'Mac / Win / Linux',
    accent: 'text-emerald-400',
    color: 'from-emerald-500/20 to-emerald-600/5',
    desc: 'Lightweight, deeply customizable, and remarkably affordable ($60 personal license). Supports virtually every plugin format. A hidden gem for power users.',
  },
]

const essentialConcepts = [
  {
    title: 'EQ (Equalization)',
    desc: 'Shape the frequency spectrum of each track. Cut muddy frequencies around 200-400Hz, boost presence at 2-5kHz for clarity, add air with a gentle shelf at 10kHz+. Subtractive EQ (cutting) usually sounds cleaner than boosting.',
    color: 'text-orange-400',
  },
  {
    title: 'Compression',
    desc: 'Control dynamics — reduce the gap between the loudest and quietest moments. Key parameters: threshold (when it kicks in), ratio (how much it reduces), attack (how fast it responds), release (how quickly it lets go). Subtle compression glues a mix together.',
    color: 'text-orange-400',
  },
  {
    title: 'Reverb',
    desc: 'Create the illusion of acoustic space. Room reverb for intimacy, hall for grandeur, plate for vintage vocals. The wet/dry balance is critical — too much reverb drowns a mix, too little feels sterile. Automate reverb sends for dynamic depth.',
    color: 'text-orange-400',
  },
  {
    title: 'Panning',
    desc: 'Place instruments across the stereo field. Keep bass, kick drum, and lead vocals center. Spread guitars, synths, and percussion left and right. Double-tracked parts panned hard left/right create width. Check your mix in mono to ensure nothing disappears.',
    color: 'text-orange-400',
  },
]

const studioSetups = [
  {
    tier: 'Starter',
    budget: '$200',
    items: ['USB microphone (Audio-Technica ATR2100x)', 'Studio headphones (Audio-Technica ATH-M20x)', 'Free DAW (GarageBand or Reaper)'],
    desc: 'Everything you need to record vocals, podcasts, and basic instrument tracks. Start making music today.',
  },
  {
    tier: 'Intermediate',
    budget: '$500',
    items: ['Audio interface (Focusrite Scarlett 2i2)', 'Condenser mic (Audio-Technica AT2020)', 'Studio monitors (PreSonus Eris 3.5)', 'XLR cable + mic stand + pop filter'],
    desc: 'Professional-quality recording and accurate monitoring. The sweet spot for serious hobbyists and aspiring producers.',
  },
  {
    tier: 'Professional',
    budget: '$1,500',
    items: ['Quality interface (Universal Audio Volt 276)', 'Large-diaphragm condenser + dynamic mic', 'Studio monitors (Yamaha HS5 or KRK Rokit 5)', 'Acoustic treatment (panels + bass traps)', 'MIDI controller keyboard'],
    desc: 'A complete home studio capable of commercial-quality recordings. Acoustic treatment makes the biggest difference at this level.',
  },
]

const aiProductionTools = [
  {
    name: 'Suno',
    desc: 'Generate complete songs from text prompts — melody, arrangement, vocals, production. The fastest way to turn a musical idea into a finished track.',
    url: '/music/create',
    internal: true,
  },
  {
    name: 'LANDR',
    desc: 'AI-powered automated mastering. Upload your mix, get a mastered track in minutes. Multiple style presets from warm analog to bright modern.',
    url: 'https://www.landr.com',
    internal: false,
  },
  {
    name: 'iZotope Neutron',
    desc: 'AI-assisted mixing plugin. Analyzes your tracks and suggests EQ, compression, and balance adjustments. A mixing engineer copilot inside your DAW.',
    url: 'https://www.izotope.com/en/products/neutron.html',
    internal: false,
  },
  {
    name: 'BandLab',
    desc: 'Free browser-based DAW with collaborative features. Record, mix, and publish — all from a web browser. Built-in AI mastering and effects.',
    url: 'https://www.bandlab.com',
    internal: false,
  },
  {
    name: 'Splice',
    desc: 'AI-powered sample and loop discovery. Millions of royalty-free sounds organized by key, BPM, and genre. Find the exact sound in your head.',
    url: 'https://splice.com',
    internal: false,
  },
]

export default function ProductionPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:py-24">
        {/* Hero */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <p className="text-5xl">🎛️</p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Music Production
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
            From idea to finished track. The art and science of capturing, shaping, and polishing
            sound into music that moves people.
          </p>
        </motion.header>

        {/* Production Chain */}
        <motion.section {...fadeUp} className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white">The Production Chain</h2>
          <div className="space-y-4">
            {productionChain.map((item) => (
              <div
                key={item.step}
                className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-full bg-orange-500/20">
                  <span className="text-lg">{item.icon}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-orange-400/60">
                      STEP {item.step}
                    </span>
                    <h3 className="font-semibold text-white">{item.title}</h3>
                  </div>
                  <p className="mt-1 text-sm text-white/50">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Choose Your DAW */}
        <motion.section {...fadeUp} className="mb-16">
          <h2 className="mb-2 text-2xl font-bold text-white">Choose Your DAW</h2>
          <p className="mb-6 text-white/50">
            Your Digital Audio Workstation is your primary instrument. Every DAW can produce
            professional results — choose the one that fits your workflow and genre.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {daws.map((daw) => (
              <div
                key={daw.name}
                className={`rounded-xl border border-white/10 bg-gradient-to-br ${daw.color} p-5`}
              >
                <div className="flex items-center justify-between">
                  <h3 className={`text-lg font-bold ${daw.accent}`}>{daw.name}</h3>
                  <div className="flex gap-2">
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/40">
                      {daw.price}
                    </span>
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/40">
                      {daw.platform}
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-sm text-white/50">{daw.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Essential Concepts */}
        <motion.section {...fadeUp} className="mb-16">
          <h2 className="mb-2 text-2xl font-bold text-white">Essential Mixing Concepts</h2>
          <p className="mb-6 text-white/50">
            Four tools that shape 90% of a professional mix. Master these before buying
            additional plugins.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {essentialConcepts.map((concept) => (
              <div
                key={concept.title}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
              >
                <h3 className="font-semibold text-orange-400">{concept.title}</h3>
                <p className="mt-2 text-sm text-white/50">{concept.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Home Studio Setup */}
        <motion.section {...fadeUp} className="mb-16">
          <h2 className="mb-2 text-2xl font-bold text-white">Home Studio Setup</h2>
          <p className="mb-6 text-white/50">
            Three tiers to match your budget and ambition. Start where you are — gear upgrades
            follow skill growth.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {studioSetups.map((setup) => (
              <div
                key={setup.tier}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white">{setup.tier}</h3>
                  <span className="rounded-full bg-orange-400/10 px-2 py-0.5 text-sm font-bold text-orange-400">
                    {setup.budget}
                  </span>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {setup.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-white/50">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400/40" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-white/30">{setup.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* AI in Production */}
        <motion.section {...fadeUp} className="mb-16">
          <h2 className="mb-2 text-2xl font-bold text-white">AI in Music Production</h2>
          <p className="mb-6 text-white/50">
            AI is reshaping every stage of the production chain — from composition to mastering.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {aiProductionTools.map((tool) =>
              tool.internal ? (
                <Link
                  key={tool.name}
                  href={tool.url}
                  className="group rounded-xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-orange-400/30 hover:bg-white/[0.05]"
                >
                  <h3 className="font-semibold text-white group-hover:text-orange-400">
                    {tool.name}
                  </h3>
                  <p className="mt-2 text-sm text-white/50">{tool.desc}</p>
                </Link>
              ) : (
                <a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-orange-400/30 hover:bg-white/[0.05]"
                >
                  <h3 className="font-semibold text-white group-hover:text-orange-400">
                    {tool.name}
                  </h3>
                  <p className="mt-2 text-sm text-white/50">{tool.desc}</p>
                </a>
              )
            )}
          </div>
        </motion.section>

        {/* Frank's Production Stack */}
        <motion.section {...fadeUp} className="mb-16">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-orange-500/5 to-amber-500/5 p-8">
            <h2 className="text-2xl font-bold text-white">
              Frank&apos;s Production Stack
            </h2>
            <p className="mt-4 leading-relaxed text-white/60">
              With 12,000+ AI-generated tracks, Frank&apos;s production workflow is built on
              Suno for AI composition, n8n for automated catalog management and publishing
              workflows, and Vercel Blob for self-hosted audio delivery. The entire pipeline —
              from text prompt to published track with metadata, cover art, and streaming links —
              runs through an automated system that treats music production as software
              engineering.
            </p>
            <p className="mt-3 leading-relaxed text-white/60">
              The insight: modern music production is increasingly about orchestrating AI tools
              and automation, layered on top of deep understanding of music theory and sound
              design fundamentals.
            </p>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section {...fadeUp} className="mb-16">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
            <h2 className="text-2xl font-bold text-white">
              Start Producing
            </h2>
            <p className="mt-3 text-white/50">
              Explore AI-generated music or dive into the theory that makes production intuitive.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/music/create"
                className="rounded-full bg-orange-500/20 px-6 py-2.5 text-sm font-medium text-orange-400 transition hover:bg-orange-500/30"
              >
                AI Music Creation
              </Link>
              <Link
                href="/music"
                className="rounded-full border border-white/10 px-6 py-2.5 text-sm font-medium text-white/60 transition hover:border-white/20 hover:text-white/80"
              >
                Browse All Music
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Navigation */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link
            href="/music/learn/theory"
            className="rounded-full border border-white/10 px-6 py-3 text-sm text-white/60 transition hover:border-white/20 hover:text-white/80"
          >
            Music Theory
          </Link>
          <Link
            href="/music/learn/piano"
            className="rounded-full border border-white/10 px-6 py-3 text-sm text-white/60 transition hover:border-white/20 hover:text-white/80"
          >
            Learn Piano
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
