'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  BookOpen,
  Play,
  Clock,
  Users,
  Star,
  Award,
  ArrowRight,
  Code2,
  Zap,
  Shield,
  Music,
  ChevronRight,
  ExternalLink,
} from 'lucide-react'
import JsonLd from '@/components/seo/JsonLd'

// ============================================================================
// TYPES
// ============================================================================

type Course = {
  id: string
  title: string
  description: string
  level: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  lessonsCount: number
  category: 'foundations' | 'technical' | 'creative' | 'business'
  price: number
  originalPrice?: number
  isFree: boolean
  isNew: boolean
  isBestseller: boolean
  href: string
  icon: typeof BookOpen
  color: string
  gradient: string
}

// ============================================================================
// COURSE DATA
// ============================================================================

const courses: Course[] = [
  {
    id: 'conscious-ai-foundations',
    title: 'Creative AI Foundations',
    description: 'Master the philosophical and practical foundations of conscious AI. Start here if you\'re new to AI.',
    level: 'beginner',
    duration: '6 hours',
    lessonsCount: 24,
    category: 'foundations',
    price: 0,
    isFree: true,
    isNew: false,
    isBestseller: true,
    href: '/courses/conscious-ai-foundations',
    icon: BookOpen,
    color: 'text-emerald-400',
    gradient: 'from-emerald-500/20 to-emerald-500/5',
  },
  {
    id: 'prompt-engineering-mastery',
    title: 'Prompt Engineering Mastery',
    description: 'Advanced techniques for crafting effective AI prompts. From basic commands to complex multi-agent orchestration.',
    level: 'intermediate',
    duration: '8 hours',
    lessonsCount: 32,
    category: 'technical',
    price: 197,
    originalPrice: 297,
    isFree: false,
    isNew: true,
    isBestseller: false,
    href: '/courses/prompt-engineering-mastery',
    icon: Code2,
    color: 'text-cyan-400',
    gradient: 'from-cyan-500/20 to-cyan-500/5',
  },
  {
    id: 'ai-business-strategy',
    title: 'AI Business Strategy',
    description: 'Develop and execute AI strategies that drive real business value. Includes ROI frameworks and scaling principles.',
    level: 'intermediate',
    duration: '12 hours',
    lessonsCount: 48,
    category: 'business',
    price: 497,
    originalPrice: 697,
    isFree: false,
    isNew: false,
    isBestseller: true,
    href: '/courses/ai-business-strategy',
    icon: Zap,
    color: 'text-violet-400',
    gradient: 'from-violet-500/20 to-violet-500/5',
  },
  {
    id: 'agent-architecture-deep-dive',
    title: 'Agent Architecture Deep Dive',
    description: 'Technical masterclass on designing, building, and orchestrating sophisticated AI agent systems.',
    level: 'advanced',
    duration: '16 hours',
    lessonsCount: 64,
    category: 'technical',
    price: 997,
    originalPrice: 1497,
    isFree: false,
    isNew: true,
    isBestseller: false,
    href: '/courses/agent-architecture-deep-dive',
    icon: Shield,
    color: 'text-amber-400',
    gradient: 'from-amber-500/20 to-amber-500/5',
  },
  {
    id: 'ai-music-creation',
    title: 'AI Music Creation with Suno',
    description: 'Create professional music with Suno AI. From ambient soundscapes to commercial tracks.',
    level: 'beginner',
    duration: '4 hours',
    lessonsCount: 16,
    category: 'creative',
    price: 97,
    originalPrice: 147,
    isFree: false,
    isNew: true,
    isBestseller: false,
    href: '/courses/ai-music-creation',
    icon: Music,
    color: 'text-pink-400',
    gradient: 'from-pink-500/20 to-pink-500/5',
  },
]

const categories = [
  { id: 'all', label: 'All', count: courses.length },
  { id: 'foundations', label: 'Foundations', count: courses.filter(c => c.category === 'foundations').length },
  { id: 'technical', label: 'Technical', count: courses.filter(c => c.category === 'technical').length },
  { id: 'creative', label: 'Creative', count: courses.filter(c => c.category === 'creative').length },
  { id: 'business', label: 'Business', count: courses.filter(c => c.category === 'business').length },
]

// ============================================================================
// AURORA BACKGROUND
// ============================================================================

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

// ============================================================================
// COURSE CARD
// ============================================================================

