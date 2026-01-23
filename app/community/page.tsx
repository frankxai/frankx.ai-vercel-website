'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Users,
  MessageCircle,
  ArrowRight,
  Heart,
  BookOpen,
  Music,
  Code2,
  Sparkles,
  Mail,
} from 'lucide-react'

// Premium background
function CommunityBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-void" />
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
          background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)',
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

// What the community will offer
const communityFeatures = [
  {
    icon: MessageCircle,
    title: 'Discussion Spaces',
    description: 'Connect with creators using AI tools. Share prompts, workflows, and discoveries.',
    color: 'pink',
  },
  {
    icon: BookOpen,
    title: 'Learning Together',
    description: 'Study groups for courses, collaborative challenges, and skill building.',
    color: 'violet',
  },
  {
    icon: Music,
    title: 'Creative Showcases',
    description: 'Share your AI-created music, writing, and art. Get feedback from fellow creators.',
    color: 'cyan',
  },
  {
    icon: Code2,
    title: 'Technical Collaboration',
    description: 'Developer discussions on agents, MCP servers, and AI architecture.',
    color: 'emerald',
  },
]

// Current ways to connect
const currentConnections = [
  {
    title: 'LinkedIn',
    description: 'Follow for daily AI insights and behind-the-scenes updates.',
    href: 'https://linkedin.com/in/frank-x-riemer/',
    icon: Users,
  },
  {
    title: 'Newsletter',
    description: 'Weekly practical AI insights delivered to your inbox.',
    href: '/start',
    icon: Mail,
  },
  {
    title: 'Blog',
    description: 'Deep dives on AI tools, workflows, and creative systems.',
    href: '/blog',
    icon: BookOpen,
  },
]

const colorMap = {
  pink: {
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
    icon: 'bg-pink-500/20 text-pink-400',
    text: 'text-pink-400',
  },
  violet: {
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    icon: 'bg-violet-500/20 text-violet-400',
    text: 'text-violet-400',
  },
  cyan: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    icon: 'bg-cyan-500/20 text-cyan-400',
    text: 'text-cyan-400',
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    icon: 'bg-emerald-500/20 text-emerald-400',
    text: 'text-emerald-400',
  },
}

export default function CommunityPage() {
  return (
    <>
      <CommunityBackground />
      <main className="relative min-h-screen">
        {/* Hero */}
        <section className="pt-32 pb-16">
          <div className="mx-auto max-w-5xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-500/20 text-pink-400">
                <Users className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
                Community
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl"
            >
              Create Together.
              <span className="block text-pink-400">Grow Together.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 max-w-2xl text-lg leading-relaxed text-slate-400"
            >
              A community for creators, students, and developers who use AI as a creative partner.
              Share discoveries, learn together, and build the future of AI-assisted creation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm text-amber-400"
            >
              <Sparkles className="h-4 w-4" />
              Coming Soon
            </motion.div>
          </div>
        </section>

        {/* What We're Building */}
        <section className="py-16 border-t border-white/5">
          <div className="mx-auto max-w-5xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                What We're Building
              </h2>
              <p className="text-slate-400 max-w-xl">
                A space for creators who want to master AI tools without losing
                their authentic voice.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2">
              {communityFeatures.map((feature, i) => {
                const colors = colorMap[feature.color as keyof typeof colorMap]
                const Icon = feature.icon

                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-6 rounded-2xl border ${colors.border} ${colors.bg}`}
                  >
                    <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${colors.icon}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-400">{feature.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Connect Now */}
        <section className="py-16 border-t border-white/5">
          <div className="mx-auto max-w-5xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                Connect Now
              </h2>
              <p className="text-slate-400 max-w-xl">
                While we build the community, here's where you can connect today.
              </p>
            </motion.div>

            <div className="grid gap-4 md:grid-cols-3">
              {currentConnections.map((connection, i) => {
                const Icon = connection.icon
                const isExternal = connection.href.startsWith('http')

                return (
                  <motion.div
                    key={connection.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {isExternal ? (
                      <a
                        href={connection.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block h-full p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all"
                      >
                        <Icon className="h-6 w-6 text-slate-400 mb-4 group-hover:text-white transition-colors" />
                        <h3 className="font-semibold text-white mb-2">
                          {connection.title}
                        </h3>
                        <p className="text-sm text-slate-500">{connection.description}</p>
                      </a>
                    ) : (
                      <Link
                        href={connection.href}
                        className="group block h-full p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all"
                      >
                        <Icon className="h-6 w-6 text-slate-400 mb-4 group-hover:text-white transition-colors" />
                        <h3 className="font-semibold text-white mb-2">
                          {connection.title}
                        </h3>
                        <p className="text-sm text-slate-500">{connection.description}</p>
                      </Link>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Get Notified */}
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900/80 to-slate-900/40 p-10 text-center backdrop-blur-xl"
            >
              <Heart className="mx-auto mb-6 h-12 w-12 text-pink-400" />
              <h2 className="mb-4 text-2xl font-bold text-white">
                Be First to Know
              </h2>
              <p className="mx-auto mb-8 max-w-lg text-slate-400">
                Join the newsletter to get notified when the community launches.
                Plus weekly AI insights and creator resources.
              </p>
              <Link
                href="/start"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-900 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/20"
              >
                Join the Newsletter
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
