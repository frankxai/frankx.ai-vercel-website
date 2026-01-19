'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, Crown, ArrowRight, Mail } from 'lucide-react'

export default function RealmPage() {
  return (
    <main className="min-h-screen bg-[#02030b] text-white">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950/20 via-[#02030b] to-violet-950/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(245,158,11,0.08),transparent_50%)]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            Coming Soon
          </div>

          {/* Icon */}
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500/20 to-violet-500/20 border border-amber-500/20">
            <Crown className="h-10 w-10 text-amber-400" />
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl mb-6">
            <span className="bg-gradient-to-r from-amber-200 via-amber-100 to-white bg-clip-text text-transparent">
              The FrankX Realm
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed">
            An exclusive community for creators who want to master AI, build transformative systems,
            and connect with others on the same journey. Inner Circle membership coming soon.
          </p>

          {/* Features Preview */}
          <div className="grid sm:grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto">
            {[
              { title: 'Live Sessions', desc: 'Weekly calls with Frank' },
              { title: 'Private Vault', desc: 'Exclusive resources' },
              { title: 'Community', desc: 'Connect with creators' },
            ].map((feature) => (
              <div key={feature.title} className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="text-sm font-semibold text-amber-400 mb-1">{feature.title}</div>
                <div className="text-xs text-white/50">{feature.desc}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/newsletter"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-[0_16px_50px_rgba(245,158,11,0.3)] transition hover:-translate-y-1"
            >
              <Mail className="w-4 h-4" />
              Join the Waitlist
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
            >
              Back to Home
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
