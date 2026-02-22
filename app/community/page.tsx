'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Users,
  MessageCircle,
  ArrowRight,
  BookOpen,
  Music,
  Code2,
  Sparkles,
  Crown,
  Zap,
  Globe,
  Radio,
  Check,
} from 'lucide-react'
import { EmailSignup } from '@/components/email-signup'

// ── Data ──

const communitySpaces = [
  {
    icon: Crown,
    title: 'Inner Circle',
    description: 'Exclusive access for premium members with direct mentorship, live labs, and priority support.',
    color: '#AB47C7',
    gradient: 'from-[#AB47C7] to-[#8B5CF6]',
    badge: 'Premium',
    href: '/inner-circle',
  },
  {
    icon: MessageCircle,
    title: 'Discussion Spaces',
    description: 'Connect with creators using AI tools. Share prompts, workflows, and discoveries.',
    color: '#43BFE3',
    gradient: 'from-[#43BFE3] to-[#3B82F6]',
    badge: 'Coming Soon',
    href: null,
  },
  {
    icon: Radio,
    title: 'Signal Newsletter',
    description: 'Weekly insights, AI trends, and exclusive content delivered straight to your inbox.',
    color: '#F59E0B',
    gradient: 'from-[#F59E0B] to-[#EF4444]',
    badge: 'Active',
    href: '/start',
  },
  {
    icon: Zap,
    title: 'Live Labs',
    description: 'Real-time build sessions — design systems, ship assets, and solve blockers together.',
    color: '#10B981',
    gradient: 'from-[#10B981] to-[#059669]',
    badge: 'Coming Soon',
    href: '/labs',
  },
]

const communityFeatures = [
  {
    icon: MessageCircle,
    title: 'Discussion Spaces',
    description: 'Connect with creators using AI tools. Share prompts, workflows, and discoveries.',
    color: '#43BFE3',
  },
  {
    icon: BookOpen,
    title: 'Learning Together',
    description: 'Study groups for courses, collaborative challenges, and skill building.',
    color: '#AB47C7',
  },
  {
    icon: Music,
    title: 'Creative Showcases',
    description: 'Share your AI-created music, writing, and art. Get feedback from fellow creators.',
    color: '#F59E0B',
  },
  {
    icon: Code2,
    title: 'Technical Collaboration',
    description: 'Developer discussions on agents, MCP servers, and AI architecture.',
    color: '#10B981',
  },
]

const currentConnections = [
  {
    title: 'LinkedIn',
    description: 'Follow for daily AI insights and behind-the-scenes updates.',
    href: 'https://linkedin.com/in/frank-x-riemer/',
    external: true,
  },
  {
    title: 'Newsletter',
    description: 'Weekly practical AI insights delivered to your inbox.',
    href: '/start',
    external: false,
  },
  {
    title: 'Blog',
    description: 'Deep dives on AI tools, workflows, and creative systems.',
    href: '/blog',
    external: false,
  },
]

// ── Animation Variants ──

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

// ── Page ──

