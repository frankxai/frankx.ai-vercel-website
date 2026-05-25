'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { EmailSignup } from '@/components/email-signup'
import {
  Music2,
  Sparkles,
  ArrowRight,
  Wand2,
  Layers,
  Mic2,
  Piano,
  Drum,
  Globe,
  Zap,
  BookOpen,
  ExternalLink,
  ListMusic,
  Settings2,
  Lightbulb,
  Target,
  Workflow,
  Headphones,
} from 'lucide-react'

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

// ============================================================================
// DATA
// ============================================================================

const gettingStartedSteps = [
  {
    step: '01',
    title: 'Sign up at suno.com',
    desc: 'Create a free account. You get 50 credits per day to generate songs — enough to experiment and learn the fundamentals.',
  },
  {
    step: '02',
    title: 'Write your first prompt',
    desc: 'Keep it simple: genre + mood + tempo. Something like "chill lo-fi hip hop, relaxed vibes, 85 BPM" is a strong start.',
  },
  {
    step: '03',
    title: 'Generate and listen',
    desc: 'Hit create and listen to the full output. Pay attention to what the model interprets well and where it drifts.',
  },
  {
    step: '04',
    title: 'Iterate on what works',
    desc: 'Refine your prompt. Add instrumentation details, vocal direction, or structural tags. Each generation teaches you the model\'s vocabulary.',
  },
  {
    step: '05',
    title: 'Download and share',
    desc: 'Export your best tracks. Share on your Suno profile, social platforms, or host them on your own site.',
  },
]

const promptTechniques = [
  {
    icon: Target,
    title: 'Genre Specification',
    desc: 'Be precise. "Cinematic orchestral with Hans Zimmer influence" outperforms "orchestral" every time. Layer genres for unique fusions.',
    example: '"dark cinematic orchestral, epic brass, thundering percussion, trailer music"',
  },
  {
    icon: Lightbulb,
    title: 'Mood & Energy',
    desc: 'Set the emotional vector. Combine mood adjectives with BPM targets to control intensity and pacing.',
    example: '"melancholic, introspective, 70 BPM, slow build, contemplative"',
  },
  {
    icon: Piano,
    title: 'Instrumentation',
    desc: 'Specify what you want to hear — and what you do not. Explicit instrument calls sharpen the output dramatically.',
    example: '"solo piano, string quartet accompaniment, no drums, soft dynamics"',
  },
  {
    icon: Mic2,
    title: 'Vocal Direction',
    desc: 'Control the vocal character: gender, range, style, effects. The more specific, the more consistent the output.',
    example: '"female soprano, ethereal tone, reverb-heavy, breathy delivery"',
  },
  {
    icon: Layers,
    title: 'Song Structure',
    desc: 'Use metatags to control arrangement. Define verses, choruses, bridges, and outros for professional structure.',
    example: '"[Intro] [Verse 1] [Chorus] [Verse 2] [Chorus] [Bridge] [Outro]"',
  },
  {
    icon: Settings2,
    title: 'Advanced Techniques',
    desc: 'Combine metatags with style references. Use "Extend" to develop sections. Chain generations for longer compositions.',
    example: '"[Instrumental Break] soaring violin solo, key change to C major, crescendo"',
  },
]

