'use client'

import { useState } from 'react'
import Script from 'next/script'
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import PremiumButton from '@/components/ui/PremiumButton'
import GenCreatorNav from '@/components/gencreator/GenCreatorNav'

interface FAQ {
  question: string
  answer: string
  category: string
}

const faqs: FAQ[] = [
  // Getting Started
  {
    question: 'What is the GenCreator Framework?',
    answer:
      'The GenCreator Framework is a complete operating system for creators who use AI as a force multiplier. It includes 12 principles, an 8-chapter handbook, 12 actionable blueprints, a 7-dimension self-assessment, a personal configuration file (soul.md), learning paths, a toolkit, and a community. It is designed for creators who ship daily and build systems that compound.',
    category: 'Getting Started',
  },
  {
    question: 'Who is this framework for?',
    answer:
      'GenCreator is for any creator who uses AI in their workflow — content creators, developers, music producers, designers, solopreneurs, and hybrid builders. If you create things with AI tools and want a structured system to level up your output, consistency, and creative business, this framework is built for you.',
    category: 'Getting Started',
  },
  {
    question: 'How do I get started?',
    answer:
      'Start with the 12 Principles — they take 5 minutes to read and give you the philosophical foundation. Then take the 2-minute Self-Assessment to see your current creative profile. From there, build your soul.md using the interactive builder, and pick your first blueprint to execute.',
    category: 'Getting Started',
  },
  {
    question: 'Is GenCreator free?',
    answer:
      'The core framework is free to explore — all 12 principles, the manifesto, the self-assessment, the glossary, the shipping tracker, and the learning paths overview. The free Starter Kit includes a soul.md template and 3 beginner blueprints. Pro and Mastery tiers unlock the complete handbook, all blueprints, community access, and coaching.',
    category: 'Getting Started',
  },
  // soul.md
  {
    question: 'What is soul.md?',
    answer:
      'soul.md is your personal configuration file as a creator. Like CLAUDE.md defines an AI agent, soul.md defines you — your identity, craft, energy, voice, capital, circle, and legacy. It is a living document that evolves with you. You become the document you write about yourself.',
    category: 'soul.md',
  },
  {
    question: 'How do I build my soul.md?',
    answer:
      'Use the interactive soul.md builder on the Soul page. It guides you through all 7 dimensions with prompts and examples. You can fill it out in 15-20 minutes, then copy it as markdown or download it. Review and update it weekly as part of your GenCreator practice.',
    category: 'soul.md',
  },
  {
    question: 'How often should I update soul.md?',
    answer:
      'Weekly reviews take 15 minutes — open your soul.md and ask: Did my actions align with my identity? Which dimension grew? Which was neglected? Monthly deep reviews involve rescoring your 7 dimensions and updating goals. The document should always reflect your current state.',
    category: 'soul.md',
  },
  // The 7 Dimensions
  {
    question: 'What are the 7 Dimensions?',
    answer:
      'Energy, Mind, Craft, Voice, Capital, Circle, and Legacy. Each dimension is scored 1-10 during your self-assessment. Your highest score reveals your superpower. Your lowest score reveals your growth edge — the single biggest unlock available to you. The dimensions are interconnected: low Energy degrades everything; strong Voice amplifies Capital.',
    category: 'Dimensions',
  },
  {
    question: 'How is the self-assessment scored?',
    answer:
      'You rate each dimension 1-10 based on honest self-evaluation. The assessment generates a radar chart showing your profile. Scores map to levels: 0-2.9 is Awakening, 3-4.9 is Foundation, 5-6.9 is Builder, 7-8.9 is Creator, 9-10 is GenCreator. Most people start between Builder and Creator.',
    category: 'Dimensions',
  },
  // Shipping & Practice
  {
    question: 'What does "shipping" mean?',
    answer:
      'Shipping means putting something real into the world that did not exist yesterday. A published blog post, a deployed feature, a released track, a community contribution. The key word is real — it must be visible to at least one other person. Shipping is the fundamental act of creation in the GenCreator Framework.',
    category: 'Practice',
  },
  {
    question: 'What is the 3-Tier Shipping System?',
    answer:
      'An energy-aware shipping cadence. Tier 1 (Full Ship) is 2-4 hours of deep work. Tier 2 (Quick Ship) is 30-60 minutes. Tier 3 (Micro Ship) is 15-30 minutes. The rule: at least a Tier 3 every day. Your energy level determines the tier. Consistency determines the outcome.',
    category: 'Practice',
  },
  {
    question: 'How does the Shipping Tracker work?',
    answer:
      'The Shipping Tracker is a free browser-based tool. Log what you shipped, select the tier and category, and it tracks your streak, total ships, and shows a calendar heatmap. All data is stored locally in your browser — no account required, no data leaves your device.',
    category: 'Practice',
  },
  // Blueprints & Handbook
  {
    question: 'What are blueprints?',
    answer:
      'Blueprints are actionable frameworks for specific creative workflows. Each blueprint includes a goal, steps, tools, and expected outcomes. Copy it, customize it for your creative domain, execute it. There are 12 blueprints covering content creation, product launches, community building, automation, and more.',
    category: 'Framework',
  },
  {
    question: 'What does the handbook cover?',
    answer:
      'The 8-chapter handbook is the complete operating manual. Chapter 1: Identity & soul.md. Chapter 2: Energy Management. Chapter 3: Craft Development. Chapter 4: Voice Building. Chapter 5: Monetization. Chapter 6: Community. Chapter 7: Systems Design. Chapter 8: Legacy Planning.',
    category: 'Framework',
  },
  {
    question: 'How are the 12 Principles structured?',
    answer:
      'The 12 principles are the philosophical foundation. They include: Ship daily, compound forever. Build systems that compound. AI amplifies human taste. Own your infrastructure. Build in public. And more. Each principle has a detailed explanation and practical application.',
    category: 'Framework',
  },
  // Pricing & Tiers
  {
    question: 'What is included in the free Starter Kit?',
    answer:
      'The free Starter Kit includes: soul.md template, 3 beginner blueprints, principles quick-reference card, access to the shipping tracker, access to the self-assessment, and the weekly GenCreator newsletter. No credit card required.',
    category: 'Pricing',
  },
  {
    question: 'What does Pro include?',
    answer:
      'Pro includes everything in the free tier plus: all 12 blueprints as detailed worksheets, the complete 8-chapter handbook, full Discord community access, weekly live workshops, and peer review circles. Designed for creators ready to build their complete system.',
    category: 'Pricing',
  },
  {
    question: 'What is the Mastery tier?',
    answer:
      'Mastery includes everything in Pro plus: monthly 1:1 coaching with Frank, custom AI agent setup for your workflow, personalized blueprint action plans, and priority support. Limited to 20 seats to maintain coaching quality.',
    category: 'Pricing',
  },
  {
    question: 'Can I upgrade from free to Pro later?',
    answer:
      'Yes. Start with the free Starter Kit, explore the framework, take the assessment, build your soul.md. When you are ready for the full operating system, upgrade to Pro. When you want personalized coaching and custom AI agents, upgrade to Mastery.',
    category: 'Pricing',
  },
  // Technical
  {
    question: 'What AI tools do GenCreators use?',
    answer:
      'The toolkit page lists the curated stack: Claude Code for development, Claude and Gemini for content, Suno for music, n8n for automation, Next.js and Vercel for publishing, Figma and Canva for design, and more. Every tool earns its place by being developer-friendly, composable, and production-proven.',
    category: 'Technical',
  },
  {
    question: 'Do I need to know how to code?',
    answer:
      'Coding helps but is absolutely not required. Many GenCreators focus on content, music, design, or community building. The framework is domain-agnostic — it works for any creative practice. The principles of daily shipping, energy management, and compound systems apply regardless of your medium.',
    category: 'Technical',
  },
]

