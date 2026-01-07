'use client'

import Link from 'next/link'
import { ArrowLeft, Download, FolderOpen, BookOpen, CheckCircle, Github, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

import GlassmorphicCard from '@/components/ui/GlassmorphicCard'
import PremiumButton from '@/components/ui/PremiumButton'

const vaultFeatures = [
  {
    title: 'Complete Pillar Pages',
    description: 'All 7 pillars with reflection questions, exercises, and tracking templates',
    icon: '🏛️',
  },
  {
    title: '3 Life Book Frameworks',
    description: 'Life Symphony, Golden Path, and The 7 Pillars - choose your lens',
    icon: '📚',
  },
  {
    title: 'Daily & Weekly Templates',
    description: 'Pre-built templates for daily reflections and weekly reviews',
    icon: '📝',
  },
  {
    title: 'Dataview Integration',
    description: 'Smart queries for tracking progress across all pillars',
    icon: '📊',
  },
  {
    title: 'Beautiful Theme',
    description: 'Golden accent colors and clean typography configured',
    icon: '✨',
  },
  {
    title: 'AI Prompt Library',
    description: 'Claude-powered prompts for deeper self-reflection',
    icon: '🤖',
  },
]

const vaultContents = [
  { path: 'Soulbook Home.md', desc: 'Your central dashboard' },
  { path: 'Pillars/', desc: '7 pillar pages with deep content' },
  { path: 'Life Books/', desc: 'All 3 Life Book frameworks' },
  { path: 'Templates/', desc: 'Daily and weekly templates' },
  { path: 'Daily/', desc: 'Your journal entries go here' },
  { path: '.obsidian/', desc: 'Pre-configured settings' },
]

export default function VaultPage() {
  const handleDownload = () => {
    // In production, this would trigger actual download
    window.open('https://github.com/FrankXio/soulbook/archive/refs/heads/main.zip', '_blank')
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-slate-950 to-purple-900/20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/soulbook"
            className="inline-flex items-center text-slate-400 hover:text-slate-200 mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Soulbook
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="mb-6 inline-flex items-center rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-300">
              <FolderOpen className="mr-2 h-4 w-4" />
              Free Obsidian Vault
            </div>

            <h1 className="mb-6 text-4xl font-bold bg-gradient-to-r from-amber-200 via-slate-100 to-purple-200 bg-clip-text text-transparent sm:text-5xl lg:text-6xl">
              Download Your Soulbook Vault
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-400 leading-relaxed">
              Get the complete Obsidian vault with all 7 pillars, 3 Life Books,
              templates, and AI prompts. Open-source and free forever.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <PremiumButton onClick={handleDownload} variant="primary" size="lg">
                <Download className="mr-2 h-5 w-5" />
                Download Vault (.zip)
              </PremiumButton>
              <PremiumButton
                href="https://github.com/FrankXio/soulbook"
                variant="ghost"
                size="lg"
                target="_blank"
              >
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
              </PremiumButton>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
              {[
                { label: 'Pillars', value: '7' },
                { label: 'Life Books', value: '3' },
                { label: 'Templates', value: '10+' },
              ].map((stat) => (
                <GlassmorphicCard key={stat.label} variant="subtle" className="p-4">
                  <p className="text-2xl font-bold text-amber-400">{stat.value}</p>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                </GlassmorphicCard>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-100 mb-4">What&apos;s Inside</h2>
            <p className="text-slate-400">Everything you need for transformational self-reflection</p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {vaultFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassmorphicCard variant="subtle" className="p-6 h-full">
                  <span className="text-3xl mb-4 block">{feature.icon}</span>
                  <h3 className="text-lg font-semibold text-slate-200 mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm">{feature.description}</p>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vault Structure */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-950 to-slate-900/50">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-100 mb-4">Vault Structure</h2>
            <p className="text-slate-400">Organized for clarity and growth</p>
          </motion.div>

          <GlassmorphicCard variant="luxury" border="glow" className="p-8">
            <div className="font-mono text-sm space-y-2">
              {vaultContents.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between py-2 border-b border-slate-800 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <FolderOpen className="h-4 w-4 text-amber-400" />
                    <span className="text-slate-200">{item.path}</span>
                  </div>
                  <span className="text-slate-500 text-xs">{item.desc}</span>
                </motion.div>
              ))}
            </div>
          </GlassmorphicCard>
        </div>
      </section>

      {/* Setup Instructions */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-100 mb-4">Quick Setup</h2>
            <p className="text-slate-400">Get started in 3 simple steps</p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                step: 1,
                title: 'Download the Vault',
                description: 'Click the download button above or clone from GitHub',
                code: 'git clone https://github.com/FrankXio/soulbook.git',
              },
              {
                step: 2,
                title: 'Open in Obsidian',
                description: 'Open Obsidian → Open folder as vault → Select the downloaded folder',
                code: 'Open folder: soulbook/templates/obsidian/',
              },
              {
                step: 3,
                title: 'Start Your Journey',
                description: 'Open Soulbook Home.md and take your first reflection',
                code: 'Navigate to: Soulbook Home.md',
              },
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassmorphicCard variant="subtle" className="p-6">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-slate-200 mb-2">{step.title}</h3>
                      <p className="text-slate-400 text-sm mb-3">{step.description}</p>
                      <code className="text-xs bg-slate-800 px-3 py-1.5 rounded text-amber-300 font-mono">
                        {step.code}
                      </code>
                    </div>
                    <div className="flex-shrink-0 hidden sm:block">
                      <CheckCircle className="h-6 w-6 text-green-500/50" />
                    </div>
                  </div>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Upsell */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-900/50 to-slate-950">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <GlassmorphicCard variant="luxury" border="glow" className="p-8 text-center bg-gradient-to-br from-amber-950/30 to-slate-950">
              <Sparkles className="h-10 w-10 text-amber-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-slate-100 mb-4">
                Want the Full Soulbook Experience?
              </h2>
              <p className="text-slate-400 mb-6 max-w-xl mx-auto">
                The free vault is powerful on its own. But the complete Soulbook includes
                AI-powered coaching, guided programs, and community support.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <PremiumButton href="/soulbook/assessment" variant="primary" size="lg">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Take the Assessment
                </PremiumButton>
                <PremiumButton href="/products/soulbook" variant="ghost" size="lg">
                  View Premium Options
                </PremiumButton>
              </div>
            </GlassmorphicCard>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-100 mb-6">
              Ready to Start Writing Your Soulbook?
            </h2>
            <PremiumButton onClick={handleDownload} variant="primary" size="lg">
              <Download className="mr-2 h-5 w-5" />
              Download Free Vault
            </PremiumButton>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
