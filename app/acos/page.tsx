import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'
import {
  Terminal,
  Sparkles,
  Users,
  Command,
  Layers,
  ArrowRight,
  Github,
  Check,
  Zap,
  Download,
  BookOpen,
  Headphones,
  Code2,
  MessageSquare
} from 'lucide-react'

import GlassmorphicCard from '@/components/ui/GlassmorphicCard'
import PremiumButton from '@/components/ui/PremiumButton'

/* ──────────────────────────────────────────────
   CHECKOUT URLS — update when LemonSqueezy store is live
   https://app.lemonsqueezy.com/products
   Until then: waitlist redirect to newsletter
   ────────────────────────────────────────────── */
const CHECKOUT = {
  starter: '/newsletter?ref=acos-creator-kit',
  pro: '/newsletter?ref=acos-pro-system',
}

const stats = [
  { label: 'Skills', value: '75+', icon: Sparkles, color: 'from-cyan-500 to-blue-500' },
  { label: 'Agents', value: '38', icon: Users, color: 'from-purple-500 to-violet-500' },
  { label: 'Commands', value: '35+', icon: Command, color: 'from-amber-500 to-orange-500' },
  { label: 'Workflows', value: '8', icon: Layers, color: 'from-emerald-500 to-teal-500' },
]

const features = [
  {
    icon: Terminal,
    title: 'One Command to Rule Them All',
    description: 'Type /acos and the smart router figures out what you need. Article? Music? Deployment? It auto-routes to the right agent with the right skills loaded.',
  },
  {
    icon: Sparkles,
    title: '75+ Auto-Activating Skills',
    description: 'Skills load automatically based on what you\'re doing. Write a blog post? SEO, schema markup, and content strategy skills activate. Build a feature? TypeScript, React, and architecture skills load.',
  },
  {
    icon: Users,
    title: '38 Specialized Agents',
    description: 'Developmental editors, music producers, UI designers, SEO strategists, security auditors — each with deep domain knowledge and distinct capabilities.',
  },
  {
    icon: Layers,
    title: 'Orchestrated Workflows',
    description: 'Multi-step pipelines for complex operations: research → write → edit → publish. Factory mode produces complete artifacts from a single prompt.',
  },
  {
    icon: Code2,
    title: 'MCP Server Integrations',
    description: 'Playwright for browser automation, Nano Banana for image generation, Memory for persistent context, Resend for email — all wired in and ready.',
  },
  {
    icon: Zap,
    title: 'Self-Learning System',
    description: 'Trajectory tracking and pattern extraction improve every session. The system learns what works and optimizes routing, skill selection, and agent coordination.',
  },
]

const tiers = [
  {
    name: 'Open Source',
    price: 'Free',
    priceNote: 'MIT License',
    description: 'The full ACOS system. Clone it, use it, modify it.',
    features: [
      '35+ creator commands',
      '75+ auto-activating skills',
      '38 specialized agents',
      '8 orchestrated workflows',
      'MCP server integrations',
      'Self-learning trajectory system',
      'Community GitHub issues',
    ],
    cta: 'Clone from GitHub',
    ctaHref: 'https://github.com/frankxai/agentic-creator-os',
    variant: 'ghost' as const,
    featured: false,
  },
  {
    name: 'Creator Kit',
    price: '$47',
    priceNote: 'One-time',
    description: 'Everything open-source + premium templates, video walkthroughs, and direct support.',
    features: [
      'Everything in Open Source',
      'Video quickstart guide (45 min)',
      'Premium template library (20+)',
      'Curated skill pack presets',
      'Priority email support',
      'Private Discord community',
    ],
    cta: 'Join Waitlist',
    ctaHref: CHECKOUT.starter,
    variant: 'primary' as const,
    featured: true,
  },
  {
    name: 'Pro System',
    price: '$197',
    priceNote: 'One-time',
    description: 'Full ACOS mastery. Deep-dive setup, custom configurations, quarterly updates, and 1:1 support.',
    features: [
      'Everything in Creator Kit',
      'Deep-dive setup walkthrough (2hr)',
      'Custom agent configuration guide',
      'Quarterly skill pack updates',
      'Priority GitHub issue resolution',
      '1:1 async support (30 days)',
    ],
    cta: 'Join Waitlist',
    ctaHref: CHECKOUT.pro,
    variant: 'luxury' as const,
    featured: false,
  },
]

