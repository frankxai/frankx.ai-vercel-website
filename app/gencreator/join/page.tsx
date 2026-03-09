import type { Metadata } from 'next'
import Script from 'next/script'
import { ArrowRight, Check, Zap, Crown, Sparkles } from 'lucide-react'

import { GlowCard } from '@/components/ui/glow-card'
import PremiumButton from '@/components/ui/PremiumButton'
import GenCreatorNav from '@/components/gencreator/GenCreatorNav'
import { EmailSignup } from '@/components/email-signup'
import { productTiers } from '@/lib/gencreator/gencreator-data'

export const metadata: Metadata = {
  title: 'Join GenCreator — Starter Kit, Pro & Mastery',
  description:
    'Choose your GenCreator tier. Free Starter Kit, Pro membership with full blueprints and community, or Mastery with coaching and custom AI agents.',
  openGraph: {
    title: 'Join GenCreator',
    description: 'Free Starter Kit. Pro blueprints + community. Mastery coaching + AI agents.',
    url: 'https://frankx.ai/gencreator/join',
  },
}

const tierIcons = [Zap, Crown, Sparkles]
const tierColors = ['emerald', 'cyan', 'violet'] as const

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Join GenCreator',
  description: 'Product tiers for the GenCreator Framework — from free starter kit to mastery coaching.',
  url: 'https://frankx.ai/gencreator/join',
  author: { '@type': 'Person', name: 'Frank Riemer', url: 'https://frankx.ai' },
  offers: productTiers.map((tier) => ({
    '@type': 'Offer',
    name: tier.name,
    price: tier.price === 'Free' ? '0' : tier.price.replace('$', ''),
    priceCurrency: 'USD',
    description: tier.description,
  })),
}

export default function JoinPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-slate-100">
      <GenCreatorNav />

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/30 via-[#02030b] to-cyan-950/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.10),transparent_50%)]" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-emerald-200">
            Join the Movement
          </div>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            <span className="bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent">
              Choose Your Path
            </span>
          </h1>
          <p className="mt-6 text-lg text-white/60 sm:text-xl">
            From first blueprint to full creative empire.
            <br className="hidden sm:block" />
            Every tier includes lifetime access to the GenCreator Framework.
          </p>
        </div>
      </section>

      {/* ─── Pricing Cards ─── */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 lg:grid-cols-3">
            {productTiers.map((tier, i) => {
              const Icon = tierIcons[i]
              const color = tierColors[i]
              return (
                <GlowCard
                  key={tier.slug}
                  color={color}
                  className={`relative flex flex-col p-8 ${tier.highlighted ? 'ring-2 ring-cyan-400/30' : ''}`}
                >
                  {tier.badge && (
                    <div className="absolute -top-3 right-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-1 text-xs font-bold text-white shadow-lg">
                      {tier.badge}
                    </div>
                  )}

                  <div className="mb-6">
                    <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-${color}-500 to-${color}-600`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">{tier.name}</h3>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-white">{tier.price}</span>
                      <span className="text-sm text-white/40">{tier.priceDetail}</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-white/50">{tier.description}</p>
                  </div>

                  <ul className="mb-8 flex-1 space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-white/70">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <PremiumButton
                    variant={tier.highlighted ? 'luxury' : 'ghost'}
                    size="lg"
                    href={tier.slug === 'starter' ? '/newsletter' : tier.slug === 'mastery' ? '/coaching' : '/newsletter'}
                    className="w-full justify-center"
                  >
                    {tier.cta}
                    <ArrowRight className="h-4 w-4" />
                  </PremiumButton>
                </GlowCard>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── What's Included ─── */}
      <section className="border-y border-white/[0.08] bg-white/[0.03] py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Every Tier Includes
          </h2>
          <div className="mt-8 grid gap-4 text-left sm:grid-cols-2">
            {[
              'Access to all 12 principles',
              'The GenCreator Manifesto',
              'soul.md template',
              'Weekly newsletter',
              'Community read access',
              'Framework updates for life',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3">
                <Check className="h-4 w-4 shrink-0 text-emerald-400" />
                <span className="text-sm text-white/70">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">
            Common Questions
          </h2>
          <div className="mt-10 space-y-6">
            {[
              {
                q: 'Can I start for free?',
                a: 'Yes. The Starter Kit is completely free and includes your soul.md template, 3 beginner blueprints, and the principles quick-reference card. No credit card required.',
              },
              {
                q: 'What makes Pro worth it?',
                a: 'Pro gives you all 12 blueprints as detailed worksheets, the complete 8-chapter handbook, full Discord community access, weekly live workshops, and peer review circles. It is the full GenCreator operating system.',
              },
              {
                q: 'How does Mastery coaching work?',
                a: 'Mastery includes a monthly 1:1 coaching call with Frank, custom AI agent setup for your workflow, personalized blueprint action plans, and priority support. Limited to 20 seats to maintain quality.',
              },
              {
                q: 'Can I upgrade later?',
                a: 'Absolutely. Start with the free Starter Kit, upgrade to Pro when you are ready for the full system, and move to Mastery when you want coaching and custom agents.',
              },
              {
                q: 'Is there a refund policy?',
                a: 'Yes. Pro has a 14-day refund policy. If the system does not work for you, you get your money back. Mastery is non-refundable due to the coaching commitment.',
              },
            ].map((faq) => (
              <div key={faq.q} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
                <h3 className="text-base font-semibold text-white">{faq.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Email Signup CTA ─── */}
      <section className="border-t border-white/[0.08] bg-white/[0.03] py-16">
        <div className="mx-auto max-w-xl px-6 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Get the Free Starter Kit
          </h2>
          <p className="mt-4 text-white/50">
            soul.md template, 3 beginner blueprints, and the principles quick-reference card. Delivered instantly.
          </p>
          <div className="mt-8">
            <EmailSignup
              listType="gencreator"
              placeholder="your@email.com"
              buttonText="Send My Starter Kit"
            />
          </div>
          <p className="mt-3 text-xs text-white/30">
            No spam. Unsubscribe anytime. You also get the weekly GenCreator dispatch.
          </p>
        </div>
      </section>

      <Script id="join-schema" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
    </div>
  )
}