export default function CommunityPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#0a0a0b] text-white">
      {/* Background Orbs */}
      <div className="pointer-events-none fixed inset-0">
        <motion.div
          className="absolute -right-40 top-20 h-[600px] w-[600px] rounded-full bg-[#AB47C7]/[0.06] blur-[128px]"
          animate={{ scale: [1, 1.15, 1], opacity: [1, 0.7, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -left-40 bottom-40 h-[500px] w-[500px] rounded-full bg-[#43BFE3]/[0.04] blur-[128px]"
          animate={{ scale: [1.1, 1, 1.1], opacity: [1, 0.7, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-[#F59E0B]/[0.03] blur-[128px]"
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10">
        {/* Hero */}
        <motion.section
          className="mx-auto max-w-6xl px-6 pb-16 pt-20 md:pb-24 md:pt-32"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="mx-auto max-w-4xl text-center" variants={itemVariants}>
            <motion.div
              className="mb-8 inline-flex items-center justify-center"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 rounded-full bg-[#AB47C7]/30 blur-xl"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <Globe className="relative z-10 h-20 w-20 text-[#AB47C7]" strokeWidth={1.5} />
              </div>
            </motion.div>

            <h1 className="mb-6 text-5xl font-bold text-balance md:text-7xl">
              Create Together.{' '}
              <span className="bg-gradient-to-r from-[#AB47C7] via-[#43BFE3] to-[#F59E0B] bg-clip-text text-transparent">
                Grow Together.
              </span>
            </h1>

            <p className="mb-8 text-xl leading-relaxed text-slate-400 text-balance md:text-2xl">
              A community for creators, developers, and builders who use AI as a creative partner.
            </p>

            <motion.div className="flex flex-wrap justify-center gap-4" variants={itemVariants}>
              <Link
                href="/inner-circle"
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#AB47C7] to-[#43BFE3] px-8 py-4 font-semibold text-white shadow-lg shadow-[#AB47C7]/30 transition-all hover:-translate-y-0.5"
              >
                <Crown className="h-4 w-4" />
                Join Inner Circle
              </Link>
              <Link
                href="/blog"
                className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-8 py-4 font-semibold text-white/80 transition-all hover:bg-white/10"
              >
                Explore Content
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Community Spaces */}
        <motion.section
          className="mx-auto max-w-6xl px-6 py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.div className="mb-12 text-center" variants={itemVariants}>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Choose Your{' '}
              <span className="bg-gradient-to-r from-[#AB47C7] to-[#43BFE3] bg-clip-text text-transparent">
                Space
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-400">
              Multiple ways to connect, learn, and build with the FrankX community.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {communitySpaces.map((space) => {
              const Icon = space.icon
              const isActive = space.badge === 'Active' || space.badge === 'Premium'

              return (
                <motion.div key={space.title} variants={itemVariants}>
                  <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#AB47C7]/10">
                    <div className="mb-4 flex items-start justify-between">
                      <div
                        className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${space.gradient} transition-transform duration-500 group-hover:scale-110`}
                      >
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                          isActive
                            ? 'border-[#10B981]/40 text-[#10B981]'
                            : 'border-amber-500/40 text-amber-400'
                        }`}
                      >
                        {space.badge}
                      </span>
                    </div>

                    <h3 className="mb-2 text-2xl font-bold">{space.title}</h3>
                    <p className="mb-6 leading-relaxed text-slate-400">{space.description}</p>

                    {space.href && (
                      <Link
                        href={space.href}
                        className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                        style={{ color: space.color }}
                      >
                        {isActive ? 'Join now' : 'Learn more'}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* What We're Building */}
        <motion.section
          className="mx-auto max-w-6xl px-6 py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.div className="mb-12 text-center" variants={itemVariants}>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">What We&apos;re Building</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-400">
              A space for creators who want to master AI tools without losing their authentic voice.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {communityFeatures.map((feature) => {
              const Icon = feature.icon
              return (
                <motion.div key={feature.title} variants={itemVariants}>
                  <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#AB47C7]/10">
                    <div
                      className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
                      style={{ backgroundColor: `${feature.color}20` }}
                    >
                      <Icon className="h-7 w-7" style={{ color: feature.color }} />
                    </div>
                    <h3 className="mb-3 text-xl font-bold">{feature.title}</h3>
                    <p className="leading-relaxed text-slate-400">{feature.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Connect Now */}
        <motion.section
          className="mx-auto max-w-5xl px-6 py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#AB47C7]/10 via-transparent to-[#43BFE3]/10 p-10">
              <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <Sparkles className="h-5 w-5 text-[#F59E0B]" />
                    <span className="text-sm font-semibold text-[#F59E0B]">Available Now</span>
                  </div>
                  <h2 className="mb-4 text-3xl font-bold md:text-4xl">Connect Today</h2>
                  <p className="text-lg leading-relaxed text-slate-400">
                    While we build the full community, here&apos;s where you can connect right now.
                  </p>
                </div>

                <div className="space-y-4">
                  {currentConnections.map((connection) => (
                    <div key={connection.title}>
                      {connection.external ? (
                        <a
                          href={connection.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-[#0a0a0b]/80 p-5 backdrop-blur-sm transition-all hover:border-white/20"
                        >
                          <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#10B981]" />
                          <div>
                            <h3 className="font-semibold text-white group-hover:text-[#43BFE3] transition-colors">
                              {connection.title}
                            </h3>
                            <p className="mt-1 text-sm text-slate-500">{connection.description}</p>
                          </div>
                        </a>
                      ) : (
                        <Link
                          href={connection.href}
                          className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-[#0a0a0b]/80 p-5 backdrop-blur-sm transition-all hover:border-white/20"
                        >
                          <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#10B981]" />
                          <div>
                            <h3 className="font-semibold text-white group-hover:text-[#43BFE3] transition-colors">
                              {connection.title}
                            </h3>
                            <p className="mt-1 text-sm text-slate-500">{connection.description}</p>
                          </div>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Waitlist CTA */}
        <motion.section
          className="mx-auto max-w-4xl px-6 py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center backdrop-blur-md">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#AB47C7]/10 via-[#43BFE3]/10 to-[#F59E0B]/10"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />

              <div className="relative z-10">
                <Users className="mx-auto mb-6 h-12 w-12 text-[#AB47C7]" />
                <h2 className="mb-4 text-3xl font-bold md:text-4xl">Be First to Know</h2>
                <p className="mb-8 text-lg leading-relaxed text-slate-400">
                  Join the newsletter to get notified when the community launches. Plus weekly AI
                  insights and creator resources.
                </p>

                <div className="mx-auto max-w-md">
                  <EmailSignup
                    listType="inner-circle"
                    placeholder="Enter your email"
                    buttonText="Join the Newsletter"
                    redirectTo="/thank-you"
                    showName={false}
                  />
                </div>

                <p className="mt-6 text-xs text-slate-500">
                  No spam. Unsubscribe anytime. Weekly insights for serious builders.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  )
}
