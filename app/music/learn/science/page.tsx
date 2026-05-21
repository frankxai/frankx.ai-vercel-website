'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

// ── Data ────────────────────────────────────────────────────────────────────

const BRAIN_EFFECTS = [
  {
    title: 'Dopamine Release',
    icon: '🧪',
    color: 'from-indigo-500/20 to-indigo-600/5',
    border: 'border-indigo-500/20',
    description:
      'Music triggers dopamine — the same neurotransmitter activated by food, connection, and reward. The anticipation of a chord resolution activates your nucleus accumbens before the note even lands.',
  },
  {
    title: 'Memory Formation',
    icon: '🧠',
    color: 'from-cyan-500/20 to-cyan-600/5',
    border: 'border-cyan-500/20',
    description:
      "The hippocampus encodes music deeper than almost any other stimulus. Alzheimer's patients who can no longer speak can still sing entire songs from their youth — the neural pathways survive.",
  },
  {
    title: 'Motor Synchronization',
    icon: '🫀',
    color: 'from-violet-500/20 to-violet-600/5',
    border: 'border-violet-500/20',
    description:
      'Rhythmic entrainment — your brain automatically synchronizes body movement to tempo. This is why you tap your foot, nod your head, and feel physically pulled into a groove.',
  },
  {
    title: 'Emotional Regulation',
    icon: '🌊',
    color: 'from-teal-500/20 to-teal-600/5',
    border: 'border-teal-500/20',
    description:
      'Music activates the amygdala, prefrontal cortex, and nucleus accumbens simultaneously. It is the only known activity that lights up the entire brain at once.',
  },
]

const SOLFEGGIO_FREQUENCIES = [
  { hz: '174 Hz', label: 'Pain Relief', desc: 'Reduces physical and energetic pain. Foundation frequency.', color: 'text-red-400' },
  { hz: '285 Hz', label: 'Tissue Healing', desc: 'Influences cellular regeneration and tissue repair.', color: 'text-orange-400' },
  { hz: '396 Hz', label: 'Fear Release', desc: 'Liberates guilt and fear. Turns grief into joy.', color: 'text-amber-400' },
  { hz: '417 Hz', label: 'Facilitating Change', desc: 'Clears traumatic experiences. Facilitates change.', color: 'text-yellow-400' },
  { hz: '432 Hz', label: 'Natural Tuning', desc: 'Verdi tuning. Said to resonate with nature itself.', color: 'text-lime-400' },
  { hz: '528 Hz', label: 'DNA Repair & Love', desc: 'The "miracle tone." Associated with transformation and DNA repair.', color: 'text-emerald-400' },
  { hz: '639 Hz', label: 'Connection', desc: 'Enhances communication, understanding, and relationships.', color: 'text-cyan-400' },
  { hz: '741 Hz', label: 'Intuition', desc: 'Awakens intuition. Leads to a purer, more stable life.', color: 'text-blue-400' },
  { hz: '852 Hz', label: 'Spiritual Order', desc: 'Returns to spiritual order. Raises awareness.', color: 'text-indigo-400' },
  { hz: '963 Hz', label: 'Pineal Activation', desc: 'Connected to light and spirit. The frequency of oneness.', color: 'text-violet-400' },
]

const BINAURAL_BEATS = [
  { range: '1-4 Hz', name: 'Delta', state: 'Deep Sleep', desc: 'Dreamless sleep, healing, regeneration. The body repairs itself here.', color: 'bg-indigo-500' },
  { range: '4-8 Hz', name: 'Theta', state: 'Meditation', desc: 'Deep meditation, creativity, REM sleep. Where insights emerge.', color: 'bg-violet-500' },
  { range: '8-14 Hz', name: 'Alpha', state: 'Relaxation', desc: 'Calm alertness, relaxation, learning readiness. The bridge state.', color: 'bg-cyan-500' },
  { range: '14-30 Hz', name: 'Beta', state: 'Focus', desc: 'Active thinking, problem solving, concentration. Everyday consciousness.', color: 'bg-teal-500' },
  { range: '30-100 Hz', name: 'Gamma', state: 'Insight', desc: 'Peak awareness, high-level information processing. Moments of breakthrough.', color: 'bg-emerald-500' },
]

