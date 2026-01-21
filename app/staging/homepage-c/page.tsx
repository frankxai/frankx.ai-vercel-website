'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
  ArrowRight,
  Play,
  Sparkles,
  Music2,
  BookOpen,
  Code2,
  Palette,
  Users,
  Heart,
  Mail,
  Quote,
  CheckCircle2,
  Star,
  ArrowLeft,
  Zap,
  GraduationCap,
} from 'lucide-react'

// ============================================================================
// SPLIT TEST C: FULL REDESIGN - The Best of Everything
// ============================================================================
// Combines:
// - Golden Age authority positioning (from A)
// - Audience matrix navigation (from B)
// - Products showcase (new)
// - Community/tribe section (new)
// - Family warmth (enhanced)
// - Waitlist CTAs (new)
// - Refined typography
// ============================================================================

// Hero rotating concepts
const heroConcepts = ['golden age', 'creative empire', 'intelligence systems', 'abundant future']

function RotatingConcept() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const i = setInterval(() => setIdx((p) => (p + 1) % heroConcepts.length), 3500)
    return () => clearInterval(i)
  }, [])
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={idx}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400"
      >
        {heroConcepts[idx]}
      </motion.span>
    </AnimatePresence>
  )
}

// ============================================================================
// HERO - Confident Golden Age Positioning
// ============================================================================
function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-[1.2fr,1fr] gap-16 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-emerald-400/80 mb-6">
              Welcome to the Golden Age
            </p>

            <h1 className="text-5xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6">
              Build your <RotatingConcept />
            </h1>

            <p className="text-xl text-white/60 max-w-xl mb-8 leading-relaxed">
              AI Architect at Oracle. Creator of 10,000+ songs. I build{' '}
              <span className="text-white">intelligence systems</span> for creators
              and document everything so you can build your own.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-6 mb-10">
              {[
                { value: '10K+', label: 'Songs' },
                { value: '5', label: 'Systems' },
                { value: '1000+', label: 'Creators' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-bold text-white">{s.value}</div>
                  <div className="text-xs text-white/40">{s.label}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/start"
                className="group inline-flex items-center gap-3 bg-white text-black px-7 py-3.5 rounded-full font-semibold transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
              >
                Find Your Path
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/music-lab"
                className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-medium text-white/70 hover:text-white border border-white/10 hover:border-white/20 transition-all"
              >
                <Play className="w-4 h-4" />
                Hear the Music
              </Link>
            </div>
          </motion.div>

          {/* Right - Featured Music */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-cyan-500/10 to-violet-500/5 blur-3xl" />
            <div className="relative p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
              <iframe
                src="https://suno.com/embed/9cbad174-9276-427f-9aed-1ba00c7db3db"
                className="w-full h-[350px] rounded-xl"
                frameBorder="0"
                allow="autoplay; clipboard-write"
                loading="lazy"
              />
              <div className="mt-4">
                <p className="text-xs uppercase tracking-wider text-emerald-400/80 mb-1">Music Lab</p>
                <p className="text-lg font-semibold text-white">A Daily Practice of Creation</p>
                <p className="text-sm text-white/50">Ambient · Electronic · Cinematic</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// PHILOSOPHY QUOTE - Single powerful moment with Playfair
// ============================================================================
function PhilosophyQuote() {
  return (
    <section className="py-20 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Quote className="w-8 h-8 text-emerald-400/40 mx-auto mb-6" />
          <p
            className="text-3xl md:text-4xl text-white/80 leading-relaxed"
            style={{
              fontFamily: 'var(--font-serif), Georgia, serif',
              fontStyle: 'italic',
              letterSpacing: '0.01em',
              lineHeight: 1.5,
            }}
          >
            "We're living in the abundance stage of intelligence.
            This is the Golden Age — and you're invited."
          </p>
        </motion.blockquote>
      </div>
    </section>
  )
}

// ============================================================================
// AUDIENCE PATHWAYS - Who I Build For
// ============================================================================
const audiences = [
  {
    icon: Music2,
    name: 'Music Creators',
    desc: 'Suno mastery for artists',
    product: 'Vibe OS',
    price: 'Free',
    href: '/products/vibe-os',
    color: 'emerald',
  },
  {
    icon: BookOpen,
    name: 'Content Creators',
    desc: 'Strategic storytelling',
    product: 'Creation Chronicles',
    price: '€7',
    href: '/products/creation-chronicles',
    color: 'cyan',
  },
  {
    icon: Palette,
    name: 'Generative Creators',
    desc: 'Multi-modal AI studio',
    product: 'GenCreator OS',
    price: '€97',
    href: '/products/generative-creator-os',
    color: 'violet',
  },
  {
    icon: Code2,
    name: 'Developers',
    desc: 'Agent architectures',
    product: 'Agentic Creator OS',
    price: '€197',
    href: '/products/agentic-creator-os',
    color: 'amber',
  },
]

const colors: Record<string, { bg: string; border: string; text: string }> = {
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400' },
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400' },
  violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/30', text: 'text-violet-400' },
  amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400' },
}

function AudiencePathways() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-3">Who I Build For</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Choose your path</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {audiences.map((a, i) => {
            const c = colors[a.color]
            return (
              <motion.div
                key={a.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={a.href} className="group block h-full">
                  <div className={`h-full p-6 rounded-2xl border ${c.border} ${c.bg} transition-all hover:-translate-y-1`}>
                    <a.icon className={`w-6 h-6 ${c.text} mb-4`} />
                    <h3 className="text-lg font-bold text-white mb-1">{a.name}</h3>
                    <p className="text-sm text-white/50 mb-4">{a.desc}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <span className="text-sm text-white/60">{a.product}</span>
                      <span className={`font-bold ${c.text}`}>{a.price}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// STUDENTS - Free Resources Section
// ============================================================================
function StudentsSection() {
  return (
    <section className="py-20 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="w-6 h-6 text-cyan-400" />
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">Students & Young Pros</p>
            </div>
            <h2 className="text-3xl font-bold text-white mb-6">Free resources for your journey</h2>
            <p className="text-lg text-white/60 mb-8">
              Curated courses from Oracle, Google, MIT. Plus workshops I've built. All free.
            </p>
            <ul className="space-y-3 mb-8">
              {['Oracle AI Foundations', 'Google AI Essentials', 'Ikigai Workshop', 'Prompt Engineering 101'].map((r) => (
                <li key={r} className="flex items-center gap-3 text-white/70">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  {r}
                </li>
              ))}
            </ul>
            <Link
              href="/students"
              className="group inline-flex items-center gap-2 text-cyan-400 font-medium hover:text-cyan-300"
            >
              Explore Learning Paths
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative p-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5"
          >
            <p className="text-2xl text-white/70 leading-relaxed" style={{ fontStyle: 'italic' }}>
              "I remember being overwhelmed by AI options. Here's everything I wish I had."
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// TRIBE / COMMUNITY - Inner Circle + Testimonials
// ============================================================================
function TribeSection() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Users className="w-8 h-8 text-violet-400 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The Tribe</h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Creators already using these systems to build their own golden age.
          </p>
        </motion.div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { quote: "Vibe OS helped me release my first album in 3 weeks.", author: "Music Creator" },
            { quote: "The Agentic Creator OS changed how I approach Claude Code.", author: "Developer" },
            { quote: "Finally, resources that actually make sense for beginners.", author: "Student" },
          ].map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]"
            >
              <Star className="w-5 h-5 text-amber-400 mb-4" />
              <p className="text-white/70 mb-4">"{t.quote}"</p>
              <p className="text-sm text-white/40">— {t.author}</p>
            </motion.div>
          ))}
        </div>

        {/* Inner Circle CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="p-8 rounded-2xl border border-violet-500/20 bg-violet-500/5 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-3">Join the Inner Circle</h3>
          <p className="text-white/50 mb-6 max-w-lg mx-auto">
            Weekly dispatches, live labs, and early access to new systems.
          </p>
          <Link
            href="/inner-circle"
            className="group inline-flex items-center gap-3 bg-violet-500/20 border border-violet-500/30 text-violet-400 px-6 py-3 rounded-full font-medium hover:bg-violet-500/30 transition-all"
          >
            <Mail className="w-4 h-4" />
            Join Waitlist
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// FAMILY HUB - Warmth Section
// ============================================================================
function FamilyHub() {
  return (
    <section className="py-20 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Heart className="w-10 h-10 text-rose-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Also a family hub
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-4 leading-relaxed">
            Beyond the systems and music, this is a living archive for the people I love.
            My kids will see how their dad thought, created, and navigated this wild moment.
          </p>
          <p className="text-lg text-white/40">
            Music for bedtime. Stories for rainy days. Systems for when they're ready.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// FINAL CTA - Multiple Entry Points + Waitlists
// ============================================================================
function FinalCTA() {
  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Your golden age starts now
          </h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">
            Three ways to begin. Pick what fits.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Sparkles,
              title: 'Get Vibe OS',
              desc: 'Start creating AI music today',
              cta: 'Free Download',
              href: '/products/vibe-os',
              color: 'emerald',
            },
            {
              icon: Mail,
              title: 'Join Inner Circle',
              desc: 'Weekly dispatches + early access',
              cta: 'Join Waitlist',
              href: '/inner-circle',
              color: 'violet',
            },
            {
              icon: Zap,
              title: 'Browse All Systems',
              desc: 'Find the right OS for you',
              cta: 'View Products',
              href: '/products',
              color: 'cyan',
            },
          ].map((item, i) => {
            const c = colors[item.color]
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={item.href} className="group block h-full">
                  <div className={`h-full p-8 rounded-2xl border ${c.border} ${c.bg} text-center transition-all hover:-translate-y-1`}>
                    <item.icon className={`w-8 h-8 ${c.text} mx-auto mb-4`} />
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-white/50 mb-6">{item.desc}</p>
                    <span className={`inline-flex items-center gap-2 font-medium ${c.text}`}>
                      {item.cta}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// MAIN PAGE
// ============================================================================
export default function HomepageSplitC() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Staging indicator */}
      <div className="fixed top-4 left-4 z-50">
        <Link
          href="/staging"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/20 border border-violet-500/30 text-xs font-medium text-violet-400 hover:bg-violet-500/30 transition-colors"
        >
          <ArrowLeft className="w-3 h-3" />
          Split C: Full Redesign
        </Link>
      </div>

      <HeroSection />
      <PhilosophyQuote />
      <AudiencePathways />
      <StudentsSection />
      <TribeSection />
      <FamilyHub />
      <FinalCTA />
    </main>
  )
}
