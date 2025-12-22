import { Metadata } from 'next'
import { BentoGrid, BentoCard } from '@/components/ui/magic-ui/bento-grid'
import Marquee from '@/components/ui/magic-ui/marquee'
import ShimmerButton from '@/components/ui/magic-ui/shimmer-button'
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
    description: '500+ Suno sessions tested and refined for professional-quality AI music generation.',
    Icon: Music,
    href: '/ai-music-academy',
    cta: 'Start Creating',
    className: 'col-span-3 lg:col-span-2',
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 via-pink-500/20 to-blue-500/30 blur-3xl" />
    ),
  },
  {
    name: 'Vibe OS',
    description: 'Transform your creative state with AI-generated soundscapes.',
    Icon: Zap,
    href: '/vibe-os',
    cta: 'Experience It',
    className: 'col-span-3 lg:col-span-1',
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 via-blue-500/20 to-purple-500/30 blur-3xl" />
    ),
  },
  {
    name: 'Creator Community',
    description: 'Join 500+ creators amplifying their output with AI.',
    Icon: Users,
    href: '/realm',
    cta: 'Join Now',
    className: 'col-span-3 lg:col-span-1',
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 via-teal-500/20 to-cyan-500/30 blur-3xl" />
    ),
  },
  {
    name: 'Proven Results',
    description: 'Ship 3x faster without losing your creative soul.',
    Icon: Trophy,
    href: '/products',
    cta: 'See Products',
    className: 'col-span-3 lg:col-span-2',
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/30 via-orange-500/20 to-red-500/30 blur-3xl" />
    ),
  },
]

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Music Producer',
    quote: "Vibe OS transformed how I approach creative sessions. I'm producing tracks 3x faster.",
    avatar: '🎵',
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Content Creator',
    quote: 'The AI Music Academy gave me skills I never thought possible. My audience loves it.',
    avatar: '🎸',
  },
  {
    name: 'Emma Thompson',
    role: 'YouTuber',
    quote: "FrankX's approach to AI is refreshing - powerful tools that enhance rather than replace creativity.",
    avatar: '🎬',
  },
  {
    name: 'David Kim',
    role: 'Podcast Host',
    quote: "The Creator Realm community is incredible. Best investment I've made in my creative journey.",
    avatar: '🎙️',
  },
  {
    name: 'Lisa Anderson',
    role: 'Musician',
    quote: "I was skeptical about AI music, but Frank's system opened up entirely new creative possibilities.",
    avatar: '🎹',
  },
  {
    name: 'James Wilson',
    role: 'Producer',
    quote: 'The quality of AI-generated tracks from these workflows is genuinely impressive.',
    avatar: '🎧',
  },
]

export default function ShowcasePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950">
      {/* Hero Section with SplitTextReveal */}
      <section className="relative px-6 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-neutral-950 to-blue-900/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto text-center">
          <SplitTextReveal
            text="State of the Art"
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent"
            delay={0.2}
          />
          <SplitTextReveal
            text="Creator Experience"
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
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

      {/* Marquee Section */}
      <section className="relative px-6 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              What Creators Say
            </h2>
            <p className="text-xl text-slate-400">
              Infinite scroll testimonials with smooth animations
            </p>
          </div>
          <Marquee className="[--duration:40s]" pauseOnHover>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="relative w-80 flex-shrink-0 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-6 backdrop-blur-xl"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{testimonial.avatar}</div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-slate-400">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-slate-300 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Ready to Experience the Future?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join the AI-powered creative revolution
          </p>
          <ShimmerButton
            shimmerColor="#ffffff"
            background="rgba(99, 102, 241, 0.95)"
            className="text-xl px-12 py-6"
          >
            Get Started Now
          </ShimmerButton>
        </div>
      </section>
    </main>
  )
}
