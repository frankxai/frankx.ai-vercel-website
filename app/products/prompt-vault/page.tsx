import { Metadata } from 'next'
import {
  Check,
  ArrowRight,
  Sparkles,
  Music,
  PenLine,
  Image as ImageIcon,
  Code2,
  Brain,
  Bot,
  TrendingUp,
  Share2,
  Megaphone,
  Zap,
  BookOpen,
  GraduationCap,
  Heart,
} from 'lucide-react'

import { createMetadata } from '@/lib/seo'
import { PromptVaultFAQ } from './faq'

// ── Metadata ──

export const metadata: Metadata = {
  ...createMetadata({
    title: 'Creator Prompt Vault — 66 AI Prompts | FrankX',
    description:
      'Preview the planned Creator Prompt Vault: 66 AI prompts across 14 categories, with examples for Claude, ChatGPT, and Suno. Free launch list; no download yet.',
    path: '/products/prompt-vault',
    keywords: [
      'ai prompts',
      'prompt library',
      'claude prompts',
      'chatgpt prompts',
      'suno prompts',
      'midjourney prompts',
      'creator prompts',
      'ai prompt pack',
      'production prompts',
    ],
  }),
}

// ── Data ──

const categories = [
  { name: 'Writing', icon: PenLine, color: '#8B5CF6', count: 6 },
  { name: 'Music Creation', icon: Music, color: '#EC4899', count: 5 },
  { name: 'Image Generation', icon: ImageIcon, color: '#F59E0B', count: 5 },
  { name: 'Creative Ideation', icon: Sparkles, color: '#F97316', count: 4 },
  { name: 'Coding', icon: Code2, color: '#10B981', count: 6 },
  { name: 'AI Architecture', icon: Brain, color: '#6366F1', count: 5 },
  { name: 'Agent Development', icon: Bot, color: '#0EA5E9', count: 4 },
  { name: 'Business Strategy', icon: TrendingUp, color: '#3B82F6', count: 5 },
  { name: 'Social Media', icon: Share2, color: '#E11D48', count: 5 },
  { name: 'Marketing', icon: Megaphone, color: '#D946EF', count: 5 },
  { name: 'Productivity', icon: Zap, color: '#06B6D4', count: 4 },
  { name: 'Personal Development', icon: Heart, color: '#F43F5E', count: 4 },
  { name: 'Spiritual', icon: BookOpen, color: '#A855F7', count: 4 },
  { name: 'Learning', icon: GraduationCap, color: '#14B8A6', count: 4 },
]

const samplePrompts = [
  {
    category: 'Music Creation',
    title: 'Genre Fusion Architect',
    preview:
      'Combine [Genre A] and [Genre B] into a cohesive Suno prompt. Map the BPM sweet spot, define the tonal palette, specify instrumentation layers, and craft lyrics that honor both traditions while creating something new...',
    tool: 'Suno',
    color: '#EC4899',
  },
  {
    category: 'AI Architecture',
    title: 'Multi-Agent System Designer',
    preview:
      'Design a [N]-agent system for [use case]. Define each agent\'s role, tool access, memory scope, handoff protocol, and failure modes. Include a supervision topology and escalation paths...',
    tool: 'Claude',
    color: '#6366F1',
  },
  {
    category: 'Coding',
    title: 'Production Code Reviewer',
    preview:
      'Review this [language] code for production readiness. Evaluate: error handling completeness, edge case coverage, performance implications, security considerations, and maintainability. Provide actionable fixes...',
    tool: 'Claude / ChatGPT',
    color: '#10B981',
  },
]

const faqs = [
  {
    question: 'What AI tools do these prompts work with?',
    answer:
      'The planned collection covers Claude, ChatGPT, Gemini, Suno, Midjourney, and other creator tools. The samples on this page show the intended tool and task. The downloadable collection is not available yet.',
  },
  {
    question: 'Can I preview the prompts before joining?',
    answer:
      'Yes. This page includes excerpts for music creation, AI architecture, and code review. Read them to assess the approach before joining the free launch list.',
  },
  {
    question: 'Are future prompt updates included?',
    answer:
      'An update policy and release schedule have not been announced. The launch list is for product announcements; it does not include access to a prompt pack or future additions.',
  },
  {
    question: 'Can I use these prompts commercially?',
    answer:
      'Commercial-use terms for the planned pack have not been published. Joining the launch list does not grant a product license. Review the published terms when the pack is available.',
  },
  {
    question: 'What format do the prompts come in?',
    answer:
      'PDF and Markdown are the planned formats, with usage notes, tool suggestions, output formats, and customization variables. There is no download or checkout yet, and joining the launch list is free.',
  },
]

// ── Page ──

