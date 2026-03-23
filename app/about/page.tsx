'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  Linkedin,
  Github,
  ExternalLink,
  Mail,
  MapPin,
  Music,
  Code,
  Globe,
  Compass,
} from 'lucide-react'
import { FAQPageJsonLd } from '@/components/seo/JsonLd'
import { EmailSignup } from '@/components/email-signup'

const aboutFaqs = [
  {
    question: 'Who is Frank and what is FrankX.AI?',
    answer:
      'Frank is an enterprise AI architect by day and a prolific AI music creator by night. FrankX.AI is his personal hub sharing everything learned from building production AI systems and creating 12,000+ songs with Suno AI, providing tools and frameworks for creators to build their own AI-powered creative practice.',
  },
  {
    question: 'What makes FrankX.AI different from other AI resources?',
    answer:
      'FrankX.AI combines enterprise-grade AI architecture expertise with hands-on creative AI experience. It bridges the gap between technical implementation and practical creative workflows, offering resources that work in the real world—not just in theory.',
  },
  {
    question: 'What kind of content can I find on FrankX.AI?',
    answer:
      'The site offers AI implementation guides, prompt libraries for tools like Suno and Midjourney, enterprise AI architecture patterns, creative workflows, courses on AI music production, and frameworks for building goal-aligned AI systems.',
  },
  {
    question: 'How can I get started with the resources on this site?',
    answer:
      'Start with the /start page for a guided overview, explore the Music Lab for AI music creation, browse the Prompt Library for ready-to-use prompts, or dive into the blog for practical insights and tutorials.',
  },
  {
    question: 'Does Frank offer consulting or collaboration opportunities?',
    answer:
      'Yes, Frank is available for AI strategy consulting, enterprise AI implementations, speaking engagements, and creative AI projects. Visit the Contact page or reach out via LinkedIn to discuss collaboration opportunities.',
  },
]

// Premium background
function AboutBackground() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#030712]" />
      <motion.div
        className="absolute -left-60 top-20 h-[600px] w-[600px] rounded-full opacity-25"
        style={{
          background:
            'radial-gradient(circle, rgba(16,185,129,0.35) 0%, transparent 70%)',
        }}
        animate={
          shouldReduceMotion
            ? undefined
            : { scale: [1, 1.1, 1], opacity: [0.25, 0.35, 0.25] }
        }
        transition={
          shouldReduceMotion
            ? undefined
            : { duration: 10, repeat: Infinity, ease: 'easeInOut' }
        }
      />
      <motion.div
        className="absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full opacity-20"
        style={{
          background:
            'radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)',
        }}
        animate={
          shouldReduceMotion
            ? undefined
            : { scale: [1.1, 1, 1.1], opacity: [0.2, 0.3, 0.2] }
        }
        transition={
          shouldReduceMotion
            ? undefined
            : { duration: 12, repeat: Infinity, ease: 'easeInOut' }
        }
      />
      <motion.div
        className="absolute bottom-40 left-1/4 h-[400px] w-[400px] rounded-full opacity-15"
        style={{
          background:
            'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
        }}
        animate={
          shouldReduceMotion
            ? undefined
            : { scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }
        }
        transition={
          shouldReduceMotion
            ? undefined
            : { duration: 14, repeat: Infinity, ease: 'easeInOut' }
        }
      />
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  )
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
}

