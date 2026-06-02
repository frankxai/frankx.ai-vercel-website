import { Metadata } from 'next'
import Link from 'next/link'
import {
  Check,
  Mail,
  FileSpreadsheet,
  BookOpen,
  Shield,
  Building2,
  Scale,
  Briefcase,
  FileText,
  Sparkles,
  ArrowRight,
  Clock,
  Euro,
} from 'lucide-react'

import { createMetadata } from '@/lib/seo'
import { BVKitFAQ } from './faq'

// ── Metadata ──

export const metadata: Metadata = {
  ...createMetadata({
    title: 'Creator BV Kit — The Digital Haven Blueprint | FrankX',
    description:
      'Launch your Dutch BV in 30 days. Every template, email, checklist, and financial tool you need to legally protect your creator business in the Netherlands.',
    path: '/products/bv-kit',
    keywords: [
      'dutch bv formation',
      'creator business netherlands',
      'bv kit',
      'digital nomad netherlands',
      'holding structure',
      'creator legal protection',
      'dutch business formation',
      'kvk registration',
    ],
  }),
  other: {
    'script:ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Creator BV Kit — The Digital Haven Blueprint',
      description:
        'Every template, email, checklist, and financial tool you need to legally protect your creator business in the Netherlands.',
      brand: { '@type': 'Brand', name: 'FrankX' },
      offers: {
        '@type': 'Offer',
        price: '97',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        url: 'https://frankx.ai/products/bv-kit',
        seller: {
          '@type': 'Person',
          name: 'Frank Riemer',
        },
      },
    }),
  },
}

// ── Data ──

const includedItems = [
  {
    icon: Mail,
    title: '11 Ready-to-Send Emails',
    description:
      'Pre-written correspondence for notaries, KVK, tax advisors, and banks — in Dutch and English. Copy, personalize, send.',
    color: '#43BFE3',
  },
  {
    icon: BookOpen,
    title: '30-Step Formation Playbook',
    description:
      'Day-by-day walkthrough from initial decision to fully operational BV. Every step documented, every pitfall flagged.',
    color: '#AB47C7',
  },
  {
    icon: FileSpreadsheet,
    title: 'Financial Planning Excel',
    description:
      'Pre-built spreadsheet covering capital requirements, tax projections, salary optimization, and dividend planning for your first 3 years.',
    color: '#10B981',
  },
  {
    icon: FileText,
    title: 'Legal Page Templates',
    description:
      'Privacy policy, terms of service, and cookie policy templates tailored for Dutch creator businesses. GDPR-compliant foundations.',
    color: '#F59E0B',
  },
  {
    icon: Shield,
    title: 'Trademark Strategy Guide',
    description:
      'Step-by-step guide to protecting your brand name, domain, and creative IP in the EU through EUIPO and Benelux channels.',
    color: '#EC4899',
  },
  {
    icon: Briefcase,
    title: 'Employer Separation Guide',
    description:
      'How to properly structure your BV while employed. Clear boundaries, disclosure frameworks, and conflict-of-interest prevention.',
    color: '#6366F1',
  },
  {
    icon: Building2,
    title: 'Holding Structure Blueprint',
    description:
      'Complete guide to the holding-operating BV structure. When you need it, how to set it up, and the tax advantages it unlocks.',
    color: '#0EA5E9',
  },
  {
    icon: Scale,
    title: 'Tax Optimization Checklist',
    description:
      'Every deduction, benefit, and structure available to Dutch BV owners. Organized by category with estimated savings.',
    color: '#14B8A6',
  },
]

const faqs = [
  {
    question: 'Do I need two BVs (holding + operating)?',
    answer:
      'A holding-operating structure offers significant tax advantages and asset protection, but it doubles your formation costs and administrative overhead. The kit covers both single-BV and dual-BV paths with clear decision criteria based on your revenue, risk profile, and growth plans. Most creators start with one BV and add a holding later when revenue justifies the structure.',
  },
  {
    question: 'How much does BV formation cost in total?',
    answer:
      'Budget approximately €1,500–3,000 for a single BV (notary fees, KVK registration, initial capital, accountant setup). A holding structure roughly doubles that. The kit breaks down every cost line item so you can plan accurately. The financial planner Excel helps you model these costs against your projected income.',
  },
  {
    question: 'Can I do this while employed full-time?',
    answer:
      'Yes — thousands of Dutch professionals run a BV alongside employment. The Employer Separation Guide covers disclosure requirements, non-compete considerations, and clean boundary frameworks. The key is transparency with your employer and clear separation between your employment duties and BV activities.',
  },
  {
    question: 'What about trademark protection?',
    answer:
      'The Trademark Strategy Guide walks you through Benelux (BOIP) and EU-wide (EUIPO) trademark registration. For most creators, a Benelux trademark (€244) provides strong regional protection. EU-wide registration (€850) makes sense once you have international revenue. The guide includes the exact filing process and common pitfalls to avoid.',
  },
  {
    question: 'Is this relevant if I already have a freelance/ZZP status?',
    answer:
      'Absolutely. The transition from ZZP (sole proprietorship) to BV is one of the most common paths covered in the kit. You will find specific guidance on timing the transition, transferring existing clients and contracts, and handling the tax implications of the switch.',
  },
  {
    question: 'What is the refund policy?',
    answer:
      'Full 14-day money-back guarantee in compliance with EU consumer rights (Directive 2011/83/EU). If the kit does not meet your expectations, email within 14 days for a complete refund. The templates and tools are yours to keep regardless.',
  },
]

