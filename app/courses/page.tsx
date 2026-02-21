'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  BookOpen,
  CalendarClock,
  ChevronRight,
  Clock,
  Code2,
  ExternalLink,
  Target,
  TrendingUp,
} from 'lucide-react'
import JsonLd from '@/components/seo/JsonLd'
import { plannedCourses } from '@/lib/courses/roadmap'

type CourseCategory = 'foundations' | 'technical' | 'business'

type CourseCardData = {
  id: string
  title: string
  description: string
  category: CourseCategory
  launchWindow: string
  commitment: string
  modules: number
  href: string
  icon: typeof BookOpen
  color: string
  gradient: string
}

const courseCards: CourseCardData[] = plannedCourses.map((course) => {
  if (course.slug === 'agent-architecture-systems') {
    return {
      id: course.slug,
      title: course.title,
      description: course.shortDescription,
      category: 'technical',
      launchWindow: course.launchWindow,
      commitment: course.commitment,
      modules: course.outline.length,
      href: `/courses/${course.slug}`,
      icon: Code2,
      color: 'text-cyan-400',
      gradient: 'from-cyan-500/20 to-cyan-500/5',
    }
  }

  if (course.slug === 'creator-business-systems') {
    return {
      id: course.slug,
      title: course.title,
      description: course.shortDescription,
      category: 'business',
      launchWindow: course.launchWindow,
      commitment: course.commitment,
      modules: course.outline.length,
      href: `/courses/${course.slug}`,
      icon: TrendingUp,
      color: 'text-violet-400',
      gradient: 'from-violet-500/20 to-violet-500/5',
    }
  }

  return {
    id: course.slug,
    title: course.title,
    description: course.shortDescription,
    category: 'foundations',
    launchWindow: course.launchWindow,
    commitment: course.commitment,
    modules: course.outline.length,
    href: `/courses/${course.slug}`,
    icon: Target,
    color: 'text-emerald-400',
    gradient: 'from-emerald-500/20 to-emerald-500/5',
  }
})

const categories = [
  { id: 'all', label: 'All' },
  { id: 'foundations', label: 'Foundations' },
  { id: 'technical', label: 'Technical' },
  { id: 'business', label: 'Business' },
] as const

function AuroraBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#030712]" />
      <motion.div
        className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.06) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-[30%] -right-[10%] w-[60%] h-[60%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.05) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{ x: [0, -80, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}

function CourseCard({ course, index }: { course: CourseCardData; index: number }) {
  const Icon = course.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
    >
      <Link
        href={course.href}
        className="group block relative p-6 rounded-2xl border border-white/5 overflow-hidden hover:border-white/10 transition-all duration-300 hover:-translate-y-1 h-full"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${course.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
              <Icon className={`w-5 h-5 ${course.color}`} />
            </div>
            <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs font-medium rounded-full">
              Planned
            </span>
          </div>

          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-white transition-colors">
            {course.title}
          </h3>
          <p className="text-sm text-white/60 leading-relaxed mb-5 group-hover:text-white/70 transition-colors">
            {course.description}
          </p>

          <div className="space-y-2 text-xs text-white/45 mb-6">
            <div className="flex items-center gap-2">
              <CalendarClock className="w-3.5 h-3.5" />
              {course.launchWindow}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" />
              {course.commitment}
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5" />
              {course.modules} draft modules
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <span className="text-sm font-semibold text-amber-300">Waitlist Open</span>
            <span className="flex items-center gap-1 text-sm font-medium text-white/60 group-hover:text-white transition-colors">
              View roadmap
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | CourseCategory>('all')

  const filteredCourses = useMemo(() => {
    if (selectedCategory === 'all') return courseCards
    return courseCards.filter((course) => course.category === selectedCategory)
  }, [selectedCategory])

  const categoryCounts = useMemo(() => {
    return {
      all: courseCards.length,
      foundations: courseCards.filter((course) => course.category === 'foundations').length,
      technical: courseCards.filter((course) => course.category === 'technical').length,
      business: courseCards.filter((course) => course.category === 'business').length,
    }
  }, [])

  const courseListSchema = {
    name: 'FrankX Course Roadmap',
    description:
      'Planned course roadmap for AI foundations, agent architecture systems, and creator business systems.',
    numberOfItems: courseCards.length,
    itemListElement: courseCards.map((course, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Course',
        name: course.title,
        description: course.description,
        url: `https://frankx.ai${course.href}`,
        provider: { '@type': 'Organization', name: 'FrankX.AI' },
      },
    })),
  }

  return (
    <main className="relative min-h-screen text-white">
      <JsonLd type="ItemList" data={courseListSchema} />
      <AuroraBackground />

      <div className="relative z-10">
        <section className="pt-32 pb-20">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <div className="mb-8 flex items-center gap-4">
                <Image src="/images/mascot/mascot-v25-crystal-familiar.png" alt="Axi" width={48} height={48} className="rounded-xl" style={{ boxShadow: '0 0 16px -4px rgba(139,92,246,0.3)' }} />
                <span className="text-xs font-medium uppercase tracking-[0.3em] text-emerald-400/60">
                  AI Architect Academy
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
                Course roadmap, truth-first.
                <span className="block mt-2 text-white/60">Only planned tracks and live waitlists.</span>
              </h1>

              <p className="text-lg md:text-xl text-white/50 max-w-2xl mb-10 leading-relaxed">
                These are planned courses. No paid enrollment or video lesson library is live yet.
                Each page shows what is currently true and collects waitlist interest.
              </p>

              <div className="flex flex-wrap gap-8">
                {[
                  { value: `${courseCards.length}`, label: 'Planned Courses' },
                  { value: 'Waitlist Open', label: 'Enrollment Status' },
                  { value: 'Q2-Q4 2026', label: 'Launch Targets' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="text-left"
                  >
                    <div className="text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs uppercase tracking-[0.2em] text-white/40">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-8 border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-white text-black'
                      : 'bg-white/5 text-white/60 border border-white/10 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {cat.label}
                  <span className="ml-2 text-xs opacity-60">({categoryCounts[cat.id]})</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course, i) => (
                <CourseCard key={course.id} course={course} index={i} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-emerald-400/70 mb-2">
                Curated Learning
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Free courses I recommend
              </h2>
              <p className="text-white/50 max-w-2xl">
                External resources from Oracle, Google, and MIT while the FrankX courses are still in development.
              </p>
            </motion.div>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  name: 'Oracle AI Foundations',
                  source: 'Oracle',
                  type: 'Certification',
                  href: 'https://education.oracle.com/oracle-ai-foundations/pexam_1Z0-1122-1',
                },
                {
                  name: 'Google AI Essentials',
                  source: 'Coursera',
                  type: 'Course',
                  href: 'https://www.coursera.org/learn/google-ai-essentials',
                },
                {
                  name: 'ML Crash Course',
                  source: 'Google',
                  type: 'Course',
                  href: 'https://developers.google.com/machine-learning/crash-course',
                },
                {
                  name: 'Intro to Deep Learning',
                  source: 'MIT',
                  type: 'Course',
                  href: 'http://introtodeeplearning.com/',
                },
              ].map((resource, i) => (
                <motion.a
                  key={resource.name}
                  href={resource.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group flex items-center justify-between p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all"
                >
                  <div>
                    <div className="text-xs uppercase tracking-[0.15em] text-white/30 mb-1">
                      {resource.type} · {resource.source}
                    </div>
                    <div className="text-base font-medium text-white group-hover:text-emerald-400 transition-colors">
                      {resource.name}
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 border-t border-white/5">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Want launch updates first?
              </h2>
              <p className="text-lg text-white/50 mb-10 max-w-2xl mx-auto">
                Join the course waitlist from any roadmap page and get beta invites and release notifications.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/courses/conscious-ai-foundations#waitlist"
                  className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-semibold transition-all hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
                >
                  Join Waitlist
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/students"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium text-white/60 hover:text-white border border-white/10 hover:border-white/20 transition-all"
                >
                  View Free Resources
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  )
}
