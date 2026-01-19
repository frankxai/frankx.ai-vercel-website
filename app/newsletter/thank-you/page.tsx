'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Download, Users, Music, BookOpen } from 'lucide-react'
import Confetti from 'react-confetti'

export default function NewsletterThankYouPage() {
  const router = useRouter()
  const [showConfetti, setShowConfetti] = useState(true)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    // Set dimensions for confetti
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    })

    // Stop confetti after 5 seconds
    const confettiTimer = setTimeout(() => {
      setShowConfetti(false)
    }, 5000)

    // Auto-redirect after 10 seconds
    const redirectTimer = setTimeout(() => {
      router.push('/downloads')
    }, 10000)

    return () => {
      clearTimeout(confettiTimer)
      clearTimeout(redirectTimer)
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black flex items-center justify-center px-4 py-12">
      {/* Confetti Effect */}
      {showConfetti && (
        <Confetti
          width={dimensions.width}
          height={dimensions.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.3}
          colors={['#06b6d4', '#22d3ee', '#9333ea', '#a855f7', '#ec4899']}
        />
      )}

      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="relative bg-gradient-to-br from-gray-900 to-gray-950 border border-cyan-500/20 rounded-3xl p-8 md:p-12 shadow-2xl shadow-cyan-500/20 text-center">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-600/10 rounded-3xl blur-3xl -z-10" />

          {/* Success Icon */}
          <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full animate-pulse" />
            <div className="relative w-16 h-16 bg-gray-950 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-cyan-400" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            You're In! 🎉
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Welcome to the FrankX.AI creator community
          </p>

          {/* What's Next Box */}
          <div className="bg-gray-800/50 border border-cyan-500/20 rounded-2xl p-6 mb-8 text-left">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400">→</span>
              What happens next:
            </h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 mt-1">✓</span>
                <span>Check your email for a welcome message (it should arrive in 1-2 minutes)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">✓</span>
                <span>Get weekly insights on AI tools, music creation, and creator transformation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-pink-400 mt-1">✓</span>
                <span>Access exclusive guides, templates, and early product launches</span>
              </li>
            </ul>
          </div>

          {/* CTA Grid */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Link
              href="/downloads"
              className="group bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 hover:from-cyan-500/20 hover:to-cyan-600/20 border border-cyan-500/30 rounded-xl p-4 transition-all hover:scale-105"
            >
              <Download className="w-8 h-8 text-cyan-400 mb-2 mx-auto" />
              <div className="text-sm font-medium text-white mb-1">Free Guides</div>
              <div className="text-xs text-gray-400 group-hover:text-gray-300">
                Download resources
              </div>
            </Link>

            <Link
              href="/blog"
              className="group bg-gradient-to-br from-purple-500/10 to-purple-600/10 hover:from-purple-500/20 hover:to-purple-600/20 border border-purple-500/30 rounded-xl p-4 transition-all hover:scale-105"
            >
              <BookOpen className="w-8 h-8 text-purple-400 mb-2 mx-auto" />
              <div className="text-sm font-medium text-white mb-1">Read Articles</div>
              <div className="text-xs text-gray-400 group-hover:text-gray-300">
                Creator insights
              </div>
            </Link>

            <Link
              href="/music"
              className="group bg-gradient-to-br from-pink-500/10 to-pink-600/10 hover:from-pink-500/20 hover:to-pink-600/20 border border-pink-500/30 rounded-xl p-4 transition-all hover:scale-105"
            >
              <Music className="w-8 h-8 text-pink-400 mb-2 mx-auto" />
              <div className="text-sm font-medium text-white mb-1">Explore Music</div>
              <div className="text-xs text-gray-400 group-hover:text-gray-300">
                500+ AI songs
              </div>
            </Link>
          </div>

          {/* Primary CTA */}
          <Link
            href="/downloads"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105"
          >
            <span>Explore Free Guides</span>
            <ArrowRight className="w-5 h-5" />
          </Link>

          {/* Social Links */}
          <div className="mt-8 pt-8 border-t border-gray-800">
            <p className="text-sm text-gray-400 mb-4">Join the community:</p>
            <div className="flex items-center justify-center gap-4">
              <a
                href="https://twitter.com/frankxai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/frankguzmanai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://youtube.com/@frankxai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Auto-redirect notice */}
          <p className="mt-6 text-xs text-gray-500">
            Redirecting to downloads in a few seconds...
          </p>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