export default function AboutPage() {
  const shouldReduceMotion = useReducedMotion()
  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.6 }

  return (
    <>
      <FAQPageJsonLd faqs={aboutFaqs} />
      <AboutBackground />
      <main id="main" className="relative min-h-screen">
        {/* ── Hero ── */}
        <section className="pt-32 pb-16">
          <div className="mx-auto max-w-5xl px-6">
            <motion.p
              {...fadeIn}
              transition={transition}
              className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-emerald-400/60"
            >
              About
            </motion.p>

            <motion.h1
              {...fadeIn}
              transition={{ ...transition, delay: 0.1 }}
              className="mb-8 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              The Architect.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400">
                The Creator.
              </span>{' '}
              The Explorer.
            </motion.h1>

            <motion.div
              {...fadeIn}
              transition={{ ...transition, delay: 0.2 }}
              className="max-w-3xl space-y-5 text-lg leading-relaxed text-white/50"
            >
              <p className="text-white/70 text-xl">
                Enterprise AI architect. Creator of 12,000+ AI songs. Builder of
                the Agentic Creator OS. Based in Amsterdam, on the water.
              </p>
              <p>
                Everything I build goes here — not as a portfolio, but as a living
                system you can use. Open, documented, yours to adapt.
              </p>
            </motion.div>

            {/* Social links */}
            <motion.div
              {...fadeIn}
              transition={{ ...transition, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href="https://linkedin.com/in/frank-x-riemer/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition-all hover:bg-white/10"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
              <a
                href="https://github.com/frankxai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition-all hover:bg-white/10"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a
                href="https://suno.com/@frankx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition-all hover:bg-white/10"
              >
                <Music className="h-4 w-4" /> Suno
              </a>
              <a
                href="mailto:hello@frankx.ai"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition-all hover:bg-white/10"
              >
                <Mail className="h-4 w-4" /> Email
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── The Origin ── */}
        <section className="py-16 border-t border-white/5">
          <div className="mx-auto max-w-5xl px-6">
            <motion.div {...fadeIn} transition={transition}>
              <h2 className="text-2xl font-bold text-white sm:text-3xl mb-3">
                The origin
              </h2>
              <p className="text-white/30 mb-8">Where the building started</p>
            </motion.div>

            <div className="grid gap-8 lg:grid-cols-2">
              <motion.div
                {...fadeIn}
                transition={{ ...transition, delay: 0.1 }}
                className="space-y-5 text-base leading-relaxed text-white/50"
              >
                <p>
                  My family are Volga Germans — descendants of German settlers
                  invited to Russia&apos;s Volga River region by Katharina the Great
                  in the 1700s. They built communities, churches, entire
                  infrastructure from nothing. When Stalin displaced them, my
                  grandparents survived in Kazakhstan.
                </p>
                <p>
                  My parents came to Germany in the 1990s with almost nothing. My
                  father Witali was a quiet, strong man who built houses and
                  brought displaced families together. He created a foundation of
                  properties through pure craftsmanship and will. He passed from
                  cancer in 2019 — but not before teaching me and my brother Alex
                  what it means to build something from nothing.
                </p>
                <p className="text-white/60">
                  Alex built a seven-figure solar business. Same DNA: take nothing
                  and turn it into infrastructure. My medium is different — AI
                  systems and music — but the instinct is the same.
                </p>
              </motion.div>

              <motion.div
                {...fadeIn}
                transition={{ ...transition, delay: 0.2 }}
                className="rounded-2xl border border-white/5 bg-white/[0.02] p-8"
              >
                <p className="text-lg text-white/70 leading-relaxed italic font-serif">
                  &ldquo;My family has been building in foreign lands for
                  generations. We&apos;ve never stopped. We&apos;ve just upgraded
                  the medium.&rdquo;
                </p>
                <p className="mt-4 text-sm text-white/30">
                  — From Germany to Russia to Kazakhstan to Amsterdam. Explorer
                  blood, not tourist behavior.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── The Explorer ── */}
        <section className="py-16 border-t border-white/5">
          <div className="mx-auto max-w-5xl px-6">
            <motion.div {...fadeIn} transition={transition}>
              <h2 className="text-2xl font-bold text-white sm:text-3xl mb-3">
                The explorer
              </h2>
              <p className="text-white/30 mb-8">
                Where the worldview came from
              </p>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  place: 'Australia',
                  detail: 'Where it clicked. Sydney showed me what ambition looks like in the open.',
                  icon: Globe,
                },
                {
                  place: 'Southeast Asia',
                  detail: 'Indonesia, Philippines, Vietnam. Learned that the best ideas come from stillness.',
                  icon: Compass,
                },
                {
                  place: 'Mediterranean',
                  detail: 'Greece, Spain, Italy, Canary Islands. Where water meets creative freedom.',
                  icon: MapPin,
                },
                {
                  place: 'Amsterdam',
                  detail: 'IJburg. Direct water access. Home base for the next chapter.',
                  icon: MapPin,
                },
              ].map((item, i) => (
                <motion.div
                  key={item.place}
                  {...fadeIn}
                  transition={{ ...transition, delay: i * 0.08 }}
                  className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:border-white/10 hover:bg-white/[0.04] transition-all"
                >
                  <item.icon className="w-5 h-5 text-cyan-400/60 mb-3" />
                  <h3 className="text-base font-semibold text-white mb-1">
                    {item.place}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed">
                    {item.detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── The Work ── */}
        <section className="py-16 border-t border-white/5">
          <div className="mx-auto max-w-5xl px-6">
            <motion.div {...fadeIn} transition={transition}>
              <h2 className="text-2xl font-bold text-white sm:text-3xl mb-3">
                The work
              </h2>
              <p className="text-white/30 mb-8">Enterprise mind. Creator soul.</p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2">
              <motion.div
                {...fadeIn}
                transition={{ ...transition, delay: 0.1 }}
                className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8"
              >
                <Code className="w-6 h-6 text-emerald-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">
                  By day — Enterprise AI
                </h3>
                <p className="text-white/50 leading-relaxed">
                  4+ years architecting production AI systems for global
                  organizations. 500+ customer implementations. Multi-cloud
                  infrastructure, RAG architectures, agentic workflows, multi-agent
                  orchestration. The systems I build handle real scale.
                </p>
              </motion.div>

              <motion.div
                {...fadeIn}
                transition={{ ...transition, delay: 0.2 }}
                className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-8"
              >
                <Music className="w-6 h-6 text-cyan-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">
                  By night — Music & creation
                </h3>
                <p className="text-white/50 leading-relaxed">
                  12,000+ AI-generated songs with Suno. Not casual experiments — a
                  deliberate practice of exploring what happens when humans and AI
                  create together. Ambient, electronic, cinematic, healing. Creation
                  Season starts at midnight.
                </p>
              </motion.div>
            </div>

            <motion.div
              {...fadeIn}
              transition={{ ...transition, delay: 0.3 }}
              className="mt-6 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-8"
            >
              <h3 className="text-xl font-bold text-white mb-3">
                The bridge between both worlds
              </h3>
              <p className="text-white/50 leading-relaxed max-w-3xl">
                The Agentic Creator OS. 22 curated skills, 8 specialist agents,
                130+ commands — enterprise patterns made accessible to every creator.
                The same rigor I use to build production AI systems, applied to
                creative workflows. Open source on GitHub. Free to use.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── What I Believe ── */}
        <section className="py-16 border-t border-white/5">
          <div className="mx-auto max-w-5xl px-6">
            <motion.div {...fadeIn} transition={transition}>
              <h2 className="text-2xl font-bold text-white sm:text-3xl mb-8">
                What I believe
              </h2>
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-2">
              {[
                'Everyone deserves their own AI Center of Excellence. Not just enterprises — every creator, every builder.',
                'AI should amplify humanity, not replace it. The best tools disappear into your workflow.',
                "We're living in the Golden Age of creation. The gap between idea and execution has never been smaller.",
                'Share everything. The work speaks louder than the marketing. Build in public. Let people decide.',
              ].map((belief, i) => (
                <motion.div
                  key={i}
                  {...fadeIn}
                  transition={{ ...transition, delay: i * 0.08 }}
                  className="flex gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-6"
                >
                  <span className="shrink-0 mt-0.5 text-sm font-bold text-emerald-400/60">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-base text-white/50 leading-relaxed">
                    {belief}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Daily Practice ── */}
        <section className="py-16 border-t border-white/5">
          <div className="mx-auto max-w-5xl px-6">
            <motion.div
              {...fadeIn}
              transition={transition}
              className="max-w-3xl space-y-5 text-base text-white/50 leading-relaxed"
            >
              <h2 className="text-2xl font-bold text-white sm:text-3xl mb-3">
                The daily practice
              </h2>
              <p>
                Tony Robbins priming in the morning. Wim Hof breathing. Beach runs
                along IJburg. Then the real work: architecture by day, music by
                night. Peak creative hours: midnight to 3:30 AM — when the world is
                quiet and the ideas flow clean.
              </p>
              <p>
                I&apos;m a husband, a father, someone who believes the universe is
                too interesting not to explore deeply. This site is my workshop and
                my notebook — take what&apos;s useful, adapt it to your path.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Newsletter + CTAs ── */}
        <section className="py-16 pb-24 border-t border-white/5">
          <div className="mx-auto max-w-5xl px-6">
            <motion.div {...fadeIn} transition={transition} className="text-center">
              <h2 className="text-2xl font-bold text-white sm:text-3xl mb-3">
                Stay in the loop
              </h2>
              <p className="text-white/40 mb-8 max-w-lg mx-auto">
                Weekly insights on AI systems, music creation, and building in
                public. No spam, no guru energy — just the work.
              </p>

              <div className="max-w-sm mx-auto mb-10">
                <EmailSignup
                  listType="newsletter"
                  placeholder="your@email.com"
                  buttonText="Subscribe"
                  compact
                />
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/start"
                  className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-black transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/10"
                >
                  Start Here
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/music-lab"
                  className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-medium text-white transition-all hover:bg-white/10"
                >
                  Music Lab
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/blog"
                  className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-medium text-white transition-all hover:bg-white/10"
                >
                  Read the Blog
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