export default function PromptVaultPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[#0a0a0f]" />
        <div
          className="absolute -right-60 top-20 h-[600px] w-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)',
            filter: 'blur(128px)',
          }}
        />
        <div
          className="absolute -left-40 bottom-40 h-[500px] w-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(236,72,153,0.05) 0%, transparent 70%)',
            filter: 'blur(128px)',
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 70%)',
            filter: 'blur(128px)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pb-16 pt-20 md:pb-24 md:pt-32">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 px-4 py-2 text-sm font-medium text-[#8B5CF6]">
              <Sparkles className="h-4 w-4" />
              66 prompts · 14 categories · launch list
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-tight text-balance md:text-6xl lg:text-7xl">
              66 AI Prompts for Creators{' '}
              <span className="bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F59E0B] bg-clip-text text-transparent">
                — From the Creator Who Built 12,000+ AI Songs
              </span>
            </h1>

            <p className="mb-8 max-w-2xl text-xl leading-relaxed text-slate-400 text-balance">
              A planned collection for Claude, ChatGPT, Suno, Midjourney, and more. Explore the
              samples and join the free launch list. The downloadable pack is not available yet.
            </p>

            {/* Trust signals */}
            <div className="mb-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <Brain className="h-4 w-4 text-[#8B5CF6]" />
                AI Architect & Creator
              </span>
              <span className="text-white/20">|</span>
              <span className="flex items-center gap-1.5">
                <Music className="h-4 w-4 text-[#EC4899]" />
                12,000+ AI songs created
              </span>
              <span className="text-white/20">|</span>
              <span className="flex items-center gap-1.5">
                <Bot className="h-4 w-4 text-[#43BFE3]" />
                40+ agents built
              </span>
            </div>
            <p className="mb-8 text-xs text-slate-600">
              Independent project. Not affiliated with, endorsed by, or sponsored by Oracle.
            </p>

            {/* CTA */}
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href="/waitlist?intent=prompt-vault"
                className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F59E0B] px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-[#8B5CF6]/30 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-[#8B5CF6]/40"
              >
                Join the launch list
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">€19</span>
                <span className="text-sm text-slate-500">listed price</span>
              </div>
            </div>
          </div>
        </section>

        {/* 14 Categories Grid */}
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">14 Categories. Every Use Case.</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-400">
              From creative writing to agent development, from music production to business strategy
              — prompts organized by domain and optimized for specific AI tools.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((cat) => {
              const Icon = cat.icon
              return (
                <div
                  key={cat.name}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.05]"
                >
                  <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${cat.color}18` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: cat.color }} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold">{cat.name}</h3>
                      <p className="text-xs text-slate-500">{cat.count} prompts</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <p className="mt-8 text-center text-sm text-slate-500">
            Planned scope: 66 prompts · 14 categories · Release date to be announced
          </p>
        </section>

        {/* Sample Prompts */}
        <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Sample Prompts — Preview the Quality</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-400">
              Here is a taste of what is inside. Every prompt is structured for maximum output
              quality with specific parameters and formatting instructions.
            </p>
          </div>

          <div className="space-y-6">
            {samplePrompts.map((prompt) => (
              <div
                key={prompt.title}
                className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm md:p-8"
              >
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span
                    className="rounded-full px-3 py-1 text-xs font-semibold"
                    style={{ backgroundColor: `${prompt.color}18`, color: prompt.color }}
                  >
                    {prompt.category}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400">
                    {prompt.tool}
                  </span>
                </div>

                <h3 className="mb-3 text-lg font-bold">{prompt.title}</h3>

                <div className="relative">
                  <p className="font-mono text-sm leading-relaxed text-slate-400">
                    {prompt.preview}
                  </p>
                  {/* Fade overlay */}
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#0a0a0f]/80 to-transparent" />
                </div>

                <p className="mt-4 text-xs text-slate-500 italic">
                  Full prompt includes detailed parameters, output formatting, and usage notes...
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* What Makes These Different */}
        <section className="mx-auto max-w-5xl px-6 py-16">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#8B5CF6]/10 via-transparent to-[#EC4899]/10 p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-[#8B5CF6]" />
                  <span className="text-sm font-semibold text-[#8B5CF6]">Planned Prompt Structure</span>
                </div>
                <h2 className="mb-4 text-3xl font-bold md:text-4xl">A Starting Point for Your Workflow</h2>
                <p className="text-lg leading-relaxed text-slate-400">
                  The planned pack organizes prompts by task, tool, and expected output.
                  The examples above show the approach; final contents remain subject to review
                  before release.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  'Chain-of-thought structures that produce deeper outputs',
                  'Specific parameter tuning for each AI tool',
                  'Output formatting instructions built into every prompt',
                  'Customization variables you can swap for any use case',
                  'Difficulty levels from beginner to advanced',
                  'Tool guidance for Claude, ChatGPT, Gemini, Suno, and Midjourney',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#10B981]" />
                    <span className="text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-3xl px-6 py-16">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Frequently Asked Questions</h2>
            <p className="text-lg text-slate-400">
              Everything you need to know about the Creator Prompt Vault.
            </p>
          </div>

          <PromptVaultFAQ faqs={faqs} />
        </section>

        {/* Final CTA */}
        <section id="buy" className="mx-auto max-w-4xl px-6 py-20">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-md sm:p-12">
            <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6]/10 via-[#EC4899]/10 to-[#F59E0B]/10" />

            <div className="relative z-10 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Follow the Creator Prompt Vault Launch
              </h2>
              <p className="mx-auto mb-8 max-w-lg text-lg leading-relaxed text-slate-400">
                Join the free launch list for updates on the planned collection.
                The listed price is €19; there is no checkout or download yet.
              </p>

              <div className="mb-6 flex flex-col items-center gap-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-bold text-white">€19</span>
                  <span className="text-slate-500">listed price</span>
                </div>
                <a
                  href="/waitlist?intent=prompt-vault"
                  className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F59E0B] px-10 py-5 text-xl font-semibold text-white shadow-xl shadow-[#8B5CF6]/30 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-[#8B5CF6]/40"
                >
                  Join the launch list
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>

              <p className="text-sm text-slate-500">
                No checkout yet. Join the list for launch.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
