import { Check, Download, Lock, Star, ArrowRight, Sparkles } from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import Link from 'next/link'

export const metadata = createMetadata({
  title: 'Golden Path - 4-Week Transformation Workbook ($297)',
  description: 'Master awareness, emotional intelligence, and purpose clarity in 4 weeks. 80-page structured workbook with 40+ exercises. Join 1,200+ creators who transformed their lives.',
  path: '/soulbook/golden-path',
})

export default function GoldenPathSalesPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white">
      {/* Aurora Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative pt-28 pb-24">
        <div className="px-6">
          <div className="mx-auto max-w-4xl">
            
            {/* Hero Section */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400 mb-6">
                <Sparkles className="h-4 w-4" />
                4-Week Transformation Program
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6">
                The Golden Path
              </h1>
              
              <p className="text-xl md:text-2xl text-white/60 leading-relaxed max-w-3xl mx-auto mb-8">
                A structured life system for creators who build, ship, and grow. 
                Master awareness, emotional intelligence, and purpose in 4 focused weeks.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/50">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400" />
                  80-page workbook
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400" />
                  40+ exercises
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400" />
                  Lifetime access
                </div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 mb-16">
              <div className="flex items-center gap-2 mb-6">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-sm text-white/60 ml-2">
                  1,200+ creators transformed
                </span>
              </div>

              <blockquote className="text-lg text-white/80 leading-relaxed italic mb-4">
                "In 4 weeks I cleared 10 years of emotional baggage and found my creative purpose. 
                The focus on 3 core pillars was perfect — deep enough to transform, tight enough to complete."
              </blockquote>

              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 text-lg font-bold">
                  ML
                </div>
                <div>
                  <div className="font-semibold text-white">Maria Lopez</div>
                  <div className="text-sm text-white/50">Creative Director</div>
                </div>
              </div>
            </div>

            {/* The Problem */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-6">You're building, but something's off</h2>
              
              <div className="space-y-4 text-white/70 leading-relaxed">
                <p>You ship projects. You hit goals. From the outside, you're crushing it.</p>
                
                <p>But internally? You're reactive. Triggered by small things. Unsure if you're on the right path. 
                Working hard but not feeling fulfilled.</p>
                
                <p className="text-white font-medium">The issue isn't discipline. It's awareness.</p>
              </div>
            </div>

            {/* The Solution */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-6">The 3 Pillars That Change Everything</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10 border border-amber-500/20 mb-4">
                    <span className="text-2xl">🌟</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Awareness & Systems</h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    See your patterns. Understand your systems. Build a personal dashboard that actually works.
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
                    <span className="text-2xl">💜</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Emotional Mastery</h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Stop being reactive. Learn to feel emotions without being consumed. Transform triggers into growth.
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Purpose & Meaning</h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Clarify your values. Map your ikigai. Build a 90-day roadmap aligned with who you actually are.
                  </p>
                </div>
              </div>
            </div>

            {/* What's Included */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-6">What You Get</h2>
              
              <div className="space-y-3">
                {[
                  '80-page structured workbook (PDF)',
                  '40+ interactive worksheets and exercises',
                  'Daily practices for each pillar',
                  '4-week transformation roadmap',
                  'Emotion tracking system',
                  'Values clarification framework',
                  'Ikigai mapping template',
                  '90-day purpose roadmap builder',
                  'Lifetime access to all updates',
                  'Fillable PDF + printable worksheets'
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white/70">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="rounded-2xl border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent p-8 mb-16">
              <div className="text-center mb-6">
                <div className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-2">
                  One-Time Payment
                </div>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-bold">$297</span>
                  <span className="text-white/50 line-through">$497</span>
                </div>
                <p className="text-sm text-white/60 mt-2">40% launch discount</p>
              </div>

              <button className="w-full rounded-lg bg-emerald-500 py-4 text-lg font-semibold text-white hover:bg-emerald-600 transition-colors mb-4">
                Get Instant Access
              </button>

              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-sm text-white/60">
                  <Lock className="h-4 w-4" />
                  Secure checkout • Instant delivery
                </div>
              </div>
            </div>

            {/* Guarantee */}
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 mb-16">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-500/20 flex-shrink-0">
                  <span className="text-2xl">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">30-Day Clarity Guarantee</h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Work through the Golden Path for 30 days. If you're not clearer about your patterns, 
                    emotions, and purpose, email me and I'll refund every penny. No questions asked.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-6">Common Questions</h2>
              
              <div className="space-y-4">
                {[
                  {
                    q: "How is this different from other self-help books?",
                    a: "This isn't a book you read — it's a workbook you do. 40+ interactive exercises with space to write. No spiritual fluff, just practical systems for creators."
                  },
                  {
                    q: "Can I really complete this in 4 weeks?",
                    a: "Yes. 30-45 minutes daily for 4 weeks. The focus on 3 core pillars (instead of all 7) makes it intense but achievable."
                  },
                  {
                    q: "What format is the workbook?",
                    a: "PDF (fillable digital version + printable). Works on any device. Many people print it and use a physical notebook."
                  },
                  {
                    q: "Is there coaching included?",
                    a: "This tier is workbook-only. For live coaching, check out Life Symphony ($697) or 7 Pillars Mastery ($897)."
                  },
                  {
                    q: "What if I need help during the 4 weeks?",
                    a: "The workbook is self-guided, but you can upgrade to coaching tiers anytime (we credit your $297)."
                  }
                ].map((faq, i) => (
                  <div key={i} className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                    <h3 className="font-semibold mb-2">{faq.q}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Final CTA */}
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to start?</h2>
              <p className="text-white/60 mb-8">
                Join 1,200+ creators who transformed their lives with the Golden Path.
              </p>

              <button className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-8 py-4 text-lg font-semibold text-white hover:bg-emerald-600 transition-colors">
                Get Instant Access — $297
                <ArrowRight className="h-5 w-5" />
              </button>

              <p className="text-sm text-white/50 mt-4">
                One-time payment • Instant delivery • 30-day guarantee
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
