'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Compass,
  Heart,
  DollarSign,
  Users,
  ArrowLeft,
  Download,
  BookOpen,
  CheckCircle,
  Sparkles,
} from 'lucide-react'

import GlassmorphicCard from '@/components/ui/GlassmorphicCard'
import PremiumButton from '@/components/ui/PremiumButton'

const ikigaiCircles = [
  {
    icon: Heart,
    title: 'What You Love',
    color: 'rose',
    prompts: [
      'What creative activities make you lose track of time?',
      'Which projects would you work on even if no one paid you?',
      'What topics do you naturally gravitate toward when learning?',
    ],
  },
  {
    icon: Sparkles,
    title: 'What You\'re Good At',
    color: 'blue',
    prompts: [
      'What do people consistently compliment you on?',
      'Which skills come naturally to you that others find difficult?',
      'What have you built or created that you\'re proud of?',
    ],
  },
  {
    icon: DollarSign,
    title: 'What You Can Be Paid For',
    color: 'emerald',
    prompts: [
      'Which of your skills are in demand in the market?',
      'What problems can you solve that people pay money for?',
      'Where do your abilities intersect with growing industries?',
    ],
  },
  {
    icon: Users,
    title: 'What the World Needs',
    color: 'purple',
    prompts: [
      'What problems in the world genuinely concern you?',
      'Where do you see gaps that need filling?',
      'What change would you like to contribute to?',
    ],
  },
]

// Color class mapping to prevent Tailwind purging
const colorClasses = {
  rose: { text: 'text-rose-400', bg: 'bg-rose-400' },
  blue: { text: 'text-blue-400', bg: 'bg-blue-400' },
  emerald: { text: 'text-emerald-400', bg: 'bg-emerald-400' },
  purple: { text: 'text-purple-400', bg: 'bg-purple-400' },
} as const

const workshopSections = [
  {
    title: '3Cs Framework',
    duration: '15 min',
    description: 'Understand the human skills that compound with AI: Collaboration, Communication, Creation',
  },
  {
    title: 'Ikigai Discovery',
    duration: '20 min',
    description: 'Map the intersection of what you love, what you\'re good at, what you can be paid for, and what the world needs',
  },
  {
    title: 'Role Navigator',
    duration: '20 min',
    description: 'Explore 2-3 creator roles, identify 15 target companies, and craft your "wedge" ideas',
  },
  {
    title: '30/60/90 Plan',
    duration: '20 min',
    description: 'Build a realistic action plan with measurable milestones for your first 90 days',
  },
  {
    title: 'Portfolio Projects',
    duration: '20 min',
    description: 'Design 2-3 demo projects that showcase your skills and solve real problems',
  },
  {
    title: 'Social Positioning',
    duration: '20 min',
    description: 'Craft your headline, bio, content pillars, and outreach strategy',
  },
]

export default function WorkshopPage() {
  return (
    <div className="min-h-screen bg-void text-slate-100">
      {/* Header */}
      <div className="border-b border-slate-800/50 bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/students"
            className="inline-flex items-center text-base font-medium text-slate-300 transition-colors hover:text-blue-400"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Student Hub
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-950 to-purple-900/20" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-base font-medium text-blue-300"
            >
              <Compass className="mr-2 h-5 w-5" />
              Ikigai Workshop
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 text-6xl font-bold bg-gradient-to-r from-slate-100 via-blue-200 to-purple-200 bg-clip-text text-transparent sm:text-7xl"
            >
              Find Your Direction
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mx-auto mb-10 max-w-3xl text-xl leading-relaxed text-slate-300 sm:text-2xl"
            >
              A 90-minute guided workshop to discover your ikigai, map career paths,
              and build your 30/60/90 plan. Everything stays private in your browser.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <PremiumButton
                href="/workshops"
                size="lg"
                className="text-lg px-8 py-4"
              >
                Explore Workshops
                <BookOpen className="ml-2 h-5 w-5" />
              </PremiumButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Workshop Sections */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-4xl font-bold text-slate-100 sm:text-5xl">
            What You'll Create
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {workshopSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassmorphicCard variant="luxury" border="subtle" className="h-full p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <CheckCircle className="h-8 w-8 text-emerald-400" />
                    <span className="text-sm font-medium text-purple-300">{section.duration}</span>
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-slate-100">{section.title}</h3>
                  <p className="text-base text-slate-300 leading-relaxed">{section.description}</p>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ikigai Framework */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-4xl font-bold text-slate-100 sm:text-5xl">
            The Ikigai Framework
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            {ikigaiCircles.map((circle, index) => (
              <motion.div
                key={circle.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <GlassmorphicCard variant="luxury" border="glow" className="h-full p-8">
                  <circle.icon className={`mb-4 h-12 w-12 ${colorClasses[circle.color as keyof typeof colorClasses].text}`} />
                  <h3 className="mb-4 text-2xl font-bold text-slate-100">{circle.title}</h3>

                  <ul className="space-y-3">
                    {circle.prompts.map((prompt) => (
                      <li key={prompt} className="flex items-start text-base text-slate-200">
                        <span className={`mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${colorClasses[circle.color as keyof typeof colorClasses].bg}`} />
                        <span>{prompt}</span>
                      </li>
                    ))}
                  </ul>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="mx-auto max-w-3xl text-lg text-slate-300">
              Your ikigai sits at the center where all four circles overlap.
              The workshop guides you through discovering this intersection with AI-powered reflection prompts.
            </p>
          </div>
        </div>
      </section>

      {/* Privacy & Export */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <GlassmorphicCard variant="luxury" border="glow" className="p-8 text-center">
            <Download className="mx-auto mb-4 h-12 w-12 text-blue-400" />
            <h3 className="mb-4 text-3xl font-bold text-slate-100">Privacy First</h3>
            <p className="mb-6 text-lg text-slate-300 leading-relaxed">
              All your data stays in your browser. Nothing is sent to servers.
              Export to Markdown or JSON anytime and keep your work completely private.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400">
              <span className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-emerald-400" />
                Local Storage Only
              </span>
              <span className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-emerald-400" />
                Export Anytime
              </span>
              <span className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-emerald-400" />
                No Account Required
              </span>
            </div>
          </GlassmorphicCard>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-4xl font-bold text-slate-100 sm:text-5xl">
            Ready to Find Your Path?
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-xl text-slate-300">
            Launch the workshop and complete it at your own pace. Most students finish in 90-120 minutes.
          </p>
          <PremiumButton
            href="/workshops"
            size="lg"
            className="text-lg px-8 py-4"
          >
            Start Your Journey
            <BookOpen className="ml-2 h-5 w-5" />
          </PremiumButton>
        </div>
      </section>
    </div>
  )
}