const faq = [
  {
    q: 'What exactly is ACOS?',
    a: 'ACOS (Agentic Creator Operating System) is a configuration layer for Claude Code that turns it into a full creative production environment. It adds 35+ commands, 75+ skills, and 38 agents that auto-activate based on what you\'re working on. Think of it as an operating system that sits on top of Claude Code.',
  },
  {
    q: 'Is the open-source version the full product?',
    a: 'Yes. The MIT-licensed version on GitHub contains the complete ACOS system — every command, skill, agent, and workflow. The paid tiers add premium templates, video guides, direct support, and custom configuration help. The code itself is 100% free.',
  },
  {
    q: 'Do I need Claude Code to use ACOS?',
    a: 'Yes. ACOS is built specifically for Claude Code (Anthropic\'s CLI). You\'ll need an active Claude subscription with Claude Code access. ACOS installs as a project configuration that Claude Code reads automatically.',
  },
  {
    q: 'How do I install it?',
    a: 'Clone the repo, run install.sh, and open Claude Code in that directory. That\'s it. The /acos command becomes your entry point. Skills auto-activate, agents load on demand, and hooks run automatically.',
  },
  {
    q: 'What\'s different about the paid tiers?',
    a: 'The paid tiers provide guided setup (video walkthroughs), premium templates (20+ pre-built content patterns), curated presets, and direct support from the creator. The Pro tier adds quarterly skill pack updates, custom agent configuration, and 1:1 async support for 30 days.',
  },
  {
    q: 'Can I customize the agents and skills?',
    a: 'Absolutely. Every agent is a markdown file, every skill is a configuration. You can edit, add, or remove any component. The Pro tier includes a custom agent configuration guide that teaches you how to build agents tailored to your workflow.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Agentic Creator OS (ACOS)',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Cross-platform (Claude Code)',
  description: 'The Operating System for Generative Creators. 75+ skills, 38 agents, 35+ commands for Claude Code.',
  offers: [
    { '@type': 'Offer', price: '0', priceCurrency: 'USD', name: 'Open Source' },
    { '@type': 'Offer', price: '47', priceCurrency: 'USD', name: 'Creator Kit' },
    { '@type': 'Offer', price: '197', priceCurrency: 'USD', name: 'Pro System' },
  ],
  author: { '@type': 'Person', name: 'Frank Guzman', url: 'https://frankx.ai' },
  url: 'https://github.com/frankxai/agentic-creator-os',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}

export default function ACOSPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-slate-100">
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden pt-24 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/40 via-[#02030b] to-cyan-950/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(161,72,221,0.15),transparent_55%)]" />
        {/* Axi — command center prowl accent */}
        <div className="pointer-events-none absolute left-4 bottom-8 hidden w-40 opacity-[0.08] lg:block xl:w-52">
          <Image src="/images/mascot/mascot-v06-prowling-action.png" alt="" width={208} height={208} className="object-contain" aria-hidden="true" />
        </div>
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <div className="mb-6 flex flex-col items-center gap-4">
            <Image
              src="/images/team/stella-owl.png"
              alt="Stella — System Orchestrator"
              width={80}
              height={80}
              className="rounded-2xl"
              style={{ boxShadow: '0 0 40px -8px rgba(139,92,246,0.5)' }}
            />
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-purple-200">
              <Terminal className="h-4 w-4" />
              Open Source
            </div>
          </div>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-white via-purple-100 to-cyan-100 bg-clip-text text-transparent">
              Agentic Creator OS
            </span>
          </h1>
          <p className="mt-6 text-lg text-white/60 sm:text-xl md:text-2xl">
            The operating system for generative creators.
            <br className="hidden sm:block" />
            75+ skills. 38 agents. 35+ commands. One entry point.
          </p>

          {/* Terminal demo */}
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-white/10 bg-[#0d1117] p-6 text-left font-mono text-sm shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            <div className="mb-4 flex gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="space-y-2 text-white/70">
              <p><span className="text-emerald-400">$</span> git clone https://github.com/frankxai/agentic-creator-os</p>
              <p><span className="text-emerald-400">$</span> cd agentic-creator-os && ./install.sh</p>
              <p><span className="text-emerald-400">$</span> claude</p>
              <p className="text-purple-400">/acos</p>
              <p className="mt-2 text-cyan-300">
                ACOS v10.2 loaded. 75 skills active. 38 agents ready.
              </p>
              <p className="text-white/40">
                What would you like to create today?
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <PremiumButton variant="luxury" size="lg" href="https://github.com/frankxai/agentic-creator-os" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
              Star on GitHub
              <ArrowRight className="h-5 w-5" />
            </PremiumButton>
            <PremiumButton variant="ghost" size="lg" href="#pricing">
              <Download className="h-5 w-5" />
              See Pricing
            </PremiumButton>
          </div>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="border-y border-white/[0.08] bg-white/[0.03] py-12">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-6 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <div className="mt-1 text-sm text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
            What Makes ACOS Different
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-white/50">
            Not another prompt library. A complete intelligence layer that transforms Claude Code into a creative production environment.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <GlassmorphicCard key={feature.title} variant="premium" className="p-6">
                <feature.icon className="mb-4 h-8 w-8 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{feature.description}</p>
              </GlassmorphicCard>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Commands Preview ─── */}
      <section className="border-y border-white/[0.08] bg-white/[0.03] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
            130+ Commands at Your Fingertips
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {[
              { category: 'Creation', commands: ['/article-creator', '/create-music', '/infogenius', '/generate-images', '/generate-social', '/factory', '/products-creation', '/author-team'], color: 'text-cyan-400' },
              { category: 'Strategy', commands: ['/starlight-architect', '/starlight-intelligence', '/council', '/research', '/plan-week', '/harvest'], color: 'text-purple-400' },
              { category: 'Development', commands: ['/spec', '/nextjs-deploy', '/ux-design', '/automation-dev'], color: 'text-amber-400' },
              { category: 'System', commands: ['/acos', '/inventory-status', '/mcp-status', '/publish', '/review-content'], color: 'text-emerald-400' },
            ].map((group) => (
              <div key={group.category}>
                <h3 className={`mb-3 text-sm font-semibold uppercase tracking-[0.3em] ${group.color}`}>
                  {group.category}
                </h3>
                <div className="space-y-1 font-mono text-sm">
                  {group.commands.map((cmd) => (
                    <div key={cmd} className="rounded-lg bg-white/[0.03] px-4 py-2 text-white/70">
                      <span className="text-white/40">&gt;</span> {cmd}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pricing ─── */}
      <section id="pricing" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
            Choose Your Path
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-white/50">
            The code is free. Premium adds guides, templates, support, and direct access.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-3xl border p-8 ${
                  tier.featured
                    ? 'border-purple-400/40 bg-purple-500/10 shadow-[0_22px_60px_rgba(161,72,221,0.2)]'
                    : 'border-white/10 bg-white/[0.03]'
                }`}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                    Most Popular
                  </div>
                )}
                <div className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                  {tier.name}
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white">{tier.price}</span>
                  <span className="text-sm text-white/40">{tier.priceNote}</span>
                </div>
                <p className="mt-4 text-sm text-white/60">{tier.description}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-white/70">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  {tier.ctaHref.startsWith('http') ? (
                    <a
                      href={tier.ctaHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 ${
                        tier.featured
                          ? 'bg-gradient-to-r from-purple-500 to-cyan-500 shadow-[0_16px_50px_rgba(161,72,221,0.35)]'
                          : tier.variant === 'luxury'
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 shadow-[0_16px_50px_rgba(161,72,221,0.25)]'
                            : 'border border-white/20 bg-white/[0.05] hover:bg-white/[0.08]'
                      }`}
                    >
                      {tier.name === 'Open Source' && <Github className="h-4 w-4" />}
                      {tier.cta}
                    </a>
                  ) : (
                    <Link
                      href={tier.ctaHref}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.05] px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 hover:bg-white/[0.08]"
                    >
                      {tier.cta}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-white/30">
            Need enterprise-level customization?{' '}
            <a href="mailto:hello@frankx.ai?subject=ACOS%20Enterprise" className="text-purple-300 underline-offset-4 hover:underline">
              Contact for custom pricing
            </a>
          </p>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="border-t border-white/[0.08] bg-white/[0.03] py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-center text-3xl font-bold text-white">Frequently Asked Questions</h2>
          <div className="mt-10 space-y-4">
            {faq.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <summary className="cursor-pointer text-lg font-semibold text-white">
                  {item.q}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Start Building with ACOS
          </h2>
          <p className="mt-4 text-lg text-white/50">
            Clone the repo. Type /acos. Create something.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <PremiumButton variant="luxury" size="lg" href="https://github.com/frankxai/agentic-creator-os" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
              View on GitHub
            </PremiumButton>
            <PremiumButton variant="primary" size="lg" href={CHECKOUT.starter} target="_blank" rel="noopener noreferrer">
              Get Creator Kit — $47
            </PremiumButton>
          </div>
        </div>
      </section>

      {/* ─── Schema ─── */}
      <Script id="acos-structured-data" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
      <Script id="acos-faq-schema" type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </Script>
    </div>
  )
}
