import { Suspense } from 'react'
import Link from 'next/link'
import { createMetadata } from '@/lib/seo'
import { GlassmorphicCard } from '@/components/glassmorphic-card'
import { PremiumButton } from '@/components/premium-button'

export const metadata = createMetadata({
  title: 'Thank You | FrankX',
  description: 'Thanks for subscribing! Check your email for confirmation.',
  path: '/thank-you',
})

function ThankYouContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Thank You Message */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            You're In! 🎉
          </h1>
          <p className="text-xl text-slate-300">
            Thanks for subscribing to the FrankX journey.
          </p>
        </div>

        {/* Next Steps */}
        <GlassmorphicCard className="text-left space-y-4">
          <h2 className="text-2xl font-bold text-white">What Happens Next?</h2>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-semibold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-white">Check Your Email</h3>
                <p className="text-sm text-slate-400">
                  You'll receive a confirmation email shortly. Make sure to check your spam folder if you don't see it.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-semibold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-white">Get Weekly Insights</h3>
                <p className="text-sm text-slate-400">
                  Every week, you'll receive stories, systems, and sonic drops to keep you building the Golden Age with momentum.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-semibold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-white">Explore Resources</h3>
                <p className="text-sm text-slate-400">
                  While you're here, check out the free tools, courses, and content designed to accelerate your creative journey.
                </p>
              </div>
            </div>
          </div>
        </GlassmorphicCard>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <PremiumButton href="/blog" variant="primary">
            Explore the Blog
          </PremiumButton>
          <PremiumButton href="/products" variant="secondary">
            Browse Products
          </PremiumButton>
          <PremiumButton href="/" variant="secondary">
            Back to Home
          </PremiumButton>
        </div>

        {/* Social Proof */}
        <div className="pt-8 border-t border-slate-800">
          <p className="text-sm text-slate-400">
            Join <span className="text-white font-semibold">5,000+</span> creators building the future with AI
          </p>
        </div>
      </div>
    </div>
  )
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
      <ThankYouContent />
    </Suspense>
  )
}