const FLOW_BPM = [
  { bpm: '60-80 BPM', state: 'Calm / Study', desc: 'Parasympathetic activation. Ideal for reading, writing, reflection.', icon: '📖' },
  { bpm: '80-120 BPM', state: 'Steady Work', desc: 'Matches resting heart rate. Sustains attention without arousal.', icon: '💻' },
  { bpm: '120-140 BPM', state: 'Productivity', desc: 'Elevated energy. Great for tasks requiring momentum and output.', icon: '⚡' },
  { bpm: '140-170 BPM', state: 'Intense Focus', desc: 'High arousal. Best for physical training or high-pressure creative sprints.', icon: '🔥' },
]

const NEURO_STATES = [
  {
    time: 'Morning',
    icon: '🌅',
    prescription: 'Major keys, 120+ BPM, rising melodies',
    effect: 'Energy, motivation, cortisol alignment',
    color: 'from-amber-500/20 to-orange-500/10',
  },
  {
    time: 'Deep Work',
    icon: '🎯',
    prescription: 'Ambient, no lyrics, 60-80 BPM, consistent texture',
    effect: 'Sustained focus, transient hypofrontality',
    color: 'from-indigo-500/20 to-blue-500/10',
  },
  {
    time: 'Creative',
    icon: '🎨',
    prescription: 'Jazz, complex harmony, surprise elements',
    effect: 'Divergent thinking, novel connections',
    color: 'from-violet-500/20 to-purple-500/10',
  },
  {
    time: 'Recovery',
    icon: '🌿',
    prescription: 'Minor keys, slow tempo, nature sounds',
    effect: 'Parasympathetic activation, nervous system reset',
    color: 'from-emerald-500/20 to-teal-500/10',
  },
  {
    time: 'Sleep',
    icon: '🌙',
    prescription: '432Hz or 528Hz, < 60 BPM, minimal variation',
    effect: 'Delta wave entrainment, melatonin support',
    color: 'from-blue-500/20 to-indigo-500/10',
  },
]

const PRACTICE_SCIENCE = [
  {
    title: 'Myelin & Muscle Memory',
    desc: 'Deep practice supports myelination around neural pathways, improving timing and signal reliability. Every correct repetition reinforces the circuit. This is why slow, accurate practice rewires your brain more effectively than fast, sloppy repetition.',
    icon: '🔬',
  },
  {
    title: 'Deliberate Practice',
    desc: "Anders Ericsson's research proved that focused practice with immediate feedback dramatically outperforms passive repetition. The key ingredients: a specific goal, full concentration, immediate feedback, and working at the edge of your current ability.",
    icon: '🎯',
  },
  {
    title: 'The 10,000 Hour Myth',
    desc: "Malcolm Gladwell popularized the number, but Ericsson's original research was more nuanced. It is the quality of hours that matters, not the quantity. One hour of deliberate practice outweighs ten hours of mindless repetition. Focused struggle is the signal for growth.",
    icon: '⏱️',
  },
]

const SOUND_LIBRARY = [
  {
    title: 'Golden Frequencies',
    desc: '528Hz healing compositions — ambient, restorative, engineered for deep states.',
    url: 'https://suno.com/@frankx',
    tag: '528Hz',
  },
  {
    title: 'Instrumental Magic',
    desc: 'Orchestral and cinematic pieces — complex harmony for creative flow.',
    url: 'https://suno.com/@frankx',
    tag: 'Orchestral',
  },
  {
    title: 'Meditation & Focus',
    desc: 'Ambient textures, binaural undertones, minimal variation. Built for deep work.',
    url: 'https://suno.com/@frankx',
    tag: 'Ambient',
  },
]

const NAV_LINKS = [
  { href: '/music/learn/theory', label: 'Music Theory', icon: '🎼' },
  { href: '/music/learn/orchestration', label: 'Orchestration', icon: '🎻' },
  { href: '/music/create', label: 'Create Music', icon: '🎹' },
  { href: '/music/learn', label: 'Learning Hub', icon: '📚' },
]

