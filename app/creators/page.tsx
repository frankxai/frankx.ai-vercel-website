'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Music,
  PenLine,
  Image,
  Sparkles,
  Palette,
  CheckCircle2,
  BookOpen,
  Rocket,
  Wand2,
  Zap,
  Heart,
  Crown,
} from 'lucide-react'

// Premium animated background
function CreatorBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#030712]" />

      {/* Creative grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(236, 72, 153, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(236, 72, 153, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Gradient orbs */}
      <motion.div
        className="absolute -right-40 top-20 h-[600px] w-[600px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(236,72,153,0.4) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          x: [0, -30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -left-40 bottom-40 h-[500px] w-[500px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          y: [0, 30, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

// Tool badges for creators
const creativeTools = [
  { name: 'Suno AI', color: 'from-pink-500 to-rose-500' },
  { name: 'Midjourney', color: 'from-violet-500 to-purple-500' },
  { name: 'Claude', color: 'from-orange-500 to-amber-500' },
  { name: 'DALL-E', color: 'from-emerald-500 to-green-500' },
  { name: 'ChatGPT', color: 'from-cyan-500 to-blue-500' },
  { name: 'Stable Diffusion', color: 'from-slate-400 to-slate-500' },
]

// Creative paths for different types of creators
const creativePaths = [
  {
    icon: Music,
    title: 'Music Production',
    description: 'Create original songs, beats, and soundscapes with Suno AI. From ambient focus music to commercial releases.',
    topics: ['Suno prompts', 'Genre mastery', 'Song structure', 'Commercial licensing'],
    href: '/prompt-library/music-creation',
    color: 'pink',
  },
  {
    icon: PenLine,
    title: 'Writing & Storytelling',
    description: 'Craft compelling content, from blog posts to books. Master AI-assisted writing without losing your voice.',
    topics: ['Blog frameworks', 'Story structure', 'Voice preservation', 'SEO writing'],
    href: '/prompt-library/writing',
    color: 'violet',
  },
  {
    icon: Image,
    title: 'Visual Creation',
    description: 'Generate stunning images for any creative project. Master Midjourney, DALL-E, and Stable Diffusion.',
    topics: ['Prompt engineering', 'Style control', 'Composition', 'Commercial use'],
    href: '/prompt-library/image-generation',
    color: 'cyan',
  },
]

// What's included in GenCreator OS
const gencreatorFeatures = [
  {
    icon: Wand2,
    title: 'Prompt Templates',
    description: '50+ battle-tested prompts for every creative format and platform.',
  },
  {
    icon: Palette,
    title: 'Style Frameworks',
    description: 'Develop and maintain your unique creative voice with AI assistance.',
  },
  {
    icon: Zap,
    title: 'Workflow Systems',
    description: 'Streamlined processes from ideation to publication across all platforms.',
  },
  {
    icon: Heart,
    title: 'Soul Alignment',
    description: 'Create authentically—AI that amplifies your vision, never replaces it.',
  },
]

const colorMap = {
  pink: {
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20 hover:border-pink-500/40',
    icon: 'bg-pink-500/20 text-pink-400',
    text: 'text-pink-400',
  },
  violet: {
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20 hover:border-violet-500/40',
    icon: 'bg-violet-500/20 text-violet-400',
    text: 'text-violet-400',
  },
  cyan: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20 hover:border-cyan-500/40',
    icon: 'bg-cyan-500/20 text-cyan-400',
    text: 'text-cyan-400',
  },
}

