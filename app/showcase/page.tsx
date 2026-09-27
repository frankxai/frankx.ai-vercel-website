import { Metadata } from 'next'
import Link from 'next/link'
import { BentoGrid, BentoCard } from '@/components/ui/magic-ui/bento-grid'
import { SplitTextReveal } from '@/components/ui/SplitTextReveal'
import { TiltCard } from '@/components/ui/TiltCard'
import { Music, Zap, Users, Trophy, Star, Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Showcase - FrankX.AI',
  description: 'Experience the future of creator tools with our state-of-the-art UI components and animations.',
}

const features = [
  {
    name: 'AI Music Production',
    description: 'Explore music creation guides, examples, and ways to begin a session.',
    Icon: Music,
    href: '/music/learn',
    cta: 'Start Creating',
    className: 'col-span-3 lg:col-span-2',
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/25 via-pink-500/15 to-cyan-500/25 blur-3xl" />
    ),
  },
  {
    name: 'Vibe OS workspace concept',
    description: 'Explore an unreleased creative-state idea and a manual experiment.',
    Icon: Zap,
    href: '/products/vibe-os',
    cta: 'Read the concept',
    className: 'col-span-3 lg:col-span-1',
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/25 via-sky-500/15 to-violet-500/25 blur-3xl" />
    ),
  },
  {
    name: 'Creator community',
    description: 'See the current community space and how to take part.',
    Icon: Users,
    href: '/realm',
    cta: 'Explore the community',
    className: 'col-span-3 lg:col-span-1',
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 via-teal-500/20 to-cyan-500/30 blur-3xl" />
    ),
  },
  {
    name: 'Product studio',
    description: 'Inspect concepts, early outlines, and available resources.',
    Icon: Trophy,
    href: '/products',
    cta: 'Explore products',
    className: 'col-span-3 lg:col-span-2',
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/30 via-orange-500/20 to-red-500/30 blur-3xl" />
    ),
  },
]

export default function ShowcasePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950">
      {/* Hero Section with SplitTextReveal */}
      <section className="relative px-6 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/30 via-neutral-950 to-cyan-950/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-violet-500/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto text-center">
          <SplitTextReveal
            text="State of the Art"
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent"
            delay={0.2}
          />
          <SplitTextReveal
            text="Creator Experience"
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-400 bg-clip-text text-transparent"
            delay={0.6}
          />
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto">
            Cinematic animations, premium components, and WCAG 2.2 AAA accessibility - all built with Magic UI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ShimmerButton
              shimmerColor="#ffffff"
              background="rgba(99, 102, 241, 0.9)"
              className="text-lg px-8 py-4"
            >
              Explore Products
            </ShimmerButton>
            <ShimmerButton
              shimmerColor="#ffffff"
              background="rgba(0, 0, 0, 0.9)"
              className="text-lg px-8 py-4 border border-white/20"
            >
              Join Community
            </ShimmerButton>
          </div>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Premium Features
            </h2>
            <p className="text-xl text-slate-400">
              Every component designed for maximum impact and accessibility
            </p>
          </div>
          <BentoGrid>
            {features.map((feature) => (
              <BentoCard key={feature.name} {...feature} />
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* Tilt Cards Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Interactive 3D Cards
            </h2>
            <p className="text-xl text-slate-400">
              Move your mouse to experience the depth effect
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[Star, Heart, Zap].map((Icon, index) => (
              <TiltCard key={index} className="h-full">
                <div className="relative h-64 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-8 backdrop-blur-xl">
                  <Icon className="w-16 h-16 mb-4 text-purple-400" />
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Feature {index + 1}
                  </h3>
                  <p className="text-slate-300">
                    Experience smooth 3D transforms that follow your cursor with spring physics
                  </p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-400 bg-clip-text text-transparent">
            Ready to Experience the Future?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join the AI-powered creative revolution
          </p>
          <Link
            href="/products"
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-indigo-500 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
          >
            Explore the product studio
          </Link>
        </div>
      </section>
    </main>
  )
}