const genreCards = [
  {
    genre: 'Neoclassical / Ambient',
    color: 'from-violet-500/20 to-purple-500/10',
    border: 'border-violet-500/20',
    accent: 'text-violet-400',
    desc: 'Golden Frequencies style — healing tones, atmospheric pads, piano-led meditation.',
    prompt: '"neoclassical ambient, solo piano, ethereal pads, 432 Hz tuning, deep reverb, meditative"',
    link: 'https://suno.com/@frankx',
  },
  {
    genre: 'Orchestral / Cinematic',
    color: 'from-amber-500/20 to-orange-500/10',
    border: 'border-amber-500/20',
    accent: 'text-amber-400',
    desc: 'Arcanean soundtrack territory — epic brass, sweeping strings, world-building through sound.',
    prompt: '"epic cinematic orchestral, full symphony, brass fanfare, timpani, heroic theme, 120 BPM"',
    link: 'https://suno.com/@frankx',
  },
  {
    genre: 'Electronic / Tech House',
    color: 'from-emerald-500/20 to-teal-500/10',
    border: 'border-emerald-500/20',
    accent: 'text-emerald-400',
    desc: 'Driving beats, modular synths, warehouse energy. Clean drops and hypnotic grooves.',
    prompt: '"tech house, 126 BPM, punchy kick, rolling bassline, minimal vocals, dark warehouse vibe"',
    link: 'https://suno.com/@frankx',
  },
  {
    genre: 'Pop / Rock',
    color: 'from-pink-500/20 to-rose-500/10',
    border: 'border-pink-500/20',
    accent: 'text-pink-400',
    desc: 'Hook-driven melodies, polished production, radio-ready structure and vocal presence.',
    prompt: '"indie pop rock, catchy hook, electric guitar riff, male vocals, anthemic chorus, 110 BPM"',
    link: 'https://suno.com/@frankx',
  },
  {
    genre: 'Hip Hop / R&B',
    color: 'from-blue-500/20 to-indigo-500/10',
    border: 'border-blue-500/20',
    accent: 'text-blue-400',
    desc: 'Soulful melodies over hard-hitting production. From boom-bap to trap to smooth R&B.',
    prompt: '"modern R&B, smooth male vocals, 808 bass, atmospheric synths, late night vibe, 90 BPM"',
    link: 'https://suno.com/@frankx',
  },
  {
    genre: 'World Music / Choral',
    color: 'from-yellow-500/20 to-amber-500/10',
    border: 'border-yellow-500/20',
    accent: 'text-yellow-400',
    desc: 'Global textures — from Balkan brass to Japanese koto to African polyrhythm to cathedral choirs.',
    prompt: '"world fusion, Balkan brass band, energetic tempo, mixed choir, handclaps, festival energy"',
    link: 'https://suno.com/@frankx',
  },
]

const workflowSteps = [
  {
    phase: 'Concept',
    icon: Lightbulb,
    desc: 'Define the mood and purpose. Meditation track? High-energy workout? Storytelling soundtrack? The use case shapes every prompt decision.',
  },
  {
    phase: 'Prompt Craft',
    icon: Wand2,
    desc: 'Write 2-3 prompt iterations. Start broad, then layer in specifics — instrumentation, structure tags, vocal direction, tempo, key.',
  },
  {
    phase: 'Generate',
    icon: Zap,
    desc: 'Create 4-8 variants per concept. Each generation reveals what the model interprets well. Quantity feeds quality at this stage.',
  },
  {
    phase: 'Curate',
    icon: Headphones,
    desc: 'Select the strongest outputs. Use Suno\'s Extend feature to develop promising sections. Remix to refine arrangements.',
  },
  {
    phase: 'Publish',
    icon: Globe,
    desc: 'Release to your Suno profile, self-host on your own infrastructure, distribute to streaming platforms. Own your catalog.',
  },
  {
    phase: 'Automate',
    icon: Workflow,
    desc: 'Build workflows for catalog sync, metadata management, and distribution. At scale, automation is the difference between 50 tracks and 500.',
  },
]

const aiTools = [
  {
    name: 'Suno AI',
    desc: 'Text-to-music generation. The most capable AI music model available. Full songs from text prompts.',
    url: 'https://suno.com',
    badge: 'Primary',
    badgeColor: 'bg-emerald-500/20 text-emerald-400',
  },
  {
    name: 'Udio',
    desc: 'Alternative AI music generator with strong vocal reproduction and genre range.',
    url: 'https://www.udio.com',
    badge: 'Alternative',
    badgeColor: 'bg-blue-500/20 text-blue-400',
  },
  {
    name: 'AIVA',
    desc: 'AI composer optimized for film, game, and commercial music. Strong orchestral output.',
    url: 'https://www.aiva.ai',
    badge: 'Scoring',
    badgeColor: 'bg-violet-500/20 text-violet-400',
  },
  {
    name: 'Amper Music',
    desc: 'AI music for content creators. Quick generation with customizable parameters.',
    url: 'https://www.shutterstock.com/discover/ampermusic',
    badge: 'Content',
    badgeColor: 'bg-amber-500/20 text-amber-400',
  },
  {
    name: 'Soundraw',
    desc: 'Customizable AI music. Adjust mood, genre, length, and instruments in real-time.',
    url: 'https://soundraw.io',
    badge: 'Customizable',
    badgeColor: 'bg-pink-500/20 text-pink-400',
  },
  {
    name: 'BandLab',
    desc: 'Collaborative music creation platform with AI-assisted tools and social features.',
    url: 'https://www.bandlab.com',
    badge: 'Collaborative',
    badgeColor: 'bg-teal-500/20 text-teal-400',
  },
]

