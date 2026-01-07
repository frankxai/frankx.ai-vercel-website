'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  GraduationCap,
  Brain,
  Rocket,
  Target,
  Users,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Zap,
  Code,
  Heart,
  DollarSign,
  TrendingUp,
  MessageSquare,
  Lightbulb,
  BookOpen,
  Compass,
} from 'lucide-react'

import GlassmorphicCard from '@/components/ui/GlassmorphicCard'
import PremiumButton from '@/components/ui/PremiumButton'

// AI CoE Domains for Student Creators
const coeDomains = [
  {
    icon: Code,
    name: 'Creative Practice',
    description: 'Build your AI-augmented creative workflow across music, writing, video, and visual art',
    color: 'purple',
    agents: ['Portfolio Builder AI', 'Workflow Optimizer', 'Creative Coach'],
    prompts: 5,
  },
  {
    icon: Target,
    name: 'Career Development',
    description: 'Navigate the AI-native job market with positioning, networking, and skill development',
    color: 'blue',
    agents: ['Career Navigator', 'Interview Prep AI', 'Skill Gap Analyzer'],
    prompts: 8,
  },
  {
    icon: Sparkles,
    name: 'Content Creation',
    description: 'Ship consistent, high-quality content that builds audience and opens opportunities',
    color: 'emerald',
    agents: ['Content Strategist', 'Post Optimizer', 'Engagement Analyzer'],
    prompts: 6,
  },
  {
    icon: TrendingUp,
    name: 'Business & Revenue',
    description: 'Launch your first offers, products, or services while still in school',
    color: 'amber',
    agents: ['Offer Architect', 'Pricing Strategist', 'Revenue Tracker'],
    prompts: 7,
  },
  {
    icon: MessageSquare,
    name: 'Communication',
    description: 'Master written, verbal, and visual communication amplified by AI tools',
    color: 'rose',
    agents: ['Message Refiner', 'Pitch Coach', 'Feedback Synthesizer'],
    prompts: 5,
  },
  {
    icon: Heart,
    name: 'Wellbeing & Energy',
    description: 'Sustain peak performance through health, fitness, mindset, and recovery practices',
    color: 'cyan',
    agents: ['Habit Tracker', 'Energy Optimizer', 'Mindset Coach'],
    prompts: 4,
  },
]

// Student Creator Journey Paths
const journeyPaths = [
  {
    title: 'Discovery Phase',
    duration: 'Week 1-2',
    steps: [
      'Complete the Ikigai Workshop to find your direction',
      'Identify 2-3 creator roles that excite you',
      'Map your current skills vs. target roles',
      'Choose your first domain to build AI support',
    ],
  },
  {
    title: 'Build Phase',
    duration: 'Week 3-6',
    steps: [
      'Design your personal AI CoE with 3-4 domain agents',
      'Ship your first portfolio project (demo-ready)',
      'Publish 3-5 pieces of content about your learning',
      'Connect with 10 people in your target industry',
    ],
  },
  {
    title: 'Launch Phase',
    duration: 'Week 7-12',
    steps: [
      'Complete and document a case study project',
      'Build your creator presence (LinkedIn, portfolio site)',
      'Apply to 15-20 roles or opportunities',
      'Launch your first paid offer or service',
    ],
  },
]

// Quick Wins for Students
const quickWins = [
  {
    icon: BookOpen,
    title: 'Ikigai Workshop',
    description: 'Find your direction in 90 minutes with AI-guided self-discovery',
    time: '90 min',
    link: '/students/workshop',
  },
  {
    icon: Compass,
    title: 'Role Navigator',
    description: 'Explore 15+ AI-native creator roles with company lists and wedge ideas',
    time: '30 min',
    link: '/students/roles',
  },
  {
    icon: Lightbulb,
    title: 'Prompt Starter Kit',
    description: '50+ proven prompts organized by creator domain',
    time: '15 min',
    link: '/students/prompts',
  },
  {
    icon: Zap,
    title: 'AI CoE Builder',
    description: 'Design your personal AI support system in under an hour',
    time: '45 min',
    link: '/students/coe-builder',
  },
]

