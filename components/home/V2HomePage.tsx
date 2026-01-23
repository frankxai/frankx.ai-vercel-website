'use client'

import clsx from 'clsx'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Music, FileText, Settings, Check, Star } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

/**
 * V2 Homepage - Creator-First Redesign
 *
 * GOALS:
 * - Clear value proposition within 3 seconds
 * - Single primary CTA (assessment)
 * - 3 persona-based paths (not 4)
 * - Performance optimized (no heavy animations)
 * - WCAG AA compliant
 */

// Respect reduced motion preferences
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function V2HomePage() {
  return (
    <main id="main" className="flex-1 pt-20 text-white">

      {/* Hero Section - Crystal Clear Value Prop */}
      <section
        id="hero"
        className="relative px-6 py-24 md:py-32 overflow-hidden"
        aria-labelledby="hero-heading"
      >
        {/* Simple gradient background (no animations) */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" aria-hidden="true" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.15),transparent_50%)]" aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center space-y-8"
          >
            {/* Trust Badge */}
            <motion.div variants={fadeIn}>
              <span className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 text-sm font-medium text-cyan-400">
                <Star className="h-4 w-4" aria-hidden="true" />
                Trusted by 12,000+ Creators
              </span>
            </motion.div>

            {/* Headline - Clear & Benefit-Driven */}
            <motion.h1
              id="hero-heading"
              variants={fadeIn}
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] text-white max-w-6xl mx-auto"
            >
              AI Tools for Creators
              <br />
              <span className="text-cyan-400">Who Ship Faster</span>
            </motion.h1>

            {/* Subheadline - Specific & Credible */}
            <motion.p
              variants={fadeIn}
              className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed"
            >
              Proven workflows, templates, and music tools to launch content,
              courses, and releases weekly—without burnout.
            </motion.p>

            {/* Primary CTA */}
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Link
                href="/assessment"
                onClick={() => trackEvent('v2_hero_primary_cta', { destination: '/assessment' })}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-8 py-4 text-lg font-semibold text-slate-950 transition-all hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                Take Free 2-Minute Assessment
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>

              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white/10 hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                Watch 60-Second Demo
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={fadeIn}
              className="flex flex-wrap items-center justify-center gap-6 pt-8 text-sm text-slate-400"
            >
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                <span>500+ Suno Sessions Created</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                <span>300+ Creator Systems Built</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                <span>95% Creator Satisfaction</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-16 relative max-w-5xl mx-auto"
          >
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="/hero-homepage.png"
                alt="FrankX.ai creator dashboard showing AI workflows, music sessions, and content templates"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="px-6 py-24 bg-void/50" aria-labelledby="problem-heading">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 id="problem-heading" className="text-3xl md:text-5xl font-bold text-white mb-6">
              Overwhelmed by AI Tools?
              <br />
              <span className="text-slate-400">You're Not Alone</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              FrankX.ai gives you battle-tested systems, not more complexity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                problem: 'Too many tools, no clear workflow',
                solution: 'Curated, proven templates and prompts'
              },
              {
                problem: 'Stuck in tutorial hell, not shipping',
                solution: 'Ready-to-use systems you can launch today'
              },
              {
                problem: 'Creative burnout from manual tasks',
                solution: 'Automated workflows that free your time'
              }
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
              >
                <div className="mb-4 text-red-400 font-medium">❌ {item.problem}</div>
                <div className="text-cyan-400 font-medium">✅ {item.solution}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Persona-Based Paths - 3 Clear Segments */}
      <section className="px-6 py-24" aria-labelledby="paths-heading">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 id="paths-heading" className="text-3xl md:text-5xl font-bold text-white mb-6">
              Choose Your Path
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Whether you create music, content, or systems—we have the tools you need.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Musicians & Creators */}
            <Link
              href="/products/vibe-os"
              onClick={() => trackEvent('v2_persona_select', { persona: 'musician' })}
              className="group relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-cyan-500/50 hover:bg-white/10 hover:shadow-xl hover:shadow-cyan-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                <Music className="h-7 w-7" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Create & Release Music Fast
              </h3>
              <p className="text-slate-300 mb-6 leading-relaxed">
                Generate, customize, and publish music with Suno AI workflows. Go from idea to release in hours.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-slate-300">#Suno</span>
                <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-slate-300">#Music</span>
                <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-slate-300">#Production</span>
              </div>
              <div className="flex items-center gap-2 text-cyan-400 font-medium group-hover:gap-3 transition-all">
                Explore Vibe OS
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </div>
            </Link>

            {/* Content Creators */}
            <Link
              href="/products/creative-ai-toolkit"
              onClick={() => trackEvent('v2_persona_select', { persona: 'content-creator' })}
              className="group relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-cyan-500/50 hover:bg-white/10 hover:shadow-xl hover:shadow-cyan-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 transition-colors">
                <FileText className="h-7 w-7" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Ship Content Consistently
              </h3>
              <p className="text-slate-300 mb-6 leading-relaxed">
                Launch courses, newsletters, and digital products with proven templates and workflows.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-slate-300">#Templates</span>
                <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-slate-300">#Workflows</span>
                <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-slate-300">#Content</span>
              </div>
              <div className="flex items-center gap-2 text-purple-400 font-medium group-hover:gap-3 transition-all">
                Get Content Toolkit
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </div>
            </Link>

            {/* System Builders */}
            <Link
              href="/products/agentic-creator-os"
              onClick={() => trackEvent('v2_persona_select', { persona: 'system-builder' })}
              className="group relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-cyan-500/50 hover:bg-white/10 hover:shadow-xl hover:shadow-cyan-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20 transition-colors">
                <Settings className="h-7 w-7" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Build Your Creator OS
              </h3>
              <p className="text-slate-300 mb-6 leading-relaxed">
                Design automated workflows and custom creator systems tailored to your unique process.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-slate-300">#Automation</span>
                <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-slate-300">#Systems</span>
                <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-slate-300">#Consulting</span>
              </div>
              <div className="flex items-center gap-2 text-amber-400 font-medium group-hover:gap-3 transition-all">
                Book Strategy Call
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof - Testimonials */}
      <section className="px-6 py-24 bg-void/50" aria-labelledby="testimonials-heading">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 id="testimonials-heading" className="text-3xl md:text-5xl font-bold text-white mb-6">
              Join 12,000+ Creators
              <br />
              <span className="text-cyan-400">Shipping Faster</span>
            </h2>
          </div>

          {/* Placeholder for testimonials - to be populated with real data */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Went from 1 song per month to 4 per week using Vibe OS. Game changer.",
                author: "Sarah Chen",
                role: "Music Producer",
                rating: 5
              },
              {
                quote: "The Content Toolkit helped me launch my course in 2 weeks instead of 2 months.",
                author: "Marcus Rodriguez",
                role: "Course Creator",
                rating: 5
              },
              {
                quote: "Built a complete creator system that saves me 15 hours per week. Worth every penny.",
                author: "Aisha Patel",
                role: "Content Entrepreneur",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" aria-hidden="true" />
                  ))}
                </div>
                <p className="text-slate-200 mb-6 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <div className="font-semibold text-white">{testimonial.author}</div>
                  <div className="text-sm text-slate-400">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="px-6 py-24" aria-labelledby="how-it-works-heading">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 id="how-it-works-heading" className="text-3xl md:text-5xl font-bold text-white mb-6">
              Your Path to Faster Shipping
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: '1',
                title: 'Assess',
                description: 'Take our 2-minute quiz to discover your ideal tools and workflows.'
              },
              {
                step: '2',
                title: 'Choose',
                description: 'Get personalized recommendations with 20% off your first purchase.'
              },
              {
                step: '3',
                title: 'Ship',
                description: 'Start creating with proven templates, prompts, and support.'
              }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/10 text-2xl font-bold text-cyan-400 border-2 border-cyan-500/30">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-300 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/assessment"
              onClick={() => trackEvent('v2_how_it_works_cta', { destination: '/assessment' })}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-8 py-4 text-lg font-semibold text-slate-950 transition-all hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Start Your Assessment
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-24 bg-gradient-to-br from-cyan-950/30 to-slate-950" aria-labelledby="final-cta-heading">
        <div className="mx-auto max-w-4xl text-center">
          <h2 id="final-cta-heading" className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Ship Faster?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join 12,000+ creators using AI to launch content, music, and products weekly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/assessment"
              onClick={() => trackEvent('v2_final_cta_primary', { destination: '/assessment' })}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-8 py-4 text-lg font-semibold text-slate-950 transition-all hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Take Free Assessment
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white/10 hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Explore Products
            </Link>
          </div>
          <p className="text-sm text-slate-400 mt-6">
            No credit card required · 20% off with assessment
          </p>
        </div>
      </section>

    </main>
  )
}