const playlists = [
  {
    title: 'Golden Frequencies',
    desc: 'Healing ambient and neoclassical. Piano-led meditation and deep focus music.',
    tracks: '15+ tracks',
    color: 'from-amber-500/20 to-yellow-500/10',
    border: 'border-amber-500/20',
  },
  {
    title: 'Instrumental Magic',
    desc: 'Pure instrumental compositions. Piano, strings, and atmospheric arrangements.',
    tracks: '20+ tracks',
    color: 'from-violet-500/20 to-purple-500/10',
    border: 'border-violet-500/20',
  },
  {
    title: 'Arcanean Choir',
    desc: 'Epic orchestral and fantasy choral works. Soundtrack to a civilization.',
    tracks: '12+ tracks',
    color: 'from-emerald-500/20 to-teal-500/10',
    border: 'border-emerald-500/20',
  },
  {
    title: 'Orchestral Beauty',
    desc: 'Cinematic orchestral compositions. Sweeping strings, brass, and full symphony.',
    tracks: '18+ tracks',
    color: 'from-blue-500/20 to-indigo-500/10',
    border: 'border-blue-500/20',
  },
]

// ============================================================================
// PAGE
// ============================================================================

export default function CreateMusicPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-white/5 py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 text-center">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10">
              <Music2 className="h-8 w-8 text-emerald-400" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Create Music with AI
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60 sm:text-xl">
              From prompt to production. 500+ tracks and counting.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-white/40">
              <span className="rounded-full border border-white/10 px-3 py-1">Suno AI</span>
              <span className="rounded-full border border-white/10 px-3 py-1">Prompt Engineering</span>
              <span className="rounded-full border border-white/10 px-3 py-1">Genre Mastery</span>
              <span className="rounded-full border border-white/10 px-3 py-1">Production Workflows</span>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-16 sm:py-24">

        {/* ── What is AI Music? ── */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-24">
          <motion.h2 variants={fadeUp} custom={0} className="text-3xl font-bold text-white sm:text-4xl">
            What is AI Music?
          </motion.h2>
          <motion.div variants={fadeUp} custom={1} className="mt-6 space-y-4 text-lg leading-relaxed text-white/60">
            <p>
              AI music generation transforms text prompts into fully produced songs — vocals, instrumentation, arrangement, and mastering — in under a minute. Models like Suno and Udio have made it possible for anyone with a creative vision to produce professional-quality music.
            </p>
            <p>
              This is augmentation, not replacement. The skill shifts from "can you play an instrument?" to "can you direct a composition?" — from performer to creative director. The musicians who embrace these tools gain leverage. The creators who master prompt engineering produce work that stands alongside traditional production.
            </p>
          </motion.div>
        </motion.section>

        {/* ── Getting Started with Suno AI ── */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-24">
          <motion.div variants={fadeUp} custom={0} className="mb-8">
            <span className="text-sm font-medium tracking-wider text-emerald-400 uppercase">Beginner Guide</span>
            <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Getting Started with Suno AI</h2>
            <p className="mt-3 text-white/50">Five steps from zero to your first AI-generated track.</p>
          </motion.div>
          <div className="space-y-4">
            {gettingStartedSteps.map((step, i) => (
              <motion.div
                key={step.step}
                variants={fadeUp}
                custom={i + 1}
                className="group flex gap-5 rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition hover:border-emerald-500/20 hover:bg-white/[0.04]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-sm font-bold text-emerald-400">
                  {step.step}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-1 text-white/50">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div variants={fadeUp} custom={6} className="mt-6">
            <a
              href="https://suno.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-5 py-2.5 text-sm font-medium text-emerald-400 transition hover:bg-emerald-500/20"
            >
              Open Suno AI <ExternalLink className="h-4 w-4" />
            </a>
          </motion.div>
        </motion.section>

        {/* ── Prompt Engineering for Music ── */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-24">
          <motion.div variants={fadeUp} custom={0} className="mb-8">
            <span className="text-sm font-medium tracking-wider text-violet-400 uppercase">Core Skill</span>
            <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Prompt Engineering for Music</h2>
            <p className="mt-3 text-white/50">
              The same discipline that makes enterprise AI systems work applies to music generation. Precision in, quality out.
            </p>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2">
            {promptTechniques.map((tech, i) => (
              <motion.div
                key={tech.title}
                variants={fadeUp}
                custom={i + 1}
                className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition hover:border-violet-500/20 hover:bg-white/[0.04]"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10">
                    <tech.icon className="h-5 w-5 text-violet-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{tech.title}</h3>
                </div>
                <p className="text-sm text-white/50">{tech.desc}</p>
                <code className="mt-3 block rounded-lg bg-white/[0.04] p-3 text-xs leading-relaxed text-violet-300/80">
                  {tech.example}
                </code>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Genre Techniques ── */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-24">
          <motion.div variants={fadeUp} custom={0} className="mb-8">
            <span className="text-sm font-medium tracking-wider text-amber-400 uppercase">Genre Mastery</span>
            <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Genre Techniques</h2>
            <p className="mt-3 text-white/50">
              Each genre has its own prompt vocabulary. These are the patterns refined across 500+ generations.
            </p>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {genreCards.map((g, i) => (
              <motion.div
                key={g.genre}
                variants={fadeUp}
                custom={i + 1}
                className={`rounded-2xl border ${g.border} bg-gradient-to-br ${g.color} p-6 transition hover:scale-[1.02]`}
              >
                <h3 className={`text-lg font-bold ${g.accent}`}>{g.genre}</h3>
                <p className="mt-2 text-sm text-white/50">{g.desc}</p>
                <code className="mt-3 block rounded-lg bg-black/30 p-3 text-xs leading-relaxed text-white/60">
                  {g.prompt}
                </code>
                <a
                  href={g.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-4 inline-flex items-center gap-1.5 text-xs font-medium ${g.accent} transition hover:underline`}
                >
                  Listen to examples <ExternalLink className="h-3 w-3" />
                </a>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Frank's Workflow ── */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-24">
          <motion.div variants={fadeUp} custom={0} className="mb-8">
            <span className="text-sm font-medium tracking-wider text-emerald-400 uppercase">Behind the Process</span>
            <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">How Frank Creates at Scale</h2>
            <p className="mt-3 text-white/50">
              The workflow behind 500+ tracks. Systems thinking applied to music production.
            </p>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {workflowSteps.map((step, i) => (
              <motion.div
                key={step.phase}
                variants={fadeUp}
                custom={i + 1}
                className="group rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition hover:border-emerald-500/20 hover:bg-white/[0.04]"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 transition group-hover:bg-emerald-500/20">
                    <step.icon className="h-5 w-5 text-emerald-400" />
                  </div>
                  <span className="text-xs font-medium tracking-wider text-emerald-400/60 uppercase">{step.phase}</span>
                </div>
                <p className="text-sm text-white/50">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── AI Music Tools ── */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-24">
          <motion.div variants={fadeUp} custom={0} className="mb-8">
            <span className="text-sm font-medium tracking-wider text-amber-400 uppercase">Toolbox</span>
            <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">AI Music Tools</h2>
            <p className="mt-3 text-white/50">
              The current landscape of AI music generation platforms worth exploring.
            </p>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {aiTools.map((tool, i) => (
              <motion.a
                key={tool.name}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeUp}
                custom={i + 1}
                className="group rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition hover:border-amber-500/20 hover:bg-white/[0.04]"
              >
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white group-hover:text-amber-400 transition">{tool.name}</h3>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${tool.badgeColor}`}>
                    {tool.badge}
                  </span>
                </div>
                <p className="text-sm text-white/50">{tool.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs text-white/30 group-hover:text-amber-400/60 transition">
                  Visit <ExternalLink className="h-3 w-3" />
                </span>
              </motion.a>
            ))}
          </div>
        </motion.section>

        {/* ── The Future of AI Music ── */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-24">
          <motion.div
            variants={fadeUp}
            custom={0}
            className="rounded-2xl border border-white/5 bg-gradient-to-br from-violet-500/5 via-emerald-500/5 to-transparent p-8 sm:p-12"
          >
            <Sparkles className="mb-4 h-8 w-8 text-violet-400" />
            <h2 className="text-3xl font-bold text-white sm:text-4xl">The Future of AI Music</h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-white/60">
              <p>
                AI music generation democratizes creation. The barrier to entry moves from years of instrument practice to minutes of prompt refinement. This is not a replacement for musicianship — it is a new instrument, and the most powerful one ever built.
              </p>
              <p>
                The skill that matters now is creative direction: taste, vision, and the ability to articulate what you hear in your mind. Prompt engineering for music is composition by description — and the composers who master it will define the next era of sound.
              </p>
              <p>
                The trajectory is clear: higher fidelity, longer form, more control. Real-time collaboration between human intent and AI execution. The question is not whether AI will transform music — it is how quickly you will learn to conduct it.
              </p>
            </div>
          </motion.div>
        </motion.section>

        {/* ── Listen to Frank's Music ── */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-24">
          <motion.div variants={fadeUp} custom={0} className="mb-8">
            <span className="text-sm font-medium tracking-wider text-violet-400 uppercase">The Catalog</span>
            <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Listen to Frank&apos;s Music</h2>
            <p className="mt-3 text-white/50">
              500+ tracks across every genre. Built entirely with AI music generation and prompt engineering.
            </p>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2">
            {playlists.map((pl, i) => (
              <motion.div
                key={pl.title}
                variants={fadeUp}
                custom={i + 1}
                className={`rounded-2xl border ${pl.border} bg-gradient-to-br ${pl.color} p-6`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">{pl.title}</h3>
                  <ListMusic className="h-5 w-5 text-white/30" />
                </div>
                <p className="mt-2 text-sm text-white/50">{pl.desc}</p>
                <span className="mt-3 inline-block text-xs text-white/30">{pl.tracks}</span>
              </motion.div>
            ))}
          </div>
          <motion.div variants={fadeUp} custom={5} className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/music"
              className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-5 py-2.5 text-sm font-medium text-violet-400 transition hover:bg-violet-500/20"
            >
              Full Music Hub <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://suno.com/@frankx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium text-white/60 transition hover:border-white/20 hover:text-white/80"
            >
              @frankx on Suno <ExternalLink className="h-4 w-4" />
            </a>
          </motion.div>
        </motion.section>

        {/* ── Email Capture ── */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-white">Get 5 Free Suno Prompts</h2>
          <p className="mx-auto mt-3 max-w-lg text-white/50">
            Professional-quality prompts for neoclassical, orchestral, electronic, hip hop, and ambient — tested across 500+ tracks. Plus weekly AI music tips.
          </p>
          <div className="mx-auto mt-6 max-w-sm">
            <EmailSignup
              listType="music-lab"
              placeholder="your@email.com"
              buttonText="Send Me the Prompts"
            />
          </div>
          <p className="mt-3 text-xs text-white/30">Pure signal. Unsubscribe anytime.</p>
        </motion.section>

        {/* ── Vibe OS Product ── */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link href="/products/vibe-os" className="group block rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition hover:border-violet-500/30 hover:bg-white/[0.05]">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-500/20">
                <Sparkles className="h-6 w-6 text-violet-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-violet-400">Vibe OS — The AI Music Creation System</h3>
                <p className="mt-1 text-sm text-white/50">The complete framework for creating AI music at scale. Prompts, workflows, genre templates, and production pipelines.</p>
              </div>
              <ArrowRight className="hidden h-5 w-5 shrink-0 text-white/30 group-hover:text-violet-400 sm:block" />
            </div>
          </Link>
        </motion.section>

        {/* ── Navigation ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 border-t border-white/5 pt-12"
        >
          <Link
            href="/music"
            className="rounded-full border border-white/10 px-6 py-3 text-sm text-white/60 transition hover:border-white/20 hover:text-white/80"
          >
            Music Hub
          </Link>
          <Link
            href="/music/learn"
            className="rounded-full border border-white/10 px-6 py-3 text-sm text-white/60 transition hover:border-white/20 hover:text-white/80"
          >
            Learn Music
          </Link>
          <Link
            href="/prompts"
            className="rounded-full border border-white/10 px-6 py-3 text-sm text-white/60 transition hover:border-white/20 hover:text-white/80"
          >
            Prompt Library
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