export default function StudentsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-950 to-purple-900/20" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-sm font-medium text-blue-300"
            >
              <GraduationCap className="mr-2 h-5 w-5" />
              Built for Student Creators
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8 text-6xl font-bold bg-gradient-to-r from-slate-100 via-blue-200 to-purple-200 bg-clip-text text-transparent sm:text-7xl lg:text-8xl"
            >
              Build Your Creator
              <br />
              Intelligence System
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mx-auto mb-12 max-w-4xl text-2xl leading-relaxed text-slate-300 sm:text-3xl"
            >
              From student to professional creator in 12 weeks. Build your AI Center of Excellence,
              ship portfolio projects, and launch your first offers—all before graduation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <PremiumButton href="/students/workshop" size="lg" className="text-lg px-8 py-4">
                Start Ikigai Workshop
                <ArrowRight className="ml-2 h-5 w-5" />
              </PremiumButton>
              <Link
                href="/students/coe-builder"
                className="group inline-flex items-center rounded-xl border-2 border-slate-700 bg-slate-900/50 px-8 py-4 text-lg font-semibold text-slate-200 transition-all hover:border-purple-500/50 hover:bg-slate-800/50"
              >
                Build Your AI CoE
                <Sparkles className="ml-2 h-5 w-5 transition-transform group-hover:rotate-12" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-slate-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="mb-2 text-5xl font-bold text-blue-400">12</div>
              <div className="text-lg text-slate-400">Weeks to Launch</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="mb-2 text-5xl font-bold text-purple-400">6</div>
              <div className="text-lg text-slate-400">Creator Domains</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="mb-2 text-5xl font-bold text-emerald-400">50+</div>
              <div className="text-lg text-slate-400">AI Prompts</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="mb-2 text-5xl font-bold text-amber-400">100%</div>
              <div className="text-lg text-slate-400">Privacy-First</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Wins Section */}
      <section className="py-24 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-6 text-5xl font-bold text-slate-100 sm:text-6xl">
              Start Building Today
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-slate-300 sm:text-2xl">
              Get immediate value with these quick-start tools designed for busy students
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {quickWins.map((win, index) => (
              <motion.div
                key={win.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={win.link}>
                  <GlassmorphicCard
                    variant="luxury"
                    border="glow"
                    hover
                    className="group h-full p-6 cursor-pointer"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <win.icon className="h-10 w-10 text-blue-400" />
                      <span className="text-sm font-medium text-purple-300">{win.time}</span>
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-slate-100 group-hover:text-blue-300 transition-colors">
                      {win.title}
                    </h3>
                    <p className="text-base text-slate-300 leading-relaxed">{win.description}</p>
                  </GlassmorphicCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI CoE Domains Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-6 text-5xl font-bold text-slate-100 sm:text-6xl">
              Your Creator CoE Domains
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-slate-300 sm:text-2xl">
              Build dedicated AI support across the 6 domains that matter most for emerging creators
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {coeDomains.map((domain, index) => (
              <motion.div
                key={domain.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassmorphicCard variant="luxury" border="subtle" className="h-full p-8">
                  <domain.icon className={`mb-4 h-12 w-12 text-${domain.color}-400`} />
                  <h3 className="mb-3 text-2xl font-bold text-slate-100">{domain.name}</h3>
                  <p className="mb-6 text-base leading-relaxed text-slate-300">
                    {domain.description}
                  </p>

                  <div className="mb-4 space-y-2">
                    <div className="text-sm font-semibold text-purple-300">Suggested Agents:</div>
                    {domain.agents.map((agent) => (
                      <div key={agent} className="flex items-center text-sm text-slate-200">
                        <Brain className="mr-2 h-4 w-4 text-blue-400" />
                        {agent}
                      </div>
                    ))}
                  </div>

                  <div className={`inline-flex items-center rounded-full bg-${domain.color}-500/10 px-3 py-1 text-sm font-medium text-${domain.color}-300`}>
                    <Zap className="mr-1.5 h-3.5 w-3.5" />
                    {domain.prompts} starter prompts
                  </div>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <PremiumButton href="/students/coe-builder" size="lg" className="text-lg px-8 py-4">
              Build Your Complete CoE
              <ArrowRight className="ml-2 h-5 w-5" />
            </PremiumButton>
          </motion.div>
        </div>
      </section>

      {/* Journey Timeline Section */}
      <section className="py-24 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-6 text-5xl font-bold text-slate-100 sm:text-6xl">
              Your 12-Week Journey
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-slate-300 sm:text-2xl">
              From discovering your path to launching your first creator offer
            </p>
          </motion.div>

          <div className="space-y-8">
            {journeyPaths.map((phase, index) => (
              <motion.div
                key={phase.title}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <GlassmorphicCard variant="luxury" border="glow" className="p-8">
                  <div className="flex flex-col gap-6 md:flex-row md:items-start">
                    <div className="flex-shrink-0">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 text-2xl font-bold text-white">
                        {index + 1}
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <h3 className="text-3xl font-bold text-slate-100">{phase.title}</h3>
                        <span className="text-lg font-medium text-purple-300">{phase.duration}</span>
                      </div>

                      <ul className="space-y-3">
                        {phase.steps.map((step) => (
                          <li key={step} className="flex items-start text-lg text-slate-200">
                            <CheckCircle className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-emerald-400" />
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-slate-950 to-blue-900/30" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 text-5xl font-bold text-slate-100 sm:text-6xl">
              Ready to Build Your Future?
            </h2>
            <p className="mx-auto mb-12 max-w-3xl text-xl text-slate-300 sm:text-2xl">
              Join hundreds of students building their creator intelligence systems.
              All tools are privacy-first, free to start, and designed for real results.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <PremiumButton href="/students/workshop" size="lg" className="text-lg px-8 py-4">
                Start Ikigai Workshop
                <Rocket className="ml-2 h-5 w-5" />
              </PremiumButton>
              <Link
                href="/students/prompts"
                className="inline-flex items-center rounded-xl border-2 border-slate-700 bg-slate-900/50 px-8 py-4 text-lg font-semibold text-slate-200 transition-all hover:border-blue-500/50 hover:bg-slate-800/50"
              >
                Browse Prompt Library
                <Lightbulb className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="border-t border-slate-800/50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-base text-slate-400">
              <strong className="text-slate-300">Privacy First:</strong> All workshops and tools run
              locally in your browser. Your data stays on your device. Export anytime.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
