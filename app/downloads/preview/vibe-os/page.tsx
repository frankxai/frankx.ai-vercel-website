'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Mail,
  Download,
  Sparkles,
  Music,
  Palette,
  Zap,
  CheckCircle,
  Clock,
  BookOpen,
  ExternalLink
} from 'lucide-react'

import VibeOSEmailModal from './VibeOSEmailModal'

export default function VibeOSLeadMagnetPage() {
  const [emailModalOpen, setEmailModalOpen] = useState(false)
  const [sessionId] = useState(() => `session-${Date.now()}`)

  const pdfUrl = '/pdf-templates/vibe-os-guide.html'

  return (
    <main className="relative min-h-screen overflow-hidden bg-void">
      {/* Ambient Background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(6,182,212,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(139,92,246,0.06),transparent_40%)]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-void/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/downloads"
            className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            All Downloads
          </Link>

          <Link
            href="/products/vibe-os"
            className="group inline-flex items-center gap-2 text-sm text-cyan-400 transition-colors hover:text-cyan-300"
          >
            View Full Product
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="px-6 pb-16 pt-12">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.15em] text-cyan-200"
            >
              <Sparkles className="h-4 w-4" />
              Free Download
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl"
            >
              The Vibe OS{' '}
              <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">
                Quickstart Guide
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mt-6 max-w-2xl text-lg text-white/70"
            >
              The exact framework behind 500+ AI songs. Go from emotional vision to finished track
              using proven Suno workflows and emotion mapping techniques.
            </motion.p>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/50"
            >
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-cyan-400" />
                <span>10 min read</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-emerald-400" />
                <span>15 pages</span>
              </div>
              <div className="flex items-center gap-2">
                <Music className="h-4 w-4 text-violet-400" />
                <span>10 Starter Prompts</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            >
              <button
                onClick={() => setEmailModalOpen(true)}
                className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-[0_20px_60px_rgba(6,182,212,0.4)] transition-all hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(6,182,212,0.5)]"
              >
                <Mail className="h-5 w-5" />
                Get Via Email
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition-all hover:border-white/20 hover:bg-white/10"
              >
                <Download className="h-5 w-5" />
                Download Now
              </a>
            </motion.div>
          </div>
        </section>

        {/* What's Inside Section */}
        <section className="relative py-16">
          <div className="absolute inset-0 bg-gradient-to-b from-void via-space/30 to-void" />

          <div className="relative mx-auto max-w-5xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12 text-center"
            >
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                What&apos;s Inside the Guide
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-white/60">
                A condensed version of the full Vibe OS system, perfect for getting started
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: Music,
                  title: '10 Starter Prompts',
                  description: 'Genre-tested prompts for electronic, ambient, hip-hop, and cinematic styles',
                  color: 'cyan'
                },
                {
                  icon: Palette,
                  title: 'Emotion Mapping Intro',
                  description: 'The basics of translating feelings into sonic cues that resonate',
                  color: 'violet'
                },
                {
                  icon: Zap,
                  title: 'Quick-Start Workflow',
                  description: 'The 5-step ritual to go from idea to finished track in one session',
                  color: 'emerald'
                }
              ].map((item, index) => {
                const Icon = item.icon
                const colorClasses = {
                  cyan: 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/20 text-cyan-300',
                  violet: 'from-violet-500/20 to-violet-500/5 border-violet-500/20 text-violet-300',
                  emerald: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/20 text-emerald-300'
                }

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={`rounded-2xl border bg-gradient-to-b p-6 ${colorClasses[item.color as keyof typeof colorClasses]}`}
                  >
                    <Icon className="mb-4 h-8 w-8" />
                    <h3 className="mb-2 text-lg font-semibold text-white">{item.title}</h3>
                    <p className="text-sm text-white/60">{item.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Preview Section */}
        <section className="relative py-16">
          <div className="mx-auto max-w-5xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8 text-center"
            >
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                Preview the Guide
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-white/60">
                Read it right here or download for offline access
              </p>
            </motion.div>

            {/* Guide Preview Embed */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-red-500/70" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
                  <div className="h-3 w-3 rounded-full bg-green-500/70" />
                </div>
                <span className="text-xs text-white/40">vibe-os-guide.html</span>
              </div>
              <iframe
                src={pdfUrl}
                className="h-[600px] w-full bg-white"
                title="Vibe OS Guide Preview"
              />
            </motion.div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            >
              <button
                onClick={() => setEmailModalOpen(true)}
                className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-[0_20px_60px_rgba(6,182,212,0.4)] transition-all hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(6,182,212,0.5)]"
              >
                <Mail className="h-5 w-5" />
                Get Full Guide Via Email
              </button>

              <a
                href={pdfUrl}
                download="vibe-os-quickstart-guide.html"
                className="group inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition-all hover:border-white/20 hover:bg-white/10"
              >
                <Download className="h-5 w-5" />
                Download HTML
              </a>
            </motion.div>
          </div>
        </section>

        {/* Upgrade CTA Section */}
        <section className="relative py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-void via-space/50 to-void" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(6,182,212,0.1),transparent_50%)]" />

          <div className="relative mx-auto max-w-4xl px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-5 py-2 text-xs font-medium uppercase tracking-[0.15em] text-amber-200">
                <Sparkles className="h-4 w-4" />
                Want More?
              </div>

              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
                Get the Complete Vibe OS System
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-white/60">
                This guide is just the beginning. The full Vibe OS includes 50+ genre prompts,
                complete emotion mapping system, release playbooks, and production enhancement guides.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-white/60">
                {['50+ Genre Prompts', 'Emotion Mapping System', 'Release Playbooks', 'Production Guide'].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Link
                  href="/products/vibe-os"
                  className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-10 py-5 text-lg font-semibold text-white shadow-[0_20px_60px_rgba(245,158,11,0.35)] transition-all hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(245,158,11,0.45)]"
                >
                  Explore Full Vibe OS
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Email Modal */}
      <VibeOSEmailModal
        isOpen={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
        pdfUrl={pdfUrl}
        sessionId={sessionId}
      />
    </main>
  )
}
