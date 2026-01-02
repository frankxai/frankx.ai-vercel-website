'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  GraduationCap,
  ArrowRight,
  BookOpen,
  Target,
  Award,
  ExternalLink,
  CheckCircle2,
  Clock,
  Sparkles,
  Play,
  Users,
  Zap,
  Brain,
  Rocket,
  Star,
  Quote,
  TrendingUp,
  Code2,
  Palette,
  Music2,
  MessageSquare,
} from 'lucide-react'

// ============================================================================
// AURORA BACKGROUND
// ============================================================================

function AuroraBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#030712]" />

      {/* Gradient orbs */}
      <motion.div
        className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.08) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-[30%] -right-[10%] w-[60%] h-[60%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.06) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{ x: [0, -80, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/2 left-1/3 w-[40%] h-[40%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.05) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Subtle grid */}
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
// DATA
// ============================================================================

const learningPaths = [
  {
    id: 'oracle-ai',
    title: 'Oracle AI Foundations',
    provider: 'Oracle',
    duration: '8-12 hours',
    level: 'Beginner',
    description: 'Official Oracle certification path covering AI fundamentals, machine learning basics, and Oracle Cloud AI services.',
    url: 'https://mylearn.oracle.com/ou/learning-path/oracle-ai-foundations/122395',
    highlights: ['Free certification', 'Cloud AI services', 'Enterprise-ready skills'],
    color: 'cyan',
    badge: 'Certification',
  },
  {
    id: 'google-ai',
    title: 'Google AI Essentials',
    provider: 'Google',
    duration: '10 hours',
    level: 'Beginner',
    description: "Google's foundational AI course covering practical applications of AI, prompt engineering, and responsible AI use.",
    url: 'https://grow.google/ai-essentials',
    highlights: ['Hands-on projects', 'Prompt engineering', 'Career-ready certificate'],
    color: 'emerald',
    badge: 'Certificate',
  },
  {
    id: 'mit-intro',
    title: 'Introduction to Deep Learning',
    provider: 'MIT',
    duration: '20+ hours',
    level: 'Intermediate',
    description: "MIT's legendary deep learning course covering neural networks, computer vision, NLP, and generative AI.",
    url: 'http://introtodeeplearning.com/',
    highlights: ['World-class instruction', 'Deep technical foundations', 'Research-grade content'],
    color: 'violet',
    badge: 'Advanced',
  },
  {
    id: 'anthropic-prompt',
    title: 'Prompt Engineering Guide',
    provider: 'Anthropic',
    duration: '3-5 hours',
    level: 'Beginner',
    description: 'Learn to write effective prompts for Claude and other LLMs. Essential skills for working with AI.',
    url: 'https://docs.anthropic.com/claude/docs/prompt-engineering',
    highlights: ['Official Claude docs', 'Best practices', 'Real examples'],
    color: 'amber',
    badge: 'Essential',
  },
  {
    id: 'deeplearning-ai',
    title: 'AI for Everyone',
    provider: 'DeepLearning.AI',
    duration: '6 hours',
    level: 'Beginner',
    description: 'Andrew Ng\'s accessible introduction to AI for non-technical professionals. Understand the capabilities and limitations.',
    url: 'https://www.deeplearning.ai/courses/ai-for-everyone/',
    highlights: ['Non-technical friendly', 'Business applications', 'Industry insights'],
    color: 'rose',
    badge: 'Popular',
  },
  {
    id: 'stanford-ml',
    title: 'Machine Learning Specialization',
    provider: 'Stanford',
    duration: '3 months',
    level: 'Intermediate',
    description: 'Andrew Ng\'s comprehensive ML course covering supervised learning, unsupervised learning, and best practices.',
    url: 'https://www.coursera.org/specializations/machine-learning-introduction',
    highlights: ['Stanford quality', 'Hands-on labs', 'Career credentials'],
    color: 'cyan',
    badge: 'Comprehensive',
  },
]

const quickStartResources = [
  {
    title: 'ChatGPT Basics',
    description: 'Start using AI in 5 minutes',
    icon: MessageSquare,
    url: 'https://chat.openai.com',
    color: 'emerald',
  },
  {
    title: 'Claude by Anthropic',
    description: 'Conversational AI assistant',
    icon: Brain,
    url: 'https://claude.ai',
    color: 'violet',
  },
  {
    title: 'Suno AI Music',
    description: 'Create music with AI',
    icon: Music2,
    url: 'https://suno.com',
    color: 'cyan',
  },
  {
    title: 'Midjourney',
    description: 'AI image generation',
    icon: Palette,
    url: 'https://midjourney.com',
    color: 'amber',
  },
]

const testimonials = [
  {
    quote: "These curated paths saved me months of searching. Started with Oracle AI Foundations, now I'm building production ML systems.",
    author: "Maria Chen",
    role: "Software Engineer → ML Engineer",
    avatar: "MC",
    color: 'cyan',
  },
  {
    quote: "The Ikigai workshop helped me find my intersection of AI and creativity. Now I'm building AI tools for musicians.",
    author: "James Rodriguez",
    role: "Musician → AI Creator",
    avatar: "JR",
    color: 'violet',
  },
  {
    quote: "Finally, AI resources that don't feel overwhelming. The structured paths made it easy to know where to start.",
    author: "Sarah Kim",
    role: "Marketing Manager",
    avatar: "SK",
    color: 'emerald',
  },
]

const learningMilestones = [
  { week: 1, title: 'AI Foundations', description: 'Understand what AI is and isn\'t' },
  { week: 2, title: 'Prompt Engineering', description: 'Learn to communicate with AI effectively' },
  { week: 4, title: 'Practical Applications', description: 'Apply AI to your creative work' },
  { week: 8, title: 'Building Systems', description: 'Create your own AI workflows' },
]

const colorMap: Record<string, { bg: string; border: string; icon: string; text: string; badge: string }> = {
  cyan: {
    bg: 'bg-cyan-500/5',
    border: 'border-cyan-500/20 hover:border-cyan-500/40',
    icon: 'bg-cyan-500/10 text-cyan-400',
    text: 'text-cyan-400',
    badge: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
  },
  emerald: {
    bg: 'bg-emerald-500/5',
    border: 'border-emerald-500/20 hover:border-emerald-500/40',
    icon: 'bg-emerald-500/10 text-emerald-400',
    text: 'text-emerald-400',
    badge: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  },
  violet: {
    bg: 'bg-violet-500/5',
    border: 'border-violet-500/20 hover:border-violet-500/40',
    icon: 'bg-violet-500/10 text-violet-400',
    text: 'text-violet-400',
    badge: 'bg-violet-500/10 text-violet-400 border border-violet-500/20',
  },
  amber: {
    bg: 'bg-amber-500/5',
    border: 'border-amber-500/20 hover:border-amber-500/40',
    icon: 'bg-amber-500/10 text-amber-400',
    text: 'text-amber-400',
    badge: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  },
  rose: {
    bg: 'bg-rose-500/5',
    border: 'border-rose-500/20 hover:border-rose-500/40',
    icon: 'bg-rose-500/10 text-rose-400',
    text: 'text-rose-400',
    badge: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
  },
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function StudentsPage() {
  return (
    <main className="relative min-h-screen text-white">
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
              <div className="mb-8 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/10">
                  <GraduationCap className="w-5 h-5 text-cyan-400" />
                </div>
                <span className="text-xs font-medium uppercase tracking-[0.3em] text-cyan-400/60">
                  For Students
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
                Learn AI the right way.
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-violet-400">
                  Free, world-class courses.
                </span>
              </h1>

              {/* Subtext */}
              <p className="text-lg md:text-xl text-white/50 max-w-2xl mb-10 leading-relaxed">
                I've curated the best free AI courses from Oracle, Google, MIT, Stanford, and more.
                No paywalls, no fluff—just high-quality learning from top institutions.
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap gap-8">
                {[
                  { value: '6+', label: 'Curated Courses' },
                  { value: '100%', label: 'Free Access' },
                  { value: '50+', label: 'Hours of Content' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <div className="text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs uppercase tracking-[0.2em] text-white/40">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why Learn AI Section */}
        <section className="py-16 border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-emerald-400/70 mb-2">
                Why Now
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                AI is transforming every industry
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: TrendingUp,
                  title: 'Career Growth',
                  description: 'AI skills are the most in-demand. Companies are actively seeking people who understand AI.',
                  color: 'emerald',
                },
                {
                  icon: Rocket,
                  title: 'Creative Amplification',
                  description: 'AI multiplies your creative output. Write, code, design, and compose faster than ever.',
                  color: 'cyan',
                },
                {
                  icon: Zap,
                  title: 'Future-Proofing',
                  description: 'Understanding AI isn\'t optional anymore. It\'s the foundation of the next decade.',
                  color: 'violet',
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/10 transition-all"
                >
                  <div className={`p-3 rounded-xl ${colorMap[item.color].icon} w-fit mb-4`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Ikigai Workshop Feature */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Link href="/students/ikigai" className="group block">
                <div className="relative overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 via-slate-900/50 to-cyan-500/10 p-8 md:p-10 transition-all duration-500 hover:border-violet-500/40">
                  {/* Decorative gradient */}
                  <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 blur-3xl" />
                  <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 blur-3xl" />

                  <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-violet-500/20 text-violet-400">
                          <Target className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-xs font-medium uppercase tracking-[0.15em] text-violet-400">
                            Featured Workshop
                          </span>
                          <h2 className="text-2xl font-bold text-white">Ikigai Workshop</h2>
                        </div>
                      </div>
                      <p className="text-white/60 leading-relaxed mb-4">
                        Find your purpose at the intersection of passion, skill, impact, and income.
                        Build your 30/60/90 plan and portfolio strategy for the AI age.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {['Self-paced', '2-3 hours', 'Privacy-first', 'Free'].map((tag) => (
                          <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/50">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-white/60 transition-colors group-hover:text-white">
                      <span className="font-medium">Start workshop</span>
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Quick Start Tools */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-amber-400/70 mb-2">
                Quick Start
              </p>
              <h2 className="text-2xl font-bold text-white">Start using AI in 5 minutes</h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickStartResources.map((resource, i) => (
                <motion.a
                  key={resource.title}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04] transition-all"
                >
                  <div className={`p-2.5 rounded-lg ${colorMap[resource.color].icon} w-fit mb-3`}>
                    <resource.icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-xs text-white/40">{resource.description}</p>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Learning Paths Grid */}
        <section className="py-16 border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-end justify-between mb-10"
            >
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-cyan-400/70 mb-2">
                  Curated Courses
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-white">World-class learning, zero cost</h2>
              </div>
              <span className="hidden md:block text-xs uppercase tracking-[0.2em] text-white/40">
                {learningPaths.length} courses
              </span>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {learningPaths.map((path, index) => {
                const colors = colorMap[path.color]
                return (
                  <motion.div
                    key={path.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <a
                      href={path.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block h-full"
                    >
                      <div
                        className={`relative flex h-full flex-col rounded-2xl border ${colors.border} ${colors.bg} p-6 transition-all duration-500 group-hover:-translate-y-1`}
                      >
                        {/* Header */}
                        <div className="mb-4 flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2.5 rounded-xl ${colors.icon}`}>
                              <BookOpen className="w-5 h-5" />
                            </div>
                            <div>
                              <span className={`text-xs font-medium ${colors.text}`}>
                                {path.provider}
                              </span>
                              <h3 className="text-lg font-bold text-white">{path.title}</h3>
                            </div>
                          </div>
                          <ExternalLink className="w-4 h-4 text-white/20 transition-colors group-hover:text-white/50" />
                        </div>

                        {/* Badge */}
                        <div className="mb-4">
                          <span className={`text-xs px-2.5 py-1 rounded-full ${colors.badge}`}>
                            {path.badge}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="mb-4 flex-1 text-sm leading-relaxed text-white/50">{path.description}</p>

                        {/* Highlights */}
                        <ul className="mb-4 space-y-1.5">
                          {path.highlights.map((highlight) => (
                            <li key={highlight} className="flex items-center gap-2 text-xs text-white/60">
                              <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 text-emerald-400" />
                              {highlight}
                            </li>
                          ))}
                        </ul>

                        {/* Footer */}
                        <div className="flex items-center justify-between border-t border-white/5 pt-4">
                          <div className="flex items-center gap-3 text-xs text-white/40">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {path.duration}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full ${colors.badge}`}>
                              {path.level}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-white/40 transition-colors group-hover:text-white">
                            <span className="text-xs font-medium">Start</span>
                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </a>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Learning Journey Timeline */}
        <section className="py-16 border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-violet-400/70 mb-2">
                Your Journey
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white">From beginner to builder</h2>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-violet-500/50 to-emerald-500/50 hidden md:block" />

              <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-4 md:gap-6">
                {learningMilestones.map((milestone, i) => (
                  <motion.div
                    key={milestone.week}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative"
                  >
                    <div className="p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:border-white/10 transition-all">
                      <div className="text-xs font-medium text-cyan-400 mb-2">Week {milestone.week}</div>
                      <h3 className="text-base font-semibold text-white mb-1">{milestone.title}</h3>
                      <p className="text-xs text-white/50">{milestone.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-emerald-400/70 mb-2">
                Success Stories
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Learning transforms careers</h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, i) => (
                <motion.div
                  key={testimonial.author}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]"
                >
                  <Quote className={`w-8 h-8 ${colorMap[testimonial.color].text} opacity-50 mb-4`} />
                  <p className="text-white/70 leading-relaxed mb-6 text-sm">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${colorMap[testimonial.color].icon} flex items-center justify-center text-sm font-semibold`}>
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{testimonial.author}</div>
                      <div className="text-xs text-white/40">{testimonial.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Editorial Quote */}
        <section className="py-16 border-t border-white/5">
          <div className="max-w-4xl mx-auto px-6">
            <motion.blockquote
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-2xl md:text-3xl lg:text-4xl font-serif-italic text-white/70 leading-relaxed">
                "The best time to learn AI was yesterday. The second best time is today."
              </p>
              <cite className="block mt-4 text-sm text-white/40 not-italic">— The Golden Age is now</cite>
            </motion.blockquote>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-20 border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-800/40 p-10 md:p-12"
            >
              {/* Decorative gradients */}
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 blur-3xl" />
              <div className="absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 blur-3xl" />

              <div className="relative flex flex-col items-center text-center">
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 mb-6">
                  <Award className="w-6 h-6" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Track your progress
                </h2>
                <p className="text-white/50 mb-8 max-w-md">
                  See my certifications and the paths I've completed. Your journey starts with one course.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/achievements"
                    className="group inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-medium transition-all hover:bg-white/90 hover:shadow-lg"
                  >
                    View Achievements
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/prompt-library"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-white/60 border border-white/10 hover:border-white/20 hover:text-white transition-all"
                  >
                    <Sparkles className="w-4 h-4" />
                    Explore Prompts
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  )
}