function CourseCard({ course, index }: { course: Course; index: number }) {
  const Icon = course.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link
        href={course.href}
        className="group block relative p-6 rounded-2xl border border-white/5 overflow-hidden hover:border-white/10 transition-all duration-300 hover:-translate-y-1 h-full"
      >
        {/* Gradient background on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${course.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

        <div className="relative">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors`}>
              <Icon className={`w-5 h-5 ${course.color}`} />
            </div>
            <div className="flex gap-2">
              {course.isNew && (
                <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full">
                  New
                </span>
              )}
              {course.isBestseller && (
                <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs font-medium rounded-full">
                  Popular
                </span>
              )}
            </div>
          </div>

          {/* Title & Description */}
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-white transition-colors">
            {course.title}
          </h3>
          <p className="text-sm text-white/50 leading-relaxed mb-4 group-hover:text-white/60 transition-colors">
            {course.description}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-white/40 mb-6">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1">
              <Play className="w-3.5 h-3.5" />
              {course.lessonsCount} lessons
            </span>
            <span className={`capitalize px-2 py-0.5 rounded text-xs ${
              course.level === 'beginner' ? 'bg-emerald-500/20 text-emerald-400' :
              course.level === 'intermediate' ? 'bg-amber-500/20 text-amber-400' :
              'bg-red-500/20 text-red-400'
            }`}>
              {course.level}
            </span>
          </div>

          {/* Price & CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <div>
              {course.isFree ? (
                <span className="text-lg font-bold text-emerald-400">Free</span>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-white">${course.price}</span>
                  {course.originalPrice && (
                    <span className="text-sm text-white/40 line-through">${course.originalPrice}</span>
                  )}
                </div>
              )}
            </div>
            <span className="flex items-center gap-1 text-sm font-medium text-white/60 group-hover:text-white transition-colors">
              Start learning
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredCourses = selectedCategory === 'all'
    ? courses
    : courses.filter(course => course.category === selectedCategory)

  const courseListSchema = {
    name: 'FrankX AI Architecture Courses',
    description: 'Structured courses on AI architecture, agentic systems, and creative AI production.',
    numberOfItems: courses.length,
    itemListElement: courses.map((course, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Course',
        name: course.title,
        description: course.description,
        url: `https://frankx.ai${course.href}`,
        provider: { '@type': 'Organization', name: 'FrankX.AI' },
        educationalLevel: course.level === 'beginner' ? 'Beginner' : course.level === 'intermediate' ? 'Intermediate' : 'Advanced',
        timeRequired: `PT${parseInt(course.duration)}H`,
        ...(course.isFree ? { isAccessibleForFree: true } : {
          offers: { '@type': 'Offer', price: String(course.price), priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
        }),
      },
    })),
  }

  return (
    <main className="relative min-h-screen text-white">
      <JsonLd type="ItemList" data={courseListSchema} />
      <AuroraBackground />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              {/* Breadcrumb */}
              <div className="mb-8">
                <span className="text-xs font-medium uppercase tracking-[0.3em] text-emerald-400/60">
                  AI Architect Academy
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
                Enterprise AI demystified.
                <span className="block mt-2 text-white/60">For professionals who want to go deep.</span>
              </h1>

              {/* Subtext */}
              <p className="text-lg md:text-xl text-white/50 max-w-2xl mb-10 leading-relaxed">
                Practical knowledge about building AI systems that actually work in production.
                Not too basic, not too academic—just what you need to know.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-8">
                {[
                  { value: `${courses.length}`, label: 'Courses' },
                  { value: '35K+', label: 'Students' },
                  { value: '4.8', label: 'Avg Rating' },
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

        {/* Category Filters */}
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
                  <span className="ml-2 text-xs opacity-60">({cat.count})</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course, i) => (
                <CourseCard key={course.id} course={course} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* External Resources */}
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
                Hand-picked courses from Oracle, Google, and MIT that actually matter.
                These are the ones I send people to when they ask where to start.
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

        {/* CTA Section */}
        <section className="py-20 border-t border-white/5">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Start where you are.
              </h2>
              <p className="text-lg text-white/50 mb-10 max-w-2xl mx-auto">
                The free foundations course is the best place to begin.
                If you already know the basics, jump straight to the technical tracks.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/courses/conscious-ai-foundations"
                  className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-semibold transition-all hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
                >
                  Start Free Course
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/students"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium text-white/60 hover:text-white border border-white/10 hover:border-white/20 transition-all"
                >
                  View All Resources
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  )
}