// ── Page ──

export default function BVKitPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[#0a0a0f]" />
        <div
          className="absolute -right-60 top-20 h-[600px] w-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(171,71,199,0.07) 0%, transparent 70%)',
            filter: 'blur(128px)',
          }}
        />
        <div
          className="absolute -left-40 bottom-40 h-[500px] w-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(67,191,227,0.05) 0%, transparent 70%)',
            filter: 'blur(128px)',
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(16,185,129,0.03) 0%, transparent 70%)',
            filter: 'blur(128px)',
          }}
        />
        {/* Subtle grid */}
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
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#AB47C7]/30 bg-[#AB47C7]/10 px-4 py-2 text-sm font-medium text-[#AB47C7]">
              <Building2 className="h-4 w-4" />
              Digital Product — Instant Download
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-tight text-balance md:text-6xl lg:text-7xl">
              Launch Your Dutch BV in 30 Days{' '}
              <span className="bg-gradient-to-r from-[#AB47C7] via-[#43BFE3] to-[#10B981] bg-clip-text text-transparent">
                — The Complete Creator Playbook
              </span>
            </h1>

            <p className="mb-8 max-w-2xl text-xl leading-relaxed text-slate-400 text-balance">
              Every template, email, checklist, and financial tool you need to legally protect your
              creator business in the Netherlands. Built by a creator who went through the entire
              process.
            </p>

            {/* Trust signals */}
            <div className="mb-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-[#43BFE3]" />
                30-day playbook
              </span>
              <span className="text-white/20">|</span>
              <span className="flex items-center gap-1.5">
                <Mail className="h-4 w-4 text-[#AB47C7]" />
                11 ready-to-send emails
              </span>
              <span className="text-white/20">|</span>
              <span className="flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-[#10B981]" />
                14-day money-back guarantee
              </span>
            </div>

            {/* CTA */}
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href="#buy"
                className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#AB47C7] via-violet-600 to-[#43BFE3] px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-[#AB47C7]/30 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-[#AB47C7]/40"
              >
                Get the BV Kit
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">€97</span>
                <span className="text-sm text-slate-500">one-time purchase</span>
              </div>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Everything Inside the Kit</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-400">
              Eight comprehensive resources covering every phase of Dutch BV formation — from first
              decision to fully operational business.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {includedItems.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.05]"
                >
                  {/* Top edge highlight */}
                  <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                  <div
                    className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: `${item.color}18` }}
                  >
                    <Icon className="h-7 w-7" style={{ color: item.color }} />
                  </div>
                  <h3 className="mb-3 text-xl font-bold">{item.title}</h3>
                  <p className="leading-relaxed text-slate-400">{item.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Who This Is For */}
        <section className="mx-auto max-w-5xl px-6 py-16">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#AB47C7]/10 via-transparent to-[#43BFE3]/10 p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-[#AB47C7]" />
                  <span className="text-sm font-semibold text-[#AB47C7]">Perfect Match</span>
                </div>
                <h2 className="mb-4 text-3xl font-bold md:text-4xl">Built for Creators in the Netherlands</h2>
                <p className="text-lg leading-relaxed text-slate-400">
                  Whether you are a content creator, developer, musician, or digital entrepreneur — this
                  kit was designed for the unique challenges of building a creator business under Dutch
                  law.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  'YouTubers, streamers, and content creators scaling their revenue',
                  'Freelance developers transitioning from ZZP to BV',
                  'Musicians and artists monetizing digital products',
                  'Digital entrepreneurs building SaaS or info products',
                  'Professionals starting a side BV while employed',
                  'International creators relocating to the Netherlands',
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

        {/* The Process Timeline */}
        <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Your 30-Day Timeline</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-400">
              A structured, day-by-day plan that takes you from decision to operational BV.
            </p>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#AB47C7] via-[#43BFE3] to-[#10B981] md:left-1/2 md:-translate-x-px" />

            {[
              {
                week: 'Week 1',
                title: 'Foundation',
                items: ['Choose your BV structure', 'Select and brief your notary', 'Open a business bank account'],
                color: '#AB47C7',
              },
              {
                week: 'Week 2',
                title: 'Formation',
                items: ['Sign deed of incorporation', 'Register with KVK', 'Receive your KVK number and RSIN'],
                color: '#43BFE3',
              },
              {
                week: 'Week 3',
                title: 'Infrastructure',
                items: ['Set up accounting software', 'Configure tax registrations (BTW/VAT)', 'Establish invoicing systems'],
                color: '#6366F1',
              },
              {
                week: 'Week 4',
                title: 'Operations',
                items: ['Legal pages and compliance', 'Trademark filing (optional)', 'First invoice and revenue flow'],
                color: '#10B981',
              },
            ].map((phase, index) => (
              <div
                key={phase.week}
                className={`relative mb-12 flex flex-col md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-start gap-8`}
              >
                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                  <div
                    className="h-4 w-4 rounded-full border-2 border-[#0a0a0f]"
                    style={{ backgroundColor: phase.color }}
                  />
                </div>

                {/* Content */}
                <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                  <span
                    className="mb-2 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
                    style={{ backgroundColor: `${phase.color}18`, color: phase.color }}
                  >
                    {phase.week}
                  </span>
                  <h3 className="mb-3 text-xl font-bold">{phase.title}</h3>
                  <ul className="space-y-2">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-slate-400">
                        <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: phase.color }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Social Proof Placeholder */}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">What Creators Are Saying</h2>
            <p className="mx-auto mb-12 max-w-2xl text-lg text-slate-400">
              Join creators who have successfully launched their Dutch BV using this kit.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                quote: 'The email templates alone saved me weeks of back-and-forth with my notary.',
                name: 'Coming soon',
                role: 'Content Creator',
              },
              {
                quote: 'Finally, a BV guide written by someone who actually went through the process.',
                name: 'Coming soon',
                role: 'Freelance Developer',
              },
              {
                quote: 'The financial planner made salary vs. dividend optimization crystal clear.',
                name: 'Coming soon',
                role: 'Digital Entrepreneur',
              },
            ].map((testimonial) => (
              <div
                key={testimonial.role}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm"
              >
                <p className="mb-4 text-sm leading-relaxed text-slate-300 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="text-xs text-slate-500">
                  <span className="font-medium text-slate-400">{testimonial.name}</span>
                  <span className="mx-1.5">·</span>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-3xl px-6 py-16">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Frequently Asked Questions</h2>
            <p className="text-lg text-slate-400">
              Everything you need to know about the Creator BV Kit.
            </p>
          </div>

          <BVKitFAQ faqs={faqs} />
        </section>

        {/* Money-Back Guarantee */}
        <section className="mx-auto max-w-3xl px-6 py-16">
          <div className="rounded-3xl border border-[#10B981]/20 bg-[#10B981]/5 p-8 text-center md:p-12">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#10B981]/15">
              <Shield className="h-8 w-8 text-[#10B981]" />
            </div>
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">14-Day Money-Back Guarantee</h2>
            <p className="mx-auto max-w-lg leading-relaxed text-slate-400">
              Protected by EU consumer rights (Directive 2011/83/EU). If the Creator BV Kit does
              not meet your expectations, request a full refund within 14 days. Your investment is
              completely protected.
            </p>
          </div>
        </section>

        {/* Final CTA */}
        <section id="buy" className="mx-auto max-w-4xl px-6 py-20">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-md sm:p-12">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#AB47C7]/10 via-[#43BFE3]/10 to-[#10B981]/10" />

            <div className="relative z-10 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Ready to Launch Your Dutch BV?
              </h2>
              <p className="mx-auto mb-8 max-w-lg text-lg leading-relaxed text-slate-400">
                Get every template, checklist, and tool you need — packaged into one comprehensive
                kit. Start your 30-day journey today.
              </p>

              <div className="mb-6 flex flex-col items-center gap-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-bold text-white">€97</span>
                  <span className="text-slate-500">one-time, when the kit ships</span>
                </div>
                <Link
                  href="/inner-circle"
                  className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#AB47C7] via-violet-600 to-[#43BFE3] px-10 py-5 text-xl font-semibold text-white shadow-xl shadow-[#AB47C7]/30 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-[#AB47C7]/40"
                >
                  <Euro className="h-6 w-6" />
                  Reserve your copy
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              <p className="text-sm text-slate-500">
                Inner Circle wait list · founder pricing on launch · 14-day money-back guarantee · EU consumer rights protected
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