// ── Animations ──────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
  }),
}

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function MusicSciencePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 py-28 text-center">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-indigo-900/20 via-transparent to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-3xl"
        >
          <span className="mb-4 inline-block rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-300">
            Neuroscience of Sound
          </span>
          <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl">
            Music{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              &amp; The Brain
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
            How sound shapes consciousness, triggers flow states, and rewires neural pathways.
          </p>
        </motion.div>
      </section>

      <div className="mx-auto max-w-6xl space-y-28 px-6 pb-28">
        {/* ── How Music Affects the Brain ──────────────────────────────── */}
        <section>
          <SectionHeading
            title="How Music Affects the Brain"
            subtitle="Music is the only stimulus that activates every region of the brain simultaneously."
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="mt-12 grid gap-6 sm:grid-cols-2"
          >
            {BRAIN_EFFECTS.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                custom={i}
                className={`rounded-2xl border ${item.border} bg-gradient-to-br ${item.color} p-6 backdrop-blur-sm`}
              >
                <div className="mb-3 text-3xl">{item.icon}</div>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── Hz Frequencies & Consciousness ──────────────────────────── */}
        <section>
          <SectionHeading
            title="Hz Frequencies & Consciousness"
            subtitle="Every frequency carries a signature. Some calm. Some energize. Some may heal."
          />

          {/* 432 vs 440 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 to-cyan-500/5 p-8"
          >
            <h3 className="text-xl font-semibold text-indigo-300">432 Hz vs 440 Hz — The Great Debate</h3>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              440 Hz has been the international standard pitch since ISO 16 (1955). But a growing movement advocates for 432 Hz
              — known as &ldquo;Verdi tuning&rdquo; after Giuseppe Verdi, who championed it. Proponents say 432 Hz feels warmer,
              more natural, more aligned with mathematical patterns found in nature. Critics point out there is no conclusive
              scientific evidence for health benefits. What is real: many musicians subjectively prefer 432 Hz, and the difference
              is audible. The debate continues — and that itself makes it worth exploring.
            </p>
          </motion.div>

          {/* Solfeggio Frequencies */}
          <div className="mt-10">
            <h3 className="mb-6 text-lg font-semibold text-white">Solfeggio Frequencies</h3>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
            >
              {SOLFEGGIO_FREQUENCIES.map((freq, i) => (
                <motion.div
                  key={freq.hz}
                  variants={fadeUp}
                  custom={i}
                  className="rounded-xl border border-white/5 bg-white/[0.03] p-4 backdrop-blur-sm transition-colors hover:border-white/10"
                >
                  <span className={`text-lg font-bold ${freq.color}`}>{freq.hz}</span>
                  <p className="mt-1 text-sm font-medium text-white">{freq.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-500">{freq.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Binaural Beats */}
          <div className="mt-10">
            <h3 className="mb-2 text-lg font-semibold text-white">Binaural Beats</h3>
            <p className="mb-6 text-sm text-zinc-500">
              Two slightly different frequencies played in each ear. Your brain perceives the difference as a rhythmic pulse
              — and synchronizes to it.
            </p>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="space-y-3"
            >
              {BINAURAL_BEATS.map((beat, i) => (
                <motion.div
                  key={beat.name}
                  variants={fadeUp}
                  custom={i}
                  className="flex items-start gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4"
                >
                  <div className={`mt-1 h-3 w-3 flex-shrink-0 rounded-full ${beat.color}`} />
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-sm font-bold text-white">{beat.range}</span>
                      <span className="text-sm font-semibold text-cyan-400">{beat.name}</span>
                      <span className="text-xs text-zinc-500">{beat.state}</span>
                    </div>
                    <p className="mt-1 text-sm text-zinc-400">{beat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Frank's Golden Frequencies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 p-8"
          >
            <h3 className="text-xl font-semibold text-emerald-300">Frank&apos;s Golden Frequencies</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              528 Hz healing music — composed with AI, tuned to the &ldquo;miracle frequency.&rdquo; Ambient textures
              designed for meditation, deep work, and nervous system recovery.
            </p>
            <Link
              href="https://suno.com/@frankx"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300 transition-colors hover:bg-emerald-500/20"
            >
              Listen on Suno
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </motion.div>
        </section>

        {/* ── Flow States Through Music ───────────────────────────────── */}
        <section>
          <SectionHeading
            title="Flow States Through Music"
            subtitle="Music is one of the most reliable triggers for the flow state — total absorption where time disappears."
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-indigo-500/5 p-8"
          >
            <h3 className="text-lg font-semibold text-cyan-300">What is Flow?</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              Defined by Mihaly Csikszentmihalyi — flow is the state where challenge perfectly matches skill. Deep
              absorption, time distortion, effortless concentration. Playing an instrument at the edge of your ability
              is one of the most reliable ways to trigger it. The neuroscience: transient hypofrontality — your
              prefrontal cortex partially deactivates, your inner critic shuts off, and pure performance takes over.
            </p>
          </motion.div>

          <div className="mt-8">
            <h3 className="mb-6 text-lg font-semibold text-white">BPM Ranges for Different States</h3>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="grid gap-4 sm:grid-cols-2"
            >
              {FLOW_BPM.map((item, i) => (
                <motion.div
                  key={item.bpm}
                  variants={fadeUp}
                  custom={i}
                  className="rounded-xl border border-white/5 bg-white/[0.03] p-5"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <span className="font-mono text-sm font-bold text-cyan-400">{item.bpm}</span>
                      <p className="text-sm font-medium text-white">{item.state}</p>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-zinc-500">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Neuro State Engineering ─────────────────────────────────── */}
        <section>
          <SectionHeading
            title="Neuro State Engineering"
            subtitle="Match sound to intention. Use music as a precision tool for shifting your neurological state."
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="mt-12 space-y-4"
          >
            {NEURO_STATES.map((state, i) => (
              <motion.div
                key={state.time}
                variants={fadeUp}
                custom={i}
                className={`rounded-xl border border-white/5 bg-gradient-to-r ${state.color} p-6`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{state.icon}</span>
                  <h3 className="text-lg font-semibold text-white">{state.time}</h3>
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <div>
                    <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">Prescription</span>
                    <p className="mt-1 text-sm text-zinc-300">{state.prescription}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">Effect</span>
                    <p className="mt-1 text-sm text-zinc-300">{state.effect}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── The Science of Practice ─────────────────────────────────── */}
        <section>
          <SectionHeading
            title="The Science of Practice"
            subtitle="What neuroscience reveals about how mastery actually works."
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="mt-12 grid gap-6 lg:grid-cols-3"
          >
            {PRACTICE_SCIENCE.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                custom={i}
                className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 backdrop-blur-sm"
              >
                <span className="text-3xl">{item.icon}</span>
                <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── Frank's Sound Library ───────────────────────────────────── */}
        <section>
          <SectionHeading
            title="Frank&apos;s Sound Library"
            subtitle="Compositions engineered for specific neurological states."
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="mt-12 grid gap-6 sm:grid-cols-3"
          >
            {SOUND_LIBRARY.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                custom={i}
                className="group rounded-2xl border border-white/5 bg-white/[0.03] p-6 transition-colors hover:border-indigo-500/20"
              >
                <span className="inline-block rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
                  {item.tag}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-zinc-400">{item.desc}</p>
                <Link
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-sm text-indigo-400 transition-colors hover:text-indigo-300"
                >
                  Listen <span aria-hidden="true">&rarr;</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── Navigation ─────────────────────────────────────────────── */}
        <section className="border-t border-white/5 pt-16">
          <h2 className="mb-8 text-center text-lg font-semibold text-zinc-400">Continue Exploring</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group rounded-xl border border-white/5 bg-white/[0.02] p-5 text-center transition-all hover:border-indigo-500/20 hover:bg-white/[0.04]"
              >
                <span className="text-2xl">{link.icon}</span>
                <p className="mt-2 text-sm font-medium text-zinc-300 group-hover:text-white">
                  {link.label}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

// ── Components ──────────────────────────────────────────────────────────────

function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
      <p className="mt-3 max-w-2xl text-zinc-500">{subtitle}</p>
    </motion.div>
  )
}