const categories = ['All', ...Array.from(new Set(faqs.map((f) => f.category)))]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.answer,
    },
  })),
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const filtered = activeCategory === 'All' ? faqs : faqs.filter((f) => f.category === activeCategory)

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-slate-100">
      <GenCreatorNav />

      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-[#02030b] to-indigo-950/15" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-blue-200">
            <HelpCircle className="h-4 w-4" />
            FAQ
          </div>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-100 bg-clip-text text-transparent">
              Questions & Answers
            </span>
          </h1>
          <p className="mt-6 text-lg text-white/60 sm:text-xl">
            Everything about the GenCreator Framework — from first steps to mastery.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="border-y border-white/[0.08] bg-white/[0.03] py-6">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat)
                  setOpenIndex(null)
                }}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  activeCategory === cat
                    ? 'bg-blue-500/15 text-blue-300'
                    : 'text-white/40 hover:bg-white/[0.05] hover:text-white/70'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-6">
          <p className="mb-6 text-xs text-white/30">{filtered.length} questions</p>
          <div className="space-y-3">
            {filtered.map((faq, idx) => {
              const isOpen = openIndex === idx
              return (
                <div
                  key={faq.question}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] transition-colors hover:border-white/[0.1]"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <h3 className="text-sm font-semibold text-white sm:text-base">{faq.question}</h3>
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 shrink-0 text-white/30 transition-transform',
                        isOpen && 'rotate-180'
                      )}
                    />
                  </button>
                  {isOpen && (
                    <div className="border-t border-white/[0.04] px-5 pb-5 pt-3">
                      <p className="text-sm leading-relaxed text-white/55">{faq.answer}</p>
                      <span className="mt-3 inline-block rounded-full border border-white/[0.06] bg-white/[0.03] px-2.5 py-0.5 text-[10px] text-white/30">
                        {faq.category}
                      </span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/[0.08] py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Still have questions?
          </h2>
          <p className="mt-4 text-white/50">
            The best way to understand the framework is to experience it.
            Start with the principles, take the assessment, build your soul.md.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <PremiumButton variant="luxury" size="lg" href="/gencreator/principles">
              Read the Principles
              <ArrowRight className="h-5 w-5" />
            </PremiumButton>
            <PremiumButton variant="ghost" size="lg" href="/gencreator/assess">
              Take the Assessment
            </PremiumButton>
          </div>
        </div>
      </section>

      <Script id="faq-schema" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
    </div>
  )
}
