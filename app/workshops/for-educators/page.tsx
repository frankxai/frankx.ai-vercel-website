'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Download,
  GraduationCap,
  Lightbulb,
  Mail,
  MessageSquare,
  Puzzle,
  Users,
} from 'lucide-react'
import { GlowCard } from '@/components/ui/glow-card'
import { workshops } from '@/data/workshops'

// ============================================================================
// DATA
// ============================================================================

const benefits = [
  {
    icon: Clock,
    title: 'Save weeks of prep',
    description:
      'Each workshop includes a structured agenda, time allocations, and facilitator talking points. Walk in prepared on day one.',
  },
  {
    icon: BookOpen,
    title: 'Professional materials',
    description:
      'Instructor notes, resource links, and learning objectives are built into every module. Ready for academic or corporate settings.',
  },
  {
    icon: Puzzle,
    title: 'Modular design',
    description:
      'Run the full workshop or extract individual modules for shorter sessions. Each module stands on its own.',
  },
  {
    icon: Users,
    title: 'Tested with real audiences',
    description:
      'Templates are designed for diverse groups — from first-year students to senior professionals. Difficulty levels are clearly marked.',
  },
  {
    icon: Download,
    title: 'Resource packs included',
    description:
      'Every workshop links to curated content on frankx.ai. Students get high-quality follow-up materials at no cost.',
  },
  {
    icon: Lightbulb,
    title: 'Instructor notes at every step',
    description:
      'Practical tips for delivery, common questions to anticipate, and suggestions for audience engagement built into each section.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Choose a template',
    description:
      'Browse the workshop library and select the template that fits your audience and time slot.',
  },
  {
    number: '02',
    title: 'Review the agenda',
    description:
      'Open the full workshop page. Expand each module to review the description, timing, and instructor notes.',
  },
  {
    number: '03',
    title: 'Customize for your context',
    description:
      'Adjust examples, swap resource links, or remove modules that do not fit your curriculum. The modular design makes this straightforward.',
  },
  {
    number: '04',
    title: 'Deliver with confidence',
    description:
      'Use the instructor notes as your facilitation guide. Share the workshop URL or QR code with participants for follow-up resources.',
  },
]

// ============================================================================
// COMPONENTS
// ============================================================================

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

function BenefitCard({
  benefit,
  index,
}: {
  benefit: (typeof benefits)[number]
  index: number
}) {
  const Icon = benefit.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
    >
      <Icon className="w-6 h-6 text-violet-400 mb-3" />
      <h3 className="text-base font-semibold text-white mb-1.5">
        {benefit.title}
      </h3>
      <p className="text-sm text-zinc-500 leading-relaxed">
        {benefit.description}
      </p>
    </motion.div>
  )
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function ForEducatorsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Hero */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/[0.04] to-transparent" />
        <div className="absolute top-10 right-1/3 w-[400px] h-[400px] bg-violet-500/[0.05] rounded-full blur-[120px]" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/workshops"
            className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            All workshops
          </Link>

          <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/[0.08] mb-6">
              <GraduationCap className="w-4 h-4 text-violet-400" />
              <span className="text-sm text-violet-400 font-medium">
                For Educators
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
              How to Use These Workshops
            </h1>

            <p className="text-lg text-zinc-400 max-w-2xl">
              Professional AI workshop templates designed for university
              classrooms, corporate training rooms, and bootcamp settings. Pick a
              template, review the agenda, and deliver with confidence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-white mb-8"
          >
            What you get
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((benefit, index) => (
              <BenefitCard key={index} benefit={benefit} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-white mb-8"
          >
            Four steps to a great workshop
          </motion.h2>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start gap-5 p-5 sm:p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02]"
              >
                <span className="text-2xl font-bold text-zinc-700 font-mono flex-shrink-0">
                  {step.number}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-white mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Templates */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-white mb-6"
          >
            Available templates
          </motion.h2>

          <div className="space-y-3">
            {workshops.map((workshop, index) => (
              <motion.div
                key={workshop.slug}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Link
                  href={`/workshops/${workshop.slug}`}
                  className="group flex items-center justify-between p-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-white group-hover:text-cyan-200 transition-colors">
                      {workshop.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-zinc-500">
                      <span>{workshop.duration}</span>
                      <span>{workshop.difficulty}</span>
                      <span>{workshop.moduleCount} modules</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-cyan-400 transition-colors flex-shrink-0 ml-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Placeholder */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.01] p-8 sm:p-10 text-center">
            <MessageSquare className="w-8 h-8 text-zinc-700 mx-auto mb-3" />
            <p className="text-sm text-zinc-600 max-w-md mx-auto">
              Educator testimonials will appear here as workshops are delivered
              in university and corporate settings.
            </p>
          </div>
        </div>
      </section>

      {/* Custom Workshop CTA */}
      <section className="pb-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <GlowCard color="violet">
              <div className="p-8 sm:p-10 text-center">
                <Mail className="w-10 h-10 text-violet-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-3">
                  Request a Custom Workshop
                </h2>
                <p className="text-sm text-zinc-400 mb-6 max-w-lg mx-auto">
                  Need a workshop tailored to your department, industry, or
                  audience level? Reach out and we can design something together.
                </p>
                <a
                  href="mailto:frank@frankx.ai?subject=Custom%20Workshop%20Request"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 text-white font-medium hover:from-violet-500 hover:to-violet-400 transition-all"
                >
                  <Mail className="w-4 h-4" />
                  Contact Frank Riemer
                </a>
                <p className="text-xs text-zinc-600 mt-3">
                  Ex-Oracle AI Architect
                </p>
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