export default function CreatorsPage() {
  return (
    <>
      <CreatorBackground />
      <main className="relative min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-500/20 text-pink-400">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
                For Creators
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 max-w-4xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              Create with AI.
              <span className="mt-2 block bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Express your soul.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl"
            >
              Master AI tools that amplify your creative voice—never replace it.
              From 500+ AI songs to visual storytelling, discover the creator's path to AI mastery.
            </motion.p>

            {/* Tool badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-12 flex flex-wrap gap-3"
            >
              {creativeTools.map((tool) => (
                <span
                  key={tool.name}
                  className={`rounded-full bg-gradient-to-r ${tool.color} px-4 py-1.5 text-sm font-medium text-white/90`}
                >
                  {tool.name}
                </span>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/products/generative-creator-os"
                className="group flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-900 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/20"
              >
                <Sparkles className="h-5 w-5" />
                GenCreator OS
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/prompt-library/music-creation"
                className="group flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition-all hover:bg-white/10"
              >
                <Music className="h-5 w-5" />
                Free Music Prompts
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 border-y border-white/5">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {[
                { value: '500+', label: 'AI Songs Created', sublabel: 'Using Suno AI' },
                { value: '50+', label: 'Creator Prompts', sublabel: 'Battle-tested templates' },
                { value: '3', label: 'Creative Domains', sublabel: 'Music, Writing, Visual' },
                { value: '€97', label: 'Full System', sublabel: 'GenCreator OS' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center"
                >
                  <p className="text-3xl font-bold text-white md:text-4xl">{stat.value}</p>
                  <p className="mt-1 text-sm font-medium text-white/60">{stat.label}</p>
                  <p className="text-xs text-white/40">{stat.sublabel}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Creative Paths */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <span className="mb-4 inline-block rounded-full border border-pink-500/20 bg-pink-500/10 px-4 py-1.5 text-sm font-medium text-pink-400">
                Creative Paths
              </span>
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                Choose Your Creative Domain
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-slate-400">
                Structured paths to master AI-assisted creation. Start with prompts, develop your unique style.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-3">
              {creativePaths.map((path, i) => {
                const colors = colorMap[path.color as keyof typeof colorMap]
                const Icon = path.icon

                return (
                  <motion.div
                    key={path.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Link href={path.href} className="group block h-full">
                      <div
                        className={`relative flex h-full flex-col rounded-2xl border ${colors.border} ${colors.bg} p-8 backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl`}
                      >
                        <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl ${colors.icon}`}>
                          <Icon className="h-7 w-7" />
                        </div>

                        <h3 className="mb-3 text-xl font-bold text-white">{path.title}</h3>
                        <p className="mb-6 flex-1 text-slate-400">{path.description}</p>

                        <ul className="mb-6 space-y-2">
                          {path.topics.map((topic) => (
                            <li key={topic} className="flex items-center gap-2 text-sm text-slate-300">
                              <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-400" />
                              {topic}
                            </li>
                          ))}
                        </ul>

                        <div className="flex items-center gap-2 text-slate-400 transition-colors group-hover:text-white">
                          <span className="text-sm font-medium">Explore prompts</span>
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* GenCreator OS Feature Section */}
        <section className="py-20 border-t border-white/5">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="mb-4 inline-block rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-sm font-medium text-amber-400">
                  Premium Product
                </span>
                <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">
                  GenCreator OS
                </h2>
                <p className="mb-8 text-lg text-slate-400">
                  The complete creative operating system for AI-powered creators.
                  Templates, workflows, and frameworks that preserve your authentic voice.
                </p>

                <div className="mb-8 grid gap-4 sm:grid-cols-2">
                  {gencreatorFeatures.map((feature) => {
                    const Icon = feature.icon
                    return (
                      <div key={feature.title} className="flex gap-4">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{feature.title}</h4>
                          <p className="text-sm text-slate-400">{feature.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="flex items-baseline gap-4">
                  <span className="text-4xl font-bold text-white">€97</span>
                  <span className="text-slate-500">one-time</span>
                </div>

                <div className="mt-6 flex flex-wrap gap-4">
                  <Link
                    href="/products/generative-creator-os"
                    className="group flex items-center gap-2 rounded-full bg-amber-600 px-6 py-3 font-semibold text-white transition-all hover:bg-amber-500"
                  >
                    Get GenCreator OS
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>

              {/* Creative showcase */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-pink-500/10 via-violet-500/10 to-cyan-500/10 p-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/20">
                        <Music className="h-6 w-6 text-pink-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">500+ AI Songs</p>
                        <p className="text-sm text-slate-400">Created with Suno AI</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/20">
                        <PenLine className="h-6 w-6 text-violet-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">Content Frameworks</p>
                        <p className="text-sm text-slate-400">Blog, email, social</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/20">
                        <Image className="h-6 w-6 text-cyan-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">Visual Templates</p>
                        <p className="text-sm text-slate-400">Midjourney, DALL-E</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -right-4 -top-4 rounded-full bg-gradient-to-r from-pink-600 to-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                  <Crown className="mr-1 inline h-4 w-4" />
                  Premium
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Free Resources CTA */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900/80 to-slate-900/40 p-10 text-center backdrop-blur-xl"
            >
              <BookOpen className="mx-auto mb-6 h-12 w-12 text-pink-400" />
              <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                Start Creating Today
              </h2>
              <p className="mx-auto mb-8 max-w-lg text-slate-400">
                Explore free prompts and see what's possible with AI-powered creation.
                No signup required—just start making.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/prompt-library/music-creation"
                  className="group flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-medium text-white transition-all hover:bg-white/10"
                >
                  <Music className="h-5 w-5" />
                  Music Prompts
                </Link>
                <Link
                  href="/prompt-library/writing"
                  className="group flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-medium text-white transition-all hover:bg-white/10"
                >
                  <PenLine className="h-5 w-5" />
                  Writing Prompts
                </Link>
                <Link
                  href="/prompt-library/image-generation"
                  className="group flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-medium text-white transition-all hover:bg-white/10"
                >
                  <Image className="h-5 w-5" />
                  Image Prompts
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
